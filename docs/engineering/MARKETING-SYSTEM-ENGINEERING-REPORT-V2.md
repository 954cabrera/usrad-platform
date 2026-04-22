# USRad Marketing System — Engineering Intelligence Report (v2)

**Audit Date:** April 12, 2026
**Baseline Report Date:** March 4, 2026
**Codebase:** USRad Patient Platform (Astro 5.7.4 + React 19.1.0 + Supabase)
**Deployment:** Vercel (SSR mode, maxDuration: 30s, memory: 1024MB)
**Auditor:** Claude Opus 4.6 (Full System Rebuild — not a refresh)
**Report Status:** PRODUCTION ARCHITECTURE AUDIT — v2

---

## 1. Executive System Summary

USRad's marketing site is an **Astro 5.7.4 SSR application** deployed on **Vercel**, serving as the primary acquisition engine for three distinct revenue streams: **patient booking** (→ Remix PBS), **provider recruitment** (→ Remix signup + Astro onboarding portal), and **employer lead capture** (→ consultation scheduling + gated content).

### What Changed Since v1 (March 2026)

| System | v1 Status | v2 Status |
|--------|-----------|-----------|
| **Network Map** | Not documented | Full page at `/provider/network-map` — embeds Remix iframe `${REMIX_URL}/provider/market-map?embed=true` |
| **SmartMatch** | Not documented | Dedicated page at `/provider/smartmatch` + branded references across 18+ files |
| **Portal Tour** | Not documented | Full 4-step lifecycle walkthrough at `/provider/portal-tour` |
| **MarketScope** | Not documented | Intelligence showcase component on `/provider` page |
| **Provider CTA routing** | Hardcoded to `/providers/signup` | Migrated to `${REMIX_URL}/signup?source=<page>` with source tracking |
| **Employer Implementation Guide** | Not documented | Gated PDF at `/employer/implementation-guide` with lead scoring |
| **Employer ROI Report** | Not documented | Puppeteer-generated PDF via `/api/employer-roi-report` |
| **GA4 Analytics** | Not documented | `G-60JBC6WVCW` integrated in CarbonLayout |
| **ZIP Validation** | Not documented | Server-side `/api/validate-zip` with fail-open architecture |
| **Source Parameter Tracking** | Not present | All provider CTAs now pass `?source=<page>` to Remix signup |
| **Design Contract** | Not documented | Formal design contract (§7.3 no gradients, §8.1 gold rules, §15.2 motion limits) enforced across provider pages |
| **Sitemap/Robots** | Missing (flagged) | **Still missing** — HIGH risk unchanged |
| **Header/Footer sync** | Last synced 2025-12-26 | **Still 2025-12-26** — now 15+ months stale |
| **Lottie global load** | Flagged as performance issue | **Still loading globally** — unchanged |

### Key Architectural Facts (Updated)

- **~60+ production pages** plus ~100+ legacy x-prefixed files
- **React hydration** limited to `CarbonHeader.jsx` (`client:load`) on marketing pages — minimal island overhead
- **Dual search engine** system (Legacy + New Engine) controlled by feature flags — both default to `true`
- **Supabase** for database, auth, and real-time features
- **DocuSeal** for provider PSA e-signatures (template ID: `1155842`)
- **Resend** for transactional email (with Remix API fallback)
- **Puppeteer** (`@sparticuz/chromium`) for PDF generation (employer ROI reports)
- **No sitemap.xml or robots.txt** — critical SEO gap (unchanged from v1)
- **CarbonHeader and CarbonFooter** must sync with Remix `PBSHeader.tsx` / `PBSFooter.tsx` (last synced: 2025-12-26)
- **Provider signup CTAs** now route to `${REMIX_URL}/signup` with `?source=` parameter tracking
- **Three new provider sub-pages**: `/provider/network-map`, `/provider/smartmatch`, `/provider/portal-tour`
- **Formal Design Contract** governs provider page family (§7.3 no gradients on content surfaces, §8.1 gold for B2B CTA only, §15.2 transitions ≤300ms)

---

## 2. System Reframe — Not a Website, a Conversion Engine

This marketing site is **not a website**. It is a multi-funnel conversion engine that feeds three downstream systems:

```
                    ┌──────────────────────────────────┐
                    │    ASTRO MARKETING ENGINE         │
                    │    (usrad.com)                    │
                    │                                  │
                    │  ┌────────────┐ ┌──────────────┐ │
                    │  │ Patient    │ │ Provider     │ │
                    │  │ Search     │ │ Acquisition  │ │
                    │  │ Funnel     │ │ Funnel       │ │
                    │  └─────┬──────┘ └──────┬───────┘ │
                    │        │               │         │
                    │  ┌─────┴──────┐ ┌──────┴───────┐ │
                    │  │ Employer   │ │ Content +    │ │
                    │  │ Lead       │ │ Education    │ │
                    │  │ Capture    │ │ System       │ │
                    │  └─────┬──────┘ └──────────────┘ │
                    └────────┼─────────────┼───────────┘
                             │             │
              ┌──────────────▼─────┐ ┌─────▼───────────────┐
              │ REMIX APPLICATION  │ │ SUPABASE             │
              │ (app.usrad.com)    │ │ (PostgreSQL)         │
              │                    │ │                      │
              │ • /pbs/search      │ │ • employer_leads     │
              │ • /signup          │ │ • guide_downloads    │
              │ • /patient/login   │ │ • lead_scores        │
              │ • /login           │ │ • provider_contracts │
              │ • /provider/       │ │ • imaging_centers    │
              │   market-map       │ │ • newsletter_subs    │
              └────────────────────┘ └──────────────────────┘
```

### The Three Conversion Pipelines

| Pipeline | Entry Points | Destination | Revenue Model |
|----------|-------------|-------------|---------------|
| **Patient Booking** | Homepage hero search, /how-it-works, /blog, /faq | `${REMIX_URL}/pbs/search` → booking flow | Per-scan transaction |
| **Provider Recruitment** | /provider, /provider/network-map, /provider/smartmatch, /provider/portal-tour | `${REMIX_URL}/signup?source=<page>` → onboarding | Network expansion |
| **Employer Acquisition** | /employer, /employer/schedule, /employer/implementation-guide | Consultation form → Calendly → Supabase | Enterprise contract |

### Why This Distinction Matters

Every page, component, and CTA exists to move a visitor into one of these pipelines. Pages that appear to be "informational" — `/about`, `/how-it-works`, `/blog/*`, `/faq` — are trust-building stages in the patient funnel. The provider sub-pages (`/provider/network-map`, `/provider/smartmatch`, `/provider/portal-tour`) are not feature documentation — they are a coordinated three-page persuasion sequence. The employer system is not a brochure — it is a gated lead-scoring machine with PDF generation.

---

## 3. Homepage & Search Architecture

### Entry Point: `src/pages/index.astro`

```
CarbonLayout (title="USRad - MRI Scans in 48 Hours, 70% Less", isHeroPage=true)
  ├── HeroSection (remixUrl=REMIX_URL)
  │   ├── HeroBackground.astro
  │   ├── HeroHeadline.astro           ← "The Same Radiologists. The Same Scanners. 70% Less."
  │   ├── SearchStep1.astro             ← procedure search entry point
  │   ├── SearchStep2.astro             ← ZIP input + form submission → Remix
  │   ├── MobileSearchModal.astro       ← universal search modal (all viewports)
  │   ├── SearchDropdown.astro          ← desktop dropdown (deferred to modal)
  │   └── SearchLoadingOverlay.astro    ← transition overlay with progress simulation
  ├── MemberTrustBadge                  ← inline trust pill
  ├── BrowseAllModal.astro              ← full procedure browser
  ├── SocialProofBar.astro
  ├── WhyLessCostSection.astro
  ├── HowItWorksSection.astro
  ├── CredibilitySection.astro
  ├── PricingSection.astro
  ├── MemberTrustBadge                  ← banner variant above map
  ├── NetworkMapPinsCarbon.astro        ← Leaflet map with 1,500+ locations
  ├── AboutSection.astro
  └── BlogPreviewSection.astro
```

