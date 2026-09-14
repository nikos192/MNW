import type { TrackingApiErrorCode } from "./tracking-contract.ts";

const ERROR_MESSAGES: Record<TrackingApiErrorCode, string> = {
  BAD_REQUEST: "We could not process that request. Please try again.",
  FORBIDDEN:
    "This request could not be verified. Refresh the page and try again.",
  INVALID_TRACKING_NUMBER:
    "Enter a tracking number using 6–40 letters, numbers or hyphens.",
  RATE_LIMITED:
    "There have been too many tracking requests. Please wait a minute and try again.",
  NOT_FOUND:
    "We could not find updates for that tracking number. Check the number and try again.",
  PROVIDER_TIMEOUT:
    "Tracking is taking longer than expected. Please try again shortly.",
  PROVIDER_UNAVAILABLE:
    "Live tracking is temporarily unavailable. Please try again shortly.",
};

export function trackingErrorMessage(code: unknown): string {
  return typeof code === "string" && code in ERROR_MESSAGES
    ? ERROR_MESSAGES[code as TrackingApiErrorCode]
    : "We could not load tracking right now. Please try again shortly.";
}

export function formatTrackingTimestamp(value: string | null): string {
  if (!value) return "Not supplied";
  const parsed = new Date(`${value}Z`);
  if (Number.isNaN(parsed.getTime())) return "Not supplied";

  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(parsed);
}
