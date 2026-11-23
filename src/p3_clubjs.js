  /* ---------- Burger Brewery Club: from config/site.js (loyalty); reward values stay out of the page unless showRewardValues ---------- */
  (function () {
    var sec = document.getElementById("club"), L = window.BB_CONFIG && window.BB_CONFIG.loyalty;
    if (!sec || !L || !L.checkUrl || !(L.tiers || []).length) return;
    sec.querySelector("[data-club-link]").href = L.checkUrl;
    sec.querySelector("[data-club-earn]").textContent = "Every night at the table adds up. " + (L.earn || "") + ", and when you’ve saved enough, the next round is on us. Well, partly.";
    var ol = sec.querySelector("[data-club-ladder]");
    L.tiers.forEach(function (t) { var li = document.createElement("li"); li.innerHTML = t.points + "<small>PTS</small>" + (L.showRewardValues && t.off ? "<em class=\"bb-club__val\">= \u20B9" + t.off + " off</em>" : ""); ol.appendChild(li); });
    var ul = sec.querySelector("[data-club-terms]");
    (L.terms || []).forEach(function (t) { var li = document.createElement("li"); li.textContent = t; ul.appendChild(li); });
    sec.hidden = false;
  })();

