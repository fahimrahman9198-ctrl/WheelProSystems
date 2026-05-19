import type { Metadata } from "next";
import { Mail, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/app/contact/ContactForm";
import { PageHeader } from "@/components/site/PageHeader";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Free Wheel Shop System Audit | WheelPro Systems",
  description:
    "Apply for a free WheelPro Systems audit. Review your wheel repair website, quote flow, booking process, payment/deposit flow, and follow-up system.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Book a Free Wheel Shop System Audit",
    description:
      "I’ll review your website, quote flow, booking process, and follow-up system, then show you where leads are leaking.",
    url: "/contact",
    siteName: "WheelPro Systems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Free Wheel Shop System Audit",
    description: "Apply for an audit of your wheel repair quote, booking, payment, and follow-up flow.",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Apply for an audit"
        title="Book Your Free Wheel Shop System Audit"
        copy="I’ll review your website, quote flow, booking process, and follow-up system, then show you where leads are leaking."
      />
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <aside className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.05] p-6">
            <ShieldCheck className="h-8 w-8 text-cyan-300" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-semibold text-white">What I’ll review</h2>
            <div className="mt-5 grid gap-3">
              {["Website conversion path", "Photo quote intake", "Booking friction", "Deposit/payment process", "Follow-up leaks"].map((item) => (
                <p key={item} className="rounded-lg border border-white/10 bg-lab-950/70 p-3 text-sm text-steel-200">{item}</p>
              ))}
            </div>
            <a href={`mailto:${siteConfig.email}`} className="mt-6 inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-white">
              <Mail className="h-4 w-4" aria-hidden="true" />
              {siteConfig.email}
            </a>
          </aside>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
