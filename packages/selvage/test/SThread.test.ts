import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SThread from '../src/components/SThread.vue'
import type { ThreadState } from '../src/types'

describe('SThread', () => {
  it('writes every state in words', () => {
    const words: Record<ThreadState, string> = {
      idle: 'waiting',
      running: 'running',
      done: 'done',
      failed: 'failed',
    }
    for (const [state, word] of Object.entries(words) as [ThreadState, string][]) {
      const wrapper = mount(SThread, { props: { thread: 'ci', label: 'CI', state } })
      expect(wrapper.get('.s-thread__state').text()).toBe(word)
      expect(wrapper.get('.s-thread').attributes('data-state')).toBe(state)
    }
  })

  it('wears its thread and hides the line from assistive tech', () => {
    const wrapper = mount(SThread, { props: { thread: 'deploy', label: 'Deploy' } })
    expect(wrapper.get('.s-thread').attributes('data-thread')).toBe('deploy')
    expect(wrapper.get('.s-thread__line').attributes('aria-hidden')).toBe('true')
    expect(wrapper.get('.s-thread__label').text()).toBe('Deploy')
  })

  it('defaults to idle and takes translated state words', () => {
    const wrapper = mount(SThread, {
      props: { thread: 'config', label: 'Configuration', stateLabel: 'en attente' },
    })
    expect(wrapper.get('.s-thread').attributes('data-state')).toBe('idle')
    expect(wrapper.get('.s-thread__state').text()).toBe('en attente')
  })

  it('renders a detail only when given', () => {
    expect(mount(SThread, { props: { thread: 'ci', label: 'CI' } }).find('.s-thread__detail').exists()).toBe(false)
    const wrapper = mount(SThread, {
      props: { thread: 'ci', label: 'CI', state: 'done' },
      slots: { detail: '9.8 s' },
    })
    expect(wrapper.get('.s-thread__detail').text()).toBe('9.8 s')
  })
})
