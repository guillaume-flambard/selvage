// DESIGN.md's front matter is generated from the DTCG tokens, so it can never
// become a second authority. The prose below the front matter is written by
// hand and kept as is.
//
//   node scripts/design-md.mjs --write   rewrite the front matter
//   node scripts/design-md.mjs --check   fail if it drifted from the tokens
//
// Format: Google's DESIGN.md, spec version "alpha" (@google/design.md 0.4.0).
// https://github.com/google-labs-code/design.md/blob/main/docs/spec.md
import { readFileSync, writeFileSync } from 'node:fs'

const root = new URL('../', import.meta.url)
const read = (path) => JSON.parse(readFileSync(new URL(path, root), 'utf8'))
const tokens = { ...read('tokens/primitives.tokens.json'), ...read('tokens/semantic.tokens.json') }

function at(path) {
  let node = tokens
  for (const part of path.split('.')) node = node?.[part]
  if (!node || !('$value' in node)) throw new Error(`no token at ${path}`)
  return node.$value
}

function resolve(path) {
  const value = at(path)
  return typeof value === 'string' && value.startsWith('{') ? resolve(value.slice(1, -1)) : value
}

function round(n, digits) {
  return Number(n.toFixed(digits)).toString()
}

function color(path) {
  const { components: [l, c, h] } = resolve(path)
  return `oklch(${round(l * 100, 1)}% ${round(c, 3)} ${round(h, 0)})`
}

const dim = (path) => {
  const { value, unit } = resolve(path)
  return `${value}${unit}`
}

const family = (path) => resolve(path)[0]

const COLORS = {
  primary: 'color.ink',
  ground: 'color.ground',
  surface: 'color.surface',
  'surface-2': 'color.surface-2',
  soft: 'color.soft',
  line: 'color.line',
  'line-strong': 'color.line-strong',
  ink: 'color.ink',
  'ink-hover': 'color.ink-hover',
  'ink-2': 'color.ink-2',
  muted: 'color.muted',
  'on-ink': 'color.on-ink',
  gate: 'color.gate',
  error: 'color.error',
  success: 'color.success',
  'thread-supervisor': 'color.thread.supervisor',
  'thread-ci': 'color.thread.ci',
  'thread-ci-text': 'color.thread.ci-text',
  'thread-deploy': 'color.thread.deploy',
  'thread-deploy-text': 'color.thread.deploy-text',
  'thread-config': 'color.thread.config',
  'thread-config-text': 'color.thread.config-text',
  'thread-synthesis': 'color.thread.synthesis',
  'thread-synthesis-text': 'color.thread.synthesis-text',
}

const weight = (name) => resolve(`font-weight.${name}`)

const TYPOGRAPHY = {
  body: { fontFamily: family('font.sans'), fontSize: dim('text.md'), fontWeight: weight('regular'), lineHeight: 1.55 },
  label: { fontFamily: family('font.sans'), fontSize: dim('text.sm'), fontWeight: weight('medium'), lineHeight: 1.2 },
  heading: { fontFamily: family('font.sans'), fontSize: dim('text.2xl'), fontWeight: weight('semibold'), lineHeight: 1.1 },
  question: { fontFamily: family('font.serif'), fontSize: dim('text.question'), fontWeight: weight('regular'), lineHeight: 1.05 },
  data: { fontFamily: family('font.mono'), fontSize: '12px', fontWeight: weight('regular'), lineHeight: 1.5 },
}

const ROUNDED = Object.fromEntries(['key', 'in', 'card', 'pill'].map((name) => [name, dim(`radius.${name}`)]))

const SPACING = Object.fromEntries(
  Object.keys(tokens.space)
    .filter((key) => !key.startsWith('$'))
    .sort((a, b) => resolve(`space.${a}`).value - resolve(`space.${b}`).value)
    .map((key) => [key, dim(`space.${key}`)]),
)

