import type { Metadata } from "next";
import { BookingDemoFlow } from "@/components/site/BookingDemoFlow";
import { DemoDisclaimer } from "@/components/site/DemoDisclaimer";
import { PageHeader } from "@/components/site/PageHeader";

export const metadata: Metadata = {
  title: "Booking Demo",
  description:
    "Modern booking flow demo with service selection, location, date/time selection, confirmation, and deposit/payment mock step.",
};

export default function BookingDemoPage() {
  return (
    <>
      <PageHeader eyebrow="Booking Demo" title="A modern booking flow for mobile wheel service jobs." copy="This demo shows service selection, location selection, date/time selection, a confirmation screen, and a placeholder deposit step." />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <BookingDemoFlow />
          <div className="mt-8"><DemoDisclaimer /></div>
        </div>
      </section>
    </>
  );
}
