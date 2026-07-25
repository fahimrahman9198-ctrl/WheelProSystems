import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bot, Brain, CalendarCheck, LineChart, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import { offerItems, systemFlow } from "@/lib/site";
import { HeroSection } from "@/components/site/HeroSection";

export const metadata: Metadata = {
  title: "WheelPro Systems | AI Systems for Service Businesses",
  description:
    "AI-powered booking, quote, payment, and automation systems for service businesses. Stop losing leads to slow follow-up and manual workflows.",
};

const aiCapabilities = [
  {
    icon: Brain,
    title: "AI Lead Qualification",
    description: "Inbound leads categorized, scored, and routed automatically.",
  },
  {
    icon: Sparkles,
    title: "AI Photo Quote Analysis",
    description: "Customers upload photos, AI estimates pricing in under 60 seconds.",
  },
  {
    icon: MessageSquare,
    title: "AI Customer Follow-Up",
    description: "Missed quotes re-engaged with personalized AI messages.",
  },
  {
    icon: CalendarCheck,
    title: "AI Schedule Intelligence",
    description: "AI manages booking density, route optimization, and capacity forecasting.",
  },
  {
    icon: LineChart,
    title: "AI Revenue Insights",
    description: "Real-time dashboards with AI-flagged problems and suggested fixes.",
  },
  {
    icon: Bot,
    title: "AI Customer Communications",
    description: "Unified inbox with AI-drafted responses across calls, texts, emails, and DMs.",
  },
];

const homeIndustries = [
  {
    title: "Wheel Refinishing",
    description: "Quote-first systems for refinishing, repair requests, photo intake, booking, deposits, and repeat dealer workflows.",
    fit: "Primary fit",
    featured: true,
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1920&q=70",
    imageAlt: "Close-up of an automotive alloy wheel",
  },
  {
    title: "Mobile Detailing",
    description: "Packages, booking, deposits, reminders, upgrades, and customer follow-up for detailers who need better intake and repeat bookings.",
    fit: "Mobile workflow",
    featured: false,
    image: "https://images.unsplash.com/photo-1632823471565-1ecdf5c1b1f6?auto=format&fit=crop&w=1600&q=70",
    imageAlt: "Hands polishing the exterior of a car",
  },
  {
    title: "Fleet Service",
    description: "B2B service requests, unit tracking, account portals, recurring work, invoice visibility, and operational dashboards.",
    fit: "B2B operations",
    featured: false,
    image: "https://images.unsplash.com/photo-1601158935942-52255782d322?auto=format&fit=crop&w=1600&q=70",
    imageAlt: "A row of fleet service trucks",
  },
  {
    title: "Mobile Mechanics",
    description: "Service request qualification, route-friendly booking, deposits, customer updates, and repair workflow visibility.",
    fit: "Road-based service",
    featured: false,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=70",
    imageAlt: "Mechanic working under the hood of a vehicle",
  },
  {
    title: "Dealership Vendors",
    description: "Dealer-facing portals and structured request flows for vendors who need organized intake, approvals, status updates, and invoices.",
    fit: "Repeat accounts",
    featured: false,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1600&q=70",
    imageAlt: "Vehicles parked at a dealership lot",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Tagline strip */}
      <section className="border-y border-white/10 bg-white/[0.025] px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-sm text-steel-400">
            Built for <span className="text-steel-200">wheel refinishing</span> • <span className="text-steel-200">mobile detailing</span> • <span className="text-steel-200">fleet service</span> • <span className="text-steel-200">mobile mechanics</span> • <span className="text-steel-200">dealership vendors</span>
          </p>
        </div>
      </section>

      {/* Core offer */}
      <section className="border-y border-white/10 bg-lab-900/60 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Core offer</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-white md:text-5xl">
            AI Growth System for Mobile Service Businesses
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {offerItems.map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
                <ShieldCheck className="mb-4 h-5 w-5 text-cyan-300" />
                <h3 className="text-base font-semibold text-white">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System flow */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">System flow</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-5xl">
                One connected process, start to finish.
              </h2>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#070B12]/90 p-5 shadow-[0_28px_100px_rgba(0,0,0,0.45)]">
              <div className="grid gap-3">
                {systemFlow.map((step, index) => (
                  <div key={step} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-300/10 font-mono text-sm text-cyan-300">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-white">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="border-y border-white/10 bg-lab-900/60 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">AI that runs the work</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-white md:text-5xl">
            Not just AI features. AI that operates the system.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aiCapabilities.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
                <Icon className="mb-4 h-6 w-6 text-cyan-300" aria-hidden="true" />
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-steel-300">{description}</p>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/ai" className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-white">
              See all AI capabilities <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Industries</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-white md:text-5xl">
            Built first for service businesses that operate on wheels.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {homeIndustries.map((industry) => (
              <article
                key={industry.title}
                className={`group relative isolate overflow-hidden rounded-xl border p-6 ${
                  industry.featured
                    ? "border-cyan-300/30 bg-cyan-300/[0.06] lg:col-span-full"
                    : "border-white/10 bg-white/[0.04]"
                }`}
              >
                <div className="absolute inset-0 -z-10 transition-transform duration-700 group-hover:scale-105">
                  <Image
                    src={industry.image}
                    alt={industry.imageAlt}
                    fill
                    sizes={industry.featured ? "100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                    className="object-cover opacity-50"
                  />
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[rgba(5,7,13,0.82)] via-[rgba(5,7,13,0.75)] to-[rgba(5,7,13,0.92)]" />
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-cyan-300">{industry.fit}</p>
                <h3 className={`mt-4 font-semibold text-white ${industry.featured ? "text-3xl md:text-4xl" : "text-2xl"}`}>
                  {industry.title}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-steel-200">{industry.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Built by an Operator */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-cyan-300/30 bg-[linear-gradient(135deg,rgba(47,140,255,0.18),rgba(255,255,255,0.035))] p-8 md:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Built by an operator</p>
          <h2 className="mt-4 max-w-4xl text-3xl font-semibold text-white md:text-5xl">
            Systems built from real workflows, not stock playbooks.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-steel-200">
            Every workflow in WheelPro Systems exists because the manual version broke something. Missed quotes. Lost follow-ups. Calls that never got returned. We build what we&apos;d actually use to run a high-volume service business — not what looks good in a sales deck.
          </p>
          <Link
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg border border-electric-500/70 bg-electric-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_32px_rgba(47,140,255,0.28)]"
            href="/book"
          >
            Book a Free Growth Audit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
