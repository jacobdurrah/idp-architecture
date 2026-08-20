# Build Ledger — v1 (idp-guide: on-site study agent for the IDP posters, 2026-08-20)

_Completing these tasks produces **v1** of the on-site guide: a grounded Q&A dock that rides on top of the existing posters and can jump the page to the matching box. Source of truth for scope is the pasted build brief (`idp-guide-build-prompt.md`); this file is the human-readable sequence and the living design. **WIP limit = 1 within a task, but streams A/B/C/D run in parallel** (see Execution Order). Every task carries an **Impact (plain terms)** line (what it does for a person, no jargon) and an explicit **Tests (done when these pass)** list; the nested `*Enables:*` notes are builder-facing detail. Work is **test-first with two agents** (§10): a 🧪 Test-Author writes each task's tests (red) before a 🔨 Builder makes them green, and the builder does not edit the tests. A task is DONE only when its test suite is green in CI and unweakened — not just in theory._

_**The thesis in one line:** three jobs, three tools on the agent. v1 ships the first job (Questions) and its two tools (`lookup`, `open_box`). v2 adds Feedback (`flag_clarity`). v3 adds Deeper understanding (tutor). Everything is grounded in `catalog.json`, generated from the same shards the pages load — the agent never invents a hop._

_**The site is a living document.** We keep enhancing the diagrams, add technologies, and add new content kinds (step-by-step workflows like a rollback, a code-lifecycle journey from IDE edit to binary running in a container on a pod on a VM on a server). The agent must (a) stay in sync automatically as the posters grow and (b) feed the questions people ask back into making the diagrams clearer. The design in §8 (Living site) is how those two loops stay closed; the frozen contracts in §7 grow **additively** so growth never triggers a rewrite._

_**Status legend:** ✅ done · 🟡 partial · ⬜ not started. **Owners:** 🤖 Claude Code / Cursor agents build · 👤 Jacob reviews + applies copy edits + holds Vercel/GitHub credentials. The on-site agent never pushes to `main`._

---

## 🏛 System Design — idp-guide (LIVING DOCUMENT)

> **⚠️ KEEP THIS UPDATED.** Any change to a contract (catalog schema, postMessage protocol, the `idp:render` seam) must update this section in the same commit that touches the code. The three frozen contracts in §7 are what let A/B/C/D build without coordinating — do not change them silently.

### 1. Product thesis
**Three jobs, three tools on the agent.** A visitor studying the five posters (Map, Golden path, v2, Agents, Metal) can ask questions and get answers drawn only from the site's own panel copy, with the poster jumping to the box that backs the answer. Ask "why is transatlantic 65–75 ms?" on Golden path and it opens Metal and highlights the subsea hop — it does not invent a sixth story.

| Job | What it is | Tool(s) | Version |
| --- | --- | --- | --- |
| **Questions** | Grounded Q&A from panel copy, highlights the matching box | `lookup`, `open_box` | **v1** |
| **Feedback** | "This is unclear" tags the open data-id, files a `clarity` GitHub issue; a human applies the edit | `flag_clarity` | v2 |
| **Deeper understanding** | Tutor mode: Socratic follow-ups, "trace this request", "what fails if this box dies", quiz from the numbered badges | `lookup`, `open_box` (tutor prompt) | v3 |

### 2. Functional requirements (FR)
| ID | Requirement | Status | Task(s) |
|---|---|---|---|
| **FR-1** | `catalog.json` generated from the live DATA shards (`g/v/a/m-data-*`) + Map content, served on Pages, no auth | ⬜ | IG-01 |
| **FR-2** | Hash-open: `metal.html#e-subsea` opens the Subsea panel with no click; every `render` reflects into the hash | ⬜ | IG-02 |
| **FR-3** | Guide dock: collapsible iframe on all five tabs, above the 36px tab bar, fails silent if blocked | ⬜ | IG-03 |
| **FR-4** | postMessage both ways: site→agent `idp.context`, agent→site `idp.open` (same-tab render or cross-tab navigate) | ⬜ | IG-03, IG-04 |
| **FR-5** | eve agent: grounded Q&A citing a data-id, `lookup` + `open_box` tools, refuses to invent boxes | ⬜ | IG-04 |
| **FR-6** | Embed chat UI at `/embed`, speaks the protocol, streams replies, "Open on poster" affordance | ⬜ | IG-04 |
| **FR-7** | End-to-end: "why is transatlantic 65–75 ms?" from Golden path lands on Metal `e-subsea` | ⬜ | IG-05 |
| **FR-8** | Catalog auto-regenerates on any shard/diagram change (CI), so grounding never drifts from the posters | ⬜ | IG-08 |
| **FR-9** | Question telemetry: each question logged with hit/confidence, feeding a ranked diagram-clarity backlog | ⬜ | IG-09 |
| **FR-10** | Content kinds beyond static boxes: sequenced workflows + a code-lifecycle journey, carried by catalog + protocol | ⬜ | IG-10, IG-11 |
| **FR-11** | `catalog.json` is a versioned public API: `catalog.schema.json` + `schemaVersion`, validated in both repos' CI, additive-only | ⬜ | IG-12 |

