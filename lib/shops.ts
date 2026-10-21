// Shops that have a personalised quote page at /q/[slug].
// Details come from each shop's own website or public listings (client-leads/canada-wheel-leads.csv).
// Only list facts the shop states publicly; never invent reviews, prices or years.
//
// status "preview": the page shows a "Preview built for…" bar and requests go to CONTACT_TO (you).
// status "live":    the shop said yes. Requests go to the shop's email, copied to CONTACT_TO.

export type Shop = {
  slug: string;
  name: string;
  city: string;
  province: string;
  kind: "shop" | "mobile";
  phone?: string;
  email?: string;
  address?: string;
  /** Short facts from their own site, shown as ticks under the headline. */
  highlights: string[];
  /** What they offer, shown as a list beside the form. */
  services: string[];
  status: "preview" | "live";
  /** Optional brand colour (hex) to replace the default bronze accent. */
  accent?: string;
};

export const shops: Shop[] = [
  {
    slug: "london-wheel-repair",
    name: "London Wheel Repair",
    city: "London",
    province: "ON",
    kind: "shop",
    phone: "519-652-3047",
    email: "miket5413@gmail.com",
    address: "179-H Exeter Rd, London, ON N6L 1A4",
    highlights: ["20+ years repairing wheels in London"],
    services: ["Curb rash and scratch repair", "Bent and cracked wheel repair", "Refinishing", "Powder coating", "Parts painting"],
    status: "preview",
  },
  {
    slug: "wheel-works-edmonton",
    name: "Wheel Works Edmonton",
    city: "Edmonton",
    province: "AB",
    kind: "shop",
    phone: "780-463-4763",
    email: "info@wheelworksedmonton.com",
    address: "9727 60 Ave, Edmonton, AB T6E 0C4",
    highlights: ["Family-run since 1997"],
    services: ["Curb rash and scratch repair", "Wheel refinishing"],
    status: "preview",
  },
  {
    slug: "winnipeg-wheel-works",
    name: "Winnipeg Wheel Works",
    city: "Sunnyside",
    province: "MB",
    kind: "shop",
    phone: "(204) 222-9191",
    address: "241 Gunn Rd, Sunnyside, MB R5R 0C7",
    highlights: ["Repairing wheels since 1989"],
    services: ["Curb rash and scratch repair", "Wheel refinishing"],
    status: "preview",
  },
  {
    slug: "wheel-fix-it",
    name: "Wheel Fix It",
    city: "Winnipeg",
    province: "MB",
    kind: "shop",
    phone: "204-772-9412",
    address: "944 Elgin Ave Unit B, Winnipeg, MB R3E 1B4",
    highlights: ["MPI certified"],
    services: ["Curb rash and scratch repair", "Wheel refinishing"],
    status: "preview",
  },
  {
    slug: "rapid-wheel-refinishing",
    name: "Rapid Wheel Refinishing",
    city: "Oshawa",
    province: "ON",
    kind: "shop",
    phone: "905-576-3461",
    address: "1406 Taunton Rd E, Oshawa, ON L1H 8L7",
    highlights: ["Pickup and delivery across Durham"],
    services: ["Wheel repair", "Wheel refinishing", "Tires"],
    status: "preview",
  },
  {
    slug: "wheel-transformers",
    name: "Wheel Transformers",
    city: "Calgary",
    province: "AB",
    kind: "mobile",
    phone: "403-973-6710",
    email: "Wheeltransformers@outlook.com",
    highlights: ["Mobile service in Calgary and Chestermere", "After-hours calls welcome"],
    services: ["Mobile wheel repair", "Mobile tire service"],
    status: "preview",
  },
  {
    slug: "alloy-wheel-repair-edmonton",
    name: "Alloy Wheel Repair Specialists Edmonton",
    city: "Edmonton",
    province: "AB",
    kind: "shop",
    phone: "780 968 1444",
    email: "hello@alloywheelrepairyeg.com",
    address: "1202 77 Avenue NW, Edmonton, AB T6P 1M2",
    highlights: [],
    services: ["Curb rash and scratch repair", "Wheel refinishing"],
    status: "preview",
  },
  {
    slug: "wheel-surgeon",
    name: "Wheel Surgeon",
    city: "Ottawa",
    province: "ON",
    kind: "shop",
    phone: "613-686-1730",
    highlights: ["Pickup and delivery available"],
    services: ["Wheel repair", "Powder coating"],
    status: "preview",
  },
  {
    slug: "wheel-wizards",
    name: "Wheel Wizards",
    city: "Hamilton",
    province: "ON",
    kind: "shop",
    phone: "905-544-9651",
    email: "wheelwizards@bellnet.ca",
    address: "162 Sherman Ave N, Hamilton, ON L8L 6M7",
    highlights: ["1-year warranty", "Commercial pickup and delivery"],
    services: ["Wheel repair and refinishing", "Wheels and tires"],
    status: "preview",
  },
  {
    slug: "calgary-rim-repair",
    name: "Calgary Rim Repair",
    city: "Calgary",
    province: "AB",
    kind: "shop",
    phone: "403-640-2110",
    email: "info@calgaryrimrepair.com",
    address: "7855 Flint Road SE, Calgary, AB T2H 1G3",
    highlights: ["Repairing rims in Calgary since 2018"],
    services: ["Rim repair", "Wheel refinishing"],
    status: "preview",
  },
  {
    slug: "pj-wheels",
    name: "PJ Wheels",
    city: "Calgary",
    province: "AB",
    kind: "mobile",
    phone: "(403) 861-3582",
    email: "pjwheels.calgary@gmail.com",
    highlights: ["Owner-operated, 20+ years in the trade", "We come to you"],
    services: ["Mobile wheel repair", "Wheel refinishing"],
    status: "preview",
  },
  {
    slug: "complete-wheel-shop",
    name: "The Complete Wheel Shop",
    city: "Regina",
    province: "SK",
    kind: "shop",
    phone: "(306) 789-9210",
    email: "wheelshop@sasktel.net",
    address: "1005 Wellings Rd, Regina, SK S4K 0A2",
    highlights: [],
    services: ["Wheel repair", "Wheel refinishing", "Wheels"],
    status: "preview",
  },
];

export const getShop = (slug: string) => shops.find((s) => s.slug === slug);

/** Digits only, for tel: and sms: links. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
