import type { LiteralNode, ParseReferences } from '@src/parse/parseNodeTypes'
import type { core } from 'zod'

export function parseZodVoidDef(
  _: core.$ZodVoidDef,
  refs: ParseReferences,
): LiteralNode {
  return {
    type: 'literal',
    value: undefined,
    path: refs.path,
  }
}
