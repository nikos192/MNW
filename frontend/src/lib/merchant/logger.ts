type LogLevel = "info" | "warn" | "error";

const SECRET_PATTERN =
  /(authorization|credential|private[_-]?key|access[_-]?token|client[_-]?email)/i;

function sanitize(value: unknown): unknown {
  if (value instanceof Error)
    return { name: value.name, message: value.message };
  if (Array.isArray(value)) return value.map(sanitize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        key,
        SECRET_PATTERN.test(key) ? "[REDACTED]" : sanitize(entry),
      ]),
    );
  }
  return value;
}

export function merchantLog(
  level: LogLevel,
  event: string,
  details: Record<string, unknown> = {},
) {
  const output = JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    service: "google-merchant-sync",
    event,
    ...(sanitize(details) as Record<string, unknown>),
  });
  (level === "error"
    ? console.error
    : level === "warn"
      ? console.warn
      : console.log)(output);
}
