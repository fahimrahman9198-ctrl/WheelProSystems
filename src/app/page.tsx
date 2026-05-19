import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CalendarCheck,
  Camera,
  CheckCircle2,
  CreditCard,
  LayoutDashboard,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";
import { wheelFaqs, wheelWorkflow } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Booking Systems for Wheel Repair & Rim Refinishing Shops | WheelPro Systems",
  description:
    "WheelPro Systems builds AI-powered quote forms, booking flows, deposit collection, dashboards, and follow-up automation for wheel repair and rim refinishing businesses.",
  keywords: [
    "wheel repair booking system",
    "rim repair website",
    "wheel refinishing automation",
    "wheel repair quote form",
    "AI booking system for wheel shops",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI Booking Systems for Wheel Repair & Rim Refinishing Shops",
    description:
      "Turn photo quotes, booking, deposits, dashboards, and follow-up into one connected system for wheel repair shops.",
    url: "/",
    siteName: "WheelPro Systems",
    type: "website",
    images: [{ url: "/images/logo.PNG", width: 443, height: 400, alt: "WheelPro Systems logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Booking Systems for Wheel Repair Shops",
    description:
      "Photo quote forms, booking flows, deposits, dashboards, and follow-up automation for wheel repair businesses.",
    images: ["/images/logo.PNG"],
  },
};

const basicWebsite = [
  "Static service pages",
  "Contact form only",
  "Customer still has to call/text",
  "Quotes handled manually",
  "No deposit collection",
  "No job dashboard",
  "No automated follow-up",
  "No dealer/fleet workflow",
];

const wheelProSystem = [
  "Photo quote request flow",
  "AI-assisted intake summary",
  "Booking and calendar flow",
  "Stripe deposit/payment setup",
  "Lead and job dashboard",
  "Email/SMS follow-up automation",
  "Review request automation",
  "Dealer/fleet portal option",
];

const processSteps = [
  "Customer submits wheel damage photos",
  "System captures service area, vehicle, wheel type, and damage details",
  "AI-assisted intake summarizes the job",
  "Customer gets routed to quote/booking flow",
  "Deposit/payment can be collected",
  "Job enters admin dashboard",
  "Follow-up and review request are automated",
];

const flowIcons = [Camera, Bot, CalendarCheck, CreditCard, LayoutDashboard, MessageSquareText];

function AuditButton({ variant = "primary" }: { variant?: "primary" | "secondary" }) {
  const className =
    variant === "primary"
      ? "inline-flex items-center justify-center gap-2 rounded-lg border border-electric-500/70 bg-electric-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_32px_rgba(47,140,255,0.28)] transition hover:-translate-y-0.5 hover:bg-electric-400 hover:shadow-[0_0_44px_rgba(47,140,255,0.38)]"
      : "inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-white/[0.07]";

  return (
    <Link className={className} href="/book">
      Book a Free Wheel Shop System Audit <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: wheelFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(47,140,255,0.24),transparent_34%),linear-gradient(180deg,rgba(5,7,11,0),#05070B_88%)]" />
        <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(rgba(93,168,255,0.25)_1px,transparent_1px),linear-gradient(90deg,rgba(93,168,255,0.25)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-cyan-200">
              Turn Your Business Into a System
            </p>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] text-white md:text-7xl">
              AI Booking Systems for Wheel Repair & Refinishing Shops
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-steel-200">
              Turn photo quotes, missed DMs, manual follow-ups, booking, deposits, and customer updates into one connected system that helps you book more wheel repair jobs without chasing every lead yourself.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <AuditButton />
              <Link className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-white/[0.07]" href="/systems">
                View Live Demo System <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-steel-400">
              Built for wheel repair, rim repair, refinishing, mobile service, dealer, and fleet workflows.
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-300/20 bg-[#070B12]/92 p-5 shadow-[0_28px_110px_rgba(0,0,0,0.56)] backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan-300">Wheel shop command center</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Lead-to-booking flow</h2>
              </div>
              <span className="rounded-full border border-success-400/25 bg-success-400/10 px-3 py-1 text-xs font-medium text-success-400">
                Live pipeline
              </span>
            </div>
            <div className="mt-5 grid gap-3">
              {wheelWorkflow.map((step, index) => {
                const Icon = flowIcons[index];
                return (
                  <div key={step} className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-300/[0.06]">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-cyan-200 shadow-[0_0_22px_rgba(47,140,255,0.18)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-white">{step}</p>
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-electric-500 transition-all duration-500 group-hover:w-full" style={{ width: `${42 + index * 9}%` }} />
                      </div>
                    </div>
                    <span className="font-mono text-xs text-steel-500">0{index + 1}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 border-y border-white/10 bg-white/[0.025] px-4 py-5 sm:px-6 lg:grid-cols-4 lg:px-8">
        {["Photo quote intake", "Booking and deposits", "Dealer/fleet workflows", "Follow-up automation"].map((item) => (
          <div key={item} className="mx-auto flex w-full max-w-7xl items-center gap-3 text-sm text-steel-200">
            <ShieldCheck className="h-4 w-4 shrink-0 text-cyan-300" />
            <span>{item}</span>
          </div>
        ))}
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Website vs system</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight text-white md:text-5xl">
            A Basic Website Shows Your Services. WheelPro Helps You Book Jobs.
          </h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
              <div className="flex items-center gap-3">
                <XCircle className="h-6 w-6 text-steel-500" />
                <h3 className="text-2xl font-semibold text-white">Basic Website</h3>
              </div>
              <div className="mt-6 grid gap-3">
                {basicWebsite.map((item) => (
                  <p key={item} className="rounded-lg border border-white/10 bg-lab-950/70 p-3 text-sm text-steel-300">{item}</p>
                ))}
              </div>
            </article>
            <article className="rounded-2xl border border-cyan-300/30 bg-cyan-300/[0.06] p-6 shadow-[0_0_70px_rgba(47,140,255,0.12)]">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-cyan-300" />
                <h3 className="text-2xl font-semibold text-white">WheelPro System</h3>
              </div>
              <div className="mt-6 grid gap-3">
                {wheelProSystem.map((item) => (
                  <p key={item} className="rounded-lg border border-cyan-300/20 bg-lab-950/70 p-3 text-sm text-steel-100">{item}</p>
                ))}
              </div>
            </article>
          </div>
          <div className="mt-8">
            <AuditButton />
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-lab-900/60 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">How it works</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-tight text-white md:text-5xl">
            From Wheel Photo to Booked Job
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {processSteps.map((step, index) => (
              <article key={step} className="relative rounded-xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-cyan-300/40 lg:min-h-48">
                <span className="font-mono text-xs text-cyan-300">0{index + 1}</span>
                <p className="mt-4 text-sm font-semibold leading-6 text-white">{step}</p>
                {index < processSteps.length - 1 && <span className="absolute -right-2 top-1/2 hidden h-px w-4 bg-cyan-300/50 lg:block" />}
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-6 text-steel-400">
            No generic website pitch. I&apos;ll show you exactly where your quote and booking flow is leaking leads.
          </p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-cyan-300/30 bg-[linear-gradient(135deg,rgba(47,140,255,0.2),rgba(255,255,255,0.035))] p-8 md:p-12">
          <Sparkles className="h-8 w-8 text-cyan-300" />
          <h2 className="mt-5 max-w-4xl text-3xl font-semibold text-white md:text-5xl">
            See the System Before You Book a Call
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-steel-200">
            Explore a live demo built around a real wheel repair workflow: photo quotes, booking, payment flow, dashboard logic, and dealer-style systems.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {/* TODO: connect to WheelPro Demo URL. */}
            <Link className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/50 hover:bg-white/[0.08]" href="/systems">
              View WheelPro Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <AuditButton />
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">FAQ</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold text-white md:text-5xl">
            Questions wheel shop owners ask before building a system.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {wheelFaqs.map((faq) => (
              <article key={faq.question} className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-steel-300">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
