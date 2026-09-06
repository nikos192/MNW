export const GOOGLE_ADS_ID = "AW-18429977658";
export const GOOGLE_ADS_LEAD_DESTINATION =
  "AW-18429977658/hfRsCK370-8cELrIjNRE";

export function googleAdsLeadConversionPayload() {
  return {
    send_to: GOOGLE_ADS_LEAD_DESTINATION,
    value: 1,
    currency: "AUD",
  } as const;
}

export function trackGoogleAdsLeadConversion() {
  window.gtag?.(
    "event",
    "conversion",
    googleAdsLeadConversionPayload(),
  );
}
