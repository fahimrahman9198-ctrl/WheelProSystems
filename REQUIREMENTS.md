# WheelPro Systems — Website Requirements

Version 1.0 · 2026-10-03 · Status: **Draft for approval (nothing built yet)**

---

## 1. Goal

A single-page marketing site that wins wheel refinishing business owners as clients.
In under 30 seconds a visitor should understand:

1. **What it is:** a one-stop system built only for wheel refinishing businesses.
2. **What it does:** captures leads, quotes, follows up, invoices and collects payment.
3. **Why it matters:** more of the leads they already get turn into paid jobs.
4. **Proof:** it's already running at Western Wheelcraft.
5. **Next step:** book a meeting.

## 2. Audience

| Segment | Situation | What they care about |
|---|---|---|
| Shop owners (1–5 techs) | Quote from texts, juggle calendar, chase e-transfers | Less phone time, fewer lost jobs |
| Mobile wheel repair operators | Work from a van, route by area, no front desk | Booking by area, deposits, reminders |

**Shared traits:** hands-on tradespeople who open links on their phone and dislike jargon and sales calls. They judge a site by whether it looks like it was made for *their* trade.

## 3. Positioning

- **Headline promise:** One-stop solution for wheel refinishing businesses.
- **Niche:** wheel refinishing only. No other industries anywhere on the page.
- **Tone:** short, plain and confident. Use the trade's words: quote, deposit, no-show, curb rash, drop-off, mobile.
- **Banned words:** streamline, leverage, synergy, solutions (as a noun), handoff, workflow, operational, AI-powered (unless it's a shipped feature).

## 4. Services offered (must appear on the page)

| # | Service | One-line promise |
|---|---|---|
| 1 | Lead collection | Every enquiry from site, Google, Instagram and Facebook lands in one inbox. |
| 2 | Quotation system | Customers send photos, wheel size, damage and finish, so every request is ready to price. |
| 3 | Email automation | Instant replies, quote follow-ups, reminders and review requests, sent for you. |
| 4 | Invoicing | Turn an approved quote into an invoice in one tap. No retyping. |
| 5 | Payment integration | Deposits and balances paid by card, tracked on the job. |

> **Tab order decision:** the tabs follow a job's life (Lead → Quote → Email → Invoice → Payment), so clicking through tells one story. If you want Quotation first, swap it with Lead collection. Nothing else changes.

## 5. Page sections (in order)

1. Navigation bar
2. Hero: "One-stop solution for wheel refinishing businesses" plus a drifting strip of system cards
3. Service bar: five clickable pills, with a visual module that changes on click
4. Numbers story: a dark section that shows the big picture with simple numbers and an animated chart
5. Case study: Western Wheelcraft
6. FAQ (4–5 questions; optional but recommended)
7. Book a meeting
8. Footer

## 6. Functional requirements

| ID | Requirement | Priority |
|---|---|---|
| F1 | Service pills switch the visual module on click, tap and keyboard (arrow keys). | Must |
| F2 | The service module auto-plays through the tabs when idle; it stops for good once the user clicks a pill. | Must |
| F3 | Each service visual is an animated loop of 5–8 seconds showing that service working on the same sample job. | Must |
| F4 | Numbers count up when they scroll into view, and the chart bars grow. | Must |
| F5 | The booking section embeds a calendar (Cal.com or Calendly) with a fallback form. | Must |
| F6 | The fallback form sends to email (Resend) and validates name and email inline. | Must |
| F7 | The `?shop=Name` URL parameter puts the prospect's shop name into the hero subline and the quote-form visual. | Should |
| F8 | Analytics events: hero CTA click, pill clicks, case study view, booking started and completed. | Should |
| F9 | The case study "View site" link opens westernwheelcraft.ca in a new tab. | Must |
| F10 | All sample data (names, prices) is labelled "Sample." | Must |

## 7. Non-functional requirements

| Area | Target |
|---|---|
| Performance | LCP < 2.0s on 4G, CLS < 0.05, JS < 150 KB gzipped, Lighthouse ≥ 95 |
| Accessibility | WCAG 2.2 AA contrast, full keyboard use, visible focus, `prefers-reduced-motion` respected |
| Responsive | 360px to 1920px; mobile-first; no horizontal scroll |
| SEO | Title and meta, Open Graph image, `Organization` + `Service` JSON-LD, semantic headings |
| Browser support | Last 2 versions of Chrome, Safari (iOS too), Edge and Firefox |
| Hosting | Vercel, with a custom domain and HTTPS |

## 8. Tech stack (recommended)

- **Next.js (App Router) + TypeScript**: a single static route, deployed on Vercel.
- **Tailwind CSS v4**, with tokens from DESIGN-SYSTEM.md.
- **Motion** (`motion/react`) for reveals, tab transitions and count-ups.
- **Lenis** for smooth scrolling, to match the reference's gliding feel. Disabled under reduced motion.
- **Switzer / Geist Mono** fonts, self-hosted via `next/font`.
- **Cal.com embed** for booking, and **Resend** for the fallback form email.
- **Vercel Analytics** for events.

## 9. Content needed from you (blocking items in bold)

| Item | Used in | Status |
|---|---|---|
| **Western Wheelcraft owner quote (1–2 sentences) + permission** | Case study | Needed |
| **1–3 real result numbers** (e.g. reply time, quotes per month, deposits) | Case study badge | Needed |
| **Booking link (Cal.com or Calendly)** | Book a meeting | Needed |
| **Email address that receives form submissions** | Form | Needed |
| Logo / wordmark for WheelPro (or approve a text wordmark) | Nav, footer | Optional |
| Average job value to use in the numbers story (or approve $600 sample) | Numbers story | Optional |
| "Starting from" price (or keep no pricing) | FAQ | Optional |
| Domain | Deploy | Needed before launch |

## 10. Acceptance criteria

- [ ] A first-time visitor can say what WheelPro does after viewing only the hero.
- [ ] All five services are reachable from the service bar, and each shows a different visual.
- [ ] The numbers story reads in under 20 seconds and ends with the result.
- [ ] Western Wheelcraft appears with a real screenshot and at least one real fact.
- [ ] Booking works end to end on a phone.
- [ ] No invented statistics, testimonials or client names.
- [ ] The page passes the performance and accessibility targets in section 7.
- [ ] Reduced-motion mode shows every piece of content with no animation.

## 11. Out of scope (v1)

- Building the actual WheelPro software product (the page shows mockups).
- Blog, multi-page site, CMS.
- Other industries.
- Live AI features.
