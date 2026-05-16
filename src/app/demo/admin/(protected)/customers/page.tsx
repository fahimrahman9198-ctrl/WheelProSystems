import { CustomerDashboardMockup } from "@/components/site/CustomerDashboardMockup";
import { PageHeader } from "@/components/site/PageHeader";

export default function AdminCustomersPage() {
  return (
    <>
      <PageHeader eyebrow="Customers Demo" title="Mock customer records and job history." copy="A fictional customer dashboard preview for quote status, appointment status, uploads, messages, deposits, and job history." />
      <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><CustomerDashboardMockup /></div></section>
    </>
  );
}
