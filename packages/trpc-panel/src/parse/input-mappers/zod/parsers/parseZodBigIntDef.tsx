import { ParsedInputNode, ParseReferences } from "@src/parse/parseNodeTypes";
import { nodePropertiesFromRef } from "@src/parse/utils";

export function parseZodBigIntDef(
  def: any,
  refs: ParseReferences
): ParsedInputNode {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    type: "number",
    ...nodePropertiesFromRef(refs),
  };
}
