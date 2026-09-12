import Link from "next/link";
import type { Product } from "@/lib/products";
import ProductMedia from "./ProductMedia";
import ProductStill from "./ProductStill";

/**
 * A product in a grid.
 *
 * By default the card shows a **photograph**. Pass `motion` and it
 * shows the clip instead — and only the home page does that.
 *
 * The default matters more than the prop. Video is opt-in now, so a
 * grid added anywhere later is light unless somebody deliberately makes
 * it heavy. That is the reverse of how this started: seven autoplaying
 * clips across the catalogue, roughly 24 MB, most of it downloaded by
 * people who only wanted to see what a box looks like.
 */
export default function ProductCard({
  product,
  index = 0,
  motion = false,
}: {
  product: Product;
  index?: number;
  /** Play the clip rather than show the photo. Home page only. */
  motion?: boolean;
}) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="lid-group surface group relative flex h-full flex-col overflow-hidden rounded-[4px] ring-1 ring-paper-3 focus-visible:outline-offset-4"
    >
      {/* ── Media plate ───────────────────────────────────────── */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(168deg, ${product.palette.box} 0%, var(--color-paper) 72%)`,
          }}
          aria-hidden="true"
        />
        <div
          className="plate-wash absolute inset-0"
          style={{
            background: `radial-gradient(70% 52% at 50% 34%, ${product.palette.glow} 0%, transparent 72%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative h-full w-full">
          {motion ? (
            <ProductMedia
              media={product.media}
              palette={product.palette}
              id={product.slug}
              variant={index}
              className="h-full w-full object-cover"
            />
          ) : (
            <ProductStill
              product={product}
              variant={index}
              priority={index === 0}
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          )}
        </div>

        {/* Lead time, hung like a tag. Prices are quoted on WhatsApp,
            so the card promises turnaround instead of a number. */}
        <div className="absolute right-4 top-4 origin-top-right rotate-[-2.5deg] bg-paper px-3.5 py-2 shadow-[0_8px_20px_-10px_rgb(23_18_15/0.55)] ring-1 ring-paper-3 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[2deg]">
          <span className="text-[0.72rem] font-medium uppercase tracking-[0.12em]">
            {product.leadTimeDays[0]}–{product.leadTimeDays[1]} days
          </span>
        </div>
      </div>

      {/* ── Caption ───────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col p-6 pt-5">
        <h3 className="display text-[1.6rem] leading-none transition-colors duration-500 group-hover:text-rose-deep">
          {product.name}
        </h3>

        <p className="italic-serif mt-2.5 text-[1.02rem] leading-snug text-ink-2">
          {product.tagline}
        </p>

        <div className="rule-gold my-5" />

        <p className="text-[0.82rem] leading-relaxed text-ink-3">
          <span className="text-rose">Handmade in it —</span> {product.handmade}
        </p>

        <div className="mt-5 flex items-center justify-between pt-1">
          <span className="eyebrow">Made to order</span>
          <span className="flex items-center gap-2 text-[0.82rem] text-ink transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5">
            Look inside
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
              <path
                d="M0 5h14M10 1l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
