import { nodePropertiesFromRef, getChildDef } from "@src/parse/utils";
import { ZodArrayDef } from "../zod-def-types";
import { ArrayNode, ParseFunction } from "../../../parseNodeTypes";
import { zodSelectorFunction } from "../selector";

export const parseZodArrayDef: ParseFunction<ZodArrayDef, ArrayNode> = (
  def,
  refs
) => {
  const elementType = def.element || def.type;
  const childDef = getChildDef(elementType);
  const childType = zodSelectorFunction(childDef, { ...refs, path: [] });
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    type: "array",
    childType,
    ...nodePropertiesFromRef(refs),
  };
};
