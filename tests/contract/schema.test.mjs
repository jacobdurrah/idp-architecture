import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// TA-12 — RED suite for IG-12 (catalog contract test).
// Validates the generated catalog.json against the published catalog.schema.json
// using ajv + ajv-formats. EXPECTED TO FAIL until the Builder ships the schema,
// catalog.json, and adds ajv/ajv-formats as devDeps. Builders must NOT edit this
// file (ledger §10).

const repo = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const CATALOG = join(repo, 'catalog.json');
const SCHEMA = join(repo, 'catalog.schema.json');

// Fields v1's lookup relies on; a rename/removal must fail this contract (§9).
const REQUIRED_RECORD_FIELDS = ['id', 'tab', 'name', 'what', 'why'];

function loadJson(path, label, buildTask) {
  assert.ok(existsSync(path), `${label} not found at repo root — build ${buildTask}`);
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (err) {
    assert.fail(`${label} is not valid JSON — build ${buildTask}. (${err.message})`);
  }
}

function loadCatalog() {
  return loadJson(CATALOG, 'catalog.json', 'IG-01');
}
function loadSchema() {
  return loadJson(SCHEMA, 'catalog.schema.json', 'IG-12');
}

// ajv + ajv-formats are devDeps the IG-12 builder adds. Import them cleanly so a
// missing dependency reports a readable message rather than a raw module crash.
async function makeValidator(schema) {
  let Ajv, addFormats;
  try {
    // The schema declares draft 2020-12, so use ajv's 2020 build (plain `ajv`
    // is draft-07 and cannot resolve the 2020-12 meta-schema).
    ({ default: Ajv } = await import('ajv/dist/2020.js'));
    ({ default: addFormats } = await import('ajv-formats'));
  } catch (err) {
    assert.fail(`ajv / ajv-formats not installed — add them as devDeps in IG-12. (${err.message})`);
  }
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  return ajv.compile(schema);
}

test('contract: catalog.json validates against catalog.schema.json', async () => {
  const catalog = loadCatalog();
  const schema = loadSchema();
  const validate = await makeValidator(schema);
  const ok = validate(catalog);
  assert.ok(ok, `catalog.json must validate against catalog.schema.json. Errors: ${JSON.stringify(validate.errors)}`);
});

test('contract: top-level schemaVersion is a string', () => {
  const catalog = loadCatalog();
  assert.equal(typeof catalog.schemaVersion, 'string', 'catalog.json must carry a top-level schemaVersion string');
  assert.ok(catalog.schemaVersion.length > 0, 'schemaVersion must be non-empty');
});

test('contract: every record has the required fields', () => {
  const catalog = loadCatalog();
  assert.ok(Array.isArray(catalog.records), 'catalog.records must be an array');
  for (const r of catalog.records) {
    for (const field of REQUIRED_RECORD_FIELDS) {
      assert.ok(r && r[field], `record ${JSON.stringify(r && r.id)} is missing required field "${field}"`);
    }
  }
});

test('contract: a copy with a record missing "what" FAILS validation', async () => {
  const catalog = loadCatalog();
  const schema = loadSchema();
  const validate = await makeValidator(schema);

  assert.ok(Array.isArray(catalog.records) && catalog.records.length >= 1, 'need >=1 record to mutate');
  const mutated = JSON.parse(JSON.stringify(catalog));
  delete mutated.records[0].what;

  const ok = validate(mutated);
  assert.equal(ok, false, 'a record missing "what" must FAIL schema validation (the schema must require "what")');
});
