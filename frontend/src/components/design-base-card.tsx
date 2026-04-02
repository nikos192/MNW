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
    <article className={styles.card} data-tone={tone}>
      <div className={styles.visual} data-tone={tone}>
        <div className={styles.visualHead}>
          <span className={styles.serial}>Design Base</span>
          <span className={styles.profileTag}>{item.profile}</span>
        </div>
        <div className={styles.wheelField}>
          <div className={styles.wheel} />
        </div>
        <div className={styles.visualFoot}>
          <span>Fitment-led machining</span>
          <span>Finish tailored on approval</span>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.heading}>
          <div>
            <span className={styles.eyebrow}>MNW atelier spec</span>
            <h3 className={styles.title}>{item.name}</h3>
          </div>
          {item.price ? <div className={styles.price}>From {item.price} / set</div> : null}
        </div>
        <p className={styles.copy}>{item.description}</p>
        <div className={styles.metaList}>
          <div className={styles.metaItem}>
            <strong>Use case</strong>
            <p>{item.note}</p>
          </div>
          <div className={styles.metaItem}>
            <strong>Fitment focus</strong>
            <p>{item.fitmentFocus}</p>
          </div>
          <div className={styles.metaItem}>
            <strong>Finish direction</strong>
            <p>{item.finishDirection}</p>
          </div>
        </div>
        <div className={styles.footer}>
          <Link className={styles.cta} href={ctaHref}>
            {ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
