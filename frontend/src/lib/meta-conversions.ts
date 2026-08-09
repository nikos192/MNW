import { createHash } from "node:crypto";
import { META_PIXEL_ID } from "./meta-pixel.ts";

type LeadConversion = {
  contentIds: string[];
  contentName: string;
  eventId: string;
  eventSourceUrl?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  email: string;
  phone?: string;
  fbc?: string;
  fbp?: string;
  leadType: "wheel_quote" | "custom_quote";
};

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 10) return `61${digits.slice(1)}`;
  return digits;
}

export async function sendMetaLeadConversion(event: LeadConversion) {
  const accessToken = process.env.META_CONVERSIONS_API_TOKEN;
  if (!accessToken) return { sent: false, reason: "not_configured" } as const;

  const apiVersion = process.env.META_GRAPH_API_VERSION || "v24.0";
  const userData: Record<string, string | string[]> = {
    em: [sha256(normalizeEmail(event.email))],
  };
  const normalizedPhone = normalizePhone(event.phone ?? "");
  if (normalizedPhone) userData.ph = [sha256(normalizedPhone)];
  if (event.clientIpAddress && event.clientIpAddress !== "unknown") {
    userData.client_ip_address = event.clientIpAddress;
  }
  if (event.clientUserAgent) userData.client_user_agent = event.clientUserAgent;
  if (event.fbc) userData.fbc = event.fbc;
  if (event.fbp) userData.fbp = event.fbp;

  const response = await fetch(
    `https://graph.facebook.com/${apiVersion}/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(accessToken)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [
          {
            action_source: "website",
            event_id: event.eventId,
            event_name: "Lead",
            event_source_url: event.eventSourceUrl,
            event_time: Math.floor(Date.now() / 1000),
            user_data: userData,
            custom_data: {
              content_category: event.leadType === "wheel_quote"
                ? "Forged wheel quote"
                : "Custom forged wheel quote",
              content_ids: event.contentIds,
              content_name: event.contentName,
              content_type: "product",
              lead_type: event.leadType,
            },
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Meta Conversions API returned ${response.status}: ${detail.slice(0, 500)}`);
  }

  return { sent: true } as const;
}
