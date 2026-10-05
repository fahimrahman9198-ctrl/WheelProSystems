"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowButton, GhostLink } from "../ui/button";
import { easeOut } from "../ui/motion";
import { startEclipse } from "./eclipse";

const headline = ["One-stop", "solution", "for", "wheel", "refinishing", "businesses"];
const outlined = new Set([3, 4, 5]);

export function Hero() {
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const trackRef = useRef<SVGSVGElement>(null);
  const liveRef = useRef<HTMLParagraphElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !trackRef.current || !wheelRef.current || !liveRef.current) return;
    return startEclipse(heroRef.current, trackRef.current, wheelRef.current, liveRef.current, !!reduce);
  }, [reduce]);

  // Same first render on server and client; reduced motion just skips the tween.
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: reduce ? { duration: 0 } : { duration: 0.9, ease: easeOut, delay },
  });

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative overflow-hidden pb-[440px] lg:h-[100svh] lg:min-h-[760px] lg:pb-0"
    >
      <svg ref={trackRef} className="pointer-events-none absolute inset-0 z-[1] h-full w-full" aria-hidden="true" />
      <div ref={wheelRef} className="hero-wheel" aria-hidden="true">
        <Image src="/photos/wheel.png" alt="" fill sizes="440px" priority className="object-contain" />
      </div>

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
          <motion.p {...rise(0.45)} className="t-body-lg mt-7 max-w-[44ch] text-ink-2">
            Leads from your website and Gmail get captured, quoted, followed up, invoiced and paid, all in one system.
          </motion.p>
          <motion.div {...rise(0.55)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-5">
            <ArrowButton href="#book">Book a meeting</ArrowButton>
            <GhostLink href="#services">See how it works</GhostLink>
          </motion.div>
        </div>
      </div>

      <p ref={liveRef} className="sr-only" aria-live="polite" />
    </section>
  );
}
