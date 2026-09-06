import { ConversionLink } from "@/components/conversion-link";
import { breadcrumbJsonLd, DEFAULT_OG_IMAGE, jsonLd } from "@/lib/seo";
import { FitmentToolClient } from "./FitmentToolClient";
import styles from "./page.module.css";

export const metadata = {
  title: "Wheel Fitment Calculator",
  description:
    "Compare wheel width, offset and tyre size changes before ordering. Check stance, inner clearance, rolling diameter and speedometer difference.",
  alternates: { canonical: "/fitment-tool" },
  openGraph: {
    type: "website",
    url: "/fitment-tool",
    title: "Wheel Fitment Calculator | Monza Wheels",
    description:
      "Compare wheel width, offset, tyre clearance and rolling-diameter changes before requesting your Monza forged wheel quote.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function FitmentToolPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Wheel Fitment Calculator", path: "/fitment-tool" },
          ]),
        )}
      />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`${styles.heroInner} container`}>
            <div>
              <p className="label">Wheel fitment check</p>
              <h1 className={styles.title}>Wheel fitment calculator.</h1>
              <p className={styles.copy}>
                Know what moves before the wheel does. Compare your current
                setup with a proposed wheel and tyre package. See how width,
                offset and rolling diameter change in real time.
              </p>
            </div>
            <dl className={styles.heroGuide}>
              <div>
                <dt>01</dt>
                <dd>Enter your current setup</dd>
              </div>
              <div>
                <dt>02</dt>
                <dd>Build the proposed setup</dd>
              </div>
              <div>
                <dt>03</dt>
                <dd>Send the result for final review</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className={styles.toolSection}>
          <div className="container">
            <FitmentToolClient />
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={`${styles.ctaInner} container`}>
            <div>
              <p className="label">Next step</p>
              <p className={styles.ctaLabel}>
                Not sure what the numbers should be? Send the car and we will
                resolve the fitment for you.
              </p>
            </div>
            <ConversionLink
              className="button-primary"
              href="/contact?notes=Please+help+me+resolve+the+correct+fitment+for+my+vehicle."
              eventSource="fitment_tool_footer"
            >
              Resolve my fitment
            </ConversionLink>
          </div>
        </section>
      </main>
    </>
  );
}
