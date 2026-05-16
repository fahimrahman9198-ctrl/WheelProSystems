import { LockKeyhole } from "lucide-react";
import { CTAButton } from "@/components/site/CTAButton";

export function PaymentMockup() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-300">Service summary</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Mobile curb rash repair</h2>
        <div className="mt-6 space-y-3 text-sm text-steel-300">
          <p>Vehicle: Demo vehicle</p>
          <p>Wheel count: 2 wheels</p>
          <p>Deposit amount: Placeholder only</p>
        </div>
        <p className="mt-6 rounded-lg border border-warning/30 bg-warning/10 p-4 text-sm leading-6 text-warning-400">
          Demo only. This page does not collect, store, or process payment information.
        </p>
      </section>
      <section className="rounded-lg border border-cyan-300/20 bg-[#08111F] p-6">
        <LockKeyhole className="h-7 w-7 text-cyan-300" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-semibold text-white">Secure checkout style UI</h2>
        <div className="mt-6 grid gap-4">
          {["Card number placeholder", "Expiry placeholder", "CVC placeholder", "Billing name placeholder"].map((item) => (
            <div key={item} className="rounded-lg border border-white/10 bg-lab-950/70 px-4 py-3 text-sm text-steel-400">{item}</div>
          ))}
        </div>
        <button className="mt-6 w-full rounded-lg border border-electric-400 bg-electric-500 px-5 py-3 text-sm font-semibold text-white">Pay Demo Deposit</button>
        <div className="mt-4"><CTAButton href="/demo/dashboard" variant="secondary" className="w-full">View Customer Dashboard</CTAButton></div>
      </section>
    </div>
  );
}
