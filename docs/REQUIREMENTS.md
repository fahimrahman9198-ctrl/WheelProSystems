# WheelPro Systems Requirements

## Functional Requirements

- Build a public marketing website for WheelPro Systems.
- Provide pages for Home, Services, Systems, Industries, About, Book, and Contact.
- Use `NEXT_PUBLIC_BOOKING_URL` for the live booking link.
- Use `fahim@wheelprosystems.com` for direct email contact.
- Include a core offer block named "AI Growth System for Mobile Service Businesses."
- Include a visual workflow: Lead -> Quote -> Booking -> Payment -> Follow-Up.
- Include frontend-only mockups for quote, booking, payment, dashboards, B2B portals, and AI lead qualification.
- Provide responsive navigation and footer.
- Avoid fake case studies, fake clients, fake testimonials, fake logos, and any mention of specific client work.

## Non-Functional Requirements

- Use Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Lucide React.
- Keep the code componentized and maintainable.
- Use Server Components by default, with Client Components only where interaction or animation requires them.
- Keep the site fast-loading and production-oriented.
- Avoid unused code and broken links.

## SEO Requirements

Homepage meta title:

`WheelPro Systems | AI Booking & Automation Systems for Mobile Service Businesses`

Homepage meta description:

`WheelPro Systems builds AI-powered websites, quote flows, booking systems, payment integrations, dashboards, and automation tools for mobile service businesses.`

Use natural language that includes:

- AI booking system for service businesses
- mobile service business automation
- wheel repair website system
- rim repair booking system
- mobile detailing automation
- quote form automation
- service business dashboard
- B2B service portal
- payment integration for service business
- follow-up automation for local service businesses

Each page should export descriptive metadata.

## Page Requirements

Home:

- Hero headline: "Turn Your Business Into a System"
- Hero subheadline provided in the project brief.
- Primary CTA: "Book a Free Growth Audit"
- Secondary CTA: "Explore the System"
- Problem section, system flow, services preview, dashboard preview, industries preview, founder-led trust section, final CTA.

Services:

- Clickable service cards for AI Website Rebuild, Smart Quote Forms, Online Booking Systems, Payment & Deposit Integration, Email/SMS Follow-Up Automation, Custom AI Business Tools, B2B Dealer / Fleet Portals, and Admin & User Dashboards.
- Each card includes the problem solved, what is built, business result, and CTA.

Systems:

- Product-demo style sections for quote request, booking, payment/deposit, customer dashboard, admin dashboard, B2B dealer/fleet portal, and AI assistant/lead qualification.

Industries:

- Wheel Refinishing first and strongest.
- Rim Repair, Mobile Detailing, Fleet Service, Mobile Mechanics, and Dealership Vendors.

About:

- Founder-led, honest, direct positioning.
- Explain why systems beat basic websites.
- No fake agency claims.
- Direct CTA.

Book:

- Headline: "Book a Free Growth Audit"
- Include the provided 20-minute audit copy.
- Button: "Schedule My Free Growth Audit"

Contact:

- Use `fahim@wheelprosystems.com`.
- Use `wheelprosystems.com`.
- No personal phone or address.

## Component Requirements

- Navbar
- Footer
- HeroSection
- CTAButton
- SectionHeader
- ServiceCard
- SystemFlow
- DashboardMockup
- IndustryCard
- AnimatedGridBackground
- BookingCTA
- TrustBar
- ProblemCard
- FeaturePill
- PageHeader

## Performance Requirements

- Keep animation transforms GPU-friendly.
- Avoid heavyweight media dependencies.
- Use `next/font` for optimized fonts.
- Use semantic static content where possible.
- Do not block rendering with client-only page shells.

## Accessibility Requirements

- One clear H1 per page.
- Keyboard-accessible navigation.
- Visible focus states.
- Sufficient color contrast.
- Reduced motion support.
- Links and buttons must have descriptive labels.

## Future Backend, Payment, and Booking Notes

- Replace the booking placeholder with a Google Calendar booking URL in `NEXT_PUBLIC_BOOKING_URL`.
- Add a real quote form API route with image uploads.
- Add Stripe deposit/payment integration.
- Add lead dashboard persistence with a database.
- Add email/SMS follow-up triggers.
- Add authentication for dealer/fleet portals.
- Add analytics events for CTA clicks, quote starts, and booking starts.
