/* guide-dock.js — IG-03: collapsible guide dock + postMessage protocol (§7.2).
   Plain script, no bundler. Fails silent so a blocked/offline iframe never
   breaks the posters (NFR-2). Origin-restricted messaging (NFR-4).
   idp-guide is deployed at https://idp-guide.vercel.app (2026-08-23). */
(function () {
  "use strict";
  try {
    if (!document.body) return;

    // --- Origin (config, not code — overridable per §6) ---
    const ORIGIN = window.IDP_GUIDE_ORIGIN || (location.hostname === "localhost" || location.hostname === "127.0.0.1" ? "http://localhost:3000" : "https://idp-guide.vercel.app");
    const ALLOWED = o => o === ORIGIN || /^http:\/\/localhost(:\d+)?$/.test(o) || /^http:\/\/127\.0\.0\.1(:\d+)?$/.test(o);

    // --- Tab identity, derived from the filename ---
    // Normalize for clean URLs (vercel.json cleanUrls, local `serve`): a path
    // ending in "/metal" is the same page as "metal.html".
    var seg = location.pathname.split("/").pop() || "";
    var file = seg === "" ? "index.html" : (/\.html?$/.test(seg) ? seg : seg + ".html");
    var TAB_OF = { "index.html": "map", "golden.html": "golden", "v2.html": "v2", "agents.html": "agents", "metal.html": "metal", "scenarios.html": "scenarios" };
    var FILE_OF = { map: "index.html", golden: "golden.html", v2: "v2.html", agents: "agents.html", metal: "metal.html", scenarios: "scenarios.html" };
    var tab = TAB_OF[file] || "map";
    var dark = document.body.classList.contains("idp-map") || file === "index.html";

    // --- Styles (minimal, injected; light-poster ink/muted palette) ---
    var css =
      '#idp-guide-dock{position:fixed;right:16px;bottom:16px;z-index:9999;width:380px;' +
      'max-width:calc(100vw - 32px);max-height:calc(100vh - 36px - 32px);display:flex;' +
      'flex-direction:column;overflow:hidden;border-radius:12px;background:#fff;' +
      'border:1px solid #E5E3DC;box-shadow:0 8px 30px rgba(44,44,42,0.18);' +
      'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}' +
      '#idp-guide-dock .idp-dock-bar{display:flex;align-items:center;justify-content:space-between;' +
      'height:36px;padding:0 6px 0 12px;background:#FAFAF7;border-bottom:1px solid #E5E3DC;' +
      'color:#2C2C2A;font-size:13px;font-weight:600}' +
      '#idp-guide-dock .idp-dock-title{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
      '#idp-guide-dock [data-idp-dock-toggle]{cursor:pointer;border:0;background:transparent;' +
      'color:#5F5E5A;font-size:18px;line-height:1;width:28px;height:28px;border-radius:6px;' +
      'display:flex;align-items:center;justify-content:center;flex:0 0 auto}' +
      '#idp-guide-dock [data-idp-dock-toggle]:hover{color:#2C2C2A;background:rgba(44,44,42,0.06)}' +
      '#idp-guide-dock iframe{border:0;width:100%;height:520px;max-height:56vh;display:block;background:#fff}' +
      '#idp-guide-dock.is-collapsed{width:auto}' +
      '#idp-guide-dock.is-collapsed iframe{display:none}' +
      '#idp-guide-dock.idp-dock-dark{background:#12151a;border-color:#2a3140}' +
      '#idp-guide-dock.idp-dock-dark .idp-dock-bar{background:#12151a;border-bottom-color:#2a3140;color:#e8edf4}' +
      '#idp-guide-dock.idp-dock-dark [data-idp-dock-toggle]{color:#8b93a1}' +
      '#idp-guide-dock.idp-dock-dark [data-idp-dock-toggle]:hover{color:#e8edf4;background:rgba(255,255,255,0.08)}' +
      '#idp-guide-dock.idp-dock-dark iframe{background:#12151a}' +
      '@media (max-width:640px){#idp-guide-dock{right:8px;bottom:8px;width:calc(100vw - 16px)}}';
    var style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    // --- Shell ---
    var dock = document.createElement("div");
    dock.id = "idp-guide-dock";
    if (dark) dock.classList.add("idp-dock-dark");

    var bar = document.createElement("div");
    bar.className = "idp-dock-bar";

    var title = document.createElement("span");
    title.className = "idp-dock-title";
    title.textContent = "Architecture guide";

    var toggle = document.createElement("button");
    toggle.type = "button";
    toggle.setAttribute("data-idp-dock-toggle", "");
    toggle.setAttribute("aria-label", "Toggle guide");

    var iframe = document.createElement("iframe");
    iframe.title = "Architecture guide";
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms");
    iframe.src = ORIGIN + "/";

    bar.appendChild(title);
    bar.appendChild(toggle);
    dock.appendChild(bar);
    dock.appendChild(iframe);
    document.body.appendChild(dock);

    // --- Collapse (persisted in localStorage) ---
    function applyCollapsed(c) {
      if (c) dock.classList.add("is-collapsed");
      else dock.classList.remove("is-collapsed");
      toggle.textContent = c ? "+" : "–";
      toggle.setAttribute("aria-expanded", c ? "false" : "true");
      try { localStorage.setItem("idp-guide-dock", c ? "collapsed" : "open"); } catch (e) {}
    }
    var stored = null;
    try { stored = localStorage.getItem("idp-guide-dock"); } catch (e) {}
    applyCollapsed(stored === "collapsed");
    toggle.addEventListener("click", function () {
      applyCollapsed(!dock.classList.contains("is-collapsed"));
    });

    // --- Outbound: idp.context (load, startup, every idp:render) ---
    function postContext(id) {
      try {
        var w = iframe.contentWindow;
        if (!w) return;
        w.postMessage({ type: "idp.context", tab: tab, id: id || "overview", href: location.href }, ORIGIN);
      } catch (e) {}
    }
    iframe.addEventListener("load", function () { postContext("overview"); });
    postContext("overview");
    window.addEventListener("idp:render", function (e) {
      postContext(e && e.detail && e.detail.id);
    });

    // --- Inbound: idp.open (same tab → render, else navigate) ---
    window.addEventListener("message", function (e) {
      try {
        if (!ALLOWED(e.origin)) return;
        var d = e.data;
        if (!d || d.type !== "idp.open") return;
        if (!d.id) return;
        if (d.tab === tab && typeof window.render === "function") {
          window.render(d.id);
        } else {
          var f = FILE_OF[d.tab] || file;
          location.assign(f + "#" + d.id);
        }
      } catch (err) {}
    });
  } catch (e) { /* fail silent: posters must work without the dock */ }
})();
