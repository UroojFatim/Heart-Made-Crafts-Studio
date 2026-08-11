"use client";

import { useState } from "react";

export type QA = { q: string; a: string };

export default function Accordion({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-paper-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-paper-3">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span
                  className={`display text-[1.35rem] leading-snug transition-colors duration-500 sm:text-[1.5rem] ${
                    isOpen ? "text-ink" : "text-ink-2 group-hover:text-ink"
                  }`}
                >
                  {item.q}
                </span>

                {/* A ribbon-knot toggle: the cross rotates into a plus */}
                <span className="relative mt-2 block h-3.5 w-3.5 shrink-0">
                  <span className="absolute left-0 top-1/2 block h-px w-3.5 -translate-y-1/2 bg-rose" />
                  <span
                    className={`absolute left-1/2 top-0 block h-3.5 w-px -translate-x-1/2 bg-rose transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </h3>

            <div
              id={`faq-panel-${i}`}
              className="acc-panel"
              data-open={isOpen}
              role="region"
            >
              <div>
                <p className="max-w-[62ch] pb-7 pr-10 text-[0.98rem] leading-relaxed text-ink-2">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
