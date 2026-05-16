import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { BookingCTA } from "@/components/site/BookingCTA";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeader } from "@/components/site/SectionHeader";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About WheelPro Systems",
  description:
    "WheelPro Systems is a founder-led systems studio by Fahim Rahman, built to help mobile service businesses connect quotes, booking, payments, dashboards, and follow-up.",
};

const principles = [
  "Systems beat basic websites because the sale does not end at the homepage.",
  "Quote-based service businesses need cleaner intake, faster response, and clearer next steps.",
  "Demo environments should be clearly marked as fictional and transparent.",
  "The best build removes operational friction before adding extra complexity.",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About WheelPro Systems" title="Founder-led systems for mobile service businesses." copy="WheelPro Systems helps mobile service businesses connect lead capture, quote intake, booking, payment, dashboards, and follow-up into one practical system." />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader eyebrow="Founder" title={siteConfig.founder} copy="WheelPro Demo exists as a transparent sales asset: a fictional, reusable environment for showing how a modern wheel repair or mobile service workflow can feel before a custom build is scoped." />
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-white">Why systems beat basic websites</h2>
            <p className="mt-4 text-base leading-7 text-steel-300">
              A website can explain what you do. A system helps the customer take the next step, helps the owner see what is happening, and helps the business follow up while work is moving.
            </p>
            <div className="mt-8 space-y-4">
              {principles.map((principle) => (
                <div key={principle} className="flex gap-3 rounded-lg border border-white/10 bg-lab-950/70 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                  <p className="text-sm leading-6 text-steel-200">{principle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
