export type BuilderItem = {
  id: string;
  label: string;
  price: number;
  note?: string;
  /** Karachi-only (fresh things that can't survive a courier). */
  localOnly?: boolean;
};

export type BuilderGroup = {
  id: string;
  title: string;
  blurb: string;
  /** "one" = radio, "many" = checkboxes. */
  mode: "one" | "many";
  /** At least this many must be picked before ordering. */
  min: number;
  items: BuilderItem[];
};

export const groups: BuilderGroup[] = [
  {
    id: "base",
    title: "The presentation",
    blurb: "What everything sits in. Sets the scale of the whole gift.",
    mode: "one",
    min: 1,
    items: [
      { id: "box-s", label: "Small box", price: 900, note: "18 × 13 × 7 cm" },
      { id: "box-m", label: "Signature box", price: 1600, note: "28 × 22 × 11 cm" },
      { id: "box-l", label: "Large presentation box", price: 2800, note: "40 × 30 × 14 cm" },
      { id: "tray", label: "Sectioned countdown tray", price: 4200, note: "For one parcel per year" },
    ],
  },
  {
    id: "handmade",
    title: "The handmade piece",
    blurb:
      "Pick at least one. This is the part made only for them — and the reason the box gets kept.",
    mode: "many",
    min: 1,
    items: [
      { id: "card", label: "Handwritten calligraphy card", price: 600, note: "Your words, up to ~120" },
      { id: "timeline", label: "Hand-lettered timeline card", price: 900, note: "The dates that mattered" },
      { id: "plaque", label: "Hand-painted name plaque", price: 1200, note: "Wood, sealed" },
      { id: "resin", label: "Resin keepsake", price: 1400, note: "Name, date or pressed flower" },
      { id: "lid", label: "Hand-painted lid", price: 1500, note: "Painted to match" },
      { id: "scrapbook", label: "Illustrated scrapbook spread", price: 2600, note: "From photos you send" },
    ],
  },
  {
    id: "inside",
    title: "What goes in",
    blurb: "Choose as many as the budget allows. We'll balance the arrangement.",
    mode: "many",
    min: 0,
    items: [
      { id: "choc-s", label: "Chocolates — 4 pieces", price: 700 },
      { id: "choc-l", label: "Chocolates — 10 pieces", price: 1600 },
      { id: "dried", label: "Preserved / dried florals", price: 900 },
      { id: "lights", label: "Warm fairy lights", price: 500 },
      { id: "mug", label: "Personalised mug", price: 1100 },
      { id: "plush", label: "Small plush", price: 1300 },
      { id: "frame", label: "Pressed-flower photo frame", price: 1500 },
      { id: "fresh", label: "Fresh flower arrangement", price: 1800, localOnly: true },
      { id: "bouquet", label: "Hand-tied bouquet", price: 2000, localOnly: true },
      { id: "candle", label: "Scented candle", price: 1200 },
      { id: "jewel", label: "Jewellery piece", price: 2200 },
      { id: "scent", label: "Perfume or attar", price: 2500 },
      { id: "skin", label: "Skincare set", price: 2800 },
    ],
  },
  {
    id: "finish",
    title: "Finishing",
    blurb: "Small things that change how it arrives.",
    mode: "many",
    min: 0,
    items: [
      { id: "wax", label: "Wax-sealed envelope", price: 200 },
      { id: "wrap", label: "Outer wrap and ribbon", price: 300 },
      { id: "tags", label: "Hand-lettered tags on each item", price: 600 },
      { id: "clips", label: "Unboxing clips sent to you", price: 0, note: "Always free" },
    ],
  },
];

export const delivery = [
  { id: "karachi", label: "Karachi", price: 350, note: "Same or next day" },
  { id: "pakistan", label: "Rest of Pakistan", price: 500, note: "2–4 days by courier" },
] as const;

export type DeliveryId = (typeof delivery)[number]["id"];

export const occasionOptions = [
  "Birthday",
  "Anniversary",
  "Wedding / Nikah",
  "Eid",
  "New baby",
  "Congratulations",
  "Just because",
] as const;

/** 24-hour turnaround costs 30% more — rush work displaces other orders. */
export const RUSH_MULTIPLIER = 0.3;

export const allItems: Record<string, BuilderItem> = Object.fromEntries(
  groups.flatMap((g) => g.items.map((i) => [i.id, i] as const)),
);
