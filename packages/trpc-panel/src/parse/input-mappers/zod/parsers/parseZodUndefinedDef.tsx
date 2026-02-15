import type {
  ParsedInputNode,
  ParseReferences,
} from '@src/parse/parseNodeTypes'
import { nodePropertiesFromRef } from '@src/parse/utils'
import type { ZodUndefinedDef } from 'zod/v3'

export function parseZodUndefinedDef(
  def: ZodUndefinedDef,
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return {
    type: 'literal',
    value: undefined,
    ...nodePropertiesFromRef(refs),
  }
}
