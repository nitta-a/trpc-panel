import { nodePropertiesFromRef } from "@src/parse/utils";
import { BooleanNode, ParseFunction } from "../../../parseNodeTypes";

export const parseZodBooleanFieldDef: ParseFunction<
  any,
  BooleanNode
> = (def, refs) => {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return { type: "boolean", ...nodePropertiesFromRef(refs) };
};
