export const TRACKING_NUMBER_MIN_LENGTH = 6;
export const TRACKING_NUMBER_MAX_LENGTH = 40;
export const TRACKING_NUMBER_PATTERN = /^[A-Z0-9-]+$/;

export type TrackingStatusCode =
  | "received"
  | "in_transit"
  | "out_for_delivery"
  | "delivered"
  | "exception"
  | "returned"
  | "unknown";

export type TrackingEvent = {
  occurredAt: string | null;
  location: string | null;
  description: string;
};

export type TrackingResult = {
  trackingNumber: string;
  currentStatus: string;
  statusCode: TrackingStatusCode;
  latestLocation: string | null;
  lastUpdated: string | null;
  events: TrackingEvent[];
};

export type TrackingApiErrorCode =
  | "BAD_REQUEST"
  | "FORBIDDEN"
  | "INVALID_TRACKING_NUMBER"
  | "RATE_LIMITED"
  | "NOT_FOUND"
  | "PROVIDER_TIMEOUT"
  | "PROVIDER_UNAVAILABLE";

export type TrackingApiSuccess = {
  data: TrackingResult;
};

export type TrackingApiFailure = {
  error: {
    code: TrackingApiErrorCode;
    message: string;
  };
};

export type TrackingApiResponse = TrackingApiSuccess | TrackingApiFailure;

export function normalizeTrackingNumber(value: string): string {
  return value.trim().toUpperCase();
}

export function isValidTrackingNumber(value: string): boolean {
  const normalized = normalizeTrackingNumber(value);
  return (
    normalized.length >= TRACKING_NUMBER_MIN_LENGTH &&
    normalized.length <= TRACKING_NUMBER_MAX_LENGTH &&
    TRACKING_NUMBER_PATTERN.test(normalized)
  );
}
