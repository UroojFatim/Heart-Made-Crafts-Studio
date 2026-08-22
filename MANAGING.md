# Managing the catalogue

Everything is edited in three files. No admin panel, no database — change
a file, save, and the site updates.

| I want to… | Edit |
|---|---|
| Add or change an occasion, or its filters | `lib/occasions.ts` |
| Add a product, or a video to a product | `lib/products.ts` |
| Change the box-builder options | `lib/builder.ts` |
| Change phone / email / Instagram | `lib/site.ts` |

After editing, `npm run dev` picks it up instantly. To publish, commit
and push — Vercel deploys on its own.

---

## Add a video to a product

1. Put the `.mp4` in `public/videos/` (see the README in that folder for
   naming and how to compress).
2. In `lib/products.ts`, find the product and fill in `media`:

```ts
media: [
  {
    src: "/videos/birthday-signature-box.mp4",
    poster: "/videos/birthday-signature-box.jpg",
    playback: "hover",
    alt: "The Signature Box being packed and tied",
  },
],
```

**`playback` is per video**, so you can mix:

- `"hover"` — still frame until hovered. Best when several sit in a grid.
- `"auto"` — plays muted on loop once scrolled into view. Eye-catching;
  use two or three per page at most or the page gets heavy.

On the product page, every clip plays **with sound when clicked**,
regardless of this setting. Add more entries to `media` and they become
thumbnails under the main video.

---

## Add a product

Copy any entry in `lib/products.ts` and change the fields. Three matter:

### `occasions` — where it shows up

```ts
occasions: ["birthday", "anniversary"],   // in two occasions
occasions: "all",                          // in every occasion
```

A chocolate bouquet can sit in birthday **and** anniversary **and**
sorry. List as many as apply.

### `tags` — which filters it matches

Put the filter option's `id` (from `lib/occasions.ts`) in `tags`:

```ts
tags: ["bouquet", "for-her", "for-him", "small"],
```

Tags for occasions the product isn't in are ignored, so it's safe to
list everything that applies.

### `media` — the videos

As above. Leave `media: []` and it falls back to a drawn SVG box in the
product's palette, so nothing looks broken while you're still shooting.

---

## Keeping the front of the shop short

The home page and the "everything" grid on `/shop` only show products
marked:

```ts
featured: true,
```

**Leave it off** and the product is still completely live:

- it has its own page at `/product/<slug>`
- it appears inside every occasion in its `occasions` list
- the occasion filters work on it
- it's in the sitemap, so Google can find it

It just doesn't crowd the front. That's how you add fifty products
without the shop turning into a wall.

Keep roughly eight featured. To swap one out, delete its `featured`
line and add it to another. Order follows the order of `lib/products.ts`
— move an entry up the file to move it up the grid.

---

## Add or change a filter

In `lib/occasions.ts`, find the occasion and add to its `filters`:

```ts
{
  id: "scale",
  label: "How big",
  options: [
    { id: "small", label: "Something small" },
    { id: "statement", label: "Make a statement" },
  ],
},
```

Then add `"small"` or `"statement"` to the `tags` of any product it
applies to. **That's the whole wiring** — the sidebar renders itself
from this.

### How filtering behaves

- **Within one group → OR.** Ticking "For her" and "For him" shows both.
- **Across groups → AND.** "For her" + "Bouquet" shows only bouquets for
  her.
- **An untouched group filters nothing.** Products missing a tag from a
  group aren't hidden unless the shopper actually picks something in it.

### Filters shared between occasions

`TYPE`, `FOR_HER_HIM` and `FOR_ANYONE` at the top of `lib/occasions.ts`
are defined once and reused. Edit one and every occasion using it
updates.

---

## Add an occasion

1. Add its slug to the `OccasionSlug` union in `lib/occasions.ts`.
2. Add an entry to the `occasions` array — name, tagline, blurb,
   palette, filters.
3. Tag products with the new slug.

It then appears on the home page, the occasions page, the sitemap, and
gets its own page at `/occasions/<slug>` automatically. Nothing else to
touch.

---

## About prices

There are none on the site, anywhere, on purpose. Every piece is made to
order, and the same box at two budgets is two different boxes.

Instead:

- Product pages say **"Quoted to your brief."**
- The occasions page carries a short paragraph explaining why.
- The box builder collects the brief — including a free-text budget
  field — and sends it to WhatsApp already written out.
- The FAQ answers *"Why aren't there any prices on the website?"* and
  *"Can you work to my budget?"* properly.

If you later want to publish prices, add a `price` field to the `Product`
type and show it in `ProductCard.tsx` — nothing else depends on its
absence.
