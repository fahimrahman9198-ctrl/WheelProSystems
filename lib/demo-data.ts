// Sample data for the /demo/[shop] admin panel. Every name, job and price here is illustrative and is
// labelled "Sample" in the UI. On the setup call the shop's own price list replaces `prices`.

export type Lead = {
  id: string;
  name: string;
  source: "Website" | "Facebook" | "Instagram" | "Google";
  vehicle: string;
  wheels: number;
  size: string;
  damage: string[];
  finish: string;
  reply: "Text" | "Call" | "Email";
  received: string;
  status: "New" | "Quoted" | "Deposit paid" | "Booked";
  photos: string[];
  notes?: string;
};

export const sampleLeads: Lead[] = [
  {
    id: "jordan",
    name: "Jordan P.",
    source: "Website",
    vehicle: "2021 Audi Q5",
    wheels: 2,
    size: '20"',
    damage: ["Curb rash", "Scratches"],
    finish: "Match the original",
    reply: "Text",
    received: "8:14 AM",
    status: "New",
    photos: ["/photos/rash-lip.jpg", "/photos/rash-chips.jpg"],
    notes: "Front and rear passenger side. Need it before the weekend if possible.",
  },
  {
    id: "priya",
    name: "Priya S.",
    source: "Instagram",
    vehicle: "2019 Honda Civic",
    wheels: 4,
    size: '18"',
    damage: ["Just want a new colour"],
    finish: "Black",
    reply: "Email",
    received: "Yesterday",
    status: "Quoted",
    photos: ["/photos/rash-dark.jpg"],
  },
  {
    id: "marc",
    name: "Marc D.",
    source: "Google",
    vehicle: "2022 Tesla Model Y",
    wheels: 1,
    size: '19"',
    damage: ["Curb rash"],
    finish: "Match the original",
    reply: "Call",
    received: "Mon",
    status: "Deposit paid",
    photos: ["/photos/rash-chips.jpg"],
  },
  {
    id: "dana",
    name: "Dana K.",
    source: "Facebook",
    vehicle: "2018 Ford F-150",
    wheels: 4,
    size: '20"',
    damage: ["Corrosion or peeling"],
    finish: "Custom colour",
    reply: "Text",
    received: "Sun",
    status: "Booked",
    photos: ["/photos/rash-dark.jpg"],
  },
];

/** Sample per-wheel prices (CAD). */
export const prices = {
  repair: 140, // curb rash / scratch repair, match original
  refinish: 190, // full refinish in a new colour
  bent: 160, // straightening, added on top
  cracked: 180, // weld, added on top
  size20Plus: 25, // per wheel, 20" and up
};

export const DEPOSIT_RATE = 0.25;

export type QuoteLine = { label: string; qty: number; each: number };

export function quoteFor(lead: Pick<Lead, "wheels" | "size" | "damage" | "finish">): QuoteLine[] {
  const newColour = lead.finish !== "Match the original" || lead.damage.includes("Just want a new colour");
  const lines: QuoteLine[] = [
    newColour
      ? { label: `Full refinish (${lead.finish.toLowerCase()})`, qty: lead.wheels, each: prices.refinish }
      : { label: "Curb rash and scratch repair, colour matched", qty: lead.wheels, each: prices.repair },
  ];
  if (lead.damage.includes("Bent")) lines.push({ label: "Straightening", qty: lead.wheels, each: prices.bent });
  if (lead.damage.includes("Cracked")) lines.push({ label: "Crack weld", qty: 1, each: prices.cracked });
  if (/^(2[0-9])/.test(lead.size)) lines.push({ label: `${lead.size} and up`, qty: lead.wheels, each: prices.size20Plus });
  return lines;
}

export const total = (lines: QuoteLine[]) => lines.reduce((t, l) => t + l.qty * l.each, 0);
export const money = (n: number) => `$${n.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** Sales tax by province (HST, or GST + PST), for invoices. */
export const TAX: Record<string, { label: string; rate: number }> = {
  ON: { label: "HST 13%", rate: 0.13 },
  NS: { label: "HST 14%", rate: 0.14 },
  NL: { label: "HST 15%", rate: 0.15 },
  AB: { label: "GST 5%", rate: 0.05 },
  MB: { label: "GST 5% + PST 7%", rate: 0.12 },
  SK: { label: "GST 5% + PST 6%", rate: 0.11 },
  BC: { label: "GST 5% + PST 7%", rate: 0.12 },
  QC: { label: "GST 5% + QST 9.975%", rate: 0.14975 },
};

// The same set of automations Western Wheelcraft runs, worded for any shop.
export const automations = [
  { group: "Quotes", title: "Instant reply", when: "The moment a request comes in", on: true },
  { group: "Quotes", title: "Quote follow-up 1", when: "1 day after the quote, if no reply", on: true },
  { group: "Quotes", title: "Quote follow-up 2", when: "3 days after the quote", on: true },
  { group: "Quotes", title: "Quote follow-up 3", when: "7 days after the quote", on: true },
  { group: "Quotes", title: "Lost quote win-back", when: "30 days after a quote that went quiet", on: false },
  { group: "Bookings", title: "Deposit reminder", when: "24 hours after the deposit link, if unpaid", on: true },
  { group: "Bookings", title: "Drop-off reminder", when: "24 hours before the booking", on: true },
  { group: "Bookings", title: "Same-day reminder", when: "Morning of the booking", on: true },
  { group: "Bookings", title: "Missed booking follow-up", when: "If they don't show", on: true },
  { group: "After the job", title: "Review request", when: "2 hours after the final payment", on: true },
  { group: "After the job", title: "Care instructions", when: "With the final invoice", on: true },
  { group: "After the job", title: "Referral ask", when: "14 days after the job", on: false },
  { group: "After the job", title: "Seasonal check-in", when: "Before winter tire season", on: false },
];
