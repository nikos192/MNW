import { NextResponse } from "next/server";
import { Resend } from "resend";
import { BRAND_EMAIL, BRAND_NAME } from "@/lib/brand";
import {
  buildCustomerConfirmationEmail,
  buildIntakeEmail,
  type QuoteEmailPayload,
} from "@/lib/quote-email";

export const runtime = "nodejs";

type QuoteRequestBody = QuoteEmailPayload & { honeypot?: string };

// Per-field caps so a malicious client can't push 10 MB into the inbox.
const FIELD_CAPS: ReadonlyArray<[string | undefined, number, string]> = [];

const SHORT_CAP = 200;
const MEDIUM_CAP = 500;
const NOTES_CAP = 5_000;
const EMAIL_CAP = 254;

// Simple in-memory sliding-window rate limiter. Only effective per lambda
// instance, but still slows down naive bots and accidental double-submits.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const recentRequests = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  const history = (recentRequests.get(ip) ?? []).filter((time) => time > cutoff);
  if (history.length >= RATE_LIMIT_MAX) {
    recentRequests.set(ip, history);
    return true;
  }
  history.push(now);
  recentRequests.set(ip, history);
  return false;
}

function clean(value?: string): string {
  return value?.trim() ?? "";
}

function stripCrlf(value: string): string {
  return value.replace(/[\r\n]+/g, " ");
}

function isValidEmail(value: string): boolean {
  if (value.length > EMAIL_CAP) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function getAllowedOrigins(): string[] {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  const allowed = [
    explicit,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
    process.env.NODE_ENV !== "production" ? "http://localhost:3000" : undefined,
  ].filter(Boolean) as string[];
  return allowed.map((url) => url.replace(/\/$/, ""));
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin") ?? request.headers.get("referer") ?? "";
  if (!origin) return false;
  const allowed = getAllowedOrigins();
  if (allowed.length === 0) return true; // No SITE_URL configured — accept (dev fallback)
  return allowed.some((url) => origin.startsWith(url));
}

function tooBig(payload: QuoteRequestBody): string | null {
  // Returns the first oversized field name, or null if all fit.
  const checks: Array<[string | undefined, number, string]> = [
    ...FIELD_CAPS,
    [payload.customer?.name, SHORT_CAP, "name"],
    [payload.customer?.email, EMAIL_CAP, "email"],
    [payload.customer?.phone, 60, "phone"],
    [payload.vehicle?.make, 100, "make"],
    [payload.vehicle?.model, 100, "model"],
    [payload.vehicle?.year, 20, "year"],
    [payload.vehicle?.brakes, SHORT_CAP, "brakes"],
    [payload.vehicle?.suspension, SHORT_CAP, "suspension"],
    [payload.wheel?.diameter, 100, "diameter"],
    [payload.wheel?.width, 100, "width"],
    [payload.wheel?.pcd, 60, "pcd"],
    [payload.wheel?.offset, 60, "offset"],
    [payload.wheel?.centrebore, 60, "centrebore"],
    [payload.wheel?.finish, 100, "finish"],
    [payload.wheel?.capColour, 100, "capColour"],
    [payload.wheel?.references, MEDIUM_CAP, "references"],
    [payload.notes, NOTES_CAP, "notes"],
    [payload.quoteContext?.productTitle, SHORT_CAP, "productTitle"],
    [payload.quoteContext?.productHandle, 100, "productHandle"],
    [payload.quoteContext?.startingPrice, SHORT_CAP, "startingPrice"],
  ];
  for (const [value, max, field] of checks) {
    if (value !== undefined && value.length > max) return field;
  }
  return null;
}

export async function POST(request: Request) {
  const resendKey = process.env.RESEND_KEY || process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || `${BRAND_NAME} <onboarding@resend.dev>`;
  const intakeEmail = process.env.BUILD_INTAKE_EMAIL || BRAND_EMAIL;

  if (!resendKey) {
    return NextResponse.json(
      { error: "Quote email is not configured on the server." },
      { status: 500 },
    );
  }

  // Origin / referer must match the configured site URL.
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin." }, { status: 403 });
  }

  // Per-IP rate limit so a single bot can't drain Resend credits.
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a moment." },
      { status: 429 },
    );
  }

  let body: QuoteRequestBody;
  try {
    body = (await request.json()) as QuoteRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  // Honeypot — legitimate forms leave this blank.
  if (clean(body.honeypot)) {
    // Silently succeed so the bot stops retrying.
    return NextResponse.json({ ok: true });
  }

  const oversizedField = tooBig(body);
  if (oversizedField) {
    return NextResponse.json(
      { error: `Field "${oversizedField}" is too long.` },
      { status: 413 },
    );
  }

  const customerName = clean(body.customer?.name);
  const customerEmail = stripCrlf(clean(body.customer?.email));

  if (!customerName || !customerEmail) {
    return NextResponse.json(
      { error: "Name and email are required so we can reply to the quote request." },
      { status: 400 },
    );
  }

  if (!isValidEmail(customerEmail)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const intakeEmailContent = buildIntakeEmail(body);
  const customerConfirmation = buildCustomerConfirmationEmail(body);

  try {
    const resend = new Resend(resendKey);

    await Promise.all([
      resend.emails.send({
        from: fromEmail,
        to: [intakeEmail],
        replyTo: customerEmail,
        subject: stripCrlf(intakeEmailContent.subject),
        text: intakeEmailContent.text,
        html: intakeEmailContent.html,
      }),
      resend.emails.send({
        from: fromEmail,
        to: [customerEmail],
        replyTo: intakeEmail,
        subject: stripCrlf(customerConfirmation.subject),
        text: customerConfirmation.text,
        html: customerConfirmation.html,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send quote email:", error);

    return NextResponse.json(
      { error: "Quote request could not be sent. Please try again." },
      { status: 500 },
    );
  }
}
