import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BuildForm } from "@/components/build-form";
import { ConversionLink } from "@/components/conversion-link";
import { ProgramFaq } from "@/components/program-faq";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Custom Forged Wheels Australia",
  description:
    "Send MonzaWheels a wheel photo, sketch or render. We develop a bespoke forged design, resolve fitment around your car and deliver Australia-wide.",
  alternates: { canonical: "/custom-forged-wheels" },
  openGraph: {
    title: "Your Wheel Idea. Forged for Your Car.",
    description:
      "Upload a wheel reference and receive a custom forged wheel proposal engineered around your exact vehicle.",
    url: "/custom-forged-wheels",
    images: [DEFAULT_OG_IMAGE],
  },
};

const proofPoints = [
  ["Material", "6061-T6 forged aluminium"],
  ["Approval", "Final drawing or render approved before machining"],
  ["Fitment", "Offset, bore and brake clearance resolved to chassis"],
  ["Coverage", "Five-year structural and finish warranty"],
];

const steps = [
  {
    number: "01",
    title: "Send the direction",
    copy: "Upload a photo, sketch, render or link. It does not need to be technical.",
  },
  {
    number: "02",
    title: "We engineer the set",
    copy: "Construction, diameter, width, offset, brake clearance, finish and delivered price are resolved together.",
  },
  {
    number: "03",
    title: "Approve before machining",
    copy: "You approve the final drawing or render and complete payment before production begins.",
  },
];

export default function CustomForgedWheelsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={`${styles.heroInner} container`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Custom forged wheels · Australia</p>
            <h1>Found the wheel you want? Send it.</h1>
            <p>
              Bring us any wheel reference, sketch or idea. We turn the direction into a
              bespoke monoblock or two-piece wheel engineered around your exact car.
            </p>
            <div className={styles.actions}>
              <ConversionLink
                className="button-primary"
                eventSource="custom_landing_hero"
                href="#quote"
              >
                Upload your design
              </ConversionLink>
              <Link className="button-outline" href="/pricing">See delivered pricing</Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <Image
              alt="MonzaWheels custom forged wheel"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 46vw"
              src="/media/hero-wheel-poster.jpg"
            />
          </div>
        </div>
      </section>

      <section className={styles.proofStrip} aria-label="MonzaWheels program details">
        <dl className="container">
          {proofPoints.map(([label, value]) => (
            <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      </section>

      <section className={styles.process}>
        <div className="container">
          <div className={styles.sectionHeading}>
            <p className="label">One idea. Three decisions.</p>
            <h2>You provide the direction. We resolve the engineering.</h2>
          </div>
          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.quoteSection} id="quote">
        <div className={`${styles.quoteGrid} container`}>
          <div className={styles.quoteIntro}>
            <p className="label">Start the brief</p>
            <h2>Show us what you have in mind.</h2>
            <p>
              Name, email, vehicle make and a reference are enough. Unknown technical
              details can stay blank.
            </p>
            <ul>
              <li>Monoblock production: approximately 20 days</li>
              <li>Two-piece production: approximately 30 days</li>
              <li>Australia-wide delivery included in live pricing</li>
              <li>Final fitment and design approved before machining</li>
            </ul>
          </div>
          <div className={styles.formPanel}>
            <BuildForm
              initialNotes={"Custom design request\n\nDesign direction:\n"}
              quoteContext={{ productTitle: "Custom forged wheel design" }}
            />
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={`${styles.faqGrid} container`}>
          <div>
            <p className="label">Before you begin</p>
            <h2>The complete custom-wheel process, clearly answered.</h2>
          </div>
          <ProgramFaq />
        </div>
      </section>
    </main>
  );
}
