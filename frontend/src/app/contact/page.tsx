import { BRAND_NAME } from "@/lib/brand";
import { BuildForm } from "@/components/build-form";
import styles from "./page.module.css";

type ContactPageProps = {
  searchParams: Promise<{
    product?: string;
    title?: string;
    startingPrice?: string;
    make?: string;
    model?: string;
    year?: string;
    diameter?: string;
    width?: string;
    pcd?: string;
    offset?: string;
    centrebore?: string;
    finish?: string;
  }>;
};

export const metadata = {
  title: "Contact",
  description:
    `Request a quote for a ${BRAND_NAME} forged wheel set. Share the chassis, finish direction, and build notes and ${BRAND_NAME} will respond with the right program.`,
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;

  const contextLines = [
    params.title ? `Product: ${params.title}` : "",
    params.startingPrice ? `Starting price: ${params.startingPrice}` : "",
    params.make ? `Make: ${params.make}` : "",
    params.model ? `Model: ${params.model}` : "",
    params.year ? `Year: ${params.year}` : "",
    params.diameter ? `Diameter: ${params.diameter}` : "",
    params.width ? `Width: ${params.width}` : "",
    params.pcd ? `PCD: ${params.pcd}` : "",
    params.offset ? `Offset: ${params.offset}` : "",
    params.centrebore ? `Centre bore: ${params.centrebore}` : "",
    params.finish ? `Finish: ${params.finish}` : "",
  ].filter(Boolean);

  const initialValues = {
    make: params.make,
    model: params.model,
    year: params.year,
    diameter: params.diameter,
    width: params.width,
    pcd: params.pcd,
    offset: params.offset,
    centrebore: params.centrebore,
    finish: params.finish,
  };

  const hasConfig =
    params.title ||
    params.startingPrice ||
    params.diameter ||
    params.width ||
    params.pcd ||
    params.offset ||
    params.centrebore ||
    params.finish;

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
            <BuildForm
              initialValues={initialValues}
              quoteContext={{
                productHandle: params.product,
                productTitle: params.title,
                startingPrice: params.startingPrice,
              }}
            />
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

            {hasConfig && contextLines.length ? (
              <div className={styles.contextBox}>
                <p className="label">Selected configuration</p>
                {contextLines.map((line) => (
                  <p key={line} className={styles.contextLine}>{line}</p>
                ))}
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </main>
  );
}