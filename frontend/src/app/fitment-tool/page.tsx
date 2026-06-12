import Link from "next/link";
import { FitmentToolClient } from "./FitmentToolClient";
import styles from "./page.module.css";

export const metadata = {
  title: "Fitment Calculator",
  description:
    `Compare two wheel and tyre setups side by side. See stance difference, inner clearance change, diameter delta, and speedometer error — visualised on a scaled axle cross-section.`,
};

export default function FitmentToolPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <p className="label">Fitment helper</p>
          <h1 className={styles.title}>Compare wheel changes before you quote.</h1>
          <p className={styles.copy}>
            Enter your current wheel and tyre size, then test the setup you are
            considering. See poke, inner clearance, rolling diameter, and
            speedometer change.
          </p>
        </div>
      </section>

      <section className={styles.toolSection}>
        <div className="container">
          <FitmentToolClient />
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={`${styles.ctaInner} container`}>
          <div>
            <p className="label">Next step</p>
            <p className={styles.ctaLabel}>
              Not sure what the numbers should be? Send the car and we will
              resolve the fitment for you.
            </p>
          </div>
          <Link className="button-primary" href="/contact">
            Request a Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
