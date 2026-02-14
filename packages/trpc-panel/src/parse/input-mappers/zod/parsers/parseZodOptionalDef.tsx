import { ParsedInputNode, ParseFunction } from "../../../parseNodeTypes";
import { zodSelectorFunction } from "../selector";
import { getChildDef } from "@src/parse/utils";
import { ZodOptionalDef } from "../zod-def-types";

export const parseZodOptionalDef: ParseFunction<
  ZodOptionalDef,
  ParsedInputNode
> = (def, refs) => {
  const innerDef = getChildDef(def.innerType);
  const parsedInner = zodSelectorFunction(innerDef as any, refs);
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    ...parsedInner,
    optional: true,
  };
};
