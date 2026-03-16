# USRad Analytics Event Contract

**Document:** `docs/analytics/analytics-event-contract.md`
**Version:** 1.0
**Status:** Living document — update when any event is added, modified, or deprecated
**Applies to:** Astro repo (usrad.com) + Remix repo (app.usrad.com)
**Date:** March 2026

---

## Governance Rules

1. Every analytics event in the codebase must have an entry in this document.
2. No new event may be added to the codebase without a corresponding entry here first.
3. Event names, parameters, and destinations must not change without updating this document.
4. This document is the single source of truth for the analytics system.

Without this governance, analytics decays as the codebase grows.

---

## Standard Parameters

All events share this base parameter set. Include relevant ones on every event.

| Parameter | Type | Values | Notes |
|---|---|---|---|
| `user_type` | string | `anonymous`, `member`, `provider`, `staff` | Default: anonymous for public routes |
| `app_surface` | string | `marketing`, `pbs_search`, `pbs_booking`, `onboarding`, `provider_portal`, `member_portal` | Always include |
| `city` | string | Resolved city name | From ZIP or browser geolocation |
| `state` | string | Two-letter state code | |
| `zip_code` | string | 5-digit ZIP | Anonymous — not patient-identifiable |
| `device_type` | string | `mobile`, `desktop`, `tablet` | From user agent |
| `traffic_source` | string | `google`, `direct`, `referral`, `social` | From GA4 session attribution |

**Never include:** patient_name, email, date_of_birth, insurance_id, medical_condition, prescription_content.

---

## Category 1 — Marketing Intent Events

Tracked on the Astro marketing site (usrad.com). All fire client-side via `trackMarketingEvent()` helper.

---

### visitor_landed

**Definition:** User arrives on any page of the marketing site for the first time in a session.
**Fires from:** `src/pages/index.astro` — DOMContentLoaded (mirrors AOSInit pattern)
**Destination:** GA4
**Mark as conversion:** No

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `marketing` |
| `traffic_source` | Yes | `google` |
| `city` | No | `Tampa` |
| `device_type` | Yes | `mobile` |
| `page_type` | Yes | `homepage` |

**Strategic use:** Measures total demand and acquisition channel quality.

---

### hero_search_started

**Definition:** User focuses on or interacts with the hero search bar before submitting.
**Fires from:** `src/components/hero/SearchStep1.astro` — searchManager focus event
**Destination:** GA4
**Mark as conversion:** No

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `marketing` |

**Strategic use:** Distinguishes passive visitors from active searchers. Numerator for search engagement rate.

---

### hero_search_submitted

**Definition:** User submits a procedure search from the marketing site hero. This is the Astro→Remix handoff point.
**Fires from:** `src/components/hero/SearchStep2.astro` — before form submit action
**Destination:** GA4
**Mark as conversion:** Yes
**CRITICAL:** This file is protected. Add analytics call only. Never touch form action, hidden fields, or `search-manager.ts` integration.

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `marketing` |
| `procedure_type` | Yes | `MRI Brain Without Contrast` |
| `zip_code` | Yes | `33602` |
| `city` | No | `Tampa` |

**Strategic use:** The primary marketing → product handoff event. Conversion rate from visitor_landed to this event is the homepage's most important metric.

**Implementation note:** In `CarbonLayout.astro`, the GA4 config script uses `define:vars` which causes Astro to wrap it in an IIFE. Always use `window.gtag = function()` and `window.dataLayer` — never `function gtag()` — to ensure gtag is accessible in the global scope across all components.

---

### trust_content_view

**Definition:** User scrolls into view of a trust-building section on the About page.
**Fires from:** `src/components/home/AboutSection.astro` — IntersectionObserver on section elements
**Destination:** GA4
**Mark as conversion:** No

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `marketing` |
| `section` | Yes | `founder_photo`, `case_study_246m`, `timeline`, `founder_promise` |

**Strategic use:** Trust content is a conversion diagnostic. If converters disproportionately viewed founder_photo → case_study_246m before searching, trust content is part of the funnel and must be protected in redesigns.

---

### hiw_page_view

