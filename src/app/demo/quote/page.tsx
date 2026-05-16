import type { Metadata } from "next";
import { QuoteDemoForm } from "@/components/site/QuoteDemoForm";
import { DemoDisclaimer } from "@/components/site/DemoDisclaimer";
import { PageHeader } from "@/components/site/PageHeader";

export const metadata: Metadata = {
  title: "Quote Demo | WheelPro Demo",
  description:
    "Try the AI-assisted photo quote intake flow. Upload a photo, describe the damage, and see how the quote workflow categorizes, scores, and routes the lead.",
};

export default function DemoQuotePage() {
  return (
    <>
      <PageHeader
        eyebrow="Quote Demo"
        title="AI-assisted photo quote intake."
        copy="Upload a photo, describe the damage, and see how the system categorizes, scores, and routes the lead — in under 60 seconds."
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <QuoteDemoForm />
          <div className="mt-8">
            <DemoDisclaimer />
          </div>
        </div>
      </section>
    </>
  );
}
