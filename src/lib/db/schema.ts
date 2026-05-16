/**
 * Demo schema-style types for WheelPro Demo.
 * These are fictional frontend models, not production database contracts.
 */

export type QuoteSource = "quote_demo" | "dealer_portal" | "booking_demo" | "automation_demo";

export type DemoCustomer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  type: "retail" | "dealer" | "fleet";
};

export type DemoJob = {
  id: string;
  customerId: string;
  service: string;
  status: "new" | "quoted" | "booked" | "paid" | "follow_up";
  source: QuoteSource;
};
