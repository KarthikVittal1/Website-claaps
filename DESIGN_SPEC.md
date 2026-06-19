# Claaps Technology Services — Enterprise Brand & Website Redesign
### Design Specification (Final, Post-Review Version)

This document is the single source of truth for the redesign. It was produced through an initial design pass, followed by a critical review from five personas (Fortune 500 CIO, CISO, Compliance Officer, UX Researcher, Awwwards Judge) and one full revision cycle. Only the improved final version is presented below; review findings are captured in Section 9 to explain *why* specific decisions were made.

All metrics, client names, testimonials, certifications, and case study outcomes referenced anywhere in this spec or the codebase are **placeholders** clearly marked `[PLACEHOLDER]`. Nothing is fabricated. Replace with real, verifiable content before launch.

---

## 1. Executive Design Direction

### 1.1 Brand Positioning
Claaps is not a generic IT consultancy that happens to know Oracle. Claaps is an **Oracle Governance, Risk & Compliance specialist** — the firm enterprises call when GRC, risk, and regulatory exposure are board-level concerns. The site must read like a category authority, not a vendor directory.

### 1.2 Design Thesis
> "Calm intelligence." The interface should feel like the inside of a well-run risk operations center: quiet, precise, instrumented, and confident — never noisy, never decorative.

Borrowed principles:
- **Stripe** — typographic precision, generous whitespace, restrained color used with intent, content that explains complex systems in plain language.
- **Linear** — dark-mode-first density control, crisp 1px borders, deliberate motion, no visual clutter.
- **Palantir** — diagrams and data visuals that *explain the product*, not decorate the page; an engineering-grade, mission-critical tone.
- **Apple** — single-message-per-section editorial pacing, large type, product-first hero moments.
- **Vercel** — technical credibility through clean grids, monospace accents for data/labels, dark/light surface contrast.
- **Lusion** — exactly one or two pieces of meaningful WebGL, used as storytelling, not spectacle.

### 1.3 Brand Voice
Confident, precise, low-hype. Sentences are short. Claims are qualified or omitted rather than inflated. No "synergy," no "world-class," no unverified superlatives ("#1," "leading," "trusted by Fortune 500" are banned unless backed by real, citable proof).

### 1.4 What We Are Deliberately NOT Doing
- No stock photography of people in suits shaking hands.
- No rotating hero carousels.
- No glassmorphism panels stacked on glassmorphism panels.
- No decorative 3D (floating shapes with no business meaning).
- No animation that fires on every scroll tick — motion is rationed and purposeful.
- No fabricated logos, metrics, or testimonials. Every empty slot is an explicit placeholder component (visually distinct, e.g., dashed border + "Pending client approval" label) so marketing can't accidentally ship fake proof.

---

## 2. Sitemap

```
/                          Homepage
/services                  Services (overview + 5 service anchors)
/services/oracle-grc
/services/oracle-risk-management-cloud
/services/regulatory-compliance-consulting
/services/risk-advisory
/services/managed-support
/solutions                 Solutions (by audience: CIO / CISO / Audit / Compliance / Risk)
/case-studies               Case Studies index
/case-studies/[slug]        Individual case study (placeholder-driven until real ones exist)
/about
/contact
/legal/privacy
/legal/terms
404
```

Global persistent elements: header nav, footer, skip-to-content link, cookie/consent banner (if analytics added later).

---

## 3. Design System

### 3.1 Typography
Primary typeface: **Inter** (or **Inter Variable**) for UI/body — free, enterprise-proven, used by Linear/Vercel. Display/editorial accents may use a tighter grotesk (e.g., **Inter Display** or **General Sans**) at the 48–80 sizes for hero statements. Monospace (**JetBrains Mono** or **IBM Plex Mono**) is used sparingly for data labels, code-like metrics, and the 3D scene's data annotations — reinforcing "engineering-grade."

Type scale (px), all on a fixed scale, line-height and weight per step:

| Token | Size | Line Height | Weight | Usage |
|---|---|---|---|---|
| `text-xs` | 12 | 16 | 500 | Eyebrow labels, legal, badges |
| `text-sm` | 14 | 20 | 400/500 | Captions, form helper text, nav |
| `text-base` | 16 | 24 | 400 | Body copy |
| `text-lg` | 18 | 28 | 400 | Lead paragraphs |
| `text-xl` | 20 | 28 | 500 | Card titles, subsection headers |
| `text-2xl` | 24 | 32 | 600 | Section headers (H3) |
| `text-3xl` | 32 | 40 | 600 | Page section headers (H2) |
| `text-5xl` | 48 | 52 | 600 | Sub-hero / secondary page H1 |
| `text-6xl` | 64 | 68 | 700 | Primary hero H1 (desktop) |
| `text-7xl` | 80 | 84 | 700 | Hero H1, large desktop only (≥1440px) |

