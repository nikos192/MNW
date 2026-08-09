import { NextResponse } from "next/server";
import { Resend } from "resend";
import { BRAND_EMAIL, BRAND_NAME } from "@/lib/brand";
import {
  buildCustomerConfirmationEmail,
  buildIntakeEmail,
  type QuoteEmailPayload,
} from "@/lib/quote-email";
import { isAllowedFormOrigin } from "@/lib/request-origin";
import { sendMetaLeadConversion } from "@/lib/meta-conversions";

export const runtime = "nodejs";

type QuoteRequestBody = QuoteEmailPayload & { honeypot?: string };
type QuoteAttachment = {
  content: Buffer;
  filename: string;
};

// Per-field caps prevent oversized text payloads from reaching the inbox.
const FIELD_CAPS: ReadonlyArray<[string | undefined, number, string]> = [];

const SHORT_CAP = 200;
const MEDIUM_CAP = 500;
const NOTES_CAP = 5_000;
const EMAIL_CAP = 254;
const MAX_ATTACHMENTS = 3;
const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;
const MAX_TOTAL_ATTACHMENT_BYTES = 4 * 1024 * 1024;
const ALLOWED_ATTACHMENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

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

function getCookie(request: Request, name: string) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const prefix = `${name}=`;
  const cookie = cookieHeader.split(";").map((item) => item.trim()).find((item) => item.startsWith(prefix));
  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : undefined;
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
    [payload.tracking?.eventId, 100, "eventId"],
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
  if (!isAllowedFormOrigin(request)) {
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
  let attachments: QuoteAttachment[] = [];
  try {
    if (request.headers.get("content-type")?.includes("multipart/form-data")) {
      const formData = await request.formData();
      body = JSON.parse(String(formData.get("payload") ?? "")) as QuoteRequestBody;
      const files = formData
        .getAll("references")
        .filter((entry): entry is File => entry instanceof File && entry.size > 0);

      if (files.length > MAX_ATTACHMENTS) {
        return NextResponse.json(
          { error: `Upload no more than ${MAX_ATTACHMENTS} reference files.` },
          { status: 413 },
        );
      }
      if (files.reduce((total, file) => total + file.size, 0) > MAX_TOTAL_ATTACHMENT_BYTES) {
        return NextResponse.json(
          { error: "Reference uploads must be 4MB or smaller in total." },
          { status: 413 },
        );
      }

      for (const file of files) {
        if (!ALLOWED_ATTACHMENT_TYPES.has(file.type)) {
          return NextResponse.json(
            { error: "Reference files must be JPG, PNG, WebP, or PDF." },
            { status: 415 },
          );
        }
        if (file.size > MAX_ATTACHMENT_BYTES) {
          return NextResponse.json(
            { error: `Each reference file must be 4MB or smaller (${file.name}).` },
            { status: 413 },
          );
        }
      }

      attachments = await Promise.all(
        files.map(async (file) => ({
          content: Buffer.from(await file.arrayBuffer()),
          filename: file.name.replace(/[^\w.\- ()]/g, "_").slice(0, 180),
        })),
      );
    } else {
      body = (await request.json()) as QuoteRequestBody;
    }
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
        attachments,
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

    const eventId = clean(body.tracking?.eventId);
    if (eventId) {
      const quoteType = body.quoteContext?.quoteType ?? (body.quoteContext?.productHandle ? "wheel" : "custom");

      try {
        await sendMetaLeadConversion({
          contentIds: [body.quoteContext?.productHandle || "custom-forged-wheel"],
          contentName: body.quoteContext?.productTitle || "Custom design quote",
          eventId,
          eventSourceUrl: request.headers.get("referer") ?? undefined,
          clientIpAddress: ip,
          clientUserAgent: request.headers.get("user-agent") ?? undefined,
          email: customerEmail,
          phone: clean(body.customer?.phone),
          fbc: getCookie(request, "_fbc"),
          fbp: getCookie(request, "_fbp"),
          leadType: quoteType === "wheel" ? "wheel_quote" : "custom_quote",
        });
      } catch (metaError) {
        console.error("Failed to send Meta Lead conversion:", metaError);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send quote email:", error);

    return NextResponse.json(
      { error: "Quote request could not be sent. Please try again." },
      { status: 500 },
    );
  }
}
