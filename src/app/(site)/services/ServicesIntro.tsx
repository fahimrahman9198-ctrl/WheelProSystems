"use client";

import { motion } from "framer-motion";

export function ServicesIntro() {
  return (
    <div className="relative mx-auto max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Services</p>
        <h1 className="mt-4 text-4xl font-semibold leading-[1.05] text-white md:text-6xl">
          We Help Mobile Service Businesses
        </h1>
        <p className="mt-5 text-xl leading-8 text-steel-200">
          Built for businesses that operate in the field and the shop.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mt-10 space-y-5 text-base leading-7 text-steel-200 md:text-lg md:leading-8"
      >
        <p>
          Our expertise is building systems for service businesses that move fast and depend on speed, follow-up, and clean operations.
        </p>
        <p>
          We take the chaos of manual quotes, scattered messages, missed follow-ups, manual booking, and paper-based admin work — and turn it into one connected digital system.
        </p>
        <p>
          From the first photo upload to the final invoice, WheelPro automates what your team currently does manually. So you spend less time managing the work and more time growing the business.
        </p>
      </motion.div>
    </div>
  );
}
