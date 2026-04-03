import {
  deliveredSets as fallbackDeliveredSets,
  fallbackProducts,
  type CatalogProduct,
  type DeliveredSet,
  type WheelFinish,
  type WheelSpec,
} from "@/lib/monza-data";
import { hasShopifyStorefrontConfig, shopifyFetch } from "@/lib/shopify";

type ShopifyProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  vendor: string;
  productType: string;
  featuredImage: {
    url: string;
    altText: string | null;
  } | null;
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  options: Array<{
    name: string;
    values: string[];
  }>;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  series: { value: string } | null;
  shortDescription: { value: string } | null;
  leadTime: { value: string } | null;
  construction: { value: string } | null;
  material: { value: string } | null;
  diameterOptions: { value: string } | null;
  widthOptions: { value: string } | null;
  pcdOptions: { value: string } | null;
  offsetRange: { value: string } | null;
  centreBore: { value: string } | null;
  finishOptions: { value: string } | null;
};

type ShopifyProductsQuery = {
  products: {
    edges: Array<{
      node: ShopifyProductNode;
    }>;
  };
};

type ShopifyProductQuery = {
  product: ShopifyProductNode | null;
};

export type CatalogData = {
  products: CatalogProduct[];
  deliveredSets: DeliveredSet[];
  source: "shopify" | "fallback";
};

const PRODUCT_FIELDS = /* GraphQL */ `
  id
  handle
  title
  description
  vendor
  productType
  featuredImage {
    url
    altText
  }
  images(first: 10) {
    edges {
      node {
        url
        altText
      }
    }
  }
  options {
    name
    values
  }
  priceRange {
    minVariantPrice {
      amount
      currencyCode
    }
  }
  series: metafield(namespace: "mnw", key: "series") {
    value
  }
  shortDescription: metafield(namespace: "mnw", key: "short_description") {
    value
  }
  leadTime: metafield(namespace: "mnw", key: "lead_time") {
    value
  }
  construction: metafield(namespace: "mnw", key: "construction") {
    value
  }
  material: metafield(namespace: "mnw", key: "material") {
    value
  }
  diameterOptions: metafield(namespace: "mnw", key: "diameter_options") {
    value
  }
  widthOptions: metafield(namespace: "mnw", key: "width_options") {
    value
  }
  pcdOptions: metafield(namespace: "mnw", key: "pcd_options") {
    value
  }
  offsetRange: metafield(namespace: "mnw", key: "offset_range") {
    value
  }
  centreBore: metafield(namespace: "mnw", key: "centre_bore") {
    value
  }
  finishOptions: metafield(namespace: "mnw", key: "finish_options") {
    value
  }
`;

const PRODUCTS_QUERY = /* GraphQL */ `
  query CatalogProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          ${PRODUCT_FIELDS}
        }
      }
    }
  }
`;

const PRODUCT_QUERY = /* GraphQL */ `
  query CatalogProduct($handle: String!) {
    product(handle: $handle) {
      ${PRODUCT_FIELDS}
    }
  }
`;

function formatMoney(amount: string, currencyCode: string) {
  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return "$4,500";
  }

  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(numericAmount);
}

