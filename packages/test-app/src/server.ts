import 'dotenv/config'
import * as trpcExpress from '@trpc/server/adapters/express'
import connectLiveReload from 'connect-livereload'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { renderTrpcPanel } from 'trpc-panel'
import { testRouter } from './router.js'

// Load environment variables with defaults
const serverUrl = process.env.SERVER_URL || 'http://localhost'
const trpcPath = process.env.TRPC_PATH || 'trpc'
const port = process.env.DEV_PORT || '4000'
// to marginally improve local development experience
const liveReload = process.env.LIVE_RELOAD === 'true'
const simulateDelay = process.env.SIMULATE_DELAY === 'true'

async function createContext(opts: trpcExpress.CreateExpressContextOptions) {
  const authHeader = opts.req.headers.authorization
  return {
    authorized: !!authHeader,
  }
}

const expressApp = express()
expressApp.use(cors({ origin: '*' }))

if (liveReload) {
  expressApp.use(connectLiveReload())
}

if (simulateDelay) {
  console.log('Simulating delay...')
  expressApp.use((_req, _res, next) => {
    setTimeout(() => {
      next()
      console.log('Next in timeout')
    }, 1000)
  })
}

expressApp.use(morgan('short', {}))
expressApp.use(
  `/${trpcPath}`,
  trpcExpress.createExpressMiddleware({
    router: testRouter,
    createContext,
  }),
)

console.log('Starting at url ')
console.log(`${serverUrl}${port ? `:${port}` : ''}/${trpcPath}`)

expressApp.get('/', (_req, res) => {
  res.send(
    renderTrpcPanel(testRouter, {
      url: `${serverUrl}${port ? `:${port}` : ''}/${trpcPath}`,
      transformer: 'superjson',
    }),
  )
})

expressApp.listen(port ? port : 4000)
