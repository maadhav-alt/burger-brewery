
  /* ---------- hero: Google rating + Do Together stamp, each once, when in view and after the headline lands ---------- */
  var T0 = performance.now(), HEADLINE_MS = 1300;
  function onceInView(el, fn, delay) {
    if (!el) return;
    if (reduce || !("IntersectionObserver" in window)) { fn(); return; }
    var o = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return; o.disconnect();
      // timings count from the moment the loader opens onto the hero
      (window.BB_REVEAL || Promise.resolve()).then(function () { setTimeout(fn, Math.max(0, (delay || 0) - (performance.now() - (window.BB_REVEAL_AT || T0)))); });
    }, { threshold: 0.5 });
    o.observe(el);
  }
  (function () {
    var rate = document.querySelector("[data-rate]"), r = typeof GOOGLE_RATING === "number" ? GOOGLE_RATING : null;
    if (r === null) { rate.remove(); return; }
    rate.querySelector("[data-rate-score]").textContent = r.toFixed(1);
    rate.querySelector("[data-rate-sr]").textContent = "Rated " + r.toFixed(1) + " out of 5 on Google. ";
    var STAR = '<svg viewBox="0 0 24 24"><path class="{c}" d="M12 2.2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.4l-6.1 3.4 1.4-6.8L2.2 9.3l6.9-.8z"/></svg>';
    var stars = rate.querySelector("[data-stars]");
    for (var i = 0; i < 5; i++) {
      var f = Math.round(clamp(r - i, 0, 1) * 100);
      var s = document.createElement("span"); s.className = "bb-star"; s.style.setProperty("--i", i); s.style.setProperty("--f", f + "%");
      s.innerHTML = STAR.replace("{c}", "bg") + '<span class="bb-star__fill">' + STAR.replace("{c}", "fg") + "</span>";
      stars.appendChild(s);
    }
    onceInView(rate, function () { rate.classList.add("is-on"); }, HEADLINE_MS);
  })();
  onceInView(document.querySelector("[data-stamp]"), function () { document.querySelector("[data-stamp]").classList.add("is-on"); }, HEADLINE_MS + 250);

  /* ---------- 4 · anatomy ---------- */
  var AN = document.getElementById("inside"), anStage = AN.querySelector(".bb-an__stage"), anWrap = AN.querySelector(".bb-an__burgerwrap"), anBox = AN.querySelector(".bb-an__burger");
  var anRows = [].slice.call(AN.querySelectorAll(".bb-an__row")), anSvg = AN.querySelector(".bb-an__lines");
  var L = function (n) { return AN.querySelector('.bb-an__layer[data-n="' + n + '"]'); };
  var six = false, anG = {}, anSplit = false, anActive = -1;
  // six-layer mode only when all six files exist; otherwise the real 3-piece cut stands in
  Promise.all([1, 2, 3, 4, 5, 6].map(function (n) { return probeImg(L(n).getAttribute("data-prefer")); })).then(function (ok) {
    if (ok.every(Boolean)) {
      [1, 2, 3, 4, 5, 6].forEach(function (n) { var el = L(n); el.src = el.getAttribute("data-prefer"); el.hidden = false; });
      L("mid").hidden = true; six = true; layoutAN();
    } else if (PH) {
      [1, 2, 3, 4, 5, 6].forEach(function (n, i) { if (!ok[i]) { var d = document.createElement("div"); d.className = "bb-an__ph"; d.textContent = "PLACEHOLDER " + L(n).getAttribute("data-prefer"); d.setAttribute("data-ph-n", n); anBox.appendChild(d); } });
      layoutAN();
    }
  });
  function anPieces() { return six ? [1, 2, 3, 4, 5, 6] : [1, "mid", 6]; }
  function layoutAN() {
    var narrow = innerWidth < 861, ww = anWrap.clientWidth, wh = anWrap.clientHeight;
    var bw = Math.min(ww * (narrow ? 0.86 : 0.92), narrow ? 420 : 560), bh = bw * 586 / 676;
    var spread = Math.min(bh * (narrow ? 0.62 : 0.75), Math.max(0, wh - bh - 12));
    if (bh + spread > wh) { bh = Math.max(120, (wh - 12) / 1.6); bw = bh * 676 / 586; spread = wh - bh - 12; }
    anG = { bw: bw, bh: bh, spread: spread, narrow: narrow };
    anBox.style.width = bw + "px"; anBox.style.height = bh + "px";
    anBox.style.left = (ww - bw) / 2 + "px"; anBox.style.top = (wh - bh) / 2 + "px";
    applyAN();
  }
  function offsets() {
    var p = anPieces(), k = p.length, mid = (k - 1) / 2, step = anG.spread / Math.max(1, k - 1);
    var o = {}; p.forEach(function (n, i) { o[n] = anSplit ? (i - mid) * step : 0; }); return o;
  }
  function applyAN() {
    var o = offsets();
    anPieces().forEach(function (n) { L(n).style.transform = "translate3d(0," + o[n] + "px,0)"; });
    [].forEach.call(anBox.querySelectorAll(".bb-an__ph"), function (d) {
      var n = +d.getAttribute("data-ph-n"), y = (n - 3.5) * (anG.bh / 7) + (anSplit ? (n - 3.5) * anG.spread / 5 : 0);
      d.style.top = (anG.bh / 2 + y - anG.bh / 14) + "px"; d.style.height = (anG.bh / 7 - 4) + "px";
    });
    drawLines(o);
  }
  // anchor of each numbered row on the burger (y in burger-box px)
  function anchorY(r, o) {
    var bh = anG.bh;
    if (six) return bh * [0.22, 0.42, 0.5, 0.56, 0.64, 0.82][r - 1] + o[r];
    if (r === 1) return bh * 0.25 + o[1];
    if (r === 6) return bh * 0.8 + o[6];
    return bh * (0.42 + (r - 2) * 0.06) + o.mid;
  }
  function drawLines(o) {
    if (anG.narrow) { anSvg.innerHTML = ""; return; }
    var sr = anStage.getBoundingClientRect(), br = anBox.getBoundingClientRect(), d = "";
    anRows.forEach(function (row, i) {
      var num = row.querySelector(".bb-an__num").getBoundingClientRect();
      var ax = br.left - sr.left + anG.bw * 0.9, ay = br.top - sr.top + anchorY(i + 1, o);
      var lx = num.left - sr.left - 10, ly = num.top - sr.top + num.height / 2, kx = lx - 36;
      var on = i === anActive ? ' class="on"' : "";
      d += '<path' + on + ' d="M' + ax.toFixed(1) + " " + ay.toFixed(1) + " L" + kx.toFixed(1) + " " + ly.toFixed(1) + " L" + lx.toFixed(1) + " " + ly.toFixed(1) + '"/><circle cx="' + ax.toFixed(1) + '" cy="' + ay.toFixed(1) + '" r="3.5"/>';
    });
    anSvg.setAttribute("viewBox", "0 0 " + sr.width + " " + sr.height);
    anSvg.innerHTML = d;
  }
  function setSplit(v) { if (v === anSplit) return; anSplit = v; AN.classList.toggle("is-split", v); applyAN(); if (v) setTimeout(function () { drawLines(offsets()); }, 700); }
  function anFrame() {
    var r = AN.getBoundingClientRect(), vh = innerHeight;
    if (reduce) { setSplit(true); return; }
    if (anG.narrow) {
      var wr = anWrap.getBoundingClientRect();
      if (wr.top < vh * 0.55 && wr.bottom > 0) setSplit(true); else if (wr.top > vh * 0.85) setSplit(false);
      return;
    }
    if (r.top < vh * 0.3) setSplit(true); else if (r.top > vh * 0.6) setSplit(false);
    var t = Math.max(1, AN.offsetHeight - vh), p = clamp(-r.top / t, 0, 1);
    var a = anSplit && p > 0.08 ? clamp(Math.floor((p - 0.08) / 0.84 * anRows.length), 0, anRows.length - 1) : -1;
    if (a !== anActive) { anActive = a; anRows.forEach(function (row, i) { row.classList.toggle("is-active", a < 0 || i === a); }); drawLines(offsets()); }
  }
  anRows.forEach(function (row) { row.classList.add("is-active"); });

  /* ---------- 5 · burger heart beer ---------- */
  // Pairings and why-lines exactly as printed on the Burger x Beer page of the menu (assets/pairing/burger-x-beer-menu.png)
  var PAIRS = [
    { k: "pesto-paneer", burger: "Pesto Paneer", diet: "veg", beer: "Witbier", price: "720", desc: "Grilled pesto-marinated paneer steak, Cheddar, spicy mayo, onions, tomato, fresh pesto.", why: "Light wheat body & citrus notes lift the freshness of the pesto." },
    { k: "truffle-shroom", burger: "Truffle Shroom", diet: "veg", beer: "Stout / Doppelbock", price: "780", desc: "Crisp mushroom patty, creamy mushroom, truffle mayo & arugula.", why: "Stout deepens the mushroom & truffle umami. Doppelbock adds malty richness & a smooth finish." },
    { k: "nashville-hot-chicken", burger: "Nashville Hot Chicken", diet: "nonveg", beer: "Pilsner", price: "770", desc: "Nashville-style fried chicken, Cheddar, pickles, garlic aioli & slaw.", why: "Sharp crispness cuts through the Nashville heat." },
    { k: "jalapeno-smokehouse-smash", burger: "Jalapeño Smokehouse Smash", diet: "nonveg", beer: "Hefeweizen", price: "790", desc: "Smoked chicken smashed with jalapeño, chilli-cheddar sauce, pickles & BB Hot Sauce.", why: "Soft wheat body & gentle fruit notes cool the chilli, smoke & melted cheese." },
    { k: "oklahoma-smash", burger: "Oklahoma Smash", diet: "nonveg", beer: "Kolsch", price: "880", desc: "Smashed lamb or buff patty, thin onions, Cheddar, pickles, Chimichurri & BB Hot Sauce.", why: "Light fruitiness & a crisp finish balance charred onions & rich meat." },
    { k: "brewery-cheeseburger", burger: "The Brewery Cheeseburger", diet: "nonveg", beer: "Lager", price: "920", desc: "Lamb or buff patty, white onions, Cheddar, pickles and BB Hot Sauce.", why: "The classic burger-beer pairing. Cold, clean & easy." }
  ];
  var slug = function (s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); };
  (function () {
    var sec = document.getElementById("pairings"), grid = sec.querySelector("#pair-grid"), openBtn = sec.querySelector("[data-pairs-open]") || document.createElement("button");   // the button was removed: all burgers are offered from the start
    var stage = sec.querySelector(".bb-pair__stage"), bImg = stage.querySelector(".bb-pair__burger"), gImg = stage.querySelector(".bb-pair__beer");
    var res = sec.querySelector(".bb-pair__result"), current = null, busy = false, queued = null;
    PAIRS.forEach(function (p) {
      var b = document.createElement("button"); b.type = "button"; b.className = "bb-pb"; b.setAttribute("aria-pressed", "false"); b.dataset.k = p.k;
      b.innerHTML = '<i class="bb-diet bb-diet--' + p.diet + '" aria-hidden="true"></i><span>' + p.burger + '</span><span class="bb-vh">' + (p.diet === "veg" ? " (vegetarian)" : " (non-vegetarian)") + "</span>";
      b.addEventListener("click", function () {
        play(p.k);
        // on small screens the buttons push the stage below the fold: bring it into view so the match is seen
        var sr = stage.getBoundingClientRect();
        if (innerWidth < 861 && (sr.top > innerHeight * 0.55 || sr.bottom < 0)) stage.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
      });
      grid.appendChild(b);
    });
    function setImg(img, url, fallback) { probeImg(url).then(function (ok) { img.src = ok ? url : fallback; }); }
    function fill(p) {
      // TODO: per-burger cutouts in assets/pairing/burgers/<slug>.png and per-beer cutouts in assets/pairing/beers/<style>.png. Until then every pair uses the house burger and the it's Hearty pint.
      setImg(bImg, "assets/pairing/burgers/" + p.k + ".png", "assets/pairing/burger-default.png");
      setImg(gImg, "assets/pairing/beers/" + slug(p.beer.split(" / ")[0]) + ".png", "assets/pairing/beer-default.png");
      res.querySelector(".bb-pair__bn").textContent = p.burger;
      res.querySelector(".bb-pair__beername").textContent = "+ " + p.beer;
      res.querySelector(".bb-pair__desc").textContent = p.desc;
      res.querySelector(".bb-pair__why").textContent = p.why;
      grid.querySelectorAll(".bb-pb").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.k === p.k)); });
    }
    function play(k) {
      if (k === current && !busy) return;
      if (busy) { queued = k; return; }
      var p = PAIRS.filter(function (x) { return x.k === k; })[0]; if (!p) return;
      if (reduce) { current = k; fill(p); stage.classList.add("is-in"); return; }
      busy = true;
      var goIn = function () {
        fill(p); current = k;
        stage.classList.remove("is-out"); void stage.offsetWidth; stage.classList.add("is-in");
        setTimeout(function () { busy = false; if (queued && queued !== current) { var q = queued; queued = null; play(q); } else queued = null; }, 900);
      };
      if (stage.classList.contains("is-in")) { stage.classList.remove("is-in"); stage.classList.add("is-out"); setTimeout(goIn, 400); }
      else goIn();
    }
    function openGrid(focus) {
      grid.hidden = false; openBtn.setAttribute("aria-expanded", "true");
      if (!current) play("oklahoma-smash");
      if (focus) { var f = grid.querySelector('[aria-pressed="true"]') || grid.querySelector(".bb-pb"); f.focus({ preventScroll: true }); }
    }
    openBtn.addEventListener("click", function () { if (grid.hidden) openGrid(true); else { grid.hidden = true; openBtn.setAttribute("aria-expanded", "false"); } });
    document.querySelectorAll("[data-open-pairs]").forEach(function (a) { a.addEventListener("click", function () { openGrid(false); }); });
    if (location.hash === "#pairings") openGrid(false);
    // the default pair plays once when the stage first comes into view
    onceInView(stage, function () { if (!current) play("oklahoma-smash"); }, 0);
  })();

  /* ---------- clips (pairing + community): load and play muted while in view, pause when scrolled away; a visitor's own pause is respected ---------- */
  [].slice.call(document.querySelectorAll("video[data-src]")).forEach(function (v) {
    if (!("IntersectionObserver" in window)) return;
    var loaded = false, mine = false, userPaused = false;
    function load() { if (!loaded) { loaded = true; v.src = v.getAttribute("data-src"); } }
    v.addEventListener("pause", function () { if (!mine) userPaused = true; });
    new IntersectionObserver(function (es) {
      var e = es[0];
      if (e.isIntersecting) {
        load();
        if (!reduce && !userPaused && e.intersectionRatio > 0.5) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      } else if (!v.paused) { mine = true; v.pause(); mine = false; }
    }, { threshold: [0, 0.5], rootMargin: "300px 0px" }).observe(v);
  });

  /* ---------- nav: Locations menu ---------- */
  (function () {
    var btn = document.querySelector(".bb-loc > button"), menu = document.getElementById("loc-menu");
    if (!btn) return;
    function set(open) { btn.setAttribute("aria-expanded", String(open)); menu.hidden = !open; }
    btn.addEventListener("click", function (e) { e.stopPropagation(); set(menu.hidden); if (!menu.hidden) menu.querySelector("a").focus(); });
    document.addEventListener("click", function (e) { if (!menu.hidden && !menu.contains(e.target)) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) { set(false); btn.focus(); } });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { set(false); }); });
  })();

  /* ---------- Drops: BBY community form ---------- */
  (function () {
    var f = document.querySelector("form[data-community]"); if (!f) return;
    var done = document.querySelector("[data-community-done]");
    var rules = {
      name: function (v) { return v.trim().length >= 2 ? "" : "Enter your name."; },
      phone: function (v) { var d = v.replace(/[\s\-().]/g, ""); return /^(\+91|91|0)?[6-9]\d{9}$/.test(d) ? "" : "Enter a 10-digit Indian mobile number, like +91 98765 43210."; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Enter an email address like name@example.com."; },
      location: function (v) { return v ? "" : "Choose the city you’re in, or Other."; },
      consent: function (v, el) { return el.checked ? "" : "Tick the box so we can send you drop updates."; }
    };
    function check(el) {
      var msg = rules[el.name](el.value, el), err = document.getElementById(el.getAttribute("aria-describedby"));
      err.textContent = msg; if (msg) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
      return !msg;
    }
    Object.keys(rules).forEach(function (n) { var el = f.elements[n]; el.addEventListener(el.type === "checkbox" || el.tagName === "SELECT" ? "change" : "blur", function () { if (el.hasAttribute("aria-invalid")) check(el); }); });
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var bad = Object.keys(rules).map(function (n) { return check(f.elements[n]) ? null : f.elements[n]; }).filter(Boolean);
      if (bad.length) { bad[0].focus(); return; }
      var data = { name: f.elements.name.value.trim(), phone: f.elements.phone.value.replace(/[\s\-().]/g, ""), email: f.elements.email.value.trim(), location: f.elements.location.value, consent: true, consentText: f.querySelector(".bb-check span").textContent, at: new Date().toISOString() };
      var show = function (test) { f.hidden = true; done.hidden = false; done.querySelector("[data-community-test]").hidden = !test; done.focus(); };
      if (!window.BB_SEND) { show(true); return; }
      var sb = f.querySelector('[type="submit"]'); sb.disabled = true;
      var old = f.querySelector('p[role="alert"]'); if (old) old.remove();
      window.BB_SEND("community_signups", { name: data.name, phone: data.phone, email: data.email, location: data.location, consent: true, consent_text: data.consentText })
        .then(function () { show(false); })
        .catch(function () { var s = f.querySelector('[type="submit"]'); s.disabled = false; s.insertAdjacentHTML("afterend", '<p class="bb-field__err" role="alert">That didn’t go through. Check your connection and try again.</p>'); });
    });
  })();

  /* ---------- Craft on Tap: scroll pours the beer; the beer nearest the middle sets the colour ---------- */
  var TAP = document.getElementById("craft-on-tap"), tapSvg = TAP.querySelector(".bb-tap__svg"), tapList = TAP.querySelector(".bb-beers");
  var beers = [].slice.call(TAP.querySelectorAll(".bb-beer")), tLiq = TAP.querySelector(".tp-liqclip"), tStub = TAP.querySelector(".tp-stub"), tSurf = TAP.querySelector(".tp-surface"), tLever = TAP.querySelector(".tp-lever");
  var tapActive = -1, BOTTOM = 906, TOP = 528;
  beers.forEach(function (li) { li.style.setProperty("--c", li.dataset.beer); li.style.setProperty("--hi", li.dataset.hi); li.style.setProperty("--f", li.dataset.foam); });
  function setBeer(i) {
    if (i === tapActive || i < 0) return; tapActive = i;
    var li = beers[i]; tapSvg.style.setProperty("--beer", li.dataset.beer); tapSvg.style.setProperty("--beer-hi", li.dataset.hi); tapSvg.style.setProperty("--foam", li.dataset.foam);
    beers.forEach(function (b, k) { b.classList.toggle("is-active", k === i); });
  }
  function pourTo(fill) {
    fill = clamp(fill, 0, 1);
    var lvl = BOTTOM - fill * (BOTTOM - TOP);
    tLiq.setAttribute("y", lvl.toFixed(1)); tLiq.setAttribute("height", Math.max(0, BOTTOM - lvl + 2).toFixed(1));
    tStub.setAttribute("height", fill > 0.004 ? Math.max(0, lvl - 514).toFixed(1) : 0);
    tSurf.setAttribute("transform", "translate(0 " + lvl.toFixed(1) + ")"); tSurf.style.opacity = fill > 0.02 && fill < 0.985 ? 1 : 0;
  }
  function leverTo(pull) { tLever.style.transform = "rotate(" + (-20 * pull).toFixed(2) + "deg)"; }   // the hand pulls the handle toward you, holds while it pours, lets go at the end
  if ("IntersectionObserver" in window) {
    var bio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-seen"); bio.unobserve(e.target); } }); }, { rootMargin: "0px 0px -18% 0px" });
    beers.forEach(function (b) { bio.observe(b); });
  } else beers.forEach(function (b) { b.classList.add("is-seen"); });
  function tapFrame() {
    if (reduce) { pourTo(1); leverTo(0); beers.forEach(function (b) { b.classList.add("is-seen"); }); if (tapActive < 0) setBeer(0); return; }
    var r = tapList.getBoundingClientRect(), vh = innerHeight;
    var p = clamp((vh * 0.62 - r.top) / Math.max(1, r.height - vh * 0.25), 0, 1);
    pourTo(sm(p / 0.92));
    leverTo(sm(clamp(p / 0.07, 0, 1)) * (1 - sm(clamp((p - 0.95) / 0.045, 0, 1))));
    var mid = vh * 0.5, best = 0, bd = 1e9;
    beers.forEach(function (b, k) { var br = b.getBoundingClientRect(), d = Math.abs(br.top + br.height / 2 - mid); if (d < bd) { bd = d; best = k; } });
    setBeer(best);
  }
  setBeer(0); pourTo(0); leverTo(0);



  /* ---------- About: the menu line art draws itself in as the section scrolls into view ---------- */
  var ART = document.querySelector(".bb-about__art"), artStroke = ART && ART.querySelector(".bb-draw__stroke");
  function artFrame() {
    if (!ART) return;
    if (reduce) { artStroke.style.strokeDashoffset = 0; return; }
    var r = ART.getBoundingClientRect(), p = clamp((innerHeight * 0.95 - r.top) / (innerHeight * 0.75), 0, 1);
    artStroke.style.strokeDashoffset = (1 - sm(p)).toFixed(4);
  }

  /* ---------- Drops: one line from the heading, looping each burger, ending as a stopwatch that ticks ---------- */
  /* ---------- Craft rotation headline: the letters turn over like a rotating drum as the section arrives (scroll-linked), then stay turned ---------- */
  var ROT = document.getElementById("drops"), dropH = document.getElementById("drops-h"), dropLetters = [];
  (function () {
    if (!dropH) return;
    var txt = dropH.textContent; dropH.setAttribute("aria-label", txt); dropH.textContent = "";
    txt.split(" ").forEach(function (word, wi, arr) {
      var w = document.createElement("span"); w.className = "rot-w"; w.setAttribute("aria-hidden", "true");
      word.split("").forEach(function (ch) { var l = document.createElement("span"); l.className = "rot-l"; l.textContent = ch; w.appendChild(l); dropLetters.push(l); });
      dropH.appendChild(w); if (wi < arr.length - 1) dropH.appendChild(document.createTextNode(" "));
    });
  })();
  function threadFrame() {
    if (!dropLetters.length) return;
    var p = 1;
    if (!reduce) { var r = dropH.getBoundingClientRect(); p = clamp((innerHeight * 0.9 - r.top) / (innerHeight * 0.5), 0, 1); }
    var n = dropLetters.length;
    dropLetters.forEach(function (l, i) {
      var q = clamp(p * (n + 6) - i, 0, 6) / 6, e = 1 - Math.pow(1 - q, 3);
      l.style.transform = "rotateX(" + ((1 - e) * -105).toFixed(1) + "deg) translateY(" + ((1 - e) * 0.3).toFixed(3) + "em)";
      l.style.opacity = Math.min(1, e * 1.6).toFixed(3);
    });
  }
