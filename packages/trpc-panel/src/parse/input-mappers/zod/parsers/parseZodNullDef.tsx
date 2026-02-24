import type {
  ParsedInputNode,
  ParseReferences,
} from '@src/parse/parseNodeTypes'
import { nodePropertiesFromRef } from '@src/parse/utils'
import type { core } from 'zod'

export function parseZodNullDef(
  def: core.$ZodNullDef,
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return {
    type: 'literal',
    value: null,
    ...nodePropertiesFromRef(refs),
  }
}
