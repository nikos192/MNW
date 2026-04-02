import {
  designBases as fallbackDesignBases,
  deliveredSets as fallbackDeliveredSets,
  type DeliveredSet,
  type DesignBase,
} from "@/lib/mnw-data";
import { hasShopifyStorefrontConfig, shopifyFetch } from "@/lib/shopify";

type ShopifyProductsQuery = {
  products: {
    edges: Array<{
      node: {
        id: string;
        handle: string;
        title: string;
        description: string;
        productType: string;
        tags: string[];
        featuredImage: {
          url: string;
          altText: string | null;
        } | null;
        priceRange: {
          minVariantPrice: {
            amount: string;
            currencyCode: string;
          };
        };
        fitmentFocus: { value: string } | null;
        finishDirection: { value: string } | null;
        designProfile: { value: string } | null;
      };
    }>;
  };
};

const PRODUCTS_QUERY = /* GraphQL */ `
  query DesignLibraryProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          productType
          tags
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          fitmentFocus: metafield(namespace: "mnw", key: "fitment_focus") {
            value
          }
          finishDirection: metafield(namespace: "mnw", key: "finish_direction") {
            value
          }
          designProfile: metafield(namespace: "mnw", key: "design_profile") {
            value
          }
        }
      }
    }
  }
`;

export type DesignLibraryItem = DesignBase & {
  handle?: string;
  imageUrl?: string;
  price?: string;
  source: "shopify" | "fallback";
};

export type DesignLibraryData = {
  designBases: DesignLibraryItem[];
  deliveredSets: DeliveredSet[];
  source: "shopify" | "fallback";
};

function formatMoney(amount: string, currencyCode: string) {
  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return undefined;
  }

  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(numericAmount);
}

function mapShopifyProductToDesignBase(
  product: ShopifyProductsQuery["products"]["edges"][number]["node"],
): DesignLibraryItem {
  return {
    name: product.title,
    profile: product.designProfile?.value || product.productType || "Custom wheel design base",
    note:
      product.description ||
      "Use this product as a starting point, then tailor fitment and finish around the vehicle.",
    description:
      product.description ||
      "This design can be adapted into a custom build once fitment and finish direction are confirmed.",
    fitmentFocus:
      product.fitmentFocus?.value ||
      "Fitment details to be resolved around the chassis and brake package.",
    finishDirection:
      product.finishDirection?.value ||
      "Finish program to be confirmed during the build brief.",
    handle: product.handle,
    imageUrl: product.featuredImage?.url,
    price: formatMoney(
      product.priceRange.minVariantPrice.amount,
      product.priceRange.minVariantPrice.currencyCode,
    ),
    source: "shopify",
  };
}

export async function getDesignLibraryData(): Promise<DesignLibraryData> {
  if (!hasShopifyStorefrontConfig()) {
    return {
      designBases: fallbackDesignBases.map((item) => ({ ...item, source: "fallback" as const })),
      deliveredSets: fallbackDeliveredSets,
      source: "fallback",
    };
  }

  try {
    const data = await shopifyFetch<ShopifyProductsQuery>(PRODUCTS_QUERY, {
      first: 12,
    });

    const products = data?.products.edges.map((edge) => edge.node) ?? [];

    if (products.length === 0) {
      return {
        designBases: fallbackDesignBases.map((item) => ({ ...item, source: "fallback" as const })),
        deliveredSets: fallbackDeliveredSets,
        source: "fallback",
      };
    }

    return {
      designBases: products.map(mapShopifyProductToDesignBase),
      deliveredSets: fallbackDeliveredSets,
      source: "shopify",
    };
  } catch (error) {
    console.error("Failed to load design library from Shopify:", error);

    return {
      designBases: fallbackDesignBases.map((item) => ({ ...item, source: "fallback" as const })),
      deliveredSets: fallbackDeliveredSets,
      source: "fallback",
    };
  }
}