### Search Flow — Complete State Machine

```
┌─────────────┐    focus/click     ┌──────────────────────┐
│ SearchStep1 │ ──────────────────→│ MobileSearchModal    │
│ (input bar) │                    │ (universal modal)    │
└─────────────┘                    │                      │
                                   │  1. User types query │
                                   │  2. 200ms debounce   │
                                   │  3. searchManager    │
                                   │     .search(query)   │
                                   │  4. Results grouped  │
                                   │     by modality      │
                                   │  5. User selects     │
                                   └──────────┬───────────┘
                                              │
                              selectProcedure()│
                                              │
                                   ┌──────────▼───────────┐
                                   │ SearchStep2          │
                                   │ (ZIP input + form)   │
                                   │                      │
                                   │  Hidden fields set:  │
                                   │  • cpt               │
                                   │  • procedureSearch   │
                                   │  • bodyPartKey       │
                                   │  • displayLabel      │
                                   │  • zip               │
                                   │                      │
                                   │  ZIP validated:      │
                                   │  • Client: /^\d{5}$/ │
                                   │  • Server: /api/     │
                                   │    validate-zip      │
                                   │  • Fail-open arch.   │
                                   └──────────┬───────────┘
                                              │
                                     form submit (GET)
                                              │
                                   ┌──────────▼───────────┐
                                   │ SearchLoadingOverlay │
                                   │ (progress simulation)│
                                   │                      │
                                   │  4-stage progress:   │
                                   │  0-25%: "Analyzing"  │
                                   │  25-50%: "Ranking"   │
                                   │  50-75%: "Ready"     │
                                   │  75-90%: "Almost"    │
                                   └──────────┬───────────┘
                                              │
                                     browser navigates
                                              │
                                   ┌──────────▼───────────┐
                                   │ REMIX /pbs/search    │
                                   │ (app.usrad.com)      │
                                   │                      │
                                   │ Receives:            │
                                   │  ?cpt=70551          │
                                   │  &zip=33012          │
                                   │  &procedureSearch=.. │
                                   │  &bodyPartKey=brain  │
                                   │  &displayLabel=...   │
                                   └──────────────────────┘
```

### Search Engine Architecture — Dual-Engine System

**File:** `src/lib/search-manager.ts`

The SearchManager is a **global singleton** (`window.searchManager`) implementing a pub/sub state machine with two search engines:

| Engine | File | Trigger | Method |
|--------|------|---------|--------|
| **New Engine** (Phase 1) | `src/lib/procedure-resolver.ts` | `USE_NEW_PROCEDURE_ENGINE=true` (default) | CPT-first deterministic scoring with relevance ranking (exact CPT +1000, name match +800, token matches +50 each) |
| **Legacy Engine** | `src/lib/search-utils.ts` | Fallback / debug comparison | Flexible word-order text matching with synonym map (`xray↔x-ray`, `cat↔ct`) |

**Feature Flags:** `src/lib/feature-flags.ts`
- `USE_NEW_PROCEDURE_ENGINE` — defaults to `true`
- `ENABLE_DEBUG_NEW_ENGINE` — defaults to `true` (runs legacy in parallel for comparison logging)

**Procedure Data:** `public/js/procedure-data.js` (~118KB)
- Exports `ProcedureLibrary` with 4 modalities: MRI, CT, X-Ray, Ultrasound
- Nested structure: modality → body region → procedures array
- Each procedure: `{ cpt, label, category?, bodyPart?, bodyPartKey?, displayLabelOverride? }`
- 22 curated popular procedures
- **CRITICAL:** CPT codes in this file must match what Remix expects

### SmartMatch™ Branding in Search

SmartMatch™ is referenced throughout the search UI as the patient-facing brand for the recommendation engine:
- SearchStep1 microcopy: *"Tell us what you need — SmartMatch™ will identify your best option instantly"*
- MobileSearchModal: *"Tell us what you need — SmartMatch™ will identify your best"*
- SearchLoadingOverlay: skeleton includes "SmartMatch confidence line"
- BrowseAllModal: *"Choose your procedure type — SmartMatch™ will identify your best"*

**Important:** SmartMatch™ is a **marketing brand**, not a separate codebase. It refers to the search-manager + procedure-resolver pipeline described above.

---

## 4. Network Map System

### This Is Not a Map — It Is a Provider Acquisition Engine

**Page:** `src/pages/provider/network-map.astro` (prerender: true)

The Network Map page is the most strategically important new system in the v2 architecture. It serves one purpose: **convince imaging center operators that their market is available and closing fast**.

### Architecture

```
/provider/network-map
  ├── Hero (flat navy bg-[#003087])
  │   ├── Headline: "See Your Market. Claim Your Position."
  │   ├── 3-step rail: Select state → Define service → Evaluate territory
  │   ├── Gold CTA #1: "Apply to Join USRad" → ${REMIX_URL}/signup?source=map
  │   └── Stat cluster: 26,900+ centers, 50 states, FL active, 3-6 wks
  │
  ├── Map Legend Section (bg-white)
  │   ├── Navy cluster — Available market density (ACR center count)
  │   ├── Gold marker (#CC9933) — USRad contracted provider (active)
  │   ├── Silver marker (#B0B8C8) — Activating Provider (credentialing)
  │   └── Dashed circle (?) — Open market opportunity
  │
  ├── MAP IFRAME ← CRITICAL CROSS-APP BOUNDARY
  │   └── src="${REMIX_URL}/provider/market-map?embed=true"
  │       (Full-height iframe, lazy-loaded, with loading spinner)
  │
  ├── "What the map is telling you" — 4-card explanation grid
  │
  └── Bottom CTA (flat navy)
      └── Gold CTA #2: "Begin Provider Application" → ${REMIX_URL}/signup?source=map
```

### Pin System — Territory Signaling

| Pin | Color | Hex | Meaning | Strategic Intent |
|-----|-------|-----|---------|------------------|
| **Gold** | Gold | `#CC9933` | Contracted USRad provider — active, receiving referrals | Signal "market taken" — creates urgency in adjacent territories |
| **Silver** | Gray | `#B0B8C8` | Activating provider — credentialing in progress | Signal "market closing" — adjacent founding slots still available |
| **Navy cluster** | Dark blue | `#1E3A5F` | ACR-accredited center count in area | Signal opportunity density — "this many centers = this much demand" |
| **Dashed circle** | Gray | Border only | No USRad presence | Signal "unclaimed territory" — founding advantage available |

### Cross-App Boundary — Map Iframe

The actual map visualization is **not in the Astro codebase**. It is rendered by the Remix application at:

```
${REMIX_URL}/provider/market-map?embed=true
```

Communication between Astro and the iframe:
- **Astro → Iframe:** `postMessage({ type: "usrad:map-focus" }, "*")` on "Evaluate your territory" click
- **Iframe → Astro:** No documented messages flowing back

**Risk:** The `postMessage` uses `"*"` as target origin — this is acceptable for a same-domain embed but should be tightened to the REMIX_URL for production.

### Map Teaser on Provider Page

**Component:** `src/components/provider/MarketOpportunityTeaser.astro`

A static teaser card on `/provider` that:
- Shows a simulated map preview (10 fake cluster positions, 1 gold marker)
- Displays static stats: "5 USRad partners" + "520 MRI centers mapped"
- **Does NOT pull live data** — purely visual funnel to `/provider/network-map`
- CTAs: "Explore Your Market" → `/provider/network-map`, "See how ranking works →" → `/provider/smartmatch`

### MarketScope™ Intelligence Showcase

**Component:** `src/components/provider/MarketScopeShowcase.astro`

