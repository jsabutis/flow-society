"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

// Pre-bind motion components for the tags we actually use, so component
// identity is stable across renders (calling `motion(tag)` inline would
// create a new component on every render and force a remount).
const motionTags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  figure: motion.figure,
  header: motion.header,
  footer: motion.footer,
  nav: motion.nav,
  span: motion.span,
  p: motion.p,
} as const;

type MotionTag = keyof typeof motionTags;

type RevealProps = {
  children: ReactNode;
  /** How far (px) the element travels into place. */
  distance?: number;
  /** Direction the element travels from. */
  direction?: Direction;
  /** Animation duration in seconds. */
  duration?: number;
  /** Delay in seconds before the animation starts. */
  delay?: number;
  /** Margin offset for the IntersectionObserver. Negative pulls the
   *  trigger inward so the element has to be more visible to fire. */
  margin?: string;
  /** Replay every time the element enters the viewport. */
  replay?: boolean;
  className?: string;
  /** Render as a different HTML tag (defaults to <div>). */
  as?: MotionTag;
};

const offsetFor = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 };
    case "right":
      return { x: -distance, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
};

/**
 * Fade + translate an element into place when it scrolls into view.
 * Respects `prefers-reduced-motion` — collapses to an instant fade-in.
 */
export function Reveal({
  children,
  distance = 24,
  direction = "up",
  duration = 0.7,
  delay = 0,
  margin = "-80px",
  replay = false,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motionTags[as];

  const offset = reduce ? { x: 0, y: 0 } : offsetFor(direction, distance);

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reduce ? 0.001 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !replay, margin }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

type RevealStaggerProps = {
  children: ReactNode;
  /** Delay between each child's entrance, in seconds. */
  stagger?: number;
  /** Initial delay before the first child animates. */
  delayStart?: number;
  margin?: string;
  className?: string;
  as?: MotionTag;
};

/**
 * Wrap a list / grid to stagger the entrance of its direct children.
 * Each child should be a `<RevealItem>` (or any motion component that
 * uses the parent variant names "hidden" / "visible").
 */
export function RevealStagger({
  children,
  stagger = 0.08,
  delayStart = 0,
  margin = "-80px",
  className,
  as = "div",
}: RevealStaggerProps) {
  const reduce = useReducedMotion();
  const MotionTag = motionTags[as];

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        delayChildren: reduce ? 0 : delayStart,
      },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

type RevealItemProps = {
  children: ReactNode;
  distance?: number;
  direction?: Direction;
  duration?: number;
  className?: string;
  as?: MotionTag;
};

/**
 * Use inside <RevealStagger> so each child fades up with a stagger
 * controlled by the parent.
 */
export function RevealItem({
  children,
  distance = 20,
  direction = "up",
  duration = 0.6,
  className,
  as = "div",
}: RevealItemProps) {
  const reduce = useReducedMotion();
  const MotionTag = motionTags[as];

  const offset = reduce ? { x: 0, y: 0 } : offsetFor(direction, distance);

  const variants: Variants = {
    hidden: { opacity: 0, ...offset },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: reduce ? 0.001 : duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
