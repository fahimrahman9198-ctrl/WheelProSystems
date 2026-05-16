"use client";

import { motion } from "framer-motion";
import { Bot, CalendarCheck, CreditCard, FileText, MessageSquareText, Send } from "lucide-react";
import { systemFlow } from "@/lib/site";

const icons = [Send, Bot, CalendarCheck, CreditCard, FileText, MessageSquareText];

export function SystemFlow() {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-lab-900/80 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur md:p-6">
      <div className="absolute left-8 right-8 top-1/2 hidden h-px bg-white/10 md:block" aria-hidden="true">
        <motion.div
          className="h-px bg-gradient-to-r from-electric-500 via-cyan-300 to-success-400"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </div>
      <div className="relative grid gap-3 md:grid-cols-5">
        {systemFlow.map((item, index) => {
          const Icon = icons[index];
          return (
            <motion.div
              key={item}
              className="rounded-xl border border-white/10 bg-white/[0.055] p-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-cyan-300">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-steel-400">Step {index + 1}</p>
              <h3 className="mt-1 text-lg font-semibold text-white">{item}</h3>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
