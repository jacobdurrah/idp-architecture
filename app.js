window.IDP_CONTENT = Object.assign(window.IDP_CONTENT || {}, {
  overview: {
    name: "How to read this map",
    plane: "both",
    kicker: "Overview",
    does: "This is the staff-review architecture of the internal developer platform. Follow the navy badges 1–12 left to right (commit → validate → build → reconcile → run), then down into observability. The colorful canvas is the source of truth; this drawer is the prose layer on top of it.",
    triggers: "A product engineer commits and opens a pull request. That is the only human trigger on the daily delivery path. Nobody runs a deploy job and nobody applies manifests to production from a laptop.",
    stores: "Desired application state lives in Git. Desired infrastructure lives in infra-terraform plus a remote state backend. Immutable images live in the artifact registry. Runtime state lives in the Kubernetes API.",
    talksTo: "Solid navy arrows are software delivery. Dashed teal is a different life cycle — platform engineers provisioning the cloud. Dotted rose is the learning loop: production talking back to the people who shipped 1–12.",
    extra: "<h3>Keyboard</h3><ul><li><strong>+ / −</strong> zoom · <strong>0</strong> fit · <strong>1–9</strong> jump to a numbered step</li><li>Arrow keys pan · click a box or a chip for the region</li></ul><p class=\"muted\">More pages (CI deep-dive, GitOps, observability) will attach here. Edit diagram.svg or the maps in app.js to iterate.</p>"
  }
});
