"use client";

import Link from "next/link";
import { BarChart3, CalendarDays, FileText, Settings, Users } from "lucide-react";

const links = [
  { label: "Dashboard", href: "/admin", icon: BarChart3 },
  { label: "Bookings", href: "/admin/bookings", icon: CalendarDays },
  { label: "Invoices", href: "/admin/invoices", icon: FileText },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-cyan-300">WheelPro Demo</p>
      <nav className="grid gap-2">
        {links.map(({ label, href, icon: Icon }) => (
          <Link key={href} href={href} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-steel-200 hover:bg-white/[0.05] hover:text-white">
            <Icon className="h-4 w-4 text-cyan-300" aria-hidden="true" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
