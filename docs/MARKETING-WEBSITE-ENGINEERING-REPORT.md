# Marketing Website — Engineering Intelligence Report

**Audit Date:** March 4, 2026
**Codebase:** USRad Patient Platform (Astro 5.7.4 + React 19.1.0 + Supabase)
**Deployment:** Vercel (SSR mode)
**Report Status:** INITIAL BASELINE

---

## 1. Executive Summary

USRad's marketing site is built on **Astro 5.7.4** with **server-side rendering** deployed to **Vercel**. The primary layout is `CarbonLayout.astro` (Inter font, white background), which powers all patient-facing marketing pages. A legacy `MainLayout.astro` (Manrope font, cream background) exists but is only used by the `/news` page.

The site serves four audiences: **patients** (primary), **employers**, **imaging center providers**, and **investors**. The homepage conversion funnel is a two-step progressive disclosure search: (1) select a procedure via universal search modal → (2) enter ZIP code → form GET to `${PUBLIC_REMIX_URL}/pbs/search` in the external Remix application.

**Key architectural facts:**
- **~50+ production pages** plus ~100+ legacy/test files (x-prefixed)
- **React hydration** limited to `CarbonHeader.jsx` (`client:load`) — minimal island overhead
- **Dual search engine** system (Legacy + New Engine) controlled by feature flags
- **Supabase** for database, auth, and real-time features
- **DocuSeal** for provider PSA e-signatures
- **Resend** for transactional email
- **No sitemap.xml or robots.txt** — critical SEO gap
- **CarbonHeader and CarbonFooter** are marked as source-of-truth files that must sync with Remix's `PBSHeader.tsx` / `PBSFooter.tsx`

---

## 2. Homepage Runtime Architecture

### Entry Point: `src/pages/index.astro`

```
CarbonLayout (title="USRad - MRI Scans in 48 Hours, 70% Less", isHeroPage=true)
  ├── HeroSection (remixUrl=REMIX_URL)
  │   ├── HeroBackground.astro
  │   ├── HeroHeadline.astro
  │   ├── SearchStep1.astro          ← procedure search entry point
  │   ├── SearchStep2.astro          ← ZIP input + form submission
  │   ├── MobileSearchModal.astro    ← universal search modal (all viewports)
  │   ├── SearchDropdown.astro       ← desktop dropdown (legacy, now deferred to modal)
  │   └── SearchLoadingOverlay.astro ← transition overlay
  ├── BrowseAllModal.astro
  ├── SocialProofBar.astro
  ├── HowItWorksSection.astro
  ├── PricingSection.astro
  ├── NetworkMapPinsCarbon.astro     ← Leaflet map with 1,500+ locations
  ├── AboutSection.astro
  └── BlogPreviewSection.astro
```

### Rendering Model

| Aspect | Detail |
|--------|--------|
| **Output mode** | `server` (SSR on every request) |
| **Prerender** | Not set on index — renders at request time |
| **React islands** | `CarbonHeader.jsx` with `client:load` is the only hydrated React component on homepage |
| **Client JS** | Vanilla JS for search orchestration via `window.searchManager` global |
| **CSS** | `global-carbon.css` (Tailwind + custom layers) |
| **Fonts** | Inter (400, 500, 600, 700) via Google Fonts with preconnect |
| **Animations** | AOS library loaded from unpkg CDN |
| **Lottie** | `@lottiefiles/lottie-player` loaded from unpkg CDN |

### Environment Variable

```javascript
const REMIX_URL = import.meta.env.PUBLIC_REMIX_URL || "http://localhost:5173";
```

- **Dev:** `http://192.168.68.100:5173`
- **Prod:** `https://app.usrad.com`

### Conversion Entry Points on Homepage

| Element | Target |
|---------|--------|
| Hero Search Form (Step 2) | `GET ${REMIX_URL}/pbs/search?cpt=...&zip=...&procedureSearch=...&bodyPartKey=...&displayLabel=...` |
| "Book Scan" button (header) | `/` (scrolls to hero) |
| "Book Your Scan" (footer CTA) | `/` |
| "My Bookings" (footer) | `${REMIX_URL}/pbs/my-bookings` |
| Patient Portal login | `${REMIX_URL}/patient/login` |
| Imaging Center login | `${REMIX_URL}/login` |
| Physician Portal login | `/login/referrallogin` |

---

## 3. Layout & Global Architecture

### Layout Files

| Layout | File | Font | Background | Used By |
|--------|------|------|------------|---------|
| **CarbonLayout** | `src/layouts/CarbonLayout.astro` | Inter | `bg-white` | All primary marketing pages |
| **MainLayout** | `src/layouts/MainLayout.astro` | Manrope | `bg-[#fcf9f0]` | `/news` only |
| **MainPatientLayout** | `src/layouts/MainPatientLayout.astro` | Manrope | `bg-[#fcf9f0]` | Patient-specific pages with sticky bar |
| **PostLayout** | `src/layouts/PostLayout.astro` | Inter (via CarbonLayout) | White | Blog posts |
| **ProviderLayout** | `src/layouts/ProviderLayout.astro` | System sans-serif | `bg-gray-50` | Provider dashboard (legacy) |
| **PartnerLayout** | `src/layouts/PartnerLayout.astro` | Manrope | `bg-white` | Partner pages |
| **PartnerPageLayout** | `src/layouts/PartnerPageLayout.astro` | Manrope | `bg-[#fcf9f0]` | Imaging center sub-pages |
| **DashboardLayout** | (referenced, not in layouts/) | — | — | Provider dashboard pages |

