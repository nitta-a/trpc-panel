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
  // Zod v3 stores inner schema in def.type; Zod v4 stores it in def.innerType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const innerSchema = (def as any).innerType ?? def.type
  return zodSelectorFunction(innerSchema._def, refs)
}
