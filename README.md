# Selvage

Selvage is the design system of [Guillaume Flambard](https://github.com/guillaume-flambard). It started as the visual identity of [Usine](https://github.com/guillaume-flambard/usine), an open workshop for AI agents.

A selvage is the tightly woven edge of a fabric, the part that keeps the threads from unravelling. Selvage does the same for an interface, and the identity says so directly:

- every agent has its own coloured **thread**;
- every thread ties into one black **knot**;
- the knot is the human gate, where a person decides before anything leaves the system.

So the system is small and strict. Warm-grey paper, white surfaces, one action colour (the ink), one colour per agent, and three faces with three jobs: Onest for everything, Instrument Serif for the human voice only, JetBrains Mono for data only.

## Status

v0.1.0, light theme only. Usine is its first consumer. Published on npm as [`@memolabs-apps/selvage`](https://www.npmjs.com/package/@memolabs-apps/selvage).

## What is inside

- **Tokens** in the [DTCG 2025.10](https://www.designtokens.org/tr/2025.10/) format (`tokens/`), primitives in OKLCH with semantic names on top, built with [Terrazzo](https://terrazzo.app) into CSS variables and a Tailwind v4 theme.
- **`@memolabs-apps/selvage`**, a Vue 3 package that themes [Nuxt UI 4](https://ui.nuxt.com) rather than replacing it: `selvage.css` and a `selvageUi` config. The faces are self-hosted from Fontsource, so a `font-src 'self'` policy holds.
- **Four components** Nuxt UI has no word for: `SThread`, `SKnot`, `SGate` and `SKeycap`.
- **Storybook 10** with a Foundations page and a story per component state, Playwright screenshots and an axe pass on every story.
- **`DESIGN.md`** (Google's format, front matter generated from the tokens) and **`AGENTS.md`**, so coding agents build with the system instead of guessing it. Storybook's component manifest is on, and its MCP server answers at `/mcp` while `pnpm storybook` runs.

## Install

```sh
pnpm add @memolabs-apps/selvage
```

Peer dependencies: `vue` 3.5, and for the theme `@nuxt/ui` 4.12 with `tailwindcss` 4.

## Use

```css
/* main.css */
@import 'tailwindcss';
@import '@nuxt/ui';
@import '@memolabs-apps/selvage/selvage.css';
```

```ts
// vite.config.ts
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'
import { selvageUi } from '@memolabs-apps/selvage'

export default {
  plugins: [vue(), ui({ ui: selvageUi, colorMode: false })],
}
```

In Nuxt, pass `selvageUi` as `ui` in `app.config.ts` instead.

```vue
<script setup lang="ts">
import { SGate, SThread } from '@memolabs-apps/selvage'
</script>

<template>
  <SThread thread="ci" label="CI" state="running" />
  <SGate question="Open this issue?" @decide="(choice) => send(choice)">
    <code>issue_write</code> on guillaume-flambard/usine.
  </SGate>
</template>
```

Without Nuxt UI, import `@memolabs-apps/selvage/tokens.css`, `fonts.css` and `components.css`, and use the components alone.

## Develop

```sh
pnpm install
pnpm build        # package, tokens, DESIGN.md check
pnpm storybook    # http://localhost:6006
pnpm verify       # what the pre-push hook runs
```

Decisions are in [`docs/adr/`](docs/adr/).

## License

MIT
