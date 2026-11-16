<script setup lang="ts">
/**
 * One agent's thread: a coloured vertical line, the agent's name and where it
 * is. While the agent runs, a dash flows down the line. The state is always
 * written out, so colour is never the only signal.
 */
import { computed } from 'vue'
import type { ThreadName, ThreadState } from '../types'

const props = withDefaults(
  defineProps<{
    /** Which agent: its colour. */
    thread: ThreadName
    /** The agent's name, as a person reads it. */
    label: string
    state?: ThreadState
    /** Override the state's words, for example in another language. */
    stateLabel?: string
  }>(),
  { state: 'idle', stateLabel: undefined },
)

const WORDS: Record<ThreadState, string> = {
  idle: 'waiting',
  running: 'running',
  done: 'done',
  failed: 'failed',
}

const stateText = computed(() => props.stateLabel ?? WORDS[props.state])
</script>

<template>
  <div class="s-thread" :data-thread="thread" :data-state="state">
    <span class="s-thread__line" aria-hidden="true" />
    <span class="s-thread__label">{{ label }}</span>
    <span class="s-thread__state">{{ stateText }}</span>
    <span v-if="$slots.detail" class="s-thread__detail"><slot name="detail" /></span>
  </div>
</template>

<!-- Global on purpose: any element can wear a thread with data-thread, and
     read its colour as --thread, --thread-text and --thread-tint. -->
<style>
[data-thread='supervisor'] {
  --thread: var(--color-thread-supervisor);
  --thread-text: var(--color-thread-supervisor-text);
  --thread-tint: var(--color-thread-supervisor-tint);
}

[data-thread='ci'] {
  --thread: var(--color-thread-ci);
  --thread-text: var(--color-thread-ci-text);
  --thread-tint: var(--color-thread-ci-tint);
}

[data-thread='deploy'] {
  --thread: var(--color-thread-deploy);
  --thread-text: var(--color-thread-deploy-text);
  --thread-tint: var(--color-thread-deploy-tint);
}

[data-thread='config'] {
  --thread: var(--color-thread-config);
  --thread-text: var(--color-thread-config-text);
  --thread-tint: var(--color-thread-config-tint);
}

[data-thread='synthesis'] {
  --thread: var(--color-thread-synthesis);
  --thread-text: var(--color-thread-synthesis-text);
  --thread-tint: var(--color-thread-synthesis-tint);
}

[data-thread='gate'] {
  --thread: var(--color-gate);
  --thread-text: var(--color-gate);
  --thread-tint: var(--color-soft);
}
</style>

<style scoped>
.s-thread {
  display: grid;
  grid-template-columns: 2px minmax(0, 1fr) auto;
  align-items: center;
  column-gap: var(--space-3);
  min-height: 40px;
  padding-inline-end: var(--space-1);
  color: var(--color-ink);
  font-size: var(--text-sm);
}

.s-thread:has(.s-thread__detail) {
  grid-template-columns: 2px minmax(0, 1fr) auto auto;
}

.s-thread__line {
  position: relative;
  align-self: stretch;
  overflow: hidden;
  margin-block: var(--space-1);
  border-radius: 2px;
  background: var(--thread);
}

/* The flowing dash: a short gap of surface colour travelling down the line.
   Transform only, so it stays on the compositor. */
.s-thread[data-state='running'] .s-thread__line::after {
  content: '';
  position: absolute;
  inset-inline: 0;
  top: 0;
  height: 35%;
  background: var(--color-surface);
  animation: s-thread-flow var(--duration-flow) linear infinite;
}

@keyframes s-thread-flow {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(290%);
  }
}

.s-thread[data-state='failed'] .s-thread__line {
  background: var(--color-error);
}

.s-thread__label {
  overflow: hidden;
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
  text-overflow: ellipsis;
}

.s-thread__state {
  color: var(--color-muted);
  font-size: var(--text-xs);
}

.s-thread[data-state='running'] .s-thread__state {
  color: var(--thread-text);
  font-weight: var(--font-weight-medium);
}

.s-thread[data-state='failed'] .s-thread__state {
  color: var(--color-error);
  font-weight: var(--font-weight-medium);
}

.s-thread__detail {
  color: var(--color-muted);
  font: var(--font-weight-regular) 12px / 1 var(--font-mono);
  font-variant-numeric: tabular-nums;
}

/* Under reduced motion the dash stands still; the word "running" stays. */
@media (prefers-reduced-motion: reduce) {
  .s-thread[data-state='running'] .s-thread__line::after {
    animation: none;
    top: 32%;
  }
}
</style>
