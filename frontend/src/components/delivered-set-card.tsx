import type { DeliveredSet } from "@/lib/mnw-data";
import styles from "./delivered-set-card.module.css";

type DeliveredSetCardProps = {
  item: DeliveredSet;
};

export function DeliveredSetCard({ item }: DeliveredSetCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.media} />
      <div className={styles.body}>
        <h3 className={styles.title}>{item.chassis}</h3>
        <p className={styles.fitment}>{item.fitment}</p>
        <span className={styles.finish}>{item.finish}</span>
        <p className={styles.note}>{item.note}</p>
      </div>
    </article>
  );
}
