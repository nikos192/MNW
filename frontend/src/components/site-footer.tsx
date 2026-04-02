import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>MNW</div>
        <div className={styles.meta}>Custom forged wheels · Brisbane, Australia</div>
      </div>
    </footer>
  );
}
