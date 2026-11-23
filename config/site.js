/*
 * Burger Brewery site config. Shared by index.html and delivery.html.
 * Every unknown fact lives here as null or an empty list. The pages read this file
 * and HIDE anything that depends on a missing value, so a TODO never shows on screen.
 * Fill a value, save, reload.
 */

// TODO VERIFY: rating must match the live Google listing (https://maps.app.goo.gl/BrSWiB4urYfC66M5A)
var GOOGLE_RATING = 4.6;

// Forms save to Supabase (tables community_signups and enquiries). The publishable key is meant to be public:
// row-level security lets it ADD rows only, never read, change or delete them. Never put a secret key in this file.
var SUPABASE_URL = "https://kjqmomejyibhutjudarv.supabase.co";
var SUPABASE_KEY = "sb_publishable_PVMeo-sd1dqufrTg-BlBYw_G76-6eHx";
window.BB_SEND = function (table, row) {
  return fetch(SUPABASE_URL + "/rest/v1/" + table, {
    method: "POST",
    headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json", "Prefer": "return=minimal" },
    body: JSON.stringify(row)
  }).then(function (r) { if (!r.ok) throw new Error("save failed " + r.status); });
};

// TODO: set Zomato link. Every "Order now" / Zomato button stays hidden until this is a real URL.
var ZOMATO_URL = null;
// Add later. Not used on the page yet.
var SWIGGY_URL = null;

window.BB_CONFIG = {
  // TODO: opening hours, e.g. "12 noon to 1 am"
  hours: null,

  // TODO (optional): the chef's name, for the room photo caption
  chefName: null,

  // TODO: real guest quotes only, e.g. { quote: "...", name: "...", source: "Google", url: "..." }. Never sample text.
  reviews: [],

  // TODO: the two R&D burgers in the Drops vote, e.g. { name: "...", line: "...", image: "assets/img/rnd/<slug>.jpg" }
  rnd: [],

  zomatoUrl: ZOMATO_URL,
  swiggyUrl: SWIGGY_URL,

  bookingUrl: "https://www.district.in/dining/bangalore/burger-brewery-koramangala-1st-block-bangalore",
  instagramUrl: "https://www.instagram.com/burgerbrewery_official/",
  mapsUrl: "https://maps.app.goo.gl/BrSWiB4urYfC66M5A",
  linkedinUrl: null, // TODO: company LinkedIn page URL (could not be confirmed by search)

  // OUR TEAM (page team.html). Sorted A to Z by `sort`. Every field except name is optional: a null field is simply not shown.
  //   name, role      as they should read       area   small orange line under the role
  //   line   ONE first-person sentence in their own words: why they care, with a sensory detail (never write it for them)
  //   prev   array of past employers (text only, no logos)      pairing  go-to burger + beer, e.g. "Oklahoma Smash + Kolsch"
  //   photo  "assets/team/<name>.jpg" (square, face centred)    link  LinkedIn URL (the photo links to it)
  team: [
    { name: "Atharv Agarwal",     sort: "Atharv",  role: "Founder\u2019s Office", area: "Operational Strategy", line: null, prev: ["SBI"], pairing: null, photo: "assets/team/atharv.jpg",  link: null }, // TODO VERIFY prev (Padukone also on his card), line, pairing, LinkedIn
    { name: "Chander Deep Yadav", sort: "Chander", role: "Corporate Chef", area: "Kitchen & Product", line: null, bio: "Chander heads culinary operations at Burger Brewery, driving menu innovation, brand standardization and culinary team development. His food philosophy is about respecting the ingredients, flavour and consistency.", prev: ["Jamie Oliver Restaurants", "Marriott", "The LaLiT"], pairing: "Jalape\u00F1o Smokehouse Smash + Hefeweizen", photo: "assets/team/chander.jpg", link: "https://www.linkedin.com/in/chander-deep-yadav-aa680027/" }, // from his email 23 Nov 2026 (designation "Corporate Chef"); employers from his card
    { name: "Gurleen Kaur",       sort: "Gurleen", role: "Founder\u2019s Office", area: "Marketing & Business Strategy", line: null, bio: "Gurleen works across Marketing & Business Strategy at Burger Brewery, bringing together creative thinking, marketing and business strategy to build memorable guest experiences. She believes great hospitality goes beyond good food: it\u2019s about creating spaces, moments and connections that bring people together. For her, the best meals are always better shared.", prev: ["Adidas", "KPMG"], pairing: "Truffle Shroom + Stout", photo: "assets/team/gurleen.jpg", link: "https://www.linkedin.com/in/gurleen-kaur-519ab0279" }, // from her email 23 Nov 2026
    { name: "Maadhav Veer Singh", sort: "Maadhav", role: "Founder & CEO",         area: null,                   line: null, bio: "Maadhav spent his career as an investment banker and investor, studying businesses and asking what was missing. In India\u2019s burger and beer scene, he found the answer, and started Burger Brewery to fill the gap.", prev: ["Stride Asset Management", "Goldman Sachs"], pairing: "Oklahoma Smash + Kolsch", photo: "assets/team/maadhav.jpg", link: "https://www.linkedin.com/in/maadhav-veer-singh/" } // TODO line, pairing, LinkedIn
  ],

  // Burger Brewery Club (loyalty). Source: owner's Reelo club card. Points = subtotal before taxes and charges.
  // Reward values (money off the bill) are shown on the Membership section when showRewardValues is true (owner's request).
  loyalty: {
    name: "Burger Brewery Club",
    checkUrl: "https://l.reelo.io/8fT7I",
    earn: "1 point for every rupee spent",
    tiers: [
      { points: 1500,  off: 150 },
      { points: 2000,  off: 225 },
      { points: 3000,  off: 375 },
      { points: 5000,  off: 700 },
      { points: 7500,  off: 1200 },
      { points: 10000, off: 1800 }
    ],
    terms: ["Cannot be combined with other offers.", "Reward redeemable in-store only.", "Points are issued on the subtotal (before taxes and charges).", "Standard T&Cs apply."],
    showRewardValues: true
  },

  // TODO verify delivery cities
  deliveryCities: ["Bangalore", "Delhi NCR", "Mumbai"]
};
