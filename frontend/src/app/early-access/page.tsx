import type { Metadata } from "next";
import Image from "next/image";
import { InterestForm } from "@/components/interest-form";
import { MonzaLogo } from "@/components/monza-logo";
import { BRAND_EMAIL, BRAND_INSTAGRAM_URL, BRAND_NAME } from "@/lib/brand";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import styles from "../early-access.module.css";

const EARLY_ACCESS_DESCRIPTION =
  "MonzaWheels is preparing its first release of custom forged wheels in Australia, built to the exact specification of your car. Register your interest for early access and a personal quote.";

export const metadata: Metadata = {
  title: "Early Access | Custom Forged Wheels Australia",
  description: EARLY_ACCESS_DESCRIPTION,
  alternates: {
    canonical: "/early-access",
  },
  openGraph: {
    type: "website",
    url: "/early-access",
    title: `${BRAND_NAME} | Early Access`,
    description: EARLY_ACCESS_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_NAME} | Early Access`,
    description: EARLY_ACCESS_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

const firstDesigns = [
  {
    name: "MW-11 “Serraglio”",
    series: "Monoblock · One-piece forged",
    src: 'MW-11 "Serraglio" 1.png',
    alt: "MW-11 Serraglio one-piece forged monoblock wheel",
  },
  {
    name: "MW-21 “Ascari”",
    series: "Two-piece forged",
    src: 'MW-21 "Ascari" 1.png',
    alt: "MW-21 Ascari two-piece forged wheel",
  },
];

function productSrc(fileName: string) {
  return `/products/${encodeURIComponent(fileName)}`;
}

export default function EarlyAccessPage() {
  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <MonzaLogo className={styles.logo} priority title={`${BRAND_NAME} logo`} />
        <span className={styles.badge}>Early Access</span>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Forged Wheels &middot; Australia</p>
          <h1 className={styles.heading}>Wheels forged around your car.</h1>
          <p className={styles.subheading}>
            {BRAND_NAME} is preparing its first release of custom forged wheels,
            each one built to the exact specification of your car. Register your
            interest for early access and a personal quote.
          </p>

          <div className={styles.formCard}>
            <p className={styles.formTitle}>Register your interest</p>
            <p className={styles.formCopy}>
              Leave your details and we will be in touch as the first designs
              become available.
            </p>
            <InterestForm />
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroPanel}>
            <Image
              alt="MW-21 Ascari forged wheel"
              className={styles.heroImage}
              height={1280}
              priority
              sizes="(max-width: 899px) 88vw, 46vw"
              src={productSrc('MW-21 "Ascari" 3.JPG')}
              width={1280}
            />
          </div>
        </div>
      </section>

      <section className={styles.designs} aria-labelledby="first-designs-title">
        <div className={styles.designsHeader}>
          <h2 className={styles.designsTitle} id="first-designs-title">
            The first designs
          </h2>
          <p className={styles.designsCopy}>
            Two forged programs to open the range. Final size, offset, and finish
            are resolved around your vehicle.
          </p>
        </div>

        <div className={styles.designsGrid}>
          {firstDesigns.map((design) => (
            <article className={styles.designCard} key={design.src}>
              <div className={styles.designPanel}>
                <Image
                  alt={design.alt}
                  className={styles.designImage}
                  height={1000}
                  sizes="(max-width: 899px) 88vw, 44vw"
                  src={productSrc(design.src)}
                  width={1000}
                />
              </div>
              <div className={styles.designMeta}>
                <p className={styles.designName}>{design.name}</p>
                <p className={styles.designSeries}>{design.series}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p className={styles.footerBrand}>{BRAND_NAME}</p>
        <div className={styles.footerLinks}>
          <a className={styles.footerLink} href={`mailto:${BRAND_EMAIL}`}>
            {BRAND_EMAIL}
          </a>
          <a
            className={styles.footerLink}
            href={BRAND_INSTAGRAM_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            Instagram
          </a>
        </div>
        <p className={styles.footerNote}>
          &copy; {new Date().getFullYear()} {BRAND_NAME}. Designed and engineered in
          Australia.
        </p>
      </footer>
    </main>
  );
}
