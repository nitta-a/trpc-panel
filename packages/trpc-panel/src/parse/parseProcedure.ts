import type {
  AddDataFunctions,
  ParsedInputNode,
  ParseReferences,
} from '@src/parse/parseNodeTypes'
import { type AnyZodObject, z } from 'zod/v3'
import { zodToJsonSchema } from 'zod-to-json-schema'
import { zodSelectorFunction } from './input-mappers/zod/selector'
import type {
  JSON7SchemaType,
  ProcedureType,
  TrpcPanelExtraOptions,
} from './parseRouter'
import {
  isMutationDef,
  isQueryDef,
  isSubscriptionDef,
  type Procedure,
} from './routerType'

/**
 * Check if a schema is a Zod v4 schema (uses _def.type instead of _def.typeName)
 */
function isZodV4Schema(schema: unknown): boolean {
  return (
    schema !== null &&
    typeof schema === 'object' &&
    '_def' in schema &&
    typeof (schema as Record<string, unknown>)._def === 'object' &&
    'type' in ((schema as Record<string, unknown>)._def as object) &&
    !('typeName' in ((schema as Record<string, unknown>)._def as object))
  )
}

/**
 * Convert a schema to JSON Schema format, supporting both Zod v3 and Zod v4
 */
function schemaToJsonSchema(schema: unknown): ReturnType<typeof zodToJsonSchema> {
  if (isZodV4Schema(schema)) {
    // Zod v4 has a built-in toJSONSchema method
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const v4schema = schema as any
    if (typeof v4schema.toJSONSchema === 'function') {
      try {
        return v4schema.toJSONSchema() as ReturnType<typeof zodToJsonSchema>
      } catch (_) {
        // Some types (e.g. void) can't be represented in JSON Schema; return empty schema
        return {}
      }
    }
  }
  return zodToJsonSchema(schema as AnyZodObject, {
    errorMessages: true,
    $refStrategy: 'none',
  })
}

export type ProcedureExtraData = {
  parameterDescriptions: { [path: string]: string }
  description?: string
}

export type ParsedProcedure = {
  inputSchema: JSON7SchemaType
  node: ParsedInputNode
  nodeType: 'procedure'
  procedureType: ProcedureType
  pathFromRootRouter: string[]
  extraData: ProcedureExtraData
}

type SupportedInputType = 'zod'

const inputParserMap = {
  zod: (zodObject: AnyZodObject, refs: ParseReferences) => {
    return zodSelectorFunction(zodObject._def, refs)
  },
}

function inputType(_: unknown): SupportedInputType | 'unsupported' {
  return 'zod'
}

type NodeAndInputSchemaFromInputs =
  | {
      node: ParsedInputNode
      schema: ReturnType<typeof zodToJsonSchema>
      parseInputResult: 'success'
    }
  | {
      parseInputResult: 'failure'
    }

const emptyZodObject = z.object({})
function nodeAndInputSchemaFromInputs(
  inputs: unknown[],
  _routerPath: string[],
  options: TrpcPanelExtraOptions,
  addDataFunctions: AddDataFunctions,
): NodeAndInputSchemaFromInputs {
  if (!inputs.length) {
    return {
      parseInputResult: 'success',
      schema: zodToJsonSchema(emptyZodObject, {
        errorMessages: true,
        $refStrategy: 'none',
      }),
      node: inputParserMap.zod(emptyZodObject, {
        path: [],
        options,
        addDataFunctions,
      }),
    }
  }
  if (inputs.length !== 1) {
    return { parseInputResult: 'failure' }
  }
  const input = inputs[0]
  const iType = inputType(input)
  if (iType === 'unsupported') {
    return { parseInputResult: 'failure' }
  }

  return {
    parseInputResult: 'success',
    schema: schemaToJsonSchema(input),
    node: zodSelectorFunction((input as any)._def, {
      path: [],
      options,
      addDataFunctions,
    }),
  }
}

export function parseProcedure(
  procedure: Procedure,
  path: string[],
  options: TrpcPanelExtraOptions,
): ParsedProcedure | null {
  const { _def } = procedure
  const { inputs } = _def
  const parseExtraData: ProcedureExtraData = {
    parameterDescriptions: {},
  }
  const nodeAndInput = nodeAndInputSchemaFromInputs(inputs, path, options, {
    addDescriptionIfExists: (def, refs) => {
      if (def.description) {
        parseExtraData.parameterDescriptions[refs.path.join('.')] =
          def.description
      }
    },
  })
  if (nodeAndInput.parseInputResult === 'failure') {
    return null
  }

  const t = (() => {
    if (isQueryDef(_def)) return 'query'
    if (isMutationDef(_def)) return 'mutation'
    if (isSubscriptionDef(_def)) return 'subscription'
    return null
  })()

  if (!t) {
    return null
  }

  return {
    inputSchema: nodeAndInput.schema,
    node: nodeAndInput.node,
    nodeType: 'procedure',
    procedureType: t,
    pathFromRootRouter: path,
    extraData: {
      ...parseExtraData,
      ...(procedure._def.meta?.description && {
        description: procedure._def.meta.description,
      }),
    },
  }
}
