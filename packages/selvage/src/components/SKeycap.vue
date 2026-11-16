<script setup lang="ts">
/**
 * A keyboard key, drawn as a small cap. It names a shortcut; the control that
 * owns the shortcut carries `aria-keyshortcuts`, and a keycap inside a button
 * is hidden from assistive tech (`decorative`).
 */
withDefaults(
  defineProps<{
    /** `ink` when the cap sits on an ink control. */
    tone?: 'light' | 'ink'
    /** Hide from assistive tech, when the owner already announces the key. */
    decorative?: boolean
  }>(),
  { tone: 'light', decorative: false },
)
</script>

<template>
  <kbd class="s-keycap" :data-tone="tone" :aria-hidden="decorative ? 'true' : undefined"><slot /></kbd>
</template>

<style scoped>
.s-keycap {
  display: inline-grid;
  place-items: center;
  min-width: 22px;
  height: 22px;
  padding: 0 var(--space-1);
  border-radius: calc(var(--radius-key) - 1px);
  background: var(--color-surface);
  color: var(--color-ink-2);
  font: var(--font-weight-medium) 12px / 1 var(--font-mono);
  box-shadow:
    inset 0 -1px 0 var(--color-line-strong),
    0 0 0 1px var(--color-line);
}

.s-keycap[data-tone='ink'] {
  background: var(--color-ink-key);
  color: var(--color-on-ink-2);
  box-shadow: none;
}
</style>
