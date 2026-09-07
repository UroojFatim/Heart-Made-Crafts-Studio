"use client";

import { useEffect, useRef, useState } from "react";
import BoxArt from "./BoxArt";
import { posterUrl, videoUrl } from "@/lib/media";
import type { Media } from "@/lib/products";
import type { Palette } from "@/lib/palette";

/**
 * Grid-card media.
 *
 * Playback mode is set per product in lib/products.ts:
 *   "auto"   plays muted on loop as soon as it scrolls into view
 *   "hover"  shows a still frame until hovered or focused
 *
 * Three things this handles that a bare <video> doesn't:
 *
 * 1. Nothing plays while off-screen. An IntersectionObserver pauses
 *    every video that scrolls away — otherwise a page of ten clips
 *    decodes ten streams at once and the scroll starts stuttering.
 * 2. On touch devices there is no hover, so "hover" clips fall back to
 *    playing while in view. Otherwise half the catalogue would look
 *    like broken stills on a phone.
 * 3. If the file is missing or fails to decode, it falls back to the
 *    drawn SVG box in that product's palette rather than a black
 *    rectangle — so the grid stays presentable while videos are still
 *    being shot.
 */
export default function ProductMedia({
  media,
  palette,
  id,
  variant = 0,
  className = "",
}: {
  media: Media[];
  palette: Palette;
  id: string;
  variant?: number;
  className?: string;
}) {
  const first = media[0];
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !first) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [first]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !first) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Without a pointer there is no hover, so in-view stands in for it.
    const wantsPlay =
      !reduced &&
      inView &&
      (first.playback === "auto" || hovered || (coarse && first.playback === "hover"));

    if (wantsPlay) {
      // Autoplay can still be refused (low power mode, data saver).
      // Nothing to recover from — the poster frame stays up.
      v.play().catch(() => {});
    } else {
      v.pause();
      if (!inView) v.currentTime = 0;
    }
  }, [inView, hovered, coarse, first]);

  if (!first || failed) {
    return (
      <BoxArt palette={palette} id={id} variant={variant} className={className} />
    );
  }

  return (
    <div
      ref={wrapRef}
      className="relative h-full w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <video
        ref={videoRef}
        className={className}
        src={videoUrl(first.id)}
        poster={posterUrl(first.id)}
        aria-label={first.alt}
        muted
        loop
        playsInline
        preload="metadata"
        onError={() => setFailed(true)}
      />

      {/* Quiet cue that there's motion here, on hover-mode clips only */}
      {first.playback === "hover" && !hovered && !coarse && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.16em] text-paper backdrop-blur-sm"
        >
          <svg width="8" height="9" viewBox="0 0 8 9" aria-hidden="true">
            <path d="M0 0l8 4.5L0 9z" fill="currentColor" />
          </svg>
          Hover
        </span>
      )}
    </div>
  );
}
