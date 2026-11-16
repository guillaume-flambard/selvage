import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SKeycap from '../src/components/SKeycap.vue'
import SKnot from '../src/components/SKnot.vue'

describe('SKnot', () => {
  it('is decorative without a label', () => {
    const svg = mount(SKnot).get('svg')
    expect(svg.attributes('aria-hidden')).toBe('true')
    expect(svg.attributes('role')).toBeUndefined()
  })

  it('is an image with a name when labelled', () => {
    const svg = mount(SKnot, { props: { label: 'Selvage' } }).get('svg')
    expect(svg.attributes('role')).toBe('img')
    expect(svg.attributes('aria-label')).toBe('Selvage')
    expect(svg.attributes('aria-hidden')).toBeUndefined()
  })

  it('maps sizes to pixels', () => {
    expect(mount(SKnot, { props: { size: 'sm' } }).get('svg').attributes('width')).toBe('18')
    expect(mount(SKnot, { props: { size: 'lg' } }).get('svg').attributes('height')).toBe('44')
    expect(mount(SKnot, { props: { size: 64 } }).get('svg').attributes('width')).toBe('64')
  })

  it('tightens on demand', () => {
    expect(mount(SKnot, { props: { tight: true } }).get('svg').classes()).toContain('is-tight')
  })
})

describe('SKeycap', () => {
  it('is a kbd, hidden only when decorative', () => {
    const plain = mount(SKeycap, { slots: { default: 'A' } }).get('kbd')
    expect(plain.text()).toBe('A')
    expect(plain.attributes('aria-hidden')).toBeUndefined()
    const decorative = mount(SKeycap, { props: { decorative: true, tone: 'ink' }, slots: { default: 'A' } }).get('kbd')
    expect(decorative.attributes('aria-hidden')).toBe('true')
    expect(decorative.attributes('data-tone')).toBe('ink')
  })
})
