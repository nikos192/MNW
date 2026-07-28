export const META_PIXEL_ID = "2289979405151700";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type MetaStandardEvent = "Contact" | "Lead" | "CompleteRegistration" | "ViewContent";

export function trackMetaEvent(
  eventName: MetaStandardEvent,
  parameters?: Record<string, string | number | boolean | string[]>,
) {
  window.fbq?.("track", eventName, parameters);
}
