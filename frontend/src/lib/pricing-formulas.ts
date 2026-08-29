export const GST_RATE = 0.1;
export const MARKUP_RATE = 0.3;
export const STANDARD_SHIPPING_AUD_PER_SET = 550;
export const EXPRESS_AIR_SHIPPING_COST_AUD = 800;

/** Retail price for a set of four wheels, including standard shipping and GST. */
export function wheelSetRetailIncGstAud(manufacturingCostAud: number): number {
  return (manufacturingCostAud + STANDARD_SHIPPING_AUD_PER_SET)
    * (1 + MARKUP_RATE)
    * (1 + GST_RATE);
}

/** Retail price for an accessory/add-on. Standard wheel-set shipping is excluded. */
export function addOnRetailIncGstAud(manufacturingCostAud: number): number {
  return manufacturingCostAud * (1 + MARKUP_RATE) * (1 + GST_RATE);
}

/** Customer-facing express freight upgrade, inclusive of GST. */
export function expressAirShippingIncGstAud(): number {
  return EXPRESS_AIR_SHIPPING_COST_AUD;
}
