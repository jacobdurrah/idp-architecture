import { test, expect } from '@playwright/test';

// Harness smoke test (IG-13). Proves the browser runner + local webserver work
// against the real posters. TA-02 / TA-03 / TA-05 add hash-open, dock, and the
// end-to-end question flow.
test('smoke: golden path renders the shared tab bar', async ({ page }) => {
  await page.goto('/golden.html');
  await expect(page.locator('.site-tabs')).toBeVisible();
});

test('smoke: the core tabs are reachable from the tab bar', async ({ page }) => {
  await page.goto('/golden.html');
  const tabs = page.locator('.site-tabs a');
  // Resilient to new tabs landing (living site): at least the original five,
  // and the stable Golden path + Metal links are always present.
  expect(await tabs.count()).toBeGreaterThanOrEqual(5);
  await expect(page.locator('.site-tabs a[href*="golden"]')).toHaveCount(1);
  await expect(page.locator('.site-tabs a[href*="metal"]')).toHaveCount(1);
});
