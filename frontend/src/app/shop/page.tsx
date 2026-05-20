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
  const monoblockCount = products.filter((product) => product.series === "1-Piece Forged").length;
  const multiPieceCount = products.filter((product) => product.series === "2-Piece Forged").length;
  const finishCount = products[0]?.finishes.length ?? 24;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.heroInner} container`}>
          <div className={styles.heroCopy}>
            <p className="label">Collection</p>
            <h1 className={styles.title}>
              Choose the base. We spec the wheel around the car.
            </h1>
            <p className={styles.copy}>
              Every entry here is a forged design direction. Final diameter,
              width, offset, finish, and brake clearance are confirmed after the
              brief.
            </p>
          </div>

          <div className={styles.heroMeta}>
            <div className={styles.heroMetric}>
              <span className={styles.heroMetricValue}>{monoblockCount}</span>
              <span className={styles.heroMetricLabel}>monoblock faces</span>
            </div>
            <div className={styles.heroMetric}>
              <span className={styles.heroMetricValue}>{multiPieceCount}</span>
              <span className={styles.heroMetricLabel}>multi-piece faces</span>
            </div>
            <div className={styles.heroMetric}>
              <span className={styles.heroMetricValue}>{finishCount}+</span>
              <span className={styles.heroMetricLabel}>finish directions</span>
            </div>
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
