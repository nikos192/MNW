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

const SITE_DESCRIPTION =
  "Premium forged wheels with fitment, offset, finish, assembly, and testing resolved around the exact chassis in Australia.";

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  title: {
    default: `${BRAND_NAME} | Forged Wheels Australia`,
    template: `%s | ${BRAND_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: BRAND_NAME,
    title: `${BRAND_NAME} | Forged Wheels Australia`,
    description: SITE_DESCRIPTION,
    locale: "en_AU",
    images: [
      {
        url: "/media/hero-wheel-poster.jpg",
        width: 1600,
        height: 900,
        alt: `${BRAND_NAME} forged wheels`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_NAME} | Forged Wheels Australia`,
    description: SITE_DESCRIPTION,
    images: ["/media/hero-wheel-poster.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} ${wordmarkFont.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteEffects />
        <SiteHeader />
        <div id="main-content">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
