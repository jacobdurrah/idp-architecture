# IDP Architecture Map

A living, zoomable map of a mature internal developer platform — source to production. The original diagram is a 5600×3360 staff-review canvas; this site is how you actually read it.

Open it, pinch or scroll-zoom until every label is legible, jump to a region, and click a box for a prose explanation. More pages (CI deep-dive, GitOps, observability) will land here later.

## Run locally

Any static file server works. From this directory:

```bash
npx serve
```

Or open `index.html` directly in a browser. On `file://`, fetch of `diagram.svg` is blocked by the browser; the page falls back to an `<object>` embed so the diagram still appears. A local server (`npx serve`) is the intended path.

## Deploy

GitHub Pages is live at https://jacobdurrah.github.io/idp-architecture/. There is no build step — the repo root is the static site.

Vercel is optional later. `vercel.json` turns on clean URLs and sets cache headers for the SVG, PNG, JS, and CSS if you import this folder as a static project.

There is no application server and no environment variables.

## Iterate

Two files, two jobs:

1. **`diagram.svg`** — the painted map. Edit boxes, labels, or arrows. Keep the 5600×3360 user-space and the `id`s on `#dev`, `#git`, `#ci`, `#tests`, `#registry`, `#argocd`, `#terraform`, `#k8s`, `#app`, `#otel` (they sit in `#region-anchors`).
2. **`app.js`** — behavior and copy.
   - `REGIONS` — chip jump targets (`x, y, w, h` in SVG user units).
   - `STEPS` — numbered delivery path 1–12.
   - `HITS` — invisible click targets over boxes.
   - `window.IDP_CONTENT` (top of the file) — drawer prose (`name`, `plane`, `does`, `triggers`, `stores`, `talksTo`).

Add a new clickable box by appending one `HITS` rect and one `CONTENT` entry with the same `id`. Add a future page as a sibling HTML file and link it from the top bar when it exists.

The PNG at `og.png` is only the social/OG preview. The live view is always the SVG — do not swap it for a bitmap.
