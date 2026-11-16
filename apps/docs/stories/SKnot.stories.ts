import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { SKnot } from '@memolabs-apps/selvage'

const meta = {
  title: 'Components/SKnot',
  component: SKnot,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    tone: { control: 'inline-radio', options: ['ink', 'on-ink'] },
  },
  args: { size: 'lg', tight: false, tone: 'ink', label: 'Selvage' },
  parameters: {
    docs: {
      description: {
        component:
          'The logo and the mark of the human gate: three threads tied into one black point. Give it a label when it stands alone, none when text next to it already names it.',
      },
    },
  },
} satisfies Meta<typeof SKnot>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Tight: Story = { args: { tight: true } }

export const Sizes: Story = {
  render: () => ({
    components: { SKnot },
    template: `
      <div style="display: flex; align-items: end; gap: 24px">
        <SKnot size="sm" label="Small knot" />
        <SKnot size="md" label="Medium knot" />
        <SKnot size="lg" label="Large knot" />
        <span style="display: inline-grid; place-items: center; padding: 12px; border-radius: 20px; background: var(--color-ink)">
          <SKnot size="lg" tone="on-ink" label="Knot on ink" />
        </span>
      </div>`,
  }),
}
