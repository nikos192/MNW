import { BRAND_EMAIL, BRAND_NAME } from "@/lib/brand";
import { BuildForm } from "@/components/build-form";
import styles from "./page.module.css";

type ContactPageProps = {
  searchParams: Promise<{
    product?: string;
    title?: string;
    make?: string;
    model?: string;
    year?: string;
  }>;
};

export const metadata = {
  title: "Contact",
  description:
    `Request a quote for a ${BRAND_NAME} forged wheel set. Share the chassis, finish direction, and build notes and ${BRAND_NAME} will respond with the right program.`,
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const email = process.env.BUILD_INTAKE_EMAIL ?? BRAND_EMAIL;
  const contextLines = [
    params.title ? `Product: ${params.title}` : "",
    params.make ? `Make: ${params.make}` : "",
    params.model ? `Model: ${params.model}` : "",
    params.year ? `Year: ${params.year}` : "",
  ].filter(Boolean);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <p className="label">Contact</p>
          <h1 className={styles.title}>
            Request a quote for the right wheel program.
          </h1>
          <p className={styles.copy}>
            Tell us the car, the fitment brief, the finish direction, and any
            references that matter. {BRAND_NAME} will come back with the correct forged
            solution rather than pushing you through a generic cart flow.
          </p>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={`${styles.grid} container`}>
          <div className={styles.formPanel} data-reveal>
            <BuildForm email={email} initialNotes={contextLines.join("\n")} />
          </div>

          <aside className={styles.sidePanel} data-reveal>
            <div>
              <p className="label">What helps</p>
              <h2 className={styles.sectionHeading}>
                The clearer the brief, the faster the quote.
              </h2>
            </div>

            <div className={styles.sideBlock}>
              <h3>Vehicle detail</h3>
              <p>Make, model, year, ride height, and brake package.</p>
            </div>

            <div className={styles.sideBlock}>
              <h3>Direction</h3>
              <p>
                Preferred diameter, finish references, and examples of the look
                you want.
              </p>
            </div>

            <div className={styles.sideBlock}>
              <h3>Outcome</h3>
              <p>
                {BRAND_NAME} confirms the correct wheel base, fitment, lead time, and
                finish path.
              </p>
            </div>

            {contextLines.length ? (
              <div className={styles.contextBox}>
                <p className="label">Current context</p>
                {contextLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </main>
  );
}