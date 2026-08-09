import type { Metadata } from "next";
import Link from "next/link";
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

      <section className={styles.customSection}>
        <div className="container">
          <div className={styles.customPanel}>
            <div>
              <p className="label">Custom design program</p>
              <h2 className={styles.customTitle}>Can&apos;t find what you&apos;re looking for?</h2>
              <p className={styles.customCopy}>
                Start with a sketch, reference or idea. We can develop a one-off
                forged wheel around your vehicle, fitment and finish direction.
              </p>
            </div>
            <Link className="button-outline" href="/contact?design=custom">
              Start a custom enquiry
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
