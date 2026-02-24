import { nodePropertiesFromRef } from '@src/parse/utils'
import type { core } from 'zod'
import type { LiteralNode, ParseFunction } from '../../../parseNodeTypes'

export const parseZodLiteralDef: ParseFunction<
  core.$ZodLiteralDef<any>,
  LiteralNode
> = (def, refs) => {
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return {
    type: 'literal',
    value: def.values[0],
    ...nodePropertiesFromRef(refs),
  }
}
