# USRad Analytics Implementation Plan

**Document:** `docs/analytics/analytics-implementation-plan.md`
**Version:** 1.0
**Status:** Execution checklist — check off tasks as completed
**Applies to:** Astro repo (usrad.com) + Remix repo (app.usrad.com)
**Date:** March 2026

---

## Overview

This document is the developer-facing execution checklist for the USRad unified analytics architecture. It is organized into four phases sequenced by dependency — Phase 1 must be complete before any funnel analysis is valid.

Each task specifies the exact file, the event or configuration being added, and the destination system.

---

## Phase 1 — Foundation
**Timeline:** Week 1–2
**Owner:** Platform Engineering
**Dependency:** Must be 100% complete before Phase 2 begins. Cross-domain tracking is a prerequisite for all funnel analysis.

---

### 1.1 Create GA4 Property

- [ ] Go to `analytics.google.com` → Admin → Create Property
- [ ] Property name: `USRad Platform`
- [ ] Select Web, enter `usrad.com` as primary domain
- [ ] Retrieve Measurement ID (format: `G-XXXXXXXXXX`)
- [ ] Store Measurement ID in both repos as environment variable: `PUBLIC_GA4_MEASUREMENT_ID`

---

### 1.2 Install GA4 Base Script — Astro Repo

**File:** `src/layouts/CarbonLayout.astro`
**Where:** Inside `<head>`, after existing meta/favicon tags

```astro
<!-- Google Analytics 4 -->
<script async src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.PUBLIC_GA4_MEASUREMENT_ID}`}></script>
<script define:vars={{ measurementId: import.meta.env.PUBLIC_GA4_MEASUREMENT_ID }}>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', measurementId, {
    anonymize_ip: true,
    send_page_view: true,
    linker: {
      domains: ['usrad.com', 'app.usrad.com']
    }
  });
</script>
```

- [ ] Script added to `CarbonLayout.astro`
- [ ] `PUBLIC_GA4_MEASUREMENT_ID` environment variable set in Astro repo
- [ ] Verified: opening usrad.com shows session in GA4 Realtime report

---

### 1.3 Install GA4 Base Script — Remix Repo

**File:** `app/root.tsx`
**Where:** Inside the `<head>` element of the root layout

```tsx
{/* Google Analytics 4 */}
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.PUBLIC_GA4_MEASUREMENT_ID}`}
/>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.PUBLIC_GA4_MEASUREMENT_ID}', {
        anonymize_ip: true,
        send_page_view: true,
        linker: {
          domains: ['usrad.com', 'app.usrad.com']
        }
      });
    `,
  }}
/>
```

- [ ] Script added to `app/root.tsx`
- [ ] `PUBLIC_GA4_MEASUREMENT_ID` environment variable set in Remix repo
- [ ] Verified: opening app.usrad.com shows session in GA4 Realtime report

---

### 1.4 Enable Cross-Domain Tracking in GA4

**Critical:** Without this, every patient who searches on usrad.com and books on app.usrad.com appears as two disconnected users. Funnel analysis is invalid until this is done.

- [ ] GA4 Admin → Data Streams → Select web stream → Configure tag settings
- [ ] Click "Configure your domains"
- [ ] Add `usrad.com` as a domain
- [ ] Add `app.usrad.com` as a domain
- [ ] Verify: navigate from usrad.com hero search to pbs.search on app.usrad.com — confirm single continuous session in GA4 Realtime

---

### 1.5 Filter Internal Traffic

- [ ] GA4 Admin → Data Streams → Configure tag settings → Define internal traffic
- [ ] Add USRad office IP address(es)
- [ ] Add developer home IP address(es) if needed
- [ ] GA4 Admin → Data Filters → Create Filter → "Internal Traffic" → set to active

---

### 1.6 Connect Google Search Console

- [ ] GA4 Admin → Product Links → Search Console Links → Link
- [ ] Verify usrad.com is already verified in Google Search Console
- [ ] Complete link — unlocks Queries report in GA4 showing exact search terms

---

### 1.7 Create Analytics Helper — Astro Repo

**File to create:** `src/utils/analytics.ts`

```typescript
/**
 * USRad Marketing Analytics Helper
 * All Astro components use this helper — never write raw gtag() calls in components.
 * See /docs/analytics/analytics-event-contract.md for all event definitions.
 */

type MarketingEventParams = Record<string, string | number | boolean>;

