import { randomUUID } from 'node:crypto'

export function createDeadByteId(prefix?: string): string {
  const id = randomUUID()
  return prefix ? `${prefix}_${id}` : id
}
