# Selvage

Selvage is the design system of [Guillaume Flambard](https://github.com/guillaume-flambard). It started as the visual identity of [Usine](https://github.com/guillaume-flambard/usine), an open workshop for AI agents.

A selvage is the tightly woven edge of a fabric, the part that keeps the threads from unravelling. Selvage does the same for an interface, and the identity says so directly:

- every agent has its own coloured **thread**;
- every thread ties into one black **knot**;
- the knot is the human gate, where a person decides before anything leaves the system.

## Status

Pre-release. The first version (v0.1.0) is being extracted from Usine, which is its first real consumer.

## Stack

- Tokens in the [W3C Design Tokens (DTCG)](https://www.designtokens.org/) format, built with Terrazzo into CSS variables and a Tailwind v4 theme.
- A Vue 3 package that themes [Nuxt UI 4](https://ui.nuxt.com) rather than replacing it, plus the few components only Selvage has: Thread, Knot, Gate and Keycap.
- Storybook 10 for the documentation, with Playwright and axe for visual and accessibility tests.
- A `DESIGN.md` and an `AGENTS.md`, so that coding agents build with the system instead of guessing it.

## License

MIT
