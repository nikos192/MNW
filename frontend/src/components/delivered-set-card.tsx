import type { DeliveredSet } from "@/lib/mnw-data";
import styles from "./delivered-set-card.module.css";

type DeliveredSetCardProps = {
  item: DeliveredSet;
};

export function DeliveredSetCard({ item }: DeliveredSetCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <span className={styles.badge}>Delivered Set</span>
        <div className={styles.axle} />
        <div className={styles.wheelLeft} />
        <div className={styles.wheelRight} />
      </div>
      <div className={styles.body}>
        <span className={styles.eyebrow}>Real chassis reference</span>
        <h3 className={styles.title}>{item.chassis}</h3>
        <div className={styles.specs}>
          <p className={styles.fitment}>{item.fitment}</p>
          <span className={styles.finish}>{item.finish}</span>
        </div>
        <p className={styles.note}>{item.note}</p>
      </div>
    </article>
  );
}
