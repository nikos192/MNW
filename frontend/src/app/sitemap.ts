import type { MetadataRoute } from "next";
import { getCatalogData } from "@/lib/catalog";

function siteUrl() {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL ?? "http://localhost:3000";
  return /^https?:\/\//i.test(configured) ? configured : `https://${configured}`;
}

const staticRoutes = [
  "",
  "/shop",
  "/collections/monoblock",
  "/collections/multi-piece",
  "/finishes",
  "/gallery",
  "/engineering",
  "/fitment",
  "/fitment-tool",
  "/about",
  "/find-a-dealer",
  "/warranty",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const { products } = await getCatalogData();
  const now = new Date();

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
    })),
    ...products.map((product) => ({
      url: `${base}/shop/${product.handle}`,
      lastModified: now,
    })),
  ];
}
