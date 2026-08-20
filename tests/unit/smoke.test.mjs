import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Harness smoke test (IG-13). Proves `npm test` and the "Run workflow" button
// actually execute and report. Real coverage is added by the TA-* suites.
const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

test('smoke: core posters are present', () => {
  for (const f of ['index.html', 'golden.html', 'v2.html', 'agents.html', 'metal.html']) {
    assert.ok(existsSync(join(repo, f)), `${f} should exist`);
  }
});

test('smoke: shared tab chrome is present', () => {
  assert.ok(existsSync(join(repo, 'tabs.css')), 'tabs.css should exist');
});
