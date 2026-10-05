# WheelPro Systems — Design System

Version 1.0 · Reference: beew.studio (white, bold sans-serif, rounded panels, calm motion, one dark contrast block)

**Principle:** the interface stays white and quiet; the *visuals* carry the colour and the wheel world. Each section makes one point.

---

## 1. What we take from the reference (and what we don't)

| Take | Don't take |
|---|---|
| Big, tight, bold sans-serif headlines | Startup/Web3 tone, "design subscription" language |
| White and soft-grey ground; one dark section | Purple/blue gradient blobs as decoration |
| Large rounded panels with crisp screenshots | Generic agency case grid |
| Black square-arrow button inside a grey pill | Many CTA styles |
| Numbered accordion service list (on mobile) | Static images; our visuals animate |
| Case study: name, pills, result badge, big framed screenshot | Logos of clients we don't have |
| Slow fade-up reveals, drifting card strip | Bouncy or fast motion |

---

## 2. Colour tokens

### Base

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | Page background |
| `--bg-subtle` | `#F5F5F6` | Section bands, pill backgrounds, panel insides |
| `--bg-muted` | `#EDEDEF` | Hover on subtle, inactive tracks |
| `--line` | `#E4E4E7` | 1px dividers, card borders |
| `--line-strong` | `#D4D4D8` | Input borders, focused dividers |
| `--ink` | `#0A0A0B` | Headings, primary button, active pill |
| `--ink-2` | `#3F3F46` | Body text |
| `--ink-3` | `#71717A` | Captions, labels, meta (≥ 4.5:1 on white) |
| `--dark` | `#0B0B0D` | Numbers story section background |
| `--dark-2` | `#18181B` | Cards on dark |
| `--dark-line` | `#27272A` | Dividers on dark |
| `--on-dark` | `#FAFAFA` | Text on dark |
| `--on-dark-2` | `#A1A1AA` | Secondary text on dark |

### Accent (used sparingly: under 5% of any screen)

| Token | Hex | Use |
|---|---|---|
| `--accent` | `#2F5BFF` | Active progress line, chart "with WheelPro" bars, links on hover, number highlights |
| `--accent-soft` | `#EAF0FF` | Accent backgrounds (result badge, selected states inside visuals) |
| `--success` | `#16A34A` | "Paid", "Sent", "Booked" status inside visuals |
| `--success-soft` | `#E8F7EE` | Status chip background |
| `--warn` | `#D97706` | "Lost lead" / "No reply" markers in the numbers story |
| `--danger` | `#DC2626` | Form errors only |

### Wheel finish swatches (visuals only, never interface chrome)

| Name | Gradient (light → base → dark) |
|---|---|
| Gloss Black | `#3A3D42 → #0E0F11 → #050607` |
| Hyper Silver | `#EEF0F2 → #A9AEB4 → #6C7178` |
| Gunmetal | `#8A9098 → #4A4F56 → #2A2D31` |
| Satin Bronze | `#C09D6A → #7D5F38 → #4A3820` |
| Candy Red | `#E04A58 → #8E1420 → #4D0A10` |

### Contrast checks (must pass)

- `--ink-2` on `--bg` = 10.4:1 ✓ · `--ink-3` on `--bg` = 4.8:1 ✓
- `--on-dark-2` on `--dark` = 7.9:1 ✓ · `--accent` on `--bg` = 5.2:1 ✓ (large and small)

---

## 3. Typography

**Faces:** **Switzer** for marketing and interface typography, and **Geist Mono** only for numbers in data (prices, times, job IDs). Both are self-hosted via `next/font`; Switzer is bundled locally from Fontshare.

### Scale (fluid, with clamp)

| Token | Size (mobile → desktop) | Weight | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `display` | 44 → 88px · `clamp(2.75rem, 6vw, 5.5rem)` | 600 | 1.0 | -0.038em | Hero headline |
| `h1` | 36 → 64px · `clamp(2.25rem, 4.4vw, 4rem)` | 600 | 1.05 | -0.035em | Section headlines |
| `h2` | 28 → 44px · `clamp(1.75rem, 3vw, 2.75rem)` | 600 | 1.1 | -0.03em | Accordion rows, case title, story lines |
| `h3` | 20 → 24px | 600 | 1.25 | -0.02em | Card titles, visual headers |
| `stat` | 56 → 120px · `clamp(3.5rem, 9vw, 7.5rem)` | 600 | 0.95 | -0.05em | Big numbers in the story |
| `body-lg` | 18 → 20px | 400 | 1.55 | -0.01em | Sublines under headlines |
| `body` | 16px | 400 | 1.6 | 0 | Paragraphs |
| `small` | 14px | 400 | 1.5 | 0 | Meta, captions, FAQ answers |
| `label` | 12px | 500 | 1.3 | +0.08em, UPPERCASE | Section labels, pill tags |
| `mono` | 13px Geist Mono | 400 | 1.4 | 0, tabular nums | Prices, times, IDs inside visuals |

