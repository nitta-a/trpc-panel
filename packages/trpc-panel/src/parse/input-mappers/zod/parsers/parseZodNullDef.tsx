import { ParsedInputNode, ParseReferences } from "@src/parse/parseNodeTypes";
import { nodePropertiesFromRef } from "@src/parse/utils";

export function parseZodNullDef(
  def: any,
  refs: ParseReferences
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    type: "literal",
    value: null,
    ...nodePropertiesFromRef(refs),
  };
}
