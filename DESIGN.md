---
name: WheelPro Systems — Shop Demo
description: The per-shop sales demo at /demo/[shop]; cool daylight, slate ink, one cobalt accent, Satoshi throughout.
colors:
  cobalt: "#2752e7"
  cobalt-deep: "#1f45cf"
  cobalt-wash: "#e7edff"
  daylight: "#f7f9fc"
  paper: "#ffffff"
  mist: "#eef2f8"
  mist-deep: "#e3e9f3"
  hairline: "#e1e7f0"
  hairline-strong: "#c9d3e1"
  slate-ink: "#0b1324"
  slate-body: "#34405a"
  slate-quiet: "#5d6a82"
  night-line: "#26324a"
  on-night: "#f5f8fd"
  on-night-quiet: "#a6b1c6"
  success: "#15803d"
  success-wash: "#e8f7ee"
  danger: "#dc2626"
typography:
  display:
    fontFamily: "Satoshi, Arial, sans-serif"
    fontSize: "clamp(2.3rem, 5.6vw, 4.4rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Satoshi, Arial, sans-serif"
    fontSize: "clamp(1.9rem, 3.6vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Satoshi, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.375
  lead:
    fontFamily: "Satoshi, Arial, sans-serif"
    fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)"
    fontWeight: 450
    lineHeight: 1.625
  body:
    fontFamily: "Satoshi, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 450
    lineHeight: 1.625
  label:
    fontFamily: "Satoshi, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    letterSpacing: "0"
rounded:
  sm: "8px"
  md: "12px"
  lg: "20px"
  xl: "28px"
  pill: "9999px"
spacing:
  gutter: "20px"
  gutter-md: "32px"
  gutter-lg: "48px"
  card-gap: "16px"
  section: "64px"
  section-lg: "96px"
components:
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "0 20px 0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.cobalt-deep}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  button-on-cobalt:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.pill}"
    padding: "0 20px 0 24px"
    height: "48px"
  chip-shop:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.slate-body}"
    rounded: "{rounded.pill}"
    padding: "6px 16px 6px 6px"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "52px"
  card-step:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "10px"
  panel-close:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.paper}"
    rounded: "{rounded.xl}"
    padding: "96px 24px"
  tour-bar:
    backgroundColor: "{colors.slate-ink}"
    textColor: "{colors.on-night-quiet}"
    rounded: "{rounded.pill}"
    padding: "6px"
---

# Design System: WheelPro Systems — Shop Demo

Scope: this file records the demo world only, applied by the `.demo-theme` wrapper in `app/demo/[shop]/layout.tsx` to every `/demo/[shop]` route (overview, shop website, customer quote, admin). The marketing site keeps its own incumbent tokens in `app/globals.css` `:root` (warm off-white, bronze accent, General Sans with Instrument Serif and Fragment Mono), which are not documented here and are not replaced by this world.

## Overview

**Creative North Star: "The Cobalt Blueprint"**

The demo reads as a clean working drawing of a shop's own system: cool daylight paper, slate ink, a faint blueprint grid that fades out behind hero areas, and a single cobalt accent spent with full commitment. The proof is the working product itself, so the world stays quiet and lets live miniatures, real forms and a real admin carry the page.

Density is calm on persuasion surfaces (overview, shop website) and denser in the admin, but both share one family, one accent and one shape language. Emphasis comes from weight and from the outlined cobalt highlight box, never from a second typeface, italics or tracked mono labels.

Pills carry action and identity; rounded rectangles carry content. Depth is soft, cool and slate-tinted, lifting cards gently off the daylight ground.

**Key Characteristics:**
- Cool daylight ground with white cards and hairline borders
- One cobalt accent: highlight box, step numbers, primary pill, close panel
- Satoshi only, bold display with tight negative tracking
- Pills for actions, chips and the tour bar; 12px controls; 20px cards
- Soft slate-tinted shadows; a fading blueprint grid behind heroes

## Colors

A cool, low-chroma slate-and-daylight neutral set with one saturated cobalt.

### Primary
- **Cobalt** (`{colors.cobalt}`): the only accent. Primary pill, step-number discs, highlight-box stroke and text, timeline times and icons, check badges, the full-bleed close panel, selection and focus color.
- **Deep Cobalt** (`{colors.cobalt-deep}`): hover state of every cobalt pill.
- **Cobalt Wash** (`{colors.cobalt-wash}`): fill inside the highlight box and behind small accent badges.

