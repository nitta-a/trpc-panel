import { zodSelectorFunction } from "@src/parse/input-mappers/zod/selector";
import { ParsedInputNode, ParseReferences } from "@src/parse/parseNodeTypes";
import { getChildDef } from "@src/parse/utils";
import { ZodBrandedDef } from "../zod-def-types";

export function parseZodBrandedDef(
  def: ZodBrandedDef,
  refs: ParseReferences
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  if (def.type) {
    const innerDef = getChildDef(def.type);
    return zodSelectorFunction(innerDef as any, refs);
  }
  return { type: "unsupported", path: refs.path };
}
