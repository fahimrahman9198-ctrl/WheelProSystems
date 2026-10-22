# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Wheel refinishing shop owners in Canada** (1–5 techs, plus solo mobile operators). Hands-on tradespeople who quote from texts and photos, juggle the phone while working in the bay, and chase e-transfers. They open links on their phone, dislike jargon and sales calls, and judge a page by whether it looks made for *their* trade.
- **Their customers** (drivers with curb rash, scratches, bent or cracked wheels) are the people who use the shop's website and quote page day to day. On the demo, the owner judges those parts by imagining their customers using them.

## Product Purpose

WheelPro Systems sells the whole system a wheel refinishing shop runs on: a polished website, a photo quote system, an admin panel where every request, quote, booking and payment lives, email/text automations, invoicing, and deposits and payments by card through Stripe. Built only for wheel refinishing; set up for the shop, not by it.

Success: more of the enquiries a shop already gets turn into paid, booked jobs, with less time on the phone.

## Positioning

Wheel-specific end to end (damage, wheel size, finish, number of wheels, deposits, dealer work) and done-for-you, against generic site builders plus generic job software. It is already running at a real wheel shop (Western Wheelcraft, BC).

## Operating Context

- Outreach: each prospect gets a private, personalised demo at `/demo/<shop>` built in their name before any sales conversation, plus a 30-second personalised video (`promo-remotion`, `ShopPitch`) that screenshots the demo. Pricing is discussed on a call; there is no free trial. A results guarantee is offered instead (terms set by the owner of WheelPro).
- The demo is shown to the shop owner, mostly on a phone. It is their own website (the front page of the demo), the customer quote page and the admin: what their customers and they would use. It is not a WheelPro sales page.
- Shop facts come from public sources only (`lib/shops.ts`); sample leads, prices and payments come from `lib/demo-data.ts`.

## Capabilities and Constraints

- Demo parts: the shop's website (`/demo/<shop>`, the front page), customer photo quote (`/quote`), admin (`/admin`: dashboard, leads, quote builder with provincial tax and a 25% deposit, invoices and deposit payment, automations).
- Website headlines are curiosity hooks ("Don't buy new wheels yet."); the search keywords ("wheel repair" + city) live in the page title and description (user direction, 2026-10-22).
- Deposit payment: a real Stripe Checkout in test mode when a `sk_test_` key is set; otherwise a labelled demo payment. Live keys are refused.
- Demo requests are emailed to WheelPro (CONTACT_TO), never to the shop. Demos are `noindex`.
- Admin screens are URL-addressable (`?view=…&lead=…&sent=1&paid=1`); `?shot=1` hides the demo bars for video screenshots.

## Brand Commitments

- WheelPro wordmark and Fitment mark (`components/ui/logo.tsx`).
- Plain trade language: quote, deposit, no-show, curb rash, drop-off, mobile. Banned: streamline, leverage, synergy, solutions (as a noun), handoff, workflow, operational, "AI-powered".
- Each shop's demo carries that shop's name, city, services and public facts; it must not imitate the shop's real website or be mistaken for it by the public.
- Western Wheelcraft's photos and branding are **not** used in demos (user decision, 2026-10-22). Its ideas (admin sections, automations list, GST/PST invoices) may be.

## Evidence on Hand

- Shop facts: `lib/shops.ts` (from `client-leads/canada-wheel-leads.csv`).
- WheelPro-owned photos: `public/photos/rash-lip.jpg`, `rash-chips.jpg`, `rash-dark.jpg` (customer-style damage photos), `model-y.jpg`, `wheel.png`.
- Product screens: `public/screens/*.svg`.
- Western Wheelcraft case study exists, but its result numbers and owner quote are not yet available. Do not invent testimonials, results, prices, customer counts or review scores.

## Product Principles

1. Show the finished thing, in their name, before asking for anything.
2. Prove with the working product, not claims; sample data is labelled as sample.
3. Speak the trade's language, plainly.
4. Phone first: the owner opens it between jobs.
5. Never misrepresent: no fake reviews, no fake results, nothing that looks like the shop's real site to the public.
