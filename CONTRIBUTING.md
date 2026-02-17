# Contributing

TRPC Panel welcomes and encourages open source contributions.

## Local Development

The repo is configured to work with yarn v1 workspaces. To install dependencies, run:

```sh
yarn
```

### Code Quality

This project uses [Biome](https://biomejs.dev/) for linting and formatting. You can run the following commands:

```sh
# Check code for issues
yarn lint

# Format code
yarn format

# Check and apply safe fixes
yarn check

# Type check all packages (without emitting files)
yarn typecheck
```

You can also run type checking in individual packages:

```sh
# Type check trpc-panel package
cd packages/trpc-panel && yarn typecheck

# Type check test-app package
cd packages/test-app && yarn typecheck

# Type check dev-app package
cd packages/dev-app && yarn typecheck
```

### Development App

Included in this repo there is a development app that makes it easy to work on `trpc-panel` locally. It is a `next.js` app that will render the router included in the dev app. To run it, do:

```sh
cd packages/dev-app && yarn dev
```

This will run the app in your browser.

To add / remove procedures from the dev app's panel, modify its router in `packages/dev-app/src/router.ts`. Please do not commit changes to this file.

## Front end contributions

The `trpc-panel` front end is just a bunch of react components. Any updates made to the react components should immediately be visible while running the `dev-app`.

The React components are located in `packages/trpc-panel/src/react-app`.

## Updating the parser

For more advanced features, it may be required to update the parsing logic, which can be found in `packages/trpc-panel/parse`.
