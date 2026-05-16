"use client";

import { useMemo, useState } from "react";
import { Sparkles, UploadCloud } from "lucide-react";
import { CTAButton } from "@/components/site/CTAButton";

const damageTypes = ["Curb rash", "Bent wheel", "Clear coat damage", "Color change", "Dealer/fleet batch"];
const urgencyOptions = ["Flexible", "This week", "ASAP"];

export function QuoteDemoForm() {
  const [damage, setDamage] = useState(damageTypes[0]);
  const [urgency, setUrgency] = useState(urgencyOptions[1]);
  const [photos, setPhotos] = useState(2);

  const category = useMemo(() => {
    if (damage.includes("Bent")) return "Repair inspection recommended";
    if (damage.includes("Dealer")) return "B2B batch estimate";
    if (urgency === "ASAP") return "Priority mobile quote";
    return "Photo-ready cosmetic estimate";
  }, [damage, urgency]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.82fr]">
      <form className="rounded-lg border border-white/10 bg-white/[0.04] p-5 md:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Customer name" placeholder="Demo Customer" />
          <Field label="Email" placeholder="demo@example.com" type="email" />
          <Field label="Vehicle" placeholder="2024 demo vehicle" />
          <Field label="Service location" placeholder="Shop, home, or dealer lot" />
        </div>
        <div className="mt-5">
          <label className="text-sm font-medium text-white">Wheel damage type</label>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {damageTypes.map((item) => (
              <button key={item} type="button" onClick={() => setDamage(item)} className={`rounded-lg border px-3 py-3 text-left text-sm transition ${damage === item ? "border-cyan-300/70 bg-cyan-300/10 text-white" : "border-white/10 bg-lab-950/50 text-steel-300"}`}>{item}</button>
            ))}
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-[1fr_0.7fr]">
          <div className="rounded-lg border border-dashed border-cyan-300/30 bg-cyan-300/[0.04] p-5">
            <UploadCloud className="h-7 w-7 text-cyan-300" aria-hidden="true" />
            <p className="mt-3 text-sm font-semibold text-white">Photo upload UI</p>
            <p className="mt-1 text-sm text-steel-300">Mock frontend only. No files are sent.</p>
            <button type="button" onClick={() => setPhotos((value) => Math.min(5, value + 1))} className="mt-4 rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-sm text-white">Add demo photo ({photos})</button>
          </div>
          <div>
            <label className="text-sm font-medium text-white">Urgency</label>
            <div className="mt-3 grid gap-2">
              {urgencyOptions.map((item) => (
                <button key={item} type="button" onClick={() => setUrgency(item)} className={`rounded-lg border px-3 py-3 text-left text-sm transition ${urgency === item ? "border-electric-400/70 bg-electric-500/10 text-white" : "border-white/10 bg-lab-950/50 text-steel-300"}`}>{item}</button>
              ))}
            </div>
          </div>
        </div>
      </form>
      <aside className="rounded-lg border border-cyan-300/20 bg-[#08111F] p-5 md:p-6">
        <Sparkles className="h-8 w-8 text-cyan-300" aria-hidden="true" />
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-cyan-300">AI quote assistant</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">{category}</h2>
        <div className="mt-5 space-y-3 text-sm text-steel-200">
          <p>Damage: {damage}</p>
          <p>Urgency: {urgency}</p>
          <p>Photo count: {photos}</p>
        </div>
        <div className="mt-6"><CTAButton href="/booking">Continue to Booking Demo</CTAButton></div>
      </aside>
    </div>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-white">{label}</span>
      <input type={type} placeholder={placeholder} className="mt-2 w-full rounded-lg border border-white/10 bg-lab-950/70 px-3 py-3 text-sm text-white outline-none placeholder:text-steel-500 focus:border-cyan-300/60" />
    </label>
  );
}
