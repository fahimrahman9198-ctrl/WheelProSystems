import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { seoLandingPages } from "@/lib/site";

type LandingSlug = keyof typeof seoLandingPages;

export function SeoLandingPage({ slug }: { slug: LandingSlug }) {
  const page = seoLandingPages[slug];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="relative overflow-hidden border-b border-white/10 px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_0%,rgba(47,140,255,0.22),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">WheelPro Systems</p>
          <h1 className="mt-4 max-w-5xl text-4xl font-semibold leading-tight text-white md:text-6xl">{page.h1}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-steel-300">{page.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/book" className="inline-flex items-center justify-center gap-2 rounded-lg border border-electric-500/70 bg-electric-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_32px_rgba(47,140,255,0.28)]">
              Book a Free Wheel Shop System Audit <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/systems" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white">
              View the WheelPro Operating System <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Problem</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Why the current workflow leaks leads</h2>
            <p className="mt-5 text-base leading-8 text-steel-300">{page.problem}</p>
          </article>
          <article className="rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.055] p-6 md:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">System solution</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">What a connected WheelPro system changes</h2>
            <p className="mt-5 text-base leading-8 text-steel-200">{page.solution}</p>
          </article>
        </div>
      </section>

      <section className="border-y border-white/10 bg-lab-900/60 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Features</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold text-white md:text-5xl">Built for the way wheel shops actually sell work.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {page.features.map((feature) => (
              <div key={feature} className="rounded-xl border border-white/10 bg-white/[0.04] p-5">
                <CheckCircle2 className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                <p className="mt-4 text-sm font-semibold leading-6 text-white">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Why it matters</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
              Wheel repair customers move fast. Your system has to move faster.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-steel-300">
            <p>
              A wheel repair lead usually starts with a photo and a question: can this be fixed, how much will it cost, and when can it be done? If the answer depends on the owner manually checking four inboxes, asking for missing details, copying notes into a spreadsheet, and remembering to follow up, good leads leak out of the pipeline.
            </p>
            <p>
              WheelPro Systems is built around that specific operational reality. The pages, forms, dashboards, payment prompts, and automation are designed to reduce the distance between customer interest and a booked job. The goal is not more software for its own sake. The goal is a cleaner path from wheel photo to quote context, booking, deposit, job status, and follow-up.
            </p>
            <p>
              That is why each landing page connects back to the same core operating model: a conversion-focused website, a photo quote intake flow, booking and deposits, a dashboard for visibility, and automation that keeps customers moving when the shop is busy.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Workflow</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold text-white md:text-5xl">From first inquiry to organized job status.</h2>
          <div className="mt-10 grid gap-3 md:grid-cols-3 lg:grid-cols-6">
            {page.workflow.map((step, index) => (
              <div key={step} className="relative rounded-xl border border-cyan-300/20 bg-cyan-300/[0.055] p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cyan-300">0{index + 1}</p>
                <p className="mt-3 text-sm font-semibold leading-6 text-white">{step}</p>
                {index < page.workflow.length - 1 && <span className="absolute -right-2 top-1/2 hidden h-px w-4 bg-cyan-300/60 lg:block" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">FAQ</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold text-white md:text-5xl">Common questions before building this system.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {page.faqs.map(([question, answer]) => (
              <article key={question} className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-semibold text-white">{question}</h3>
                <p className="mt-3 text-sm leading-6 text-steel-300">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-2xl border border-cyan-300/30 bg-[linear-gradient(135deg,rgba(47,140,255,0.18),rgba(255,255,255,0.035))] p-8 md:p-12">
          <h2 className="max-w-4xl text-3xl font-semibold text-white md:text-5xl">Ready to find the leaks in your wheel shop workflow?</h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-steel-200">
            No generic website pitch. I’ll review the path from website visit to photo quote, booking, deposit, job dashboard, and follow-up, then show you what should become a system.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/book" className="inline-flex items-center gap-2 rounded-lg border border-electric-500/70 bg-electric-500 px-5 py-3 text-sm font-semibold text-white">
              Book a Free Audit <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white">Home</Link>
            <Link href="/services" className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white">Services</Link>
            <Link href="/systems" className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white">Systems</Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white">Contact</Link>
          </div>
        </div>
      </section>
    </>
  );
}
