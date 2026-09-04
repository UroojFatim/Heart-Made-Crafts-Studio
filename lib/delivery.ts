/**
 * ══════════════════════════════════════════════════════════════════
 *  DELIVERY BY CITY  —  you manage this file
 * ══════════════════════════════════════════════════════════════════
 *
 * One entry per city, each with its own page at /gift-delivery/<slug>.
 *
 * ⚠️ EVERY FIELD HERE IS A PROMISE.
 * Someone reads it and orders on it. If the cut-off moves, or a courier
 * stops covering an area, change it here the same day — a delivery page
 * that lies costs a refund and a review, which is worse than not having
 * the page.
 *
 * TO ADD A CITY
 *   1. Add its slug to the CitySlug union.
 *   2. Add an entry below with that city's OWN numbers.
 *   3. That's all — page, metadata and sitemap follow automatically.
 *
 * ⚠️ DO NOT COPY KARACHI'S ENTRY AND CHANGE THE NAME. Lahore is a
 * courier city, not a rider city: different lead time, different areas,
 * different charge, different answers. Google drops near-identical city
 * pages, and rightly — they help nobody. If a city has nothing
 * genuinely different to say, it doesn't need a page yet.
 */

export type CitySlug = "karachi";

export type DeliveryFaq = { q: string; a: string };

export type DeliveryCity = {
  slug: CitySlug;
  /** City name as it appears in prose. */
  name: string;
  title: string;
  description: string;
  h1: string;
  /** Two or three sentences under the H1. */
  intro: string[];

  /** How the goods actually move. Shown as the speed table. */
  speed: { label: string; time: string; note: string }[];
  /** Same-day order deadline, or null where same-day isn't offered. */
  cutOff: string | null;
  /** The honest caveat that goes with the cut-off. */
  cutOffCaveat: string;

  /** Named areas. These are what "gift delivery DHA" style queries match. */
  areas: string[];
  /** True where we cover the city broadly and the list is only a sample. */
  areasArePartial: boolean;

  charge: string;
  chargeNote: string;

  paymentNote: string[];
  faqs: DeliveryFaq[];
};

export const cities: DeliveryCity[] = [
  {
    slug: "karachi",
    name: "Karachi",
    title: "Gift Box Delivery in Karachi | Same-Day Handmade Gift Boxes",
    description:
      "Handmade gift boxes delivered across Karachi — same or next day. DHA, Clifton, Gulshan, North Nazimabad and more. Cash on delivery available. Order on WhatsApp.",
    h1: "Gift box delivery in Karachi, same or next day",
    intro: [
      "Everything we make is made in Karachi, which is the whole reason this city gets the fastest service we offer. Nothing is sitting in a courier depot in another province waiting to be routed — it is packed here and it goes out with our own rider, usually the same day.",
      "That also means we can do things here that we cannot do anywhere else: fresh flowers, mithai collected the morning it is delivered, and a delivery time you can actually plan around.",
    ],

    speed: [
      {
        label: "Ready boxes",
        time: "Same day",
        note: "Ordered before the cut-off. After it, next day.",
      },
      {
        label: "Custom handmade pieces",
        time: "2–3 days",
        note: "A painted name, a lettered timeline, a resin keepsake — these are made by hand and cannot be rushed into an afternoon.",
      },
      {
        label: "Large hampers and sets",
        time: "5–7 days",
        note: "More pieces to source and arrange, and everything has to match.",
      },
      {
        label: "Rush",
        time: "24 hours",
        note: "30% more, because it pushes other people's orders back. That is the honest reason it costs extra.",
      },
    ],
    cutOff: "11 am",
    cutOffCaveat:
      "That cut-off is for boxes we can put together the same morning. Anything with a handmade piece in it — which is most of what we make — needs its 2–3 days no matter how early the message arrives. Send the date you need it for and we will tell you straight away whether it is possible, rather than accepting it and hoping.",

    areas: [
      "DHA",
      "Clifton",
      "Gulshan-e-Iqbal",
      "North Nazimabad",
      "Bahadurabad",
      "PECHS",
      "Gulistan-e-Johar",
      "Malir",
      "Korangi",
      "Saddar",
      "Bahria Town",
    ],
    areasArePartial: true,

    charge: "Rs 350",
    chargeNote:
      "One flat charge anywhere in Karachi, told to you before you commit to anything — not added at the end.",

    paymentNote: [
      "Ready boxes go cash on delivery. You pay the rider when the box is in your hands, which is not something most pages in this market will offer you.",
      "Personalised work takes 50% to start and 50% on delivery. A box with someone else's name painted on it cannot be resold, so that half covers the materials and the hours if the order is dropped. We never ask for the full amount before you have seen anything.",
    ],

    faqs: [
      {
        q: "Same-day delivery ke liye kitne baje tak order karna hoga?",
        a: "Subah 11 baje se pehle. Uske baad ka order agle din jata hai. Lekin ye sirf un boxes par lagoo hai jo ready hain — jismein handmade piece hai (calligraphy card, painted plaque, resin keepsake) uske liye 2–3 din chahiye, chahe order kitni bhi jaldi aa jaye. Aap tareekh batayein, hum saaf bata denge ke mumkin hai ya nahi.",
      },
      {
        q: "Karachi mein delivery charge kitna hai?",
        a: "Rs 350, poore Karachi mein ek hi rate. Order confirm karne se pehle hi bata dete hain — aakhir mein koi extra charge nahi nikalta.",
      },
      {
        q: "Kya cash on delivery hoti hai?",
        a: "Ready boxes par haan — jab box aapke haath mein ho tab payment. Custom aur personalised kaam par 50% advance, kyunki jis box par kisi ka naam likha ho wo dobara kisi ko nahi bech sakte. Poori raqam pehle kabhi nahi maangte.",
      },
      {
        q: "Kya gift note ya card sath jata hai?",
        a: "Har box mein jata hai — aur wo printed nahi hota, haath se likha jata hai. Aap alfaz bhej dein, hum unhein calligraphy mein likh kar wax-seal kar dete hain. Agar aap chahti hain ke bhejne wale ka naam na aaye, ya delivery surprise ho, wo bhi ho jata hai — bas bata dein.",
      },
      {
        q: "Kya main delivery se pehle box dekh sakti hoon?",
        a: "Ji haan. Har order ke doran WhatsApp par clips bhejte hain — card likhte hue, box pack hote hue, lid band hote hue. Kuch badalna ho to nikalne se pehle bata dein.",
      },
    ],
  },
];

export const ALL_CITY_SLUGS = cities.map((c) => c.slug);

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}