const COMPONENTS = {
  'button-primary': { backgroundColor: '{colors.primary}', textColor: '{colors.on-ink}', typography: '{typography.label}', rounded: '{rounded.pill}', height: '44px' },
  'button-line': { backgroundColor: '{colors.surface}', textColor: '{colors.ink}', typography: '{typography.label}', rounded: '{rounded.pill}', height: '44px' },
  gate: { backgroundColor: '{colors.surface}', textColor: '{colors.ink}', typography: '{typography.question}', rounded: '{rounded.card}', padding: dim('space.5') },
  keycap: { backgroundColor: '{colors.surface}', textColor: '{colors.ink-2}', typography: '{typography.data}', rounded: '{rounded.key}', size: '22px' },
  card: { backgroundColor: '{colors.surface}', textColor: '{colors.ink}', rounded: '{rounded.card}', padding: dim('space.6') },
  page: { backgroundColor: '{colors.ground}', textColor: '{colors.ink}', typography: '{typography.body}' },
  'button-primary-hover': { backgroundColor: '{colors.ink-hover}', textColor: '{colors.on-ink}' },
  field: { backgroundColor: '{colors.surface-2}', textColor: '{colors.ink}', rounded: '{rounded.in}', height: '44px' },
  caption: { textColor: '{colors.muted}', typography: '{typography.label}' },
  chip: { backgroundColor: '{colors.soft}', textColor: '{colors.ink-2}', rounded: '{rounded.key}' },
  rule: { backgroundColor: '{colors.line}', height: '1px' },
  'rule-strong': { backgroundColor: '{colors.line-strong}', height: '1px' },
  'gate-edge': { backgroundColor: '{colors.gate}', width: '1.5px' },
  'status-error': { textColor: '{colors.error}', typography: '{typography.label}' },
  'status-success': { textColor: '{colors.success}', typography: '{typography.label}' },
  // Each thread twice: its 2px line, and its words on a surface, so the lint
  // checks the text tone's contrast where it is actually read.
  ...Object.fromEntries(
    [['supervisor', 'ink-2'], ['ci', 'thread-ci-text'], ['deploy', 'thread-deploy-text'], ['config', 'thread-config-text'], ['synthesis', 'thread-synthesis-text']].flatMap(([name, text]) => [
      [`thread-${name}-line`, { backgroundColor: `{colors.thread-${name}}`, width: '2px' }],
      [`thread-${name}-label`, { backgroundColor: '{colors.surface}', textColor: `{colors.${text}}`, typography: '{typography.label}' }],
    ]),
  ),
}

const scalar = (v) => (typeof v === 'number' ? String(v) : /^[\w.%-]+$/.test(v) && !/^\d/.test(v) ? v : JSON.stringify(v))
const key = (k) => (/^[a-z][\w-]*$/i.test(k) ? k : JSON.stringify(k))

function block(name, map, nested = false) {
  const lines = [`${name}:`]
  for (const [k, v] of Object.entries(map)) {
    if (nested) {
      lines.push(`  ${key(k)}:`)
      for (const [k2, v2] of Object.entries(v)) lines.push(`    ${key(k2)}: ${scalar(v2)}`)
    } else {
      lines.push(`  ${key(k)}: ${scalar(v)}`)
    }
  }
  return lines.join('\n')
}

const frontMatter = [
  '---',
  '# Generated from tokens/*.tokens.json by scripts/design-md.mjs. Do not edit by hand.',
  'version: alpha',
  'name: Selvage',
  'description: The design system of the Le fil identity. Every agent has its own coloured thread, every thread ties into one black knot, the person at the gate.',
  block('colors', Object.fromEntries(Object.entries(COLORS).map(([k, p]) => [k, color(p)]))),
  block('typography', TYPOGRAPHY, true),
  block('rounded', ROUNDED),
  block('spacing', SPACING),
  block('components', COMPONENTS, true),
  '---',
].join('\n')

const file = new URL('DESIGN.md', root)
const current = readFileSync(file, 'utf8')
const match = current.match(/^---\n(?:[\s\S]*?\n)?---\n/)
if (!match) throw new Error('DESIGN.md has no front matter to replace')
const next = `${frontMatter}\n${current.slice(match[0].length)}`

if (process.argv.includes('--write')) {
  writeFileSync(file, next)
  console.log('DESIGN.md front matter written from the tokens')
} else if (current !== next) {
  console.error('DESIGN.md drifted from the tokens. Run: pnpm design:sync')
  process.exit(1)
} else {
  console.log('DESIGN.md matches the tokens')
}
