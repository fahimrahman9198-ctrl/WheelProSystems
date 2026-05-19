export const siteConfig = {
  name: "WheelPro Systems",
  demoName: "WheelPro Demo",
  agencyName: "WheelPro Systems",
  domain: "wheelprosystems.com",
  url: "https://wheelprosystems.com",
  founder: "Fahim Rahman",
  email: "info@wheelprosystems.com",
  motto: "Turn Your Business Into a System",
  demoMotto: "Turn a Wheel Service Business Into a System",
  bookingUrl: "https://calendar.app.google/94ijJXv2UUuFyzRp8",
  bookingPlaceholder: "PASTE_GOOGLE_CALENDAR_BOOKING_LINK_HERE",
};

export const sitemapRoutes = [
  "",
  "/services",
  "/systems",
  "/industries",
  "/about",
  "/contact",
  "/book",
  "/wheel-repair-booking-system",
  "/rim-repair-website-design",
  "/wheel-refinishing-automation",
  "/mobile-wheel-repair-quote-form",
  "/dealer-wheel-repair-portal",
] as const;

export function getBookingUrl() {
  return process.env.NEXT_PUBLIC_BOOKING_URL || siteConfig.bookingUrl;
}

export function isPlaceholderBookingUrl(url: string) {
  return url === siteConfig.bookingPlaceholder;
}

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Systems", href: "/systems" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const systemFlow = ["Photo lead", "AI quote assist", "Booking", "Deposit", "Dashboard", "Follow-up"] as const;

export const wheelWorkflow = [
  "Lead Capture",
  "AI Quote Assist",
  "Booking",
  "Deposit",
  "Job Dashboard",
  "Follow-Up",
] as const;

export const wheelFaqs = [
  {
    question: "What does WheelPro Systems build for wheel repair businesses?",
    answer:
      "WheelPro Systems builds AI-powered websites, photo quote forms, booking flows, deposit collection, dashboards, dealer portals, and follow-up automation for wheel repair and refinishing shops.",
  },
  {
    question: "Is this just a website?",
    answer:
      "No. The website is only the front door. The real value is the connected lead-to-booking system behind it: intake, quote context, scheduling, payments, dashboards, and follow-up.",
  },
  {
    question: "Can customers upload wheel damage photos?",
    answer:
      "Yes. The system is designed around photo-based quote requests so customers can send wheel damage photos, vehicle details, service area, and timing before you reply.",
  },
  {
    question: "Can the system collect deposits?",
    answer:
      "Yes. WheelPro can include Stripe-powered deposit or payment flows so qualified customers can secure a booking online.",
  },
  {
    question: "Can this work for mobile wheel repair businesses?",
    answer:
      "Yes. Mobile operators can use location-aware quote intake, booking windows, service-area logic, reminders, and customer status updates.",
  },
  {
    question: "Can this support dealership or fleet clients?",
    answer:
      "Yes. Dealer and fleet workflows can include a B2B portal for repeat job submissions, unit tracking, priorities, status updates, and invoice visibility.",
  },
  {
    question: "Do you build custom dashboards?",
    answer:
      "Yes. Dashboards can track leads, photos, quote status, booking status, deposits, customer history, dealer accounts, and follow-up tasks.",
  },
  {
    question: "How is this different from a normal web design agency?",
    answer:
      "A normal agency sells pages. WheelPro Systems builds operational workflows for wheel shops that need faster quote response, cleaner booking, payment collection, and less manual chasing.",
  },
] as const;

