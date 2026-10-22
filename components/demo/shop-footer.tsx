import { Mail, MapPin, Phone } from "lucide-react";
import { type Shop, telHref } from "@/lib/shops";

/** The shop's contact footer, shared by their website and quote page. */
export function ShopFooter({ shop }: { shop: Shop }) {
  const mobile = shop.kind === "mobile";
  return (
    <footer id="contact" className="mx-auto grid max-w-[1280px] gap-10 border-t border-line px-5 py-12 md:grid-cols-[1.3fr_1fr_1fr] md:px-8">
      <div>
        <p className="text-[20px] font-medium tracking-[-0.01em] text-ink">{shop.name}</p>
        <p className="mt-2 text-[14px] text-ink-3">
          {mobile ? "Mobile wheel repair" : "Wheel repair"} · {shop.city}
        </p>
      </div>
      <ul className="grid content-start gap-3 text-[15px] text-ink-2">
        {(shop.address || mobile) && (
          <li className="flex gap-2.5">
            <MapPin size={17} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" />
            {shop.address ?? `We come to you across ${shop.city}`}
          </li>
        )}
        {shop.phone && (
          <li className="flex gap-2.5">
            <Phone size={17} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" />
            <a href={telHref(shop.phone)} className="hover:text-ink">
              {shop.phone}
            </a>
          </li>
        )}
        {shop.email && (
          <li className="flex gap-2.5">
            <Mail size={17} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" />
            <span className="break-all">{shop.email}</span>
          </li>
        )}
      </ul>
      <div className="md:text-right">
        <p className="shop-label">© 2026 {shop.name}</p>
        <p className="mt-2 text-[13px] text-ink-3">Website by WheelPro Systems</p>
      </div>
    </footer>
  );
}
