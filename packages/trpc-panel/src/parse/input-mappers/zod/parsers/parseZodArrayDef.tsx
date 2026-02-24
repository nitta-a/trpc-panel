import { nodePropertiesFromRef } from '../../../utils'
import { type ZodType, type core } from 'zod'
import type { ArrayNode, ParseFunction } from '../../../parseNodeTypes'
import { zodSelectorFunction } from '../selector'

export const parseZodArrayDef: ParseFunction<core.$ZodArrayDef, ArrayNode> = (
  def,
  refs,
) => {
  const element = def.element as ZodType
  const childType = zodSelectorFunction(element._def, { ...refs, path: [] })
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return {
    type: 'array',
    childType,
    ...nodePropertiesFromRef(refs),
  }
}
