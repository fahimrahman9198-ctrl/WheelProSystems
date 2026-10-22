"use client";

import { motion, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { shopInitials } from "@/lib/shops";

/** The shop's floating nav card: sticks on scroll, with a thin orange-to-teal progress line along its foot. */
export function SiteNav({ home, shopName, tagline, phone, phoneHref, quote }: { home: string; shopName: string; tagline: string; phone?: string; phoneHref?: string; quote: string }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });
  const links = [
    { href: `${home}#services`, label: "Services" },
    { href: `${home}#how`, label: "How it works" },
    { href: `${home}#contact`, label: "Contact" },
  ];

  return (
    <div className="sticky top-3 z-40 px-3 pt-3 sm:px-5">
      <nav className="relative mx-auto flex h-[64px] max-w-[1280px] items-center justify-between gap-4 overflow-hidden rounded-[18px] border border-line bg-[var(--card)]/90 px-3 shadow-[0_10px_30px_-18px_rgb(60_45_20/0.35)] backdrop-blur-md sm:px-4">
        <Link href={home} className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-[11px] bg-ink text-[13px] font-semibold tracking-tight text-[#f9f6ee]">{shopInitials(shopName)}</span>
          <span className="min-w-0">
            <span className="block truncate text-[16px] leading-tight font-semibold tracking-[-0.01em] text-ink">{shopName}</span>
            <span className="shop-label block truncate !text-[9.5px]">{tagline}</span>
          </span>
        </Link>
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className="text-[12px] font-medium tracking-[0.16em] text-ink-2 uppercase transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {phone && phoneHref && (
            <a
              href={phoneHref}
              aria-label={`Call ${shopName}`}
              className="hidden h-10 items-center gap-2 rounded-[11px] border border-line-strong bg-[var(--card)] px-3.5 text-[12px] font-semibold tracking-[0.12em] text-ink uppercase transition-colors hover:border-ink sm:inline-flex"
            >
              <Phone size={14} strokeWidth={2} /> {phone}
            </a>
          )}
          <Link
            href={quote}
            className="inline-flex h-10 items-center rounded-[11px] bg-accent px-4 text-[12px] font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:bg-[#d8431f]"
          >
            Get a price
          </Link>
        </div>
        <motion.span
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[linear-gradient(90deg,var(--accent),var(--teal))]"
        />
      </nav>
    </div>
  );
}
