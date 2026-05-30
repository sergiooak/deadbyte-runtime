import type { DeadByteRuntimeEvent } from '../events/runtime-event.types.js'

export type DeadByteEventLogger = {
  emit: (event: DeadByteRuntimeEvent) => void | Promise<void>
}
