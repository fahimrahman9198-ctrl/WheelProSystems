# WheelPro Systems — website

One-page marketing site for WheelPro Systems. Plan and specs: [PLAN.md](PLAN.md), [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md), [REQUIREMENTS.md](REQUIREMENTS.md).

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Shop quote pages (outreach)

Each prospect gets a photo-quote page at `/q/<slug>`, e.g. http://localhost:3000/q/london-wheel-repair. Add or edit shops in `lib/shops.ts`; anything not listed there is a 404. Pages are always `noindex`.

- `status: "preview"`: shows a "Preview built for…" bar, and quote requests go to `CONTACT_TO` (you). The first time someone opens the page in a browser session, you get a "<shop> opened their quote page" email so you can call the same day. Open any page once with `?me=1` so your own visits don't count.
- `status: "live"`: the shop said yes. Requests go to the shop's `email`, with you on BCC. Photos (up to 4, shrunk in the browser) arrive as attachments.

## Configure

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_CAL_LINK`: shows the Cal.com calendar in the booking section instead of the form.
- `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`: emails form submissions to you. Without them, submissions are only logged on the server.

## Still to replace before launch

- Western Wheelcraft owner quote and real result numbers (`components/case-study.tsx`).
- FAQ answers: launch time, ownership, Stripe, pricing (`components/faq.tsx`).
- Sample prices and the $600 / 10-leads example (`lib/sample-job.ts`, `components/numbers/numbers.tsx`).
