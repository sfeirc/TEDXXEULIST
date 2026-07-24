const store = new Map<string, { count: number; resetAt: number }>();

// Periodic cleanup to avoid unbounded growth
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, val] of store.entries()) {
      if (val.resetAt < now) store.delete(key);
    }
  }, 5 * 60_000);
}

export function rateLimit(
  identifier: string,
  maxRequests = 5,
  windowMs = 60_000
): { success: boolean } {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || entry.resetAt < now) {
    store.set(identifier, { count: 1, resetAt: now + windowMs });
    return { success: true };
  }

  if (entry.count >= maxRequests) return { success: false };

  entry.count++;
  return { success: true };
}
