# APPROVED FIGURES — Workstream A

**U.S. Radiology of Florida, LLC**
**Source of authority:** Workstream A Scope of Work, August 3, 2026 — *Approved Provider Economics*
**Last amended:** August 7, 2026

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

## THE HISTORICAL EVIDENCE STANDARD — adopted August 7, 2026

**The test every historical figure in this register must pass.**

> Historical quantitative claims publish only when supported by a
> contemporaneous source or a clearly defensible primary record.
> Founder recollection may support qualitative history. It does not,
> by itself, authorise newly derived quantitative claims.

Recollection is admissible for *what happened*. It is not admissible as an input to arithmetic that produces a new published number.

**This standard would have prevented every figure removed in this workstream:** 400,000 cases · 168,000 / 168,224 / 168,244 · $246M · $95M · $151M · 3.2M work days · and the proposed ~40,000/year. Each was arithmetic on recollection.

Note the interaction with THE RULE above. The rule says *conform, do not delete, when an approved value exists*. This standard governs whether a value may be approved at all. A figure that fails the evidence standard has no approved value to conform to — removal is then the correct action, not a violation of the rule. §6 records which figures are in that state.

*Recorded August 7, 2026 · FOUNDER + ADVISOR. Also in `README.md` alongside THE RULE and THE LANGUAGE PRINCIPLE.*

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

## 4. ANCICARE HISTORICAL — RESOLVED August 6, 2026 · AMENDED August 7, 2026

**Resolved to Addendum B §1.9.** The Aug 5 tracker note retaining 168,000+ and $160M+ was drift, not a decision. · FOUNDER

**Amended August 7:** the $246 million client-savings figure is **reversed and barred** pending a primary source; standing rule 18 now names a canonical and a compact form per figure; and tenure is recorded as two distinct claims. · FOUNDER + ADVISOR

| Fact | Approved value | Notes |
|---|---|---|
| Patients served | **150,000+** | ✅ **CONFORMED 2026-08-06** (Batch 4H-c1, `37eb600`) — 38 instances across 20 files. Replaces six notations: 168,000 · 168,000+ · 168,224 · 168,244 · 168K · 168K+ |
| Provider volume | **over $150 million** | Replaces $160M+ and $180M |
| Tenure | **AnciCare 1994–2002** | Replaces "30 Years" |
| Centers recruited | **1,200+** | Documented, stays precise. Unchanged |

### ⚠️ NOTATION RULE — amended standing rule 18

Each approved figure has **one canonical prose form** and **one approved compact display form**. Both are named explicitly below. **No third form.**

| Fact | Canonical prose form | Approved compact form |
|---|---|---|
| Patients served | **more than 150,000 patients** | **150,000+** |
| Provider volume | **over $150 million** | **$150M+** |
| Tenure — company window | **AnciCare, 1994–2002** | **1994–2002** |
| Centers recruited | **more than 1,200 imaging centers** | **1,200+** |

**Compact is permitted in:** stat tiles, charts, badges, and similarly constrained UI.
**Narrative prose uses canonical.**

Still barred at any width: `150K`, `150K+`, `168K`, `$180M`, `$160M+`, or any form not in the table above.

**Why this was amended (2026-08-07).** The August 6 formulation demanded one literal notation everywhere, which made natural prose — "more than 150,000 patients" — a technical violation of the rule written to protect that very figure. Controlled typography is not inconsistency. The abbreviation ban survives intact: what rule 18 bars is an *unapproved* form, not a *second approved* one.

The original hazard stands. Abbreviated forms are what the Batch 4H-c1 sweep initially missed — a pattern matching only comma-formatted variants cannot see `168K`. Six instances survived the first pass and were caught by the PDF render, not the grep. See standing rules 17 and 18 in `TRACKER.md` §7.

### Conformance status

| Fact | Status |
|---|---|
| **Patients served → 150,000+** | ✅ **CONFORMED** 2026-08-06, Batch 4H-c1 (`37eb600`). Verified by dual-pattern re-sweep, build exit 0, direct PDF generation, JSON-LD parse, and screenshots at 1440/390. Cluster C1 closed |
| **Provider volume → over $150 million** | ✅ **CONFORMED** 2026-08-06, Batch 4H-c2 (`e1a6119`) — 16 changes across 12 files. Five notations eliminated: `$180M` · `$180M+` · `$180+ Million` · `$160M` · `$160M+`. "Verified results" label removed from `ProvenSuccess.astro`; ROI PDF phone corrected to (866). Verified by re-sweep, build exit 0, direct PDF generation, and screenshots. **Cluster C2a closed** |
| Tenure → AnciCare 1994–2002 | ⬜ **outstanding** — and it is **two claims, not one**. See the split immediately below |
| Centers recruited → 1,200+ | ✅ unchanged by design |

#### ⚠️ Tenure is TWO claims — do not conform by grep

*Recorded 2026-08-07 · FOUNDER + ADVISOR.*

**(a) COMPANY OPERATING WINDOW.** "30 Years" in stat tiles and headings standing beside AnciCare figures. **Conforms to AnciCare 1994–2002** per Addendum B §1.9. "30 Years of AnciCare Success" incorrectly expands an eight-year company history.

**(b) FOUNDER CAREER SPAN.** First-person or signed statements. **Evaluated separately — not automatically conformed.** AnciCare ran eight years; the founder's career is longer. "I've spent more than thirty years building systems" is biographical, and is a different claim.

> **TEST: first person or signed attribution → do not conform.**
> Do not force these into one figure because a grep matched the same words.

Known **(b)** instances: `AnciCareStory.astro:306` (signed pull-quote), `co-founder-d.astro:401`, `blog/the-scan-that-never-happens.astro:339`.

