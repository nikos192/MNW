import { NextResponse } from "next/server";
import { Resend } from "resend";
import { BRAND_EMAIL, BRAND_NAME } from "@/lib/brand";

export const runtime = "nodejs";

type InterestRequestBody = {
  name?: string;
  email?: string;
  phone?: string;
  vehicle?: string;
  message?: string;
  honeypot?: string;
};

const NAME_CAP = 200;
const EMAIL_CAP = 254;
const PHONE_CAP = 60;
const VEHICLE_CAP = 200;
const MESSAGE_CAP = 2_000;

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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
  const allowed = [
    process.env.NEXT_PUBLIC_SITE_URL,
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

function tooBig(body: InterestRequestBody): string | null {
  const checks: Array<[string | undefined, number, string]> = [
    [body.name, NAME_CAP, "name"],
    [body.email, EMAIL_CAP, "email"],
    [body.phone, PHONE_CAP, "phone"],
    [body.vehicle, VEHICLE_CAP, "vehicle"],
    [body.message, MESSAGE_CAP, "message"],
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
      { error: "Registration is not configured on the server." },
      { status: 500 },
    );
  }

  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden origin." }, { status: 403 });
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a moment." },
      { status: 429 },
    );
  }

  let body: InterestRequestBody;
  try {
    body = (await request.json()) as InterestRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  // Honeypot — legitimate forms leave this blank.
  if (clean(body.honeypot)) {
    return NextResponse.json({ ok: true });
  }

  const oversizedField = tooBig(body);
  if (oversizedField) {
    return NextResponse.json(
      { error: `Field "${oversizedField}" is too long.` },
      { status: 413 },
    );
  }

  const email = stripCrlf(clean(body.email));
  if (!email) {
    return NextResponse.json(
      { error: "An email address is required so we can reach you." },
      { status: 400 },
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const name = clean(body.name);
  const phone = clean(body.phone);
  const vehicle = clean(body.vehicle);
  const message = clean(body.message);

  const rows: Array<[string, string]> = [
    ["Name", name || "Not provided"],
    ["Email", email],
    ["Phone", phone || "Not provided"],
    ["Vehicle", vehicle || "Not provided"],
    ["Message", message || "Not provided"],
  ];

  const textLines = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#5b6b7c;font:14px/1.5 system-ui;vertical-align:top"><strong>${escapeHtml(
          label,
        )}</strong></td><td style="padding:6px 0;color:#06101c;font:14px/1.5 system-ui">${escapeHtml(
          value,
        )}</td></tr>`,
    )
    .join("");

  try {
    const resend = new Resend(resendKey);

    await resend.emails.send({
      from: fromEmail,
      to: [intakeEmail],
      replyTo: email,
      subject: stripCrlf(`Early access interest — ${name || email}`),
      text: `New early-access registration for ${BRAND_NAME}.\n\n${textLines}`,
      html: `<div style="font:14px/1.6 system-ui;color:#06101c"><p style="margin:0 0 16px">New early-access registration for <strong>${escapeHtml(
        BRAND_NAME,
      )}</strong>.</p><table style="border-collapse:collapse">${htmlRows}</table></div>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send interest registration:", error);
    return NextResponse.json(
      { error: "Could not register your interest. Please try again." },
      { status: 500 },
    );
  }
}
