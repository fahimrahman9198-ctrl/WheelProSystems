import type { Metadata } from "next";
import { CalendarDays, Mail } from "lucide-react";
import { CTAButton } from "@/components/site/CTAButton";
import { DemoDisclaimer } from "@/components/site/DemoDisclaimer";
import { getBookingUrl, isPlaceholderBookingUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Free Growth Audit",
  description:
    "Book a focused 20-minute call with WheelPro Systems to review your quote, booking, and follow-up process.",
};

export default function BookAuditPage() {
  const bookingUrl = getBookingUrl();
  const isPlaceholder = isPlaceholderBookingUrl(bookingUrl);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">WheelPro Systems</p>
          <h1 className="mt-4 text-5xl font-semibold leading-tight text-white md:text-7xl">Book a Free Growth Audit</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-steel-300">
            A focused 20-minute call to review your quote, booking, and follow-up process. We&rsquo;ll identify where leads are being lost and what system could help turn more inquiries into booked jobs.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CTAButton href={isPlaceholder ? `mailto:${siteConfig.email}?subject=Free%20Growth%20Audit` : bookingUrl} external={!isPlaceholder}>
              Schedule My Free Growth Audit
            </CTAButton>
            <CTAButton href="/demo/quote" variant="secondary">Try the Quote Demo</CTAButton>
          </div>
          {isPlaceholder && <p className="mt-4 text-sm text-steel-400">Add your real calendar link with <code className="text-cyan-300">NEXT_PUBLIC_BOOKING_URL</code>.</p>}
        </div>
        <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/[0.05] p-6">
          <CalendarDays className="h-8 w-8 text-cyan-300" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-semibold text-white">What the audit reviews</h2>
          <div className="mt-5 grid gap-3">
            {["Quote intake", "Booking path", "Deposit friction", "Dashboard visibility", "Follow-up automation"].map((item) => (
              <p key={item} className="rounded-lg border border-white/10 bg-lab-950/70 p-3 text-sm text-steel-200">{item}</p>
            ))}
          </div>
          <a href={`mailto:${siteConfig.email}`} className="mt-6 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-white">
            <Mail className="h-4 w-4" aria-hidden="true" />
            {siteConfig.email}
          </a>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-7xl"><DemoDisclaimer /></div>
    </section>
  );
}
