"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { site, waLink } from "@/lib/site";

/**
 * The hero states the promise once, in type, and demonstrates it once,
 * in motion: as you begin to scroll, the lid lifts off the box and the
 * light that was inside spills out. That one gesture is the brand.
 *
 * Two deliberate decisions:
 *
 * 1. The intro animation is pure CSS on its own timeline (`.rise`,
 *    `.line-mask.auto`). An earlier version gated visibility on React
 *    state — which meant that the moment anything upstream broke
 *    hydration, the entire hero rendered at opacity 0. Motion is an
 *    enhancement; being able to read the page is not.
 *
 * 2. The lid is driven by scroll position rather than a one-shot
 *    animation, so the reader controls the reveal. Scroll back up and
 *    the box closes again. If JS never runs, the box simply stays
 *    shut — still a complete image.
 */
export default function Hero() {
  const lidRef = useRef<SVGGElement>(null);
  const contentsRef = useRef<SVGGElement>(null);
  const glowRef = useRef<SVGGElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      lidRef.current?.setAttribute("transform", "translate(-16 -104) rotate(-9 260 300)");
      glowRef.current?.setAttribute("opacity", "1");
      return;
    }

    let raf = 0;
    const apply = () => {
      raf = 0;
      const span = window.innerHeight * 0.7;
      const p = Math.max(0, Math.min(1, window.scrollY / span));
      const e = 1 - Math.pow(1 - p, 3);

      lidRef.current?.setAttribute(
        "transform",
        `translate(${e * -16} ${e * -104}) rotate(${e * -9} 260 300)`,
      );
      contentsRef.current?.setAttribute("transform", `translate(0 ${e * -18})`);
      glowRef.current?.setAttribute("opacity", `${0.18 + e * 0.82}`);
      // The plate lags the page slightly — cheap, convincing depth.
      if (stageRef.current) {
        stageRef.current.style.transform = `translate3d(0, ${p * 34}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Candlelight in the room */}
      <div
        className="orb float-orb"
        style={{
          top: "-14%",
          right: "-6%",
          width: "44rem",
          height: "38rem",
          background:
            "radial-gradient(circle, rgba(255,228,188,0.9), rgba(255,228,188,0))",
        }}
        aria-hidden="true"
      />
      <div
        className="orb float-orb"
        style={{
          top: "26%",
          left: "-14%",
          width: "34rem",
          height: "30rem",
          background:
            "radial-gradient(circle, rgba(224,168,158,0.62), rgba(224,168,158,0))",
          animationDelay: "5s",
        }}
        aria-hidden="true"
      />

      <div className="shell relative grid items-center gap-10 pb-14 pt-6 lg:grid-cols-[1.06fr_1fr] lg:gap-12 lg:pb-20 lg:pt-8">
        {/* ── Type ─────────────────────────────────────────────── */}
        <div className="relative z-10 max-w-[37rem]">
          <p
            className="eyebrow rise flex items-center gap-3"
            style={{ animationDelay: "80ms" }}
          >
            <span className="h-px w-8 bg-gold" />
            Handmade in {site.city}
          </p>

          <h1 className="display-tight mt-5 text-[clamp(2.1rem,4.5vw,3.5rem)]">
            <span className="line-mask auto">
              <span style={{ animationDelay: "160ms" }}>Every box carries</span>
            </span>
            <span className="line-mask auto">
              <span style={{ animationDelay: "255ms" }}>one thing that can</span>
            </span>
            <span className="line-mask auto">
              <span style={{ animationDelay: "350ms" }}>
                only <em className="ink-wash italic-serif not-italic">be theirs.</em>
              </span>
            </span>
          </h1>

          <p
            className="italic-serif rise mt-7 text-[1.22rem] text-ink-2"
            style={{ animationDelay: "480ms" }}
          >
            {site.promise}
          </p>

          <p
            className="rise mt-4 max-w-[42ch] text-[0.98rem] leading-relaxed text-ink-2"
            style={{ animationDelay: "570ms" }}
          >
            A handwritten card in your words. A name painted by hand. A flower
            from a day that already happened. The rest of the box is lovely — but
            that one piece is why they keep it.
          </p>

          <div
            className="rise mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "660ms" }}
          >
            <Link
              href="/build-your-box"
              className="btn bg-ink px-7 py-4 text-[0.85rem] tracking-wide text-paper after:bg-rose"
            >
              Build your box
              <Arrow />
            </Link>
            <a
              href={waLink(
                "Assalam o alaikum! Gift box banwana tha.\n\nKis ke liye: \nOccasion: \nBudget: ",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-ink/25 px-7 py-4 text-[0.85rem] tracking-wide text-ink after:bg-blush"
            >
              Ask on WhatsApp
            </a>
          </div>

          {/* Trust strip */}
          <div
            className="rise mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-paper-3 pt-6"
            style={{ animationDelay: "770ms" }}
          >
            {[
              ["From", "Rs 600"],
              ["Ready in", "2–3 days"],
              ["Delivery", "All Pakistan"],
              ["Payment", "COD available"],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="eyebrow text-[0.6rem]">{k}</p>
                <p className="mt-1 text-[0.9rem] text-ink">{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── The box ──────────────────────────────────────────── */}
        <div className="relative">
          <div
            ref={stageRef}
            className="rise mx-auto max-w-[30rem] lg:max-w-none"
            style={{ animationDelay: "200ms" }}
          >
            <svg
              viewBox="0 0 520 470"
              className="h-auto w-full drop-shadow-[0_40px_70px_rgba(150,69,60,0.18)]"
              role="img"
              aria-label="A gift box whose lid lifts as the page scrolls, revealing light inside"
            >
              <defs>
                <radialGradient id="hero-lamp" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFE4BC" stopOpacity="1" />
                  <stop offset="45%" stopColor="#F7DFC2" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#F3DCD3" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="hero-body" x1="0" y1="0" x2="0.3" y2="1">
                  <stop offset="0%" stopColor="#F8EEE2" />
                  <stop offset="55%" stopColor="#EBD8C4" />
                  <stop offset="100%" stopColor="#DCC3A9" />
                </linearGradient>
                <linearGradient id="hero-lid" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FBF4EA" />
                  <stop offset="46%" stopColor="#EADAC6" />
                  <stop offset="100%" stopColor="#F6EADC" />
                </linearGradient>
                <linearGradient id="hero-ribbon" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#96453C" />
                  <stop offset="42%" stopColor="#C4695E" />
                  <stop offset="55%" stopColor="#E0A89E" />
                  <stop offset="100%" stopColor="#A8524A" />
                </linearGradient>
              </defs>

              <ellipse
                className="lamp"
                cx="260"
                cy="220"
                rx="248"
                ry="208"
                fill="url(#hero-lamp)"
                opacity="0.55"
              />

              <ellipse cx="260" cy="432" rx="182" ry="20" fill="#17120F" opacity="0.13" />

              {/* Light escaping */}
              <g ref={glowRef} opacity="0.18">
                <path d="M150 262 L80 100 L440 100 L370 262 Z" fill="url(#hero-lamp)" opacity="0.68" />
                <ellipse cx="260" cy="252" rx="136" ry="48" fill="#FFE4BC" opacity="0.6" />
              </g>

              {/* ── Contents ── */}
              <g ref={contentsRef}>
                <g transform="rotate(-6 260 208)">
                  <rect x="196" y="148" width="130" height="94" rx="4" fill="#FEFCF8" stroke="#E0CFC0" strokeWidth="1.5" />
                  <path d="M214 178 q11 -12 21 0 t21 0 t21 0 t13 -3" stroke="#C4695E" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                  <path d="M214 196 h74" stroke="#B78B4B" strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
                  <path d="M214 210 h58" stroke="#B78B4B" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
                  <path d="M214 224 q9 -8 17 0 t17 0" stroke="#C4695E" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.8" />
                  <circle cx="308" cy="228" r="11" fill="#96453C" />
                  <circle cx="308" cy="226" r="5" fill="#FDF9F3" opacity="0.3" />
                </g>

                <HeroBloom cx={162} cy={222} r={32} fill="#C4695E" />
                <HeroBloom cx={362} cy={214} r={27} fill="#E0A89E" />
                <HeroBloom cx={330} cy={250} r={19} fill="#C4695E" opacity={0.78} />
                <HeroBloom cx={196} cy={252} r={16} fill="#E0A89E" opacity={0.7} />

                <path d="M126 258 q-26 -52 -6 -88" stroke="#B78B4B" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85" />
                <path d="M396 256 q26 -48 6 -82" stroke="#B78B4B" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85" />
                <path d="M146 250 q-14 -30 -2 -50" stroke="#B78B4B" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55" />

                {[128, 168, 208, 248, 288, 328, 368, 400].map((x, i) => (
                  <circle
                    key={x}
                    className="twinkle"
                    cx={x}
                    cy={262 + (i % 2 ? 5 : 0)}
                    r="4.6"
                    fill="#B78B4B"
                    style={{ animationDelay: `${i * 0.32}s` }}
                  />
                ))}
              </g>

              {/* ── Box body ── */}
              <rect x="118" y="258" width="284" height="166" rx="10" fill="url(#hero-body)" />
              <rect x="118" y="258" width="284" height="12" rx="6" fill="#17120F" opacity="0.12" />
              <rect x="243" y="258" width="36" height="166" fill="url(#hero-ribbon)" />
              <rect x="256" y="258" width="5" height="166" fill="#FDF9F3" opacity="0.34" />

              {/* ── Lid ── */}
              <g ref={lidRef}>
                <rect x="96" y="214" width="328" height="54" rx="11" fill="url(#hero-lid)" />
                <rect x="96" y="214" width="328" height="54" rx="11" fill="none" stroke="#17120F" strokeOpacity="0.09" />
                <rect x="243" y="214" width="36" height="54" fill="url(#hero-ribbon)" />
                <rect x="256" y="214" width="5" height="54" fill="#FDF9F3" opacity="0.34" />

                <path d="M260 214 C 216 208, 188 182, 200 162 C 212 144, 248 172, 260 208 Z" fill="url(#hero-ribbon)" />
                <path d="M260 214 C 304 208, 332 182, 320 162 C 308 144, 272 172, 260 208 Z" fill="url(#hero-ribbon)" />
                <path d="M260 210 C 244 186, 220 176, 204 170" stroke="#FDF9F3" strokeOpacity="0.38" strokeWidth="2.6" fill="none" strokeLinecap="round" />
                <path d="M260 210 C 276 186, 300 176, 316 170" stroke="#FDF9F3" strokeOpacity="0.38" strokeWidth="2.6" fill="none" strokeLinecap="round" />
                <path d="M250 212 q-24 24 -44 30 l14 -34 z" fill="#A8524A" />
                <path d="M270 212 q24 24 44 30 l-14 -34 z" fill="#A8524A" />
                <ellipse cx="260" cy="210" rx="15" ry="12" fill="#96453C" />
                <ellipse cx="260" cy="205" rx="7.5" ry="5" fill="#FDF9F3" opacity="0.28" />
              </g>

              {/* Petals in the air */}
              <g className="drift" opacity="0.8">
                <ellipse cx="452" cy="140" rx="10" ry="6.4" fill="#E0A89E" transform="rotate(24 452 140)" />
              </g>
              <g className="drift-slow" opacity="0.65">
                <ellipse cx="66" cy="186" rx="8.6" ry="5.4" fill="#C4695E" transform="rotate(-32 66 186)" />
              </g>
              <g className="drift" opacity="0.55" style={{ animationDelay: "2.4s" }}>
                <ellipse cx="424" cy="342" rx="7.6" ry="4.8" fill="#E0A89E" transform="rotate(12 424 342)" />
              </g>
              <g className="drift-slow" opacity="0.5" style={{ animationDelay: "4.1s" }}>
                <ellipse cx="88" cy="330" rx="7" ry="4.4" fill="#B78B4B" transform="rotate(-16 88 330)" />
              </g>
            </svg>
          </div>

          <p
            className="eyebrow rise mt-1 hidden items-center gap-3 lg:flex"
            style={{ animationDelay: "1000ms" }}
          >
            <span className="h-px w-10 bg-gold-soft" />
            Scroll to open
          </p>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
      <path
        d="M0 5h14M10 1l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeroBloom({
  cx,
  cy,
  r,
  fill,
  opacity = 1,
}: {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  opacity?: number;
}) {
  return (
    <g opacity={opacity}>
      {[0, 72, 144, 216, 288].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        // Rounded so server and client emit byte-identical markup — raw
        // trig differs in the last decimal between JS engines, and that
        // alone is enough to fail hydration.
        const px = Math.round((cx + Math.cos(rad) * r * 0.46) * 100) / 100;
        const py = Math.round((cy + Math.sin(rad) * r * 0.46) * 100) / 100;
        return (
          <ellipse
            key={deg}
            cx={px}
            cy={py}
            rx={Math.round(r * 56) / 100}
            ry={Math.round(r * 42) / 100}
            fill={fill}
            transform={`rotate(${deg} ${px} ${py})`}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={Math.round(r * 27) / 100} fill="#B78B4B" />
    </g>
  );
}
