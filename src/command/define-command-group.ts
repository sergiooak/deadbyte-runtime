import type { DeadByteCommandGroupDefinition } from './command.types.js'

/**
 * Define um grupo (categoria) de comandos para uso no menu.
 *
 * Centraliza emoji, titulo, ordem de exibicao e visibilidade do grupo,
 * em vez de espalhar essas informacoes em strings soltas.
 */
export function defineCommandGroup(group: DeadByteCommandGroupDefinition): DeadByteCommandGroupDefinition {
  return group
}
