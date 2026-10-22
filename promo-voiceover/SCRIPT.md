# WheelPro Systems — 30s sales spot (voiceover script)

**Goal:** get wheel-refinishing shop owners to book a meeting.
**Structure (ad-creative-video / launch-video):** hook → pain → reveal on the music drop → four benefits, one per bar → proof → CTA. The CTA is message-matched to the hook (slow replies lose jobs → less time on the phone, book a meeting).
**Music:** 120 BPM, bars start at 1.0s, drop at **9.0s**. Music dips under every voice line (volume keyframes in `src/spot/WheelProSpot.tsx`).
**Voice:** macOS "Daniel" (confident male, UK English), generated locally with `say`. 68 words.
**Render:** `promo-remotion` → composition `WheelProSpot` → `out/wheelpro-spot-vo-16x9.mp4`.

| # | Time | Beat | Voiceover (as recorded) | On screen |
|---|---|---|---|---|
| 1 | 0.3–3.5s | Hook | "Every slow reply… is a wheel job you just lost." | Curb-rash close-up, "New quote request · 2:14 PM" with an unanswered timer. Captions land on each half of the line. |
| 2 | 3.7–8.6s | Pain | "You're in the bay, hands full, while leads pile up in texts, DMs and voicemail." | Captions "You're in the bay. / Hands full." → "Leads pile up." → "Texts. DMs. Voicemail." on the words. Missed calls, DMs and sticky notes land on the beat. |
| — | **9.0s** | **Drop** | *(music hit)* | Wheel snaps in (1.18 → 1), the fender arch seats over it, blue glow |
| 3 | 9.4–11.0s | Reveal | "Meet WheelPro Systems." | Wordmark wipes in |
| 4a | 11.1s | Benefit | "Every lead, in one inbox." | 01 Leads screen, cursor on Jordan's lead |
| 4b | 13.1s | Benefit | "Quotes out in minutes." | 02 Quote screen, cursor on Send quote |
| 4c | 15.1s | Benefit | "Follow-ups that send themselves." | 03 Email automations, follow-up switch |
| 4d | 17.1s | Benefit | "Deposits paid online." | 04 Invoice, Pay online → "Payment received · $879.00" |
| 5 | 19.3–21.3s | Proof | "Built only for wheel refinishers." | "Five tools. One system." All five screens deal into a fan. |
| — | **23.0s** | Resolve | *(music resolves)* | End card: logo draws itself |
| 6a | 23.4–26.1s | Tagline | "Less time on the phone. More wheels in the bay." | Each tagline line appears on its words |
| 6b | 26.4–29.4s | CTA | "Book a meeting, at wheelprosystems.com." | Book a meeting → button, then the URL |

No invented numbers or testimonials: every claim is a product feature the site already describes. The $879.00 is the demo invoice shown in the UI.

**To re-record the voice:** edit the lines in `promo-remotion/scripts/make-vo.sh`, run it, and check each new duration still fits its slot above.
