import type { MetadataRoute } from "next";
import { getCatalogData } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/shop", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/collections/monoblock", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/collections/multi-piece", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/finishes", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/gallery", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/engineering", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/fitment", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/fitment-tool", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/pricing", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/find-a-dealer", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/warranty", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { products } = await getCatalogData();
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path || "/"),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/shop/${product.handle}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
