<script setup lang="ts">
/**
 * The knot: three agent threads tied into one black point. It is the logo, and
 * the mark of the human gate. `tight` pulls the threads in, once a person has
 * approved.
 */
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** sm 18px (inline), md 28px (the logo), lg 44px (the gate node), or a pixel size. */
    size?: 'sm' | 'md' | 'lg' | number
    /** Pull the threads in. Animated, except under reduced motion. */
    tight?: boolean
    /** `on-ink` draws the knot in the surface colour, for an ink background. */
    tone?: 'ink' | 'on-ink'
    /** Accessible name. Without it the knot is decorative. */
    label?: string
  }>(),
  { size: 'md', tight: false, tone: 'ink', label: undefined },
)

const SIZES = { sm: 18, md: 28, lg: 44 } as const
const px = computed(() => (typeof props.size === 'number' ? props.size : SIZES[props.size]))
</script>

<template>
  <svg
    class="s-knot"
    :class="{ 'is-tight': tight }"
    :data-tone="tone"
    :width="px"
    :height="px"
    viewBox="0 0 24 24"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
    focusable="false"
  >
    <g class="s-knot__pull" fill="none" stroke-width="2.3" stroke-linecap="round">
      <path class="s-knot__ci" d="M4.6 2.4C4.6 8.6 7.6 11.4 10.4 13.6" />
      <path class="s-knot__deploy" d="M12 2.4V13" />
      <path class="s-knot__config" d="M19.4 2.4C19.4 8.6 16.4 11.4 13.6 13.6" />
    </g>
    <g class="s-knot__core">
      <circle cx="12" cy="16.4" r="4.6" />
      <path d="M12 21v1.8" fill="none" stroke-width="2.3" stroke-linecap="round" />
    </g>
  </svg>
</template>

<style scoped>
.s-knot {
  flex: none;
  overflow: visible;
}

.s-knot__ci {
  stroke: var(--color-thread-ci);
}

.s-knot__deploy {
  stroke: var(--color-thread-deploy);
}

.s-knot__config {
  stroke: var(--color-thread-config);
}

.s-knot__core {
  fill: var(--color-gate);
  stroke: var(--color-gate);
}

.s-knot[data-tone='on-ink'] .s-knot__core {
  fill: var(--color-surface);
  stroke: var(--color-surface);
}

.s-knot__pull,
.s-knot__core {
  transform-origin: 12px 16.4px;
  transition: transform var(--duration-long) var(--ease-out);
}

.is-tight .s-knot__pull {
  transform: scaleX(0.6) translateY(1.5px);
}

.is-tight .s-knot__core {
  transform: scale(0.92);
}

@media (prefers-reduced-motion: reduce) {
  .s-knot__pull,
  .s-knot__core {
    transition: none;
  }
}
</style>
