# Design System: ComputeBay

> **Source of Truth** — This document captures every design decision, token, and visual rule for the ComputeBay frontend. Use it to prompt AI tools or onboard contributors so that any new screen matches the existing design language perfectly.

---

## Table of Contents

1. [Visual Theme & Atmosphere](#1-visual-theme--atmosphere)
2. [Color Palette & Roles](#2-color-palette--roles)
3. [Typography Rules](#3-typography-rules)
4. [Background & Spatial Layers](#4-background--spatial-layers)
5. [Geometry & Shape Language](#5-geometry--shape-language)
6. [Depth, Elevation & Shadow](#6-depth-elevation--shadow)
7. [Component Stylings](#7-component-stylings)
8. [Iconography](#8-iconography)
9. [Animation & Motion](#9-animation--motion)
10. [Layout Principles & Spacing](#10-layout-principles--spacing)
11. [Responsive Breakpoints](#11-responsive-breakpoints)
12. [Micro-Copy & Voice](#12-micro-copy--voice)
13. [Page-by-Page Design Notes](#13-page-by-page-design-notes)
14. [Terminal Syntax Highlighting Palette](#14-terminal-syntax-highlighting-palette)
15. [Design Tokens Reference](#15-design-tokens-reference)

---

## 1. Visual Theme & Atmosphere

**Aesthetic archetype:** Industrial Cyber-Terminal — a dark, tightly-compressed, monochrome-dominant interface punctuated by glowing Emerald-green signal accents. The overall mood is "deep-space ops console" — serious, utilitarian, and quietly thrilling.

**Key descriptors:**
- **Dense & high-information** — layouts pack meaningful content close together, with very little decorative whitespace
- **Operational** — the UI feels like it is always "running", with live status indicators, blinking cursors, and animated particles
- **Industrial** — razor-sharp edges everywhere; no friendly rounded corners on primary elements
- **Monochromatic foundation** — the entire canvas is black-to-near-black with trace-level grid lines, creating a blueprint-paper depth
- **Emerald as signal** — green is used exclusively for "alive / operational / positive" states, making it highly meaningful when it appears

**Tone of the product:** A compute marketplace for developers. The UI communicates precision, reliability, and technical credibility — never playful or decorative.

---

## 2. Color Palette & Roles

### Primary Palette

| Descriptive Name | Hex | Tailwind Token | Functional Role |
|---|---|---|---|
| **Void Black** | `#000000` | `black` | Base background for the entire app shell, nav, and footer |
| **Near-Black Abyss** | `#050505` | `bg-[#050505]` | Card bodies, elevated surfaces inside sections |
| **Obsidian Surface** | `#080808` | `bg-[#080808]` | Secondary card backgrounds, feature panels |
| **Deep Midnight Ink** | `#030303` | `bg-[#030303]` | Section background overlays with 50% opacity |
| **Cosmic Body Background** | `radial-gradient(circle at top, #151c3b 0, #050715 55%, #02030a 100%)` | — | Global `body` background — a subtle deep indigo bloom fades to pure black |

### Accent Palette

| Descriptive Name | Hex | Tailwind Token | Functional Role |
|---|---|---|---|
| **Operational Emerald** | `#10b981` | `emerald-500` | Primary accent: particle color, active borders, CTA backgrounds, status "alive" indicators, selection highlight |
| **Soft Emerald Glow** | `#34d399` | `emerald-400` | Hover state for Emerald elements; softer glow tint on interactive hover |
| **Deep Forest Signal** | `#064e3b` | `emerald-900` | Dark emerald used inside gradient borders and conic-gradient button borders |
| **Sky Blue Data Stream** | `#0ea5e9` | `sky-500` | Secondary accent: "Contributor" role, "Global Execution" track, status dot for sky-themed panels |
| **Faded Sky Highlight** | `#38bdf8` | `sky-400` | Sky hover states, terminal prompt username color |
| **Amber Warning Pulse** | `#f59e0b` | `amber-500` | Status badge: "Grid_Status: In_Progress" — signals an in-flight or beta state |
| **Soft Amber Alert** | `#fbbf24` | `amber-400` | Hover state for amber badge text |
| **Rose Error Signal** | `#f43f5e` | `rose-500` | Error states, section accent for "Today's cloud is broken" heading |

### Text Palette

| Descriptive Name | Hex | Tailwind Token | Functional Role |
|---|---|---|---|
| **Pure White** | `#ffffff` | `white` | Headlines, primary action labels, logo text |
| **Ash Gray Primary** | `#e5e7eb` | `gray-200` | Body `color` default set in CSS; general readable text |
| **Slate Secondary** | `#cbd5e1` | `slate-200` | App shell default text; subtitles |
| **Slate Muted** | `#94a3b8` | `slate-400` | Body copy, descriptions, paragraph text |
| **Slate Dim** | `#64748b` | `slate-500` | Label captions, micro-labels, de-emphasized text |
| **Slate Ghost** | `#475569` | `slate-600` | Footer text, deeply receded metadata |
| **Slate Whisper** | `#334155` | `slate-700` | Unselected form option borders |
| **Neutral Terminal** | `#a3a3a3` | `neutral-400` | Terminal output lines |
| **Neutral Prompt** | `#737373` | `neutral-500` | Terminal prompt `$` symbol |

### Semantic Token Palette (shadcn/ui oklch, Dark Mode)

These are used by shadcn UI components and defined in `src/index.css`:

| Token | oklch Value | Approximate Hex | Purpose |
|---|---|---|---|
| `--background` | `oklch(0.145 0 0)` | `#1a1a1a` | Shadcn component background |
| `--foreground` | `oklch(0.985 0 0)` | `#fafafa` | Shadcn component text |
| `--card` | `oklch(0.205 0 0)` | `#252525` | Card background |
| `--primary` | `oklch(0.922 0 0)` | `#e8e8e8` | Primary interactive component |
| `--muted` | `oklch(0.269 0 0)` | `#2e2e2e` | Muted surfaces |
| `--muted-foreground` | `oklch(0.708 0 0)` | `#808080` | Muted text |
| `--border` | `oklch(1 0 0 / 10%)` | `rgba(255,255,255,0.1)` | Default border color |
| `--input` | `oklch(1 0 0 / 15%)` | `rgba(255,255,255,0.15)` | Input field borders |
| `--destructive` | `oklch(0.704 0.191 22.216)` | `#f87171` | Error/destructive actions |

### Custom Brand Colors (Tailwind Config)

Defined in `tailwind.config.js` — available as utility classes:

| Class Name | Hex | Notes |
|---|---|---|
| `bg-cb-bg` | `#020617` | Deep navy-black — brand background token |
| `bg-cb-bg-elevated` | `#020617` | Same as `cb-bg` (identical values, vestigial) |
| `bg-cb-primary` | `#4f46e5` | Indigo — defined but not actively used in UI |
| `bg-cb-primary-soft` | `#6366f1` | Soft indigo — defined but not actively used in UI |

### Selection Color

Text selection is styled globally in `App.tsx`:
- **Selection background:** `#10b981` (Operational Emerald) — `selection:bg-emerald-500`
- **Selection text:** `#000000` (Void Black) — `selection:text-black`

---

## 3. Typography Rules

### Font Families

#### Sans-Serif Stack (UI Text)
```
system-ui → -apple-system → BlinkMacSystemFont → Inter → sans-serif
```
- **Used for:** General UI prose, hero subheadings, page description paragraphs
- **Loading method:** System font stack — no external font load required for `system-ui`; `Inter` is the intended brand-aligned fallback but is loaded as a system font if available (not explicitly imported via CDN)
- **Character:** Neutral, clean, modern — subordinate to the monospace voice

#### Monospace Stack (Brand Voice)
```
JetBrains Mono → ui-monospace → SFMono-Regular → Menlo → Monaco → Consolas → Liberation Mono → Courier New → monospace
```
- **Used for:** Navigation labels, status badges, section labels, CTA button text, form labels, terminal output, footer metadata — essentially the **dominant typographic voice** of the entire interface
- **Loading method:** Relies on system installation of JetBrains Mono (no web font import defined); degrades gracefully through the system monospace chain
- **Character:** Technical, precise, unapologetic — signals developer-facing infrastructure tooling

> **Design Rule:** Monospace is the *brand* font. Sans-serif is the *reading* font. When in doubt, default to monospace for interface labels and CTAs.

### Typographic Scale

| Role | Size (Mobile → Desktop) | Weight | Transform | Tracking | Font |
|---|---|---|---|---|---|
| **Hero H1** | `text-5xl` → `text-9xl` (`5rem → 9rem+`) | `font-black` (900) | `uppercase` | `tracking-tighter` | sans |
| **Page H1** (About, EarlyAccess) | `text-4xl sm:text-5xl lg:text-6xl` | `font-black` (900) | `uppercase` | `tracking-tighter` | sans |
| **Section H2** | `text-3xl sm:text-4xl` → `text-4xl sm:text-5xl` | `font-black` / `font-bold` (700–900) | `uppercase` | `tracking-tighter` | sans |
| **Section Label** (eyebrow) | `text-[10px] sm:text-[11px]` | `font-bold` (700) | `uppercase` | `tracking-[0.4em] – tracking-[0.5em]` | mono |
| **H3 Card Title** | `text-xl` | `font-black` (900) | `uppercase` | `tracking-tighter` | sans |
| **H4 Sub-title** | `text-base sm:text-lg` | `font-black` (900) | `uppercase italic` | `tracking-tighter` / `tracking-widest` | sans |
| **Body Copy** | `text-sm` → `text-base` | `font-normal` (400) | — | — | sans |
| **Mono Label / Caption** | `text-[9px] sm:text-[10px]` – `text-[11px]` | `font-bold` (700) | `uppercase` | `tracking-[0.2em] – tracking-[0.5em]` | mono |
| **Mono Body** | `text-xs` – `text-sm` | `font-normal` (400) | `uppercase` | `tracking-tight` | mono |
| **CTA Button Text** | `text-xs` – `text-sm` | `font-black` (900) | `uppercase` | `tracking-[0.15em] – tracking-[0.25em]` | mono |
| **Terminal Prompt/Code** | `text-xs sm:text-sm` | `font-normal` | — | — | mono |
| **Footer Meta** | `text-xs` | `font-mono` | `uppercase` | `tracking-widest` | mono |
| **Logo Text** | `text-xs sm:text-sm` | `font-black` (900) | `uppercase` | `tracking-tighter` | sans |
| **Logo Badge** | `text-[9px] sm:text-[10px]` | `font-black` (900) | — | — | sans |

### Line Height

| Context | Value | Class |
|---|---|---|
| Hero headlines | `0.85` | `leading-[0.85]` |
| Headings (general) | `1` | `leading-none` |
| Body text | `1.625` | `leading-relaxed` |
| Mono labels | `tight` | `leading-tight` |
| Card paragraphs | `relaxed` | `leading-relaxed` |

### Letter Spacing Reference

| Context | Value | Class |
|---|---|---|
| Hero / section headings | Negative (tight) | `tracking-tighter` |
| Card titles | Widest | `tracking-widest` |
| Nav labels | Very wide | `tracking-widest` |
| Eyebrow section labels | Extremely wide | `tracking-[0.4em]` – `tracking-[0.5em]` |
| Status badge micro-text | Wide | `tracking-[0.2em]` – `tracking-[0.3em]` |
| CTA button text | Medium-wide | `tracking-[0.15em]` – `tracking-[0.25em]` |
| Body copy | Default | `tracking-normal` |

### Italic Usage

Italic is used **intentionally** on key headings to create an editorial punch:
- Hero H1 variants (About page H1: `System Overview.`)
- H3 card titles in WorkloadCard
- Phase/track headings (`Phase 1: Today`, `Phase 2: Tomorrow`)
- Section H2s in About (`Two roles. One unified ledger.`)

---

## 4. Background & Spatial Layers

The design uses a disciplined four-layer background stack, creating a sense of deep space:

### Layer Stack (back to front)

```
Layer 0: CSS body radial-gradient
Layer 1: Fixed blueprint grid overlay (z-0, opacity 3%)
Layer 2: Fixed particle field (z-0)
Layer 3: Radial gradient mask over particles (z-0)
Layer 4: Page content (z-10)
Layer 5: TopNav (z-50)
```

### Layer 0 — Body Cosmic Gradient

```css
background: radial-gradient(circle at top, #151c3b 0, #050715 55%, #02030a 100%);
```

- A deep indigo aurora blooms from the top-center, fading through dark navy (`#050715`) to absolute black (`#02030a`)
- Applied globally on `body` in `index.css`
- Creates the sense of looking at a dark sky with a distant city-glow at the top

### Layer 1 — Blueprint Grid Overlay

Applied in `App.tsx` as a fixed full-viewport `div`:

```css
backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`
backgroundSize: '40px 40px'
opacity: 0.03 (opacity-[0.03])
```

- **Grid cell size:** 40px × 40px
- **Grid color:** Pure white at 3% opacity — essentially invisible except in very dark conditions
- **Effect:** Suggests technical blueprint paper; reinforces the "systems" aesthetic without cluttering
- `pointer-events-none` — non-interactive

### Layer 2 — Particle Field (SparklesCore)

Rendered by `SparklesCore` (wraps tsParticles `@tsparticles/slim`):

| Parameter | Home Page | About Page | EarlyAccess Page |
|---|---|---|---|
| `particleColor` | `#10b981` (Emerald) | `#10b981` (Emerald) | `#10b981` (Emerald) |
| `particleDensity` | `150` | `50` | `150` |
| `minSize` | `0.6` | `0.4` | `0.6` |
| `maxSize` | `1.4` | `1.0` | `1.4` |
| `speed` | `0.5` | `0.2` | `0.5` |
| `background` | `transparent` | `transparent` | `transparent` |
| Interactive mode | `bubble` (hover glow) | `bubble` (hover glow) | `bubble` (hover glow) |

- Particles are sub-pixel to 1.4px emerald dots — suggesting data flowing across the network
- About page uses half the density for a quieter, more documentation-like tone

### Layer 3 — Radial Gradient Mask over Particles

Applied over the particle layer to prevent the center of the viewport from being overwhelmed:

**Home page mask:**
```css
bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black)]
```
Particles appear only at the viewport edges; the center (content area) stays clear.

**EarlyAccess page mask:**
```css
bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]
```
Tighter mask — particles appear closer to the center.

---

## 5. Geometry & Shape Language

### Core Rule: Sharp, Industrial Corners

**Primary design elements have 0px border-radius.** This is an explicit, intentional statement:
- Cards (`WorkloadCard`, feature panels, form container) — **square-edged, no rounding**
- CTA buttons (`ShinyButton`, submit button on EarlyAccess) — **sharp corners** (`border-radius: 0px`)
- `ThemedGlassButton` — **sharp corners** (`border-radius: 0px` in CSS)
- Status badges, icon containers — **square frames**
- Input fields — **square-edged**
- Logo "CB" box — **square** (`h-6 w-6`, no `rounded-*`)

> **Metaphor:** Printed circuit boards, server racks, military HUD displays — precision-machined, no soft edges.

### Rounded Exceptions

Rounded corners appear **only** in non-brand contexts:
- `Terminal` component (shadcn-style, not core to brand): `rounded-lg` on the outer frame
- Status indicator dots: `rounded-full` (circular blip dots)
- Particle hover bubble: circular
- Scrollbar thumb: `border-radius: 9999px` (pill)
- Ping animation rings on the status badge: `rounded-full`

### Border Usage

Borders are consistently low-opacity white, establishing spatial separation without visual noise:

| Opacity | Class | Context |
|---|---|---|
| 2% | `border-white/[0.02]` | Innermost grid lines inside WorkloadCard |
| 5% | `border-white/5` | Section dividers, primary card borders, step cards |
| 10% | `border-white/10` | Nav border-bottom, footer border-top, stronger separation |
| 20% | `border-emerald-500/20` | Emerald icon container borders (at rest) |
| 30% | `border-emerald-500/30` | Hero status badge border, emerald card hover targets |
| 40% | `border-emerald-500/40` | EarlyAccess badge border, success state container |
| 50% | `border-emerald-500/50` | Developer card hover `border-emerald-500/50` |
| Solid | `border-emerald-400` | Primary form submit button, selected role toggle |

### Left Accent Bars

Used as section-level visual anchors:

- `border-l-2 border-emerald-500` + `pl-3 sm:pl-4` — Orchestration Engine section heading (About)
- `border-l-2 border-rose-500` + `pl-3 sm:pl-4` — "Today's cloud is broken" (Home)
- `h-1 bg-emerald-500 w-8 sm:w-12` — Submitter track divider (About)
- `h-1 bg-sky-500 w-8 sm:w-12` — Contributor track divider (About)
- `h-[1px] w-6 sm:w-8 bg-emerald-500/50` — Vision section label rule (Home)

---

## 6. Depth, Elevation & Shadow

### Philosophy

The design is mostly **flat** — it avoids realistic drop shadows. Depth is communicated through:
1. Background color differentials (near-black variations)
2. Semi-transparent borders
3. Glow effects (not shadows) on interactive elements
4. Frosted glass (`backdrop-blur`) on the nav

### Glow Effects (The Primary Depth Tool)

**ThemedGlassButton** uses multi-layer inset glows:

```css
/* Rest state */
box-shadow:
  inset 0 0.125em 0.125em rgba(0, 0, 0, 0.4),       /* top shadow inset */
  inset 0 -0.125em 0.125em rgba(16, 185, 129, 0.3),  /* bottom emerald inset glow */
  0 0.25em 0.125em -0.125em rgba(0, 0, 0, 0.5),      /* subtle drop */
  0 0 0.1em 0.25em rgba(16, 185, 129, 0.1) inset;    /* ambient emerald bloom */

/* Hover state — intensified */
inset 0 -0.125em 0.125em rgba(16, 185, 129, 0.5),
0 0 0.05em 0.1em rgba(16, 185, 129, 0.4) inset;
```

**ShinyButton** hover glow:
```css
box-shadow: 0 0 1.5rem 2px rgba(16, 185, 129, 0.2); /* emerald glow bloom */
```

**Icon containers (hover):**
```css
shadow-[0_0_15px_rgba(16,185,129,0.1)]   /* Emerald glow */
shadow-[0_0_15px_rgba(14,165,233,0.1)]   /* Sky glow */
```

**WorkloadCard ray hover effect:**
```css
blur-[40px] opacity-20 w-[240px] h-[80px] rotate-[35deg]
/* A blurred colored ellipse that fades in on hover — simulates a light ray */
```

**WorkloadCard moving dot glow:**
```css
boxShadow: `0 0 10px ${accentColor}` /* tiny point glow matching card accent */
```

### Glassmorphism (Frosted Glass)

Used sparingly, only on surfaces overlapping the particle background:

| Element | Glass Properties |
|---|---|
| `TopNav` | `bg-black/80 backdrop-blur-md` |
| Mobile menu | `bg-black/95 backdrop-blur-md` |
| `ThemedGlassButton` | `backdrop-filter: blur(4px)` |
| EarlyAccess form container | `bg-[#050505]/80 backdrop-blur-md` |
| About manifesto cards | `bg-[#050505]/50 backdrop-blur-sm` |

### Terminal Component Shadow

The `Terminal` component (shadcn-style) uses a traditional box-shadow:
```css
shadow-2xl /* Tailwind: large diffused drop shadow */
```

---

## 7. Component Stylings

### TopNav

```
Position:     sticky, top-0, z-50
Background:   bg-black/80 (black at 80% opacity)
Blur:         backdrop-blur-md
Border:       border-b border-white/10
Padding:      px-4 sm:px-8 lg:px-12 xl:px-16, py-4

Logo Mark:
  Shape:      square, h-6 w-6 sm:h-7 sm:w-7
  Background: bg-emerald-500
  Pulse aura: absolute, bg-emerald-500, animate-pulse, blur-sm, opacity-50
  Text:       "CB", text-[9px] sm:text-[10px], font-black, text-black

Logo Wordmark:
  Text:       "Computebay"
  Style:      text-xs sm:text-sm, font-black, tracking-tighter, text-white, uppercase

Nav Links (desktop):
  Font:       font-mono, text-[11px], uppercase, tracking-widest, text-slate-400
  Hover:      text-emerald-400, transition-colors

Mobile Hamburger Icon:
  Icon:       lucide Menu / X (20px)
  Color:      text-slate-400 → hover:text-emerald-400
```

### ShinyButton (Hero Primary CTA)

```
Shape:        Sharp corners (border-radius: 0px)
Size:         padding: 1rem 2rem
Font:         ui-monospace, font-weight: 900, uppercase, letter-spacing: 0.2em, font-size: 0.75rem
Text color:   #ffffff
Background:   black with conic-gradient border:
              linear-gradient(#000, #000) padding-box +
              conic-gradient(from --gradient-angle, transparent → #064e3b → #10b981 → #064e3b → transparent) border-box
Border:       1px solid transparent (uses gradient-box technique)
Inner shadow: inset 0 0 0 1px #111

Animation:
  - --gradient-angle spins 360° continuously via @keyframes border-spin (3s linear infinite)
  - Inner dot-grid pattern masked with the same conic-gradient (opacity: 0.2)
  - Hover glow: box-shadow 0 0 1.5rem 2px rgba(16,185,129,0.2) fades in (opacity 0→1, 500ms)
  - Active: translateY(1px)

Dot-grid overlay (::before):
  Radial dot pattern: circle at 2px 2px, #10b981 0.5px, transparent 0
  Grid size: 6px × 6px
  Masked with conic-gradient + 45deg offset
```

### ThemedGlassButton (Nav CTA, Secondary CTAs)

```
Shape:        Sharp corners (border-radius: 0px)
Background:   black + emerald-tinted linear gradient:
              linear-gradient(-75deg, rgba(16,185,129,0.05), rgba(16,185,129,0.15), rgba(16,185,129,0.05))
              background-color: #000
Glass effect: backdrop-filter: blur(4px)

Text:
  Font:       ui-monospace, font-weight: 700, uppercase, letter-spacing: 0.15em
  Color:      #10b981 (Emerald-500) at rest
  Hover:      #34d399 (Emerald-400)
  Glow:       text-shadow 0 0 8px rgba(16,185,129,0.4) → 0 0 12px rgba(16,185,129,0.6) on hover
  Padding:    px-8 py-3.5

Conic border (::after):
  Pattern: conic-gradient(from --angle-1, #064e3b → transparent → #10b981 → transparent → #064e3b)
  mask-composite: exclude (shows only the 1px border path)
  Hover: --angle-1 transitions from -75deg to -125deg (500ms ease)

Inner shine (div.button-shine-themed):
  linear-gradient(--angle-2, transparent → rgba(16,185,129,0.2) → transparent)
  mix-blend-mode: screen
  Hover: background-position shifts from 0% 50% to 25% 50%

Hover: scale(0.98), darker background (#050505)
Active: scale(0.96) rotate3d(1, 0, 0, 15deg) — subtle 3D press

Transition: all 400ms cubic-bezier(0.25, 1, 0.5, 1)
```

### WorkloadCard

```
Outer wrapper: rounded-none, overflow-hidden, p-[1px]

Gradient border glow (absolute, ::before sibling):
  radial-gradient(circle at 0% 0%, accentColor, transparent)
  opacity: 0.2 → 1 on group-hover (500ms)

Moving dot animation:
  4px × 4px square circle, absolute, z-20
  backgroundColor + boxShadow: 0 0 10px accentColor
  @keyframes moveDot: traces card perimeter (0% → 25% → 50% → 75% → 100%) in 6s linear infinite

Card body: bg-[#050505], p-8, border border-white/5 → border-white/10 on hover
  - No border-radius (sharp corners throughout)

Ray effect (::hover overlay):
  blur-[40px], w-[240px] h-[80px], rotate-[35deg]
  colored by accentColor + boxShadow: 0 0 60px accentColor
  opacity: 0 → 0.20 on hover

Icon container:
  h-12 w-12, inline-flex, items-center, justify-center
  bg-{colorClass}-500/10, border border-{colorClass}-500/30 (square, no rounding)

Title: text-xl, font-black, uppercase, tracking-tighter, italic, text-white
Body: text-xs, font-mono, leading-relaxed, text-slate-500 → slate-400 on hover

Industrial grid lines (absolute):
  Horizontal: top-4, left-0, w-full, h-[1px], bg-white/[0.02]
  Vertical:   top-0, left-4, w-[1px], h-full, bg-white/[0.02]
```

### StepCard (About Page)

```
Background: bg-[#080808]
Border:     border border-white/5 → border-emerald-500/20 on hover
Padding:    p-6
Spacing:    space-y-4
Transition: hover:border-emerald-500/20, transition-all

Number label: font-mono, text-[10px], text-emerald-500, tracking-[0.3em], font-bold
Title:        text-xs, font-black, text-white, uppercase, italic
Step index:   text-emerald-500/30, font-mono, text-[10px] — "[1]", "[2]", "[3]"
Step text:    text-[10px], font-mono, text-slate-500 → slate-300 on group-hover, uppercase, leading-tight
```

### Feature Card (About Manifesto)

```
Background: bg-[#050505]/50, backdrop-blur-sm
Border:     border border-white/5
Padding:    p-4 sm:p-6
Icon:       size={16}, text-emerald-500, mb-3 sm:mb-4
Title:      text-xs, font-bold, text-white, uppercase, mb-1 sm:mb-2
Body:       text-[9px] sm:text-[10px], text-slate-500, leading-relaxed, uppercase
```

### Meet ComputeBay / Dual Panel Cards (Home)

```
Container:  border border-white/10, bg-[#080808], p-8 sm:p-12
            hover:bg-[#0A0A0A], hover:border-{color}/50, transition-all

Icon frame: h-12 sm:h-14 × w-12 sm:w-14
            bg-{color}/10, border border-{color}/20
            shadow-[0_0_15px_rgba({r},{g},{b},0.1)] on hover panels

Eyebrow:    font-mono, text-[10px] sm:text-xs, font-bold, uppercase, tracking-[0.3em], text-{color}
H2:         text-3xl sm:text-4xl, font-bold, uppercase, tracking-tighter, text-white, leading-none
Body:       text-sm sm:text-base, leading-relaxed, text-slate-400

Feature list items:
  bg-white/5, p-2 sm:p-3, border border-white/5
  font-mono, text-[10px] sm:text-[11px], uppercase, tracking-tight, text-slate-300
  Icon: size={12} sm, text-{color}
```

### Execution Flow Step Cards (Home)

```
Background:   bg-[#050505], p-8
Border:       border-white/5 → border-emerald-500/30 on hover
Transition:   transition-all duration-500

Blip flash (framer-motion):
  absolute, inset-0, bg-emerald-500/10
  animate: opacity [0→1→0], scale [0.9→1.05→1], duration: 0.8s, delay: i × 0.4s

Background number:
  absolute, top-6 left-8
  font-mono, text-5xl, font-black, text-white/[0.03] → text-emerald-500/10 on hover

Progress bar:
  h-1, bg-emerald-500, mb-6
  animates width: 0% → 3rem (on scroll into view, delay: i × 0.4s)
  hover: width transitions to full (w-full, duration-300)

Title:  font-bold, uppercase, tracking-widest, text-white, text-sm
Body:   text-xs, leading-relaxed, text-slate-500 → slate-300 on hover

Status indicator dot (framer-motion):
  h-1.5 w-1.5, rounded-full
  backgroundColor animates: #334155 → #10b981 → #334155
  1.5s duration, repeatDelay: 2s, infinite

Connecting wire: absolute, top-1/2, w-full, h-px, bg-white/[0.02], hidden md:block
```

### EarlyAccess Form Container

```
Container:    border border-white/10, bg-[#050505]/80, backdrop-blur-md
              p-8, shadow-2xl, relative, overflow-hidden

Scanline overlay (ambient noise):
  position: absolute, inset-0, z-20, pointer-events-none
  background: linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%),
              linear-gradient(90deg, rgba(255,0,0,0.02), rgba(0,255,0,0.01), rgba(0,0,255,0.02))
  bg-size: 100% 2px, 3px 100%
  Creates subtle scanline + RGB fringe effect — evokes a CRT monitor

Header icon frame:
  h-9 w-9, bg-emerald-500/10, border border-emerald-500/40
  Icon: Terminal, size={20}, text-emerald-400

Form labels: font-mono, text-[10px], uppercase, tracking-[0.3em], text-slate-500

Input fields:
  border border-slate-700 (rest)
  bg-black/60
  px-3 py-2
  text-sm, text-slate-100
  focus: border-emerald-400 + ring-1 ring-emerald-400/20
  No border-radius (sharp edges)

Role toggles (3 buttons):
  Default: border-slate-800, bg-black/40, text-slate-500
           hover: border-slate-600
  Active:  border-emerald-400, bg-emerald-500/10, text-emerald-300
  Font:    font-mono, uppercase, tracking-[0.15em], text-[11px]
  No border-radius

Submit button:
  Full width, border border-emerald-400, bg-emerald-500
  px-4 py-3, text-xs, font-black, uppercase, tracking-[0.25em], text-black
  hover: bg-emerald-400
  disabled: opacity-50
  No border-radius

Error state:
  border border-rose-500/60, bg-rose-500/10
  px-3 py-2, text-[10px], font-mono, text-rose-300
  animate-pulse

Success state (submitted):
  animate-in fade-in zoom-in duration-500
  Icon frame: h-16 w-16, bg-emerald-500/20, border border-emerald-500
  Icon: ShieldCheck, size={40}, text-emerald-400
  Title: text-xl, font-mono, uppercase, tracking-widest, text-emerald-400
  Body: text-xs, font-mono, text-slate-400, max-w-xs
```

### WaitlistForm (Inline Variant)

```
Input:
  border border-slate-700, bg-black/60
  px-4 py-3, text-sm, text-slate-100, font-mono
  focus: border-emerald-400 + ring-1 ring-emerald-400/20
  No border-radius

Submit button (absolute right inset):
  px-6, bg-emerald-500, text-black
  font-black, uppercase, text-xs, tracking-widest
  hover: bg-emerald-400
  Icon: ArrowRight (size 14) — group-hover:translate-x-1 transition

Error: absolute, top-full, mt-2, text-[10px], font-mono, text-rose-400

Success state:
  border border-emerald-500/40, bg-emerald-500/10
  animate-[pulse_2s_ease-in-out_infinite]
  Icon: ShieldCheck (size 20), text-emerald-400
  Text: text-sm, font-mono, text-emerald-400
```

### Terminal Component (Interactive)

```
Outer frame:
  overflow-hidden, rounded-lg
  border border-neutral-800
  bg-neutral-900
  shadow-2xl
  max-w-3xl, font-mono, text-xs sm:text-sm

Title bar:
  bg-neutral-800, px-4 py-3
  Traffic lights: red (#ef4444), yellow (#eab308), green (#22c55e) — h-3 w-3, rounded-full
  Tab label: text-sm, text-neutral-400, centered

Content area:
  h-[400px], overflow-y-auto
  p-6, font-mono
  custom scrollbar class: terminal-scrollbar (6px wide, white/15 thumb)

Prompt format:
  username → sky-500
  colon separator → emerald-600
  tilde (~) → sky-400
  dollar sign ($) → neutral-500

Cursor block: h-[1.15em] × w-[0.55em], bg-neutral-300, inline-block
  Typing: solid block follows text
  Idle:   blinks via setCursorVisible toggle (530ms interval)

Output lines: text-neutral-400, leading-relaxed, mb-1
  animate-in fade-in slide-in-from-bottom-1 duration-200

Typing speed: 55ms per character (configurable)
Between commands delay: 800ms (configurable)
```

### Footer

```
Position:     relative z-10
Background:   bg-black, border-t border-white/5
Padding:      py-12 sm:py-16, px-4 sm:px-6, max-w-7xl

Brand block:
  Name: text-base sm:text-lg, font-black, uppercase, tracking-tighter, text-white
  Meta: "Systems_Global // v1.0.4", text-xs, font-mono, text-slate-600, uppercase, tracking-widest, mt-1

Status indicator:
  Emerald pulse dot: h-1 w-1 sm:h-1.5 sm:w-1.5, rounded-full, bg-emerald-500, animate-pulse
  Label: "Network_Operational", font-mono, text-[9px] sm:text-[10px], uppercase, tracking-widest, text-slate-500

Links:
  "Twitter", "Discord"
  font-mono, text-[9px] sm:text-[10px], uppercase, tracking-widest, text-slate-500
  hover:text-white, transition-colors
```

---

## 8. Iconography

All icons come from **lucide-react** (`^0.562.0`).

### Icon Sizing Convention

| Context | Size |
|---|---|
| Section icons (feature cards, About) | `size={16}` |
| Dual panel icons (Meet ComputeBay) | `size={24}`, sm: `w-7 h-7` |
| Role track icons (Phase cards, Home) | `size={20}`, sm: `w-6 h-6` |
| Nav hamburger / close | `size={20}` |
| CTA button icons (WaitlistForm ArrowRight) | `size={14}` |
| Success state shield | `size={40}` |
| About System Integrity Activity | `size={14}` sm: `w-4 h-4` |
| Back button arrow | `size={12}` sm: `w-4 h-4` |
| EarlyAccess badge Rocket | `size={14}` |
| Terminal frame header icon | `size={20}` |

### Icon Color System

| Icon Color | Context |
|---|---|
| `text-emerald-500` | Primary actions, Developers track, operational features |
| `text-emerald-400` | Hover, EarlyAccess form terminal icon |
| `text-sky-400` / `text-sky-500` | Contributors track, Global Execution panel |
| `text-amber-400` / `text-amber-500` | Warning / "In_Progress" status |
| `text-rose-500` | Error state indicator (EarlyAccess error block) |
| `text-slate-400` | Neutral UI chrome (nav hamburger) |
| `text-neutral-400` | Terminal prompt chrome |

### Icons Used

| Icon | Page / Component | Purpose |
|---|---|---|
| `Cpu` | Home (import, unused in render) | — |
| `Globe` | Home, About | Global Execution panel, API Gateway |
| `Zap` | Home, About | API First feature, Credit Ledger |
| `Terminal` | Home, EarlyAccess | Developer panel, form header |
| `Shield` | Home, About | Container Isolation, Secure Sandboxing |
| `Activity` | Home, About | Event Driven, System Integrity header |
| `BarChart3` | Home | Rising Cloud Costs card, Built For Devs |
| `Server` | Home | Operational Burden card |
| `Layers` | Home, About | Distributed Architecture, Job/Scheduler service |
| `User` | Home (import) | — |
| `WalletCards` | Home (import) | — |
| `Gauge` | About | Global Idle Compute feature |
| `Lock` | About | Fault Tolerance feature |
| `Box` | About | Worker Agents service |
| `Shield` | About | Secure Sandboxing |
| `ArrowLeft` | About, EarlyAccess | Back navigation button |
| `ArrowRight` | WaitlistForm | Submit button trailing icon |
| `ArrowRightLeft` | About (import) | — |
| `Rocket` | EarlyAccess | "Early console access" badge |
| `ShieldCheck` | EarlyAccess, WaitlistForm | Success confirmation state |
| `Mail` | EarlyAccess (import) | — |
| `Menu` / `X` | TopNav | Mobile hamburger open/close |

---

## 9. Animation & Motion

### Framer Motion (`framer-motion ^12.24.8`)

#### Hero Section Entrance

Applied to the two hero columns (`motion.div`):

```js
// Left column (headline + CTA)
initial: { opacity: 0, x: -20 }
animate: { opacity: 1, x: 0 }
// transition: default (0.3s ease-out)

// Right column (terminal demo)
initial: { opacity: 0, scale: 0.98 }
animate: { opacity: 1, scale: 1 }
```

#### Execution Flow — Staggered Card Reveal

```js
// Parent container
variants: {
  animate: {
    transition: { staggerChildren: 0.4 }
  }
}
whileInView="animate"
viewport={{ once: true, margin: "-100px" }}

// Each child card
initial: { opacity: 0, y: 20 }
animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
```

#### Blip Flash Effect (Execution Flow)

```js
variants: {
  animate: {
    opacity: [0, 1, 0],
    scale: [0.9, 1.05, 1],
    transition: { delay: i * 0.4, duration: 0.8 }
  }
}
// className: absolute inset-0 bg-emerald-500/10
```

#### Progress Bar (Execution Flow)

```js
initial: { width: "0%" }
whileInView: { width: "3rem" }
transition: { delay: i * 0.4, duration: 0.5 }
// hover: w-full via Tailwind transition-all duration-300
```

#### Status Indicator Pulse (Execution Flow)

```js
animate: {
  backgroundColor: ["#334155", "#10b981", "#334155"]
}
transition: {
  delay: i * 0.4,
  duration: 1.5,
  repeat: Infinity,
  repeatDelay: 2
}
```

#### Particle Fade-In (SparklesCore)

```js
// useAnimation()
controls.start({ opacity: 1 })
// on particle engine initialization
```

### CSS Animations

#### `@keyframes border-spin` (ShinyButton)

```css
@keyframes border-spin {
  to { --gradient-angle: 360deg; }
}
animation: border-spin 3s linear infinite;
```
Rotates the conic-gradient border continuously, creating a "electric current" effect.

#### `@keyframes moveDot` (WorkloadCard)

```css
@keyframes moveDot {
  0%, 100% { top: 0%; left: 0%; }       /* top-left corner */
  25%       { top: 0%; left: calc(100% - 4px); }  /* top-right */
  50%       { top: calc(100% - 4px); left: calc(100% - 4px); }  /* bottom-right */
  75%       { top: calc(100% - 4px); left: 0%; }  /* bottom-left */
}
animation-duration: 6s linear infinite;
```
A 4px dot traces the perimeter of the card continuously.

#### ThemedGlassButton CSS Property Animations

```css
@property --angle-1 {
  syntax: "<angle>";
  inherits: false;
  initial-value: -75deg;
}
/* On hover: transitions to -125deg (500ms ease) */

@property --angle-2 {
  syntax: "<angle>";
  inherits: false;
  initial-value: -45deg;
}
/* Controls inner shine gradient direction */
```

#### Logo Pulse Aura

```css
.animate-pulse  /* Tailwind built-in: opacity 1 → 0.5 → 1 over 2s */
blur-sm, opacity-50
/* Creates a soft breathing glow behind the "CB" logo mark */
```

#### Status Badge Ping

```css
.animate-ping   /* Tailwind: scale 1 → 2, opacity 1 → 0, over 1s, infinite */
/* Applied to the outer ring of the amber "Grid_Status" dot */
```

#### Footer Status Dot

```css
.animate-pulse  /* Same as above — emerald dot pulses to signal "alive" */
```

#### Terminal Cursor Blink

```js
setInterval(() => setCursorVisible(v => !v), 530)
// opacity: 1 → 0, 530ms toggle — slightly irregular to feel natural
```

#### Terminal Line Entry

```css
animate-in fade-in slide-in-from-bottom-1 duration-200
/* Each new terminal line fades in and slides up 1px from below */
```

#### EarlyAccess Success State

```css
animate-in fade-in zoom-in duration-500
/* Success panel fades in and scales up simultaneously */
```

#### WaitlistForm Success Pulse

```css
animate-[pulse_2s_ease-in-out_infinite]
/* The success badge breathes continuously */
```

### Lenis Smooth Scroll (`@studio-freight/lenis ^1.0.42`)

```js
{
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  // Exponential ease-out: snappy start, long gentle coast to a stop
}
// requestAnimationFrame loop drives tick updates
```

Applied globally via `SmoothScroll` wrapper around the entire app.

---

## 10. Layout Principles & Spacing

### Container Strategy

All pages use a consistent max-width + horizontal padding:

| Context | Max Width | Horizontal Padding |
|---|---|---|
| `App.tsx` main | `w-full` (no max-w constraint at main level) | `px-4 sm:px-8 lg:px-12 xl:px-16` |
| TopNav inner | `w-full` (fills nav width) | `px-4 sm:px-8 lg:px-12 xl:px-16` |
| Footer inner | `max-w-7xl` | `px-4 sm:px-6` |
| About page | `max-w-7xl` | `px-4 sm:px-6` |
| EarlyAccess page | `max-w-7xl` | `px-4` |

### Grid Systems

| Section | Grid | Gap |
|---|---|---|
| Hero (Home) | `lg:grid-cols-[1.2fr_1fr]` | `gap-12 sm:gap-16` |
| EarlyAccess layout | `lg:grid-cols-[1.1fr_1fr]` | `gap-12` |
| Vision section (Home) | `lg:grid-cols-[1fr_2fr]` | `gap-12 sm:gap-16` |
| Meet ComputeBay (Home) | `md:grid-cols-2` | `gap-8 sm:gap-1` |
| Use Cases / WorkloadCards | `sm:grid-cols-2 lg:grid-cols-3` | `gap-4 sm:gap-6` |
| Execution Flow steps | `sm:grid-cols-2 lg:grid-cols-4` | `gap-4 sm:gap-6` |
| Role tracks (Phase cards) | `lg:grid-cols-2` (inner) | `gap-6 sm:gap-8` |
| About manifesto features | `sm:grid-cols-2 lg:grid-cols-3` | `gap-3 sm:gap-4` |
| About orchestration services | `sm:grid-cols-2 lg:grid-cols-4` | `gap-4 sm:gap-6` |
| About integrity checks | `md:grid-cols-3` | `gap-6 sm:gap-8` |
| StepCard columns | single column | `gap-3 sm:gap-4` |

### Section Spacing

All sections use margin-bottom for vertical rhythm:

| Pattern | Value |
|---|---|
| Major section mb | `mb-20 sm:mb-24` |
| Sub-section mb | `mb-8 sm:mb-10`, `mb-16 sm:mb-20` |
| Section padding (with border) | `py-20 sm:py-24` |
| Page top padding | `pt-12 sm:pt-16` |
| Page bottom padding | `pb-20 sm:pb-32`, `pb-32` |
| About page container | `py-16 sm:py-20` |
| EarlyAccess container | `py-16 sm:py-20` |

### Whitespace Philosophy

- **Dense, not cramped:** Content sections are separated by generous vertical space (80–96px), but within cards, spacing is tight and purposeful
- **No decorative empty space:** Every gap has a reason (separation of logical zones)
- **Information hierarchy through size, not whitespace:** Heading scale and text weight do the organizational work

---

## 11. Responsive Breakpoints

The design follows Tailwind's standard breakpoints:

| Prefix | Min-width | Behavior |
|---|---|---|
| (none) | `0px` | Mobile base styles |
| `sm:` | `640px` | Tablet portrait — larger text, expanded padding |
| `md:` | `768px` | Tablet landscape — 2-column grids appear |
| `lg:` | `1024px` | Desktop — 3–4 column grids, large hero text |
| `xl:` | `1280px` | Wide desktop — max nav padding |
| `2xl:` | `1536px` | Ultra-wide — hero text reaches 9xl |

### Mobile-Specific Design Notes

- Navigation collapses to hamburger (`Menu` icon) below `md:` breakpoint
- Mobile menu drops down below the nav bar with `bg-black/95 backdrop-blur-md`
- Hero H1 starts at `text-5xl` on mobile, scaling up through `text-9xl` at desktop
- Icon sizes step up at `sm:` breakpoint (e.g., `size={12}` → `w-4 h-4`)
- Card padding scales: `p-8` → `p-8 sm:p-12`

---

## 12. Micro-Copy & Voice

The UI copy follows a strict **technical terminal / operator voice**:

### Naming Conventions

- Systems and states use underscore_casing: `Grid_Status`, `System_Root`, `Network_Operational`, `Systems_Global`
- Version numbers: `v1.0.4`
- Process identifiers: `PROCESS_STAGE_01`, `PHASE_01`, `PHASE_02`
- Error messages: `IDENT_REQUIRED`, `TERMINAL_ERR`, `UPLINK_FAILURE`
- Section labels: `Protocol_Journeys`, `System_Workflow`, `Core_Infrastructure`, `Ecosystem_Expansion`

### UI Label Patterns

| Pattern | Example |
|---|---|
| Back navigation | `← System_Root`, `← Back to overview` |
| Status badge | `Grid_Status: In_Progress` |
| Form header meta | `System initialization` |
| CTA | `Request Authorization`, `Join Waitlist`, `Return to portal` |
| Loading state | `Transmitting...` |
| Success state | `Access Authenticated` |
| Error prefix | `> ERROR:` |
| Footer tagline | `Systems_Global // v1.0.4` |
| Footer status | `Network_Operational` |

### Copy Tone Rules

1. **Uppercase everything functional** — nav items, labels, badges, CTA text
2. **Sentence case for body copy** — descriptions and paragraphs read normally
3. **No punctuation on headings** unless intentional period (e.g., "System Overview.")
4. **Terminal metaphors** — "Transmitting", "Authorization", "Payload", "Uplink"
5. **No emojis, no decorative punctuation** — the UI is austere

---

## 13. Page-by-Page Design Notes

### Home (`/`)

**Hero Section:**
- Two-column layout: text left (1.2fr), terminal right (1fr)
- Status badge: amber (`#f59e0b`), `animate-ping` dot — signals beta state
- Hero H1 uses `<br />` line break for precise two-line composition
- `<span class="text-emerald-500">` highlights the key value word
- Sub-copy: `text-slate-400`, `max-w-xl` — constrained width for readability
- CTA: `WaitlistForm` (email input + submit) followed by mono meta text

**Use Cases Section:**
- Rose-accented section eyebrow ("Today's cloud is broken") — deliberately negative framing to create contrast before the pitch
- Three `WorkloadCard` instances: rose/amber/emerald accents matching different failure modes
- Each card has a moving perimeter dot animation

**Meet ComputeBay (Dual Panel):**
- Two side-by-side panels: Emerald (Developer) + Sky (Contributor)
- Emerald panel leads — Developers are the primary audience
- Feature lists use `bg-white/5` rows — subtle striping without color

**Execution Flow:**
- 3-step (not 4 as in earlier version) sequential card animation
- Ghost step numbers (`text-white/[0.03]`) in background of each card
- Animated progress bar leads the eye through the flow
- A horizontal `h-px bg-white/[0.02]` wire visually connects the cards (desktop only)

**Vision / Roles Section:**
- Sidebar (`1fr`) + main content (`2fr`) asymmetric layout
- Italic H3 in the sidebar for editorial weight
- Two phase tracks (Today / Tomorrow) with emerald/sky color coding

### EarlyAccess (`/earlyAccess`)

- Higher particle density (150) for more energetic feel — this is the conversion page
- Tighter mask (transparent 20%) — particles are more visible, more immersive
- Two-column: copy left (1.1fr), form right (1fr) — slightly left-heavy to give the pitch more visual weight
- Form container has the scanline/CRT overlay — makes the form feel like a console terminal
- Role selector uses 3 equal-width buttons in a `grid-cols-3` layout
- Role labels remapped: `developer` displays as `Submitter`

### About (`/about`)

- Sparser particles (density 50, speed 0.2) — quieter, documentation tone
- Three layers structure (01, 02, 03) with progressive depth
- Layer 01: Manifesto — 3 feature cards with emerald icons
- Layer 02: Protocol Journeys — emerald bar = submitter, sky bar = contributor (visual differentiation via color alone)
- Layer 03: Orchestration Engine — left-bordered section heading, 4-col service grid, integrity checks panel
- Footer inside the About page: centered, `WaitlistForm` embedded for in-page conversion

---

## 14. Terminal Syntax Highlighting Palette

Used by the `Terminal` component in `src/components/ui/terminal.tsx` for bash syntax coloring:

| Token Type | Color Class | Hex Approximate | Applies To |
|---|---|---|---|
| `command` | `text-emerald-400` | `#34d399` | First word in a command |
| `flag` | `text-sky-400` | `#38bdf8` | `--flag` or `-f` arguments |
| `string` | `text-amber-300` | `#fcd34d` | `"quoted"` or `'single-quoted'` strings |
| `number` | `text-purple-400` | `#c084fc` | Pure numeric values |
| `operator` | `text-red-400` | `#f87171` | `|`, `>`, `&`, `<` shell operators |
| `path` | `text-cyan-300` | `#67e8f9` | Paths with `/`, starts with `.` or `~` |
| `variable` | `text-pink-400` | `#f472b6` | `$VARIABLE` references |
| `comment` | `text-neutral-500` | `#737373` | `# comment` lines |
| `default` | `text-neutral-300` | `#d4d4d4` | Unclassified words |

**Prompt anatomy:**
```
username    → text-sky-500   (#0ea5e9)
:           → text-emerald-600 (#059669)
~           → text-sky-400   (#38bdf8)
$           → text-neutral-500 (#737373)
```

---

## 15. Design Tokens Reference

Quick-reference table of all design tokens used across the system:

### Spacing & Sizing

| Token | Value | Usage |
|---|---|---|
| Nav height | `py-4` (≈ 64px total with content) | TopNav vertical padding |
| Container max-width | `max-w-7xl` (`1280px`) | Footer, About, EarlyAccess |
| Logo mark | `h-6 w-6` (24px) / `sm:h-7 sm:w-7` (28px) | TopNav CB box |
| Icon container sm | `h-10 w-10` (40px) | Phase cards (mobile) |
| Icon container lg | `h-12 sm:h-14 w-12 sm:w-14` (48–56px) | Feature panels |
| Card padding | `p-6` – `p-8 sm:p-12` | Various cards |
| Grid gap | `gap-4 sm:gap-6` | Standard card grids |
| Section mb | `mb-20 sm:mb-24` | Major page sections |
| Section py | `py-20 sm:py-24` | Sections with top/bottom borders |
| Base border-radius | `0.625rem` (`--radius`) | shadcn component base (not used on brand elements) |
| Terminal height | `h-[400px]` | Terminal scrollable content area |

### Z-Index Stack

| Level | z-index | Element |
|---|---|---|
| Background layers | `z-0` | Grid overlay, particles, masks |
| Page content | `z-10` | Main content, section containers |
| Elevated content | `z-20` | Working dot on WorkloadCard |
| Glassmorphism surfaces | `z-30` | Scanline overlay, form content |
| Navigation | `z-50` | TopNav (sticky) |

### Transition Timing

| Duration | Usage |
|---|---|
| `200ms` | Terminal line fade-in |
| `300ms` | Hover state color transitions (nav, text links) |
| `400ms` | Button state transitions (ThemedGlassButton scale, glow) |
| `500ms` | WorkloadCard gradient glow, ray opacity, border color; ShinyButton glow; progress bar hover |
| `500ms cubic-bezier(0.25,1,0.5,1)` | ThemedGlassButton shine shift |
| `3s linear infinite` | ShinyButton border spin |
| `6s linear infinite` | WorkloadCard dot perimeter trace |
| `1.2s` | Lenis smooth scroll duration |
| `530ms` | Terminal cursor blink interval |

### Custom Scrollbar

| Property | Value |
|---|---|
| Default scrollbar | Hidden globally (`::-webkit-scrollbar { display: none }`) |
| Terminal scrollbar width | `6px` |
| Terminal scrollbar height | `6px` |
| Terminal thumb color | `rgba(255,255,255,0.15)` → `rgba(255,255,255,0.3)` on hover |
| Terminal thumb radius | `9999px` (pill) |
| Terminal track | `transparent` |

---

*Last updated: 2026-06-16 — Reflects the full codebase as of that date.*
