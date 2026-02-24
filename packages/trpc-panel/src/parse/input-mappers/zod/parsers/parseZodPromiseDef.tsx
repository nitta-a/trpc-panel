import { zodSelectorFunction } from '@src/parse/input-mappers/zod/selector'
import type {
  ParsedInputNode,
  ParseReferences,
} from '@src/parse/parseNodeTypes'
import { type ZodType, type core } from 'zod'

export function parseZodPromiseDef(
  def: core.$ZodPromiseDef,
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return zodSelectorFunction((def.innerType as ZodType)._def, refs)
}
