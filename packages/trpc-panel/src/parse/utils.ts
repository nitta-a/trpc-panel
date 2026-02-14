import {
  ParseReferences,
  SharedInputNodeProperties,
} from "@src/parse/parseNodeTypes";
import { ZodObjectDef } from "./input-mappers/zod/zod-def-types";

export function nodePropertiesFromRef(
  references: ParseReferences
): SharedInputNodeProperties {
  return {
    path: references.path,
    ...(references.optional && { optional: true }),
  };
}

export function getShapeFromDef(def: ZodObjectDef): Record<string, unknown> {
  return typeof def.shape === 'function' ? def.shape() : def.shape;
}

export function getChildDef(child: unknown): unknown {
  // Access _def or def property from child schema
  const anyChild = child as Record<string, unknown> | null | undefined;
  return anyChild?.def || anyChild?._def;
}