function parseListValue(value: string | null | undefined) {
  if (!value) {
    return [] as string[];
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item)).filter(Boolean);
    }
  } catch {
    return value
      .split(/\||,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [] as string[];
}

function mapFinishSwatch(name: string) {
  const finishName = name.toLowerCase();

  if (finishName.includes("machine") || finishName.includes("silver") || finishName.includes("clear")) {
    return "#AFAFAD";
  }

  if (finishName.includes("graphite") || finishName.includes("smoke") || finishName.includes("satin")) {
    return "#2A2A2A";
  }

  if (finishName.includes("black")) {
    return "#0F0F0F";
  }

  return "#F5F5F3";
}

function parseFinishOptions(value: string | null | undefined, options: ShopifyProductNode["options"]) {
  if (value) {
    try {
      const parsed = JSON.parse(value) as unknown;

      if (Array.isArray(parsed)) {
        return parsed
          .map((item) => {
            if (typeof item === "string") {
              return { name: item, swatch: mapFinishSwatch(item) } satisfies WheelFinish;
            }

            if (item && typeof item === "object") {
              const record = item as Record<string, unknown>;
              const name = String(record.name ?? record.label ?? "Finish");
              return {
                name,
                swatch: mapFinishSwatch(name),
              } satisfies WheelFinish;
            }

            return null;
          })
          .filter((item): item is WheelFinish => item !== null);
      }
    } catch {
      const listItems = parseListValue(value);
      if (listItems.length) {
        return listItems.map((item) => ({ name: item, swatch: mapFinishSwatch(item) }));
      }
    }
  }

  const finishOption = options.find((option) => option.name.toLowerCase().includes("finish"));

  if (finishOption?.values.length) {
    return finishOption.values.map((item) => ({ name: item, swatch: mapFinishSwatch(item) }));
  }

  return [
    { name: "Satin graphite", swatch: "#2A2A2A" },
    { name: "Brushed clear", swatch: "#AFAFAD" },
    { name: "Gloss black", swatch: "#0F0F0F" },
  ] satisfies WheelFinish[];
}

function buildSpecs(product: ShopifyProductNode) {
  const specs: WheelSpec[] = [
    {
      label: "Construction",
      value: product.construction?.value || "Forged monoblock",
    },
    {
      label: "Material",
      value: product.material?.value || "6061-T6 aluminium billet",
    },
  ];

  const optionalSpecs = [
    { label: "Diameter", value: parseListValue(product.diameterOptions?.value).join(", ") },
    { label: "Width", value: parseListValue(product.widthOptions?.value).join(", ") },
    { label: "PCD", value: parseListValue(product.pcdOptions?.value).join(", ") },
    { label: "Offset", value: product.offsetRange?.value || "" },
    { label: "Centre bore", value: product.centreBore?.value || "" },
  ];

  optionalSpecs.forEach((item) => {
    if (item.value) {
      specs.push(item);
    }
  });

  return specs;
}

function formatDiameterOptions(values: string[]) {
  return values.map((v) => {
    const n = v.trim().replace(/['"]/g, "");
    return n ? `${n}"` : v.trim();
  });
}

function formatWidthOptions(values: string[]) {
  return values.map((v) => {
    const n = v.trim().replace(/['"]/g, "");
    return n ? `${n}"` : v.trim();
  });
}

function mapProduct(node: ShopifyProductNode): CatalogProduct {
  const images = node.images.edges.map((edge) => ({
    url: edge.node.url,
    alt: edge.node.altText || node.title,
  }));

  if (images.length === 0 && node.featuredImage) {
    images.push({
      url: node.featuredImage.url,
      alt: node.featuredImage.altText || node.title,
    });
  }

  const rawDiameters = parseListValue(node.diameterOptions?.value);
  const rawWidths = parseListValue(node.widthOptions?.value);
  const rawPcds = parseListValue(node.pcdOptions?.value);
  const rawCentrebores = parseListValue(node.centreBore?.value);

  const diameterOptions = rawDiameters.length
    ? formatDiameterOptions(rawDiameters)
    : ["19\"", "20\"", "21\""];

  const widthOptions = rawWidths.length
    ? formatWidthOptions(rawWidths)
    : ["9.0\"", "9.5\"", "10.0\"", "10.5\"", "11.0\"", "11.5\""];

  const pcdOptions = rawPcds.length
    ? rawPcds
    : ["5x112", "5x114.3", "5x120"];

  // Centre bore: if Shopify gives a single value (e.g. "72.6") treat it as
  // a label/hint. If it gives a list, show as selectable options.
  const centreboreOptions = rawCentrebores.length
    ? rawCentrebores.map((v) => {
        const n = v.trim().replace(/mm$/i, "");
        return n ? `${n}mm` : v.trim();
      })
    : ["57.1mm", "60.1mm", "66.6mm", "72.6mm", "73.1mm", "74.1mm", "77.0mm"];

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    series: node.series?.value || node.vendor || "Series 01",
    shortDescription:
      node.shortDescription?.value ||
      node.description ||
      "A forged wheel base resolved around the exact chassis, brake package, and finish brief.",
    description:
      node.description ||
      "Built to order around the exact chassis, brake package, ride height, and finish brief.",
    price: formatMoney(node.priceRange.minVariantPrice.amount, node.priceRange.minVariantPrice.currencyCode),
    leadTime: node.leadTime?.value || "8–12 weeks",
    images,
    finishes: parseFinishOptions(node.finishOptions?.value, node.options),
    specs: buildSpecs(node),
    diameterOptions,
    widthOptions,
    pcdOptions,
    offsetRange: node.offsetRange?.value || "Resolved per chassis",
    centreboreOptions,
  };
}

export async function getCatalogData(): Promise<CatalogData> {
  if (!hasShopifyStorefrontConfig()) {
    return {
      products: fallbackProducts,
      deliveredSets: fallbackDeliveredSets,
      source: "fallback",
    };
  }

  try {
    const data = await shopifyFetch<ShopifyProductsQuery>(PRODUCTS_QUERY, { first: 24 });
    const products = data?.products.edges.map((edge) => mapProduct(edge.node)) ?? [];

    if (!products.length) {
      return {
        products: fallbackProducts,
        deliveredSets: fallbackDeliveredSets,
        source: "fallback",
      };
    }

    return {
      products,
      deliveredSets: fallbackDeliveredSets,
      source: "shopify",
    };
  } catch (error) {
    console.error("Failed to load catalog from Shopify:", error);

    return {
      products: fallbackProducts,
      deliveredSets: fallbackDeliveredSets,
      source: "fallback",
    };
  }
}

export async function getCatalogProduct(handle: string) {
  if (!hasShopifyStorefrontConfig()) {
    return fallbackProducts.find((product) => product.handle === handle) ?? null;
  }

  try {
    const data = await shopifyFetch<ShopifyProductQuery>(PRODUCT_QUERY, { handle });

    if (!data?.product) {
      return fallbackProducts.find((product) => product.handle === handle) ?? null;
    }

    return mapProduct(data.product);
  } catch (error) {
    console.error(`Failed to load product ${handle} from Shopify:`, error);
    return fallbackProducts.find((product) => product.handle === handle) ?? null;
  }
}