Tracking: headlines at 48px+ use `-0.02em` letter-spacing; body uses `0em`; eyebrow labels (12px) use `+0.08em` uppercase.

### 3.2 Color Tokens
Built as CSS variables + Tailwind tokens, **light-surface-first** (90–95% white, dark text) with the two real colors from the Claaps logo — orange/red and blue/purple — used strictly as strategic accents, not a dominant theme. Token *names* (navy/offwhite/electric/cyan/purple) are carried over from earlier palette iterations to avoid renaming classes across the codebase every time the brand direction changed; only the hex values were updated. Read "navy-950" as "surface," "offwhite-50" as "default text," "electric" as "brand blue," and "cyan" as "brand orange."

**Neutrals:**
| Token | Hex | Usage |
|---|---|---|
| `--color-navy-950` | #FFFFFF | Primary background (white) |
| `--color-navy-900` | #F9FAFB | Section background alt / scrolled-nav surface |
| `--color-navy-800` | #F9FAFB | Card surface |
| `--color-graphite-700` | #E5E7EB | Border/divider on light |
| `--color-graphite-500` | #D1D5DB | Disabled/decorative-only elements |
| `--color-slate-400` | #6B7280 | Muted body/lead text (AA-verified ≥4.5:1 on white) |
| `--color-charcoal-900` | #111317 | Reserved for dark-surface exceptions (none currently in use) |
| `--color-offwhite-50` | #111827 | Default body/heading text |
| `--color-offwhite-100` | #374151 | Secondary dark text |
| `--color-white` | #FFFFFF | Pure white |

**Accent — real logo colors:**
| Token | Hex | Usage |
|---|---|---|
| `--color-electric-500` | #4E56B8 | Brand blue. Primary CTA gradient, borders, focus ring |
| `--color-electric-400` | #6B72C7 | Lighter blue tint — hover/icon use (3:1 non-text contrast) |
| `--color-electric-600` | #3A4296 | Darker blue — links/inline text on white (AA ≥4.5:1) |
| `--color-cyan-400` | #F24A1D | Brand orange. Used sparingly — small highlights, 3D pulse accent, gradient stop. The logo's loudest color, so it is rationed (never a primary surface color) |
| `--color-cyan-700` | #C23D17 | Darker orange — eyebrow labels / data text on white (AA ≥4.5:1) |
| `--color-purple-500` | #6B4FBF | Blue-purple blend — secondary 3D node color, gradient endpoint (Blue → Purple) |

**Semantic:**
| Token | Hex | Usage |
|---|---|---|
| `--color-success-500` | #2BB673 | Compliant / pass states (borders, tints) |
| `--color-warning-500` | #E0A82E | Attention / review states |
| `--color-danger-500` | #E54B4B | Risk / non-compliant states (borders, tints) |
| `--color-danger-700` | #C13434 | Error message text on white (AA-verified ≥4.5:1) |

**Where gradients are allowed** (and nowhere else — no full-page gradient backgrounds, no more than one gradient accent visible per viewport):
- **Hero background glow** — two soft, low-opacity radial blobs (orange + blue) behind the homepage headline, blended with the 3D scene backdrop.
- **Primary CTA buttons** — `electric-500 → purple-500` (Blue → Purple), the one gradient surface in the button system.
- **Hover state on cards** — a soft two-tone shadow blend (blue + orange, ≤0.18 opacity) plus a subtle lift, not a background gradient.
- **Feature highlights** — e.g. the numbered process steps on the About page use a Blue → Purple gradient-text treatment.
- **CTA section ambient glow** — the same two-blob orange+blue radial pattern as the hero, reused at the bottom of long pages.

Contrast requirement: all text/background pairs must meet **WCAG 2.1 AA** (4.5:1 body, 3:1 large text/non-text UI) — verified token-by-token. This is why there are separate 400/700 pairs for electric and cyan: the brighter value is reserved for buttons, icons, and borders (3:1 threshold), while body text and links use the darker variant to clear the stricter 4.5:1 text threshold against white. The brand orange in particular looks "dark" but has high luminance — its raw hex fails 4.5:1 as text, which is why `cyan-700` exists as a separate, darker variant solely for text use.

### 3.3 Spacing (8px grid)
`0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128, 160` → Tailwind tokens `space-0` … `space-40`. Section vertical padding standardizes on `space-24` (96px) mobile, `space-32`–`space-40` (128–160px) desktop. Component internal padding uses 8/16/24 only.

### 3.4 Radius
| Token | Value | Usage |
|---|---|---|
| `radius-sm` | 6px | Inputs, small chips |
| `radius-md` | 10px | Buttons, badges |
| `radius-lg` | 16px | Cards |
| `radius-xl` | 24px | Large panels, modals |
| `radius-full` | 999px | Pills, avatars |

