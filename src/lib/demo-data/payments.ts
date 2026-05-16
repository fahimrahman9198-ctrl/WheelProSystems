export const payments = [
  {
    id: "PAY-DEMO-1001",
    invoiceId: "INV-DEMO-1001",
    customerName: "Demo Retail Customer",
    amount: 225,
    status: "paid",
    method: "Demo card",
  },
  {
    id: "PAY-DEMO-1002",
    invoiceId: "INV-DEMO-1002",
    customerName: "Demo Dealer Account",
    amount: 1440,
    status: "unpaid",
    method: "Demo invoice",
  },
] as const;

export type Payment = (typeof payments)[number];

export default payments;
