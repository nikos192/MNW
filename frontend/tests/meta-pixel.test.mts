import assert from "node:assert/strict";
import test from "node:test";
import { normalizeEmail, normalizePhone } from "../src/lib/meta-conversions.ts";

test("Conversions API identifiers are normalized before hashing", () => {
  assert.equal(normalizeEmail("  DRIVER@Example.COM "), "driver@example.com");
  assert.equal(normalizePhone("0412 345 678"), "61412345678");
  assert.equal(normalizePhone("+61 412 345 678"), "61412345678");
});
