import { GitBranch, ShieldCheck, Wrench, Zap } from "lucide-react";

const items = [
  { icon: Wrench, label: "Built for mobile service workflows" },
  { icon: GitBranch, label: "Designed for quote-based service businesses" },
  { icon: Zap, label: "Focused on lead response, booking, payment, and follow-up" },
  { icon: ShieldCheck, label: "Founder-led, no fake agency claims" },
];

export function TrustBar() {
  return (
    <div className="grid gap-3 border-y border-white/10 bg-white/[0.025] px-4 py-5 sm:px-6 lg:grid-cols-4 lg:px-8">
      {items.map(({ icon: Icon, label }) => (
        <div key={label} className="mx-auto flex w-full max-w-7xl items-center gap-3 text-sm text-steel-200">
          <Icon className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
