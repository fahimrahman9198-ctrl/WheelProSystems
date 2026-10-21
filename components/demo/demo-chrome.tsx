"use client";

import { Globe, LayoutDashboard, Smartphone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * The frame around every demo page: a top bar saying whose demo this is, and a floating tour bar
 * that moves between the three things the shop would get (website, customer quote, admin).
 */
export function DemoChrome({ slug, shopName }: { slug: string; shopName: string }) {
  const path = usePathname();
  const base = `/demo/${slug}`;
  const tabs = [
    { href: base, label: "Website", icon: Globe, on: path === base },
    { href: `${base}/quote`, label: "Customer quote", icon: Smartphone, on: path.startsWith(`${base}/quote`) },
    { href: `${base}/admin`, label: "Your admin", icon: LayoutDashboard, on: path.startsWith(`${base}/admin`) },
  ];

  // Tell WheelPro the first time this demo is opened in a browser session, so the call can follow the same day.
  // Visit once with ?me=1 to stop your own visits counting.
  useEffect(() => {
    try {
      const q = new URLSearchParams(location.search);
      if (q.has("me") || q.has("shot")) localStorage.setItem("wp-me", "1");
      if (localStorage.getItem("wp-me") || sessionStorage.getItem(`wp-view-${slug}`)) return;
      sessionStorage.setItem(`wp-view-${slug}`, "1");
    } catch {
      // Storage blocked: still report the view.
    }
    navigator.sendBeacon?.("/api/demo/view", JSON.stringify({ slug }));
  }, [slug]);

  return (
    <>
      <div className="demo-chrome bg-dark px-5 py-2.5 text-center text-[13px] text-on-dark-2">
        Demo built for {shopName} by <span className="text-on-dark">WheelPro Systems</span> · sample data, nothing here is live
      </div>
      <nav
        aria-label="Demo tour"
        className="demo-chrome fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-lg bg-dark p-1 shadow-lg ring-1 ring-dark-line"
      >
        {tabs.map(({ href, label, icon: Icon, on }) => (
          <Link
            key={href}
            href={href}
            aria-current={on ? "page" : undefined}
            className={`inline-flex h-10 items-center gap-2 rounded-md px-3 text-[14px] font-medium whitespace-nowrap transition-colors sm:px-4 ${on ? "bg-on-dark text-ink" : "text-on-dark-2 hover:text-on-dark"}`}
          >
            <Icon size={16} strokeWidth={1.75} />
            <span className={on ? "" : "hidden sm:inline"}>{label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
