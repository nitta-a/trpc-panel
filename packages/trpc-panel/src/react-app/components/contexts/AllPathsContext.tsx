import type { ParsedProcedure } from '@src/parse/parseProcedure'
import type { ParsedRouter } from '@src/parse/parseRouter'
import type { ColorSchemeType } from '@src/react-app/components/CollapsableSection'
import { colorSchemeForNode } from '@src/react-app/components/style-utils'
import { createContext, type ReactNode, useContext, useMemo } from 'react'

const Context = createContext<{
  pathsArray: string[]
  colorSchemeForNode: { [path: string]: ColorSchemeType }
} | null>(null)

function flatten(
  node: ParsedRouter | ParsedProcedure,
): [string, ColorSchemeType][] {
  const r: [string, ColorSchemeType][] = []
  const colorSchemeType = colorSchemeForNode(node)
  if (node.nodeType === 'router') {
    const o = Object.values(node.children)
      .map(flatten)
      .reduce((a, b) => [...a, ...b])
    return [...r, ...o, [node.path.join('.'), colorSchemeType]]
  }

  return [...r, [node.pathFromRootRouter.join('.'), colorSchemeType]]
}

interface AllPathsContextProviderProps {
  rootRouter: ParsedRouter
  children: ReactNode
}
export function AllPathsContextProvider(props: AllPathsContextProviderProps) {
  const { rootRouter, children } = props

  const flattened = useMemo(() => flatten(rootRouter), [rootRouter])
  const pathsArray = useMemo(() => {
    return flattened.map((e) => e[0])
  }, [flattened])

  const colorSchemeForNode = useMemo(
    () => Object.fromEntries(flattened),
    [flattened],
  )

  return (
    <Context.Provider value={{ pathsArray, colorSchemeForNode, }}    >
      {children}
    </Context.Provider>
  )
}

export function useAllPaths() {
  const ctx = useContext(Context)
  if (ctx === null) throw new Error('AllPathsContextProvider not found.')
  return ctx
}
