# USRad Growth Flight Deck — Repository Discovery Report

**Date:** 2026-07-30
**Repository:** `usrad-platform` (git remote: `github.com:954cabrera/usrad-platform.git`)
**Branch:** `main` @ `073ddb4`
**Status:** Discovery only — no implementation performed, nothing committed.

> **Secret safety:** No `.env` file, credential file, key, or token value was opened, printed,
> copied, or transmitted during this discovery. Environment variables are referenced by
> **variable name only**. See §3.

---

## 1. Executive finding

**The Flight Deck is buildable inside this repository, but it cannot be built on the current
measurement foundation without three preconditions.**

The good news is substantial: GA4 is live with correct cross-domain linking to `app.usrad.com`,
a documented event contract exists, six server-side funnel tables are already being written in
this repo's API layer, `@tremor/react` and `recharts` are already installed, and Vercel cron is
already wired. Roughly 70% of the plumbing a Flight Deck needs is present.

The blocking problems are these:

1. **Search Console readiness is zero.** No `robots.txt`, no `sitemap.xml`, no
   `@astrojs/sitemap`, no verification file, no Google API client library, and no GSC
   credential variables. A "Search Console trends" module has nothing to connect to and — more
   importantly — Google has no sitemap to crawl, so the trend data itself is degraded at source.
   Fixing GSC ingestion without first shipping a sitemap produces a dashboard that faithfully
   reports bad coverage.

2. **The funnel is measured asymmetrically, so cross-funnel comparison would be misleading.**
   The patient funnel emits exactly **one** GA4 event (`hero_search_submitted`) and then hands
   off to a different application; everything after the handoff is invisible to this repo. The
   provider funnel emits six. The employer funnel emits **zero**. A V1 that renders
   "patient vs provider vs employer" side by side would show the employer funnel as flat zero —
   not because it underperforms, but because it is uninstrumented.

3. **Security posture blocks a founder-only surface today.** There is **no middleware file**,
   9 of 10 `/admin/*` pages have no authentication gate, and the existing Vercel cron endpoint
   `/api/cron/check-follow-ups` accepts unauthenticated `GET` requests while holding a
   service-role Supabase client and a Resend client at module scope. Adding Google
   service-account credentials and a revenue dashboard to this repo *before* fixing that
   pattern materially increases blast radius.

Additionally, two funnel paths are **broken in ways a dashboard would misattribute**:
`/employer/cost-analysis` is linked but does not exist (404), and `ExitModal.astro` POSTs to
`/api/market-analysis`, which does not exist — so that provider lead is silently lost, the user
never sees a success state, and because the GA4 event is gated on `response.ok`, the Flight Deck
would show near-zero `market_analysis_requested` and read it as weak demand rather than a
missing endpoint.

**Recommendation:** build V1 inside `usrad-platform` at `/internal/flight-deck`, but sequence
the three preconditions first. They are small (roughly 1–1.5 days combined) and each one also
fixes existing production exposure.

---

## 2. Repository and deployment facts

| Fact | Value | Evidence |
| --- | --- | --- |
| Package name | `usrad-patient-platform` | `package.json:2` |
| Git remote | `usrad-platform` | `git remote -v` |
| Framework | Astro `^5.7.4` | `package.json` deps |
| UI runtime | React `^19.1.0` via `@astrojs/react` | `package.json` deps |
| Render mode | **SSR** (`output: 'server'`) | `astro.config.mjs:10` |
| Adapter | `@astrojs/vercel` (`maxDuration: 30`, `memory: 1024`) | `astro.config.mjs:13-16` |
| Styling | Tailwind via `@astrojs/tailwind` | `astro.config.mjs:2` |
| DB / backend | Supabase (`@supabase/supabase-js ^2.76.1`), Drizzle, `pg` | `package.json` |
| Existing cron | `/api/cron/check-follow-ups` daily `0 9 * * *` | `vercel.json:3-6` |
| Charting available | `@tremor/react ^3.18.7`, `recharts ^2.15.3` | `package.json:52,82` |
| Google API client | **absent** | no `googleapis` / `google-auth-library` in `package.json` |
| Middleware | **absent** | no `src/middleware.ts` or `src/middleware/` |
| Total `.astro` routes | **190** | `find src/pages -name "*.astro"` |
| API endpoints | **47** | `find src/pages/api -type f` |

**Is this the live marketing website?** Yes. `src/layouts/CarbonLayout.astro` is the primary
marketing layout and hardcodes production absolute URLs — `https://usrad.com/og-default.png`
(`CarbonLayout.astro:80,85`) — and the GA4 cross-domain linker is configured for the production
domain pair (`CarbonLayout.astro:105-107`).

### Domain boundary

Two applications, two domains:

| Domain | Application | Repository |
| --- | --- | --- |
| `usrad.com` | Astro marketing site | **this repo** |
| `app.usrad.com` | Remix application (search, booking, provider portal, onboarding) | separate repo |

The boundary is crossed via the `PUBLIC_REMIX_URL` variable. **The fallback values for this
variable are inconsistent across 25 call sites**, which is a production risk independent of the
Flight Deck:

| Fallback literal | Occurrences |
| --- | --- |
| `https://usrad-portal.vercel.app` | 13 |
| `https://app.usrad.com` | 9 |
| `http://localhost:5173` | **3** |

`src/pages/index.astro:17` — the homepage — falls back to `http://localhost:5173`. Separately,
`src/components/hero/SearchStep2.astro:27` reads the variable with **no fallback at all**, so if
it is unset the primary patient-funnel form action renders as `undefined/pbs/search`.

---

## 3. Secret-safety findings

### Method

Sensitive files were located **by filename only** and never opened. No `env`, `printenv`, `set`,
`export -p`, `cat .env*`, or shell-history command was run.

### Files present on disk (contents not read)

```
./.env
./.env.production
./.env.example
./.env.backup-preseparation
./src/components/ClinicalCredentialsGrid.astro   ← filename match only
```

### Tracking status — verified with `git check-ignore` / `git ls-files`

