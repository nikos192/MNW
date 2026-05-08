import Link from "next/link";
import {
  accessoryPricing,
  formatAud,
  pricing1Pc,
  pricing2Pc,
  pricing2PcCarbon,
} from "@/lib/monza-data";
import shellStyles from "../page-shell.module.css";
import styles from "./page.module.css";

export const metadata = {
  title: "Pricing",
  description:
    "Per-wheel and per-set pricing for MonzaWheels 1-piece forged, 2-piece forged, and 2-piece carbon fibre wheels, plus accessory and custom finish charges.",
};

type PriceRow = {
  size: string;
  detail: string;
  perWheel: number;
};

function rowsFromOnePiece(): PriceRow[] {
  return pricing1Pc.map((row) => ({
    size: `${row.diameter}"`,
    detail: row.widthRange,
    perWheel: row.priceAudPerWheel,
  }));
}

function rowsFromTwoPiece(): PriceRow[] {
  return pricing2Pc.map((row) => ({
    size: `${row.diameter}"`,
    detail: row.widthRange,
    perWheel: row.priceAudPerWheel,
  }));
}

function rowsFromCarbon(): PriceRow[] {
  return pricing2PcCarbon.map((row) => ({
    size: `${row.diameter}"`,
    detail: row.width,
    perWheel: row.priceAudPerWheel,
  }));
}

function PriceTable({
  rows,
  detailHeading,
}: {
  rows: PriceRow[];
  detailHeading: string;
}) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Size</th>
            <th>{detailHeading}</th>
            <th className={styles.numeric}>Per wheel (AUD)</th>
            <th className={styles.numeric}>Per set of 4 (AUD)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.size}-${row.detail}-${index}`}>
              <td className={styles.size}>{row.size}</td>
              <td>{row.detail}</td>
              <td className={styles.numeric}>{formatAud(row.perWheel)}</td>
              <td className={styles.numeric}>{formatAud(row.perWheel * 4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PricingPage() {
  const onePieceRows = rowsFromOnePiece();
  const twoPieceRows = rowsFromTwoPiece();
  const carbonRows = rowsFromCarbon();

  return (
    <main className={shellStyles.page}>
      <section className={shellStyles.hero}>
        <div className={`${shellStyles.heroInner} container`}>
          <p className="label">Pricing</p>
          <h1 className={shellStyles.heroTitle}>Forged wheel pricing.</h1>
          <p className={shellStyles.heroCopy}>
            Per-wheel and per-set pricing across the full forged range. Final
            quotes are confirmed around the chassis, brake package, and finish
            brief — taxes, freight, and any custom-finish charges are added at
            quote stage.
          </p>
        </div>
      </section>

      <section className={shellStyles.sectionAlt}>
        <div className="container">
          <div className={shellStyles.sectionHeader}>
            <p className="label">1-Piece Forged</p>
            <h2 className={shellStyles.sectionTitle}>Monoblock range.</h2>
            <p className={shellStyles.sectionCopy}>
              Single-piece forged faces from 15&quot; to 24&quot;. Width ranges
              available per size are shown alongside.
            </p>
          </div>
          <PriceTable rows={onePieceRows} detailHeading="Width range" />
        </div>
      </section>

      <section className={shellStyles.section}>
        <div className="container">
          <div className={shellStyles.sectionHeader}>
            <p className="label">2-Piece Forged</p>
            <h2 className={shellStyles.sectionTitle}>Multi-piece range.</h2>
            <p className={shellStyles.sectionCopy}>
              Two-piece forged construction for deeper dish, extended offsets,
              and stronger contrast.
            </p>
          </div>
          <PriceTable rows={twoPieceRows} detailHeading="Width range" />
        </div>
      </section>

      <section className={shellStyles.sectionAlt}>
        <div className="container">
          <div className={shellStyles.sectionHeader}>
            <p className="label">2-Piece Carbon Fibre</p>
            <h2 className={shellStyles.sectionTitle}>Carbon fibre line.</h2>
            <p className={shellStyles.sectionCopy}>
              Carbon fibre barrels for the lightest rotating mass. Available
              19&quot;–21&quot; in fixed widths.
            </p>
          </div>
          <PriceTable rows={carbonRows} detailHeading="Width" />
        </div>
      </section>

      <section className={shellStyles.section}>
        <div className="container">
          <div className={shellStyles.sectionHeader}>
            <p className="label">Accessories &amp; add-ons</p>
            <h2 className={shellStyles.sectionTitle}>Caps, custom finishes, and extras.</h2>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Item</th>
                  <th className={styles.numeric}>Price (AUD)</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>
                {accessoryPricing.map((item) => (
                  <tr key={item.name}>
                    <td className={styles.size}>{item.name}</td>
                    <td className={styles.numeric}>{formatAud(item.priceAud)}</td>
                    <td>{item.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={shellStyles.ctaSection}>
        <div className={`${shellStyles.ctaPanel} container`}>
          <div>
            <p className="label">Next step</p>
            <h2 className={shellStyles.sectionTitle}>Get a quote built around your chassis.</h2>
            <p className={shellStyles.note}>
              Final pricing reflects fitment, finish program, and freight to
              your address. Prices above are ex-GST.
            </p>
          </div>
          <Link className="button-outline" href="/contact">
            Request a Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
