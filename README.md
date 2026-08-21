# HeartMade Craft

Storefront for a made-to-order gift studio. Next.js 16 · React 19 · Tailwind v4.

Custom design system, scroll-driven SVG choreography, procedural product
illustrations, and a client-side configurator that prices a build in real time.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

No environment variables, no database, no external services. The project runs
offline after install.

```bash
npm run build      # production build
npm run lint       # eslint
```

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Styling | Tailwind CSS v4 — tokens defined in `@theme`, no config file |
| Motion | `motion` for layout/spring animation, `lenis` for smooth scroll, CSS for everything else |
| Type | Fraunces (display) + Geist Sans (body), via `next/font` |
| Deployment | Vercel |

Runtime dependencies are deliberately few: `next`, `react`, `react-dom`,
`motion`, `lenis`. There is no UI kit, no CSS-in-JS layer and no icon package —
icons are inline SVG.

---

## Design direction — "The Unwrapping"

Paper, satin ribbon, and the moment a lid lifts.

| | |
|---|---|
| **Palette** | Paper cream `#FDF9F3` · deep ink `#17120F` · dusty rose `#C4695E` · antique gold `#B78B4B` · espresso `#241A15` for the one dark section |
| **Motion character** | *Tactile and unhurried.* One easing curve — `cubic-bezier(0.22, 1, 0.36, 1)` — used for effectively every transition. Things settle like objects being placed down; nothing bounces. |
| **Signature visual** | A satin ribbon runs the full height of every page, drawing itself as the reader scrolls, threading behind opaque paper panels and re-emerging in the gaps. |

The market this sits in is uniformly pink pastel, so the palette moves
deliberately in the other direction — warm cream and ink with a single dark
section for contrast.

Every colour, easing curve and spacing token lives in one place,
`app/globals.css` under `@theme`. Change it there and it changes everywhere.

---

## Structure

```
app/
  layout.tsx              fonts, metadata, LocalBusiness schema
  template.tsx            route transition
  page.tsx                home
  shop/                   catalogue with filters
  product/[slug]/         product detail (statically generated)
  build-your-box/         the configurator
  about/ faq/ contact/
  sitemap.ts robots.ts
components/
  RibbonSpine.tsx         the scroll-driven ribbon
  Hero.tsx                gift box whose lid lifts with scroll
  BoxBuilder.tsx          price-it-yourself configurator
  BoxArt.tsx              procedural SVG product illustrations
  AmbientField.tsx        canvas petal/bokeh field
  SmoothScroll.tsx        Lenis
  Reveal.tsx              CSS-driven scroll reveals
  Nav · Footer · Marquee · ProductCard · ShopGrid · Reviews · Accordion
lib/
  products.ts             catalogue data
  builder.ts              configurator options and pricing
  site.ts                 contact details, WhatsApp helper, PKR formatter
```

---

## Implementation notes

**The ribbon is anchored to the document, not the viewport.** A `100×1000`
viewBox is stretched across the full page height with
`preserveAspectRatio="none"`, and `vector-effect="non-scaling-stroke"` keeps the
ribbon a constant width despite that extreme non-uniform scale. Scroll progress
drives two `stroke-dash*` values inside a single `requestAnimationFrame` — there
is no layout work in the scroll handler.

**The catalogue is drawn, not photographed.** `BoxArt.tsx` renders a gift box
from each product's own palette, with the contents silhouette varying by
variant. Lid lifts on hover, light spills out. It weighs a couple of kB per
product, scales to any size, and animates natively. Swap `<BoxArt>` for
`<Image>` in `ProductCard.tsx` and `app/product/[slug]/page.tsx` when
photography is available; nothing else changes.

**Above-the-fold content never depends on JS to be visible.** The hero intro
runs on its own CSS timeline (`.rise`, `.line-mask.auto`) rather than React
state, so a hydration failure degrades to "no animation" instead of "no hero".
The scroll-driven lid is progressive enhancement — without JS the box simply
stays shut, which is still a complete image.

**Checkout is WhatsApp, by design.** A payment gateway in this market requires a
registered business and a merchant bank account. The configurator writes the
entire brief — presentation, handmade pieces, contents, delivery, message — into
a pre-filled WhatsApp message, so the first message already contains everything
needed to start work. Entirely client-side: no backend, no running cost.

**Reviews are real or absent.** `components/Reviews.tsx` holds an empty array
and renders an honest empty state explaining how buyers are protected instead.
Add real entries to the array and the section switches to the review wall
automatically.

---

## Configuration

`lib/site.ts` is the single source of truth for contact details and brand copy.

| Field | Notes |
|---|---|
| `whatsapp` | Country code + number, digits only (`0300 1234567` → `923001234567`). Every order button on the site points here. |
| `url` | Must match the deployed domain — feeds `sitemap.xml`, `robots.txt` and Open Graph tags. |
| `instagram`, `email`, `city` | Surfaced in the nav, footer and contact page. |

Product data lives in `lib/products.ts`, configurator pricing in
`lib/builder.ts`.

---

## Performance and accessibility

- No animation library for the ambient layer. All atmospheric motion is CSS or
  canvas; JS only flips attributes or writes two values per frame.
- The canvas field scales density to viewport, caps `devicePixelRatio` at 2, and
  stops its `requestAnimationFrame` loop entirely when the tab is hidden.
- Product pages are statically generated at build time.
- `prefers-reduced-motion` is honoured in one place, at the bottom of
  `globals.css`. Ambient motion stops; narrative motion collapses to its final
  state. No information is lost.
- Skip link, semantic landmarks, visible focus rings, `aria-live` on filtered
  results, keyboard-operable accordion and configurator.

---

## Known work

- Product photography — the drawn catalogue is a stand-in, not a destination.
- Logo assets are larger than their display size warrants and currently bypass
  the image optimizer (`unoptimized`). Re-exporting them as SVG or ~150px PNG
  removes the need for that.
- A CMS, so the catalogue can be edited without a deploy.

---

## License

MIT