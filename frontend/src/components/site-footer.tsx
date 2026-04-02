import Link from "next/link";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner} container`}>
        <div className={styles.grid}>
          <div className={styles.brandBlock}>
            <p className={styles.brand}>MNW</p>
            <p className={styles.copy}>
              Premium forged wheels machined to order for the exact car, then finished and delivered direct from Australia.
            </p>
          </div>

          <nav className={styles.nav} aria-label="Footer navigation">
            <Link href="/shop">Shop</Link>
            <Link href="/fitment">Fitment</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className={styles.metaLinks}>
            <a href="https://instagram.com/mnwwheels" rel="noreferrer noopener" target="_blank">
              Instagram
            </a>
            <Link href="/contact">Request a quote</Link>
            <Link href="/fitment">Fitment guide</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.meta}>&copy; {new Date().getFullYear()} MNW Pty Ltd.</p>
          <p className={styles.meta}>Brisbane, Australia</p>
        </div>
      </div>
    </footer>
  );
}
