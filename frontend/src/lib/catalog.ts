import {
  deliveredSets,
  fallbackProducts,
  type CatalogProduct,
  type DeliveredSet,
} from "@/lib/monza-data";

export type CatalogData = {
  products: CatalogProduct[];
  deliveredSets: DeliveredSet[];
};

export async function getCatalogData(): Promise<CatalogData> {
  return {
    products: fallbackProducts,
    deliveredSets,
  };
}

export async function getCatalogProduct(handle: string): Promise<CatalogProduct | null> {
  return fallbackProducts.find((p) => p.handle === handle) ?? null;
}
