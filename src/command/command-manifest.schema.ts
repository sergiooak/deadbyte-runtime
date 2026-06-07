import { z } from 'zod'

export const CommandConfigFieldSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  type: z.enum(['string', 'number', 'boolean', 'select', 'json']),
  required: z.boolean().optional(),
  defaultValue: z.unknown().optional(),
  options: z.array(z.string()).optional(),
  description: z.string().optional()
})

export const DeadByteCommandManifestSchema = z.object({
  id: z.string().min(1),
  group: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  aliases: z.array(z.string().min(1)),
  enabledByDefault: z.boolean(),
  ownerOnlyByDefault: z.boolean(),
  supports: z.object({
    private: z.boolean(),
    groups: z.boolean(),
    implicit: z.boolean()
  }),
  configFields: z.array(CommandConfigFieldSchema),
  order: z.number().optional(),
  hiddenFromMenu: z.boolean().optional()
})

export const DeadByteCommandGroupDefinitionSchema = z.object({
  id: z.string().min(1),
  emoji: z.string().optional(),
  title: z.string().min(1),
  order: z.number().optional(),
  hidden: z.boolean().optional()
})

export const DeadByteBotManifestSchema = z.object({
  name: z.string().min(1),
  version: z.string().min(1),
  commands: z.array(DeadByteCommandManifestSchema),
  groups: z.array(DeadByteCommandGroupDefinitionSchema).optional()
})
