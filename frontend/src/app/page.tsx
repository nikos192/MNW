import type { Metadata } from "next";
import Image from "next/image";
import { InterestForm } from "@/components/interest-form";
import { MonzaLogo } from "@/components/monza-logo";
import { BRAND_EMAIL, BRAND_INSTAGRAM_URL, BRAND_NAME } from "@/lib/brand";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import styles from "./early-access.module.css";

const EARLY_ACCESS_DESCRIPTION =
  "MonzaWheels is launching custom forged wheels in Australia. Register your interest for early access and request an early quote built around your exact car.";

export const metadata: Metadata = {
  title: "Early Access | Custom Forged Wheels Australia",
  description: EARLY_ACCESS_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
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

const wheelShots = [
  { src: 'MW-11 "Serraglio" 1.png', alt: 'MW-11 "Serraglio" forged monoblock wheel' },
  { src: 'MW-21 "Ascari" 1.png', alt: 'MW-21 "Ascari" 2-piece forged wheel' },
  { src: 'MW-11 "Serraglio" 2.PNG', alt: 'MW-11 "Serraglio" forged wheel, second view' },
  { src: 'MW-21 "Ascari" 2.JPG', alt: 'MW-21 "Ascari" forged wheel, second view' },
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
          <p className={styles.eyebrow}>Custom forged wheels · Australia</p>
          <h1 className={styles.heading}>
            Forged wheels, built around <em>your</em> car.
          </h1>
          <p className={styles.subheading}>
            We&apos;re getting ready to launch. The full catalogue is still in the
            works — but you can register your interest now for early access and an
            early quote on a set spec&apos;d around your exact car.
          </p>

          <div className={styles.formCard}>
            <p className={styles.formTitle}>Register your interest</p>
            <p className={styles.formCopy}>
              Drop your details and we&apos;ll reach out as designs go live. No spam,
              no commitment.
            </p>
            <InterestForm />
          </div>
        </div>

        <div className={styles.heroVisual}>
          <Image
            alt="Custom forged wheel by MonzaWheels"
            className={styles.heroImage}
            height={1400}
            priority
            sizes="(max-width: 899px) 92vw, 46vw"
            src={productSrc('MW-21 "Ascari" 1.png')}
            width={1400}
          />
        </div>
      </section>

      <section className={styles.gallery} aria-label="A first look at our wheels">
        <p className={styles.galleryLabel}>A first look</p>
        <div className={styles.galleryGrid}>
          {wheelShots.map((shot) => (
            <div className={styles.galleryItem} key={shot.src}>
              <Image
                alt={shot.alt}
                className={styles.galleryImage}
                height={900}
                sizes="(max-width: 599px) 50vw, (max-width: 899px) 33vw, 22vw"
                src={productSrc(shot.src)}
                width={900}
              />
            </div>
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
          © {new Date().getFullYear()} {BRAND_NAME}. Forged wheels designed in Australia.
        </p>
      </footer>
    </main>
  );
}
