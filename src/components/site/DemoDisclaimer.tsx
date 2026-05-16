import { demoDisclaimer } from "@/lib/site";

export function DemoDisclaimer() {
  return (
    <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/[0.06] p-4">
      <p className="text-sm leading-6 text-steel-200">{demoDisclaimer}</p>
    </div>
  );
}
