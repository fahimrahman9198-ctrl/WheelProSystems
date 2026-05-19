import Link from "next/link";
import { Mail } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { navLinks, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060910] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Link href="/" className="flex w-fit items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center">
              <Logo className="h-9 w-9" />
            </span>
            <span className="font-semibold text-white">{siteConfig.agencyName}</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-steel-300">
            Founder-led systems studio building AI-powered websites, quote flows, booking systems, payment integrations, dashboards, portals, and automation workflows.
          </p>
          <a href={`mailto:${siteConfig.email}`} className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-white">
            <Mail className="h-4 w-4" aria-hidden="true" />
            {siteConfig.email}
          </a>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-steel-400">Explore</h2>
          <ul className="mt-4 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-steel-300 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-steel-400">WheelPro Systems</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <Link href="/book" className="text-sm text-steel-300 hover:text-white">
                Book a Free Wheel Shop System Audit
              </Link>
            </li>
            <li>
              <a href={siteConfig.url} className="text-sm text-steel-300 hover:text-white">
                {siteConfig.domain}
              </a>
            </li>
            <li className="text-sm text-steel-400">{siteConfig.motto}</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-steel-500 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} {siteConfig.agencyName}. All rights reserved.</p>
        <p>Founder-led systems studio by {siteConfig.founder}.</p>
      </div>
    </footer>
  );
}
