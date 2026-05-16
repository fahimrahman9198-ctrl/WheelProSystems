import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { agencyNavLinks, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060910] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Link href="/" className="flex w-fit items-center gap-3">
            <div className="relative h-9 w-9 flex-shrink-0">
              <Image
                src={siteConfig.logoUrl}
                alt="WheelPro Systems"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-semibold text-white">{siteConfig.agencyName}</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-steel-300">
            AI-powered systems for service businesses — quote intake, booking flows, payment collection, dashboards, and automation. Built to turn scattered leads into booked jobs.
          </p>
          <a href={`mailto:${siteConfig.email}`} className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-white">
            <Mail className="h-4 w-4" aria-hidden="true" />
            {siteConfig.email}
          </a>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-steel-400">Navigation</h2>
          <ul className="mt-4 space-y-3">
            {agencyNavLinks.map((link) => (
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
                Book a Free Growth Audit
              </Link>
            </li>
            <li className="text-sm text-steel-300">{siteConfig.domain}</li>
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
