export const META_PIXEL_ID = "1782269909800443";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

type MetaStandardEvent = "Contact" | "Lead" | "CompleteRegistration" | "ViewContent";

export function trackMetaEvent(
  eventName: MetaStandardEvent,
  parameters?: Record<string, string | number | boolean | string[]>,
  options?: { eventID?: string },
) {
  window.fbq?.("track", eventName, parameters, options);
}

export function trackFunnelEvent(
  eventName: string,
  parameters?: Record<string, string | number | boolean | string[]>,
  options?: { eventID?: string },
) {
  window.fbq?.("trackCustom", eventName, parameters, options);
  window.gtag?.("event", eventName, parameters);
}
