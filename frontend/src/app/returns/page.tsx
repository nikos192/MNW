import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_EMAIL, BRAND_LEGAL_NAME } from "@/lib/brand";
import styles from "../privacypolicy/page.module.css";

export const metadata: Metadata = {
  title: "Returns and Cancellations Policy",
  description:
    "MonzaWheels policy for change-of-mind returns, made-to-order cancellations, damaged deliveries and remedies under Australian Consumer Law.",
  alternates: { canonical: "/returns" },
};

const sections = [
  { id: "made-to-order", label: "Made-to-order products" },
  { id: "change-of-mind", label: "Change of mind" },
  { id: "approval", label: "Approval and cancellation" },
  { id: "customer-details", label: "Customer-supplied details" },
  { id: "delivery", label: "Delivery issues" },
  { id: "consumer-guarantees", label: "Consumer guarantees" },
  { id: "assessment", label: "Assessment process" },
  { id: "contact", label: "Contact" },
];

export default function ReturnsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={`${styles.heroInner} container`}>
          <p className="label">Customer policy</p>
          <h1 className={styles.heroTitle}>Returns &amp; Cancellations</h1>
          <p className={styles.heroCopy}>
            Every MonzaWheels set is made to order around an approved design and vehicle
            specification. We do not accept returns or provide refunds simply because a
            customer changes their mind.
          </p>
          <p className={styles.updated}>Last updated 4 September 2026</p>
        </div>
      </header>

      <div className={`${styles.policyLayout} container`}>
        <aside className={styles.contents} aria-label="Returns policy contents">
          <p className={styles.contentsTitle}>On this page</p>
          <nav><ol className={styles.contentsList}>{sections.map((section, index) => (
            <li key={section.id}><a href={`#${section.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{section.label}</a></li>
          ))}</ol></nav>
        </aside>

        <article className={styles.policy}>
          <section className={styles.introduction}>
            <p><strong>Please choose carefully.</strong> Custom forged wheels cannot usually be resold because their dimensions, fitment, finish and design are produced for a specific customer and vehicle.</p>
            <p>Nothing in this policy excludes, restricts or modifies any right or remedy that cannot lawfully be excluded under the Australian Consumer Law or other applicable law.</p>
          </section>

          <section className={styles.policySection} id="made-to-order">
            <p className={styles.sectionNumber}>01</p><h2>Made-to-order products</h2>
            <p>MonzaWheels products are manufactured to an approved order specification. This may include the design, construction, diameter, width, offset, PCD, centre bore, brake clearance, finish and centre-cap selection.</p>
            <p>Customers are given the opportunity to review the final design or 3D render and confirmed order details before approving production.</p>
          </section>

          <section className={styles.policySection} id="change-of-mind">
            <p className={styles.sectionNumber}>02</p><h2>No change-of-mind returns</h2>
            <p>To the extent permitted by law, we do not accept returns, exchanges or cancellations because you:</p>
            <ul>
              <li>changed your mind, no longer want the wheels or no longer own the vehicle;</li>
              <li>prefer a different design, colour, finish, size, stance or visual result after approving the specification;</li>
              <li>found another product or price elsewhere; or</li>
              <li>ordered the wrong product or supplied incorrect information.</li>
            </ul>
            <p>This change-of-mind exclusion does not apply where a remedy is required by law.</p>
          </section>

          <section className={styles.policySection} id="approval">
            <p className={styles.sectionNumber}>03</p><h2>Design approval and cancellation</h2>
            <p>Production begins only after the final render or drawing and order specification have been approved. Please check every detail carefully before approving production.</p>
            <p>Once production has begun, a made-to-order purchase cannot be cancelled, changed or refunded for change of mind. Requests received before production begins will be considered against the status of the order, but acceptance is not guaranteed. We will explain any work already completed or costs already incurred before agreeing to a change.</p>
          </section>

          <section className={styles.policySection} id="customer-details">
            <p className={styles.sectionNumber}>04</p><h2>Customer-supplied details</h2>
            <p>You must provide accurate vehicle, brake, suspension and modification information and tell us about any changes made before production. Where wheels are manufactured exactly to an approved specification, a remedy may not be available for a problem caused by incorrect, incomplete or subsequently changed customer information.</p>
            <p>This does not remove MonzaWheels’ responsibility for fitment information that we expressly confirm, or any consumer guarantee that applies by law.</p>
          </section>

          <section className={styles.policySection} id="delivery">
            <p className={styles.sectionNumber}>05</p><h2>Delivery damage or incorrect supply</h2>
            <p>Inspect the packaging and wheels as soon as reasonably possible after delivery and keep the packaging while an issue is assessed. If an item appears damaged in transit or different from the confirmed order, contact us promptly with your order details and clear photographs.</p>
            <p>Prompt notice helps us investigate with the carrier, but it does not impose a fixed time limit on rights that apply under the Australian Consumer Law.</p>
          </section>

          <section className={styles.policySection} id="consumer-guarantees">
            <p className={styles.sectionNumber}>06</p><h2>Australian Consumer Law</h2>
            <p>Our goods and services come with guarantees that cannot be excluded under the Australian Consumer Law. Depending on the circumstances, a failure may entitle you to a repair, replacement, refund, resupply or compensation.</p>
            <p>For a major problem with goods, an eligible consumer may reject the goods and choose a refund or replacement. For a minor problem, we may choose to repair the product within a reasonable time. Your rights depend on the nature of the problem and the applicable law.</p>
            <p>Our separate <Link className={styles.textLink} href="/warranty">five-year warranty</Link> operates in addition to, and does not replace, these rights.</p>
          </section>

          <section className={styles.policySection} id="assessment">
            <p className={styles.sectionNumber}>07</p><h2>Assessment and return authorisation</h2>
            <p>Contact us before sending wheels back. We may request photographs, fitment and installation records, vehicle details or an inspection so we can understand the issue and determine the appropriate remedy.</p>
            <p>Do not return a wheel without receiving return instructions. Unauthorised freight may delay assessment, and responsibility for reasonable return costs will be determined according to the nature of the issue and applicable law.</p>
          </section>

          <section className={styles.policySection} id="contact">
            <p className={styles.sectionNumber}>08</p><h2>Contact us</h2>
            <address className={styles.contactCard}><strong>{BRAND_LEGAL_NAME}</strong><a href={`mailto:${BRAND_EMAIL}`}>{BRAND_EMAIL}</a><span>Brisbane, Queensland, Australia</span></address>
          </section>
        </article>
      </div>
    </main>
  );
}
