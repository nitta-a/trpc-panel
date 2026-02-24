import { zodSelectorFunction } from '../selector'
import type {
  ParsedInputNode,
  ParseReferences,
} from '../../../parseNodeTypes'
import { type ZodType, type core } from 'zod'

export function parseZodNullableDef(
  def: core.$ZodNullableDef,
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return zodSelectorFunction((def.innerType as ZodType)._def, refs)
}
