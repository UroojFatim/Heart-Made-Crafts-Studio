import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { occasions } from "@/lib/occasions";
import { featuredProducts, productsForOccasion } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Occasions",
  description:
    "Handmade gift boxes, bouquets and keepsakes for birthdays, anniversaries, engagements, Eid, apologies, congratulations and festivals. Made to order in Karachi, delivered across Pakistan.",
};

export default function ShopPage() {
  return (
    <>
      <section className="shell pt-14 lg:pt-20">
        <Reveal>
          <p className="eyebrow">Everything we make</p>
          <h1 className="display-tight mt-5 max-w-[15ch] text-[clamp(2.6rem,6.4vw,4.6rem)]">
            Start with the occasion.
          </h1>
          <p className="mt-6 max-w-[52ch] text-[1.02rem] leading-relaxed text-ink-2">
            Everything is made to order, so treat these as starting points rather
            than a fixed menu. Pick the occasion and narrow it down from there —
            or just message us and skip the browsing.
          </p>
        </Reveal>
      </section>

      {/* ── Occasion tiles ─────────────────────────────────────── */}
      <section className="shell mt-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {occasions.map((o, i) => {
            const count = productsForOccasion(o.slug).length;
            return (
              <Reveal key={o.slug} delay={i * 70} className="h-full">
                <Link
                  href={`/occasions/${o.slug}`}
                  className="surface group relative flex h-full flex-col justify-between overflow-hidden rounded-[4px] p-7 ring-1 ring-paper-3 lg:p-8"
                >
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-70 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle, ${o.palette.glow}, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative">
                    <span
                      className="block h-1 w-10 rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-16"
                      style={{ background: o.palette.ribbon }}
                      aria-hidden="true"
                    />
                    <h2 className="display mt-5 text-[1.9rem] leading-none">
                      {o.name}
                    </h2>
                    <p className="italic-serif mt-2.5 text-[1rem] leading-snug text-ink-2">
                      {o.tagline}
                    </p>
                  </div>

                  <div className="relative mt-8 flex items-center justify-between">
                    <span className="eyebrow">
                      {count} {count === 1 ? "piece" : "pieces"}
                    </span>
                    <span className="flex items-center gap-2 text-[0.84rem] transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5">
                      Browse
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
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── Everything, ungrouped ──────────────────────────────── */}
      <section className="shell mt-28">
        <Reveal>
          <div className="rule-gold" />
          <h2 className="display mt-10 text-[clamp(1.9rem,4vw,2.8rem)]">
            A few we&rsquo;d start you with.
          </h2>
          <p className="mt-3 max-w-[48ch] leading-relaxed text-ink-2">
            Some pieces suit almost any occasion — the chocolate bouquet and the
            handwritten card turn up everywhere. There&rsquo;s more inside each
            occasion than we show here.
          </p>
        </Reveal>

        {/* Featured only. Everything else lives inside its occasion —
            see `featured` in lib/products.ts. */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProducts().map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 70} className="h-full">
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Why no prices ──────────────────────────────────────── */}
      <section className="shell mt-24">
        <Reveal>
          <div className="border-l-2 border-rose bg-paper-2/60 py-7 pl-8 pr-7">
            <h2 className="display text-[1.6rem]">
              Why there are no prices here
            </h2>
            <p className="mt-3 max-w-[56ch] leading-relaxed text-ink-2">
              Every piece is made to order, and the same box at two budgets is
              genuinely two different boxes. Rather than print a number that
              stops being true the moment you change one thing, we quote on your
              actual brief — usually within the hour. Nothing is owed until
              you&rsquo;ve seen options and agreed a figure.
            </p>
            <p className="mt-4 text-[0.86rem] text-ink-3">
              Message us on WhatsApp or Instagram (@{site.instagram}) with the
              occasion, who it&rsquo;s for and roughly what you want to spend.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
