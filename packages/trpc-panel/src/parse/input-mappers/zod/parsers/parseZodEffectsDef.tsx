import { zodSelectorFunction } from "@src/parse/input-mappers/zod/selector";
import { ParsedInputNode, ParseReferences } from "@src/parse/parseNodeTypes";
import { getChildDef } from "@src/parse/utils";
import { ZodEffectsDef } from "../zod-def-types";

export function parseZodEffectsDef(
  def: ZodEffectsDef,
  refs: ParseReferences
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  let innerSchema = def.schema || def.in;
  if (innerSchema) {
    const innerDef = getChildDef(innerSchema);
    return zodSelectorFunction(innerDef as any, refs);
  }
  return { type: "unsupported", path: refs.path };
}