### Rules

- Headlines: max 2 lines on desktop, `text-wrap: balance`, centred in the hero and section intros (as in the reference).
- Body text max width: 60ch. Sublines max width: 46ch.
- Space above a heading is always larger than the space below it.
- Section labels (small uppercase, e.g. SERVICES) sit 16px above the headline. One per section, only where it helps scanning.
- Never use more than two weights on one screen (400 + 600).

---

## 4. Spacing, grid and layout

- **Base unit:** 4px. Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.
- **Container:** max width 1200px; side padding 20px (mobile), 32px (tablet), 48px (desktop).
- **Grid:** 12 columns, 24px gutter (desktop); 4 columns, 16px gutter (mobile).
- **Section padding (vertical):** 96px mobile → 160px desktop.
- **Breakpoints:** `sm 640` · `md 768` · `lg 1024` · `xl 1280`.

---

## 5. Shape, borders and depth

> **Updated 2026-10-04:** all boxes (cards, panels, inputs, mockups, frames, the dark section) use a near-square 1px radius. Circles (icon badges, step dots) and pill buttons/tabs/chips stay round.

| Token | Value | Use |
|---|---|---|
| `--r-xs` | 1px | Chips inside visuals, inputs |
| `--r-sm` | 1px | Small buttons, swatches |
| `--r-md` | 1px | Inner cards in visuals |
| `--r-lg` | 1px | Visual stage, case screenshot frame, hero strip cards |
| `--r-xl` | 1px | Dark numbers section (inset panel, as in the reference's services header) |
| `--r-pill` | 999px | Pills, tags, primary button container |

- **Borders:** 1px `--line` on white; 1px `--dark-line` on dark.
- **Shadows** (soft, always offset):
  - `--shadow-sm`: `0 1px 2px rgba(10,10,11,.04), 0 2px 8px rgba(10,10,11,.04)`
  - `--shadow-md`: `0 2px 4px rgba(10,10,11,.04), 0 12px 32px -8px rgba(10,10,11,.12)`
  - `--shadow-lg`: `0 4px 8px rgba(10,10,11,.04), 0 32px 64px -16px rgba(10,10,11,.18)`
- **Screenshot frames:** `--r-lg`, 1px border, `--shadow-lg`, and an 8px inner padding of `--bg-subtle` (the reference's "device frame" look).

---

## 6. Components

### 6.1 Buttons

| Variant | Look | Use |
|---|---|---|
| **Primary (arrow pill)** | A grey pill (`--bg-subtle`, height 52px, padding-right 20px) holding a **black 40×40 square** (r 10px) with a white → arrow, then a 16px/500 label in `--ink`. This is the reference's signature button. | "Book a meeting", "View case" |
| **Solid** | Black `--ink` pill, white text, height 48px, padding 0 24px. | Nav CTA, form submit |
| **Ghost link** | Text in `--ink`, 1px underline at 0.25em offset in `--line-strong`. | "See how it works", "Visit site ↗" |

**States**

| State | Primary (arrow pill) | Solid |
|---|---|---|
| Hover | Pill bg → `--bg-muted`; arrow slides 3px right and the square scales to 1.04 (240ms ease-out) | bg → `#27272A`, lift −1px |
| Active | Scale 0.98 (100ms) | Scale 0.98 |
| Focus-visible | 2px `--accent` ring, 3px offset | Same |
| Disabled | 50% opacity, no hover | Same |
| Loading | Arrow → 16px spinner; label "Sending…" | Same |

### 6.2 Service pills (the service bar)

- Container: a `--bg-subtle` rounded track (r-pill, 6px padding), centred, horizontally scrollable on mobile with snap.
- Pill: height 44px, padding 0 20px, 15px/500, `--ink-2`.
- **Active pill:** a black background that **slides** between pills as one shared element (layout animation, 450ms spring), white text.
- Hover (inactive): text → `--ink`, bg → `--bg-muted`.
- Under the track: a 2px progress line in `--accent` that fills over each tab's loop time during auto-play, and hides once the user takes control.
- A11y: `role="tablist"`, each pill is `role="tab"` with `aria-selected` and `aria-controls`, and left/right arrow keys move between tabs.

### 6.3 Visual stage (service module)

- Large panel: `--r-lg`, `--bg-subtle`, 1px `--line`, aspect 16:10 desktop / 4:5 mobile.
- Left column (desktop, 4/12): service name (h3), a two-line promise (body), and 3 bullet "what it does" lines with small check icons.
- Right column (8/12): the animated mock UI on a white inner card (`--r-md`, `--shadow-md`).
- A "Sample" tag (label style) in the top-right of the mock.

### 6.4 Tags / pills (static)

- 12px/500 uppercase, +0.06em tracking, padding 6px 12px, r-pill, 1px `--line`, transparent background. Used in the case study (WEBSITE · QUOTATION · BOOKING).

### 6.5 Result badge

- `--accent-soft` background, `--accent` text, 15px/600, padding 6px 12px, r-pill. Example: "Quotes answered in under 5 min" (**real number required**).

### 6.6 Status chips (inside visuals)

| Status | Background | Text |
|---|---|---|
| New | `--bg-muted` | `--ink-2` |
| Quoted | `--accent-soft` | `--accent` |
| Sent | `--accent-soft` | `--accent` |
| Paid / Booked | `--success-soft` | `--success` |
| Overdue / No reply | `#FEF3E2` | `--warn` |

### 6.7 Form fields

- Height 52px, `--r-sm` 10px, 1px `--line-strong`, 16px text (prevents iOS zoom).
- Label above the field in `label` style; helper or error text below in `small`.
- Focus: border `--ink` + 3px ring `rgba(47,91,255,.15)`.
- Error: border `--danger`, message "Enter an email like you@yourshop.ca".
- Segmented control (Shop / Mobile / Both): r-pill track; the selected segment is black.

### 6.8 Accordion (mobile service list, FAQ)

- Row: 1px `--line` top border, padding 28px 0, an `h2`-size title, a mono number (01–05) on the left, and a "+" icon on the right that rotates 45° to "×" when open.
- Open: height animates (400ms ease-out), and the content fades in after 80ms.

### 6.9 Navigation

- Height 72px, white at 85% with a 12px backdrop blur after scrolling 8px, plus a 1px `--line` bottom border that appears on scroll.
- Left: WheelPro wordmark (Switzer 600, -0.03em). Centre: Services · Results · Case study · FAQ. Right: Solid "Book a meeting".
- Mobile: wordmark + Solid button; the links collapse into a menu sheet.

### 6.10 Icons

- **Lucide** icon set, 1.5px stroke, 20px default size, `currentColor`. No emoji and no Unicode glyphs as icons.

---

## 7. Motion system

**Feel:** calm, heavy and expensive. Things glide and settle; nothing bounces or spins for attention.

### Easing and durations

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Reveals, slides (default) |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Cross-fades, progress bars |
| `spring-pill` | `{ type: "spring", stiffness: 380, damping: 34 }` | Active pill slider |
| `--d-fast` | 160ms | Hover colour changes |
| `--d-base` | 240ms | Button micro-interactions |
| `--d-slow` | 600ms | Panel cross-fades |
| `--d-reveal` | 900ms | Section fade-ups |
| `--d-count` | 1600ms | Number count-ups |

### Motion patterns

| Pattern | Spec |
|---|---|
| **Fade-up reveal** | From `opacity 0, y 24px, blur 6px` to `opacity 1, y 0, blur 0`, 900ms `--ease-out`. Triggers when 15% of the element is visible. Runs once. Children stagger 80ms. |
| **Headline word reveal** (hero only) | Each word rises from y 100% inside an overflow-hidden line, with a 60ms stagger, 900ms. |
| **Drifting strip** | Hero card strip moves left continuously at 30px/s (one loop about 60s), duplicated for a seamless loop; pauses on hover; slows to 0 under reduced motion. Edges fade with a 120px mask gradient. |
| **Shared pill slider** | Active background moves between pills with `spring-pill` (Motion `layoutId`). |
| **Stage cross-fade** | The outgoing visual fades to opacity 0 and y −8px (300ms); the incoming one fades in from y 12px and blur 4px (600ms, starting 150ms in). |
| **Count-up** | 0 → value over 1600ms, ease-out, tabular numbers so the width doesn't jump. |
| **Bar grow** | Width or height 0 → value, 1200ms `--ease-in-out`, 120ms stagger. |
| **Smooth scroll** | Lenis, `lerp 0.1`, `wheelMultiplier 1`. |
| **Parallax** (case screenshot only) | The screenshot moves −40px over the section's scroll. That's the only parallax on the page. |

### Reduced motion

`prefers-reduced-motion: reduce` turns off: the strip drift, word reveals, parallax, Lenis and auto-play. Reveals become instant, numbers show their final values and bars are drawn already full. All content stays visible.

---

## 8. Imagery and illustration

- **Mock UIs are real HTML/CSS components, not images**, so they stay sharp, can animate, and accept the `?shop=` name.
- Wheel thumbnails inside the visuals are real photos of curb-rashed and refinished wheels (licensed stock or Western Wheelcraft's own, with permission). Max 2 in the quote visual.
- The Western Wheelcraft screenshot is captured at 2× (2880px wide), WebP, about 180 KB.
- OG image: 1200×630, white, the headline plus the job-board mock.

---

## 9. Voice and microcopy

| Do | Don't |
|---|---|
| "Every enquiry. One inbox." | "Unified omnichannel lead management" |
| "Quote in one tap." | "Streamlined quotation workflow" |
| "Deposit paid. Job confirmed." | "Payment integration solution" |
| "Book a meeting" | "Schedule a consultation" |

Button labels name the action. Errors say what's wrong and how to fix it.
