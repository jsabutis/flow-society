"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarDays, Star, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { FindMyTripDialog } from "@/components/site/find-my-trip-dialog";
import { formatMessage, useLanguage } from "./language-provider";

export type ParallaxHeroProps = {
  reviewAvg: number;
  reviewCount: number;
};

const HERO_SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=2400&q=80",
    alt: "Mountain biker carving through a pine forest trail",
  },
  {
    src: "https://images.unsplash.com/photo-1544191696-15693072b5b8?auto=format&fit=crop&w=2400&q=80",
    alt: "Rider descending a rugged mountain bike trail at sunset",
  },
  {
    src: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=2400&q=80",
    alt: "Group of mountain bikers climbing a scenic mountain pass",
  },
];

/**
 * Hero section with a subtle parallax background image and a fade-up
 * intro that softly translates / fades as the user scrolls past it.
 */
export function ParallaxHero({ reviewAvg, reviewCount }: ParallaxHeroProps) {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [reduce]);

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["0%", "20%"],
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1.05, 1.18],
  );

  const copyY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, -60],
  );
  const copyOpacity = useTransform(
    scrollYProgress,
    [0, 0.7],
    reduce ? [1, 1] : [1, 0],
  );

  const ratingLabel =
    reviewCount > 0
      ? formatMessage(t.hero.ratingFormat, {
          avg: reviewAvg.toFixed(1),
          count: reviewCount,
        })
      : t.hero.reviewsGrowing;

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[88vh] overflow-hidden text-white bg-[var(--color-pine)]"
    >
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 z-0 will-change-transform"
      >
        {HERO_SLIDES.map((slide, index) => (
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            animate={{ opacity: index === activeSlide ? 1 : 0 }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Left-to-right: deep shadow for text on the left, fades to nothing on the right */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/80 via-black/35 to-transparent" />
      {/* Top/bottom vignette for a natural, grounded feel */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/25 via-transparent to-black/55" />

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="relative z-[2] mx-auto max-w-7xl px-5 lg:px-8 pt-32 md:pt-44 pb-24 min-h-[88vh] flex flex-col justify-end will-change-transform"
      >
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-xs uppercase tracking-[0.25em] text-white/80"
          >
            {t.hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-serif text-5xl md:text-7xl mt-5 leading-[1.05] tracking-tight"
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-6 text-lg text-white/85 max-w-xl leading-relaxed"
          >
            {t.hero.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild size="lg">
              <Link href="/tours">
                {t.hero.exploreTours} <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <FindMyTripDialog>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
              >
                {t.hero.findMyTrip}
              </Button>
            </FindMyTripDialog>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/75"
          >
            <li className="flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 shrink-0 text-amber-300" aria-hidden />
              <span>{ratingLabel}</span>
            </li>
            <li className="flex items-center gap-1.5">
              <BadgeCheck className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>{t.hero.imbaTrained}</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>{t.hero.smallGroups}</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span>{t.hero.freeCancel}</span>
            </li>
          </motion.ul>
        </div>
      </motion.div>
    </section>
  );
}
