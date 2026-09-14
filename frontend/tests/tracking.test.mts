import assert from "node:assert/strict";
import test from "node:test";
import { handleTrackingRequest } from "../src/lib/tracking-api.ts";
import {
  isValidTrackingNumber,
  normalizeTrackingNumber,
} from "../src/lib/tracking-contract.ts";
import {
  formatTrackingTimestamp,
  trackingErrorMessage,
} from "../src/lib/tracking-display.ts";
import {
  fetchTrackingFromProvider,
  normalizeProviderResponse,
  TrackingProviderError,
} from "../src/lib/tracking-provider.ts";
import { SlidingWindowRateLimiter } from "../src/lib/tracking-rate-limit.ts";

const exampleProviderResponse = [
  {
    orderNo: "C0051300145757",
    status: "收货",
    errorMsg: null,
    trackResponses: [
      {
        Date: "2026/9/14 18:24:53",
        Position: "Ningbo",
        Content: "Shipment arrived at facility.",
      },
      {
        Date: "2026/9/13 08:04:01",
        Position: "Shanghai",
        Content: "Shipping information received.",
      },
    ],
  },
];

const allowAllRequests = {
  consume: () => ({ allowed: true, retryAfterSeconds: 0 }),
};

function trackingRequest(body: unknown): Request {
  return new Request("https://monzawheels.test/api/tracking", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://monzawheels.test",
      "x-forwarded-for": "203.0.113.10",
    },
    body: JSON.stringify(body),
  });
}

test("tracking numbers are trimmed, normalized and restricted to a safe character set", () => {
  assert.equal(normalizeTrackingNumber("  c0051300145757  "), "C0051300145757");
  assert.equal(isValidTrackingNumber("C0051300145757"), true);
  assert.equal(isValidTrackingNumber("ABC-123456"), true);
  assert.equal(isValidTrackingNumber("short"), false);
  assert.equal(
    isValidTrackingNumber("C00513?redirect=http://evil.test"),
    false,
  );
});

test("provider responses map to a stable, chronological shipment record", () => {
  const result = normalizeProviderResponse(
    exampleProviderResponse,
    "C0051300145757",
  );

  assert.ok(result);
  assert.equal(result.trackingNumber, "C0051300145757");
  assert.equal(result.statusCode, "received");
  assert.equal(result.currentStatus, "Shipment received");
  assert.equal(result.latestLocation, "Ningbo");
  assert.equal(result.lastUpdated, "2026-09-14T18:24:53");
  assert.deepEqual(
    result.events.map((event) => event.location),
    ["Shanghai", "Ningbo"],
  );
});

test("provider errors and mismatched records become unavailable tracking, not leaked copy", () => {
  const unavailable = normalizeProviderResponse(
    [
      {
        orderNo: "C0051300145757",
        status: "",
        errorMsg: "internal carrier database details",
        trackResponses: [],
      },
    ],
    "C0051300145757",
  );
  const mismatch = normalizeProviderResponse(
    exampleProviderResponse,
    "DIFFERENT123",
  );

  assert.equal(unavailable, null);
  assert.equal(mismatch, null);
});

test("provider requests use the configured endpoint and form-encode nos[]", async () => {
  let requestedUrl = "";
  let requestBody = "";
  const fetchImpl = (async (input: RequestInfo | URL, init?: RequestInit) => {
    requestedUrl = String(input);
    requestBody = String(init?.body);
    return new Response(JSON.stringify(exampleProviderResponse), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  await fetchTrackingFromProvider({
    endpoint: "http://47.101.70.255:81/Home/QueryTrack",
    trackingNumber: "C0051300145757",
    fetchImpl,
  });

  assert.equal(requestedUrl, "http://47.101.70.255:81/Home/QueryTrack");
  assert.equal(new URLSearchParams(requestBody).get("nos[]"), "C0051300145757");
});

test("the proxy ignores arbitrary URL fields and returns only normalized data", async () => {
  let requestedUrl = "";
  const fetchImpl = (async (input: RequestInfo | URL) => {
    requestedUrl = String(input);
    return new Response(JSON.stringify(exampleProviderResponse), {
      status: 200,
    });
  }) as typeof fetch;

  const response = await handleTrackingRequest(
    trackingRequest({
      trackingNumber: "c0051300145757",
      url: "https://evil.test/private",
    }),
    {
      providerUrl: "http://47.101.70.255:81/Home/QueryTrack",
      fetchImpl,
      originCheck: () => true,
      rateLimiter: allowAllRequests,
    },
  );
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(requestedUrl, "http://47.101.70.255:81/Home/QueryTrack");
  assert.equal(body.data.trackingNumber, "C0051300145757");
  assert.equal(body.data.rawStatus, undefined);
  assert.equal(
    response.headers.get("cache-control"),
    "private, no-store, max-age=0",
  );
});

test("the proxy rejects invalid tracking numbers before contacting the provider", async () => {
  let providerWasCalled = false;
  const fetchImpl = (async () => {
    providerWasCalled = true;
    return new Response("[]");
  }) as typeof fetch;
  const response = await handleTrackingRequest(
    trackingRequest({ trackingNumber: "bad number & url=http://evil.test" }),
    {
      providerUrl: "http://47.101.70.255:81/Home/QueryTrack",
      fetchImpl,
      originCheck: () => true,
      rateLimiter: allowAllRequests,
    },
  );
  const body = await response.json();

  assert.equal(response.status, 400);
  assert.equal(body.error.code, "INVALID_TRACKING_NUMBER");
  assert.equal(providerWasCalled, false);
});

test("provider calls abort on timeout", async () => {
  const fetchImpl = ((_input: RequestInfo | URL, init?: RequestInit) =>
    new Promise<Response>((_resolve, reject) => {
      init?.signal?.addEventListener("abort", () => {
        reject(new DOMException("Aborted", "AbortError"));
      });
    })) as typeof fetch;

  await assert.rejects(
    fetchTrackingFromProvider({
      endpoint: "http://47.101.70.255:81/Home/QueryTrack",
      trackingNumber: "C0051300145757",
      fetchImpl,
      timeoutMs: 5,
    }),
    (error: unknown) =>
      error instanceof TrackingProviderError && error.kind === "timeout",
  );
});

test("the sliding-window limiter returns a useful retry interval", () => {
  const limiter = new SlidingWindowRateLimiter(2, 60_000);
  assert.equal(limiter.consume("client", 1_000).allowed, true);
  assert.equal(limiter.consume("client", 2_000).allowed, true);
  assert.deepEqual(limiter.consume("client", 3_000), {
    allowed: false,
    retryAfterSeconds: 58,
  });
  assert.equal(limiter.consume("client", 62_000).allowed, true);
});

test("tracking display helpers format carrier-local time and hide unknown errors", () => {
  const formatted = formatTrackingTimestamp("2026-09-14T18:24:53");
  assert.match(formatted, /14/);
  assert.match(formatted, /2026/);
  assert.match(formatted, /6:24 pm/i);
  assert.equal(formatTrackingTimestamp(null), "Not supplied");
  assert.equal(
    trackingErrorMessage({ secret: "database connection string" }),
    "We could not load tracking right now. Please try again shortly.",
  );
});
