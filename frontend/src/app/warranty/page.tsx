import Link from "next/link";
import styles from "../page-shell.module.css";

const warrantyPoints = [
  {
    title: "Structural warranty",
    copy: "Any wheel with a manufacturing defect under normal use and professional installation will be replaced. The structural warranty runs for 5 years from the date of delivery.",
  },
  {
    title: "Finish warranty",
    copy: "Manufacturing defects in the finish are covered by repair or replacement for 5 years from delivery, provided the wheels have been maintained without mechanical damage.",
  },
  {
    title: "What is not covered",
    copy: "The warranty does not apply to damage from kerb strikes, road hazards, improper installation, or misuse. If in doubt, document the condition as soon as the set is received.",
  },
];

export const metadata = {
  title: "Warranty",
  description:
    "Understand the support process around MonzaWheels forged wheel programs, from pre-dispatch checks to post-delivery review.",
};

export default function WarrantyPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.heroInner} container`}>
          <p className="label">Warranty</p>
          <h1 className={styles.heroTitle}>Five-year warranty on every set.</h1>
          <p className={styles.heroCopy}>
            Every MonzaWheels wheel is covered for 5 years from the date of delivery.
            Two separate coverages — structural and finish — are included in every program.
          </p>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="container">
          <div className={styles.cardGrid}>
            {warrantyPoints.map((item) => (
              <article key={item.title} className={styles.card} data-reveal>
                <p className={styles.cardOverline}>Warranty</p>
                <h2 className={styles.cardTitle}>{item.title}</h2>
                <p className={styles.cardCopy}>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={`${styles.ctaPanel} container`}>
          <div>
            <p className="label">Need Help</p>
            <h2 className={styles.sectionTitle}>Send the brief or the issue directly.</h2>
          </div>
          <Link className="button-outline" href="/contact">
            Contact Support
          </Link>
        </div>
      </section>
    </main>
  );
}