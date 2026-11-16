import { defineConfig } from '@terrazzo/cli'
import css from '@terrazzo/plugin-css'
import tailwind from '@terrazzo/plugin-tailwind'

// The tokens are the source of truth. This builds them into plain CSS
// variables (tokens.css, every token) and a Tailwind v4 theme (theme.css, the
// semantic tokens only, so utilities never reach a primitive).
export default defineConfig({
  tokens: ['./tokens/selvage.resolver.json'],
  outDir: './packages/selvage/dist/',
  plugins: [
    css({
      filename: 'tokens.css',
      permutations: [
        {
          input: { theme: 'light' },
          prepare: (contents) => `:root {\n  color-scheme: light;\n  ${contents}\n}`,
        },
      ],
    }),
    tailwind({
      // Resolved from outDir itself, so it climbs back to the repo root.
      template: '../../../tokens/tailwind.template.css',
      filename: 'theme.css',
      theme: {
        color: ['color.*'],
        // A second key, because one key maps one glob level.
        'color-thread': ['color.thread.*'],
        font: ['font.*'],
        'font-weight': ['font-weight.*'],
        text: ['text.*'],
        radius: ['radius.*'],
        shadow: ['shadow.*'],
        ease: ['ease.*'],
      },
    }),
  ],
})
