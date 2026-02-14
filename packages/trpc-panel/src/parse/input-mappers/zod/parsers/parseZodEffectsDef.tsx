import { zodSelectorFunction } from "@src/parse/input-mappers/zod/selector";
import { ParsedInputNode, ParseReferences } from "@src/parse/parseNodeTypes";
import { getChildDef } from "@src/parse/utils";

export function parseZodEffectsDef(
  def: any,
  refs: ParseReferences
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  let innerSchema = def.schema || def.in;
  if (innerSchema) {
    const innerDef = getChildDef(innerSchema);
    return zodSelectorFunction(innerDef, refs);
  }
  return { type: "unsupported", path: refs.path };
}
