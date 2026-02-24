import { nodePropertiesFromRef } from '@src/parse/utils'
import { type ZodObject, type core } from 'zod'
import type {
  DiscriminatedUnionNode,
  ParseFunction,
} from '../../../parseNodeTypes'
import { zodSelectorFunction } from '../selector'

export const parseZodDiscriminatedUnionDef: ParseFunction<
  core.$ZodDiscriminatedUnionDef,
  DiscriminatedUnionNode
> = (def, refs) => {
  const discriminator = def.discriminator
  const entries = def.options.map((option) => {
    const shape = (option as ZodObject)._def.shape
    const literalDef = (shape[discriminator] as any)._def
    const discriminatorValue: string = literalDef.values[0]
    return [discriminatorValue, option] as const
  })
  const nodeEntries = entries.map(([discriminatorValue, zodObj]) => [
    discriminatorValue,
    zodSelectorFunction((zodObj as ZodObject)._def, refs),
  ])

  const nodesMap = Object.fromEntries(nodeEntries)
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return {
    type: 'discriminated-union',
    discriminatedUnionValues: entries.map(([n]) => n),
    discriminatedUnionChildrenMap: nodesMap,
    discriminatorName: discriminator,
    ...nodePropertiesFromRef(refs),
  }
}

// Keep for backward compatibility
export type ZodDiscriminatedUnionDefUnversioned = core.$ZodDiscriminatedUnionDef