### CarbonLayout Structure (Primary)

```
<!doctype html>
<html lang="en">
  <head>
    ├── meta charset, viewport, description
    ├── viewport: maximum-scale=1.0, user-scalable=no (prevents zoom)
    ├── color-scheme: light only
    ├── theme-color: #ffffff
    ├── Open Graph: og:title, og:description, og:image (1200x630)
    ├── Twitter card: summary_large_image
    ├── Favicon: SVG + ICO + apple-touch-icon
    ├── Google Fonts: Inter (preconnect optimized)
    ├── AOS CSS from unpkg CDN
    └── bfcache prevention script (inline)
  <body class="font-inter text-gray-900 bg-white antialiased">
    ├── CarbonHeader (client:load, isHeroPage prop)
    ├── <main class={isHeroPage ? "" : "pt-16"}>
    │   └── <slot />
    ├── CarbonFooter (hideNewsletter prop)
    ├── Chat widget (fixed bottom-right, non-functional placeholder)
    ├── AOS JS from unpkg CDN
    ├── AOS init script (duration: 800, once: true, easing: ease-out, offset: 100)
    └── Lottie Player from unpkg CDN
```

### Header System: `src/components/CarbonHeader.jsx`

- **React component** hydrated with `client:load`
- **Source of truth** — must sync with `app/components/pbs/PBSHeader.tsx` in Remix (last synced: 2025-12-26)
- **Transparent mode** when `isHeroPage=true` and not scrolled, transitions to white on scroll
- **Mobile:** auto-hide on scroll-down, reappear on scroll-up
- **Desktop nav links:** How it works, What is an MRI?, About us, Contact
- **B2B links (subtle):** For Employers, For Imaging Centers
- **Login dropdown:** 3-portal system (Patient → Remix, Imaging Center → Remix, Physician → local)
- **CTA:** "Book Scan" → `/`

### Footer System: `src/components/CarbonFooter.astro`

- **Source of truth** — must sync with `app/components/pbs/PBSFooter.tsx` in Remix (last synced: 2025-12-26)
- **Newsletter signup** with `/api/subscribe-newsletter` endpoint (hideable via `hideNewsletter` prop)
- **5-column grid:** Brand, For Patients, For Business, Company
- **Trust banner:** Board-certified radiologists, Results in 24-48 hours, No hidden fees
- **Social links:** LinkedIn, Twitter, Facebook
- **Legal links:** Our Promise, Privacy Policy, Terms of Service, Accessibility

### Global Styles

| File | Purpose |
|------|---------|
| `src/styles/global-carbon.css` | Primary — Tailwind + Carbon design system layers |
| `src/styles/global.css` | Legacy — Manrope-based, cream background |
| `src/styles/portal.css` | Provider portal forms |
| `src/styles/facilities.css` | Facility management |
| `src/styles/dashboard-home.css` | Provider dashboard (glassmorphism) |
| `src/styles/profile-manager.css` | Profile editing |
| `src/styles/portal-layout.css` | Portal sidebar/nav |
| `src/styles/exit-intent-modal.css` | Exit intent engagement |
| `src/styles/signup-form.css` | Provider signup |
| `src/styles/signup-base.css` + `signup-mobile.css` | Responsive signup |
| `src/styles/confirmation.css` | Onboarding confirmation |
| `src/styles/market-calculator.css` | Revenue calculator |
| `src/styles/pricing-configurator.css` | Pricing setup |
| `src/styles/pricing-multi.css` | Multi-state pricing |
| `src/styles/psa-signing.css` | PSA e-signature flow |

### Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Primary Blue | `#003087` | Buttons, links, header |
| Primary Dark | `#002266` | Hover states |
| Gold/Accent | `#cc9933` | CTA buttons, secondary accents |
| Background (Carbon) | `#ffffff` | CarbonLayout body |
| Background (Legacy) | `#fcf9f0` | MainLayout body |
| Text Primary | `#111827` (`gray-900`) | Body text |
| Text Light | `#6b7280` (`gray-500`) | Secondary text |
| Font Primary | Inter | CarbonLayout |
| Font Legacy | Manrope | MainLayout |
| Border Radius (inputs) | `0.5rem` | Form fields |
| Border Radius (cards) | `1rem` | Card components |
| Border Radius (modals) | `1.5rem` | Modal dialogs |
| Transition Speed | `200-300ms` | All interactions |

### Tailwind Configuration: `tailwind.config.js`

```javascript
content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"]
theme.extend.fontFamily: { manrope: ['Manrope', 'sans-serif'] }
theme.extend.colors: {
  primary: '#003087',
  accent: '#cc9933',
  background: '#fcf9f0',
  backgroundAlt: '#f5e7c5',
  // + HSL variable bindings for shadcn/ui
}
plugins: [] // No plugins
```

---

## 4. Site Map & Page Graph

### Marketing Pages (Patient-Facing)

