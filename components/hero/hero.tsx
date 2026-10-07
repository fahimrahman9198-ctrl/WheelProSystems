"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowButton, GhostLink } from "../ui/button";
import { easeOut } from "../ui/motion";
import { startDial } from "./dial";

const headline = ["One-stop", "solution", "for", "wheel", "refinishing", "businesses"];
const outlined = new Set([3, 4]);

// The description, split so the words for each dial step can react when the
// needle reaches that step (s = step number in dial.ts, 0 = plain text).
const sub: [string, number][] = [
  ["Leads", 1],
  [" from your website and Gmail get ", 0],
  ["captured", 1],
  [", ", 0],
  ["quoted", 2],
  [", ", 0],
  ["followed up", 3],
  [", ", 0],
  ["invoiced", 4],
  [" and ", 0],
  ["paid", 5],
  [", all in one system.", 0],
];

export function Hero() {
  const reduce = useReducedMotion();
  const pinRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const dialRef = useRef<SVGSVGElement>(null);
  const ringsRef = useRef<HTMLCanvasElement>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!pinRef.current || !heroRef.current || !dialRef.current || !ringsRef.current || !liveRef.current) return;
    return startDial(heroRef.current, pinRef.current, dialRef.current, ringsRef.current, liveRef.current, !!reduce, setStep);
  }, [reduce]);

  // Same first render on server and client; reduced motion just skips the tween.
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: reduce ? { duration: 0 } : { duration: 0.9, ease: easeOut, delay },
  });

  // The hero pins while the wheel makes one full turn and the needle climbs
  // through the job steps; only then does the page scroll on.
  return (
    <div ref={pinRef} className="relative h-[220svh]">
      <section
        id="top"
        ref={heroRef}
        className="sticky top-0 h-[100svh] min-h-[640px] overflow-hidden bg-hero lg:min-h-[720px]"
      >
        <canvas ref={ringsRef} className="pointer-events-none absolute inset-0 z-0 h-full w-full" aria-hidden="true" />
        <svg ref={dialRef} className="pointer-events-none absolute inset-0 z-[1] h-full w-full" aria-hidden="true" />

        <div className="wrap relative z-[3] pt-[128px] lg:flex lg:h-full lg:items-center lg:pt-[40px]">
          <div className="max-w-[720px]">
            <motion.p {...rise(0)} className="t-label mb-6 text-ink-3">
              Built only for wheel refinishers
            </motion.p>
            <h1 className="t-display">
              {headline.map((w, i) => (
                <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                  <motion.span
                    className={`inline-block ${outlined.has(i) ? "t-outline" : ""}`}
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={reduce ? { duration: 0 } : { duration: 0.9, ease: easeOut, delay: 0.1 + i * 0.06 }}
                  >
                    {w}
                    {i < headline.length - 1 && " "}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p {...rise(0.45)} className="t-body-lg hl mt-7 max-w-[44ch] text-ink-2" data-on={step > 0}>
              {sub.map(([text, s], i) => (
                <span
                  key={i}
                  className={s ? `hl-w ${s === step ? "is-now" : s < step ? "is-done" : "is-next"}` : undefined}
                >
                  {text}
                </span>
              ))}
            </motion.p>
            <motion.div {...rise(0.55)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-5">
              <ArrowButton href="#book">Book a meeting</ArrowButton>
              <GhostLink href="#services">See how it works</GhostLink>
            </motion.div>
          </div>
        </div>

        <p ref={liveRef} className="sr-only" aria-live="polite" />

      </section>
    </div>
  );
}
