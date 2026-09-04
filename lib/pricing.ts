/**
 * ══════════════════════════════════════════════════════════════════
 *  PRICE BANDS  —  you manage this file
 * ══════════════════════════════════════════════════════════════════
 *
 * These are the honest ranges, not a price list. Every piece is still
 * made to order and still quoted on the actual brief — the bands exist
 * so someone can tell within five seconds whether we are in their
 * budget, which is the question that otherwise costs a whole WhatsApp
 * exchange to answer.
 *
 * ONE PLACE, THREE READERS
 *   1. the table on /shop
 *   2. the FAQ answer on the home page and on /faq
 *   3. `priceRange` in the LocalBusiness schema (app/layout.tsx)
 * All three read from here, so a number can never be right in one
 * place and stale in another. Edit the band, and all three move.
 */

export type PriceBand = {
  /** What the shopper sees in the amount column. */
  range: string;
  label: string;
  /** One line on what that money actually buys. */
  note: string;
};

export const priceBands: PriceBand[] = [
  {
    range: "Rs 900",
    label: "The card on its own",
    note: "Hand-lettered calligraphy on cotton paper, wax-sealed. No box.",
  },
  {
    range: "Rs 1,500 – 2,500",
    label: "Small box",
    note: "A handmade piece and three or four things chosen around it.",
  },
  {
    range: "Rs 2,500 – 4,000",
    label: "The Signature Box",
    note: "Name plaque or timeline card, six to eight items, lights, wax seal.",
  },
  {
    range: "Rs 5,000 +",
    label: "Large hampers and sets",
    note: "Trousseau trays, countdown boxes, Eid and corporate sets.",
  },
];

/** Lowest price we will take an order at. */
export const priceFloor = "Rs 900";

/**
 * For schema.org `priceRange`. Not shown to anyone — it is a hint to
 * Google about where this business sits, so a wide honest range is
 * better than a precise wrong one.
 */
export const priceRangeSchema = "Rs 900 - Rs 15,000";
