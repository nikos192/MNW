import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import styles from "./page.module.css";

const intakeFields = [
  "Vehicle make",
  "Vehicle model",
  "Vehicle year",
  "Brake package",
  "Suspension / ride height",
  "Target diameter",
  "Target width direction",
  "Finish direction",
  "Reference images",
];

const checkpoints = [
  {
    title: "Design direction",
    copy: "Choose a face from the design library or bring your own visual references.",
  },
  {
    title: "Engineering detail",
    copy: "We verify fitment, brake clearance, offsets, widths, centre bore, and any constraints around the chassis.",
  },
  {
    title: "Approval and payment",
    copy: "After the build is quoted and approved, payment can happen through Stripe without forcing a normal retail cart.",
  },
];

export default function BuildPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.texture} aria-hidden="true" />
        <SiteHeader ctaHref="/design-library" ctaLabel="Browse Design Bases" />

        <div className={styles.heroContent}>
          <div className={styles.copy}>
            <span className={styles.kicker}>Build Brief</span>
            <h1>Tell the site enough to make the next conversation useful.</h1>
            <p>
              The best version of MNW does not ask people to guess a size and
              throw it in a cart. It asks for the car, the constraints, the
              finish direction, and the visual goal, then turns that into a
              serious quote.
            </p>
          </div>

          <div className={styles.quoteNote}>
            <strong>Ideal payment flow</strong>
            <p>
              Spec first. Quote second. Deposit through Stripe after approval.
              Final balance later in the process.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.intakeSection}>
        <div className={styles.intakeGrid}>
          <div className={styles.formPanel}>
            <div className={styles.panelHead}>
              <span className={styles.kicker}>Intake Structure</span>
              <h2>This is the route we should turn into a real form next.</h2>
            </div>

            <div className={styles.fields} aria-hidden="true">
              {intakeFields.map((field) => (
                <div key={field} className={styles.field}>
                  {field}
                </div>
              ))}
            </div>

            <div className={styles.actions}>
              <a className={styles.primaryCta} href="mailto:hello@mnw.au">
                Send Build Brief
              </a>
              <Link className={styles.secondaryCta} href="/design-library">
                Need a design first?
              </Link>
            </div>
          </div>

          <aside className={styles.sidePanel}>
            <span className={styles.kicker}>Why this matters</span>
            <div className={styles.sideList}>
              {checkpoints.map((item) => (
                <article key={item.title} className={styles.sideItem}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.bridge}>
        <div className={styles.bridgePanel}>
          <div>
            <span className={styles.kicker}>Architecture fit</span>
            <h2>This is where a headless stack starts to make sense.</h2>
            <p>
              Shopify can still own the design library, content, and media. The
              frontend owns the intake and storytelling. Stripe comes in when a
              real build is approved, not as the first interaction.
            </p>
          </div>
          <div className={styles.bridgeActions}>
            <Link className={styles.primaryCta} href="/design-library">
              Back to library
            </Link>
            <Link className={styles.secondaryCta} href="/">
              Return home
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
