import type { DeadByteEventName } from './runtime-event-names.js'

export type DeadByteEventLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal'

export type DeadByteRuntimeEvent = {
  id: string
  name: DeadByteEventName | string
  level: DeadByteEventLevel
  message?: string
  instanceId?: string
  payload?: Record<string, unknown>
  error?: {
    name?: string
    message: string
    stack?: string
  }
  timestamp: string
}
