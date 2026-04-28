import type { MetadataRoute } from "next";

function siteUrl() {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL ?? "http://localhost:3000";
  return /^https?:\/\//i.test(configured) ? configured : `https://${configured}`;
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
