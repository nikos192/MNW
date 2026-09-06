import Link from "next/link";
import { PricingCalculator } from "@/components/pricing-calculator";
import { breadcrumbJsonLd, jsonLd } from "@/lib/seo";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import shellStyles from "../page-shell.module.css";
import styles from "./page.module.css";

export const metadata = {
  title: { absolute: "Forged Wheel Prices Australia | Monza Wheels" },
  description:
    "View forged wheel prices in Australia for Monza one-piece and two-piece sets, including GST and standard Australia-wide shipping.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    type: "website",
    url: "/pricing",
    title: "Forged Wheel Prices Australia | Monza Wheels",
    description:
      "Compare GST-inclusive one-piece and two-piece forged wheel prices with standard Australia-wide shipping included.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Forged Wheel Prices", path: "/pricing" },
          ]),
        )}
      />
      <main className={shellStyles.page}>
        <section className={shellStyles.hero}>
          <div className={`${shellStyles.heroInner} container`}>
            <p className="label">Made-to-order pricing</p>
            <h1 className={shellStyles.heroTitle}>
              Forged wheel prices for Australia.
            </h1>
            <p className={shellStyles.heroCopy}>
              Build a live price around construction, wheel size and finish.
              Prices include GST and standard shipping. Optional upgrades are
              added transparently as you configure the set.
            </p>
          </div>
        </section>

        <section className={shellStyles.sectionAlt}>
          <div className="container">
            <div className={shellStyles.sectionHeader}>
              <p className="label">Price configurator</p>
              <h2 className={shellStyles.sectionTitle}>Build the set.</h2>
              <p className={shellStyles.sectionCopy}>
                Select a valid diameter and width band, then tailor the finish
                and choose standard or express delivery. Both delivery choices
                remain visible, and the total updates immediately. Standard
                centre caps are included.
              </p>
            </div>
            <PricingCalculator />
          </div>
        </section>

        <section className={shellStyles.section}>
          <div className="container">
            <div className={styles.carbonPanel}>
              <div>
                <p className="label">2-Piece Carbon Fibre</p>
                <h2 className={shellStyles.sectionTitle}>
                  Carbon, quoted to specification.
                </h2>
                <p className={shellStyles.sectionCopy}>
                  Carbon-fibre barrels are built around fixed width, load and
                  fitment requirements. Pricing is confirmed after a technical
                  review rather than estimated online.
                </p>
              </div>
              <Link className="button-outline" href="/contact">
                Request carbon pricing
              </Link>
            </div>
          </div>
        </section>

        <section className={shellStyles.sectionAlt}>
          <div className="container">
            <div className={styles.inclusions}>
              <div>
                <p className="label">Included</p>
                <h2 className={shellStyles.sectionTitle}>
                  A complete set, clearly priced.
                </h2>
              </div>
              <ul>
                <li>Four custom-made forged wheels</li>
                <li>Standard MonzaWheels centre caps</li>
                <li>
                  Standard shipping Australia-wide · approximately 40 days
                  transit
                </li>
                <li>
                  Express shipping optional · AUD $800 · approximately 2 weeks
                  transit
                </li>
                <li>Shipping time is additional to production time</li>
                <li>Australian GST</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={shellStyles.ctaSection}>
          <div className={`${shellStyles.ctaPanel} container`}>
            <div>
              <p className="label">Next step</p>
              <h2 className={shellStyles.sectionTitle}>
                Get a quote built around your chassis.
              </h2>
              <p className={shellStyles.note}>
                The configurator is an indicative retail price. Final fitment,
                brake clearance and any price-on-request options are confirmed
                before production.
              </p>
            </div>
            <Link className="button-outline" href="/contact">
              Request a Quote
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
