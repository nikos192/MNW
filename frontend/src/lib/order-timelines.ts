export type WheelConstruction = "one-piece" | "two-piece";
export type ShippingOption = "standard" | "express";

export const EXPRESS_SHIPPING_AUD = 800;

export const orderSteps = [
  ["01", "Submit your specification", "Choose a catalogue design or send your own direction."],
  ["02", "Fitment confirmed", "We verify the vehicle, brake clearance and final order details."],
  ["03", "Review your 3D render", "A custom 3D render is provided for your review and approval."],
  ["04", "Approve before production", "Manufacturing begins only after you approve the render."],
  ["05", "Inspected and shipped", "Your finished wheels are checked before dispatch."],
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
