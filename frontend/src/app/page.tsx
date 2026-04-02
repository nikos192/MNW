import Image from "next/image";
import Link from "next/link";
import { DeliveredSetCard } from "@/components/delivered-set-card";
import { ProductCard } from "@/components/product-card";
import { VehicleConfigurator } from "@/components/vehicle-configurator";
import { getCatalogData } from "@/lib/catalog";
import styles from "./page.module.css";

export default async function Home() {
  const { products, deliveredSets } = await getCatalogData();
  const heroProduct = products[0];

  return (
    <main className={styles.page}>
      <section className={styles.hero} data-hero-section>
        <div className={styles.heroMedia} aria-hidden="true">
          <div className={styles.heroMediaShade} />
          <div className={styles.heroMediaGrain} />
        </div>

        <div className={`${styles.heroInner} container`}>
          <div className={styles.heroCopy} data-hero-copy>
            <p className={`label ${styles.eyebrow}`}>Forged wheel systems</p>
            <h1 className={styles.heroTitle}>
              <span>Forged.</span>
              <span>Not cast.</span>
            </h1>
            <p className={styles.heroText}>
              Built around the exact chassis, brake package, ride height, and
              finish brief. This is a quote-first product, not a generic cart.
            </p>
          </div>

          <div className={styles.heroStage}>
            <div className={styles.heroStageGlow} aria-hidden="true" />
            <div className={styles.heroStageViewport}>
              <video
                className={styles.heroVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/media/hero-wheel-poster.jpg"
              >
                <source src="/media/hero-wheel.mp4" type="video/mp4" />
              </video>
              <div className={styles.heroVideoShade} aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={`${styles.introGrid} container`}>
          <div className={styles.introCopy} data-reveal>
            <p className={`label ${styles.darkLabel}`}>Product</p>
            <h2 className={styles.darkHeading}>
              Premium forged wheels, resolved through fitment first.
            </h2>
            <p className={styles.darkText}>
              The catalogue gives you the design base. Final diameter, width,
              offset, and finish are confirmed only after the car is known.
            </p>
            <div className={styles.introMeta}>
              <div>
                <span className={styles.metaLabel}>Process</span>
                <p>Quote, approval, machining, finishing, delivery.</p>
              </div>
              <div>
                <span className={styles.metaLabel}>Lead time</span>
                <p>{heroProduct?.leadTime || "8–12 weeks"}</p>
              </div>
            </div>
            <Link className="button-outline-dark" href="/shop">
              Explore the collection
            </Link>
          </div>

          <div className={styles.introMedia} data-reveal>
            {heroProduct?.images[0] ? (
              <Image
                alt={heroProduct.images[0].alt}
                className={styles.introImage}
                src={heroProduct.images[0].url}
                sizes="(max-width: 1024px) 100vw, 50vw"
                width={1400}
                height={1400}
              />
            ) : (
              <div className={styles.introPlaceholder} aria-hidden="true" />
            )}
          </div>
        </div>
      </section>

      <section className={`${styles.featuredSection} page-section`}>
        <div className="container">
          <div className={styles.sectionIntro} data-reveal>
            <p className="label">Collection</p>
            <h2 className={styles.sectionHeading}>Choose the face. We resolve the rest.</h2>
            <p className={styles.sectionText}>
              A forged range built to be quoted around the vehicle rather than
              sold as fixed stock.
            </p>
          </div>

          <div className={styles.productGrid}>
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.configuratorSection} page-section`}>
        <div className="container">
          <VehicleConfigurator />
        </div>
      </section>

      <section className={`${styles.gallerySection} page-section`}>
        <div className="container">
          <div className={styles.sectionIntro} data-reveal>
            <p className="label">Delivered sets</p>
            <h2 className={styles.sectionHeading}>
              Real cars. Real fitment. Real finish programs.
            </h2>
            <p className={styles.sectionText}>
              The gallery grows through completed builds rather than stock-photo
              moodboards.
            </p>
          </div>

          <div className={styles.galleryGrid}>
            {deliveredSets.map((item) => (
              <DeliveredSetCard key={item.chassis} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.quoteSection}>
        <div className={`${styles.quoteGrid} container`}>
          <div className={styles.quoteCopy} data-reveal>
            <p className={`label ${styles.darkLabel}`}>Quote</p>
            <h2 className={styles.darkHeading}>No checkout theatre. Start with the right brief.</h2>
            <p className={styles.darkText}>
              If you know the car and the direction, we can quote the correct
              wheel program from there.
            </p>
          </div>

          <div className={styles.quoteAction} data-reveal>
            <Link className="button-outline-dark" href="/contact">
              Request a quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
