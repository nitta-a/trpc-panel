import { zodSelectorFunction } from '@src/parse/input-mappers/zod/selector'
import type {
  ParsedInputNode,
  ParseReferences,
} from '@src/parse/parseNodeTypes'
import type { ZodPromiseDef } from 'zod/v3'

export function parseZodPromiseDef(
  def: ZodPromiseDef,
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return zodSelectorFunction(def.type._def, refs)
}
