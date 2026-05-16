export const customers = [
  {
    id: "demo-customer-1",
    name: "Demo Retail Customer",
    email: "retail.demo@example.com",
    phone: "000-000-0000",
    address: "Demo service address",
    city: "Demo City",
    type: "individual",
    notes: "Fictional customer record for WheelPro Demo.",
  },
  {
    id: "demo-customer-2",
    name: "Demo Dealer Account",
    email: "dealer.demo@example.com",
    phone: "000-000-0000",
    address: "Demo dealer lot",
    city: "Demo City",
    type: "dealer",
    notes: "Fictional B2B account for portal previews.",
  },
  {
    id: "demo-customer-3",
    name: "Demo Fleet Account",
    email: "fleet.demo@example.com",
    phone: "000-000-0000",
    address: "Demo fleet yard",
    city: "Demo City",
    type: "fleet",
    notes: "Fictional fleet account for monthly activity summaries.",
  },
] as const;

export type Customer = (typeof customers)[number];

export default customers;
