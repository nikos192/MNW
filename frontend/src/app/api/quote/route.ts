import { NextResponse } from "next/server";
import { Resend } from "resend";
import { BRAND_EMAIL, BRAND_NAME } from "@/lib/brand";
import {
  buildCustomerConfirmationEmail,
  buildIntakeEmail,
  type QuoteEmailPayload,
} from "@/lib/quote-email";

export const runtime = "nodejs";

type QuoteRequestBody = QuoteEmailPayload;

function clean(value?: string) {
  return value?.trim() || "";
}

function isValidEmail(value: string) {
  return /.+@.+\..+/.test(value);
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

  let body: QuoteRequestBody;

  try {
    body = (await request.json()) as QuoteRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const customerName = clean(body.customer?.name);
  const customerEmail = clean(body.customer?.email);

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
        subject: intakeEmailContent.subject,
        text: intakeEmailContent.text,
        html: intakeEmailContent.html,
      }),
      resend.emails.send({
        from: fromEmail,
        to: [customerEmail],
        replyTo: intakeEmail,
        subject: customerConfirmation.subject,
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