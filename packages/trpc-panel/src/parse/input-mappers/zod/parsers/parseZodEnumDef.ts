import { nodePropertiesFromRef } from '@src/parse/utils'
import type { ZodEnumDef } from 'zod/v3'
import type { EnumNode, ParseFunction } from '../../../parseNodeTypes'

export const parseZodEnumDef: ParseFunction<ZodEnumDef, EnumNode> = (
  def,
  refs,
) => {
  // Zod v3 stores enum values in def.values (array); Zod v4 stores them in def.entries (object)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const values = def.values
    ? ([...def.values] as string[])
    : Object.values((def as any).entries as Record<string, string>)
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return { type: 'enum', enumValues: values, ...nodePropertiesFromRef(refs) }
}
