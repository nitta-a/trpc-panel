import { createTRPCReact } from '@trpc/react-query'
import type { AnyRouter } from '@trpc/server'

// Create a generic tRPC client that works with any router type
// Using AnyRouter is necessary here because trpc-panel needs to work with
// arbitrary tRPC routers defined by users, and we can't know their types
// at compile time. This is the intended use case for tRPC panel utilities.
export const trpc = createTRPCReact<AnyRouter>()

// Export the type for use in component props
export type TRPCClient = typeof trpc
