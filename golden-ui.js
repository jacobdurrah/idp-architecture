const DATA = window.IDP_DATA;
const TAB = "golden";
const PLANES = {
  ctrl:  { label: "Control plane", color: "#185FA5" },
  data:  { label: "Data plane", color: "#0F6E56" },
  infra: { label: "Infrastructure", color: "#854F0B" },
  obs:   { label: "Observability", color: "#534AB7" },
  ppl:   { label: "People", color: "#5F5E5A" },
  step:  { label: "Golden path", color: "#0C447C" },
  alert: { label: "Alerting", color: "#A32D2D" }
};

let panel, panelBody, selbox;
const mq = window.matchMedia("(max-width: 979px)");
let current = "overview";

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function render(id) {
  const item = DATA[id] || DATA.overview;
  current = DATA[id] ? id : "overview";
  const plane = PLANES[item.p] || PLANES.ctrl;
  const notes = (item.d || []).map(function (x) {
    return "<li>" + escapeHtml(x) + "</li>";
  }).join("");
  let extra = "";
  if (item.triggers) extra += "<h3>Triggers</h3><p>" + escapeHtml(item.triggers) + "</p>";
  if (item.stores) extra += "<h3>Stores</h3><p>" + escapeHtml(item.stores) + "</p>";
  if (item.talksTo) extra += "<h3>Talks to</h3><p>" + escapeHtml(item.talksTo) + "</p>";
  panelBody.innerHTML =
    '<span class="chip ' + item.p + '">' + escapeHtml(plane.label) + "</span>" +
    "<h2>" + escapeHtml(item.n) + "</h2>" +
    "<h3>What it does</h3><p>" + escapeHtml(item.w) + "</p>" +
    "<h3>Why it's needed</h3><p>" + escapeHtml(item.y) + "</p>" +
    (notes ? "<h3>Design notes</h3><ul>" + notes + "</ul>" : "") +
    extra +
    (window.IDP_productLinks ? window.IDP_productLinks(item, escapeHtml) : "");
  highlight(current);
  if (DATA[id]) history.replaceState(null, "", "#" + current);
  else history.replaceState(null, "", location.pathname);
  window.dispatchEvent(new CustomEvent("idp:render", { detail: { id: current, tab: TAB } }));
  if (mq.matches) panel.classList.add("is-open");
}

function highlight(id) {
  if (!selbox) return;
  const hits = Array.prototype.slice.call(document.querySelectorAll("#hits [data-id='" + id + "']"));
  if (!hits.length || id === "overview") {
    selbox.setAttribute("visibility", "hidden");
    return;
  }
  let best = hits[0];
  let bestA = Infinity;
  hits.forEach(function (h) {
    const b = h.getBBox();
    const a = b.width * b.height;
    if (a < bestA) { best = h; bestA = a; }
  });
  const b = best.getBBox();
  const pad = 3;
  selbox.setAttribute("x", b.x - pad);
  selbox.setAttribute("y", b.y - pad);
  selbox.setAttribute("width", b.width + pad * 2);
  selbox.setAttribute("height", b.height + pad * 2);
  selbox.setAttribute("rx", best.tagName === "circle" ? String((b.width + pad * 2) / 2) : "10");
  selbox.setAttribute("visibility", "visible");
}

function closePanel() {
  if (mq.matches) {
    panel.classList.remove("is-open");
  } else {
    render("overview");
  }
}

function smallestHit(evt) {
  const svg = document.getElementById("poster");
  const pt = svg.createSVGPoint();
  pt.x = evt.clientX;
  pt.y = evt.clientY;
  const ctm = svg.getScreenCTM();
  if (!ctm) return null;
  const loc = pt.matrixTransform(ctm.inverse());
  const hits = Array.prototype.slice.call(document.querySelectorAll("#hits [data-id]"));
  let best = null;
  let bestA = Infinity;
  hits.forEach(function (h) {
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
  render("overview");
  if (mq.matches) panel.classList.remove("is-open");
}


Promise.all([fetch("g-svg-0.txt").then(function(r){return r.text();}), fetch("g-svg-1.txt").then(function(r){return r.text();}), fetch("g-svg-2.txt").then(function(r){return r.text();}), fetch("g-svg-3.txt").then(function(r){return r.text();}), fetch("g-svg-4.txt").then(function(r){return r.text();}), fetch("g-svg-5.txt").then(function(r){return r.text();}), fetch("g-svg-6.txt").then(function(r){return r.text();})])
  .then(function (parts) {
    document.getElementById("stage").insertAdjacentHTML("afterbegin", parts.join(""));
    const hashId = location.hash.slice(1);
    bind();
    if (hashId && DATA[hashId]) render(hashId);
  });
