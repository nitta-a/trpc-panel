import { nodePropertiesFromRef } from "@src/parse/utils";
import {
  ObjectNode,
  ParsedInputNode,
  ParseFunction,
  UnsupportedNode,
} from "../../../parseNodeTypes";
import { zodSelectorFunction } from "../selector";

export const parseZodObjectDef: ParseFunction<
  any,
  ObjectNode | UnsupportedNode
> = (def, refs) => {
  const shape = typeof def.shape === 'function' ? def.shape() : def.shape;
  const children: { [propertyName: string]: ParsedInputNode } = {};
  for (var propertyName of Object.keys(shape)) {
    const childDef = shape[propertyName]!.def || shape[propertyName]!._def;
    const node = zodSelectorFunction(childDef, {
      ...refs,
      path: refs.path.concat([propertyName]),
    });
    children[propertyName] = node;
  }
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    type: "object",
    children,
    ...nodePropertiesFromRef(refs),
  };
};