**Definition:** User views the How It Works page.
**Fires from:** `src/pages/how-it-works.astro` — page load
**Destination:** GA4
**Mark as conversion:** No

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `marketing` |
| `referrer` | No | `homepage` |
| `device_type` | Yes | `mobile` |
| `step_reached` | No | `1`, `2`, `3`, `4` (highest sticky step reached) |

**Strategic use:** Measures education funnel depth. Patients who complete the HIW walkthrough convert at higher rates.

---

### provider_page_view

**Definition:** User views the provider/imaging center recruitment page.
**Fires from:** `src/pages/provider.astro` — page load
**Destination:** GA4
**Mark as conversion:** No

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `marketing` |
| `city` | No | `Orlando` |
| `traffic_source` | No | `google` |

**Strategic use:** Top of the provider recruitment funnel. Denominator for provider_cta_clicked conversion rate.

---

### provider_cta_clicked

**Definition:** User clicks the Join Network / become a provider CTA.
**Fires from:** `src/pages/provider.astro` — Join Network button click
**Destination:** GA4
**Mark as conversion:** Yes

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `marketing` |
| `cta_location` | Yes | `hero`, `mid_page`, `footer` |
| `city` | No | `Orlando` |

**Strategic use:** Measures provider page persuasiveness. Low rate signals provider page needs improvement.

---

### phone_click

**Definition:** User clicks a phone number link on any marketing page.
**Fires from:** All `<a href="tel:...">` elements with `data-track-call` attribute
**Destination:** GA4
**Mark as conversion:** Yes

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `marketing` |
| `page_location` | Yes | `/how-it-works` |

**Strategic use:** High-intent signal. Patients who call are often ready to book. Tracks offline conversion potential.

---

### content_page_view

**Definition:** User views a blog article or the main blog index page.
**Fires from:**
- `src/pages/blog.astro` — main blog page load
- `src/pages/blog/[slug].astro` — individual article page load (11 current slugs in `src/data/blogPosts.js`)
**Destination:** GA4
**Mark as conversion:** No

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `marketing` |
| `content_type` | Yes | `blog_index`, `blog_article` |
| `content_slug` | No | `real-cost-of-mri` |
| `category` | No | `Cost & Savings`, `Patient Guide`, `Health & Wellness`, `Innovation`, `Healthcare Policy` |
| `read_time` | No | `8 min read` (from `blogPosts.js` metadata) |

**Implementation note:** Blog post pages use `CarbonLayout.astro` as their layout and import from `src/data/blogPosts.js` as the central data source. The `content_slug` and `category` values are available as frontmatter at build time — pass them into a `<script define:vars>` block to make them available to `trackMarketingEvent` at runtime.

```astro
---
// In src/pages/blog/[slug].astro
// slug, category, readTime are available from blogPosts.js
---
<script define:vars={{ slug, category, readTime }}>
  import { trackMarketingEvent } from '../../utils/analytics';
  trackMarketingEvent('content_page_view', {
    content_type: 'blog_article',
    content_slug: slug,
    category: category,
    read_time: readTime,
  });
</script>
```

**Strategic use:** Identifies which blog content drives patients into the PBS search funnel. Combined with Search Console query data from Phase 1, reveals content gaps where search demand exists but no article captures it. The five categories (Cost & Savings, Patient Guide, Health & Wellness, Innovation, Healthcare Policy) map directly to patient decision stages and can be used to prioritize the content calendar.

---

## Category 2 — Patient Funnel Events

Tracked in the Remix application (app.usrad.com). Fire via `trackProductEvent()` helper (client) or `recordBusinessEvent()` helper (server).

---

### procedure_search

**Definition:** Patient submits a procedure search in PBS Search.
**Fires from:** `app/routes/pbs.search.tsx` — loader Phase 8, fire-and-forget (`trackSearch` stub expansion)
**Destination:** GA4 only — see architecture note below
**Fires client-side:** `useEffect` after `isHydrated=true` and `results` available
**Mark as conversion:** Yes

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `pbs_search` |
| `procedure_type` | Yes | `MRI Brain Without Contrast` |
| `cpt_code` | No | `70551` |
| `zip_code` | Yes | `33602` |
| `city` | Yes | `Tampa` |
| `state` | No | `FL` |
| `result_count` | Yes | `12` |
| `usrad_count` | No | `3` (contracted facilities) |
| `acr_count` | No | `9` (discovery facilities) |
| `radius_miles` | No | `25` |

