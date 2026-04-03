import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { GallerySwitcher } from "@/components/gallery-switcher";
import { collectionSummaries } from "@/lib/mnw-data";
import { getCatalogData } from "@/lib/catalog";
import styles from "./page.module.css";

export default async function Home() {
  const { deliveredSets, products } = await getCatalogData();

  const monoblockCollection = collectionSummaries.find((collection) => collection.slug === "monoblock");
  const multiPieceCollection = collectionSummaries.find((collection) => collection.slug === "multi-piece");
  const monoblockProduct =
    products.find((product) => monoblockCollection?.handles.includes(product.handle)) ?? products[0];
  const multiPieceProduct =
    products.find((product) => multiPieceCollection?.handles.includes(product.handle)) ??
    products[products.length - 1] ??
    products[0];

  return (
    <main className={styles.page}>
      <section className={styles.hero} data-hero-section>
        <video
          autoPlay
          className={styles.heroVideo}
          loop
          muted
          playsInline
          poster="/media/hero-wheel-poster.jpg"
          preload="metadata"
        >
          <source src="/media/hero-wheel.mp4" type="video/mp4" />
        </video>
        <div className={styles.heroOverlay} />

        <div className={`${styles.heroInner} container`}>
          <div className={styles.heroCue}>
            <span className={styles.heroCueLine} />
            <ChevronDown size={16} strokeWidth={1.5} />
            <span className="visually-hidden">Scroll to explore the homepage</span>
          </div>
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={`${styles.storyGrid} container`}>
          <div className={styles.storyCopy} data-reveal>
            <p className="label">Our Process</p>
            <h1 className={styles.storyHeading}>
              <span>Forged in Australia.</span>
              <span>Engineered for Europe.</span>
            </h1>
            <Link className={styles.editorialLink} href="/engineering">
              How we build them →
            </Link>
          </div>

          <div className={styles.storyMedia} data-reveal>
            <Image
              alt="MNW forged wheel detail"
              className={styles.storyImage}
              height={1200}
              priority
              sizes="(max-width: 767px) 100vw, 50vw"
              src="/media/hero-wheel-poster.jpg"
              width={1600}
            />
          </div>
        </div>
      </section>

      <section className={styles.tierSection}>
        <div className={`${styles.tierInner} container`}>
          <div className={styles.tierHeader} data-reveal>
            <h2 className={styles.sectionHeading}>Two lines. One standard.</h2>
            <p className={styles.sectionBody}>
              Every MNW wheel begins as a single billet of 6061-T6 aluminium.
              What separates them is the finish.
            </p>
          </div>

          <div className={styles.tierGrid}>
            <Link className={styles.tierTile} href="/collections/monoblock">
              <Image
                alt="MNW monoblock forged collection"
                className={styles.tierImage}
                height={1200}
                sizes="(max-width: 767px) 100vw, 50vw"
                src={monoblockProduct?.images[0]?.url || "/media/hero-wheel-poster.jpg"}
                width={1800}
              />
              <div className={styles.tierOverlay} />
              <div className={styles.tierMeta}>
                <p className={styles.tierLabel}>{monoblockCollection?.label || "Forged Series"}</p>
                <h3 className={styles.tierTitle}>{monoblockCollection?.title || "Monoblock"}</h3>
                <p className={styles.tierPrice}>
                  From AUD {monoblockProduct?.price.replace(/^[^\d]+/, "") || "4,500"}
                </p>
              </div>
            </Link>

            <Link className={styles.tierTile} href="/collections/multi-piece">
              <Image
                alt="MNW multi-piece forged collection"
                className={styles.tierImage}
                height={1200}
                sizes="(max-width: 767px) 100vw, 50vw"
                src={multiPieceProduct?.images[0]?.url || "/media/hero-wheel-poster.jpg"}
                width={1800}
              />
              <div className={styles.tierOverlay} />
              <div className={styles.tierMeta}>
                <p className={styles.tierLabel}>{multiPieceCollection?.label || "Forged Series"}</p>
                <h3 className={styles.tierTitle}>{multiPieceCollection?.title || "Multi-Piece"}</h3>
                <p className={styles.tierPrice}>
                  From AUD {multiPieceProduct?.price.replace(/^[^\d]+/, "") || "5,200"}
                </p>
              </div>
            </Link>
          </div>

          <div className={styles.tierAction} data-reveal>
            <Link className="button-outline" href="/shop">
              Explore all wheels
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.gallerySection}>
        <div className={`${styles.galleryInner} container`}>
          <div className={styles.galleryHeader} data-reveal>
            <h2 className={styles.galleryHeading}>Gallery</h2>
          </div>

          <GallerySwitcher deliveredSets={deliveredSets} products={products} />
        </div>
      </section>
    </main>
  );
}
