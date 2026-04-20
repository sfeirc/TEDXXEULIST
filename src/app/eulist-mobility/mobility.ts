/** Opens 1 October 2026 at 00:00 (local time). */
export const MOBILITY_UNLOCK = new Date(2026, 9, 1, 0, 0, 0, 0);

export function isMobilityUnlockedAt(timestampMs: number): boolean {
  return timestampMs >= MOBILITY_UNLOCK.getTime();
}
