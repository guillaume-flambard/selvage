import { defineConfig, devices } from '@playwright/test'

// Runs against the static Storybook build (pnpm build:storybook), served
// locally. Local only: no hosted visual service.
const port = 6007

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list']],
  // First run writes the baselines; later runs compare against them.
  updateSnapshots: 'missing',
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: 'disabled' },
  },
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    ...devices['Desktop Chrome'],
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  },
  webServer: {
    command: `http-server storybook-static -a 127.0.0.1 -p ${port} -s -c-1`,
    url: `http://127.0.0.1:${port}/index.json`,
    reuseExistingServer: true,
  },
})
