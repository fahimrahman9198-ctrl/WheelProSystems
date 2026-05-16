"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
};

const styles = {
  primary:
    "border-electric-500/70 bg-electric-500 text-white shadow-[0_0_32px_rgba(47,140,255,0.28)] hover:bg-electric-400 hover:border-electric-300",
  secondary:
    "border-white/15 bg-white/[0.04] text-white hover:border-electric-400/70 hover:bg-electric-500/10",
  ghost:
    "border-transparent bg-transparent text-steel-300 hover:text-white hover:bg-white/[0.04]",
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  className,
  external = false,
}: CTAButtonProps) {
  const classNames = cn(
    "group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-300 focus-visible:ring-offset-2 focus-visible:ring-offset-lab-950",
    styles[variant],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
    </>
  );

  if (external) {
    return (
      <motion.a
        href={href}
        className={classNames}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        rel="noreferrer"
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.span whileHover={{ y: -2 }} whileTap={{ y: 0 }} className="inline-flex">
      <Link href={href} className={classNames}>
        {content}
      </Link>
    </motion.span>
  );
}
