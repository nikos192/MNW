import { isAllowedFormOrigin } from "./request-origin.ts";
import {
  isValidTrackingNumber,
  normalizeTrackingNumber,
  type TrackingApiErrorCode,
  type TrackingApiFailure,
  type TrackingApiSuccess,
} from "./tracking-contract.ts";
import {
  fetchTrackingFromProvider,
  TrackingProviderError,
} from "./tracking-provider.ts";
import {
  SlidingWindowRateLimiter,
  type RateLimiter,
} from "./tracking-rate-limit.ts";

const MAX_REQUEST_BYTES = 2_048;
const trackingRateLimiter = new SlidingWindowRateLimiter(10, 60_000);

type TrackingApiDependencies = {
  providerUrl?: string;
  fetchImpl?: typeof fetch;
  rateLimiter?: RateLimiter;
  originCheck?: (request: Request) => boolean;
  timeoutMs?: number;
};

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const value =
    forwarded?.split(",")[0].trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown";
  return value.slice(0, 128);
}

function jsonResponse(
  body: TrackingApiSuccess | TrackingApiFailure,
  status: number,
  headers?: HeadersInit,
): Response {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "private, no-store, max-age=0",
      ...headers,
    },
  });
}

function errorResponse(
  code: TrackingApiErrorCode,
  message: string,
  status: number,
  headers?: HeadersInit,
): Response {
  return jsonResponse({ error: { code, message } }, status, headers);
}

export async function handleTrackingRequest(
  request: Request,
  dependencies: TrackingApiDependencies = {},
): Promise<Response> {
  const originCheck = dependencies.originCheck ?? isAllowedFormOrigin;
  if (!originCheck(request)) {
    return errorResponse(
      "FORBIDDEN",
      "This tracking request could not be verified.",
      403,
    );
  }

  const limiter = dependencies.rateLimiter ?? trackingRateLimiter;
  const rateLimit = limiter.consume(clientIp(request));
  if (!rateLimit.allowed) {
    return errorResponse(
      "RATE_LIMITED",
      "Too many tracking requests. Please wait a moment and try again.",
      429,
      { "Retry-After": String(rateLimit.retryAfterSeconds) },
    );
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    return errorResponse("BAD_REQUEST", "Invalid request payload.", 400);
  }

  let payload: unknown;
  try {
    const rawBody = await request.text();
    if (rawBody.length > MAX_REQUEST_BYTES) {
      return errorResponse("BAD_REQUEST", "Invalid request payload.", 400);
    }
    payload = JSON.parse(rawBody);
  } catch {
    return errorResponse("BAD_REQUEST", "Invalid request payload.", 400);
  }

  const trackingNumberValue =
    payload !== null && typeof payload === "object"
      ? (payload as Record<string, unknown>).trackingNumber
      : undefined;
  if (
    typeof trackingNumberValue !== "string" ||
    !isValidTrackingNumber(trackingNumberValue)
  ) {
    return errorResponse(
      "INVALID_TRACKING_NUMBER",
      "Enter a valid tracking number using 6–40 letters, numbers or hyphens.",
      400,
    );
  }

  const trackingNumber = normalizeTrackingNumber(trackingNumberValue);
  const providerUrl =
    dependencies.providerUrl ?? process.env.TRACKING_PROVIDER_URL?.trim();
  if (!providerUrl) {
    return errorResponse(
      "PROVIDER_UNAVAILABLE",
      "Shipment tracking is temporarily unavailable. Please try again shortly.",
      503,
    );
  }

  try {
    const result = await fetchTrackingFromProvider({
      endpoint: providerUrl,
      trackingNumber,
      fetchImpl: dependencies.fetchImpl,
      timeoutMs: dependencies.timeoutMs,
    });

    if (!result) {
      return errorResponse(
        "NOT_FOUND",
        "We could not find tracking updates for that number. Check the number and try again.",
        404,
      );
    }

    return jsonResponse({ data: result }, 200);
  } catch (error) {
    const kind =
      error instanceof TrackingProviderError ? error.kind : "unavailable";
    console.error("[tracking] Provider request failed", { kind });

    if (kind === "timeout") {
      return errorResponse(
        "PROVIDER_TIMEOUT",
        "Tracking is taking longer than expected. Please try again shortly.",
        504,
      );
    }

    return errorResponse(
      "PROVIDER_UNAVAILABLE",
      "Shipment tracking is temporarily unavailable. Please try again shortly.",
      502,
    );
  }
}
