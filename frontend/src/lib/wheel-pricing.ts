import {
  WHEEL_ADD_ONS,
  WHEEL_PRICE_ROWS,
  WHEEL_PRICING_CONFIG,
  type AddOnId,
  type Construction,
  type DeliveryState,
  type PricingCurrency,
  type WheelPriceRow,
} from "@/lib/wheel-pricing-config";

export type PricingInput = {
  construction: Construction;
  diameter: number;
  width: string | number;
  addOns: AddOnId[];
  state: DeliveryState;
  currency: PricingCurrency;
};

export type AddOnBreakdown = {
  id: AddOnId;
  name: string;
  priceOnRequest: boolean;
  usdCostPerWheel: number | null;
  rrpIncGstAudPerSet: number | null;
  displayAmount: number | null;
};

export type PricingBreakdown = {
  currency: PricingCurrency;
  currencyRateFromAud: number;
  row: WheelPriceRow;
  supplierUsdPerWheel: number;
  supplierUsdPerSet: number;
  convertedWheelCostAud: number;
  baseShippingAud: number;
  shippingSurchargeAud: number;
  shippingAud: number;
  landedCostAud: number;
  wheelRrpIncGstAudPerSet: number;
  shippingRrpIncGstAudPerSet: number;
  baseSellPriceExGstAud: number;
  baseGstAud: number;
  baseRrpIncGstAudPerSet: number;
  addOns: AddOnBreakdown[];
  fixedAddOnsRrpIncGstAud: number;
  hasPriceOnRequestAddOn: boolean;
  totalRrpIncGstAudPerSet: number;
  totalRrpIncGstAudPerWheel: number;
  displayPerSet: number;
  displayPerWheel: number;
};

