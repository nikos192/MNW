import { orderSteps } from "@/lib/order-timelines";
import styles from "./order-journey.module.css";

type OrderJourneyProps = {
  compact?: boolean;
  className?: string;
};

export function OrderJourney({ compact = false, className = "" }: OrderJourneyProps) {
  return (
    <section
      className={`${styles.journey} ${compact ? styles.compact : ""} ${className}`}
      aria-labelledby={compact ? undefined : "order-journey-title"}
    >
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>How your order works</p>
          <h2 id={compact ? undefined : "order-journey-title"}>Approve it before we make it.</h2>
        </div>
        <p className={styles.promise}>
          <strong>3D render provided before production.</strong>
          You review the design and fitment before manufacturing begins.
        </p>
      </div>
      <ol className={styles.steps}>
        {orderSteps.map(([number, title, copy]) => (
          <li key={number}>
            <span className={styles.number}>{number}</span>
            <div><h3>{title}</h3><p>{copy}</p></div>
          </li>
        ))}
      </ol>
    </section>
  );
}
