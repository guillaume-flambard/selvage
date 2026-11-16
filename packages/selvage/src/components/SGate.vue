<script setup lang="ts">
/**
 * The human gate: the one place where a person decides before an action
 * leaves the system. It asks one question in the human voice (serif), shows
 * what would happen (the default slot), and offers three answers: Approve,
 * Correct and Reject. A, C and R answer from the keyboard, except while the
 * person is typing in a field.
 *
 * The gate only reports the choice (`decide`). What "correct" and "reject"
 * open next (an editor, a reason field) belongs to the app.
 */
import { computed, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'
import type { GateDecision } from '../types'
import { gateKeyDecision } from '../gate-keys'
import SKeycap from './SKeycap.vue'
import SKnot from './SKnot.vue'

const props = withDefaults(
  defineProps<{
    /** The one question the person answers, in plain words. */
    question: string
    /** The small heading above the question. */
    heading?: string
    /** Heading level of `heading`, to fit the page outline. */
    level?: 2 | 3 | 4
    /** A, C and R answer from anywhere on the page. One gate per page should have it. */
    shortcuts?: boolean
    /** A decision is being sent: the answers are disabled. */
    busy?: boolean
    /** The decision already taken, if any. The answers then give way to `done`. */
    decision?: GateDecision | null
    /** Override the answers' words, for example in another language. */
    labels?: Partial<Record<GateDecision, string>>
    /** What the page says once decided. Override per language. */
    doneText?: Partial<Record<GateDecision, string>>
    /** Move focus to the gate when it appears. */
    autofocus?: boolean
  }>(),
  {
    heading: 'Human gate',
    level: 3,
    shortcuts: true,
    busy: false,
    decision: null,
    labels: () => ({}),
    doneText: () => ({}),
    autofocus: false,
  },
)

const emit = defineEmits<{ decide: [decision: GateDecision] }>()

const uid = useId()
const root = ref<HTMLElement | null>(null)
// The choice made here, shown until the parent passes `decision` back.
const chosen = ref<GateDecision | null>(null)

watch(
  () => props.question,
  () => {
    chosen.value = null
  },
)

const current = computed(() => props.decision ?? chosen.value)
const headingTag = computed(() => `h${props.level}`)

const WORDS: Record<GateDecision, string> = {
  approve: 'Approve',
  correct: 'Correct',
  reject: 'Reject',
}
const DONE: Record<GateDecision, string> = {
  approve: 'Approved. The action leaves as shown.',
  correct: 'Sent back for a correction. Nothing has left yet.',
  reject: 'Rejected. Nothing has left, and the run stops here.',
}

const answers = computed(() =>
  (['approve', 'correct', 'reject'] as const).map((value) => ({
    value,
    text: props.labels[value] ?? WORDS[value],
    key: value[0]!.toUpperCase(),
  })),
)

const done = computed(() => (current.value ? (props.doneText[current.value] ?? DONE[current.value]) : ''))

function decide(value: GateDecision) {
  if (current.value || props.busy) return
  chosen.value = value
  emit('decide', value)
}

function onKey(event: KeyboardEvent) {
  if (!props.shortcuts || current.value || props.busy) return
  const value = gateKeyDecision(event)
  if (!value) return
  event.preventDefault()
  decide(value)
}

onMounted(() => {
  window.addEventListener('keydown', onKey)
  if (props.autofocus) root.value?.focus({ preventScroll: true })
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <section
    ref="root"
    class="s-gate"
    :class="{ 'is-decided': current }"
    :data-decision="current ?? undefined"
    :aria-labelledby="`${uid}-q`"
    :aria-busy="busy ? 'true' : undefined"
    tabindex="-1"
  >
    <component :is="headingTag" class="s-gate__head">
      <SKnot size="sm" :tight="current === 'approve'" />
      {{ heading }}
    </component>
    <p :id="`${uid}-q`" class="s-gate__question">{{ question }}</p>
    <div v-if="$slots.default" class="s-gate__summary"><slot /></div>

    <div v-if="!current" class="s-gate__answers">
      <button
        v-for="answer in answers"
        :key="answer.value"
        type="button"
        class="s-gate__answer"
        :data-answer="answer.value"
        :disabled="busy"
        :aria-keyshortcuts="shortcuts ? answer.key : undefined"
        @click="decide(answer.value)"
      >
        {{ answer.text }}
        <SKeycap v-if="shortcuts" decorative :tone="answer.value === 'approve' ? 'ink' : 'light'">{{
          answer.key
        }}</SKeycap>
      </button>
    </div>
    <p class="s-gate__done" aria-live="polite">{{ done }}</p>
  </section>
</template>

<style scoped>
.s-gate {
  padding: var(--space-5);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: inset 0 0 0 1.5px var(--color-gate);
  color: var(--color-ink);
}

.s-gate:focus-visible {
  outline-offset: 4px;
}

.s-gate.is-decided {
  animation: s-gate-settle var(--duration-long) var(--ease-out);
}

@keyframes s-gate-settle {
  from {
    transform: translateY(-6px);
  }
  to {
    transform: none;
  }
}

.s-gate__head {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  margin: 0;
  font: var(--font-weight-semibold) var(--text-sm) / 1.2 var(--font-sans);
}

.s-gate__question {
  margin: var(--space-2) 0 0;
  font: var(--font-weight-regular) clamp(var(--text-xl), 2.2vw + 1rem, var(--text-question)) / 1.05
    var(--font-serif);
  letter-spacing: -0.01em;
  text-wrap: balance;
}

.s-gate__summary {
  margin-top: var(--space-2);
  color: var(--color-ink-2);
  font-size: var(--text-sm);
}

.s-gate__answers {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  margin-top: var(--space-4);
}

.s-gate__answer {
  appearance: none;
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  min-height: 44px;
  padding: 0 var(--space-2) 0 var(--space-3);
  border: 1px solid var(--color-line-strong);
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--color-ink);
  font: var(--font-weight-medium) var(--text-sm) / 1 var(--font-sans);
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color var(--duration-short) var(--ease-out),
    border-color var(--duration-short) var(--ease-out),
    transform var(--duration-micro) var(--ease-out);
}

.s-gate__answer:hover:not(:disabled) {
  border-color: var(--color-muted);
  background: var(--color-surface-2);
}

.s-gate__answer:active:not(:disabled) {
  transform: translateY(1px);
}

.s-gate__answer:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.s-gate__answer[data-answer='approve'] {
  border-color: transparent;
  background: var(--color-ink);
  color: var(--color-on-ink);
  box-shadow: var(--shadow-ink);
}

.s-gate__answer[data-answer='approve']:hover:not(:disabled) {
  background: var(--color-ink-hover);
}

.s-gate__done:empty {
  display: none;
}

.s-gate__done {
  margin: var(--space-3) 0 0;
  font: var(--font-weight-regular) var(--text-lg) / 1.34 var(--font-serif);
}

@media (max-width: 47.5rem) {
  .s-gate__answer {
    flex: 1 1 auto;
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .s-gate.is-decided {
    animation: none;
  }

  .s-gate__answer {
    transition: none;
  }
}
</style>
