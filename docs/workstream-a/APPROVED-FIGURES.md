# APPROVED FIGURES — Workstream A

**U.S. Radiology of Florida, LLC**
**Source of authority:** Workstream A Scope of Work, August 3, 2026 — *Approved Provider Economics*
**Last amended:** August 6, 2026

---

## Why this file exists

Every figure below is **cleared for publication**. Anything not listed here is HOLD and must not appear in any public artifact.

This register exists because approved figures are the most easily lost item in any summary. A prohibition ("never say net margin") survives condensation because it reads as a permanent principle. An approved value ("$225–$400 per scan") reads as a transient detail and gets dropped — after which the figure looks unsourced, and the reflex is to delete copy that was already cleared.

**That is not hypothetical.** On August 6 a batch was scoped to remove `$37,500/month`, `15–25 scans/month`, and `$5K–$10K` from the provider surface as unsupported projections. Scope §5.1 had already specified corrections for all three, and 15–25 scans/month is an approved figure. The removal batch would have deleted approved, founder-signed economics.

---

## THE RULE

> **Before removing any figure, check this register.**
>
> If an approved value exists, the action is **conform to it** — not delete.
> Removal is correct only when nothing has been approved and no source exists.

---

## 1. PROVIDER ECONOMICS — approved August 3, 2026

| Figure | Approved value | Basis |
|---|---|---|
| Per-scan reimbursement to center | **$225–$400** | Plain MRI, global to the center, varies by market |
| USRad fee | **$75** | Flat, plain MRI |
| Published price to patient or employer | **$300–$475** | Center reimbursement plus fee |
| Additional volume | **15–25 scans/month** | Conservative floor. Deliberately underreported |
| Realistic monthly add to center | **$3,400–$10,000** | 15–25 scans at $225–$400 |

### Standing rules attached to this table

1. **"Per-scan reimbursement," never "net margin."** USRad cannot know a center's net margin. It knows what it pays.
2. **Plain MRI only.** No "average across modality mix" language in any artifact. Remaining modality fees are unapproved and belong to Workstream B.
3. **15–25 scans/month is the single volume basis.** No artifact may imply a different one. A figure implying ~100 scans/month violates this rule and must be corrected to the approved basis — not deleted.
4. **No figure outside this table may be published.** Anything not listed here remains HOLD.

### Required footnote wherever the per-scan range appears

> Per-scan reimbursement reflects contracted rates for plain MRI and varies by market. Each center sets its own rate, subject to USRad approval, and receives that rate on every assignment. Monthly figures assume 15–25 additional scans per month. Results vary.

### Approved prose — the incremental-volume argument

Ships alongside the tiles. This is what the barred `$375 net margin` figure was reaching for, restated so a center can verify it against its own numbers:

> **Why incremental volume matters.** When a scanner has open capacity, an additional completed scan adds revenue without a matching increase in equipment, occupancy, or administrative overhead. Each center can evaluate the contribution against its own read fees, staffing, and supply costs.

---

## 2. PAYMENT TERMS — approved

| Figure | Approved value | Notes |
|---|---|---|
| Payment timing | **10 business days from fulfillment** | *Business* is mandatory. PSA §4.3 |
| Fulfillment definition | The date the center completes the scan and uploads the final signed report | Must accompany the timing claim. Batch 4D-a |
| Cost to join | **$0** | |
| Volume commitment | **None** | `FoundingPartners.astro:327` |

Any artifact saying "10 days" without *business*, or omitting the fulfillment definition, is a regression against Batch 4D-a.

---

## 3. RATE-SETTING — confirmed accurate, no change required

**Scope §5.5.** Under market-based pricing where the center sets its own rate subject to USRad approval, the following copy is **accurate and must not be flagged as a defect**:

- `MarketScopeShowcase` strategy panel and market dataset
- `FoundingPartners.astro:211-215` — routing preference by competitive pricing
- `HowItWorks.astro:133` — "Set your pricing & schedule"
- `ConsultationCTA.astro:89` — "You Choose Your Rate"

Market-varying rates are the model, not a violation of it.

