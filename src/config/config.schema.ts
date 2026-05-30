import { z } from 'zod'

export const CommandRuntimeConfigSchema = z.object({
  enabled: z.boolean().optional(),
  ownerOnly: z.boolean().optional(),
  aliases: z.array(z.string()).optional(),
  description: z.string().optional(),
  disabledMessage: z.string().optional(),
  config: z.record(z.unknown()).optional()
})

export const DeadByteConfigSchema = z.object({
  mode: z.enum(['standalone', 'managed']).optional(),
  instanceId: z.string().min(1).optional(),
  clientId: z.string().min(1).optional(),
  sessionPath: z.string().min(1).optional(),
  prefixes: z.array(z.string().min(1)).optional(),
  fallbackPrefixes: z.array(z.string().min(1)).optional(),
  owners: z.array(z.string()).optional(),
  commands: z.record(CommandRuntimeConfigSchema).optional(),
  internalApi: z
    .object({
      enabled: z.boolean().optional(),
      host: z.string().min(1).optional(),
      port: z.coerce.number().int().positive().optional()
    })
    .optional(),
  logging: z
    .object({
      pretty: z.boolean().optional(),
      eventsToStdout: z.boolean().optional(),
      level: z.enum(['debug', 'info', 'warn', 'error', 'fatal']).optional()
    })
    .optional(),
  whatsapp: z
    .object({
      headless: z.boolean().optional(),
      chromePath: z.string().optional(),
      sessionPath: z.string().min(1).optional(),
      clientId: z.string().min(1).optional()
    })
    .optional()
})

export const ResolvedDeadByteConfigSchema = DeadByteConfigSchema.required({
  mode: true,
  instanceId: true,
  clientId: true,
  sessionPath: true,
  prefixes: true,
  fallbackPrefixes: true,
  owners: true,
  commands: true,
  internalApi: true,
  logging: true,
  whatsapp: true
})
