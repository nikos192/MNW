import type { Metadata } from "next";
import { getCatalogData } from "@/lib/catalog";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import { ShopFilter } from "./shop-filter";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse the MonzaWheels forged wheel range. Final fitment and finish are quoted around the exact vehicle.",
  alternates: {
    canonical: "/shop",
  },
  openGraph: {
    type: "website",
    url: "/shop",
    title: "Shop Forged Wheels | MonzaWheels",
    description:
      "Browse forged wheel designs, compare series, and request a chassis-led quote for your exact build.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop Forged Wheels | MonzaWheels",
    description:
      "Browse forged wheel designs, compare series, and request a chassis-led quote for your exact build.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default async function ShopPage() {
  const { products } = await getCatalogData();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.heroInner} container`}>
          <div className={styles.heroCopy}>
            <p className="label">Catalogue</p>
            <h1 className={styles.title}>Forged wheel designs.</h1>
          </div>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className="container">
          <ShopFilter products={products} />
        </div>
      </section>
    </main>
  );
}
