import Link from "next/link";
import { BRAND_NAME } from "@/lib/brand";
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
          <p className="label">Tools</p>
          <h1 className={styles.title}>Fitment Calculator</h1>
          <p className={styles.copy}>
            Enter two setups to compare them side by side — stance, clearance, diameter, and speedometer error visualised on a scaled cross-section of the axle.
          </p>
        </div>
      </section>

      <section className={styles.toolSection}>
        <div className="container">
          <FitmentToolClient />
        </div>
      </section>

      <section style={{ padding: "clamp(48px, 6vw, 72px) 0", borderTop: "1px solid var(--rule)" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
          <div>
            <p className="label">Next step</p>
            <p style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 400, marginTop: "8px", maxWidth: "440px", lineHeight: 1.35 }}>
              Found the right fitment? Get a quote built around your exact chassis.
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
