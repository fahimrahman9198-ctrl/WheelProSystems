"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { CTAButton } from "@/components/site/CTAButton";
import { cn } from "@/lib/utils";
import { navLinks, siteConfig } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-lab-950/84 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-300/40 bg-electric-500/15 font-mono text-sm font-bold text-cyan-200">
            WD
          </span>
          <span className="font-semibold text-white">{siteConfig.demoName}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-white/[0.06] text-white"
                    : "text-steel-300 hover:bg-white/[0.04] hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <CTAButton href="/quote" className="min-h-10 px-4 py-2">
            Try Quote Demo
          </CTAButton>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-steel-200 lg:hidden"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-lab-950 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm text-steel-200 hover:bg-white/[0.05] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <CTAButton href="/quote" className="mt-3 w-full">
              Try Quote Demo
            </CTAButton>
          </nav>
        </div>
      )}
    </header>
  );
}
