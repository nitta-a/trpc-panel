import { zodSelectorFunction } from "@src/parse/input-mappers/zod/selector";
import { ParsedInputNode, ParseReferences } from "@src/parse/parseNodeTypes";
import { getChildDef } from "@src/parse/utils";

export function parseZodNullableDef(
  def: any,
  refs: ParseReferences
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  const innerDef = getChildDef(def.innerType);
  return zodSelectorFunction(innerDef, refs);
}
