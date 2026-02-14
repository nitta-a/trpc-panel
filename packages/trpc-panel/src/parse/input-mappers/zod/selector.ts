import { parseZodStringDef } from "./parsers/parseZodStringDef";
import { ParserSelectorFunction } from "../../parseNodeTypes";
import { ZodDefWithType } from "./zod-types";
import { parseZodArrayDef } from "./parsers/parseZodArrayDef";
import { parseZodBooleanFieldDef } from "./parsers/parseZodBooleanFieldDef";
import {
  parseZodDiscriminatedUnionDef,
  ZodDiscriminatedUnionDefUnversioned,
} from "./parsers/parseZodDiscriminatedUnionDef";
import { parseZodEnumDef } from "./parsers/parseZodEnumDef";
import { parseZodLiteralDef } from "./parsers/parseZodLiteralDef";
import { parseZodNumberDef } from "./parsers/parseZodNumberDef";
import { parseZodObjectDef } from "./parsers/parseZodObjectDef";
import { parseZodOptionalDef } from "@src/parse/input-mappers/zod/parsers/parseZodOptionalDef";
import { parseZodNullableDef } from "@src/parse/input-mappers/zod/parsers/parseZodNullableDef";
import { parseZodBigIntDef } from "@src/parse/input-mappers/zod/parsers/parseZodBigIntDef";
import { parseZodBrandedDef } from "@src/parse/input-mappers/zod/parsers/parseZodBrandedDef";
import { parseZodDefaultDef } from "@src/parse/input-mappers/zod/parsers/parseZodDefaultDef";
import { parseZodEffectsDef } from "@src/parse/input-mappers/zod/parsers/parseZodEffectsDef";
import { parseZodNullDef } from "@src/parse/input-mappers/zod/parsers/parseZodNullDef";
import { parseZodPromiseDef } from "@src/parse/input-mappers/zod/parsers/parseZodPromiseDef";
import { parseZodUndefinedDef } from "@src/parse/input-mappers/zod/parsers/parseZodUndefinedDef";
import { parseZodVoidDef } from "./parsers/parseZodVoidDef";

export const zodSelectorFunction: ParserSelectorFunction<ZodDefWithType> = (
  def,
  references
) => {
  // const optional = isZodOptional(zodAny);
  // const unwrappedOptional = optional ? zodAny._def.innerType : zodAny;
  // Please keep these in alphabetical order
  // In Zod v4, typeName was changed to type and uses lowercase strings
  const typeKey = (def as any).type || (def as any).typeName;
  const normalizedType = typeof typeKey === 'string' ? typeKey.toLowerCase() : typeKey;
  
  switch (normalizedType) {
    case 'zodarray':
    case 'array':
      return parseZodArrayDef(def as any, references);
    case 'zodboolean':
    case 'boolean':
      return parseZodBooleanFieldDef(def as any, references);
    case 'zoddiscriminatedunion':
    case 'discriminatedunion':
    case 'zodunion':
    case 'union':
      return parseZodDiscriminatedUnionDef(
        def as unknown as ZodDiscriminatedUnionDefUnversioned,
        references
      );
    case 'zodenum':
    case 'enum':
      return parseZodEnumDef(def as any, references);
    case 'zodliteral':
    case 'literal':
      return parseZodLiteralDef(def as any, references);
    case 'zodnumber':
    case 'number':
      return parseZodNumberDef(def as any, references);
    case 'zodobject':
    case 'object':
      return parseZodObjectDef(def as any, references);
    case 'zodoptional':
    case 'optional':
      return parseZodOptionalDef(def as any, references);
    case 'zodstring':
    case 'string':
      return parseZodStringDef(def as any, references);
    case 'zodnullable':
    case 'nullable':
      return parseZodNullableDef(def as any, references);
    case 'zodbigint':
    case 'bigint':
      return parseZodBigIntDef(def as any, references);
    case 'zodbranded':
    case 'branded':
      return parseZodBrandedDef(def as any, references);
    case 'zoddefault':
    case 'default':
      return parseZodDefaultDef(def as any, references);
    case 'zodeffects':
    case 'effects':
    case 'zodpipe':
    case 'pipe':
    case 'transform':
      return parseZodEffectsDef(def as any, references);
    case 'zodnull':
    case 'null':
      return parseZodNullDef(def as any, references);
    case 'zodpromise':
    case 'promise':
      return parseZodPromiseDef(def as any, references);
    case 'zodundefined':
    case 'undefined':
      return parseZodUndefinedDef(def as any, references);
    case 'zodvoid':
    case 'void':
      return parseZodVoidDef(def as any, references);
  }
  return { type: "unsupported", path: references.path };
};
