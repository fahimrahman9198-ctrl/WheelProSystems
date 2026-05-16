import { PageHeader } from "@/components/site/PageHeader";
import { DemoDisclaimer } from "@/components/site/DemoDisclaimer";
import { siteConfig } from "@/lib/site";

export default function AdminSettingsPage() {
  return (
    <>
      <PageHeader eyebrow="Settings Demo" title="Fictional system settings preview." copy="Demo-only business profile, automation, booking, and payment settings for showing how an admin area could be organized." />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-semibold text-white">{siteConfig.demoName}</h2>
          <p className="mt-2 text-sm text-steel-300">Agency: {siteConfig.agencyName}</p>
          <p className="mt-2 text-sm text-steel-300">Contact: {siteConfig.email}</p>
          <div className="mt-6"><DemoDisclaimer /></div>
        </div>
      </section>
    </>
  );
}
