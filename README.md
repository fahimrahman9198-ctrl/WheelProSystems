# WheelPro Systems — website

One-page marketing site for WheelPro Systems. Plan and specs: [PLAN.md](PLAN.md), [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md), [REQUIREMENTS.md](REQUIREMENTS.md).

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000. Add `?shop=Ace%20Wheels` to the URL to see the personalised outreach version.

## Configure

Copy `.env.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_CAL_LINK`: shows the Cal.com calendar in the booking section instead of the form.
- `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`: emails form submissions to you. Without them, submissions are only logged on the server.

## Still to replace before launch

- Western Wheelcraft owner quote and real result numbers (`components/case-study.tsx`).
- FAQ answers: launch time, ownership, Stripe, pricing (`components/faq.tsx`).
- Sample prices and the $600 / 10-leads example (`lib/sample-job.ts`, `components/numbers/numbers.tsx`).
