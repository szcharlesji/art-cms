# Repository Guidelines
This guide helps contributors deliver reliable updates to the art-cms Next.js project.

## Project Structure & Module Organization
- `app/` contains App Router routes, layouts, and metadata; each subfolder exports route-specific UI.
- `components/` hosts shared React components; prefer colocating component styles and using Tailwind utility classes inside the JSX.
- `lib/`, `hooks/`, and `types/` centralize data access, custom hooks, and shared TypeScript types.
- `public/` stores static assets (artwork images, icons). Cloudflare-specific config lives in `wrangler.jsonc` and `open-next.config.ts`.

## Build, Test, and Development Commands
- `bun install` installs dependencies tracked in `bun.lock`.
- `bun dev` runs the Next.js dev server on `localhost:8787` with Turbopack.
- `bun run build` produces an optimized production build.
- `bun run start` serves the build locally for smoke tests.
- `bun run lint` executes `next lint`.
- `bun run deploy` / `bun run preview` build via OpenNext and push to Cloudflare.

## Coding Style & Naming Conventions
Use TypeScript everywhere, with two-space indentation and single quotes inside TS when not constrained by JSX. Components and hooks follow `PascalCase` and `useCamelCase` naming. Keep files short and cohesive; prefer module-level named exports. When styling, compose Tailwind utilities and share variants via `class-variance-authority`.

## Testing Guidelines
The repository currently relies on manual verification. Before opening a PR, run `bun run lint` and exercise affected flows in the browser. If you add automated tests, colocate them beside the source file with a `.test.ts(x)` suffix and ensure they can run under Bun or Vitest. Target meaningful coverage around data transforms and form workflows.

## Commit & Pull Request Guidelines
Write concise, present-tense commit messages (e.g. `add hero gallery preload`). Group related changes together and avoid large mixed commits. Pull requests should include: a short summary, screenshots or recordings for UI updates, linked Linear/GitHub issues when relevant, and a checklist of local commands executed. Confirm Cloudflare env secrets in `cloudflare-env.d.ts` remain accurate before requesting review.
