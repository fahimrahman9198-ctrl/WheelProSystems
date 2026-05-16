"use client";

import { motion } from "framer-motion";

export function AnimatedGridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(47,140,255,0.16),transparent_34%),linear-gradient(180deg,rgba(5,7,11,0),#05070B_86%)]" />
      <motion.div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(93,168,255,0.28) 1px, transparent 1px), linear-gradient(90deg, rgba(93,168,255,0.28) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
        animate={{ backgroundPosition: ["0px 0px", "72px 72px"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute left-1/2 top-0 h-px w-[80vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-electric-300/80 to-transparent" />
    </div>
  );
}
