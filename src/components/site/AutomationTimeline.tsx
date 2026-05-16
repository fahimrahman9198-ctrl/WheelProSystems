"use client";

import { motion } from "framer-motion";
import { automationSteps } from "@/lib/site";

export function AutomationTimeline() {
  return (
    <div className="grid gap-4">
      {automationSteps.map((step, index) => (
        <motion.article
          key={step.title}
          className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-300">Step {index + 1}</p>
          <h2 className="mt-2 text-xl font-semibold text-white">{step.title}</h2>
          <p className="mt-2 text-sm leading-6 text-steel-300">{step.copy}</p>
        </motion.article>
      ))}
    </div>
  );
}
