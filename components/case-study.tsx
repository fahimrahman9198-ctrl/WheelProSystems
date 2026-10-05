"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Tag } from "./ui/bits";
import { ArrowButton } from "./ui/button";
import { Reveal } from "./ui/motion";

const facts = [
  { k: "Shop", v: "Burnaby, Lower Mainland" },
  { k: "Mobile", v: "Vancouver Island and the Interior" },
  { k: "Customers", v: "Dealers, fleets and owners" },
];

export function CaseStudy() {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Starts at 0 so server and client render the same; reduced motion stays still.
  const y = useTransform(scrollYProgress, (v) => (reduce ? 0 : -60 * v));

  return (
    <section id="case-study" className="section">
      <div className="wrap">
        <Reveal>
          <p className="t-label mb-4 text-center text-ink-3">Case study</p>
          <h2 className="t-h1 mx-auto max-w-[18ch] text-center">
            Already running in
            <br />a <span className="t-outline">real wheel shop</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid items-center gap-10 md:mt-24 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal className="flex flex-wrap items-center gap-2.5">
              <span className="text-[15px] font-semibold tracking-tight text-ink">WESTERN WHEELCRAFT</span>
              <Tag>Wheel repair · BC</Tag>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="t-h2 mt-5">Shop and mobile wheel refinishing across BC</h3>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 text-[16px] leading-relaxed text-ink-2">
                Western Wheelcraft serves dealerships, fleets and private owners from a Burnaby shop and a mobile fleet. WheelPro
                designed and built the website their customers use to get quotes and book.
              </p>
            </Reveal>
            <Reveal delay={0.24} className="mt-6 flex flex-wrap gap-2">
              {["Website", "Quotation", "Email automation", "Booking"].map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </Reveal>
            <Reveal delay={0.32} className="mt-8">
              <ArrowButton href="https://westernwheelcraft.ca" target="_blank" rel="noopener noreferrer">
                Visit their site
              </ArrowButton>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-8">
            <a
              ref={ref}
              href="https://westernwheelcraft.ca"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open westernwheelcraft.ca in a new tab"
              className="group block overflow-hidden bg-[#0e0f11] p-3"
            >
              <div className="overflow-hidden rounded-md border border-line bg-white">
                <div className="flex items-center gap-1.5 border-b border-line px-3 py-2.5">
                  <i className="size-2 rounded-none bg-line-strong" />
                  <i className="size-2 rounded-none bg-line-strong" />
                  <i className="size-2 rounded-none bg-line-strong" />
                  <span className="t-mono ml-3 rounded-none bg-subtle px-2.5 py-0.5 text-[11px] text-ink-3">westernwheelcraft.ca</span>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <motion.div style={{ y }} className="absolute inset-x-0 -top-[2%] h-[112%]">
                    <Image
                      src="/western-wheelcraft.jpg"
                      alt="Western Wheelcraft homepage: Wheel Repair and Refinishing for BC Drivers, with Book an Appointment and See Our Services buttons"
                      fill
                      sizes="(min-width: 1024px) 760px, 100vw"
                      className="object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]"
                    />
                  </motion.div>
                </div>
              </div>
            </a>
          </Reveal>
        </div>

        <Reveal className="mt-10 grid border-t border-line sm:grid-cols-3">
          {facts.map((f) => (
            <div key={f.k} className="border-b border-line py-5 sm:border-b-0 sm:py-6">
              <p className="t-mono text-[12px] text-ink-3 uppercase">{f.k}</p>
              <p className="mt-1 text-[16px] font-medium text-ink">{f.v}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
