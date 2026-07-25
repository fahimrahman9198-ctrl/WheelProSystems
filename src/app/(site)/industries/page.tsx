import type { Metadata } from "next";
import { BookingCTA } from "@/components/site/BookingCTA";
import { IndustryCard } from "@/components/site/IndustryCard";
import { PageHeader } from "@/components/site/PageHeader";
import { SectionHeader } from "@/components/site/SectionHeader";
import { industries } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "AI systems for wheel refinishing, rim repair, mobile detailing, fleet service, mobile mechanics, and dealership service vendors.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="Purpose-built for businesses that operate on the road."
        copy="Wheel refinishing is the strongest first fit. The same connected system model applies to mobile detailing, fleet service, mobile mechanics, and dealership vendor workflows."
        cta="Book a Free Growth Audit"
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Primary fit"
            title="Wheel refinishing comes first."
            copy="Photo quote form automation, rim repair booking systems, payment integration, and follow-up automation are especially useful where every job starts with visual damage and fast response."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry, index) => (
              <IndustryCard key={industry.title} {...industry} featured={index === 0} />
            ))}
          </div>
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
