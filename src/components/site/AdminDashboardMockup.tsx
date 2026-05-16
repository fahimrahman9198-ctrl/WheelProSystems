"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, FilePlus2, ReceiptText } from "lucide-react";
import { demoMetrics } from "@/lib/site";

const pipeline = [
  { stage: "New lead", customer: "Demo Retail Customer", service: "Curb rash repair", status: "Needs review" },
  { stage: "Quote sent", customer: "Demo Fleet Account", service: "4 wheel refinish", status: "Awaiting approval" },
  { stage: "Booked", customer: "Demo Mobile Job", service: "Cosmetic wheel repair", status: "Deposit pending" },
  { stage: "Follow-up", customer: "Demo Dealer Account", service: "Batch request", status: "Reminder queued" },
];

const invoices = [
  { id: "INV-DEMO-1001", account: "Demo Retail Customer", amount: 225, status: "Paid" },
  { id: "INV-DEMO-1002", account: "Demo Fleet Account", amount: 980, status: "Unpaid" },
  { id: "INV-DEMO-1003", account: "Demo Dealer Account", amount: 1440, status: "Unpaid" },
];

export function AdminDashboardMockup() {
  const [lineItem, setLineItem] = useState("Mobile curb rash repair");
  const [amount, setAmount] = useState("225");

  const total = useMemo(() => Number(amount || 0).toLocaleString("en-US", { style: "currency", currency: "USD" }), [amount]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {demoMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <p className="text-sm text-steel-400">{metric.label}</p>
            <p className="mt-2 font-mono text-3xl font-semibold text-white">{metric.value}</p>
            <p className="mt-1 text-xs text-cyan-300">{metric.delta}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-cyan-300" aria-hidden="true" />
            <h2 className="text-2xl font-semibold text-white">Pipeline and analytics</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {pipeline.map((item) => (
              <div key={item.customer} className="grid gap-3 rounded-lg border border-white/10 bg-lab-950/70 p-4 md:grid-cols-4">
                <p className="text-sm font-semibold text-white">{item.stage}</p>
                <p className="text-sm text-steel-300">{item.customer}</p>
                <p className="text-sm text-steel-300">{item.service}</p>
                <p className="font-mono text-xs text-cyan-300">{item.status}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {["Lead source: quote form", "Follow-ups sent: 34", "Revenue/deposit preview: mock"].map((item) => (
              <div key={item} className="rounded-lg border border-cyan-300/15 bg-cyan-300/[0.04] p-4 text-sm text-steel-200">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-cyan-300/20 bg-[#08111F] p-6">
          <div className="flex items-center gap-3">
            <FilePlus2 className="h-5 w-5 text-cyan-300" aria-hidden="true" />
            <h2 className="text-2xl font-semibold text-white">Custom invoice builder</h2>
          </div>
          <label className="mt-5 block">
            <span className="text-sm text-steel-300">Line item</span>
            <input value={lineItem} onChange={(event) => setLineItem(event.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-lab-950/70 px-3 py-3 text-sm text-white" />
          </label>
          <label className="mt-4 block">
            <span className="text-sm text-steel-300">Amount</span>
            <input value={amount} onChange={(event) => setAmount(event.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-lab-950/70 px-3 py-3 text-sm text-white" />
          </label>
          <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <p className="text-sm text-steel-300">Preview</p>
            <p className="mt-2 text-lg font-semibold text-white">{lineItem}</p>
            <p className="mt-1 font-mono text-2xl text-cyan-300">{total}</p>
          </div>
        </section>
      </div>

      <section className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
        <div className="flex items-center gap-3">
          <ReceiptText className="h-5 w-5 text-cyan-300" aria-hidden="true" />
          <h2 className="text-2xl font-semibold text-white">Paid and unpaid list</h2>
        </div>
        <div className="mt-5 grid gap-3">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="grid gap-3 rounded-lg border border-white/10 bg-lab-950/70 p-4 md:grid-cols-4">
              <p className="font-mono text-sm text-cyan-300">{invoice.id}</p>
              <p className="text-sm text-steel-200">{invoice.account}</p>
              <p className="font-mono text-sm text-white">${invoice.amount}</p>
              <p className={invoice.status === "Paid" ? "text-sm text-success-400" : "text-sm text-warning-400"}>{invoice.status}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
