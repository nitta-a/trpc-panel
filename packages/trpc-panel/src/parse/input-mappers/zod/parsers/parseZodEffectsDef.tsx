import { zodSelectorFunction } from '@src/parse/input-mappers/zod/selector'
import type {
  ParsedInputNode,
  ParseReferences,
} from '@src/parse/parseNodeTypes'
import type { ZodEffectsDef } from 'zod/v3'

export function parseZodEffectsDef(
  def: ZodEffectsDef,
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  // Zod v3 effects store the input schema in def.schema; Zod v4 pipe stores it in def.in
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const innerSchema = def.schema ?? (def as any).in
  return zodSelectorFunction(innerSchema._def, refs)
}
