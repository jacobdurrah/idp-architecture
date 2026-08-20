const DATA = window.IDP_DATA;
const PLANES = {
  ctrl:  { label: "Control plane", color: "#185FA5" },
  data:  { label: "Data plane", color: "#0F6E56" },
  infra: { label: "Infrastructure", color: "#854F0B" },
  obs:   { label: "Observability", color: "#534AB7" },
  ppl:   { label: "People", color: "#5F5E5A" },
  step:  { label: "Golden path", color: "#0C447C" },
  alert: { label: "Alerting", color: "#A32D2D" },
  metal: { label: "Metal", color: "#3D3C38" },
  photon:{ label: "Photons", color: "#2A7AB0" },
  edge:  { label: "Edge", color: "#0F6E56" }
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

function serverDrillSvg() {
  return '<h3>Server to pod</h3>' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 292" width="100%" style="max-width:360px;margin:8px 0 12px">' +
    '<rect x="8" y="8" width="344" height="42" rx="6" fill="#F1F0EB" stroke="#3D3C38" stroke-width="1.4"/>' +
    '<text x="180" y="25" text-anchor="middle" font-size="12" font-weight="700" fill="#2C2C2A">Physical server</text>' +
    '<text x="180" y="40" text-anchor="middle" font-size="10" fill="#5F5E5A">NIC · CPUs · RAM · local NVMe</text>' +
    '<line x1="180" y1="50" x2="180" y2="62" stroke="#3D3C38" stroke-width="1.4"/>' +
    '<rect x="8" y="62" width="344" height="42" rx="6" fill="#F5F9FC" stroke="#378ADD" stroke-width="1.4"/>' +
    '<text x="180" y="79" text-anchor="middle" font-size="12" font-weight="700" fill="#185FA5">Hypervisor (KVM)</text>' +
    '<text x="180" y="94" text-anchor="middle" font-size="10" fill="#5F5E5A">vswitch vs SR-IOV · SmartNIC / DPU</text>' +
    '<line x1="180" y1="104" x2="180" y2="116" stroke="#185FA5" stroke-width="1.4"/>' +
    '<rect x="8" y="116" width="344" height="42" rx="6" fill="#F5F9FC" stroke="#378ADD" stroke-width="1.4"/>' +
    '<text x="180" y="133" text-anchor="middle" font-size="12" font-weight="700" fill="#185FA5">VM = Kubernetes node</text>' +
    '<text x="180" y="148" text-anchor="middle" font-size="10" fill="#5F5E5A">kubelet · runtime · CNI</text>' +
    '<line x1="180" y1="158" x2="180" y2="170" stroke="#0F6E56" stroke-width="1.4"/>' +
    '<rect x="8" y="170" width="344" height="42" rx="6" fill="#E8F5F0" stroke="#1D9E75" stroke-width="1.4"/>' +
    '<text x="180" y="187" text-anchor="middle" font-size="12" font-weight="700" fill="#0F6E56">Pod</text>' +
    '<text x="180" y="202" text-anchor="middle" font-size="10" fill="#5F5E5A">containers · namespaces + cgroups</text>' +
    '<line x1="180" y1="212" x2="180" y2="224" stroke="#0F6E56" stroke-width="1.4"/>' +
    '<rect x="8" y="224" width="344" height="42" rx="6" fill="#E8F5F0" stroke="#0F6E56" stroke-width="1.6"/>' +
    '<text x="180" y="241" text-anchor="middle" font-size="12" font-weight="700" fill="#0F6E56">newsfeed-service:v1827</text>' +
    '<text x="180" y="256" text-anchor="middle" font-size="10" fill="#5F5E5A">same artifact Golden path ships</text>' +
    '<text x="180" y="282" text-anchor="middle" font-size="10" fill="#5F5E5A">Worker node pool = these VMs on these slats</text>' +
    "</svg>";
}

function render(id) {
  const item = DATA[id] || DATA.overview;
  current = DATA[id] ? id : "overview";
  const plane = PLANES[item.p] || PLANES.ctrl;
  const notes = (item.d || []).map(function (x) {
    return "<li>" + escapeHtml(x) + "</li>";
  }).join("");
  let extra = "";
  if (item.medium) extra += "<h3>Medium</h3><p>" + escapeHtml(item.medium) + "</p>";
  if (item.speed) extra += "<h3>Speed</h3><p>" + escapeHtml(item.speed) + "</p>";
  if (item.latency) extra += "<h3>Latency</h3><p>" + escapeHtml(item.latency) + "</p>";
  if (item.bandwidth) extra += "<h3>Bandwidth</h3><p>" + escapeHtml(item.bandwidth) + "</p>";
  if (item.owner) extra += "<h3>Owner</h3><p>" + escapeHtml(item.owner) + "</p>";
  if (item.diagram === "server-drill" || current === "server" || current === "cpu-slat" || current === "gpu-slat") {
    extra += serverDrillSvg();
  }
  panelBody.innerHTML =
    '<span class="chip ' + item.p + '">' + escapeHtml(plane.label) + "</span>" +
    "<h2>" + escapeHtml(item.n) + "</h2>" +
    "<h3>What it does</h3><p>" + escapeHtml(item.w) + "</p>" +
    "<h3>Why it's needed</h3><p>" + escapeHtml(item.y) + "</p>" +
    (notes ? "<h3>Design notes</h3><ul>" + notes + "</ul>" : "") +
    extra;
  highlight(current);
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
    const a = Math.max(b.width, 1) * Math.max(b.height, 1);
    if (a < bestA) { best = h; bestA = a; }
  });
  const b = best.getBBox();
  const pad = 3;
  selbox.setAttribute("x", b.x - pad);
  selbox.setAttribute("y", b.y - pad);
  selbox.setAttribute("width", Math.max(b.width, 8) + pad * 2);
  selbox.setAttribute("height", Math.max(b.height, 8) + pad * 2);
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
    if (h.classList.contains("hit-edge")) return;
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
    const edge = evt.target.closest(".hit-edge");
    const hit = edge || smallestHit(evt) || evt.target.closest("[data-id]");
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

const SVG_N = 10;
Promise.all(Array.from({length: SVG_N}, function (_, i) {
  return fetch("m-svg-" + i + ".txt").then(function (r) { return r.text(); });
})).then(function (parts) {
  document.getElementById("stage").insertAdjacentHTML("afterbegin", parts.join(""));
  bind();
});
