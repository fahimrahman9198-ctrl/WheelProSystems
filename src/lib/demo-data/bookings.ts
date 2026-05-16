export const bookings = [
  {
    id: "booking-demo-1",
    customerId: "demo-customer-1",
    customerName: "Demo Retail Customer",
    service: "Curb rash repair",
    date: "2026-06-04",
    time: "10:00 AM",
    status: "confirmed",
    notes: "Fictional booking created for the WheelPro Demo booking flow.",
  },
  {
    id: "booking-demo-2",
    customerId: "demo-customer-2",
    customerName: "Demo Dealer Account",
    service: "Dealer batch wheel inspection",
    date: "2026-06-05",
    time: "1:00 PM",
    status: "pending",
    notes: "Fictional B2B portal booking preview.",
  },
] as const;

export type Booking = (typeof bookings)[number];

export default bookings;
