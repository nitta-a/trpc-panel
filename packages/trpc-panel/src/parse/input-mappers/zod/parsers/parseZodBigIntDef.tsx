import type {
  ParsedInputNode,
  ParseReferences,
} from '@src/parse/parseNodeTypes'
import { nodePropertiesFromRef } from '@src/parse/utils'
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
