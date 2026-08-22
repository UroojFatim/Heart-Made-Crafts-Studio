/**
 * ══════════════════════════════════════════════════════════════════
 *  BOX BUILDER OPTIONS  —  you manage this file
 * ══════════════════════════════════════════════════════════════════
 *
 * The builder collects a brief, not a price. Someone picks what they
 * want, adds the words for the card, and the whole thing arrives on
 * WhatsApp already written out — so the first message contains
 * everything needed to quote and start work.
 *
 * No prices here on purpose. Quoting happens in conversation.
 *
 * TO ADD AN OPTION  add it to the relevant group's `items`.
 * TO ADD A GROUP    add a new object to `groups`.
 */

export type BuilderItem = {
  id: string;
  label: string;
  note?: string;
  /** Karachi-only — fresh things that can't survive a courier. */
  localOnly?: boolean;
};

export type BuilderGroup = {
  id: string;
  title: string;
  blurb: string;
  /** "one" = radio, "many" = checkboxes. */
  mode: "one" | "many";
  items: BuilderItem[];
};

export const groups: BuilderGroup[] = [
  {
    id: "base",
    title: "The presentation",
    blurb: "What everything sits in. Sets the scale of the whole gift.",
    mode: "one",
    items: [
      { id: "box-s", label: "Small box", note: "18 × 13 × 7 cm" },
      { id: "box-m", label: "Signature box", note: "28 × 22 × 11 cm" },
      { id: "box-l", label: "Large presentation box", note: "40 × 30 × 14 cm" },
      { id: "tray", label: "Sectioned tray", note: "For one parcel per year" },
      { id: "bouquet", label: "Bouquet, no box", note: "Hand-tied and wrapped" },
    ],
  },
  {
    id: "handmade",
    title: "The handmade piece",
    blurb:
      "Pick at least one. This is the part made only for them — and the reason the box gets kept.",
    mode: "many",
    items: [
      { id: "card", label: "Handwritten calligraphy card", note: "Your words, up to ~120" },
      { id: "timeline", label: "Hand-lettered timeline card", note: "The dates that mattered" },
      { id: "plaque", label: "Hand-painted name plaque", note: "Wood, sealed" },
      { id: "resin", label: "Resin keepsake", note: "Name, date or pressed flower" },
      { id: "lid", label: "Hand-painted lid", note: "Painted to match" },
      { id: "scrapbook", label: "Illustrated scrapbook spread", note: "From photos you send" },
    ],
  },
  {
    id: "inside",
    title: "What goes in",
    blurb: "Choose as many as you like — we'll balance the arrangement.",
    mode: "many",
    items: [
      { id: "choc", label: "Chocolates" },
      { id: "dried", label: "Preserved / dried florals" },
      { id: "lights", label: "Warm fairy lights" },
      { id: "mug", label: "Personalised mug" },
      { id: "plush", label: "Small plush" },
      { id: "frame", label: "Pressed-flower photo frame" },
      { id: "fresh", label: "Fresh flower arrangement", localOnly: true },
      { id: "freshbouquet", label: "Hand-tied fresh bouquet", localOnly: true },
      { id: "candle", label: "Scented candle" },
      { id: "jewel", label: "Jewellery piece" },
      { id: "scent", label: "Perfume or attar" },
      { id: "skin", label: "Skincare set" },
      { id: "dates", label: "Dates and dry fruit" },
    ],
  },
  {
    id: "finish",
    title: "Finishing",
    blurb: "Small things that change how it arrives.",
    mode: "many",
    items: [
      { id: "wax", label: "Wax-sealed envelope" },
      { id: "wrap", label: "Outer wrap and ribbon" },
      { id: "tags", label: "Hand-lettered tags on each item" },
      { id: "clips", label: "Unboxing clips sent to you", note: "Always free" },
      { id: "surprise", label: "Deliver as a surprise", note: "We coordinate directly" },
    ],
  },
];

export const delivery = [
  { id: "karachi", label: "Karachi", note: "Same or next day" },
  { id: "pakistan", label: "Rest of Pakistan", note: "2–4 days by courier" },
  { id: "overseas", label: "Ordering from abroad", note: "We deliver in Pakistan" },
] as const;

export type DeliveryId = (typeof delivery)[number]["id"];

export const occasionOptions = [
  "Birthday",
  "Anniversary",
  "Sorry",
  "Engagement",
  "Eid",
  "Congratulations",
  "Festival (14 Feb, 14 Aug…)",
  "Just because",
] as const;

export const allItems: Record<string, BuilderItem> = Object.fromEntries(
  groups.flatMap((g) => g.items.map((i) => [i.id, i] as const)),
);
