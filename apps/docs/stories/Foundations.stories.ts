import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FoundationsPage from './FoundationsPage.vue'

const meta = {
  title: 'Foundations/Overview',
  component: FoundationsPage,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FoundationsPage>

export default meta

export const Overview: StoryObj<typeof meta> = {}
