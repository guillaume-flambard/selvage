/**
 * The Nuxt UI 4 theme of Selvage: the `ui` option of the `ui()` Vite plugin in
 * a Vue app, or `ui` in `app.config.ts` in a Nuxt app.
 *
 * It only restyles what Nuxt UI already draws. Colours come from selvage.css,
 * which points `--ui-primary` at the ink; these classes give the shapes.
 * Slots are merged with Nuxt UI's defaults (tailwind-merge), so a class here
 * replaces only the conflicting default.
 * https://ui.nuxt.com/docs/getting-started/theme/components
 */
export const selvageUi = {
  colors: {
    // Warm greys. --ui-primary is then set to the ink in selvage.css, because
    // a Nuxt UI colour needs a full 50 to 950 scale and the ink has none.
    primary: 'stone',
    neutral: 'stone',
  },
  button: {
    slots: {
      base: 'rounded-pill font-medium',
    },
    defaultVariants: {
      color: 'primary',
      variant: 'solid',
    },
  },
  input: {
    slots: {
      base: 'rounded-in',
    },
  },
  textarea: {
    slots: {
      base: 'rounded-in',
    },
  },
  badge: {
    slots: {
      base: 'rounded-key font-medium',
    },
    defaultVariants: {
      color: 'neutral',
      variant: 'soft',
    },
  },
  card: {
    slots: {
      root: 'rounded-card bg-surface shadow-1 ring-0 divide-line',
    },
  },
} as const

export type SelvageUi = typeof selvageUi
