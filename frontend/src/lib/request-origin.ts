function firstHeaderValue(value: string | null): string {
  return value?.split(",")[0].trim() ?? "";
}

function originFrom(value?: string | null): string | null {
  if (!value) return null;

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

export function isAllowedFormOrigin(request: Request): boolean {
  const submittedOrigin = originFrom(
    request.headers.get("origin") ?? request.headers.get("referer"),
  );
  if (!submittedOrigin) return false;

  const allowedOrigins = new Set<string>();
  const addAllowedOrigin = (value?: string | null) => {
    const origin = originFrom(value);
    if (origin) allowedOrigins.add(origin);
  };

  addAllowedOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  if (process.env.VERCEL_URL) {
    addAllowedOrigin(`https://${process.env.VERCEL_URL}`);
  }

  // On Vercel and other reverse proxies, these headers identify the public
  // hostname the browser actually used, including custom domains and previews.
  const forwardedHost = firstHeaderValue(request.headers.get("x-forwarded-host"));
  const host = forwardedHost || firstHeaderValue(request.headers.get("host"));
  const forwardedProtocol = firstHeaderValue(request.headers.get("x-forwarded-proto"));
  const requestProtocol = originFrom(request.url)?.split(":")[0] ?? "";
  const protocol = forwardedProtocol || requestProtocol;
  if (host && (protocol === "http" || protocol === "https")) {
    addAllowedOrigin(`${protocol}://${host}`);
  }

  if (process.env.NODE_ENV !== "production") {
    addAllowedOrigin("http://localhost:3000");
  }

  return allowedOrigins.has(submittedOrigin);
}
