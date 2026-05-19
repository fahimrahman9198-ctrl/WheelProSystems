import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { BookingCTA } from "@/components/site/BookingCTA";
import { PageHeader } from "@/components/site/PageHeader";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About WheelPro Systems | AI Systems for Wheel Repair Businesses",
  description:
    "WheelPro Systems is a founder-led systems studio building AI booking, quote, dashboard, and automation systems for wheel repair and refinishing businesses.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About WheelPro Systems",
    description:
      "Founder-led AI systems for wheel repair businesses tired of chasing leads, quotes, bookings, deposits, and follow-up manually.",
    url: "/about",
    siteName: "WheelPro Systems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About WheelPro Systems",
    description: "AI systems for wheel repair businesses that need more than a basic website.",
  },
};

const points = [
  "Photo-based quotes need structure before the owner replies.",
  "Mobile wheel repair needs service-area and scheduling clarity.",
  "Dealer relationships need repeatable intake, status, and invoice workflows.",
  "Refinishing requests need context, approval, and follow-up.",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About WheelPro Systems"
        title="I Build Systems for Service Businesses That Are Tired of Chasing Leads Manually"
        copy="WheelPro Systems exists because most service businesses do not need just another website. They need a system that captures leads, organizes requests, books jobs, collects deposits, and follows up automatically."
        cta="Book a Free Wheel Shop System Audit"
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Founder-led</p>
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-5xl">{siteConfig.founder}</h2>
            <p className="mt-5 text-base leading-8 text-steel-300">
              The goal is not to sell wheel shops a nicer brochure. The goal is to turn scattered lead capture, photo quoting, booking, deposits, dashboards, and follow-up into a practical operating system.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white">Why Wheel Repair First</h2>
            <p className="mt-4 text-base leading-7 text-steel-300">
              Wheel repair businesses deal with photo-based quotes, location-based service, mobile scheduling, dealership relationships, and repeat customer workflows. That makes them a perfect fit for a specialized system instead of a generic website.
            </p>
            <div className="mt-8 grid gap-4">
              {points.map((point) => (
                <div key={point} className="flex gap-3 rounded-lg border border-white/10 bg-lab-950/70 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                  <p className="text-sm leading-6 text-steel-200">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <BookingCTA title="Book a Free Wheel Shop System Audit" copy="I’ll show you where your current website, quote flow, booking process, and follow-up system are leaking leads." />
    </>
  );
}
