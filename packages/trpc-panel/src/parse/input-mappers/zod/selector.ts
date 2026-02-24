import { parseZodBigIntDef } from './parsers/parseZodBigIntDef'
import { parseZodDefaultDef } from './parsers/parseZodDefaultDef'
import { parseZodEffectsDef } from './parsers/parseZodEffectsDef'
import { parseZodNullableDef } from './parsers/parseZodNullableDef'
import { parseZodNullDef } from './parsers/parseZodNullDef'
import { parseZodOptionalDef } from './parsers/parseZodOptionalDef'
import { parseZodPromiseDef } from './parsers/parseZodPromiseDef'
import { parseZodUndefinedDef } from './parsers/parseZodUndefinedDef'
import type { core } from 'zod'
import type { ParserSelectorFunction } from '../../parseNodeTypes'
import { parseZodArrayDef } from './parsers/parseZodArrayDef'
import { parseZodBooleanFieldDef } from './parsers/parseZodBooleanFieldDef'
import { parseZodDiscriminatedUnionDef } from './parsers/parseZodDiscriminatedUnionDef'
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
  // Please keep these in alphabetical order
  switch (def.type) {
    case 'array':
      return parseZodArrayDef(def as core.$ZodArrayDef, references)
    case 'bigint':
      return parseZodBigIntDef(def as core.$ZodBigIntDef, references)
    case 'boolean':
      return parseZodBooleanFieldDef(def as core.$ZodBooleanDef, references)
    case 'default':
      return parseZodDefaultDef(def as core.$ZodDefaultDef, references)
    case 'enum':
      return parseZodEnumDef(def as core.$ZodEnumDef, references)
    case 'literal':
      return parseZodLiteralDef(def as core.$ZodLiteralDef<any>, references)
    case 'null':
      return parseZodNullDef(def as core.$ZodNullDef, references)
    case 'nullable':
      return parseZodNullableDef(def as core.$ZodNullableDef, references)
    case 'number':
      return parseZodNumberDef(def as core.$ZodNumberDef, references)
    case 'object':
      return parseZodObjectDef(def as core.$ZodObjectDef, references)
    case 'optional':
      return parseZodOptionalDef(def as core.$ZodOptionalDef, references)
    case 'pipe':
      return parseZodEffectsDef(def as core.$ZodPipeDef, references)
    case 'promise':
      return parseZodPromiseDef(def as core.$ZodPromiseDef, references)
    case 'string':
      return parseZodStringDef(def as core.$ZodStringDef, references)
    case 'undefined':
      return parseZodUndefinedDef(def as core.$ZodUndefinedDef, references)
    case 'union':
      if ('discriminator' in def) {
        return parseZodDiscriminatedUnionDef(
          def as core.$ZodDiscriminatedUnionDef,
          references,
        )
      }
      return { type: 'unsupported', path: references.path }
    case 'void':
      return parseZodVoidDef(def as core.$ZodVoidDef, references)
  }
  return { type: 'unsupported', path: references.path }
}
