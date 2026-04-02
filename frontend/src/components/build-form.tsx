"use client";

import { FormEvent, useState } from "react";
import styles from "./build-form.module.css";

type BuildFormProps = {
  email: string;
};

const fields = [
  { id: "make", label: "Vehicle make", type: "text" },
  { id: "model", label: "Vehicle model", type: "text" },
  { id: "year", label: "Vehicle year", type: "text" },
  { id: "brakes", label: "Brake package", type: "text" },
  { id: "suspension", label: "Suspension / ride height", type: "text" },
  { id: "diameter", label: "Preferred diameter", type: "text" },
  { id: "finish", label: "Finish direction", type: "text" },
  { id: "references", label: "Reference links", type: "text" },
] as const;

export function BuildForm({ email }: BuildFormProps) {
  const [notes, setNotes] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const lines = fields.map((field) => {
      const value = String(formData.get(field.id) ?? "").trim();
      return `${field.label}: ${value || "Not provided"}`;
    });

    const body = `${lines.join("\n")}\n\nProject notes:\n${notes || "Not provided"}`;
    const subject = "MNW Build Brief";

    window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.grid}>
        {fields.map((field) => (
          <label key={field.id} className={styles.field}>
            <span>{field.label}</span>
            <input name={field.id} type={field.type} />
          </label>
        ))}
        <label className={styles.fieldWide}>
          <span>Project notes</span>
          <textarea
            name="notes"
            rows={6}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Tell us about the look you want, wheel style preferences, and anything important about the car."
          />
        </label>
      </div>
      <button className={styles.button} type="submit">
        Send Build Brief
      </button>
      <p className={styles.help}>
        This opens your email app with the brief pre-filled so you can send it straight to MNW.
      </p>
    </form>
  );
}
