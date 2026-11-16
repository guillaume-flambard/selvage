import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.ts'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-mcp'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: { plugin: 'vue-component-meta', tsconfig: 'tsconfig.json' },
    },
  },
  // The component manifest, served to agents by the MCP addon at /mcp on the
  // dev server. Vue needs both flags (experimental in Storybook 10.6).
  // https://storybook.js.org/docs/ai/mcp/overview
  features: {
    componentsManifest: true,
    experimentalDocgenServer: true,
  },
  core: {
    disableTelemetry: true,
  },
}

export default config
