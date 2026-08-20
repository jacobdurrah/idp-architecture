const DATA = window.IDP_DATA;
const SCENARIOS = window.IDP_SCENARIOS || [];
const PLANES = {
  ctrl:{label:"Control plane"}, data:{label:"Data plane"}, infra:{label:"Infrastructure"},
  obs:{label:"Observability"}, ppl:{label:"People"}, step:{label:"Golden path"},
  alert:{label:"Alerting"}, agent:{label:"Agent"}, stig:{label:"Stigmergic space"},
  metal:{label:"Metal"}, photon:{label:"Photons"}, edge:{label:"Edge"},
  story:{label:"Story"}, shape:{label:"Shape"}
};
let panel, panelBody, selbox;
const mq = window.matchMedia("(max-width: 979px)");
let current = "overview";
let activeStory = (SCENARIOS[0] && SCENARIOS[0].id) || "";
function escapeHtml(s) {
  return String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
function safeHref(h) {
  h = String(h || "");
  return /^[A-Za-z0-9._-]+\.html(#[A-Za-z0-9._-]+)?$/.test(h) ? h : "";
}
function findStory(id) {
  for (let i = 0; i < SCENARIOS.length; i++) if (SCENARIOS[i].id === id) return SCENARIOS[i];
}
function storyIdFor(id) {
  const item = DATA[id];
  if (item && item.story) return item.story;
  for (let i = 0; i < SCENARIOS.length; i++) {
    const s = SCENARIOS[i];
    if (s.id === id || (s.steps && s.steps.indexOf(id) >= 0)) return s.id;
  }
}
function qsa(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }
function paintBands() {
  qsa("[data-band]").forEach(function (g) {
    g.setAttribute("opacity", g.getAttribute("data-band") === activeStory ? "1" : "0.35");
  });
}
function paintSwitcher() {
  const box = document.getElementById("stories");
  if (!box) return;
  if (!box.childElementCount) {
    SCENARIOS.forEach(function (s) {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("data-story", s.id);
      b.textContent = s.n;
      b.addEventListener("click", function () { playStory(s.id); });
      box.appendChild(b);
    });
  }
  qsa("#stories [data-story]").forEach(function (b) {
    if (b.getAttribute("data-story") === activeStory) b.setAttribute("aria-current", "true");
    else b.removeAttribute("aria-current");
  });
}
function paintStepn() {
  const el = document.getElementById("stepn");
  const s = findStory(activeStory);
  if (!el) return;
  if (!s || !s.steps) { el.textContent = ""; return; }
  const i = s.steps.indexOf(current);
  el.textContent = i < 0 ? ("Step · of " + s.steps.length) : ("Step " + (i + 1) + " of " + s.steps.length);
}
function setStory(id, paint) {
  activeStory = id;
  if (paint !== false) { paintBands(); paintSwitcher(); }
}
function playStory(id) {
  setStory(id);
  const s = findStory(id);
  render(s && s.steps && s.steps[0] ? s.steps[0] : id);
}
function stepBy(dir) {
  const s = findStory(activeStory);
  if (!s || !s.steps || !s.steps.length) return;
  let i = s.steps.indexOf(current);
  if (i < 0) i = dir > 0 ? -1 : 0;
  const n = Math.max(0, Math.min(s.steps.length - 1, i + dir));
  render(s.steps[n]);
}
function render(id) {
  const item = DATA[id] || DATA.overview;
  current = DATA[id] ? id : "overview";
  const sid = storyIdFor(current);
  if (sid && sid !== activeStory) setStory(sid);
  const plane = PLANES[item.p] || PLANES.ctrl;
  const notes = (item.d || []).map(function (x) { return "<li>" + escapeHtml(x) + "</li>"; }).join("");
  let extra = "";
  if (item.shape) extra += "<h3>Shape</h3><p>" + escapeHtml(item.shape) + "</p>";
  if (item.shapeFrom || item.shapeTo) {
    extra += "<h3>From → To</h3><p>" + escapeHtml(item.shapeFrom || "") + " → " + escapeHtml(item.shapeTo || "") + "</p>";
  }
  const href = safeHref(item.seeHref);
  if (href) {
    const t = String(item.seeTab || "tab");
    const pretty = t === "v2" ? "v2" : t.charAt(0).toUpperCase() + t.slice(1);
    extra += "<h3>Open in " + escapeHtml(pretty) + "</h3><p><a href=\"" + href + "\">" +
      escapeHtml(pretty + (item.seeId ? " · " + item.seeId : "")) + "</a></p>";
  }
  let chips = '<span class="chip ' + item.p + '">' + escapeHtml(plane.label) + "</span>";
  if (item.story) {
    const sn = findStory(item.story);
    chips += ' <span class="chip story">' + escapeHtml(sn ? sn.n : item.story) + "</span>";
  }
  panelBody.innerHTML = chips + "<h2>" + escapeHtml(item.n) + "</h2>" +
    "<h3>What it does</h3><p>" + escapeHtml(item.w) + "</p>" +
    "<h3>Why it's needed</h3><p>" + escapeHtml(item.y) + "</p>" +
    (notes ? "<h3>Design notes</h3><ul>" + notes + "</ul>" : "") + extra;
  highlight(current);
  paintStepn();
  const want = "#" + current;
  if (location.hash !== want) history.replaceState(null, "", want);
  if (mq.matches) panel.classList.add("is-open");
}
function highlight(id) {
  if (!selbox) return;
  const hits = qsa("#hits [data-id='" + id + "']");
  if (!hits.length || id === "overview") { selbox.setAttribute("visibility", "hidden"); return; }
  let best = hits[0], bestA = Infinity;
  hits.forEach(function (h) {
    const b = h.getBBox();
    const a = Math.max(b.width, 1) * Math.max(b.height, 1);
    if (a < bestA) { best = h; bestA = a; }
  });
  const b = best.getBBox(), pad = 3;
  selbox.setAttribute("x", b.x - pad);
  selbox.setAttribute("y", b.y - pad);
  selbox.setAttribute("width", Math.max(b.width, 8) + pad * 2);
  selbox.setAttribute("height", Math.max(b.height, 8) + pad * 2);
  selbox.setAttribute("rx", "10");
  selbox.setAttribute("visibility", "visible");
}
function closePanel() {
  if (mq.matches) panel.classList.remove("is-open");
  else render("overview");
}
function smallestHit(evt) {
  const svg = document.getElementById("poster");
  const pt = svg.createSVGPoint();
  pt.x = evt.clientX; pt.y = evt.clientY;
  const ctm = svg.getScreenCTM();
  if (!ctm) return null;
  const loc = pt.matrixTransform(ctm.inverse());
  let best = null, bestA = Infinity;
  qsa("#hits [data-id]").forEach(function (h) {
    const b = h.getBBox();
    if (loc.x >= b.x && loc.y >= b.y && loc.x <= b.x + b.width && loc.y <= b.y + b.height) {
      const a = b.width * b.height;
      if (a < bestA) { best = h; bestA = a; }
    }
  });
  return best;
}
function bind() {
  panel = document.getElementById("panel");
  panelBody = document.getElementById("panel-body");
  selbox = document.getElementById("selbox");
  paintSwitcher();
  paintBands();
  document.getElementById("hits").addEventListener("click", function (evt) {
    const hit = smallestHit(evt) || evt.target.closest("[data-id]");
    if (!hit) return;
    evt.preventDefault();
    render(hit.getAttribute("data-id"));
  });
  document.getElementById("panel-close").addEventListener("click", closePanel);
  document.getElementById("prev").addEventListener("click", function () { stepBy(-1); });
  document.getElementById("next").addEventListener("click", function () { stepBy(1); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePanel();
    if (e.key === "ArrowRight") { e.preventDefault(); stepBy(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); stepBy(-1); }
  });
  document.getElementById("poster").addEventListener("click", function (evt) {
    if (evt.target.closest("#hits")) return;
    if (!mq.matches) render("overview");
  });
  const h = (location.hash || "").replace(/^#/, "");
  if (findStory(h)) playStory(h);
  else if (h && DATA[h]) { const s = storyIdFor(h); if (s) setStory(s); render(h); }
  else render("overview");
  if (mq.matches && current === "overview") panel.classList.remove("is-open");
}
const SVG_N = 5;
Promise.all(Array.from({length: SVG_N}, function (_, i) {
  return fetch("s-svg-" + i + ".txt").then(function (r) { return r.text(); });
})).then(function (parts) {
  document.getElementById("stage").insertAdjacentHTML("afterbegin", parts.join(""));
  bind();
});
