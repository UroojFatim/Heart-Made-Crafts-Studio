"use client";

import { useEffect, useRef, useState } from "react";
import BoxArt from "./BoxArt";
import { posterUrl, videoUrl } from "@/lib/media";
import type { Media } from "@/lib/products";
import type { Palette } from "@/lib/palette";

/**
 * Product-page gallery.
 *
 * Different rules from the grid: here a click plays with sound. Video
 * starts muted (browsers block unmuted autoplay, and nobody wants a
 * page that shouts at them), then the first click unmutes and plays.
 *
 * Falls back to the drawn box when a product has no video yet.
 */
export default function ProductGallery({
  media,
  palette,
  id,
  variant = 0,
}: {
  media: Media[];
  palette: Palette;
  id: string;
  variant?: number;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState<Record<number, boolean>>({});
  const videoRef = useRef<HTMLVideoElement>(null);

  const current = media[index];

  // Switching clips should never leave the previous one running.
  useEffect(() => {
    setPlaying(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  }, [index]);

  if (media.length === 0 || failed[index]) {
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

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      // First interaction is what earns us the right to make noise.
      setMuted(false);
      v.muted = false;
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <div>
      <div
        className="group relative overflow-hidden rounded-[4px]"
        style={{
          background: `linear-gradient(165deg, ${palette.box} 0%, var(--color-paper) 74%)`,
        }}
      >
        <video
          ref={videoRef}
          key={current.id}
          className="h-auto w-full cursor-pointer"
          src={videoUrl(current.id)}
          poster={posterUrl(current.id)}
          aria-label={current.alt}
          playsInline
          loop
          muted={muted}
          preload="metadata"
          onClick={toggle}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed((f) => ({ ...f, [index]: true }))}
        />

        {/* Play button — only while paused */}
        {!playing && (
          <button
            type="button"
            onClick={toggle}
            className="absolute inset-0 flex items-center justify-center"
            aria-label="Play video with sound"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper/92 shadow-[0_12px_32px_-12px_rgb(23_18_15/0.6)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110">
              <svg width="16" height="18" viewBox="0 0 16 18" aria-hidden="true">
                <path d="M0 0l16 9L0 18z" fill="var(--color-ink)" />
              </svg>
            </span>
          </button>
        )}

        {/* Mute toggle — only once it's running */}
        {playing && (
          <button
            type="button"
            onClick={() => {
              const v = videoRef.current;
              if (!v) return;
              v.muted = !v.muted;
              setMuted(v.muted);
            }}
            className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 text-paper backdrop-blur-sm transition-colors duration-400 hover:bg-ink"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true">
                <path d="M1 5h3l4-3v10L4 9H1z" fill="currentColor" />
                <path d="M11 5l4 4M15 5l-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true">
                <path d="M1 5h3l4-3v10L4 9H1z" fill="currentColor" />
                <path d="M11 4.5a3.5 3.5 0 010 5M13 2.5a6.5 6.5 0 010 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Thumbnails */}
      {media.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2.5 overflow-x-auto">
          {media.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show video ${i + 1}`}
              aria-current={i === index}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-[3px] border transition-colors duration-400 ${
                i === index ? "border-rose" : "border-paper-3 hover:border-gold-soft"
              }`}
              style={{ background: palette.box }}
            >
              {/* Always a poster now — it is derived from the same id as
                  the video, so there is no "no poster yet" branch to
                  fall back to a <video> for. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={posterUrl(m.id)}
                alt=""
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
