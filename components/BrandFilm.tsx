"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

/**
 * The brand film, as a vertical card.
 *
 * Sits in the About page column where a portrait would go. Plays muted
 * on loop once it scrolls into view; a click unmutes it. That order
 * matters — browsers block autoplay with sound, and a page that starts
 * talking to you unprompted is worse than one that doesn't move.
 *
 * Framed 9:16 with `object-cover`, so it fills the card edge to edge.
 * If the source is landscape this will crop the sides — swap
 * `object-cover` for `object-contain` below if the logo ends up clipped.
 */
export default function BrandFilm({
  src = "/our-logo.mp4",
  poster,
}: {
  src?: string;
  poster?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    const v = videoRef.current;
    if (!el || !v || reduced) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (v.paused) v.play().catch(() => {});
  };

  return (
    <figure ref={wrapRef} className="relative">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[4px] border border-paper-3 bg-espresso shadow-[0_20px_50px_-28px_rgb(23_18_15/0.6)]">
        {failed ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
            <p className="eyebrow text-gold-soft/70">Film unavailable</p>
            <p className="max-w-[24ch] text-[0.82rem] leading-relaxed text-paper/55">
              Check that the file exists at {src}
            </p>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              className="h-full w-full cursor-pointer object-cover"
              src={src}
              poster={poster}
              muted={muted}
              loop
              playsInline
              preload="metadata"
              controls={reduced}
              onClick={toggleSound}
              onError={() => setFailed(true)}
              aria-label="A short film about HeartMade Craft"
            />

            {!reduced && (
              <button
                type="button"
                onClick={toggleSound}
                className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-ink/60 px-3.5 py-2 text-[0.66rem] uppercase tracking-[0.16em] text-paper backdrop-blur-sm transition-colors duration-400 hover:bg-ink"
                aria-label={muted ? "Unmute the film" : "Mute the film"}
              >
                {muted ? (
                  <>
                    <svg width="14" height="12" viewBox="0 0 16 14" fill="none" aria-hidden="true">
                      <path d="M1 5h3l4-3v10L4 9H1z" fill="currentColor" />
                      <path d="M11 5l4 4M15 5l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    Sound
                  </>
                ) : (
                  <>
                    <svg width="14" height="12" viewBox="0 0 16 14" fill="none" aria-hidden="true">
                      <path d="M1 5h3l4-3v10L4 9H1z" fill="currentColor" />
                      <path d="M11 4.5a3.5 3.5 0 010 5M13 2.5a6.5 6.5 0 010 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    Mute
                  </>
                )}
              </button>
            )}
          </>
        )}
      </div>

      <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-[0.82rem] leading-relaxed text-ink-3">
          Made by hand in {site.city}. Delivered across Pakistan.
        </span>

        <a
          href={`https://instagram.com/${site.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-[0.82rem] text-ink-2 transition-colors duration-500 hover:text-ink"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="17.6" cy="6.4" r="1.3" fill="currentColor" />
          </svg>
          @{site.instagram}
          <span className="transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
            <svg width="14" height="9" viewBox="0 0 16 10" fill="none" aria-hidden="true">
              <path
                d="M0 5h14M10 1l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </figcaption>
    </figure>
  );
}
