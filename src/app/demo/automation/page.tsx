import type { Metadata } from "next";
import { AutomationTimeline } from "@/components/site/AutomationTimeline";
import { DemoDisclaimer } from "@/components/site/DemoDisclaimer";
import { PageHeader } from "@/components/site/PageHeader";

export const metadata: Metadata = {
  title: "Automation Timeline | WheelPro Demo",
  description:
    "See how automated follow-ups, reminders, and re-engagement sequences work in the WheelPro Demo system.",
};

export default function DemoAutomationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Automation Timeline"
        title="Automated follow-up that runs without you."
        copy="From new quote auto-response to re-engagement — see every automated touchpoint in the system timeline."
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AutomationTimeline />
          <div className="mt-8">
            <DemoDisclaimer />
          </div>
        </div>
      </section>
    </>
  );
}
