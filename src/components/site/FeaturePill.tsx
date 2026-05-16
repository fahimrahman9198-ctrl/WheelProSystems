import { CheckCircle2 } from "lucide-react";

export function FeaturePill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-steel-200">
      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-300" aria-hidden="true" />
      {children}
    </span>
  );
}
