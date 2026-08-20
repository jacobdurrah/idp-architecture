window.IDP_renderLocations = function (item, esc) {
  var locs = item && item.locations;
  if (!locs || !locs.length) return "";
  function ok(h) {
    h = String(h || "");
    return /^https:\/\/[A-Za-z0-9._~:/?#\[\]@!$&'()*+,;=%-]+$/.test(h) ? h : "";
  }
  var html = "<h3>Example locations</h3>";
  html += "<style>.loc{margin:0 0 20px;padding:0 0 16px;border-bottom:1px solid #E5E3DC}.loc:last-child{border-bottom:0;margin:0;padding:0}.loc img{max-width:100%;height:auto;display:block;margin:0 0 8px;border-radius:6px}.loc .loc-n{font-weight:700;margin:0 0 2px}.loc .loc-meta{color:#5F5E5A;font-size:13px;margin:0 0 8px}.loc .loc-credit{color:#5F5E5A;font-size:12px;margin:8px 0 6px}</style>";
  locs.forEach(function (loc) {
    html += '<article class="loc">';
    if (loc.photo) {
      var src = String(loc.photo);
      if (/^https:\/\//.test(src) || /^[\w./-]+\.(jpg|jpeg|png|webp)$/i.test(src)) {
        html += '<img src="' + esc(src) + '" alt="' + esc(loc.n || "") + '" style="max-width:100%">';
      }
    }
    if (loc.n) html += '<p class="loc-n">' + esc(loc.n) + "</p>";
    if (loc.city || loc.addr) {
      html += '<p class="loc-meta">' + esc(loc.city || "") + (loc.city && loc.addr ? "<br>" : "") + esc(loc.addr || "") + "</p>";
    }
    if (loc.look) html += "<p>" + esc(loc.look) + "</p>";
    if (loc.whyHere) html += "<p>" + esc(loc.whyHere) + "</p>";
    if (loc.credit) html += '<p class="loc-credit">' + esc(loc.credit) + "</p>";
    if (loc.hrefs && loc.hrefs.length) {
      html += "<p>" + loc.hrefs.map(function (o) {
        if (!o || !o.n) return "";
        var h = ok(o.href);
        return h ? '<a href="' + h + '" target="_blank" rel="noopener">' + esc(o.n) + "</a>" : esc(o.n);
      }).filter(Boolean).join(" · ") + "</p>";
    }
    html += "</article>";
  });
  return html;
};
