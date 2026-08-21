"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Page transition.
 *
 * `template.tsx` remounts on every navigation (unlike `layout.tsx`),
 * which is exactly what a route transition needs.
 *
 * Deliberately opacity-only: any transform, filter or will-change on
 * this wrapper would make it the containing block for everything
 * beneath it, breaking `position: fixed` inside pages and quietly
 * changing how the sticky product gallery and builder panel resolve.
 * A fade is worth less than a fade-and-rise, but not at that price.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
