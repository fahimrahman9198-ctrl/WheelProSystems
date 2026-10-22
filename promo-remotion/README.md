# WheelPro Systems — "One wheel job" (30s)

Built only with the official Remotion agent skills (github.com/remotion-dev/skills): `remotion-create`,
`remotion-markup`, `remotion-interactivity`, `remotion-studio`, `remotion-render`.

```bash
npm i
npm run dev                                   # Remotion Studio — every scene/text/keyframe is editable
npx remotion render WheelProJob out/wheelpro-job-16x9.mp4
```

| Time | Scene | |
|---|---|---|
| 0–3.5s | Opening | Curb-rash photo (grayscale + brightness + vignette effects), "One wheel job." |
| 2.9–6.8s | Lead · 08:14 | Real Leads screen, cursor clicks Jordan's lead → "Auto-reply sent" |
| 6.3–10.2s | Quote · 08:20 | Cursor clicks Send quote → "Quote sent to Jordan · $1,029" |
| 9.7–13.6s | Follow-up · Day 1 | Toggle switch → "Reminder scheduled · day 1 & 3" |
| 13.1–17.6s | Paid · Apr 24 | Pay $879.00 online → green "Payment received" + chime |
| 17.1–22.6s | Recap | Dark block, timeline draws Lead → Quote → Follow-up → Invoice → Paid |
| 22.6–30s | End card | Blue light leak, Fitment mark draws itself, tagline, Book a meeting |

- Scenes are connected compositions (Studio sidebar → Scenes) built with `Interactive.withSchema`.
  Edit copy, click targets, zoom and toast text in the Props panel or in `src/WheelProJob.tsx`.
- Sound is Remotion's SFX library only (whoosh, mouse-click, switch, ding, page-turn); there's no music bed.
- Render uses `swangle` GL (see remotion.config.ts) — `angle` hangs headless Chrome on this Mac.

---

# "Every slow reply" — 30s sales spot with voiceover (`WheelProSpot`)

Uses all three skill sets: **ad-video-skills** (launch-video arc, ad hook → message-matched CTA),
**motion-design** (timing, easing, choreography) and the **Remotion skills** (interactive markup, `<Audio>`, voiceover).

- Script with timings: `../promo-voiceover/SCRIPT.md`
- Music: `node scripts/make-spot-track.mjs` → `public/music/spot-track.wav` (120 BPM, drop at 9.0s)
- Voice: `scripts/make-vo.sh` → `public/vo/*.wav` (macOS Daniel; `VOICE="..." scripts/make-vo.sh` to swap)
- Render: `npx remotion render WheelProSpot out/wheelpro-spot-vo-16x9.mp4`
- Music volume under the voice is an inline keyframe curve on the Music `<Audio>`; editable in Studio.

---

# Per-shop outreach video (`ShopPitch`)

30s, one per prospect, cut to the spot's music (drop at 9.0s). It walks through the whole system WheelPro would build them, ending on a link to their demo. No free offer, no voiceover: captions carry it, since most people watch muted.
Props: `shopName`, `city`, `screenshot` (their current site: a path in `public/` or a URL), `pageUrl` (their demo), `demoShots` (prefix of the four demo screenshots).

| Time | Scene | |
|---|---|---|
| 0–9s | `PitchSite` | "Made for <shop>" over a screenshot of their own site, then a customer's 9:40 PM "How much to fix?" while the shop is closed |
| 9–12s | `PitchNewSite` | On the drop: "Here's what I'd build <shop>." Their demo website scrolling in a browser |
| 12–17s | `PitchPhone` | Their quote page on a phone: photos, damage, sent |
| 17–23s | `PitchAdmin` | Their admin, one screen per bar: the request lands · quote out with follow-ups scheduled · deposit paid through Stripe |
| 23–30s | `PitchEnd` | Their demo URL, "Built for <shop>.", "Book a 20-minute walkthrough", WheelPro wordmark |

Render every shop in `../lib/shops.ts` (same list as the /demo pages). Start the site first (`npm run dev` in the repo root), because the demo screens are screenshotted from it:

```bash
node scripts/render-pitches.mjs                      # all shops → out/pitch/<slug>.mp4
node scripts/render-pitches.mjs --only pj-wheels     # one or a comma-separated few
node scripts/render-pitches.mjs --reshoot            # also retake their current-site screenshots
```

Screenshots land in `public/pitch/`: `<slug>.png` (their current site, kept between runs) and `<slug>-site/-leads/-quote/-paid.png` (their demo, retaken every run).
Look at every current-site screenshot before sending: a cookie banner or error page makes a bad opening. Swap the PNG by hand and rerun.
`PAGE_BASE` changes the URL on the end card (default `wheelprosystems.com/demo/`); `DEMO_ORIGIN` changes where demo screens are taken from (default `http://localhost:3000`).
