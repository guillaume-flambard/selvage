// Full-page captures of the stories at 1440 px, for a look by eye.
// Usage: node scripts/capture.mjs <out-dir> [base-url]
// Expects the static build to be served (pnpm build:storybook, then
// http-server storybook-static -p 6007).
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from '@playwright/test'

const [outDir, base = 'http://127.0.0.1:6007'] = process.argv.slice(2)
if (!outDir) {
  console.error('usage: node scripts/capture.mjs <out-dir> [base-url]')
  process.exit(1)
}
mkdirSync(outDir, { recursive: true })

const ids = [
  'foundations-overview--overview',
  'components-sthread--run',
  'components-sknot--sizes',
  'components-sgate--waiting',
  'components-skeycap--in-text',
  'nuxt-ui-themed-basics--basics',
]

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
for (const id of ids) {
  await page.goto(`${base}/iframe.html?id=${id}&viewMode=story`)
  await page.locator('#storybook-root > *').first().waitFor()
  await page.evaluate(() => document.fonts.ready)
  const file = join(outDir, `${id}.png`)
  await page.screenshot({ path: file, fullPage: true })
  console.log(file)
}
await browser.close()
