import { BookingDemoFlow } from "@/components/site/BookingDemoFlow";
import { PageHeader } from "@/components/site/PageHeader";

export default function AdminBookingsPage() {
  return (
    <>
      <PageHeader eyebrow="Bookings Demo" title="Mock booking management view." copy="A fictional booking workflow for reviewing service, location, time, confirmation, and demo deposit status." />
      <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><BookingDemoFlow /></div></section>
    </>
  );
}
