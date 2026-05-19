import type { Metadata } from "next";
import { ArrowRight, Car, Gauge, Truck, Wrench } from "lucide-react";
import Link from "next/link";
import { BookingCTA } from "@/components/site/BookingCTA";
import { PageHeader } from "@/components/site/PageHeader";

export const metadata: Metadata = {
  title: "AI Systems for Wheel Repair, Rim Repair & Mobile Service Businesses",
  description:
    "WheelPro Systems is built first for wheel repair and refinishing shops, then expandable to mobile detailing, mobile mechanics, fleet service, and dealership vendors.",
  alternates: { canonical: "/industries" },
  openGraph: {
    title: "Built First for Wheel Repair. Expandable to Other Mobile Services.",
    description:
      "AI booking, quote, dashboard, and automation systems for wheel repair, rim repair, mobile service, dealership, and fleet workflows.",
    url: "/industries",
    siteName: "WheelPro Systems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Systems for Wheel Repair & Mobile Service Businesses",
    description: "Wheel repair is the primary specialization. The system model can expand to adjacent mobile service businesses.",
  },
};

const secondaryIndustries = [
  { icon: Car, title: "Mobile detailing", copy: "Booking, deposits, package selection, reminders, and repeat customer follow-up." },
  { icon: Wrench, title: "Mobile mechanics", copy: "Service request qualification, location-aware scheduling, deposits, and updates." },
  { icon: Truck, title: "Fleet service providers", copy: "Unit tracking, recurring requests, account views, and invoice visibility." },
  { icon: Gauge, title: "Dealership vendors", copy: "Dealer-facing portals, priority intake, approvals, status updates, and repeat work." },
];

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="Built First for Wheel Repair. Expandable to Other Mobile Services."
        copy="Wheel repair and refinishing is the primary specialization. The same connected system model can support adjacent mobile service businesses once the core workflow is proven."
        cta="Book a Free Wheel Shop System Audit"
      />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Primary niche</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-white md:text-5xl">
              Wheel Repair & Refinishing Shops
            </h2>
            <p className="mt-5 text-base leading-8 text-steel-300">
              WheelPro Systems is built around the workflow of wheel repair businesses first: photo-based quotes, mobile service areas, dealer jobs, refinishing requests, booking, deposits, and follow-up.
            </p>
            <Link href="/wheel-repair-booking-system" className="mt-8 inline-flex items-center gap-2 rounded-lg border border-electric-500/70 bg-electric-500 px-5 py-3 text-sm font-semibold text-white">
              Explore wheel repair booking systems <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Photo quotes", "Mobile repair routes", "Dealer/fleet jobs", "Refinishing requests", "Booking and deposits", "Follow-up automation"].map((item) => (
              <div key={item} className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.055] p-5">
                <p className="font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Secondary fit</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold text-white md:text-5xl">
            Other mobile service workflows can use the same operating model.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {secondaryIndustries.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
                <Icon className="h-6 w-6 text-cyan-300" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-steel-300">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <BookingCTA title="Wheel repair comes first." copy="If your shop handles photo quotes, mobile appointments, dealer jobs, or refinishing requests, the system should be built around that workflow." />
    </>
  );
}
