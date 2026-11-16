import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'
import { defineConfig } from 'vite'
import { selvageUi } from '../../packages/selvage/src/ui.ts'

// The docs consume Selvage the way an app would: Nuxt UI's Vite plugin with
// the Selvage `ui` config, and selvage.css after Tailwind and Nuxt UI.
// The package entry points at its sources so stories reload as they change.
export default defineConfig({
  plugins: [
    vue(),
    ui({
      ui: selvageUi,
      // Selvage is light only for now (dark is planned on the resolver).
      colorMode: false,
      router: false,
      // Icons are bundled, never fetched from the Iconify API.
      icon: { clientBundle: { scan: true } },
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^@guillaume-flambard\/selvage$/,
        replacement: fileURLToPath(new URL('../../packages/selvage/src/index.ts', import.meta.url)),
      },
    ],
  },
})
