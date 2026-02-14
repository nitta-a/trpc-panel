import { nodePropertiesFromRef } from "@src/parse/utils";
import { ArrayNode, ParseFunction } from "../../../parseNodeTypes";
import { zodSelectorFunction } from "../selector";

export const parseZodArrayDef: ParseFunction<any, ArrayNode> = (
  def,
  refs
) => {
  const elementType = def.element || def.type;
  const childDef = elementType?.def || elementType?._def;
  const childType = zodSelectorFunction(childDef, { ...refs, path: [] });
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    type: "array",
    childType,
    ...nodePropertiesFromRef(refs),
  };
};
