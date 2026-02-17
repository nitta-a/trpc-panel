import { createContext, type ReactNode, useContext } from 'react'

interface ContextType {
  path: string
}

const Context = createContext<ContextType | null>(null)

interface ProcedureFormContextProviderProps {
  children: ReactNode
  path: string
}
export function ProcedureFormContextProvider({ children, path, }: ProcedureFormContextProviderProps) {
  return <Context.Provider value={{ path }}>{children}</Context.Provider>
}

export function useProcedureFormContext() {
  const ctx = useContext(Context)
  if (!ctx)
    throw new Error(
      'Procedure form context must be called within ProcedureFormContextProvider (this is a bug with trpc-panel, open an issue).',
    )
  return ctx
}
