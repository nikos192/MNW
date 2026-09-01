import Link from "next/link";
import styles from "./construction-comparison.module.css";

const rows = [
  ["Construction", "Single forged 6061-T6 billet", "Forged centre with separate barrel"],
  ["Character", "Lowest-weight, clean and direct", "More finish contrast and visual depth"],
  ["Lip / dish", "Concavity formed within one wheel", "Greater lip and dish flexibility"],
  ["Production", "Approximately 20 days", "Approximately 30 days"],
  ["Often chosen for", "Performance-led, restrained builds", "Show-focused and grand-touring builds"],
] as const;

export function ConstructionComparison() {
  return <section className={styles.section} aria-labelledby="construction-title">
    <div className="container">
      <header className={styles.header}><p className="label">Choose the architecture</p><h2 id="construction-title">Monoblock or two-piece?</h2><p>Both are custom forged and resolved around your vehicle. The difference is how the wheel is built—and the visual freedom that construction creates.</p></header>
      <div className={styles.table} role="table" aria-label="Wheel construction comparison">
        <div className={`${styles.row} ${styles.head}`} role="row"><span role="columnheader">Compare</span><strong role="columnheader">One-piece forged</strong><strong role="columnheader">Two-piece forged</strong></div>
        {rows.map(([label, one, two]) => <div className={styles.row} role="row" key={label}><span role="rowheader">{label}</span><p role="cell">{one}</p><p role="cell">{two}</p></div>)}
      </div>
      <footer className={styles.footer}><p>Shipping is additional to production: standard is included and approximately 40 days; express is AUD $800 and approximately 2 weeks. All timings are estimates.</p><Link href="/pricing">Compare delivered pricing <span aria-hidden="true">↗</span></Link></footer>
    </div>
  </section>;
}
