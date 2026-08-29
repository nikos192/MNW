"use client";

import { EXPRESS_SHIPPING_AUD, type ShippingOption } from "@/lib/order-timelines";
import styles from "./shipping-selector.module.css";

type ShippingSelectorProps = {
  value: ShippingOption;
  onChange: (value: ShippingOption) => void;
  name?: string;
};

export function ShippingSelector({ value, onChange, name = "shipping-option" }: ShippingSelectorProps) {
  const options: Array<{ value: ShippingOption; title: string; price: string; time: string }> = [
    { value: "standard", title: "Standard Shipping", price: "Included", time: "Approx. 40 days" },
    { value: "express", title: "Express Shipping", price: `AUD $${EXPRESS_SHIPPING_AUD}`, time: "Approx. 2 weeks" },
  ];
  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Choose shipping</legend>
      <p className={styles.note}>Shipping transit time is additional to production time.</p>
      <div className={styles.options}>
        {options.map((option) => (
          <label className={styles.option} data-selected={value === option.value} key={option.value}>
            <input
              checked={value === option.value}
              name={name}
              onChange={() => onChange(option.value)}
              type="radio"
              value={option.value}
            />
            <span className={styles.indicator} aria-hidden="true" />
            <span className={styles.copy}>
              <strong>{option.title}</strong>
              <span>{option.time} transit</span>
            </span>
            <span className={styles.price}>{option.price}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
