"use client";

import { FormEvent, useState } from "react";
import { BRAND_NAME } from "@/lib/brand";
import styles from "./build-form.module.css";

type InitialValues = {
  make?: string;
  model?: string;
  year?: string;
  diameter?: string;
  finish?: string;
};

type BuildFormProps = {
  email: string;
  initialNotes?: string;
  initialValues?: InitialValues;
};

const fields = [
  { id: "make", label: "Vehicle make", type: "text", placeholder: "BMW" },
  { id: "model", label: "Vehicle model", type: "text", placeholder: "G80 M3" },
  { id: "year", label: "Vehicle year", type: "text", placeholder: "2024" },
  { id: "brakes", label: "Brake package", type: "text", placeholder: "Carbon ceramics / factory steel / big brake kit" },
  { id: "suspension", label: "Suspension / ride height", type: "text", placeholder: "Factory, lowered, or coilovers" },
  { id: "diameter", label: "Preferred diameter", type: "text", placeholder: "19 / 20 / open to guidance" },
  { id: "finish", label: "Finish direction", type: "text", placeholder: "Brushed clear / satin graphite / bronze" },
  { id: "references", label: "Reference links", type: "text", placeholder: "Instagram, Pinterest, or car photos" },
] as const;

export function BuildForm({ email, initialNotes = "", initialValues = {} }: BuildFormProps) {
  const [notes, setNotes] = useState(initialNotes);

  function getDefaultValue(id: string): string {
    switch (id) {
      case "make": return initialValues.make ?? "";
      case "model": return initialValues.model ?? "";
      case "year": return initialValues.year ?? "";
      case "diameter": return initialValues.diameter ?? "";
      case "finish": return initialValues.finish ?? "";
      default: return "";
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const lines = fields.map((field) => {
      const value = String(formData.get(field.id) ?? "").trim();
      return `${field.label}: ${value || "Not provided"}`;
    });

    const body = `${lines.join("\n")}\n\nProject notes:\n${notes || "Not provided"}`;
    const subject = `${BRAND_NAME} Build Brief`;

    window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.grid}>
        {fields.map((field) => (
          <label key={field.id} className={styles.field}>
            <span>{field.label}</span>
            <input
              name={field.id}
              type={field.type}
              placeholder={field.placeholder}
              defaultValue={getDefaultValue(field.id)}
            />
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
        Request a Quote
      </button>
      <p className={styles.help}>
        {`This opens your email app with the build brief pre-filled so you can send it straight to ${BRAND_NAME}.`}
      </p>
    </form>
  );
}
