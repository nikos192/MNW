import type { Metadata } from "next";
import Link from "next/link";
import { BRAND_EMAIL, BRAND_LEGAL_NAME } from "@/lib/brand";
import {
  EXPRESS_SHIPPING_AUD,
  productionDays,
  shippingDays,
} from "@/lib/order-timelines";
import styles from "../privacypolicy/page.module.css";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description:
    "MonzaWheels shipping options, estimated production and transit times, tracking, delivery requirements and what to do if an order arrives damaged.",
  alternates: { canonical: "/shipping" },
};

const sections = [
  { id: "shipping-options", label: "Shipping options" },
  { id: "timing", label: "Production and transit" },
  { id: "delivery-area", label: "Delivery area" },
  { id: "address", label: "Delivery details" },
  { id: "tracking", label: "Tracking" },
  { id: "delays", label: "Delays" },
  { id: "damage", label: "Damage in transit" },
  { id: "contact", label: "Contact" },
];

export default function ShippingPolicyPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <div className={`${styles.heroInner} container`}>
          <p className="label">Customer policy</p>
          <h1 className={styles.heroTitle}>Shipping Policy</h1>
          <p className={styles.heroCopy}>
            Every MonzaWheels set is made to order, inspected and then shipped
            to the confirmed delivery address. Production time and shipping
            transit time are separate parts of the delivery estimate.
          </p>
          <p className={styles.updated}>Last updated 25 September 2026</p>
        </div>
      </header>

      <div className={`${styles.policyLayout} container`}>
        <aside
          className={styles.contents}
          aria-label="Shipping policy contents"
        >
          <p className={styles.contentsTitle}>On this page</p>
          <nav>
            <ol className={styles.contentsList}>
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {section.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className={styles.policy}>
          <section className={styles.introduction}>
            <p>
              <strong>Standard shipping is included Australia-wide</strong> in
              our advertised wheel-set pricing. Express shipping is available as
              an optional upgrade.
            </p>
            <p>
              All timeframes are estimates, not guaranteed delivery dates. We
              will provide tracking when the shipment has been dispatched and
              tracking information is available from the delivery partner.
            </p>
          </section>

          <section className={styles.policySection} id="shipping-options">
            <p className={styles.sectionNumber}>01</p>
            <h2>Shipping options</h2>
            <ul>
              <li>
                <strong>Standard shipping:</strong> included in the advertised
                price of a wheel set, with approximately {shippingDays.standard}{" "}
                days transit after production and dispatch.
              </li>
              <li>
                <strong>Express shipping:</strong> an optional AUD $
                {EXPRESS_SHIPPING_AUD} upgrade per wheel set, with approximately{" "}
                {shippingDays.express} days transit after production and
                dispatch.
              </li>
            </ul>
            <p>
              The shipping option selected on your approved order or quote will
              apply. Any delivery requirement outside these options will be
              confirmed separately before production.
            </p>
          </section>

          <section className={styles.policySection} id="timing">
            <p className={styles.sectionNumber}>02</p>
            <h2>Production and transit time</h2>
            <p>
              Shipping transit begins only after the wheels have been produced,
              inspected and dispatched. Our current estimated production times
              are approximately {productionDays["one-piece"]} days for one-piece
              forged wheels and {productionDays["two-piece"]} days for two-piece
              forged wheels.
            </p>
            <p>
              Your total estimated lead time is the applicable production time
              plus the selected shipping transit time. Bespoke programs or other
              constructions may have a different lead time, which we will
              confirm in the quote.
            </p>
          </section>

          <section className={styles.policySection} id="delivery-area">
            <p className={styles.sectionNumber}>03</p>
            <h2>Delivery area</h2>
            <p>
              The standard shipping included in our advertised prices applies to
              Australian delivery addresses. Regional and remote locations may
              take longer than the estimates shown above.
            </p>
            <p>
              For delivery outside Australia or an address with unusual freight
              access requirements, please{" "}
              <Link className={styles.textLink} href="/contact">
                contact us
              </Link>{" "}
              before ordering so availability, timing and any additional cost
              can be confirmed.
            </p>
          </section>

          <section className={styles.policySection} id="address">
            <p className={styles.sectionNumber}>04</p>
            <h2>Delivery details and access</h2>
            <p>
              Please provide a complete and accurate delivery address, recipient
              name and contact number. Tell us about access restrictions that
              may affect freight delivery before the order is dispatched.
            </p>
            <p>
              If an address needs to change, contact us as soon as possible. We
              cannot guarantee that a change can be made after dispatch, and any
              carrier charge created by a requested redirection or repeat
              delivery will be discussed with you before it is passed on.
            </p>
          </section>

          <section className={styles.policySection} id="tracking">
            <p className={styles.sectionNumber}>05</p>
            <h2>Tracking your shipment</h2>
            <p>
              We will provide a shipment number once tracking is available. A
              new shipment may take time to appear while the delivery partner
              receives and scans it into their network.
            </p>
            <Link className={styles.textLink} href="/tracking">
              Track your shipment
            </Link>
          </section>

          <section className={styles.policySection} id="delays">
            <p className={styles.sectionNumber}>06</p>
            <h2>Delays and delivery estimates</h2>
            <p>
              Production and transit estimates can be affected by manufacturing
              complexity, quality-control work, carrier capacity, customs,
              weather, public holidays, remote-area schedules and other events
              outside our reasonable control. A delay does not automatically
              mean that a shipment is lost.
            </p>
            <p>
              If tracking has not updated for an unusual period, contact us with
              your order and tracking details so we can investigate with the
              delivery partner.
            </p>
          </section>

          <section className={styles.policySection} id="damage">
            <p className={styles.sectionNumber}>07</p>
            <h2>Damage or an incorrect delivery</h2>
            <p>
              Inspect the packaging and wheels as soon as reasonably possible
              after delivery. If the packaging or wheels appear damaged, or the
              delivery differs from the confirmed order, keep all packaging and
              contact us promptly with your order details and clear photographs.
            </p>
            <p>
              Prompt notice helps us investigate with the delivery partner. It
              does not limit any rights you may have under the Australian
              Consumer Law. See our{" "}
              <Link className={styles.textLink} href="/returns">
                Returns &amp; Cancellations Policy
              </Link>{" "}
              for the assessment process and available remedies.
            </p>
          </section>

          <section className={styles.policySection} id="contact">
            <p className={styles.sectionNumber}>08</p>
            <h2>Contact us</h2>
            <address className={styles.contactCard}>
              <strong>{BRAND_LEGAL_NAME}</strong>
              <a href={`mailto:${BRAND_EMAIL}`}>{BRAND_EMAIL}</a>
              <span>Brisbane, Queensland, Australia</span>
            </address>
          </section>
        </article>
      </div>
    </main>
  );
}
