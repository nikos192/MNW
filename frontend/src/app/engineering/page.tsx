import Link from "next/link";
import { fitmentPrinciples, processSteps } from "@/lib/monza-data";
import styles from "../page-shell.module.css";

const qualityStandards = [
  {
    title: "JWL certified",
    copy: "Every wheel is certified to the Japan Light Alloy Wheel standard — the international benchmark for passenger car alloy wheels. JWL serves as the baseline; the internal testing standard goes further across every category.",
  },
  {
    title: "Fatigue testing",
    copy: "Bending fatigue is tested to 150,000 cycles — 50% above the JWL, SAE, and PCT requirement of 100,000. Radial load rolling fatigue is tested to 800,000 cycles — 60% above the 500,000 cycle standard.",
  },
  {
    title: "Impact testing",
    copy: "13° impact tests use a 255mm drop height, 10% above the 230mm international requirement. In addition, 30° and 90° impact tests at 1,010kg are conducted to standards with no international equivalent.",
  },
  {
    title: "Material and inspection certification",
    copy: "The 6061-T6 alloy is independently verified by the Shanghai Research Institute of Materials, a CNAS-accredited laboratory. Wheel inspection reports are issued by CNAM Wheel Inspection Center (CNAS L1879 accredited).",
  },
];

export const metadata = {
  title: "Engineering",
  description:
    "See how MonzaWheels resolves forged wheel geometry, brake clearance, and finish around the exact vehicle.",
};

export default function EngineeringPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.heroInner} container`}>
          <p className="label">Engineering</p>
          <h1 className={styles.heroTitle}>Every wheel program starts with the chassis.</h1>
          <p className={styles.heroCopy}>
            MonzaWheels resolves diameter, width, offset, brake clearance, and finish as
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
                <p className={styles.cardOverline}>MonzaWheels Process</p>
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

      <section className={styles.sectionAlt}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="label">Quality Standards</p>
            <h2 className={styles.sectionTitle}>Tested beyond the standard.</h2>
          </div>

          <div className={styles.cardGrid}>
            {qualityStandards.map((item) => (
              <article key={item.title} className={styles.card} data-reveal>
                <p className={styles.cardOverline}>Quality</p>
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