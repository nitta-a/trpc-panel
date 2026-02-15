import { nodePropertiesFromRef } from '@src/parse/utils'
import type { ZodStringDef } from 'zod/v3'
import type { ParseFunction, StringNode } from '../../../parseNodeTypes'

export const parseZodStringDef: ParseFunction<ZodStringDef, StringNode> = (
  def,
  refs,
) => {
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return {
    type: 'string',
    ...nodePropertiesFromRef(refs),
  }
}
