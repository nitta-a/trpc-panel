import { nodePropertiesFromRef } from '@src/parse/utils'
import type { ZodLiteralDef } from 'zod/v3'
import type { LiteralNode, ParseFunction } from '../../../parseNodeTypes'

export const parseZodLiteralDef: ParseFunction<ZodLiteralDef, LiteralNode> = (
  def,
  refs,
) => {
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  // Zod v3 stores the value in def.value; Zod v4 stores it in def.values (array)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value = def.value !== undefined ? def.value : (def as any).values?.[0]
  return {
    type: 'literal',
    value,
    ...nodePropertiesFromRef(refs),
  }
}
