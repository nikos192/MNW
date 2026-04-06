import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { GallerySwitcher } from "@/components/gallery-switcher";
import { collectionSummaries } from "@/lib/monza-data";
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
  const finishCount = monoblockProduct?.finishes.length ?? products[0]?.finishes.length ?? 24;

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
          <div className={styles.heroCopy} data-hero-copy>
            <p className={styles.heroLabel}>Forged Wheel Programs</p>
            <h1 className={styles.heroHeading}>
              Built around the car, not pulled from a shelf.
            </h1>
            <p className={styles.heroBody}>
              MonzaWheels machines forged wheels to order for the exact chassis, brake package, and finish brief.
              Browse the design range, compare fitment, and request a quote without losing the bespoke process.
            </p>

            <div className={styles.heroActions}>
              <Link className="button-primary" href="/shop">
                Explore the Range
              </Link>
              <Link className="button-outline-dark" href="/fitment-tool">
                Compare Fitment
              </Link>
            </div>

            <div className={styles.heroFacts}>
              <div className={styles.heroFact}>
                <span className={styles.heroFactValue}>{products.length}</span>
                <span className={styles.heroFactLabel}>forged wheel families</span>
              </div>
              <div className={styles.heroFact}>
                <span className={styles.heroFactValue}>{finishCount}+</span>
                <span className={styles.heroFactLabel}>finish directions</span>
              </div>
              <div className={styles.heroFact}>
                <span className={styles.heroFactValue}>{deliveredSets.length}</span>
                <span className={styles.heroFactLabel}>reference builds mapped</span>
              </div>
            </div>
          </div>

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
              alt="MonzaWheels forged wheel detail"
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
              Every MonzaWheels wheel begins as a single billet of 6061-T6 aluminium.
              What separates them is the finish.
            </p>
          </div>

          <div className={styles.tierGrid}>
            <Link className={styles.tierTile} href="/collections/monoblock">
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
                <p className={styles.tierLabel}>{monoblockCollection?.label || "Forged Series"}</p>
                <h3 className={styles.tierTitle}>{monoblockCollection?.title || "Monoblock"}</h3>
                <p className={styles.tierPrice}>
                  From AUD {monoblockProduct?.price.replace(/^[^\d]+/, "") || "4,500"}
                </p>
              </div>
            </Link>

            <Link className={styles.tierTile} href="/collections/multi-piece">
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
            <div className={styles.galleryTitleWrap}>
              <h2 className={styles.galleryHeading}>Gallery</h2>
              <p className={styles.galleryCopy}>
                See the range by delivered chassis or by wheel face. Where photography is still coming in, we show the fitment brief instead of leaving dead space.
              </p>
            </div>
          </div>

          <GallerySwitcher deliveredSets={deliveredSets} products={products} />
        </div>
      </section>
    </main>
  );
}