**Strategic use:** The single most important event in the system. Captures real patient demand signals. Powers the marketplace intelligence dashboard and provider recruitment engine.

**Architecture note:** GA4 only — do not write to `analytics_events`. The `pbs_search_analytics` table is the canonical demand intelligence source and already captures richer search data (CPT codes, lat/lng, result counts, device type, session metadata). Writing a duplicate record to `analytics_events` would create two sources of truth. GA4 event is emitted for funnel tracking and attribution only.

---

### search_results_view

**Definition:** Patient views search results after isHydrated=true (full client render).
**Fires from:** `app/routes/pbs.search.tsx` — useEffect after `isHydrated=true`
**Destination:** GA4
**Mark as conversion:** No

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `pbs_search` |
| `procedure_type` | Yes | `MRI Brain Without Contrast` |
| `city` | Yes | `Tampa` |
| `usrad_count` | Yes | `3` |
| `acr_count` | Yes | `9` |

---

### pricing_view

**Definition:** Patient views pricing on a provider card in search results.
**Fires from:** `app/routes/pbs.search.tsx` — ProviderCard render (visible cards)
**Destination:** GA4
**Mark as conversion:** No

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `pbs_search` |
| `procedure_type` | Yes | `MRI Brain Without Contrast` |
| `city` | Yes | `Tampa` |
| `price_shown` | Yes | `267` (in dollars) |
| `provider_type` | Yes | `usrad` or `acr` |

---

### facility_view

**Definition:** Patient opens the facility detail modal (Learn More).
**Fires from:** `app/routes/pbs.search.tsx` — `learnMoreOpen` state change
**Destination:** GA4
**Mark as conversion:** No

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `pbs_search` |
| `facility_id` | Yes | Internal UUID (not patient-identifiable) |
| `procedure_type` | Yes | `MRI Brain Without Contrast` |
| `city` | Yes | `Tampa` |
| `price_shown` | Yes | `267` |
| `provider_type` | Yes | `usrad` or `acr` |

**Strategic use:** Measures facility-level interest. High views + low bookings on a facility = pricing or trust issue at that center.

---

### booking_started

**Definition:** Patient clicks Book Now and a booking session is successfully created.
**Fires from:** `app/routes/pbs.search.tsx` — `handleBookNow` after `create-session` POST succeeds
**Destination:** GA4 + Supabase `analytics_events`
**Mark as conversion:** Yes

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `pbs_booking` |
| `procedure_type` | Yes | `MRI Brain Without Contrast` |
| `facility_id` | Yes | Internal UUID |
| `city` | Yes | `Tampa` |
| `provider_type` | Yes | `usrad` or `acr` |

**Strategic use:** True purchase intent signal. Measures search-to-intent conversion.

---

### email_verification_sent

**Definition:** Patient enters email and magic link verification is sent.
**Fires from:** `app/routes/pbs.book.tsx` — `InlineEmailVerification` component on magic link dispatch
**Destination:** GA4
**Mark as conversion:** No

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `pbs_booking` |

**Strategic use:** Identifies email verification as a potential friction point. If many booking_started events do not reach member_account_created, magic link deliverability should be investigated.

---

### member_account_created

**Definition:** Patient's email is verified and the form is unlocked for editing.
**Fires from:** `app/routes/pbs.book.tsx` — `onVerified` callback after `email_verified=true`
**Destination:** GA4 + Supabase `analytics_events`
**Mark as conversion:** Yes

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `pbs_booking` |
| `signup_method` | Yes | `booking_flow` |
| `city` | No | `Tampa` |

---

### booking_submitted

