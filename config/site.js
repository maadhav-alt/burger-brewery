/*
 * Burger Brewery site config. Shared by index.html and delivery.html.
 * Every unknown fact lives here as null or an empty list. The pages read this file
 * and HIDE anything that depends on a missing value, so a TODO never shows on screen.
 * Fill a value, save, reload.
 */

// TODO VERIFY: rating must match the live Google listing (https://maps.app.goo.gl/BrSWiB4urYfC66M5A)
var GOOGLE_RATING = 4.5;

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

  // TODO verify delivery cities
  deliveryCities: ["Bangalore", "Delhi NCR", "Mumbai"]
};