export const services = [
  {
    title: "Conversion Website",
    description: "A premium site designed to turn visitors into quote requests and booked jobs.",
    problem: "A basic website explains services but does not move a wheel repair customer into action.",
    build: "Service pages, proof-driven copy, location-aware CTAs, and quote-first conversion paths.",
    result: "More visitors know what to do next: submit photos, request a quote, or book an audit.",
  },
  {
    title: "Photo Quote Intake",
    description: "Customers upload wheel damage photos, vehicle details, location, and service needs.",
    problem: "Photos arrive through text, Instagram, Facebook, email, and missed calls.",
    build: "Guided forms for damage photos, wheel type, finish, service area, urgency, and contact details.",
    result: "Cleaner quote context before the owner has to respond.",
  },
  {
    title: "Booking & Deposit Flow",
    description: "Reduce back-and-forth by letting qualified customers book and pay deposits online.",
    problem: "Interested leads stall when scheduling and deposit collection happen manually.",
    build: "Calendar routing, appointment windows, deposit prompts, and confirmation messages.",
    result: "More approved jobs become scheduled work.",
  },
  {
    title: "AI-Assisted Quote Workflow",
    description: "Organize customer photos and intake details so the owner can respond faster.",
    problem: "Manual quoting slows down when every lead needs the same clarifying questions.",
    build: "AI-assisted summaries, missing-info flags, response drafts, and lead priority signals.",
    result: "Faster quote review without pretending AI replaces expert judgment.",
  },
  {
    title: "Admin Dashboard",
    description: "Track leads, jobs, customer info, quote status, deposits, and follow-ups.",
    problem: "Owners lose visibility when jobs live across texts, notes, spreadsheets, and payment apps.",
    build: "Lead queues, job stages, customer records, quote status, payment status, and follow-up tasks.",
    result: "A command center for the work that turns inquiries into revenue.",
  },
  {
    title: "Dealer/Fleet Portal",
    description: "Give recurring dealership or fleet clients a cleaner way to submit jobs.",
    problem: "Dealer and fleet work gets messy when every batch arrives as a different text thread.",
    build: "Account portals, multi-vehicle intake, priority status, job history, and invoice visibility.",
    result: "A more professional workflow for repeat B2B accounts.",
  },
  {
    title: "Follow-Up Automation",
    description: "Automate reminders, quote follow-ups, booking nudges, and review requests.",
    problem: "Warm leads disappear when follow-up depends on memory.",
    build: "Email/SMS quote follow-ups, booking nudges, appointment reminders, and review requests.",
    result: "Fewer leads leak after the first reply.",
  },
];

