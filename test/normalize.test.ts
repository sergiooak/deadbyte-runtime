import { describe, expect, it } from 'vitest'
import { normalizeCommandName } from '../src/utils/normalize.js'

describe('normalizeCommandName', () => {
  it('removes accents and lowercases command aliases', () => {
    expect(normalizeCommandName(' ATEnÇão ')).toBe('atencao')
  })
})
