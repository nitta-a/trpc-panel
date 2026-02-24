import { nodePropertiesFromRef } from '@src/parse/utils'
import type { ZodArrayDef } from 'zod/v3'
import type { ArrayNode, ParseFunction } from '../../../parseNodeTypes'
import { zodSelectorFunction } from '../selector'

export const parseZodArrayDef: ParseFunction<ZodArrayDef, ArrayNode> = (
  def,
  refs,
) => {
  // Zod v3 stores the element as def.type; Zod v4 stores it as def.element
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const element = (def as any).element ?? def.type
  const childType = zodSelectorFunction(element._def, { ...refs, path: [] })
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return {
    type: 'array',
    childType,
    ...nodePropertiesFromRef(refs),
  }
}
