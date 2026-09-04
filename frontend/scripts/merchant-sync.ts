import { loadEnvConfig } from "@next/env";
import { merchantLog } from "../src/lib/merchant/logger";
import { syncMerchantProducts } from "../src/lib/merchant/sync";

loadEnvConfig(process.cwd());

const args = new Set(process.argv.slice(2));
const apply = args.has("--apply");
const dryRun = !apply;
const offline = args.has("--offline");

if (args.has("--help")) {
  console.log(
    "Usage: npm run merchant:sync -- [--dry-run] [--offline] [--apply]",
  );
  console.log(
    "Writes require both --apply and MERCHANT_SYNC_ALLOW_WRITE=true.",
  );
  process.exit(0);
}

if (apply && process.env.MERCHANT_SYNC_ALLOW_WRITE !== "true") {
  merchantLog("error", "write_blocked", {
    reason: "MERCHANT_SYNC_ALLOW_WRITE must equal true",
  });
  process.exit(2);
}

async function main() {
  try {
    await syncMerchantProducts({ dryRun, offline });
  } catch (error) {
    merchantLog("error", "failed", { error });
    process.exitCode = 1;
  }
}

void main();
