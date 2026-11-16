import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NuxtUiBasics from './NuxtUiBasics.vue'

const meta = {
  title: 'Nuxt UI/Themed basics',
  component: NuxtUiBasics,
  parameters: {
    docs: {
      description: {
        component:
          'Button, Input, Badge and Card are Nuxt UI 4 components, not rewritten. Selvage only gives them its tokens and shapes, through selvage.css and the selvageUi config.',
      },
    },
  },
} satisfies Meta<typeof NuxtUiBasics>

export default meta

export const Basics: StoryObj<typeof meta> = {}
