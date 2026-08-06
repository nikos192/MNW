"use client";

import { usePathname } from "next/navigation";
import { ConversionLink } from "@/components/conversion-link";
import styles from "./mobile-quote-bar.module.css";

export function MobileQuoteBar() {
  const pathname = usePathname();

  if (pathname === "/contact" || pathname === "/early-access") return null;

  return (
    <div className={styles.bar}>
      <ConversionLink
        eventSource="mobile_sticky_bar"
        href="/contact?design=custom"
      >
        Save 10% <span aria-hidden="true">↗</span>
      </ConversionLink>
    </div>
  );
}
