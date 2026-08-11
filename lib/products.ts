export type Occasion =
  | "Birthday"
  | "Anniversary"
  | "Wedding"
  | "Just because"
  | "Eid"
  | "Congratulations";

export type Palette = {
  /** Box body */
  box: string;
  /** Box lid — usually a touch darker */
  lid: string;
  /** Ribbon + bow */
  ribbon: string;
  /** Light spilling out when the lid lifts */
  glow: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  /** Base price in PKR. */
  price: number;
  /** True when price is a starting point, not a fixed figure. */
  from?: boolean;
  occasions: Occasion[];
  /** The handmade piece — the thing no competitor can copy. */
  handmade: string;
  includes: string[];
  leadTimeDays: [number, number];
  /** Rough finished size, cm. */
  size: string;
  description: string;
  palette: Palette;
  /** Layout weight on the shop grid: 1 = normal, 2 = feature. */
  span?: 1 | 2;
};

export const products: Product[] = [
  {
    slug: "the-little-note",
    name: "The Little Note",
    tagline: "Small box. Long-remembered.",
    price: 1800,
    occasions: ["Just because", "Birthday", "Congratulations"],
    handmade: "Handwritten calligraphy card in your own words",
    includes: [
      "Handwritten calligraphy card",
      "4 imported chocolates",
      "One small handmade keepsake",
      "Dried flower sprig",
      "Wrapped and ribbon-tied by hand",
    ],
    leadTimeDays: [2, 3],
    size: "18 × 13 × 7 cm",
    description:
      "The smallest thing we make, and the one people keep. Built around a card written by hand in your words — not printed, not a template. Everything else in the box is there to hold that card company.",
    palette: {
      box: "#f0ddd6",
      lid: "#e4c8be",
      ribbon: "#c4756b",
      glow: "#fff2e4",
    },
  },
  {
    slug: "the-signature-box",
    name: "The Signature Box",
    tagline: "Our most-ordered box, and the reason why.",
    price: 4500,
    occasions: ["Birthday", "Anniversary", "Just because"],
    handmade: "Hand-painted name plaque + calligraphy card",
    includes: [
      "Hand-painted wooden name plaque",
      "Handwritten calligraphy card",
      "6–8 curated items to your brief",
      "Preserved or fresh flowers",
      "Warm fairy lights inside the lid",
      "Ribbon-tied, sealed with wax",
    ],
    leadTimeDays: [3, 4],
    size: "28 × 22 × 11 cm",
    description:
      "The box most people mean when they say they want a gift box. Big enough to feel generous, restrained enough not to look like a pile of things. We build the contents around a short brief from you — what she likes, what he already has, what the occasion actually is.",
    palette: {
      box: "#efe4d7",
      lid: "#e0d0bd",
      ribbon: "#a2564d",
      glow: "#ffe9c8",
    },
    span: 2,
  },
  {
    slug: "the-story-hamper",
    name: "The Story Hamper",
    tagline: "A box that has to be gone through, not opened.",
    price: 11000,
    occasions: ["Birthday", "Anniversary", "Wedding"],
    handmade: "Illustrated scrapbook spread from your photos",
    includes: [
      "Hand-illustrated scrapbook spread (your photos)",
      "Hand-painted keepsake",
      "12–20 curated items",
      "Fresh flower arrangement",
      "Layered tray with lights",
      "Large presentation box, wax-sealed",
    ],
    leadTimeDays: [5, 7],
    size: "40 × 30 × 14 cm",
    description:
      "Layered, so it reveals itself slowly. Send us four or five photos and we build an illustrated spread around them — the part people photograph and put back in the box afterwards.",
    palette: {
      box: "#e8d9c6",
      lid: "#d8c3a9",
      ribbon: "#b08d57",
      glow: "#fff0d2",
    },
  },
  {
    slug: "the-countdown",
    name: "The Countdown",
    tagline: "22 gifts for her 22nd. Or 8 for an 8th.",
    price: 18000,
    from: true,
    occasions: ["Birthday"],
    handmade: "Numbered hand-lettered tags for every parcel",
    includes: [
      "One small wrapped gift per year",
      "Hand-lettered numbered tag on each",
      "Opening-order card, handwritten",
      "Large sectioned presentation tray",
      "Lights and dried florals throughout",
    ],
    leadTimeDays: [6, 9],
    size: "Scales with the number",
    description:
      "One parcel for every year, each individually wrapped and hand-numbered so they open in an order you choose. Priced from 18,000 for around 18 parcels; tell us the age and the budget and we'll tell you honestly what fits.",
    palette: {
      box: "#f3e2da",
      lid: "#e6cabe",
      ribbon: "#c4756b",
      glow: "#ffeadb",
    },
  },
  {
    slug: "the-anniversary-box",
    name: "The Anniversary Box",
    tagline: "For the year you both actually remember.",
    price: 6500,
    occasions: ["Anniversary"],
    handmade: "Hand-lettered timeline of your year",
    includes: [
      "Hand-lettered timeline card of your year together",
      "Pressed-flower frame",
      "Curated items for two",
      "Candle and fresh florals",
      "Deep box with lights, wax-sealed",
    ],
    leadTimeDays: [4, 5],
    size: "30 × 24 × 12 cm",
    description:
      "Built around a hand-lettered timeline — the dates that actually mattered this year, written out. Most people send us six or seven; we letter them onto a single card that sits on top when the lid comes off.",
    palette: {
      box: "#ead9d3",
      lid: "#dcc3ba",
      ribbon: "#a2564d",
      glow: "#ffe4d8",
    },
  },
  {
    slug: "nikah-trousseau",
    name: "Nikah & Trousseau",
    tagline: "For the trays that get carried in.",
    price: 22000,
    from: true,
    occasions: ["Wedding"],
    handmade: "Hand-painted tray detailing and name plaques",
    includes: [
      "Set of coordinated trays or boxes",
      "Hand-painted detailing throughout",
      "Name plaques for the couple",
      "Fresh floral work",
      "Fabric draping and lights",
      "Delivered set-up ready",
    ],
    leadTimeDays: [10, 14],
    size: "Set of 3–9 trays",
    description:
      "Coordinated trays for nikah, mayoun and rukhsati — hand-painted so the set reads as one thing rather than nine separate purchases. Book at least two weeks out; wedding season fills early.",
    palette: {
      box: "#f1e7d5",
      lid: "#e3d3b8",
      ribbon: "#b08d57",
      glow: "#fff3d6",
    },
    span: 2,
  },
  {
    slug: "handwritten-card",
    name: "The Card, On Its Own",
    tagline: "Sometimes the card was always the gift.",
    price: 600,
    occasions: ["Just because", "Birthday", "Congratulations", "Eid"],
    handmade: "Entirely — this is only handmade work",
    includes: [
      "Hand-lettered calligraphy card",
      "Your words, up to roughly 120",
      "Deckle-edge cotton paper",
      "Wax-sealed envelope",
    ],
    leadTimeDays: [1, 2],
    size: "A5, folded",
    description:
      "The piece that goes into most of our boxes, sold on its own. You send the words; they come back in ink on cotton paper with a wax seal. People order these for things a hamper would be wrong for.",
    palette: {
      box: "#faf3ea",
      lid: "#eee2d2",
      ribbon: "#c4756b",
      glow: "#fff6ea",
    },
  },
  {
    slug: "resin-keepsake",
    name: "Resin Keepsake",
    tagline: "A name, a date, a flower — set in resin.",
    price: 1400,
    occasions: ["Anniversary", "Birthday", "Congratulations"],
    handmade: "Poured, set and finished by hand",
    includes: [
      "Hand-poured resin piece",
      "Name or date set inside",
      "Real pressed flowers",
      "Keychain, coaster or small plaque",
      "Gift pouch",
    ],
    leadTimeDays: [3, 5],
    size: "6–10 cm",
    description:
      "Poured by hand, cured for two days, sanded and polished. Add a name, a date, or a flower from an occasion that already happened. Goes inside a box or travels on its own.",
    palette: {
      box: "#e9dfe6",
      lid: "#d9cbd6",
      ribbon: "#a2564d",
      glow: "#f8e6ff",
    },
  },
];

export const occasions: Occasion[] = [
  "Birthday",
  "Anniversary",
  "Wedding",
  "Just because",
  "Eid",
  "Congratulations",
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
