import { NumberNode, ParseFunction } from "../../../parseNodeTypes";
import { nodePropertiesFromRef } from "@src/parse/utils";

export const parseZodNumberDef: ParseFunction<any, NumberNode> = (
  def,
  refs
) => {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    type: "number",
    ...nodePropertiesFromRef(refs),
  };
};
