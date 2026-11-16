# Selvage: agent instructions

Project rules: `~/memolabs/AGENTS.md`. This file covers only what is specific to Selvage.

- **What it is.** Guillaume Flambard's design system ("Le fil" identity). It is public and written in English: code, docs and commits alike.
- **Stack.** pnpm monorepo, DTCG 2025.10 tokens built by Terrazzo, a Vue 3 package that themes Nuxt UI 4, Storybook 10 (vue3-vite), Playwright with axe, Changesets.
- **Source of truth.** `tokens/*.tokens.json`. `tokens.css`, the Tailwind theme and the front matter of `DESIGN.md` are generated from them and never edited by hand. The prose of `DESIGN.md` is written by hand.

## Layout

| Path | What |
|---|---|
| `tokens/` | Primitives (OKLCH), semantic tokens, the DTCG resolver, the Tailwind template |
| `terrazzo.config.ts` | Builds `packages/selvage/dist/tokens.css` and `theme.css` |
| `packages/selvage/` | The npm package: `styles/selvage.css`, `src/ui.ts` (`selvageUi`), `src/components/` |
| `apps/docs/` | Storybook, its Playwright screenshot and axe tests |
| `scripts/design-md.mjs` | Writes or checks `DESIGN.md`'s front matter against the tokens |
| `docs/adr/` | Why the structural choices were made |

## Commands

```sh
pnpm install
pnpm build            # package, then tokens, then the DESIGN.md check and lint
pnpm storybook        # docs on :6006, component MCP on :6006/mcp (run pnpm build first)
pnpm test             # Vitest, the components
pnpm verify           # everything: lint, build, typecheck, unit, Storybook build, screenshots + axe
pnpm design:sync      # after a token change: regenerate DESIGN.md's front matter
pnpm changeset        # describe a user-facing change
```

`pnpm verify` runs on pre-push (lefthook). Screenshot baselines live in `apps/docs/tests/stories.spec.ts-snapshots/`; after an intended visual change, delete the stale ones and run `pnpm test:stories` to rewrite them.

## How an app consumes it

```css
/* main.css */
@import 'tailwindcss';
@import '@nuxt/ui';
@import '@memolabs-apps/selvage/selvage.css';
```

```ts
// vite.config.ts (Vue). In Nuxt, pass selvageUi as `ui` in app.config.ts.
import ui from '@nuxt/ui/vite'
import { selvageUi } from '@memolabs-apps/selvage'
ui({ ui: selvageUi, colorMode: false })
```

```vue
<SGate question="Open this issue?" @decide="send" />
```

## Hard rules

- Every colour, font, radius, shadow and duration goes through a semantic token (`--color-*`, `--radius-*`, `--shadow-*`, `--duration-*`, `--ease-*`, or the Tailwind utilities built from them). Palette primitives are never read outside `tokens/`.
- The ink is the only filled action colour. No second accent.
- A thread colour belongs to one agent and means nothing else.
- The serif face speaks only for the human (the gate, notes). Mono is for data only.
- Every state is written in words; colour is never the only signal.
- Labels are never tracked capitals. No middle-dot meta strings, no decorative status dots.
- Every control has a `:focus-visible` style and a reduced-motion fallback.
- Nuxt UI is themed, never forked. A new component exists only if Nuxt UI has nothing for it.
- In `selvageUi`, write theme radii as `rounded-(--radius-*)`: tailwind-merge does not recognise `rounded-pill` as a radius and would keep the default too.

## Before any visual change

Run the Hallmark sloplint on the built Storybook and `impeccable detect --json packages/selvage/src`. Never show the owner a screen that has not passed them.

## Workflow

A prototype for now (régime A): small Conventional Commits straight on `main`, checks in local hooks. Publishing to npm is the owner's decision.

Release, once the owner asks for one: `pnpm changeset version`, commit, then `git tag vX.Y.Z && git push --follow-tags`. `.github/workflows/release.yml` publishes `@memolabs-apps/selvage` from the tag through npm trusted publishing: no npm token exists anywhere, and the tag must equal the package version.
