"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

type ServiceCardProps = {
  title: string;
  problem: string;
  build: string;
  result: string;
  href?: string;
};

export function ServiceCard({ title, problem, build, result, href = "/book" }: ServiceCardProps) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="group h-full rounded-xl border border-white/10 bg-white/[0.045] p-6 backdrop-blur transition-colors hover:border-electric-400/50 hover:bg-white/[0.065]"
    >
      <Link href={href} className="flex h-full flex-col">
        <div className="mb-6 flex items-start justify-between gap-5">
          <h3 className="text-xl font-semibold leading-snug text-white">{title}</h3>
          <span className="rounded-lg border border-white/10 bg-lab-900 p-2 text-cyan-300 transition-colors group-hover:border-cyan-300/40">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
        <div className="space-y-4 text-sm leading-6 text-steel-300">
          <p><span className="text-steel-100">Problem:</span> {problem}</p>
          <p><span className="text-steel-100">We build:</span> {build}</p>
          <p className="flex gap-2 text-steel-100">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success-400" aria-hidden="true" />
            {result}
          </p>
        </div>
        <span className="mt-6 inline-flex text-sm font-semibold text-cyan-300">
          Book a Free Growth Audit
        </span>
      </Link>
    </motion.article>
  );
}
