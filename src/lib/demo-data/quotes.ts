export const quotes = [
  {
    id: "QUOTE-DEMO-1001",
    customerId: "demo-customer-1",
    customerName: "Demo Retail Customer",
    service: "Mobile curb rash repair",
    status: "sent",
    source: "quote_demo",
    createdAt: "2026-06-01",
    estimatedCategory: "Photo-ready cosmetic estimate",
  },
  {
    id: "QUOTE-DEMO-1002",
    customerId: "demo-customer-2",
    customerName: "Demo Dealer Account",
    service: "Bulk wheel inspection",
    status: "new",
    source: "dealer_portal",
    createdAt: "2026-06-02",
    estimatedCategory: "B2B batch estimate",
  },
] as const;

export type Quote = (typeof quotes)[number];

export default quotes;