| File | Status |
| --- | --- |
| `.env` | ignored ✅ |
| `.env.production` | ignored ✅ |
| `.env.backup-preseparation` | ignored ✅ |
| `.env.example` | **tracked** (conventional; see note) |
| `src/components/ClinicalCredentialsGrid.astro` | **tracked — false positive** |

**`ClinicalCredentialsGrid.astro` is confirmed benign.** It matched the `*credential*` filename
filter only. A structural scan for `api[_-]?key|secret|token|password|private[_-]?key` returned
**0 matches**. It is a marketing component about *clinical* credentials (board certification,
ACR accreditation).

**`.env.example` is tracked and was not opened**, per the secret-safety rule. Tracking an
example file is normal practice, but because it could not be inspected here, **a human should
manually confirm it contains placeholder values only** before the Flight Deck adds Google
credential variable names to it.

**No secrets are tracked in source control.** Working tree is clean.

### `.gitignore` coverage — one confirmed gap that directly affects this project

Current rules cover `.env`, `.env.local`, `.env.*.local`, `.env.production`, `*.env`,
`.env.backup*`, `.vercel`, `dist/`, `.astro/`, `node_modules/`.

They do **not** use a general `.env.*` rule, and there is **no rule for credential JSON or key
material**. Verified empirically against the exact filenames the Flight Deck will introduce:

| Filename the Flight Deck will need | `git check-ignore` result |
| --- | --- |
| `google-service-account.json` | ❌ **not ignored** |
| `gsc-credentials.json` | ❌ **not ignored** |
| `ga4-service-account.json` | ❌ **not ignored** |
| `service-account.json` | ❌ **not ignored** |
| `credentials.json` | ❌ **not ignored** |
| `client_secret_*.json` | ❌ **not ignored** |
| `gcp-key.pem` / `private.key` | ❌ **not ignored** |
| `.env.staging` / `.env.development` | ❌ **not ignored** |

This is a **P0 precondition**. A Google service-account JSON downloaded into the repo root
today would be staged by `git add .` with no warning.

---

## 4. Analytics event inventory

### GA4 initialization

| Property | Finding | Evidence |
| --- | --- | --- |
| Loader | `googletagmanager.com/gtag/js` | `CarbonLayout.astro:92-96` |
| Measurement ID source | `import.meta.env.PUBLIC_GA4_MEASUREMENT_ID` | `CarbonLayout.astro:23` |
| **Hardcoded fallback** | ⚠️ a literal `G-…` ID is hardcoded as `\|\|` fallback | `CarbonLayout.astro:23` |
| IP anonymization | `anonymize_ip: true` | `CarbonLayout.astro:104` |
| **Cross-domain linker** | ✅ `domains: ["usrad.com", "app.usrad.com"]` | `CarbonLayout.astro:105-107` |
| Consent handling | ❌ **none** — no `gtag('consent', …)` anywhere | grep across `src/` |
| Server-side analytics | ❌ none (no Measurement Protocol) | — |
| GTM container | ❌ none (raw gtag.js only) | — |

A GA4 measurement ID is a public identifier shipped to every visitor, not a credential — but
the hardcoded fallback is still a defect: if `PUBLIC_GA4_MEASUREMENT_ID` is ever unset or
misconfigured, traffic silently flows to the hardcoded property instead of failing loudly.

### ⚠️ GA4 loads in only 1 of 7 layouts

| Layout | GA4 | Consequence |
| --- | --- | --- |
| `CarbonLayout.astro` | ✅ | ~49 marketing pages tracked |
| `MainLayout.astro` | ❌ | `/news`, `/employer/schedule` untracked |
| `MainPatientLayout.astro` | ❌ | untracked |
| `PartnerLayout.astro` | ❌ | untracked |
| `PartnerPageLayout.astro` | ❌ | untracked |
| `PostLayout.astro` | ❌ | untracked |
| `ProviderLayout.astro` | ❌ | untracked (also sets sitewide `noindex`, line 25) |

Any page not using `CarbonLayout` emits **no pageviews and no events at all**.

### ⚠️ The analytics helper is dead code

`src/utils/analytics.ts` exports `trackMarketingEvent()` and its own docblock states:
*"All Astro components use this helper — never write raw gtag() calls in components."*

**It has zero consumers.** No file imports it. All 27 event call sites write raw
`gtag()` / `window.gtag()` / `g("event", …)`.

`SearchStep2.astro:904` checks `typeof window.trackMarketingEvent === "function"` — but
`window.trackMarketingEvent` is **never assigned anywhere in the codebase**, so that branch is
permanently dead and it always falls through to the raw `gtag` path at line 909.

Git history confirms the helper has never had a real consumer (added `8b65ca4`, 2026-03-16;
only other touch is `8ca8154` the same day, which added the dead global check).

**Consequence:** the helper's `app_surface: 'marketing'` default is never applied. Most call
sites re-add it inline, but **9 of 27 omit it entirely** — all 3 events in `NewsletterPopup.astro`
and all 6 in `ExitModal.astro`. Any Flight Deck query that segments on `app_surface` will
silently drop those nine.

### Event inventory — 15 distinct events, 27 call sites

