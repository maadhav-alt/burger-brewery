  /* ---------- Our Team: built from config/site.js (team), sorted A to Z; empty fields are not shown ---------- */
  (function () {
    var sec = document.getElementById("team"), list = sec && sec.querySelector("[data-team]");
    var team = (window.BB_CONFIG && window.BB_CONFIG.team) || [];
    if (!sec || !list || !team.length) return;
    function el(tag, cls, txt) { var n = document.createElement(tag); if (cls) n.className = cls; if (txt) n.textContent = txt; return n; }
    team.slice().sort(function (a, b) { return String(a.sort || a.name).localeCompare(String(b.sort || b.name)); }).forEach(function (m) {
      var li = el("li", "bb-member"), ph = el("div", "bb-member__ph");
      if (m.photo) { var img = document.createElement("img"); img.src = m.photo; img.alt = m.name + (m.role ? ", " + m.role : ""); img.width = 400; img.height = 400; img.loading = "lazy"; img.decoding = "async"; ph.appendChild(img); }
      else { ph.classList.add("is-mono"); var mo = el("span", "bb-member__mono", (m.name.replace(/^Chef\s+/i, "").charAt(0) || "").toUpperCase()); mo.setAttribute("aria-hidden", "true"); ph.appendChild(mo); }
      if (m.link) { var a = el("a", "bb-member__ring"); a.href = m.link; a.target = "_blank"; a.rel = "noopener"; a.setAttribute("aria-label", m.name + " on LinkedIn"); a.appendChild(ph); li.appendChild(a); } else { var r = el("div", "bb-member__ring"); r.appendChild(ph); li.appendChild(r); }
      if (m.line) li.appendChild(el("p", "bb-member__line", "\u201C" + m.line + "\u201D"));
      li.appendChild(el("h3", "", m.name));
      if (m.role) li.appendChild(el("p", "bb-member__role", m.role));
      if (m.area) li.appendChild(el("p", "bb-member__area", m.area));
      if (m.prev && m.prev.length) li.appendChild(el("p", "bb-member__prev", "Previously: " + m.prev.join(", ")));
      if (m.pairing) { var pr = el("p", "bb-member__pair"); pr.appendChild(el("span", "", "Goes with")); pr.appendChild(document.createTextNode(m.pairing)); li.appendChild(pr); }
      list.appendChild(li);
    });
    sec.hidden = false;
  })();
