---
# Generated from tokens/*.tokens.json by scripts/design-md.mjs. Do not edit by hand.
version: alpha
name: Selvage
description: The design system of the Le fil identity. Every agent has its own coloured thread, every thread ties into one black knot, the person at the gate.
colors:
  primary: "oklch(20.9% 0.004 264)"
  ground: "oklch(96.1% 0.003 106)"
  surface: "oklch(100% 0 0)"
  surface-2: "oklch(97.6% 0.003 106)"
  soft: "oklch(93.9% 0.004 106)"
  line: "oklch(92.4% 0.005 107)"
  line-strong: "oklch(88.1% 0.007 107)"
  ink: "oklch(20.9% 0.004 264)"
  ink-hover: "oklch(29.3% 0.008 264)"
  ink-2: "oklch(43.1% 0.011 264)"
  muted: "oklch(51% 0.012 267)"
  on-ink: "oklch(97.6% 0.003 106)"
  gate: "oklch(20.9% 0.004 264)"
  error: "oklch(52% 0.19 27)"
  success: "oklch(50% 0.12 150)"
  thread-supervisor: "oklch(69.5% 0.009 265)"
  thread-ci: "oklch(63% 0.14 246)"
  thread-ci-text: "oklch(51.1% 0.122 248)"
  thread-deploy: "oklch(61.9% 0.216 327)"
  thread-deploy-text: "oklch(51.4% 0.189 328)"
  thread-config: "oklch(62.1% 0.141 153)"
  thread-config-text: "oklch(49.2% 0.114 153)"
  thread-synthesis: "oklch(69.9% 0.146 68)"
  thread-synthesis-text: "oklch(50.1% 0.108 67)"
typography:
  body:
    fontFamily: Onest
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: Onest
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.2
  heading:
    fontFamily: Onest
    fontSize: "1.953rem"
    fontWeight: 600
    lineHeight: 1.1
  question:
    fontFamily: "Instrument Serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: 1.05
  data:
    fontFamily: "JetBrains Mono"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  key: "8px"
  in: "12px"
  card: "24px"
  pill: "999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "7": "28px"
  "8": "32px"
  "10": "40px"
  "12": "48px"
  "16": "64px"
  "24": "96px"
  "36": "144px"
  half: "2px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "44px"
  button-line:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "44px"
  gate:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.question}"
    rounded: "{rounded.card}"
    padding: "20px"
  keycap:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-2}"
    typography: "{typography.data}"
    rounded: "{rounded.key}"
    size: "22px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "24px"
  page:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "{colors.ink-hover}"
    textColor: "{colors.on-ink}"
  field:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.in}"
    height: "44px"
  caption:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  chip:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.key}"
  rule:
    backgroundColor: "{colors.line}"
    height: "1px"
  rule-strong:
    backgroundColor: "{colors.line-strong}"
    height: "1px"
  gate-edge:
    backgroundColor: "{colors.gate}"
    width: "1.5px"
  status-error:
    textColor: "{colors.error}"
    typography: "{typography.label}"
  status-success:
    textColor: "{colors.success}"
    typography: "{typography.label}"
  thread-supervisor-line:
    backgroundColor: "{colors.thread-supervisor}"
    width: "2px"
  thread-supervisor-label:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
  thread-ci-line:
    backgroundColor: "{colors.thread-ci}"
    width: "2px"
  thread-ci-label:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.thread-ci-text}"
    typography: "{typography.label}"
  thread-deploy-line:
    backgroundColor: "{colors.thread-deploy}"
    width: "2px"
  thread-deploy-label:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.thread-deploy-text}"
    typography: "{typography.label}"
  thread-config-line:
    backgroundColor: "{colors.thread-config}"
    width: "2px"
  thread-config-label:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.thread-config-text}"
    typography: "{typography.label}"
  thread-synthesis-line:
    backgroundColor: "{colors.thread-synthesis}"
    width: "2px"
  thread-synthesis-label:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.thread-synthesis-text}"
    typography: "{typography.label}"
---

# Selvage

## Overview

