# WheelPro Systems — website

One-page marketing site for WheelPro Systems. Plan and specs: [PLAN.md](PLAN.md), [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md), [REQUIREMENTS.md](REQUIREMENTS.md).

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Shop demos (outreach)

Each prospect gets a private demo at `/demo/<slug>`, e.g. http://localhost:3000/demo/london-wheel-repair. It is the shop's own website as WheelPro would build it, not a WheelPro sales page. A tour bar moves between three parts:

- **Website** (`/demo/<slug>`): their site, with their name, services, highlights, contact details, a photo-quote starter in the hero, and hook headlines. The search title and description carry "wheel repair in <city>".
- **Customer quote** (`/demo/<slug>/quote`): the photo quote form. A request sent here shows up in their demo admin in the same browser, and is emailed to `CONTACT_TO` (you), never to the shop.
- **Your admin** (`/demo/<slug>/admin`): dashboard, leads, quote builder with their province's tax, invoices, a deposit payment, and automations. Sample data, labelled as such.

The look (cream, one orange accent, General Sans + Instrument Serif + Fragment Mono, the same faces as this site) is the `.demo-theme` block at the end of `app/globals.css`; see `DESIGN.md`. Add or edit shops in `lib/shops.ts` (anything not listed is a 404); sample leads and prices are in `lib/demo-data.ts`. Demos are always `noindex`.

- The first time someone opens a demo in a browser session, you get a "<shop> opened their demo" email so you can call the same day. Open any demo once with `?me=1` so your own visits don't count.
- The deposit button opens a real Stripe Checkout in **test mode** when `STRIPE_SECRET_KEY` is a `sk_test_` key (live keys are refused). Without a key it runs a labelled demo payment.
- Admin screens are URLs (`?view=quote&lead=jordan&sent=1`, `?view=payments&lead=jordan&paid=1`), and `?shot=1` hides the demo bars. The outreach video (`promo-remotion`, `ShopPitch`) screenshots them.

## Configure

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_CAL_LINK`: shows the Cal.com calendar in the booking section instead of the form.
- `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`: emails form submissions to you. Without them, submissions are only logged on the server.
- `STRIPE_SECRET_KEY`: a Stripe **test** key (`sk_test_…`) for the demo deposit checkout. Best added with `vercel integration add stripe` once the project is linked to Vercel.

## Still to replace before launch

- Western Wheelcraft owner quote and real result numbers (`components/case-study.tsx`).
- FAQ answers: launch time, ownership, Stripe, pricing (`components/faq.tsx`).
- Sample prices and the $600 / 10-leads example (`lib/sample-job.ts`, `components/numbers/numbers.tsx`).
