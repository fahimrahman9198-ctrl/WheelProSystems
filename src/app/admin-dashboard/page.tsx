import type { Metadata } from "next";
import { AdminDashboardMockup } from "@/components/site/AdminDashboardMockup";
import { PageHeader } from "@/components/site/PageHeader";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Mock internal admin dashboard for bookings, analytics, revenue preview, custom invoices, paid and unpaid lists, and pipeline activity.",
};

export default function AdminDashboardPage() {
  return (
    <>
      <PageHeader eyebrow="Admin Dashboard" title="An internal command center for bookings, analytics, invoices, and revenue previews." copy="This interactive admin dashboard mockup shows new leads, pending quotes, booked jobs, demo deposits, follow-ups, lead source signals, recent activity, invoice creation, and paid/unpaid lists." />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl"><AdminDashboardMockup /></div>
      </section>
    </>
  );
}
