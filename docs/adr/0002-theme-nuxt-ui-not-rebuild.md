# 0002. Theme Nuxt UI, do not rebuild it

Date: 2026-11-16. Status: accepted.

## Context

Usine already runs on Nuxt UI 4 (on Reka UI): accessible components, keyboard handling, focus management and an official MCP server. Rewriting buttons, inputs and cards to get the Le fil look would cost weeks and lose that accessibility work.

Nuxt UI 4 has three official theming levers: Tailwind v4's `@theme`, its own CSS variables (`--ui-primary`, `--ui-bg*`, `--ui-text*`, `--ui-border*`, `--ui-radius`) and the `ui` config (`ui()` in `vite.config.ts` for Vue, `app.config.ts` for Nuxt) with `slots`, `variants` and `defaultVariants`.

## Decision

- Selvage ships `selvage.css`, which maps Nuxt UI's variables onto the semantic tokens, and `selvageUi`, the `ui` config that gives Button, Input, Textarea, Badge and Card Selvage's shapes. Nuxt UI's components are used unchanged.
- The ink is set directly as `--ui-primary`. A Nuxt UI colour alias needs a full 50 to 950 scale and the ink has none (`primary: 'black'` does not work), so the aliases point at `stone` for the warm greys and the variable overrides the action colour.
- New components exist only where Nuxt UI has nothing: `SThread`, `SKnot`, `SGate`, `SKeycap`. They depend on Vue only, not on Nuxt UI, so they also work in an app that uses only `tokens.css`.

## Consequences

- Two traps were found while building v0.1.0, both now handled in `selvage.css` and `src/ui.ts`:
  - the `ui` classes reach Nuxt UI at runtime, so Tailwind never sees them in the app's files. `selvage.css` declares the built bundle as a `@source`;
  - tailwind-merge does not recognise a theme radius such as `rounded-pill` and keeps the default next to it. Radii are written `rounded-(--radius-pill)`.
- A Nuxt UI upgrade can change slot names. The Storybook story "Nuxt UI / Themed basics" and its screenshot catch that.
- Selvage stays small: four components to maintain, not forty.

Sources: https://ui.nuxt.com/docs/getting-started/theme/css-variables, https://ui.nuxt.com/docs/getting-started/theme/components, the installed `@nuxt/ui` 4.12.0 `unplugin.d.mts`.
