export type ParsedCommandSource = 'message' | 'mention' | 'quoted-history' | 'implicit'

export type ParsedCommand = {
  explicit: boolean
  prefix?: string
  rawName?: string
  normalizedName?: string
  argsText: string
  source: ParsedCommandSource
}
