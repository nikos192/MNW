export const WHEEL_PRICING_CONFIG = {
  fxRate: 1.43,
  gstRate: 0.1,
  margin: 0.3,
  shippingAudPerSet: {
    VIC: 150,
    QLD: 100,
    OTHER: 250,
  },
} as const;

export type Construction = "monoblock" | "2pc";
export type DeliveryState = keyof typeof WHEEL_PRICING_CONFIG.shippingAudPerSet;
export type PricingCurrency = "AUD" | "USD";

export type WheelPriceRow = {
  construction: Construction;
  diameter: number;
  widthKey: string;
  widthLabel: string;
  minWidth: number;
  maxWidth: number;
  usdPerWheel: number;
};

export const WHEEL_PRICE_ROWS: readonly WheelPriceRow[] = [
  { construction: "monoblock", diameter: 16, widthKey: "6-7", widthLabel: '6.0"–7.0"', minWidth: 6, maxWidth: 7, usdPerWheel: 240 },
  { construction: "monoblock", diameter: 17, widthKey: "7-9.5", widthLabel: '7.0"–9.5"', minWidth: 7, maxWidth: 9.5, usdPerWheel: 250 },
  { construction: "monoblock", diameter: 18, widthKey: "7.5-13", widthLabel: '7.5"–13"', minWidth: 7.5, maxWidth: 13, usdPerWheel: 265 },
  { construction: "monoblock", diameter: 19, widthKey: "8-13", widthLabel: '8.0"–13"', minWidth: 8, maxWidth: 13, usdPerWheel: 280 },
  { construction: "monoblock", diameter: 20, widthKey: "8-11", widthLabel: '8.0"–11"', minWidth: 8, maxWidth: 11, usdPerWheel: 300 },
  { construction: "monoblock", diameter: 20, widthKey: "11.5-13", widthLabel: '11.5"–13"', minWidth: 11.5, maxWidth: 13, usdPerWheel: 315 },
  { construction: "monoblock", diameter: 21, widthKey: "8.5-11", widthLabel: '8.5"–11"', minWidth: 8.5, maxWidth: 11, usdPerWheel: 330 },
  { construction: "monoblock", diameter: 21, widthKey: "11.5-13", widthLabel: '11.5"–13"', minWidth: 11.5, maxWidth: 13, usdPerWheel: 345 },
  { construction: "monoblock", diameter: 22, widthKey: "8.5-11", widthLabel: '8.5"–11"', minWidth: 8.5, maxWidth: 11, usdPerWheel: 345 },
  { construction: "monoblock", diameter: 22, widthKey: "11.5-13", widthLabel: '11.5"–13"', minWidth: 11.5, maxWidth: 13, usdPerWheel: 360 },
  { construction: "monoblock", diameter: 23, widthKey: "9.5-13", widthLabel: '9.5"–13"', minWidth: 9.5, maxWidth: 13, usdPerWheel: 450 },
  { construction: "monoblock", diameter: 24, widthKey: "9.5-13", widthLabel: '9.5"–13"', minWidth: 9.5, maxWidth: 13, usdPerWheel: 500 },
  { construction: "2pc", diameter: 18, widthKey: "8-10.5", widthLabel: '8"–10.5"', minWidth: 8, maxWidth: 10.5, usdPerWheel: 420 },
  { construction: "2pc", diameter: 18, widthKey: "11-12", widthLabel: '11"–12"', minWidth: 11, maxWidth: 12, usdPerWheel: 440 },
  { construction: "2pc", diameter: 19, widthKey: "8-10.5", widthLabel: '8"–10.5"', minWidth: 8, maxWidth: 10.5, usdPerWheel: 460 },
  { construction: "2pc", diameter: 19, widthKey: "11-12", widthLabel: '11"–12"', minWidth: 11, maxWidth: 12, usdPerWheel: 480 },
  { construction: "2pc", diameter: 20, widthKey: "8-10.5", widthLabel: '8"–10.5"', minWidth: 8, maxWidth: 10.5, usdPerWheel: 480 },
  { construction: "2pc", diameter: 20, widthKey: "11-12", widthLabel: '11"–12"', minWidth: 11, maxWidth: 12, usdPerWheel: 500 },
  { construction: "2pc", diameter: 21, widthKey: "8-10.5", widthLabel: '8"–10.5"', minWidth: 8, maxWidth: 10.5, usdPerWheel: 540 },
  { construction: "2pc", diameter: 21, widthKey: "11-12", widthLabel: '11"–12"', minWidth: 11, maxWidth: 12, usdPerWheel: 560 },
  { construction: "2pc", diameter: 22, widthKey: "8-10.5", widthLabel: '8"–10.5"', minWidth: 8, maxWidth: 10.5, usdPerWheel: 580 },
  { construction: "2pc", diameter: 22, widthKey: "11-12", widthLabel: '11"–12"', minWidth: 11, maxWidth: 12, usdPerWheel: 600 },
  { construction: "2pc", diameter: 23, widthKey: "10-11", widthLabel: '10"–11"', minWidth: 10, maxWidth: 11, usdPerWheel: 750 },
  { construction: "2pc", diameter: 24, widthKey: "10-11", widthLabel: '10"–11"', minWidth: 10, maxWidth: 11, usdPerWheel: 780 },
] as const;

export type AddOnId =
  | "polished-brushed"
  | "two-colour-paint"
  | "chrome"
  | "hollow-spokes"
  | "floating-caps"
  | "custom-centre-caps"
  | "4x4-billet"
  | "concave-heavy-billet"
  | "special-centre-caps";

export type WheelAddOn = {
  id: AddOnId;
  name: string;
  usdPerWheel: number | null;
};

export const WHEEL_ADD_ONS: readonly WheelAddOn[] = [
  { id: "polished-brushed", name: "Polished or brushed", usdPerWheel: 30 },
  { id: "two-colour-paint", name: "Two-colour paint", usdPerWheel: 25 },
  { id: "chrome", name: "Chrome", usdPerWheel: 65 },
  { id: "hollow-spokes", name: "Hollow spokes", usdPerWheel: 35 },
  { id: "floating-caps", name: "Floating centre caps", usdPerWheel: 20 },
  { id: "custom-centre-caps", name: "Custom centre caps", usdPerWheel: 10 },
  { id: "4x4-billet", name: "4×4 billet", usdPerWheel: 50 },
  { id: "concave-heavy-billet", name: "Concave heavy billet", usdPerWheel: 50 },
  { id: "special-centre-caps", name: "Special centre caps", usdPerWheel: null },
] as const;
