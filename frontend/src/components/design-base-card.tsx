import Link from "next/link";
import type { DesignLibraryItem } from "@/lib/design-library";
import styles from "./design-base-card.module.css";

type DesignBaseCardProps = {
  item: DesignLibraryItem;
  tone?: 1 | 2 | 3;
  ctaHref?: string;
  ctaLabel?: string;
};

export function DesignBaseCard({
  item,
  tone = 1,
  ctaHref = "/build",
  ctaLabel = "Start from this base",
}: DesignBaseCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.visual} data-tone={tone}>
        <div className={styles.wheel} />
      </div>
      <div className={styles.body}>
        <span className={styles.eyebrow}>{item.profile}</span>
        <h3 className={styles.title}>{item.name}</h3>
        {item.price ? <div className={styles.price}>From {item.price} / set</div> : null}
        <p className={styles.copy}>{item.description}</p>
        <div className={styles.metaList}>
          <div className={styles.metaItem}>
            <strong>Use case</strong>
            <span>{item.note}</span>
          </div>
          <div className={styles.metaItem}>
            <strong>Fitment focus</strong>
            <span>{item.fitmentFocus}</span>
          </div>
          <div className={styles.metaItem}>
            <strong>Finish direction</strong>
            <span>{item.finishDirection}</span>
          </div>
        </div>
        <Link className={styles.cta} href={ctaHref}>
          {ctaLabel}
        </Link>
      </div>
    </article>
  );
}