Selvage draws the Le fil identity, first built for Usine, an open workshop for AI agents. The picture is simple: every agent has its own coloured thread, and every thread ties into one black knot. The knot is the human gate, where a person decides before anything leaves the system.

The look is quiet on purpose. Warm-grey paper, white surfaces, black ink, hairline rules, and colour only where an agent is speaking. One action colour, the ink. The interface is built on Nuxt UI 4, themed rather than rewritten; Selvage only adds what Nuxt UI has no word for: the thread, the knot, the gate and the keycap.

The front matter above is generated from `tokens/*.tokens.json` (DTCG 2025.10). The tokens are the source of truth; this file describes them for agents and never overrides them.

## Colors

- **Paper and surfaces.** `ground` is the page. `surface` holds cards and panels. `surface-2` is a well inside a surface (code, JSON, inputs). `soft` is for keycaps and chips.
- **Ink.** `ink` is the text colour and the one filled action. `ink-2` and `muted` are secondary and tertiary text, both at 4.5:1 or better on `ground` and `surface`. `on-ink` is text on an ink control.
- **Rules.** `line` for hairlines, `line-strong` for outlined controls. A field's edge uses `muted`, so a control's boundary reaches 3:1.
- **Threads.** One colour per agent: supervisor grey, CI sky, deployment magenta, configuration green, synthesis amber. Each has a stroke, a `-text` tone for words (4.5:1 or better on a surface) and a tint. The gate is the ink.
- **Signals.** `error` and `success` mean exactly that, and nothing decorative.

## Typography

Three faces, three roles, no exceptions.

- **Onest** for everything a person reads by default: interface, agent names, labels, body. Weights 400, 500 and 600.
- **Instrument Serif** speaks only for the human: the gate's question, a note left at the gate, the line that confirms a decision. An agent never writes in serif.
- **JetBrains Mono** is for data only: tool names, arguments, durations, commit ids. Never a heading, never a label.

Labels are sentence case. Never tracked capitals.

## Layout

A 4px spacing scale, identical to Tailwind's default, so `p-4` already means 16px. Cards sit on the ground with generous padding (24px); components inside a card use 8 to 16px gaps. Controls are at least 44px tall.

## Elevation & Depth

Depth is soft and rare. `shadow.1` for a resting card, `shadow.2` for a raised card or a working agent, `shadow.3` for an overlay, `shadow.ink` under the ink button and the gate node. No borders and shadows stacked on the same edge.

## Shapes

`radius.key` (8px) for keycaps and chips, `radius.in` (12px) for inputs and wells, `radius.card` (24px) for cards, panels and the gate, `radius.pill` for buttons. The gate is a card drawn with a 1.5px ink edge.

## Components

- **SThread.** One agent on its thread: a 2px vertical line in the agent's colour, its name, and its state in words (waiting, running, done, failed). While running, a dash flows down the line; under reduced motion it stands still and the word stays.
- **SKnot.** The logo and the gate's mark: three threads tied into one black point. It tightens when a person approves. Decorative unless given a label.
- **SGate.** The human decision. A small heading with the knot, one question in serif, a summary of what would leave, and three answers: Approve (ink), Correct and Reject (line). A, C and R answer from the keyboard, never while the person types in a field.
- **SKeycap.** A key named in mono. Inside a button it is decorative, and the button carries `aria-keyshortcuts`.
- **Nuxt UI.** Button, Input, Textarea, Badge and Card keep their Nuxt UI behaviour and take Selvage's shapes from `selvageUi`. Primary is the ink.

## Do's and Don'ts

- Do read semantic tokens (`--color-ink`, `bg-surface`, `rounded-(--radius-card)`); don't use a raw value or a palette primitive.
- Do keep the ink as the only filled action; don't add a second accent colour.
- Do give each agent one thread colour everywhere it appears; don't use a thread colour for anything else.
- Do write every state in words; don't let colour be the only signal.
- Do use serif only for the human and mono only for data; don't load any other face.
- Do give every control a `:focus-visible` style and a reduced-motion fallback.
- Don't use tracked capitals, middle-dot meta strings or decorative status dots.
