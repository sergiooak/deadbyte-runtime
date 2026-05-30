import { z } from 'zod'

export const RuntimeEventSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  level: z.enum(['debug', 'info', 'warn', 'error', 'fatal']),
  message: z.string().optional(),
  instanceId: z.string().optional(),
  payload: z.record(z.unknown()).optional(),
  error: z
    .object({
      name: z.string().optional(),
      message: z.string(),
      stack: z.string().optional()
    })
    .optional(),
  timestamp: z.string().datetime()
})
