import type { Metadata } from "next";
import { Bot, BriefcaseBusiness, CalendarCheck, Camera, CreditCard, LayoutDashboard, Users } from "lucide-react";
import { BookingCTA } from "@/components/site/BookingCTA";
import { DashboardMockup } from "@/components/site/DashboardMockup";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeader } from "@/components/site/SectionHeader";

export const metadata: Metadata = {
  title: "Systems",
  description:
    "Explore quote request workflows, booking flows, payment integrations, customer dashboards, admin dashboards, B2B portals, and AI lead qualification systems.",
};

const modules = [
  {
    icon: Camera,
    title: "Quote request workflow",
    copy: "Photo-first intake captures vehicle, wheel damage, service area, timing, and customer details before the first reply.",
    points: ["Photo upload path", "Service type logic", "Lead quality score"],
  },
  {
    icon: CalendarCheck,
    title: "Booking workflow",
    copy: "Customers move from quote approval to a calendar-ready job request with the right service window and confirmation flow.",
    points: ["Route-aware slots", "Confirmation messages", "Job status view"],
  },
  {
    icon: CreditCard,
    title: "Payment/deposit workflow",
    copy: "Deposit links and payment prompts help confirm intent before the job while keeping payment status visible.",
    points: ["Deposit collection", "Payment status", "Receipt follow-up"],
  },
  {
    icon: Users,
    title: "Customer dashboard preview",
    copy: "Customers can see quote status, booking details, payment prompts, and follow-up notes without digging through messages.",
    points: ["Quote status", "Booking details", "Next action prompts"],
  },
  {
    icon: LayoutDashboard,
    title: "Admin dashboard preview",
    copy: "Owners see leads, quotes, bookings, payments, and follow-ups in one operational view.",
    points: ["Pipeline metrics", "Lead queue", "Follow-up tasks"],
  },
  {
    icon: BriefcaseBusiness,
    title: "B2B dealer/fleet portal preview",
    copy: "Repeat accounts can submit service requests, track units, and view job or invoice status through a cleaner portal.",
    points: ["Account requests", "Unit tracking", "Invoice visibility"],
  },
  {
    icon: Bot,
    title: "AI assistant / lead qualification",
    copy: "AI can summarize incoming quote requests, highlight missing details, and draft the next best response for review.",
    points: ["Lead summary", "Missing info detection", "Response draft"],
  },
];

export default function SystemsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Systems"
        title="Connected workflows for quote-based service businesses."
        copy="WheelPro Systems connects intake, booking, payments, dashboards, portals, and AI-assisted qualification into one practical operating layer."
        cta="Book a Free Growth Audit"
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Product modules"
            title="Each module solves a real operational gap."
            copy="Each module helps a business owner see how scattered tasks become one connected process."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {modules.map(({ icon: Icon, title, copy, points }) => (
              <article key={title} className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-300/30 bg-cyan-300/10 text-cyan-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="text-2xl font-semibold text-white">{title}</h2>
                </div>
                <p className="text-sm leading-6 text-steel-300">{copy}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {points.map((point) => (
                    <div key={point} className="rounded-lg border border-white/10 bg-lab-950/70 p-3">
                      <p className="text-xs font-medium text-steel-100">{point}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Dashboard feel"
            title="A realistic command center preview."
            copy="Frontend-only for now, designed to look and feel like product modules a service owner could actually use."
          />
          <div className="mt-10">
            <DashboardMockup />
          </div>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
