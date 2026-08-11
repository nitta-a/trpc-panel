# Project Guidelines

## Repository Shape

- This repository is a Yarn v1 workspace monorepo with Nx orchestration. Install dependencies from the repo root with `yarn`.
- The main published library is in `packages/trpc-panel`.
- Parser logic lives in `packages/trpc-panel/src/parse`.
- The bundled React UI lives in `packages/trpc-panel/src/react-app`.
- `packages/dev-app` is a Next.js playground for local UI and router development.
- `packages/test-app` is an Express-based demo app that exercises the published package surface.
- `packages/docs` contains Docusaurus documentation.

## Code Style

- Follow Biome formatting and linting rules from `biome.json`.
- Match the existing TypeScript style: 2-space indentation, single quotes, no semicolons, trailing commas where Biome keeps them.
- Prefer `import type` for type-only imports.
- Keep edits narrow and avoid reformatting unrelated files.

## Library Conventions

- Preserve the separation between parser code and UI code: parsing behavior belongs under `src/parse`, rendering and interaction belong under `src/react-app`.
- Keep the public package surface intentional. If a change affects exports, update `packages/trpc-panel/src/index.ts` or other public entry points deliberately.
- `renderTrpcPanel` returns an HTML string and injects the parsed router plus bundled assets. Avoid changes that couple it to a specific backend framework.
- This project targets tRPC v11 and currently supports Zod input schemas. Do not introduce assumptions for older tRPC versions or non-Zod inputs unless the task explicitly requires extending support.
- Procedure documentation is derived from tRPC meta descriptions and Zod `.describe()` metadata. Preserve that flow when changing parser behavior.

## Validation

- Prefer validating from the smallest relevant scope first.
- For parser changes, update or add Jest coverage in `packages/trpc-panel/src/parse/__tests__` and run `cd packages/trpc-panel && yarn test`.
- For library changes, run `cd packages/trpc-panel && yarn typecheck`.
- For repo-wide checks, use root commands such as `yarn lint`, `yarn check`, `yarn typecheck`, `yarn test:panel`, and `yarn build:panel`.

## Workflow Notes

- Use `packages/dev-app` when you need a quick local UI integration check.
- Do not commit incidental playground-only router tweaks in `packages/dev-app/src/router.ts` unless the task is specifically about the demo router.
- When extending parser support for new schema shapes, add focused fixtures and assertions alongside the existing parse tests instead of relying only on manual app testing.