import Link from "next/link";
import { finishPrograms } from "@/lib/monza-data";
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