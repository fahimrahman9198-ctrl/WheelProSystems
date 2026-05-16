export const invoices = [
  {
    id: "INV-DEMO-1001",
    customerId: "demo-customer-1",
    customerName: "Demo Retail Customer",
    amount: 225,
    status: "paid",
    notes: "Fictional paid invoice for dashboard preview.",
    internalNotes: "Demo-only record.",
  },
  {
    id: "INV-DEMO-1002",
    customerId: "demo-customer-2",
    customerName: "Demo Dealer Account",
    amount: 1440,
    status: "unpaid",
    notes: "Fictional unpaid invoice for dealer portal preview.",
    internalNotes: "Demo-only record.",
  },
] as const;

export type Invoice = (typeof invoices)[number];

export default invoices;
