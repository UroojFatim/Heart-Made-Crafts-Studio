"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { FilterGroup } from "@/lib/occasions";
import { matchesFilters, type Product } from "@/lib/products";
import ProductCard from "./ProductCard";

/**
 * Sidebar filters + animated grid.
 *
 * The filter groups are passed in rather than defined here, so an
 * occasion page renders exactly the groups set for it in
 * lib/occasions.ts. Adding a filter there makes it appear here with no
 * change to this component.
 *
 * Matching rules live in `matchesFilters` (lib/products.ts): OR inside
 * a group, AND across groups, and an untouched group constrains
 * nothing.
 */
export default function FilteredGrid({
  products,
  filters,
}: {
  products: Product[];
  filters: FilterGroup[];
}) {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [openOnMobile, setOpenOnMobile] = useState(false);

  const toggle = (groupId: string, optionId: string) =>
    setSelected((prev) => {
      const current = prev[groupId] ?? [];
      const next = current.includes(optionId)
        ? current.filter((v) => v !== optionId)
        : [...current, optionId];
      return { ...prev, [groupId]: next };
    });

  const activeCount = Object.values(selected).flat().length;
  const list = useMemo(
    () => products.filter((p) => matchesFilters(p, selected)),
    [products, selected],
  );

  return (
    <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-14">
      {/* ── Filters ──────────────────────────────────────────── */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow">Refine</p>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => setSelected({})}
              className="link-wipe text-[0.78rem] text-ink-2"
            >
              Clear ({activeCount})
            </button>
          )}
        </div>

        {/* Collapsed by default on phones — a wall of checkboxes above
            the products is the fastest way to lose someone on mobile. */}
        <button
          type="button"
          onClick={() => setOpenOnMobile((v) => !v)}
          aria-expanded={openOnMobile}
          className="mt-4 flex w-full items-center justify-between border border-paper-3 px-4 py-3 text-[0.88rem] lg:hidden"
        >
          {openOnMobile ? "Hide filters" : "Show filters"}
          <span
            className={`transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              openOnMobile ? "rotate-45" : ""
            }`}
          >
            +
          </span>
        </button>

        <div className={`${openOnMobile ? "block" : "hidden"} lg:block`}>
          {filters.map((group) => (
            <fieldset key={group.id} className="mt-7 border-t border-paper-3 pt-5">
              <legend className="eyebrow pr-3">{group.label}</legend>
              <div className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:items-start">
                {group.options.map((opt) => {
                  const on = (selected[group.id] ?? []).includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="checkbox"
                      aria-checked={on}
                      onClick={() => toggle(group.id, opt.id)}
                      className={`flex items-center gap-2.5 border px-3.5 py-2 text-left text-[0.84rem] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:w-full lg:border-0 lg:px-0 lg:py-1.5 ${
                        on
                          ? "border-ink bg-ink text-paper lg:bg-transparent lg:text-ink"
                          : "border-paper-3 text-ink-2 hover:border-rose hover:text-ink"
                      }`}
                    >
                      <span
                        className={`hidden h-[15px] w-[15px] shrink-0 items-center justify-center rounded-[2px] border transition-colors duration-400 lg:flex ${
                          on ? "border-rose bg-rose" : "border-ink-3/45"
                        }`}
                      >
                        <svg
                          width="9"
                          height="7"
                          viewBox="0 0 10 8"
                          fill="none"
                          className={`transition-transform duration-400 ${on ? "scale-100" : "scale-0"}`}
                          aria-hidden="true"
                        >
                          <path
                            d="M1 4l2.6 2.6L9 1"
                            stroke="var(--color-paper)"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>
      </aside>

      {/* ── Results ──────────────────────────────────────────── */}
      <div className="min-w-0">
        <p className="eyebrow" aria-live="polite">
          {list.length} {list.length === 1 ? "piece" : "pieces"}
        </p>

        {list.length === 0 ? (
          <div className="mt-8 border border-dashed border-gold-soft p-12 text-center">
            <p className="display text-[1.7rem]">Nothing matches that yet.</p>
            <p className="mx-auto mt-3 max-w-[38ch] leading-relaxed text-ink-2">
              We make almost everything to order, so this is usually a gap in
              what we&rsquo;ve photographed rather than what we can build. Ask
              us.
            </p>
            <button
              type="button"
              onClick={() => setSelected({})}
              className="link-wipe mt-6 text-[0.9rem]"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
          >
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
                    delay: (i % 3) * 0.05,
                  }}
                  className="h-full"
                >
                  {/* No <Reveal> here on purpose — motion is already
                      animating opacity on this wrapper, and stacking a
                      second opacity animation on top leaves cards stuck
                      invisible when the two disagree. */}
                  <ProductCard product={p} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
