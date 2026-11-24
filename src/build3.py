import json
import sys, re
src, outdir, tpl_index, tpl_deliv = sys.argv[1:5]
old = open(src, encoding="utf-8").read()

def between(a, b, start=0, inclusive_b=False):
    i = old.index(a, start)
    j = old.index(b, i + len(a))
    return old[i:(j + len(b)) if inclusive_b else j]

# ---------- reusable CSS from the round-1 page ----------
css_base  = between(":root {", "/* ---------- 1 · hero ---------- */")
css_base  = css_base.replace("@media (max-width: 1040px) {", "@media (max-width: 1320px) {", 1)
css_base += "\n.bb-nav__link { white-space: nowrap; }\n@media (min-width: 1321px) and (max-width: 1580px) { .bb-nav__link { padding: 0 .52rem; font-size: .92rem; } .bb-nav .bb-btn { margin-left: 2px; } .bb-bar { gap: var(--sc-3); } }\n"
css_taps  = "\n".join(l for l in between("/* ---------- 7 · beer: the tap ---------- */", "/* ---------- 7b").split("\n") if l.startswith(".bb-taps"))
css_tog   = between("/* ---------- 8 · do together ---------- */", "/* ---------- 9 · the room ---------- */")
css_menu  = between("/* ---------- 10 · menu rail ---------- */", "/* ---------- 11 · visit")
css_items = "\n".join(l for l in css_menu.split("\n") if re.match(r"^\.(bb-legend|bb-panel|bb-item|bb-tag|bb-diet)", l) or l.startswith("  box-shadow: 0 1px 0"))
css_visit = between("/* ---------- 11 · visit: the bottom bun ---------- */", "/* ---------- dialogs ---------- */")
css_dlg   = between("/* ---------- dialogs ---------- */", "@media (prefers-reduced-motion: reduce) {\n  .bb-plane")

# ---------- reusable HTML ----------
symbols  = between("<!-- the seven layers", "<header")
together = between("  <!-- 8 · DO TOGETHER -->", "  <!-- 9 · THE ROOM -->")
together = together.replace('src="assets/brand/stamp-do-together.png"', 'src="assets/brand/stamp-do-together.webp"')
together = together.replace('<img src="assets/photos/do-together-platter.jpg" width="1125" height="2000" loading="lazy"',
  '<img src="assets/photos/resp/do-together-platter-960.jpg" srcset="assets/photos/resp/do-together-platter-480.webp 480w, assets/photos/resp/do-together-platter-960.webp 960w" sizes="(max-width: 860px) 92vw, 40vw" width="960" height="1707" loading="lazy" decoding="async"')
taps    = between('<ul class="bb-taps">', "</ul>", inclusive_b=True)
dialogs = between("<!-- Franchise with Us -->", '<script src="scrollcraft.js">')
dialogs_noage = dialogs[:dialogs.index("<!-- Age gate -->")]
assert "dlg-team" in dialogs_noage and "dlg-age" not in dialogs_noage

def panel(name):
    i = old.index('<h3>' + name + '</h3>')
    a = old.rindex('<article', 0, i); b = old.index('</article>', i) + len('</article>')
    return old[a:b]
def strip_i(h): return re.sub(r' style="--i:\d"', '', h).replace('<article class="bb-panel"', '<article class="bb-panel bb-cat"')
p_orig   = strip_i(panel("BB Originals")).replace('<article class="bb-panel bb-cat">', '<article class="bb-panel bb-cat" id="cat-originals">', 1)
p_slider = strip_i(panel("Sliders &amp; snacks")).replace('<article class="bb-panel bb-cat">', '<article class="bb-panel bb-cat" id="cat-sliders">', 1)
p_gelato = strip_i(panel("Gelato")).replace('<article class="bb-panel bb-cat">', '<article class="bb-panel bb-cat" id="cat-gelato">', 1)
# Craft rotation moves out of the menu into the Drops section, renamed "In rotation now"
p_craft  = panel("Craft rotation")
p_craft  = re.sub(r'<p class="bb-panel__more">Two new burgers.*?</p>', '', p_craft, flags=re.S)
p_craft  = re.sub(r'<article class="bb-panel"[^>]*>', '<article class="bb-panel bb-drops__now" id="drops-now">', p_craft, count=1)
p_craft  = p_craft.replace("<h3>Craft rotation</h3>", "<h3>In rotation now</h3>")
for t in (p_orig, p_craft, p_slider, p_gelato): assert "bb-item" in t

