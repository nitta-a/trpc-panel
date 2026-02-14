import { ParsedInputNode, ParseFunction } from "../../../parseNodeTypes";
import { zodSelectorFunction } from "../selector";

export const parseZodOptionalDef: ParseFunction<
  any,
  ParsedInputNode
> = (def, refs) => {
  const innerDef = def.innerType?.def || def.innerType?._def;
  const parsedInner = zodSelectorFunction(innerDef, refs);
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    ...parsedInner,
    optional: true,
  };
};
