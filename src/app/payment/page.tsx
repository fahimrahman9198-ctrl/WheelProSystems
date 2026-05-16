import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { PaymentMockup } from "@/components/site/PaymentMockup";

export const metadata: Metadata = {
  title: "Payment Demo",
  description: "Mock payment and deposit page for the WheelPro Demo fictional wheel repair business system.",
};

export default function PaymentDemoPage() {
  return (
    <>
      <PageHeader eyebrow="Payment Demo" title="Deposit checkout style UI, clearly marked demo only." copy="A mock payment page showing service summary, placeholder deposit amount, payment method fields, and secure checkout styling." />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl"><PaymentMockup /></div>
      </section>
    </>
  );
}