| Route | File | Layout | Purpose | Prerender |
|-------|------|--------|---------|-----------|
| `/` | `index.astro` | CarbonLayout | Homepage — hero search, pricing, map, blog | No (SSR) |
| `/about` | `about.astro` | CarbonLayout | Company story, founders, 30-year timeline | Yes |
| `/how-it-works` | `how-it-works.astro` | CarbonLayout | Step-by-step booking guide | Yes |
| `/contact` | `contact.astro` | CarbonLayout | Contact form with anti-bot protection | No (form) |
| `/faq` | `faq.astro` | CarbonLayout | Searchable FAQ accordion (68.9KB) | Yes |
| `/blog` | `blog.astro` | CarbonLayout | Blog hub — 11 posts, category filtering | No (SSR) |
| `/blog/[slug]` | `blog/[slug].astro` | PostLayout | Individual blog posts | Dynamic |
| `/education/what-is-an-mri` | `education/what-is-an-mri.astro` | CarbonLayout | Patient education | Yes |
| `/patient-promise` | `patient-promise.astro` | CarbonLayout | Guarantee and refund policy | Yes |
| `/search-results` | `search-results.astro` | CarbonLayout | Facility search results (requires `?zipCode=`) | No (dynamic) |
| `/privacy` | `privacy.astro` | CarbonLayout | Privacy policy | Yes |
| `/terms` | `terms.astro` | CarbonLayout | Terms of service | Yes |
| `/accessibility` | `accessibility.astro` | CarbonLayout | WCAG 2.1 Level AA statement | Yes |
| `/careers` | `careers.astro` | CarbonLayout | Recruitment — all positions "Coming Soon" | Yes |

### Business Pages (B2B)

| Route | File | Layout | Purpose | Prerender |
|-------|------|--------|---------|-----------|
| `/employer` | `employer.astro` | CarbonLayout (hideNewsletter) | WorkComp + employee benefits, ROI calculator | Yes |
| `/employer/schedule` | `employer/schedule.astro` | CarbonLayout | Employer scheduling | — |
| `/provider` | `provider.astro` | CarbonLayout (hideNewsletter) | Imaging center recruitment — 10-day payment guarantee | Yes |
| `/partner` | `partner.astro` | CarbonLayout | Partner overview | — |
| `/investor` | `investor.astro` | CarbonLayout | Series A pitch (56.6KB) | Yes |

### Founder Pages

| Route | File | Layout | Purpose |
|-------|------|--------|---------|
| `/co-founder-m` | `co-founder-m.astro` | CarbonLayout | Michael Cabrera — CEO bio |
| `/co-founder-d` | `co-founder-d.astro` | CarbonLayout | Donna Cabrera — co-founder bio |

### Provider Onboarding & Portal

| Route | File | Layout | Purpose |
|-------|------|--------|---------|
| `/providers/signup` | `providers/signup.astro` | ProviderLayout | Provider registration form |
| `/providers/login` | `providers/login.astro` | ProviderLayout | Provider login |
| `/providers/check-email` | `providers/check-email.astro` | ProviderLayout | Email verification flow |
| `/providers/verified` | `providers/verified.astro` | ProviderLayout | Verification confirmation |
| `/providers/join` | `providers/join.astro` | ProviderLayout | Join network CTA |
| `/providers/portal/*` | Multiple files | ProviderLayout | Portal (index, centers, documents, profile, settings, security) |
| `/providers/onboarding/*` | Multiple files | ProviderLayout | Multi-phase onboarding (confirmation, facilities, market-calculator, pricing-configurator, pricing-customizer, pricing-multi, psa-signing, success) |

### Imaging Center Sub-Pages

| Route | File | Layout | Purpose |
|-------|------|--------|---------|
| `/imaging-center` | `imaging-center/index.astro` | CarbonLayout | Overview |
| `/imaging-center/apply` | `imaging-center/apply.astro` | PartnerPageLayout | Application |
| `/imaging-center/benefits` | `imaging-center/benefits.astro` | PartnerPageLayout | Partner benefits |
| `/imaging-center/calculator` | `imaging-center/calculator.astro` | PartnerPageLayout | ROI calculator |
| `/imaging-center/faq` | `imaging-center/faq.astro` | PartnerPageLayout | FAQ |
| `/imaging-center/model` | `imaging-center/model.astro` | PartnerPageLayout | Business model |
| `/imaging-center/experience` | `imaging-center/experience.astro` | PartnerPageLayout | Brand experience |
| `/imaging-center/implementation` | `imaging-center/implementation.astro` | PartnerPageLayout | Implementation guide |
| `/imaging-center/schedule` | `imaging-center/schedule.astro` | PartnerPageLayout | Scheduling |
| `/imaging-center/signup` | `imaging-center/signup.astro` | PartnerPageLayout | Signup |
| `/imaging-center/support` | `imaging-center/support.astro` | PartnerPageLayout | Support |

### Dashboard Pages (Provider)

| Route | Layout | Purpose |
|-------|--------|---------|
| `/dashboard` | DashboardLayout | Provider dashboard home |
| `/dashboard/appointments` | DashboardLayout | Appointment management |
| `/dashboard/analytics` | DashboardLayout | Performance metrics |
| `/dashboard/center` | DashboardLayout | Center details |
| `/dashboard/patient` | DashboardLayout | Patient management |
| `/dashboard/referral` | DashboardLayout | Referral management |
| `/dashboard/reports` | DashboardLayout | Report viewing |
| `/dashboard/settings` | DashboardLayout | Account settings |
| `/dashboard/settings/profile` | DashboardLayout | Profile settings |
| `/dashboard/settings/unified` | DashboardLayout | Unified settings |
| `/dashboard/contract/*` | DashboardLayout | Contract flow (confirmation, csv-upload, exhibit-b-preview, market-education, terms) |
| `/dashboard/onboarding/*` | DashboardLayout | Onboarding flow (index, psa, enhanced-psa, facilities, market-education) |
| `/dashboard/psa/*` | DashboardLayout | PSA status (completed, success) |

