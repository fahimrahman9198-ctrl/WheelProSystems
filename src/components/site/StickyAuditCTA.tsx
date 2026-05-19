import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function StickyAuditCTA() {
  return (
    <div className="fixed inset-x-0 bottom-4 z-40 px-4 sm:bottom-5 lg:bottom-6">
      <div className="mx-auto flex max-w-7xl justify-center lg:justify-end">
        <Link
          href="/book"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-300/30 bg-lab-950/88 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(47,140,255,0.24)] backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-lab-900"
        >
          Book Free Audit <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