An interactive showcase on `/provider` that:
- Presents a simulated intelligence dashboard UI (window chrome, tabs)
- Market selector: Miami/Dallas/Phoenix/Denver/Atlanta
- Preview tabs: Market Reality, Economics, Strategy
- Listens for `usrad:selectMarket` custom events from `MarketsList.astro`
- Updates metrics dynamically based on selected market
- CTA: "Apply for These Priority Markets →" → `${REMIX_URL}/signup?source=provider`

---

## 5. SmartMatch System

### What SmartMatch™ Is

SmartMatch™ is **two things**:

1. **Patient-facing:** A branded name for the procedure search + recommendation pipeline (search-manager.ts → procedure-resolver.ts → Remix PBS search results)
2. **Provider-facing:** A branded name for the center ranking/recommendation engine that determines which provider appears first in search results

### Where SmartMatch™ Appears (18+ files)

| Context | File(s) | Purpose |
|---------|---------|---------|
| **Dedicated explainer page** | `src/pages/provider/smartmatch.astro` | Full 6-section narrative explaining the ranking engine to providers |
| **Search UI microcopy** | `SearchStep1.astro`, `MobileSearchModal.astro`, `BrowseAllModal.astro` | Patient-facing brand in search flow |
| **Loading overlay** | `SearchLoadingOverlay.astro` | "SmartMatch confidence line" skeleton element |
| **How It Works (patient)** | `src/components/HowItWorks.astro` | "SmartMatch™ finds the best nearby imaging center" |
| **How It Works page** | `src/pages/how-it-works.astro` | "SmartMatch™ evaluates every imaging center in your area" |
| **FAQ** | `src/pages/faq.astro` | Full FAQ entry explaining SmartMatch™ as proprietary decision engine |
| **Provider CTAs** | `FoundingPartners.astro`, `MarketOpportunityTeaser.astro` | Links to `/provider/smartmatch` |
| **Component + Data** | `SmartMatch.astro`, `SmartMatchData.ts` | Patient-facing 6-scene storytelling (Skip Referrals → Get Matched → Know Price → Lock In → Results → Built for Patients) |
| **Membership** | `src/pages/membership.astro` | "SmartMatch™ identifies your best imaging option" |
| **Implementation** | `imaging-center/implementation.astro` | "Configure SmartMatch™ system for patient routing" |

### SmartMatch Explainer Page — Provider Acquisition Tool

**Page:** `src/pages/provider/smartmatch.astro` (prerender: true, ~23KB)

This is a **scrollytelling** page with:
- **Left column:** 6 scrolling narrative sections
- **Right column:** Persistent composite score panel (sticky) with animated score ring

**6 Sections:**
1. **The Intelligence Layer** — Three-tier platform diagram (Patient → USRad Intelligence → Provider)
2. **Five Performance Signals** — Price (strongest), Proximity, Availability, Experience, Accreditation
3. **What Patients See** — Mock search result card with "USRad Recommended" badge
4. **Competitive Tiers** — Top performers → Strong competitors → Active participants
5. **Performance → Volume** — Chain: Score Improves → Placement Rises → Visibility Increases → Volume Grows
6. **Founding Advantage** — "First In Locks Market Position" with capacity bar (2 of 5 founding slots filled)

**Sticky Panel:**
- Composite score ring (SVG, animated via IntersectionObserver)
- 5 factor bars: Price, Proximity, Availability, Experience, Accreditation
- "USRad Recommended" badge (appears when score crosses threshold)
- Simulated data: "Midtown Imaging · Orlando, FL"

**CTAs:**
- Mid-page bridge: "View your territory →" → `/provider/network-map`
- Bottom: Gold CTA "Establish Your Position" → `${REMIX_URL}/signup?source=smartmatch`
- Secondary: "See how onboarding works →" → `/provider/portal-tour`

### Patient Search Result Preview (Mock)

The page includes a full-fidelity mock of what patients see:
- **Recommended card:** "Midtown Imaging Center" — $267.30, 2.4 miles, 92% confidence
- **Other options:** Orlando Imaging ($289, 84%), Central Florida MRI ($295, 79%), Lakeview ($310, 72%)
- Includes "Why this center ranks highest" breakdown

---

## 6. Portal Tour System

### Purpose: Reduce Provider Signup Friction by Showing the Product Before Signup

**Page:** `src/pages/provider/portal-tour.astro` (prerender: true, ~23KB)

### Architecture

```
/provider/portal-tour
  ├── Hero (flat navy)
  │   ├── "From Application to Your First Patient in Four Steps."
  │   ├── Step rail: Apply → Credential → Receive Patients → Scan & Get Paid
  │   ├── Stats: 10 days payment, $0 marketing cost, 1,200+ centers, 2-3 wks
  │   ├── Gold CTA: "Begin Provider Onboarding" → ${REMIX_URL}/signup?source=portal-tour
  │   └── "Explore your market first →" → /provider/network-map
  │
  ├── Sticky Metric Bar (navy)
  │   └── 10-Day | $0 | HIPAA | ACR | 24/7
  │
  ├── Sticky Progress Bar (white, 4 step buttons)
  │
  └── Scrolling Walkthrough (two-column: narrative + sticky mockup panel)
      │
      ├── STEP 1: Apply (~10 minutes online)
      │   ├── 4 real onboarding steps documented
      │   │   1. Organization Profile (Legal name, EIN, address, signer)
      │   │   2. Facility Registration (Center, address, modalities, equipment)
      │   │   3. Pricing Configuration (Rates per modality, Medicare benchmark)
      │   │   4. Service Agreement (DocuSeal e-signature)
      │   └── Callout: "Autosave at Every Field" (2-second debounce)
      │
      ├── STEP 2: Credential (2-3 weeks standard)
      │   ├── Timeline: PSA Executed → Days 1-3 Docs → Days 3-14 Integration → Week 2-3 Live
      │   └── Go-Live Requirements panel: Agreement ✓, Credentialing ⟳, Insurance ○, Licensing ○
      │
      ├── STEP 3: Receive Patients
      │   ├── Assignment Lifecycle: Pending Activation → Cleared → Scheduled → Fulfillment → Disbursement
      │   ├── Privacy gate: pre-payment masked (first name + last initial), post-payment revealed
      │   └── Authorization number generated at confirm time
      │
      └── STEP 4: Scan & Get Paid
          ├── 10-business-day guaranteed disbursement
          ├── Report fulfillment: PDF upload → Anthropic AI extraction
          └── Financial panel: Revenue, Active, Pending, Next Disbursement
```

### Design Contract Compliance

The portal tour page includes the most detailed Design Contract reference in the codebase (50+ lines of comments):
- Sources its mockups from the actual portal engineering report
- Uses terminology from `terminology.ts` ("Assignment" not "Booking")
- Mirrors the real onboarding workflow: Organization → Facilities → Pricing → Agreement
- Mirrors the real Go-Live Requirements dashboard

### Conversion Strategy

The portal tour exists to answer: *"What does the product actually look like?"* before a provider commits. This is friction reduction — providers who see the portal are more likely to complete signup because they understand what they're getting.

---

## 7. Provider Acquisition System

### Full Provider Journey

```
AWARENESS
  /provider                     Landing page (HeroSection, TrustBar, Guarantee, Scanner Utilization,
                                Exit Value, Referral Workflow, Assignment Flow, HowItWorks,
                                MarketOpportunity Teaser, MarketScope, AnciCare Story,
                                Proven Success, Founding Partners, Consultation CTA, FAQ,
                                Network Building, Exit Modal)

INTELLIGENCE
  /provider/network-map         "See your market" — iframe to Remix map
  /provider/smartmatch          "How ranking works" — 5-factor scoring explainer
  /provider/portal-tour         "What onboarding looks like" — 4-step walkthrough

DECISION
  /provider/consultation        Schedule a call with USRad team
  /provider/faq                 Answer remaining objections

CONVERSION
  ${REMIX_URL}/signup?source=<page>    Provider signup (Remix app)

ONBOARDING (Astro — authenticated)
  /providers/login              Provider login (Supabase auth)
  /providers/pre-portal         Organization profile form
  /providers/onboarding/
    ├── facilities              Facility registration (modalities, equipment)
    ├── market-calculator       Revenue projection (county-level data: FL, GA, TX, CA, NY)
    ├── pricing-configurator    Rate setting per modality
    ├── pricing-customizer      Custom pricing adjustments
    ├── pricing-multi           Multi-state pricing
    ├── confirmation            Review all data before agreement
    ├── psa-signing             DocuSeal e-signature (template 1155842)
    └── success                 Celebration + portal redirect

POST-ONBOARDING (Astro — authenticated)
  /providers/portal/
    ├── index                   Dashboard home (Go-Live Requirements)
    ├── documents               Document management
    ├── profile                 Provider profile
    ├── settings                Account settings
    ├── centers                 Manage imaging centers
    └── security                Security settings
```

