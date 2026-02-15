import type { AnyRouter } from '@trpc/server'
import { createTRPCReact } from '@trpc/react-query'

// Define a safe router type that explicitly doesn't have naming conflicts
// This is necessary because trpc-panel works with arbitrary routers,
// and we need to tell TypeScript's type system that we've verified
// these routers don't have naming conflicts with built-in methods.
type SafeGenericRouter = AnyRouter & {
  useContext?: never
  useUtils?: never
  Provider?: never
  useQueries?: never
}

// Create a generic tRPC client that works with any router type
// We use SafeGenericRouter to avoid TypeScript's naming conflict detection
// while still maintaining type safety for the actual router operations
export const trpc = createTRPCReact<SafeGenericRouter>()

// Export the type for use in component props
export type TRPCClient = typeof trpc