### Neutral
- **Daylight** (`{colors.daylight}`): page ground.
- **Paper** (`{colors.paper}`): cards, secondary pills, inputs, the admin sidebar and alternating white sections.
- **Mist / Deep Mist** (`{colors.mist}`, `{colors.mist-deep}`): quote-form panel, preview wells, active admin nav row, loading placeholders.
- **Hairline / Strong Hairline** (`{colors.hairline}`, `{colors.hairline-strong}`): card and section borders; input and secondary-pill strokes, timeline rails.
- **Slate Ink** (`{colors.slate-ink}`): headings, primary text on light, and the night surface of the demo bar and tour bar.
- **Slate Body / Slate Quiet** (`{colors.slate-body}`, `{colors.slate-quiet}`): body copy; supporting lines, captions, metadata.
- **Night Line / On Night / On Night Quiet**: borders and text on the slate-ink bars.
- **Success / Danger**: paid and sent states in the admin and quote confirmation; invalid fields.

### Named Rules
**The One Cobalt Rule.** Cobalt is the only hue with saturation. Status green and red appear only as state, never as decoration.

**The Accent Is a Variable Rule.** Every accent use reads `var(--accent)`, because a shop may supply its own brand colour; new surfaces must not hard-code cobalt.

## Typography

**Display Font:** Satoshi (self-hosted, `next/font/local`, cuts 400 / 500 / 700 / 900), with Arial, sans-serif
**Body Font:** Satoshi
**Label/Mono Font:** none; labels and figures stay in Satoshi with tabular numerals

**Character:** One geometric grotesk doing everything. Bold, tightly tracked headlines against a soft 450 body weight give hierarchy without a second voice. Only the 400, 500, 700 and 900 cuts ship, so the authored 450 body renders from the 500 cut and the 600 titles and labels render from the 700 cut.

### Hierarchy
- **Display** (700, clamp(2.3rem, 5.6vw, 4.4rem), 1.08, -0.04em): overview and shop-site hero headlines, max ~15–19ch.
- **Headline** (700, clamp(1.9rem, 3.6vw, 3rem), 1.08, -0.035em): section heads; the close panel runs larger (to 3.6rem).
- **Title** (600, 16–19px, snug): card titles, timeline steps, service names, admin list names.
- **Lead** (450, clamp(1.05rem, 1.4vw, 1.2rem), relaxed): the one sentence under a hero, 44–46ch.
- **Body** (450, 16–17px, relaxed): paragraphs, ~52ch max.
- **Label** (600, 13px, no tracking, sentence case): form legends and admin field labels.

### Named Rules
**The One Family Rule.** Satoshi everywhere. Emphasis is weight or the highlight box; never italics, a serif, or a mono face.

**The Sentence-Case Label Rule.** Labels are plain sentence case at 13px; no uppercase, no letter-spacing.

## Layout

Content sits in a centred wrap (max 1200px) with 20px gutters on phones, 32px from 768px and 48px from 1024px. Sections breathe at 64px vertical on phones and 96px from 768px, alternating daylight and white bands separated by a hairline. Persuasion heroes are centred stacks (overview) or a 7/5 text-and-photo split (shop site). Step cards sit in a four-column row on large screens with the inner two dropped 48px so the outer cards ride higher, and become a snap-scrolling swipe row on phones (cards 78% wide). The admin is a 240px white sidebar plus a fluid main area, collapsing to a horizontal scroll nav under 1024px. A fixed pill tour bar floats 16px above the bottom edge on every demo page; the wrapper reserves 96px of bottom padding for it.

## Elevation & Depth

A hybrid: tonal layering (daylight ground, white cards, mist wells) plus soft, cool, slate-tinted shadows with long negative-spread falloff. Shadows read as ambient lift, never as hard edges. Cobalt pills carry their own tinted glow.

### Shadow Vocabulary
- **Rest** (`0 1px 2px rgb(16 32 72 / 0.05), 0 4px 12px -4px rgb(16 32 72 / 0.08)`): chips, secondary pills, timeline nodes.
- **Lifted** (`0 2px 4px rgb(16 32 72 / 0.04), 0 18px 40px -16px rgb(16 32 72 / 0.18)`): step cards at rest.
- **Raised** (`0 4px 10px rgb(16 32 72 / 0.05), 0 40px 80px -28px rgb(16 32 72 / 0.28)`): hovered step cards, hero photos, the tour bar.
- **Cobalt glow** (`0 10px 24px -10px rgb(39 82 231 / 0.7)`): the primary pill on heroes; a smaller variant sits under step-number icons.

### Named Rules
**The Lift-On-Hover Rule.** Interactive cards rise 4px and step from Lifted to Raised on hover; nothing else moves.

## Shapes

