import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, CalendarCheck, CreditCard, LayoutDashboard, MailCheck, ShieldCheck } from "lucide-react";
import { industries, offerItems, problems, services, siteConfig, systemFlow } from "@/lib/site";

export const metadata: Metadata = {
  title: "WheelPro Systems | AI Booking & Automation Systems for Mobile Service Businesses",
  description:
    "WheelPro Systems builds AI-powered websites, quote flows, booking systems, payment integrations, dashboards, and automation tools for mobile service businesses.",
  keywords: [
    "AI systems for mobile service businesses",
    "wheel repair booking system",
    "mobile service business automation",
    "quote-to-booking system",
    "AI quote workflow",
    "service business dashboard",
    "booking and payment system",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WheelPro Systems | AI Booking & Automation Systems",
    description:
      "Connected websites, quote flows, booking systems, payment integrations, dashboards, and automation workflows for mobile service businesses.",
    url: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(47,140,255,0.18),transparent_36%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
              {["AI systems for mobile service businesses", "Quote, booking, payment, follow-up"].map((pill) => (
                <span key={pill} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-steel-200">
                  {pill}
                </span>
              ))}
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] text-white md:text-7xl">
              Turn Your Business Into a System
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-steel-200">
              WheelPro Systems builds AI-powered websites, booking flows, payment systems, dashboards, and automation tools for mobile service businesses that want fewer missed leads and more booked jobs.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="inline-flex items-center justify-center gap-2 rounded-lg border border-electric-500/70 bg-electric-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_32px_rgba(47,140,255,0.28)]" href="/book">
                Book a Free Growth Audit <ArrowRight className="h-4 w-4" />
              </Link>
              <Link className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white" href="/systems">
                Explore the System <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-6 max-w-xl text-sm leading-6 text-steel-400">
              Most service businesses do not have a lead problem. They have a system problem.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#070B12]/90 p-5 shadow-[0_28px_100px_rgba(0,0,0,0.45)]">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-300">System flow</p>
            <div className="mt-5 grid gap-3">
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
      </section>

      <section className="grid gap-3 border-y border-white/10 bg-white/[0.025] px-4 py-5 sm:px-6 lg:grid-cols-4 lg:px-8">
        {["Built for mobile service workflows", "Designed for quote-based service businesses", "Lead response, booking, payment, follow-up", "Founder-led, no fake claims"].map((item) => (
          <div key={item} className="mx-auto flex w-full max-w-7xl items-center gap-3 text-sm text-steel-200">
            <ShieldCheck className="h-4 w-4 shrink-0 text-cyan-300" />
            <span>{item}</span>
          </div>
        ))}
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">The real bottleneck</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-white md:text-5xl">
            Scattered tools turn interested leads into unfinished conversations.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {problems.map((problem) => (
              <article key={problem.title} className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-xl font-semibold text-white">{problem.title}</h3>
                <p className="mt-3 text-sm leading-6 text-steel-300">{problem.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

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

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Services</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-white md:text-5xl">
              Practical systems, not generic website packages.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {services.slice(0, 4).map((service) => (
              <article key={service.title} className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-steel-300">{service.result}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {[
            { icon: Bot, label: "AI lead summaries" },
            { icon: CalendarCheck, label: "Booking workflow" },
            { icon: CreditCard, label: "Deposit/payment prompts" },
            { icon: MailCheck, label: "Follow-up automation" },
            { icon: LayoutDashboard, label: "Admin dashboard" },
            { icon: ShieldCheck, label: "B2B portal preview" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <Icon className="mb-4 h-5 w-5 text-cyan-300" />
              <h3 className="font-semibold text-white">{label}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Industries</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-white md:text-5xl">
            Built first for service businesses that operate on wheels.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industries.slice(0, 3).map((industry) => (
              <article key={industry.title} className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-cyan-300">{industry.fit}</p>
                <h3 className="mt-4 text-2xl font-semibold text-white">{industry.title}</h3>
                <p className="mt-4 text-sm leading-6 text-steel-300">{industry.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-cyan-300/30 bg-[linear-gradient(135deg,rgba(47,140,255,0.18),rgba(255,255,255,0.035))] p-8 md:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Founder-led</p>
          <h2 className="mt-4 max-w-4xl text-3xl font-semibold text-white md:text-5xl">
            Direct systems thinking from {siteConfig.founder}.
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-steel-200">
            WheelPro Systems turns scattered calls, manual quotes, missed follow-ups, and outdated websites into one connected digital system.
          </p>
          <Link className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg border border-electric-500/70 bg-electric-500 px-5 py-3 text-sm font-semibold text-white" href="/book">
            Book a Free Growth Audit <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
