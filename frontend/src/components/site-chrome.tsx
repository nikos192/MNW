"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Routes that render as a standalone page without the global header/footer.
const BARE_ROUTES = new Set<string>(["/early-access"]);

type SiteChromeProps = {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
};

export function SiteChrome({ header, footer, children }: SiteChromeProps) {
  const pathname = usePathname();
  const isBare = BARE_ROUTES.has(pathname);

  return (
    <>
      {!isBare && header}
      <div id="main-content">{children}</div>
      {!isBare && footer}
    </>
  );
}
