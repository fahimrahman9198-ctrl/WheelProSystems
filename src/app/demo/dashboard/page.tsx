import type { Metadata } from "next";
import { CustomerDashboardMockup } from "@/components/site/CustomerDashboardMockup";
import { PageHeader } from "@/components/site/PageHeader";

export const metadata: Metadata = {
  title: "Customer Dashboard",
  description:
    "Mock customer dashboard for quote status, appointment status, uploaded photos, messages, deposits, and job history.",
};

export default function DashboardPage() {
  return (
    <>
      <PageHeader eyebrow="Customer Dashboard" title="A customer-facing portal for quote, appointment, payment, and follow-up status." copy="This fictional dashboard shows how a wheel repair customer could see quote status, appointment details, uploaded photos, messages, deposit status, and job history." />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl"><CustomerDashboardMockup /></div>
      </section>
    </>
  );
}
