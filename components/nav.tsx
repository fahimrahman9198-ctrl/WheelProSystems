"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#results", label: "Why WheelPro" },
  { href: "#case-study", label: "Case study" },
  { href: "#faq", label: "FAQ" },
];

export function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2 text-[17px] font-semibold tracking-[-0.03em] text-ink" aria-label="WheelPro Systems, back to top">
      <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="currentColor" />
        <circle cx="12" cy="12" r="7.5" fill="none" stroke="#fff" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="2.2" fill="#fff" />
        <g stroke="#fff" strokeWidth="1.6" strokeLinecap="round">
          <path d="M12 9.6V5" />
          <path d="M14.3 11.3l4.3-1.4" />
          <path d="M13.4 14l2.7 3.6" />
          <path d="M10.6 14l-2.7 3.6" />
          <path d="M9.7 11.3L5.4 9.9" />
        </g>
      </svg>
      WheelPro
    </a>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background,border-color,backdrop-filter] duration-300 ${
        scrolled ? "border-line bg-white/85 backdrop-blur-md" : "border-transparent bg-white/0"
      }`}
    >
      <div className="wrap flex h-[72px] items-center gap-4 md:gap-8">
        <Logo />
        <nav aria-label="Sections" className="mx-auto hidden gap-8 text-[15px] md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-ink-2 transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#book"
          className="ml-auto inline-flex h-10 items-center bg-ink px-5 text-[14px] font-medium text-white transition-[background,transform] duration-[240ms] hover:-translate-y-px hover:bg-[#27272a] active:scale-[0.98] md:ml-0 md:h-11 md:px-5 md:text-[15px]"
        >
          Book<span className="hidden sm:inline">&nbsp;a meeting</span>
        </a>
      </div>
    </header>
  );
}
