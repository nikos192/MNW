import Link from "next/link";
import {
  BRAND_FACEBOOK_URL,
  BRAND_INSTAGRAM_URL,
  BRAND_LEGAL_NAME,
  BRAND_NAME,
} from "@/lib/brand";
import { MonzaLogo } from "@/components/monza-logo";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 9h2.5V6H14c-1.66 0-3 1.34-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z" />
    </svg>
  );
}
import styles from "./site-footer.module.css";

const footerColumns = [
  {
    title: "Wheels",
    links: [
      { href: "/shop", label: "Wheels" },
      { href: "/collections/monoblock", label: "Monoblock" },
      { href: "/collections/multi-piece", label: "Multi-Piece" },
    ],
  },
  {
    title: "Explore",
    links: [
      { href: "/finishes", label: "Finishes" },
      { href: "/pricing", label: "Pricing" },
      { href: "/favourites", label: "On the car" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/contact?design=custom", label: "Custom design" },
      { href: "/contact", label: "Contact" },
      { href: "/warranty", label: "Warranty" },
      { href: "/returns", label: "Returns" },
      { href: "/tracking", label: "Track shipment" },
      { href: "/fitment-tool", label: "Fitment help" },
      { href: "/privacypolicy", label: "Privacy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <div className={styles.topRow}>
          <Link
            aria-label={`${BRAND_NAME} homepage`}
            className={styles.logoLink}
            href="/"
          >
            <MonzaLogo className={styles.logoMark} title={BRAND_NAME} />
          </Link>

          <div className={styles.socials}>
            <a
              aria-label={`${BRAND_NAME} Instagram`}
              className={styles.socialLink}
              href={BRAND_INSTAGRAM_URL}
              rel="noreferrer noopener"
              target="_blank"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              aria-label={`${BRAND_NAME} Facebook`}
              className={styles.socialLink}
              href={BRAND_FACEBOOK_URL}
              rel="noreferrer noopener"
              target="_blank"
            >
              <FacebookIcon size={18} />
            </a>
          </div>
        </div>

        <div className={styles.middleRow}>
          {footerColumns.map((column) => (
            <div key={column.title} className={styles.column}>
              <p className={styles.columnTitle}>{column.title}</p>
              <div className={styles.columnLinks}>
                {column.links.map((link) => (
                  <Link
                    key={link.href}
                    className={styles.columnLink}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.bottomRow}>
          <p
            className={styles.meta}
          >{`© ${new Date().getFullYear()} ${BRAND_LEGAL_NAME}. `}</p>
          <p className={styles.meta}>Brisbane, Australia</p>
        </div>
      </div>
    </footer>
  );
}
