"use client";

import { useEffect, useRef } from "react";

/**
 * ── THE SIGNATURE VISUAL ──────────────────────────────────────────
 *
 * A single satin ribbon runs the entire height of the document,
 * weaving left and right between sections. It draws itself as you
 * scroll, with a bead of light travelling at the drawing head.
 *
 * The ribbon is anchored to the *document*, not the viewport, so it
 * threads behind opaque paper panels and re-emerges in the gaps —
 * which is what a real ribbon under a stack of paper does. That
 * layering is the point; sections are deliberately left transparent
 * where the ribbon should show.
 *
 * Implementation notes:
 * - preserveAspectRatio="none" stretches a 100×1000 grid to the full
 *   document, so the weave stays proportional at any page length.
 * - vector-effect="non-scaling-stroke" keeps the ribbon a constant
 *   width despite that extreme non-uniform scale. Without it the
 *   ribbon would be squashed to a hairline.
 * - Only two attributes are written per frame, both on the same two
 *   paths, so there is no layout work in the scroll handler.
 */

const PATH =
  "M 78 0 C 78 62, 20 92, 22 162 C 24 232, 86 252, 84 332 " +
  "C 82 412, 14 424, 16 502 C 18 580, 88 602, 86 682 " +
  "C 84 762, 20 784, 24 862 C 27 928, 60 946, 58 1000";

export default function RibbonSpine() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ribbonRef = useRef<SVGPathElement>(null);
  const sheenRef = useRef<SVGPathElement>(null);
  const glintRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ribbon = ribbonRef.current;
    const sheen = sheenRef.current;
    const glint = glintRef.current;
    if (!ribbon || !sheen || !glint) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Path length is measured in the *unscaled* user space, which is
    // exactly what stroke-dash* operates in. Safe under the stretch.
    const L = ribbon.getTotalLength();
    ribbon.style.strokeDasharray = `${L}`;
    sheen.style.strokeDasharray = `${L}`;

    if (reduced) {
      ribbon.style.strokeDashoffset = "0";
      sheen.style.strokeDashoffset = "0";
      glint.style.display = "none";
      return;
    }

    let raf = 0;
    let last = -1;

    const draw = () => {
      raf = 0;
      const doc = document.documentElement.scrollHeight;
      if (doc <= 0) return;

      // Keep the drawing head just below the fold so the ribbon
      // always feels like it is leading the reader down the page.
      const head = window.scrollY + window.innerHeight * 0.82;
      const p = Math.max(0, Math.min(1, head / doc));
      if (Math.abs(p - last) < 0.0008) return;
      last = p;

      const drawn = L * p;
      const off = `${L - drawn}`;
      ribbon.style.strokeDashoffset = off;
      sheen.style.strokeDashoffset = off;

      // A 9-unit bright segment parked exactly at the head.
      const lead = Math.max(0, drawn - 9);
      glint.style.strokeDasharray = `0 ${lead} 9 ${L}`;
      glint.style.opacity = p > 0.995 ? "0" : "1";
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    /* Sized by CSS, not JS.
       This used to set an explicit pixel height from
       documentElement.scrollHeight — but an absolutely positioned child
       *contributes* to that same scrollHeight, so each measurement grew
       the page a little and the next measurement grew it again. The
       result was a few hundred pixels of dead space below the footer.
       `inset-0` resolves against body's own height instead, which is
       driven by content, so there's no loop to guard against. */
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 select-none"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="ribbon-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-rose)" stopOpacity="0.2" />
            <stop offset="0.12" stopColor="var(--color-rose)" stopOpacity="0.82" />
            <stop offset="0.5" stopColor="var(--color-rose-deep)" stopOpacity="0.7" />
            <stop offset="0.88" stopColor="var(--color-rose)" stopOpacity="0.8" />
            <stop offset="1" stopColor="var(--color-gold)" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Body of the ribbon */}
        <path
          ref={ribbonRef}
          d={PATH}
          className="ribbon-path"
          stroke="url(#ribbon-fade)"
          strokeWidth={16}
          vectorEffect="non-scaling-stroke"
        />

        {/* Satin core — a brighter line down the middle is what makes
            real double-faced ribbon read as satin rather than as tape */}
        <path
          ref={sheenRef}
          d={PATH}
          className="ribbon-path"
          stroke="var(--color-blush)"
          strokeWidth={3}
          strokeOpacity={0.62}
          vectorEffect="non-scaling-stroke"
        />

        {/* Bead of light at the drawing head */}
        <path
          ref={glintRef}
          d={PATH}
          className="ribbon-path"
          stroke="var(--color-candle)"
          strokeWidth={16}
          strokeOpacity={0.95}
          vectorEffect="non-scaling-stroke"
          style={{ transition: "opacity 600ms var(--ease-settle)" }}
        />
      </svg>
    </div>
  );
}
