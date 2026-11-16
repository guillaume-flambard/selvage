import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { SKeycap } from '@memolabs-apps/selvage'

const meta = {
  title: 'Components/SKeycap',
  component: SKeycap,
  tags: ['autodocs'],
  argTypes: { tone: { control: 'inline-radio', options: ['light', 'ink'] } },
  args: { tone: 'light', decorative: false },
  parameters: {
    docs: {
      description: {
        component:
          'A key, named in mono. Inside a button, mark it decorative and put aria-keyshortcuts on the button instead.',
      },
    },
  },
  render: (args) => ({
    components: { SKeycap },
    setup: () => ({ args }),
    template: '<SKeycap v-bind="args">A</SKeycap>',
  }),
} satisfies Meta<typeof SKeycap>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {}

export const InText: Story = {
  name: 'In a sentence',
  render: () => ({
    components: { SKeycap },
    template: '<p style="margin: 0">Press <SKeycap>A</SKeycap> to approve, or <SKeycap>⌘</SKeycap><SKeycap>K</SKeycap> to fork.</p>',
  }),
}

export const OnInk: Story = {
  name: 'On ink',
  render: () => ({
    components: { SKeycap },
    template:
      '<span style="display: inline-flex; gap: 8px; align-items: center; padding: 10px 10px 10px 16px; border-radius: 999px; background: var(--color-ink); color: var(--color-on-ink)">Approve <SKeycap tone="ink" decorative>A</SKeycap></span>',
  }),
}
