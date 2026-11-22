# Burger Brewery: assets needed

Shot list for the round 2 site. Drop each file in at the exact path below and reload. Nothing else needs to change.
Until a file exists, the page either falls back to an existing photo or hides the slot.
Open `http://localhost:4500/?placeholders=1` to see every missing slot as a grey frame labelled with its filename.

Style for every photo: real service at Koramangala, warm practical light (the neon and bar lamps), shallow depth of field, no studio sweep, no stock. People shown naturally, faces optional.

| # | File | Section | Shot | Size / format | If missing |
|---|------|---------|------|---------------|------------|
| 1 | `assets/video/hero-loop.mp4` + `assets/video/hero-loop.webm` | Hero | 6 to 10 s seamless loop: the flat top, a patty smashed, cheese laid on, steam, the neon behind. No faces needed. Muted. | 1920x1080, H.264 MP4 under 4 MB, VP9 WebM under 3 MB | Still photo (live kitchen) |
| 2 | `assets/img/hero-poster.jpg` | Hero | First frame of the loop, exported as a still | 1920x1080 JPG | `live-kitchen` photo |
| 3 | `assets/img/bite-sip.jpg` | About | One hand holding a smash burger mid-bite, the other on a cold it's Hearty pint | 1200x1500 (4:5) | Slot hidden, text goes full width |
| 4 | `assets/img/burger-top.png` | Teardown | Top bun only, cut out on transparent background | 676x586, PNG with alpha, all 5 slices in one shared frame | 3-slice cut from the existing photo |
| 5 | `assets/img/burger-sauce.png` | Teardown | Sauce layer only, same frame and angle as #4 | as #4 | as #4 |
| 6 | `assets/img/burger-cheese.png` | Teardown | Melted cheese only | as #4 | as #4 |
| 7 | `assets/img/burger-patty.png` | Teardown | Smashed patty with lace edges | as #4 | as #4 |
| 8 | `assets/img/burger-base.png` | Teardown | Bottom bun | as #4 | as #4 |
| 9 | `assets/img/pairings/hop-express.jpg` | Pairing picker | Hop Express next to a pour of New England IPA | 960x1200 (4:5) | Burger and pint photo |
| 10 | `assets/img/pairings/truffle-shroom.jpg` | Pairing picker | Truffle Shroom + Nitro Stout | 960x1200 | as #9 |
| 11 | `assets/img/pairings/pesto-paneer.jpg` | Pairing picker | Pesto Paneer + Witty Wit | 960x1200 | as #9 |
| 12 | `assets/img/pairings/nashville-hot-chicken.jpg` | Pairing picker | Nashville Hot Chicken + Pilsner | 960x1200 | as #9 |
| 13 | `assets/img/pairings/jalapeno-smokehouse-smash.jpg` | Pairing picker | Jalapeño Smokehouse Smash + Soul Surfer | 960x1200 | as #9 |
| 14 | `assets/img/pairings/brewery-cheeseburger.jpg` | Pairing picker | Brewery Cheeseburger + Banger Lager | 960x1200 | as #9 |
| 15 | `assets/img/room-friday-1.jpg` | The room (large tile) | A full table on a Friday night, mid-laugh, burgers and glasses down | 1600x1200 | Counter under the neon |
| 16 | `assets/img/room-chef.jpg` | The room | Forearm and spatula smashing a patty on the flat top. If `chefName` is set, the caption reads "Smashed by <name>." | 1200x1200 | Burger and pint photo |
| 17 | `assets/img/room-bar.jpg` | The room | Bartender sliding a taster tray across the bar | 1200x900 | Taps corner |
| 18 | `assets/img/room-booths.jpg` | The room (wide tile) | The booths during service, people in them | 2000x900 | Empty bar and booths |
| 19 | `assets/img/dishes/hop-express.jpg` | Menu "Start here" | Top-down on a plain table | 800x800 (1:1) | Card hidden |
| 20 | `assets/img/dishes/forbidden-pbj.jpg` | Menu "Start here" | Top-down | 800x800 | Card hidden |
| 21 | `assets/img/dishes/brewery-cheeseburger.jpg` | Menu "Start here" | Top-down | 800x800 | Card hidden |
| 22 | `assets/img/dishes/bb-dirty-fries.jpg` | Menu "Start here" | Top-down | 800x800 | Card hidden |
| 23 | `assets/img/dishes/dubai-kunafa-shake.jpg` | Menu "Start here" | Side-on, glass on the bar | 800x800 | Card hidden. The whole row hides if fewer than 3 dish photos exist |
| 24 | `assets/img/delivery-box.jpg` | Order in | A Burger Brewery delivery box, opened, food inside | 1600x1600 | Burger and pint photo |
| 25 | `assets/img/rnd/<slug>.jpg` (x2) | Menu R&D vote | Each R&D burger. Paths are set in `config/site.js` under `rnd` | 800x800 | Tile shows name only. Whole card hidden while `rnd` is empty |

## Facts still needed (config/site.js)

These are not images, but the page hides the elements below until they are filled in:

- `hours`: visit line, sticky booking bar
- `cookTimeMinutes`: TIME line on our ticket
- `bunBakeTime`: BUN line on our ticket
- `chefName`: room-chef caption
- `googleRating`, `reviews`: proof strip under the room
- `rnd`: R&D vote card
- `zomatoUrl`, `swiggyUrl`: every Zomato and Swiggy button
- `linkedinUrl`: footer LinkedIn link
- `deliveryCities`: verify the list (currently Bangalore, Delhi NCR, Mumbai)

