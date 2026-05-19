import { CTAButton } from "@/components/site/CTAButton";
import { getBookingUrl, isPlaceholderBookingUrl, siteConfig } from "@/lib/site";

type BookingCTAProps = {
  title?: string;
  copy?: string;
};

export function BookingCTA({
  title = "Book a Free Wheel Shop System Audit",
  copy = "A focused audit of your wheel repair quote flow, booking process, deposit friction, dashboard visibility, and follow-up system.",
}: BookingCTAProps) {
  const bookingUrl = getBookingUrl();
  const isPlaceholder = isPlaceholderBookingUrl(bookingUrl);

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-2xl border border-cyan-300/30 bg-[linear-gradient(135deg,rgba(47,140,255,0.18),rgba(255,255,255,0.035))] p-8 shadow-[0_0_80px_rgba(47,140,255,0.12)] md:p-12">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Next step</p>
        <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2 className="max-w-3xl text-3xl font-semibold text-white md:text-5xl">{title}</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-steel-200">{copy}</p>
            {isPlaceholder && (
              <p className="mt-3 text-sm text-steel-400">
                Booking link is ready to connect through <code className="text-cyan-300">NEXT_PUBLIC_BOOKING_URL</code>.
              </p>
            )}
          </div>
          <CTAButton
            href={isPlaceholder ? `mailto:${siteConfig.email}?subject=Free%20Growth%20Audit` : bookingUrl}
            external={!isPlaceholder}
            className="w-full sm:w-auto"
          >
            Book a Free Wheel Shop System Audit
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
