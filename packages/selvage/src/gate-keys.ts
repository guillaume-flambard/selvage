import type { GateDecision } from './types'

const KEYS: Record<string, GateDecision> = { a: 'approve', c: 'correct', r: 'reject' }

/** Where a letter is text, not a command. */
const TYPING = 'input, textarea, select, [contenteditable=""], [contenteditable="true"], [role="dialog"]'

/**
 * The decision a key press stands for at the gate, or null.
 * A, C and R decide; nothing fires with a modifier, on auto-repeat, or while
 * the person is typing in a field.
 */
export function gateKeyDecision(event: KeyboardEvent): GateDecision | null {
  if (event.defaultPrevented || event.repeat) return null
  if (event.metaKey || event.ctrlKey || event.altKey) return null
  const target = event.target
  if (target instanceof Element && target.closest(TYPING)) return null
  return KEYS[event.key.toLowerCase()] ?? null
}
