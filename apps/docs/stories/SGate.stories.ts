import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'
import { SGate } from '@guillaume-flambard/selvage'

const meta = {
  title: 'Components/SGate',
  component: SGate,
  tags: ['autodocs'],
  argTypes: {
    decision: { control: 'inline-radio', options: [null, 'approve', 'correct', 'reject'] },
  },
  args: {
    question: 'Open this issue?',
    shortcuts: true,
    busy: false,
    decision: null,
    onDecide: fn(),
  },
  parameters: {
    docs: {
      description: {
        component:
          'The human gate: one question in the human voice, what would leave, and three answers. A, C and R answer from the keyboard except while typing in a field. One gate per page has shortcuts on.',
      },
    },
  },
  render: (args) => ({
    components: { SGate },
    setup: () => ({ args }),
    template: `
      <div style="max-width: 440px">
        <SGate v-bind="args">
          <code>issue_write</code> on guillaume-flambard/usine. The arguments leave exactly as shown.
        </SGate>
      </div>`,
  }),
} satisfies Meta<typeof SGate>

export default meta
type Story = StoryObj<typeof meta>

export const Waiting: Story = {}

export const Approved: Story = { args: { decision: 'approve' } }

export const Busy: Story = { args: { busy: true } }

export const French: Story = {
  name: 'In French',
  args: {
    question: 'J’ouvre cette issue ?',
    heading: 'Porte humaine',
    labels: { approve: 'Approuver', correct: 'Corriger', reject: 'Rejeter' },
  },
}
