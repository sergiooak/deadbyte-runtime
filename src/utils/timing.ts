export function nowIso(): string {
  return new Date().toISOString()
}

export function msSince(startedAt: number): number {
  return Math.max(0, Date.now() - startedAt)
}
