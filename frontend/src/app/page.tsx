import Link from "next/link";
import { DesignBaseCard } from "@/components/design-base-card";
import { DeliveredSetCard } from "@/components/delivered-set-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDesignLibraryData } from "@/lib/design-library";
import { processSteps } from "@/lib/mnw-data";
import styles from "./page.module.css";

export default async function Home() {
  const { designBases, deliveredSets, source } = await getDesignLibraryData();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroTexture} aria-hidden="true" />
        <SiteHeader />

        <div className={styles.heroGrid}>
          <div className={styles.heroMeta}>
            <span className={styles.kicker}>Custom Wheel Program</span>
            <p className={styles.metaCopy}>
              Built for chassis-specific fitment, not generic inventory.
            </p>
          </div>

          <div className={styles.heroStage} aria-hidden="true">
            <div className={styles.heroAura} />
            <div className={styles.heroWheel}>
              <div className={styles.heroWheelCore} />
            </div>
          </div>

          <div className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>
              <span>Custom.</span>
              <span>By chassis.</span>
            </h1>
            <p className={styles.heroDescription}>
              MNW is not a shelf-first wheel store. It is a custom build
              studio where the face, fitment, finish, and hardware are
              resolved as one object around the car.
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

      <section className={styles.metrics}>
        <div className={styles.metricCard}>
          <span>Build model</span>
          <strong>Quote first</strong>
          <p>Design library plus custom-spec workflow.</p>
        </div>
        <div className={styles.metricCard}>
          <span>Media strategy</span>
          <strong>Real installs</strong>
          <p>Delivered cars gradually replace placeholders and renders.</p>
        </div>
        <div className={styles.metricCard}>
          <span>Commerce path</span>
          <strong>Shopify + Stripe</strong>
          <p>Headless frontend with flexible payment collection after approval.</p>
        </div>
      </section>

      <section className={styles.section} id="process">
        <div className={styles.sectionIntro}>
          <span className={styles.kicker}>Commission Flow</span>
          <h2>Start from the car, not the shelf.</h2>
          <p>
            The frontend should behave like a studio intake and portfolio,
            not a generic catalog. That means fewer fake choices and a much
            clearer path from idea to approved build.
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
          <h2>Products become starting points.</h2>
          <p>
            Each product page becomes a face reference with quality proof,
            completed-fitment examples, and a build CTA. Final dimensions stay
            fluid until the chassis is confirmed.
          </p>
          <div className={styles.dataStatus}>
            {source === "shopify"
              ? "Live Shopify product data"
              : "Fallback MNW concept data until Shopify credentials are connected"}
          </div>
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
          <h2>Real cars should become the strongest media.</h2>
          <p>
            Instead of waiting for a supplier catalog that does not exist, the
            site should grow around completed builds. That makes the gallery
            more credible and the product pages more specific over time.
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
            <span className={styles.kicker}>Build Brief</span>
            <h2>The frontend should qualify, not overwhelm.</h2>
            <p>
              The next step is a serious intake flow: vehicle, brake package,
              ride height, target diameter, finish direction, and reference
              images. That gives you much better leads than a default cart.
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
              Open Project Intake
            </Link>
            <p>
              Recommended flow: spec approval first, deposit second, production
              after sign-off.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