### 3. Non-functional requirements (NFR)
| ID | Requirement | Status | Where |
|---|---|---|---|
| **NFR-1 Grounding** | Agent answers only from `catalog.json`; unknown → says so + offers closest ids. No invented hops, latencies, vendors, boxes | ⬜ | IG-04 |
| **NFR-2 Posters-first** | If Vercel/iframe is down, the five tabs still work with no dock. No hard dependency on the agent | ⬜ | IG-03 |
| **NFR-3 Small diffs** | Static repo, no bundler. New JS is a plain file; `guide-dock.js` < 8KB; existing posters not reformatted | ⬜ | IG-02, IG-03 |
| **NFR-4 Origin safety** | postMessage restricted to `jacobdurrah.github.io` + `localhost`; iframe sandboxed | ⬜ | IG-03, IG-04 |
| **NFR-5 Copy voice** | Site + agent copy uses commas/periods/parentheses, no em dashes | ⬜ | IG-01, IG-04 |
| **NFR-6 Cost guard** | No wide-open high-cost model with no limit; simple per-IP/session rate limit if easy | ⬜ | IG-04 |
| **NFR-7 Freshness** | Agent fetches `catalog.json` at chat start, so a published copy fix teaches the next day | ⬜ | IG-01, IG-04 |
| **NFR-8 Evolvability** | Adding a tab / technology / shard / content kind needs no agent code change; generator discovers content, agent re-fetches, schema grows additively | ⬜ | IG-01, IG-08 |
| **NFR-9 No stale grounding** | Catalog carries a version/etag; a publish invalidates the agent's cache so answers match what is on screen | ⬜ | IG-04, IG-08 |
| **NFR-10 Runnable by you** | Tests run independently with one command (`npm test`) and a GitHub Actions "Run workflow" button, both listed at the top of each README | ⬜ | IG-13, IG-14 |
| **NFR-11 Test-first** | Each task's tests are authored (🧪) before its code (🔨); DONE = its suite green in CI and unweakened (test-lock check) | ⬜ | §10, IG-13 |

### 4. Architecture (high level)
```mermaid
flowchart LR
  subgraph Pages[idp-architecture · GitHub Pages · static, no build]
    Posters[5 posters + shards] --- Catalog[catalog.json]
    Posters --- Dock[guide-dock.js iframe]
  end
  subgraph Vercel[idp-guide · Vercel · eve]
    Embed[/embed chat/] --- Agent[eve agent]
    Agent --- Tools[lookup + open_box]
  end
  Dock -->|iframe src| Embed
  Dock -->|postMessage idp.context tab+id| Embed
  Embed -->|postMessage idp.open tab+id| Dock
  Tools -->|fetch, cached| Catalog
```
- **Two repos, on purpose.** `idp-architecture` stays the posters (Pages, no build, same shards) and gains three small things: hash-open, `catalog.json`, and the dock. `idp-guide` is the new eve app on Vercel and never owns the SVG. If Vercel auth flakes, the posters still work.
- **eve** is the agent framework (`npx eve@latest init idp-guide`). After init, `node_modules/eve/docs/README.md` is the source of truth for eve APIs — do not guess them.
- **Models** via Vercel AI Gateway model strings. No provider API keys unless asked.
- **Skip:** Next.js rewrite of the posters, LangChain, Vercel Chat SDK, Slack. Reason Pages is the source of truth: a previous Vercel auth mix-up.

