<script setup lang="ts">
/**
 * The foundations page, read from the tokens themselves: every swatch, size
 * and duration below is a semantic token, shown by its name.
 */
import { SKnot, SThread } from '@guillaume-flambard/selvage'
import semantic from '../../../tokens/semantic.tokens.json'

interface Token {
  $value: unknown
  $description?: string
}

function entries(group: Record<string, unknown>): [string, Token][] {
  return Object.entries(group).filter(
    (entry): entry is [string, Token] => !entry[0].startsWith('$') && typeof entry[1] === 'object' && entry[1] !== null && '$value' in entry[1],
  )
}

function px(token: Token): string {
  const value = token.$value as { value: number; unit: string }
  return `${value.value}${value.unit}`
}

const colors = entries(semantic.color as Record<string, unknown>).filter(([name]) => name !== 'focus')
const threads = ['supervisor', 'ci', 'deploy', 'config', 'synthesis'].map((name) => ({
  name,
  description: {
    supervisor: 'The supervisor, neutral grey.',
    ci: 'CI, sky.',
    deploy: 'Deployment, magenta.',
    config: 'Configuration, green.',
    synthesis: 'Synthesis, amber.',
  }[name],
}))
const radii = entries(semantic.radius as Record<string, unknown>)
// Sorted by size: JavaScript lists numeric keys first, so 'half' would come last.
const spaces = entries(semantic.space as Record<string, unknown>).sort(
  (a, b) => (a[1].$value as { value: number }).value - (b[1].$value as { value: number }).value,
)
const durations = entries(semantic.duration as Record<string, unknown>)
</script>

<template>
  <main class="page">
    <header class="intro">
      <SKnot size="lg" label="Selvage" />
      <div>
        <h1>Foundations</h1>
        <p class="lead">
          Every agent has its own coloured thread, and every thread ties into one black knot: the
          person at the gate. These are the tokens that draw it. Code reads the semantic names
          shown here, never a raw value.
        </p>
      </div>
    </header>

    <section aria-labelledby="colours">
      <h2 id="colours">Colour</h2>
      <p class="note">
        One action colour, the ink. Everything else is paper, rules and text tones, plus one colour
        per agent thread.
      </p>
      <ul class="swatches">
        <li v-for="[name, token] in colors" :key="name">
          <span class="chip" :style="{ background: `var(--color-${name})` }" />
          <code>color.{{ name }}</code>
          <span class="desc">{{ token.$description }}</span>
        </li>
      </ul>
    </section>

    <section aria-labelledby="threads">
      <h2 id="threads">Threads</h2>
      <p class="note">
        Each thread has a stroke, a text tone at 4.5:1 or better on a surface, and a soft tint. The
        gate is the ink.
      </p>
      <ul class="threads">
        <li v-for="thread in threads" :key="thread.name" :data-thread="thread.name">
          <span class="stroke" />
          <span class="tint">
            <b>{{ thread.description }}</b>
            <code>color.thread.{{ thread.name }}</code>
          </span>
        </li>
      </ul>
    </section>

    <section aria-labelledby="type">
      <h2 id="type">Type</h2>
      <div class="faces">
        <div>
          <p class="face sans">Onest, for everything</p>
          <p class="desc">The interface, the agents, the labels. Weights 400, 500 and 600.</p>
        </div>
        <div>
          <p class="face serif">Instrument Serif, for the human</p>
          <p class="desc">Only the person speaks in serif: the gate's question, a note left at the gate.</p>
        </div>
        <div>
          <p class="face mono">JetBrains Mono, for data</p>
          <p class="desc">Tool names, arguments, durations and ids. Never a heading, never a label.</p>
        </div>
      </div>
    </section>

    <section aria-labelledby="space">
      <h2 id="space">Space and shape</h2>
      <p class="note">A 4px scale, the same as Tailwind's, so p-4 already means 16px.</p>
      <ul class="spaces">
        <li v-for="[name, token] in spaces" :key="name">
          <code>space.{{ name }}</code>
          <span class="bar" :style="{ width: `var(--space-${name})` }" />
          <span class="desc">{{ px(token) }}</span>
        </li>
      </ul>
      <ul class="radii">
        <li v-for="[name, token] in radii" :key="name">
          <span class="shape" :style="{ borderRadius: `var(--radius-${name})` }" />
          <code>radius.{{ name }}</code>
          <span class="desc">{{ px(token) }}, {{ token.$description }}</span>
        </li>
      </ul>
    </section>

    <section aria-labelledby="motion">
      <h2 id="motion">Motion</h2>
      <p class="note">
        Two curves, ease-out for what arrives and ease-in-out for what crosses. Under reduced motion
        nothing loops: the running thread keeps its word and loses its dash.
      </p>
      <ul class="durations">
        <li v-for="[name, token] in durations" :key="name">
          <code>duration.{{ name }}</code>
          <span class="desc">{{ (token.$value as { value: number }).value }} ms, {{ token.$description }}</span>
        </li>
      </ul>
      <div class="demo">
        <SThread thread="ci" label="CI" state="running" />
        <SThread thread="deploy" label="Deployment" state="done" />
        <SThread thread="config" label="Configuration" state="failed" />
      </div>
    </section>

    <section aria-labelledby="voice">
      <h2 id="voice">Voice rules</h2>
      <ul class="rules">
        <li>Serif speaks only for the human. An agent never writes in serif.</li>
        <li>Mono is for data only: what a machine would copy, never what a person reads first.</li>
        <li>Labels are sentence case, never tracked capitals.</li>
        <li>A state is always written in words. Colour is never the only signal.</li>
        <li>The ink is the only filled action. There is no second accent.</li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.page {
  display: grid;
  gap: var(--space-12);
  max-width: 1120px;
  margin: 0 auto;
  padding: var(--space-10) var(--space-6) var(--space-16);
}

