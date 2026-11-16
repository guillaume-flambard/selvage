/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// Library mode: one ES module, Vue left to the app, the components' styles in
// dist/components.css. The tokens are built next to it by Terrazzo.
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      fileName: 'selvage',
      cssFileName: 'components',
    },
    rollupOptions: {
      external: ['vue'],
    },
    sourcemap: true,
  },
  test: {
    environment: 'happy-dom',
    include: ['test/**/*.test.ts'],
  },
})
