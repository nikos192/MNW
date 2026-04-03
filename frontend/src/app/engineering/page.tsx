import Link from "next/link";
import { fitmentPrinciples, processSteps } from "@/lib/mnw-data";
import styles from "../page-shell.module.css";

export const metadata = {
  title: "Engineering",
  description:
    "See how MNW resolves forged wheel geometry, brake clearance, and finish around the exact vehicle.",
};

export default function EngineeringPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.heroInner} container`}>
          <p className="label">Engineering</p>
          <h1 className={styles.heroTitle}>Every wheel program starts with the chassis.</h1>
          <p className={styles.heroCopy}>
            MNW resolves diameter, width, offset, brake clearance, and finish as
            one system around the exact car. The wheel face is only the
            starting point.
          </p>
          <div className={styles.heroActions}>
            <Link className="button-outline" href="/contact">
              Request a Quote
            </Link>
            <Link className="button-outline" href="/fitment">
              View Fitment Guide
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="label">Process</p>
            <h2 className={styles.sectionTitle}>How a brief turns into a finished set.</h2>
          </div>

          <div className={styles.cardGrid}>
            {processSteps.map((step) => (
              <article key={step.title} className={styles.card} data-reveal>
                <p className={styles.cardOverline}>MNW Process</p>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.cardCopy}>{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="label">Fitment Logic</p>
            <h2 className={styles.sectionTitle}>Built around the car, not a shelf offset.</h2>
          </div>

          <div className={styles.cardGrid}>
            {fitmentPrinciples.map((item) => (
              <article key={item.title} className={styles.card} data-reveal>
                <p className={styles.cardOverline}>Fitment</p>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardCopy}>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}