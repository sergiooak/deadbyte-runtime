export type DeadByteContact = {
  id: string
  number?: string
  name?: string
  pushname?: string
  isMe?: boolean
  isMyContact?: boolean
}

export type DeadByteChat = {
  id: string
  name?: string
  isGroup: boolean
}

export type DeadByteMessage = {
  id: string
  from: string
  to?: string
  author?: string
  body: string
  type?: string
  timestamp?: number
  hasMedia: boolean
  isForwarded?: boolean
  isStatus?: boolean
  mentionedIds?: string[]
}
