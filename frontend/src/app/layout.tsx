import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Rajdhani } from "next/font/google";
import { BRAND_NAME } from "@/lib/brand";
import { SiteChrome } from "@/components/site-chrome";
import { SiteEffects } from "@/components/site-effects";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MetaPixel } from "@/components/meta-pixel";
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_SEO_DESCRIPTION,
  jsonLd,
  organizationJsonLd,
  resolveMetadataBase,
  websiteJsonLd,
} from "@/lib/seo";
import "./globals.css";

const headingFont = Barlow_Condensed({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const bodyFont = Rajdhani({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const wordmarkFont = Barlow_Condensed({
  variable: "--font-wordmark",
  subsets: ["latin"],
  weight: ["700"],
});

const logoIcon = "/brand/LOGO%20MW%20TP.png";

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#07111f",
};

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  applicationName: BRAND_NAME,
  manifest: "/manifest.webmanifest",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: logoIcon, sizes: "500x500", type: "image/png" },
    ],
    apple: [
      { url: logoIcon, sizes: "500x500", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    title: BRAND_NAME,
    statusBarStyle: "default",
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
        <MetaPixel />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(organizationJsonLd())}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteJsonLd())} />
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteEffects />
        <SiteChrome header={<SiteHeader />} footer={<SiteFooter />}>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