### Patient Dashboard Pages

| Route | Layout | Purpose |
|-------|--------|---------|
| `/patient-dashboard` | CarbonLayout | Patient portal home |
| `/patient-dashboard/appointments` | CarbonLayout | View bookings |
| `/patient-dashboard/billing` | CarbonLayout | Payment history |
| `/patient-dashboard/booking` | CarbonLayout | Book new appointments |
| `/patient-dashboard/education` | CarbonLayout | Educational resources |
| `/patient-dashboard/profile` | CarbonLayout | Profile management |
| `/patient-dashboard/referrals` | CarbonLayout | Referral management |
| `/patient-dashboard/reports` | CarbonLayout | Imaging results |
| `/patient-dashboard/support` | CarbonLayout | Help center |

### Authentication Pages

| Route | Purpose |
|-------|---------|
| `/login/patientlogin` | Patient login |
| `/login/referrallogin` | Physician/referral login |
| `/auth/reset-password` | Password reset flow |

### Other Pages

| Route | Purpose |
|-------|---------|
| `/news` | News section — "Coming Soon" (uses MainLayout) |
| `/form-submitted` | Generic form submission confirmation |
| `/corporate-dashboard` | Corporate/admin dashboard |
| `/patient-management` | Patient management |
| `/patient-advocate` | Patient advocate |
| `/provider/consultation` | Schedule provider consultation |
| `/provider/faq` | Provider FAQ |
| `/test-page` | Test page (should not be in production) |

### API Endpoints: `src/pages/api/`

**Core:**
- `POST /api/contact` — Contact form submissions (Resend)
- `POST /api/subscribe-newsletter` — Newsletter signup (Resend)
- `GET /api/geocode` — Address geocoding (Google Maps)
- `GET /api/guide-download` — Guide file downloads

**Search & Pricing:**
- `GET /api/procedures/search` — Procedure search
- `GET /api/facilities/[id]` — Facility details
- `GET /api/facilities/[id]/pricing` — Facility pricing
- `GET /api/centers/search-with-pricing` — Center search with pricing
- `GET /api/provider/search-with-pricing` — Provider search
- `POST /api/pricing/calculate` — Pricing calculation
- `POST /api/pricing/quote` — Price quote

**Medicare Data:**
- `GET /api/medicare/price` — Medicare pricing
- `GET /api/medicare/procedures` — Procedure catalog
- `GET /api/medicare/localities` — Locality data
- `POST /api/medicare/batch-price` — Batch pricing
- `GET /api/medicare/health` — Health check

**Booking:**
- `POST /api/booking/create-request` — Create booking
- `GET /api/booking/patient-bookings` — Patient bookings
- `POST /api/booking/provider-response` — Provider response

**Provider/DocuSeal:**
- `GET /api/provider/contracts` — Provider contracts
- `GET /api/provider/revenue-analysis` — Revenue analysis
- `POST /api/docuseal/create-submission` — DocuSeal e-signature
- `POST /api/docuseal/webhook` — DocuSeal webhook

**Admin:**
- `POST /api/admin/customer-service` — CS management
- `POST /api/admin/populate-medicare-data` — Data population
- `GET /api/cron/check-follow-ups` — Vercel cron (daily 9 AM UTC)

---

## 5. Conversion Funnel Mapping

### Primary Patient Funnel

```
Homepage (/)
  │
  ├─ Step 1: Click search bar / "Search" button
  │    └─ Opens MobileSearchModal (universal, all viewports)
  │         └─ User searches/selects procedure
  │              └─ Dispatches: searchManager.selectProcedure()
  │
  ├─ Step 2: SearchStep2 appears (procedure confirmed)
  │    └─ User enters ZIP code (or auto-detect via /api/geocode)
  │         └─ "Find Centers" button enables
  │
  └─ Step 3: Form submission
       └─ GET ${REMIX_URL}/pbs/search
            ├── ?cpt=70551            (CPT code)
            ├── &zip=33012            (ZIP code)
            ├── &procedureSearch=...  (label)
            ├── &bodyPartKey=...      (for CPT disambiguation)
            └── &displayLabel=...     (patient-friendly label)
```

### Form Action URL

```
Production: https://app.usrad.com/pbs/search?cpt=...&zip=...
Dev:        http://192.168.68.100:5173/pbs/search?cpt=...&zip=...
```

### Query Parameters Passed to Remix

| Parameter | Purpose | Example |
|-----------|---------|---------|
| `cpt` | CPT billing code | `70551` |
| `zip` | Patient ZIP code | `33012` |
| `procedureSearch` | Full procedure label | `MRI Brain Without Contrast` |
| `bodyPartKey` | Body part for CPT disambiguation | `brain` |
| `displayLabel` | Patient-friendly display label | `MRI Brain Without Contrast` |

### Secondary Funnels

