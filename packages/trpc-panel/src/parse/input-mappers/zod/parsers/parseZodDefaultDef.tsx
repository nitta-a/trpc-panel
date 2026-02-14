import { zodSelectorFunction } from "@src/parse/input-mappers/zod/selector";
import { ParsedInputNode, ParseReferences } from "@src/parse/parseNodeTypes";
import { getChildDef } from "@src/parse/utils";
import { ZodDefaultDef } from "../zod-def-types";

export function parseZodDefaultDef(
  def: ZodDefaultDef,
  refs: ParseReferences
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  const innerDef = getChildDef(def.innerType);
  return zodSelectorFunction(innerDef as any, refs);
}
