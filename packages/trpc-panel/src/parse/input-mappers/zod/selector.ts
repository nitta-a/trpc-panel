import { parseZodBigIntDef } from '@src/parse/input-mappers/zod/parsers/parseZodBigIntDef'
import { parseZodBrandedDef } from '@src/parse/input-mappers/zod/parsers/parseZodBrandedDef'
import { parseZodDefaultDef } from '@src/parse/input-mappers/zod/parsers/parseZodDefaultDef'
import { parseZodEffectsDef } from '@src/parse/input-mappers/zod/parsers/parseZodEffectsDef'
import { parseZodNullableDef } from '@src/parse/input-mappers/zod/parsers/parseZodNullableDef'
import { parseZodNullDef } from '@src/parse/input-mappers/zod/parsers/parseZodNullDef'
import { parseZodOptionalDef } from '@src/parse/input-mappers/zod/parsers/parseZodOptionalDef'
import { parseZodPromiseDef } from '@src/parse/input-mappers/zod/parsers/parseZodPromiseDef'
import { parseZodUndefinedDef } from '@src/parse/input-mappers/zod/parsers/parseZodUndefinedDef'
import {
  type ZodArrayDef,
  type ZodBigIntDef,
  type ZodBooleanDef,
  type ZodBrandedDef,
  type ZodDefaultDef,
  type ZodEffectsDef,
  type ZodEnumDef,
  ZodFirstPartyTypeKind,
  type ZodLiteralDef,
  type ZodNullableDef,
  type ZodNullDef,
  type ZodNumberDef,
  type ZodObjectDef,
  type ZodOptionalDef,
  type ZodPromiseDef,
  type ZodStringDef,
  type ZodUndefinedDef,
  type ZodVoidDef,
} from 'zod/v3'
import type { ParserSelectorFunction } from '../../parseNodeTypes'
import { parseZodArrayDef } from './parsers/parseZodArrayDef'
import { parseZodBooleanFieldDef } from './parsers/parseZodBooleanFieldDef'
import {
  parseZodDiscriminatedUnionDef,
  type ZodDiscriminatedUnionDefUnversioned,
} from './parsers/parseZodDiscriminatedUnionDef'
import { parseZodEnumDef } from './parsers/parseZodEnumDef'
import { parseZodLiteralDef } from './parsers/parseZodLiteralDef'
import { parseZodNumberDef } from './parsers/parseZodNumberDef'
import { parseZodObjectDef } from './parsers/parseZodObjectDef'
import { parseZodStringDef } from './parsers/parseZodStringDef'
import { parseZodVoidDef } from './parsers/parseZodVoidDef'
import type { ZodDefWithType } from './zod-types'

export const zodSelectorFunction: ParserSelectorFunction<ZodDefWithType> = (
  def,
  references,
) => {
  // Support both Zod v3 (typeName) and Zod v4 (type)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const typeKey: string = (def.typeName ?? (def as any).type) as string

  // Please keep these in alphabetical order
  switch (typeKey) {
    case ZodFirstPartyTypeKind.ZodArray:
    case 'array':
      return parseZodArrayDef(def as ZodArrayDef, references)
    case ZodFirstPartyTypeKind.ZodBoolean:
    case 'boolean':
      return parseZodBooleanFieldDef(def as ZodBooleanDef, references)
    case ZodFirstPartyTypeKind.ZodDiscriminatedUnion:
      return parseZodDiscriminatedUnionDef(
        // Zod had some type changes between 3.19 -> 3.20 and we want to support both, not sure there's a way
        // to avoid this.
        def as unknown as ZodDiscriminatedUnionDefUnversioned,
        references,
      )
    case ZodFirstPartyTypeKind.ZodEnum:
    case 'enum':
      return parseZodEnumDef(def as ZodEnumDef, references)
    case ZodFirstPartyTypeKind.ZodLiteral:
    case 'literal':
      return parseZodLiteralDef(def as ZodLiteralDef, references)
    case ZodFirstPartyTypeKind.ZodNumber:
    case 'number':
      return parseZodNumberDef(def as ZodNumberDef, references)
    case ZodFirstPartyTypeKind.ZodObject:
    case 'object':
      return parseZodObjectDef(def as ZodObjectDef, references)
    case ZodFirstPartyTypeKind.ZodOptional:
    case 'optional':
      return parseZodOptionalDef(def as ZodOptionalDef, references)
    case ZodFirstPartyTypeKind.ZodString:
    case 'string':
      return parseZodStringDef(def as ZodStringDef, references)
    case ZodFirstPartyTypeKind.ZodNullable:
    case 'nullable':
      return parseZodNullableDef(def as ZodNullableDef, references)
    case ZodFirstPartyTypeKind.ZodBigInt:
    case 'bigint':
      return parseZodBigIntDef(def as ZodBigIntDef, references)
    case ZodFirstPartyTypeKind.ZodBranded:
      return parseZodBrandedDef(def as ZodBrandedDef<any>, references)
    case ZodFirstPartyTypeKind.ZodDefault:
    case 'default':
      return parseZodDefaultDef(def as ZodDefaultDef, references)
    case ZodFirstPartyTypeKind.ZodEffects:
    case 'pipe':
      return parseZodEffectsDef(def as ZodEffectsDef, references)
    case ZodFirstPartyTypeKind.ZodNull:
    case 'null':
      return parseZodNullDef(def as ZodNullDef, references)
    case ZodFirstPartyTypeKind.ZodPromise:
    case 'promise':
      return parseZodPromiseDef(def as ZodPromiseDef, references)
    case ZodFirstPartyTypeKind.ZodUndefined:
    case 'undefined':
      return parseZodUndefinedDef(def as ZodUndefinedDef, references)
    case ZodFirstPartyTypeKind.ZodVoid:
    case 'void':
      return parseZodVoidDef(def as ZodVoidDef, references)
    case 'union': {
      // Zod v4 discriminated union has a discriminator field
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((def as any).discriminator !== undefined) {
        return parseZodDiscriminatedUnionDef(
          def as unknown as ZodDiscriminatedUnionDefUnversioned,
          references,
        )
      }
      // Regular (non-discriminated) unions are not supported as form inputs
      // since there's no clean way to render an arbitrary union in a form
      return { type: 'unsupported', path: references.path }
    }
  }
  return { type: 'unsupported', path: references.path }
}