**Technical basis:** contracted facilities are priced at their own `effective_medicare_percentage` from `facility_rates`. Price is a genuine ranking input in `recommendationEngine.ts`. The hardcoded-100% behavior applies to **discovery** facilities only.

**"One rate per center per modality" means one rate across FUNDING LANES** — employer-plan and self-pay assignments hit the same contracted rate. It does not mean one rate across modalities, and it does not mean USRad sets the rate.

> This item has been mis-scoped twice. See TRACKER §5b.

---

## 4. ANCICARE HISTORICAL — RESOLVED August 6, 2026

**Resolved to Addendum B §1.9.** The Aug 5 tracker note retaining 168,000+ and $160M+ was drift, not a decision. · FOUNDER

| Fact | Approved value | Notes |
|---|---|---|
| Patients served | **150,000+** | ✅ **CONFORMED 2026-08-06** (Batch 4H-c1, `37eb600`) — 38 instances across 20 files. Replaces six notations: 168,000 · 168,000+ · 168,224 · 168,244 · 168K · 168K+ |
| Provider volume | **over $150 million** | Replaces $160M+ and $180M |
| Tenure | **AnciCare 1994–2002** | Replaces "30 Years" |
| Centers recruited | **1,200+** | Documented, stays precise. Unchanged |

### ⚠️ NOTATION RULE — standing rule 18

**150,000+ publishes in that notation only.** No `150K`, no `150K+`, no other abbreviation. The same applies to every approved figure: one notation sitewide.

This exists because the abbreviated forms are what the Batch 4H-c1 sweep initially missed — a pattern matching only comma-formatted variants cannot see `168K`. Six instances survived the first pass and were caught by the PDF render, not the grep. See standing rules 17 and 18 in `TRACKER.md` §7.

### Conformance status

| Fact | Status |
|---|---|
| **Patients served → 150,000+** | ✅ **CONFORMED** 2026-08-06, Batch 4H-c1 (`37eb600`). Verified by dual-pattern re-sweep, build exit 0, direct PDF generation, JSON-LD parse, and screenshots at 1440/390 |
| Provider volume → over $150 million | ⬜ **outstanding** — `$180M` / `$160M+` still live |
| Tenure → AnciCare 1994–2002 | ⬜ **outstanding** — "30 Years" still live |
| Centers recruited → 1,200+ | ✅ unchanged by design |

**Still to conform** — verified live at the time of the 4H-c1 commit; locate by content, line numbers drift:

| File | Figure |
|---|---|
| `src/components/provider/TrustBar.astro` | `$160M+` → **over $150 million** |
| `src/components/provider/ProvenSuccess.astro` | `$180M` → **over $150 million** |
| `src/components/provider/AnciCareStory.astro` | `$180M+`, `30 Years` |
| `src/pages/provider/portal-tour.astro` | `$160M+`, `30 Years` |
| `src/pages/provider/consultation.astro` | `$180M+` ×2 |
| `src/pages/providers/join.astro` | `$180M+` |
| `src/pages/about.astro`, `src/pages/contact.astro` | `30 Years` |

*Patient-count conformance covered `AnciCareLegacy`, `CredibilityBar`, and `FinalCTA` in full; those three carry no remaining C1 instance.*

### AnciCare client savings — $246 million. APPROVED.

**A DIFFERENT QUANTITY from provider volume above.** Dollars AnciCare saved its workers' compensation carrier clients against hospital-billed alternatives — opposite side of the transaction, different beneficiary. Both figures are simultaneously true.

> ⚠️ **NEVER conform $246M to $150M.** A grep over AnciCare dollar figures will read $246M as a stale variant of $180M/$160M. **It is not.** Provider volume is what USRad paid *out to centers*; client savings is what clients did *not pay* to hospitals.

**Basis:** the figure is an estimate, not a count — as is the patient figure. Present as a round number with a qualifier. Do not restate at higher precision.

**Verified locations — 14 live instances**, located by content against the working tree on August 6, 2026:

