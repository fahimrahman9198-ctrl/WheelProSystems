"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { logoutAdmin } from "@/lib/admin-auth";

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#05070D] text-white">
      <header className="border-b border-white/10 bg-lab-950/90 px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/demo/admin" className="font-semibold">WheelPro Demo Admin</Link>
          <button onClick={logoutAdmin} className="rounded-lg border border-white/10 px-3 py-2 text-sm text-steel-200">
            Log out
          </button>
        </div>
      </header>
      {children}
    </div>
  );
}