Two silhouettes. Fully round pills for anything you press or anything that names someone (primary and secondary actions, shop chip, initials discs, step numbers, tour bar). Rounded rectangles for content: 8px segments, status tags and small badges, 12px inputs and admin rows, 20px cards and photos, 28px for the cobalt close panel. The highlight box uses a proportional corner (0.22em) with a 2px stroke so it scales with the headline. Borders are 1px hairlines; the only heavy stroke is the 5px slate phone frame around the quote miniature.

## Components

### Buttons
- **Shape:** full pill (`{rounded.pill}`), 48px tall on heroes, 40–44px in headers and confirmations.
- **Primary:** cobalt fill, white 16px semibold label, trailing arrow that nudges 2px right on hover; hover deepens to Deep Cobalt, press scales to 0.98.
- **Secondary:** white pill with strong-hairline stroke, slate-ink 15–16px medium label; hover darkens the stroke to ink.
- **On cobalt:** white pill with slate-ink label inside the close panel.
- **Quiet link:** slate-ink text with a strong-hairline underline (offset 0.35em) that darkens on hover; used for "Book a walkthrough" beside a primary pill.

### Chips
- **Shop chip:** white pill, hairline border, Rest shadow, slate initials disc on the left, "Built for **Shop**".
- **Status chips (admin):** small 8px-radius tags (`{rounded.sm}`), 11px medium text with a leading dot, tinted by state: deep mist for new, cobalt wash for quoted and sent, success wash for paid and booked.

### Cards / Containers
- **Corner Style:** 20px (`{rounded.lg}`).
- **Background:** white on daylight; the quote form sits in a mist panel.
- **Shadow Strategy:** Lifted at rest, Raised on hover (see Elevation).
- **Border:** 1px hairline.
- **Internal Padding:** 10px around a framed preview well, then 16px/8px for the caption row.

### Inputs / Fields
- **Style:** 52px tall, white, 12px radius, strong-hairline stroke, 16px slate-ink text, quiet placeholder.
- **Focus:** stroke turns ink plus a 3px ring of the accent at 20% opacity.
- **Error:** stroke turns danger, driven by `aria-invalid`.
- **Segments:** 8px-radius options inside a mist panel; selected fills slate ink with white text.

### Navigation
- **Demo bar:** slim slate-ink strip, 13px quiet text, shop name in on-night.
- **Tour bar:** fixed bottom-centre slate pill (95% opacity, blur, night-line ring, Raised shadow); 40px pill tabs with 16px line icons, active tab inverts to on-night with ink text; inactive labels hide below 768px.
- **Shop header:** sticky, translucent daylight with blur and a hairline; initials disc, shop name and city, text links, a phone pill and a cobalt "Get a price" pill.
- **Admin nav:** 40px rows, 12px radius, active row on deep mist.

### Highlight Box (signature)
The emphasised phrase in a headline is boxed: 2px cobalt stroke, cobalt-wash fill, cobalt text, 0.22em corners, tight line-height. On the overview it cycles through enquiry types, gliding to each phrase's width with a blur-and-slide swap (0.5–0.55s, ease-out-expo), and holds still under reduced motion. One per headline.

### Live Step Card (signature)
A white 20px card framing a live, scaled miniature of a real demo page in a mist well, captioned by a cobalt number disc, a title and one quiet line. The phone variant frames the miniature in a slate phone bezel rising from the well's bottom edge.

### Blueprint Grid (signature)
56px cobalt grid lines at 7% opacity, masked by a radial fade so they vanish toward the edges. Sits behind hero areas; inverted at 60% opacity inside the cobalt close panel.

### Cobalt Close Panel
A 28px-radius full-cobalt panel with the inverted grid, white headline, 85% white supporting line and a white pill. One per page, at the end.

## Do's and Don'ts

### Do:
- **Do** use `var(--accent)` for every accent use so a shop's own brand colour can replace cobalt.
- **Do** keep emphasis to weight and the highlight box, one box per headline.
- **Do** use pills for actions and identity chips, 12px for controls, 20px for cards.
- **Do** tint shadows with slate (`rgb(16 32 72 / …)`) and keep them soft with negative spread.
- **Do** keep labels sentence case at 13px semibold.
- **Do** honour reduced motion on any rotating or animated element.

### Don't:
- **Don't** introduce a second typeface, italics or tracked uppercase mono labels inside `.demo-theme`.
- **Don't** add a second saturated hue; status colours are state only.
- **Don't** use hard offset shadows or warm-tinted shadows from the marketing world.
- **Don't** carry the marketing site's bronze, warm off-white or serif emphasis into demo routes.
