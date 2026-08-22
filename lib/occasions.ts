/**
 * ══════════════════════════════════════════════════════════════════
 *  OCCASIONS & FILTERS  —  you manage this file
 * ══════════════════════════════════════════════════════════════════
 *
 * Everything the shop is organised by lives here. Nothing in the UI is
 * hard-coded: add an occasion and it appears in the nav, on the shop
 * page, in the sitemap and gets its own page automatically.
 *
 * TO ADD AN OCCASION
 *   1. Add its slug to the OccasionSlug union just below.
 *   2. Add an entry to the `occasions` array.
 *   3. Tag products with that slug in lib/products.ts.
 *
 * TO ADD A FILTER
 *   Add a group (or an option) to that occasion's `filters`. Then put
 *   the option's `id` into the `tags` array of any product it applies
 *   to. That's the whole wiring — matching is done on those ids.
 *
 * HOW FILTERING BEHAVES
 *   Within one group  → OR   ("For her" OR "For him")
 *   Across groups     → AND  (must be "For her" AND a "Bouquet")
 *   A product with no tag from a group is not excluded by that group
 *   unless the shopper actually picks something in it.
 */

import type { Palette } from "./palette";

export type OccasionSlug =
  | "birthday"
  | "anniversary"
  | "sorry"
  | "engagement"
  | "eid"
  | "congratulations"
  | "festivals";

export type FilterOption = {
  /** Must match the tag you put on products. Keep it lowercase-hyphenated. */
  id: string;
  label: string;
};

export type FilterGroup = {
  id: string;
  label: string;
  options: FilterOption[];
};

export type Occasion = {
  slug: OccasionSlug;
  name: string;
  /** Shown under the title on the occasion page. */
  tagline: string;
  /** Longer intro paragraph. */
  blurb: string;
  filters: FilterGroup[];
  palette: Palette;
};

/* ──────────────────────────────────────────────────────────────────
   Shared filter groups

   Most occasions want the same "what kind of thing is it" group, so
   it's defined once here and reused. Edit it in one place and every
   occasion that uses it updates.
   ────────────────────────────────────────────────────────────────── */

const TYPE: FilterGroup = {
  id: "type",
  label: "What kind",
  options: [
    { id: "box", label: "Gift box" },
    { id: "hamper", label: "Large hamper" },
    { id: "bouquet", label: "Bouquet" },
    { id: "card", label: "Handmade card" },
    { id: "keepsake", label: "Keepsake" },
  ],
};

const FOR_HER_HIM: FilterGroup = {
  id: "recipient",
  label: "Who it's for",
  options: [
    { id: "for-her", label: "For her" },
    { id: "for-him", label: "For him" },
  ],
};

const FOR_ANYONE: FilterGroup = {
  id: "recipient",
  label: "Who it's for",
  options: [
    { id: "for-her", label: "For her" },
    { id: "for-him", label: "For him" },
    { id: "for-kids", label: "For kids" },
    { id: "for-couple", label: "For a couple" },
    { id: "for-family", label: "For a family" },
  ],
};

/* ──────────────────────────────────────────────────────────────────
   The occasions
   ────────────────────────────────────────────────────────────────── */