| Funnel | Entry Point | Destination |
|--------|-------------|-------------|
| **Patient Login** | Header "Sign in" → Patient Portal | `${REMIX_URL}/patient/login` |
| **Provider Login** | Header "Sign in" → Imaging Center | `${REMIX_URL}/login` |
| **Physician Login** | Header "Sign in" → Physician Portal | `/login/referrallogin` |
| **My Bookings** | Footer link | `${REMIX_URL}/pbs/my-bookings` |
| **Provider Recruitment** | `/provider` → CTAs | `/providers/signup` → onboarding flow |
| **Employer Inquiry** | `/employer` → consultation CTA | `/employer/schedule` |
| **Contact** | `/contact` → form | `POST /api/contact` |
| **Newsletter** | Footer subscribe | `POST /api/subscribe-newsletter` |

### Cross-App Boundary Points

The marketing site (Astro) hands off to the Remix application at these URLs:
1. `${REMIX_URL}/pbs/search` — search results + booking
2. `${REMIX_URL}/pbs/my-bookings` — patient booking management
3. `${REMIX_URL}/patient/login` — patient authentication
4. `${REMIX_URL}/login` — provider authentication

The dev proxy in `astro.config.mjs` routes `/pbs` to `http://localhost:5173` for local development.

---

## 6. SEO & Metadata Architecture

### Meta Tags (CarbonLayout)

| Tag | Value | Status |
|-----|-------|--------|
| `<title>` | Dynamic per page (default: "USRad - MRI Scans in 48 Hours, 70% Less") | OK |
| `<meta name="description">` | Dynamic per page | OK |
| `og:title` | "USRad — National Diagnostic Imaging Access Infrastructure" | Static — does not match page title |
| `og:description` | "Access high-quality medical imaging nationwide..." | Static — does not match page description |
| `og:image` | `https://usrad.com/og-default.png` (1200x630) | OK |
| `og:type` | `website` | OK |
| `twitter:card` | `summary_large_image` | OK |
| `twitter:image` | `https://usrad.com/og-default.png` | OK |
| Favicon | SVG + ICO + apple-touch-icon | OK |

### SEO Risks

| Risk | Severity | Detail |
|------|----------|--------|
| **No sitemap.xml** | HIGH | No sitemap found anywhere in the project |
| **No robots.txt** | HIGH | No robots.txt — crawlers may index dashboard/test pages |
| **Static Open Graph** | MEDIUM | `og:title` and `og:description` are hardcoded in CarbonLayout, not dynamic per page |
| **No canonical tags** | MEDIUM | No `<link rel="canonical">` on any page |
| **No JSON-LD** | MEDIUM | Only found in `xpricing.astro` (a legacy x-prefixed file); no structured data on production pages |
| **Duplicate viewport** | LOW | CarbonLayout has two `<meta name="viewport">` tags |
| **Test pages accessible** | MEDIUM | `/test-page` and legacy x-prefixed files may be accessible in production |
| **Heading hierarchy** | LOW | Most pages follow proper H1→H2→H3 hierarchy |
| **Provider pages indexed** | LOW | ProviderLayout has `robots: noindex, nofollow` — correct |

### Missing SEO Elements

- No `sitemap.xml` generation (Astro has `@astrojs/sitemap` integration — not installed)
- No `robots.txt`
- No canonical URLs
- No JSON-LD structured data (MedicalBusiness, FAQPage, BlogPosting, Organization)
- No breadcrumb structured data
- No hreflang tags (English only, not an issue currently)
- Open Graph tags are static across all pages

---

## 7. Performance & Build Model

### Astro Islands Usage

| Component | Hydration | Justification |
|-----------|-----------|---------------|
| `CarbonHeader.jsx` | `client:load` | Interactive nav, scroll behavior, login dropdown |
| `PatientHeader.jsx` | `client:load` | Used in MainLayout/MainPatientLayout only |
| `SkeletonProviderDashboardSystem` | `client:load` | Dashboard (not marketing) |
| `ProviderSearchSection` (React) | `client:load` | `/search-results` page only |

**Assessment:** Minimal React hydration on marketing pages — only the header. All hero search orchestration uses vanilla JS. This is efficient.

### Bundle Considerations

| Item | Impact | Notes |
|------|--------|-------|
| **AOS library** | ~14KB gzipped | Loaded from unpkg CDN on every CarbonLayout page |
| **Lottie Player** | ~250KB | Loaded from unpkg CDN on every CarbonLayout page, even if not used |
| **Google Fonts (Inter)** | ~20KB | 4 weights, preconnect optimized |
| **Leaflet** | ~40KB gzipped | Used only on homepage map, but imported in package |
| **Framer Motion** | ~30KB gzipped | In package.json, usage unclear on marketing pages |
| **Recharts** | ~50KB gzipped | Dashboard only, not marketing |
| **Tremor** | ~100KB gzipped | Dashboard only, not marketing |

### Performance Issues

| Issue | Severity | Detail |
|-------|----------|--------|
| **Lottie Player on every page** | HIGH | Loaded in CarbonLayout `<head>` even on pages that don't use Lottie animations (~250KB) |
| **AOS from CDN** | MEDIUM | Could be bundled; CDN adds DNS lookup + connection overhead |
| **No image optimization** | MEDIUM | No `<Image>` component from `@astrojs/image`; images use standard `<img>` tags |
| **bfcache disabled** | MEDIUM | `pageshow` event forces reload from bfcache — hurts back-button performance |
| **user-scalable=no** | LOW | Prevents pinch-to-zoom — accessibility concern |
| **No critical CSS** | LOW | Full CSS loaded on every page; no inlining of above-the-fold styles |
| **CDN dependencies** | LOW | AOS + Lottie loaded from `unpkg.com` — single point of failure |

### Image Strategy

