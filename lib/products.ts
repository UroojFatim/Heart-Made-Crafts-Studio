/**
 * ══════════════════════════════════════════════════════════════════
 *  PRODUCTS  —  you manage this file
 * ══════════════════════════════════════════════════════════════════
 *
 * TO ADD A PRODUCT
 *   1. Drop the video in  public/videos/
 *   2. Copy any entry below, change the fields, done.
 *
 * THE THREE FIELDS THAT MATTER
 *
 *   occasions   Where it shows up. An array of occasion slugs, or the
 *               string "all" for pieces that suit every occasion.
 *               A product can sit in as many as you like — a chocolate
 *               bouquet can be birthday AND anniversary AND sorry.
 *
 *   tags        Which filters it matches. Put the filter option's `id`
 *               from lib/occasions.ts here. Tags for occasions this
 *               product isn't in are simply ignored, so it's safe to
 *               list everything that applies.
 *
 *   media       Videos, in order. First one is used on the grid.
 *                 playback: "hover"  → still frame until hovered/tapped
 *                 playback: "auto"   → plays muted on loop straight away
 *               On the product page every video plays with sound when
 *               clicked, regardless of this setting.
 *
 *   featured    `featured: true` puts it on the home page and in the
 *               "everything" grid on /shop. Omit it and the product is
 *               still fully live — its own page, inside its occasions,
 *               filterable, in the sitemap — it just isn't out front.
 *               Keep roughly eight featured; let the rest live inside
 *               their occasions.
 *
 * NO VIDEO YET? Leave `media: []`. The card falls back to the drawn
 * SVG box in that product's palette — the site stays presentable while
 * you shoot.
 *
 * Products carry no price field. Price BANDS live in lib/pricing.ts
 * and are shown on /shop; the exact figure is quoted on WhatsApp.
 */

import type { OccasionSlug } from "./occasions";
import type { Palette } from "./palette";

export type Media = {
  /** Path under /public, e.g. "/videos/birthday-choc-bouquet.mp4" */
  src: string;
  /** Optional still frame, e.g. "/videos/birthday-choc-bouquet.jpg" */
  poster?: string;
  playback: "hover" | "auto";
  /** Describe it for screen readers and for when the file fails to load. */
  alt: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  media: Media[];
  occasions: OccasionSlug[] | "all";
  tags: string[];
  /**
   * Show it on the home page and in the "everything" grid on /shop.
   *
   * Leave it off and the product still gets its own page, still appears
   * inside every occasion you've tagged it with, still responds to
   * filters, and still goes in the sitemap for Google. It just doesn't
   * crowd the front of the shop. That's the point — keep about eight
   * out front and let the rest live inside their occasions.
   */
  featured?: boolean;
  /** The handmade piece — the thing no competitor can copy. */
  handmade: string;
  includes: string[];
  leadTimeDays: [number, number];
  palette: Palette;
};

