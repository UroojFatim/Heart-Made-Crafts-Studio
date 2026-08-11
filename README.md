# HeartMade Craft

Handmade gift boxes, Karachi. Next.js 16 · React 19 · Tailwind v4 · zero runtime dependencies beyond the framework.

## Run it

```bash
npm install      # if you haven't already
npm run dev      # http://localhost:3000
```

## Before it goes live — 3 things

1. **`lib/site.ts` → `whatsapp`** is a placeholder (`923000000000`). Every order
   button on the site points at it. Change it first.
   Format: country code + number, digits only. `0300 1234567` → `923001234567`.
2. **`app/about/page.tsx`** — two paragraphs and a photo slot are marked with
   `👋 ADNAN` comments. Your own words and a real photo of yourself do more for
   conversion here than anything else on the site.
3. **`lib/site.ts` → `url`** should match the domain you deploy to (used by
   sitemap, robots and Open Graph tags).

## Design direction — "The Unwrapping"

Paper, satin ribbon, and the moment a lid lifts.

| | |
|---|---|
| **Palette** | Paper cream `#FBF7F1` · deep ink `#1A1613` · dusty rose `#C4756B` · antique gold `#B08D57` |
| **Type** | Fraunces (display) + Geist Sans (body) |
| **Motion** | *Tactile & unhurried.* One easing curve — `cubic-bezier(0.22, 1, 0.36, 1)` — used everywhere. Things settle like objects being placed down; nothing bounces. |
| **Signature visual** | A satin ribbon runs the full height of every page, drawing itself as you scroll, threading behind opaque paper panels and re-emerging in the gaps. |

Every colour, easing curve and spacing token lives in `app/globals.css` under
`@theme`. Change it there and it changes everywhere.

## Structure

```
app/
  layout.tsx              fonts, metadata, LocalBusiness schema
  page.tsx                home
  shop/                   catalogue
  product/[slug]/         product detail (statically generated)
  build-your-box/         the interactive builder
  about/ faq/ contact/
  sitemap.ts robots.ts
components/
  RibbonSpine.tsx         ⭐ the scroll-driven ribbon
  Hero.tsx                ⭐ box whose lid lifts with scroll
  BoxBuilder.tsx          ⭐ price-it-yourself → WhatsApp
  BoxArt.tsx              procedural SVG gift boxes (see below)
  Reveal.tsx              CSS-driven scroll reveals
  Nav / Footer / Grain / Marquee / ProductCard / ShopGrid / Reviews / Accordion
lib/
  products.ts             the catalogue
  builder.ts              builder options and prices
  site.ts                 contact details, WhatsApp helper, PKR formatter
```

## Two deliberate decisions

**No photos, so the catalogue is drawn.** `components/BoxArt.tsx` renders a gift
box from each product's own palette — lid lifts on hover, light spills out.
Placeholder greyboxes would have wrecked the art direction. When real
photography exists, swap `<BoxArt>` for `<Image>` inside `ProductCard.tsx` and
`app/product/[slug]/page.tsx`; nothing else changes.

**No invented reviews.** `components/Reviews.tsx` has an empty array and shows an
honest empty state explaining how buyers are protected instead. Fabricated
testimonials are the fastest way to lose this market. Add real ones to the array
and the section switches to the review wall automatically.

## No payment gateway (yet)

Checkout is WhatsApp. A real gateway (Safepay, PayFast) needs a registered
business and a merchant bank account — not worth it before ~20 orders a month.
The builder writes the entire brief into the message, so the first message
already contains everything needed to start work.

## Performance and accessibility

- No animation library. All motion is CSS; JS only flips attributes or writes
  two `stroke-dash*` values per frame inside `requestAnimationFrame`.
- `prefers-reduced-motion` is honoured in one place (bottom of `globals.css`).
  Ambient motion stops; narrative motion collapses to its final state. No
  information is lost.
- Product pages are statically generated at build time.
- Skip link, semantic landmarks, visible focus rings, `aria-live` on filtered
  results, keyboard-operable accordion and builder.

## Deploy

Push to GitHub, import at [vercel.com](https://vercel.com), point the domain at
it. Free tier is comfortably enough — set `NEXT_PUBLIC` nothing, there are no
environment variables.
