---
name: WheelPro Systems — Shop Demo
description: The per-shop sales demo at /demo/[shop]; warm cream paper, near-black ink, one signal orange with teal for second lines, General Sans with one Instrument Serif word per heading and Fragment Mono labels.
colors:
  signal: "#ee5131"
  signal-deep: "#d8431f"
  signal-wash: "#fbe3da"
  teal: "#12807a"
  cream: "#f3efe3"
  card: "#f9f6ee"
  field: "#fdfbf6"
  oat: "#ece6d6"
  oat-deep: "#e4ddca"
  hairline: "#ddd5c2"
  hairline-strong: "#cbc1aa"
  ink: "#141413"
  ink-body: "#3b3a36"
  ink-quiet: "#6b675d"
  night-2: "#1f1d1a"
  night-line: "#34312b"
  on-night: "#f3efe3"
  on-night-quiet: "#bdb7a8"
  readout-green: "#5fd39a"
  success: "#15803d"
  success-wash: "#e8f7ee"
  danger: "#dc2626"
typography:
  display:
    fontFamily: "General Sans, Arial, sans-serif"
    fontSize: "clamp(3rem, 7.4vw, 6rem)"
    fontWeight: 300
    lineHeight: 0.96
    letterSpacing: "-0.045em"
  headline:
    fontFamily: "General Sans, Arial, sans-serif"
    fontSize: "clamp(2.2rem, 4.4vw, 3.6rem)"
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  emphasis:
    fontFamily: "Instrument Serif, serif"
    fontStyle: italic
    fontWeight: 400
    letterSpacing: "-0.01em"
  title:
    fontFamily: "General Sans, Arial, sans-serif"
    fontSize: "22px–24px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "General Sans, Arial, sans-serif"
    fontSize: "clamp(1.05rem, 1.35vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "General Sans, Arial, sans-serif"
    fontSize: "15px–17px"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Fragment Mono, ui-monospace, monospace"
    fontSize: "11px (9.5px inside small cells)"
    fontWeight: 400
    letterSpacing: "0.14em"
    textTransform: uppercase
  button:
    fontFamily: "General Sans, Arial, sans-serif"
    fontSize: "12px–12.5px"
    fontWeight: 600
    letterSpacing: "0.14em–0.16em"
    textTransform: uppercase
rounded:
  tick: "2px"
  key: "7px"
  sm: "8px"
  toggle: "10px"
  button: "11px"
  button-lg: "13px"
  well: "14px–16px"
  nav: "18px"
  card: "22px"
  panel: "28px"
  pill: "9999px"
spacing:
  gutter: "20px"
  gutter-md: "32px"
  wrap: "1280px"
  section: "80px"
  section-lg: "112px"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "#ffffff"
    rounded: "{rounded.button}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.signal-deep}"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
    rounded: "{rounded.button-lg}"
    padding: "0 24px"
    height: "52px"
  button-outline:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button-lg}"
    padding: "0 24px"
    height: "52px"
  chip:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink-body}"
    rounded: "{rounded.pill}"
    padding: "0 11px"
    height: "26px"
  field-cell:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.button-lg}"
    padding: "12px 14px"
  card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.card}"
    padding: "20px–24px"
  readout:
    backgroundColor: "{colors.ink}"
    textColor: "#d8d4c8"
    rounded: "{rounded.well}"
    padding: "16px–20px"
  site-nav:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.nav}"
    height: "64px"
  panel-close:
    backgroundColor: "linear-gradient(135deg, #1c1714, #141413 55%, #0f2a28)"
    textColor: "{colors.on-night}"
    rounded: "{rounded.panel}"
    padding: "56px–64px 24px–48px"
  tour-bar:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-night-quiet}"
    rounded: "{rounded.pill}"
    padding: "6px"
---

# Design System: WheelPro Systems — Shop Demo

