"use client";

import { usePathname } from "next/navigation";
import { ConversionLink } from "@/components/conversion-link";
import styles from "./mobile-quote-bar.module.css";

export function MobileQuoteBar() {
  const pathname = usePathname();

  if (pathname === "/contact" || pathname === "/early-access") return null;

  return (
    <div className={styles.bar}>
      <div>
        <strong>Your design. Your fitment.</strong>
        <span>Upload an idea to begin</span>
      </div>
      <ConversionLink
        eventSource="mobile_sticky_bar"
        href="/contact?design=custom"
      >
        Get a quote
      </ConversionLink>
    </div>
  );
}
