import { nodePropertiesFromRef } from '../../../utils'
import type { core } from 'zod'
import type { EnumNode, ParseFunction } from '../../../parseNodeTypes'

export const parseZodEnumDef: ParseFunction<core.$ZodEnumDef, EnumNode> = (
  def,
  refs,
) => {
  const values = Object.values(def.entries) as string[]
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return { type: 'enum', enumValues: values, ...nodePropertiesFromRef(refs) }
}