### 5. Entities (data model) — `catalog.json`
One record per `(tab, id)`, generated from `window.IDP_DATA` (keys `n/p/w/y/d` + Metal's `medium/speed/latency/bandwidth/owner`) and Map's `window.IDP_CONTENT`. Field map is confirmed against `metal-ui.js`: `n→name, p→plane, w→what, y→why, d→notes`.
```json
{
  "id": "e-subsea", "tab": "metal", "name": "Subsea hop", "plane": "photon",
  "kind": "box",                       // "box" | "sequence" | "step"  (default "box")
  "badge": 6,                          // optional: numbered curriculum position (Golden 1-12, Metal 1-13)
  "what": "...", "why": "...", "notes": ["..."],
  "medium": "optional", "speed": "optional", "latency": "optional",
  "bandwidth": "optional", "owner": "optional",
  "tech": ["fiber", "dwdm"],           // optional: technology tags, so "what uses DWDM?" retrieves
  "seq": { "of": "rollback", "index": 3, "prev": "s-detect", "next": "s-drain" },  // only when kind != "box"
  "href": "/idp-architecture/metal.html#e-subsea"
}
```
Generated, never hand-written, and **tab-agnostic**: the generator globs `*-data-*.js` and Map content, so a new tab, technology, or shard flows into the catalog with **no generator edit**. `kind`/`seq` carry sequenced content (workflows, the code-lifecycle journey) alongside today's static boxes; `tech` and `badge` are optional retrieval/curriculum hints. Unknown fields are ignored by v1 readers, so the schema grows additively (§7). Ship a top-level `version`/`generatedAt` so a publish can bust the agent's cache (NFR-9), plus a `schemaVersion` validated in both repos' CI against the published `catalog.schema.json` (§9). If a naive push truncates (this repo has bitten tools around ~8–11KB), split into `catalog-0.json …` + a manifest; prefer one file if it stays reasonable.

### 6. Interfaces
- **Tools (v1):** `lookup(id | query) → up to ~8 catalog records` (fetch + cache `catalog.json` from `IDP_CATALOG_URL`, default `https://jacobdurrah.github.io/idp-architecture/catalog.json`). `open_box(tab, id) → {ok:true}` after the embed posts `idp.open`; only the five tab names, only ids that exist in the catalog.
- **Skills (v1):** `ask` (default, grounded Q&A) · `tutor` (stub only — offers to walk Golden 1–12 / Metal 1–13 using lookup + open_box; no quizzes yet).
- **Env:** `IDP_CATALOG_URL` (agent), `IDP_GUIDE_ORIGIN` (dock, overridable; default `http://localhost:3000` on localhost).

### 7. Frozen contracts (do not change silently — this is what makes A/B/C/D independent)
1. **catalog schema** — the §5 record shape. Stream D builds `lookup` against a fixture of this; Stream A produces the real file. They meet only at integration.
2. **postMessage protocol** — site→agent `{type:"idp.context", tab, id, href}` (id may be `"overview"`/omitted); agent→site `{type:"idp.open", tab, id}`. Same tab → `render(id)`; different tab → navigate to `<file>#id`. Tab→file: map=index.html, golden=golden.html, v2=v2.html, agents=agents.html, metal=metal.html. Ignore messages from any origin outside `jacobdurrah.github.io` + `localhost`. No other message types in v1.
3. **`idp:render` seam** — the one seam Streams B and C share. On every `render(id)`, the UI files dispatch `window.dispatchEvent(new CustomEvent('idp:render', {detail:{id, tab}}))`. B owns firing it (inside `render`); C listens to send `idp.context`. Neither touches the other's code.

**Additive-only evolution (the rule that lets the site grow without a rewrite).** New fields, `kind`s, tabs, and technologies are added to the catalog and read by the agent **without changing these three contracts**. `idp.open` may later carry an optional `step` index for sequenced content; v1 pages ignore it. `idp.context` may carry `kind`; v1 agents ignore it. A contract changes only by **extension** — never by breaking a name v1 relies on. `catalog.schema.json` (§9) is the machine-checkable form of contract 1, enforced in both CIs by IG-12. This is what makes §8's living-site loops safe.

### 8. Living site — the site is a document that improves itself
The posters are not frozen. We add technologies, add tabs, and turn questions into clearer diagrams. Three loops keep the agent and the diagrams growing together:
- **Content → catalog → agent (freshness, closed by IG-08).** Any diagram/shard edit regenerates `catalog.json` in CI. The agent re-fetches per session and the `version` busts its cache, so a copy fix or a whole new box teaches the next day with **no agent redeploy**. Grounding can never drift from what is on screen.
- **Questions → clarity backlog → better diagrams (the improvement loop, closed by IG-09).** Every question is logged with whether it hit a box and the agent's confidence. Misses, low-confidence answers, and "closest box" offers become a **ranked backlog of where a diagram is unclear**. Explicit "this is unclear" flags (IG-06) feed the same backlog. A human or a cloud agent enhances the shard; regeneration closes the loop. **The questions people actually ask are the spec for the next diagram.**
- **New content kinds → same pipeline (IG-10, IG-11).** New material enters as new shards/tabs and rides the existing catalog + dock + agent with no rewrite:
  - **Workflows / sequences** — step-by-step visuals like a rollback, modeled as a `kind:"sequence"` header over ordered `kind:"step"` records. The dock gains next/prev; the agent can "walk me through the rollback" and step the poster.
  - **Code-lifecycle journey** — IDE human-readable edit → commit → build → binary → image layer → container → pod → VM → slat/server, showing what shape the code takes at each hop. This is the canonical sequence the tutor's "trace this build/request" (v3) leans on, and it reuses the same sequence machinery.

Design rule for all of it: **evolution is additive** (§7). New fields/kinds/tabs never break v1's frozen names; v1 pages ignore what they do not understand.

### 9. Repo integration & change management — integrate through the catalog, not the code
The two repos never share code or a build. They meet at exactly two **published contracts**, and rapid content change is designed to flow through the first one with **zero changes to the other repo**. Expectation: the posters change rapidly and often as curiosity grows, so the seam is built to absorb that churn on one side only.

**The two seams:**
| Seam | Artifact | Producer | Consumer | Changes… |
|---|---|---|---|---|
| **Data** | `catalog.json` (+ `catalog.schema.json`, `version`, `schemaVersion`) on Pages | idp-architecture | idp-guide agent (`lookup`) | constantly (every box / copy / tech edit) |
| **UI** | postMessage protocol (§7.2) | both | both | rarely (only new interaction kinds) |

**The 95% path — content churn, one repo only.** Curiosity → edit a shard (new box, new technology, sharper copy, new tab) → push → IG-08 CI regenerates `catalog.json`, validates it against `catalog.schema.json`, bumps `version`, publishes to Pages. The agent fetches the fresh catalog on its next session and teaches the new material. **idp-guide is never touched.** This is the loop built for rapid change.

**The 5% path — a new capability.** A new *content kind* the dock must render (a sequence), a new tool, or prompt tuning touches idp-guide too. Rare, and lands **additively** (§7) so nothing breaks mid-flight.

**Guardrails that make churn safe (push freely, let CI catch breaks — matches the easily-reverted, direct-to-main workflow):**
- **Catalog is a versioned public API.** `catalog.schema.json` (source of truth in idp-architecture, published next to the data) + `schemaVersion`. The schema only ever gains **optional** fields.
- **Contract test in both CIs (IG-12).** idp-architecture: the generated catalog must validate against the schema, and every field v1's `lookup` reads must still be present — a rename/removal turns CI red **before** publish. idp-guide: its fixture and a fetch of the live catalog must both validate against the same schema — catches drift the day it happens.
- **Config, not code, at the seam.** The dock's `IDP_GUIDE_ORIGIN` and the agent's frame-ancestors allowlist are env/config, so pointing at a new preview or production URL is a flip, not an edit.
- **Independent deploys + previews.** Vercel preview-per-PR for idp-guide; local `npx serve` (or a Pages preview action) for the posters. Either side can be verified against the *other side's production* because the only link is a URL. No lock-step releases.
- **Expand-only order when a change spans both repos.** Publish the additive catalog/schema first (old agent ignores the new field) → then ship the dock/agent that uses it. Never remove a name a live reader depends on; if you must, expand → migrate → contract across separate deploys.

**Not a monorepo, on purpose.** Two repos + two hosts is the resilience story: a Vercel outage or auth flake leaves the posters fully usable (NFR-2). The catalog seam is what lets them stay separate without drifting. *(Optional later: a `repository_dispatch` webhook so a catalog publish pings idp-guide to run a smoke test — v2, nice-to-have; the per-session fetch already handles freshness.)*

### 10. Test-first, two agents — how we build
Every task is built **test-first**: its executable tests are written **before** any implementation, and the builder builds toward turning them green. Two roles, deliberately separate so tests are never written to flatter the code:
- **🧪 Test-Author agent** turns a task's **Tests (done when these pass)** list into an executable suite (Playwright for browser behavior, `node:test`/vitest for the generator, `ajv` for the schema, an eval harness for the agent). Commits them **red** — failing because the implementation does not exist yet. Does **not** write implementation.
- **🔨 Builder agent** makes the suite green. Does **not** edit the test files. If a test is genuinely wrong, it is kicked back to the Test-Author, not quietly changed.
- **Integrity:** test files live under `tests/` (and `idp-guide/tests/`); CI flags any build commit that modifies a locked test file — a commit must be prefixed `test-change:` to revise a test on purpose. So a green run means the code met the test, not that the test was bent to the code. A human/verifier spot-checks.

**Tests parallelize as fully as the build does.** Because every test encodes only the task's Tests list plus the frozen §7 contracts (never the implementation), all suites can be authored **up front, in parallel**, before a line of feature code exists. The test fan-out (Phase T) mirrors the build fan-out (Phase B) one-to-one: TA-01 ↔ IG-01, and so on. Only the shared runner (Phase T0) must land first.

**Running them yourself (no agent, no local build knowledge needed):**
- **One command:** `npm test` at each repo root runs the whole suite; `npm run test:catalog` / `test:e2e` / `test:contract` run slices. Listed at the **top of each README**.
- **One button:** a GitHub Actions workflow with `workflow_dispatch` puts a **"Run workflow" button** in the repo's Actions tab (it also runs on every push and PR). The Playwright HTML report is uploaded as a run artifact, so you see results without any local setup.

---

## ⚡ EXECUTION ORDER — the one list that matters

_Four build streams, then one join. **A/B/C land in `idp-architecture` and share no files** (A = new files, B = edits `*-ui.js`/`app.js`, C = new `guide-dock.js` + edits `*.html`). **D is the separate `idp-guide` repo.** All four build against the §7 frozen contracts with zero live coordination. Only IG-05 (integration + e2e + deploy) needs everything merged._

| Stream | Task | Repo | Touches | Depends only on | Owner |
|---|---|---|---|---|---|
| **A** | IG-01 catalog generator + `catalog.json` | idp-architecture | *new:* `tools/build-catalog.js`, `catalog.json` | existing shards + schema §5 | 🤖 |
| **B** | IG-02 hash-open + `idp:render` seam | idp-architecture | *edit:* `golden-ui.js`, `v2-ui.js`, `agents-ui.js`, `metal-ui.js`, `app.js` | existing `render(id)` + seam §7.3 | 🤖 |
| **C** | IG-03 dock + postMessage | idp-architecture | *new:* `guide-dock.js`; *edit:* 5 `*.html` | protocol §7.2 + seam §7.3 | 🤖 |
| **D** | IG-04 eve app (tools, embed, prompt) | idp-guide (new) | whole new repo | schema §5 + protocol §7.2 | 🤖 |
| join | IG-05 integration + e2e + deploy | both | dock origin flip, live catalog URL | A+B+C+D merged | 🤖👤 |

**Suggested split:** one agent takes A+B+C in this repo (shares a mental model of the posters), one agent takes D in the new repo, in parallel. Or fan A/B/C to three agents — the frozen `idp:render` seam is what makes that safe. **Cursor** is the natural owner of D (needs eve docs + Vercel context); **Claude Code** the natural owner of A/B/C.

**The dependency in one sentence:** shards → catalog (A) is the only thing anyone else eventually reads, and even that is stubbed by a fixture, so A/B/C/D all start at once and converge at IG-05.

**Not parallel (integration, not building):** the dock's production origin is a one-line constant flip once D deploys; the e2e test needs everything merged. Both live in IG-05.

**Foundational for the living site (§8):** IG-08 (catalog auto-regeneration in CI) is **in v1 scope** — it depends only on IG-01 (wraps the generator in a GitHub Action), and without it grounding drifts the first time a shard is edited. It follows IG-01, not in parallel. IG-09 (question telemetry → clarity backlog), IG-10 (workflow/sequence kind), and IG-11 (code-lifecycle journey) are later phases but are pre-designed here so they land additively (§7).

**Test-first, three phases (§10).** Building is preceded by test authoring, and both fan out in parallel:
- **Phase T0 — Harness (lands first, tiny):** IG-13 (idp-architecture) + IG-14 (idp-guide) stand up the runner, `npm test`, and the Actions "Run workflow" button.
- **Phase T — Author tests (🧪 Test-Author, parallel):** one red suite per task, encoding only the task's Tests list + frozen contracts. Mirrors the build one-to-one.
- **Phase B — Build (🔨 Builder, parallel):** IG-01..IG-12, each defined as "make its TA suite green" without editing the tests.

| Test suite | Encodes | Kind / tool | Runs green after |
|---|---|---|---|
| **TA-01** | IG-01 | `node:test` on `catalog.json` | IG-01 |
| **TA-02** | IG-02 | Playwright (hash-open, `idp:render`) | IG-02 |
| **TA-03** | IG-03 | Playwright (dock, postMessage, offline) | IG-03 |
| **TA-04** | IG-04 | eval harness vs fixture catalog | IG-04 |
| **TA-05** | IG-05 | Playwright e2e vs preview | A+B+C+D integrated |
| **TA-08** | IG-08 | `node:test` + CI (regen / version / drift) | IG-08 |
| **TA-12** | IG-12 | `ajv` schema validation, both repos | IG-12 |

All TA suites can be authored in parallel the moment Phase T0 exists — none depends on another's code. (TA-06/07/09/10/11 for v2/v3 tasks are authored when those phases are scheduled.)

---

## PHASE v1 — Dock + grounded Q&A + highlight
_Goal: a visitor asks a question on any tab, gets a grounded answer citing a data-id, and the poster jumps to that box. v2 (clarity issues) and v3 (tutor/quiz) are out of scope — design the protocol and catalog so they land later without a rewrite._

_Build order per §10: **Phase T0** (IG-13/IG-14 harness) → **Phase T** (🧪 Test-Author writes TA-01..TA-12 red, in parallel) → **Phase B** (🔨 Builder turns each green, in parallel). A task is DONE when its TA suite is green in CI and unweakened._

- ✅ **IG-13 — Test harness + one-command runner + Actions button (idp-architecture).** 🔨 *(v1, Phase T0 — DONE 2026-08-20.)* Live: `npm test` (node:test unit/contract + Playwright e2e), `.github/workflows/tests.yml` with the `workflow_dispatch` "Run workflow" button, report artifact, README "Testing — run it yourself" section. Unit/contract green now; TA-* suites fill the placeholders.*(original spec below)* Stand up Playwright + `node:test`, a root `npm test` that runs everything, slice scripts (`test:catalog`, `test:e2e`, `test:contract`), and `.github/workflows/tests.yml` triggered on `push`, `pull_request`, and `workflow_dispatch` (the "Run workflow" button); upload the Playwright HTML report as a run artifact. Document the command + button at the **top of README**. **Impact (plain terms):** gives you one command and one GitHub button to check the whole site yourself, any time, without touching code.

  **Tests (done when these pass):**
  1. `npm test` runs from a clean checkout and reports pass/fail.
  2. The Actions tab shows a **"Run workflow" button** that runs the same suite.
  3. A deliberately failing test shows up red in the Action and in the uploaded report.
  4. The first section of README tells you exactly how to run it (command + button).
- ⬜ **IG-14 — Test harness + runner + Actions button (idp-guide).** 🔨 *(v1, Phase T0.)* Same for the eve repo: `npm test` runs the agent eval + embed tests, a `workflow_dispatch` "Run workflow" button, README section. **Impact (plain terms):** the same one-command / one-button check for the guide app.

  **Tests (done when these pass):**
  1. `npm test` runs the agent's grounded-answer + refusal evals against the fixture catalog.
  2. The Actions "Run workflow" button runs the same suite.
  3. README's first section lists the command and the button.
- ⬜ **IG-01 — Catalog generator (Stream A).** 🤖 A one-shot Node script `tools/build-catalog.js` that loads every `*-data-*.js` (g/v/a/m) plus Map's `content-*.js` in a shim capturing `window.IDP_DATA` / `window.IDP_CONTENT`, dedups by `(tab, id)`, and emits the §5 record for every key. Commit generated `catalog.json` at repo root so Pages serves it with no auth. **Impact (plain terms):** turns the words already on the posters into one machine-readable list the guide can read, so the guide only ever talks about things that are actually on the site.

  **Tests (done when these pass):**
  1. `catalog.json` has at least one record for each of the four light tabs (golden, v2, agents, metal), plus Map entries where clean.
  2. The `e-subsea` record's latency text matches the copy shown in the Metal panel.
  3. Running the generator twice on unchanged shards produces an identical file (stable ordering, no diff).
  4. Every record has `id`, `tab`, `name`, `what`, `why`, and an `href` that opens the right page + box.
  5. Adding a throwaway box to a shard and re-running makes it appear in `catalog.json` with no change to the generator.
  - [ ] **Shim loader** captures `IDP_DATA`/`IDP_CONTENT` without a browser. *Enables: regenerating the catalog after any shard edit.*
  - [ ] **Field map + Metal extras** (`n/p/w/y/d` + medium/speed/latency/bandwidth/owner). *Enables: the agent can answer Metal's medium/speed/latency questions.*
  - [ ] **Dedup by `(tab, id)` + `href` per §5.** *Enables: `open_box`/hash-open target a unique, real box.*
  - [ ] **Tab-agnostic discovery** (glob `*-data-*.js`, no hardcoded tab list) + top-level `version`/`generatedAt`. *Enables: NFR-8 — a new tab/technology/shard flows in with no generator edit; NFR-9 cache-busting.*
  - [ ] **Split-if-large fallback** (`catalog-0.json…` + manifest) only if one file truncates on push. *Enables: NFR-3 safe publish on a repo that has truncated large files.*
- ⬜ **IG-02 — Hash-open + `idp:render` seam (Stream B).** 🤖 In `golden-ui.js`, `v2-ui.js`, `agents-ui.js`, `metal-ui.js`: after `bind()`, if `location.hash` (minus `#`) is a real `IDP_DATA` key, call `render(id)`; on every successful `render(id)` (taps included) `history.replaceState` the hash (no new history entry per tap) **and** dispatch the `idp:render` seam event (§7.3). Map (`app.js`) opens its drawer only if the hash maps to a real id, else ignores. **Impact (plain terms):** lets any box be opened straight from a web link, so the guide can send you to the exact box that answers your question.

  **Tests (done when these pass):**
  1. Opening `metal.html#e-subsea` shows the Subsea panel with no click.
  2. Clicking a box updates the address bar to that box's link.
  3. Pressing browser Back after several clicks does not step through every box one by one (no history spam).
  4. A made-up hash like `#not-real` opens nothing and throws no error.
  5. Each `render` fires exactly one `idp:render` event carrying the id and tab (visible in the console).
  - [ ] **Hash-on-load** for the four light tabs. *Enables: deep links + the agent's cross-tab `idp.open` navigate target.*
  - [ ] **`replaceState` on render** (no per-tap history entry). *Enables: shareable URL that reflects the open box.*
  - [ ] **Dispatch `idp:render` CustomEvent** on every render. *Enables: Stream C learns a box opened without touching UI internals.*
  - [ ] **Map cautious hash-open** in `app.js`. *Enables: deep links on the dark canvas without inventing a second hash scheme.*
- ⬜ **IG-03 — Dock + postMessage (Stream C).** 🤖 New `guide-dock.js` (< 8KB) included before `</body>` on all five HTML pages: a fixed iframe/chip above the 36px tab bar (does not cover `.site-tabs`), 380px column or bottom-right chip on desktop, bottom-sheet chip on mobile, dark variant on `body.idp-map`. Collapse state in `localStorage['idp-guide-dock']`. iframe `src` = `IDP_GUIDE_ORIGIN` constant (default `http://localhost:3000` on localhost), sandbox `allow-scripts allow-same-origin allow-forms`, title "Architecture guide". Send `idp.context` on load, on each `idp:render` event, and on tab identity at startup; handle inbound `idp.open` (same tab → `render`, else navigate to `<file>#id`). Strict origin allowlist. Fails silent if the iframe won't load. **Impact (plain terms):** puts a small chat panel on every page that can talk to the guide and highlight boxes, and can be collapsed or ignored without breaking the posters.

  **Tests (done when these pass):**
  1. All five tabs show the dock; it collapses and stays collapsed after a reload.
  2. The dock never covers the tab bar; switching tabs still works.
  3. With the guide URL blocked or offline, the posters still work fully (the dock is just absent).
  4. A test `idp.open` from the embed opens the right box on the same tab, or navigates to the right page + box on another tab.
  5. A message from an origin that is not on the allowlist is ignored.
  - [ ] **Dock shell + collapse persistence** (light + `idp-map` dark). *Enables: the visible chat surface on every tab.*
  - [ ] **Outbound `idp.context`** on load + on `idp:render`. *Enables: answers know which box the user is looking at.*
  - [ ] **Inbound `idp.open`** → render or navigate. *Enables: the agent jumps the poster to the box it cites.*
  - [ ] **Origin allowlist + sandbox + fail-silent.** *Enables: NFR-2 posters-first and NFR-4 origin safety.*
- ⬜ **IG-04 — eve app: tools, embed, prompt (Stream D).** 🤖 `npx eve@latest init idp-guide`, then implement against the bundled eve docs. Agent instructions: guide for the five tabs, answer only from `catalog.json`, cite ≥1 data-id, prefer calling `open_box`, never invent hops/latencies/vendors/boxes, never claim to have edited the site, no em dashes. Tools `lookup` + `open_box` (§6). Skills `ask` + `tutor` stub. `/embed` chat: listen for `idp.context` from the parent on mount, keep latest `{tab,id}` in session, stream replies, post `idp.open` when `open_box` fires, "Open on poster" affordance. CORS/frame-ancestors allow `jacobdurrah.github.io` + `localhost:*`. Simple rate limit if easy. **Impact (plain terms):** the actual guide — it answers using only the site's own words, points you to the box it is citing, and admits when the site does not cover something.

  **Tests (done when these pass):**
  1. A question with a matching box cites that box's id and calls `open_box`.
  2. A question with no matching box is refused with the closest ids offered, not a made-up answer.
  3. Across a few adversarial prompts, the agent never returns a latency, vendor, or hop that is not in the catalog.
  4. The embed opens with no login wall; hammering it quickly trips the rate limit.
  5. The agent's answers contain no em dashes.
  - [ ] **eve init + read bundled docs** (not from memory). *Enables: correct eve APIs for tools/skills/embed.*
  - [ ] **Instructions (grounding + voice).** *Enables: NFR-1 grounding, NFR-5 voice.*
  - [ ] **`lookup` tool** (fetch + cache catalog, cap ~8). *Enables: grounded retrieval; NFR-7 freshness.*
  - [ ] **`open_box` tool** (validate tab + id, post `idp.open`). *Enables: the poster jump.*
  - [ ] **`/embed` chat speaks the protocol.** *Enables: FR-4/FR-6 end-to-end.*
  - [ ] **`ask` skill + `tutor` stub.** *Enables: v1 Q&A now, v3 tutor later with no rewrite.*
- ⬜ **IG-05 — Integration + e2e + deploy (join).** 🤖👤 Merge A+B+C in `idp-architecture` (one PR: "Add guide dock, hash-open, and catalog.json"). Deploy `idp-guide` to Vercel; flip the dock's default origin to the production URL. Deploy the dock + hash + catalog to Pages (or a PR for Jacob to merge). **Impact (plain terms):** proves the whole thing works end to end on the real site — ask a question on one page, land on the right box on another.

  **Tests (done when these pass):**
  1. On Golden path, "why is transatlantic 65-75 ms?" cites Metal `e-subsea` and navigates to `metal.html#e-subsea`.
  2. A question outside the catalog does not invent a box.
  3. The posters work with the dock collapsed or blocked.
  4. Both READMEs explain local run, what v1 is, the postMessage protocol, and the env vars.

- ⬜ **IG-08 — Catalog auto-regeneration (CI).** 🤖 *(v1 — foundational; depends on IG-01.)* Wrap IG-01's generator as an npm script + a GitHub Action that regenerates `catalog.json` on any change to `*-data-*.js`/`content-*.js` and commits/publishes it to Pages, stamping a fresh `version`/`generatedAt`. Without this, grounding drifts the first time a shard is edited, so it is in v1 scope. **Impact (plain terms):** keeps the guide's knowledge automatically in step with the posters, so editing a diagram is all you ever have to do.

  **Tests (done when these pass):**
  1. Editing a shard's copy and pushing produces an updated `catalog.json` on Pages in the same CI run, with a bumped `version`.
  2. The guide teaches the new copy on its next session with no redeploy.
  3. A push that changes a shard but not `catalog.json` fails the drift check.
  - [ ] **`npm run build:catalog`** wrapping `tools/build-catalog.js`. *Enables: one command to regenerate.*
  - [ ] **GitHub Action on shard/content change** → regenerate + publish + version bump. *Enables: FR-8 no-drift grounding.*
  - [ ] **Drift check** (CI fails if `catalog.json` is stale vs shards). *Enables: catches a hand-edit that skipped regeneration.*
- ⬜ **IG-12 — Catalog contract test (both repos).** 🤖 *(v1 — the guardrail for rapid change; §9.)* Author `catalog.schema.json` (published on Pages next to `catalog.json`) + a `schemaVersion`. idp-architecture CI: the generated catalog validates against the schema, and an additive-only assertion checks every field v1 `lookup` reads (`id`, `tab`, `name`, `what`, `why`) is still present. idp-guide CI: its fixture **and** a fetch of the live catalog both validate against the same schema. **Impact (plain terms):** a safety net so a bad edit cannot silently make the guide say wrong things — it fails loudly in CI first.

  **Tests (done when these pass):**
  1. Adding a new optional field to the catalog passes CI in both repos.
  2. Renaming or removing `id`/`tab`/`name`/`what`/`why` fails idp-architecture CI before anything publishes.
  3. A catalog with a `schemaVersion` the agent does not support is flagged, not silently misread.
  4. The live catalog on Pages validates against the published schema.
  - [ ] **`catalog.schema.json` + `schemaVersion`**, published on Pages. *Enables: one machine-checkable definition of the data contract (§7.1).*
  - [ ] **Producer-side validation + additive-only assertion** in IG-08's CI. *Enables: a breaking regen turns red before it reaches Pages.*
  - [ ] **Consumer-side validation** (fixture + live fetch) in idp-guide CI. *Enables: drift surfaces on the agent side the day it happens.*

## PHASE v2 — Feedback (out of scope for v1; design so it lands without a rewrite)
- ⬜ **IG-06 — `flag_clarity` tool.** 🤖👤 Takes the open data-id + the visitor's note, files a GitHub issue on `jacobdurrah/idp-architecture` labeled `clarity` via Vercel Connect (no pasted token). The on-site agent does not push; Jacob or a cloud agent applies the edit from the issue. Feeds the **same diagram-clarity backlog** as IG-09. *(Not implemented in v1. The `idp.context` protocol already carries the open id it needs.)*

## PHASE v3 — Deeper understanding (out of scope for v1)
- ⬜ **IG-07 — Tutor mode for real.** 🤖 Socratic follow-ups, "trace this request", "what dies if this box fails", quiz from the numbered badges (Golden 1–12, Metal 1–13). Durable eve sessions so a study thread survives a refresh. Leans on the code-lifecycle sequence (IG-11) for "trace this build". *(v1 ships only the `tutor` stub.)*

## PHASE — Living site & new content types (the site grows over time; §8)
_These keep the agent in sync as the diagrams grow and turn questions into clearer diagrams. All land additively on the §7 contracts — no rewrite of v1. (IG-08, the freshness loop, is folded into v1 above.)_
- ⬜ **IG-09 — Question telemetry + diagram-clarity backlog.** 🤖👤 *(v2.)* Log every question with the box it resolved to (if any) and the agent's confidence; roll misses, low-confidence answers, and "closest box" offers into a ranked backlog of where a diagram is unclear. Merges with IG-06's explicit flags. *Accept: a week of questions produces a ranked list of unclear/uncovered ids; a repeated miss on a topic with no box surfaces as a "needs a new box" item; PII/rate limits respected.*
  - [ ] **Per-question log** (question, resolved id, confidence, tab). *Enables: the raw signal.*
  - [ ] **Backlog rollup** (rank by frequency × miss/low-confidence). *Enables: "the questions are the spec for the next diagram".*
  - [ ] **Feed into IG-06's `clarity` backlog** (one queue, two sources). *Enables: humans/cloud agent act on both explicit and inferred gaps.*
- ⬜ **IG-10 — Workflow / sequence content kind (rollback).** 🤖 *(v3/v4.)* A `kind:"sequence"` header over ordered `kind:"step"` records (e.g. a rollback: detect → freeze → drain → revert → verify). Generator emits `seq`; the dock gains next/prev and the agent can step the poster; `idp.open` optionally carries `step` (additive, §7). First target: the rollback workflow. *Accept: a rollback sequence renders as ordered steps a visitor can walk; "walk me through a rollback" steps the poster start-to-finish citing each step id; static boxes are unaffected.*
- ⬜ **IG-11 — Code-lifecycle journey.** 🤖 *(v4.)* The canonical sequence: IDE human-readable edit → commit → build → binary → image layer → container → pod → VM → slat/server, showing what shape the code takes and what transforms it at each hop. Built on IG-10's sequence machinery; anchors the tutor's "trace this build/request" (IG-07). *Accept: the journey renders as a walkable sequence tying back to the existing server-to-pod drill on Metal; "what shape is my code inside the container?" lands on the right step and cites it.*

---

## Landmines (inherited, not repeated per task)
- `idp-architecture` is static, no bundler — new JS is a plain file, keep edits small (NFR-3).
- GitHub pushes to this repo have truncated files around ~8–11KB in some tools. Split large files; do not re-upload `diagram.svg`, posters, or existing shards "for convenience".
- Do not move poster hosting to Vercel. Do not force-push or rewrite git history. Do not clone if the repo is already present.
- Do not add a Metal/Agents/v2 visual redesign. Do not implement `flag_clarity`, GitHub issues, tutor quizzes, or Slack in v1. Do not let the agent commit, open PRs, or apply copy edits.

## Log
- 2026-08-20 — Ledger opened in the shared `ledger/tasks.md` format. v1 brief locked; design + four parallel streams (A/B/C/D) drafted; three contracts frozen (catalog schema, postMessage protocol, `idp:render` seam). Next concrete action: IG-01.
- 2026-08-20 — Added the **living-site** design (§8): the posters keep growing, so the catalog schema now carries `kind`/`seq`/`badge`/`tech` and a `version`, evolution is additive-only (§7), and two loops are specced — auto-regeneration for freshness (IG-08) and question-telemetry → clarity backlog for continuous diagram improvement (IG-09). New content kinds (workflow/sequence IG-10, code-lifecycle journey IG-11) ride the same pipeline. FR-8/9/10, NFR-8/9 added.
- 2026-08-20 — **Folded IG-08 (catalog auto-regeneration) into v1 scope** so grounding never drifts once shards start changing. It sits in PHASE v1 after IG-01; the living-site phase now starts at IG-09.
- 2026-08-20 — Added **§9 Repo integration & change management**: the two repos integrate through the catalog (a versioned public API), not through code. Content churn flows through the data seam with zero idp-guide changes; capability changes are rare and additive; guardrails = schema + contract test in both CIs (IG-12, v1), config-not-code origins, independent deploys, expand-only order. FR-11 added.
- 2026-08-20 — Every v1 task (IG-01/02/03/04/05/08/12) now carries a jargon-free **Impact (plain terms)** line and an explicit numbered **Tests (done when these pass)** list; DONE = all Tests green on a real page. Convention noted in the intro so later tasks follow it.
- 2026-08-20 — Adopted **test-first with two agents (§10)**: a 🧪 Test-Author writes each task's tests red before a 🔨 Builder turns them green (no editing tests to pass). Added **Phase T0** harness tasks (IG-13 idp-architecture, IG-14 idp-guide) and the **TA-01..TA-12** parallel test-authoring fan-out that mirrors the build one-to-one. Independent runs via `npm test` + a GitHub Actions **"Run workflow" button**, both listed at the top of each README. NFR-10 (Runnable by you) + NFR-11 (Test-first) added.
- 2026-08-20 — **IG-13 DONE — the button is live.** Harness + `workflow_dispatch` "Run workflow" button pushed to main; unit/contract slices green. Orchestration started: 6 worktree-isolated subagents in flight — 🧪 TA-01/12 (catalog+schema), 🔨 IG-01/08/12 (catalog/schema/regen), 🧪 TA-02 + 🔨 IG-02 (hash-open), 🧪 TA-03 + 🔨 IG-03 (dock). Orchestrator integrates branches on completion; streams touch disjoint files. Stream D (IG-04/IG-14, eve on Vercel) deferred — needs Jacob's Vercel + GitHub accounts.
