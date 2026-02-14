import { NumberNode, ParseFunction } from "../../../parseNodeTypes";
import { nodePropertiesFromRef } from "@src/parse/utils";
import { ZodNumberDef } from "../zod-def-types";

export const parseZodNumberDef: ParseFunction<ZodNumberDef, NumberNode> = (
  def,
  refs
) => {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    type: "number",
    ...nodePropertiesFromRef(refs),
  };
};