| Event name | Trigger | File | Parameters | Funnel |
| --- | --- | --- | --- | --- |
| `hero_search_submitted` | Hero search form submit (after ZIP validation) | `src/components/hero/SearchStep2.astro:910` | `app_surface`, `procedure_type`, `zip_code` | **Patient** |
| `content_page_view` | `DOMContentLoaded` on blog index + all 12 posts | `src/pages/blog.astro:1042` + 12 posts (e.g. `blog/real-cost-of-mri.astro:1095`) | `app_surface`, `content_type`, `content_slug` | Content |
| `trust_content_view` | IntersectionObserver on `/about` trust sections (fires once each) | `src/pages/about.astro:1400` | `app_surface`, `section` | Content |
| `newsletter_popup_shown` | Newsletter popup displayed | `src/components/NewsletterPopup.astro:587` | ⚠️ no `app_surface` | Content |
| `newsletter_popup_closed` | Popup dismissed | `src/components/NewsletterPopup.astro:608` | ⚠️ no `app_surface` | Content |
| `newsletter_popup_subscribed` | Popup email submitted | `src/components/NewsletterPopup.astro:692` | ⚠️ no `app_surface` | Content |
| `exit_modal_shown` | Provider exit-intent modal displayed | `src/components/provider/ExitModal.astro:990` | ⚠️ no `app_surface` | **Provider** |
| `schedule_call_clicked` | "Schedule call" in exit modal | `src/components/provider/ExitModal.astro:1131` | ⚠️ no `app_surface` | **Provider** |
| `market_analysis_view` | Market-analysis view opened in modal | `src/components/provider/ExitModal.astro:1141` | ⚠️ no `app_surface` | **Provider** |
| `guide_download_view` | Guide-download view opened in modal | `src/components/provider/ExitModal.astro:1149` | ⚠️ no `app_surface` | **Provider** |
| `market_analysis_requested` | Market-analysis form submit — **only if `response.ok`** | `src/components/provider/ExitModal.astro:1201` | `event_category`, `event_label`, `value` | **Provider** ⚠️ see §10 |
| `guide_download_requested` | Guide-download form submit (gated on response) | `src/components/provider/ExitModal.astro:1275` | `event_category`, `event_label`, `value` | **Provider** |
| `audience_selected` | Audience option clicked on `/connect` | `src/components/connect/AudiencePicker.astro:89` | `app_surface`, `audience`, `event_category` | Routing |
| `page_bounce` | `beforeunload` on `/connect` with no interaction | `src/components/connect/AudiencePicker.astro:125` | `app_surface`, `page`, `event_category` | Routing |
| `cta_clicked` | CTA click on `/connect/*` audience pages | `src/components/connect/ConnectCTA.astro:58` | `app_surface`, `audience`, `cta_label`, `event_category` | Routing |

**Employer funnel events: none.** No file under `src/components/employer/` or `src/pages/employer/`
contains a `gtag` call.

### Supabase-based (server-side) event tracking — present and usable

Six tables are written directly by this repo's API routes, all using a **service-role** client:

| Table | Written by | Funnel |
| --- | --- | --- |
| `employer_leads` | `src/pages/api/employer-roi-report.ts:101` | Employer |
| `employer_consultations` | `src/pages/api/employer-consultation.js:53` | Employer |
| `guide_downloads` | `src/pages/api/guide-download.ts:86,199`; `employer-guide-download.ts:60,234` | Employer + Provider |
| `lead_scores` | `src/pages/api/guide-download.ts:250,275,296`; `employer-guide-download.ts:245,257,267` | Employer + Provider |
| `provider_consultations` | `src/pages/api/provider-consultation.js:48` | Provider |
| `popup_analytics` | `src/pages/api/track-popup.ts:50` | Content |
| `contact_submissions` | read by `src/pages/api/cron/check-follow-ups.js:17` | Contact |

**This is the single most valuable existing asset for the Flight Deck.** The employer funnel
has *no client-side instrumentation* but *does* have server-side lead records — so employer
conversion can be reported in V1 from Supabase without adding a single GA4 event.

⚠️ `supabase/migrations/` contains **one** file
(`20250114_fix_database_constraints.sql`). None of the seven tables above have migrations in
this repo — they were created out-of-band. Schema is therefore not reproducible from source.

### `src/lib/events/search-events.js` is *not* analytics

It is a DOM `CustomEvent` bus for UI coordination (`usrad:openSearchModal`,
`usrad:procedureSelected`, `usrad:modalClosed`). It contains no `gtag` and no `fetch`. Notably,
`usrad:procedureSelected` is dispatched but **never forwarded to GA4** — it is the obvious
zero-cost hook for the missing `procedure_selected` event (§10).

---

## 5. Funnel measurement map

### Patient funnel

| # | Step | Route / trigger | Tracking event | Destination | Missing measurement |
| --- | --- | --- | --- | --- | --- |
| 1 | Landing | `/` (`src/pages/index.astro`) | GA4 pageview | — | — |
| 2 | Procedure selection | Search modal → `usrad:procedureSelected` (`src/lib/events/search-events.js:5`) | ❌ **none** | Step 2 UI | `procedure_selected` |
| 3 | ZIP submission | `#hero-search-form` submit | ✅ `hero_search_submitted` | — | — |
| 4 | **Handoff** | `action={\`${remixUrl}/pbs/search\`}` GET (`SearchStep2.astro:39`) | ❌ none | `app.usrad.com/pbs/search` | `handoff_to_app` |
| 5 | Search results | Remix app | ❌ **not in this repo** | — | cross-app |
| 6 | Booking | Remix app | ❌ **not in this repo** | — | cross-app |

**Cross-application dependency:** steps 5–6 are entirely outside this repository. GA4
cross-domain linking is correctly configured (`CarbonLayout.astro:105-107`), so *session
continuity* is preserved — but only if `app.usrad.com` loads the **same** GA4 property. That
cannot be verified from this repo and must be confirmed in the Remix codebase before any
end-to-end patient funnel is claimed in the Flight Deck.

⚠️ `SearchStep2.astro:27` has no fallback for `PUBLIC_REMIX_URL` (§2).

### Provider funnel

| # | Step | Route / trigger | Tracking event | Destination | Missing measurement |
| --- | --- | --- | --- | --- | --- |
| 1 | Landing | `/provider` | pageview | — | — |
| 2 | Network map | `/provider/network-map` (3 CTAs) | ❌ none | — | `provider_tool_viewed` |
| 3 | SmartMatch | `/provider/smartmatch` (2 CTAs) | ❌ none | — | `provider_tool_viewed` |
| 4 | Portal tour | `/provider/portal-tour` (2 CTAs) | ❌ none | — | `provider_tool_viewed` |
| 5 | Exit intent | `ExitModal.astro` | ✅ 6 events (`exit_modal_shown`, `schedule_call_clicked`, `market_analysis_view`, `guide_download_view`, `market_analysis_requested`, `guide_download_requested`) | — | `app_surface` missing on all 6 |
| 6 | Consultation | `/provider/consultation` → `POST /api/provider-consultation` | ❌ no GA4 | Supabase `provider_consultations` | `lead_submitted` |
| 7 | Guide download | `POST /api/guide-download` | ✅ (modal only) | Supabase `guide_downloads`, `lead_scores` | — |
| 8 | Market analysis | `POST /api/market-analysis` | ⚠️ gated on `response.ok` | **404 — endpoint absent** | **broken, see §10** |
| 9 | Signup handoff | `/providers/join`, `/providers/signup` | ❌ none | `app.usrad.com` | `handoff_to_app` |
| 10 | Onboarding | `/dashboard/onboarding` (exists) + Remix portal | ❌ none | cross-app | cross-app |

