"use client";

import { MotionConfig } from "framer-motion";

/**
 * Honors prefers-reduced-motion globally: transform/layout animations become instant,
 * opacity still fades. Handled at animation time, so server and client markup stay identical
 * (branching on useReducedMotion() during render causes hydration mismatches).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
