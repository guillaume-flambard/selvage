import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import SGate from '../src/components/SGate.vue'

const mounted: { unmount: () => void }[] = []
afterEach(() => {
  while (mounted.length) mounted.pop()!.unmount()
  document.body.innerHTML = ''
})

function gate(props: Record<string, unknown> = {}, slots: Record<string, string> = {}) {
  const wrapper = mount(SGate, {
    props: { question: 'Open this issue?', ...props },
    slots,
    attachTo: document.body,
  })
  mounted.push(wrapper)
  return wrapper
}

function press(key: string, init: KeyboardEventInit = {}, target: EventTarget = window) {
  const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true, ...init })
  target.dispatchEvent(event)
  return event
}

describe('SGate', () => {
  it('asks its question and names itself by it', () => {
    const wrapper = gate()
    const question = wrapper.get('.s-gate__question')
    expect(question.text()).toBe('Open this issue?')
    expect(wrapper.get('section').attributes('aria-labelledby')).toBe(question.attributes('id'))
  })

  it('renders the action summary slot', () => {
    const wrapper = gate({}, { default: '<code>issue_write</code> on usine' })
    expect(wrapper.get('.s-gate__summary').html()).toContain('<code>issue_write</code>')
  })

  it('emits each decision from its button', async () => {
    for (const value of ['approve', 'correct', 'reject'] as const) {
      const wrapper = gate()
      await wrapper.get(`[data-answer="${value}"]`).trigger('click')
      expect(wrapper.emitted('decide')).toEqual([[value]])
    }
  })

  it('answers A, C and R from the keyboard', async () => {
    for (const [key, value] of [
      ['a', 'approve'],
      ['C', 'correct'],
      ['r', 'reject'],
    ] as const) {
      const wrapper = gate()
      const event = press(key)
      await wrapper.vm.$nextTick()
      expect(event.defaultPrevented).toBe(true)
      expect(wrapper.emitted('decide')).toEqual([[value]])
      wrapper.unmount()
      mounted.pop()
    }
  })

  it('ignores keys typed in a field', async () => {
    const wrapper = gate()
    for (const tag of ['input', 'textarea', 'select']) {
      const field = document.createElement(tag)
      document.body.append(field)
      press('a', {}, field)
    }
    const editable = document.createElement('div')
    editable.setAttribute('contenteditable', 'true')
    document.body.append(editable)
    press('r', {}, editable)
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('decide')).toBeUndefined()
  })

  it('ignores modified and repeated keys', async () => {
    const wrapper = gate()
    press('a', { metaKey: true })
    press('a', { ctrlKey: true })
    press('a', { altKey: true })
    press('a', { repeat: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('decide')).toBeUndefined()
  })

  it('has no shortcuts when they are off', async () => {
    const wrapper = gate({ shortcuts: false })
    press('a')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('decide')).toBeUndefined()
    expect(wrapper.find('kbd').exists()).toBe(false)
    expect(wrapper.get('[data-answer="approve"]').attributes('aria-keyshortcuts')).toBeUndefined()
  })

  it('announces shortcuts on the buttons and hides the keycaps', () => {
    const wrapper = gate()
    const approve = wrapper.get('[data-answer="approve"]')
    expect(approve.attributes('aria-keyshortcuts')).toBe('A')
    expect(approve.get('kbd').attributes('aria-hidden')).toBe('true')
  })

  it('decides only once', async () => {
    const wrapper = gate()
    await wrapper.get('[data-answer="approve"]').trigger('click')
    press('r')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('decide')).toEqual([['approve']])
    expect(wrapper.find('.s-gate__answers').exists()).toBe(false)
    expect(wrapper.get('.s-gate__done').text()).toContain('Approved')
  })

  it('is inert while busy', async () => {
    const wrapper = gate({ busy: true })
    expect(wrapper.get('[data-answer="approve"]').attributes('disabled')).toBeDefined()
    press('a')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('decide')).toBeUndefined()
    expect(wrapper.get('section').attributes('aria-busy')).toBe('true')
  })

  it('shows a decision passed by the app, in its words', () => {
    const wrapper = gate({ decision: 'reject', doneText: { reject: 'Rejeté.' } })
    expect(wrapper.get('section').attributes('data-decision')).toBe('reject')
    expect(wrapper.get('.s-gate__done').text()).toBe('Rejeté.')
  })

  it('takes translated labels', () => {
    const wrapper = gate({ labels: { approve: 'Approuver' } })
    expect(wrapper.get('[data-answer="approve"]').text()).toContain('Approuver')
    expect(wrapper.get('[data-answer="reject"]').text()).toContain('Reject')
  })

  it('stops listening once unmounted', () => {
    const wrapper = gate()
    wrapper.unmount()
    mounted.pop()
    const event = press('a')
    expect(event.defaultPrevented).toBe(false)
  })
})
