import type { Metadata } from "next";
import { Jura, Work_Sans } from "next/font/google";
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
    default: "MNW | Forged Wheels Australia",
    template: "%s | MNW",
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
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body>
        <SiteEffects />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