export const occasions: Occasion[] = [
  {
    slug: "birthday",
    name: "Birthday",
    tagline: "The one they'll still have next year.",
    blurb:
      "Boxes, bouquets and handmade pieces built around the person, not the date. Tell us who it's for and we'll build to them.",
    palette: { box: "#F3E2DA", lid: "#E6CABE", ribbon: "#C4695E", glow: "#FFEADB" },
    filters: [
      {
        id: "recipient",
        label: "Who it's for",
        options: [
          { id: "for-her", label: "For her" },
          { id: "for-him", label: "For him" },
          { id: "for-kids", label: "For kids" },
        ],
      },
      TYPE,
      {
        id: "scale",
        label: "How big",
        options: [
          { id: "small", label: "Something small" },
          { id: "statement", label: "Make a statement" },
        ],
      },
    ],
  },

  {
    slug: "anniversary",
    name: "Anniversary",
    tagline: "For the year you both actually remember.",
    blurb:
      "Built around the dates that mattered — hand-lettered, pressed, painted. The kind of thing that gets kept in a drawer.",
    palette: { box: "#EAD9D3", lid: "#DCC3BA", ribbon: "#96453C", glow: "#FFE4D8" },
    filters: [
      {
        id: "recipient",
        label: "Who it's for",
        options: [
          { id: "for-her", label: "For her" },
          { id: "for-him", label: "For him" },
          { id: "for-couple", label: "For both of you" },
        ],
      },
      TYPE,
    ],
  },

  {
    slug: "sorry",
    name: "Sorry",
    tagline: "When the words need help arriving.",
    blurb:
      "Quiet, unshowy pieces for apologies. The handwritten card does most of the work here — you send us the words, we letter them by hand.",
    palette: { box: "#EDE4E6", lid: "#DCCFD3", ribbon: "#A2646C", glow: "#FBEEF0" },
    filters: [
      FOR_HER_HIM,
      TYPE,
      {
        id: "tone",
        label: "Tone",
        options: [
          { id: "gentle", label: "Gentle" },
          { id: "playful", label: "Playful" },
          { id: "serious", label: "Serious" },
        ],
      },
    ],
  },

  {
    slug: "engagement",
    name: "Engagement",
    tagline: "For the yes, and everything after it.",
    blurb:
      "Proposal boxes, mangni trays and coordinated sets. Book these early — we hand-paint the detailing and it takes time.",
    palette: { box: "#F1E7D5", lid: "#E3D3B8", ribbon: "#B78B4B", glow: "#FFF3D6" },
    filters: [
      {
        id: "recipient",
        label: "Who it's for",
        options: [
          { id: "for-her", label: "For her" },
          { id: "for-him", label: "For him" },
          { id: "for-couple", label: "For the couple" },
        ],
      },
      TYPE,
      {
        id: "moment",
        label: "Which moment",
        options: [
          { id: "proposal", label: "The proposal" },
          { id: "mangni", label: "Mangni / ring ceremony" },
          { id: "trousseau", label: "Trousseau trays" },
        ],
      },
    ],
  },

  {
    slug: "eid",
    name: "Eid",
    tagline: "Eidi, but worth keeping.",
    blurb:
      "Eid boxes for family, for the in-laws, for a whole office. Order early — Eid week fills up and we cap what we take.",
    palette: { box: "#E4EDE6", lid: "#CEDBD2", ribbon: "#5E8C6A", glow: "#EAFBEF" },
    filters: [
      FOR_ANYONE,
      TYPE,
      {
        id: "quantity",
        label: "How many",
        options: [
          { id: "single", label: "Just one" },
          { id: "set", label: "A set of a few" },
          { id: "bulk", label: "Bulk / corporate" },
        ],
      },
    ],
  },

  {
    slug: "congratulations",
    name: "Congratulations",
    tagline: "For the news worth marking.",
    blurb:
      "New job, new baby, new home, a degree finally finished. Built to suit the reason rather than a generic well-done.",
    palette: { box: "#E7E2F0", lid: "#D5CEE4", ribbon: "#7A6BA8", glow: "#F2EDFF" },
    filters: [
      {
        id: "reason",
        label: "What for",
        options: [
          { id: "new-job", label: "New job" },
          { id: "graduation", label: "Graduation" },
          { id: "new-baby", label: "New baby" },
          { id: "new-home", label: "New home" },
        ],
      },
      TYPE,
    ],
  },

  {
    slug: "festivals",
    name: "Festivals",
    tagline: "The dates the whole country is thinking about.",
    blurb:
      "Valentine's, Independence Day, Mother's and Father's Day, New Year. These sell out fast, so we open a limited number of slots for each.",
    palette: { box: "#F6E3E0", lid: "#E8CAC6", ribbon: "#C4695E", glow: "#FFECE8" },
    filters: [
      {
        id: "festival",
        label: "Which one",
        options: [
          { id: "valentines", label: "Valentine's — 14 Feb" },
          { id: "independence-day", label: "Independence Day — 14 Aug" },
          { id: "mothers-day", label: "Mother's Day" },
          { id: "fathers-day", label: "Father's Day" },
          { id: "new-year", label: "New Year" },
        ],
      },
      FOR_ANYONE,
      TYPE,
    ],
  },
];

/* ──────────────────────────────────────────────────────────────────
   Helpers — you shouldn't need to touch these
   ────────────────────────────────────────────────────────────────── */

export const ALL_OCCASION_SLUGS = occasions.map((o) => o.slug);

export function getOccasion(slug: string) {
  return occasions.find((o) => o.slug === slug);
}