.intro {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--space-5);
  align-items: start;
}

h1 {
  margin: 0;
  font: var(--font-weight-semibold) var(--text-2xl) / 1.1 var(--font-sans);
  letter-spacing: -0.02em;
}

h2 {
  margin: 0 0 var(--space-2);
  font: var(--font-weight-semibold) var(--text-lg) / 1.2 var(--font-sans);
}

.lead {
  max-width: 62ch;
  margin: var(--space-3) 0 0;
  color: var(--color-ink-2);
  font-size: var(--text-md);
}

.note {
  max-width: 62ch;
  margin: 0 0 var(--space-5);
  color: var(--color-ink-2);
  font-size: var(--text-sm);
}

section {
  padding: var(--space-6);
  border-radius: var(--radius-card);
  background: var(--color-surface);
  box-shadow: var(--shadow-1);
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

code {
  color: var(--color-ink);
  font-size: 12px;
}

.desc {
  color: var(--color-muted);
  font-size: var(--text-xs);
}

.swatches {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-4) var(--space-6);
}

.swatches li {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  grid-template-rows: auto auto;
  column-gap: var(--space-3);
  align-items: center;
}

.chip {
  grid-row: span 2;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-in);
  box-shadow: inset 0 0 0 1px var(--color-line);
}

.threads {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-4);
}

.threads li {
  display: grid;
  grid-template-columns: 2px minmax(0, 1fr);
  gap: var(--space-3);
}

.stroke {
  border-radius: 2px;
  background: var(--thread);
}

.tint {
  display: grid;
  gap: var(--space-1);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-in);
  background: var(--thread-tint);
}

.tint b {
  color: var(--thread-text);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-semibold);
}

.faces {
  display: grid;
  gap: var(--space-5);
}

.face {
  margin: 0;
  color: var(--color-ink);
}

.sans {
  font: var(--font-weight-medium) var(--text-xl) / 1.2 var(--font-sans);
}

.serif {
  font: var(--font-weight-regular) var(--text-2xl) / 1.1 var(--font-serif);
}

.mono {
  font: var(--font-weight-regular) var(--text-lg) / 1.3 var(--font-mono);
}

.spaces {
  display: grid;
  gap: var(--space-2);
  margin-bottom: var(--space-8);
}

.spaces li {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr) 64px;
  gap: var(--space-3);
  align-items: center;
}

.bar {
  height: 8px;
  border-radius: 2px;
  background: var(--color-ink);
}

.radii {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--space-4);
}

.radii li {
  display: grid;
  gap: var(--space-2);
}

.shape {
  width: 96px;
  height: 56px;
  background: var(--color-soft);
  box-shadow: inset 0 0 0 1px var(--color-line-strong);
}

.durations {
  display: grid;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
}

.durations li {
  display: grid;
  grid-template-columns: 140px minmax(0, 1fr);
  gap: var(--space-3);
}

.demo {
  display: grid;
  max-width: 360px;
}

.rules {
  display: grid;
  gap: var(--space-2);
  max-width: 70ch;
  padding-left: var(--space-5);
  list-style: disc;
  color: var(--color-ink);
  font-size: var(--text-sm);
}

@media (max-width: 40rem) {
  .intro {
    grid-template-columns: minmax(0, 1fr);
  }

  .spaces li {
    grid-template-columns: 80px minmax(0, 1fr) 48px;
  }
}
</style>
