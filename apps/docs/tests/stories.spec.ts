import { readFileSync } from 'node:fs'
import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

interface IndexEntry {
  id: string
  title: string
  name: string
  type: 'story' | 'docs'
}

// Every story in the static build: each gets a screenshot and an axe pass.
const index = JSON.parse(
  readFileSync(new URL('../storybook-static/index.json', import.meta.url), 'utf8'),
) as { entries: Record<string, IndexEntry> }
const stories = Object.values(index.entries).filter((entry) => entry.type === 'story')

for (const story of stories) {
  test(`${story.title} / ${story.name}`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${story.id}&viewMode=story`)
    await page.locator('#storybook-root > *').first().waitFor()
    await page.evaluate(() => document.fonts.ready)

    await expect(page).toHaveScreenshot(`${story.id}.png`, { fullPage: true })

    const results = await new AxeBuilder({ page })
      .include('#storybook-root')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()
    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(serious.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([])
  })
}

test('the gate answers C from the keyboard', async ({ page }) => {
  await page.goto('/iframe.html?id=components-sgate--waiting&viewMode=story')
  const gate = page.locator('.s-gate')
  await gate.waitFor()
  await page.keyboard.press('c')
  await expect(gate).toHaveAttribute('data-decision', 'correct')
  await expect(page.locator('.s-gate__done')).toContainText('correction')
})