## Optimising new photos

Keep the original, and add WebP versions at 480, 960 and 1600 px wide next to it. The existing set is in `assets/photos/resp/` for reference.

## Round 3 additions

| File | Section | What | If missing |
|------|---------|------|------------|
| `assets/anatomy/01-bun-top.png` … `06-bun-base.png` (01 bun top, 02 sauces, 03 vegetables, 04 cheese, 05 patty, 06 bun base) | Anatomy | Each layer cut out on transparent background. All six on the **same canvas size, each in its natural stacked position**, so they share one centre line. 1352x1172 PNG suggested. | Real 3-piece cut (top bun, middle, base) |
| `assets/pairing/burgers/<slug>.png` (pesto-paneer, truffle-shroom, nashville-hot-chicken, jalapeno-smokehouse-smash, oklahoma-smash, brewery-cheeseburger) | Burger heart beer | Side-on cutout of each burger, transparent background, about 1000 px wide | House cheeseburger cutout |
| `assets/pairing/beers/<style>.png` (witbier, stout, pilsner, hefeweizen, kolsch, lager) | Burger heart beer | Each beer in the it's Hearty pint, cutout | The it's Hearty pint |
| Farnham Display `.woff2` files | Site-wide headings | Licensed web font files | Fraunces stands in |

## Round 4 additions

| File | Where | What | If missing |
|------|-------|------|------------|
| `assets/pairing/burgers/<slug>.png` for pesto-paneer, truffle-shroom, nashville-hot-chicken, jalapeno-smokehouse-smash, oklahoma-smash | Burger heart beer | The red-backdrop SKU shots (from the blr tab / Drive), cut out on transparent background like brewery-cheeseburger.png | House cheeseburger cutout |
| `assets/craft/med-beet.png` + `.webp`, `assets/craft/jam-session.png` + `.webp` | Drops, In rotation now | Same style as forbidden-pbj / blr-ghee-roast-pull (burger on its plate, cut out) | "Photo coming soon" card |

**Update (round 5):** all six pairing burgers are in. Pesto Paneer, Truffle Shroom, Nashville Hot Chicken and Jalapeño Smokehouse Smash are cut out from the SKU shots in Drive. Oklahoma Smash uses a phone photo from the Koramangala pass, cropped with a soft oval fade; swap in a red-backdrop SKU shot when one exists. Still needed: Med Beet and Jam Session photos for the Drops cards.

## TODO: franchise follow-up automation (decide later)

Goal: when someone submits the Franchise form, an email from partnerships@burgerbrewery.com goes to the email they entered. It carries our copy plus a link to a Google Form with background questions. The Form answers are also saved in Supabase.

Already in place: the Franchise form saves to the Supabase `enquiries` table (`kind = franchise`). Nothing emails yet.

Open decisions:
- [ ] Where partnerships@burgerbrewery.com lives (Google Workspace, another host, or not created yet). This picks the sending route: Apps Script on that Google account, or Resend with DNS records on burgerbrewery.com.
- [ ] The email copy (subject and body). Not written. Nothing sends until it is approved, so no placeholder text reaches anyone.
- [ ] The franchise Google Form questions: background, city and location plans, investment capacity, experience, timeline. Owner to confirm the list.
- [ ] Whether to copy partnerships@ on each send, and what to do about repeat submissions.

Build steps once decided: a `franchise_applications` table (insert-only for the public key), the Google Form with an Apps Script that writes each response to it, and a send step triggered by a new franchise enquiry, with a single on/off switch. Any API key or secret is pasted in by the owner, never into the repo.

## Food strip and pairing photo (added 2026-11-22)
- Source: the five Instagram carousel slides in `Burger_Brewery_Website_FORGE/Pictures/`. The strip under the Menu (`#plates`) uses nine tiles cropped from slide S02 (only 308x379 px each, so they look soft above ~300 px wide). The Pairings section ends with slide S03.
- Please send the original, un-collaged, full-resolution photos of the nine dishes and the cheeseburger and lager shot. They will drop in with no code change.
- TODO VERIFY: Chicken Soulaki, Trio (Veg), Chicken Tenders (Classic), Biscoff Shake, Mannheim New England IPA are named as on the carousel but are not in the site's menu section. Check against the menu PDF.
- Slide S05's caption reads "Koramanagla" (typo). It is not used on the site; fix it on Instagram.
- Delivery page: never use the beer tiles (IPA, Stout) or S03 there.

## Pairing clip (added 2026-11-22)
- `assets/video/pairing-reel.mp4` (14 s, 3.5 MB, from the WhatsApp file in `Burger_Brewery_Website_FORGE/Pairings/`) plays inline at the top of the Burger heart beer section, between the intro line and "Click to find what pairs". It starts muted when scrolled into view, pauses when scrolled away, loops, and has controls for sound. Reduced-motion visitors get the poster and press play. It loads only as the section nears the screen.
- The clip shows Oklahoma Smash + Kolsch, not the Jalapeño Smokehouse Smash + Hefeweizen reel on Instagram (p/DewwQxvoGna). The other one can be added the same way: send the file.
- TODO: captions are burned into the picture; a separate .vtt captions file would be better for accessibility. Needs the spoken words.