### Source Parameter Tracking

All provider CTAs now include source tracking for conversion attribution:

| Page | CTA Target | Source Parameter |
|------|-----------|-----------------|
| `/provider/network-map` | `${REMIX_URL}/signup` | `?source=map` |
| `/provider/smartmatch` | `${REMIX_URL}/signup` | `?source=smartmatch` |
| `/provider/portal-tour` | `${REMIX_URL}/signup` | `?source=portal-tour` |
| `/provider` (MarketScope) | `${REMIX_URL}/signup` | `?source=provider` |

### Provider Page Family — Coordinated Persuasion Sequence

The four provider sub-pages form a deliberate conversion funnel:

1. `/provider` — **Establish value proposition** (10-day payment, $0 cost, scanner utilization)
2. `/provider/network-map` — **Create urgency** (your market is closing, founding slots limited)
3. `/provider/smartmatch` — **Build confidence** (the system is fair, performance-based, transparent)
4. `/provider/portal-tour` — **Remove friction** (you know exactly what to expect before committing)

Each page cross-links to the others. All terminate at `${REMIX_URL}/signup?source=<page>`.

### Imaging Center Pages (Parallel Funnel — Legacy)

A parallel provider funnel exists at `/imaging-center/*` using `PartnerPageLayout`:
- `/imaging-center` — Overview with video background
- `/imaging-center/benefits` — Managed care benefits
- `/imaging-center/model` — Business model
- `/imaging-center/apply` — Application form
- `/imaging-center/signup` — Signup (Supabase auth)
- `/imaging-center/calculator` — ROI calculator
- `/imaging-center/schedule` — Schedule consultation
- `/imaging-center/implementation` — Implementation guide
- `/imaging-center/faq`, `/imaging-center/support`, `/imaging-center/experience`

**Note:** These pages use `PartnerPageLayout` (Manrope font, cream background) — a different design language from the Carbon-based `/provider` pages. This is a **duplication risk** — two separate funnels targeting the same audience with different branding.

---

## 8. Employer Funnel System

### Architecture

```
/employer                          Landing page (CarbonLayout, hideNewsletter)
  ├── EmployerHero                 Problem statement + value props ($260 MRIs)
  ├── DualSolution                 Workers' Comp vs Health Plan Members
  ├── ROICalculator                Interactive calculator with PDF report modal
  ├── CostAnalysis                 Hospital $3,200 → USRad $420
  ├── EmployerCaseExample          Composite case: $3.3M → $1.8M, 18 days faster
  ├── Implementation               30-day timeline
  ├── AnciCareLegacy               Founded 1994, CorVel acquisition
  ├── ExecutiveFAQ
  ├── CredibilityBar               168,000+ cases
  └── FinalCTA                     "Schedule Executive Briefing"

/employer/schedule                 Consultation scheduling
  ├── Stage 1: Lead capture form
  │   (firstName, lastName, email, phone, companyName,
  │    jobTitle, companySize, industry, timeline,
  │    imagingChallenges[], specificNeeds)
  └── Stage 2: Calendly embed (inline)

/employer/implementation-guide     Gated PDF resource
  ├── Preview: "What's inside" (30-day timeline, workflows, etc.)
  ├── Gated form: name, email (work only), company
  │   Anti-bot: honeypot + timing check (reject <3s)
  │   Free email domain block (Gmail, Yahoo, etc.)
  ├── Success: PDF download + lead score update (+20 intent_score)
  └── Secondary CTA: Schedule briefing with Michael
```

### Lead Scoring System

The employer funnel includes a **lead scoring system** in Supabase:

| Action | Table | Score Impact |
|--------|-------|-------------|
| Guide download | `guide_downloads` | `intent_score += 20` |
| ROI report | `employer_leads` | Tracked with company size + scan volumes |
| Consultation request | `employer_consultations` | Full contact + imaging challenges captured |

### Email Integration Chain

```
Astro API endpoint
  → POST ${REMIX_URL}/api/marketing-email (branded HTML templates)
  → Fallback: Resend API (simple HTML templates)
  → Admin notification: mcabrera@usrad.com
```

### ROI Report Generation

**Endpoint:** `/api/employer-roi-report` (POST)
- Uses `@sparticuz/chromium` + `puppeteer-core` for PDF generation
- Generates custom ROI PDF with company-specific calculations
- Stores lead in `employer_leads` table
- Sends PDF + admin notification via email

---

## 9. API & Data Layer

### API Endpoint Inventory

#### Patient-Facing APIs
| Endpoint | Method | Purpose | External Services |
|----------|--------|---------|-------------------|
| `/api/procedures/search` | GET | Procedure search | Supabase |
| `/api/facilities/[id]` | GET | Facility details | Supabase |
| `/api/facilities/[id]/pricing` | GET | Facility pricing | Supabase |
| `/api/centers/search-with-pricing` | GET | Center search + pricing | Supabase |
| `/api/geocode` | GET | Address geocoding | Google Maps API |
| `/api/validate-zip` | GET | ZIP code validation | Supabase (`zip_to_locality`) |
| `/api/contact` | POST | Contact form proxy | Proxies to `${REMIX_URL}/api/contact` |
| `/api/subscribe-newsletter` | POST | Newsletter signup | Supabase, Remix API, Resend |
| `/api/track-popup` | POST | Analytics event tracking | Supabase |

#### Provider APIs
| Endpoint | Method | Purpose | External Services |
|----------|--------|---------|-------------------|
| `/api/provider/search-with-pricing` | GET | Provider network search | Supabase |
| `/api/provider/contracts` | GET/POST | Provider contracts | Supabase |
| `/api/provider/revenue-analysis` | GET | Revenue reporting | Supabase |
| `/api/provider-consultation` | POST | Provider lead capture | Supabase, Remix API, Resend |
| `/api/docuseal/create-submission` | POST | E-signature generation | DocuSeal API |
| `/api/docuseal/webhook` | POST | Signature completion webhook | DocuSeal |
| `/api/check-psa-status` | GET | PSA status check | DocuSeal |

#### Employer APIs
| Endpoint | Method | Purpose | External Services |
|----------|--------|---------|-------------------|
| `/api/employer-consultation` | POST | Lead capture | Supabase, Remix API, Resend |
| `/api/employer-guide-download` | POST | Gated PDF delivery | Supabase (storage + lead_scores), Remix API |
| `/api/employer-roi-report` | POST | PDF generation + delivery | Puppeteer, Supabase, Remix API |

#### Medicare/Pricing APIs
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/medicare/price` | GET | Medicare rate lookup |
| `/api/medicare/localities` | GET | Locality data |
| `/api/medicare/procedures` | GET | Procedure catalog |
| `/api/medicare/batch-price` | POST | Batch pricing |
| `/api/medicare/health` | GET | Health check |
| `/api/pricing/calculate` | POST | Price calculation |
| `/api/pricing/quote` | POST | Price quote |

#### Booking APIs
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/booking/create-request` | POST | Create booking (4-hr provider response deadline) |
| `/api/booking/patient-bookings` | GET | Patient booking history |
| `/api/booking/provider-response` | POST | Provider response to booking |

