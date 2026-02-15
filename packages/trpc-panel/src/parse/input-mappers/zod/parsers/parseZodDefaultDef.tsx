import { zodSelectorFunction } from '@src/parse/input-mappers/zod/selector'
import type {
  ParsedInputNode,
  ParseReferences,
} from '@src/parse/parseNodeTypes'
import type { ZodDefaultDef } from 'zod/v3'

export function parseZodDefaultDef(
  def: ZodDefaultDef,
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return zodSelectorFunction(def.innerType._def, refs)
}
