"use client";

import { FormEvent, useState } from "react";
import styles from "./interest-form.module.css";

type SubmitState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
};

const initialState: SubmitState = { status: "idle", message: "" };

export function InterestForm() {
  const [state, setState] = useState<SubmitState>(initialState);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.status === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const valueFor = (name: string) => String(data.get(name) ?? "").trim();

    const email = valueFor("email");
    if (!email) {
      setState({ status: "error", message: "Please enter your email address." });
      return;
    }

    setState({ status: "submitting", message: "" });

    try {
      const response = await fetch("/api/register-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: valueFor("name"),
          email,
          phone: valueFor("phone"),
          vehicle: valueFor("vehicle"),
          message: valueFor("message"),
          honeypot: valueFor("website_url"),
        }),
      });

      const result = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setState({
          status: "error",
          message: result.error || "Something went wrong. Please try again.",
        });
        return;
      }

      form.reset();
      setState({
        status: "success",
        message: "You're on the list. We'll be in touch as designs go live.",
      });
    } catch {
      setState({
        status: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  }

  const isSubmitting = state.status === "submitting";

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div aria-hidden="true" className={styles.honeypot}>
        <label htmlFor="website_url">Leave this field empty</label>
        <input autoComplete="off" id="website_url" name="website_url" tabIndex={-1} type="text" />
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Name</span>
          <input
            autoComplete="name"
            className={styles.input}
            disabled={isSubmitting}
            name="name"
            placeholder="Your name"
            type="text"
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>
            Email <span className={styles.req}>*</span>
          </span>
          <input
            autoComplete="email"
            className={styles.input}
            disabled={isSubmitting}
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={styles.label}>Phone</span>
          <input
            autoComplete="tel"
            className={styles.input}
            disabled={isSubmitting}
            name="phone"
            placeholder="Optional"
            type="tel"
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Your car</span>
          <input
            className={styles.input}
            disabled={isSubmitting}
            name="vehicle"
            placeholder="e.g. BMW M3 G80"
            type="text"
          />
        </label>
      </div>

      <label className={styles.field}>
        <span className={styles.label}>Anything else? (optional)</span>
        <textarea
          className={styles.textarea}
          disabled={isSubmitting}
          name="message"
          placeholder="Sizes you're after, finish ideas, or just say hi."
          rows={3}
        />
      </label>

      <button className={styles.submit} disabled={isSubmitting} type="submit">
        {isSubmitting ? "Sending…" : "Register interest"}
      </button>

      <p
        aria-live="polite"
        className={`${styles.status} ${
          state.status === "success"
            ? styles.statusSuccess
            : state.status === "error"
              ? styles.statusError
              : ""
        }`}
      >
        {state.message}
      </p>
    </form>
  );
}