# ---------- shared header and footer ----------
ICON_BURGER = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11a9 7 0 0 1 18 0z" fill="#F26624"/><rect x="2.5" y="12.5" width="19" height="3" rx="1.5" fill="currentColor"/><rect x="3" y="17" width="18" height="3.5" rx="1.75" fill="#F26624"/></svg>'
ICON_HEART  = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 3 4.5 6.7 4.5c2.2 0 3.6 1.2 5.3 3.2 1.7-2 3.1-3.2 5.3-3.2 3.7 0 5.8 3.8 4.3 7.2C19.5 16.4 12 21 12 21z" fill="#F26624"/></svg>'
ICON_PINT   = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h14l-1.6 18H6.6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M6.4 8h11.2l-1 11.6H7.4z" fill="#F26624"/></svg>'
ICON_IG = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.4" cy="6.6" r="1.3" fill="currentColor"/></svg>'
ICON_LI = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" fill="currentColor"/><path d="M7.2 10.2h2.3V17H7.2zM8.35 6.6a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6zM11 10.2h2.2v.95c.4-.7 1.3-1.15 2.3-1.15 2 0 2.6 1.25 2.6 3.1V17h-2.3v-3.4c0-.9-.2-1.6-1.1-1.6-1 0-1.4.7-1.4 1.7V17H11z" fill="var(--bb-black)"/></svg>'

def header(p):  # p = "" on index, "index.html" on other pages
    return f'''<header class="bb-bar">
  <a class="bb-logo" href="{p}#top" aria-label="Burger Brewery, back to the top"></a>
  <nav class="bb-nav" aria-label="Main">
    <button class="bb-burgerbtn" type="button" aria-expanded="false" aria-controls="bb-navlist" aria-label="Open navigation"><span></span><span></span><span></span></button>
    <ul id="bb-navlist">
      <li><a class="bb-nav__link" href="{p}#about">About Us</a></li>
      <li><a class="bb-nav__link" href="{p}#menu">Menu</a></li>
      <li><a class="bb-nav__link bb-nav__pair" href="{p}#pairings" data-open-pairs>Pairings <span class="bb-nav__trio" aria-hidden="true">{ICON_BURGER}{ICON_HEART}{ICON_PINT}</span></a></li>
      <li><a class="bb-nav__link" href="{p}#craft-on-tap">Craft on Tap</a></li>
      <li><a class="bb-nav__link" href="{p}#drops">Drops</a></li>
      <li><a class="bb-nav__link" href="team.html">Our Team</a></li>
      <li><a class="bb-nav__link" href="{p}#club">Loyalty Points</a></li>
      <li class="bb-loc">
        <button class="bb-nav__link" type="button" aria-expanded="false" aria-controls="loc-menu">Locations <span class="bb-loc__caret" aria-hidden="true"></span></button>
        <ul class="bb-loc__menu" id="loc-menu" hidden>
          <li><a href="{p}#visit">Bangalore <small>Koramangala 1st Block, dine in</small></a></li>
          <li><a href="delivery.html#mumbai">Mumbai <small>Delivery</small></a></li>
          <li><a href="delivery.html#delhi-ncr">Delhi NCR <small>Delivery</small></a></li>
        </ul>
      </li>
      <li><button class="bb-nav__link" type="button" data-open="dlg-franchise">Franchise with Us</button></li>
    </ul>
    <a class="bb-btn" data-link="bookingUrl" href="{p}#visit" target="_blank" rel="noopener">Book a table</a>
  </nav>
</header>'''