Four notation variants are in play, and a pattern matching only `30 Years` sees 9 of 16 live instances: `30 Years` · `30+ years` · `three decades` · `thirty years`. Locate by content; line numbers drift.

*Patient-count conformance covered `AnciCareLegacy`, `CredibilityBar`, and `FinalCTA` in full; those three carry no remaining C1 instance.*

### AnciCare client savings — $246 million. ⚠️ REVERSED.

> **$246 million — REVERSED 2026-08-07, BARRED pending a primary source. See §6.**

The August 6 approval of this figure as *client savings* is **void**, and so is the do-not-conform warning attached to it. That warning existed to stop $246M being conformed to $150M. There is no longer a figure to protect.

**Basis for the reversal.** The founder located the source analysis. $246M is not a documented result — it is arithmetic built on **400,000 cases**, a figure this register already ruled AN ERROR on 2026-08-06. The source computes $226M medical and $359M indemnity savings, each as 400,000 × an assumed per-case value, for $585M total. The site's $246M and its $95M / $151M decomposition are scaled variants of the same calculation. **The multiplicand is void, so every figure derived from it is void.**

The indemnity half additionally rests on an estimated $170 average daily wage, an 8-day saving derived from two attested ranges, and an assumption that every claimant was out of work. It cannot be rebuilt at any case count.

That $246M appeared in prior marketing material establishes that the company **used** the claim, not that the claim was **substantiated**.

**REMOVE sitewide.** Do not reword. Do not label "estimated." Do not rescale to 150,000. **Conditional:** reversible by a later dated entry in `DECISIONS.md` if a contemporaneous primary source supporting the calculation is located.

Open item **#22** — /about and the homepage need section rewrites, not find-and-replace. Two-pass batch.

#### Removal worklist — 14 live instances, re-verified by content 2026-08-07

Retained as an execution aid for #22, not as an approval. Line numbers drift; locate by content.

| File | Line(s) | Renders on | Text |
|---|---|---|---|
| `src/components/AboutSection.astro` | 14–15 | `/` | "helped deliver over $246 million in patient savings" — **wraps across lines; a grep for `$246 million` misses it** |
| `src/components/SocialProofBar.astro` | 25, 27 | `/` | "$246 Million" / "Patient savings delivered" |
| `src/pages/about.astro` | 49 | `/about` | "A model that saved $246 million" |
| `src/pages/about.astro` | 156 | `/about` | `$246M` |
| `src/pages/about.astro` | 275 | `/about` | `$246M` |
| `src/pages/about.astro` | 713 | `/about` | "$246 Million" (h1) |
| `src/pages/about.astro` | 717 | `/about` | "$246 million in verified savings" |
| `src/pages/about.astro` | 946 | `/about` | `$246M` — the "Combined total" tile; see the barred decomposition at `:927` and `:949` |
| `src/pages/about.astro` | 1152 | `/about` | `$246M+` — the only `+` variant |
| `src/pages/blog/the-scan-that-never-happens.astro` | 306 | blog post | "roughly $246 million in documented savings" |
| `src/pages/press-kit.html` | 221, 240, 258, 270 | `/press-kit` | "$246 million in documented savings" ×2, `$246M` ×2 |

Not claims, do not touch: `about.astro:693` and `:1387` are anchor ids (`case-study-246m`). Removing the section they anchor is a separate decision belonging to #22.

**Superseded by this reversal:** open items #13 ("patient savings" beneficiary framing) and #14 ("verified savings" wording), plus `about.astro:49`. Both questions attach to a figure now being removed. Reframing is moot.

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

### Added August 7, 2026 — the 400,000-case derivation family

All five share one void multiplicand. See the HISTORICAL EVIDENCE STANDARD at the top of this file and `DECISIONS.md`, 2026-08-07.

| Figure | Where it appears | Why |
|---|---|---|
| **$246 million** client savings | `about.astro` ×7, `press-kit.html` ×4, `SocialProofBar:25`, `AboutSection:14`, `blog/the-scan-that-never-happens:306` | Arithmetic on 400,000 cases, already ruled an error. **Reverses the 2026-08-06 approval.** Conditional — reversible if a contemporaneous primary source is located |
| **$95M medical / $151M productivity / 3.2M work days** | `about.astro:927`, `:946-949` | Same base. Also changes what "savings" means — productivity recovered is not hospital-billing avoidance |
| **$585M total / $544M productivity** | source analysis only | Same base. Recorded so they are not reintroduced |
| **400,000 cases** as a multiplicand | any derivation | Ruled an error 2026-08-06. Anything computed from it is void |
| **~40,000 MRIs/year** | not published | Considered and declined. $20M ÷ $500, both recollection. Disclosing the arithmetic does not improve the evidence |

### What replaces $246M — better-sourced, none case-count dependent

Recorded 2026-08-07 · FOUNDER + ADVISOR. These get **stronger** as the questionable figures come out.

- **(a) PRICING SPREAD.** Florida Trend (March 2000, p. 48) documents a market MRI near $1,000 against AnciCare's $450–500 to the carrier. A **rate**, not a total — no case-count dependency.
- **(b) NAMED CLIENTS.** CNA and Winn-Dixie, same source, third-party reported.
- **(c) TRAJECTORY.** 800 facilities / 40 states (March 2000) and 1,200 at the CorVel sale (2013). Both document-verified; **state together**, per the presentation rule in §4.

The indemnity story may be told as **narrative without a figure**: faster imaging shortens the claim. "Two weeks down to two or three days" is qualitative history and is permitted under the evidence standard.

The proof is: founded 1994 · reached 1,200+ centers · major national payors used it · MRI economics far below prevailing rates · acquired by CorVel.

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
