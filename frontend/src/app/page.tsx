import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { ConversionLink } from "@/components/conversion-link";
import { ViewportVideo } from "@/components/viewport-video";
import { ResponsiveHeroVideo } from "@/components/responsive-hero-video";
import { OrderJourney } from "@/components/order-journey";
import { FavouritesSection } from "@/components/favourites-section";
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
    "Send MonzaWheels a wheel reference, sketch, or idea for a bespoke forged design engineered around your exact Australian vehicle.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "MonzaWheels | Forged Wheels Australia",
    description:
      "Bring us a wheel reference, sketch, or idea. We develop it as a bespoke forged design engineered around your exact vehicle.",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "MonzaWheels | Forged Wheels Australia",
    description:
      "Bring us a wheel reference, sketch, or idea. We develop it as a bespoke forged design engineered around your exact vehicle.",
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
  const featuredProducts = [...products].reverse().slice(0, 4);

  return (
    <main className={styles.page}>
      <section className={styles.hero} data-hero-section>
        <div className={styles.heroMedia} aria-hidden="true">
          <ResponsiveHeroVideo
            className={styles.heroVideo}
            desktopSrc="/media/monza-hero-desktop.mp4"
            mobileSrc="/media/monza-hero-mobile.mp4"
          />
          <div className={styles.heroVideoOverlay} />
        </div>

        <div className={`${styles.heroInner} container`}>
          <div className={styles.heroCopy} data-hero-copy>
            <p className={styles.heroLabel}>Forged in motion</p>
            <h1 className={styles.heroHeading}>Built to be seen.</h1>
            <p className={styles.heroBody}>
              Bespoke forged wheels, designed around your vision and engineered
              for your exact car.
            </p>

            <div className={styles.heroActions}>
              <ConversionLink
                className="button-primary"
                eventName="CatalogueCtaClick"
                eventSource="homepage_hero"
                href="/shop"
              >
                Shop All Forged Wheels
              </ConversionLink>
              <ConversionLink className="button-outline" eventSource="homepage_hero" href="/contact?design=custom">
                Start A Custom Design
              </ConversionLink>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.shippingBanner} aria-label="Shipping offer">
        <Link className={`${styles.shippingInner} container`} href="/shop">
          <span className={styles.shippingKicker}>Included with every set</span>
          <strong className={styles.shippingHeadline}>Standard shipping included Australia-wide</strong>
          <span className={styles.shippingDetail}>Approx. 40 days transit · after production</span>
          <span className={styles.shippingLink}>Browse wheels <span aria-hidden="true">→</span></span>
        </Link>
      </section>

      <section className={styles.orderSection}>
        <div className="container">
          <OrderJourney />
          <div className={styles.timelineGrid} aria-label="Production and delivery estimates">
            <article><span>One-piece forged</span><strong>Approx. 20 days production</strong><p>Approx. 60 days total with standard shipping · 34 days with express</p></article>
            <article><span>Two-piece forged</span><strong>Approx. 30 days production</strong><p>Approx. 70 days total with standard shipping · 44 days with express</p></article>
            <article><span>Shipping choices</span><strong>Standard included · Express AUD $800</strong><p>Approx. 40 days standard transit · 2 weeks express transit. Shipping is additional to production.</p></article>
          </div>
        </div>
      </section>

      <section className={styles.featuredSection}>
        <div className={`${styles.featuredInner} container`}>
          <div className={styles.simpleHeader} data-reveal>
            <div>
              <p className="label">The collection</p>
              <h2 className={styles.sectionHeading}>Choose your starting point.</h2>
            </div>
            <Link className={styles.subtleLink} href="/shop">
              View all wheels
            </Link>
          </div>

          <div className={styles.featuredGrid}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <FavouritesSection />

      <section className={styles.customDesignSection} aria-labelledby="custom-design-title">
        <div className={`${styles.customDesignInner} container`} data-reveal>
          <div className={styles.customDesignLead}>
            <p className={styles.customDesignLabel}>Beyond the catalogue</p>
            <h2 id="custom-design-title" className={styles.customDesignHeading}>
              Seen a wheel you want? Send it.
            </h2>
          </div>
          <div className={styles.customDesignBody}>
            <p>
              A photo, hand sketch, render, or link is enough to begin. We can
              translate the direction into a one-off monoblock or two-piece
              design, then engineer the diameter, width, offset and brake
              clearance around your vehicle.
            </p>
            <ol className={styles.customDesignSteps}>
              <li><span>01</span>Share the design direction</li>
              <li><span>02</span>We resolve geometry and pricing</li>
              <li><span>03</span>You approve before production</li>
            </ol>
            <ConversionLink className={styles.customDesignLink} eventSource="homepage_custom_section" href="/contact?design=custom">
              Start a custom design quote
            </ConversionLink>
          </div>
        </div>
      </section>

      <section className={styles.processSection} aria-labelledby="custom-machining-title">
        <div className={styles.processVideoGrid} data-reveal>
          {processClips.map((clip, index) => (
            <div className={styles.processVideoFrame} key={clip}>
              <ViewportVideo
                ariaLabel={`Custom machining process clip ${index + 1}`}
                className={styles.processVideo}
                src={clip}
              />
            </div>
          ))}
        </div>

        <div className={styles.processTitleOverlay}>
          <p className={styles.processLabel}>In production</p>
          <h2 id="custom-machining-title" className={styles.processHeading}>
            From reference to forged reality.
          </h2>
        </div>
      </section>

      <section className={styles.tierSection}>
        <div className={`${styles.tierInner} container`}>
          <div className={styles.tierHeader} data-reveal>
            <p className="label">Wheel lines</p>
            <h2 className={styles.sectionHeading}>Choose the construction. We resolve the geometry.</h2>
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
                  <p className={styles.tierDescription}>One forged piece · lighter, clean construction · approx. 20 days production</p>
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
                  <p className={styles.tierDescription}>Forged centre and separate barrel · greater finish and lip flexibility · approx. 30 days production</p>
                </div>
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.trustSection}>
        <div className={`${styles.trustInner} container`}>
          <div className={styles.trustHeading}>
            <p className="label">Confidence before production</p>
            <h2 className={styles.sectionHeading}>Approved before a billet is cut.</h2>
            <p>
              The final design, fitment, delivered price and production timing are
              reviewed with you before full payment and machining.
            </p>
          </div>
          <div className={styles.trustGrid}>
            <article><span>01</span><h3>Chassis-specific fitment</h3><p>Offset, bore, brake clearance and width are confirmed around the exact car.</p></article>
            <article><span>02</span><h3>Design approval</h3><p>You approve the final drawing or render before the production order begins.</p></article>
            <article><span>03</span><h3>Verified construction</h3><p>6061-T6 forged aluminium with published fatigue and impact testing standards.</p></article>
            <article><span>04</span><h3>Five-year coverage</h3><p>Structural and finish manufacturing defects are covered under the published warranty.</p></article>
          </div>
          <div className={styles.trustLinks}>
            <Link href="/engineering">Review engineering standards</Link>
            <Link href="/warranty">Read the warranty</Link>
            <Link href="/custom-forged-wheels">See how custom design works</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
