import { nodePropertiesFromRef, getShapeFromDef, getChildDef } from "@src/parse/utils";
import { ZodObjectDef } from "../zod-def-types";
import {
  ObjectNode,
  ParsedInputNode,
  ParseFunction,
  UnsupportedNode,
} from "../../../parseNodeTypes";
import { zodSelectorFunction } from "../selector";

export const parseZodObjectDef: ParseFunction<ZodObjectDef,

  ObjectNode | UnsupportedNode
> = (def, refs) => {
  const shape = getShapeFromDef(def);
  const children: { [propertyName: string]: ParsedInputNode } = {};
  for (var propertyName of Object.keys(shape)) {
    const childDef = getChildDef(shape[propertyName]);
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
