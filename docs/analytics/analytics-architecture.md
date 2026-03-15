# USRad Analytics Architecture

**Document:** `docs/analytics/analytics-architecture.md`
**Version:** 1.0
**Status:** Canonical — do not modify without engineering review
**Applies to:** Astro repo (usrad.com) + Remix repo (app.usrad.com)
**Prepared by:** USRad Platform Engineering
**Date:** March 2026

---

## 1. Purpose

This document defines the unified analytics architecture for the USRad platform. It covers system design principles, layer responsibilities, cross-domain requirements, and reporting strategy.

USRad operates as a two-sided healthcare marketplace across two applications:

- **Astro repo** — `usrad.com` — marketing site, patient acquisition, provider recruitment
- **Remix repo** — `app.usrad.com` — PBS Search, PBS Booking, Member Portal, Provider Onboarding, PSA Signing, Provider Portal

Because the user journey spans two domains, analytics must be implemented as a **unified cross-domain system**, not two isolated tracking installations.

---

## 2. Core Design Principle

> **GA4 answers: how are users moving?**
> **Supabase answers: what actually happened?**

This distinction governs every implementation decision:

| Signal type | Destination | Rationale |
|---|---|---|
| Browser/UI intent and behavior | GA4 | Traffic, funnels, page performance, event counts |
| Confirmed business milestones | Supabase | Authoritative records unaffected by browser blocking or double-fires |
| Critical conversion milestones | Both | Cross-validated for funnel analysis and investor reporting |

A browser event can fail, be blocked by an ad blocker, or fire twice. If Supabase records `booking_submitted = true`, that is ground truth. GA4 tells the story of movement; Supabase tells the story of what actually happened in the business.

---

## 3. System Architecture — Five Layers

### Layer 1 — Traffic Acquisition

External sources delivering visitors to USRad: organic search, direct, referrals, social, paid campaigns (future).

### Layer 2 — Marketing Application (Astro / usrad.com)

**Responsibilities:**
- Acquisition analytics
- Trust content performance
- Hero search interaction tracking
- Provider recruitment page analytics
- Blog and procedure content analytics

**Primary tracked behaviors:** visitor arrival, hero search submission, trust content interaction, provider recruitment interest, click-to-call.

**Key files:**
- `src/layouts/CarbonLayout.astro` — GA4 base script
- `src/pages/index.astro` — visitor_landed
- `src/components/hero/SearchStep2.astro` — hero_search_submitted (Astro→Remix handoff)
- `src/components/home/AboutSection.astro` — trust_content_view
- `src/pages/how-it-works.astro` — hiw_page_view
- `src/pages/provider.astro` — provider_page_view, provider_cta_clicked
- `src/pages/blog.astro` + `src/pages/blog/[slug].astro` — content_page_view
- `src/utils/analytics.ts` — trackMarketingEvent helper

### Layer 3 — Platform Application (Remix / app.usrad.com)

**Responsibilities:**
- Product funnel analytics
- Patient booking workflow tracking
- Provider onboarding workflow tracking
- Member and provider portal usage

**Primary tracked behaviors:** PBS search, facility evaluation, booking initiation, account creation, booking submission, provider onboarding progress, PSA signing, portal access.

**Key files:**
- `app/root.tsx` — GA4 base script (same measurement ID as Astro)
- `app/routes/pbs.search.tsx` — procedure_search, search_results_view, pricing_view, facility_view
- `app/routes/pbs.book.tsx` — booking_started, email_verification_sent, member_account_created
- `app/routes/api.pbs.confirm-booking.ts` — booking_submitted (authoritative)
- `app/routes/patient.dashboard.tsx` — member_portal_accessed
- `app/routes/onboarding._index.tsx` — provider_onboarding_started
- `app/routes/onboarding.facilities.tsx` — facility_profile_submitted
- `app/routes/onboarding.psa-signing.tsx` — psa_viewed
- `app/routes/api.docuseal-webhook-v4.tsx` — psa_signed, provider_activated (authoritative)
- `app/routes/providers.portal.tsx` — provider_portal_accessed
- `app/utils/analytics.ts` — trackProductEvent + recordBusinessEvent helpers

### Layer 4 — Business Truth Layer (Supabase)

**Responsibilities:**
- Authoritative booking records (`appointment_requests`)
- Authoritative PSA completion (`agreements`, `corporate_entities.agreement_signed_at`)
- Authoritative provider activation milestones
- Internal analytics event log (`analytics_events` — new table, see schema doc)

Supabase records represent **actual business events**, not browser behavior. These are the metrics cited in investor reporting.

### Layer 5 — Reporting Layer

| Tool | Used for |
|---|---|
| Google Analytics 4 | Traffic acquisition, behavioral funnels, event analytics, cross-domain user flow |
| Looker Studio (free) | Operational dashboards, partner reporting, investor snapshots |
| Supabase SQL | Marketplace intelligence, demand vs supply analysis, provider recruitment reporting |

