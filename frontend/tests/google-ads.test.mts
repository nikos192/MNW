import assert from "node:assert/strict";
import test from "node:test";
import {
  GOOGLE_ADS_ID,
  googleAdsLeadConversionPayload,
} from "../src/lib/google-ads.ts";

test("Google Ads lead conversion uses the supplied account and conversion label", () => {
  assert.equal(GOOGLE_ADS_ID, "AW-18429977658");
  assert.deepEqual(googleAdsLeadConversionPayload(), {
    send_to: "AW-18429977658/hfRsCK370-8cELrIjNRE",
    value: 1,
    currency: "AUD",
  });
});
