export const GST_RATE = 0.1;
export const MARKUP_RATE = 0.3;
export const STANDARD_SHIPPING_AUD_PER_SET = 550;
export const EXPRESS_AIR_SHIPPING_COST_AUD = 800;
export const WHEEL_SALE_DISCOUNT_RATE = 0.1;

/** Retail price for a set of four wheels, including standard shipping and GST. */
export function wheelSetRetailIncGstAud(manufacturingCostAud: number): number {
  return (manufacturingCostAud + STANDARD_SHIPPING_AUD_PER_SET)
    * (1 + MARKUP_RATE)
    * (1 + GST_RATE);
}

/** Current promotional price for the wheel set itself; add-ons remain full price. */
export function wheelSetSalePriceIncGstAud(manufacturingCostAud: number): number {
  return wheelSetRetailIncGstAud(manufacturingCostAud) * (1 - WHEEL_SALE_DISCOUNT_RATE);
}

/** Retail price for an accessory/add-on. Standard wheel-set shipping is excluded. */
export function addOnRetailIncGstAud(manufacturingCostAud: number): number {
  return manufacturingCostAud * (1 + MARKUP_RATE) * (1 + GST_RATE);
}

/** Express freight is charged at cost plus GST, with no retail markup. */
export function expressAirShippingIncGstAud(): number {
  return EXPRESS_AIR_SHIPPING_COST_AUD * (1 + GST_RATE);
}
