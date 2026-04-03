import Link from "next/link";
import styles from "../page-shell.module.css";

const warrantyPoints = [
  {
    title: "Structural Review",
    copy: "Every wheel program is checked before dispatch. If there is a structural concern, MonzaWheels reviews it against the original brief and production data.",
  },
  {
    title: "Finish Inspection",
    copy: "Finish quality is inspected before the set leaves the workshop. Any concern should be documented as soon as the wheels are received.",
  },
  {
    title: "Support Channel",
    copy: "The same direct channel used for the quote stays open for aftercare, so post-delivery support does not disappear into a generic ticket queue.",
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
          <h1 className={styles.heroTitle}>A clear support process for a made-to-order product.</h1>
          <p className={styles.heroCopy}>
            Every set is reviewed before dispatch. If something is off, MonzaWheels
            handles it through the same quote-first process that built the
            wheel.
          </p>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className="container">
          <div className={styles.cardGrid}>
            {warrantyPoints.map((item) => (
              <article key={item.title} className={styles.card} data-reveal>
                <p className={styles.cardOverline}>Support</p>
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