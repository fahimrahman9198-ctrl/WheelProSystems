"use client";

import { animate, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const easeOut = [0.16, 1, 0.3, 1] as const;

/** Fade-up reveal: opacity, 24px rise, 6px blur. Runs once at 15% visibility. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "p";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={reduce ? { duration: 0 } : { duration: 0.9, ease: easeOut, delay }}
    >
      {children}
    </Comp>
  );
}

/** Counts from 0 to `to` when scrolled into view. */
export function CountUp({
  to,
  format = (n) => Math.round(n).toString(),
  duration = 1.6,
  className = "",
}: {
  to: number;
  format?: (n: number) => string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration, ease: easeOut, onUpdate: setVal });
    return () => c.stop();
  }, [inView, to, duration, reduce]);
  return (
    <span ref={ref} className={className}>
      {format(reduce ? to : val)}
    </span>
  );
}
