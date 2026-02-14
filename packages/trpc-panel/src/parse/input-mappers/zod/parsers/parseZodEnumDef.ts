import { nodePropertiesFromRef } from "@src/parse/utils";
import { EnumNode, ParseFunction } from "../../../parseNodeTypes";

export const parseZodEnumDef: ParseFunction<any, EnumNode> = (
  def,
  refs
) => {
  const values = def.values || (def.entries ? Object.keys(def.entries) : []);
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return { type: "enum", enumValues: values, ...nodePropertiesFromRef(refs) };
};
