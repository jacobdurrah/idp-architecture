import { test, expect } from '@playwright/test';

// TA-03 — Dock + postMessage suite for IG-03 (Stream C).
//
// These tests encode ONLY the task's Tests list plus the frozen §7 contracts
// (postMessage protocol + origin allowlist). They are authored RED: the dock
// (`guide-dock.js`) does not exist yet, so every test fails on a clean, leading
// assertion (dock present / guide contacted), never on an uncaught crash.
//
// Pinned identifiers (shared with the Builder, do not drift):
//   - dock container:   #idp-guide-dock
//   - collapse toggle:  [data-idp-dock-toggle]
//   - persisted state:  localStorage['idp-guide-dock'] === "collapsed" | "open"
//   - collapsed class:  #idp-guide-dock.is-collapsed
//   - hosted iframe:    <iframe title="Architecture guide">
// Protocol (§7.2): site→agent {type:"idp.context",tab,id,href};
//                  agent→site {type:"idp.open",tab,id}. Same tab → render(id);
//                  other tab → navigate <file>#id (metal→metal.html, golden→golden.html).
// Origin rule (§7.2 / NFR-4): parent accepts messages only from the guide origin
//   AND any http://localhost:* — everything else is ignored.
// Guide origin default on localhost is http://localhost:3000 (IDP_GUIDE_ORIGIN).

const TABS = ['index.html', 'golden.html', 'v2.html', 'agents.html', 'metal.html'];

const dockOf = (page) => page.locator('#idp-guide-dock');

// 1. Dock present on all five tabs.
test('dock is present on all five tabs', async ({ page }) => {
  for (const file of TABS) {
    await page.goto(`/${file}`);
    await expect(dockOf(page), `#idp-guide-dock should exist on ${file}`).toBeVisible();
    // The dock hosts the guide iframe.
    await expect(
      page.locator('#idp-guide-dock iframe[title="Architecture guide"]'),
      `guide iframe should be inside the dock on ${file}`
    ).toBeAttached();
  }
});

// 2. Collapse persists across a reload (state read back from localStorage).
test('collapse persists across a reload', async ({ page }) => {
  await page.goto('/metal.html');
  const dock = dockOf(page);
  await expect(dock).toBeVisible();

  const toggle = page.locator('[data-idp-dock-toggle]');
  await expect(toggle).toBeVisible();

  await toggle.click();
  await expect(dock).toHaveClass(/\bis-collapsed\b/);

  // Persisted to the pinned localStorage key with the pinned value.
  const stored = await page.evaluate(() => localStorage.getItem('idp-guide-dock'));
  expect(stored).toBe('collapsed');

  // Reloading re-reads localStorage and stays collapsed.
  await page.reload();
  await expect(dockOf(page)).toHaveClass(/\bis-collapsed\b/);
});

// 3. Dock never overlaps the tab bar (bounding boxes do not intersect).
test('dock never overlaps the tab bar', async ({ page }) => {
  await page.goto('/golden.html');
  const dock = dockOf(page);
  await expect(dock).toBeVisible();

  const dockBox = await dock.boundingBox();
  const tabsBox = await page.locator('.site-tabs').boundingBox();
  expect(dockBox, 'dock must have a bounding box').not.toBeNull();
  expect(tabsBox, 'tab bar must have a bounding box').not.toBeNull();

  const disjoint =
    dockBox.x + dockBox.width <= tabsBox.x ||
    tabsBox.x + tabsBox.width <= dockBox.x ||
    dockBox.y + dockBox.height <= tabsBox.y ||
    tabsBox.y + tabsBox.height <= dockBox.y;
  expect(disjoint, 'the dock must not intersect the .site-tabs bar').toBe(true);
});

