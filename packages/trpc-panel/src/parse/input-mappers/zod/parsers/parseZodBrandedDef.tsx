import { zodSelectorFunction } from '@src/parse/input-mappers/zod/selector'
import type {
  ParsedInputNode,
  ParseReferences,
} from '@src/parse/parseNodeTypes'
import type { ZodType } from 'zod'

export function parseZodBrandedDef(
  def: ZodType['_def'],
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return zodSelectorFunction(def, refs)
}
