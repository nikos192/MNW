import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BurnoutWheel } from "@/components/burnout-wheel";
import { ProductCard } from "@/components/product-card";
import { QuickStartWheelFinder } from "@/components/quick-start-wheel-finder";
import { collectionSummaries } from "@/lib/monza-data";
import { getCatalogData } from "@/lib/catalog";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import styles from "./page.module.css";

const processClips = [
  "/media/custom-machining-process-01.mp4",
  "/media/custom-machining-process-02.mp4",
  "/media/custom-machining-process-03.mp4",
  "/media/custom-machining-process-04.mp4",
];

export const metadata: Metadata = {
  title: "Forged Wheels Australia",
  description:
    "Explore MonzaWheels forged wheel programs, chassis-led fitment guidance, finish options, and quote-ready product detail for Australian builds.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "MonzaWheels | Forged Wheels Australia",
    description:
      "Explore forged wheel programs, compare finishes, and quote fitment around the exact chassis.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "MonzaWheels | Forged Wheels Australia",
    description:
      "Explore forged wheel programs, compare finishes, and quote fitment around the exact chassis.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default async function Home() {
  const { products } = await getCatalogData();

  const monoblockCollection = collectionSummaries.find(
    (collection) => collection.slug === "monoblock",
  );
  const multiPieceCollection = collectionSummaries.find(
    (collection) => collection.slug === "multi-piece",
  );
  const monoblockProduct =
    products.find((product) => monoblockCollection?.handles.includes(product.handle)) ??
    products[0];
  const multiPieceProduct =
    products.find((product) => multiPieceCollection?.handles.includes(product.handle)) ??
    products[products.length - 1] ??
    products[0];
  const featuredProducts = products.slice(0, 4);

  return (
    <main className={styles.page}>
      <section className={styles.hero} data-hero-section>
        <div className={`${styles.heroInner} container`}>
          <div className={styles.heroCopy} data-hero-copy>
            <p className={styles.heroLabel}>MonzaWheels Australia</p>
            <h1 className={styles.heroHeading}>Custom forged wheels, designed in Australia.</h1>
            <p className={styles.heroBody}>
              Choose a wheel line. Send the car. We confirm size, offset, finish,
              price, and lead time.
            </p>

            <div className={styles.heroActions}>
              <QuickStartWheelFinder products={products} />
            </div>
          </div>

          <div className={styles.heroVisual} data-reveal>
            <Image
              alt="BMW M4 Competition with MonzaWheels forged wheels"
              className={styles.heroCar}
              height={1000}
              priority
              sizes="(max-width: 767px) 96vw, 58vw"
              src="/media/new-m4.png"
              width={1600}
            />
          </div>
        </div>
      </section>

      <BurnoutWheel />

      <section className={styles.processSection} aria-labelledby="custom-machining-title">
        <div className={styles.processVideoGrid} data-reveal>
          {processClips.map((clip, index) => (
            <div className={styles.processVideoFrame} key={clip}>
              <video
                aria-label={`Custom machining process clip ${index + 1}`}
                autoPlay
                className={styles.processVideo}
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src={clip} type="video/mp4" />
              </video>
            </div>
          ))}
        </div>

        <div className={styles.processTitleOverlay}>
          <h2 id="custom-machining-title" className={styles.processHeading}>
            Custom machining process
          </h2>
        </div>
      </section>

      <section className={styles.tierSection}>
        <div className={`${styles.tierInner} container`}>
          <div className={styles.tierHeader} data-reveal>
            <h2 className={styles.sectionHeading}>Wheel lines.</h2>
          </div>

          <div className={styles.tierGrid}>
            <article className={styles.tierTile}>
              <Link className={styles.tierLink} href="/collections/monoblock">
                <Image
                  alt="MonzaWheels monoblock forged collection"
                  className={styles.tierImage}
                  height={1200}
                  sizes="(max-width: 767px) 100vw, 50vw"
                  src={monoblockProduct?.images[0]?.url || "/media/hero-wheel-poster.jpg"}
                  width={1800}
                />
                <div className={styles.tierOverlay} />
                <div className={styles.tierMeta}>
                  <h3 className={styles.tierTitle}>
                    {monoblockCollection?.title || "Monoblock"}
                  </h3>
                </div>
              </Link>
            </article>

            <article className={styles.tierTile}>
              <Link className={styles.tierLink} href="/collections/multi-piece">
                <Image
                  alt="MonzaWheels multi-piece forged collection"
                  className={styles.tierImage}
                  height={1200}
                  sizes="(max-width: 767px) 100vw, 50vw"
                  src={multiPieceProduct?.images[0]?.url || "/media/hero-wheel-poster.jpg"}
                  width={1800}
                />
                <div className={styles.tierOverlay} />
                <div className={styles.tierMeta}>
                  <h3 className={styles.tierTitle}>
                    {multiPieceCollection?.title || "Multi-Piece"}
                  </h3>
                </div>
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.featuredSection}>
        <div className={`${styles.featuredInner} container`}>
          <div className={styles.simpleHeader} data-reveal>
            <p className="label">Ready designs</p>
            <h2 className={styles.sectionHeading}>Latest wheels.</h2>
            <Link className={styles.subtleLink} href="/shop">
              View catalogue
            </Link>
          </div>

          <div className={styles.featuredGrid}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
