import { BRAND_EMAIL, BRAND_FACEBOOK_URL, BRAND_INSTAGRAM_URL, BRAND_LEGAL_NAME, BRAND_NAME } from "@/lib/brand";
import { priceRangeForSeries, type CatalogProduct } from "@/lib/monza-data";

const CANONICAL_PRODUCTION_HOST = "www.monzawheels.com.au";
const CANONICAL_PRODUCTION_URL = `https://${CANONICAL_PRODUCTION_HOST}`;
const DEFAULT_LOCAL_SITE_URL = "http://localhost:3000";

export const DEFAULT_SEO_DESCRIPTION =
  "Premium forged wheels with fitment, offset, finish, assembly, and testing resolved around the exact chassis in Australia.";

export const DEFAULT_OG_IMAGE = {
  url: "/media/hero-wheel-poster.jpg",
  width: 1600,
  height: 900,
  alt: `${BRAND_NAME} forged wheels`,
} as const;

export function normalizedSiteUrl() {
  const explicitSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelUrl = process.env.VERCEL_URL?.trim();
  const configuredSiteUrl =
    explicitSiteUrl ||
    (process.env.VERCEL_ENV === "production" ? CANONICAL_PRODUCTION_URL : vercelUrl) ||
    (process.env.NODE_ENV === "production" ? CANONICAL_PRODUCTION_URL : DEFAULT_LOCAL_SITE_URL);
  const absoluteSiteUrl = /^https?:\/\//i.test(configuredSiteUrl)
    ? configuredSiteUrl
    : `https://${configuredSiteUrl}`;
  const url = new URL(absoluteSiteUrl);

  if (url.hostname === "monzawheels.com.au") {
    url.hostname = CANONICAL_PRODUCTION_HOST;
  }

  url.pathname = "";
  url.search = "";
  url.hash = "";

  return url.toString().replace(/\/$/, "");
}

export function resolveMetadataBase(): URL {
  return new URL(normalizedSiteUrl());
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, resolveMetadataBase()).toString();
}

export function jsonLd(data: Record<string, unknown>) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    legalName: BRAND_LEGAL_NAME,
    url: absoluteUrl("/"),
    email: BRAND_EMAIL,
    sameAs: [BRAND_INSTAGRAM_URL, BRAND_FACEBOOK_URL],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: BRAND_EMAIL,
        areaServed: "AU",
        availableLanguage: "en",
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    url: absoluteUrl("/"),
    description: DEFAULT_SEO_DESCRIPTION,
    inLanguage: "en-AU",
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productJsonLd(product: CatalogProduct) {
  const priceRange = priceRangeForSeries(product.series);
  const productUrl = absoluteUrl(`/shop/${product.handle}`);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    productID: product.id,
    sku: product.handle,
    name: product.title,
    description: product.description,
    image: product.images.map((image) => absoluteUrl(image.url)),
    url: productUrl,
    brand: {
      "@type": "Brand",
      name: BRAND_NAME,
    },
    category: product.series,
    material: "6061-T6 aluminium",
    offers: priceRange
      ? {
          "@type": "AggregateOffer",
          priceCurrency: "AUD",
          lowPrice: priceRange.minPerSet,
          highPrice: priceRange.maxPerSet,
          offerCount: product.diameterOptions.length,
          availability: "https://schema.org/PreOrder",
          itemCondition: "https://schema.org/NewCondition",
          url: productUrl,
        }
      : undefined,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Diameter options",
        value: product.diameterOptions.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: "Width options",
        value: product.widthOptions.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: "PCD options",
        value: product.pcdOptions.join(", "),
      },
      {
        "@type": "PropertyValue",
        name: "Offset range",
        value: product.offsetRange,
      },
      {
        "@type": "PropertyValue",
        name: "Lead time",
        value: product.leadTime,
      },
    ],
  };
}
