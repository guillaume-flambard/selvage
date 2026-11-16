import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { SThread } from '@guillaume-flambard/selvage'

const meta = {
  title: 'Components/SThread',
  component: SThread,
  tags: ['autodocs'],
  argTypes: {
    thread: { control: 'select', options: ['supervisor', 'ci', 'deploy', 'config', 'synthesis', 'gate'] },
    state: { control: 'inline-radio', options: ['idle', 'running', 'done', 'failed'] },
  },
  args: { thread: 'ci', label: 'CI', state: 'running' },
  parameters: {
    docs: {
      description: {
        component:
          'One agent on its thread. The state is always written out. Do: one thread per agent, the same colour everywhere it appears. Avoid: colouring the label, or using a thread colour for anything that is not that agent.',
      },
    },
  },
  render: (args) => ({
    components: { SThread },
    setup: () => ({ args }),
    template: '<div style="max-width: 320px"><SThread v-bind="args" /></div>',
  }),
} satisfies Meta<typeof SThread>

export default meta
type Story = StoryObj<typeof meta>

export const Running: Story = {}

export const Done: Story = { args: { state: 'done' } }

export const Failed: Story = { args: { thread: 'deploy', label: 'Deployment', state: 'failed' } }

export const Run: Story = {
  name: 'A whole run',
  render: () => ({
    components: { SThread },
    template: `
      <ul style="max-width: 320px; margin: 0; padding: 0; list-style: none">
        <li><SThread thread="supervisor" label="Supervisor" state="done"><template #detail>1.2 s</template></SThread></li>
        <li><SThread thread="ci" label="CI" state="done"><template #detail>9.8 s</template></SThread></li>
        <li><SThread thread="deploy" label="Deployment" state="running" /></li>
        <li><SThread thread="config" label="Configuration" state="failed"><template #detail>6.1 s</template></SThread></li>
        <li><SThread thread="synthesis" label="Synthesis" state="idle" /></li>
        <li><SThread thread="gate" label="Human gate" state="idle" /></li>
      </ul>`,
  }),
}
