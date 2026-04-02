import Link from "next/link";
import { BuildForm } from "@/components/build-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import styles from "./page.module.css";

const checkpoints = [
  {
    title: "Design direction",
    copy: "Choose a wheel design from the range or send through reference images that match the look you want.",
  },
  {
    title: "Fitment detail",
    copy: "We verify brake clearance, offsets, widths, centre bore, and any other constraints around the chassis.",
  },
  {
    title: "Quote and approval",
    copy: "Once the direction is right, we confirm the build, final finish, and move the set into production.",
  },
];

export default function BuildPage() {
  const email = process.env.BUILD_INTAKE_EMAIL ?? "hello@mnw.au";

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.texture} aria-hidden="true" />
        <SiteHeader ctaHref="/design-library" ctaLabel="Browse Design Bases" />

        <div className={styles.heroContent}>
          <div className={styles.copy}>
            <span className={styles.kicker}>Build Brief</span>
            <h1>Start with the car and the look you want.</h1>
            <p>
              Send through the essentials of the car, the finish direction, and
              any references you like. We will take that and shape the right
              wheel spec around the build.
            </p>
          </div>

          <div className={styles.quoteNote}>
            <strong>Made to order</strong>
            <p>
              Each set is machined around the approved fitment and finish. The
              brief keeps the first conversation focused and useful.
            </p>
            <div className={styles.noteList}>
              <div className={styles.noteItem}>
                <span>01</span>
                <p>Design language gets agreed before the set goes any further.</p>
              </div>
              <div className={styles.noteItem}>
                <span>02</span>
                <p>Brake clearance, widths, and offsets are resolved around the exact chassis.</p>
              </div>
              <div className={styles.noteItem}>
                <span>03</span>
                <p>Finish, hardware, and final proportion are approved before production starts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.intakeSection}>
        <div className={styles.intakeGrid}>
          <div className={styles.formPanel}>
            <div className={styles.panelHead}>
              <span className={styles.kicker}>Build Brief</span>
              <h2>Send the details and we will spec the set from there.</h2>
            </div>

            <BuildForm email={email} />
          </div>

          <aside className={styles.sidePanel}>
            <span className={styles.kicker}>What to include</span>
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
            <span className={styles.kicker}>Need inspiration first?</span>
            <h2>Browse the wheel range and come back with a clear direction.</h2>
            <p>
              If you are still deciding on spoke style or finish direction, the
              design library is the quickest way to narrow in on the right face
              before sending the brief.
            </p>
          </div>
          <div className={styles.bridgeActions}>
            <Link className={styles.primaryCta} href="/design-library">
              View Wheel Range
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
