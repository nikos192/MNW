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
    design?: string;
  }>;
};

export const metadata = {
  title: "Contact",
  description:
    `Request a bespoke forged wheel quote from ${BRAND_NAME}. Send a design reference, sketch, or idea and we will engineer it around your vehicle.`,
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const isCustomDesign = params.design === "custom";

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
          <p className="label">{isCustomDesign ? "Custom design quote" : "Contact"}</p>
          <h1 className={styles.title}>
            {isCustomDesign
              ? "Send the idea. We will engineer the wheel."
              : "Send the car. We will confirm the wheel spec."}
          </h1>
          <p className={styles.copy}>
            {isCustomDesign
              ? "Upload the wheel, sketch, render, or style you want. Name, email and vehicle make are enough to start—we will develop the design around your exact car."
              : "Name, email, and vehicle are enough to start. Leave fitment numbers blank and we will confirm size, offset, brake clearance, finish, price, and lead time."}
          </p>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={`${styles.grid} container`}>
          <div className={styles.formPanel} data-reveal>
            <BuildForm
              initialNotes={
                params.notes ??
                (isCustomDesign
                  ? "Custom design request\n\nDesign direction or reference:\n"
                  : undefined)
              }
              initialValues={initialValues}
              quoteContext={{
                productHandle: params.product,
                productTitle: params.title,
                startingPrice: params.startingPrice,
                quoteType: isCustomDesign || !params.product ? "custom" : "wheel",
              }}
            />
          </div>

          <aside className={styles.sidePanel} data-reveal>
            <div>
              <p className="label">{isCustomDesign ? "How it works" : "Quote review"}</p>
              <h2 className={styles.sectionHeading}>
                {isCustomDesign
                  ? "Your reference becomes a buildable forged wheel."
                  : "We confirm the fitment before production."}
              </h2>
            </div>

            {isCustomDesign ? (
              <ol className={styles.designSteps}>
                <li><span>01</span><p>Submit the vehicle and describe the wheel direction.</p></li>
                <li><span>02</span><p>We resolve the design, fitment, price and production timing.</p></li>
                <li><span>03</span><p>You approve the final drawing or render before machining begins.</p></li>
              </ol>
            ) : null}

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
