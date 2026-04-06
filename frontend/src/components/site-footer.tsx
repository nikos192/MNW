import Link from "next/link";
import { BRAND_FACEBOOK_URL, BRAND_INSTAGRAM_URL, BRAND_LEGAL_NAME, BRAND_NAME } from "@/lib/brand";
import { MonzaLogo } from "@/components/monza-logo";
import styles from "./site-footer.module.css";

const footerColumns = [
  {
    title: "Wheels",
    links: [
      { href: "/shop", label: "All Wheels" },
      { href: "/finishes", label: "Finishes" },
      { href: "/fitment-tool", label: "Fitment Calculator" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/gallery", label: "Gallery" },
      { href: "/engineering", label: "Engineering" },
      { href: "/finishes", label: "Finishes" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: `About ${BRAND_NAME}` },
      { href: "/engineering", label: "Our Process" },
      { href: "/find-a-dealer", label: "Find a Dealer" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/fitment", label: "Sizing Guide" },
      { href: "/warranty", label: "Warranty" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <div className={styles.topRow}>
          <div className={styles.socials}>
            <a
              aria-label={`${BRAND_NAME} Instagram`}
              className={styles.socialLink}
              href={BRAND_INSTAGRAM_URL}
              rel="noreferrer noopener"
              target="_blank"
            >
              <span className={styles.socialMonogram}>IG</span>
            </a>
            <a
              aria-label={`${BRAND_NAME} Facebook`}
              className={styles.socialLink}
              href={BRAND_FACEBOOK_URL}
              rel="noreferrer noopener"
              target="_blank"
            >
              <span className={styles.socialMonogram}>FB</span>
            </a>
          </div>

          <Link aria-label={`${BRAND_NAME} homepage`} className={styles.logoLink} href="/">
            <MonzaLogo className={styles.logoMark} title={BRAND_NAME} />
          </Link>

          <div className={styles.ctaWrap}>
            <Link className={`button-outline ${styles.footerButton}`} href="/contact">
              Request a Quote
            </Link>
          </div>
        </div>

        <div className={styles.middleRow}>
          {footerColumns.map((column) => (
            <div key={column.title} className={styles.column}>
              <p className={styles.columnTitle}>{column.title}</p>
              <div className={styles.columnLinks}>
                {column.links.map((link) => (
                  <Link key={link.href} className={styles.columnLink} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.meta}>{`© ${new Date().getFullYear()} ${BRAND_LEGAL_NAME}. All rights reserved.`}</p>
          <p className={styles.meta}>Made in Brisbane, Australia</p>
        </div>
      </div>
    </footer>
  );
}