- Images stored in `public/images/` as static assets
- Formats: mix of `.webp`, `.png`, `.jpg`
- No `@astrojs/image` integration for automatic optimization
- No `srcset` or responsive image handling observed
- OG image: `og-default.png` at 1200x630

### Font Loading

- Google Fonts with `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com`
- Font display: `swap` (via Google's CSS)
- Inter loaded with 4 weights (400, 500, 600, 700)

---

## 8. Design System & Component Reuse

### Hero Components

| Component | Path | Used In |
|-----------|------|---------|
| `HeroSection.astro` | `src/components/hero/HeroSection.astro` | Homepage |
| `HeroBackground.astro` | `src/components/hero/HeroBackground.astro` | Homepage (via HeroSection) |
| `HeroHeadline.astro` | `src/components/hero/HeroHeadline.astro` | Homepage (via HeroSection) |
| `SearchStep1.astro` | `src/components/hero/SearchStep1.astro` | Homepage (via HeroSection) |
| `SearchStep2.astro` | `src/components/hero/SearchStep2.astro` | Homepage (via HeroSection) |
| `MobileSearchModal.astro` | `src/components/hero/MobileSearchModal.astro` | Homepage (via HeroSection) |
| `SearchDropdown.astro` | `src/components/hero/search/SearchDropdown.astro` | Homepage (via HeroSection) |
| `PopularProcedures.astro` | `src/components/hero/search/PopularProcedures.astro` | Homepage dropdown |
| `SearchResults.astro` | `src/components/hero/SearchResults.astro` | Homepage dropdown |

### CTA Patterns

| Pattern | Appearance | Usage |
|---------|------------|-------|
| **Gold gradient button** | `from-[#cc9933] to-[#b8862d]` | Primary CTA (Find Centers, Book Scan) |
| **Blue solid button** | `bg-[#003087]` | Secondary CTA (Book Scan in header/footer) |
| **White outline button** | `bg-white/10 border-white/30` | Transparent header state |

### Card Patterns

| Pattern | Component/Usage |
|---------|-----------------|
| **Blog cards** | Grid in `/blog` — image + title + excerpt + category badge |
| **Pricing cards** | `PricingSection.astro` on homepage |
| **Provider cards** | `/search-results` facility cards |
| **Dashboard glass cards** | Provider dashboard (glassmorphism with backdrop-blur) |

### UI Component Library: `src/components/ui/`

| Component | Type | Variants |
|-----------|------|----------|
| `alert.tsx` | React | default, destructive |
| `badge.tsx` | React | default, secondary, destructive, outline |
| `button.tsx` | React | default, destructive, outline, secondary, ghost, link; sizes: sm, default, lg, icon |
| `card.tsx` | React | Card, CardHeader, CardTitle, CardDescription, CardContent |
| `progress.tsx` | React | Progress bar |
| `Accordion.astro` | Astro | Expandable sections |

These are shadcn/ui components configured via `components.json`.

### Icon System

- **Inline SVGs** throughout (no icon library)
- **Custom SVG icons** in `public/images/icons/` (patient.svg, mri-machine.svg, analytic.svg, lock.svg)
- **Lucide React** (`lucide-react`) in package.json — used in dashboard components

### Duplication Risks

| Risk | Detail |
|------|--------|
| **Header/Footer sync** | `CarbonHeader.jsx` ↔ `PBSHeader.tsx` and `CarbonFooter.astro` ↔ `PBSFooter.tsx` must be manually synced with Remix app |
| **Login option lists** | Login portal options duplicated in `LoginDropdown` (desktop) and `MobileLoginSection` (mobile) within same file — acceptable |
| **Procedure search** | Two engines (Legacy + New) with `USE_NEW_PROCEDURE_ENGINE` flag — transition in progress |
| **Multiple hero implementations** | `HeroSection.astro` (current) + `HeroSearchForm.astro` (legacy) + employer/imaging heroes |
| **Layout duplication** | 7 layouts with overlapping patterns — could consolidate MainLayout into CarbonLayout |

---

## 9. External Integrations

### Supabase (Database + Auth)

| Trigger | Data | Risk |
|---------|------|------|
| User signup/login | Email, password, profile data | Auth tokens in cookies; HIPAA compliance required |
| Facility queries | ZIP, procedure, pricing data | Public data — low risk |
| Booking creation | Patient info, procedure, facility | PII transmitted — requires encryption |
| PSA operations | Provider contract status | Business-critical |
| Medicare pricing | CPT codes, locality data, RVU calculations | Public Medicare data |

**Client libraries:** `@supabase/supabase-js`, `@supabase/ssr`, `@supabase/auth-helpers-remix`

### DocuSeal (e-Signatures)

| Trigger | Data | Risk |
|---------|------|------|
| Provider PSA signing | Template ID, signer info, facility data, rate structures | Legal documents — high risk |
| Webhook completion | Submission status, signed document ID | Must verify webhook authenticity |

**Integration:** `@docuseal/react` component embedded in PSA signing flow. Template ID: `1155842`.

### Resend (Email)

| Trigger | Data | Risk |
|---------|------|------|
| Contact form submission | Name, email, message | Low — public form |
| Newsletter subscription | Email address | Low — consent-based |
| Booking confirmations | Patient info, appointment details | PII — must encrypt |
| Follow-up crons | Patient contact info | Automated outreach |

**From address:** `support@send.usrad.com`

### Google Maps API

| Trigger | Data | Risk |
|---------|------|------|
| Geolocation reverse geocode | Lat/lng coordinates | Location privacy |
| Map rendering (Leaflet) | Center locations | Public data |

**Keys:** Two keys present — public client key and server key.

### AOS Animation Library

| Trigger | Data | Risk |
|---------|------|------|
| Page load | None | CDN dependency — `unpkg.com` outage would break animations |

### Lottie Player

| Trigger | Data | Risk |
|---------|------|------|
| Page load | None | Loaded on every page; CDN dependency |

### Vercel Cron

| Trigger | Schedule | Risk |
|---------|----------|------|
| `check-follow-ups` | Daily 9 AM UTC | Requires `CRON_SECRET` validation |

### Newsletter (localStorage backup)

The footer newsletter also writes subscriber data to `localStorage` as a fallback:
```javascript
localStorage.setItem("newsletter-subscribers", JSON.stringify(subscribers));
```
This is a development artifact that should be removed for production.

---

## 10. Relationship to App Platform

### Architecture Overview

```
┌─────────────────────────┐     ┌──────────────────────────┐
│   Astro Marketing Site  │     │   Remix Application      │
│   (usrad.com)           │────►│   (app.usrad.com)        │
│                         │     │                          │
│   • Homepage            │     │   • /pbs/search          │
│   • /about              │     │   • /pbs/my-bookings     │
│   • /how-it-works       │     │   • /patient/login       │
│   • /employer           │     │   • /login               │
│   • /provider           │     │   • Booking flows        │
│   • /blog               │     │   • Patient dashboard    │
│   • /contact            │     │                          │
│   • Provider portal     │     │                          │
│   • API endpoints       │     │                          │
└─────────────────────────┘     └──────────────────────────┘
         │                              │
         └──────────┬───────────────────┘
                    ▼
          ┌─────────────────┐
          │    Supabase     │
          │   (PostgreSQL)  │
          └─────────────────┘
```

### Shared Constants / Duplicated Logic

| Item | Astro Location | Remix Location | Sync Status |
|------|----------------|----------------|-------------|
| **Header** | `src/components/CarbonHeader.jsx` | `app/components/pbs/PBSHeader.tsx` | Manual sync — last: 2025-12-26 |
| **Footer** | `src/components/CarbonFooter.astro` | `app/components/pbs/PBSFooter.tsx` | Manual sync — last: 2025-12-26 |
| **REMIX_URL** | `import.meta.env.PUBLIC_REMIX_URL` | N/A | Environment variable |
| **Supabase client** | `src/lib/supabase.js` | Remix auth helpers | Shared Supabase project |
| **Procedure data** | `public/js/procedure-data.js` + `src/lib/search-manager.ts` | Remix PBS search | CPT codes must match |
| **Brand colors** | `tailwind.config.js` + CSS variables | Must match | Manual |

### PBS Search Handoff

The critical handoff from marketing to application:

1. **Astro** (HeroSection) builds search state via `window.searchManager`
2. **SearchStep2** form submits `GET ${REMIX_URL}/pbs/search` with query parameters
3. **Remix** receives: `cpt`, `zip`, `procedureSearch`, `bodyPartKey`, `displayLabel`
4. **Remix** resolves CPT → facility pricing → displays search results → enables booking

### Provider Recruitment Funnel

```
/provider (marketing page)
  └─ CTA → /providers/signup
       └─ /providers/check-email
            └─ /providers/verified
                 └─ /providers/portal (portal home)
                      └─ /providers/onboarding/* (multi-phase)
                           ├─ /providers/onboarding/facilities
                           ├─ /providers/onboarding/market-calculator
                           ├─ /providers/onboarding/pricing-configurator
                           └─ /providers/onboarding/psa-signing (DocuSeal)
```

### Patient Education Funnel

```
/education/what-is-an-mri → linked from header nav → drives awareness
/how-it-works → step-by-step guide → builds trust → CTA to homepage search
/patient-promise → guarantee page → reduces friction → linked from footer
/blog/* → content marketing → internal links to homepage
```

---

## 11. Technical Risk Register

### HIGH RISK

| # | Risk | Impact | Detail |
|---|------|--------|--------|
| H1 | **No sitemap.xml** | SEO — pages not discovered by crawlers | No `@astrojs/sitemap` integration installed |
| H2 | **No robots.txt** | SEO — test/dashboard pages may be indexed | `/test-page`, legacy x-prefixed pages, provider dashboards accessible |
| H3 | **Lottie Player loaded globally** | Performance — ~250KB on every page | Loaded in CarbonLayout even when not used |
| H4 | **Header/Footer manual sync** | Consistency — drift between Astro and Remix | Last synced 2025-12-26 — 14+ months ago |
| H5 | **Static Open Graph tags** | SEO — social sharing shows wrong content | `og:title` and `og:description` hardcoded, not dynamic |
| H6 | **bfcache disabled** | Performance — back button forces full reload | `pageshow` listener reloads on bfcache restore |

### MEDIUM RISK

| # | Risk | Impact | Detail |
|---|------|--------|--------|
| M1 | **No canonical tags** | SEO — potential duplicate content issues | No `<link rel="canonical">` on any page |
| M2 | **No JSON-LD structured data** | SEO — no rich snippets in search results | No MedicalBusiness, FAQPage, or BlogPosting schema |
| M3 | **AOS loaded from CDN** | Reliability — unpkg.com outage breaks animations | Should be bundled locally |
| M4 | **Dual search engine** | Complexity — two code paths for procedure search | Feature flag `USE_NEW_PROCEDURE_ENGINE=true` — legacy code still present |
| M5 | **7 layout files** | Maintenance — overlapping patterns, confusing | MainLayout only used by `/news` — could be consolidated |
| M6 | **user-scalable=no** | Accessibility — prevents pinch-to-zoom | WCAG violation for users with low vision |
| M7 | **Duplicate viewport meta** | Code quality — two viewport tags in CarbonLayout | Second overrides first with `maximum-scale=1.0` |
| M8 | **localStorage newsletter backup** | Data hygiene — subscriber data in browser storage | Development artifact, should be removed |
| M9 | **Test page in production** | Security — `/test-page` accessible | Should be removed or restricted |

### LOW RISK

| # | Risk | Impact | Detail |
|---|------|--------|--------|
| L1 | **No image optimization** | Performance — unoptimized images served | No `@astrojs/image` integration |
| L2 | **Legacy x-prefixed files** | Code bloat — 100+ test/backup files in `src/pages/` | Should be cleaned up |
| L3 | **Chat widget placeholder** | UX — non-functional chat button on every page | Button exists in CarbonLayout but has no functionality |
| L4 | **Careers page "Coming Soon"** | Brand — empty job listings | All positions marked "Coming Soon" |
| L5 | **Console.log statements** | Code quality — debug logs in production | Multiple `console.log` calls throughout search components |

---

## 12. Safe Refactor Guidelines

### Safe to Change (No External Dependencies)

- Blog post content and styling
- About page copy and timeline
- FAQ content and categories
- CSS animations and visual polish
- Internal page links between marketing pages
- Social proof numbers and testimonials
- Image assets in `public/images/`

### Change with Caution (Internal Dependencies)

- **Search step components** — interconnected via `window.searchManager` state machine
- **Layout files** — changing CarbonLayout affects all marketing pages
- **Procedure data** — `public/js/procedure-data.js` feeds both search and popular procedures
- **API endpoints** — may be called by Remix app or external webhooks

### Do NOT Change Without Cross-App Coordination

- **CarbonHeader.jsx** — must sync with Remix `PBSHeader.tsx`
- **CarbonFooter.astro** — must sync with Remix `PBSFooter.tsx`
- **SearchStep2 form action** — URL structure must match Remix route expectations
- **Query parameter names** — `cpt`, `zip`, `procedureSearch`, `bodyPartKey`, `displayLabel` consumed by Remix
- **`PUBLIC_REMIX_URL`** — environment variable used across multiple components
- **Supabase schema** — shared between Astro and Remix

### Consolidation Opportunities

1. **Remove MainLayout** — migrate `/news` to CarbonLayout; eliminate Manrope dependency
2. **Remove legacy x-prefixed files** — 100+ stale files in `src/pages/`
3. **Bundle AOS locally** — eliminate CDN dependency
4. **Conditionally load Lottie** — only on pages that use it
5. **Merge search engines** — complete Phase 1 transition, remove legacy engine
6. **Clean console.logs** — remove debug statements from production

---

## 13. AI Handoff Context Block

```yaml
project: USRad Marketing Website
framework: Astro 5.7.4 (SSR mode)
ui_library: React 19.1.0 (islands)
css: Tailwind CSS via @astrojs/tailwind
deployment: Vercel (SSR adapter)
database: Supabase (PostgreSQL)
email: Resend
esign: DocuSeal
maps: Google Maps API + Leaflet

primary_layout: src/layouts/CarbonLayout.astro
primary_font: Inter (Google Fonts)
primary_colors:
  blue: "#003087"
  gold: "#cc9933"
  background: "#ffffff"

homepage: src/pages/index.astro
hero_system: src/components/hero/HeroSection.astro
search_engine: src/lib/search-manager.ts
procedure_data: public/js/procedure-data.js
feature_flags: src/lib/feature-flags.ts

header: src/components/CarbonHeader.jsx (React, client:load)
footer: src/components/CarbonFooter.astro
header_sync: app/components/pbs/PBSHeader.tsx (Remix)
footer_sync: app/components/pbs/PBSFooter.tsx (Remix)

conversion_form_action: "${PUBLIC_REMIX_URL}/pbs/search"
conversion_params: [cpt, zip, procedureSearch, bodyPartKey, displayLabel]
remix_url_env: PUBLIC_REMIX_URL
remix_url_prod: https://app.usrad.com

blog_data: src/data/blogPosts.js
centers_data: src/data/centers.json
studies_data: src/data/studies.json

provider_portal_entry: /providers/signup
provider_onboarding: /providers/onboarding/*
provider_psa: DocuSeal template 1155842

critical_files_do_not_change_without_coordination:
  - src/components/CarbonHeader.jsx
  - src/components/CarbonFooter.astro
  - src/components/hero/SearchStep2.astro (form action + params)
  - public/js/procedure-data.js (CPT codes)

seo_gaps:
  - No sitemap.xml
  - No robots.txt
  - No canonical tags
  - No JSON-LD structured data
  - Static Open Graph tags

performance_issues:
  - Lottie Player loaded globally (~250KB)
  - AOS from CDN (should bundle)
  - bfcache disabled
  - No image optimization
```

---

*Report generated: March 4, 2026*
*Audited by: Claude Opus 4.6*
