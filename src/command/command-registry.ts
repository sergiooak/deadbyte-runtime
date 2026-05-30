import type { DeadByteConfig } from '../config/config.types.js'
import { normalizeCommandName } from '../utils/normalize.js'
import type { CommandAliasCollision, DeadByteCommand } from './command.types.js'

export type DeadByteCommandRegistry = {
  commands: DeadByteCommand[]
  byId: Map<string, DeadByteCommand>
  byAlias: Map<string, DeadByteCommand>
}

export function createCommandRegistry(commands: DeadByteCommand[], config?: DeadByteConfig): DeadByteCommandRegistry {
  const byId = new Map<string, DeadByteCommand>()
  const byAlias = new Map<string, DeadByteCommand>()

  for (const command of commands) {
    byId.set(command.id, command)
    const configured = config?.commands?.[command.id]
    if (configured?.enabled === false) {
      continue
    }
    const aliases = configured?.aliases?.length ? configured.aliases : command.aliases
    for (const alias of aliases) {
      byAlias.set(normalizeCommandName(alias), command)
    }
  }

  return { commands, byId, byAlias }
}

export function validateCommandAliases(
  commands: DeadByteCommand[],
  config: Pick<DeadByteConfig, 'commands' | 'prefixes' | 'fallbackPrefixes'> = {}
): CommandAliasCollision[] {
  const collisions: CommandAliasCollision[] = []
  const seen = new Map<string, { commandId: string; alias: string }>()
  const prefixes = new Set([...(config.prefixes ?? []), ...(config.fallbackPrefixes ?? [])])

  for (const command of commands) {
    const commandConfig = config.commands?.[command.id]
    if (commandConfig?.enabled === false) {
      continue
    }

    const aliases = commandConfig?.aliases?.length ? commandConfig.aliases : command.aliases
    for (const alias of aliases) {
      const trimmed = alias.trim()
      const normalizedAlias = normalizeCommandName(trimmed)

      if (!normalizedAlias) {
        collisions.push({ alias, normalizedAlias, firstCommandId: command.id, secondCommandId: command.id })
        continue
      }

      if ([...prefixes].some((prefix) => trimmed.startsWith(prefix))) {
        collisions.push({ alias, normalizedAlias, firstCommandId: command.id, secondCommandId: command.id })
        continue
      }

      const existing = seen.get(normalizedAlias)
      if (existing && existing.commandId !== command.id) {
        collisions.push({
          alias,
          normalizedAlias,
          firstCommandId: existing.commandId,
          secondCommandId: command.id
        })
        continue
      }

      seen.set(normalizedAlias, { commandId: command.id, alias })
    }
  }

  return collisions
}
