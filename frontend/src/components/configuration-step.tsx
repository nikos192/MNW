"use client";

import { type ReactNode, useId } from "react";
import styles from "./product-detail-client.module.css";

type Props = {
  number: number;
  title: string;
  summary: string;
  open: boolean;
  onEdit: () => void;
  onContinue: () => void;
  children: ReactNode;
  nextLabel?: string;
  disabled?: boolean;
};

export function ConfigurationStep({
  number,
  title,
  summary,
  open,
  onEdit,
  onContinue,
  children,
  nextLabel = "Continue",
  disabled = false,
}: Props) {
  const id = useId();
  return (
    <section className={styles.configStep}>
      <h2 className={styles.configHeading}>
        <button
          id={`${id}-heading`}
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onEdit}
        >
          <span className={styles.stepNumber}>
            {String(number).padStart(2, "0")}
          </span>
          <span className={styles.stepText}>
            <strong>{title}</strong>
            {!open && <span>{summary}</span>}
          </span>
          <span className={styles.stepAction}>{open ? "−" : "Edit +"}</span>
        </button>
      </h2>
      <div
        id={id}
        hidden={!open}
        aria-labelledby={`${id}-heading`}
        className={styles.stepBody}
      >
        {children}
        <button
          className={styles.nextStep}
          type="button"
          disabled={disabled}
          onClick={onContinue}
        >
          {nextLabel}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}
