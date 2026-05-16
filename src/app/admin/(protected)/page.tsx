import { AdminDashboardMockup } from "@/components/site/AdminDashboardMockup";
import { PageHeader } from "@/components/site/PageHeader";

export default function AdminPage() {
  return (
    <>
      <PageHeader
        eyebrow="Admin Demo"
        title="Internal business dashboard preview."
        copy="A fictional admin area showing leads, pending quotes, bookings, revenue/deposit previews, follow-ups, invoice creation, and paid/unpaid status."
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AdminDashboardMockup />
        </div>
      </section>
    </>
  );
}
