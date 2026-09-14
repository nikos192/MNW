export type RateLimitDecision = {
  allowed: boolean;
  retryAfterSeconds: number;
};

export type RateLimiter = {
  consume(key: string, now?: number): RateLimitDecision;
};

export class SlidingWindowRateLimiter implements RateLimiter {
  private readonly requests = new Map<string, number[]>();
  private operations = 0;
  private readonly maximumRequests: number;
  private readonly windowMs: number;

  constructor(maximumRequests: number, windowMs: number) {
    this.maximumRequests = maximumRequests;
    this.windowMs = windowMs;
  }

  consume(key: string, now = Date.now()): RateLimitDecision {
    this.operations += 1;
    if (this.operations % 100 === 0) this.removeExpiredEntries(now);

    const cutoff = now - this.windowMs;
    const recent = (this.requests.get(key) ?? []).filter(
      (timestamp) => timestamp > cutoff,
    );

    if (recent.length >= this.maximumRequests) {
      this.requests.set(key, recent);
      return {
        allowed: false,
        retryAfterSeconds: Math.max(
          1,
          Math.ceil((recent[0] + this.windowMs - now) / 1_000),
        ),
      };
    }

    recent.push(now);
    this.requests.set(key, recent);
    return { allowed: true, retryAfterSeconds: 0 };
  }

  private removeExpiredEntries(now: number) {
    const cutoff = now - this.windowMs;
    for (const [key, timestamps] of this.requests) {
      const recent = timestamps.filter((timestamp) => timestamp > cutoff);
      if (recent.length) this.requests.set(key, recent);
      else this.requests.delete(key);
    }
  }
}
