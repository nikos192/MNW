"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackFunnelEvent } from "@/lib/meta-pixel";

type ConversionLinkProps = ComponentProps<typeof Link> & {
  eventName?: string;
  eventSource?: string;
};

export function ConversionLink({
  eventName = "QuoteCtaClick",
  eventSource = "website",
  onClick,
  ...props
}: ConversionLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackFunnelEvent(eventName, { source: eventSource });
        onClick?.(event);
      }}
    />
  );
}
