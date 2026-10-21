import { ArrowRight, Camera, Check, CreditCard, Mail, MapPin, MessageSquareText, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShopHeader } from "@/components/demo/shop-header";
import { Accent, SampleTag } from "@/components/ui/bits";
import { getShop, telHref } from "@/lib/shops";

// One plain line per service, matched on keywords so it works for any shop's list.
function describe(service: string) {
  const s = service.toLowerCase();
  if (s.includes("powder")) return "A tougher finish than paint, in almost any colour.";
  if (s.includes("bent") || s.includes("crack")) return "Straightened and welded so the wheel runs true again.";
  if (s.includes("mobile")) return "Done at your home or work, no drop-off needed.";
  if (s.includes("tire")) return "Mounting, balancing and swaps while the wheels are off.";
  if (s.includes("parts")) return "Calipers, trim and small parts painted to match.";
  if (s.includes("refinish") || s.includes("wheels and") || s === "wheels") return "Stripped and refinished, colour-matched or in a new colour.";
  return "Curb rash and scratches repaired and colour-matched.";
}

const steps = [
  { icon: Camera, t: "Send a photo", d: "Snap the wheel on your phone and tell us what you need." },
  { icon: MessageSquareText, t: "Get your price", d: "You get a written quote by text or email." },
  { icon: CreditCard, t: "Book and pay a deposit", d: "Pick a time and hold it with a card deposit online." },
];

export default async function DemoSite({ params }: PageProps<"/demo/[shop]">) {
  const shop = getShop((await params).shop);
  if (!shop) notFound();
  const quote = `/demo/${shop.slug}/quote`;

  return (
    <>
      <ShopHeader shop={shop} links />

      <main>
        <section className="wrap grid items-center gap-12 py-14 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="t-label mb-5 text-ink-3">
              {shop.kind === "mobile" ? "Mobile wheel repair" : "Wheel repair and refinishing"} · {shop.city}, {shop.province}
            </p>
            <h1 className="t-display">
              <Accent text="Wheels that look *new* again." />
            </h1>
            <p className="t-body-lg mt-6 max-w-[44ch] text-ink-2">
              {shop.name} fixes curb rash, scratches and damaged wheels. Send a photo from your phone and get a price before you
              {shop.kind === "mobile" ? " book a visit." : " drive in."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={quote}
                className="group inline-flex h-[52px] items-center gap-2 rounded-md bg-ink px-6 text-[16px] font-medium text-white transition-colors hover:bg-[#27272a]"
              >
                Get a price from a photo
                <ArrowRight size={18} strokeWidth={1.75} className="transition-transform group-hover:translate-x-[3px]" />
              </Link>
              {shop.phone && (
                <a href={telHref(shop.phone)} className="inline-flex h-[52px] items-center gap-2 rounded-md border border-line-strong px-6 text-[16px] font-medium text-ink hover:border-ink">
                  <Phone size={17} strokeWidth={1.75} /> {shop.phone}
                </a>
              )}
            </div>
            {shop.highlights.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5">
                {shop.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2.5 text-[15px] text-ink">
                    <span className="grid size-5 place-items-center rounded-sm bg-success-soft text-success">
                      <Check size={13} strokeWidth={2.4} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[460px] lg:col-span-5">
            <div className="absolute inset-[6%] rounded-full bg-hero" />
            <Image src="/photos/wheel.png" alt="A refinished alloy wheel" fill priority sizes="(min-width: 1024px) 460px, 90vw" className="object-contain drop-shadow-xl" />
          </div>
        </section>

        <section id="services" className="border-t border-line bg-subtle py-16 md:py-24">
          <div className="wrap">
            <p className="t-label mb-4 text-ink-3">Services</p>
            <h2 className="t-h1 max-w-[16ch]">What we do</h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shop.services.map((s) => (
                <li key={s} className="rounded-lg border border-line bg-white p-6">
                  <p className="text-[18px] font-medium text-ink">{s}</p>
                  <p className="mt-2 text-[15px] text-ink-3">{describe(s)}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="how" className="wrap py-16 md:py-24">
          <p className="t-label mb-4 text-ink-3">How it works</p>
          <h2 className="t-h1 max-w-[18ch]">
            <Accent text="Priced from a *photo*." />
          </h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map(({ icon: Icon, t, d }, i) => (
              <li key={t} className="rounded-lg border border-line p-6">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-md bg-accent-soft text-accent">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <span className="t-mono text-[13px] text-ink-3">0{i + 1}</span>
                </div>
                <p className="mt-5 text-[18px] font-medium text-ink">{t}</p>
                <p className="mt-1.5 text-[15px] text-ink-3">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-t border-line py-16 md:py-24">
          <div className="wrap">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="t-label mb-4 text-ink-3">Our work</p>
                <h2 className="t-h1">Before and after</h2>
              </div>
              <p className="max-w-[38ch] text-[15px] text-ink-3">Your own job photos go here. We bring them over from your Facebook and Instagram when we set up.</p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
              {["/photos/rash-lip.jpg", "/photos/rash-chips.jpg", "/photos/rash-dark.jpg", "/photos/model-y.jpg"].map((src) => (
                <div key={src} className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                  <Image src={src} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
                  <SampleTag className="absolute top-3 left-3" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-dark py-16 md:py-20">
          <div className="wrap flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <h2 className="t-h1 max-w-[18ch] !text-on-dark">Know the price before you {shop.kind === "mobile" ? "book" : "drive in"}.</h2>
            <Link href={quote} className="inline-flex h-[52px] shrink-0 items-center gap-2 rounded-md bg-on-dark px-6 text-[16px] font-medium text-ink hover:bg-white">
              Send a photo <ArrowRight size={18} strokeWidth={1.75} />
            </Link>
          </div>
        </section>

        <section id="contact" className="wrap grid gap-8 py-16 md:grid-cols-3 md:py-20">
          <div>
            <p className="t-label mb-4 text-ink-3">Contact</p>
            <h2 className="t-h2">{shop.name}</h2>
          </div>
          <ul className="grid gap-4 text-[16px] text-ink-2 md:col-span-2 md:grid-cols-2">
            {shop.address && (
              <li className="flex gap-3">
                <MapPin size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-ink-3" />
                {shop.address}
              </li>
            )}
            {shop.kind === "mobile" && (
              <li className="flex gap-3">
                <MapPin size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-ink-3" />
                We come to you across {shop.city}
              </li>
            )}
            {shop.phone && (
              <li className="flex gap-3">
                <Phone size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-ink-3" />
                <a href={telHref(shop.phone)} className="hover:text-ink">{shop.phone}</a>
              </li>
            )}
            {shop.email && (
              <li className="flex gap-3">
                <Mail size={18} strokeWidth={1.75} className="mt-0.5 shrink-0 text-ink-3" />
                <span className="break-all">{shop.email}</span>
              </li>
            )}
          </ul>
        </section>
      </main>

      <footer className="border-t border-line py-8">
        <div className="wrap flex flex-wrap justify-between gap-3 text-[13px] text-ink-3">
          <p>© 2026 {shop.name}</p>
          <p>Website and job system by WheelPro Systems</p>
        </div>
      </footer>
    </>
  );
}
