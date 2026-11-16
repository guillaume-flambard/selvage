import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3-vite'
import ui from '@nuxt/ui/vue-plugin'
import '../src/docs.css'

setup((app) => {
  app.use(ui)
})

const preview: Preview = {
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    a11y: { test: 'error' },
    options: {
      storySort: { order: ['Foundations', 'Components', 'Nuxt UI'] },
    },
  },
}

export default preview
