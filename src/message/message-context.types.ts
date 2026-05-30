import type { ResolvedDeadByteConfig } from '../config/config.types.js'
import type { PermissionContext } from '../permissions/permission.types.js'
import type { DeadByteChat, DeadByteContact, DeadByteMessage } from './message.types.js'
import type { ParsedCommand } from './parsed-command.types.js'

export type DeadByteServices = Record<string, unknown>

export type MessageContext = {
  message: DeadByteMessage
  chat: DeadByteChat
  sender: DeadByteContact
  quotedMessage?: DeadByteMessage
  targetMessage?: DeadByteMessage
  parsedCommand?: ParsedCommand
  permissions: PermissionContext
  config: ResolvedDeadByteConfig
  services: DeadByteServices
  reply: (text: string) => Promise<void>
  replyWithSticker: (sticker: Buffer, mimeType?: string) => Promise<void>
  react: (emoji: string) => Promise<void>
}
