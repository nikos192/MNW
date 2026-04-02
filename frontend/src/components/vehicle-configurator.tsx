"use client";

import Link from "next/link";
import { useState } from "react";
import { vehicleData } from "@/lib/mnw-data";
import styles from "./vehicle-configurator.module.css";

export function VehicleConfigurator() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  const models = make && vehicleData[make] ? Object.keys(vehicleData[make]) : [];
  const years = make && model && vehicleData[make]?.[model] ? vehicleData[make][model] : [];

  const href = make && model && year
    ? `/fitment?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&year=${encodeURIComponent(year)}`
    : "/fitment";

  return (
    <div className={styles.panel} data-reveal>
      <p className={`label ${styles.label}`}>Fitment brief</p>
      <h2 className={styles.heading}>Start from the car, then spec the wheel around it.</h2>
      <p className={styles.copy}>
        Tell us the make, the chassis, and the year. The final wheel diameter,
        width, offset, brake clearance, and finish are resolved as one
        made-to-order package.
      </p>

      <form className={styles.form}>
        <div className={styles.fields}>
          <label className="visually-hidden" htmlFor="vehicle-make">Make</label>
          <select
            className={styles.select}
            id="vehicle-make"
            name="make"
            onChange={(event) => {
              const nextMake = event.target.value;
              setMake(nextMake);
              setModel("");
              setYear("");
            }}
            value={make}
          >
            <option value="">Make</option>
            {Object.keys(vehicleData).map((entry) => (
              <option key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </select>

          <label className="visually-hidden" htmlFor="vehicle-model">Model</label>
          <select
            className={styles.select}
            disabled={!models.length}
            id="vehicle-model"
            name="model"
            onChange={(event) => {
              setModel(event.target.value);
              setYear("");
            }}
            value={model}
          >
            <option value="">Model</option>
            {models.map((entry) => (
              <option key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </select>

          <label className="visually-hidden" htmlFor="vehicle-year">Year</label>
          <select
            className={styles.select}
            disabled={!years.length}
            id="vehicle-year"
            name="year"
            onChange={(event) => setYear(event.target.value)}
            value={year}
          >
            <option value="">Year</option>
            {years.map((entry) => (
              <option key={entry} value={String(entry)}>
                {entry}
              </option>
            ))}
          </select>
        </div>

        <Link
          aria-disabled={!(make && model && year)}
          className={`button-outline ${styles.button} ${make && model && year ? styles.active : ""}`}
          href={href}
        >
          See available fitments
        </Link>
      </form>

      <p className={styles.note}>
        Need a wider brief? <Link href="/contact">Request a quote</Link>
      </p>
    </div>
  );
}