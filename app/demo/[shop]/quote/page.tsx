import { Check } from "lucide-react";
import { notFound } from "next/navigation";
import { ShopHeader } from "@/components/demo/shop-header";
import { QuoteForm } from "@/components/quote/quote-form";
import { Accent } from "@/components/ui/bits";
import { getShop } from "@/lib/shops";

const steps = [
  { n: "01", t: "Send photos", d: "One of the whole wheel, one close-up of the damage." },
  { n: "02", t: "Get your price", d: "Priced from your photos, by the people doing the work." },
  { n: "03", t: "Book and pay a deposit", d: "Pick a time and hold it online." },
];

export default async function DemoQuote({ params }: PageProps<"/demo/[shop]/quote">) {
  const shop = getShop((await params).shop);
  if (!shop) notFound();
  const mobile = shop.kind === "mobile";

  return (
    <>
      <ShopHeader shop={shop} />
      <main className="wrap grid gap-10 py-10 md:py-14 lg:grid-cols-12 lg:gap-14 lg:py-20">
        <section className="lg:col-span-5">
          <div className="lg:sticky lg:top-10">
            <p className="t-label mb-4 text-ink-3">Photo quote · {shop.city}</p>
            <h1 className="t-h1">
              <Accent text="Send a photo. Get a *price*." />
            </h1>
            <p className="t-body-lg mt-5 max-w-[40ch] text-ink-2">
              Show {shop.name} the damage from your phone. No need to {mobile ? "book a visit" : "drive in"} just to find out what it
              costs.
            </p>

            {shop.highlights.length > 0 && (
              <ul className="mt-6 grid gap-2.5">
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

            <ol className="mt-10 hidden gap-5 border-t border-line pt-8 lg:grid">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="t-mono pt-0.5 text-[13px] text-accent">{s.n}</span>
                  <div>
                    <p className="text-[16px] font-medium text-ink">{s.t}</p>
                    <p className="text-[15px] text-ink-3">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="lg:col-span-7">
          <QuoteForm slug={shop.slug} shopName={shop.name} mobile={mobile} />
        </section>
      </main>
    </>
  );
}
