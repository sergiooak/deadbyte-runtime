import type { ResolvedDeadByteConfig } from '../config/config.types.js'
import type { MessageContext } from '../message/message-context.types.js'
import type { ParsedCommand } from '../message/parsed-command.types.js'
import type { PermissionContext } from '../permissions/permission.types.js'

export type DeadByteCommandGroup = string

export type DeadByteCommandGroupDefinition = {
  id: DeadByteCommandGroup
  emoji?: string
  title: string
  order?: number
  hidden?: boolean
}

export type DeadByteCommandSupports = {
  private: boolean
  groups: boolean
  implicit: boolean
}

export type DeadByteCommandConfigField = {
  key: string
  label: string
  type: 'string' | 'number' | 'boolean' | 'select' | 'json'
  required?: boolean
  defaultValue?: unknown
  options?: string[]
  description?: string
}

export type CommandContext = MessageContext & {
  parsedCommand?: ParsedCommand
  permissions: PermissionContext
  config: ResolvedDeadByteConfig
}

export type DeadByteCommand = {
  id: string
  group: DeadByteCommandGroup
  name: string
  description?: string
  aliases: string[]
  enabledByDefault: boolean
  ownerOnlyByDefault: boolean
  supports: DeadByteCommandSupports
  configFields: DeadByteCommandConfigField[]
  /**
   * Define a posicao do comando dentro do menu (e dentro do seu grupo).
   * Comandos com numero menor aparecem primeiro. Comandos sem `order`
   * vao para o final, mantendo a ordem em que foram registrados.
   */
  order?: number
  /**
   * Quando `true`, o comando continua funcionando normalmente mas nao
   * aparece listado no menu (ex: comandos internos como `.boot`).
   */
  hiddenFromMenu?: boolean
  match: (ctx: CommandContext) => Promise<boolean> | boolean
  run: (ctx: CommandContext) => Promise<void> | void
}

export type DeadByteCommandManifest = Pick<
  DeadByteCommand,
  | 'id'
  | 'group'
  | 'name'
  | 'description'
  | 'aliases'
  | 'enabledByDefault'
  | 'ownerOnlyByDefault'
  | 'supports'
  | 'configFields'
  | 'order'
  | 'hiddenFromMenu'
>

export type CommandAliasCollision = {
  alias: string
  normalizedAlias: string
  firstCommandId: string
  secondCommandId: string
}
