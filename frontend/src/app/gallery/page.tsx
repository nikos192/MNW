import Link from "next/link";
import { GallerySwitcher } from "@/components/gallery-switcher";
import { getCatalogData } from "@/lib/catalog";
import styles from "../page-shell.module.css";

export const metadata = {
  title: "Gallery",
  description:
    "Browse MNW builds by vehicle and wheel model, with placeholders preserved where gallery assets are still being assembled.",
};

export default async function GalleryPage() {
  const { deliveredSets, products } = await getCatalogData();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.heroInner} container`}>
          <p className="label">Gallery</p>
          <h1 className={styles.heroTitle}>Completed cars, resolved fitment, and finish programs.</h1>
          <p className={styles.heroCopy}>
            Browse builds by vehicle or wheel face. Where imagery is still
            being assembled, placeholders stay in place rather than faking a
            gallery.
          </p>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="container">
          <GallerySwitcher deliveredSets={deliveredSets} products={products} />
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={`${styles.ctaPanel} container`}>
          <div>
            <p className="label">Need the exact fitment?</p>
            <h2 className={styles.sectionTitle}>Start with the car and we’ll resolve the rest.</h2>
          </div>
          <Link className="button-outline" href="/contact">
            Request a Quote
          </Link>
        </div>
      </section>
    </main>
  );
}