import re, os
ABOUT_FIG = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "p3_about_fig.html"), encoding="utf-8").read()
D = os.path.dirname(os.path.abspath(__file__))
L = open(D + "/tpl2.html", encoding="utf-8").read().split("\n")
def ln(a, b): return "\n".join(L[a - 1:b])          # 1-based inclusive
def rd(f): return open(D + "/" + f, encoding="utf-8").read()
def must(s, a, b):
    assert a in s, a[:70]; return s.replace(a, b, 1)

head = ln(1, 62)                                       # head, base CSS, hero + about CSS
head = must(head, "https://maps.app.goo.gl/nVp8P1cLb46zQmfo7", "https://maps.app.goo.gl/BrSWiB4urYfC66M5A")
head = must(head, '"sameAs":["https://www.instagram.com/burger.brewery/"]', '"sameAs":["https://www.instagram.com/burgerbrewery_official/"]')
head = must(head, '--sc-font-display', '--sc-font-display') if '--sc-font-display' in head else head
head = must(head, "<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">", "<!-- TODO: headings should use Farnham Display (licensed). It is not in the project, so Fraunces stands in via --sc-font-display. Add the .woff2 files and an @font-face, then swap the variable. -->\n<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">")
keep_taps_css = "\n".join(l for l in L if l.startswith((".bb-textlink", ".bb-alltaps")) or l == "/*CSS_TAPS*/")
assert keep_taps_css.count(".bb-textlink") == 1, keep_taps_css                           # .bb-textlink, .bb-alltaps, /*CSS_TAPS*/
rest_css = ln(137, 239)                                # together, room, menu, visit, sticky, placeholders, dialogs
rest_css = must(rest_css, ".bb-together h2 span { color: #D9541A; }", ".bb-together h2 span { color: var(--bb-ink-cream); text-decoration: underline; text-decoration-color: var(--bb-orange); text-decoration-thickness: .08em; text-underline-offset: .12em; }")
# menu grid without the craft column: originals | sliders | gelato, staying-in under sliders
rest_css = re.sub(r"@media \(min-width: 1001px\) \{\n  #cat-originals.*?\n\}\n", """@media (min-width: 1001px) {
  #cat-originals { grid-column: 1; grid-row: 1 / span 2; }
  #cat-sliders { grid-column: 2; grid-row: 1; } #cat-gelato { grid-column: 3; grid-row: 1 / span 2; }
  #cat-staying { grid-column: 2; grid-row: 2; }
}
""", rest_css, flags=re.S)
assert "#cat-craft" not in rest_css
HEAD_JS = '<script>(function(){var q=location.search,s=false;try{s=sessionStorage.getItem("bb-loaded")==="1"}catch(e){}if(/[?&]loader=1\\b/.test(q))s=false;else if(/[?&]qa\\b/.test(q))s=true;document.documentElement.classList.add(s?"bb-noload":"is-loading")})();</script>'
rm_css = """@media (prefers-reduced-motion: reduce) {
  .bb-plane { transition: none !important; }
  .bb-hero h1 .w > span, .bb-hero h1 .beer::after, .bb-hero__lede, .bb-trust, .bb-hero .bb-actions { animation: none !important; opacity: 1 !important; transform: none !important; }
  .bb-rate, .bb-star__fill, .bb-dt circle, .bb-an__layer, .bb-an__lines, .bb-sticky { transition: none !important; }
  .bb-dt img, .bb-dt__ph { animation: none !important; opacity: 1 !important; transform: none !important; }
  .bb-pair__stage .bb-pair__burger, .bb-pair__stage .bb-pair__beer, .bb-pair__stage .bb-heartx, .bb-pair__perfect, .bb-pair__result { animation: none !important; opacity: 1 !important; transform: none !important; }
}
</style>
""" + HEAD_JS + """
</head>
<body>
""" + rd("p3_loader.html") + """

<!--SYMBOLS-->
<!--HEADER-->
"""
index_nav = """
<nav class="bb-index" aria-label="Sections">
  <ol>
    <li><a href="#top" data-idx="top" aria-label="Hello"><span class="bb-index__tip" aria-hidden="true">Hello</span><svg viewBox="-6 -6 412 162" aria-hidden="true"><use href="#ly0"/></svg></a></li>
    <li><a href="#about" data-idx="about" aria-label="The bite, then the sip"><span class="bb-index__tip" aria-hidden="true">The bite, then the sip</span><svg viewBox="-4 -4 408 48" aria-hidden="true"><use href="#ly1"/></svg></a></li>
    <li><a href="#inside" data-idx="inside" aria-label="Taken apart"><span class="bb-index__tip" aria-hidden="true">Taken apart</span><svg viewBox="-4 -4 408 70" aria-hidden="true"><use href="#ly2"/></svg></a></li>
    <li><a href="#pairings" data-idx="pairings" aria-label="Burger heart beer"><span class="bb-index__tip" aria-hidden="true">Burger heart beer</span><svg viewBox="-4 -4 408 58" aria-hidden="true"><use href="#ly3"/></svg></a></li>
    <li><a href="#craft-on-tap" data-idx="craft-on-tap" aria-label="Craft on tap"><span class="bb-index__tip" aria-hidden="true">Craft on tap</span><svg viewBox="-4 -4 408 48" aria-hidden="true"><use href="#ly1"/></svg></a></li>
    <li><a href="#drops" data-idx="drops" aria-label="Drops"><span class="bb-index__tip" aria-hidden="true">Drops</span><svg viewBox="-4 -4 408 72" aria-hidden="true"><use href="#ly4"/></svg></a></li>
    <li><a href="#together" data-idx="together" aria-label="Do Together"><span class="bb-index__tip" aria-hidden="true">Do Together</span><svg viewBox="-4 -4 408 70" aria-hidden="true"><use href="#ly2"/></svg></a></li>
    <li><a href="#room" data-idx="room" aria-label="The room"><span class="bb-index__tip" aria-hidden="true">The room</span><svg viewBox="-4 -4 408 72" aria-hidden="true"><use href="#ly4"/></svg></a></li>
    <li><a href="#menu" data-idx="menu" aria-label="Menu"><span class="bb-index__tip" aria-hidden="true">Menu</span><svg viewBox="-6 -4 412 94" aria-hidden="true"><use href="#ly5"/></svg></a></li>
    <li><a href="#visit" data-idx="visit" aria-label="Visit and order"><span class="bb-index__tip" aria-hidden="true">Visit and order</span><svg viewBox="-4 -4 408 82" aria-hidden="true"><use href="#ly6"/></svg></a></li>
  </ol>
</nav>

<main>
"""
about = ln(290, 302)
about = re.sub(r'      <figure class="bb-photo" data-slot="bite-sip".*?</figure>', lambda _m: ABOUT_FIG, about, count=1, flags=re.S)
assert "bb-about__art" in about
togroom = ln(405, 434)
togroom = must(togroom, "      <!--SENSES-->\n", "")
# real photos from the Koramangala shoot (Drive): table spread, sliders at the pass, the room with the live kitchen
togroom = must(togroom, 'data-alt-prefer="Guests mid-laugh at a table of burgers and glasses" data-cap-prefer="Friday, mid-laugh"', 'data-alt-prefer="A table of smash burgers, chicken tenders and potato crisps with a cola and a beer, in front of the green booths" data-cap-prefer="A table, mid-order"')
togroom = must(togroom, 'data-alt-prefer="A forearm on the spatula, smashing a patty on the flat top" data-cap-prefer="The smash" data-chef', 'data-alt-prefer="A tray of sliders at the kitchen pass, under the It’s Hearty neon" data-cap-prefer="Sliders at the pass"')
togroom = must(togroom, 'data-cap-prefer="Sliders at the pass"', 'data-cap-prefer="Sliders at the pass" style="object-position:50% 66%"')
togroom = must(togroom, 'data-cap-prefer="A table, mid-order"', 'data-cap-prefer="A table, mid-order" style="object-position:50% 58%"')
togroom = must(togroom, 'data-alt-prefer="The booths during service" data-cap-prefer="The booths"', 'data-alt-prefer="The dining room, with the comic-panel mural, the booths and a chef at work in the live kitchen" data-cap-prefer="The live kitchen" style="object-position:50% 38%"')
menu = ln(435, 477)
menu = must(menu, '<a href="#cat-craft">Craft rotation</a>', "")
menu = must(menu, "        <!--P_CRAFT-->\n", "")
visit = ln(478, 516)
visit = re.sub(r'<img data-prefer="assets/img/delivery-box.jpg".*?alt="[^"]*">', '<img src="assets/photos/resp/delivery-hands-960.jpg" srcset="assets/photos/resp/delivery-hands-480.webp 480w, assets/photos/resp/delivery-hands-960.webp 960w, assets/photos/resp/delivery-hands-1500.webp 1500w" sizes="(max-width: 860px) 100vw, 50vw" width="1500" height="2000" loading="lazy" decoding="async" alt="Hands holding a Burger Brewery burger over a stack of our black and orange burger boxes">', visit, count=1, flags=re.S)
assert "delivery-hands" in visit
visit = must(visit, "https://maps.app.goo.gl/nVp8P1cLb46zQmfo7", "https://maps.app.goo.gl/BrSWiB4urYfC66M5A")
visit = re.sub(r"      <footer class=\"bb-foot\">.*?</footer>", "      <!--FOOTER-->", visit, flags=re.S)
tail_markup = ln(517, 523) + "\n" + rd("p3_dlg.html")
script_head = rd("p3_loader.js") + ln(524, 538)
js_keep1 = ln(539, 665)
js_keep1 = must(js_keep1, 'craft = document.getElementById("cat-craft")', 'craft = document.getElementById("drops-rnd")')
js_keep2 = ln(728, 787).replace("    d.addEventListener(\"cancel\", function (e) { e.preventDefault(); });\n    d.showModal();", "    d.addEventListener(\"cancel\", function (e) { e.preventDefault(); });\n    (window.BB_REVEAL || Promise.resolve()).then(function () { d.showModal(); });").replace("@burger.brewery", "@burgerbrewery_official")
js_keep3 = ln(864, 887)
loop = """
  function frame() {
    heroFrame(scrollY);
    if (near(AN)) anFrame();
    if (near(TAP)) tapFrame();\n    if (ART && near(ART)) artFrame();\n    if (ROT && near(ROT)) threadFrame();
    barFrame(); indexFrame();
    requestAnimationFrame(frame);
  }
  addEventListener("resize", layoutAN);
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(layoutAN);
  layoutAN(); anFrame(); tapFrame(); artFrame(); threadFrame();
  requestAnimationFrame(frame);
})();
</script>
</body>
</html>
"""
out = "\n".join([head, rd("p3_css.css"), keep_taps_css, rest_css, rm_css, index_nav, rd("p3_hero.html"), about, "", rd("p3_mid.html").replace("  <!-- 6 · DROPS", rd("p3_tap.html") + "  <!-- 6 · DROPS"),
                 togroom, menu, visit, tail_markup, script_head, js_keep1, js_keep2, rd("p3_js.js"), js_keep3, loop])
for bad in ["bb-receipt", "ticket", "rushFrame", "insideFrame", "bb-chip", "<!--RUSH-->", "/*CSS_RUSH*/", "/*CSS_INSIDE*/", "<!--SENSES-->"]:
    assert bad not in out, bad
open(D + "/tpl3.html", "w", encoding="utf-8").write(out)
print("tpl3", len(out))
