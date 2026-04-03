import Link from "next/link";
import { aboutStatements } from "@/lib/monza-data";
import styles from "./page.module.css";

const process = [
  "Choose the design direction.",
  "Approve the fitment and finish brief.",
  "Machine, finish, and deliver the set.",
];

export const metadata = {
  title: "About",
  description:
    "MonzaWheels is a forged wheel brand built around fitment-led quoting, restrained design, and made-to-order delivery.",
};

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <p className="label">About</p>
          <h1 className={styles.title}>
            A forged wheel brand built around restraint and exactness.
          </h1>
          <p className={styles.copy}>
            MonzaWheels is not a catalogue of generic inventory. The wheel, the
            fitment, and the finish are resolved together so the final set
            feels native to the car.
          </p>
        </div>
      </section>

      <section className={styles.statementSection}>
        <div className={`${styles.statementGrid} container`}>
          {aboutStatements.map((item) => (
            <article key={item.title} className={styles.card} data-reveal>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={`${styles.processGrid} container`}>
          <div className={styles.processCopy} data-reveal>
            <p className="label">Process</p>
            <h2 className={styles.sectionHeading}>
              Quote first. Machine after approval.
            </h2>
          </div>
          <div className={styles.processList} data-reveal>
            {process.map((item, index) => (
              <div key={item} className={styles.processItem}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={`${styles.ctaPanel} container`}>
          <div>
            <p className="label">Contact</p>
            <h2 className={styles.sectionHeading}>Have a chassis in mind?</h2>
          </div>
          <Link className="button-outline" href="/contact">
            Request a quote
          </Link>
        </div>
      </section>
    </main>
  );
}