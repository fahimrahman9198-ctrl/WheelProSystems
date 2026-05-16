export const siteConfig = {
  name: "WheelPro Systems",
  demoName: "WheelPro Demo",
  agencyName: "WheelPro Systems",
  domain: "Domain coming soon",
  url: "https://wheelprosystems.com",
  founder: "Fahim Rahman",
  email: "fahim@wheelprosystems.com",
  motto: "Turn Your Business Into a System",
  demoMotto: "Turn a Wheel Service Business Into a System",
  bookingPlaceholder: "PASTE_GOOGLE_CALENDAR_BOOKING_LINK_HERE",
};

export function getBookingUrl() {
  return process.env.NEXT_PUBLIC_BOOKING_URL || siteConfig.bookingPlaceholder;
}

export function isPlaceholderBookingUrl(url: string) {
  return url === siteConfig.bookingPlaceholder;
}

export const agencyNavLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "AI Integration", href: "/ai" },
  { label: "Industries", href: "/industries" },
  { label: "View Demo", href: "/demo" },
  { label: "Book Audit", href: "/book" },
];

export const demoNavLinks = [
  { label: "Demo Home", href: "/demo" },
  { label: "Quote", href: "/demo/quote" },
  { label: "Booking", href: "/demo/booking" },
  { label: "Dashboard", href: "/demo/dashboard" },
  { label: "Dealer Portal", href: "/demo/dealer-portal" },
  { label: "Admin", href: "/demo/admin" },
  { label: "Automation", href: "/demo/automation" },
];

// Alias for backward compatibility
export const navLinks = agencyNavLinks;

export const systemFlow = ["Photo lead", "AI quote assist", "Booking", "Deposit", "Dashboard", "Follow-up"] as const;

export const services = [
  {
    title: "Curb rash repair",
    description: "A photo-first workflow for cosmetic wheel damage, severity notes, finish type, and repair location.",
    problem: "Customers need a fast way to submit visible damage.",
    build: "Photo upload, damage category, vehicle details, and urgency.",
    result: "A cleaner path from inquiry to quote and booking.",
  },
  {
    title: "Wheel refinishing",
    description: "Quote and booking paths for OEM-style refinish, diamond cut, repaint, and multi-wheel jobs.",
    problem: "Refinish requests need finish, wheel count, and approval context.",
    build: "Structured refinish intake and booking-ready estimate categories.",
    result: "A more organized workflow for multi-step wheel jobs.",
  },
  {
    title: "Mobile wheel repair",
    description: "Route-friendly service intake with vehicle location, urgency, access notes, and appointment windows.",
    problem: "Mobile jobs need location and schedule clarity before dispatch.",
    build: "Location selection, appointment windows, and confirmation prompts.",
    result: "A route-friendly quote-to-booking flow.",
  },
  {
    title: "Cosmetic wheel repair",
    description: "Simple service categories for scratches, chips, clear coat issues, corrosion, and finish refreshes.",
    problem: "Cosmetic issues are easy to misclassify without guided intake.",
    build: "Damage-type selections and AI-style category guidance.",
    result: "Faster triage and clearer next steps.",
  },
  {
    title: "Fleet/dealer wheel service",
    description: "Bulk job requests, account dashboards, priority queues, invoice status, and monthly activity views.",
    problem: "Repeat accounts need batch intake and status visibility.",
    build: "Dealer portal, multiple vehicles, priorities, and activity summaries.",
    result: "A professional B2B workflow for recurring service.",
  },
  {
    title: "Custom refinishing / color change",
    description: "Demo intake for finish inspiration, color preference, wheel count, and approval checkpoints.",
    problem: "Custom finish jobs need more context before quoting.",
    build: "Finish preferences, reference notes, and approval checkpoints.",
    result: "A clearer path for higher-consideration requests.",
  },
  {
    title: "Inspection/photo quote workflow",
    description: "Structured upload and triage flow that helps businesses respond faster with cleaner quote context.",
    problem: "Scattered photos make estimates slow and inconsistent.",
    build: "Guided uploads, missing-info prompts, and quote assistant output.",
    result: "Cleaner intake before the first reply.",
  },
  {
    title: "Admin & User Dashboards",
    description: "Mock dashboards for customer status, internal pipeline, revenue previews, invoices, and follow-up tasks.",
    problem: "Leads, bookings, payments, and follow-ups are hard to see in one place.",
    build: "Dashboards for lead status, service pipeline, revenue signals, and customer history.",
    result: "Owners get clearer control over the moving parts that create booked jobs.",
  },
];

export const industries = [
  {
    title: "Wheel Refinishing",
    description: "Quote-first systems for refinishing, repair requests, photo intake, booking, deposits, and repeat dealer workflows.",
    fit: "Best first fit",
  },
  {
    title: "Rim Repair",
    description: "Photo-based quote flows and job status systems for repair teams handling alloy wheel damage, bends, finishes, and mobile service routes.",
    fit: "Core niche",
  },
  {
    title: "Mobile Detailing",
    description: "Packages, booking, deposits, reminders, upgrades, and customer follow-up for detailers who need better intake and repeat bookings.",
    fit: "Mobile workflow",
  },
  {
    title: "Fleet Service",
    description: "B2B service requests, unit tracking, account portals, recurring work, invoice visibility, and operational dashboards.",
    fit: "B2B operations",
  },
  {
    title: "Mobile Mechanics",
    description: "Service request qualification, route-friendly booking, deposits, customer updates, and repair workflow visibility.",
    fit: "Road-based service",
  },
  {
    title: "Dealership Vendors",
    description: "Dealer-facing portals and structured request flows for vendors who need organized intake, approvals, status updates, and invoices.",
    fit: "Repeat accounts",
  },
];

export const offerItems = [
  "Conversion-focused website",
  "Photo quote form",
  "Booking/calendar setup",
  "Deposit/payment integration",
  "Automated email/SMS follow-up",
  "Admin dashboard",
  "Monthly optimization/support",
];

export const problems = [
  { title: "Leads arrive everywhere", copy: "Calls, texts, DMs, photos, and notes create a messy intake process that is hard to track." },
  { title: "Quotes take too long", copy: "Incomplete info forces extra back-and-forth before a customer can move toward booking." },
  { title: "Follow-up gets missed", copy: "Interested customers go quiet when reminders, payment prompts, and confirmations are manual." },
  { title: "The owner becomes the system", copy: "Every job depends on one person remembering every detail, status, and next step." },
];

export const demoMetrics = [
  { label: "New leads", value: "18", delta: "+4 today" },
  { label: "Pending quotes", value: "11", delta: "3 need follow-up" },
  { label: "Booked jobs", value: "27", delta: "This month" },
  { label: "Demo deposits", value: "$4.8k", delta: "Mock preview" },
];

export const automationSteps = [
  { title: "New quote request auto-response", copy: "Confirms the request, explains next steps, and tells the customer photos are being reviewed." },
  { title: "Missed quote follow-up", copy: "Checks in when a quote is opened but no booking happens." },
  { title: "Appointment reminder", copy: "Sends date, time window, prep notes, and location confirmation before service." },
  { title: "Deposit reminder", copy: "Prompts customers to secure the appointment with a demo deposit link." },
  { title: "Review request", copy: "Shows how a post-job message could ask for feedback without inventing public reviews." },
  { title: "Re-engagement follow-up", copy: "Brings old quote requests back into the pipeline with a useful check-in." },
];

export const demoDisclaimer =
  "WheelPro Demo is a fictional demo environment created by WheelPro Systems to showcase possible workflows for wheel repair and mobile service businesses.";
