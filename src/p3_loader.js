
<script>
/* ---------- loader: real progress (hero still + fonts), never shorter than MIN, never longer than MAX; once per session ---------- */
(function () {
  "use strict";
  var root = document.documentElement, el = document.getElementById("bb-load");
  var reveal; window.BB_REVEAL = new Promise(function (r) { reveal = r; }); window.BB_REVEAL_AT = performance.now();
  function done() { root.classList.remove("is-loading"); window.BB_REVEAL_AT = performance.now(); reveal(); }
  if (!root.classList.contains("is-loading") || !el) { if (el) el.remove(); done(); return; }
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MIN = reduce ? 500 : 1700, MAX = 3200, t0 = performance.now(), title = document.title;
  var countEl = el.querySelector("[data-ld-count]"), statusEl = el.querySelector("[data-ld-status]");
  var layers = [].slice.call(el.querySelectorAll(".ld-l")), beer = el.querySelector(".ld-beer"), beerH = el.querySelector(".ld-beer-h"), foam = el.querySelector(".ld-foam");
  // what "loaded" means: the hero picture is decoded and the display fonts are in
  var jobs = 0, finished = 0;
  function track(p) { jobs++; Promise.resolve(p).catch(function () {}).then(function () { finished++; }); }
  var still = document.querySelector(".bb-hero__still");
  if (still) track(still.decode ? still.decode() : new Promise(function (r) { still.complete ? r() : still.addEventListener("load", r); }));
  if (document.fonts) track(document.fonts.ready);
  var shown = 0, ended = false, skip = false;
  function ease(t) { return 1 - Math.pow(1 - t, 2.2); }
  function paint(n) {
    countEl.textContent = n;
    document.title = n + "% · Burger Brewery";
    layers.forEach(function (l) { l.classList.toggle("is-on", n >= +l.getAttribute("data-at")); });
    var f = Math.max(0, Math.min(1, (n - 20) / 80)), top = 280 - f * 236; // glass interior 44..280
    beer.setAttribute("y", top.toFixed(1)); beer.setAttribute("height", (290 - top).toFixed(1));
    beerH.setAttribute("y", top.toFixed(1)); beerH.setAttribute("height", (290 - top).toFixed(1));
    foam.setAttribute("transform", "translate(0 " + (top - 4 - 18 * f).toFixed(1) + ")"); foam.style.opacity = f > 0.02 ? 1 : 0;
    statusEl.textContent = n < 60 ? "Stacking your burger" : n < 100 ? "Pouring your beer" : "It’s a match";
  }
  function tick() {
    if (ended) return;
    var t = performance.now() - t0, loaded = jobs === 0 || finished >= jobs;
    var target = Math.round(100 * ease(Math.min(1, t / MIN)));
    if (!loaded && t < MAX) target = Math.min(target, 92 + Math.round(6 * (finished / Math.max(1, jobs))));
    if (t >= MAX || skip) target = 100;
    if (target > shown) { shown = target; paint(shown); }
    if (shown >= 100) { finish(); return; }
    requestAnimationFrame(tick);
  }
  function finish() {
    ended = true; document.title = title;
    try { sessionStorage.setItem("bb-loaded", "1"); } catch (e) {}
    var q = skip || reduce ? 0.25 : 1;
    el.classList.add("is-match");                          // pint and burger meet
    setTimeout(function () {                              // heart stamps exactly where they meet
      var st = el.querySelector(".bb-load__stage").getBoundingClientRect(), pr = el.querySelector(".bb-load__pint").getBoundingClientRect(), br = el.querySelector(".bb-load__burger").getBoundingClientRect();
      var hb = el.querySelector(".bb-load__heart");
      hb.style.setProperty("--hx", ((pr.right + br.left) / 2 - st.left).toFixed(0) + "px");
      hb.style.setProperty("--hy", (pr.top + pr.height * 0.42 - st.top).toFixed(0) + "px");
      el.classList.add("is-stamp");
    }, 470 * q);
    setTimeout(function () { el.classList.add("is-open"); done(); }, 1050 * q);   // split along the heart; hero starts
    setTimeout(function () { el.remove(); }, 1050 * q + 900);
  }
  el.querySelector(".bb-load__skip").addEventListener("click", function () { skip = true; });
  paint(0); requestAnimationFrame(tick);
})();
</script>
