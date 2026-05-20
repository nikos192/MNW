import { BRAND_EMAIL, BRAND_FACEBOOK_URL, BRAND_INSTAGRAM_URL, BRAND_LEGAL_NAME, BRAND_NAME } from "@/lib/brand";
import type { CatalogProduct } from "@/lib/monza-data";

const DEFAULT_SITE_URL = "http://localhost:3000";

export const DEFAULT_SEO_DESCRIPTION =
  "Premium forged wheels with fitment, offset, finish, assembly, and testing resolved around the exact chassis in Australia.";

export const DEFAULT_OG_IMAGE = {
  url: "/media/hero-wheel-poster.jpg",
  width: 1600,
  height: 900,
  alt: `${BRAND_NAME} forged wheels`,
} as const;

function normalizedSiteUrl() {
  const configuredSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL ?? DEFAULT_SITE_URL;

  return /^https?:\/\//i.test(configuredSiteUrl)
    ? configuredSiteUrl
    : `https://${configuredSiteUrl}`;
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

export function productJsonLd(product: CatalogProduct) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    productID: product.id,
    sku: product.handle,
    name: product.title,
    description: product.description,
    image: product.images.map((image) => absoluteUrl(image.url)),
    url: absoluteUrl(`/shop/${product.handle}`),
    brand: {
      "@type": "Brand",
      name: BRAND_NAME,
    },
    category: product.series,
    material: "6061-T6 aluminium",
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