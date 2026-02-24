import { nodePropertiesFromRef } from '@src/parse/utils'
import type { core } from 'zod'
import type { BooleanNode, ParseFunction } from '../../../parseNodeTypes'

export const parseZodBooleanFieldDef: ParseFunction<
  core.$ZodBooleanDef,
  BooleanNode
> = (def, refs) => {
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return { type: 'boolean', ...nodePropertiesFromRef(refs) }
}