### 3.5 Shadow / Depth
On the white surface, elevation uses a border plus a soft, low-opacity shadow — a dark-theme-strength shadow (the original spec's `rgba(0,0,0,0.4)`) reads as a harsh drop shadow once the background is light, so the opacity was reduced and the shadow color shifted from pure black to a dark slate to keep it soft:

| Token | Spec |
|---|---|
| `elevation-0` | `border: 1px solid graphite-700` |
| `elevation-1` | `0 1px 2px rgba(15,23,42,0.06)` + border |
| `elevation-2` | `0 8px 24px rgba(15,23,42,0.1)` |
| `elevation-glow` | `0 0 40px rgba(47,107,255,0.18)` — used only on primary CTA hover / featured card |

### 3.6 Grid System
12-column fluid grid, max content width **1280px** (1440px for full-bleed hero backgrounds), gutters 24px mobile / 32px desktop. Breakpoints: `sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536`. Mobile-first; container queries used inside complex cards (service comparison tables) where useful.

### 3.7 Buttons
- **Primary**: solid `electric-500`, white text, `radius-md`, 1px transparent border, `elevation-glow` on hover, scale 1.0→1.02 on hover (150–200ms ease-out).
- **Secondary**: transparent bg, 1px `graphite-700` border, off-white text; hover border → `electric-400`.
- **Ghost/Tertiary**: text-only + chevron, used for inline "Learn more →" links.
- **Sizes**: `sm` (36px height), `md` (44px, default), `lg` (52px, hero CTAs).
- All buttons: visible 2px focus ring (`electric-400`, offset 2px) for keyboard nav; disabled state at 40% opacity, no hover transform.

### 3.8 Cards
Base card: `navy-800` surface, `elevation-1`, `radius-lg`, 24–32px padding, 1px `graphite-700` border that brightens to `electric-500/40` on hover with a 200ms transition. Three variants: **Service card** (icon + title + 2-line description + link), **Stat/metric card** (monospace number + label — placeholder-aware), **Case study card** (eyebrow industry tag + headline + outcome teaser).

### 3.9 Forms
Inputs: `navy-900` bg, 1px `graphite-700` border, `radius-sm`, 44px height, 16px text (prevents iOS zoom), label always visible above field (no placeholder-as-label). Focus: border → `electric-500` + subtle glow, no color-only error indication (icon + text required). Validation messages inline, `text-sm`, red-600/green-600 with icon. Multi-step forms (Contact "Request Consultation") show a progress indicator.

### 3.10 Navigation
Sticky top nav, 72px height, `navy-950/85` background with backdrop blur on scroll (subtle, ≤12px blur — avoid heavy glassmorphism), logo left, primary links center/left, "Request Consultation" primary button right. Mega-menu for Services (grouped by the 5 services) and Solutions (grouped by audience persona), opening on click (not hover-only, for accessibility/touch parity). Mobile: full-screen overlay menu, large tap targets (≥44px), animated via Framer Motion height/opacity, respects `prefers-reduced-motion`.

### 3.11 Iconography
Direction: **single-weight line icons, 1.5px stroke, geometric, no fill, no skeuomorphism** (Lucide or Phosphor as base set, customized for risk/compliance concepts — shield, node-graph, audit-checklist, data-flow). Icons are never decorative-only; each icon in a service/solution context maps 1:1 to a concept. Icon color: `offwhite-50` default, `electric-500` or `cyan-400` only when indicating an active/selected state.

---

## 4. Global Components

| Component | Notes |
|---|---|
| `Header` | Sticky, mega-menu, mobile drawer, scroll-aware blur |
| `Footer` | 4-column: Services, Solutions, Company, Legal + newsletter (optional, real backend required) + social (only real, active accounts) |
| `Button` | Variants: primary/secondary/ghost; sizes sm/md/lg |
| `Card` | Variants: service/stat/case-study/placeholder |
| `SectionHeading` | Eyebrow + H2 + optional lead paragraph, consistent across pages |
| `Badge` | Status pills (e.g., "Oracle Partner" — only if real) |
| `PlaceholderBlock` | Dashed border, muted label, used for any unverified metric/logo/testimonial slot so it's never mistaken for real content |
| `StatGrid` | Monospace metric display, placeholder-aware |
| `CTASection` | Full-width band, gradient-glow background, primary+secondary CTA pair |
| `Breadcrumb` | Used on Services/Solutions/Case Study detail pages |
| `ConsultationForm` | Multi-step lead form used on Contact + inline CTAs |
| `SceneCanvas` | R3F wrapper: lazy-loaded, IntersectionObserver-gated, static-image fallback, disabled under `prefers-reduced-motion` or small viewport |
| `RevealOnScroll` | Framer Motion wrapper applying the standard reveal spec |
| `SkipLink` | Visually-hidden-until-focus "Skip to content" |

---

## 5. Page-by-Page UX and Layout

### 5.1 Homepage

**UX strategy**: Establish category authority in under 5 seconds, then route three distinct visitor types (CIO/CISO strategic buyer, Compliance/Audit practitioner, existing-client support seeker) to the right next step.

**Primary user intent**: "Is this firm credible and relevant to my Oracle GRC problem? Where do I go next?"

**Wireframe structure**:
1. Hero — eyebrow ("Oracle Governance, Risk & Compliance Specialists"), H1 (e.g., "Enterprise risk, governed with precision"), 1-line subhead, primary CTA ("Request a Consultation") + secondary ("Explore Services"). Background: single R3F scene — *Risk Intelligence Network* — abstract node graph, lazy-loaded, static SVG fallback.
2. Logo/partner strip — **placeholder-gated**; renders `PlaceholderBlock` ("Client roster pending publication approval") if no verified logos exist, never fake logos.
3. Problem framing band — 3 short statements on enterprise GRC pain (audit fatigue, fragmented controls, regulatory velocity) — text-only, no icons needed, large type, Apple-style one-message-per-viewport pacing.
4. Services overview — 5-card grid (one per service), each linking to its service page.
5. Solutions-by-role teaser — horizontal selector (CIO / CISO / Audit / Compliance / Risk) previewing the Solutions page content.
6. Featured case study — single card, placeholder-aware, links to Case Studies.
7. Why Claaps — 3–4 differentiators (Oracle-specialist depth, advisory + managed support continuity, regulatory fluency) as a clean comparison list, not a stock-photo grid.
8. Final CTA band — "Talk to a GRC specialist" with primary + secondary action.

**Visual hierarchy**: Hero H1 (64–80px) > section H2 (32px) > card titles (20px) > body (16px). Exactly one gradient-glow moment (hero). Everything else flat navy/graphite.

**CTA strategy**: Primary CTA ("Request a Consultation") repeated at hero + final band only (not on every section — avoids CTA fatigue). Secondary CTAs are contextual "Explore →" links per section.

**Component breakdown**: Header, SceneCanvas(hero), PlaceholderBlock(logo strip), SectionHeading×5, Card(service)×5, Card(case-study), StatGrid (placeholder-gated), CTASection, Footer.

**Mobile layout**: Hero scene replaced by static gradient/illustration (no canvas on small viewports per 3D requirements); single-column stacked sections; horizontal solution selector becomes a vertical accordion.

**Accessibility**: Hero text never relies on the 3D canvas for meaning (fully redundant in DOM text); skip-link before nav; all interactive cards keyboard-reachable with visible focus; motion respects `prefers-reduced-motion` (scene becomes static image, reveals become opacity-only, no transform).

**SEO notes**: Title "Oracle GRC, Risk Management Cloud & Regulatory Compliance Consulting | Claaps". Meta description focused on Oracle GRC specialization. Single H1. Structured data: `Organization` + `ProfessionalService` schema (fields left empty/placeholder where unverified, e.g., no fake `aggregateRating`).

---

### 5.2 Services Page

**UX strategy**: Let a technical buyer (often a CIO delegate or audit director) self-serve detailed understanding of each of the 5 services without a sales call.

**Primary user intent**: "Which service matches my problem, and what exactly does Claaps do for it?"

**Wireframe structure**:
1. Page header — H1 "Services", short framing paragraph.
2. Sticky in-page nav (jump links to the 5 services) — mirrors Linear's docs-like in-page nav.
3. Per-service block (×5: Oracle GRC, Oracle Risk Management Cloud, Regulatory Compliance Consulting, Risk Advisory, Managed Support): eyebrow, H2, 2–3 paragraph description, "What's included" checklist, "Who it's for" tag list, CTA ("Discuss this service").
4. Cross-sell band — "Services work better together" — simple diagram (static, not 3D) showing how Advisory → Implementation (Oracle GRC/RMC) → Managed Support form a lifecycle.
5. Final CTA band.

**Visual hierarchy**: In-page nav persistent but unobtrusive (text links, active-state underline only). Each service block visually identical in structure (predictability = trust for compliance audiences).

**CTA strategy**: One CTA per service block (low-commitment "Discuss this service" rather than generic "Buy now" tone) + one final consultation CTA.

**Component breakdown**: Header, Breadcrumb, StickyInPageNav, SectionHeading×5, Checklist, TagList, CTASection×6, Footer.

**Mobile layout**: Sticky in-page nav collapses into a dropdown/select at top; service blocks remain full-width single column.

**Accessibility**: In-page nav uses real anchor links (`<a href="#service-id">`) for non-JS fallback; checklist items use semantic `<ul>`, not styled `<div>` soup; each service H2 is a real heading for screen-reader navigation.

**SEO notes**: Each service eventually gets its own indexable route (`/services/oracle-grc` etc., per sitemap) with unique title/meta — the `/services` page summarizes and deep-links rather than duplicating full content, avoiding thin/duplicate content issues.

---

### 5.3 Solutions Page

**UX strategy**: Mirror how enterprise buyers actually search — by their role/problem, not by Claaps' internal service taxonomy.

**Primary user intent**: "I am a [CISO / Audit Leader / Compliance Lead / Risk Leader / CIO] — what does Claaps do for someone like me?"

**Wireframe structure**:
1. Header — H1 "Solutions by role".
2. Role selector (5 tabs/pills: CIO, CISO, Audit Leaders, Compliance Teams, Risk Leaders) — selecting one filters the content below (client-side, accessible via real tab pattern `role="tablist"`).
3. Per-role panel: top business risks for that role (3 bullets), relevant Claaps services mapped (links back to Services), one relevant case study placeholder.
4. Comparison-style "Solution map" — simple table: Role × relevant Service(s) × typical engagement type (Advisory / Implementation / Managed Support).
5. Final CTA band, pre-filled with the selected role context (e.g., "Talk to us about CISO risk programs").

**Visual hierarchy**: Tabs are the dominant interactive element; content panel uses identical layout per role to keep cognitive load low when switching.

**CTA strategy**: Context-aware CTA copy changes based on active role tab — increases relevance without adding new components.

**Component breakdown**: Header, Tabs (ARIA `tablist`/`tab`/`tabpanel`), Card(role-risk)×3 per role, Table(solution-map), CTASection, Footer.

**Mobile layout**: Tabs become a horizontally scrollable pill row (with visible scroll affordance, not hidden overflow); solution-map table becomes stacked key-value cards.

**Accessibility**: Full ARIA tabs pattern (keyboard arrow-key navigation between tabs, `aria-selected`, `aria-controls`); table has proper `<th scope>` for screen readers; switching tabs announces panel change via `aria-live="polite"` region if content swap isn't visually obvious enough.

**SEO notes**: Because tab content is client-filtered, ensure all 5 role panels are present in the server-rendered HTML (not mounted only on click) so search engines and non-JS users get full content; consider also exposing `/solutions#ciso` style deep links.

---

### 5.4 Case Studies Page

**UX strategy**: Provide social proof scaffolding that is honest about current state — real structure, explicitly marked placeholders until real case studies exist. This protects credibility (a CIO who senses fabricated proof disengages permanently) more than fake numbers would help.

**Primary user intent**: "Has Claaps actually done this before, in my industry, at my scale?"

**Wireframe structure**:
1. Header — H1 "Case Studies", short framing line.
2. Filter bar (by service / by industry) — only rendered if ≥4 real case studies exist; otherwise omitted to avoid filtering an empty/placeholder set.
3. Case study grid — each card: industry tag, headline (challenge → approach → outcome structure), "Read more" → detail page. Cards with no real content render as `PlaceholderBlock` ("Case study in development — available on request") rather than being hidden, signaling active work without inventing results.
4. Detail page template (`/case-studies/[slug]`): Challenge / Approach / Outcome sections, optional metrics block (only rendered if real numbers supplied via CMS field — component fails closed, i.e., hides itself rather than showing "0%" or lorem ipsum).
5. Final CTA — "Discuss a similar challenge".

**Visual hierarchy**: Grid cards are visually equal weight (no fake "featured" badge unless genuinely curated); detail page uses long-form editorial layout similar to Stripe's customer stories.

**CTA strategy**: Single CTA per detail page at the end of the narrative, after value is demonstrated, not before.

**Component breakdown**: Header, FilterBar (conditional), Card(case-study) / PlaceholderBlock, DetailLayout, MetricsBlock (fail-closed), CTASection, Footer.

**Mobile layout**: Grid → single column; detail page metrics block stacks vertically.

**Accessibility**: Filter bar implemented as accessible checkboxes/`<select>`, not custom unlabeled pill divs; ensure placeholder cards are still announced meaningfully ("Case study pending — contact us for references") rather than as broken/empty content.

**SEO notes**: Each real case study gets unique, indexable content with industry + service keywords; placeholder cards use `noindex` at the slug level until real content is published to avoid thin-content penalties.

---

### 5.5 About Page

**UX strategy**: Build trust through clarity of mission and specialization narrative — not biography-as-marketing. Enterprise buyers vet firms for stability and expertise depth, not founder charisma.

**Primary user intent**: "Who is Claaps, what do they specialize in, and can I trust them with regulatory-sensitive work?"

**Wireframe structure**:
1. Header — H1 "About Claaps", 2–3 sentence mission statement (specific to Oracle GRC/Risk specialization, not generic "we empower businesses").
2. Specialization narrative — why Oracle GRC/Risk specifically (depth over breadth positioning).
3. Approach/methodology — how Claaps engages (Advisory → Implementation → Managed Support lifecycle), shown as a simple horizontal process diagram (static, not 3D).
4. Leadership/team — only real people with real roles; `PlaceholderBlock` if bios aren't ready, never stock headshots.
5. Certifications/partnerships — only real, verifiable badges (e.g., actual Oracle partner status if held) with `PlaceholderBlock` fallback.
6. Final CTA band.

**Visual hierarchy**: Mission statement is the largest text on the page after the H1 — it's the thesis the rest of the page supports.

**CTA strategy**: Single, low-pressure CTA ("Get in touch") — About pages convert on trust, not urgency.

**Component breakdown**: Header, SectionHeading, ProcessDiagram (static SVG/illustration), TeamGrid / PlaceholderBlock, Badge (certifications, real only), CTASection, Footer.

**Mobile layout**: Process diagram switches from horizontal to vertical stepper; team grid → single column.

**Accessibility**: Process diagram has a text-equivalent ordered list alongside it (never information conveyed by diagram alone); team photos (if real) have descriptive alt text (name + role, not "photo of person").

**SEO notes**: `AboutPage`/`Organization` schema; ensure NAP (name/address/phone) consistency if a physical office address is published, for local/enterprise search trust signals.

---

### 5.6 Contact Page

**UX strategy**: Reduce friction for a high-intent enterprise buyer while still qualifying lead quality (role, company size, area of interest) so Claaps can route/prioritize.

**Primary user intent**: "I want to talk to someone about [a specific GRC/risk problem] — make it easy and make me feel like a real person will respond."

**Wireframe structure**:
1. Header — H1 "Let's talk", short reassurance line (e.g., response-time expectation — only state if it's a real, honored SLA).
2. Two-column layout: left = `ConsultationForm` (multi-step: 1. Your role & company, 2. Area of interest — maps to the 5 services/5 roles, 3. Message), right = direct contact info (real email/phone only) + what-happens-next expectations (3 short steps).
3. Alternative contact paths — e.g., existing-client support link (routes to Managed Support contact if different from sales).
4. No third "final CTA band" needed — this page IS the CTA.

**Visual hierarchy**: Form is the dominant element (60% width desktop); reassurance copy is secondary, kept short so it doesn't compete.

**CTA strategy**: Single form submission action; secondary "or email us directly at [real address]" for buyers who distrust forms.

**Component breakdown**: Header, ConsultationForm (multi-step, client+server validation), ContactInfoCard, ExpectationSteps, Footer.

**Mobile layout**: Stacks to single column, form first, contact info below; multi-step form keeps large tap targets and a persistent progress bar.

**Accessibility**: Every field has a real associated `<label>`; multi-step form announces step changes via `aria-live`; client-side validation errors are also exposed to assistive tech (`aria-describedby` linking input to error text); no required field relies on placeholder text as its label; success/failure submission states are announced, not just visually shown.

**SEO notes**: `ContactPage` schema with real `telephone`/`email`; ensure the page is reachable from global nav/footer on every page (contact pages with poor internal linking under-rank and under-convert).

---

## 6. 3D and Motion System

### 6.1 3D Scene: "Risk Intelligence Network"
- **Concept**: An abstract node-and-edge graph (R3F `Points`/`Line` instances) representing controls, risks, and regulations as connected nodes — pulses of light travel along edges to represent continuous monitoring/data flow. This directly visualizes "governance ecosystem" rather than being decorative.
- **Placement**: Homepage hero background only. One scene, one location. (About page's "process" and Services' "lifecycle" diagrams are static SVG, not 3D — per the "meaningful, lightweight" requirement, not everything needs WebGL.)
- **Lazy load**: `next/dynamic` import with `ssr: false`; component only mounts when hero section enters viewport (`IntersectionObserver`) AND viewport width ≥ `lg` breakpoint.
- **Static fallback**: A pre-rendered SVG/PNG of the same node-graph composition, shown immediately, swapped for the canvas only after R3F + assets finish loading (no layout shift — fallback and canvas share identical bounding box).
- **Mobile/reduced-motion**: Canvas never mounts below `lg` breakpoint or when `prefers-reduced-motion: reduce` is set — static fallback is the permanent experience in both cases. This also guarantees the 3D never blocks LCP, since LCP is measured against the static hero text + fallback image, both of which are immediately paintable.
- **Performance budget**: ≤150 draw calls, instanced geometry for nodes, no post-processing passes beyond a single bloom on pulse particles, target 60fps on mid-tier laptop GPUs, auto-pause render loop (`useFrame` gated) when tab is hidden (`document.visibilityState`) or scene scrolled out of view.

### 6.2 Motion Specification

| Interaction | Spec |
|---|---|
| Hover (buttons, cards, links) | 150–200ms, `ease-out`, opacity/border/scale only (no layout-affecting properties) |
| Section scroll reveal | Framer Motion `whileInView`, 300–400ms, translateY 16px→0 + opacity 0→1, triggers once, `viewport={{ once: true, margin: "-10%" }}` |
| Page transition | 400–500ms cross-fade + 8px translateY on route change (Next.js App Router + Framer `AnimatePresence`) |
| Loading states | Skeleton blocks (matching final element dimensions, no spinner-only states) for case study/CMS-driven content |
| Micro-interactions | Form field focus glow (150ms), nav mega-menu open/close (200ms height+opacity), tab underline slide (200ms) |
| Reduced motion | All of the above degrade to opacity-only transitions ≤100ms (or instant) when `prefers-reduced-motion: reduce`; 3D scene fully replaced by static image (see 6.1); implemented via a single shared `useReducedMotion()` hook, not ad-hoc per component |

Motion principle: **motion explains state change** (something appeared, something is now active, you moved to a new page) — it never plays purely for decoration, and nothing animates on every scroll frame (only on enter-viewport, once).

---

## 7. Developer Implementation Plan

### 7.1 Stack
Next.js 14+ (App Router) · TypeScript (strict) · Tailwind CSS · Framer Motion · GSAP (reserved only for the 3D scene's particle pulse timing, if Framer's spring system proves insufficient) · React Three Fiber + `@react-three/drei` · Three.js.

### 7.2 App Structure
```
app/
  layout.tsx                 root layout: fonts, theme, SkipLink, Header, Footer
  page.tsx                   Homepage
  services/
    page.tsx
    oracle-grc/page.tsx
    oracle-risk-management-cloud/page.tsx
    regulatory-compliance-consulting/page.tsx
    risk-advisory/page.tsx
    managed-support/page.tsx
  solutions/page.tsx
  case-studies/
    page.tsx
    [slug]/page.tsx
  about/page.tsx
  contact/page.tsx
  legal/privacy/page.tsx
  legal/terms/page.tsx
  not-found.tsx
components/
  global/  (Header, Footer, SkipLink, Badge, Button, Card, SectionHeading, PlaceholderBlock, CTASection, Breadcrumb)
  motion/  (RevealOnScroll, PageTransition, useReducedMotion)
  three/   (SceneCanvas, RiskIntelligenceNetwork, fallback assets)
  forms/   (ConsultationForm, FormField, FormStepper)
  solutions/ (RoleTabs, RolePanel)
lib/
  content/ (typed content modules or CMS client per page — service/solution/case-study data)
  schema/  (Organization, ProfessionalService, ContactPage JSON-LD builders)
styles/
  tokens.css (CSS variables for color/spacing/radius)
tailwind.config.ts
```

### 7.3 Component Hierarchy (excerpt — Homepage)
```
RootLayout
 └─ HomePage
     ├─ Hero
     │   ├─ SceneCanvas (lazy, IO-gated) → RiskIntelligenceNetwork | StaticFallbackImage
     │   └─ HeroCopy (H1, subhead, Button×2)
     ├─ PlaceholderBlock (logo strip)
     ├─ ProblemFraming (RevealOnScroll × 3)
     ├─ ServicesGrid (Card × 5)
     ├─ SolutionsTeaser (RoleTabs preview)
     ├─ FeaturedCaseStudy (Card | PlaceholderBlock)
     ├─ WhyClaaps
     └─ CTASection
```

### 7.4 Tailwind Architecture
- `tailwind.config.ts` extends theme only via tokens defined in `styles/tokens.css` (CSS vars → Tailwind `theme.extend.colors/spacing/borderRadius` referencing `var(--color-*)`), so design tokens have one source of truth usable by both Tailwind classes and the R3F scene (which needs raw hex/RGB for materials).
- No arbitrary one-off Tailwind values in components (`text-[17px]` etc. banned via ESLint `eslint-plugin-tailwindcss`) — every value must map to a token.
- `class-variance-authority` (cva) for `Button`/`Card`/`Badge` variants to avoid prop-drilled conditional className strings.

### 7.5 Design Token Implementation
```ts
// styles/tokens.css
:root {
  --color-navy-950: #05080F;
  --color-electric-500: #2F6BFF;
  /* ...full token set from Section 3 */
  --space-1: 4px; --space-2: 8px; /* ... */
  --radius-md: 10px;
}
```
Tailwind config maps each variable; components consume via Tailwind classes (`bg-navy-950`, `rounded-md`), never raw hex.

### 7.6 Framer Motion Specs (reusable variants)
```ts
export const revealVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};
// useReducedMotion() swaps duration→0.05 and removes the y offset entirely
```

### 7.7 React Three Fiber Scene Notes
- Single `<Canvas>` instance per page (homepage only), `frameloop="demand"` with manual `invalidate()` on pulse ticks to avoid a constant 60fps render loop draining battery on a marketing page.
- Nodes as `InstancedMesh`; edges as a single `BufferGeometry` line segment set; pulse particles via a small custom shader or `drei`'s `Trail`.
- Camera: fixed/locked (no orbit controls — this is a backdrop, not an interactive toy), subtle parallax tied to mouse position only on desktop, capped to a few degrees of rotation.
- Asset budget: zero external 3D model files — entire scene is procedural geometry, keeping bundle impact to the R3F/Three.js libraries only (code-split via `next/dynamic`).

### 7.8 Performance Optimization Notes
- Fonts: `next/font` with `display: swap`, subset to Latin, self-hosted (no render-blocking Google Fonts request).
- Images: `next/image` everywhere, AVIF/WebP, explicit width/height (no CLS).
- 3D bundle isolated via dynamic import so it never enters the main bundle for non-hero pages.
- Route-level code splitting is automatic via App Router; avoid client components except where interactivity requires it (forms, tabs, motion wrappers, 3D) — everything else stays a Server Component.
- Critical CSS inlined automatically by Next; Tailwind's JIT keeps shipped CSS minimal.
- Analytics/third-party scripts (if added) loaded via `next/script` `strategy="lazyOnload"`, never in `<head>` blocking.

---

## 8. Accessibility and Performance Plan

### 8.1 Accessibility Checklist
- [ ] Skip-to-content link, visible on focus
- [ ] Logical heading order (single H1 per page, no skipped levels)
- [ ] All interactive elements reachable and operable via keyboard, visible focus ring on every one
- [ ] Color contrast AA-verified for every token pair (Section 3.2)
- [ ] Motion respects `prefers-reduced-motion` site-wide via one shared hook
- [ ] 3D scene has zero unique information (purely decorative relative to DOM content) so AT users lose nothing
- [ ] Forms: labeled fields, inline errors linked via `aria-describedby`, step changes announced
- [ ] Tabs (Solutions page) use full ARIA tabs pattern with arrow-key support
- [ ] Images have meaningful alt text; purely decorative images use `alt=""`
- [ ] Touch targets ≥ 44×44px
- [ ] Page language declared (`<html lang="en">`), no unannounced language switches
- [ ] Tested with at least one screen reader (VoiceOver or NVDA) end-to-end on Homepage + Contact flow before launch

### 8.2 Performance Plan
- Lighthouse targets: Performance >95, Accessibility >95, SEO >95 — measured on the homepage (heaviest page due to 3D) on a throttled mobile profile.
- LCP element is hero H1 text (not the canvas or its fallback image) — guaranteed by DOM order and the fallback being a low-weight pre-optimized image.
- 3D scene contributes 0ms to LCP/TBT on mobile (never mounts below `lg` breakpoint).
- JS bundle budget: ≤180KB gzipped for any non-homepage route; homepage budget ≤180KB + dynamically-loaded R3F chunk (loaded post-LCP, after intersection).
- CLS target: 0 — all media has reserved dimensions, fonts use `swap` with matched fallback metrics (`next/font` handles this automatically via size-adjust).

---

## 9. Final Critical Review Scores

Review was performed once, in-character, against the first design pass; the findings below were resolved into the final spec above (e.g., fail-closed metrics components, ARIA tabs pattern, mobile 3D disablement, gradient rationing).

| Reviewer | Score (1–10) | Key finding resolved in final version |
|---|---|---|
| Fortune 500 CIO | 8/10 | Wanted role-based navigation (not just service-based) — added Solutions-by-role IA and homepage teaser. |
| CISO | 8/10 | Flagged risk of "trust theater" (rotating client logos that may not be real) — replaced with placeholder-gated logo strip and fail-closed metrics components. |
| Compliance Officer | 9/10 | Required every claim/metric to be falsifiable or absent — enforced via `PlaceholderBlock` pattern across Case Studies, About, and homepage stat grid. |
| UX Researcher | 8/10 | Original tab design lacked keyboard support — specified full ARIA tabs pattern with arrow-key navigation and `aria-live` announcements. |
| Awwwards Judge | 7/10 | Initial pass had 3D ambitions on multiple pages — scope-reduced to one meaningful scene (homepage hero only) per "lightweight, purposeful" 3D requirement; this trades some visual spectacle for craft and performance, which is the correct trade for this audience. |

Net assessment: the design is intentionally **conservative-premium** rather than maximalist — appropriate for a buyer persona (CIO/CISO/Compliance) that penalizes perceived risk-taking in its vendors' own digital presence.