export function trackMarketingEvent(
  eventName: string,
  params: MarketingEventParams = {}
): void {
  if (typeof window === 'undefined') return;
  if (typeof (window as any).gtag === 'undefined') return;

  (window as any).gtag('event', eventName, {
    app_surface: 'marketing',
    ...params,
  });
}
```

- [ ] File created at `src/utils/analytics.ts`

---

### 1.8 Create Analytics Helpers — Remix Repo

**File to create:** `app/utils/analytics.client.ts`

```typescript
/**
 * USRad Product Analytics Helper — Client Side
 * Use for client-side behavioral events in Remix components.
 * See /docs/analytics/analytics-event-contract.md for all event definitions.
 */

type ProductEventParams = Record<string, string | number | boolean>;

export function trackProductEvent(
  eventName: string,
  params: ProductEventParams = {}
): void {
  if (typeof window === 'undefined') return;
  if (typeof (window as any).gtag === 'undefined') return;

  (window as any).gtag('event', eventName, {
    app_surface: params.app_surface ?? 'pbs_booking',
    ...params,
  });
}
```

**File to create:** `app/utils/analytics.server.ts`

```typescript
/**
 * USRad Business Event Helper — Server Side
 * Use for server-confirmed business milestones.
 * Writes to Supabase analytics_events table — never blocks business logic.
 * See /docs/analytics/analytics-event-contract.md for all event definitions.
 */

import { createSupabaseServerClient } from '~/utils/supabase.server';

type BusinessEventPayload = {
  user_type?: string;
  app_surface?: string;
  user_id?: string;
  provider_id?: string;
  booking_id?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  procedure_type?: string;
  facility_id?: string;
  metadata?: Record<string, unknown>;
};

export async function recordBusinessEvent(
  request: Request,
  eventName: string,
  payload: BusinessEventPayload = {}
): Promise<void> {
  try {
    const supabase = createSupabaseServerClient(request);
    await supabase.from('analytics_events').insert({
      event_name: eventName,
      event_source: 'remix_server',
      ...payload,
    });
  } catch {
    // Never block business logic — swallow silently
    // Analytics failure is LOW RISK per engineering contract
  }
}
```

- [ ] `app/utils/analytics.client.ts` created
- [ ] `app/utils/analytics.server.ts` created

---

### 1.9 Create Supabase analytics_events Table

Run in Supabase SQL editor:

```sql
create table analytics_events (
  id              uuid primary key default gen_random_uuid(),
  event_name      text not null,
  event_source    text not null,

  user_type       text,
  app_surface     text,
  session_id      text,
  user_id         uuid references auth.users(id),
  provider_id     uuid references corporate_entities(id),
  booking_id      uuid references appointment_requests(id),

  city            text,
  state           text,
  zip_code        text,
  procedure_type  text,
  facility_id     uuid,

  metadata        jsonb default '{}'::jsonb,
  created_at      timestamptz not null default now()
);

create index on analytics_events (event_name, created_at desc);
create index on analytics_events (city, procedure_type, created_at desc);
create index on analytics_events (user_type, event_name);

comment on table analytics_events is
  'Internal analytics event log. Permanent business-truth record.
   GA4 captures browser behavior. This table captures confirmed milestones.
   See /docs/analytics/analytics-event-contract.md';
```

- [ ] Table created in Supabase
- [ ] Indexes created
- [ ] Verified: insert test row and query returns correctly

---

### 1.10 Commit Governance Documents

- [ ] `docs/analytics/analytics-architecture.md` committed to Astro repo
- [ ] `docs/analytics/analytics-event-contract.md` committed to Astro repo
- [ ] `docs/analytics/analytics-implementation-plan.md` committed to Astro repo
- [ ] Same three documents committed to Remix repo at same path

---

## Phase 2 — Core Patient Funnel
**Timeline:** Week 2–3
**Dependency:** Phase 1 complete, cross-domain tracking verified

---

### 2.1 hero_search_submitted — Astro

**File:** `src/components/hero/SearchStep2.astro`
**CRITICAL:** This file is protected per the engineering report. Add analytics call only. Never touch form action, hidden fields, or search-manager.ts.
**Add:** Call `trackMarketingEvent` immediately before the form's submit event propagates.

```javascript
// Inside SearchStep2.astro <script> tag
// Add before existing form submit handler — do not replace it
import { trackMarketingEvent } from '../../utils/analytics';

