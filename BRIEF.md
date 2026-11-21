# Burger Brewery: brief

**Self-authored under explicit creative delegation.** The owner answered "Use your judgment" to the eight interview questions on 2026-11-20. Facts come from the PRD (Burger Brewery Website PRD, Claude Docs) and the PMDIndia brand deck. Anything not in those sources is marked *authored*.

## Evidence (from the owner, the PRD and the deck)

- Gourmet burgers and small-batch craft beer on tap, from partner craft breweries (not brewed in-house). Gelato too.
- Everything made in-house: brioche buns, sauces, patty mix. Lettuce freshly cut; patties ground fresh, seared fresh, smashed.
- An upscale diner with a lively yet calm, cafe-like room. The clang of the spatula, the smash, music, the pour; umami, cheese, char, smoke.
- One outlet: Koramangala, Bangalore ([Maps](https://maps.app.goo.gl/nVp8P1cLb46zQmfo7)). Delivers across Bangalore, Delhi NCR and Mumbai. Bookings run on District. Zomato and Swiggy for delivery.
- Head bar must carry About Us, Menu, Franchise with Us, Join the Team, and a Book button.
- Brand: logo (horizontal and stacked), orange #F26624, black #231F20, cream #F2F2E9, Farnham Display for headings, Mulish for body, the "It's Hearty!" heart, heart line-work and icon patterns. Lines: "Fun on the outside. Gourmet on the inside." "Nurtured by Art. Served with Love." "Crisp, cold & made to flow."
- Menu and prices from the deck standee (to be confirmed by the owner).

## Assets

- **Usable:** logo marks and the heart, extracted from the deck as alpha masks.
- **Not usable:** the deck's burger, beer and menu photos are watermarked stock comps, overlapped by poster type. Shipping them would be a licensing problem.
- **No generation:** no kie.ai key was supplied. The world is therefore the brand's own flat graphic language (the deck's icon and pattern system), drawn as SVG. Each illustrated layer is a slot for real photography once a shoot exists.
- **Font substitute:** Farnham Display is a paid face with no web licence here, so Fraunces stands in for headings until the licence is bought. Mulish is the real body face.

## The eight topics (authored)

1. **Vibe:** retro-bold, warm, appetising, cheeky. References: a 1970s diner menu board; the cover art of a soul 7-inch single; a butcher's paper order ticket.
2. **Journey:** hello, the problem with most burgers, a breath, the burger taken apart, the pour, the room, the menu, come in.
3. **Energy:** loud open, louder argument, near silence, the peak, cool and crisp, warm and busy, browsing, settled.
4. **Feeling and the moment:** see the curve. The moment is the burger coming apart under your scroll.
5. **The one thing:** you take a burger apart with your scroll, and each layer tells you how it is made.
6. **Range:** retro and playful, pushed past premium-minimal, on the deck's own palette.
7. **World:** distinct scenes, stacked like layers of a burger. Not one unbroken world.
8. **Assets:** see above.

## Grammar: The Stack (a new grammar)

The page is built like a burger: every section is a layer with its own hard, painted ground in the brand palette (cream, black, orange). Nothing blends between layers.

- **Navigation:** the head bar the PRD requires, plus a **stack index** on the right edge: seven small burger layers, one per section, that drop into place as each section is reached. It is clickable and doubles as progress.
- **Sequence:** hard cuts between grounds; no gradient drift between layers.
- **Ending:** the bottom bun. A black base plate where the stack index completes, the heart says "It's Hearty!", and the visitor books.
- **Bans:** `drift`, `scrub` video, `spotlight`, `magnet`, scroll cues, section counters, centred copy in every act.

Why not the defined eight: filmic one-shot hides seams, and this brand's identity is made of hard-edged blocks. Chaptered editorial is too quiet for a retro-bold diner. Live surface needs software. Continuous world needs geography. Typographic poster would waste the burger, which is the subject. Gallery fits only the menu section. Split stage has no two sides. Rhythmic cutlist bans the pin that the peak needs.

## Feeling curve

```
1  Appetite     Hello: giant BURGER letterforms, a burger sitting in front of them, the heart in the foreground, all sliding at different depths
2  Tension      Story: black ground, the problem named line by line (bag, box, bottle), then "We make ours." in orange
3  Stillness    A breath: an almost-empty cream screen, one small line
4  Delight      Inside (the peak): the burger comes apart under the scroll, seven layers, each one explained
5  Refreshment  Beer: black ground, a glass fills from the bottom as you scroll
6  Warmth       Room: orange ground, the sounds and smells of the kitchen arriving line by line
7  Appetite     Menu: the standee, sideways, one category at a time  (distinct from 1: choosing, not craving)
8  Resolve      Visit: the base plate, the heart, Book a table
```

Act 7 also reads as appetite, which is a cousin of act 1, but the two are six acts apart and act 7 is choice rather than desire.

**Authored silence:** act 3 is deliberately near-empty. It is the breath before the peak, not dead scroll.

## The peak

> "you scroll and the burger just comes apart, and every layer tells you how they make it"

It lives in act 4 and gets the largest span on the page (4.2 viewport-heights), the most drawing work, and the silence of act 3 before it.

**Tell-someone sentence:** it's the site where you pull a burger apart with your scroll, and a little burger stacks itself on the side as you read.

## Signature move

The **stack index**: a miniature burger on the page edge that builds itself layer by layer as each section is reached, using the same seven layers the peak takes apart. Arriving at the close means having assembled the burger. It is bespoke page code, not an engine device.

## Score

| # | Act | Device | Span (vh) | Why this one |
|---|---|---|---|---|
| 1 | Hello | Layered hero, natural flow + page-local parallax | ~1.2 | Four planes at different depths establish the world before any argument |
| 2 | Story | `pin` + `kinetic` | 2.4 | An argument: the frame holds while the lines replace each other |
| 3 | Breath | `flow` | ~0.6 | Authored silence before the peak |
| 4 | Inside | `pin` + bespoke explode (peak) | 4.2 | The visitor's hand takes the burger apart |
| 5 | Beer | `reveal` | ~1.2 | A wipe upward is a glass filling: a change of state |
| 6 | Room | `flow` + `in` | ~1.2 | Lines arrive like sounds from the kitchen |
| 7 | Menu | `pan` | 3.0 | Lateral travel reads as choice |
| 8 | Visit | `pin` (close, holds) | 1.2 | The page stops and the base plate holds the action |

Families: parallax, pin, flow, reveal, pan (5). No family twice in a row. No scrub. Peak span is the largest by 1.2vh. Total about 15vh across 8 acts, outside the 6-to-7 acts at 13.6 to 13.8vh band.

## Layer contract (hero)

| Plane | Asset | Movement | Rule |
|---|---|---|---|
| Far | Concentric heart line-work (SVG) | Slowest, slight scale | Hairlines only, never under the copy |
| Mid | Giant stacked BURGER letterforms (logo mask) | Moderate, recedes upward | Occluded by the burger |
| Subject | Illustrated assembled burger | Rises and tilts | Shares a contact shadow; stays in front of the letters |
| Foreground | "It's Hearty!" heart badge | Fastest | Overlaps the burger's base; never covers the headline |
| Copy | h1, one line, two actions | 1x | Always readable; on phones it sits above the burger |

## Build notes (2026-11-20)

- **Real menu supplied mid-build:** `KML BBY001_MENU_21 Sept.pdf`, now `assets/burger-brewery-koramangala-menu.pdf`. It replaced the deck's comp menu and gave a real tap list (Mannheim, Toit, Red Rhino, Geist). Both the menu rail and the tap list now quote it.
- **Feel check (cold, desktop):** appetite, tension, stillness, delight, refreshment, warmth, browsing, settled. That matches the intended curve. The peak has the largest span (4.2vh) and the biggest visual change. The close holds with content.
- **Changed after review:** cards spaced evenly with angled leaders (they overlapped); line-work masked away from card text; end buttons moved under the cards; phone explorer uses short labels plus one detail panel; hero-only heart rules scoped.
- **Harness:** desktop, 390x844 and reduced motion all report no dead scroll and every cue at or above 4.5:1 at its worst frame. Contact sheets skipped (no full ffmpeg build).
- **Manual checks:** rail travel 1,648px (desktop) / 1,954px (390) / 1,818px (360); no horizontal page overflow; age gate opens, resists Escape, remembers 30 days; forms block empty submits and say plainly that nothing is sent; no personal data in URLs; dialogs close on Escape; menu PDF serves.
- **Not verified:** a real phone (iOS Safari), the live District/Zomato/Swiggy/LinkedIn destinations (placeholders), form delivery (no backend).

## Revision 2 (2026-11-20): owner direction after the Junk Burgers comparison

**New direction from the owner:** more impact in the problem beat, a fast-food rush beat, "We do things differently", a seven-layer section in the style of Junk Burgers, beer poured from a tap into the real "it's Hearty" glass, line art and realism like the menu, and the owner's own About Us copy ("burgers deserve beer").

**New assets:** 12 outlet launch photos (Drive zip, 2000px): combo, beer taps corner, Do Together platter, live kitchen, art corner, bar, booths, kitchen pass, storefront, door. Plus the owner's screenshots (hand-held burger, line-art board from the menu). Higgsfield is connected but the account has 0 credits and no trial allowance, so nothing was generated.

**New flow (11 scenes, about 22 viewport-heights):** hero with real photo in an arch frame · About Us cheers (line-art burger and "it's Hearty" glass draw themselves and clink) · "Most burgers are just assembled, right?" with an orange ring and an X · the rush (a kitchen-printer receipt, a 45-second countdown, a RUSHED stamp) · "We do things differently." on orange · seven layers, Junk-style numbered list with an ink-outlined burger that separates · craft on tap (the handle pulls, the stream pours, the glass fills and foams) · tap list beside the real taps photo · Do Together (platter photo, menu line art, flights) · the room (photo mosaic) · menu rail · split close (storefront: Book a table; burger: Order in).

**Over the length budget on purpose:** the skill's 8 to 14 viewport-height pacing budget is exceeded because the owner asked for each of these beats. The peak (seven layers) still has the largest span among the pinned scenes.

**Verified:** harness green on desktop, 390x844 and reduced motion (no dead scroll, every cue at or above 4.5:1). Functional checks re-run: age gate, forms (honest, no GET leak), dialogs, About Us anchor, menu PDF, rail overflow, no horizontal overflow.
**Not verified:** a real phone; Zomato, Swiggy and LinkedIn destinations (placeholders); form delivery (no backend).

## Revision 3 (2026-11-20): brand elements

Owner supplied `BrandElements/` (transparent PNGs) and two more photos. Used: hands-holding-burger cutout as the hero subject in front of the BURGER letterforms; the cheers restyled as orange line art to match the menu illustration; pop-art burger-and-beer sticker on the orange "differently" scene; the Do Together · BBY stamp (turning with scroll) on the platter photo; the engraved burger sketch heading the menu; the burger-under-neon photo for Order in; the combo photo moved into the room mosaic. Not used yet: BB stacked logo, Icons, stamp_2 (cream version), Burger_illustration, Do_Together poster (text baked in). Harness re-run green on desktop, phone and reduced motion; functional checks re-run.

## Revision 4 (2026-11-20): live kitchen hero, branded glass everywhere

- Hero is now the live kitchen photo (the "It's Hearty!" neon) with a left scrim for the copy, the hands-burger cutout in the foreground, the heart badge and steam doodles.
- Every glass is the Burger Brewery branded nonic pint: the pop-art scene is rebuilt from the sticker's burger (extracted with its own outline) plus the owner's branded-glass photo cut as a matching sticker, over a redrawn halftone burst; the line-art cheers glass and the tap-pour glass are redrawn as a nonic pint with the open-heart "it's Hearty" print.
- Brand elements placed: stacked BB logo (footer), cream BBY stamp (beer scene, turns with the pour), Do Together stamp (platter), plate line art and icon trio (About), engraved sketch (menu), pop-art burger (differently).
- Higgsfield still has 0 credits, so all compositing was done locally.

## Revision 5 (2026-11-20): real burger split, poster, no burger on the landing

- Hero: the hands-burger cutout and doodles removed; the live kitchen photo carries the landing alone with the heart badge.
- "What's inside" now splits a real burger: the owner's cheeseburger-under-the-neon photo, cut out of its background and sliced along its own seams into three layers (sesame brioche dome; cheese and smashed patty; brioche base with the drip). The slices share one frame, so stacked they read as the photo, and they separate on scroll. The list is now five rows that match this burger (bun, sauce, cheese, patty, base); lettuce and vegetables were dropped because this burger has none.
- Do Together poster (no baked text) is the Order in panel.

## Revision 6 (round 2 rebuild)
- Order: hero (video loop with still fallback), about, problem (printer, unchanged), inside (teardown + two tickets), pairings (picker), together, room, menu, visit/order. The ring "assembled" section, "We do things differently", the beer pin and the menu rail are gone.
- One graphic device: the kitchen receipt. Starbursts and line-art tap removed; BBY stamp used once.
- All unknown facts live in config/site.js; the page hides anything that depends on a null value.
- ?placeholders=1 shows every missing image as a labelled frame. Shot list in ASSETS_NEEDED.md.
- Height at 1440: 9,247px (was ~18,700).

## Revision 7 (round 3)
- Hero copy and load animation (word rise, "beer" sweep), Google rating 4.5 from GOOGLE_RATING, Do Together stamp ring.
- Printer, tickets and the room's sensory lines removed.
- Anatomy rebuilt as six numbered layers with callout lines; vertical-only split on one centre line.
- "Burger heart beer" pairing stage with the six pairings and why-lines from the menu's Burger x Beer page.
- New Drops section (Craft rotation moved out of the menu) with the BBY community form (DPDP consent).
- Nav: About Us, Menu, Pairings, Drops, Locations, Franchise with Us. New delivery.html. Footer gets Instagram (@burgerbrewery_official) and LinkedIn icons.
- DLF CyberHub note left out: owner confirmed Koramangala is the only outlet.

## Revision 8 (round 4)
- All prices removed from the site (they differ across India). Only the menu PDF carries prices. The Burger x Beer menu image was taken off the pairing section because it shows prices.
- New Craft on Tap section and nav item: drawn chrome tap pours into the it's Hearty pint as you scroll; the 8 taps appear one by one and the beer colour follows the beer in focus. Note: available only at the Bangalore outlet.
- Drops: "In rotation now" numbered cards (Junk-style) with cut-out SKU photos (BLR Ghee Roast Pull, Forbidden PBJ); Med Beet and Jam Session pending.
- Delivery imagery is burger + our boxes only (no beer): Order panel and delivery.html.
- The Room uses real shoot photos (table spread, sliders at the pass, the room with the live kitchen).

## Revision 9 (loader + menu art)
- Opening loader "Built for a beer": line-art burger stacks and the it's Hearty pint fills to a real 0-100, heart-with-X stamps, screen splits onto the hero. Once per session; `?loader=1` replays it.
- About: kitchen line art from menu page 2, drawn in on scroll. Drops: one line through the burgers into a ticking stopwatch.
- Craft on Tap now uses the engraved tap from menu page 5; the glass fills on scroll and tints to the beer in focus.
