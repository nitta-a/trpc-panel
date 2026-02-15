/* eslint-disable @typescript-eslint/no-unsafe-call */
import dynamic from 'next/dynamic'
import { parseRouterWithOptions } from 'trpc-panel/parse/parseRouter'
import { RootComponent } from 'trpc-panel/react-app/Root'
import { trpc } from 'trpc-panel/react-app/trpc'
import { appRouter } from '~/router'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
const parse = parseRouterWithOptions(appRouter as any, {
  transformer: 'superjson',
})

const App = dynamic(
  Promise.resolve(() => (
    <RootComponent
      rootRouter={parse}
      options={{
        url: 'http://localhost:3001/api/trpc',
        transformer: 'superjson',
      }}
      trpc={trpc}
    />
  )),
  { ssr: false },
)

const Component = () => {
  return <App />
}

// eslint-disable-next-line @typescript-eslint/require-await
export default Component
