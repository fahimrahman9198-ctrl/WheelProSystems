import { Building2, CarFront, FileText, Gauge } from "lucide-react";

export function DealerPortalMockup() {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
      <aside className="rounded-lg border border-cyan-300/20 bg-cyan-300/[0.05] p-6">
        <Building2 className="h-8 w-8 text-cyan-300" aria-hidden="true" />
        <h2 className="mt-4 text-3xl font-semibold text-white">B2B account dashboard</h2>
        <p className="mt-3 text-sm leading-6 text-steel-300">A fictional dealer/fleet portal preview for repeat accounts that need organized intake, status, and billing visibility.</p>
        <div className="mt-6 grid gap-3">
          {["Monthly activity summary", "Priority queue: 6 jobs", "Unpaid demo invoices: 2", "Photo uploads: enabled"].map((item) => (
            <p key={item} className="rounded-lg border border-white/10 bg-lab-950/70 p-3 text-sm text-steel-200">{item}</p>
          ))}
        </div>
      </aside>
      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-300">Bulk job request</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            { icon: CarFront, title: "Multiple vehicles", copy: "VIN/unit fields and wheel count." },
            { icon: FileText, title: "Photo upload", copy: "Batch photos by vehicle." },
            { icon: Gauge, title: "Priority status", copy: "Standard, urgent, or approval needed." },
          ].map(({ icon: Icon, title, copy }) => (
            <div key={title} className="rounded-lg border border-white/10 bg-lab-950/70 p-4">
              <Icon className="h-5 w-5 text-cyan-300" aria-hidden="true" />
              <h3 className="mt-3 text-sm font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-steel-300">{copy}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
