import { nodePropertiesFromRef } from '@src/parse/utils'
import { type AnyZodObject, ZodFirstPartyTypeKind } from 'zod/v3'
import type {
  DiscriminatedUnionNode,
  ParseFunction,
} from '../../../parseNodeTypes'
import { zodSelectorFunction } from '../selector'

type OptionsMap = Map<string, AnyZodObject>

type ZodDiscriminatedUnionThreePointTwenty = {
  optionsMap: OptionsMap
  discriminator: string
  description?: string
}

type ZodDiscriminatedUnionPreThreePointTwenty = {
  options: OptionsMap
  discriminator: string
  description?: string
}

// Zod v4 discriminated union: options is an array of ZodObject schemas
type ZodV4DiscriminatedUnionDef = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any[]
  discriminator: string
  description?: string
}

export type ZodDiscriminatedUnionDefUnversioned =
  | ZodDiscriminatedUnionPreThreePointTwenty
  | ZodDiscriminatedUnionThreePointTwenty
  | ZodV4DiscriminatedUnionDef

function isZodThreePointTwenty(
  def: ZodDiscriminatedUnionDefUnversioned,
): def is ZodDiscriminatedUnionThreePointTwenty {
  return 'optionsMap' in def
}

function isZodV4(
  def: ZodDiscriminatedUnionDefUnversioned,
): def is ZodV4DiscriminatedUnionDef {
  // Zod v4 DU has no typeName field (unlike v3 which has typeName: 'ZodDiscriminatedUnion')
  return !('typeName' in def)
}

function makeDefConsistent(def: ZodDiscriminatedUnionDefUnversioned): {
  typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion
  discriminator: string
  options: Map<string, AnyZodObject>
} {
  if (isZodV4(def)) {
    // Build a Map from discriminator value to ZodObject
    const optionsMap = new Map<string, AnyZodObject>()
    for (const opt of (def as ZodV4DiscriminatedUnionDef).options) {
      // Each opt is a ZodObject; get the literal values from the discriminator field
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const discriminatorField = (opt._def.shape as any)[def.discriminator]
      if (!discriminatorField) {
        // Skip options that don't have the discriminator field (invalid schema)
        continue
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const literalValues: (string | number)[] =
        discriminatorField._def?.values ?? []
      for (const val of literalValues) {
        optionsMap.set(String(val), opt)
      }
    }
    return {
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator: def.discriminator,
      options: optionsMap,
    }
  }
  const optionsMap = isZodThreePointTwenty(def)
    ? def.optionsMap
    : (def.options as OptionsMap)
  return {
    typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
    discriminator: def.discriminator,
    options: optionsMap,
  }
}

export const parseZodDiscriminatedUnionDef: ParseFunction<
  ZodDiscriminatedUnionDefUnversioned,
  DiscriminatedUnionNode
> = (def, refs) => {
  const defConsistent = makeDefConsistent(def)
  const entries = Array.from(defConsistent.options.entries())
  const nodeEntries = entries.map(([discriminatorValue, zodObj]) => [
    discriminatorValue,
    zodSelectorFunction(zodObj._def, refs),
  ])

  const nodesMap = Object.fromEntries(nodeEntries)
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return {
    type: 'discriminated-union',
    discriminatedUnionValues: entries.map(([n]) => n),
    discriminatedUnionChildrenMap: nodesMap,
    discriminatorName: def.discriminator,
    ...nodePropertiesFromRef(refs),
  }
}
