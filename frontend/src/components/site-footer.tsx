import Link from "next/link";
import { MnwDiamondMark } from "@/components/mnw-diamond-mark";
import styles from "./site-footer.module.css";

const footerColumns = [
  {
    title: "Wheels",
    links: [
      { href: "/collections/monoblock", label: "Monoblock Forged" },
      { href: "/collections/multi-piece", label: "Multi-Piece Forged" },
      { href: "/shop", label: "New Releases" },
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
      { href: "/about", label: "About MNW" },
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
              aria-label="MNW Instagram"
              className={styles.socialLink}
              href="https://instagram.com/mnwwheels"
              rel="noreferrer noopener"
              target="_blank"
            >
              <span className={styles.socialMonogram}>IG</span>
            </a>
            <a
              aria-label="MNW Facebook"
              className={styles.socialLink}
              href="https://facebook.com"
              rel="noreferrer noopener"
              target="_blank"
            >
              <span className={styles.socialMonogram}>FB</span>
            </a>
          </div>

          <Link aria-label="MNW homepage" className={styles.logoLink} href="/">
            <MnwDiamondMark className={styles.logoMark} title="MNW" />
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
          <p className={styles.meta}>© 2024 MNW Wheels. All rights reserved.</p>
          <p className={styles.meta}>Made in Brisbane, Australia</p>
        </div>
      </div>
    </footer>
  );
}
