"use client";

import { useState } from "react";
import BoxArt from "./BoxArt";
import type { Still } from "@/lib/products";
import type { Palette } from "@/lib/palette";

/**
 * Product-page gallery — photographs.
 *
 * This used to be a video player. It isn't any more: video lives on the
 * home page and nowhere else, so the page a customer lands on from
 * Google now costs one image instead of a 3 MB clip.
 *
 * The stills come from `stillsFor()`, which prefers real photographs
 * and falls back to the frame pulled from a clip. That fallback is why
 * this page still has something to show before the photo shoot.
 *
 * No `next/image` here for the same reason as the cards: these files
 * arrive from R2 already sized and compressed, and re-encoding them on
 * Vercel would cost quota to make them no better.
 */
export default function ProductGallery({
  stills,
  palette,
  id,
  variant = 0,
}: {
  stills: Still[];
  palette: Palette;
  id: string;
  variant?: number;
}) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  const current = stills[index];

  if (!current || failed[index]) {
    return (
      <div
        className="relative overflow-hidden rounded-[4px]"
        style={{
          background: `linear-gradient(165deg, ${palette.box} 0%, var(--color-paper) 74%)`,
        }}
      >
        <BoxArt palette={palette} id={id} variant={variant} className="h-auto w-full" />
      </div>
    );
  }

  return (
    <div>
      <div
        className="relative overflow-hidden rounded-[4px]"
        style={{
          background: `linear-gradient(165deg, ${palette.box} 0%, var(--color-paper) 74%)`,
        }}
      >
        {/* The hero image of the page — loaded eagerly and at high
            priority, because it is almost certainly what Google
            measures as this page's largest paint. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          width={1600}
          height={2000}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-auto w-full"
          onError={() => setFailed((f) => ({ ...f, [index]: true }))}
        />
      </div>

      {stills.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2.5 overflow-x-auto">
          {stills.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show photograph ${i + 1}`}
              aria-current={i === index}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-[3px] border transition-colors duration-400 ${
                i === index ? "border-rose" : "border-paper-3 hover:border-gold-soft"
              }`}
              style={{ background: palette.box }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
