export const META_PIXEL_ID = "1579380753917444";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackMetaEvent(eventName: "Contact" | "Lead" | "CompleteRegistration") {
  window.fbq?.("track", eventName);
}
