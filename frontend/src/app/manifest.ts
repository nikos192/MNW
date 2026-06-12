import type { MetadataRoute } from "next";
import { BRAND_NAME } from "@/lib/brand";
import { DEFAULT_SEO_DESCRIPTION } from "@/lib/seo";

const logoIcon = "/brand/LOGO%20MW%20TP.png";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND_NAME} | Forged Wheels Australia`,
    short_name: BRAND_NAME,
    description: DEFAULT_SEO_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f2f8ff",
    theme_color: "#07111f",
    icons: [
      {
        src: logoIcon,
        sizes: "500x500",
        type: "image/png",
        purpose: "any",
      },
      {
        src: logoIcon,
        sizes: "500x500",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
