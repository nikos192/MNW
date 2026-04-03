import { NextResponse } from "next/server";
import { Resend } from "resend";
import { BRAND_EMAIL, BRAND_NAME } from "@/lib/brand";

export const runtime = "nodejs";

type QuoteRequestBody = {
  quoteContext?: {
    productHandle?: string;
    productTitle?: string;
    startingPrice?: string;
  };
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  vehicle?: {
    make?: string;
    model?: string;
    year?: string;
    brakes?: string;
    suspension?: string;
  };
  wheel?: {
    diameter?: string;
    width?: string;
    pcd?: string;
    offset?: string;
    centrebore?: string;
    finish?: string;
    references?: string;
  };
  notes?: string;
};

function clean(value?: string) {
  return value?.trim() || "";
}

function formatLine(label: string, value?: string) {
  return `${label}: ${clean(value) || "Not provided"}`;
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

  const subject = clean(body.quoteContext?.productTitle)
    ? `${BRAND_NAME} Quote Request - ${clean(body.quoteContext?.productTitle)}`
    : `${BRAND_NAME} Quote Request`;

  const text = [
    `${BRAND_NAME} Quote Request`,
    "",
    "Customer:",
    formatLine("Name", customerName),
    formatLine("Email", customerEmail),
    formatLine("Phone", body.customer?.phone),
    "",
    "Product context:",
    formatLine("Product", body.quoteContext?.productTitle),
    formatLine("Product handle", body.quoteContext?.productHandle),
    formatLine("Starting price shown", body.quoteContext?.startingPrice),
    "",
    "Vehicle details:",
    formatLine("Vehicle make", body.vehicle?.make),
    formatLine("Vehicle model", body.vehicle?.model),
    formatLine("Vehicle year", body.vehicle?.year),
    formatLine("Brake package", body.vehicle?.brakes),
    formatLine("Suspension / ride height", body.vehicle?.suspension),
    "",
    "Wheel brief:",
    formatLine("Preferred diameter", body.wheel?.diameter),
    formatLine("Preferred width", body.wheel?.width),
    formatLine("PCD", body.wheel?.pcd),
    formatLine("Offset (ET)", body.wheel?.offset),
    formatLine("Centre bore", body.wheel?.centrebore),
    formatLine("Finish direction", body.wheel?.finish),
    formatLine("Reference links", body.wheel?.references),
    "",
    "Project notes:",
    clean(body.notes) || "Not provided",
  ].join("\n");

  try {
    const resend = new Resend(resendKey);

    await resend.emails.send({
      from: fromEmail,
      to: [intakeEmail],
      replyTo: customerEmail,
      subject,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send quote email:", error);

    return NextResponse.json(
      { error: "Quote request could not be sent. Please try again." },
      { status: 500 },
    );
  }
}