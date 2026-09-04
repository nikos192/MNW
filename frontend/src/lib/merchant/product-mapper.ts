import type { CatalogProduct } from "../monza-data.ts";
import type { MerchantProductInput } from "./types.ts";

export const MERCHANT_OFFER_PREFIX = "monza-";

export function audToMicros(amount: number): string {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error(
      `AUD price must be a positive finite number; received ${String(amount)}`,
    );
  }
  // Landing pages format AUD to two decimal places. Round to that same visible
  // cent before converting so Merchant never receives hidden sub-cent values.
  const cents = Math.round((amount + Number.EPSILON) * 100);
  return String(cents * 10_000);
}

export function mapProductToMerchant(
  product: CatalogProduct,
  startingSetPriceAud: number,
  siteUrl = "https://www.monzawheels.com.au",
): MerchantProductInput {
  const handle = product.handle?.trim();
  const primaryImage = product.images?.[0]?.url;
  if (
    !handle ||
    !product.title?.trim() ||
    !product.description?.trim() ||
    !primaryImage
  ) {
    throw new Error(
      `Malformed catalogue product ${product.id || "<unknown>"}: handle, title, description and primary image are required`,
    );
  }
  if (!/^https:\/\//.test(siteUrl)) {
    throw new Error("Merchant site URL must use HTTPS");
  }

  const base = siteUrl.replace(/\/$/, "");
  const imageLink = primaryImage.startsWith("http")
    ? primaryImage
    : new URL(primaryImage, `${base}/`).toString();

  return {
    offerId: `${MERCHANT_OFFER_PREFIX}${handle.toLowerCase()}`,
    contentLanguage: "en",
    feedLabel: "AU",
    productAttributes: {
      title: `${product.title} Forged Wheel Set`,
      description: `${product.description} Price is for a set of four wheels and includes GST and standard shipping within Australia.`,
      link: `${base}/shop/${encodeURIComponent(handle)}`,
      imageLink,
      price: {
        amountMicros: audToMicros(startingSetPriceAud),
        currencyCode: "AUD",
      },
      availability: "IN_STOCK",
      condition: "NEW",
      brand: "MonzaWheels",
      identifierExists: false,
    },
  };
}
