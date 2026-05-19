import type { Metadata } from "next";
import { BarChart3, Bot, Building2, CalendarCheck, Camera, CreditCard, LayoutDashboard, MessageSquareText, MousePointerClick } from "lucide-react";
import { BookingCTA } from "@/components/site/BookingCTA";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeader } from "@/components/site/SectionHeader";

export const metadata: Metadata = {
  title: "WheelPro Operating System for Wheel Repair Shops | AI Booking & Quote Flow",
  description:
    "A modular AI-powered operating system for wheel repair businesses that connects lead capture, photo quotes, booking, payments, dashboards, and follow-up automation.",
  alternates: { canonical: "/systems" },
  openGraph: {
    title: "The WheelPro Operating System",
    description:
      "Lead capture, photo quotes, booking, payments, dashboards, dealer portals, analytics, and follow-up automation for wheel repair shops.",
    url: "/systems",
    siteName: "WheelPro Systems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WheelPro Operating System for Wheel Repair Shops",
    description: "A modular quote-to-booking system for wheel repair and refinishing businesses.",
  },
};

const modules = [
  { icon: MousePointerClick, title: "Lead Capture System", benefit: "Turn website visitors and social traffic into structured quote requests.", preview: "Source / Service / Urgency" },
  { icon: Camera, title: "Photo Quote System", benefit: "Collect wheel damage photos, vehicle details, location, and repair context.", preview: "Photos / Damage / Finish" },
  { icon: Bot, title: "AI Intake Assistant", benefit: "Summarize requests, flag missing details, and prep faster owner responses.", preview: "Summary / Missing info / Draft" },
  { icon: CalendarCheck, title: "Booking Engine", benefit: "Route qualified customers into booking windows without endless back-and-forth.", preview: "Slots / Route / Confirm" },
  { icon: CreditCard, title: "Deposit & Payment Flow", benefit: "Collect deposits or payments to confirm intent and reduce no-shows.", preview: "Deposit / Status / Receipt" },
  { icon: LayoutDashboard, title: "Admin Dashboard", benefit: "Track leads, jobs, quote status, customers, deposits, and follow-ups.", preview: "Pipeline / Jobs / Tasks" },
  { icon: Building2, title: "Dealer/Fleet Portal", benefit: "Give repeat accounts a cleaner job submission and status workflow.", preview: "Account / Units / Invoices" },
  { icon: MessageSquareText, title: "Email/SMS Automation", benefit: "Automate quote follow-ups, booking nudges, reminders, and reviews.", preview: "Follow-up / Reminder / Review" },
  { icon: BarChart3, title: "Analytics & Reporting", benefit: "See lead sources, quote stages, booking conversion, and follow-up gaps.", preview: "Sources / Conversion / Revenue" },
];

const architecture = ["Website", "Quote Intake", "Booking", "Payment", "Dashboard", "Automation", "Reporting"];

export default function SystemsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Product showcase"
        title="The WheelPro Operating System"
        copy="A modular AI-powered system for wheel repair businesses that connects lead capture, photo quotes, booking, payments, dashboards, and follow-up automation."
        cta="Book a Free Wheel Shop System Audit"
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Modules"
            title="Every module exists to move a wheel lead closer to a booked job."
            copy="Pick the pieces your shop needs first, then expand into dashboards, portals, analytics, and automation as the workflow matures."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {modules.map(({ icon: Icon, title, benefit, preview }) => (
              <article key={title} className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300/[0.055]">
                <Icon className="h-6 w-6 text-cyan-300" aria-hidden="true" />
                <h2 className="mt-5 text-xl font-semibold text-white">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-steel-300">{benefit}</p>
                <div className="mt-6 rounded-xl border border-white/10 bg-lab-950/80 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel-500">Mini UI preview</p>
                  <p className="mt-3 text-sm font-semibold text-cyan-200">{preview}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan-300 to-electric-500 transition-all group-hover:w-full" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-lab-900/60 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Architecture" title="System Architecture" copy="A clean path from customer intent to booked work, follow-up, and reporting." />
          <div className="mt-10 grid gap-3 md:grid-cols-7">
            {architecture.map((item, index) => (
              <div key={item} className="relative rounded-xl border border-cyan-300/20 bg-cyan-300/[0.055] p-4 text-center">
                <p className="font-mono text-[10px] text-cyan-300">0{index + 1}</p>
                <p className="mt-2 text-sm font-semibold text-white">{item}</p>
                {index < architecture.length - 1 && <span className="absolute -right-2 top-1/2 hidden h-px w-4 bg-cyan-300/60 md:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookingCTA title="Build the operating layer around your wheel shop." copy="No generic website pitch. I’ll show you exactly where your quote and booking flow is leaking leads." />
    </>
  );
}
