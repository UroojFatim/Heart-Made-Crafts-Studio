"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { occasions, type Occasion, type Product } from "@/lib/products";
import { pkr } from "@/lib/site";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

type Sort = "featured" | "low" | "high" | "quick";

export default function ShopGrid({ products }: { products: Product[] }) {
  const [occasion, setOccasion] = useState<Occasion | "All">("All");
  const [max, setMax] = useState(35000);
  const [sort, setSort] = useState<Sort>("featured");

  const list = useMemo(() => {
    const filtered = products.filter(
      (p) =>
        (occasion === "All" || p.occasions.includes(occasion)) && p.price <= max,
    );

    const sorted = [...filtered];
    if (sort === "low") sorted.sort((a, b) => a.price - b.price);
    if (sort === "high") sorted.sort((a, b) => b.price - a.price);
    if (sort === "quick")
      sorted.sort((a, b) => a.leadTimeDays[0] - b.leadTimeDays[0]);
    return sorted;
  }, [products, occasion, max, sort]);

  return (
    <>
      {/* ── Controls ─────────────────────────────────────────── */}
      <Reveal>
        <div className="border-y border-paper-3 py-7">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-7">
            {/* Occasion */}
            <fieldset className="min-w-0">
              <legend className="eyebrow mb-3">Occasion</legend>
              <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
                {(["All", ...occasions] as const).map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setOccasion(o)}
                    aria-pressed={occasion === o}
                    className={`shrink-0 border px-4 py-2 text-[0.82rem] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      occasion === o
                        ? "border-ink bg-ink text-paper"
                        : "border-paper-3 text-ink-2 hover:border-rose hover:text-ink"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Budget */}
            <div className="min-w-[15rem] flex-1">
              <label htmlFor="budget" className="eyebrow mb-1 block">
                Up to {pkr(max)}
              </label>
              <input
                id="budget"
                type="range"
                min={600}
                max={35000}
                step={200}
                value={max}
                onChange={(e) => setMax(Number(e.target.value))}
                className="ribbon-range"
              />
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="sort" className="eyebrow mb-3 block">
                Sort
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="border border-paper-3 bg-paper px-4 py-2 text-[0.85rem] text-ink transition-colors duration-500 hover:border-rose"
              >
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
                <option value="quick">Ready soonest</option>
              </select>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── Results ──────────────────────────────────────────── */}
      <p className="eyebrow mt-7" aria-live="polite">
        {list.length} {list.length === 1 ? "box" : "boxes"}
      </p>

      {list.length === 0 ? (
        <div className="mt-10 border border-dashed border-gold-soft p-12 text-center">
          <p className="display text-[1.7rem]">Nothing in that range yet.</p>
          <p className="mx-auto mt-3 max-w-[38ch] leading-relaxed text-ink-2">
            Widen the budget, or tell us the number you have in mind — we build
            to a budget more often than we build to a menu.
          </p>
          <button
            type="button"
            onClick={() => {
              setOccasion("All");
              setMax(35000);
            }}
            className="link-wipe mt-6 text-[0.9rem]"
          >
            Clear filters
          </button>
        </div>
      ) : (
        /* `layout` is doing the real work here: when a filter changes,
           surviving cards animate from their old grid position to the
           new one instead of teleporting. That single behaviour is most
           of what separates a real storefront from a static page. */
        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.2 } }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 30,
                  mass: 0.9,
                  // Stagger only on entry, and only across a row, so a
                  // filter change doesn't turn into a long wave.
                  delay: (i % 3) * 0.05,
                }}
                className="h-full"
              >
                <ProductCard product={p} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}
