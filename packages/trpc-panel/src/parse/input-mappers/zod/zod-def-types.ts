/**
 * Type definitions for Zod v4 def structures
 * These types represent the internal _def structure of Zod schemas
 */

// Base type that all Zod defs have
export interface ZodDefBase {
  type?: string;
  typeName?: string | symbol;
  description?: string;
}

// String def
export interface ZodStringDef extends ZodDefBase {
  type: 'string';
}

// Number def
export interface ZodNumberDef extends ZodDefBase {
  type: 'number';
}

// Boolean def
export interface ZodBooleanDef extends ZodDefBase {
  type: 'boolean';
}

// BigInt def
export interface ZodBigIntDef extends ZodDefBase {
  type: 'bigint';
}

// Null def
export interface ZodNullDef extends ZodDefBase {
  type: 'null';
}

// Undefined def
export interface ZodUndefinedDef extends ZodDefBase {
  type: 'undefined';
}

// Void def
export interface ZodVoidDef extends ZodDefBase {
  type: 'void';
}

// Literal def
export interface ZodLiteralDef<T = unknown> extends ZodDefBase {
  type: 'literal';
  value?: T;
  values?: T[];
}

// Enum def
export interface ZodEnumDef extends ZodDefBase {
  type: 'enum';
  values?: string[];
  entries?: Record<string, string>;
}

// Array def
export interface ZodArrayDef extends ZodDefBase {
  type: 'array';
  element?: unknown;
}

// Object def - shape can be function or object
export interface ZodObjectDef extends ZodDefBase {
  type: 'object';
  shape: (() => Record<string, unknown>) | Record<string, unknown>;
}

// Optional def
export interface ZodOptionalDef extends ZodDefBase {
  type: 'optional';
  innerType?: unknown;
}

// Nullable def
export interface ZodNullableDef extends ZodDefBase {
  type: 'nullable';
  innerType?: unknown;
}

// Default def
export interface ZodDefaultDef extends ZodDefBase {
  type: 'default';
  innerType?: unknown;
  defaultValue?: () => unknown;
}

// Branded def
export interface ZodBrandedDef extends ZodDefBase {
  type?: 'branded' | 'string' | 'number'; // In v4, branded schemas inherit base type
}

// Effects/Transform/Refinement def
export interface ZodEffectsDef extends ZodDefBase {
  type: 'effects' | 'transform' | 'refinement' | 'pipe';
  schema?: unknown;
  effect?: unknown;
  in?: unknown;
  out?: unknown;
}

// Promise def
export interface ZodPromiseDef extends ZodDefBase {
  type: 'promise';
  innerType?: unknown;
}

// Union of all possible Zod defs
export type AnyZodDef =
  | ZodStringDef
  | ZodNumberDef
  | ZodBooleanDef
  | ZodBigIntDef
  | ZodNullDef
  | ZodUndefinedDef
  | ZodVoidDef
  | ZodLiteralDef
  | ZodEnumDef
  | ZodArrayDef
  | ZodObjectDef
  | ZodOptionalDef
  | ZodNullableDef
  | ZodDefaultDef
  | ZodBrandedDef
  | ZodEffectsDef
  | ZodPromiseDef
  | ZodDefBase; // Fallback for unknown types
