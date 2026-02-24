import { zodSelectorFunction } from '@src/parse/input-mappers/zod/selector'
import type {
  ParsedInputNode,
  ParseReferences,
} from '@src/parse/parseNodeTypes'
import { type ZodType, type core } from 'zod'

export function parseZodEffectsDef(
  def: core.$ZodPipeDef,
  refs: ParseReferences,
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  // Use the non-transform side of the pipe as the effective schema
  const inDef = (def.in as ZodType)._def
  const schemaDef =
    inDef.type !== 'transform' ? inDef : (def.out as ZodType)._def
  return zodSelectorFunction(schemaDef, refs)
}
