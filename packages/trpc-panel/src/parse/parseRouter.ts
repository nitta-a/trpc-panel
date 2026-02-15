import type { AnyRouter as TRPCRouter } from '@trpc/server'
import type { zodToJsonSchema } from 'zod-to-json-schema'
import { logParseError } from './parseErrorLogs'
import { type ParsedProcedure, parseProcedure } from './parseProcedure'
import { isProcedure, isRouter, type Router } from './routerType'

export type JSON7SchemaType = ReturnType<typeof zodToJsonSchema>

export type ProcedureType = 'query' | 'mutation' | 'subscription'

export type ParsedRouterChildren = {
  [key: string]: ParsedRouter | ParsedProcedure
}

export type ParsedRouter = {
  children: ParsedRouterChildren
  path: string[]
  nodeType: 'router'
}

export type ParseRouterRefs = {
  path: string[]
}

// Some things in the router are not procedures, these are those things keys
const skipSet = new Set(['createCaller', '_def', 'getErrorShape'])

// In v11, nested routers in _def.record are plain objects (RouterRecord)
// without _def, so we need to detect them differently
function isRouterRecord(obj: unknown): obj is Record<string, unknown> {
  if (typeof obj !== 'object' || obj === null) return false
  if ('_def' in obj) return false // If it has _def, it's a Router or Procedure
  // Check if it's an object with at least one property that looks like a procedure or nested router
  const entries = Object.entries(obj)
  return entries.length > 0 && entries.some(([key, value]) => 
    !skipSet.has(key) && (typeof value === 'function' || typeof value === 'object')
  )
}

function parseRouterRecord(
  record: Record<string, unknown>,
  routerPath: string[],
  options: TrpcPanelExtraOptions,
): ParsedRouter {
  const children: ParsedRouterChildren = {}
  var hasChild = false
  
  for (var [key, child] of Object.entries(record)) {
    if (skipSet.has(key)) continue
    const newPath = routerPath.concat([key])
    const parsedNode = (() => {
      if (isProcedure(child)) {
        return parseProcedure(child, newPath, options)
      }
      if (isRouterRecord(child)) {
        return parseRouterRecord(child as Record<string, unknown>, newPath, options)
      }
      return null
    })()
    if (!parsedNode) {
      logParseError(newPath.join('.'), "Couldn't parse node.")
      continue
    }
    hasChild = true
    children[key] = parsedNode
  }
  
  if (!hasChild)
    logParseError(
      routerPath.join('.'),
      `Router doesn't have any successfully parsed children.`,
    )
  return { children, nodeType: 'router', path: routerPath }
}

function parseRouter(
  router: Router,
  routerPath: string[],
  options: TrpcPanelExtraOptions,
): ParsedRouter {
  // In v11, iterate over _def.record which contains the actual procedures and routers
  const record = router._def?.record || {}
  return parseRouterRecord(record, routerPath, options)
}

export type TrpcPanelExtraOptions = {
  logFailedProcedureParse?: boolean
  transformer?: 'superjson'
}

export function parseRouterWithOptions(
  router: TRPCRouter,
  parseRouterOptions: TrpcPanelExtraOptions,
) {
  if (!isRouter(router)) {
    throw new Error('Non trpc router passed to trpc panel.')
  }
  return parseRouter(router, [], parseRouterOptions)
}
