import type { Metadata } from "next";
import { LockKeyhole, PackageCheck, Route } from "lucide-react";
import { breadcrumbJsonLd, DEFAULT_OG_IMAGE, jsonLd } from "@/lib/seo";
import { TrackingClient } from "./tracking-client";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Track Your Shipment",
  description:
    "Track a MonzaWheels shipment securely and view its current status, latest location and carrier scan history.",
  alternates: { canonical: "/tracking" },
  openGraph: {
    type: "website",
    url: "/tracking",
    title: "Track Your MonzaWheels Shipment",
    description:
      "Check the latest status, location and movement of your MonzaWheels shipment.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function TrackingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Track shipment", path: "/tracking" },
          ]),
        )}
      />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={`${styles.heroInner} container`}>
            <div className={styles.heroCopy}>
              <p className="label">Customer support</p>
              <h1 className={styles.title}>Track your shipment.</h1>
              <p className={styles.copy}>
                Follow your made-to-order wheels from the latest carrier scan to
                arrival. Enter the tracking number from your dispatch email
                below.
              </p>
            </div>

            <div
              className={styles.heroAssurance}
              aria-label="Tracking service details"
            >
              <div>
                <LockKeyhole size={19} strokeWidth={1.5} aria-hidden="true" />
                <span>Secure MonzaWheels lookup</span>
              </div>
              <div>
                <Route size={19} strokeWidth={1.5} aria-hidden="true" />
                <span>Chronological scan history</span>
              </div>
              <div>
                <PackageCheck size={19} strokeWidth={1.5} aria-hidden="true" />
                <span>Latest status and location</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.trackingSection}>
          <div className={`${styles.trackingInner} container`}>
            <TrackingClient />
          </div>
        </section>
      </main>
    </>
  );
}
