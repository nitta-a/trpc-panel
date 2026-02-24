import { nodePropertiesFromRef } from '@src/parse/utils'
import type { core } from 'zod'
import type { NumberNode, ParseFunction } from '../../../parseNodeTypes'

export const parseZodNumberDef: ParseFunction<core.$ZodNumberDef, NumberNode> =
  (def, refs) => {
    refs.addDataFunctions.addDescriptionIfExists(def, refs)
    return {
      type: 'number',
      ...nodePropertiesFromRef(refs),
    }
  }
