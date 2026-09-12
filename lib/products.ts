/**
 * ══════════════════════════════════════════════════════════════════
 *  PRODUCTS  —  you manage this file
 * ══════════════════════════════════════════════════════════════════
 *
 * TO ADD A PRODUCT
 *   1. `npm run photo -- <file> <id>` for each photograph.
 *   2. Copy any entry below, change the fields, done.
 *
 * THE FIELDS THAT MATTER
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
 *   photos      Photographs, in order, by id. First one is the card
 *               image, so put the best shot first. This is what the
 *               whole catalogue runs on — grids and product pages.
 *
 *   media       Clips. These play on the HOME PAGE ONLY. Everywhere
 *               else a product shows its photograph, because a grid of
 *               autoplaying video was what was making the site slow.
 *                 playback: "hover"  → still frame until hovered/tapped
 *                 playback: "auto"   → plays muted on loop straight away
 *
 *   featured    `featured: true` puts it on the home page and in the
 *               "everything" grid on /shop. Omit it and the product is
 *               still fully live — its own page, inside its occasions,
 *               filterable, in the sitemap — it just isn't out front.
 *               Keep roughly eight featured; let the rest live inside
 *               their occasions.
 *
 * NO PHOTO YET? Leave `photos` out. The product falls back to the
 * still frame of its clip, and if there is no clip either, to the drawn
 * SVG box in its palette. The site stays presentable while you shoot.
 *
 * Products carry no price field. Price BANDS live in lib/pricing.ts
 * and are shown on /shop; the exact figure is quoted on WhatsApp.
 */

import { photoUrl, posterUrl } from "./media";
import type { OccasionSlug } from "./occasions";
import type { Palette } from "./palette";

export type Media = {
  /**
   * File name with no extension, e.g. "the-signature-box".
   *
   * The video is <id>.mp4 and the poster is <id>.jpg — one id, so the
   * two can never drift apart the way separately typed paths did. The
   * URLs are built in lib/media.ts, which is also the one place that
   * knows whether they come from public/ or from the R2 bucket.
   */
  id: string;
  /**
   * "hover" — still frame until hovered. Right for anything in a grid.
   * "auto"  — plays muted on loop in view. Two or three per page at the
   *           very most; each one is a video download on a phone.
   */
  playback: "hover" | "auto";
  /** Describe it for screen readers, and for Google Images. */
  alt: string;
  /**
   * The day the clip went live, "YYYY-MM-DD". Optional, but Google
   * requires `uploadDate` before it will show a video result, so a clip
   * without one is indexed and never featured. `npm run video` stamps
   * today's date when it uploads.
   */
  published?: string;
};

export type Photo = {
  /**
   * File name under /photos with no extension, e.g.
   * "the-signature-box-01". `npm run photo` prints it for you.
   */
  id: string;
  /**
   * What is actually in the shot, in your words.
   *
   * This is the one field worth slowing down for. It does three jobs at
   * once: a screen reader reads it aloud, Google Images reads it to
   * decide what the picture is of, and it is what shows if the image
   * ever fails to load.
   *
   * Describe the photograph, not the product:
   *
   *   ✗ "The Signature Box"
   *   ✓ "The box open, chocolates in rows, a hand-painted name plaque
   *      resting on the lid"
   *
   * The product name is already on the page in the heading — repeating
   * it here tells Google nothing it did not know, while the real
   * description is the only place the details ever get written down.
   *
   * Optional. Leave it off and the name and tagline stand in, which is
   * enough to be valid but not enough to win anything.
   */
  alt?: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /**
   * Still photographs. These are what the catalogue actually shows:
   * every grid card, and the whole product-page gallery.
   *
   *   photos: [
   *     { id: "the-signature-box-01", alt: "Closed, ribbon tied, the
   *       painted name plaque facing up" },
   *     { id: "the-signature-box-02", alt: "Open, chocolates in rows
   *       beside the calligraphy card" },
   *   ],
   *
   * First one is the card image, so put the best shot first. Add as
   * many as you like — everything after the first becomes a thumbnail
   * on the product page.
   *
   * Leave it out and the product falls back to the still frame from its
   * clip, and then to the drawn SVG box. Nothing breaks while you are
   * still shooting — the page just gets plainer.
   */
  photos?: Photo[];
  /**
   * This product's reel on Instagram.
   *
   * Paste the link straight from Instagram's "Copy link" — the
   * `?igsh=…` tracking tail is stripped for you in lib/site.ts.
   *
   *   reel: "https://www.instagram.com/reel/C8xYz1AbCdE/",
   *
   * It shows as a link under the gallery on the product page. Leave it
   * out and no link appears; an unreadable one is treated the same way,
   * because a dead Instagram button is worse than none.
   *
   * A different reel per product is the point — link the reel that is
   * actually about this box, not the profile.
   */
  reel?: string;
  /**
   * Clips. These play on the **home page only**. A grid of autoplaying
   * video was the single biggest thing slowing the site down, and it
   * cost more in load time than it won in atmosphere. Everywhere else a
   * product shows its photograph.
   */
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
      { id: "the-chocolate-bouquet", playback: "auto", alt: "A bouquet of wrapped chocolates being turned in the light" },
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
      { id: "the-card-on-its-own", playback: "hover", alt: "The Hand made card with pictures" },
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
      { id: "the-signature-box", playback: "auto", alt: "The Signature Box being packed and tied" },
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
      { id: "the-countdown", playback: "hover", alt: "The Countdown box being prepared" },
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
      { id: "the-anniversary-box", playback: "hover", alt: "The Anniversary Box being packed and tied" },
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
      { id: "the-quite-sorry", playback: "hover", alt: "The Quiet Sorry box being prepared" },
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
      { id: "eid-bouquet", playback: "hover", alt: "The Eid Bouquet being packed and tied" },
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
];

/* ──────────────────────────────────────────────────────────────────
   Helpers — you shouldn't need to touch these
   ────────────────────────────────────────────────────────────────── */

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

/** One still image: where to load it from, and what to call it. */
export type Still = { src: string; alt: string };

/**
 * Every still a product can show, best first.
 *
 * Three sources, in order:
 *
 *   1. Real photographs from `photos` — what you want.
 *   2. The poster frame of each clip. Not as good as a photograph, but
 *      it is a real picture of the real box and it already exists for
 *      every clip, so no product has to sit empty while you shoot.
 *   3. Nothing — the caller draws the SVG box instead.
 *
 * The fallback is the reason the catalogue could switch from video to
 * photographs in one commit without waiting on a photo shoot.
 */
export function stillsFor(product: Product): Still[] {
  if (product.photos?.length) {
    return product.photos.map((photo) => ({
      src: photoUrl(photo.id),
      // Her description if she wrote one. The fallback is deliberately
      // plain: it is valid and says something true, but it describes
      // the product rather than the picture, which is exactly what a
      // written `alt` is for.
      alt: photo.alt?.trim() || `${product.name} — ${product.tagline}`,
    }));
  }
  return product.media.map((m) => ({ src: posterUrl(m.id), alt: m.alt }));
}

/** The single image that represents a product — card, share, schema. */
export function coverFor(product: Product): Still | null {
  return stillsFor(product)[0] ?? null;
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
