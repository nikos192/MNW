import Link from "next/link";
import { DesignBaseCard } from "@/components/design-base-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDesignLibraryData } from "@/lib/design-library";
import styles from "./page.module.css";

export default async function DesignLibraryPage() {
  const { designBases, source } = await getDesignLibraryData();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.texture} aria-hidden="true" />
        <SiteHeader />

        <div className={styles.heroContent}>
          <div className={styles.copy}>
            <span className={styles.kicker}>Design Library</span>
            <h1>Design bases, not pretend inventory.</h1>
            <p>
              Each wheel here is a design reference that can be tailored into a
              specific build. The right way to read the library is: face first,
              then fitment, finish, hardware, and final stance around the car.
            </p>
          </div>

          <div className={styles.sidePanel}>
            <div className={styles.sideMetric}>
              <strong>Use cases</strong>
              <span>Luxury street, track, staggered, show build</span>
            </div>
            <div className={styles.sideMetric}>
              <strong>Variables</strong>
              <span>Diameter, width, offset, bore, finish, hardware</span>
            </div>
            <div className={styles.sideMetric}>
              <strong>Next action</strong>
              <span>Choose a design direction, then open a build brief</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.kicker}>Current Range</span>
            <h2>Choose the face that feels closest.</h2>
          </div>
          <div className={styles.sectionMeta}>
            <p>
              You do not need to find a perfect stock match. The point is to
              pick the right design language, then lock the engineering around
              the vehicle.
            </p>
            <div className={styles.dataStatus}>
              {source === "shopify"
                ? "Live from Shopify Storefront API"
                : "Fallback design-library content"}
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {designBases.map((item, index) => (
            <DesignBaseCard
              key={item.name}
              item={item}
              tone={((index % 3) + 1) as 1 | 2 | 3}
              ctaHref="/build"
              ctaLabel="Use this as the base"
            />
          ))}
        </div>
      </section>

      <section className={styles.bridge}>
        <div className={styles.bridgePanel}>
          <div>
            <span className={styles.kicker}>What happens next</span>
            <h2>Once you have the right face, the project gets specific.</h2>
            <p>
              The build brief should narrow in on the exact car, braking
              package, ride height, intended finish, and any reference images
              or stance direction. That is where the wheel stops being a design
              reference and becomes a real set.
            </p>
          </div>
          <div className={styles.bridgeActions}>
            <Link className={styles.primaryCta} href="/build">
              Open Build Brief
            </Link>
            <Link className={styles.secondaryCta} href="/">
              Back to overview
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
