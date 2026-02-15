import { zodSelectorFunction } from '@src/parse/input-mappers/zod/selector'
import type {
  ParsedInputNode,
  ParseReferences,
} from '@src/parse/parseNodeTypes'
import type { ZodNullableDef } from 'zod/v3'

export function parseZodNullableDef(
  def: ZodNullableDef,
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return zodSelectorFunction(def.innerType._def, refs)
}
