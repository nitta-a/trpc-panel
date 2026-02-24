import type {
  ParsedInputNode,
  ParseReferences,
} from '../../../parseNodeTypes'
import { nodePropertiesFromRef } from '../../../utils'
import type { core } from 'zod'

export function parseZodBigIntDef(
  def: core.$ZodBigIntDef,
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return {
    type: 'number',
    ...nodePropertiesFromRef(refs),
  }
}
