import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { merchantLog } from "@/lib/merchant/logger";
import { syncMerchantProducts } from "@/lib/merchant/sync";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function authorized(request: Request) {
  const supplied =
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  const configured = [
    process.env.MERCHANT_SYNC_SECRET,
    process.env.CRON_SECRET,
  ].filter((value): value is string => Boolean(value));
  if (!supplied || configured.length === 0) return false;
  const suppliedBytes = Buffer.from(supplied);
  return configured.some((candidate) => {
    const configuredBytes = Buffer.from(candidate);
    return (
      suppliedBytes.length === configuredBytes.length &&
      timingSafeEqual(suppliedBytes, configuredBytes)
    );
  });
}

async function handle(request: Request) {
  if (!authorized(request))
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 },
    );
  try {
    const result = await syncMerchantProducts({ dryRun: false });
    return NextResponse.json({ ok: true, summary: result.summary });
  } catch (error) {
    merchantLog("error", "route_failed", { error });
    return NextResponse.json(
      {
        ok: false,
        error: "Merchant sync failed; inspect structured server logs",
      },
      { status: 500 },
    );
  }
}

export const GET = handle;
export const POST = handle;