def footer(p):
    return f'''<footer class="bb-foot">
        <img class="bb-foot__mark" src="assets/brand/bb-stacked.png" width="353" height="500" alt="Burger Brewery" loading="lazy">
        <ul>
          <li><a href="about.html">Our Story</a></li>
          <li><button type="button" data-open="dlg-team">Join the Team</button></li>
          <li><button type="button" data-open="dlg-franchise">Franchise with Us</button></li>
          <li><a href="assets/burger-brewery-koramangala-menu.pdf" target="_blank" rel="noopener">Menu (PDF)</a></li>
        </ul>
        <div class="bb-social">
          <a class="bb-social__a" data-link="instagramUrl" href="https://www.instagram.com/burgerbrewery_official/" target="_blank" rel="noopener" aria-label="Burger Brewery on Instagram, @burgerbrewery_official">{ICON_IG}</a>
          <!-- TODO: set linkedinUrl in config/site.js. The LinkedIn icon stays hidden until then. -->
          <a class="bb-social__a" data-link="linkedinUrl" href="#" target="_blank" rel="noopener" aria-label="Burger Brewery on LinkedIn">{ICON_LI}</a>
        </div>
        <small>© 2026 Burger Brewery. Please drink responsibly.</small>
      </footer>'''

def fill(tpl, p):
    return (tpl.replace("/*CSS_BASE*/", css_base).replace("/*CSS_TAPS*/", css_taps).replace("/*CSS_TOG*/", css_tog)
               .replace("/*CSS_ITEMS*/", css_items).replace("/*CSS_VISIT*/", css_visit).replace("/*CSS_DLG*/", css_dlg)
               .replace("<!--SYMBOLS-->", symbols).replace("<!--HEADER-->", header(p)).replace("<!--FOOTER-->", footer(p))
               .replace("<!--TOGETHER-->", together).replace("<!--TAPS-->", taps)
               .replace("<!--P_ORIG-->", p_orig).replace("<!--P_CRAFT-->", p_craft).replace("<!--P_SLIDER-->", p_slider)
               .replace("<!--P_GELATO-->", p_gelato).replace("<!--DIALOGS-->", dialogs).replace("<!--DIALOGS_NOAGE-->", dialogs_noage))

FORMS_JS = '  /* ---------- franchise + team forms: saved to Supabase (enquiries) ---------- */\n  document.querySelectorAll("form[data-form]").forEach(function (f) {\n    f.addEventListener("submit", function (e) {\n      e.preventDefault();\n      var status = f.querySelector(".bb-form__status");\n      if (!f.checkValidity()) { f.reportValidity(); return; }\n      var g = function (n) { return f.elements[n] ? f.elements[n].value.trim() : ""; };\n      var row = { kind: f.getAttribute("data-form"), name: g("name"), phone: g("phone"), email: g("email"), city: g("city") || null, investment: g("investment") || null, role: g("role") || null, message: g("message") || null };\n      var first = row.name.split(" ")[0] || "there", btn = f.querySelector(\'[type="submit"]\');\n      if (!window.BB_SEND) { status.textContent = "This form isn’t available right now. Please message us on Instagram @burgerbrewery_official."; return; }\n      btn.disabled = true; status.textContent = "Sending…";\n      window.BB_SEND("enquiries", row).then(function () { status.textContent = "Thanks, " + first + ". We’ve received your details."; f.reset(); })\n        .catch(function () { status.textContent = "That didn’t go through. Check your connection and try again, or message us on Instagram @burgerbrewery_official."; })\n        .then(function () { btn.disabled = false; });\n    });\n  });\n'

LAZY_JS = '''<script>
/* below-the-fold SVG line art and video posters: fetched after page load, only when within ~1.5 screens, so the hero gets the bandwidth */
(function () {
  "use strict";
  var items = [].slice.call(document.querySelectorAll("image[data-href], video[data-poster]"));
  function go(el) {
    if (el.hasAttribute("data-href")) { el.setAttribute("href", el.getAttribute("data-href")); el.removeAttribute("data-href"); }
    if (el.hasAttribute("data-poster")) { el.setAttribute("poster", el.getAttribute("data-poster")); el.removeAttribute("data-poster"); }
  }
  if (!("IntersectionObserver" in window)) { items.forEach(go); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); (e.target.__lz || []).forEach(go); } });
  }, { rootMargin: "1500px 0px" });
  function arm() {
    items.forEach(function (el) {
      var t = el.ownerSVGElement || el;
      (t.__lz = t.__lz || []).push(el); io.observe(t);
    });
  }
  if (document.readyState === "complete") arm(); else addEventListener("load", arm);   // never competes with the hero or fonts
})();
</script>
'''

