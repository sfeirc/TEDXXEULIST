# TEDx IMT Paris – UI/UX TODO List (Montmartre-style, world-class)

Reference: [TEDx Montmartre](https://www.tedxmontmartre.com/)

---

## Typography

- [x] **TYPO-1** Add Inter font (TEDx official) for headings and body
- [x] **TYPO-2** Define typography scale in globals.css (hero, display, h1–h3, body, caption)
- [x] **TYPO-3** Hero headline: large, light weight, optional line-break, letter-spacing (Montmartre)
- [ ] **TYPO-4** Section headings: consistent weight (600–700) + letter-spacing across all pages
- [ ] **TYPO-5** Body text: line-height 1.6–1.7 everywhere for readability
- [ ] **TYPO-6** Caption/labels: 0.875rem, uppercase optional, tracking-wide
- [ ] **TYPO-7** Ensure all pages use CSS variables (--text-hero, --text-body, etc.) where relevant

---

## IMT logo / wordmark

- [x] **IMT-1** Nav: IMT text size to match TEDx logo height (same visual weight)
- [x] **IMT-2** Hero: IMT same size as TEDx logo (h-14 / h-20 equivalent → ~3rem / 5rem)
- [x] **IMT-3** Footer: IMT scaled to match TEDx logo (text-[1.2rem] md:text-[1.4rem])
- [x] **IMT-4** Partners banner: IMT large and matching TEDx logo proportion
- [ ] **IMT-5** Collaboration cards on home: IMT wordmark consistent size with TEDx logo in card
- [ ] **IMT-6** Partners institutional list: Fondation IMT cell uses same IMT styling as elsewhere

---

## Layout & spacing

- [ ] **SPACE-1** Apply consistent spacing scale (4, 8, 12, 16, 24, 32, 48, 64, 96px) across sections
- [ ] **SPACE-2** Hero: more whitespace above/below logo block (Montmartre feel)
- [ ] **SPACE-3** Section padding: max-w-7xl + px-6, py-16 md:py-24 for major sections
- [ ] **SPACE-4** Card grid gaps: 1.5rem (gap-6) or 2rem (gap-8) consistently
- [ ] **SPACE-5** Footer: vertical rhythm and link spacing match Montmartre

---

## Navigation

- [x] **NAV-1** Nav links: letter-spacing (tracking-wide), uppercase, duration-200 transitions
- [x] **NAV-2** Underline: red, width transition 200ms
- [ ] **NAV-3** Mobile menu: same typography and spacing as desktop
- [ ] **NAV-4** Active route: subtle indicator (e.g. current page bold or underline)
- [ ] **NAV-5** Focus-visible: clear focus ring (red) for keyboard nav

---

## Hero & CTAs

- [x] **HERO-1** Date + venue: one-line block with separator (Montmartre)
- [x] **HERO-2** Tagline: large, font-light, leading-tight
- [ ] **HERO-3** Optional: very large statement headline with line-break (e.g. “Ce qui nous relie” on two lines)
- [x] **CTA-1** Primary button: solid red, pill shape, clear hierarchy
- [x] **CTA-2** Secondary: white fill or outline (Montmartre-style)
- [ ] **CTA-3** Button hover: slight scale (1.02) + shadow for premium feel
- [ ] **CTA-4** All CTAs use same border-radius (e.g. rounded-full) and padding scale

---

## Cards & sections

- [x] **CARD-1** Card hover: subtle scale (1.01) + translateY(-4px) + shadow
- [ ] **CARD-2** Section headings: weight 700, tracking-tight, consistent size (e.g. text-2xl md:text-3xl)
- [ ] **CARD-3** Glass panels: consistent border (white/10), blur, padding
- [ ] **CARD-4** Countdown blocks: same card style as rest of site

---

## Accessibility & polish

- [x] **A11Y-1** prefers-reduced-motion: reduce/disable animations
- [ ] **A11Y-2** Focus-visible styles on all interactive elements (red ring)
- [ ] **A11Y-3** Ensure contrast ratios (white on black, red on black) meet WCAG AA
- [ ] **A11Y-4** Skip link “Aller au contenu” for keyboard users
- [ ] **A11Y-5** lang="fr" on html (already set in layout)

---

## Footer

- [x] **FOOT-1** IMT size matches logo
- [ ] **FOOT-2** Link list: spacing (gap-4), hover state, optional separator
- [ ] **FOOT-3** Typography: same Inter, caption size for legal/copyright
- [ ] **FOOT-4** Red top border 1px (already done)

---

## Other pages (About, Team, Speakers, Partners, Contact, Practical info)

- [ ] **PAGE-1** All h1: same style (size, weight, letter-spacing)
- [ ] **PAGE-2** All “Retour” links: same style (white/80, hover white)
- [ ] **PAGE-3** Section cards: glass + border-white/10 + card-hover
- [ ] **PAGE-4** Replace any remaining gray-* with white/80 or white/70 for consistency
- [ ] **PAGE-5** Forms (Contact): labels, inputs, buttons use design tokens (red focus, white/5 bg)

---

## Performance & technical

- [ ] **PERF-1** Ensure Inter only loads weights 400, 500, 600, 700 (already in layout)
- [ ] **PERF-2** Images: priority on hero logos, lazy below fold
- [ ] **TECH-1** Optional: add a design tokens file (e.g. tailwind theme extend) for --ted-red, spacing, type scale

---

## “World-class” extras (stretch)

- [ ] **EXTRA-1** Subtle scroll-triggered fade-in for sections (if not reduced-motion)
- [ ] **EXTRA-2** Micro-interaction on CTA click (e.g. brief scale-down then up)
- [ ] **EXTRA-3** Optional: custom cursor or hover states on key elements (if on brand)
- [ ] **EXTRA-4** 404 page styled like rest of site (Montmartre + Inter + red)
- [ ] **EXTRA-5** Meta tags / OG image for social sharing (Montmartre-style visual)

---

*Last updated: with Inter font, IMT sizing (nav/hero/footer/partners), typography scale, reduced motion, nav/CTA/card polish, and date/venue one-line block.*
