import { zodSelectorFunction } from "@src/parse/input-mappers/zod/selector";
import { ParsedInputNode, ParseReferences } from "@src/parse/parseNodeTypes";

export function parseZodBrandedDef(
  def: any,
  refs: ParseReferences
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  if (def.type) {
    const innerDef = def.type.def || def.type._def;
    return zodSelectorFunction(innerDef, refs);
  }
  return zodSelectorFunction(def, refs);
}