| File | Line(s) | Renders on | Text |
|---|---|---|---|
| `src/components/AboutSection.astro` | 14–15 | `/` | "helped deliver over $246 million in **patient savings**" |
| `src/components/SocialProofBar.astro` | 25, 27 | `/` | "$246 Million" / "**Patient savings** delivered" |
| `src/pages/about.astro` | 49 | `/about` | "A model that saved $246 million" |
| `src/pages/about.astro` | 156 | `/about` | `$246M` |
| `src/pages/about.astro` | 275 | `/about` | `$246M` |
| `src/pages/about.astro` | 713 | `/about` | "$246 Million" (h1) |
| `src/pages/about.astro` | 717 | `/about` | "$246 million in **verified** savings" |
| `src/pages/about.astro` | 946 | `/about` | `$246M` |
| `src/pages/about.astro` | 1152 | `/about` | `$246M+` — the only `+` variant |
| `src/pages/blog/the-scan-that-never-happens.astro` | 306 | blog post | "roughly $246 million in documented savings" |
| `src/pages/press-kit.html` | 221, 240, 258, 270 | `/press-kit` | "$246 million in documented savings" ×2, `$246M` ×2 |

Not claims, do not touch: `about.astro:693` and `:1387` are anchor ids (`case-study-246m`).

**⚠️ Two open questions this register cannot settle:**

1. **Beneficiary mismatch.** The approved framing is *client* savings — workers' compensation **carriers**. But `AboutSection.astro:15` and `SocialProofBar.astro:27` both label the figure "**patient** savings," and `about.astro:49` says "a model that saved." Under the C2 logic — different beneficiary means a different claim — these labels may misattribute who was saved. Needs a founder ruling before any conformance pass.
2. **`about.astro:717` calls it "verified savings."** The August 6 ruling removed "Verified results" from the provider volume figure because nothing establishes what verified means or who verified it. The same objection applies to this label on a different figure.

### Document-verified (Florida Trend, March 2000, p. 48)

Independent third-party corroboration, added to the register August 6:

| Fact | Value |
|---|---|
| AnciCare founding year | **1994** ✅ |
| 1999 revenue | **$13.16M** ✅ — corroborates the audited figure independently |
| Named clients | **CNA, Winn-Dixie** ✅ — third-party reported, first-person framing not required |
| Network size, March 2000 | **800 facilities, 145 in Florida, 40 states** ✅ |
| Co-founder | **Donna** ✅ |
| Market MRI cost, 2000 | ~$1,000 vs AnciCare's $450–500 to carrier ✅ |

**BARRED:** the **$18M** figure. This article identifies it as a *projection* for 2000, not a result. Also barred: $60M by 2002, same reason.

**Presentation rule:** the 800 (2000) and 1,200 (2013) waypoints must be stated together as a trajectory. Never leave a reader to reconcile them.

---

## 5. MARKET-SIZE FIGURES — published sources, use governed

Approved for accuracy. **Placement is restricted** — see rule below.

| Figure | Value | Source |
|---|---|---|
| Uninsured, all ages | **28.0 million** (8.3%) | CDC/NHIS, 2025 |
| Covered workers in self-funded plans | **67%** — 27% at firms of 10–199, 80% at larger firms | KFF EHBS, 2025 |
| Average single deductible | **$1,886** — $2,631 at firms of 10–199 | KFF EHBS, 2025 |
| HDHP enrollment, privately insured under 65 | **~42%** | CDC, 2023 |

**BARRED — derived headcounts.** "60 million underinsured," "100 million in high-deductible plans," and "74 million HDHP enrollees" are all arithmetic, not published figures. Cite the percentage or the dollar figure instead.

**Trap:** KFF's denominator is **covered workers**, not covered lives. That percentage must never be multiplied against a population. A benefits consultant will catch it.

**Placement rule:** these are market-context figures. They may not appear in the same visual unit as a call to action, or adjacent to any statement about what a center receives. Adjacency implies pipeline.

**Refresh triggers:** KFF EHBS republishes each fall · Commonwealth Fund biennial lands November 2026 · CDC's HDHP definition changes for the 2026 plan year, which will move that figure for definitional reasons alone.

---

## 6. BARRED FIGURES — do not publish

