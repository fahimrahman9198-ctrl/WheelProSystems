import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/Card";

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconShield() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSparkle() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function IconTruck() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M1 3h15v13H1V3z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M16 8h4l3 3v5h-7V8z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      <circle cx="5.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="18.5" cy="18.5" r="2.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    </svg>
  );
}

function IconPalette() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="6.5" cy="11.5" r="1.5" fill="currentColor" />
      <circle cx="9.5" cy="7.5" r="1.5" fill="currentColor" />
      <circle cx="14.5" cy="7.5" r="1.5" fill="currentColor" />
      <circle cx="17.5" cy="11.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

function IconWrench() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconMap() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 3L1 7v14l8-4 6 4 8-4V3l-8 4-6-4z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M9 3v14M15 7v14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12 19.79 19.79 0 011.61 3.41 2 2 0 013.6 1.22h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.91 8.8a16 16 0 006.29 6.29l.96-.96a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
      <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const trustBadges = [
  { value: "35+", label: "Years in Business", sublabel: "Est. 1989" },
  { value: "50k+", label: "Wheels Refinished", sublabel: "And counting" },
  { value: "3", label: "Regions Served", sublabel: "Across BC" },
  { value: "100%", label: "Satisfaction Guarantee", sublabel: "Or we re-do it" },
];

const whyUsCards = [
  {
    icon: <IconSparkle />,
    title: "OEM Color Matching",
    description:
      "Factory-accurate finishes using spectrophotometer-matched paint. Your wheels leave looking exactly as they left the factory floor — or better.",
  },
  {
    icon: <IconWrench />,
    title: "Curb Rash & Gouge Repair",
    description:
      "Precision welding, filling, and resurfacing eliminates scrapes down to bare metal. Structural integrity checked on every repair.",
  },
  {
    icon: <IconTruck />,
    title: "Mobile Fleet Service",
    description:
      "We come to your dealership, fleet yard, or commercial lot. Minimize downtime — vehicles stay on-site while we work.",
  },
  {
    icon: <IconPalette />,
    title: "Custom Finishes",
    description:
      "Matte, gloss, satin, powder coat, two-tone, or full custom colour. Express your build without compromising quality.",
  },
  {
    icon: <IconShield />,
    title: "Lifetime Workmanship Warranty",
    description:
      "Every refinish is backed by our craftsmanship guarantee. If it peels, chips, or fades from our work — we fix it, no questions asked.",
  },
  {
    icon: <IconStar />,
    title: "Certified Technicians",
    description:
      "Our team carries I-CAR and industry refinishing certifications. Decades of combined experience across passenger, performance, and commercial wheels.",
  },
];