### Employer funnel

| # | Step | Route / trigger | Tracking event | Destination | Missing measurement |
| --- | --- | --- | --- | --- | --- |
| 1 | Landing | `/employer` | pageview only (CarbonLayout) | — | — |
| 2 | ROI calculator | `ROICalculator.astro` on `/employer` | ❌ **none** | `POST /api/employer-roi-report` | `roi_calculated` |
| 3 | Cost analysis | link → `/employer/cost-analysis` | ❌ none | ⚠️ **route does not exist — 404** | fix link |
| 4 | Implementation guide | `/employer/implementation-guide` → `POST /api/employer-guide-download` | ❌ **none** | Supabase `guide_downloads`, `lead_scores` | `guide_requested` |
| 5 | Lead creation | `POST /api/employer-roi-report` | ❌ **none** | Supabase `employer_leads` | `lead_submitted` |
| 6 | Consultation | `/employer/schedule` (**MainLayout — no GA4 at all**) → `POST /api/employer-consultation` | ❌ **none** | Supabase `employer_consultations` | `consultation_requested` |
| 7 | Scheduling | Calendly (`calendly.com/mcabrera-usrad/30min`, `EmployerConsultationForm.astro:391`) | ❌ none | external | `scheduling_started` |

**The employer funnel has zero client-side instrumentation end to end**, and its final step
(`/employer/schedule`) uses `MainLayout`, which does not load GA4 — so that page produces no
pageview either. Employer performance in V1 must come from Supabase.

---

## 6. Search Console readiness

| Requirement | Present? | Evidence |
| --- | --- | --- |
| GSC API integration | ❌ **no** | no `googleapis` / `google-auth-library` in `package.json` |
| GSC credential variables | ❌ **no** | no `GOOGLE_*` / `GSC_*` / `SERVICE_ACCOUNT*` name in any `import.meta.env` / `process.env` reference |
| Verification file or meta tag | ❌ **no** | no `google*.html` in `public/`; no `google-site-verification` meta |
| `robots.txt` | ❌ **no** | absent from `public/`; repo-wide `find` returns nothing |
| `sitemap.xml` | ❌ **no** | absent; repo-wide `find` returns nothing |
| Sitemap generation | ❌ **no** | `@astrojs/sitemap` not installed; not in `astro.config.mjs` |
| Canonical tags | ⚠️ **7 of ~70 routes** | only `/connect` + 6 `/connect/*` pages |
| Structured data (JSON-LD) | ⚠️ **1 route** | `src/pages/education/what-is-an-mri.astro` only |
| URL Inspection API support | ❌ **no** | — |

**Complete list of environment variable names referenced anywhere in `src/`, `scripts/`,
`supabase/`** (names only — no values read):

```
DEV                            NODE_ENV                       RESEND_API_KEY
DOCUSEAL_API_KEY               NOTIFICATION_EMAIL             RESEND_FROM_EMAIL
DOCUSEAL_API_TOKEN             PROVIDERS_EMAIL                SUPABASE_ANON_KEY
DOCUSEAL_TEMPLATE_ID           PUBLIC_GA4_MEASUREMENT_ID      SUPABASE_SERVICE_KEY
FROM_EMAIL                     PUBLIC_GOOGLE_MAPS_API_KEY     SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SUPABASE_ANON_KEY  PUBLIC_GOOGLE_MAPS_MAP_ID      SUPABASE_URL
NEXT_PUBLIC_SUPABASE_URL       PUBLIC_REMIX_URL               SUPPORT_EMAIL
                               PUBLIC_SITE_URL
                               PUBLIC_SUPABASE_ANON_KEY
                               PUBLIC_SUPABASE_URL
```

**No Google Search Console or GA4 Data API credential variable exists.** Both must be introduced.