**Definition:** Patient successfully submits a booking request. Booking record created in `appointment_requests`.
**Fires from:** `app/routes/api.pbs.confirm-booking.ts` — after `createBooking()` returns successfully
**Destination:** GA4 (conversion) + Supabase `analytics_events`
**Mark as conversion:** Yes
**CRITICAL:** This is the authoritative booking creation path. The route action's `submit_booking` intent is explicitly blocked (returns 409). All bookings route through `confirm_booking → POST /api/pbs/confirm-booking → createBooking()`.

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `pbs_booking` |
| `procedure_type` | Yes | `MRI Brain Without Contrast` |
| `facility_id` | Yes | Internal UUID |
| `booking_id` | Yes | UUID from `appointment_requests` |
| `city` | Yes | `Tampa` |
| `provider_type` | No | `usrad` or `acr` |

**Strategic use:** Ultimate patient acquisition metric. Powers the booking velocity metric in the marketplace intelligence dashboard.

---

### member_portal_accessed

**Definition:** Authenticated patient loads the member dashboard.
**Fires from:** `app/routes/patient.dashboard.tsx` — loader success
**Destination:** GA4
**Mark as conversion:** No
**NOTE:** This file has three refactor freeze directives. Add analytics call in loader only. No component changes.

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `member_portal` |
| `user_type` | Yes | `member` |
| `booking_count` | No | `2` |

---

### scan_completed

**Definition:** Provider confirms imaging study completion in the fulfillment workflow.
**Fires from:** Fulfillment workflow server action (to be determined by fulfillment route)
**Destination:** Supabase `analytics_events` (primary) + GA4 (secondary)
**Mark as conversion:** Yes

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `provider_portal` |
| `procedure_type` | Yes | `MRI Brain Without Contrast` |
| `facility_id` | Yes | Internal UUID |
| `city` | Yes | `Tampa` |

**Strategic use:** The ultimate marketplace transaction event — equivalent to Airbnb's "stay completed." Powers scan_completed count in investor reporting.

---

## Category 3 — Provider Funnel Events

Tracked in the Remix onboarding and portal systems. Fire via `trackProductEvent()` or `recordBusinessEvent()`.

---

### provider_onboarding_started

**Definition:** Provider account arrives on the onboarding dashboard.
**Fires from:** `app/routes/onboarding._index.tsx` — loader, first visit detection
**Destination:** GA4 + Supabase `analytics_events`
**Mark as conversion:** Yes

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `onboarding` |
| `user_type` | Yes | `provider` |
| `facility_type` | No | `imaging_center` |
| `state` | No | `FL` |

---

### org_setup_completed

**Definition:** Provider completes Step 1 (organization setup) of onboarding.
**Fires from:** `app/routes/onboarding.organization.tsx` — action success
**Destination:** GA4
**Mark as conversion:** No

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `onboarding` |
| `user_type` | Yes | `provider` |
| `org_size` | No | `single`, `multi`, `enterprise` |
| `state` | No | `FL` |

---

### facility_profile_submitted

**Definition:** Provider completes Step 2 (facilities setup) of onboarding.
**Fires from:** `app/routes/onboarding.facilities.tsx` — action success
**Destination:** GA4
**Mark as conversion:** No

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `onboarding` |
| `user_type` | Yes | `provider` |
| `facility_count` | Yes | `3` |
| `state` | No | `FL` |
| `city` | No | `Orlando` |

---

### pricing_configured

**Definition:** Provider completes Step 3 (pricing configuration) of onboarding.
**Fires from:** `app/routes/onboarding.portfolio-pricing.tsx` or `onboarding.eportfolio-pricing.tsx` — action success
**Destination:** GA4
**Mark as conversion:** No

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `onboarding` |
| `user_type` | Yes | `provider` |
| `facility_count` | Yes | `3` |
| `rate_model` | No | `single`, `portfolio`, `enterprise` |

---

### psa_viewed

**Definition:** Provider opens the PSA signing page (DocuSeal iframe renders).
**Fires from:** `app/routes/onboarding.psa-signing.tsx` — loader, when DocuSeal submission is loaded
**Destination:** GA4
**Mark as conversion:** No
**NOTE:** Do not fire on reload if `agreement_signed_at` is already set.

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `onboarding` |
| `user_type` | Yes | `provider` |
| `psa_version` | No | From DocuSeal template version |
| `facility_type` | No | `imaging_center` |
| `state` | No | `FL` |

