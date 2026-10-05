import { Reveal } from "../ui/motion";
import { ContactForm } from "./contact-form";

// Set NEXT_PUBLIC_CAL_LINK (e.g. "wheelpro/20min") to show the Cal.com calendar instead of the form.
const calLink = process.env.NEXT_PUBLIC_CAL_LINK;

const agenda = [
  { t: "5 min", v: "How you get jobs today" },
  { t: "10 min", v: "Live walkthrough, customer side and your side" },
  { t: "5 min", v: "What we'd set up first" },
];

export function Book() {
  return (
    <section id="book" className="section">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="t-label mb-4 text-ink-3">Get started</p>
            <h2 className="t-h1">
              Let’s set up
              <br />
              <span className="t-outline">your shop</span>
            </h2>
            <p className="t-body-lg mt-5 max-w-[40ch] text-ink-2">
              20 minutes. We’ll show you the system with your services, your area and your finishes.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-10 border-t border-line">
              {agenda.map((a) => (
                <li key={a.t} className="grid grid-cols-[80px_1fr] border-b border-line py-4 text-[16px] text-ink">
                  <span className="t-mono pt-0.5 text-[13px] text-ink-3">{a.t}</span>
                  {a.v}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="lg:col-span-7">
          {calLink ? (
            <div className="overflow-hidden bg-subtle">
              <iframe
                src={`https://cal.com/${calLink}?embed=true&theme=light`}
                title="Book a 20-minute meeting with WheelPro"
                className="h-[640px] w-full"
                loading="lazy"
              />
            </div>
          ) : (
            <ContactForm />
          )}
        </Reveal>
      </div>
    </section>
  );
}