function numericWidth(width: string | number): number | null {
  if (typeof width === "number") return Number.isFinite(width) ? width : null;
  const parsed = Number.parseFloat(width.replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

export function getDiameterOptions(construction: Construction): number[] {
  return [...new Set(
    WHEEL_PRICE_ROWS
      .filter((row) => row.construction === construction)
      .map((row) => row.diameter),
  )].sort((a, b) => a - b);
}

export function getWidthOptions(
  construction: Construction,
  diameter: number,
): WheelPriceRow[] {
  return WHEEL_PRICE_ROWS.filter(
    (row) => row.construction === construction && row.diameter === diameter,
  );
}

export function findWheelPriceRow(
  construction: Construction,
  diameter: number,
  width: string | number,
): WheelPriceRow | null {
  const rows = getWidthOptions(construction, diameter);
  const exact = rows.find((row) => row.widthKey === width || row.widthLabel === width);
  if (exact) return exact;

  const parsedWidth = numericWidth(width);
  if (parsedWidth !== null) {
    const matched = rows.find(
      (row) => parsedWidth >= row.minWidth && parsedWidth <= row.maxWidth,
    );
    if (matched) return matched;
  }

  return rows[0] ?? null;
}

function markedUpIncGst(costAud: number): number {
  const sellPriceExGst = costAud / (1 - WHEEL_PRICING_CONFIG.margin);
  return sellPriceExGst * (1 + WHEEL_PRICING_CONFIG.gstRate);
}

export function calculateWheelPricing(input: PricingInput): PricingBreakdown | null {
  const row = findWheelPriceRow(input.construction, input.diameter, input.width);
  if (!row) return null;

  const supplierUsdPerSet = row.usdPerWheel * 4;
  const convertedWheelCostAud = supplierUsdPerSet * WHEEL_PRICING_CONFIG.fxRate;
  const baseShippingAud = WHEEL_PRICING_CONFIG.baseShippingAudPerSet;
  const shippingSurchargeAud =
    WHEEL_PRICING_CONFIG.shippingSurchargeAudPerSet[input.state];
  const shippingAud = baseShippingAud + shippingSurchargeAud;
  const landedCostAud = convertedWheelCostAud + shippingAud;
  const wheelRrpIncGstAudPerSet = markedUpIncGst(convertedWheelCostAud);
  const shippingRrpIncGstAudPerSet = markedUpIncGst(shippingAud);
  const baseSellPriceExGstAud = landedCostAud / (1 - WHEEL_PRICING_CONFIG.margin);
  const baseRrpIncGstAudPerSet = baseSellPriceExGstAud * (1 + WHEEL_PRICING_CONFIG.gstRate);
  const baseGstAud = baseRrpIncGstAudPerSet - baseSellPriceExGstAud;
  const currencyRateFromAud = input.currency === "AUD"
    ? 1
    : 1 / WHEEL_PRICING_CONFIG.fxRate;

  const addOns = input.addOns
    .map((id) => WHEEL_ADD_ONS.find((addOn) => addOn.id === id))
    .filter((addOn) => addOn !== undefined)
    .map<AddOnBreakdown>((addOn) => {
      const rrpIncGstAudPerSet = addOn.usdPerWheel === null
        ? null
        : markedUpIncGst(addOn.usdPerWheel * 4 * WHEEL_PRICING_CONFIG.fxRate);
      return {
        id: addOn.id,
        name: addOn.name,
        priceOnRequest: addOn.usdPerWheel === null,
        usdCostPerWheel: addOn.usdPerWheel,
        rrpIncGstAudPerSet,
        displayAmount: rrpIncGstAudPerSet === null
          ? null
          : rrpIncGstAudPerSet * currencyRateFromAud,
      };
    });

  const fixedAddOnsRrpIncGstAud = addOns.reduce(
    (total, addOn) => total + (addOn.rrpIncGstAudPerSet ?? 0),
    0,
  );
  const totalRrpIncGstAudPerSet =
    baseRrpIncGstAudPerSet + fixedAddOnsRrpIncGstAud;
  const totalRrpIncGstAudPerWheel = totalRrpIncGstAudPerSet / 4;

  return {
    currency: input.currency,
    currencyRateFromAud,
    row,
    supplierUsdPerWheel: row.usdPerWheel,
    supplierUsdPerSet,
    convertedWheelCostAud,
    baseShippingAud,
    shippingSurchargeAud,
    shippingAud,
    landedCostAud,
    wheelRrpIncGstAudPerSet,
    shippingRrpIncGstAudPerSet,
    baseSellPriceExGstAud,
    baseGstAud,
    baseRrpIncGstAudPerSet,
    addOns,
    fixedAddOnsRrpIncGstAud,
    hasPriceOnRequestAddOn: addOns.some((addOn) => addOn.priceOnRequest),
    totalRrpIncGstAudPerSet,
    totalRrpIncGstAudPerWheel,
    displayPerSet: totalRrpIncGstAudPerSet * currencyRateFromAud,
    displayPerWheel: totalRrpIncGstAudPerWheel * currencyRateFromAud,
  };
}

export function constructionFromSeries(series: string): Construction | null {
  if (series === "1-Piece Forged") return "monoblock";
  if (series === "2-Piece Forged") return "2pc";
  return null;
}

export type PriceRange = {
  minPerWheel: number;
  maxPerWheel: number;
  minPerSet: number;
  maxPerSet: number;
};

export function priceRangeForSeries(
  series: string,
  minDiameter?: number,
  maxDiameter?: number,
  state: DeliveryState = "OTHER",
): PriceRange | null {
  const construction = constructionFromSeries(series);
  if (!construction) return null;

  const prices = WHEEL_PRICE_ROWS
    .filter((row) => row.construction === construction)
    .filter((row) => minDiameter === undefined || row.diameter >= minDiameter)
    .filter((row) => maxDiameter === undefined || row.diameter <= maxDiameter)
    .map((row) => calculateWheelPricing({
      construction,
      diameter: row.diameter,
      width: row.widthKey,
      addOns: [],
      state,
      currency: "AUD",
    }))
    .filter((price) => price !== null);

  if (prices.length === 0) return null;
  return {
    minPerWheel: Math.min(...prices.map((price) => price.totalRrpIncGstAudPerWheel)),
    maxPerWheel: Math.max(...prices.map((price) => price.totalRrpIncGstAudPerWheel)),
    minPerSet: Math.min(...prices.map((price) => price.totalRrpIncGstAudPerSet)),
    maxPerSet: Math.max(...prices.map((price) => price.totalRrpIncGstAudPerSet)),
  };
}

export function priceForDiameter(
  series: string,
  diameter: number,
  width?: string | number,
  state: DeliveryState = "OTHER",
): number | null {
  const construction = constructionFromSeries(series);
  if (!construction) return null;
  const row = width === undefined
    ? getWidthOptions(construction, diameter)[0]
    : findWheelPriceRow(construction, diameter, width);
  if (!row) return null;
  return calculateWheelPricing({
    construction,
    diameter,
    width: row.widthKey,
    addOns: [],
    state,
    currency: "AUD",
  })?.totalRrpIncGstAudPerWheel ?? null;
}

export function addOnRrpIncGstAudPerSet(id: AddOnId): number | null {
  const addOn = WHEEL_ADD_ONS.find((item) => item.id === id);
  if (!addOn || addOn.usdPerWheel === null) return null;
  return markedUpIncGst(addOn.usdPerWheel * 4 * WHEEL_PRICING_CONFIG.fxRate);
}

export function formatPrice(amount: number, currency: PricingCurrency = "AUD"): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