PAGES = {"ghee-roast-pull.html": ("How the BLR Ghee Roast Pull is made · Burger Brewery", "A short video of how the BLR Ghee Roast Pull is made at Burger Brewery.", "g-black", "p3_ghee.html"),
         "game.html": ("Burger vs Beer · Burger Brewery", "A little game from Burger Brewery.", "g-black", "p3_game.html"),
         "about.html": ("About Burger Brewery · Burger and craft beer restaurant in Bengaluru", "Burger Brewery is a burger and craft beer restaurant in Bengaluru. Every burger is built to be paired with a craft beer. Meet the founder and the story.", "g-cream", "p3_about.html"),
         "team.html": ("Our Team · Burger Brewery", "Meet the people behind Burger Brewery.", "g-cream", "p3_team.html"),
}
def page_tpl(out):
    t, dsc, cls, frag = PAGES[out]
    s = open("src/tplP.html", encoding="utf-8").read()
    if out in ("game.html", "ghee-roast-pull.html"): s = s.replace("<title>", '<meta name="robots" content="noindex, nofollow">\n<title>', 1)
    return (s.replace("/*TITLE*/", t).replace("/*DESC*/", dsc).replace("/*BODYCLS*/", cls)
             .replace("/*CSS_PAGES*/", open("src/p3_pagescss.css", encoding="utf-8").read())
             .replace("<!--MAIN-->", open("src/" + frag, encoding="utf-8").read())
             .replace("/*PAGE_JS*/", open("src/p3_pages.js", encoding="utf-8").read()))
