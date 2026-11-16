# 0001. Tokens in DTCG 2025.10, built by Terrazzo

Date: 2026-11-16. Status: accepted.

## Context

The Le fil identity was first written as CSS variables inside Usine (`apps/web/src/assets/main.css`, MEM-86). That works for one app and fails for two: values get copied, then drift. Agents also need a description of the system they can read, and that description must not become a second source.

The Design Tokens Community Group published its first stable format, 2025.10 (Format, Color, Resolver), on 28 October 2025. It is a Community Group report, not a W3C standard, but the main tools read it.

## Decision

- The tokens live in `tokens/*.tokens.json`, in DTCG 2025.10. Two tiers: primitives (`palette.*`, OKLCH) and semantic tokens (`color.ground`, `color.ink`, `color.thread.ci`, `radius.card`, `duration.flow`...). Code reads only the semantic tier. A third tier (component tokens) is added only when a component really departs from the rule.
- A DTCG resolver (`selvage.resolver.json`) holds one `theme` modifier with a single `light` context. Dark mode becomes a second context, without touching the files that consume the tokens.
- Terrazzo 2.10 (`@terrazzo/cli`, `plugin-css`, `plugin-tailwind`) builds `tokens.css` (every token as a CSS variable) and `theme.css` (a Tailwind v4 `@theme` with the semantic tokens only, so utilities never reach a primitive).
- `DESIGN.md`'s front matter is generated from the same files (`scripts/design-md.mjs`) and checked in `pnpm build`.

## Consequences

- One edit in a token file changes the CSS, the Tailwind utilities and the agent description together; `pnpm build` fails if `DESIGN.md` drifted.
- Fluid sizes such as `clamp()` cannot be DTCG dimensions. Where a component needs one, it is written in the component from tokens (`clamp(var(--text-xl), ..., var(--text-question))`).
- Style Dictionary 5 was the alternative. It is more widespread but needs more configuration for a Tailwind v4 theme and for modes. It becomes worth it the day an iOS, Android or Figma Variables output is needed.

Sources: https://www.designtokens.org/tr/2025.10/, https://terrazzo.app/docs/integrations/tailwind/, the installed `@terrazzo/plugin-tailwind` 2.10.0 types.
