"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin terracotta bar fixed to the very top of the viewport that fills
 * left-to-right as the user scrolls down the document. Sits above the
 * sticky header.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-50 h-[3px] bg-[var(--color-terracotta)]"
    />
  );
}