const regions = [
  {
    name: "Lower Mainland",
    cities: ["Burnaby", "Vancouver", "Surrey", "Richmond", "Coquitlam", "Langley", "Abbotsford"],
    icon: <IconMap />,
    badge: "Head Office",
    href: "#contact",
  },
  {
    name: "Vancouver Island",
    cities: ["Victoria", "Nanaimo", "Parksville", "Courtenay", "Campbell River"],
    icon: <IconMap />,
    badge: "Mobile Service",
    href: "#contact",
  },
  {
    name: "Interior BC",
    cities: ["Kelowna", "Penticton", "Vernon", "Kamloops", "Prince George"],
    icon: <IconMap />,
    badge: "Fleet Routes",
    href: "#contact",
  },
];

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "Regions", href: "#regions" },
  { label: "Contact", href: "#contact" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-jet text-brand-white">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-brand-graphite/60 bg-brand-jet/90 backdrop-blur-md">
        <div className="section-container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-red">
              <span className="font-display text-sm text-brand-white">W</span>
            </span>
            <span className="font-display text-body-md tracking-tight text-brand-white">
              Western <span className="text-brand-red">Wheelcraft</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-body-sm text-brand-smoke hover:bg-brand-graphite hover:text-brand-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Button
            href="#contact"
            variant="primary"
            size="sm"
            rightIcon={<IconPhone />}
          >
            Get a Quote
          </Button>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-brand-jet">
          {/* Background decoration */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-brand-red/5 blur-3xl" />
            <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-brand-red/4 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" />
          </div>

          <div className="section-container relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-24 text-center">
            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-brand-red/30 bg-brand-red/10 px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red animate-pulse" />
              <span className="font-body text-caption font-semibold uppercase tracking-widest text-brand-red">
                BC&rsquo;s Premier Wheel Refinishers Since 1989
              </span>
            </div>

            {/* Headline */}
            <h1 className="mb-6 max-w-4xl font-display text-display-lg md:text-display-xl leading-[1.05] tracking-tight text-brand-white">
              Setting the standard{" "}
              <br className="hidden sm:block" />
              for{" "}
              <span className="text-gradient-red">OTHERS</span> to follow.
            </h1>

            {/* Subheadline */}
            <p className="mb-10 max-w-xl font-body text-body-lg text-brand-smoke">
              Precision wheel refinishing for dealerships, fleets, and discerning
              owners across the Lower Mainland, Vancouver Island, and Interior BC.
            </p>

            {/* CTAs */}
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <Button
                href="#contact"
                variant="primary"
                size="lg"
                rightIcon={<IconArrowRight />}
              >
                Book an Appointment
              </Button>
              <Button href="#why-us" variant="secondary" size="lg">
                See Our Work
              </Button>
            </div>

            {/* Scroll cue */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
              <span className="font-body text-caption text-brand-silver">Scroll</span>
              <div className="h-8 w-px bg-gradient-to-b from-brand-silver to-transparent" />
            </div>
          </div>
        </section>

        {/* ── Trust Badges ── */}
        <section className="border-y border-brand-graphite/60 bg-brand-jet-light">
          <div className="section-container py-12">
            <dl className="grid grid-cols-2 gap-px bg-brand-graphite/40 overflow-hidden rounded-2xl md:grid-cols-4">
              {trustBadges.map((badge) => (
                <div
                  key={badge.value}
                  className="flex flex-col items-center gap-1 bg-brand-jet-light px-6 py-8 text-center"
                >
                  <dt className="font-display text-display-sm text-brand-white md:text-display-md">
                    {badge.value}
                  </dt>
                  <dd className="font-body text-body-sm font-semibold text-brand-smoke">
                    {badge.label}
                  </dd>
                  <span className="font-body text-caption text-brand-silver">
                    {badge.sublabel}
                  </span>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Why Us ── */}
        <section id="why-us" className="py-24 bg-brand-jet">
          <div className="section-container">
            {/* Section header */}
            <div className="mb-16 flex flex-col items-center gap-4 text-center">
              <div className="accent-line" aria-hidden="true" />
              <h2 className="font-display text-display-md md:text-display-lg text-brand-white">
                Why Western Wheelcraft?
              </h2>
              <p className="max-w-xl font-body text-body-lg text-brand-smoke">
                Three decades of refinishing excellence — paired with the tools,
                training, and guarantees that set us apart.
              </p>
            </div>

            {/* Cards grid */}
            <div id="services" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {whyUsCards.map((card) => (
                <Card key={card.title} variant="default" padding="lg">
                  <CardContent className="flex flex-col gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                      {card.icon}
                    </div>
                    <CardTitle className="text-display-sm">{card.title}</CardTitle>
                    <CardDescription className="text-body-sm leading-relaxed">
                      {card.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── Region Selector ── */}
        <section id="regions" className="py-24 bg-brand-jet-light">
          <div className="section-container">
            <div className="mb-16 flex flex-col items-center gap-4 text-center">
              <div className="accent-line" aria-hidden="true" />
              <h2 className="font-display text-display-md md:text-display-lg text-brand-white">
                We Service All of BC
              </h2>
              <p className="max-w-xl font-body text-body-lg text-brand-smoke">
                From the Lower Mainland to the Island to the Interior — our mobile
                technicians come to you.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {regions.map((region) => (
                <a
                  key={region.name}
                  href={region.href}
                  className="group relative flex flex-col rounded-2xl border border-brand-graphite bg-brand-graphite p-8 shadow-card transition-all duration-300 ease-out-expo hover:-translate-y-1 hover:border-brand-red/50 hover:shadow-red-glow/20 no-underline"
                >
                  {/* Badge */}
                  <span className="mb-5 inline-flex w-fit items-center rounded-full bg-brand-red/10 px-3 py-1 font-body text-caption font-semibold text-brand-red">
                    {region.badge}
                  </span>

                  {/* Icon + name */}
                  <div className="mb-3 flex items-center gap-3 text-brand-red">
                    {region.icon}
                    <h3 className="font-display text-display-sm text-brand-white group-hover:text-brand-red transition-colors duration-200">
                      {region.name}
                    </h3>
                  </div>

                  {/* Cities */}
                  <ul className="mt-2 flex flex-wrap gap-2" role="list">
                    {region.cities.map((city) => (
                      <li
                        key={city}
                        className="rounded-md bg-brand-graphite-light px-2.5 py-1 font-body text-caption text-brand-smoke"
                      >
                        {city}
                      </li>
                    ))}
                  </ul>

                  {/* CTA hint */}
                  <div className="mt-6 flex items-center gap-1.5 font-body text-body-sm font-semibold text-brand-red opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span>Book in this region</span>
                    <IconArrowRight />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact / CTA Banner ── */}
        <section id="contact" className="py-24 bg-brand-jet">
          <div className="section-container">
            <div className="relative overflow-hidden rounded-3xl border border-brand-red/20 bg-brand-graphite px-8 py-16 text-center shadow-card md:py-20">
              {/* Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                <div className="absolute left-1/2 top-0 h-64 w-[500px] -translate-x-1/2 rounded-full bg-brand-red/10 blur-3xl" />
              </div>

              <div className="relative">
                <div className="accent-line mx-auto mb-6" aria-hidden="true" />
                <h2 className="mb-4 font-display text-display-md md:text-display-lg text-brand-white">
                  Ready to refinish?
                </h2>
                <p className="mx-auto mb-10 max-w-lg font-body text-body-lg text-brand-smoke">
                  Call us for a same-day quote, or send us your photos and we&rsquo;ll
                  assess the damage and get back to you within a few hours.
                </p>

                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <Button
                    href="tel:+16045551234"
                    variant="primary"
                    size="lg"
                    leftIcon={<IconPhone />}
                  >
                    Call (604) 555-1234
                  </Button>
                  <Button
                    href="mailto:info@westernwheelcraft.ca"
                    variant="secondary"
                    size="lg"
                    leftIcon={<IconMail />}
                  >
                    Email Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-brand-graphite/60 bg-brand-jet-light">
        <div className="section-container py-12">
          <div className="grid gap-10 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link href="/" className="mb-4 flex items-center gap-3 hover:opacity-90 transition-opacity w-fit">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-red">
                  <span className="font-display text-sm text-brand-white">W</span>
                </span>
                <span className="font-display text-body-md tracking-tight text-brand-white">
                  Western <span className="text-brand-red">Wheelcraft</span>
                </span>
              </Link>
              <p className="mt-3 max-w-xs font-body text-body-sm text-brand-silver leading-relaxed">
                BC&rsquo;s trusted wheel refinishing experts since 1989. Serving
                the Lower Mainland, Vancouver Island, and Interior BC.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <a href="tel:+16045551234" className="flex items-center gap-2 font-body text-body-sm text-brand-smoke hover:text-brand-red transition-colors">
                  <IconPhone /> (604) 555-1234
                </a>
                <a href="mailto:info@westernwheelcraft.ca" className="flex items-center gap-2 font-body text-body-sm text-brand-smoke hover:text-brand-red transition-colors">
                  <IconMail /> info@westernwheelcraft.ca
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="mb-4 font-display text-body-md text-brand-white">Services</h3>
              <ul className="flex flex-col gap-2.5" role="list">
                {["Curb Rash Repair", "OEM Color Matching", "Custom Finishes", "Mobile Fleet Service", "Powder Coating"].map((s) => (
                  <li key={s}>
                    <a href="#services" className="font-body text-body-sm text-brand-silver hover:text-brand-red transition-colors">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regions */}
            <div>
              <h3 className="mb-4 font-display text-body-md text-brand-white">Regions</h3>
              <ul className="flex flex-col gap-2.5" role="list">
                {["Lower Mainland", "Vancouver Island", "Interior BC", "Fraser Valley"].map((r) => (
                  <li key={r}>
                    <a href="#regions" className="font-body text-body-sm text-brand-silver hover:text-brand-red transition-colors">
                      {r}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-brand-graphite/60 pt-8 sm:flex-row">
            <p className="font-body text-caption text-brand-silver">
              &copy; {new Date().getFullYear()} Western Wheelcraft Ltd. All rights reserved.
            </p>
            <div className="flex gap-5">
              <a href="#" className="font-body text-caption text-brand-silver hover:text-brand-smoke transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-body text-caption text-brand-silver hover:text-brand-smoke transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
