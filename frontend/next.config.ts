import type { NextConfig } from "next";

// Content-Security-Policy.
// 'unsafe-inline' is unavoidable for Next.js App Router without a nonce-based
// middleware setup — both for the inline runtime scripts and for next/image's
// inline width/height styles. The rest of the policy is tight: only same-origin
// scripts/styles, images locked to https + data + blob, connects limited to
// same-origin plus the configured Meta and Google measurement endpoints, no embedding in iframes,
// and HTTP requests upgraded to HTTPS.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://connect.facebook.net https://www.googletagmanager.com https://googleads.g.doubleclick.net https://www.googleadservices.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://connect.facebook.net https://www.facebook.com https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://www.google.com https://www.google.com.au https://googleads.g.doubleclick.net https://ad.doubleclick.net",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: csp,
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "**.myshopify.com",
      },
    ],
  },
};

export default nextConfig;