document.querySelector('#search-form')?.addEventListener('submit', (e) => {
  trackMarketingEvent('hero_search_submitted', {
    procedure_type: window.searchManager?.getSelectedProcedure?.() ?? '',
    zip_code: window.searchManager?.getZipCode?.() ?? '',
  });
  // Let the existing submit handler proceed — do not call e.preventDefault()
});
```

- [ ] Event fires on search form submission
- [ ] Verified in GA4 Realtime → Events

---

### 2.2 procedure_search — Remix

**File:** `app/routes/pbs.search.tsx`
**Where:** Loader Phase 8 — expand existing `trackSearch({...}).catch(() => {})` stub
**Pattern:** Must remain fire-and-forget. Add new fields to existing call.

```typescript
// Expand existing trackSearch call in loader Phase 8:
trackSearch({
  procedure_type: procedureDisplayName,
  cpt_code: finalCpt,
  zip_code: zipCode,
  city: resolvedCity,
  state: stateParam,
  result_count: mergedResults.length,
  usrad_count: contractedProviders.length,
  acr_count: filteredDiscovery.length,
  radius_miles: radius,
}).catch(() => {});

// Also call recordBusinessEvent for Supabase:
recordBusinessEvent(request, 'procedure_search', {
  app_surface: 'pbs_search',
  procedure_type: procedureDisplayName,
  zip_code: zipCode,
  city: resolvedCity,
  state: stateParam,
  metadata: { cpt_code: finalCpt, result_count: mergedResults.length },
}).catch(() => {});
```

- [ ] Event fires on every search submission
- [ ] Verified in GA4 Realtime → Events
- [ ] Verified in Supabase analytics_events table

---

### 2.3 booking_started — Remix

**File:** `app/routes/pbs.search.tsx`
**Where:** `handleBookNow` function, after `create-session` POST succeeds and `sessionId` is returned

```typescript
// After: const { sessionId } = await response.json();
trackProductEvent('booking_started', {
  app_surface: 'pbs_booking',
  procedure_type: provider.procedure ?? '',
  facility_id: provider.real_facility_id ?? '',
  city: resolvedCity,
  provider_type: provider.provider_type,
});

// Also write to Supabase:
await recordBusinessEvent(request, 'booking_started', {
  app_surface: 'pbs_booking',
  procedure_type: provider.procedure,
  facility_id: provider.real_facility_id,
  city: resolvedCity,
}).catch(() => {});
```

- [ ] Event fires when Book Now creates a session successfully
- [ ] Verified in GA4 Realtime

---

### 2.4 booking_submitted — Remix

**File:** `app/routes/api.pbs.confirm-booking.ts`
**Where:** After `createBooking()` returns successfully, before redirect
**CRITICAL:** This is the authoritative booking path. Both GA4 and Supabase.

```typescript
// After: const newBooking = await createBooking(...);
// Before: redirect to /pbs/my-bookings

// GA4 (client-side via response header or separate mechanism)
// Server-side Supabase write:
await recordBusinessEvent(request, 'booking_submitted', {
  app_surface: 'pbs_booking',
  user_type: 'member',
  booking_id: newBooking.id,
  procedure_type: sessionData.procedure,
  facility_id: sessionData.real_facility_id,
  city: resolvedCity,
  metadata: { provider_type: sessionData.providerType },
}).catch(() => {});
```

- [ ] Event fires on every confirmed booking
- [ ] Verified in Supabase analytics_events
- [ ] Mark as conversion in GA4 → Admin → Events

---

### 2.5 Build GA4 Patient Funnel Exploration

- [ ] GA4 → Explore → Blank → Select Funnel Exploration
- [ ] Add steps: visitor_landed → hero_search_submitted → procedure_search → booking_started → booking_submitted
- [ ] Save as "Patient Acquisition Funnel"
- [ ] Review drop-off at each step

---

## Phase 3 — Trust Layer + Provider Funnel
**Timeline:** Week 3–4
**Dependency:** Phase 2 complete

---

### 3.1 trust_content_view — Astro

**File:** `src/components/home/AboutSection.astro`
**Add:** IntersectionObserver on three sections

```javascript
import { trackMarketingEvent } from '../../utils/analytics';

