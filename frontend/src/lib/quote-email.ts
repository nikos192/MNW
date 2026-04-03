import { BRAND_EMAIL, BRAND_INSTAGRAM_URL, BRAND_NAME } from "@/lib/brand";

export type QuoteEmailPayload = {
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

type EmailContent = {
  subject: string;
  html: string;
  text: string;
};

type SummaryRow = {
  label: string;
  value: string;
};

function clean(value?: string) {
  return value?.trim() || "";
}

function displayValue(value?: string) {
  return clean(value) || "Not provided";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatLine(label: string, value?: string) {
  return `${label}: ${displayValue(value)}`;
}

function resolveSiteUrl() {
  const configuredSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL ?? "http://localhost:3000";
  const normalizedSiteUrl = /^https?:\/\//i.test(configuredSiteUrl)
    ? configuredSiteUrl
    : `https://${configuredSiteUrl}`;

  return normalizedSiteUrl.replace(/\/$/, "");
}

function buildProductUrl(handle?: string) {
  return handle ? `${resolveSiteUrl()}/shop/${handle}` : `${resolveSiteUrl()}/contact`;
}

function sectionRows(payload: QuoteEmailPayload) {
  const customerRows: SummaryRow[] = [
    { label: "Name", value: displayValue(payload.customer?.name) },
    { label: "Email", value: displayValue(payload.customer?.email) },
    { label: "Phone", value: displayValue(payload.customer?.phone) },
  ];

  const productRows: SummaryRow[] = [
    { label: "Product", value: displayValue(payload.quoteContext?.productTitle) },
    { label: "Product handle", value: displayValue(payload.quoteContext?.productHandle) },
    { label: "Starting price shown", value: displayValue(payload.quoteContext?.startingPrice) },
  ];

  const vehicleRows: SummaryRow[] = [
    { label: "Vehicle make", value: displayValue(payload.vehicle?.make) },
    { label: "Vehicle model", value: displayValue(payload.vehicle?.model) },
    { label: "Vehicle year", value: displayValue(payload.vehicle?.year) },
    { label: "Brake package", value: displayValue(payload.vehicle?.brakes) },
    { label: "Suspension / ride height", value: displayValue(payload.vehicle?.suspension) },
  ];

  const wheelRows: SummaryRow[] = [
    { label: "Preferred diameter", value: displayValue(payload.wheel?.diameter) },
    { label: "Preferred width", value: displayValue(payload.wheel?.width) },
    { label: "PCD", value: displayValue(payload.wheel?.pcd) },
    { label: "Offset (ET)", value: displayValue(payload.wheel?.offset) },
    { label: "Centre bore", value: displayValue(payload.wheel?.centrebore) },
    { label: "Finish direction", value: displayValue(payload.wheel?.finish) },
    { label: "Reference links", value: displayValue(payload.wheel?.references) },
  ];

  return { customerRows, productRows, vehicleRows, wheelRows };
}

function renderRows(rows: SummaryRow[]) {
  return rows
    .map(
      (row) => `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #2a2a2a; color: #8d8d8d; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; vertical-align: top; width: 38%;">${escapeHtml(row.label)}</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #2a2a2a; color: #f4f1ea; font-size: 14px; line-height: 1.6;">${escapeHtml(row.value)}</td>
        </tr>
      `,
    )
    .join("");
}

function renderSection(title: string, rows: SummaryRow[]) {
  return `
    <div style="margin-top: 28px;">
      <p style="margin: 0 0 12px; color: #b08b57; font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;">${escapeHtml(title)}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
        ${renderRows(rows)}
      </table>
    </div>
  `;
}

function renderNotes(notes?: string) {
  const value = displayValue(notes).replaceAll("\n", "<br />");

  return `
    <div style="margin-top: 28px;">
      <p style="margin: 0 0 12px; color: #b08b57; font-size: 11px; letter-spacing: 0.28em; text-transform: uppercase;">Project notes</p>
      <div style="padding: 18px 20px; background: #111111; border: 1px solid #2a2a2a; color: #f4f1ea; font-size: 14px; line-height: 1.8;">${escapeHtml(value)}</div>
    </div>
  `;
}

function wrapEmail(args: {
  eyebrow: string;
  title: string;
  intro: string;
  body: string;
  outro?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}) {
  const cta = args.ctaLabel && args.ctaUrl
    ? `
      <div style="margin-top: 32px;">
        <a href="${escapeHtml(args.ctaUrl)}" style="display: inline-block; padding: 14px 22px; border: 1px solid #b08b57; background: #b08b57; color: #0c0c0c; text-decoration: none; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 600;">${escapeHtml(args.ctaLabel)}</a>
      </div>
    `
    : "";

  const outro = args.outro
    ? `<p style="margin: 28px 0 0; color: #bcb8ae; font-size: 14px; line-height: 1.8;">${escapeHtml(args.outro)}</p>`
    : "";

  return `
    <!DOCTYPE html>
    <html lang="en">
      <body style="margin: 0; padding: 24px; background: #0a0a0a; font-family: Arial, Helvetica, sans-serif;">
        <div style="max-width: 760px; margin: 0 auto; background: #121212; border: 1px solid #222222;">
          <div style="padding: 40px 40px 32px; border-bottom: 1px solid #222222; background: linear-gradient(135deg, #171717 0%, #0f0f0f 100%);">
            <p style="margin: 0 0 14px; color: #b08b57; font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase;">${escapeHtml(args.eyebrow)}</p>
            <h1 style="margin: 0; color: #f7f3ea; font-size: 34px; line-height: 1.1; font-weight: 600;">${escapeHtml(args.title)}</h1>
            <p style="margin: 18px 0 0; max-width: 560px; color: #c9c4ba; font-size: 15px; line-height: 1.8;">${escapeHtml(args.intro)}</p>
            ${cta}
          </div>
          <div style="padding: 32px 40px 40px;">
            ${args.body}
            ${outro}
          </div>
          <div style="padding: 20px 40px 32px; border-top: 1px solid #222222; color: #8d8d8d; font-size: 12px; line-height: 1.8;">
            <div>${escapeHtml(BRAND_NAME)} quote-first forged wheel enquiries</div>
            <div><a href="mailto:${escapeHtml(BRAND_EMAIL)}" style="color: #cfc8b9; text-decoration: none;">${escapeHtml(BRAND_EMAIL)}</a></div>
            <div><a href="${escapeHtml(BRAND_INSTAGRAM_URL)}" style="color: #cfc8b9; text-decoration: none;">Instagram</a></div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function buildIntakeEmail(payload: QuoteEmailPayload): EmailContent {
  const subject = clean(payload.quoteContext?.productTitle)
    ? `${BRAND_NAME} Quote Request - ${clean(payload.quoteContext?.productTitle)}`
    : `${BRAND_NAME} Quote Request`;
  const { customerRows, productRows, vehicleRows, wheelRows } = sectionRows(payload);
  const productUrl = buildProductUrl(payload.quoteContext?.productHandle);

  const html = wrapEmail({
    eyebrow: "New Quote Request",
    title: payload.quoteContext?.productTitle
      ? `${payload.quoteContext.productTitle} enquiry received`
      : "New forged wheel enquiry received",
    intro:
      "A new quote request has come through the site. Customer details, product context, and the fitment brief are below.",
    ctaLabel: "Open Product",
    ctaUrl: productUrl,
    body: [
      renderSection("Customer", customerRows),
      renderSection("Product context", productRows),
      renderSection("Vehicle details", vehicleRows),
      renderSection("Wheel brief", wheelRows),
      renderNotes(payload.notes),
    ].join(""),
  });

  const text = [
    `${BRAND_NAME} Quote Request`,
    "",
    "Customer:",
    ...customerRows.map((row) => formatLine(row.label, row.value)),
    "",
    "Product context:",
    ...productRows.map((row) => formatLine(row.label, row.value)),
    "",
    "Vehicle details:",
    ...vehicleRows.map((row) => formatLine(row.label, row.value)),
    "",
    "Wheel brief:",
    ...wheelRows.map((row) => formatLine(row.label, row.value)),
    "",
    "Project notes:",
    displayValue(payload.notes),
  ].join("\n");

  return { subject, html, text };
}

export function buildCustomerConfirmationEmail(payload: QuoteEmailPayload): EmailContent {
  const firstName = clean(payload.customer?.name).split(/\s+/)[0] || "there";
  const subject = clean(payload.quoteContext?.productTitle)
    ? `${BRAND_NAME} quote request received for ${clean(payload.quoteContext?.productTitle)}`
    : `${BRAND_NAME} quote request received`;
  const { productRows, vehicleRows, wheelRows } = sectionRows(payload);
  const productUrl = buildProductUrl(payload.quoteContext?.productHandle);

  const html = wrapEmail({
    eyebrow: "Quote Request Received",
    title: `Thanks ${firstName}, your brief is in.`,
    intro:
      "We have received your quote request and will review the chassis, fitment direction, and finish brief before coming back with the right forged wheel program.",
    ctaLabel: "Review Product",
    ctaUrl: productUrl,
    outro:
      "If you want to add brake photos, fitment notes, or inspiration references, just reply to this email and it will come straight through to us.",
    body: [
      `<div style="padding: 18px 20px; background: #111111; border: 1px solid #2a2a2a; color: #f4f1ea; font-size: 14px; line-height: 1.8;">
        We use the submitted spec as a starting point only. Final pricing, offset, centre bore, and chassis-specific details are confirmed during review.
      </div>`,
      renderSection("Product context", productRows),
      renderSection("Vehicle details", vehicleRows),
      renderSection("Wheel brief", wheelRows),
      renderNotes(payload.notes),
    ].join(""),
  });

  const text = [
    `${BRAND_NAME} quote request received`,
    "",
    `Thanks ${firstName}, your request is in.`,
    "We will review the chassis and fitment brief, then come back with the right forged wheel program.",
    "",
    "Product context:",
    ...productRows.map((row) => formatLine(row.label, row.value)),
    "",
    "Vehicle details:",
    ...vehicleRows.map((row) => formatLine(row.label, row.value)),
    "",
    "Wheel brief:",
    ...wheelRows.map((row) => formatLine(row.label, row.value)),
    "",
    "Project notes:",
    displayValue(payload.notes),
    "",
    `Reply to ${BRAND_EMAIL} if you want to add more detail before we come back to you.`,
  ].join("\n");

  return { subject, html, text };
}