# tRPC (panel) test app

This app is used as the example app for tRPC (panel) as well as is convenient for use while testing in development.

## Configuration

The app uses environment variables for configuration. Copy `.env.example` to `.env` to set up your local environment:

```bash
cp .env.example .env
```

Available environment variables:

- `SERVER_URL` - The base URL of the server (default: `http://localhost`)
- `TRPC_PATH` - The path where tRPC endpoints are served (default: `trpc`)
- `DEV_PORT` - The port the server listens on (default: `4000`)
- `SIMULATE_DELAY` - Whether to simulate network delay in development (default: `false`)
- `LIVE_RELOAD` - Enable live reload in development (default: `false`)

All variables have sensible defaults, so the app will work without a `.env` file.

## Running the app

Development mode (with hot reload):
```bash
yarn dev
```

Production mode:
```bash
yarn build
yarn start
```
