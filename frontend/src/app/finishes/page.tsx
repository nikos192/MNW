import Link from "next/link";
import { CUSTOM_FINISH_PRICE_AUD_PER_WHEEL, finishPrograms, formatAud } from "@/lib/monza-data";
import styles from "../page-shell.module.css";

export const metadata = {
  title: "Finishes",
  description:
    "Browse the core MonzaWheels finish programs used to tune the final visual read of each forged wheel set.",
};

export default function FinishesPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.heroInner} container`}>
          <p className="label">Finishes</p>
          <h1 className={styles.heroTitle}>Finish programs should support the face, not compete with it.</h1>
          <p className={styles.heroCopy}>
            Surface selection is part of the engineering brief. The same face
            can read formal, technical, or aggressive depending on the final
            finish direction.
          </p>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="label">Core Finishes</p>
            <h2 className={styles.sectionTitle}>The foundational surface programs.</h2>
          </div>

          <div className={styles.cardGrid}>
            {finishPrograms.map((finish) => (
              <article key={finish.title} className={styles.card} data-reveal>
                <p className={styles.cardOverline}>{finish.overline}</p>
                <h3 className={styles.cardTitle}>{finish.title}</h3>
                <p className={styles.cardCopy}>{finish.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="label">Beyond the catalogue</p>
            <h2 className={styles.sectionTitle}>Custom off-catalogue finishes.</h2>
            <p className={styles.sectionCopy}>
              Need a paint colour, candy coat, or surface effect outside the
              standard library? Custom appearance work is available on the
              1-piece line as a per-wheel surcharge — bring a paint code or
              reference and we&apos;ll match it before machining.
            </p>
          </div>

          <div className={styles.cardGrid}>
            <article className={styles.card} data-reveal>
              <p className={styles.cardOverline}>Custom Program</p>
              <h3 className={styles.cardTitle}>Off-catalogue paint</h3>
              <p className={styles.cardCopy}>
                Any paint colour or coat outside the standard library.
                Surcharge: AUD {formatAud(CUSTOM_FINISH_PRICE_AUD_PER_WHEEL)} per
                wheel (AUD {formatAud(CUSTOM_FINISH_PRICE_AUD_PER_WHEEL * 4)} per
                set of 4) on top of the wheel cost.
              </p>
            </article>
            <article className={styles.card} data-reveal>
              <p className={styles.cardOverline}>How it works</p>
              <h3 className={styles.cardTitle}>Bring the reference, we match it</h3>
              <p className={styles.cardCopy}>
                Send a paint code, photo, or chassis reference with the quote
                request. Approved before machining starts so the finish is
                locked in by the time the forge moves.
              </p>
            </article>
            <article className={styles.card} data-reveal>
              <p className={styles.cardOverline}>Where it applies</p>
              <h3 className={styles.cardTitle}>1-Piece Forged only</h3>
              <p className={styles.cardCopy}>
                Custom appearance is offered on the 1-piece line. 2-piece
                builds use the catalogue programs to keep the disc-and-barrel
                finish consistent.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={`${styles.ctaPanel} container`}>
          <div>
            <p className="label">Next Step</p>
            <h2 className={styles.sectionTitle}>Need a finish direction matched to the car?</h2>
          </div>
          <Link className="button-outline" href="/contact">
            Request a Quote
          </Link>
        </div>
      </section>
    </main>
  );
}