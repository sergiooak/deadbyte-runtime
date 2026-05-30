import type { DeadByteCommand } from '../command/command.types.js'
import type { MessageContext } from '../message/message-context.types.js'
import type { DeadByteMessage } from '../message/message.types.js'

export type RuntimeMode = 'standalone' | 'managed'

export type DeadByteBotEvents = {
  ready?: (ctx: { instanceId?: string }) => Promise<void> | void
  message?: (ctx: MessageContext, message: DeadByteMessage) => Promise<void> | void
}

export type DeadByteBot = {
  name: string
  version: string
  commands: DeadByteCommand[]
  events?: DeadByteBotEvents
}

export type DeadByteBotManifest = {
  name: string
  version: string
  commands: import('../command/command.types.js').DeadByteCommandManifest[]
}
