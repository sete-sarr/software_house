"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

// Reduced motion is handled globally by MotionProvider (MotionConfig reducedMotion="user").

const TAGS = {
  div: motion.div,
  h1: motion.h1,
  p: motion.p,
  span: motion.span,
} as const;

type Tag = keyof typeof TAGS;

interface RevealProps {
  as?: Tag;
  className?: string;
  children: React.ReactNode;
}

/** Standalone single-item scroll reveal. Use inside a Server Component. */
export function Reveal({ as = "div", className, children }: RevealProps) {
  const MotionTag = TAGS[as];

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

interface RevealGroupProps {
  /** "view" (default) triggers on scroll into view; "mount" triggers immediately, for above-the-fold content like the hero. */
  mode?: "view" | "mount";
  className?: string;
  children: React.ReactNode;
}

/** Stagger container — pair with RevealItem children. Use inside a Server Component. */
export function RevealGroup({ mode = "view", className, children }: RevealGroupProps) {
  const triggerProps =
    mode === "view"
      ? { whileInView: "visible" as const, viewport: { once: true, margin: "-80px" } }
      : { animate: "visible" as const };

  return (
    <motion.div initial="hidden" {...triggerProps} variants={staggerContainer} className={className}>
      {children}
    </motion.div>
  );
}

interface RevealItemProps {
  as?: Tag;
  className?: string;
  children: React.ReactNode;
}

/** Child of RevealGroup — inherits the stagger trigger from its parent. */
export function RevealItem({ as = "div", className, children }: RevealItemProps) {
  const MotionTag = TAGS[as];

  return (
    <MotionTag variants={fadeInUp} className={className}>
      {children}
    </MotionTag>
  );
}