Scope: this file records the demo world only, applied by the `.demo-theme` wrapper in `app/demo/[shop]/layout.tsx` to every `/demo/[shop]` route (the shop's website, the customer quote and the admin). The tokens live in the `.demo-theme` block at the end of `app/globals.css`, which overrides the site's `:root` tokens inside the wrapper only. It shares its three faces with wheelprosystems.com (General Sans, Instrument Serif, Fragment Mono) but has its own palette, radii and shadows. The `.shop-*` utilities in the same block (`shop-btn`, `shop-chip`, `shop-card`, `shop-label`, `shop-mono`, `shop-serif`, `shop-smear`, `shop-marquee`) are this world's building blocks.

## Overview

**Creative North Star: "The Shop Counter"**

The demo is the shop's own website and back office, so it should feel like a good independent workshop's counter: warm cream paper, near-black ink, a printed ticket readout, and one signal-orange mark where the customer should press. The shop is the brand; WheelPro only signs the footer.

Persuasion surfaces (website, quote) are big and airy: light 300-weight headlines at display sizes, one serif italic word, generous cream bands. The admin is denser but uses the same cards, labels and buttons. Small text that names or measures something (labels, chips, readouts, figures) is set in tracked uppercase Fragment Mono, which gives the world its "spec sheet" voice.

Rounded rectangles carry everything: 11–13px for controls, 13–16px for wells, 22px for cards, 28px for the closing panel. Pills are reserved for chips, dots and the floating tour bar. Depth is soft and warm, brown-tinted rather than grey.

**Key Characteristics:**
- Warm cream ground, lighter cream cards, oat wells and hairlines
- One signal orange for action and markers; teal only for second lines of headings and secondary data
- Light 300 display weight with tight tracking; one Instrument Serif italic word per heading
- Fragment Mono uppercase labels, chips and readouts
- Uppercase tracked buttons on 11–13px corners; ink buttons for the hero, orange elsewhere
- Near-black "ticket" readouts that echo the request or message back in mono

## Colors

A warm, low-chroma paper-and-ink set with one saturated orange and one muted teal.

### Primary
- **Signal** (`{colors.signal}`, `--accent`): action and markers. The "Get a price" and "Add photos" buttons, `.shop-btn`, list ticks, ticker bullets, the active chapter rule, footer icons, arrows in readouts, admin counters, selection and focus colour, and the soft smear behind the hero's serif word.
- **Deep Signal** (`{colors.signal-deep}`): hover on every orange button.
- **Signal Wash** (`{colors.signal-wash}`, `--accent-soft`): tinted backgrounds behind small accent badges.

### Secondary
- **Teal** (`{colors.teal}`, `--teal`): the second line of section headings ("Look what we *fix*."), the far end of the orange-to-teal gradient on the nav progress line and funnel bars, and booked bars in the admin's source chart. Never on a button.

### Neutral
- **Cream** (`{colors.cream}`, `--bg`): page ground, and text on night surfaces.
- **Card** (`{colors.card}`, `--card`): cards, the site nav, outline buttons, chips.
- **Field** (`{colors.field}`): the lightest cells inside cards (quick-quote fields, quote facts).
- **Oat / Deep Oat** (`{colors.oat}`, `{colors.oat-deep}`, `--bg-subtle`, `--bg-muted`): wells, the facts strip, the ticker band, the chapter list, empty progress tracks, hover on keys.
- **Hairline / Strong Hairline** (`--line`, `--line-strong`): card and section borders; outline buttons, chips and unselected toggles.
- **Ink** (`{colors.ink}`, `--ink`, `--dark`): headings, the hero button, selected toggles, readouts, the demo bar and tour bar.
- **Ink Body / Ink Quiet** (`--ink-2`, `--ink-3`): body copy; labels, captions, metadata.
- **Night Line / On Night / On Night Quiet**: borders and text on ink surfaces.
- **Readout Green** (`{colors.readout-green}`): the live dot and heading inside dark readouts only ("Your request", "Follow-ups").
- **Success / Danger**: paid states and invalid fields; state only.

### Named Rules
**The One Signal Rule.** Orange is the only loud colour. Teal is a quieter second voice for words and data, never for actions; status green and red are state only.

**The Accent Is a Variable Rule.** Every accent use reads `var(--accent)` (or the `accent` Tailwind colour), because `lib/shops.ts` can give a shop its own brand colour and the layout writes it into `--accent`. The literal `#d8431f` hover is the one known exception and should become a token if a shop overrides the accent.

## Typography

**Display / Body:** General Sans (Fontshare, loaded by the root layout), with Arial, sans-serif
**Emphasis:** Instrument Serif italic 400 (`--font-serif`), one word per heading via `.shop-serif`
**Label / Mono:** Fragment Mono 400 (`--font-code`), via `.shop-label` and `.shop-mono`

**Character:** A light, editorial grotesk at display sizes, broken by one serif italic word that does the emotional work ("yet.", "fix", "quote", "couch"). Body stays at regular weight. Everything small and factual moves to mono uppercase, so the page reads as headline, story and spec sheet.

### Hierarchy
- **Display** (300, clamp(3rem, 7.4vw, 6rem), 0.96, -0.045em): the shop-site hero, set on three short lines.
- **Headline** (300, clamp(2.2rem, 4.4vw, 3.6rem), 1.02, -0.035em): section heads; the second line turns teal. The close panel runs to 3.8rem.
- **Title** (400, 22–24px, -0.02em): card heads and chapter names.
- **Lead** (400, clamp(1.05rem, 1.35vw, 1.2rem), relaxed): the paragraph under the hero, 44ch.
- **Body** (400, 15–17px, relaxed): paragraphs, 46–52ch.
- **Label** (Fragment Mono 400, 11px, 0.14em, uppercase, ink-quiet): form legends, field cells, captions; 9.5px inside small cells.
- **Button** (600, 12–12.5px, 0.14–0.16em, uppercase).

### Named Rules
**The One Serif Word Rule.** At most one Instrument Serif italic word per heading, and nowhere else. It may carry the orange smear only in the hero.

**The Mono Is for Facts Rule.** Mono uppercase is for labels, chips, figures and readouts, never for sentences a customer has to read.

## Layout

Content sits in a centred wrap (max 1280px) with 20px gutters on phones and 32px from 768px. Sections run 80px vertical on phones and 112px from 768px, separated by hairlines rather than alternating colours. The hero is a two-column split from 1024px (headline left, quick-quote card right) with a three-cell facts strip beneath and, on wide screens, the shop name set vertically in mono down the left edge. A slightly rotated (-0.6°) mono ticker band of services separates hero from content. Services are a chapter list beside a sticky photo card. The admin is a 240px transparent sidebar plus a fluid main area under a sticky translucent header, collapsing below 1024px. The fixed tour bar floats 16px above the bottom; the wrapper reserves 96px of bottom padding for it.

## Elevation & Depth

Tonal layering (cream ground, lighter card, lightest field cells, oat wells) with soft warm shadows tinted `rgb(60 45 20 / …)` and long negative-spread falloff. Dark readouts carry a deeper, neutral shadow so they sit like a printed slip on the card. The quick-quote card has a blurred orange glow in its top-right corner.

### Shadow Vocabulary
- **Rest** (`--shadow-sm`: `0 1px 2px rgb(60 45 20 / 0.05), 0 4px 12px -4px rgb(60 45 20 / 0.08)`): small controls.
- **Lifted** (`--shadow-md`: `0 2px 4px rgb(60 45 20 / 0.04), 0 18px 40px -16px rgb(60 45 20 / 0.2)`).
- **Raised** (`--shadow-lg`: `0 4px 10px rgb(60 45 20 / 0.05), 0 40px 80px -28px rgb(60 45 20 / 0.3)`): the tour bar.
- **Card** (`.shop-card`: `0 1px 2px rgb(60 45 20 / 0.05), 0 24px 60px -30px rgb(60 45 20 / 0.28)`).
- **Nav** (`0 10px 30px -18px rgb(60 45 20 / 0.35)`): the floating site nav.
- **Readout** (`0 18px 40px -20px rgb(0 0 0 / 0.6)`): dark ticket panels.
- **Close** (`0 40px 80px -40px rgb(20 15 10 / 0.6)`): the closing panel.

## Shapes

Rounded rectangles throughout, scaled by size: 2px list ticks, 7px number keys, 10px damage toggles, 11px header buttons and initials tiles, 13px hero buttons and field cells, 14–16px wells, readouts and photos, 18px nav and facts strip, 22px cards and the chapter list, 28px for the closing panel. Full pills only for chips, status dots, the tour bar and its tabs. Borders are 1px hairlines; the active chapter gets a 3px orange rule on its left edge.

## Components

### Buttons
- **Shape:** 11px corners at 40px tall (nav, cards), 13px at 52px tall (hero, close panel). Label 12–12.5px, 600, uppercase, 0.14–0.16em tracking; optional trailing arrow that nudges 2px right on hover; press scales to 0.98.
- **Primary (`.shop-btn`):** signal fill, white label; hover deepens to Deep Signal.
- **Ink (`.shop-btn-dark` / hero):** ink fill, card-cream label. Used for the hero's "Get a price" so the orange stays rare above the fold.
- **Outline:** card fill, strong-hairline stroke, ink label; hover darkens the stroke to ink. Phone numbers use this.
- **On night:** outline at white/20% on the close panel, hovering to white/50%.

### Chips
- **Chip (`.shop-chip`):** 26px pill, strong-hairline stroke, card fill, Fragment Mono 10.5px uppercase at 0.12em. Used for "Photo quote", "Example", "Sample", service tags; 24px and 9.5px inside chapters.
- **Admin counters:** small 4px-radius signal tags with white figures.

### Cards / Containers
- **Card (`.shop-card`):** 22px corners, hairline border, card fill, Card shadow, 20–24px padding.
- **Field cell:** 13px corners, hairline, field fill, a 9.5px mono label over the value.
- **Well:** oat fill, hairline, 14–18px corners; holds toggles, the facts strip, the chapter list.

### Inputs / Toggles
- **Selects** inside field cells: transparent, Fragment Mono 14–15px ink, no chrome.
- **Number keys:** 28px squares, 7px corners, mono; selected fills ink.
- **Damage toggles:** 36px tall, 10px corners, strong-hairline on field fill; selected fills ink with cream text. All toggles expose `aria-pressed`.
- **Focus:** the accent outline from `.demo-theme :focus-visible`.

### Navigation
- **Demo bar:** slim ink strip, 13px on-night-quiet text, shop name in on-night.
- **Site nav:** sticky floating card 12px from the top, 64px tall, 18px corners, card at 90% with blur, initials tile, shop name over a mono tagline, uppercase tracked text links, outline phone button and orange "Get a price". A 2px orange-to-teal line along its foot fills with scroll progress.
- **Tour bar:** fixed bottom-centre ink pill (95%, blur, night-line ring, Raised shadow); 40px pill tabs with 16px line icons, active tab inverts to on-night with ink text; inactive labels hide below 640px.

### Ticket Readout (signature)
A near-black 14–16px panel that writes the customer's request (or the shop's text message) back in Fragment Mono: a mono uppercase heading with a pulsing readout-green dot, then lines led by orange arrows with the key words in white. Used in the quick quote, the "What you get back" example and the admin's follow-ups.

