"use client";

import { motion } from "framer-motion";
import { AnimatedGridBackground } from "@/components/site/AnimatedGridBackground";
import { CTAButton } from "@/components/site/CTAButton";
import { FeaturePill } from "@/components/site/FeaturePill";
import { HeroBackgroundCarousel } from "@/components/site/HeroBackgroundCarousel";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-24 pt-24 sm:px-6 lg:px-8 lg:pb-32 lg:pt-32">
      <HeroBackgroundCarousel />
      <AnimatedGridBackground />
      <div className="relative mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            <FeaturePill>AI systems for mobile service businesses</FeaturePill>
            <FeaturePill>Quote, booking, payment, follow-up</FeaturePill>
          </div>
          <h1 className="mx-auto max-w-4xl text-5xl font-semibold leading-[1.02] text-white md:text-7xl">
            Turn Your Service Business Into a System
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-steel-200">
            WheelPro Systems builds AI-powered websites, booking flows, payment systems, dashboards, and automation tools for mobile and service businesses that want fewer missed leads and more booked jobs.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CTAButton href="/book" className="w-full sm:w-auto">
              Book a Free Growth Audit
            </CTAButton>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-steel-300">
            Most service businesses do not have a lead problem. They have a system problem.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
