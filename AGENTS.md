# Selvage: agent instructions

Project rules: `~/memolabs/AGENTS.md`. This file covers only what is specific to Selvage.

- **What it is.** Guillaume Flambard's design system ("Le fil" identity). It is public and written in English: code, docs and commits alike.
- **Stack.** pnpm monorepo, DTCG tokens built by Terrazzo, a Vue 3 package that themes Nuxt UI 4, Storybook 10 (vue3-vite), Playwright with axe, Changesets.
- **Source of truth.** The tokens. CSS variables, the Tailwind theme and `DESIGN.md` are all generated from them and never edited by hand.
- **Hard rules.**
  - Every colour, font, radius and shadow goes through a token.
  - Labels are never tracked capitals.
  - No middle-dot meta strings and no decorative status dots.
  - Every control has a `:focus-visible` style and a reduced-motion fallback.
  - The serif face speaks only for the human (the gate, notes).
  - Mono is for data only.
- **Before any visual change:** run the Hallmark sloplint and `impeccable detect`. Never show the owner a screen that has not passed them.
- **Workflow.** A prototype for now (régime A): small Conventional Commits straight on `main`, checks in local hooks.