Two incidental hygiene notes: `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are
Next.js-convention names surviving in an Astro codebase, and both `SUPABASE_SERVICE_KEY` and
`SUPABASE_SERVICE_ROLE_KEY` are referenced — two names for what is likely one credential.

No external Google account was accessed during this discovery.

---

## 7. Technical SEO findings

### Route classification (190 `.astro` routes)

| Class | Count | Notes |
| --- | --- | --- |
| Public marketing (patient / provider / employer / educational) | ~70 | the indexable surface |
| **Legacy `x`-prefixed** | **50** | dead but **route-reachable** — Astro routes every file in `src/pages/` |
| Authenticated dashboards / portals | 50 | `dashboard/`, `patient-dashboard/`, `corporate-dashboard/`, `providers/portal/`, `providers/onboarding/`, `patient-management/`, `patient-advocate/` |
| `/admin/*` | 10 | ⚠️ **9 have no auth gate** |
| Login / auth | 9 | — |
| `/imaging-center/*` | 12 | **duplicate provider funnel** competing with `/provider/*` |

### Classification by acquisition intent

- **Patient acquisition:** `/`, `/how-it-works`, `/membership`, `/faq`, `/patient-promise`,
  `/search-results`, `/contact`, `/member-rights`
- **Provider acquisition:** `/provider`, `/provider/network-map`, `/provider/smartmatch`,
  `/provider/portal-tour`, `/provider/faq`, `/provider/consultation`, `/providers/join`,
  `/providers/signup`, `/provider-how-it-works`, `/built-usrad`
- **Employer acquisition:** `/employer`, `/employer/schedule`, `/employer/implementation-guide`
- **Educational:** `/blog` + 12 posts, `/education/what-is-an-mri`
- **Account / portal:** 50 dashboard routes + 9 login routes
- **Test / debug:** `/test-page`, `/launcher`, `/holding`, plus `public/_test-dashboard.html`,
  `public/_test-procedure-library.html`, `public/_test-universal-search.html`, and API routes
  `debug-data.js`, `debug-facilities.js`, `test-functions.js`, `test.js`, `hello.ts`
- **Legacy:** 50 `x`-prefixed routes
- **Duplicate / overlapping funnel:** `/imaging-center/*` (12) vs `/provider/*`
- **Should be `noindex`:** every route in the last four classes above — **currently none of
  them are**, except those using `ProviderLayout` (`ProviderLayout.astro:25`)

### Gaps evidenced directly by code

1. **No `robots.txt`** → 50 legacy routes, 3 public `_test-*.html` files, 5 debug API routes,
   and 9 unauthenticated `/admin/*` pages are all crawlable.
2. **No sitemap** → discovery relies entirely on internal linking; orphaned pages are invisible
   to Google.
3. **Canonical coverage 7/~70** → `/imaging-center/*` vs `/provider/*` duplication has no
   canonical signal resolving it.
4. **JSON-LD on 1 route** → no `MedicalBusiness`, `FAQPage`, or `BlogPosting` schema despite a
   12-post blog and two large FAQ pages.
5. **`CarbonLayout` does not set `noindex`** — lines 115–119 that appear to do so are inside an
   HTML comment documenting the `head` slot pattern, not live markup.
6. **Viewport blocks zoom** — `user-scalable=no, maximum-scale=1.0` (`CarbonLayout.astro:39-42`),
   a WCAG 2.1 §1.4.4 issue the file itself flags in a comment. Accessibility is a ranking input.

---

## 8. Recommended Flight Deck location

### Recommendation: **inside `usrad-platform`, at `/internal/flight-deck`**

| Criterion | Assessment |
| --- | --- |
| **Access to analytics data** | ✅ Decisive. All six funnel tables are written by *this* repo's API routes. GSC and GA4 both describe *this* repo's site. |
| **Reuse of existing components** | ✅ `@tremor/react` and `recharts` already installed — no new UI dependency. |
| **Deployment boundaries** | ✅ Vercel cron already configured here (`vercel.json`). A separate app needs its own project, domain, and cron. |
| **Operational complexity** | ✅ Lowest. One deploy target, one credential store. |
| **Authentication** | ⚠️ **Must be built.** No middleware exists today. |
| **Authorization** | ⚠️ **Must be built.** No role model; `/admin/*` is the cautionary precedent. |
| **Security / blast radius** | ⚠️ Highest-risk dimension — mitigated by the preconditions below. |

**Why not the Remix app:** the Remix app owns post-handoff patient behaviour, but owns none of
the GSC, GA4-marketing, or lead-capture data. Building there would require reaching back across
the domain boundary for the majority of the dataset.

**Why not a separate internal application:** it would isolate blast radius, but for a
single-user founder tool it doubles deployment surface, duplicates the Supabase client and
credential set, and still needs its own auth. The isolation benefit is achievable inside this
repo with middleware at roughly a tenth of the cost.

### Mandatory preconditions

1. **Add `src/middleware.ts`** gating `/internal/*` — Supabase session + explicit founder email
   allowlist, deny-by-default. Extend the same matcher to `/admin/*`, which closes existing
   exposure.
2. **Add `noindex, nofollow`** to the Flight Deck layout, and `Disallow: /internal/` in the new
   `robots.txt`.
3. **Add cron authorization.** New snapshot endpoints must verify a `CRON_SECRET` bearer token.
   Retrofit the same check onto `/api/cron/check-follow-ups`, currently unauthenticated while
   holding a service-role client (`check-follow-ups.js:4-9,11`).

---

## 9. Proposed data architecture

**Reuse the existing Supabase instance.** It already holds the funnel tables, the app is already
wired to it, and adding a second store for a single-user dashboard is unjustified.

**Do not query the Google APIs from the page.** GSC and GA4 Data API are rate-limited and slow;
GSC data is also only final after ~3 days. Snapshot nightly, read locally. This makes the
dashboard fast, cheap, and offline-resilient — and gives historical comparison for free, which
neither API provides beyond its own retention window.

### Proposed tables (design only — **no migrations created**)

| Table | Grain | Purpose |
| --- | --- | --- |
| `gsc_daily_snapshots` | (date, page, query, device) | clicks, impressions, CTR, position |
| `ga4_daily_snapshots` | (date, channel, landing_page) | sessions, users, engagement, conversions |
| `funnel_daily_rollup` | (date, funnel, step) | unified patient/provider/employer step counts |
| `seo_health_checks` | (date, check_key) | robots/sitemap/canonical/noindex/broken-link results |
| `flight_deck_recommendations` | (date, priority) | ≤3 generated actions with rationale |

Each snapshot table needs a unique key on its grain so re-runs upsert rather than duplicate —
GSC data is restated for ~3 days after collection.

### Ingestion

| Job | Schedule | Source → Sink |
| --- | --- | --- |
| `/api/cron/snapshot-gsc` | daily ~03:00 UTC | Search Console API → `gsc_daily_snapshots` |
| `/api/cron/snapshot-ga4` | daily ~03:15 UTC | GA4 Data API → `ga4_daily_snapshots` |
| `/api/cron/rollup-funnels` | daily ~03:30 UTC | existing Supabase lead tables → `funnel_daily_rollup` |
| `/api/cron/seo-health` | daily ~03:45 UTC | in-repo route scan → `seo_health_checks` |

All four are `GET`, `CRON_SECRET`-gated, idempotent, and registered in `vercel.json`.
Recommendations are generated in the rollup step from thresholds, not by an LLM.

**Historical comparison** falls out of the daily grain: period-over-period is a query, not
infrastructure.

---

## 10. Missing instrumentation

Ordered by impact on Flight Deck fidelity.

### Broken paths — fix before measuring

| # | Issue | Evidence | Effect on the Flight Deck |
| --- | --- | --- | --- |
| B1 | **`POST /api/market-analysis` does not exist.** `ExitModal.astro:1187` posts to it. The GA4 event at `:1201` is gated on `response.ok`, so it never fires; the success message never shows; the lead is lost. | `ExitModal.astro:1187-1206`; no `src/pages/api/market-analysis.*` | `market_analysis_requested` reads ≈0 and would be misread as weak provider demand rather than a missing endpoint. |
| B2 | **`/employer/cost-analysis` does not exist** but is linked from the employer funnel. | link in `src/components/employer/*`; no `src/pages/employer/cost-analysis.astro` | 404 inside a paid-traffic funnel; inflated employer bounce. |

### Missing events

| # | Event | Where to add | Funnel |
| --- | --- | --- | --- |
| M1 | `roi_calculated` | `src/components/employer/ROICalculator.astro` | Employer |
| M2 | `lead_submitted` (employer) | `/api/employer-roi-report`, `/api/employer-consultation` | Employer |
| M3 | `guide_requested` (employer) | `/employer/implementation-guide` | Employer |
| M4 | `procedure_selected` | forward `usrad:procedureSelected` (`src/lib/events/search-events.js:5`) | Patient |
| M5 | `handoff_to_app` | `SearchStep2.astro` submit; provider signup CTAs | Patient + Provider |
| M6 | `provider_tool_viewed` | `/provider/network-map`, `/smartmatch`, `/portal-tour` | Provider |
| M7 | `lead_submitted` (provider) | `/api/provider-consultation` | Provider |

### Instrumentation hygiene

| # | Issue | Evidence |
| --- | --- | --- |
| H1 | GA4 absent from 6 of 7 layouts — `/employer/schedule` (funnel endpoint) and `/news` emit nothing | §4 layout table |
| H2 | `app_surface` missing on 9 of 27 call sites | `NewsletterPopup.astro` (3), `ExitModal.astro` (6) |
| H3 | `trackMarketingEvent()` unused; `window.trackMarketingEvent` never assigned | `src/utils/analytics.ts`; `SearchStep2.astro:904` |
| H4 | No consent mode — no `gtag('consent', …)` anywhere | grep across `src/` |
| H5 | Hardcoded GA4 measurement-ID fallback | `CarbonLayout.astro:23` |
| H6 | `PUBLIC_REMIX_URL` has 3 conflicting fallbacks + 1 missing fallback | §2 |

---

## 11. Security and credential plan

### Principles

1. **No credential in source control.** Fix `.gitignore` first (§3).
2. **No credential in a `PUBLIC_*` variable.** Astro inlines `PUBLIC_*` into client bundles.
   Google service-account material must never carry that prefix.
3. **Least privilege.** Read-only scopes; one service account per API.
4. **Separate dev and production credentials**, stored per-environment in Vercel.
5. **Rotation** on a fixed cadence and on any staff change.
6. **Access logging** via Google Cloud audit logs on both service accounts.

### Per-service plan

| Service | Proposed variable name(s) | Scope / role | Notes |
| --- | --- | --- | --- |
| Search Console API | `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`, `GSC_SITE_URL` | `webmasters.readonly`; **Restricted** user on the GSC property | Split-field form avoids storing raw JSON. Server-only. |
| GA4 Data API | same service account, plus `GA4_PROPERTY_ID` | `analytics.readonly`; **Viewer** on the GA4 property | `GA4_PROPERTY_ID` is a numeric property ID — distinct from the public `PUBLIC_GA4_MEASUREMENT_ID`. |
| Supabase | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (existing) | service-role, **server-only** | Consolidate the duplicate `SUPABASE_SERVICE_KEY` / `SUPABASE_SERVICE_ROLE_KEY` names. Never import into a client component. |
| Vercel cron | `CRON_SECRET` (new) | bearer token | Required by all four new endpoints **and** retrofitted to `/api/cron/check-follow-ups`. |

### Storage and handling

- Credentials live **only** in Vercel project environment variables, scoped per environment.
- Nothing is written to `.env.example` beyond the **variable name** with an empty placeholder.
- Grant the service account access to the GSC property and GA4 property only — no
  project-wide IAM role.
- Prefer the split `SERVICE_ACCOUNT_EMAIL` + `PRIVATE_KEY` form over a JSON blob: it is easier
  to rotate and impossible to accidentally commit as a file.

### Immediate remediation (independent of the Flight Deck)

1. Extend `.gitignore` for credential JSON, `*.pem`, `*.key`, and a general `.env.*` rule with
   a `!.env.example` negation.
2. Add `CRON_SECRET` gating to `/api/cron/check-follow-ups`.
3. Gate `/admin/*` behind the new middleware.
4. Manually verify tracked `.env.example` contains placeholders only.

---

## 12. Recommended Version 1 scope

**One page — `/internal/flight-deck` — rendering five modules and at most three actions.**

| Module | Content | Source |
| --- | --- | --- |
| 1. Executive summary | 4 tiles: organic clicks, sessions, total leads (all funnels), avg. GSC position — each with 7-day vs prior-7-day delta | `gsc_daily_snapshots`, `ga4_daily_snapshots`, `funnel_daily_rollup` |
| 2. Search Console trends | 28-day clicks/impressions line; top 10 queries; top 10 pages; position movers | `gsc_daily_snapshots` |
| 3. GA4 acquisition trends | 28-day sessions by channel; top 10 landing pages | `ga4_daily_snapshots` |
| 4. Funnel summaries | Three compact panels — patient / provider / employer — step counts + conversion rate, each labelled with its measurement source and a visible **"partially instrumented"** badge where §10 gaps apply | `funnel_daily_rollup` |
| 5. Technical SEO alerts | Pass/fail: robots.txt present, sitemap present & fresh, canonical coverage %, legacy routes indexable, broken funnel links | `seo_health_checks` |
| 6. Top 3 actions | Ranked, threshold-generated, each linking to its evidence | `flight_deck_recommendations` |

### Explicitly out of scope for V1

Real-time data; custom date-range picker; cohort/retention; attribution modelling; per-user
drilldown; CSV export; alerting/email digests; multi-user roles; anything about the Remix app's
internal behaviour.

**The "partially instrumented" badge in module 4 is not optional.** Given the employer funnel
has zero client-side events, a V1 that renders three funnels without provenance labels would
misinform the one person it is built for.

---

## 13. Implementation sequence

| Phase | Task | Depends on | Est. |
| --- | --- | --- | --- |
| **0.1** | Extend `.gitignore` (credential JSON, `*.pem`, `*.key`, `.env.*` + `!.env.example`) | — | 15 min |
| **0.2** | Manually verify tracked `.env.example` holds placeholders only | 0.1 | 10 min |
| **0.3** | Add `src/middleware.ts`; gate `/internal/*` **and** `/admin/*` | — | 3 h |
| **0.4** | Add `CRON_SECRET`; retrofit `/api/cron/check-follow-ups` | — | 45 min |
| **1.1** | Add `robots.txt` (disallow `/internal/`, `/admin/`, `x`-prefixed, `_test-*`, debug APIs) | — | 1 h |
| **1.2** | Install + configure `@astrojs/sitemap`; exclude non-public routes | 1.1 | 2 h |
| **1.3** | Verify property in GSC; submit sitemap | 1.2 | 30 min |
| **2.1** | Fix B1 — create `/api/market-analysis` (mirror `guide-download.ts`) | — | 2 h |
| **2.2** | Fix B2 — repoint or create `/employer/cost-analysis` | — | 30 min |
| **2.3** | Add employer events M1–M3 | — | 3 h |
| **2.4** | Add GA4 to `MainLayout` (covers `/employer/schedule`) | — | 1 h |
| **2.5** | Retire `trackMarketingEvent()` **or** adopt it everywhere; backfill `app_surface` on the 9 gaps | — | 2 h |
| **3.1** | Create service account; grant GSC + GA4 read-only; set Vercel env vars | 1.3 | 1.5 h |
| **3.2** | Install `googleapis`; add `src/lib/google/{gsc,ga4}.ts` | 3.1 | 3 h |
| **3.3** | Migrations for the 5 tables | — | 2 h |
| **3.4** | Build 4 cron endpoints; register in `vercel.json` | 3.2, 3.3, 0.4 | 5 h |
| **3.5** | Backfill 90 days of GSC + GA4 | 3.4 | 1 h |
| **4.1** | Build `/internal/flight-deck` with Tremor | 3.5, 0.3 | 8 h |
| **4.2** | SEO health check job + alerts module | 3.3 | 3 h |
| **4.3** | Recommendation thresholds (top 3) | 4.1 | 3 h |

Phases 0–2 are the preconditions from §1. Phase 1 must precede 3.1: submitting a sitemap
before backfilling GSC means the backfilled window reflects a crawlable site.

---

## 14. Files likely to change

**New:**
```
src/middleware.ts
public/robots.txt
src/pages/internal/flight-deck.astro
src/layouts/InternalLayout.astro
src/lib/google/gsc.ts
src/lib/google/ga4.ts
src/lib/flight-deck/{rollup,seo-health,recommendations}.ts
src/pages/api/cron/{snapshot-gsc,snapshot-ga4,rollup-funnels,seo-health}.ts
src/pages/api/market-analysis.ts                    ← fixes B1
src/components/flight-deck/*.tsx
supabase/migrations/<timestamp>_flight_deck.sql
```

**Modified:**
```
.gitignore                                          ← P0
astro.config.mjs                                    ← @astrojs/sitemap
vercel.json                                         ← 4 cron entries
package.json                                        ← googleapis, @astrojs/sitemap
.env.example                                        ← names only, empty placeholders
src/pages/api/cron/check-follow-ups.js              ← CRON_SECRET
src/layouts/MainLayout.astro                        ← GA4
src/layouts/CarbonLayout.astro                      ← remove hardcoded GA4 fallback
src/components/employer/ROICalculator.astro         ← M1
src/pages/employer/implementation-guide.astro       ← M3
src/components/hero/SearchStep2.astro               ← M4/M5 + REMIX_URL fallback
src/components/provider/{ExitModal,*}.astro         ← app_surface, M6
src/utils/analytics.ts                              ← adopt or delete
src/pages/index.astro                               ← REMIX_URL fallback
```

---

## 15. Risks and cross-application dependencies

| # | Risk | Severity | Mitigation |
| --- | --- | --- | --- |
| R1 | **Credential committed** — no `.gitignore` rule matches any service-account filename | **Critical** | Phase 0.1 before any credential is downloaded |
| R2 | **`/admin/*` unauthenticated** (9 of 10), incl. `contacts.astro` exposing submission PII | **Critical** | Phase 0.3 |
| R3 | **Unauthenticated cron** with module-scope service-role + Resend clients | **High** | Phase 0.4 |
| R4 | **GA4 property mismatch across domains** — cannot verify from this repo that `app.usrad.com` uses the same property | **High** | Confirm in Remix repo before claiming an end-to-end patient funnel |
| R5 | **Patient funnel is majority cross-app** — steps 5–6 not measurable here | **High** | Label V1 patient funnel as "handoff-truncated" |
| R6 | **Employer funnel uninstrumented** — Supabase-only in V1 | **High** | Provenance badges (§12); Phase 2.3 |
| R7 | **GSC data restated ~3 days** | Medium | Upsert on unique grain; re-fetch trailing 3 days nightly |
| R8 | **GA4 Data API quotas / sampling** | Medium | Nightly aggregate pulls; narrow dimensions |
| R9 | **No migrations for 7 existing tables** — schema not reproducible | Medium | Capture in the Phase 3.3 migration |
| R10 | **`/imaging-center/*` duplicates `/provider/*`** — splits organic authority and double-counts provider funnel | Medium | Canonicalize or 301; decide before rollup logic |
| R11 | **50 legacy routes crawlable** | Medium | Phase 1.1 |
| R12 | **`PUBLIC_REMIX_URL` misconfiguration** breaks the primary patient CTA silently | Medium | Single shared constant + build-time assertion |
| R13 | **Vercel `maxDuration: 30`** may truncate a 90-day backfill | Low | Chunk backfill by week |
| R14 | **No consent mode** — GA4 completeness varies by jurisdiction | Low | Note in V1; address with legal |

---

## 16. Evidence appendix

### Repository state
```
pwd                        /home/usrad/Web Development/usradiology-redund-project
git rev-parse --show-toplevel   (same)
git branch --show-current  main
git status --short         (empty — clean)
git log -1 --oneline       073ddb4 docs(marketing): add claims inventory...
```

### Configuration
| Finding | Location |
| --- | --- |
| SSR output mode | `astro.config.mjs:10` |
| Vercel adapter, `maxDuration: 30` | `astro.config.mjs:13-16` |
| Existing cron registration | `vercel.json:3-6` |
| `@tremor/react ^3.18.7` | `package.json:52` |
| `recharts ^2.15.3` | `package.json:82` |

### Analytics
| Finding | Location |
| --- | --- |
| GA4 ID resolution + hardcoded fallback | `src/layouts/CarbonLayout.astro:23` |
| gtag loader | `src/layouts/CarbonLayout.astro:92-96` |
| `dataLayer` / `gtag` shim | `src/layouts/CarbonLayout.astro:98-102` |
| `anonymize_ip` | `src/layouts/CarbonLayout.astro:104` |
| Cross-domain linker | `src/layouts/CarbonLayout.astro:105-107` |
| `noindex` example is inside an HTML comment | `src/layouts/CarbonLayout.astro:115-119` |
| `ProviderLayout` sets sitewide `noindex` | `src/layouts/ProviderLayout.astro:25` |
| Unused analytics helper | `src/utils/analytics.ts` (entire file) |
| Dead `window.trackMarketingEvent` branch | `src/components/hero/SearchStep2.astro:904` |
| `hero_search_submitted` | `src/components/hero/SearchStep2.astro:910` |
| Patient handoff form action | `src/components/hero/SearchStep2.astro:39` |
| `remixUrl` with no fallback | `src/components/hero/SearchStep2.astro:27` |
| `content_page_view` (13 sites) | `src/pages/blog.astro:1042` + 12 posts |
| `trust_content_view` | `src/pages/about.astro:1400` |
| Newsletter events (no `app_surface`) | `src/components/NewsletterPopup.astro:587,608,692` |
| Provider modal events (no `app_surface`) | `src/components/provider/ExitModal.astro:990,1131,1141,1149` |
| `market_analysis_requested` gated on `response.ok` | `src/components/provider/ExitModal.astro:1198-1206` |
| Connect events | `src/components/connect/AudiencePicker.astro:89,125`; `ConnectCTA.astro:58` |
| UI event bus (not analytics) | `src/lib/events/search-events.js:3-7` |

### Server-side funnel data
| Table | Location |
| --- | --- |
| `employer_leads` | `src/pages/api/employer-roi-report.ts:101` |
| `employer_consultations` | `src/pages/api/employer-consultation.js:53` |
| `guide_downloads` | `src/pages/api/guide-download.ts:86,199`; `employer-guide-download.ts:60,234` |
| `lead_scores` | `src/pages/api/guide-download.ts:250,275,296`; `employer-guide-download.ts:245,257,267` |
| `provider_consultations` | `src/pages/api/provider-consultation.js:48` |
| `popup_analytics` | `src/pages/api/track-popup.ts:50` |
| `contact_submissions` | `src/pages/api/cron/check-follow-ups.js:17` |

### Security
| Finding | Location |
| --- | --- |
| Cron: service-role client at module scope | `src/pages/api/cron/check-follow-ups.js:4-7` |
| Cron: Resend client at module scope | `src/pages/api/cron/check-follow-ups.js:9` |
| Cron: `GET()` with no request param / no auth | `src/pages/api/cron/check-follow-ups.js:11` |
| `/admin/*` — 9 of 10 with no gate | `src/pages/admin/*.astro` |
| No middleware | absence of `src/middleware.ts` |

### Broken paths
| Finding | Evidence |
| --- | --- |
| `POST /api/market-analysis` → 404 | called `ExitModal.astro:1187`; no `src/pages/api/market-analysis.*` |
| `/employer/cost-analysis` → 404 | linked from `src/components/employer/`; no such route file |

### Gap analysis vs. the April 12, 2026 report
Source: `docs/engineering/MARKETING-SYSTEM-ENGINEERING-REPORT-V2.md` (committed `e696e75`, 2026-04-22).

| # | Report claim | Line | Verdict | Basis |
| --- | --- | --- | --- | --- |
| 1 | GA4 integrated in `CarbonLayout` | 27, 834 | **Confirmed** | `CarbonLayout.astro:23,92-109` |
| 2 | No `sitemap.xml`; `@astrojs/sitemap` not installed | 44, 800, 933 | **Confirmed** | absent from `public/` and `package.json` |
| 3 | No `robots.txt` | 44, 801, 934 | **Confirmed** | repo-wide `find` returns nothing |
| 4 | Event contract documented | 839 | **Confirmed** | `docs/analytics/analytics-event-contract.md` (611 lines) |
| 5 | `hero_search_submitted` in `SearchStep2` | 840 | **Confirmed** | `SearchStep2.astro:910` |
| 6 | "No canonical tags on any page" | 803, 946, 1182 | **Changed** | 7 `/connect*` routes gained canonicals in `49528b2` (2026-05-27), **after** the report |
| 7 | "No JSON-LD structured data" | 804, 947, 1183 | **Was inaccurate when written** | `education/what-is-an-mri.astro` has had JSON-LD since `4fa2f09` (2025-10-24) |
| 8 | `trackMarketingEvent()` "tags **all** events with `app_surface`" | 838 | **Was inaccurate when written** | helper has never had a consumer (`git log -S`: only `8b65ca4`/`8ca8154`, both 2026-03-16); 9 of 27 sites omit `app_surface` |
| 9 | Test/debug pages may be indexed | 934 | **Confirmed and broader** | also `public/_test-*.html` ×3 and 5 debug API routes |
| 10 | Search Console integration | — | **Not addressed by the report** | none present |
| 11 | Server-side funnel tables | — | **Not addressed by the report** | 7 tables found (see above) |
| 12 | `/admin/*` unauthenticated | — | **Not addressed by the report** | 9 of 10 pages |

**Two of the report's claims were inaccurate at publication** (#7, #8) and one has since changed
(#6). The report should not be treated as authoritative for analytics or SEO state without
re-verification.

---

*Discovery performed 2026-07-30. No application files modified. No secrets read, printed, or
committed. Nothing staged or committed.*
