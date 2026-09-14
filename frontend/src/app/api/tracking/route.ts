import { handleTrackingRequest } from "@/lib/tracking-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return handleTrackingRequest(request);
}
