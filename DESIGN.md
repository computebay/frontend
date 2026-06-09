# ComputeBay Frontend — Design Document

## Table of Contents
1. [Overview](#1-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Architecture & App Shell](#4-architecture--app-shell)
5. [Routing & Pages](#5-routing--pages)
6. [Component Architecture](#6-component-architecture)
7. [Styling System](#7-styling-system)
8. [Data Fetching & State Management](#8-data-fetching--state-management)
9. [Animations & Visual Effects](#9-animations--visual-effects)
10. [Build & Configuration](#10-build--configuration)
11. [Testing](#11-testing)
12. [Notable Observations](#12-notable-observations)

---

## 1. Overview

ComputeBay is a **static marketing site** for a decentralized compute marketplace. The platform matches developers who need batch computing power with individuals who have idle consumer hardware (GPUs/CPUs). The frontend is a single-page application (SPA) that serves as a landing page, early-access signup form, and technical architecture documentation hub.

**Core concept:** "Stop overpaying for idle hyperscaler capacity. Computebay leverages a global fleet of consumer hardware to deliver batch and simulation power at 1/10th the cost."

---

## 2. Tech Stack

| Category | Library | Version | Purpose |
|---|---|---|---|
| **UI Framework** | React | ^19.2.0 | Component model |
| **DOM Rendering** | react-dom | ^19.2.0 | Browser rendering |
| **Bundler** | Vite | ^7.2.4 | Dev server & production builds |
| **Routing** | react-router-dom | ^7.11.0 | Client-side SPA routing |
| **Animation** | framer-motion | ^12.24.8 | Declarative component animations |
| **Smooth Scroll** | @studio-freight/lenis | ^1.0.42 | Smooth scrolling experience |
| **Particles** | @tsparticles/react + @tsparticles/slim | ^3.x | Interactive particle backgrounds |
| **UI Primitives** | @radix-ui/react-accordion | ^1.2.12 | Accessible accordion component |
| **Icons** | lucide-react | ^0.562.0 | Icon set |
| **Styling** | Tailwind CSS v4 | ^4.1.18 | Utility-first CSS framework |
| **CSS Utils** | clsx + tailwind-merge + class-variance-authority | — | Conditional class merging |
| **Language** | TypeScript | ~5.9.3 | Type safety |
| **Linting** | ESLint (flat config) | ^9.39.1 | Code quality |
| **PostCSS** | postcss + autoprefixer | ^8.x | CSS processing |

### Key Config Details

- **Path alias:** `@/` maps to `./src/` (configured in both `tsconfig.json` and `vite.config.ts`)
- **Shadcn/ui style:** `new-york` with `lucide` icons (`components.json`)
- **Tailwind v4** uses the new `@import "tailwindcss"` syntax (not `@tailwind` directives) and the `@tailwindcss/vite` plugin

---

## 3. Project Structure

```
frontend/
├── index.html                    # HTML entry point
├── package.json                  # Dependencies & scripts
├── components.json               # shadcn/ui configuration
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # Root TypeScript config
├── tsconfig.app.json             # TypeScript config for src/
├── tsconfig.node.json            # TypeScript config for vite.config.ts
├── tailwind.config.js            # Tailwind theme extensions
├── postcss.config.js             # PostCSS plugins
├── eslint.config.js              # ESLint flat config
├── public/
│   └── vite.svg                  # Favicon
└── src/
    ├── main.tsx                  # React entry point (bootstrap)
    ├── App.tsx                   # Root component with routing & layout
    ├── index.css                 # Global styles, Tailwind import, CSS vars
    ├── App.css                   # Minimal overrides (unused)
    ├── lib/
    │   └── utils.ts              # cn() utility (clsx + tailwind-merge)
    ├── components/
    │   ├── layout/
    │   │   ├── TopNav.tsx        # Sticky header with logo + CTA
    │   │   ├── SmoothScroll.tsx  # Lenis smooth scroll wrapper
    │   │   └── PageShell.tsx     # Alternative layout (unused)
    │   ├── ui/
    │   │   ├── accordion.tsx     # shadcn Accordion (Radix-based)
    │   │   └── sparkles.tsx      # Full tsParticles wrapper (unused)
    │   ├── ShinyButton.tsx       # Animated CTA with conic gradient
    │   ├── ThemedGlassButton.tsx # Glassmorphism button
    │   ├── SparklesCore.tsx      # tsParticles wrapper (used)
    │   └── WorkloadCard.tsx      # Workload showcase card (unused)
    ├── features/
    │   └── auth/
    │       └── AuthConsole.tsx   # Developer auth login/register UI
    └── pages/
        ├── Home.tsx              # Landing page (/) - hero, use cases, flow
        ├── EarlyAccess.tsx       # Early access signup (/earlyAccess)
        └── About.tsx             # Architecture docs (/about)
```

---

## 4. Architecture & App Shell

### Entry Point (`src/main.tsx`)

The app boots with `BrowserRouter` wrapping the root `App` component:

```
<StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</StrictMode>
```

### Root Component (`src/App.tsx`)

The component hierarchy is:

```
<SmoothScroll>                        # Lenis smooth scrolling
  <div>                               # Root background, grid overlay
    <TopNav />                        # Sticky header
    <main>
      <Routes>                        # React Router
        <Route path="/" element={<Home />} />
        <Route path="/earlyAccess" element={<EarlyAccess />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </main>
    <footer>                          # "Computebay Systems_Global // v1.0.4"
  </div>
</SmoothScroll>
```

**Key layout details:**
- A fixed blueprint grid overlay (`40px × 40px`) covers the entire viewport at 3% opacity
- All routes share the same `<TopNav />` and `<footer>` — only the `<main>` content swaps
- Layout is inlined in `App.tsx`; `PageShell.tsx` exists but is unused

### Design Constants

| Element | Value |
|---|---|
| Base background | `bg-black` |
| Text color | `text-slate-200` |
| Accent color | Emerald (`#10b981`, `emerald-500`) |
| Secondary accent | Sky (`#0ea5e9`, `sky-500`) |
| Tertiary accent | Amber (`#f59e0b`, `amber-500`) |
| Selection highlight | `bg-emerald-500 selection:text-black` |
| Container max-width | `max-w-7xl` with `px-6` |
| Font stacks | System sans-serif + `JetBrains Mono` |

---

## 5. Routing & Pages

### Route Table

| Route | File | Purpose |
|---|---|---|
| `/` | `src/pages/Home.tsx` | Main landing page |
| `/earlyAccess` | `src/pages/EarlyAccess.tsx` | Email waitlist signup |
| `/about` | `src/pages/About.tsx` | Technical architecture documentation |

### Page Breakdown

#### Home (`/`) — 442 lines
- **Particle background** via `SparklesCore` with emerald dots, masked with radial gradient
- **Hero section:** Status badge ("Grid_Status: Optimal"), headline, description, "Launch Developer Console" CTA (navigates to `/earlyAccess`), terminal-style job monitor card with `framer-motion` animations
- **Use cases section:** 3-column grid of `WorkloadCard` components (Batch & Simulations, GPU-heavy Inference, Offline Data Pipelines) with moving dot animations
- **Dual audience section:** Two-column split — Developers (Demand Side) vs. Contributors (Supply Side) — with feature lists
- **Execution flow:** 4-step staggered animation (Define → Schedule → Run → Settle) using `framer-motion` `staggerChildren` with "blip" effects, progress bars, and live status indicators
- **Roles overview:** Two role tracks (Job Submitter / Compute Contributor) each with 3-phase onboarding steps

#### Early Access (`/earlyAccess`) — 176 lines
- Particle background with `sparkles` component (imported from `../components/ui/sparkles`)
- Back button to `/`
- Descriptive copy column + form column layout
- Form fields: email (required), role selector (developer/contributor/both), notes textarea
- POSTs to `/api/v1/early-access` on submit
- Inline loading, success, and error states

#### About (`/about`) — 199 lines
- Particle background at lower density
- Back button to `/`
- **Layer 01 — Manifesto:** Cost Efficiency, Native Isolation, Fault Tolerance pillars
- **Layer 02 — Protocol Journeys:** Detailed submitter and contributor flows via `StepCard` components
- **Layer 03 — Orchestration Engine:** 4-column service grid (API Gateway, Job Service, Scheduler, Worker Agent) + System Integrity Checks section
- Final CTA → `/earlyAccess`

---

## 6. Component Architecture

### Component Categories

| Category | Location | Components |
|---|---|---|
| **Layout** | `components/layout/` | `TopNav`, `SmoothScroll`, `PageShell` (unused) |
| **UI Primitives** | `components/ui/` | `accordion`, `sparkles` |
| **Custom** | `components/` | `ShinyButton`, `ThemedGlassButton`, `SparklesCore`, `WorkloadCard` (unused) |
| **Feature** | `features/auth/` | `AuthConsole` |
| **Page** | `pages/` | `Home`, `EarlyAccess`, `About` |
| **Utility** | `lib/` | `utils.ts` |

### Component Details

#### `TopNav` (`components/layout/TopNav.tsx`) — 42 lines
- Sticky header with `backdrop-blur-md` and `bg-black/80`
- Computebay logo (emerald box with "CB" text) — links to `/`
- "Join Waitlist" `ThemedGlassButton` — navigates to `/earlyAccess`

#### `SmoothScroll` (`components/layout/SmoothScroll.tsx`) — 38 lines
- Wraps children in a Lenis smooth scroll context
- Duration: 1.2, custom easing, `requestAnimationFrame` loop in `useEffect`
- Cleans up on unmount via `lenis.destroy()`

#### `ShinyButton` (`components/ShinyButton.tsx`) — 124 lines
- Animated CTA button with rotating conic-gradient border
- Uses CSS `@property` for `--gradient-angle` animation
- Grid/dot pattern overlay via `::before` pseudo-element
- Glow effect on hover via `box-shadow` on `span::before`
- Monospace, uppercase, tracking-widest

#### `ThemedGlassButton` (`components/ThemedGlassButton.tsx`) — 129 lines
- Glassmorphism aesthetic with emerald tones
- Uses CSS `@property` for `--angle-1` and `--angle-2` transitions
- Multi-layered `box-shadow` for depth (inset glows, drops)
- Conic-gradient border via `::after` pseudo-element
- Inner shine overlay with dynamic positioning
- Hover: scale down, intensify glow; Active: 3D rotation

#### `SparklesCore` (`components/SparklesCore.tsx`) — 106 lines
- Wraps `@tsparticles/react` with `loadSlim` engine
- Async particle engine initialization in `useEffect`
- Framer Motion fade-in via `useAnimation`
- Configurable: `id`, `background`, `minSize`, `maxSize`, `speed`, `particleColor`, `particleDensity`
- Interactive hover mode: `bubble` (emerald glow)
- Default: 120 particles, 0.1–1 speed, white color

#### `WorkloadCard` (`components/WorkloadCard.tsx`) — 57 lines (unused)
- Animated card with gradient border, moving dot (`moveDot` keyframes), ray effect
- Props: `icon`, `title`, `description`, `colorClass`, `accentColor`
- Note: `Home.tsx` defines its **own local** `WorkloadCard` with slightly different styling (no rounded corners, different border treatment). The standalone component is not imported anywhere.

#### `AuthConsole` (`features/auth/AuthConsole.tsx`) — 330 lines
- Developer-facing authentication testing tool
- Login/Register mode toggle with form fields
- Session panel with `/me` payload display
- Logout functionality
- All API calls go to `http://localhost:3000/api/v1/auth/*`
- `credentials: 'include'` for session cookies
- Loading, error, and info states handled inline
- Not connected to any route in `App.tsx` — standalone tool

#### `accordion` (`components/ui/accordion.tsx`) — 55 lines
- shadcn-style wrapper around `@radix-ui/react-accordion`
- Exports `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`
- Not used in any page currently

### Component Patterns
- **Forward refs** in accordion (Radix convention)
- **`"use client"` directive** in components using framer-motion or tsParticles (client-side only execution)
- **CSS-in-JS via `<style>` tags** with `dangerouslySetInnerHTML` in `ShinyButton` and `ThemedGlassButton` for `@property` CSS animations
- **Inline `@keyframes`** defined in `<style>` tags within pages (e.g., `moveDot` in `Home.tsx`)
- **Props interfaces** consistently defined (e.g., `ShinyButtonProps`, `GlassButtonProps`, `ParticlesProps`, `WorkloadCardProps`)
- **Interface vs. type:** Mix of `interface` and `type` used across components
- **`PropsWithChildren`** used in `PageShell.tsx`
- **`LucideIcon` type** imported from `lucide-react` for icon props

---

## 7. Styling System

### Tailwind CSS v4

- **Entry:** `src/index.css` line 1: `@import "tailwindcss"`
- **Plugin:** `@plugin "tailwindcss-animate"` for animation utilities
- **Custom variant:** `@custom-variant dark (&:is(.dark *))`
- **Theme block:** `@theme inline` defining CSS custom properties for colors and radii following shadcn/ui convention

### Theme Colors (CSS Variables, `oklch()`)

- Light theme defined in `:root` (neutral-based)
- Dark theme in `.dark` class (dark neutral-based)
- Custom properties mapped via `@theme inline`: `--color-background`, `--color-foreground`, `--color-card`, `--color-primary`, `--color-secondary`, `--color-muted`, `--color-accent`, `--color-destructive`, `--color-border`, `--color-input`, `--color-ring`, `--color-chart-*`, `--color-sidebar-*`
- Radius scale: `--radius-sm` through `--radius-4xl` (base: 0.625rem)

### Custom Tailwind Config (`tailwind.config.js`)

```js
fontFamily: {
  sans: ['system-ui', '-apple-system', 'Inter', 'sans-serif'],
  mono: ['JetBrains Mono', 'ui-monospace', ...],
}
colors: {
  'cb-bg': '#020617',
  'cb-primary': '#4f46e5',
  'cb-primary-soft': '#6366f1',
}
```

### Visual Aesthetic

- **Dark theme throughout** — black backgrounds (`bg-black`, `bg-[#050505]`)
- **Emerald green accents** (`text-emerald-500`, `border-emerald-500`, `bg-emerald-500`)
- **Industrial/technical** — monospace typography, uppercase text, tracking-widest, grid overlays
- **Terminal-style elements** — job monitors, status indicators, `>` prompts, blinking cursors
- **Sharp corners** on primary CTAs (0px border-radius)
- **Arbitrary values** extensively used: `bg-[#050505]`, `border-white/5`, `text-[10px]`, `tracking-[0.2em]`
- **Low-opacity borders** (`border-white/5`, `border-white/10`) for subtle separation
- **Glassmorphism** via `backdrop-blur-md` on nav and form container

### Utility: `cn()` (`src/lib/utils.ts`)
```ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Scrollbar
Hidden globally via `::-webkit-scrollbar { display: none; }`

---

## 8. Data Fetching & State Management

### State Management
**No global state library** (no Redux, Zustand, Jotai, or React Context). State is managed exclusively via:
- Component-local `useState` hooks
- React Router's `useNavigate` for navigation actions
- Framer Motion's `useAnimation` for particle orchestration

### API Layer
**No dedicated API client or data fetching library** (no React Query, SWR, axios). Raw `fetch()` calls are made inline:

| Location | Endpoint | Method | Purpose |
|---|---|---|---|
| `EarlyAccess.tsx:29` | `/api/v1/early-access` | POST | Join early access waitlist |
| `AuthConsole.tsx:37` | `http://localhost:3000/api/v1/auth/login` | POST | User login |
| `AuthConsole.tsx:37` | `http://localhost:3000/api/v1/auth/register` | POST | User registration |
| `AuthConsole.tsx:73` | `http://localhost:3000/api/v1/auth/me` | GET | Fetch current user |
| `AuthConsole.tsx:93` | `http://localhost:3000/api/v1/auth/logout` | POST | Logout |

**Observations:**
- No error interceptors, request/response transforms, caching layer, or loading state abstractions
- Each component manages its own `loading`, `error`, and `message`/`info` states manually
- No environment variable configuration for API URLs (hardcoded in `AuthConsole.tsx`)

---

## 9. Animations & Visual Effects

### Framer Motion Usage
- **Page entrance animations:** `motion.div` with `initial`/`animate` for fade-in and slide effects (Home hero)
- **Staggered children:** Execution flow section uses `staggerChildren: 0.4` for sequential card reveals
- **"Blip" effect:** Cards flash emerald opacity on activation with delay matching stagger index
- **Progress bars:** Animate width from `0%` to `3rem` on scroll into view
- **Status indicators:** Loop background color transitions (slate → emerald → slate)
- **Blinking cursor:** `animate={{ opacity: [1, 0] }}` with infinite repeat in terminal panel
- **Particle fade-in:** `controls.start()` via `useAnimation` when particles are loaded

### Lenis Smooth Scroll
- Wraps entire app (`SmoothScroll.tsx`)
- Duration: 1.2, custom cubic easing
- `requestAnimationFrame` loop for scroll updates

### CSS Animations
- **`@property` custom properties:** Used in `ShinyButton` (`--gradient-angle` spins 360° infinitely) and `ThemedGlassButton` (`--angle-1`/`--angle-2` transition on hover)
- **`moveDot` keyframes:** Moving dot traces card perimeter (0% → 25% → 50% → 75%) over 6s
- **Hover transitions:** Button scale, glow opacity, border color, background color across 400–500ms

### Particle Effects
- **`SparklesCore`** (used in Home, About) — emerald dots with bubble interaction on hover
- **Alternative `sparkles`** in `components/ui/sparkles.tsx` — used by EarlyAccess page, has more comprehensive tsParticles configuration
- Particles masked with radial gradients to prevent UI occlusion

---

## 10. Build & Configuration

### Scripts (`package.json`)

| Script | Command | Purpose |
|---|---|---|
| `dev` | `vite` | Start dev server |
| `build` | `tsc -b && vite build` | Type-check + production build |
| `lint` | `eslint .` | Run ESLint |
| `preview` | `vite preview` | Preview production build |

### Vite Config (`vite.config.ts`)
```ts
plugins: [react(), tailwindcss()],
resolve: { alias: { '@': path.resolve(__dirname, './src') } }
```

### TypeScript Config
- `tsconfig.json` — root with path aliases
- `tsconfig.app.json` — app source config
- `tsconfig.node.json` — Node/Vite config
- `@/*` → `./src/*`

### ESLint
- Flat config (`eslint.config.js`)
- Plugins: `typescript-eslint`, `react-hooks`, `react-refresh`

### PostCSS
- `postcss.config.js`: `tailwindcss` + `autoprefixer` (legacy, since Tailwind v4 uses the Vite plugin primarily)

---

## 11. Testing

**No testing infrastructure exists:**
- No test files (`*.test.*`, `*.spec.*`, `__tests__/`)
- No testing libraries in `package.json` (no vitest, jest, playwright, cypress, testing-library)
- No test scripts in `package.json`

---

## 12. Notable Observations

### Duplicate / Unused Components

1. **Dual `SparklesCore` implementations:**
   - `src/components/SparklesCore.tsx` (106 lines, simpler, used by `Home.tsx` and `About.tsx`)
   - `src/components/ui/sparkles.tsx` (434 lines, full tsParticles config, used by `EarlyAccess.tsx`)
   - These could be unified.

2. **Dual `WorkloadCard` implementations:**
   - `src/components/WorkloadCard.tsx` — standalone component file (57 lines, NOT imported anywhere)
   - `Home.tsx` lines 30–79 — local `WorkloadCard` definition with slightly different styling (no rounded corners, different layout)
   - The standalone component should replace the local one in `Home.tsx`.

3. **Unused `PageShell.tsx`:**
   - Exists at `src/components/layout/PageShell.tsx`
   - Not imported in `App.tsx` — layout is inlined there

4. **Unused `accordion.tsx`:**
   - shadcn Accordion component exists but no page imports it

### Code Quality Notes

5. **`AuthConsole.tsx` unreachable:**
   - Not connected to any route; only accessible if a developer manually renders it
   - Hardcoded `http://localhost:3000` URL — should use environment variables

6. **`tailwind.config.js` partially vestigial:**
   - Tailwind v4 primarily uses `@import "tailwindcss"` and `@theme` in CSS
   - The config still uses legacy `content` array — likely not read by Tailwind v4's JIT engine

7. **Mixed import styles:** Some files use default exports, others use named exports
   - `SparklesCore` is a named export: `export const SparklesCore`
   - `WorkloadCard` is a default export: `export default WorkloadCard`
   - `accordion.tsx` uses named exports

8. **CSS-in-JS via `dangerouslySetInnerHTML`:**
   - `ShinyButton.tsx` and `ThemedGlassButton.tsx` inject full `<style>` blocks at runtime
   - Necessary for `@property` CSS custom property animations, but bypasses typical React patterns

9. **Tailwind arbitrary color classes may break with JIT:**
   - `WorkloadCard.tsx` uses dynamic classes like `bg-${colorClass}-500/10` — Tailwind's JIT compiler cannot generate these at build time since the string is dynamic

10. **Potential hydration/SSR issues:**
    - `"use client"` directive at top of several files is non-standard React — likely a hack to suppress SSR warnings in tools like Next.js or Astro. The app uses Vite + React (no SSR), so these directives are benign but misleading.

### Security Considerations

11. **No credential handling:**
    - No environment variables used for API URLs or secrets
    - No token storage, CSRF protection, or auth interceptors implemented yet

12. **`dangerouslySetInnerHTML`:**
    - Used for CSS injection (safe since content is static), but could be misused if dynamic user input is introduced
