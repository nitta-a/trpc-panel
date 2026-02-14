import { ParsedInputNode, ParseFunction } from "../../../parseNodeTypes";
import { zodSelectorFunction } from "../selector";
import { getChildDef } from "@src/parse/utils";

export const parseZodOptionalDef: ParseFunction<
  any,
  ParsedInputNode
> = (def, refs) => {
  const innerDef = getChildDef(def.innerType);
  const parsedInner = zodSelectorFunction(innerDef, refs);
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    ...parsedInner,
    optional: true,
  };
};
