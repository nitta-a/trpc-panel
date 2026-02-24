import { nodePropertiesFromRef } from '@src/parse/utils'
import { type ZodType, type core } from 'zod'
import type {
  ObjectNode,
  ParsedInputNode,
  ParseFunction,
  UnsupportedNode,
} from '../../../parseNodeTypes'
import { zodSelectorFunction } from '../selector'

export const parseZodObjectDef: ParseFunction<
  core.$ZodObjectDef,
  ObjectNode | UnsupportedNode
> = (def, refs) => {
  const shape = def.shape
  const children: { [propertyName: string]: ParsedInputNode } = {}
  for (var propertyName of Object.keys(shape)) {
    const fieldSchema = shape[propertyName] as ZodType
    const fieldRefs = {
      ...refs,
      path: refs.path.concat([propertyName]),
    }
    // In Zod v4, description is on the schema object, not on _def
    if (fieldSchema.description) {
      refs.addDataFunctions.addDescriptionIfExists(
        { description: fieldSchema.description },
        fieldRefs,
      )
    }
    const node = zodSelectorFunction(fieldSchema._def, fieldRefs)
    children[propertyName] = node
  }
  refs.addDataFunctions.addDescriptionIfExists(def, refs)
  return {
    type: 'object',
    children,
    ...nodePropertiesFromRef(refs),
  }
}
