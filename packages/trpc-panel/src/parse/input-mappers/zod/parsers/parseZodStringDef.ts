import { ParseFunction, StringNode } from "../../../parseNodeTypes";
import { nodePropertiesFromRef } from "@src/parse/utils";

export const parseZodStringDef: ParseFunction<any, StringNode> = (
  def,
  refs
) => {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    type: "string",
    ...nodePropertiesFromRef(refs),
  };
};
