import { nodePropertiesFromRef } from "@src/parse/utils";
import { LiteralNode, ParseFunction } from "../../../parseNodeTypes";

export const parseZodLiteralDef: ParseFunction<any, LiteralNode> = (
  def,
  refs
) => {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  const value = def.values ? def.values[0] : def.value;
  return {
    type: "literal",
    value: value,
    ...nodePropertiesFromRef(refs),
  };
};