| Figure | Where it appears | Why |
|---|---|---|
| **$375 net margin per scan** | Provider brief, `ScannerUtilization`, `portal-tour` | USRad cannot know net margin. Correct to $225–$400 per-scan reimbursement |
| **$37,500/month** | `ScannerUtilization` | Implies ~100 scans/month. Violates standing rule 3. Correct to $3,400–$10,000 |
| **$5K–$10K monthly add** | Provider brief, `portal-tour` | Superseded by $3,400–$10,000 |
| **$180M / $160M+ provider volume** | Provider brief, `ProvenSuccess:17-29`, `TrustBar:77-80` | Both superseded by Addendum B §1.9 — approved value is **over $150 million**. See §4 |
| **$18M** AnciCare revenue | — | A projection, not a result. Florida Trend |
| **92%** satisfaction | removed | No instrument, no N |
| **73%** imaging increase | ROI PDF p4 | Deleted from site in 3B; survives in the PDF |
| **96%** patient show rate | `GuaranteeSection` | Unattributed. Verify or remove |
| **20–40%** volume increase | `FAQSection` | Undocumented; AnciCare's carrier/WC model does not transfer to prefunded assignments |
| **<5% no-show / 15–20% industry** | `faq.astro:1830` | No USRad operating data. Research puts MRI no-shows near 5%, not 15–20% |
| **80–120 / 40–60 scans/month** | `MarketScopeShowcase` | Implies a volume basis other than 15–25. Violates standing rule 3 |
| **5–7x → 7–9x, $5–7M → $7–9M** | `ExitValueSection` | Unsourced valuation projection about the reader's business |
| **711%** hospital markup | ROI PDF p3 | Unsourced |
| **85% / 50–70% / 40–60%** savings | ROI PDF | Four rates for one program. Must be qualified to the modeled comparison |
| **EBITDA multiples, valuation ranges, enterprise value projections** | `ExitValueSection` (removed) | BARRED on the provider surface. Founder acquisition experience may be stated qualitatively in first person. No arithmetic. |
| **"Verified results"** as a label on the provider volume figure | `ProvenSuccess.astro:24` | Nothing establishes what verified means or who verified it. The figure is founder-attested. Remove the label; the figure stays |
| **99.8%** satisfaction / resolution rate | `about.astro:1210`, `contact.astro:51`, `ContactHero.astro:176` | Same defect as the barred 92% — no instrument, no N. Live on /about and /contact |
| **1,236%** growth achieved | `about.astro:1148` | No basis, no period stated, no baseline |

---

## 7. UNVERIFIED — resolve before publishing

*No items currently unverified.*

### Resolved out of this section

| Item | Approved value | Basis |
|---|---|---|
| Phone number | **(866) USRad24** | Addendum B §2.8 and SCOPE §3.6. Resolved August 6, 2026 · FOUNDER. The tracker's "(888) — unverified" note is stale |

---

## 8. VOCABULARY — RESOLVED August 6, 2026

**D5 retained.** · FOUNDER + ADVISOR

- **Identity: pre-funded.** Per Addendum B §1.6/§1.7 — section headers and footers only.
- **Lanes: cash-pay and employer-funded.** Retained per D5.
- **"Cash-pay" refers to a commercial LANE, not the payment conduit.** USRad is the exclusive payment conduit for all assignments regardless of funding source. Basis: PSA Article IV / Exhibit A — Provider looks solely to USRad for payment.
- **Providers already use "cash-pay" as a payor-mix category.** External language follows provider vocabulary; internal and legal language defines mechanics.

> The earlier proposal to bar "cash-pay" sitewide was **overruled** on August 6. Market vocabulary follows provider categories; legal architecture defines payment mechanics. The two need not match. See `DECISIONS.md` and the language principle in `README.md`.

---

## 9. THE EDITORIAL STANDARD

Every public statement must trace to one of four things:

1. Documented operating history
2. Implemented platform capability
3. Executed legal agreement
4. **Approved founder policy** ← *this register*

If a statement cannot be traced to one of those four, it does not ship.

Item 4 is the one this file exists to make findable. A figure with founder approval is as publishable as one with a citation — and deleting it is as much an error as inventing one.

---

*Governing document: Workstream A Scope of Work, August 3, 2026. Companion: Workstream A Batch Tracker · DECISIONS.md.*