const sections = [
  { el: document.querySelector('#founders-photo'), section: 'founder_photo' },
  { el: document.querySelector('#case-study-246m'), section: 'case_study_246m' },
  { el: document.querySelector('#timeline'), section: 'timeline' },
  { el: document.querySelector('#founder-promise'), section: 'founder_promise' },
];

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const section = sections.find(s => s.el === entry.target);
      if (section) {
        trackMarketingEvent('trust_content_view', { section: section.section });
        observer.unobserve(entry.target); // Fire once per section
      }
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => { if (s.el) observer.observe(s.el); });
```

- [ ] IntersectionObserver fires for each trust section
- [ ] Events verified in GA4 Realtime

---

### 3.2 content_page_view — Astro Blog

**Files:**
- `src/pages/blog.astro` — main blog index
- `src/pages/blog/[slug].astro` — all 11 individual article pages

**Architecture note:** Blog posts are statically generated from `src/data/blogPosts.js` as the central data source. The `slug`, `category`, and `readTime` fields are available at build time and passed to the analytics call via `define:vars`.

**For the main blog index (`src/pages/blog.astro`):**

```astro
<script>
  trackMarketingEvent('content_page_view', {
    content_type: 'blog_index',
  });
</script>
```

**For each individual blog post (`src/pages/blog/[slug].astro`):**

```astro
---
// slug, category, readTime already available from blogPosts.js import
---
<script define:vars={{ contentSlug: slug, contentCategory: category, contentReadTime: readTime }}>
  window.addEventListener('DOMContentLoaded', () => {
    trackMarketingEvent('content_page_view', {
      content_type: 'blog_article',
      content_slug: contentSlug,
      category: contentCategory,
      read_time: contentReadTime,
    });
  });
</script>
```

**Current blog slugs to instrument** (from `src/data/blogPosts.js`):
`cost-saving-tips`, `first-mri-preparation-guide`, `future-ai-medical-imaging`, `health-tips`, `managing-mri-anxiety`, `mri-basics`, `preventive-care-checklist`, `price-transparency-healthcare`, `real-cost-of-mri`, `understanding-mri-results`, `uninsured-imaging-guide`

- [ ] `content_page_view` fires on `src/pages/blog.astro` load
- [ ] `content_page_view` fires on all 11 individual blog post pages
- [ ] `content_slug` and `category` params verified in GA4 Realtime

---

### 3.3 provider_onboarding_started — Remix

**File:** `app/routes/onboarding._index.tsx`
**Where:** Loader, on first authenticated access (check `onboarding_steps` to determine if first visit)

- [ ] Event fires on first onboarding dashboard load
- [ ] Verified in GA4 Realtime

---

### 3.4 psa_viewed and psa_signed — Remix

**File (psa_viewed):** `app/routes/onboarding.psa-signing.tsx` — loader when DocuSeal iframe renders
**File (psa_signed):** `app/routes/api.docuseal-webhook-v4.tsx` — after `agreements` INSERT and `agreement_signed_at` set

- [ ] `psa_viewed` fires when DocuSeal iframe loads
- [ ] `psa_signed` fires from webhook after agreements record created
- [ ] Both verified in GA4 Realtime
- [ ] `psa_signed` verified in Supabase analytics_events
- [ ] Mark `psa_signed` as conversion in GA4

---

### 3.5 provider_activated — Remix

**File:** `app/routes/api.docuseal-webhook-v4.tsx` or `api.cron.countersign.ts`
**Where:** After `agreement_signed_at` is confirmed and provider account is fully active

- [ ] Event fires after full provider activation
- [ ] Verified in Supabase analytics_events

---

## Phase 4 — Reporting Layer
**Timeline:** Month 2
**Dependency:** Phases 1–3 complete, at least 2 weeks of data collected

---

### 4.1 Looker Studio — Marketing Performance Dashboard

- [ ] Go to `lookerstudio.google.com` → Create → Report
- [ ] Connect GA4 data source (select USRad Platform property)
- [ ] Build tiles: sessions by channel, hero search rate, trust content views, provider page → CTA rate
- [ ] Share with business partner (view-only link — no GA4 access required)

---

### 4.2 Looker Studio — Patient Funnel Dashboard

- [ ] Add funnel visualization: visitor_landed → hero_search_submitted → procedure_search → booking_started → booking_submitted
- [ ] Add conversion rate tiles for each step
- [ ] Add geographic breakdown: top 10 cities by procedure_search count

---

### 4.3 Supabase Marketplace Intelligence Dashboard

Run these queries weekly:

```sql
-- Procedure demand by market (network expansion signal)
select city, procedure_type, count(*) as searches
from analytics_events
where event_name = 'procedure_search'
  and created_at > now() - interval '30 days'
