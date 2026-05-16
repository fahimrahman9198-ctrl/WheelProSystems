import { AdminDashboardMockup } from "@/components/site/AdminDashboardMockup";
import { PageHeader } from "@/components/site/PageHeader";

export default function AdminInvoicesPage() {
  return (
    <>
      <PageHeader eyebrow="Invoices Demo" title="Mock invoice builder and paid/unpaid list." copy="A fictional invoice management preview for demonstrating how deposits, invoices, and payment status could appear." />
      <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><AdminDashboardMockup /></div></section>
    </>
  );
}
