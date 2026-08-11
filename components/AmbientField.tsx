"use client";

import { useEffect, useRef } from "react";

/**
 * Drifting petals and motes of candlelight.
 *
 * The page needed something alive when nobody is scrolling. Canvas
 * rather than DOM because a few dozen independently-moving elements
 * are far cheaper on one composited surface than as thirty divs the
 * browser has to lay out.
 *
 * Kept honest about cost:
 * - density scales with viewport, halved on small screens
 * - devicePixelRatio capped at 2
 * - rAF stops entirely when the tab is hidden
 * - disabled outright under prefers-reduced-motion
 */

type Petal = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  spin: number;
  angle: number;
  hue: string;
  alpha: number;
  glow: boolean;
};

const COLOURS = ["#C4695E", "#E0A89E", "#B78B4B", "#F3DCD3"];

export default function AmbientField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let petals: Petal[] = [];

    const make = (seeded: boolean): Petal => {
      const glow = Math.random() < 0.32;
      return {
        x: Math.random() * w,
        y: seeded ? Math.random() * h : -20,
        r: glow ? 1.4 + Math.random() * 2.2 : 3 + Math.random() * 5,
        vy: 0.12 + Math.random() * 0.34,
        vx: -0.16 + Math.random() * 0.32,
        spin: (-0.5 + Math.random()) * 0.012,
        angle: Math.random() * Math.PI * 2,
        hue: glow ? "#FFE4BC" : COLOURS[(Math.random() * COLOURS.length) | 0],
        alpha: glow ? 0.3 + Math.random() * 0.4 : 0.12 + Math.random() * 0.26,
        glow,
      };
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = w < 640 ? 14 : w < 1100 ? 24 : 34;
      petals = Array.from({ length: count }, () => make(true));
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of petals) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.y * 0.006) * 0.28;
        p.angle += p.spin;

        if (p.y - p.r > h) Object.assign(p, make(false));
        if (p.x < -30) p.x = w + 20;
        if (p.x > w + 30) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.hue;

        if (p.glow) {
          // A mote of light — soft, round, no hard edge
          ctx.shadowBlur = 12;
          ctx.shadowColor = p.hue;
          ctx.beginPath();
          ctx.arc(0, 0, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // A petal — an ellipse with one pinched end
          ctx.beginPath();
          ctx.ellipse(0, 0, p.r, p.r * 0.58, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    start();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 select-none"
    />
  );
}
