import Link from "next/link";
import { DesignBaseCard } from "@/components/design-base-card";
import { DeliveredSetCard } from "@/components/delivered-set-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDesignLibraryData } from "@/lib/design-library";
import { processSteps } from "@/lib/mnw-data";
import styles from "./page.module.css";

export default async function Home() {
  const { designBases, deliveredSets } = await getDesignLibraryData();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroTexture} aria-hidden="true" />
        <SiteHeader />

        <div className={styles.heroGrid}>
          <div className={styles.heroStage}>
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
            <div className={styles.heroVideoGlow} aria-hidden="true" />

            <div className={styles.heroStageBottom}>
              <span className={styles.heroStageEyebrow}>Cold forged monoblock</span>
            </div>
          </div>

          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>
              <span>Custom.</span>
              <span>By chassis.</span>
            </h1>
            <p className={styles.heroDescription}>
              Every MNW set starts with the right wheel face, then gets machined
              around your exact fitment, brake package, finish direction, and
              intended use.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryCta} href="/build">
                Start Your Build
              </Link>
              <Link className={styles.secondaryCta} href="/design-library">
                Explore Design Bases
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.heroRail}>
          <div>
            <strong>Face first</strong>
            <span>Use products as design bases, not locked SKUs.</span>
          </div>
          <div>
            <strong>Exact fitment</strong>
            <span>Width, offset, bore, and brake clearance locked per chassis.</span>
          </div>
          <div>
            <strong>Delivered proof</strong>
            <span>Real finished sets become the photo engine over time.</span>
          </div>
        </div>
      </section>

      <section className={styles.section} id="process">
        <div className={styles.sectionIntro}>
          <span className={styles.kicker}>How It Works</span>
          <h2>Start from the car, not the shelf.</h2>
          <p>
            Choose a face, tell us about the car, and we will shape the final
            fitment and finish around the build. The goal is a wheel that feels
            native to the chassis rather than adapted after the fact.
          </p>
        </div>
        <div className={styles.processGrid}>
          {processSteps.map((item) => (
            <article key={item.step} className={styles.processCard}>
              <span className={styles.processStep}>{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.library} id="design-library">
        <div className={styles.sectionIntro}>
          <span className={styles.kicker}>Design Library</span>
          <h2>Choose the right face, then tailor the set.</h2>
          <p>
            Use the range as a guide to design language, spoke architecture,
            and finish direction. Final diameter, width, offset, and hardware
            are confirmed once the car is known.
          </p>
        </div>
        <div className={styles.libraryGrid}>
          {designBases.slice(0, 3).map((item, index) => (
            <DesignBaseCard
              key={item.name}
              item={item}
              tone={((index % 3) + 1) as 1 | 2 | 3}
            />
          ))}
        </div>
      </section>

      <section className={styles.delivered} id="delivered">
        <div className={styles.sectionIntro}>
          <span className={styles.kicker}>Delivered Sets</span>
          <h2>Completed builds tell the story best.</h2>
          <p>
            The gallery grows with real customer cars, real fitments, and real
            finish combinations. That makes every new set both proof and
            inspiration for the next build.
          </p>
        </div>
        <div className={styles.deliveredGrid}>
          {deliveredSets.slice(0, 3).map((item) => (
            <DeliveredSetCard key={item.chassis} item={item} />
          ))}
        </div>
      </section>

      <section className={styles.briefSection} id="brief">
        <div className={styles.briefPanel}>
          <div className={styles.sectionIntro}>
            <span className={styles.kicker}>Start Your Build</span>
            <h2>Ready to spec a set around your car?</h2>
            <p>
              Send through the basics of the car, the look you want, and any
              reference images. We will come back with the right direction,
              fitment, and finish options.
            </p>
          </div>

          <div className={styles.briefFields} aria-hidden="true">
            <div className={styles.briefField}>Make</div>
            <div className={styles.briefField}>Model</div>
            <div className={styles.briefField}>Year</div>
            <div className={styles.briefField}>Brake package</div>
            <div className={styles.briefField}>Finish direction</div>
            <div className={styles.briefField}>Reference images</div>
          </div>

          <div className={styles.briefActions}>
            <Link className={styles.primaryCta} href="/build">
              Open Build Brief
            </Link>
            <p>Vehicle details, finish direction, and reference images all help.</p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