#### Admin/Internal APIs
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/admin/customer-service` | POST | CS management |
| `/api/admin/populate-medicare-data` | POST | Medicare data import |
| `/api/cron/check-follow-ups` | GET | Vercel cron (daily 9 AM UTC, requires CRON_SECRET) |
| `/api/guide-download` | POST | General guide download gate |

#### Debug Endpoints (Should Not Be in Production)
| Endpoint | Risk |
|----------|------|
| `/api/debug-data` | MEDIUM — exposes internal data |
| `/api/debug-facilities` | MEDIUM — exposes facility data |
| `/api/test` | LOW — test endpoint |

### What Touches Core Platform vs Marketing-Only

| Scope | Endpoints | Risk |
|-------|-----------|------|
| **Marketing-only** | `/api/contact`, `/api/subscribe-newsletter`, `/api/track-popup`, `/api/employer-*`, `/api/provider-consultation`, `/api/guide-download` | LOW — isolated lead capture |
| **Shared platform data** | `/api/procedures/*`, `/api/facilities/*`, `/api/centers/*`, `/api/medicare/*`, `/api/pricing/*` | MEDIUM — reads from shared Supabase tables |
| **Booking system** | `/api/booking/*` | HIGH — creates patient records, triggers provider workflows |
| **Provider contracts** | `/api/provider/contracts`, `/api/docuseal/*`, `/api/check-psa-status` | HIGH — legal documents, contract state |
| **Admin operations** | `/api/admin/*`, `/api/cron/*` | HIGH — data mutation, automated processes |

---

## 10. Cross-App Boundary (Astro → Remix)

### All Handoff Points

| Source (Astro) | Target (Remix) | What Is Passed | Criticality |
|----------------|----------------|----------------|-------------|
| Hero search form | `${REMIX_URL}/pbs/search` | `?cpt=...&zip=...&procedureSearch=...&bodyPartKey=...&displayLabel=...` | **CRITICAL** — primary patient conversion |
| "My Bookings" footer link | `${REMIX_URL}/pbs/my-bookings` | Nothing (user must authenticate in Remix) | MEDIUM |
| Patient login dropdown | `${REMIX_URL}/patient/login` | Nothing | MEDIUM |
| Provider login dropdown | `${REMIX_URL}/login` | Nothing | MEDIUM |
| Network Map iframe | `${REMIX_URL}/provider/market-map?embed=true` | `postMessage({ type: "usrad:map-focus" })` | HIGH — visual system |
| Provider signup CTAs | `${REMIX_URL}/signup?source=<page>` | `?source=map|smartmatch|portal-tour|provider` | HIGH — provider conversion |
| Contact form | `${REMIX_URL}/api/contact` | Form data (proxied) | LOW |
| Email sending (multiple) | `${REMIX_URL}/api/marketing-email` | Email templates + data | MEDIUM |

### What Must NEVER Break

1. **Query parameter names to `/pbs/search`:** `cpt`, `zip`, `procedureSearch`, `bodyPartKey`, `displayLabel` — Remix routes parse these
2. **`PUBLIC_REMIX_URL` environment variable** — used in 20+ files
3. **Map iframe URL:** `${REMIX_URL}/provider/market-map?embed=true` — the `?embed=true` flag likely controls whether Remix renders chrome
4. **Signup source parameter:** `${REMIX_URL}/signup?source=<page>` — Remix likely uses this for conversion attribution
5. **`/api/marketing-email` endpoint on Remix** — Astro's lead capture falls back to Resend if this fails, but branded templates require it

### Environment Variable Contract

```javascript
// Astro side
const REMIX_URL = import.meta.env.PUBLIC_REMIX_URL || "https://app.usrad.com";
// Some files use: || "http://localhost:5173"
// Some files use: ?? "https://app.usrad.com"

// Production: https://app.usrad.com
// Dev: http://192.168.68.100:5173 or http://localhost:5173
```

### Dev Proxy Configuration

```javascript
// astro.config.mjs
server: {
  port: 3000,
  host: true,
  proxy: {
    '/pbs': 'http://localhost:5173'  // Routes /pbs/* to Remix in dev
  }
}
```

---

## 11. Design System Architecture

### Layout Hierarchy

| Layout | File | Font | Background | Used By | Status |
|--------|------|------|------------|---------|--------|
| **CarbonLayout** | `src/layouts/CarbonLayout.astro` | Inter | `bg-white` | All primary marketing pages, provider pages | PRIMARY |
| **MainPatientLayout** | `src/layouts/MainPatientLayout.astro` | Manrope | `bg-[#fcf9f0]` | Patient portal pages | ACTIVE |
| **ProviderLayout** | `src/layouts/ProviderLayout.astro` | System sans | `bg-gray-50` | Provider portal (noindex, nofollow) | ACTIVE |
| **PartnerPageLayout** | `src/layouts/PartnerPageLayout.astro` | Manrope | `bg-[#fcf9f0]` | Imaging center sub-pages | ACTIVE |
| **PostLayout** | `src/layouts/PostLayout.astro` | Inter | White | Blog posts | ACTIVE |
| **MainLayout** | `src/layouts/MainLayout.astro` | Manrope | `bg-[#fcf9f0]` | `/news`, employer/schedule | DEPRECATED |
| **PartnerLayout** | `src/layouts/PartnerLayout.astro` | Manrope | White | Partner pages | ACTIVE |

### CarbonLayout Internals

```html
<html lang="en">
  <head>
    ├── Meta: charset, viewport (user-scalable=no), description
    ├── Color scheme: light only
    ├── OG tags (STATIC — og:title and og:description hardcoded)
    ├── Twitter card: summary_large_image
    ├── Favicon: SVG + ICO + apple-touch-icon
    ├── Google Fonts: Inter (preconnect, 4 weights)
    ├── Google Analytics 4 (G-60JBC6WVCW)
    ├── AOS CSS (unpkg CDN)
    └── bfcache prevention script
  <body class="font-inter text-gray-900 bg-white antialiased">
    ├── CarbonHeader (client:load, isHeroPage prop)
    ├── <main class={isHeroPage ? "" : "pt-16"}>
    │   └── <slot />
    ├── CarbonFooter (hideNewsletter prop)
    ├── Chat widget (fixed bottom-right, non-functional placeholder)
    ├── AOS JS (unpkg CDN, init: duration 800, once true)
    └── Lottie Player (unpkg CDN — loaded on EVERY page)
```

### Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Primary Blue | `#003087` | Buttons, links, header, hero backgrounds |
| Primary Dark | `#002266` | Hover states |
| Gold / Accent | `#cc9933` / `#C9A24D` | B2B recruitment CTAs only (§8.1) |
| Background (Carbon) | `#ffffff` | CarbonLayout body |
| Background (Legacy) | `#fcf9f0` | MainLayout/PartnerPageLayout body |
| Text Primary | `#111827` (gray-900) | Body text |
| Text Secondary | `#6b7280` (gray-500) | Secondary text |
| Accent Surface | `#E8EDF5` | Light blue callout backgrounds |
| Silver Pin | `#B0B8C8` | Activating provider markers |
| Font Primary | Inter | CarbonLayout |
| Font Legacy | Manrope | MainLayout, PartnerPageLayout |
| Border Radius | `0.5rem` inputs, `1rem` cards, `1.5rem` modals | Consistent across system |
| Transition Speed | `200-300ms` (≤300ms per §15.2) | All interactions |

### Design Contract (Provider Pages)

The provider page family (`/provider/*`) follows a formal Design Contract:

| Rule | Description |
|------|-------------|
| §7.1 | No gradients on content surfaces |
| §7.3 | Hero uses flat `bg-[#003087]` |
| §8.1 | Gold (`#C9A24D`) for B2B recruitment CTA only |
| §8.2 | Gold prohibited on payment/financial surfaces |
| §8.3 | Gold max 2 elements per viewport |
| §8.4 | Gold + amber on same surface: prohibited |
| §3.5 | No backdrop-blur, bg-white/*, border-white/* on light surfaces |
| §2.5 | No blue-*, indigo-*, purple-*, pink-*, slate-* Tailwind tokens |
| §15.2 | Transitions ≤300ms, ease-in-out or ease-out only |
| §15.3 | No animate-pulse, bounce, scale-on-hover, parallax, infinite loops |
| §15.8 | prefers-reduced-motion respected |

### Component Reuse Patterns

| Pattern | Implementation |
|---------|---------------|
| **Eyebrow badge** | `inline-flex gap-2 bg-[#E8EDF5] border border-[#003087]/15 rounded-full px-4 py-1.5` with dot + label |
| **Section heading** | `text-3xl sm:text-4xl font-bold text-gray-900 leading-tight` |
| **Info callout** | `bg-[#E8EDF5] border-l-4 border-l-[#003087] rounded-xl p-4` |
| **Stat cards** | `bg-white/10 border border-white/15 rounded-xl p-5` (on navy surfaces) |
| **Gold CTA button** | `bg-[#C9A24D] hover:bg-[#b8901f] text-white font-semibold px-8 py-3.5 rounded-lg` |
| **Navy CTA button** | `bg-[#003087] hover:bg-[#002266] text-white` |
| **Back link** | `text-white/50 hover:text-white text-sm` with chevron SVG |

---

## 12. SEO & Performance Analysis

### SEO Status — CRITICAL GAPS REMAIN

| Issue | Severity | Status Since v1 |
|-------|----------|-----------------|
| **No sitemap.xml** | HIGH | UNCHANGED — `@astrojs/sitemap` not installed |
| **No robots.txt** | HIGH | UNCHANGED — test/dashboard pages may be indexed |
| **Static Open Graph** | MEDIUM | UNCHANGED — `og:title`/`og:description` hardcoded in CarbonLayout |
| **No canonical tags** | MEDIUM | UNCHANGED — no `<link rel="canonical">` |
| **No JSON-LD structured data** | MEDIUM | UNCHANGED — no MedicalBusiness, FAQPage, BlogPosting schema |
| **Duplicate viewport meta** | LOW | UNCHANGED — two viewport tags in CarbonLayout |
| **Test pages accessible** | MEDIUM | UNCHANGED — `/test-page` still accessible |
| **Debug API endpoints** | MEDIUM | NEW — `/api/debug-data`, `/api/debug-facilities`, `/api/test` in production |
| **user-scalable=no** | MEDIUM | UNCHANGED — WCAG violation, prevents pinch-to-zoom |

### Performance Issues

| Issue | Severity | Impact |
|-------|----------|--------|
| **Lottie Player loaded globally** | HIGH | ~250KB loaded via CDN on every CarbonLayout page, even if not used |
| **AOS from CDN (unpkg.com)** | MEDIUM | ~14KB + DNS lookup + connection overhead; should be bundled |
| **bfcache disabled** | MEDIUM | `pageshow` event forces reload — hurts back-button performance |
| **No image optimization** | MEDIUM | No `@astrojs/image`; standard `<img>` tags without `srcset` |
| **CDN single point of failure** | MEDIUM | AOS + Lottie both from `unpkg.com` |
| **Puppeteer in production** | LOW | `@sparticuz/chromium` (~50MB) in dependencies for PDF generation |
| **Procedure data file size** | LOW | `procedure-data.js` is ~118KB — loaded in hero on homepage |

### React Hydration Footprint (Marketing Pages)

| Component | Hydration | Page |
|-----------|-----------|------|
| `CarbonHeader.jsx` | `client:load` | Every CarbonLayout page |
| All other hero/search components | Vanilla JS | Homepage only |
| Provider portal components | `client:load` | Portal only (authenticated) |

**Assessment:** React hydration on marketing pages is minimal — only the header. Search orchestration is vanilla JS via `window.searchManager`. This is architecturally efficient.

### Google Analytics

- **GA4 ID:** `G-60JBC6WVCW`
- **Integration:** Inline script in CarbonLayout `<head>` (lines 89-105)
- **Cross-domain linking:** `linker: { domains: ["usrad.com", "app.usrad.com"] }` — ensures session continuity across Astro → Remix handoff
- **Anonymize IP:** Enabled
- **Analytics utility:** `src/utils/analytics.ts` — `trackMarketingEvent()` helper that tags all events with `app_surface: 'marketing'`
- **Event contract:** Documented in `docs/analytics/analytics-event-contract.md`
- **Search tracking:** GA4 event `hero_search_submitted` fired before form submission in SearchStep2

---

## 13. Conversion System Analysis

### Primary Funnels

| Funnel | Entry | Decision Point | Conversion | Success Metric |
|--------|-------|----------------|------------|----------------|
| **Patient Search** | Homepage hero | Procedure selection + ZIP entry | `GET ${REMIX_URL}/pbs/search` | Search → booking |
| **Provider Signup** | `/provider` page | Network-map + SmartMatch + Portal-tour | `${REMIX_URL}/signup?source=<page>` | Signup → PSA signing |
| **Employer Lead** | `/employer` page | ROI calculator + case study | Consultation form → Calendly | Form → meeting |

### Secondary Funnels

| Funnel | Entry | Destination |
|--------|-------|-------------|
| Patient Login | Header dropdown | `${REMIX_URL}/patient/login` |
| Provider Login | Header dropdown | `${REMIX_URL}/login` |
| Physician Login | Header dropdown | `/login/referrallogin` |
| My Bookings | Footer link | `${REMIX_URL}/pbs/my-bookings` |
| Newsletter | Footer form | `POST /api/subscribe-newsletter` |
| Contact | `/contact` page | `POST /api/contact` → Remix proxy |
| Guide Download | `/employer/implementation-guide` | Gated form → PDF + lead score |

### Where Conversion Is Won

1. **Patient:** The search-to-Remix handoff is smooth with a polished loading overlay that builds confidence. SmartMatch™ branding creates a sense of intelligent recommendation rather than simple search.
2. **Provider:** The three-page persuasion sequence (map → smartmatch → portal-tour) systematically addresses objections: *"Is there opportunity?" → "Is the system fair?" → "What does the product look like?"*
3. **Employer:** The gated implementation guide captures high-intent leads (work email required, anti-bot measures) and the ROI calculator creates personalized value propositions.

### Where Conversion Is Lost — Friction Points

| Friction | Impact | Detail |
|----------|--------|--------|
| **Dual funnel for same audience** | Provider confusion | `/provider` (Carbon) and `/imaging-center` (PartnerPageLayout) target the same audience with different branding |
| **Non-functional chat widget** | Patient frustration | "Need help?" bubble on every page does nothing |
| **Employer schedule uses MainLayout** | Brand inconsistency | `/employer/schedule` uses deprecated MainLayout (Manrope font, cream bg) while `/employer` uses CarbonLayout |
| **Exit modal on /provider** | Potential annoyance | `ExitModal.astro` intercepts exit intent — may irritate providers |
| **No mobile map experience** | Lost mobile providers | Network map iframe may not render well on mobile |
| **Static market data on teaser** | Credibility risk | MarketOpportunityTeaser shows fake data (5 partners, 520 centers) — if a provider notices discrepancy with live map |

---

## 14. Downstream Blast Radius

### What Breaks If Search Changes

| Change | Impact |
|--------|--------|
| Rename query parameters (`cpt`, `zip`, `procedureSearch`, `bodyPartKey`, `displayLabel`) | **CRITICAL** — Remix PBS search page will not receive data; patient search completely broken |
| Change `procedure-data.js` CPT codes | **HIGH** — Remix may not find matching procedures; pricing lookups fail |
| Remove `window.searchManager` global | **HIGH** — All hero components break (SearchStep1, SearchStep2, MobileSearchModal, BrowseAllModal) |
| Change search form `action` URL pattern | **CRITICAL** — patients navigate to wrong/nonexistent page |

### What Breaks If Params Change

| Change | Impact |
|--------|--------|
| Rename `PUBLIC_REMIX_URL` env var | **CRITICAL** — all cross-app links break (20+ files) |
| Change Remix `/signup` route | **HIGH** — all provider CTAs break (4+ pages with `?source=` tracking) |
| Change Remix `/provider/market-map` route | **HIGH** — network map iframe shows 404 |
| Change `?embed=true` parameter meaning | **HIGH** — map may render with unwanted chrome |
| Change Remix `/api/marketing-email` endpoint | **MEDIUM** — email sending degrades to Resend fallback |
| Change Remix `/api/contact` endpoint | **LOW** — contact form stops working |

### What Breaks If Header/Footer Drift

| Change | Impact |
|--------|--------|
| Add/remove nav links in CarbonHeader | **MEDIUM** — Remix PBSHeader will have different navigation; user confusion |
| Change login portal URLs in header | **MEDIUM** — one side points to wrong location |
| Change footer links or newsletter endpoint | **LOW** — inconsistency but not broken functionality |
| Change header scroll/transparency behavior | **LOW** — visual inconsistency between Astro and Remix |

### What Breaks If Provider Onboarding Changes

| Change | Impact |
|--------|--------|
| Change DocuSeal template ID | **HIGH** — PSA signing flow breaks |
| Change Supabase table schema (`imaging_centers`, `provider_contracts`) | **HIGH** — portal queries fail |
| Change onboarding step URLs | **MEDIUM** — portal-tour page references become stale |
| Change Go-Live Requirement names | **LOW** — portal-tour mockup becomes inaccurate |

---

## 15. Technical Risk Register

### HIGH RISK

| # | Risk | Impact | Detail |
|---|------|--------|--------|
| H1 | **No sitemap.xml** | SEO — pages not discovered by crawlers | No `@astrojs/sitemap` integration installed. UNCHANGED from v1 |
| H2 | **No robots.txt** | SEO — test/dashboard/debug pages may be indexed | `/test-page`, debug APIs, provider dashboards accessible. UNCHANGED from v1 |
| H3 | **Lottie Player loaded globally** | Performance — ~250KB on every page | Loaded in CarbonLayout even when not used. UNCHANGED from v1 |
| H4 | **Header/Footer manual sync** | Consistency — drift between Astro and Remix | Last synced 2025-12-26 — **15+ months ago**. WORSENED from v1 |
| H5 | **Static Open Graph tags** | SEO — social sharing shows wrong content per page | `og:title` and `og:description` hardcoded in CarbonLayout. UNCHANGED |
| H6 | **bfcache disabled** | Performance — back button forces full reload | `pageshow` listener reloads on bfcache restore. UNCHANGED |
| H7 | **Map iframe postMessage wildcard** | Security — `postMessage("*")` allows any origin to receive | Network map sends messages to `"*"` target origin. NEW |
| H8 | **Debug API endpoints in production** | Security — internal data exposed | `/api/debug-data`, `/api/debug-facilities`, `/api/test` accessible. NEW |

### MEDIUM RISK

| # | Risk | Impact | Detail |
|---|------|--------|--------|
| M1 | **No canonical tags** | SEO — duplicate content issues | No `<link rel="canonical">` on any page |
| M2 | **No JSON-LD structured data** | SEO — no rich snippets | No MedicalBusiness, FAQPage, BlogPosting schema |
| M3 | **AOS from CDN** | Reliability — unpkg.com outage breaks animations | Should be bundled locally |
| M4 | **Dual search engine** | Complexity — two code paths maintained | Both `USE_NEW_PROCEDURE_ENGINE` and `ENABLE_DEBUG_NEW_ENGINE` default true |
| M5 | **7+ layout files** | Maintenance — overlapping patterns | MainLayout deprecated but still used by `/news` and `/employer/schedule` |
| M6 | **user-scalable=no** | Accessibility — WCAG violation | Prevents pinch-to-zoom for users with low vision |
| M7 | **Dual provider funnel** | Confusion — `/provider` and `/imaging-center` target same audience | Different layouts, fonts, backgrounds for same audience. NEW |
| M8 | **Non-functional chat widget** | UX — misleading UI element | "Need help?" bubble exists on every CarbonLayout page with no backend |
| M9 | **Static data in MarketOpportunityTeaser** | Credibility — fake numbers shown | Shows "5 USRad partners" + "520 MRI centers mapped" — may not match live map. NEW |
| M10 | **Puppeteer in production dependencies** | Bundle — `@sparticuz/chromium` ~50MB | Used only for employer ROI PDF generation. NEW |
| M11 | **localStorage newsletter backup** | Data hygiene — subscriber data in browser storage | Development artifact. UNCHANGED |

### LOW RISK

| # | Risk | Impact | Detail |
|---|------|--------|--------|
| L1 | **No image optimization** | Performance — unoptimized images | No `@astrojs/image` integration |
| L2 | **Legacy x-prefixed files** | Code bloat — 100+ stale files | Should be cleaned up |
| L3 | **Duplicate viewport meta** | Code quality — two viewport tags | Second overrides first |
| L4 | **Careers page "Coming Soon"** | Brand — empty job listings | All positions marked "Coming Soon" |
| L5 | **Console.log in search components** | Code quality — debug logs in production | Multiple `console.log` calls |
| L6 | **Employer schedule uses MainLayout** | Brand inconsistency — different font/background | Should be migrated to CarbonLayout |

---

## 16. Safe Refactor Guidelines

### Safe to Change (No External Dependencies)

- Blog post content, styling, and data in `src/data/blogPosts.js`
- About page copy and timeline
- FAQ content and categories in `src/pages/faq.astro`
- CSS animations and visual polish
- Internal page links between marketing pages
- Social proof numbers and testimonials
- Image assets in `public/images/`
- Provider page copy (not structure or CTAs)
- Design Contract visual rules (applied within provider page family)

### Change with Caution (Internal Dependencies)

| What | Why |
|------|-----|
| **Search step components** | Interconnected via `window.searchManager` state machine — changing one breaks others |
| **CarbonLayout** | Every marketing page inherits from it — changes cascade everywhere |
| **Procedure data** | `public/js/procedure-data.js` feeds both search engines and popular procedures |
| **API endpoints** | May be called by Remix app, webhooks, or cron jobs |
| **Provider onboarding flow** | Portal-tour page references specific step names, fields, and states |
| **MarketOpportunityTeaser** | Static data must be updated when live map data changes |
| **Feature flags** | Changing `USE_NEW_PROCEDURE_ENGINE` switches entire search behavior |

### Requires Cross-App Coordination — Do NOT Change Without Remix Sync

| What | Contract |
|------|----------|
| **CarbonHeader.jsx** | Must sync with Remix `PBSHeader.tsx` |
| **CarbonFooter.astro** | Must sync with Remix `PBSFooter.tsx` |
| **SearchStep2 form action** | URL structure must match Remix route `${REMIX_URL}/pbs/search` |
| **Query parameter names** | `cpt`, `zip`, `procedureSearch`, `bodyPartKey`, `displayLabel` consumed by Remix |
| **`PUBLIC_REMIX_URL`** | Environment variable used in 20+ files |
| **Provider signup CTAs** | `${REMIX_URL}/signup?source=<page>` — Remix must accept `source` param |
| **Network map iframe URL** | `${REMIX_URL}/provider/market-map?embed=true` — Remix must serve this route |
| **Supabase schema** | Shared between Astro and Remix — table changes affect both |
| **Marketing email API** | `${REMIX_URL}/api/marketing-email` — endpoint contract |

### Must NEVER Change Without Full System Audit

1. **CPT codes in `procedure-data.js`** — Remix pricing system depends on these exact codes
2. **DocuSeal template ID `1155842`** — PSA signing flow is legally binding
3. **Supabase table names** (`imaging_centers`, `provider_contracts`, `appointment_requests`, etc.)
4. **GA4 measurement ID** (`G-60JBC6WVCW`) — analytics continuity
5. **Cron endpoint** (`/api/cron/check-follow-ups`) — Vercel cron configuration depends on this exact path

---

## 17. AI Handoff Context Block

```yaml
# ═══════════════════════════════════════════════════════
# USRad Marketing System — AI Handoff Context (v2)
# Updated: 2026-04-12
# ═══════════════════════════════════════════════════════

project: USRad Marketing Website
framework: Astro 5.7.4 (SSR mode)
ui_library: React 19.1.0 (islands — header only on marketing pages)
css: Tailwind CSS 3.4.17 via @astrojs/tailwind
deployment: Vercel (SSR adapter, maxDuration 30s, memory 1024MB)
database: Supabase (PostgreSQL)
email: Resend (fallback) + Remix API (primary for branded templates)
esign: DocuSeal (template 1155842)
maps: Google Maps API + Leaflet (homepage) + Remix iframe (network map)
pdf: Puppeteer + @sparticuz/chromium (employer ROI reports)
analytics: Google Analytics 4 (G-60JBC6WVCW)

# ── Layouts ──
primary_layout: src/layouts/CarbonLayout.astro
secondary_layouts:
  - src/layouts/MainPatientLayout.astro (patient portal)
  - src/layouts/ProviderLayout.astro (provider portal, noindex)
  - src/layouts/PartnerPageLayout.astro (imaging center pages)
  - src/layouts/PostLayout.astro (blog)
  - src/layouts/MainLayout.astro (DEPRECATED — still used by /news, /employer/schedule)

# ── Typography & Colors ──
primary_font: Inter (Google Fonts, 400/500/600/700)
legacy_font: Manrope (PartnerPageLayout, MainLayout)
primary_colors:
  blue: "#003087"
  blue_dark: "#002266"
  gold: "#cc9933"
  gold_alt: "#C9A24D"
  accent_surface: "#E8EDF5"
  background_carbon: "#ffffff"
  background_legacy: "#fcf9f0"
  text_primary: "#111827"
  text_secondary: "#6b7280"
  silver_pin: "#B0B8C8"
  navy_cluster: "#1E3A5F"

# ── Search System ──
homepage: src/pages/index.astro
hero_system: src/components/hero/HeroSection.astro
search_engine: src/lib/search-manager.ts
new_engine: src/lib/procedure-resolver.ts
search_utils: src/lib/search-utils.ts
procedure_data: public/js/procedure-data.js (~118KB)
feature_flags: src/lib/feature-flags.ts
  USE_NEW_PROCEDURE_ENGINE: true (default)
  ENABLE_DEBUG_NEW_ENGINE: true (default)

# ── Header / Footer (Source of Truth) ──
header: src/components/CarbonHeader.jsx (React, client:load)
footer: src/components/CarbonFooter.astro
header_sync_target: app/components/pbs/PBSHeader.tsx (Remix)
footer_sync_target: app/components/pbs/PBSFooter.tsx (Remix)
last_sync: 2025-12-26

# ── Cross-App Boundary ──
conversion_form_action: "${PUBLIC_REMIX_URL}/pbs/search"
conversion_params: [cpt, zip, procedureSearch, bodyPartKey, displayLabel]
remix_url_env: PUBLIC_REMIX_URL
remix_url_prod: https://app.usrad.com
remix_url_dev: http://localhost:5173

cross_app_handoffs:
  - target: "${REMIX_URL}/pbs/search"
    params: [cpt, zip, procedureSearch, bodyPartKey, displayLabel]
    criticality: CRITICAL
  - target: "${REMIX_URL}/signup"
    params: [source]
    sources: [map, smartmatch, portal-tour, provider]
    criticality: HIGH
  - target: "${REMIX_URL}/provider/market-map?embed=true"
    type: iframe
    communication: postMessage (usrad:map-focus)
    criticality: HIGH
  - target: "${REMIX_URL}/patient/login"
    criticality: MEDIUM
  - target: "${REMIX_URL}/login"
    criticality: MEDIUM
  - target: "${REMIX_URL}/pbs/my-bookings"
    criticality: MEDIUM
  - target: "${REMIX_URL}/api/marketing-email"
    type: API proxy (lead emails)
    fallback: Resend direct
    criticality: MEDIUM
  - target: "${REMIX_URL}/api/contact"
    type: API proxy (contact form)
    criticality: LOW

# ── Provider System (NEW in v2) ──
provider_landing: src/pages/provider.astro
provider_network_map: src/pages/provider/network-map.astro
provider_smartmatch: src/pages/provider/smartmatch.astro
provider_portal_tour: src/pages/provider/portal-tour.astro
provider_consultation: src/pages/provider/consultation.astro
provider_faq: src/pages/provider/faq.astro

provider_signup_entry: ${REMIX_URL}/signup?source=<page>
provider_onboarding: /providers/onboarding/*
provider_portal: /providers/portal/*
provider_psa: DocuSeal template 1155842

smartmatch_scoring_factors:
  - Price Competitiveness (strongest signal)
  - Geographic Proximity
  - Appointment Availability
  - Patient Experience
  - Clinical Accreditation (ACR required)

pin_system:
  gold: "#CC9933" — contracted, active provider
  silver: "#B0B8C8" — activating provider (credentialing)
  navy_cluster: "#1E3A5F" — ACR center count (market density)
  dashed: open market opportunity

# ── Employer System ──
employer_landing: src/pages/employer.astro (CarbonLayout)
employer_schedule: src/pages/employer/schedule.astro (MainLayout — inconsistency)
employer_guide: src/pages/employer/implementation-guide.astro
employer_apis:
  - /api/employer-consultation (lead capture → Supabase + email)
  - /api/employer-guide-download (gated PDF → lead scoring)
  - /api/employer-roi-report (Puppeteer PDF generation)
lead_scoring_table: lead_scores (intent_score field)

# ── Design Contract (Provider Pages) ──
design_contract:
  "§7.1": No gradients on content surfaces
  "§7.3": Hero uses flat bg-[#003087]
  "§8.1": Gold for B2B recruitment CTA only
  "§8.2": Gold prohibited on payment/financial surfaces
  "§8.3": Gold max 2 per viewport
  "§15.2": Transitions ≤300ms
  "§15.3": No animate-pulse/bounce/scale-on-hover/parallax/infinite
  "§15.8": prefers-reduced-motion respected

# ── Blog System ──
blog_data: src/data/blogPosts.js (10 posts, 6 categories)
blog_hub: src/pages/blog.astro (SSR)
blog_posts: src/pages/blog/[slug].astro (dynamic)

# ── Critical Files — Do Not Change Without Coordination ──
critical_files:
  - src/components/CarbonHeader.jsx (→ Remix PBSHeader.tsx)
  - src/components/CarbonFooter.astro (→ Remix PBSFooter.tsx)
  - src/components/hero/SearchStep2.astro (form action + params)
  - public/js/procedure-data.js (CPT codes → Remix pricing)
  - src/pages/provider/network-map.astro (iframe → Remix market-map)
  - All /api/* endpoints (may be called by Remix or external webhooks)

# ── SEO Gaps (Unchanged) ──
seo_gaps:
  - No sitemap.xml (@astrojs/sitemap not installed)
  - No robots.txt
  - No canonical tags
  - No JSON-LD structured data
  - Static Open Graph tags (hardcoded in CarbonLayout)
  - Debug API endpoints accessible in production

# ── Performance Issues ──
performance_issues:
  - Lottie Player loaded globally (~250KB every page)
  - AOS from CDN (should bundle)
  - bfcache disabled (pageshow reload)
  - No image optimization (@astrojs/image not installed)
  - procedure-data.js ~118KB loaded on homepage
```

---

*Report generated: April 12, 2026*
*Full system rebuild — not a refresh of v1*
*Audited by: Claude Opus 4.6*
*Files analyzed: 60+ pages, 80+ components, 30+ API endpoints, 7 layouts, 2 search engines*