**Strategic use:** Denominator for PSA signing conversion rate. High psa_viewed + low psa_signed = legal friction in the agreement itself.

---

### psa_signed

**Definition:** Provider completes PSA signing via DocuSeal. Agreements record created.
**Fires from:** `app/routes/api.docuseal-webhook-v4.tsx` — after `agreements` record INSERT and `agreement_signed_at` set on `corporate_entities`
**Destination:** GA4 + Supabase `analytics_events`
**Mark as conversion:** Yes
**CRITICAL:** This is the authoritative PSA completion path — fired from the DocuSeal webhook, not the client. Server-side only.

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `onboarding` |
| `user_type` | Yes | `provider` |
| `facility_type` | No | `imaging_center` |
| `facility_count` | No | `3` |
| `state` | No | `FL` |

---

### provider_activated

**Definition:** Provider account is fully active — PSA signed, countersignature complete, portal accessible.
**Fires from:** `app/routes/api.docuseal-webhook-v4.tsx` or `api.cron.countersign.ts` — after `agreement_signed_at` is confirmed
**Destination:** Supabase `analytics_events` (primary) + GA4 (secondary)
**Mark as conversion:** Yes

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `onboarding` |
| `user_type` | Yes | `provider` |
| `facility_count` | Yes | `3` |
| `state` | Yes | `FL` |
| `city` | No | `Orlando` |

**Strategic use:** The ultimate provider acquisition metric. Powers the provider_activated count in investor reporting and supply side of the marketplace intelligence dashboard.

---

### provider_portal_accessed

**Definition:** Authenticated provider loads the provider portal dashboard.
**Fires from:** `app/routes/providers.portal.tsx` — layout loader on authenticated access
**Destination:** GA4
**Mark as conversion:** No
**NOTE:** This file already logs to `provider_activity_logs`. Mirror that pattern for the analytics call.

| Parameter | Required | Example |
|---|---|---|
| `app_surface` | Yes | `provider_portal` |
| `user_type` | Yes | `provider` |
| `facility_count` | No | `3` |

---

## Event Destinations Summary

| Event | GA4 | Supabase |
|---|---|---|
| visitor_landed | ✓ | — |
| hero_search_started | ✓ | — |
| hero_search_submitted | ✓ | — |
| trust_content_view | ✓ | — |
| hiw_page_view | ✓ | — |
| content_page_view | ✓ | — |
| provider_page_view | ✓ | — |
| provider_cta_clicked | ✓ | — |
| phone_click | ✓ | — |
| procedure_search | ✓ | — (pbs_search_analytics) |
| search_results_view | ✓ | — |
| pricing_view | ✓ | — |
| facility_view | ✓ | — |
| booking_started | ✓ | ✓ |
| email_verification_sent | ✓ | — |
| member_account_created | ✓ | ✓ |
| booking_submitted | ✓ | ✓ |
| member_portal_accessed | ✓ | — |
| scan_completed | ✓ | ✓ |
| provider_onboarding_started | ✓ | ✓ |
| org_setup_completed | ✓ | — |
| facility_profile_submitted | ✓ | — |
| pricing_configured | ✓ | — |
| psa_viewed | ✓ | — |
| psa_signed | ✓ | ✓ |
| provider_activated | ✓ | ✓ |
| provider_portal_accessed | ✓ | — |

---

## Changelog

| Version | Date | Change |
|---|---|---|
| 1.0 | March 2026 | Initial contract — 26 events across 2 funnels |
| 1.1 | March 2026 | Corrected provider_page_view and provider_cta_clicked file reference from imaging-centers.astro to provider.astro. Added content_page_view event for blog surfaces (blog.astro + blog/[slug].astro). Total: 27 events. |
| 1.2 | March 2026 | Added window.gtag scope implementation note to hero_search_submitted. hero_search_submitted confirmed firing in GA4 Realtime. |
| 1.3 | March 2026 | Updated procedure_search to GA4 only. pbs_search_analytics confirmed as canonical demand intelligence table. Both hero_search_submitted and procedure_search confirmed firing in GA4 Realtime in same cross-domain session. |

---

*USRad Analytics Event Contract · Version 1.0 · March 2026 · Confidential*