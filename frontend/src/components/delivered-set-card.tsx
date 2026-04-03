import Image from "next/image";
import { GlowCard } from "@/components/ui/spotlight-card";
import type { DeliveredSet } from "@/lib/monza-data";
import styles from "./delivered-set-card.module.css";

type DeliveredSetCardProps = {
  item: DeliveredSet;
};

export function DeliveredSetCard({ item }: DeliveredSetCardProps) {
  return (
    <article className={styles.card}>
      <GlowCard className={styles.glowCard} customSize glowColor="orange">
        <div className={styles.media}>
          <Image
            alt={item.chassis}
            className={styles.image}
            loading="lazy"
            src={item.image}
            sizes="(max-width: 1024px) 50vw, 33vw"
            width={1200}
            height={1200}
          />
        </div>
        <div className={styles.body}>
          <h3 className={styles.title}>{item.chassis}</h3>
          <div className={styles.specs}>
            <p className={styles.fitment}>{item.fitment}</p>
            <span className={styles.finish}>{item.finish}</span>
          </div>
          <p className={styles.note}>{item.note}</p>
        </div>
      </GlowCard>
    </article>
  );
}
