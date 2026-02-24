import { zodSelectorFunction } from '../selector'
import type {
  ParsedInputNode,
  ParseReferences,
} from '../../../parseNodeTypes'
import { type ZodType, type core } from 'zod'

export function parseZodDefaultDef(
  def: core.$ZodDefaultDef,
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return zodSelectorFunction((def.innerType as ZodType)._def, refs)
}