group by city, procedure_type
order by searches desc
limit 20;

-- Markets with demand but no USRad contracted providers
select ae.city, ae.procedure_type, count(*) as searches,
       count(uf.id) as usrad_providers
from analytics_events ae
left join user_facilities_v2 uf
  on lower(uf.city) = lower(ae.city)
  and uf.status = 'active'
  and uf.pbs_visible = true
where ae.event_name = 'procedure_search'
  and ae.created_at > now() - interval '30 days'
group by ae.city, ae.procedure_type
having count(uf.id) = 0
order by searches desc;

-- Patient funnel conversion rates
select
  count(*) filter (where event_name = 'procedure_search')    as searches,
  count(*) filter (where event_name = 'booking_started')     as booking_starts,
  count(*) filter (where event_name = 'booking_submitted')   as bookings,
  round(100.0 * count(*) filter (where event_name = 'booking_started')
    / nullif(count(*) filter (where event_name = 'procedure_search'), 0), 1) as search_to_start_pct,
  round(100.0 * count(*) filter (where event_name = 'booking_submitted')
    / nullif(count(*) filter (where event_name = 'booking_started'), 0), 1) as start_to_book_pct
from analytics_events
where created_at > now() - interval '30 days';

-- Provider funnel conversion rates
select event_name, count(*) as count
from analytics_events
where event_name in (
  'provider_onboarding_started', 'facility_profile_submitted',
  'psa_viewed', 'psa_signed', 'provider_activated'
)
  and created_at > now() - interval '30 days'
group by event_name
order by count desc;
```

- [ ] Queries saved in Supabase as named queries
- [ ] Reviewed weekly as part of Monday review ritual

---

### 4.4 Establish Weekly Review Ritual

**Every Monday — 15 minutes:**

- [ ] GA4 → Reports → Realtime or Overview — traffic vs prior week
- [ ] GA4 → Reports → Engagement → Events — conversion events this week
- [ ] GA4 → Explore → Patient Acquisition Funnel — where are patients dropping off?
- [ ] Supabase demand query — any new markets showing up?
- [ ] One-sentence note: what does this week's data tell us to fix or prioritize?

---

## Implementation Checklist Summary

### Phase 1 — Foundation
- [ ] 1.1 GA4 property created, Measurement ID retrieved
- [ ] 1.2 GA4 base script in Astro CarbonLayout.astro
- [ ] 1.3 GA4 base script in Remix app/root.tsx
- [ ] 1.4 Cross-domain tracking enabled and verified
- [ ] 1.5 Internal traffic filtered
- [ ] 1.6 Search Console connected
- [ ] 1.7 trackMarketingEvent helper created — Astro
- [ ] 1.8 trackProductEvent + recordBusinessEvent helpers created — Remix
- [ ] 1.9 analytics_events table created in Supabase
- [ ] 1.10 Three governance docs committed to both repos

### Phase 2 — Core Patient Funnel
- [ ] 2.1 hero_search_submitted — SearchStep2.astro
- [ ] 2.2 procedure_search — pbs.search.tsx loader
- [ ] 2.3 booking_started — handleBookNow
- [ ] 2.4 booking_submitted — api.pbs.confirm-booking.ts
- [ ] 2.5 GA4 Patient Funnel Exploration built

### Phase 3 — Trust Layer + Provider Funnel
- [ ] 3.1 trust_content_view — AboutSection.astro IntersectionObserver
- [ ] 3.2 content_page_view — blog.astro + all 11 blog/[slug].astro pages
- [ ] 3.3 provider_onboarding_started — onboarding._index.tsx
- [ ] 3.4 psa_viewed + psa_signed — psa-signing route + docuseal webhook
- [ ] 3.5 provider_activated — docuseal webhook or countersign cron

### Phase 4 — Reporting
- [ ] 4.1 Looker Studio marketing performance dashboard
- [ ] 4.2 Looker Studio patient funnel dashboard
- [ ] 4.3 Supabase marketplace intelligence queries saved
- [ ] 4.4 Weekly review ritual established

---

*USRad Analytics Implementation Plan · Version 1.0 · March 2026 · Confidential*