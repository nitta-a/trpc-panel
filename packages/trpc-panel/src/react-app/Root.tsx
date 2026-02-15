import { AllPathsContextProvider } from '@src/react-app/components/contexts/AllPathsContext'
import {
  HeadersContextProvider,
  useHeaders,
} from '@src/react-app/components/contexts/HeadersContext'
import { HotKeysContextProvider } from '@src/react-app/components/contexts/HotKeysContext'
import { SiteNavigationContextProvider } from '@src/react-app/components/contexts/SiteNavigationContext'
import { HeadersPopup } from '@src/react-app/components/HeadersPopup'
import { useLocalStorage } from '@src/react-app/components/hooks/useLocalStorage'
import { SearchOverlay } from '@src/react-app/components/SearchInputOverlay'
import type { RenderOptions } from '@src/render'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/react-query'
import { type ReactNode, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import superjson from 'superjson'
import type { ParsedRouter } from '../parse/parseRouter'
import { RouterContainer } from './components/RouterContainer'
import { SideNav } from './components/SideNav'
import { TopBar } from './components/TopBar'

export function RootComponent({
  rootRouter,
  options,
  trpc: trpcClient,
}: {
  rootRouter: ParsedRouter
  options: RenderOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trpc: any
}) {
  return (
    <HeadersContextProvider>
      <AllPathsContextProvider rootRouter={rootRouter}>
        <SiteNavigationContextProvider>
          <ClientProviders trpc={trpcClient} options={options}>
            <HotKeysContextProvider>
              <SearchOverlay>
                <div className="flex flex-col w-full h-full flex-1 relative">
                  <AppInnards rootRouter={rootRouter} />
                </div>
              </SearchOverlay>
            </HotKeysContextProvider>
          </ClientProviders>
        </SiteNavigationContextProvider>
      </AllPathsContextProvider>
    </HeadersContextProvider>
  )
}

function ClientProviders({
  trpc: trpcClient,
  children,
  options,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  trpc: any
  children: ReactNode
  options: RenderOptions
}) {
  const headers = useHeaders()
  const [trpcClientInstance] = useState(() =>
    trpcClient.createClient({
      links: [
        httpBatchLink({
          url: options.url,
          headers: headers.getHeaders,
        }),
      ],
      transformer: (() => {
        if (options.transformer === 'superjson') return superjson
        return undefined
      })(),
    }),
  )
  const [queryClient] = useState(() => new QueryClient())

  return (
    <trpcClient.Provider queryClient={queryClient} client={trpcClientInstance}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpcClient.Provider>
  )
}

function AppInnards({ rootRouter }: { rootRouter: ParsedRouter }) {
  const [sidebarOpen, setSidebarOpen] = useLocalStorage(
    'trpc-panel.show-minimap',
    true,
  )

  return (
    <div className="flex flex-col flex-1 relative">
      <TopBar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-row flex-1 bg-mainBackground">
        <SideNav
          rootRouter={rootRouter}
          open={sidebarOpen}
          setOpen={setSidebarOpen}
        />
        <div
          className="flex flex-col flex-1 items-center overflow-scroll"
          style={{
            maxHeight: 'calc(100vh - 4rem)',
          }}
        >
          <div className="container max-w-6xl p-4 pt-8">
            <RouterContainer router={rootRouter} />
          </div>
        </div>
      </div>
      <HeadersPopup />
      <Toaster />
    </div>
  )
}
