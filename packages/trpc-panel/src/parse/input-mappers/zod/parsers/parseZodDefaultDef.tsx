import { zodSelectorFunction } from "@src/parse/input-mappers/zod/selector";
import { ParsedInputNode, ParseReferences } from "@src/parse/parseNodeTypes";

export function parseZodDefaultDef(
  def: any,
  refs: ParseReferences
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  const innerDef = def.innerType?.def || def.innerType?._def;
  return zodSelectorFunction(innerDef, refs);
}
