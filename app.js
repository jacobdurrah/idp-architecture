/* IDP architecture map — viewport, regions, drawer.
   Iterate: REGIONS, STEPS, HITS in this file; prose in CONTENT below. */
(() => {
  "use strict";

  const WORLD = { w: 5600, h: 3360 };
  const MIN_ZOOM = 0.15;
  const MAX_ZOOM = 6;

  const REGIONS = {
    dev:       { x: 40,    y: 128,  w: 488,  h: 1360, label: "Developers" },
    git:       { x: 548,   y: 128,  w: 548,  h: 1360, label: "Git" },
    ci:        { x: 1116,  y: 128,  w: 920,  h: 498,  label: "CI" },
    tests:     { x: 1132,  y: 626,  w: 888,  h: 838,  label: "Tests" },
    registry:  { x: 2056,  y: 128,  w: 428,  h: 1360, label: "Registry" },
    argocd:    { x: 2504,  y: 128,  w: 780,  h: 1360, label: "Argo CD" },
    terraform: { x: 40,    y: 1564, w: 3244, h: 556,  label: "Terraform" },
    k8s:       { x: 3304,  y: 128,  w: 2256, h: 400,  label: "Kubernetes" },
    app:       { x: 3336,  y: 528,  w: 2192, h: 668,  label: "News Feed" },
    otel:      { x: 40,    y: 2144, w: 5520, h: 900,  label: "Observability" },
  };

  const CHIP_ORDER = ["dev", "git", "ci", "tests", "registry", "argocd", "terraform", "k8s", "app", "otel"];

  const STEPS = [
    { n: 1,  id: "step-1",  x: 40,    y: 168,  w: 500,  h: 420 },
    { n: 2,  id: "step-2",  x: 548,   y: 168,  w: 548,  h: 680 },
    { n: 3,  id: "step-3",  x: 548,   y: 850,  w: 548,  h: 180 },
    { n: 4,  id: "step-4",  x: 1116,  y: 210,  w: 920,  h: 400 },
    { n: 5,  id: "step-5",  x: 1116,  y: 610,  w: 920,  h: 500 },
    { n: 6,  id: "step-6",  x: 2056,  y: 160,  w: 428,  h: 190 },
    { n: 7,  id: "step-7",  x: 2056,  y: 330,  w: 428,  h: 380 },
    { n: 8,  id: "step-8",  x: 548,   y: 450,  w: 548,  h: 150 },
    { n: 9,  id: "step-9",  x: 2504,  y: 176,  w: 780,  h: 620 },
    { n: 10, id: "step-10", x: 3304,  y: 238,  w: 2260, h: 160 },
    { n: 11, id: "step-11", x: 3304,  y: 368,  w: 2260, h: 170 },
    { n: 12, id: "step-12", x: 40,    y: 2144, w: 5520, h: 420 },
  ];

  const HITS = [
    { id: "dev", x: 40, y: 128, w: 488, h: 56 },
    { id: "dev-a", x: 56, y: 184, w: 456, h: 78 },
    { id: "dev-b", x: 56, y: 272, w: 456, h: 78 },
    { id: "dev-c", x: 56, y: 360, w: 456, h: 78 },
    { id: "local-code", x: 56, y: 456, w: 456, h: 100 },
    { id: "toolchain", x: 56, y: 570, w: 456, h: 268 },
    { id: "who-triggers", x: 56, y: 1000, w: 456, h: 460 },
    { id: "git", x: 548, y: 128, w: 548, h: 56 },
    { id: "git-repos", x: 562, y: 178, w: 520, h: 40 },
    { id: "app-newsfeed", x: 576, y: 218, w: 492, h: 110 },
    { id: "app-users", x: 576, y: 342, w: 492, h: 110 },
    { id: "platform-gitops", x: 576, y: 466, w: 492, h: 110 },
    { id: "infra-terraform", x: 576, y: 590, w: 492, h: 110 },
    { id: "ci-pipelines", x: 576, y: 714, w: 492, h: 110 },
    { id: "pr-4821", x: 562, y: 874, w: 520, h: 130 },
    { id: "stored-in-git", x: 562, y: 1020, w: 520, h: 240 },
    { id: "ci", x: 1116, y: 128, w: 920, h: 56 },
    { id: "ci-gates", x: 1132, y: 232, w: 888, h: 380 },
    { id: "tests", x: 1132, y: 626, w: 888, h: 120 },
    { id: "test-scheduler", x: 1148, y: 660, w: 856, h: 70 },
    { id: "job-queue", x: 1148, y: 738, w: 856, h: 88 },
    { id: "test-workers", x: 1148, y: 850, w: 856, h: 90 },
    { id: "ephemeral-env", x: 1148, y: 950, w: 856, h: 70 },
    { id: "ci-results", x: 1148, y: 1036, w: 856, h: 80 },
    { id: "ci-duties", x: 1148, y: 1132, w: 856, h: 310 },
    { id: "build", x: 2072, y: 178, w: 396, h: 150 },
    { id: "registry", x: 2072, y: 348, w: 396, h: 340 },
    { id: "image-v1827", x: 2090, y: 430, w: 360, h: 90 },
    { id: "registry-store", x: 2072, y: 708, w: 396, h: 220 },
    { id: "promotion", x: 2072, y: 948, w: 396, h: 240 },
    { id: "registry-why", x: 2072, y: 1210, w: 396, h: 250 },
    { id: "argocd", x: 2536, y: 218, w: 716, h: 200 },
    { id: "argo-loop", x: 2536, y: 492, w: 716, h: 70 },
    { id: "arrow-of-record", x: 2536, y: 578, w: 716, h: 200 },
    { id: "admission", x: 2520, y: 814, w: 748, h: 110 },
    { id: "always-on", x: 2520, y: 942, w: 748, h: 518 },
    { id: "k8s", x: 3320, y: 238, w: 2224, h: 40 },
    { id: "api-server", x: 3336, y: 280, w: 360, h: 70 },
    { id: "scheduler", x: 3712, y: 280, w: 300, h: 70 },
    { id: "controller-mgr", x: 4028, y: 280, w: 340, h: 70 },
    { id: "hpa", x: 4384, y: 280, w: 260, h: 70 },
    { id: "cluster-autoscaler", x: 4660, y: 280, w: 260, h: 70 },
    { id: "workers", x: 3336, y: 384, w: 2190, h: 130 },
    { id: "app", x: 3336, y: 528, w: 2192, h: 40 },
    { id: "edge-path", x: 3352, y: 572, w: 2160, h: 56 },
    { id: "newsfeed-svc", x: 3352, y: 670, w: 456, h: 88 },
    { id: "user-svc", x: 3824, y: 670, w: 456, h: 88 },
    { id: "post-svc", x: 4296, y: 670, w: 456, h: 88 },
    { id: "reco-svc", x: 3352, y: 770, w: 456, h: 88 },
    { id: "media-svc", x: 3824, y: 770, w: 456, h: 88 },
    { id: "notify-svc", x: 4296, y: 770, w: 456, h: 88 },
    { id: "postgres", x: 4776, y: 670, w: 732, h: 62 },
    { id: "redis", x: 4776, y: 740, w: 732, h: 62 },
    { id: "kafka", x: 4776, y: 810, w: 732, h: 62 },
    { id: "object-store", x: 4776, y: 880, w: 732, h: 62 },
    { id: "search", x: 4776, y: 950, w: 732, h: 62 },
    { id: "autoscale-loop", x: 3352, y: 880, w: 1408, h: 280 },
    { id: "workload-path", x: 3352, y: 1216, w: 2160, h: 420 },
    { id: "terraform", x: 40, y: 1564, w: 3244, h: 56 },
    { id: "platform-eng", x: 56, y: 1620, w: 400, h: 130 },
    { id: "tf-engine", x: 480, y: 1620, w: 400, h: 130 },
    { id: "remote-state", x: 904, y: 1620, w: 420, h: 130 },
    { id: "cloud-apis", x: 1348, y: 1620, w: 400, h: 130 },
    { id: "cluster-ready", x: 1772, y: 1620, w: 1492, h: 130 },
    { id: "infra-caption", x: 56, y: 1838, w: 3208, h: 256 },
    { id: "otel", x: 40, y: 2144, w: 5520, h: 70 },
    { id: "otel-path", x: 64, y: 2218, w: 5488, h: 78 },
    { id: "otel-backends", x: 64, y: 2318, w: 5488, h: 160 },
    { id: "feedback", x: 64, y: 2498, w: 5488, h: 200 },
    { id: "telemetry-behavior", x: 88, y: 2712, w: 5440, h: 280 },
  ];

  const CONTENT = window.IDP_CONTENT || {};

  const el = {
    canvas: document.getElementById("canvas"),
    world: document.getElementById("world"),
    host: document.getElementById("svg-host"),
    hits: document.getElementById("hits"),
    highlight: document.getElementById("highlight"),
    chips: document.getElementById("chips"),
    rail: document.getElementById("rail"),
    hint: document.getElementById("hint"),
    drawer: document.getElementById("drawer"),
    drawerBody: document.getElementById("drawer-body"),
    drawerTitle: document.getElementById("drawer-title"),
    drawerKicker: document.getElementById("drawer-kicker"),
    drawerClose: document.getElementById("drawer-close"),
    scrim: document.getElementById("scrim"),
    zoomReadout: document.getElementById("zoom-readout"),
  };

  const view = { x: 0, y: 0, scale: 1, fitScale: 1 };
  let anim = null;
  let activeId = null;
  let hintTimer = null;

  function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

  function applyTransform() {
    el.world.style.transform = "translate(" + view.x + "px, " + view.y + "px) scale(" + view.scale + ")";
    const pct = Math.round(view.scale * 100);
    const nearFit = Math.abs(view.scale - view.fitScale) < 0.012;
    el.zoomReadout.textContent = nearFit ? "Fit" : pct + "%";
  }

  function canvasSize() {
    const r = el.canvas.getBoundingClientRect();
    return { w: r.width, h: r.height, left: r.left, top: r.top };
  }

  function computeFit() {
    const { w, h } = canvasSize();
    const pad = 28;
    return Math.max(MIN_ZOOM, Math.min((w - pad * 2) / WORLD.w, (h - pad * 2) / WORLD.h));
  }

  function fitTarget() {
    const { w, h } = canvasSize();
    const s = computeFit();
    return { x: (w - WORLD.w * s) / 2, y: (h - WORLD.h * s) / 2, scale: s };
  }

  function regionTarget(box, pad) {
    pad = pad == null ? 48 : pad;
    const { w, h } = canvasSize();
    const s = clamp(Math.min((w - pad * 2) / Math.max(box.w, 80), (h - pad * 2) / Math.max(box.h, 80)), MIN_ZOOM, MAX_ZOOM);
    return {
      x: w / 2 - (box.x + box.w / 2) * s,
      y: h / 2 - (box.y + box.h / 2) * s,
      scale: s,
    };
  }

  function animateTo(target, ms) {
    ms = ms || 480;
    if (anim) cancelAnimationFrame(anim.raf);
    const start = { x: view.x, y: view.y, scale: view.scale, t: performance.now() };
    const step = function (now) {
      const p = Math.min(1, (now - start.t) / ms);
      const e = 1 - Math.pow(1 - p, 3);
      view.x = start.x + (target.x - start.x) * e;
      view.y = start.y + (target.y - start.y) * e;
      view.scale = start.scale + (target.scale - start.scale) * e;
      applyTransform();
      if (p < 1) anim = { raf: requestAnimationFrame(step) };
      else anim = null;
    };
    anim = { raf: requestAnimationFrame(step) };
  }

  function zoomAt(cx, cy, factor) {
    const wx = (cx - view.x) / view.scale;
    const wy = (cy - view.y) / view.scale;
    const next = clamp(view.scale * factor, MIN_ZOOM, MAX_ZOOM);
    view.x = cx - wx * next;
    view.y = cy - wy * next;
    view.scale = next;
    applyTransform();
  }

  function hideHint() {
    el.hint.classList.add("is-gone");
    if (hintTimer) clearTimeout(hintTimer);
  }

  function setActive(id) {
    activeId = id;
    el.hits.querySelectorAll(".hit").forEach(function (n) {
      n.classList.toggle("is-active", n.dataset.id === id);
    });
    el.chips.querySelectorAll(".chip").forEach(function (n) {
      n.classList.toggle("is-active", n.dataset.id === id);
    });
    el.rail.querySelectorAll(".rail-btn").forEach(function (n) {
      n.classList.toggle("is-active", n.dataset.id === id);
    });
    const box = HITS.find(function (h) { return h.id === id; }) || REGIONS[id] || STEPS.find(function (s) { return s.id === id; });
    if (box) {
      el.highlight.hidden = false;
      el.highlight.style.left = box.x + "px";
      el.highlight.style.top = box.y + "px";
      el.highlight.style.width = box.w + "px";
      el.highlight.style.height = box.h + "px";
    } else {
      el.highlight.hidden = true;
    }
  }

  function planeLabel(plane) {
    if (plane === "control") return "Control plane";
    if (plane === "data") return "Data plane";
    return "Control + data";
  }

  function renderDrawer(id) {
    const c = CONTENT[id] || CONTENT.overview || {
      name: id,
      plane: "both",
      kicker: "Detail",
      does: "No copy yet for this box. Add a CONTENT entry in app.js.",
      triggers: "\u2014",
      stores: "\u2014",
      talksTo: "\u2014",
    };
    el.drawerTitle.textContent = c.name;
    el.drawerKicker.textContent = c.kicker || planeLabel(c.plane);
    el.drawerKicker.dataset.plane = c.plane || "";
    el.drawerBody.innerHTML =
      "<p>" + c.does + "</p>" +
      "<h3>Who triggers it</h3><p>" + c.triggers + "</p>" +
      "<h3>What it stores</h3><p>" + c.stores + "</p>" +
      "<h3>What it talks to</h3><p>" + c.talksTo + "</p>" +
      (c.extra || "");
  }

  function openDrawer(id) {
    renderDrawer(id);
    el.drawer.classList.add("is-open");
    el.drawer.setAttribute("aria-hidden", "false");
    el.scrim.hidden = false;
    el.scrim.classList.add("is-on");
    setActive(id);
  }

  function closeDrawer() {
    el.drawer.classList.remove("is-open");
    el.drawer.setAttribute("aria-hidden", "true");
    el.scrim.classList.remove("is-on");
    el.scrim.hidden = true;
    el.highlight.hidden = true;
    activeId = null;
    el.hits.querySelectorAll(".hit").forEach(function (n) { n.classList.remove("is-active"); });
    el.chips.querySelectorAll(".chip").forEach(function (n) { n.classList.remove("is-active"); });
    el.rail.querySelectorAll(".rail-btn").forEach(function (n) { n.classList.remove("is-active"); });
  }

  function jumpTo(box, id, pad) {
    hideHint();
    openDrawer(id);
    const go = function () { animateTo(regionTarget(box, pad)); };
    go();
    setTimeout(go, 240);
  }

  function buildChips() {
    CHIP_ORDER.forEach(function (id) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.dataset.id = id;
      b.textContent = REGIONS[id].label;
      b.addEventListener("click", function () { jumpTo(REGIONS[id], id); });
      el.chips.appendChild(b);
    });
  }

  function buildRail() {
    STEPS.forEach(function (s) {
      const li = document.createElement("li");
      const b = document.createElement("button");
      b.type = "button";
      b.className = "rail-btn";
      b.dataset.id = s.id;
      b.textContent = String(s.n);
      b.title = (CONTENT[s.id] && CONTENT[s.id].name) || ("Step " + s.n);
      b.addEventListener("click", function () { jumpTo(s, s.id); });
      li.appendChild(b);
      el.rail.appendChild(li);
    });
  }

  function buildHits() {
    HITS.forEach(function (h) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "hit";
      b.dataset.id = h.id;
      b.style.left = h.x + "px";
      b.style.top = h.y + "px";
      b.style.width = h.w + "px";
      b.style.height = h.h + "px";
      b.title = (CONTENT[h.id] && CONTENT[h.id].name) || h.id;
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        if (drag.moved) return;
        jumpTo(h, h.id, 140);
      });
      el.hits.appendChild(b);
    });
  }

  const drag = { on: false, moved: false, px: 0, py: 0, ox: 0, oy: 0 };
  const pinch = { on: false, d0: 0, s0: 1 };

  function touchList(e) {
    return e.touches ? Array.from(e.touches) : [e];
  }

  function dist(a, b) {
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  }

  function onPointerDown(e) {
    if (e.button != null && e.button !== 0) return;
    const pts = touchList(e);
    if (pts.length >= 2) {
      pinch.on = true;
      pinch.d0 = dist(pts[0], pts[1]) || 1;
      pinch.s0 = view.scale;
      drag.on = false;
      return;
    }
    drag.on = true;
    drag.moved = false;
    drag.px = pts[0].clientX;
    drag.py = pts[0].clientY;
    drag.ox = view.x;
    drag.oy = view.y;
    el.canvas.classList.add("is-panning");
    if (el.canvas.setPointerCapture && e.pointerId != null) {
      try { el.canvas.setPointerCapture(e.pointerId); } catch (err) {}
    }
  }

  function onPointerMove(e) {
    const pts = touchList(e);
    if (pinch.on && pts.length >= 2) {
      const d = dist(pts[0], pts[1]) || 1;
      const size = canvasSize();
      const cx = (pts[0].clientX + pts[1].clientX) / 2 - size.left;
      const cy = (pts[0].clientY + pts[1].clientY) / 2 - size.top;
      const next = clamp(pinch.s0 * (d / pinch.d0), MIN_ZOOM, MAX_ZOOM);
      const wx = (cx - view.x) / view.scale;
      const wy = (cy - view.y) / view.scale;
      view.scale = next;
      view.x = cx - wx * next;
      view.y = cy - wy * next;
      applyTransform();
      hideHint();
      return;
    }
    if (!drag.on) return;
    const p = pts[0];
    const dx = p.clientX - drag.px;
    const dy = p.clientY - drag.py;
    if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
    view.x = drag.ox + dx;
    view.y = drag.oy + dy;
    applyTransform();
    if (drag.moved) hideHint();
  }

  function onPointerUp() {
    drag.on = false;
    pinch.on = false;
    el.canvas.classList.remove("is-panning");
  }

  function onWheel(e) {
    e.preventDefault();
    hideHint();
    const size = canvasSize();
    const factor = Math.exp(-e.deltaY * (e.ctrlKey ? 0.02 : 0.0018));
    zoomAt(e.clientX - size.left, e.clientY - size.top, factor);
  }

  function bindViewport() {
    el.canvas.addEventListener("wheel", onWheel, { passive: false });
    el.canvas.addEventListener("pointerdown", onPointerDown);
    el.canvas.addEventListener("pointermove", onPointerMove);
    el.canvas.addEventListener("pointerup", onPointerUp);
    el.canvas.addEventListener("pointercancel", onPointerUp);
    el.canvas.addEventListener("lostpointercapture", onPointerUp);
    el.canvas.addEventListener("touchstart", onPointerDown, { passive: true });
    el.canvas.addEventListener("touchmove", function (e) { e.preventDefault(); onPointerMove(e); }, { passive: false });
    el.canvas.addEventListener("touchend", onPointerUp);
    el.canvas.addEventListener("dblclick", function (e) {
      const size = canvasSize();
      zoomAt(e.clientX - size.left, e.clientY - size.top, 1.6);
    });

    document.getElementById("zoom-in").addEventListener("click", function () {
      const size = canvasSize();
      zoomAt(size.w / 2, size.h / 2, 1.2);
      hideHint();
    });
    document.getElementById("zoom-out").addEventListener("click", function () {
      const size = canvasSize();
      zoomAt(size.w / 2, size.h / 2, 1 / 1.2);
      hideHint();
    });
    document.getElementById("zoom-fit").addEventListener("click", function () {
      view.fitScale = computeFit();
      animateTo(fitTarget());
      hideHint();
    });
    document.getElementById("zoom-100").addEventListener("click", function () {
      const size = canvasSize();
      animateTo({ x: size.w / 2 - WORLD.w * 0.5, y: size.h / 2 - WORLD.h * 0.5, scale: 1 });
      hideHint();
    });

    window.addEventListener("keydown", function (e) {
      if (e.target && /input|textarea/i.test(e.target.tagName)) return;
      const size = canvasSize();
      if (e.key === "+" || e.key === "=") { zoomAt(size.w / 2, size.h / 2, 1.15); hideHint(); }
      else if (e.key === "-" || e.key === "_") { zoomAt(size.w / 2, size.h / 2, 1 / 1.15); hideHint(); }
      else if (e.key === "0") { view.fitScale = computeFit(); animateTo(fitTarget()); hideHint(); }
      else if (e.key === "Escape") closeDrawer();
      else if (e.key === "ArrowLeft") { view.x += 80; applyTransform(); }
      else if (e.key === "ArrowRight") { view.x -= 80; applyTransform(); }
      else if (e.key === "ArrowUp") { view.y += 80; applyTransform(); }
      else if (e.key === "ArrowDown") { view.y -= 80; applyTransform(); }
      else if (/^[1-9]$/.test(e.key)) {
        const s = STEPS[Number(e.key) - 1];
        if (s) jumpTo(s, s.id);
      }
    });

    window.addEventListener("resize", function () {
      view.fitScale = computeFit();
      applyTransform();
    });

    el.drawerClose.addEventListener("click", closeDrawer);
    el.scrim.addEventListener("click", closeDrawer);
    var brand = document.querySelector(".brand");
    if (brand) {
      brand.style.cursor = "pointer";
      brand.title = "Overview";
      brand.addEventListener("click", function () {
        openDrawer("overview");
        el.highlight.hidden = true;
      });
    }
  }

  async function loadSvg() {
    try {
      const names = ["svg-head.svg", "svg-frag0.svg", "svg-frag1.svg", "svg-frag2.svg", "svg-frag3.svg", "svg-tail.svg"];
      const chunks = await Promise.all(names.map(function (n) {
        return fetch(n).then(function (r) {
          if (!r.ok) throw new Error(n + " " + r.status);
          return r.text();
        });
      }));
      el.host.innerHTML = chunks.join("");
    } catch (err) {
      try {
        const res = await fetch("diagram.svg");
        if (!res.ok) throw new Error(String(res.status));
        el.host.innerHTML = await res.text();
      } catch (err2) {
        el.host.innerHTML = '<object data="diagram.svg" type="image/svg+xml" width="5600" height="3360" aria-label="IDP architecture diagram"></object>';
      }
    }
    const svg = el.host.querySelector("svg");
    if (svg) {
      svg.setAttribute("width", "5600");
      svg.setAttribute("height", "3360");
      svg.style.display = "block";
    }
  }

  async function init() {
    buildChips();
    buildRail();
    buildHits();
    bindViewport();
    renderDrawer("overview");
    await loadSvg();
    view.fitScale = computeFit();
    const t = fitTarget();
    view.x = t.x;
    view.y = t.y;
    view.scale = t.scale;
    applyTransform();
    hintTimer = setTimeout(hideHint, 9000);
    el.canvas.focus({ preventScroll: true });
  }

  window.IDP_MAP = { REGIONS: REGIONS, STEPS: STEPS, HITS: HITS, jumpTo: jumpTo, openDrawer: openDrawer };
  init();
})();
