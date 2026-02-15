import { createTRPCReact } from '@trpc/react-query'

// Create a generic tRPC client that works with any router type
// Using 'any' is necessary here because trpc-panel needs to work with
// arbitrary tRPC routers defined by users, and we can't know their types
// at compile time. This is the intended use case for tRPC panel utilities.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trpc = createTRPCReact<any>()

// Export the type for use in component props
export type TRPCClient = typeof trpc
