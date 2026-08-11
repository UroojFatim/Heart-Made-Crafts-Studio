import Link from "next/link";
import type { Product } from "@/lib/products";
import { pkr } from "@/lib/site";
import BoxArt from "./BoxArt";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="lid-group surface group relative flex h-full flex-col overflow-hidden rounded-[4px] ring-1 ring-paper-3 focus-visible:outline-offset-4"
    >
      {/* ── Art plate ─────────────────────────────────────────
          Two stacked washes: a resting one, and a warmer one that
          fades in on hover at the same moment the lid lifts, so the
          whole plate looks lit from inside rather than just tinted. */}
      <div className="relative overflow-hidden">
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

        <BoxArt
          palette={product.palette}
          id={product.slug}
          variant={index}
          className="relative h-auto w-full"
        />

        {/* Price on a tag that swings a little */}
        <div className="absolute right-4 top-4 origin-top-right rotate-[-2.5deg] bg-paper px-3.5 py-2 shadow-[0_8px_20px_-10px_rgb(23_18_15/0.55)] ring-1 ring-paper-3 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[2deg]">
          <span className="text-[0.78rem] font-medium tracking-wide">
            {product.from && <span className="text-ink-3">from </span>}
            {pkr(product.price)}
          </span>
        </div>

        {/* Occasion, bottom-left, slides up on hover */}
        <div className="absolute bottom-4 left-5 flex gap-1.5 opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 [transform:translateY(8px)]">
          {product.occasions.slice(0, 2).map((o) => (
            <span
              key={o}
              className="bg-ink/85 px-2.5 py-1 text-[0.66rem] uppercase tracking-[0.14em] text-paper backdrop-blur-sm"
            >
              {o}
            </span>
          ))}
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
          <span className="eyebrow">
            {product.leadTimeDays[0]}–{product.leadTimeDays[1]} days
          </span>
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
