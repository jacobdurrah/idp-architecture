const DATA = window.IDP_DATA;
const PLANES = {
  ctrl:{label:"Control plane"}, data:{label:"Data plane"}, infra:{label:"Infrastructure"},
  obs:{label:"Observability"}, ppl:{label:"People"}, step:{label:"Golden path"},
  alert:{label:"Alerting"}, metal:{label:"Metal"}, photon:{label:"Photons"},
  edge:{label:"Edge"}
};
let panel, panelBody, selbox;
const mq = window.matchMedia("(max-width: 979px)");
let current = "overview";
function escapeHtml(s) {
  return String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}
function safeHref(h) {
  h = String(h || "");
  return /^[A-Za-z0-9._-]+\.html(#[A-Za-z0-9._-]+)?$/.test(h) ? h : "";
}
function render(id) {
  const item = DATA[id] || DATA.overview;
  current = DATA[id] ? id : "overview";
  const plane = PLANES[item.p] || PLANES.data;
  const notes = (item.d || []).map(function (x) { return "<li>" + escapeHtml(x) + "</li>"; }).join("");
  let extra = "";
  if (item.useWhen) extra += "<h3>When to use</h3><p>" + escapeHtml(item.useWhen) + "</p>";
  if (item.useNot) extra += "<h3>When not</h3><p>" + escapeHtml(item.useNot) + "</p>";
  if (item.look) extra += "<h3>What it looks like</h3><p>" + escapeHtml(item.look) + "</p>";
  const href = safeHref(item.seeHref);
  if (href) {
    const t = String(item.seeTab || "tab");
    const pretty = t === "v2" ? "v2" : t.charAt(0).toUpperCase() + t.slice(1);
    extra += "<h3>Open in " + escapeHtml(pretty) + "</h3><p><a href=\"" + href + "\">" +
      escapeHtml(pretty + (item.seeId ? " · " + item.seeId : "")) + "</a></p>";
  }
  panelBody.innerHTML =
    '<span class="chip ' + item.p + '">' + escapeHtml(plane.label) + "</span>" +
    "<h2>" + escapeHtml(item.n) + "</h2>" +
    "<h3>What it does</h3><p>" + escapeHtml(item.w) + "</p>" +
    "<h3>Why it's needed</h3><p>" + escapeHtml(item.y) + "</p>" +
    (notes ? "<h3>Design notes</h3><ul>" + notes + "</ul>" : "") + extra;
  highlight(current);
  const want = "#" + current;
  if (location.hash !== want) history.replaceState(null, "", want);
  if (mq.matches) panel.classList.add("is-open");
}
function highlight(id) {
  if (!selbox) return;
  const hits = Array.prototype.slice.call(document.querySelectorAll("#hits [data-id='" + id + "']"));
  if (!hits.length || id === "overview") {
    selbox.setAttribute("visibility", "hidden");
    return;
  }
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
  Array.prototype.slice.call(document.querySelectorAll("#hits [data-id]")).forEach(function (h) {
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
  document.getElementById("hits").addEventListener("click", function (evt) {
    const hit = smallestHit(evt) || evt.target.closest("[data-id]");
    if (!hit) return;
    evt.preventDefault();
    render(hit.getAttribute("data-id"));
  });
  document.getElementById("panel-close").addEventListener("click", closePanel);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closePanel();
  });
  document.getElementById("poster").addEventListener("click", function (evt) {
    if (evt.target.closest("#hits")) return;
    if (!mq.matches) render("overview");
  });
  window.addEventListener("hashchange", function () {
    const h = (location.hash || "").replace(/^#/, "");
    if (h && DATA[h]) render(h);
  });
  const hash = (location.hash || "").replace(/^#/, "");
  render(DATA[hash] ? hash : "overview");
  if (mq.matches && current === "overview") panel.classList.remove("is-open");
}
const SVG_N = 4;
Promise.all(Array.from({length: SVG_N}, function (_, i) {
  return fetch("p-svg-" + i + ".txt").then(function (r) { return r.text(); });
})).then(function (parts) {
  document.getElementById("stage").insertAdjacentHTML("afterbegin", parts.join(""));
  bind();
});
