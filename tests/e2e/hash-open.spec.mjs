import { test, expect } from '@playwright/test';

// TA-02 — Hash-open + `idp:render` seam (mirrors IG-02's Tests list).
//
// These tests encode ONLY IG-02's Tests list plus the frozen §7 contracts —
// never the implementation. They are RED until Stream B (IG-02) wires
// hash-open + the seam into `metal-ui.js` (and the sibling `*-ui.js` files).
//
// Frozen identifiers shared with the builder (§7.3, IG-02):
//   - seam event: `idp:render`, a CustomEvent dispatched on `window`,
//     `detail: { id, tab }`.
//   - tab constant for the Metal poster: 'metal' (siblings: golden/v2/agents).
//   - hash is the RAW data-id, no prefix (e.g. `#subsea`).
//   - existing DOM contract: `render(id)`, `#hits [data-id]`, `#panel-body`.
//
// Metal DATA key `subsea` has `n: "Subsea cable"` (verified in m-data-1.js), and
// is a clickable `#hits [data-id="subsea"]` box (m-svg-8.txt). `overview.n` is
// "How to read this map (metal)" (m-data-0.js) — the no-selection state.

const METAL = '/metal.html';

// ---------------------------------------------------------------------------
// 1. Deep link: opening `metal.html#subsea` renders the Subsea panel, no click.
// ---------------------------------------------------------------------------
test('deep link #subsea opens the Subsea panel with no click', async ({ page }) => {
  await page.goto(`${METAL}#subsea`);
  // Panel title reflects the `subsea` record's `n` ("Subsea cable").
  await expect(page.locator('#panel-body h2')).toContainText('Subsea');
});

// ---------------------------------------------------------------------------
// 2. Clicking a box updates the address-bar hash to that box's id.
// ---------------------------------------------------------------------------
test('clicking a box reflects that box id into the address-bar hash', async ({ page }) => {
  await page.goto(METAL);
  // Wait for bind()/overview render so the hit layer is interactive.
  await expect(page.locator('#panel-body h2')).toBeVisible();

  // `subsea` is the smallest hit box at its own center, so the app's
  // smallestHit() resolves a center click to it. force:true skips Playwright's
  // actionability check (a larger, later-drawn box overlaps it) while still
  // clicking real coordinates at the box center.
  const box = page.locator('#hits [data-id="subsea"]');
  const id = await box.getAttribute('data-id');
  await box.click({ force: true });

  // The hash is the raw data-id, no prefix.
  await expect(page.locator('#panel-body h2')).toContainText('Subsea');
  expect(new URL(page.url()).hash).toBe(`#${id}`);
  expect(page.url().endsWith(`#${id}`)).toBe(true);
});

// ---------------------------------------------------------------------------
// 3. Back button is not spammed: clicks use replaceState, so history length
//    does not grow by one per click.
// ---------------------------------------------------------------------------
test('box clicks use replaceState — history length does not grow per click', async ({ page }) => {
  await page.goto(METAL);
  await expect(page.locator('#panel-body h2')).toBeVisible();

  // Each id is the smallest hit box at its own center, so a center click
  // resolves to it (see the click test). force:true skips actionability.
  const ids = ['dc', 'edge-pop', 'hotel', 'subsea'];
  const before = await page.evaluate(() => history.length);

  for (const id of ids) {
    await page.locator(`#hits [data-id="${id}"]`).click({ force: true });
  }

  const after = await page.evaluate(() => history.length);
  const last = ids[ids.length - 1];

  // Wiring: the last click is reflected in the hash (proves render → hash sync).
  expect(new URL(page.url()).hash).toBe(`#${last}`);
  // No history spam: N clicks did NOT add N history entries (replaceState, §IG-02).
  expect(after - before).toBeLessThan(ids.length);
});

// ---------------------------------------------------------------------------
// 4. A bad hash opens nothing and logs no page error.
// ---------------------------------------------------------------------------
test('a made-up hash opens nothing and throws no page error', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (err) => errors.push(err));

  await page.goto(`${METAL}#not-real`);
  await expect(page.locator('#panel-body h2')).toBeVisible();

  // No panel selection: the overview title is shown, not a box, and the
  // selection outline stays hidden.
  await expect(page.locator('#panel-body h2')).not.toContainText('Subsea');
  await expect(page.locator('#selbox')).toHaveAttribute('visibility', 'hidden');

  expect(errors, errors.map((e) => e.message).join('\n')).toHaveLength(0);
});

// ---------------------------------------------------------------------------
// 5. `idp:render` seam: every render dispatches exactly one CustomEvent on
//    `window` carrying { id, tab } with tab === 'metal'.
// ---------------------------------------------------------------------------
test('render fires exactly one idp:render event carrying { id, tab: "metal" }', async ({ page }) => {
  await page.addInitScript(() => {
    window.__renders = [];
    window.addEventListener('idp:render', (e) => {
      window.__renders.push(e.detail);
    });
  });

  await page.goto(METAL);
  // Wait for bind()/overview render, then isolate a single deliberate render.
  await expect(page.locator('#panel-body h2')).toBeVisible();
  await page.evaluate(() => { window.__renders = []; });

  // `render(id)` is a page-global (non-module script) per the §7 DOM contract.
  await page.evaluate(() => window.render('subsea'));

  const renders = await page.evaluate(() => window.__renders);
  expect(renders).toHaveLength(1);
  expect(renders[0]).toMatchObject({ id: 'subsea', tab: 'metal' });
});
