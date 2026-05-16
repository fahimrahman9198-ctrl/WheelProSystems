import type { Metadata } from "next";
import { DealerPortalMockup } from "@/components/site/DealerPortalMockup";
import { DemoDisclaimer } from "@/components/site/DemoDisclaimer";
import { PageHeader } from "@/components/site/PageHeader";

export const metadata: Metadata = {
  title: "Dealer Portal | WheelPro Demo",
  description:
    "B2B dealer portal demo showing account service requests, unit tracking, and invoice visibility for repeat dealer and fleet accounts.",
};

export default function DemoDeaelerPortalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dealer Portal"
        title="A B2B portal for repeat dealer and fleet accounts."
        copy="Dealers can submit service requests, track units, check invoice status, and manage their account without chasing the shop by phone."
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <DealerPortalMockup />
          <div className="mt-8">
            <DemoDisclaimer />
          </div>
        </div>
      </section>
    </>
  );
}