// 4. Posters work with the guide blocked (NFR-2 posters-first, fail-silent dock).
test('posters work with the guide blocked', async ({ page }) => {
  let guideRequested = false;
  // Abort every request to the guide origin / iframe so it can never load.
  await page.route(/localhost:3000/, (route) => {
    guideRequested = true;
    return route.abort();
  });

  const pageErrors = [];
  page.on('pageerror', (err) => pageErrors.push(err));

  await page.goto('/metal.html');

  // The poster stays fully interactive even though the guide is unreachable:
  // clicking a hit box renders its panel (overview → Subsea).
  await expect(page.locator('#panel h2')).toBeVisible(); // poster bound (overview)
  await page.locator('#hits [data-id="subsea"]').click();
  await expect(page.locator('#panel h2')).toHaveText(/Subsea/);

  // The dock must have tried to load the guide (proves the dock exists and is
  // wired to the guide origin) — RED until guide-dock.js ships.
  expect(guideRequested, 'the dock should attempt to load the guide iframe').toBe(true);

  // Aborting the iframe must not surface any uncaught error (fail silent).
  expect(pageErrors, `no uncaught page errors, got: ${pageErrors.map(String)}`).toEqual([]);
});

// 5. Agent→site idp.open, SAME tab → render(id) on the current poster.
test('idp.open renders in place on the same tab (metal)', async ({ page }) => {
  await page.goto('/metal.html');
  await expect(page.locator('#panel h2')).toBeVisible(); // poster bound (overview)
  await expect(dockOf(page)).toBeVisible(); // dock present → message handler installed (RED now)

  // Posted from the page: event.origin is http://localhost:5050, which is on the
  // allowlist (any http://localhost:*), so the handler must act on it.
  await page.evaluate(() => {
    window.postMessage({ type: 'idp.open', tab: 'metal', id: 'subsea' }, '*');
  });

  await expect(page.locator('#panel h2')).toHaveText(/Subsea/);
  // Same-tab open renders in place — it must not navigate away from the metal
  // page (served as /metal.html or the clean URL /metal).
  expect(page.url()).toMatch(/\/metal(\.html)?(#|$)/);
});

// 6. Agent→site idp.open, CROSS tab → navigate to <file>#id.
test('idp.open navigates cross-tab (golden → metal.html#subsea)', async ({ page }) => {
  await page.goto('/golden.html');
  await expect(page.locator('#panel h2')).toBeVisible(); // poster bound
  await expect(dockOf(page)).toBeVisible(); // dock present → handler installed (RED now)

  await page.evaluate(() => {
    window.postMessage({ type: 'idp.open', tab: 'metal', id: 'subsea' }, '*');
  });

  // The protocol maps tab "metal" → metal.html and appends #<id>. The local
  // server (and Vercel) may serve that as the clean URL /metal, so accept both.
  await page.waitForURL(/\/metal(\.html)?#subsea$/);
});

// 7. A message from a non-allowlisted origin is ignored.
//
// We forge a genuinely foreign origin: a data: URL iframe runs with an opaque
// origin (event.origin === "null"), which is neither the guide origin nor a
// http://localhost:* origin, so a correct handler must ignore its message.
// (This is stronger than the malformed-message fallback the task allows; the
// opaque-origin technique lets us test the origin check directly in-page.)
test('a message from a non-allowlisted origin is ignored', async ({ page }) => {
  await page.goto('/metal.html');
  await expect(page.locator('#panel h2')).toBeVisible(); // poster bound (overview)
  await expect(dockOf(page)).toBeVisible(); // dock present → handler installed (RED now)

  const pageErrors = [];
  page.on('pageerror', (err) => pageErrors.push(err));

  // Inject a data: URL iframe (opaque "null" origin) that posts a well-formed
  // idp.open to the parent. If the handler honored it, the metal panel would
  // render "Subsea" and/or the URL would gain #subsea — both must NOT happen.
  await page.evaluate(() => {
    const f = document.createElement('iframe');
    f.setAttribute('data-test-foreign', '1');
    f.style.display = 'none';
    f.src =
      'data:text/html,' +
      encodeURIComponent(
        '<script>parent.postMessage({type:"idp.open",tab:"metal",id:"subsea"},"*")<\/script>'
      );
    document.body.appendChild(f);
  });

  // Give any (incorrect) handler a chance to act, then assert nothing happened.
  await page.waitForTimeout(500);
  await expect(page.locator('#panel h2')).not.toHaveText(/Subsea/);
  expect(page.url()).not.toContain('#subsea');
  expect(pageErrors, `no uncaught page errors, got: ${pageErrors.map(String)}`).toEqual([]);
});
