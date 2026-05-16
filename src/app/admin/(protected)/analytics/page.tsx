import { AdminDashboardMockup } from "@/components/site/AdminDashboardMockup";
import { PageHeader } from "@/components/site/PageHeader";

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader eyebrow="Analytics Demo" title="Mock analytics for the fictional admin dashboard." copy="Lead source breakdown, deposits, follow-ups, and pipeline status are represented with demo-only data." />
      <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><AdminDashboardMockup /></div></section>
    </>
  );
}
