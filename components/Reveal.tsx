"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Variant = "up" | "left" | "right" | "scale" | "lid";

type Props = {
  children: ReactNode;
  /** Direction the element settles from. */
  variant?: Variant;
  /** Stagger, in ms. */
  delay?: number;
  /** Fraction of the element that must be visible. */
  amount?: number;
  className?: string;
};

/**
 * Scroll-reveal wrapper.
 *
 * Deliberately not a motion library: the whole animation lives in CSS
 * (see [data-reveal] in globals.css) and this only flips one attribute.
 * That keeps the JS cost at a single IntersectionObserver entry per
 * element, and means `prefers-reduced-motion` is handled in one place
 * rather than in every component.
 */
export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  amount = 0.18,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout>;

    // Already above the fold on load — show it without waiting for a scroll.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      timer = setTimeout(() => setShown(true), delay);
      return () => clearTimeout(timer);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setShown(true), delay);
          io.disconnect();
        }
      },
      { threshold: amount, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, [delay, amount]);

  return (
    <div
      ref={ref}
      data-reveal={variant}
      data-revealed={shown ? "true" : "false"}
      className={className}
    >
      {children}
    </div>
  );
}
