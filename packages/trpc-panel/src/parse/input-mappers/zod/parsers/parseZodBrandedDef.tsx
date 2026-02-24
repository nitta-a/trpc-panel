import { zodSelectorFunction } from '../selector'
import type {
  ParsedInputNode,
  ParseReferences,
} from '../../../parseNodeTypes'
import type { ZodType } from 'zod'

export function parseZodBrandedDef(
  def: ZodType['_def'],
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return zodSelectorFunction(def, refs)
}
