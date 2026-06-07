import type { DeadByteBot, DeadByteBotManifest } from '../bot/bot.types.js'
import type { DeadByteCommandManifest } from './command.types.js'

export function createCommandManifest(command: DeadByteCommandManifest): DeadByteCommandManifest {
  return {
    id: command.id,
    group: command.group,
    name: command.name,
    description: command.description,
    aliases: [...command.aliases],
    enabledByDefault: command.enabledByDefault,
    ownerOnlyByDefault: command.ownerOnlyByDefault,
    supports: { ...command.supports },
    configFields: command.configFields.map((field) => ({ ...field })),
    order: command.order,
    hiddenFromMenu: command.hiddenFromMenu
  }
}

export function createBotManifest(bot: DeadByteBot): DeadByteBotManifest {
  return {
    name: bot.name,
    version: bot.version,
    commands: bot.commands.map(createCommandManifest),
    groups: bot.groups?.map((group) => ({ ...group }))
  }
}
