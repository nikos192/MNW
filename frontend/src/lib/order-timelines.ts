export type WheelConstruction = "one-piece" | "two-piece";
export type ShippingOption = "standard" | "express";

export const EXPRESS_SHIPPING_AUD = 800;

export const orderSteps = [
  [
    "01",
    "Tell us what you want",
    "Choose a wheel or share an idea. We confirm fitment and pricing for your car.",
  ],
  [
    "02",
    "Approve your design",
    "Review your custom 3D render. Approval and full payment come before production.",
  ],
  [
    "03",
    "Made, checked, delivered",
    "We manufacture your wheels, inspect the finished set and ship it to you.",
  ],
] as const;

export const productionDays: Record<WheelConstruction, number> = {
  "one-piece": 20,
  "two-piece": 30,
};

export const shippingDays: Record<ShippingOption, number> = {
  standard: 40,
  express: 14,
};

export function totalLeadTimeDays(
  construction: WheelConstruction,
  shipping: ShippingOption,
) {
  return productionDays[construction] + shippingDays[shipping];
}

export function shippingLabel(option: ShippingOption) {
  return option === "express"
    ? "Express Shipping — AUD $800 — approximately 2 weeks transit"
    : "Standard Shipping — included — approximately 40 days transit";
}
