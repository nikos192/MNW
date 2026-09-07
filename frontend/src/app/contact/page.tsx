import { BRAND_NAME } from "@/lib/brand";
import { BuildForm } from "@/components/build-form";
import Link from "next/link";
import { shippingLabel, type ShippingOption } from "@/lib/order-timelines";
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
    enquiry?: string;
    shipping?: ShippingOption;
  }>;
};

export const metadata = {
  title: "Forged Wheel Enquiries",
  description: `Request a bespoke forged wheel quote from ${BRAND_NAME}. Send a design reference, sketch, or idea and we will engineer it around your vehicle.`,
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const isCustomDesign = params.design === "custom";
  const isQuote =
    isCustomDesign ||
    [
      params.product,
      params.title,
      params.startingPrice,
      params.make,
      params.model,
      params.year,
      params.diameter,
      params.width,
      params.pcd,
      params.offset,
      params.centrebore,
      params.finish,
      params.capColour,
      params.notes,
      params.shipping,
    ].some(Boolean) ||
    params.enquiry === "quote";

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
    params.shipping ? `Delivery: ${shippingLabel(params.shipping)}` : "",
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
        <div className={`${styles.content} container`}>
          <p className="label">
            {isCustomDesign
              ? "Custom design"
              : isQuote
                ? "Wheel quote"
                : "Contact"}
          </p>
          <h1 className={styles.title}>
            {isCustomDesign
              ? "Your idea. Your wheels."
              : isQuote
                ? "Let’s find your wheels."
                : "Let’s talk."}
          </h1>
          <p className={styles.copy}>
            {isQuote
              ? "Unsure about fitment? We’ll confirm everything with you."
              : "Questions about wheels, orders or anything else? We’re here to help."}
          </p>
          {!isQuote && (
            <p className={styles.quoteLink}>
              Looking for wheels?{" "}
              <Link href="/contact?enquiry=quote">Request a quote →</Link>
            </p>
          )}
        </div>
      </section>
      <section className={styles.formSection}>
        <div className={`${styles.content} container`}>
          <div className={styles.formPanel}>
            {hasConfig && contextLines.length > 0 && (
              <details className={styles.contextBox}>
                <summary>
                  {params.title || "Your selected configuration"}
                  <span>Included with your enquiry</span>
                </summary>
                <div>
                  {contextLines.map((line) => (
                    <p key={line} className={styles.contextLine}>
                      {line}
                    </p>
                  ))}
                </div>
              </details>
            )}
            <BuildForm
              key={JSON.stringify(params)}
              initialNotes={params.notes}
              initialValues={initialValues}
              quoteContext={{
                productHandle: params.product,
                productTitle: params.title,
                startingPrice: params.startingPrice,
                quoteType: !isQuote
                  ? "contact"
                  : isCustomDesign
                    ? "custom"
                    : "wheel",
                shippingOption: params.shipping,
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
