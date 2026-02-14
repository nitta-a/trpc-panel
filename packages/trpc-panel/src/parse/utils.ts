import {
  ParseReferences,
  SharedInputNodeProperties,
} from "@src/parse/parseNodeTypes";

export function nodePropertiesFromRef(
  references: ParseReferences
): SharedInputNodeProperties {
  return {
    path: references.path,
    ...(references.optional && { optional: true }),
  };
}

export function getShapeFromDef(def: any): any {
  return typeof def.shape === 'function' ? def.shape() : def.shape;
}

export function getChildDef(child: any): any {
  return child?.def || child?._def;
}
