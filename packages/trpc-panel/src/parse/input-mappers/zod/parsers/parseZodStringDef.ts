import { nodePropertiesFromRef } from '@src/parse/utils'
import type { core } from 'zod'
import type { ParseFunction, StringNode } from '../../../parseNodeTypes'

export const parseZodStringDef: ParseFunction<core.$ZodStringDef, StringNode> =
  (def, refs) => {
    refs.addDataFunctions.addDescriptionIfExists(def, refs)
    return {
      type: 'string',
      ...nodePropertiesFromRef(refs),
    }
  }
