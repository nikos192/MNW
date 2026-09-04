import { fallbackProducts } from "@/lib/monza-data";
import { priceRangeForSeries } from "@/lib/wheel-pricing";
import { mapProductToMerchant } from "@/lib/merchant/product-mapper";
import type { MerchantProductInput } from "@/lib/merchant/types";

export function buildMerchantCatalogue(
  siteUrl = "https://www.monzawheels.com.au",
): MerchantProductInput[] {
  const offers = fallbackProducts.map((product) => {
    const price = priceRangeForSeries(product.series)?.minPerSet;
    if (price === undefined) {
      throw new Error(
        `No landing-page price is configured for ${product.handle}`,
      );
    }
    return mapProductToMerchant(product, price, siteUrl);
  });

  const offerIds = new Set<string>();
  for (const offer of offers) {
    if (offerIds.has(offer.offerId))
      throw new Error(`Duplicate Merchant offer ID: ${offer.offerId}`);
    offerIds.add(offer.offerId);
  }
  return offers;
}
