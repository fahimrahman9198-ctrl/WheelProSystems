"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

type ProblemCardProps = {
  title: string;
  copy: string;
};

export function ProblemCard({ title, copy }: ProblemCardProps) {
  return (
    <motion.article
      className="rounded-xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_16px_60px_rgba(0,0,0,0.22)] backdrop-blur"
      whileHover={{ y: -4, borderColor: "rgba(54,216,255,0.35)" }}
    >
      <AlertCircle className="mb-5 h-5 w-5 text-cyan-300" aria-hidden="true" />
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-steel-300">{copy}</p>
    </motion.article>
  );
}
