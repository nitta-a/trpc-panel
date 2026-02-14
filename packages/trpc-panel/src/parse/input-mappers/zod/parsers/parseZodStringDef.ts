import { ParseFunction, StringNode } from "../../../parseNodeTypes";
import { nodePropertiesFromRef } from "@src/parse/utils";
import { ZodStringDef } from "../zod-def-types";

export const parseZodStringDef: ParseFunction<ZodStringDef, StringNode> = (
  def,
  refs
) => {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    type: "string",
    ...nodePropertiesFromRef(refs),
  };
};
