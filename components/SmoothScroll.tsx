"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis smooth scroll.
 *
 * This is the single cheapest thing on the site that makes it feel
 * expensive — momentum and easing on the wheel rather than the
 * browser's stepped jumps.
 *
 * Two things worth knowing:
 *
 * 1. Lenis drives the *real* window scroll position, so `window.scrollY`
 *    stays accurate and native scroll events still fire. That means the
 *    ribbon spine and the hero lid keep working untouched — they read
 *    scrollY in a rAF loop and neither knows Lenis exists.
 *
 * 2. CSS `scroll-behavior: smooth` fights Lenis (both try to own the
 *    animation). Lenis adds a `.lenis` class to <html>, and globals.css
 *    switches scroll-behavior back to auto when it's present — so the
 *    CSS fallback still works if JS never loads.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Touch devices already have native momentum; hijacking it makes
    // phones feel laggy, so wheel-only.
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
