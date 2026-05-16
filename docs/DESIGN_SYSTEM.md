# WheelPro Systems Design System

## Color Palette

Core surfaces:

- Lab Black: `#05070B`
- Graphite: `#0D111A`
- Deep Navy: `#08111F`
- Carbon Card: `#111827`
- Glass Border: `rgba(148, 163, 184, 0.18)`

Accents:

- Electric Blue: `#2F8CFF`
- Cyan Signal: `#36D8FF`
- Steel Blue: `#5DA8FF`
- Success Green: `#22C55E`
- Warning Amber: `#F59E0B`

Text:

- Chrome White: `#F8FAFC`
- Soft White: `#E2E8F0`
- Muted Steel: `#94A3B8`
- Dim Steel: `#64748B`

Rules:

- Dark luxury surfaces should dominate.
- Blue/cyan accents should be used sparingly for CTAs, lines, active states, and system signals.
- Avoid a one-note blue-only interface by mixing graphite, white, steel, cyan, and small green/amber status accents.

## Typography Direction

- Display: bold, compact, high-trust SaaS/automotive headline tone.
- Body: clean grotesk/sans-serif with generous line height.
- Mono: used for system labels, metrics, small badges, and dashboard-style text.
- Avoid oversized headings inside cards and compact UI panels.
- Letter spacing should remain neutral; do not use negative tracking.

## Spacing System

- Base rhythm: 4px increments.
- Section padding: 72px mobile, 104px desktop.
- Container width: max 1200px to 1280px.
- Card padding: 20px mobile, 24px to 32px desktop.
- UI mockup gaps: tight, functional, dashboard-like.

## Button Styles

Primary CTA:

- Electric blue filled background.
- White text.
- Subtle glow on hover.
- 8px to 12px radius.
- Icon on the right when useful.

Secondary CTA:

- Transparent/glass background.
- Steel border.
- White text.
- Blue border/text on hover.

Ghost:

- No fill.
- Muted steel text.
- Useful for navigation and small utility links.

## Card Styles

- Use glassmorphism lightly: translucent dark fill, thin border, subtle blur.
- Cards should feel like system modules, not decorative tiles.
- Radius should generally stay at 8px to 12px.
- Hover may lift 2px and brighten border.
- Avoid nesting cards inside cards.

## Animation Rules

Use Framer Motion for:

- Hero entrance.
- Floating system cards.
- Scroll reveal sections.
- Service card hover.
- Dashboard metric count/entrance.
- System flow line animation.
- CTA hover effects.

Rules:

- Smooth, premium, and subtle.
- No random spinning animations.
- No motion that distracts from the offer.
- Respect `prefers-reduced-motion`.
- Keep long-running animations low-cost: opacity, transform, and background-position where possible.

## Icon Usage

- Use Lucide React icons.
- Icons should be functional signals: workflow, quote, calendar, payment, dashboard, portal, automation.
- Avoid hand-drawn or cartoon icons.
- Use 16px to 22px icons in cards and buttons.
- Pair unfamiliar icons with clear labels.

## Layout Principles

- Mobile-first responsive layout.
- First viewport should immediately signal WheelPro Systems and the system-building offer.
- Use full-width sections with constrained inner content.
- Hero should combine strong copy and an animated workflow/dashboard visual.
- Avoid generic marketing hero art and fake customer proof.
- Use realistic product modules to show capability.

## Mobile Rules

- Navigation collapses into a clean menu.
- Hero visual stacks below copy.
- CTA buttons should be full-width where helpful.
- No horizontal overflow.
- Cards should use one column until space supports two or three.
- Dashboard mockups must shrink gracefully without clipped text.

## Accessibility Rules

- Maintain accessible contrast on all text and controls.
- Use semantic HTML sections, headings, lists, buttons, and links.
- Every page needs a descriptive H1 and metadata title.
- Focus states must be visible.
- Motion must respect reduced-motion preferences.
- Icon-only controls require accessible labels.
