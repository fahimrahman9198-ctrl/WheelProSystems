"use client";

import { LogoLockup } from "@/components/ui/logo";

const links = [
  { href: "#services", label: "Services" },
  { href: "#results", label: "Why WheelPro" },
  { href: "#case-study", label: "Case study" },
  { href: "#faq", label: "FAQ" },
];

export function Logo() {
  return (
    <a href="#top" className="flex items-center text-ink" aria-label="WheelPro Systems, back to top">
      <LogoLockup className="h-[22px] w-auto md:h-6" />
    </a>
  );
}

export function Nav() {
  return (
    <header
      className="nav-glass fixed inset-x-0 top-0 z-50"
    >
      <div className="wrap flex h-[72px] items-center gap-4 md:gap-8">
        <Logo />
        <nav aria-label="Sections" className="mx-auto hidden gap-8 text-[15px] whitespace-nowrap lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-ink-2 transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#book"
          className="ml-auto inline-flex h-10 shrink-0 items-center rounded-md whitespace-nowrap bg-ink px-5 text-[14px] font-medium text-white transition-[background,transform] duration-[240ms] hover:-translate-y-px hover:bg-[#27272a] active:scale-[0.98] lg:ml-0 md:h-11 md:px-5 md:text-[15px]"
        >
          Book<span className="hidden sm:inline">&nbsp;a meeting</span>
        </a>
      </div>
    </header>
  );
}
