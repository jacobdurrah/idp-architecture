import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// TA-01 — RED suite for IG-01 (catalog generator + catalog.json).
// Encodes IG-01's Tests list against the generated catalog.json at repo root.
// These are EXPECTED TO FAIL until the Builder ships tools/build-catalog.js and
// commits catalog.json. Builders must NOT edit this file (ledger §10); a genuine
// mistake is kicked back to the Test-Author, never quietly changed.

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const CATALOG = join(repo, 'catalog.json');
const GENERATOR = join(repo, 'tools', 'build-catalog.js');

// Tab -> published HTML file (§7.2 protocol / §5 href shape).
const FILE_FOR_TAB = {
  golden: 'golden.html',
  v2: 'v2.html',
  agents: 'agents.html',
  metal: 'metal.html',
  map: 'index.html'
};
const LIGHT_TABS = ['golden', 'v2', 'agents', 'metal'];

// Load + shape-check the committed catalog. A missing file fails as a clean,
// readable assertion ("build IG-01"), not a crash.
function loadCatalog() {
  assert.ok(
    existsSync(CATALOG),
    'catalog.json not found at repo root — build IG-01 (tools/build-catalog.js) to generate it'
  );
  let doc;
  try {
    doc = JSON.parse(readFileSync(CATALOG, 'utf8'));
  } catch (err) {
    assert.fail(`catalog.json is not valid JSON — build IG-01. (${err.message})`);
  }
  assert.equal(typeof doc, 'object', 'catalog.json must be a JSON object');
  assert.ok(doc && Array.isArray(doc.records), 'catalog.json must have a records[] array (shape { schemaVersion, version, records })');
  return doc;
}

// A latency-ish string carries a millisecond value: a number that leads into "ms".
function hasMsValue(text) {
  return /\d[\d.,\s–—-]*\s?ms\b/i.test(String(text || ''));
}

function notesText(rec) {
  if (Array.isArray(rec.notes)) return rec.notes.join(' ');
  return String(rec.notes || '');
}

test('catalog: has at least one record for each light tab (golden, v2, agents, metal)', () => {
  const { records } = loadCatalog();
  for (const tab of LIGHT_TABS) {
    const count = records.filter((r) => r.tab === tab).length;
    assert.ok(count >= 1, `expected >=1 catalog record for tab "${tab}", found ${count}`);
  }
});

test('catalog: Map records, where present, are well-formed on tab "map"', () => {
  // Map entries are included "where clean" (IG-01 test 1). Not required to exist,
  // but any that do must be tagged tab:"map" and carry the required fields.
  const { records } = loadCatalog();
  const mapRecords = records.filter((r) => r.tab === 'map');
  for (const r of mapRecords) {
    for (const field of ['id', 'name', 'what', 'why', 'href']) {
      assert.ok(r[field], `map record "${r.id}" is missing "${field}"`);
    }
  }
});

test('catalog: subsea record on tab metal carries latency text (a ms value)', () => {
  const { records } = loadCatalog();
  // The real Metal DATA box key is "subsea" (m-data-1.js). "e-subsea" is a
  // separate photon edge (m-data-5.js) and is NOT what this asserts.
  const rec = records.find((r) => r.tab === 'metal' && r.id === 'subsea');
  assert.ok(rec, 'expected a catalog record with tab "metal" and id "subsea"');
  // The box has no dedicated latency field, so accept latency | notes | what.
  const combined = [rec.latency, notesText(rec), rec.what].filter(Boolean).join(' ');
  assert.ok(
    hasMsValue(combined),
    `subsea record must carry a millisecond value in latency/notes/what; got: ${combined}`
  );
});

test('catalog: every record has id, tab, name, what, why, href with a correct href', () => {
  const { records } = loadCatalog();
  assert.ok(records.length >= 1, 'catalog must contain at least one record');
  for (const r of records) {
    for (const field of ['id', 'tab', 'name', 'what', 'why', 'href']) {
      assert.ok(r[field], `record ${JSON.stringify(r.id)} is missing required field "${field}"`);
    }
    assert.ok(FILE_FOR_TAB[r.tab], `record "${r.id}" has unknown tab "${r.tab}"`);
    const expectedHref = `/idp-architecture/${FILE_FOR_TAB[r.tab]}#${r.id}`;
    assert.equal(
      r.href,
      expectedHref,
      `record "${r.id}" href should be "${expectedHref}", got "${r.href}"`
    );
  }
});

test('catalog: output is deterministic (byte-stable / content-hash version)', () => {
  const before = loadCatalog();

  if (existsSync(GENERATOR)) {
    // Generator exists: regenerating twice must yield byte-identical catalog.json.
    execFileSync('node', [GENERATOR], { cwd: repo });
    const runA = readFileSync(CATALOG);
    execFileSync('node', [GENERATOR], { cwd: repo });
    const runB = readFileSync(CATALOG);
    assert.ok(runA.equals(runB), 'running tools/build-catalog.js twice must produce byte-identical catalog.json');
  } else {
    // TODO(IG-01): once tools/build-catalog.js lands, the branch above spawns the
    // generator twice and asserts byte-identical output. Until then, assert the
    // committed catalog is deterministic by construction: version is a content
    // hash (no wall-clock field), so identical shards => identical bytes.
    assert.equal(typeof before.version, 'string', 'catalog.version must be a string content hash');
    assert.ok(
      /^[0-9a-f]{7,}$/i.test(before.version),
      `catalog.version should look like a content hash (hex), got "${before.version}"`
    );
    assert.ok(
      !/\d{4}-\d{2}-\d{2}|T\d{2}:\d{2}/.test(before.version),
      'catalog.version must not be a wall-clock timestamp (it must stay byte-stable across runs)'
    );
  }
});
