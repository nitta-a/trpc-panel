/**
 * Tests for Zod v4 schema parsing support.
 * Zod v4 uses `_def.type` instead of `_def.typeName` for type identification.
 */
import { defaultReferences } from '@src/parse/input-mappers/defaultReferences'
import { zodSelectorFunction } from '@src/parse/input-mappers/zod/selector'
import type {
  ArrayNode,
  DiscriminatedUnionNode,
  EnumNode,
  LiteralNode,
  ObjectNode,
  StringNode,
} from '@src/parse/parseNodeTypes'
import { parseProcedure } from '@src/parse/parseProcedure'
import type { Procedure } from '@src/parse/routerType'
import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const t = initTRPC.create({})

describe('Zod v4 schema parsing', () => {
  it('should parse a Zod v4 string schema', () => {
    const schema = z.string()
    const expected: StringNode = {
      type: 'string',
      path: [],
    }
    const result = zodSelectorFunction(schema._def as any, defaultReferences())
    expect(result).toStrictEqual(expected)
  })

  it('should parse a Zod v4 object schema', () => {
    const schema = z.object({
      name: z.string(),
      age: z.number(),
    })
    const expected: ObjectNode = {
      type: 'object',
      path: [],
      children: {
        name: { type: 'string', path: ['name'] },
        age: { type: 'number', path: ['age'] },
      },
    }
    const result = zodSelectorFunction(schema._def as any, defaultReferences())
    expect(result).toStrictEqual(expected)
  })

  it('should parse a Zod v4 array schema', () => {
    const schema = z.string().array()
    const expected: ArrayNode = {
      type: 'array',
      path: [],
      childType: { type: 'string', path: [] },
    }
    const result = zodSelectorFunction(schema._def as any, defaultReferences())
    expect(result).toStrictEqual(expected)
  })

  it('should parse a Zod v4 enum schema', () => {
    const schema = z.enum(['one', 'two', 'three'])
    const expected: EnumNode = {
      type: 'enum',
      path: [],
      enumValues: ['one', 'two', 'three'],
    }
    const result = zodSelectorFunction(schema._def as any, defaultReferences())
    expect(result).toStrictEqual(expected)
  })

  it('should parse a Zod v4 literal schema', () => {
    const schema = z.literal('hello')
    const expected: LiteralNode = {
      type: 'literal',
      path: [],
      value: 'hello',
    }
    const result = zodSelectorFunction(schema._def as any, defaultReferences())
    expect(result).toStrictEqual(expected)
  })

  it('should parse a Zod v4 discriminated union schema', () => {
    const schema = z.discriminatedUnion('disc', [
      z.object({
        disc: z.literal('one'),
        numberPropertyOne: z.number(),
      }),
      z.object({
        disc: z.literal('two'),
        stringPropertyTwo: z.string(),
      }),
    ])
    const expected: DiscriminatedUnionNode = {
      type: 'discriminated-union',
      path: [],
      discriminatorName: 'disc',
      discriminatedUnionValues: ['one', 'two'],
      discriminatedUnionChildrenMap: {
        one: {
          type: 'object',
          children: {
            disc: { type: 'literal', path: ['disc'], value: 'one' },
            numberPropertyOne: { type: 'number', path: ['numberPropertyOne'] },
          },
          path: [],
        },
        two: {
          type: 'object',
          children: {
            disc: { type: 'literal', path: ['disc'], value: 'two' },
            stringPropertyTwo: { type: 'string', path: ['stringPropertyTwo'] },
          },
          path: [],
        },
      },
    }
    const result = zodSelectorFunction(schema._def as any, defaultReferences())
    expect(result).toStrictEqual(expected)
  })

  it('should parse a tRPC procedure with Zod v4 input', () => {
    const router = t.router({
      hello: t.procedure
        .input(z.object({ name: z.string(), age: z.number() }))
        .query(({ input }) => `Hello ${input.name}`),
    })
    const procedure = router._def.procedures.hello as unknown as Procedure
    const parsed = parseProcedure(procedure, ['hello'], {})
    expect(parsed).not.toBeNull()
    expect(parsed?.nodeType).toBe('procedure')
    expect(parsed?.procedureType).toBe('query')
    expect(parsed?.node.type).toBe('object')
    const objectNode = parsed?.node as ObjectNode
    expect(objectNode.children.name?.type).toBe('string')
    expect(objectNode.children.age?.type).toBe('number')
    expect(parsed?.inputSchema).toBeDefined()
    // JSON schema should include properties
    const schema = parsed?.inputSchema as any
    expect(schema.type).toBe('object')
    expect(schema.properties).toBeDefined()
  })

  it('should parse optional Zod v4 fields', () => {
    const schema = z.object({
      required: z.string(),
      optional: z.string().optional(),
    })
    const result = zodSelectorFunction(schema._def as any, defaultReferences())
    expect(result.type).toBe('object')
    const objectNode = result as ObjectNode
    expect(objectNode.children.required?.type).toBe('string')
    expect((objectNode.children.required as any).optional).toBeUndefined()
    expect(objectNode.children.optional?.type).toBe('string')
    expect((objectNode.children.optional as any).optional).toBe(true)
  })
})