export const industries = [
  {
    title: "Wheel Repair & Refinishing Shops",
    description:
      "The primary specialization: photo-based quotes, mobile service areas, dealer jobs, refinishing requests, booking, deposits, dashboards, and follow-up.",
    fit: "Primary niche",
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

export const seoLandingPages = {
  "wheel-repair-booking-system": {
    title: "Wheel Repair Booking System",
    metaTitle: "Wheel Repair Booking System for Quote-to-Job Workflows | WheelPro Systems",
    metaDescription:
      "A wheel repair booking system that connects photo quote requests, scheduling, deposits, dashboards, and follow-up for wheel repair shops.",
    h1: "Wheel Repair Booking System Built Around Photo Quotes",
    intro:
      "Wheel repair shops do not need another generic booking widget. They need a workflow that starts with wheel damage photos, captures the right job details, routes qualified customers into booking, and keeps every lead visible until the job is done.",
    problem:
      "Most wheel repair leads arrive in fragments: a curb rash photo through text, a bent wheel question in Instagram DMs, a dealer request over email, and a voicemail from someone who wants mobile service today. Without a connected system, the owner becomes the CRM, dispatcher, quote tracker, and follow-up engine.",
    solution:
      "WheelPro Systems turns that messy lead flow into a quote-to-booking operating system. Customers submit photos and context, the system organizes the request, booking options are presented when the job is qualified, deposits can be collected, and every job moves into a dashboard.",
    features: [
      "Photo quote request form for wheel damage",
      "Service area, vehicle, finish, and urgency fields",
      "Booking and calendar routing",
      "Stripe deposit or payment setup",
      "Lead and job dashboard",
      "Email/SMS reminders and quote follow-up",
    ],
    workflow: [
      "Customer uploads wheel photos",
      "System captures service and location details",
      "Owner reviews an organized intake summary",
      "Customer books a service window",
      "Deposit confirms intent",
      "Job appears in the dashboard",
    ],
    faqs: [
      ["Can this replace my current contact form?", "Yes. The goal is to replace a weak contact form with a structured wheel repair quote and booking flow."],
      ["Can it work for mobile wheel repair?", "Yes. The system can include service area, address, access notes, and booking-window logic."],
      ["Do customers have to pay online?", "No. Deposits are optional, but adding them can reduce no-shows and improve booking quality."],
    ],
  },
  "rim-repair-website-design": {
    title: "Rim Repair Website Design",
    metaTitle: "Rim Repair Website Design That Converts Photo Quotes | WheelPro Systems",
    metaDescription:
      "Premium rim repair website design with photo quote forms, booking CTAs, deposit flows, and SEO foundations for alloy wheel repair shops.",
    h1: "Rim Repair Website Design That Turns Visitors Into Quote Requests",
    intro:
      "A rim repair website should do more than look modern. It should help customers understand the service, submit wheel damage photos, choose the right next step, and move toward a booked job without forcing every lead into a phone call.",
    problem:
      "Many rim repair websites are static brochures. They show services, maybe a gallery, and then drop the customer into a basic form. The customer still has to call, text photos, wait for a response, and remember to follow up.",
    solution:
      "WheelPro Systems designs rim repair websites as the front end of a business system. The page structure, copy, quote form, booking CTA, payment prompt, and dashboard flow are designed together so the website becomes a revenue workflow instead of a digital flyer.",
    features: [
      "Conversion-focused rim repair service pages",
      "Photo quote form with damage and wheel details",
      "Mobile-first design for customers on phones",
      "SEO structure for alloy wheel repair searches",
      "Internal links to services and booking",
      "Clear CTAs for quote requests and audits",
    ],
    workflow: [
      "Visitor lands on a clear rim repair page",
      "They see repair options and trust-building copy",
      "They upload photos and job details",
      "The request enters the owner dashboard",
      "Follow-up and booking prompts keep the lead moving",
    ],
    faqs: [
      ["Is this normal web design?", "No. The site is designed around quote conversion and job workflow, not just page aesthetics."],
      ["Can the site target local rim repair searches?", "Yes. The structure can support local landing pages and helpful service content without keyword stuffing."],
      ["Can I keep my existing brand?", "Yes. WheelPro can work with an existing logo, colors, and service positioning."],
    ],
  },
  "wheel-refinishing-automation": {
    title: "Wheel Refinishing Automation",
    metaTitle: "Wheel Refinishing Automation for Quotes, Booking & Follow-Up",
    metaDescription:
      "Automate wheel refinishing quote intake, customer follow-up, booking prompts, deposits, and job dashboard workflows with WheelPro Systems.",
    h1: "Wheel Refinishing Automation for Busy Shops",
    intro:
      "Wheel refinishing jobs often need more context than a quick curb rash repair. Finish type, wheel count, color preference, timing, customer expectations, and approval steps all matter. Automation helps organize those details without making the experience feel robotic.",
    problem:
      "Refinishing leads slow down when the owner has to ask the same questions repeatedly. Customers send partial information, forget photos, disappear after receiving a price range, or never make it to the booking step.",
    solution:
      "WheelPro Systems builds automated workflows that collect refinishing context up front, summarize the request, trigger follow-up, and keep approved jobs moving into booking, deposit collection, and dashboard tracking.",
    features: [
      "Refinishing-specific quote intake",
      "Wheel count, finish type, and color preference fields",
      "AI-assisted intake summaries",
      "Follow-up automation for pending quotes",
      "Deposit and approval flow options",
      "Admin dashboard for lead and job status",
    ],
    workflow: [
      "Customer submits refinishing request",
      "System captures photos and finish details",
      "Owner reviews a clean summary",
      "Customer receives next-step prompts",
      "Approved job moves to booking/deposit",
      "Follow-up and review request run automatically",
    ],
    faqs: [
      ["Can automation handle custom color jobs?", "It can collect the right context and route the request, while final pricing and approval stay with the owner."],
      ["Will messages sound generic?", "No. Follow-up can be written in your shop’s voice and tied to the customer’s request."],
      ["Can this support multi-wheel jobs?", "Yes. Intake can capture wheel count, finish, vehicle, and job notes."],
    ],
  },
  "mobile-wheel-repair-quote-form": {
    title: "Mobile Wheel Repair Quote Form",
    metaTitle: "Mobile Wheel Repair Quote Form with Booking & Service Area Logic",
    metaDescription:
      "A mobile wheel repair quote form that captures damage photos, location, vehicle details, booking intent, and follow-up automation.",
    h1: "Mobile Wheel Repair Quote Form for Faster Lead Response",
    intro:
      "Mobile wheel repair customers are usually on their phones. They want to send a photo, ask if you service their area, and know what happens next. A strong quote form removes friction from that first step.",
    problem:
      "Mobile operators lose time when every inquiry needs a manual location check, damage clarification, appointment conversation, and follow-up. Leads scattered across calls and DMs are easy to miss.",
    solution:
      "WheelPro Systems builds mobile-first quote forms that capture wheel photos, address or service area, vehicle details, access notes, urgency, and booking intent. The request can then flow into an intake summary, dashboard, follow-up sequence, and booking path.",
    features: [
      "Mobile-first photo upload experience",
      "Service area and address capture",
      "Vehicle, wheel, and damage details",
      "Urgency and preferred timing fields",
      "Admin dashboard routing",
      "Follow-up messages for incomplete or pending requests",
    ],
    workflow: [
      "Customer opens the form on mobile",
      "They upload damage photos",
      "System captures location and vehicle details",
      "Owner receives structured quote context",
      "Customer gets routed toward booking",
      "Reminder and follow-up automation keep the lead warm",
    ],
    faqs: [
      ["Can the form work on phones?", "Yes. Mobile-first usability is central because many customers submit photos from their phone."],
      ["Can it filter by service area?", "Yes. The form can capture location and support service-area routing."],
      ["Can I use this with Instagram traffic?", "Yes. You can route social traffic to a focused quote page instead of managing everything in DMs."],
    ],
  },
  "dealer-wheel-repair-portal": {
    title: "Dealer Wheel Repair Portal",
    metaTitle: "Dealer Wheel Repair Portal for Fleet & Dealership Job Intake",
    metaDescription:
      "A dealer wheel repair portal for recurring dealership and fleet clients with job intake, unit tracking, status updates, and invoice visibility.",
    h1: "Dealer Wheel Repair Portal for Recurring Accounts",
    intro:
      "Dealer and fleet work can be valuable, but it gets messy fast when every request is a text thread, spreadsheet row, or loose email. A portal gives repeat clients a cleaner way to submit and track wheel repair jobs.",
    problem:
      "Dealership vendors often handle batch requests, multiple vehicles, priority jobs, approvals, invoices, and follow-up manually. That creates delays and makes the wheel repair business look less organized than the service actually is.",
    solution:
      "WheelPro Systems can build a dealer and fleet portal where repeat accounts submit jobs, attach photos, identify vehicles or units, mark urgency, and view status or invoice information. Internally, the same requests feed the admin dashboard.",
    features: [
      "Dealer account job submission",
      "Multiple vehicle or unit intake",
      "Photo upload and priority status",
      "Job status tracking",
      "Invoice visibility",
      "Admin dashboard integration",
    ],
    workflow: [
      "Dealer submits batch request",
      "Photos and vehicle/unit details are captured",
      "Request appears in the job dashboard",
      "Owner prioritizes and updates status",
      "Dealer can view progress or invoice context",
      "Follow-up keeps repeat work organized",
    ],
    faqs: [
      ["Is this only for dealerships?", "No. The same portal model can support fleet accounts, vendors, or recurring commercial clients."],
      ["Can clients submit multiple vehicles?", "Yes. Intake can be structured around batch jobs and unit tracking."],
      ["Can invoices be included?", "Yes. Invoice visibility can be part of the portal or dashboard workflow."],
    ],
  },
} as const;

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
  { label: "Deposits", value: "$4.8k", delta: "Preview" },
];

export const automationSteps = [
  { title: "New quote request auto-response", copy: "Confirms the request, explains next steps, and tells the customer photos are being reviewed." },
  { title: "Missed quote follow-up", copy: "Checks in when a quote is opened but no booking happens." },
  { title: "Appointment reminder", copy: "Sends date, time window, prep notes, and location confirmation before service." },
  { title: "Deposit reminder", copy: "Prompts customers to secure the appointment with a deposit link." },
  { title: "Review request", copy: "Shows how a post-job message could ask for feedback without inventing public reviews." },
  { title: "Re-engagement follow-up", copy: "Brings old quote requests back into the pipeline with a useful check-in." },
];

export const demoDisclaimer =
  "WheelPro Demo is a fictional demo environment created by WheelPro Systems to showcase possible workflows for wheel repair and mobile service businesses.";
