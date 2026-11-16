/**
 * The Nuxt UI 4 theme of Selvage: the `ui` option of the `ui()` Vite plugin in
 * a Vue app, or `ui` in `app.config.ts` in a Nuxt app.
 *
 * It only restyles what Nuxt UI already draws. Colours come from selvage.css,
 * which points `--ui-primary` at the ink; these classes give the shapes.
 * Slots are merged with Nuxt UI's defaults (tailwind-merge), so a class here
 * replaces only the conflicting default. Radii and shadows are written as
 * `rounded-(--radius-pill)` rather than `rounded-pill`: tailwind-merge only
 * knows the first form is a radius, and would otherwise keep both classes.
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
      base: 'rounded-(--radius-pill) font-medium',
    },
    defaultVariants: {
      color: 'primary',
      variant: 'solid',
    },
  },
  // A field's edge is drawn in muted: the default hairline measured 1.28:1
  // against the page, under the 3:1 a control's boundary needs (WCAG 1.4.11).
  input: {
    slots: {
      base: 'rounded-(--radius-in)',
    },
    variants: {
      variant: {
        outline: 'ring-(--color-muted)',
      },
    },
  },
  textarea: {
    slots: {
      base: 'rounded-(--radius-in)',
    },
    variants: {
      variant: {
        outline: 'ring-(--color-muted)',
      },
    },
  },
  badge: {
    slots: {
      base: 'rounded-(--radius-key) font-medium',
    },
    defaultVariants: {
      color: 'neutral',
      variant: 'soft',
    },
  },
  card: {
    slots: {
      root: 'rounded-(--radius-card) bg-surface shadow-(--shadow-1) ring-0 divide-line',
    },
  },
} as const

export type SelvageUi = typeof selvageUi
