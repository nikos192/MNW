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
    capColour?: string;
    notes?: string;
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
    params.capColour ? `Centre cap colour: ${params.capColour}` : "",
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
    capColour: params.capColour,
  };

  const hasConfig =
    params.title ||
    params.startingPrice ||
    params.diameter ||
    params.width ||
    params.pcd ||
    params.offset ||
    params.centrebore ||
    params.finish ||
    params.capColour;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <p className="label">Contact</p>
          <h1 className={styles.title}>
            Send the car. We will confirm the wheel spec.
          </h1>
          <p className={styles.copy}>
            Name, email, and vehicle are enough to start. Leave fitment numbers
            blank and we will confirm size, offset, brake clearance, finish,
            price, and lead time.
          </p>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={`${styles.grid} container`}>
          <div className={styles.formPanel} data-reveal>
            <BuildForm
              initialNotes={params.notes}
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
              <p className="label">Quote review</p>
              <h2 className={styles.sectionHeading}>We confirm the fitment before production.</h2>
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
