import Link from "next/link";
import { DesignBaseCard } from "@/components/design-base-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDesignLibraryData } from "@/lib/design-library";
import styles from "./page.module.css";

export default async function DesignLibraryPage() {
  const { designBases } = await getDesignLibraryData();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.texture} aria-hidden="true" />
        <SiteHeader />

        <div className={styles.heroContent}>
          <div className={styles.copy}>
            <span className={styles.kicker}>Wheel Range</span>
            <h1>Choose the design that suits the car.</h1>
            <p>
              Start with the wheel face that feels right, then tailor the final
              fitment, brake clearance, finish, and hardware around the build.
            </p>
          </div>

          <div className={styles.sidePanel}>
            <div className={styles.sideMetric}>
              <strong>Built to order</strong>
              <span>Designed around the chassis, not pulled from fixed inventory.</span>
            </div>
            <div className={styles.sideMetric}>
              <strong>Fitment led</strong>
              <span>Diameter, width, offset, and centre bore resolved per vehicle.</span>
            </div>
            <div className={styles.sideMetric}>
              <strong>Finish focused</strong>
              <span>Brushed, machined, painted, or custom finishes to suit the brief.</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.sectionHead}>
          <div>
            <span className={styles.kicker}>Current Range</span>
            <h2>Pick the direction, then we refine the details.</h2>
          </div>
          <div className={styles.sectionMeta}>
            <p>
              You do not need a perfect off-the-shelf match. The goal is to
              choose the right design language first, then finalise the
              engineering around the car.
            </p>
          </div>
        </div>

        <div className={styles.grid}>
          {designBases.map((item, index) => (
            <DesignBaseCard
              key={item.name}
              item={item}
              tone={((index % 3) + 1) as 1 | 2 | 3}
              ctaHref="/build"
              ctaLabel="Build a set from this"
            />
          ))}
        </div>
      </section>

      <section className={styles.bridge}>
        <div className={styles.bridgePanel}>
          <div>
            <span className={styles.kicker}>Next Step</span>
            <h2>Once the face is right, the rest gets specific.</h2>
            <p>
              Share the exact car, braking package, ride height, finish
              direction, and any reference imagery so the set is built with the
              right proportions from the beginning.
            </p>
          </div>
          <div className={styles.bridgeActions}>
            <Link className={styles.primaryCta} href="/build">
              Open Build Brief
            </Link>
            <Link className={styles.secondaryCta} href="/">
              Back to home
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
