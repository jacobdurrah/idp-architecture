# IDP Architecture Map

A living map of a mature internal developer platform, source to production. Five views share a top tab bar.

## Views

| Tab | File | URL | What you get |
| --- | --- | --- | --- |
| **Map** | `index.html` | [Map](index.html) · https://jacobdurrah.github.io/idp-architecture/ | Dark, zoomable 5600×3360 staff-review canvas. Scroll to zoom, drag to pan, click a box. |
| **Golden path** | `golden.html` | [Golden path](golden.html) · https://jacobdurrah.github.io/idp-architecture/golden.html | Light vertical poster. One change: commit → build → test → deploy → run → observe, with a sticky detail panel. |
| **v2** | `v2.html` | [v2](v2.html) · https://jacobdurrah.github.io/idp-architecture/v2.html | Same light poster, enriched from the original map: five Git repos, PR #4821, 12-step path, admission, merged Triggers / Stores / Talks to. This is the presentation view. |
| **Agents** | `agents.html` | [Agents](agents.html) · https://jacobdurrah.github.io/idp-architecture/agents.html | Light vertical poster. Where agentic agents sit from developer to observability, and which spaces are stigmergic (the environment holds the trace). |
| **Metal** | `metal.html` | [Metal](metal.html) · https://jacobdurrah.github.io/idp-architecture/metal.html | Light vertical poster. The physical path of one HTTP request: radio, fiber, carrier hotels, colo, racks, silicon. The other four tabs sit on this. |

Open a tab, tap a box, read the panel. More pages can land here later as sibling HTML files linked from `tabs.css` / `.site-tabs`.

## Testing — run it yourself

Two ways to run the full test suite, no code knowledge needed:

- **A button (no setup):** open the repo's **Actions** tab → **Tests** → **Run workflow**. It runs the same suite CI runs on every push, and attaches a Playwright HTML report to the run.
- **A command (local):** from this directory:

  ```bash
  npm install            # first time only
  npx playwright install # first time only, for the browser tests
  npm test               # runs everything
  ```

  Slices: `npm run test:unit` (catalog + schema, fast, no browser), `npm run test:e2e` (browser behavior: hash-open, dock, end-to-end question flow).

Tests are written **before** the feature (test-first, see `ledger/tasks.md` §10): a task is done when its suite is green here. `tests/unit/catalog.test.mjs` and `tests/contract/schema.test.mjs` are placeholders until the Test-Author fills them.

## Run locally

Any static file server works. From this directory:

```bash
npx serve
```

Or open `index.html` directly in a browser. On `file://`, fetch of `diagram.svg` is blocked by the browser; the page falls back to an `<object>` embed so the diagram still appears. A local server (`npx serve`) is the intended path. `golden.html` and `v2.html` are self-contained and work on `file://`.

## Deploy

GitHub Pages is live at https://jacobdurrah.github.io/idp-architecture/. There is no build step — the repo root is the static site.

Vercel is optional later. `vercel.json` turns on clean URLs and sets cache headers for the SVG, PNG, JS, and CSS if you import this folder as a static project.

There is no application server and no environment variables.

## Iterate

Two files, two jobs on the dark map:

1. **`diagram.svg`** — the painted map. Edit boxes, labels, or arrows. Keep the 5600×3360 user-space and the `id`s on `#dev`, `#git`, `#ci`, `#tests`, `#registry`, `#argocd`, `#terraform`, `#k8s`, `#app`, `#otel` (they sit in `#region-anchors`).
2. **`app.js`** — behavior and copy.
   - `REGIONS` — chip jump targets (`x, y, w, h` in SVG user units).
   - `STEPS` — numbered delivery path 1–12.
   - `HITS` — invisible click targets over boxes.
   - `window.IDP_CONTENT` (top of the file) — drawer prose (`name`, `plane`, `does`, `triggers`, `stores`, `talksTo`).

The light posters (`golden.html`, `v2.html`, `agents.html`, `metal.html`) keep CSS, SVG, and `DATA` in sibling shards. Edit a box by changing the SVG and the matching `DATA` key. Shared chrome is `tabs.css`.

The PNG at `og.png` is only the social/OG preview. The live Map view is always the SVG — do not swap it for a bitmap.
