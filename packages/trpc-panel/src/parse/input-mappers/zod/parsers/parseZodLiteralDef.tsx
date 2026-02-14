import { nodePropertiesFromRef } from "@src/parse/utils";
import { ZodLiteralDef } from "../zod-def-types";
import { LiteralNode, ParseFunction } from "../../../parseNodeTypes";

export const parseZodLiteralDef: ParseFunction<ZodLiteralDef, LiteralNode> = (
  def,
  refs
) => {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  const value = (def.values && Array.isArray(def.values) && def.values.length > 0) 
    ? def.values[0] 
    : def.value;
  return {
    type: "literal",
    value: value,
    ...nodePropertiesFromRef(refs),
  };
};
