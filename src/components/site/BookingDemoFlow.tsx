"use client";

import { useState } from "react";
import { CTAButton } from "@/components/site/CTAButton";

const steps = ["Service selection", "Location selection", "Date/time selection", "Deposit mock"];

export function BookingDemoFlow() {
  const [active, setActive] = useState(0);
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
      <div className="grid gap-3 md:grid-cols-4">
        {steps.map((step, index) => (
          <button key={step} type="button" onClick={() => setActive(index)} className={`rounded-lg border p-4 text-left ${active === index ? "border-cyan-300/60 bg-cyan-300/10" : "border-white/10 bg-lab-950/70"}`}>
            <p className="font-mono text-xs text-cyan-300">0{index + 1}</p>
            <p className="mt-1 text-sm font-semibold text-white">{step}</p>
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.75fr]">
        <section className="rounded-lg border border-white/10 bg-lab-950/70 p-5">
          <h2 className="text-2xl font-semibold text-white">{steps[active]}</h2>
          <p className="mt-3 text-sm leading-6 text-steel-300">
            {active === 0 && "Pick curb rash repair, mobile wheel repair, wheel refinishing, or dealer batch request."}
            {active === 1 && "Choose shop drop-off, mobile service address, or dealer/fleet location."}
            {active === 2 && "Select a demo appointment window that could connect to a real calendar."}
            {active === 3 && "Confirm a placeholder deposit. No real payment is processed."}
          </p>
          <button type="button" onClick={() => setActive((value) => Math.min(3, value + 1))} className="mt-5 rounded-lg border border-electric-400 bg-electric-500 px-4 py-2 text-sm font-semibold text-white">
            Continue
          </button>
        </section>
        <aside className="rounded-lg border border-cyan-300/20 bg-cyan-300/[0.05] p-5">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-300">Confirmation preview</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Mobile curb rash repair</h3>
          <p className="mt-3 text-sm text-steel-300">Window: Thursday, 10:00 AM - 12:00 PM</p>
          <p className="mt-2 text-sm text-steel-300">Status: Ready for payment demo</p>
          <div className="mt-6"><CTAButton href="/payment">Open Payment Demo</CTAButton></div>
        </aside>
      </div>
    </div>
  );
}
