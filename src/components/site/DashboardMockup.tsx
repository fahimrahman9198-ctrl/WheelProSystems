"use client";

import { motion } from "framer-motion";
import { Bot, CalendarCheck, CreditCard, Gauge, MessageSquareText } from "lucide-react";

const pipeline = [
  { label: "New leads", value: "18", color: "bg-cyan-300" },
  { label: "Quotes sent", value: "11", color: "bg-electric-400" },
  { label: "Booked jobs", value: "7", color: "bg-success-400" },
  { label: "Deposits", value: "5", color: "bg-warning-400" },
];

const activity = [
  { icon: MessageSquareText, label: "Photo quote received", meta: "Rim repair intake" },
  { icon: Bot, label: "AI summary drafted", meta: "Damage, finish, urgency" },
  { icon: CalendarCheck, label: "Booking slot selected", meta: "Mobile route window" },
  { icon: CreditCard, label: "Deposit link ready", meta: "Payment integration" },
];

export function DashboardMockup() {
  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-[#070B12]/90 p-4 shadow-[0_28px_100px_rgba(0,0,0,0.45)] backdrop-blur md:p-5"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-300">Command center</p>
          <h3 className="mt-1 text-xl font-semibold text-white">Service Pipeline</h3>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-electric-400/40 bg-electric-500/10 text-electric-300">
          <Gauge className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-4">
        {pipeline.map((metric, index) => (
          <motion.div
            key={metric.label}
            className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <div className={`mb-4 h-1 w-10 rounded-full ${metric.color}`} />
            <p className="font-mono text-2xl font-semibold text-white">{metric.value}</p>
            <p className="mt-1 text-xs text-steel-400">{metric.label}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Live workflow</p>
            <span className="rounded-full bg-success-400/10 px-2.5 py-1 text-xs text-success-400">Active</span>
          </div>
          <div className="space-y-3">
            {activity.map(({ icon: Icon, label, meta }) => (
              <div key={label} className="flex items-center gap-3 rounded-lg border border-white/10 bg-lab-950/70 p-3">
                <Icon className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                <div>
                  <p className="text-sm text-white">{label}</p>
                  <p className="text-xs text-steel-400">{meta}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
          <p className="text-sm font-semibold text-white">Automation health</p>
          <div className="mt-5 space-y-4">
            {["Lead response", "Quote follow-up", "Deposit prompt"].map((item, index) => (
              <div key={item}>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-steel-300">{item}</span>
                  <span className="font-mono text-cyan-300">{92 - index * 7}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-electric-500 to-cyan-300"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${92 - index * 7}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
