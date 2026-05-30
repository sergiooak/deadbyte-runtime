export const DeadByteEventNames = {
  RuntimeStarted: 'runtime.started',
  RuntimeStopped: 'runtime.stopped',
  RuntimeConfigLoaded: 'runtime.config.loaded',
  RuntimeConfigInvalid: 'runtime.config.invalid',

  WhatsappQrGenerated: 'whatsapp.qr.generated',
  WhatsappAuthenticated: 'whatsapp.authenticated',
  WhatsappReady: 'whatsapp.ready',
  WhatsappDisconnected: 'whatsapp.disconnected',
  WhatsappAuthFailure: 'whatsapp.auth_failure',

  MessageReceived: 'message.received',
  MessageIgnored: 'message.ignored',

  CommandMatched: 'command.matched',
  CommandExecuted: 'command.executed',
  CommandFailed: 'command.failed',
  CommandDisabled: 'command.disabled',
  CommandPermissionDenied: 'command.permission_denied',

  StickerCreated: 'sticker.created',
  StickerRenderStarted: 'sticker.render.started',
  StickerRenderCompleted: 'sticker.render.completed',
  StickerRenderFailed: 'sticker.render.failed',
  StickerCompressed: 'sticker.compressed'
} as const

export type DeadByteEventName = (typeof DeadByteEventNames)[keyof typeof DeadByteEventNames]
