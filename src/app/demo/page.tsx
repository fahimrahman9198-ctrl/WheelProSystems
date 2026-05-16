import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, CalendarCheck, CreditCard, LayoutDashboard, Settings, Users, Zap } from "lucide-react";
import { DemoDisclaimer } from "@/components/site/DemoDisclaimer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "WheelPro Demo | Interactive System Demo",
  description:
    "Explore WheelPro Demo — a fictional interactive demo showing quote, booking, payment, dashboard, dealer portal, admin, and automation workflows for mobile service businesses.",
};

const demoSections = [
  {
    icon: Bot,
    label: "Quote Flow",
    description: "Photo-first quote intake with AI-assisted categorization and estimate output.",
    href: "/demo/quote",
    cta: "Try Quote Demo",
  },
  {
    icon: CalendarCheck,
    label: "Booking Flow",
    description: "Service selection, location, date/time, confirmation, and deposit step.",
    href: "/demo/booking",
    cta: "Try Booking Demo",
  },
  {
    icon: CreditCard,
    label: "Payment Demo",
    description: "Deposit checkout flow, clearly marked as demo only.",
    href: "/demo/payment",
    cta: "View Payment Demo",
  },
  {
    icon: Users,
    label: "Customer Dashboard",
    description: "Customer-facing portal for quote status, appointments, payments, and history.",
    href: "/demo/dashboard",
    cta: "View Dashboard",
  },
  {
    icon: LayoutDashboard,
    label: "Admin Dashboard",
    description: "Internal command center for leads, bookings, revenue, invoices, and follow-ups.",
    href: "/demo/admin",
    cta: "View Admin Demo",
  },
  {
    icon: Settings,
    label: "Dealer Portal",
    description: "B2B portal for repeat accounts, unit tracking, and invoice visibility.",
    href: "/demo/dealer-portal",
    cta: "View Dealer Portal",
  },
  {
    icon: Zap,
    label: "Automation Timeline",
    description: "See how automated follow-ups, reminders, and re-engagement sequences work.",
    href: "/demo/automation",
    cta: "View Automation",
  },
];

export default function DemoLandingPage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(47,140,255,0.18),transparent_36%)]" />
        <div className="relative mx-auto max-w-7xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Interactive Demo</p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight text-white md:text-7xl">
            WheelPro Demo
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-steel-200">
            A fictional interactive demo built by {siteConfig.agencyName} to show how a modern wheel repair and mobile service business system works — quote to cash, end to end.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/demo/quote"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-electric-500/70 bg-electric-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_32px_rgba(47,140,255,0.28)]"
            >
              Start with Quote Demo <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white"
            >
              Back to WheelPro Systems
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Demo modules</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
            Explore each part of the system
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {demoSections.map(({ icon: Icon, label, description, href, cta }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-cyan-300/30 hover:bg-white/[0.06]"
              >
                <Icon className="h-6 w-6 text-cyan-300" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-semibold text-white">{label}</h3>
                <p className="mt-2 text-sm leading-6 text-steel-300">{description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-cyan-300 group-hover:text-white">
                  {cta} <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <DemoDisclaimer />
        </div>
      </section>
    </>
  );
}
