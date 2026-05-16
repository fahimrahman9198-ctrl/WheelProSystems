import type { Metadata } from "next";
import { Camera, CheckCircle2 } from "lucide-react";
import { BookingCTA } from "@/components/site/BookingCTA";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeader } from "@/components/site/SectionHeader";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Example wheel refinishing, rim repair, mobile wheel repair, fleet, dealer, and photo quote workflows in the WheelPro Demo system.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow="Services" title="Example services a modern wheel repair system can organize." copy="These are fictional demo services for showing how quote, booking, dashboard, dealer portal, and automation workflows could support a wheel refinishing or mobile rim repair business." />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader title="Service workflow catalog" copy="Each service is written as demo content. No real services, pricing, or service territory is implied." />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
                <Camera className="h-6 w-6 text-cyan-300" aria-hidden="true" />
                <h2 className="mt-4 text-xl font-semibold text-white">{service.title}</h2>
                <p className="mt-3 text-sm leading-6 text-steel-300">{service.description}</p>
                <div className="mt-5 flex items-center gap-2 text-sm text-cyan-300">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Quote-to-booking ready
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
