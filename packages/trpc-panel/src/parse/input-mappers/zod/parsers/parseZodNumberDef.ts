import { NumberNode, ParseFunction } from "../../../parseNodeTypes";
import { ZodNumberDef } from 'zod/v3';
import { nodePropertiesFromRef } from "@src/parse/utils";

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
