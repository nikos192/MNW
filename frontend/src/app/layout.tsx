import type { Metadata } from "next";
import { Cormorant_Garamond, Jura, Work_Sans } from "next/font/google";
import { BRAND_NAME } from "@/lib/brand";
import { SiteEffects } from "@/components/site-effects";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const headingFont = Work_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const bodyFont = Jura({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300"],
});

const wordmarkFont = Cormorant_Garamond({
  variable: "--font-wordmark",
  subsets: ["latin"],
  weight: ["600", "700"],
});

function resolveMetadataBase(): URL {
  const configuredSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL ?? "http://localhost:3000";
  const normalizedSiteUrl = /^https?:\/\//i.test(configuredSiteUrl)
    ? configuredSiteUrl
    : `https://${configuredSiteUrl}`;

  return new URL(normalizedSiteUrl);
}

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: {
    default: `${BRAND_NAME} | Forged Wheels Australia`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    "Premium forged wheels machined to order in Australia, with fitment, offset, finish, and brake clearance resolved around the exact chassis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} ${wordmarkFont.variable}`}>
      <body>
        <SiteEffects />
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