### Serif Smear (signature)
The hero's serif word ("yet.") carries `.shop-smear`: a blurred orange gradient stroke riding across its middle. One per page.

### Ticker Band (signature)
A full-width oat band rotated -0.6° with a 40s mono marquee of the shop's services and city, separated by orange bullets. Static under reduced motion.

### Close Panel
A 28px-radius panel on a dark gradient from warm brown-black to deep teal, with a light cream headline (one serif word), on-night-quiet supporting line, an orange button and an on-night outline phone button. One per page, at the end.

## Do's and Don'ts

### Do:
- **Do** use `var(--accent)` for every accent use so a shop's own brand colour can replace orange.
- **Do** keep headlines light (300) and give each at most one serif italic word.
- **Do** set labels, chips, figures and readouts in Fragment Mono uppercase.
- **Do** use 11–13px corners for controls and 22px for cards; keep pills for chips and the tour bar.
- **Do** tint shadows warm (`rgb(60 45 20 / …)`).
- **Do** honour reduced motion on the marquee, the progress line and any animated element.

### Don't:
- **Don't** put teal on a button or use it as a second accent for actions.
- **Don't** use mono for sentences, or more than one serif word per heading.
- **Don't** use cool grey or slate shadows, white cards or cobalt from the old demo world.
- **Don't** round buttons into pills.
- **Don't** let WheelPro branding into the shop's pages beyond the demo bar, tour bar and footer credit.