export const products: Product[] = [
  /* ─────────────────────────────────────────────────────────────
     UNIVERSAL — suits every occasion
     ───────────────────────────────────────────────────────────── */
  {
    slug: "chocolate-bouquet",
    name: "The Chocolate Bouquet",
    tagline: "Chocolates you can eat.",
    description:
      "Hand-wrapped, hand-tied, built to whatever size you want. Works for almost any occasion, which is why it's the thing people order when they can't decide.",
    media: [
      {
        src: "/videos/the-chocolate-bouquet.mp4",
        poster: "/videos/the-chocolate-bouquet.png",
        playback: "auto",
        alt: "A bouquet of wrapped chocolates being turned in the light",
      },
    ],
    occasions: "all",
    tags: ["bouquet", "for-her", "for-him", "for-kids", "small", "gentle", "playful"],
    featured: true,
    handmade: "Hand-lettered tag, wrapped and tied by hand",
    includes: [
      "Imported chocolates, arranged as blooms",
      "Hand-lettered tag",
      "Wrapping and ribbon work",
      "Dried floral accents",
    ],
    leadTimeDays: [2, 3],
    palette: { box: "#F0DDD6", lid: "#E4C8BE", ribbon: "#C4695E", glow: "#FFF2E4" },
  },

  {
    slug: "handwritten-card",
    name: "The Card, On Its Own",
    tagline: "Sometimes the card was always the gift.",
    description:
      "You send the words. They come back in ink on cotton paper, lettered by hand and sealed with wax. People order these for things a hamper would be wrong for.",
    media: [
      {
        src: "/videos/the-card-on-its-own.mp4",
        poster: "/videos/the-card-on-its-own.png",
        playback: "auto",
        alt: "The Hand made card with pictures",
      },
    ],
    occasions: ["sorry"],
    tags: ["card", "for-her", "for-him", "small", "gentle", "serious"],
    featured: true,
    handmade: "Entirely — this is only handmade work",
    includes: [
      "Hand-lettered calligraphy card",
      "Your words, up to roughly 120",
      "Deckle-edge cotton paper",
      "Wax-sealed envelope",
    ],
    leadTimeDays: [1, 2],
    palette: { box: "#FAF3EA", lid: "#EEE2D2", ribbon: "#C4695E", glow: "#FFF6EA" },
  },

  /* ─────────────────────────────────────────────────────────────
     BIRTHDAY
     ───────────────────────────────────────────────────────────── */
  {
    slug: "the-signature-box",
    name: "The Signature Box",
    tagline: "Our most-ordered box, and the reason why.",
    description:
      "The box most people mean when they say they want a gift box. Big enough to feel generous, restrained enough not to look like a pile of things. Contents built around a short brief from you.",
    media: [
      {
    src: "/videos/the-signature-box.mp4",
    poster: "/videos/the-signature-box.jpg",
    playback: "auto",   
    alt: "The Signature Box being packed and tied",
  },
    ],
    occasions: ["birthday", "anniversary", "congratulations"],
    tags: ["box", "for-him", "statement", "new-job", "graduation"],
    featured: true,
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
    palette: { box: "#EFE4D7", lid: "#E0D0BD", ribbon: "#96453C", glow: "#FFE9C8" },
  },

  {
    slug: "the-countdown",
    name: "The Countdown",
    tagline: "22 gifts for her 22nd. Or 8 for an 8th.",
    description:
      "One parcel for every year, each individually wrapped and hand-numbered so they open in an order you choose. Tell us the age and the budget and we'll tell you honestly what fits.",
    media: [
      {
        src: "/videos/the-countdown.mp4",
        // No poster yet — see public/videos/README.md for the one-line
        // ffmpeg command that pulls a still out of the mp4.
        playback: "auto",
        alt: "The Countdown box being prepared",
      },
    ],
    occasions: ["birthday"],
    tags: ["box", "hamper", "for-her", "for-him", "for-kids", "statement"],
    featured: true,
    handmade: "Numbered hand-lettered tags for every parcel",
    includes: [
      "One small wrapped gift per year",
      "Hand-lettered numbered tag on each",
      "Opening-order card, handwritten",
      "Large sectioned presentation tray",
      "Lights and dried florals throughout",
    ],
    leadTimeDays: [6, 9],
    palette: { box: "#F3E2DA", lid: "#E6CABE", ribbon: "#C4695E", glow: "#FFEADB" },
  },

  /* ─────────────────────────────────────────────────────────────
     ANNIVERSARY
     ───────────────────────────────────────────────────────────── */
  {
    slug: "the-anniversary-box",
    name: "The Anniversary Box",
    tagline: "For the year you both actually remember.",
    description:
      "Built around a hand-lettered timeline — the dates that actually mattered this year, written out. Most people send six or seven; we letter them onto a single card that sits on top when the lid comes off.",
    media: [
      {
    src: "/videos/the-anniversary-box.mp4",
    poster: "/videos/the-anniversary-box.jpg",
    playback: "auto",   // or "auto"
    alt: "The Anniversary Box being packed and tied",
  },
    ],
    occasions: ["anniversary", "nikah-wedding"],
    tags: ["box", "for-couple", "for-her", "for-him", "statement"],
    featured: true,
    handmade: "Hand-lettered timeline of your year",
    includes: [
      "Hand-lettered timeline card of your year together",
      "Pressed-flower frame",
      "Curated items for two",
      "Candle and fresh florals",
      "Deep box with lights, wax-sealed",
    ],
    leadTimeDays: [4, 5],
    palette: { box: "#EAD9D3", lid: "#DCC3BA", ribbon: "#96453C", glow: "#FFE4D8" },
  },

  /* ─────────────────────────────────────────────────────────────
     SORRY
     ───────────────────────────────────────────────────────────── */
  {
    slug: "the-apology",
    name: "The Quiet Sorry",
    tagline: "Small, and entirely about the words.",
    description:
      "Deliberately unshowy. A hand-lettered card doing the actual work, and just enough around it that it doesn't arrive empty-handed. We'll help you word it if you want.",
    media: [
      {
        src: "/videos/the-quite-sorry.mp4",
        playback: "auto",
        alt: "The Quiet Sorry box being prepared",
      },
    ],
    occasions: ["sorry"],
    tags: ["box", "card", "for-her", "for-him", "small", "gentle", "serious"],
    featured: true,
    handmade: "Handwritten card in your words",
    includes: [
      "Hand-lettered card, wax-sealed",
      "A few very good chocolates",
      "Single preserved stem",
      "Plain, quiet wrapping",
    ],
    leadTimeDays: [1, 2],
    palette: { box: "#EDE4E6", lid: "#DCCFD3", ribbon: "#A2646C", glow: "#FBEEF0" },
  },

  /* ─────────────────────────────────────────────────────────────
     ENGAGEMENT
     ───────────────────────────────────────────────────────────── */
  // {
  //   slug: "mangni-trays",
  //   name: "Mangni & Trousseau Trays",
  //   tagline: "For the trays that get carried in.",
  //   description:
  //     "Coordinated trays hand-painted so the set reads as one thing rather than nine separate purchases. Book at least two weeks out; engagement season fills early.",
  //   media: [],
  //   occasions: ["nikah-wedding"],
  //   tags: ["hamper", "for-couple", "for-her", "mangni", "trousseau", "statement"],
  //   handmade: "Hand-painted tray detailing and name plaques",
  //   includes: [
  //     "Set of coordinated trays",
  //     "Hand-painted detailing throughout",
  //     "Name plaques for the couple",
  //     "Fresh floral work",
  //     "Fabric draping and lights",
  //     "Delivered set-up ready",
  //   ],
  //   leadTimeDays: [10, 14],
  //   palette: { box: "#F1E7D5", lid: "#E3D3B8", ribbon: "#B78B4B", glow: "#FFF3D6" },
  // },

  // {
  //   slug: "proposal-box",
  //   name: "The Proposal Box",
  //   tagline: "One box, one question.",
  //   description:
  //     "Built for the moment itself — a ring seat, lights, and a hand-lettered card with the words you've been practising. We'll keep it a secret from whoever you tell us to.",
  //   media: [],
  //   occasions: ["nikah-wedding"],
  //   tags: ["box", "for-her", "for-him", "proposal", "statement"],
  //   handmade: "Hand-lettered card and painted lid",
  //   includes: [
  //     "Deep box with a fitted ring seat",
  //     "Hand-painted lid",
  //     "Hand-lettered card",
  //     "Preserved florals and lights",
  //     "Wax-sealed",
  //   ],
  //   leadTimeDays: [4, 6],
  //   palette: { box: "#F6E3E0", lid: "#E8CAC6", ribbon: "#C4695E", glow: "#FFECE8" },
  // },

  /* ─────────────────────────────────────────────────────────────
     EID
     ───────────────────────────────────────────────────────────── */
  {
    slug: "eid-bouquet",
    name: "The Eid Bouquet",
    tagline: "Eidi, but worth keeping.",
    description:
      "For the in-laws, the cousins, or a whole office at once. Green and gold if you want it traditional, or we'll match whatever you have in mind.",
    media: [
      {
    src: "/videos/eid-bouquet.mp4",
    poster: "/videos/eid-bouquet.jpg",
    playback: "auto",   // or "auto"
    alt: "The Eid Bouquet being packed and tied",
  },
    ],
    occasions: ["eid"],
    tags: ["box", "hamper", "for-her", "for-him", "for-kids", "for-family", "single", "set", "bulk"],
    featured: true,
    handmade: "Hand-lettered Eid Mubarak card per box",
    includes: [
      "Hand-lettered card in each box",
      "Dates, chocolates and dry fruit",
      "Small keepsake per recipient",
      "Coordinated wrapping across the set",
    ],
    leadTimeDays: [3, 5],
    palette: { box: "#E4EDE6", lid: "#CEDBD2", ribbon: "#5E8C6A", glow: "#EAFBEF" },
  },

  /* ─────────────────────────────────────────────────────────────
     CONGRATULATIONS
     ───────────────────────────────────────────────────────────── */
  // {
  //   slug: "milestone-box",
  //   name: "The Milestone Box",
  //   tagline: "For news that deserves more than a text.",
  //   description:
  //     "Built around the actual reason — a degree, a first job, a new home, a new baby. The handmade piece changes with it, so it never reads as a generic well-done.",
  //   media: [],
  //   occasions: ["congratulations", "graduation", "new-baby"],
  //   tags: [
  //     "box", "keepsake", "for-her", "for-him", "for-family",
  //     "new-job", "graduation", "new-baby", "new-home", "statement",
  //   ],
  //   handmade: "Hand-painted keepsake marking the milestone",
  //   includes: [
  //     "Hand-painted keepsake with the date",
  //     "Hand-lettered card",
  //     "Curated items suited to the occasion",
  //     "Preserved florals",
  //     "Wax-sealed box",
  //   ],
  //   leadTimeDays: [3, 5],
  //   palette: { box: "#E7E2F0", lid: "#D5CEE4", ribbon: "#7A6BA8", glow: "#F2EDFF" },
  // },

  /* ─────────────────────────────────────────────────────────────
     FESTIVALS
     ───────────────────────────────────────────────────────────── */
  // {
  //   slug: "valentines-box",
  //   name: "The 14 February Box",
  //   tagline: "Not another red teddy.",
  //   description:
  //     "Dusty rose rather than pillar-box red, and built around something written by hand. Slots are limited every year — book by the first week of February.",
  //   media: [],
  //   occasions: ["valentine"],
  //   tags: ["box", "bouquet", "for-her", "for-him", "small", "statement"],
  //   handmade: "Handwritten letter, not a printed card",
  //   includes: [
  //     "Handwritten letter on cotton paper",
  //     "Preserved rose arrangement",
  //     "Chocolates",
  //     "Candle and lights",
  //     "Wax-sealed presentation box",
  //   ],
  //   leadTimeDays: [3, 5],
  //   palette: { box: "#F6E3E0", lid: "#E8CAC6", ribbon: "#C4695E", glow: "#FFECE8" },
  // },

  // {
  //   slug: "azadi-box",
  //   name: "The 14 August Box",
  //   tagline: "Green and white, done properly.",
  //   description:
  //     "Independence Day boxes for family, teams and offices. Hand-painted crescent detailing rather than plastic flags.",
  //   media: [],
  //   occasions: ["14-august"],
  //   tags: ["box", "hamper", "for-family", "for-kids", "single", "bulk"],
  //   handmade: "Hand-painted crescent detailing",
  //   includes: [
  //     "Hand-painted lid detailing",
  //     "Green and white confectionery",
  //     "Hand-lettered card",
  //     "Coordinated wrapping",
  //   ],
  //   leadTimeDays: [3, 5],
  //   palette: { box: "#E4EDE6", lid: "#CEDBD2", ribbon: "#5E8C6A", glow: "#EAFBEF" },
  // },
];

/* ──────────────────────────────────────────────────────────────────
   Helpers — you shouldn't need to touch these
   ────────────────────────────────────────────────────────────────── */

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function isInOccasion(product: Product, slug: OccasionSlug) {
  return product.occasions === "all" || product.occasions.includes(slug);
}

/** Everything tagged with this occasion — featured or not. */
export function productsForOccasion(slug: OccasionSlug) {
  return products.filter((p) => isInOccasion(p, slug));
}

/**
 * The shortlist shown on the home page and in the "everything" grid.
 *
 * Deliberately opt-in: a product you add without `featured: true` goes
 * straight into its occasions and nowhere else, so the front of the
 * shop stays a curated handful however large the catalogue gets.
 */
export function featuredProducts() {
  return products.filter((p) => p.featured);
}

/**
 * Selected filters look like { recipient: ["for-her"], type: ["box","bouquet"] }.
 * Within a group the options are OR'd; across groups they're AND'd. A group
 * with nothing selected doesn't constrain anything.
 */
export function matchesFilters(
  product: Product,
  selected: Record<string, string[]>,
) {
  return Object.values(selected).every(
    (chosen) =>
      chosen.length === 0 || chosen.some((id) => product.tags.includes(id)),
  );
}
