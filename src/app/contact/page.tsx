import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ContactForm } from "@/app/contact/ContactForm";
import { PageHeader } from "@/components/site/PageHeader";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact WheelPro Systems",
  description: "Contact WheelPro Systems about quote, booking, dashboard, and automation systems.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to WheelPro Systems about your service workflow."
        copy="Use the form as a local demo interaction, or email directly to discuss quote, booking, dashboard, and follow-up systems."
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="rounded-lg border border-cyan-300/20 bg-cyan-300/[0.05] p-6">
            <Mail className="h-7 w-7 text-cyan-300" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-semibold text-white">{siteConfig.agencyName}</h2>
            <a href={`mailto:${siteConfig.email}`} className="mt-3 inline-block text-sm text-cyan-300 hover:text-white">
              {siteConfig.email}
            </a>
          </aside>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
