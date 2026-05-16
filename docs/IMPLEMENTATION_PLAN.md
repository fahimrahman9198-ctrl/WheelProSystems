# WheelPro Systems Implementation Plan

## Step-by-Step Build Plan

1. Create foundation documentation.
2. Replace global brand metadata, typography, and color tokens.
3. Build shared site data for services, industries, workflows, and navigation.
4. Build reusable components.
5. Replace the public layout navigation and footer.
6. Build the Home page.
7. Build Services, Systems, Industries, About, Book, and Contact pages.
8. Redirect legacy public routes to relevant new pages.
9. Run lint/build verification.
10. Start the local dev server and visually inspect the site.

## Component List

- `Navbar`
- `Footer`
- `HeroSection`
- `CTAButton`
- `SectionHeader`
- `ServiceCard`
- `SystemFlow`
- `DashboardMockup`
- `IndustryCard`
- `AnimatedGridBackground`
- `BookingCTA`
- `TrustBar`
- `ProblemCard`
- `FeaturePill`
- `PageHeader`

## Page List

- `/`
- `/services`
- `/systems`
- `/industries`
- `/about`
- `/book`
- `/contact`

Legacy public routes to redirect:

- `/booking` -> `/book`
- `/quote` -> `/services`
- `/regions` -> `/industries`
- `/dealerships` -> `/systems`

## Order of Implementation

1. Documentation.
2. Site constants and utility content.
3. Global CSS and Tailwind tokens.
4. Navigation and footer.
5. Core components.
6. Home page.
7. Interior pages.
8. Redirects and metadata.
9. Verification.

## Acceptance Criteria

- Foundation docs exist in `/docs`.
- Website publicly presents only WheelPro Systems branding.
- Home page communicates "Turn Your Business Into a System."
- Core offer and booking CTA are present.
- All required pages are built and responsive.
- No fake testimonials, fake logos, fake case studies, or specific client mentions are added.
- Booking link reads from `NEXT_PUBLIC_BOOKING_URL`.
- Metadata exists for all new pages.
- Lint and production build pass.
- No horizontal overflow in normal responsive viewports.
