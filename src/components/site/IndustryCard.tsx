"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type IndustryCardProps = {
  title: string;
  description: string;
  fit: string;
  featured?: boolean;
};

export function IndustryCard({ title, description, fit, featured }: IndustryCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className={
        featured
          ? "rounded-xl border border-cyan-300/40 bg-electric-500/10 p-6 shadow-[0_0_40px_rgba(47,140,255,0.14)]"
          : "rounded-xl border border-white/10 bg-white/[0.04] p-6"
      }
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-cyan-300">
          {fit}
        </span>
        <ArrowRight className="h-4 w-4 text-steel-400" aria-hidden="true" />
      </div>
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-4 text-sm leading-6 text-steel-300">{description}</p>
    </motion.article>
  );
}
