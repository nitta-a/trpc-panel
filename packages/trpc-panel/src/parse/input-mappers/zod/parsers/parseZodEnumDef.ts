import { nodePropertiesFromRef } from "@src/parse/utils";
import { EnumNode, ParseFunction } from "../../../parseNodeTypes";

export const parseZodEnumDef: ParseFunction<any, EnumNode> = (
  def,
  refs
) => {
  let values: string[];
  if (def.values) {
    values = def.values as string[];
  } else if (def.entries) {
    values = Object.keys(def.entries);
  } else {
    values = [];
  }
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return { type: "enum", enumValues: values, ...nodePropertiesFromRef(refs) };
};
