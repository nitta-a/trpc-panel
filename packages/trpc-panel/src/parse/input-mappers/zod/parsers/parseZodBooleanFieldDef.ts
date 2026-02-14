import { nodePropertiesFromRef } from "@src/parse/utils";
import { BooleanNode, ParseFunction } from "../../../parseNodeTypes";
import { ZodBooleanDef } from "../zod-def-types";

export const parseZodBooleanFieldDef: ParseFunction<
  ZodBooleanDef,
  BooleanNode
> = (def, refs) => {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return { type: "boolean", ...nodePropertiesFromRef(refs) };
};
