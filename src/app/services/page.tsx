import type { Metadata } from "next";
import { Bot, Building2, CalendarCheck, Camera, CheckCircle2, Globe2, LayoutDashboard, MessageSquareText } from "lucide-react";
import { BookingCTA } from "@/components/site/BookingCTA";
import { PageHeader } from "@/components/site/PageHeader";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Wheel Repair Website, Booking & Automation Services",
  description:
    "WheelPro Systems builds wheel repair websites, photo quote intake, AI-assisted quote workflows, booking, deposits, dashboards, dealer portals, and follow-up automation.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Wheel Repair Website, Booking & Automation Services | WheelPro Systems",
    description:
      "Specialized systems for wheel repair businesses: photo quote intake, booking, deposits, dashboards, dealer portals, and follow-up automation.",
    url: "/services",
    siteName: "WheelPro Systems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wheel Repair Website, Booking & Automation Services",
    description: "Photo quote forms, booking flows, deposits, dashboards, portals, and automation for wheel shops.",
  },
};

const icons = [Globe2, Camera, CalendarCheck, Bot, LayoutDashboard, Building2, MessageSquareText];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Systems Built for Wheel Repair Businesses"
        copy="WheelPro Systems builds the full lead-to-booking operating layer for wheel repair, rim repair, mobile wheel service, and refinishing shops."
        cta="Book a Free Wheel Shop System Audit"
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 lg:grid-cols-2">
            {services.map((service, index) => {
              const Icon = icons[index] ?? CheckCircle2;
              return (
                <article key={service.title} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300/[0.055]">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-300 shadow-[0_0_28px_rgba(47,140,255,0.12)]">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="text-2xl font-semibold text-white">{service.title}</h2>
                      <p className="mt-3 text-sm leading-6 text-steel-300">{service.description}</p>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border border-white/10 bg-lab-950/70 p-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-300">Problem</p>
                      <p className="mt-2 text-xs leading-5 text-steel-300">{service.problem}</p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-lab-950/70 p-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-300">Build</p>
                      <p className="mt-2 text-xs leading-5 text-steel-300">{service.build}</p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-lab-950/70 p-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-cyan-300">Result</p>
                      <p className="mt-2 text-xs leading-5 text-steel-300">{service.result}</p>
                    </div>
                  </div>
                  {(index === 2 || index === 5) && (
                    <a href="/book" className="mt-6 inline-flex items-center gap-2 rounded-lg border border-electric-500/70 bg-electric-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-electric-400">
                      Book a Free Wheel Shop System Audit
                    </a>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <BookingCTA title="Book a Free Wheel Shop System Audit" copy="I’ll review your website, quote flow, booking process, and follow-up system, then show you where leads are leaking." />
    </>
  );
}
