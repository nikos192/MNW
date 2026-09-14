import type {
  TrackingEvent,
  TrackingResult,
  TrackingStatusCode,
} from "./tracking-contract.ts";

const MAX_PROVIDER_RESPONSE_BYTES = 512 * 1024;
const MAX_EVENTS = 100;

type FetchLike = typeof fetch;
type ProviderErrorKind = "configuration" | "timeout" | "unavailable";

export class TrackingProviderError extends Error {
  readonly kind: ProviderErrorKind;

  constructor(kind: ProviderErrorKind) {
    super(`Tracking provider error: ${kind}`);
    this.name = "TrackingProviderError";
    this.kind = kind;
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function cleanProviderText(value: unknown, maximumLength: number): string {
  if (typeof value !== "string" && typeof value !== "number") return "";
  return String(value)
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maximumLength);
}

function firstText(
  record: Record<string, unknown>,
  keys: string[],
  maximumLength: number,
): string {
  for (const key of keys) {
    const value = cleanProviderText(record[key], maximumLength);
    if (value) return value;
  }
  return "";
}

function normalizeProviderDate(value: unknown): string | null {
  const raw = cleanProviderText(value, 64);
  const match = raw.match(
    /^(\d{4})[/-](\d{1,2})[/-](\d{1,2})[ T](\d{1,2}):(\d{1,2})(?::(\d{1,2}))?/,
  );
  if (!match) return null;

  const [, yearText, monthText, dayText, hourText, minuteText, secondText] =
    match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const second = Number(secondText ?? "0");
  const candidate = new Date(
    Date.UTC(year, month - 1, day, hour, minute, second),
  );

  if (
    candidate.getUTCFullYear() !== year ||
    candidate.getUTCMonth() !== month - 1 ||
    candidate.getUTCDate() !== day ||
    candidate.getUTCHours() !== hour ||
    candidate.getUTCMinutes() !== minute ||
    candidate.getUTCSeconds() !== second
  ) {
    return null;
  }

  const pad = (part: number) => String(part).padStart(2, "0");
  return `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}`;
}

function timestampValue(value: string | null): number {
  return value ? Date.parse(`${value}Z`) : Number.NEGATIVE_INFINITY;
}

function mapProviderStatus(rawStatus: string): {
  code: TrackingStatusCode;
  label: string;
} {
  const comparable = rawStatus.toLowerCase().replace(/[\s_-]+/g, "");

  if (/已签收|签收|delivered|signed/.test(comparable)) {
    return { code: "delivered", label: "Delivered" };
  }
  if (/派送|outfordelivery/.test(comparable)) {
    return { code: "out_for_delivery", label: "Out for delivery" };
  }
  if (/运输|在途|intransit|transit/.test(comparable)) {
    return { code: "in_transit", label: "In transit" };
  }
  if (/收货|received|pickedup|pickup/.test(comparable)) {
    return { code: "received", label: "Shipment received" };
  }
  if (/异常|exception|failed|delay/.test(comparable)) {
    return { code: "exception", label: "Attention required" };
  }
  if (/退回|returned/.test(comparable)) {
    return { code: "returned", label: "Returned" };
  }
  return { code: "unknown", label: "Tracking update received" };
}

function normalizeEvent(value: unknown): TrackingEvent | null {
  const record = asRecord(value);
  if (!record) return null;

  const occurredAt = normalizeProviderDate(
    record.Date ?? record.date ?? record.timestamp ?? record.time,
  );
  const location =
    firstText(record, ["Position", "position", "Location", "location"], 160) ||
    null;
  const description = firstText(
    record,
    ["Content", "content", "Description", "description"],
    1_000,
  );

  if (!occurredAt && !location && !description) return null;
  return {
    occurredAt,
    location,
    description: description || "Shipment update",
  };
}

export function normalizeProviderResponse(
  payload: unknown,
  requestedTrackingNumber: string,
): TrackingResult | null {
  if (!Array.isArray(payload)) {
    throw new TrackingProviderError("unavailable");
  }

  const requested = requestedTrackingNumber.toUpperCase();
  const record = payload.map(asRecord).find((item) => {
    if (!item) return false;
    const orderNumber = firstText(
      item,
      ["orderNo", "OrderNo", "trackingNumber"],
      80,
    );
    return orderNumber.toUpperCase() === requested;
  });

  if (!record) return null;

  const rawEvents = Array.isArray(record.trackResponses)
    ? record.trackResponses
    : Array.isArray(record.TrackResponses)
      ? record.TrackResponses
      : [];
  const events = rawEvents
    .map(normalizeEvent)
    .filter((event): event is TrackingEvent => event !== null)
    .sort(
      (first, second) =>
        timestampValue(first.occurredAt) - timestampValue(second.occurredAt),
    )
    .slice(-MAX_EVENTS);
  const rawStatus = firstText(record, ["status", "Status"], 120);
  const providerError = firstText(record, ["errorMsg", "ErrorMsg"], 500);

  if (providerError && events.length === 0 && !rawStatus) return null;
  if (!rawStatus && events.length === 0) return null;

  const status = mapProviderStatus(rawStatus);
  const latestLocation =
    [...events].reverse().find((event) => event.location)?.location ?? null;
  const lastUpdated =
    [...events].reverse().find((event) => event.occurredAt)?.occurredAt ?? null;

  return {
    trackingNumber: requestedTrackingNumber,
    currentStatus: status.label,
    statusCode: status.code,
    latestLocation,
    lastUpdated,
    events,
  };
}

function validateProviderEndpoint(value: string): string {
  try {
    const endpoint = new URL(value);
    if (
      !["http:", "https:"].includes(endpoint.protocol) ||
      endpoint.username ||
      endpoint.password
    ) {
      throw new Error("Unsupported endpoint");
    }
    return endpoint.toString();
  } catch {
    throw new TrackingProviderError("configuration");
  }
}

export async function fetchTrackingFromProvider({
  endpoint,
  trackingNumber,
  fetchImpl = fetch,
  timeoutMs = 8_000,
}: {
  endpoint: string;
  trackingNumber: string;
  fetchImpl?: FetchLike;
  timeoutMs?: number;
}): Promise<TrackingResult | null> {
  const providerEndpoint = validateProviderEndpoint(endpoint);
  const form = new URLSearchParams();
  form.append("nos[]", trackingNumber);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(providerEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: form.toString(),
      cache: "no-store",
      redirect: "error",
      signal: controller.signal,
    });

    if (!response.ok) throw new TrackingProviderError("unavailable");

    const declaredLength = Number(response.headers.get("content-length"));
    if (
      Number.isFinite(declaredLength) &&
      declaredLength > MAX_PROVIDER_RESPONSE_BYTES
    ) {
      throw new TrackingProviderError("unavailable");
    }

    const responseText = await response.text();
    if (responseText.length > MAX_PROVIDER_RESPONSE_BYTES) {
      throw new TrackingProviderError("unavailable");
    }

    let payload: unknown;
    try {
      payload = JSON.parse(responseText);
    } catch {
      throw new TrackingProviderError("unavailable");
    }

    return normalizeProviderResponse(payload, trackingNumber);
  } catch (error) {
    if (controller.signal.aborted) {
      throw new TrackingProviderError("timeout");
    }
    if (error instanceof TrackingProviderError) throw error;
    throw new TrackingProviderError("unavailable");
  } finally {
    clearTimeout(timeout);
  }
}
