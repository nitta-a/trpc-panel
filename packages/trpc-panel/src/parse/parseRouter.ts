import type { zodToJsonSchema } from 'zod-to-json-schema'
import { logParseError } from './parseErrorLogs'
import { type ParsedProcedure, parseProcedure } from './parseProcedure'
import { isRouter, type Router, type RouterDef } from './routerType'

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

function parseRouter(
  router: Router,
  routerPath: string[],
  options: TrpcPanelExtraOptions,
): ParsedRouter {
  const children: ParsedRouterChildren = {}
  var hasChild = false
  
  // In tRPC v11, nested routers are flattened in _def.procedures with dot notation
  // e.g., "nestedRouter.testQuery" instead of having separate router objects
  // We need to reconstruct the nested structure
  
  const procedures = router._def.procedures
  const procedureEntries = Object.entries(procedures)
  
  // Group procedures by their first path segment
  const groupedProcedures: Record<string, any[]> = {}
  
  for (const [fullPath, procedure] of procedureEntries) {
    const pathParts = fullPath.split('.')
    // Every procedure path should have at least one segment
    if (pathParts.length === 0) continue
    const firstSegment = pathParts[0] as string
    
    if (!groupedProcedures[firstSegment]) {
      groupedProcedures[firstSegment] = []
    }
    
    groupedProcedures[firstSegment].push({
      fullPath,
      pathParts,
      procedure,
    })
  }
  
  // Process each group
  for (const [firstSegment, procedures] of Object.entries(groupedProcedures)) {
    const newPath = routerPath.concat([firstSegment])
    
    // If all procedures in this group have only one path part, they're direct children
    const allDirect = procedures.every(p => p.pathParts.length === 1)
    
    if (allDirect) {
      // Direct procedure - should always have at least one procedure in the group
      if (procedures.length === 0) continue
      const proc = procedures[0].procedure
      const parsedNode = parseProcedure(proc, newPath, options)
      if (!parsedNode) {
        logParseError(newPath.join('.'), "Couldn't parse procedure.")
        continue
      }
      hasChild = true
      children[firstSegment] = parsedNode
    } else {
      // Nested router - reconstruct it
      const nestedProcedures: Record<string, any> = {}
      
      for (const { pathParts, procedure } of procedures) {
        // Remove the first segment and rejoin
        const remainingPath = pathParts.slice(1).join('.')
        nestedProcedures[remainingPath] = procedure
      }
      
      // Create a synthetic router object
      const syntheticRouter: Router = {
        _def: {
          router: true,
          procedures: nestedProcedures,
        } as RouterDef,
      } as Router
      
      const parsedNode = parseRouter(syntheticRouter, newPath, options)
      hasChild = true
      children[firstSegment] = parsedNode
    }
  }
  
  if (!hasChild)
    logParseError(
      routerPath.join('.'),
      `Router doesn't have any successfully parsed children.`,
    )
  return { children, nodeType: 'router', path: routerPath }
}

export type TrpcPanelExtraOptions = {
  logFailedProcedureParse?: boolean
  transformer?: 'superjson'
}

export function parseRouterWithOptions(
  router: any,
  parseRouterOptions: TrpcPanelExtraOptions,
) {
  if (!isRouter(router)) {
    throw new Error('Non trpc router passed to trpc panel.')
  }
  return parseRouter(router, [], parseRouterOptions)
}