import os as _os
_jobs = [(tpl_index, "index.html", ""), (tpl_deliv, "delivery.html", "index.html")] + [(None, k, "index.html") for k in PAGES]
for tplf, out, p in _jobs:
    if tplf is None:
        html = fill(page_tpl(out), p)
    else:
        html = fill(open(tplf, encoding="utf-8").read(), p)
    import hashlib
    _v = hashlib.md5(open("config/site.js", "rb").read()).hexdigest()[:8]
    html = html.replace('src="config/site.js"', 'src="config/site.js?v=%s"' % _v)
    # No prices anywhere on the site (they differ across India). The menu PDF is the only place prices live.
    html = re.sub(r'<span class="bb-item__price">[^<]*</span>', '', html)
    html = re.sub(r'<span class="bb-taps__price">[^<]*</span>', '', html)
    html = re.sub(r' <span>₹[^<]*</span></b>', '</b>', html)
    html = re.sub(r'<i>₹[^<]*</i>', '', html)
    html = html.replace(" Veg ₹720, non-veg ₹840.", "").replace("Sicilian pistachio, ₹210.", "Sicilian pistachio.")
    html = re.sub(r" ?Govt taxes as applicable; 10% discretionary service charge\.", "", html)
    if out == "index.html":
        html = html[:html.rindex("</body>")] + "<script>\n" + open("src/p3_clubjs.js", encoding="utf-8").read() + "</script>\n" + html[html.rindex("</body>"):]
    if out == "index.html":   # line art from the menu PDF at the foot of three menu panels
        for cid, src, w, h, cls in (("cat-originals", "clean-cut", 591, 429, "is-burger"), ("cat-sliders", "sliders-trio", 900, 419, "is-sliders"), ("cat-gelato", "gelato-sundae", 358, 570, "is-sundae")):
            i = html.index('id="%s"' % cid); j = html.index("</article>", i)
            fig = '<figure class="bb-menu__art %s" aria-hidden="true"><img src="assets/menuart/%s.webp" width="%d" height="%d" alt="" loading="lazy" decoding="async"></figure>' % (cls, src, w, h)
            html = html[:j] + fig + html[j:]
    # Lighthouse: lighter images, no 404 probes for optional assets that do not exist yet, 24px tap targets
    for n in ("room-booths", "room-chef", "room-friday-1"):
        html = html.replace("assets/img/%s.jpg" % n, "assets/img/%s.webp" % n)
    for n in ("burger-default", "beer-default"):
        html = html.replace("assets/pairing/%s.png" % n, "assets/pairing/%s.webp" % n)
    # Mobile speed (Lighthouse round 2, 2026-11-23): keep slow-4G bandwidth for the hero photo.
    # 1) an 800w hero so phones stop pulling the 960; 2) 11 KB logo mask instead of the 5211px PNG;
    # 3) below-the-fold SVG line art and video posters load only when near the viewport.
    html = html.replace("assets/photos/resp/live-kitchen-480.webp 480w, assets/photos/resp/live-kitchen-960.webp 960w",
                        "assets/photos/resp/live-kitchen-480.webp 480w, assets/photos/resp/live-kitchen-800.webp 800w, assets/photos/resp/live-kitchen-960.webp 960w")
    html = html.replace("assets/logo-horizontal.png", "assets/logo-mask.webp")
    html = re.sub(r'<image href="(assets/lineart/(?:tap-clear-960|kitchen-smash)\.webp)"', r'<image data-href="\1"', html)
    html = re.sub(r'(<video [^>]*?) poster="(assets/video/[^"]+)"', r'\1 data-poster="\2"', html)
    if out == "team.html":   # team cards are built from config; load it in <head> so the cards exist before first paint (CLS was 0.22)
        _tag = re.search(r'\n<script src="config/site\.js\?v=[0-9a-f]+"></script>', html)
        assert _tag, "team config tag not found"
        html = html[:_tag.start()] + html[_tag.end():]
        html = html.replace("</head>", _tag.group(0).strip() + "\n</head>", 1)
    if "data-href=" in html or "data-poster=" in html:
        html = html[:html.rindex("</body>")] + LAZY_JS + html[html.rindex("</body>"):]
    import os
    have = sorted(os.path.relpath(os.path.join(d, f), outdir).replace(os.sep, "/") for d, _, fs in os.walk(outdir + "/assets") for f in fs)
    html = html.replace("var probeCache", "var BB_HAVE = %s; var probeCache" % json.dumps(have), 1)
    html = html.replace("function probeImg(url) {\n", "function probeImg(url) {\n    return Promise.resolve(BB_HAVE.indexOf(url) >= 0);  // manifest answers; no eager download (Lighthouse: bandwidth stays with the hero)\n", 1)
    html = html.replace("function probeFile(url) {\n", "function probeFile(url) {\n    return Promise.resolve(BB_HAVE.indexOf(url) >= 0);\n", 1)
    assert "BB_HAVE.indexOf(url) >= 0" in html or out != "index.html", "probe patch missed"
    html = html.replace(".bb-index a { position: relative; display: block; width: 46px;", ".bb-index a { position: relative; display: block; width: 46px; min-height: 24px;", 1)
    # Forms save to Supabase. tpl2.html is sliced by fixed line numbers in mk3.py, so the handler is swapped here instead of edited there.
    if out == "index.html":
        _h = re.search(r'  /\* -+ forms: honest until a backend exists -+ \*/\n  var FORM_ENDPOINT = null;\n.*?\n    \}\);\n  \}\);\n', html, re.S)
        assert _h, "forms handler not found"
        html = html[:_h.start()] + FORMS_JS + html[_h.end():]
    body = re.sub(r"<dialog.*?</dialog>", "", html, flags=re.S)
    assert "₹" not in body, re.findall(r".{40}₹.{20}", body)[:5]
    left = re.findall(r"<!--[A-Z_]+-->|/\*CSS_[A-Z]+\*/", html)
    assert not left, (out, left)
    open(outdir + "/" + out, "w", encoding="utf-8").write(html)
    print("built", out, len(html))
