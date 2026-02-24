import type {
  ParsedInputNode,
  ParseReferences,
} from '../../../parseNodeTypes'
import { nodePropertiesFromRef } from '../../../utils'
import type { core } from 'zod'

export function parseZodUndefinedDef(
  def: core.$ZodUndefinedDef,
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return {
    type: 'literal',
    value: undefined,
    ...nodePropertiesFromRef(refs),
  }
}
