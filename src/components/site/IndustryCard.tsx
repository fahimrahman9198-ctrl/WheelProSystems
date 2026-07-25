"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type IndustryCardProps = {
  title: string;
  description: string;
  fit: string;
  featured?: boolean;
  image?: string;
  imageAlt?: string;
};

export function IndustryCard({ title, description, fit, featured, image, imageAlt }: IndustryCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className={
        "relative isolate overflow-hidden " +
        (featured
          ? "rounded-xl border border-cyan-300/40 bg-electric-500/10 p-6 shadow-[0_0_40px_rgba(47,140,255,0.14)]"
          : "rounded-xl border border-white/10 bg-white/[0.04] p-6")
      }
    >
      {image && (
        <>
          <motion.div
            className="absolute inset-0 -z-10"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={image}
              alt={imageAlt ?? ""}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover opacity-60"
            />
          </motion.div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[rgba(5,7,13,0.85)] via-[rgba(5,7,13,0.78)] to-[rgba(5,7,13,0.92)]" />
        </>
      )}
      <div className="mb-5 flex items-center justify-between gap-4">
        <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-cyan-300 backdrop-blur">
          {fit}
        </span>
        <ArrowRight className="h-4 w-4 text-steel-400" aria-hidden="true" />
      </div>
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-4 text-sm leading-6 text-steel-200">{description}</p>
    </motion.article>
  );
}
