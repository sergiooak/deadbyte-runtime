import type { RuntimeMode } from '../bot/bot.types.js'

export type DeadByteCommandRuntimeConfig = {
  enabled?: boolean
  ownerOnly?: boolean
  aliases?: string[]
  description?: string
  disabledMessage?: string
  config?: Record<string, unknown>
}

export type DeadByteInternalApiConfig = {
  enabled?: boolean
  host?: string
  port?: number
}

export type DeadByteLoggingConfig = {
  pretty?: boolean
  eventsToStdout?: boolean
  level?: 'debug' | 'info' | 'warn' | 'error' | 'fatal'
}

export type DeadByteWhatsappConfig = {
  headless?: boolean
  chromePath?: string
  sessionPath?: string
  clientId?: string
}

export type DeadByteConfig = {
  mode?: RuntimeMode
  instanceId?: string
  clientId?: string
  sessionPath?: string
  prefixes?: string[]
  fallbackPrefixes?: string[]
  owners?: string[]
  commands?: Record<string, DeadByteCommandRuntimeConfig>
  internalApi?: DeadByteInternalApiConfig
  logging?: DeadByteLoggingConfig
  whatsapp?: DeadByteWhatsappConfig
}

export type ResolvedDeadByteConfig = {
  mode: RuntimeMode
  instanceId: string
  clientId: string
  sessionPath: string
  prefixes: string[]
  fallbackPrefixes: string[]
  owners: string[]
  commands: Record<string, DeadByteCommandRuntimeConfig>
  internalApi: Required<DeadByteInternalApiConfig>
  logging: Required<DeadByteLoggingConfig>
  whatsapp: Required<Omit<DeadByteWhatsappConfig, 'chromePath'>> & Pick<DeadByteWhatsappConfig, 'chromePath'>
}
