import Link from "next/link";
import styles from "./site-header.module.css";

type SiteHeaderProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

export function SiteHeader({
  ctaHref = "/build",
  ctaLabel = "Start Your Build",
}: SiteHeaderProps) {
  return (
    <header className={styles.header}>
      <Link className={styles.wordmark} href="/">
        MNW
      </Link>
      <nav className={styles.nav}>
        <Link href="/#process">Process</Link>
        <Link href="/design-library">Design Library</Link>
        <Link href="/#delivered">Delivered Sets</Link>
      </nav>
      <Link className={styles.cta} href={ctaHref}>
        {ctaLabel}
      </Link>
    </header>
  );
}
