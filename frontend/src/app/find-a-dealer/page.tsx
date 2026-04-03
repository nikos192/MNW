import Link from "next/link";
import { dealerRegions } from "@/lib/monza-data";
import styles from "../page-shell.module.css";

export const metadata = {
  title: "Find a Dealer",
  description:
    "See where MonzaWheels currently supports dealer and direct-fitment enquiries from Brisbane outward.",
};

export default function FindDealerPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.heroInner} container`}>
          <p className="label">Find a Dealer</p>
          <h1 className={styles.heroTitle}>Dealer support is expanding from Brisbane outward.</h1>
          <p className={styles.heroCopy}>
            MonzaWheels quotes directly today and can route future projects through the
            nearest partner as the network develops.
          </p>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="label">Support Regions</p>
            <h2 className={styles.sectionTitle}>Current contact points.</h2>
          </div>

          <div className={styles.cardGrid}>
            {dealerRegions.map((region) => (
              <article key={region.region} className={styles.card} data-reveal>
                <p className={styles.cardOverline}>{region.region}</p>
                <h3 className={styles.cardTitle}>{region.city}</h3>
                <p className={styles.cardCopy}>{region.note}</p>
                <a className={styles.inlineLink} href={`mailto:${region.contact}`}>
                  {region.contact}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={`${styles.ctaPanel} container`}>
          <div>
            <p className="label">Direct Enquiry</p>
            <h2 className={styles.sectionTitle}>Don’t see your region yet?</h2>
            <p className={styles.note}>Send the brief directly and MonzaWheels will handle the first response from Brisbane.</p>
          </div>
          <Link className="button-outline" href="/contact">
            Request a Quote
          </Link>
        </div>
      </section>
    </main>
  );
}