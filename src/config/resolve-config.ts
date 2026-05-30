import { defu } from 'defu'
import { DeadByteConfigSchema } from './config.schema.js'
import type { DeadByteConfig, ResolvedDeadByteConfig } from './config.types.js'

export const defaultDeadByteConfig: ResolvedDeadByteConfig = {
  mode: 'standalone',
  instanceId: 'local',
  clientId: 'deadbyte-local',
  sessionPath: './.wwebjs_auth',
  prefixes: ['!', '.', '/', '#'],
  fallbackPrefixes: ['#'],
  owners: [],
  commands: {},
  internalApi: {
    enabled: false,
    host: '127.0.0.1',
    port: 41001
  },
  logging: {
    pretty: true,
    eventsToStdout: false,
    level: 'info'
  },
  whatsapp: {
    headless: true,
    chromePath: undefined,
    sessionPath: './.wwebjs_auth',
    clientId: 'deadbyte-local'
  }
}

export function resolveDeadByteConfig(config: DeadByteConfig = {}): ResolvedDeadByteConfig {
  const parsed = DeadByteConfigSchema.parse(config)
  const merged = defu(parsed, defaultDeadByteConfig) as ResolvedDeadByteConfig
  merged.clientId = parsed.clientId ?? parsed.whatsapp?.clientId ?? merged.clientId
  merged.sessionPath = parsed.sessionPath ?? parsed.whatsapp?.sessionPath ?? merged.sessionPath
  merged.whatsapp.clientId = merged.clientId
  merged.whatsapp.sessionPath = merged.sessionPath
  return merged
}
