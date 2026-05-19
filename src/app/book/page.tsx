import type { Metadata } from "next";
import { CalendarDays, Mail } from "lucide-react";
import { CTAButton } from "@/components/site/CTAButton";
import { getBookingUrl, isPlaceholderBookingUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Free Wheel Shop System Audit",
  description:
    "Book a focused audit with WheelPro Systems to review your wheel repair website, quote flow, booking process, deposits, dashboard, and follow-up.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book a Free Wheel Shop System Audit",
    description:
      "Review your wheel repair website, quote intake, booking flow, deposit process, dashboard, and follow-up system.",
    url: "/book",
    siteName: "WheelPro Systems",
    type: "website",
  },
};

export default function BookAuditPage() {
  const bookingUrl = getBookingUrl();
  const isPlaceholder = isPlaceholderBookingUrl(bookingUrl);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">WheelPro Systems</p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight text-white md:text-7xl">Book a Free Wheel Shop System Audit</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-steel-300">
            A focused call to review your wheel repair website, photo quote intake, booking process, deposit friction, dashboard visibility, and follow-up. We&rsquo;ll identify where leads are leaking and what should become a system.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton href={isPlaceholder ? `mailto:${siteConfig.email}?subject=Free%20Growth%20Audit` : bookingUrl} external={!isPlaceholder}>
              Schedule My Free Wheel Shop Audit
            </CTAButton>
            <CTAButton href="/services" variant="secondary">View Services</CTAButton>
          </div>
          {isPlaceholder && <p className="mt-4 text-sm text-steel-400">Add your real calendar link with <code className="text-cyan-300">NEXT_PUBLIC_BOOKING_URL</code>.</p>}
        </div>
        <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/[0.05] p-6">
          <CalendarDays className="h-8 w-8 text-cyan-300" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-semibold text-white">What the audit reviews</h2>
          <div className="mt-5 grid gap-3">
            {["Photo quote intake", "Booking path", "Deposit friction", "Job dashboard visibility", "Follow-up automation"].map((item) => (
              <p key={item} className="rounded-lg border border-white/10 bg-lab-950/70 p-3 text-sm text-steel-200">{item}</p>
            ))}
          </div>
          <a href={`mailto:${siteConfig.email}`} className="mt-6 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-white">
            <Mail className="h-4 w-4" aria-hidden="true" />
            {siteConfig.email}
          </a>
        </div>
      </div>
    </section>
  );
}