---

## 4. Cross-Domain Tracking — Critical Requirement

The user journey crosses two domains:

```
usrad.com → app.usrad.com
```

Without cross-domain configuration, GA4 treats a patient who searches on the marketing site and books on the app as two disconnected anonymous users. The entire patient funnel becomes fiction.

**Required configuration:**
- Single GA4 property for both applications
- Same Measurement ID in both `CarbonLayout.astro` and `app/root.tsx`
- Cross-domain linking enabled in GA4 Admin → Data Streams → Configure tag settings → Configure your domains
- Add both `usrad.com` and `app.usrad.com` to the linked domains list

This must be completed in Phase 1 before any funnel analysis is meaningful.

---

## 5. The Two Core Marketplace Funnels

### Patient Funnel

```
visitor_landed          (usrad.com — CarbonLayout.astro)
        ↓
hero_search_submitted   (SearchStep2.astro — Astro→Remix handoff point)
        ↓
procedure_search        (pbs.search.tsx — loader Phase 8, fire-and-forget)
        ↓
search_results_view     (pbs.search.tsx — after isHydrated=true)
        ↓
pricing_view            (ProviderCard render)
        ↓
facility_view           (learnMoreOpen modal)
        ↓
booking_started         (handleBookNow → create-session success)
        ↓
email_verification_sent (InlineEmailVerification magic link send)
        ↓
member_account_created  (onVerified callback)
        ↓
booking_submitted       (api.pbs.confirm-booking.ts — after createBooking())
        ↓
scan_completed          (fulfillment workflow — Supabase + GA4)
```

### Provider Funnel

```
provider_page_view          (usrad.com — src/pages/provider.astro)
        ↓
provider_cta_clicked        (Join Network button)
        ↓
provider_onboarding_started (onboarding._index.tsx)
        ↓
org_setup_completed         (onboarding.organization action)
        ↓
facility_profile_submitted  (onboarding.facilities action)
        ↓
pricing_configured          (onboarding.portfolio-pricing action)
        ↓
psa_viewed                  (onboarding.psa-signing — DocuSeal iframe render)
        ↓
psa_signed                  (api.docuseal-webhook-v4 — after agreements record created)
        ↓
provider_activated          (agreement_signed_at set — Supabase + GA4)
        ↓
provider_portal_accessed    (providers.portal layout loader)
```

---

## 6. Four Reporting Dashboards

### Dashboard 1 — Marketing Performance
**Tool:** GA4 + Looker Studio
**Answers:** Where are patients and providers coming from, and what content drives them into the product?

Key metrics: traffic by channel, hero search usage rate, trust content engagement by section, HIW page scroll depth, blog article read-through rate by category, provider page → CTA conversion rate.

### Dashboard 2 — Patient Funnel
**Tool:** GA4 Funnel Exploration
**Answers:** Where in the booking funnel do patients stall?

Key metrics: visitor → search conversion, search → booking conversion, booking → scan completion rate, wizard step abandonment.

### Dashboard 3 — Provider Funnel
**Tool:** GA4 + Supabase
**Answers:** Where do imaging centers stall in onboarding, and what creates PSA friction?

Key metrics: provider page → onboarding conversion, onboarding → PSA conversion, PSA → activation rate, step-by-step abandonment.

### Dashboard 4 — Marketplace Intelligence
**Tool:** Supabase SQL
**Answers:** Where is imaging demand outpacing supply? This is the provider recruitment engine.

Key metrics: searches by city × procedure type, demand vs supply gap, empty-state rate by market, booking velocity by market.

---

## 7. HIPAA Guardrails

USRad touches healthcare-adjacent workflows. All analytics events must carry only anonymous behavioral signals.

**Never capture in any analytics event:**
- `patient_name`
- `date_of_birth`
- `email_address`
- `insurance_id`
- `medical_condition`
- `prescription_content`
- Any PII or PHI

**Safe parameters for all events:**
- `procedure_type` (e.g., "MRI Brain Without Contrast")
- `city`, `state`, `zip_code`
- `device_type`
- `traffic_source`
- `facility_id` (internal UUID — not patient-identifiable)
- `provider_type`

---

## 8. Strategic Purpose

When implemented correctly, this analytics architecture answers five questions every week:

1. Where is imaging demand coming from? (traffic source, city, procedure type)
2. Which procedures are patients searching for most? (demand intelligence)
3. Where are patients dropping off in the booking funnel? (product improvement signals)
4. Which markets have demand but insufficient providers? (network expansion intelligence)
5. Which steps in provider onboarding create friction? (operational improvement signals)

These five questions transform analytics from a reporting tool into a **marketplace control system**.

---

## 9. Related Documents

- `docs/analytics/analytics-event-contract.md` — Complete event dictionary with parameters and destinations
- `docs/analytics/analytics-implementation-plan.md` — Phase-by-phase execution checklist

---

*USRad Analytics Architecture · Version 1.0 · March 2026 · Confidential*