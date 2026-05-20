import type { Metadata } from "next";
import { Cormorant_Garamond, Jura, Work_Sans } from "next/font/google";
import { BRAND_NAME } from "@/lib/brand";
import { SiteEffects } from "@/components/site-effects";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_SEO_DESCRIPTION,
  jsonLd,
  organizationJsonLd,
  resolveMetadataBase,
  websiteJsonLd,
} from "@/lib/seo";
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
  applicationName: BRAND_NAME,
  title: {
    default: `${BRAND_NAME} | Forged Wheels Australia`,
    template: `%s | ${BRAND_NAME}`,
  },
  description: DEFAULT_SEO_DESCRIPTION,
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  category: "Automotive",
  robots: {
    index: true,
    follow: true,
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? {
        google: process.env.GOOGLE_SITE_VERIFICATION,
      }
    : undefined,
  openGraph: {
    type: "website",
    siteName: BRAND_NAME,
    url: "/",
    title: `${BRAND_NAME} | Forged Wheels Australia`,
    description: DEFAULT_SEO_DESCRIPTION,
    locale: "en_AU",
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_NAME} | Forged Wheels Australia`,
    description: DEFAULT_SEO_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(organizationJsonLd())}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteJsonLd())} />
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
