import BoxArt from "./BoxArt";
import { coverFor, type Product } from "@/lib/products";

/**
 * A product's photograph, for grids.
 *
 * This is what replaced video everywhere except the home page. A card
 * that used to pull a 3 MB clip now pulls one image of about 200 KB,
 * and the browser can skip even that until the card is near the screen.
 *
 * Three deliberate details:
 *
 * 1. `loading="lazy"` on everything below the first row, `eager` on the
 *    first — the top card is usually the page's largest element, and
 *    lazy-loading it would delay the very measurement Google scores.
 * 2. Fixed `width`/`height` so the browser reserves the right space
 *    before the file arrives. Without them the page jumps as each image
 *    lands, which is the other half of what Core Web Vitals measures.
 * 3. No `next/image`. These files come from R2, already sized and
 *    compressed by `npm run photo`; routing them through /_next/image
 *    would re-encode them on Vercel for no gain and burn the image
 *    quota doing it.
 */
export default function ProductStill({
  product,
  variant = 0,
  priority = false,
  className = "",
}: {
  product: Product;
  variant?: number;
  /** True for the first card on a page. Loads it immediately. */
  priority?: boolean;
  className?: string;
}) {
  const cover = coverFor(product);

  if (!cover) {
    return (
      <BoxArt
        palette={product.palette}
        id={product.slug}
        variant={variant}
        className={className}
      />
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={cover.src}
      alt={cover.alt}
      width={1600}
      height={2000}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={className}
    />
  );
}
