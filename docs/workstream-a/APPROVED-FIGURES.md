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

## 4. ANCICARE HISTORICAL — RESOLVED Aug 6 · AMENDED Aug 7 · **RESTRUCTURED Aug 7 on documentary evidence**

**Resolved to Addendum B §1.9.** The Aug 5 tracker note retaining 168,000+ and $160M+ was drift, not a decision. · FOUNDER

**Amended August 7:** the $246 million client-savings figure is **reversed and barred** pending a primary source; standing rule 18 now names a canonical and a compact form per figure; and tenure is recorded as two distinct claims. · FOUNDER + ADVISOR

**Restructured August 7** on a corpus of 36 contemporaneous documents. Two figures previously approved on founder attestation are **retired**; one is **substantiated and strengthened**; several new figures are **document-verified**. See §4a, §4b, §4c below.

### 📁 SOURCE LOCATION

The 36 source documents are **held outside this repository** at `~/Documents/ancicare/business_proofs`. They contain federal tax filings and shareholder schedules and are **never committed**. `docs/ancicare_proof/` is permanently gitignored as a guard against recreation inside the repo. Every figure below cites its source by **filename, date and page**; verify against the documents at that path.

---

### §4a. APPROVED — DOCUMENT-VERIFIED

Evidence class: **CP** = contemporaneous primary (created 1994–2002 in the ordinary course) · **CT** = contemporaneous third-party (auditor, press, IRS-filed, publisher).

| Figure | Canonical prose form | Compact form | Source document · date · page | Class |
|---|---|---|---|---|
| **Paid to imaging centers** ✅ **CONFORMED** | **more than $60 million paid to imaging centers from 1994 through 2001** | **$60M+ paid to imaging centers** | Nine Forms 1120S, EIN 65-0475972, tax years 1994–2001; 1998 & 1999 corroborated by E&Y audited statements, 3 May 2000 | **CT** |
| **Contracted facilities** | **1,228 contracted imaging facilities in 43 states, April 2002** | **1,200+ centers** | `Management Meeting March 2002` — p.3 narrative, p.13 table (stamped 4/16/02), p.50 pie | **CP** |
| **Founding** | **founded 3 January 1994** | **1994** | Founder letter 23 Sep 1994; item D on all nine tax returns | **CP / CT** |
| **1999 revenue** | **$13,159,059 in 1999 service revenue** | **$13.2M (1999)** | E&Y Financial Statements 1999, Statements p.3; Form 1120S 1999 line 1c; `Corp Overview 9-2000` p.16 | **CT** |
| **Per-scan economics** | **$418–460 billed per procedure, $336–353 paid to the center** | **~$420–460 / ~$336–353** | `Corp Overview 9-2000` p.16, "Average Per Procedure" | **CP** |
| **Annual procedures 2000** | **33,855 procedures in 2000** | **33,855 procedures** | `Management Meeting March 2002` p.7, "Procedures (Net)", 12 months | **CP** |
| **Annual procedures 2001** | **38,452 procedures in 2001** | **38,452 procedures** | `Management Meeting March 2002` p.7, "Procedures (Net)", 12 months | **CP** |
| **Savings vs WC fee schedule** | **50% or more below the Florida workers' compensation fee schedule** | **50%+ savings** | Four contemporaneous sources: founder letter 23 Sep 1994 (*"saving 50% or more"*); Genesis Publishing Nov 1994 (*"well over 50% of the state of Florida workers' compensation fee schedule for all MRI"*); `florida-trend-2000-03-p48.jpg` ($450–500 vs ~$1,000); CIM Feb 2000 (*"up to 70% discounts"*). ⚠️ **Use the 50%+ floor in public copy** — the 70% upper bound comes from a confidential document | **CP / CT** |
| **Scheduling speed** | **90% of referrals scheduled within two to three days** | **90% in 2–3 days** | *South Florida Business Journal*, 5 Feb 1999 | **CT** |
| **Inc. 500** | **ranked #210 on the 1999 Inc. 500** | **Inc. 500 #210** | *Inc.* letter 6 Oct 1999 + certificate | **CT** |
| **Named clients** | **Winn-Dixie, CNA, Liberty Mutual, Zurich American, USF&G, Crawford & Company, Gallagher & Bassett, USPS** and ~30 others | — | Founder letter Table A (Aug 1994); Genesis article Nov 1994; `Corp Overview 9-2000` top-11 client slide | **CP / CT** |
| **Acquisition** | **acquired by CorVel, May 2002** | **acquired by CorVel** | ✅ **`greenberg-traurig-closing-letter-2002-07-31.pdf`** — Arthur L. Gallagher to Michael and Donna Cabrera, 31 Jul 2002, transmitting executed closing documents for the *"Asset Purchase Agreement among CorVel Corporation, Corvel Healthcare Corporation, AnciCare PPO, Inc. and Michael and Donna Cabrera, dated as of May 16, 2002"* | **CP** |
| **Co-founder** | **co-founded by Michael and Donna Cabrera** | — | Founder letter 23 Sep 1994, *"my wife and I"*; `florida-trend-2000-03-p48.jpg` | **CP / CT** |
| **Network waypoints** | **608 centers / 33 states (Feb 1999) · 783 (Feb 2000) · 800 / 145 in Florida / 40 states (Mar 2000) · 818 / 38 states (Sept 2000) · 1,228 / 43 states (Apr 2002)** | — | SFBJ 5 Feb 1999; CIM Feb 2000; `florida-trend-2000-03-p48.jpg`; `Corp Overview 9-2000`; `Management Meeting March 2002` | **CP / CT** |
| **Network trajectory pair** | **800 facilities, 145 in Florida, across 40 states (March 2000), reaching 1,228 contracted facilities in 43 states by April 2002** | — | `florida-trend-2000-03-p48.jpg`; `Management Meeting March 2002` pp.3/13/50 | **CT / CP** |
| **Pricing spread** | **$450–500 to the insurance company against a typical $1,000 MRI with interpretation** | **$450–500 vs ~$1,000** | `florida-trend-2000-03-p48.jpg`. AnciCare's own take from that fee was about $100 | **CT** |
| **Startup capital** | **started on about $75,000 from family and friends** | **~$75,000 startup capital** | `florida-trend-2000-03-p48.jpg` | **CT** |

**Compact is permitted in** stat tiles, charts, badges and similarly constrained UI. **Narrative prose uses canonical.** No third form — standing rule 18.

#### ⚠️ A THIRD EVIDENCE CLASS — FA, founder-attested current knowledge

*Added 2026-08-07 · FOUNDER + ADVISOR.*

Classes **CP** and **CT** both describe the 1994–2002 record. This one does not:

| Figure | Canonical prose form | Compact form | Basis | Class |
|---|---|---|---|---|
| **Model still in use post-exit** | **CorVel has continued to use the model since acquiring it in May 2002** | **20+ years post-exit** | Founder attestation as to present-day third-party operations. The corpus documents the **sale** (Greenberg Traurig closing letter, 31 Jul 2002); **it says nothing whatever about what the buyer did afterward** | **FA** |

**FA is not a weaker CP — it is a different kind of claim.** CP and CT are verifiable against documents held at `~/Documents/ancicare/business_proofs`. FA is not verifiable there at all, and no amount of corpus work will make it so.

> **ATTRIBUTION REQUIREMENT.** Copy using an FA figure must be attributable or otherwise clearly attested. **It may never be presented as independently documented fact**, and it may not sit inside a run of CP/CT figures in a way that borrows their evidentiary standing.

Six live instances: `AnciCareLegacy:75`, `:87`, `:147` · `CredibilityBar:33` · `schedule:202` · `implementation-guide:322`.

This class also resolves a gap in the tenure split: claims measuring time **elapsed since the 2002 exit** are neither company operating window (a) nor founder career span (b). Do not force them into the two-way test.

#### The eight-year payments series, in full

| Tax year | Cost of goods sold | | Tax year | Cost of goods sold |
|---|---|---|---|---|
| 1994 | $716,689 | | 1998 | $8,838,533 |
| 1995 | $3,300,768 | | 1999 | $10,375,038 |
| 1996 | $5,519,378 | | 2000 | $11,717,897 |
| 1997 | $7,747,148 | | 2001 | $12,264,132 |
| | | | **TOTAL** | **$60,479,583** |

The 1996 return's Statement 2 names this line in the taxpayer's own words: **`MEDICAL CENTER COSTS`**.

#### ✅ CONFORMED SITEWIDE — 2026-08-07, Batch 4H-c3 (`99ba3d5`)

**14 instances across 11 files** — one more than open item #25 predicted. Split as ruled under standing rule 18:

| Form | Count | Where |
|---|---|---|
| **Canonical prose** | **2** | `providers/join.astro:64` (tooltip) · `provider/consultation.astro:194` (callout) |
| **Compact** | **10** | `TrustBar:80` · `ProvenSuccess:22` · `AnciCareStory:153` · `portal-tour:1069` · `consultation:267` · `join:68` · `join:411` · `verified:685` · `QuickStats:29` · `SuccessMetrics:5` |
| **Config mirror pair** | **2** | `src/scripts/…/facilities.config.js:60` · `public/scripts/…/facilities.config.js:60` — key renamed `REVENUE_DELIVERED` → `PAID_TO_CENTERS`, zero consumers |

**The label changed with the figure.** Seven distinct label strings were replaced: "Value delivered" · "Delivered to Providers" · "Delivered in imaging volume" · "Revenue Delivered" · "Delivered through AnciCare" · "Delivered to imaging centers through AnciCare" · "in Volume". **"Volume" is the retired abstraction and appears nowhere in the replacement copy.**

Verified by re-sweep (zero live `$150` instances across `src/` and `public/`), `npm run build` exit 0, both config mirrors byte-identical (`md5 5d33b0d7…`), and full-page screenshots at 1440px and 390px on all five affected routes.

**Say "paid to imaging centers," not "provider volume."** The former is what the filings show and reads plainly.

> ### ⚠️ TWO DIFFERENT $60 MILLION FIGURES EXIST — do not conflate them
>
> **APPROVED (this row):** *$60M+ **paid to imaging centers*** — the sum of cost of goods sold across eight filed Forms 1120S, $60,479,583. An **expense** line, labelled `MEDICAL CENTER COSTS` by the taxpayer.
>
> **BARRED (§6):** *"$60 million by 2002"* — a **revenue projection** made in March 2000 (*Florida Trend* p.48: "By 2002, he expects a whopping $60 million"), from the same paragraph as the barred $18M. Peak documented gross receipts were **$16,001,938 (2001)**. The company never approached $60M in revenue.
>
> These sit on **opposite sides of the income statement** and differ by nearly a factor of four in what they measure. Copy using the approved figure must say **"paid to imaging centers."** Never "$60 million in revenue." Never "a $60 million business."

**This cumulative total is permitted under the HISTORICAL EVIDENCE STANDARD** — complete unbroken series, one metric, one source class, no interpolation. It is the only cumulative figure in this register that qualifies.

⚠️ **Do not add the 2002 YTD figure** of $2,659,545.60. Different source class (management income statement, not a filing) and three months only. **The eight-year tax series stands alone.**

#### ⚠️ Not everything in the Florida Trend article is approved

The article is now in the corpus and its contents are document-verified **as reportage** — but two items in it are projections or attributed opinion, not results, and are **barred**:

| In the article | Status |
|---|---|
| *"By 2002, he expects a whopping $60 million"* | ⛔ **BARRED** — revenue projection. See §6 and the callout above |
| *"$18 million"* for 2000 | ⛔ **BARRED** — projection. See §6 |
| *"Cabrera says that AnciCare was profitable from the first year, and his current profit margins are in the 5% to 6% range"* | ⚠️ **ATTRIBUTED QUOTE, NOT A VERIFIED FACT.** The audited record shows a **1998 operating loss of $19,703** (E&Y). The quote is not contradicted *as stated* — it concerns the first year and is attributed to the founder — but it may not be cited as a document-verified profitability claim, and **"profitable every year" would be false.** If used at all, use it as an attributed 2000 quote |

#### ⚠️ State counts — always publish the count with its date

**40 states** (Florida Trend, March 2000) · **38 states** (Corp Overview, September 2000) · **43 states** (Management packet, April 2002). These do not contradict each other — facilities terminate and states drop out. **Never pick one and present it as "the" figure.**

#### ⚠️ "Contracted facilities" ≠ "participating centers"

The documents draw this distinction and copy must not blur it. **Contracted facilities** = under contract (1,228, April 2002). **Participating centers** = those that actually received referrals in the period (664, October 1999). Not interchangeable.

#### ⚠️ Confidentiality of the sources

`Corp Overview 9-2000`, the CIM, the Pinnacle valuation and the partner tables are all marked **CONFIDENTIAL** or **STRICTLY CONFIDENTIAL**. **CNA is confirmed only by a confidential document.** Public confirmation for named clients comes from the Genesis Publishing (Nov 1994) and *South Florida Business Journal* (Feb 1999) articles, in which the founder named clients on the record.

---

### §4b. RETIRED — evidence contradicts, or cannot support

| Retired figure | Why | Replacement |
|---|---|---|
| **"over $150 million provider volume"** | Contradicted by a complete eight-year Form 1120S series totalling **$60,479,583**, with 1998 and 1999 tied to the dollar to E&Y audited statements. The gap is not a documentation gap — the filings are complete for 1994–2001 | ✅ **REPLACED and CONFORMED 2026-08-07, Batch 4H-c3 (`99ba3d5`)** — 14 instances across 11 files, by "more than $60 million paid to imaging centers from 1994 through 2001." Open item #25 **CLOSED**. See §4a |
| **"150,000+ patients"** | **No document in the corpus counts people.** See §4c | ❌ **NOT REPLACED IN KIND.** Do not substitute a procedure count into the same slot |

Both figures were conformed sitewide on 2026-08-06 — Batch 4H-c1 (38 instances) and Batch 4H-c2 (16 changes). **Both batches were correct against the register as it then stood; the evidence changed underneath them.** Reversal is tracked as open items **#24** and **#25**.

Still barred at any width, unchanged: `150K`, `150K+`, `168K`, `168,000`, `$180M`, `$160M+`, `$150M+`.

---

### §4c. THE PATIENT-COUNT LIMIT

> **No procedure, referral, order or file count may be presented as a patient count. Ever.**

This is **not a gap in the records — it is a property of them.** Every count across all 36 documents is a count of **events**: referrals, procedures, orders, files, studies. There is no patient identifier, no de-duplication statement, and no studies-per-patient ratio anywhere in the corpus. A person who had an MRI and a follow-up CT appears **twice** in every table in the folder, and nothing on any page permits collapsing that.

E&Y's revenue-recognition note confirms the accounting spine is per-service: *"Service revenue is recognized on the date the medical imaging service is performed."*

Complete 1994–2002 coverage of these same reports **would still not yield a patient count.** The records were never kept that way.

**When a component currently shows a patient stat, decide what it is actually proving:**

| What the component proves | Use |
|---|---|
| Network scale | **1,228 contracted facilities** |
| Throughput | **a documented annual procedure count — and call it procedures** |
| Neither | **remove the stat** |

**Never convert procedures, referrals, orders or files into patients.**

#### ⚠️ NO RELABELING IS PERMITTED — added 2026-08-07 · FOUNDER + ADVISOR

> **The 150,000 number has no basis in ANY unit. Changing its label does not rescue it.**

The Batch 4H-e survey found the figure wearing **eleven unit labels** across its 38 live instances:

**patients · people · claimants · workers · imaging cases · cases managed · imaging services · patient visits · MRIs performed · imaging procedures · appointments** — plus one bare headline noun phrase.

Four are people-units and are barred outright by the limit above. **The other seven do not survive either.** The documented event counts in the corpus are 15,623 · 23,031 · 26,307 · 30,760 (1996–99 "Volume"), 33,855 (2000) and 38,452 (2001) — and this register rules that those three metrics cannot be summed.

Those six years sum to **168,028** — the retired 168,000 / 168,224 / 168,244 family almost exactly. If that is the origin, then `150,000+` was a rounded-down restatement of an impermissible cumulative sum, and Batch 4H-c1 conformed a number that never had a permitted total behind it.

**RULING: each of the 38 instances receives an approved substitute matching what its component actually proves, or is removed.** Relabeling the unit is not an available disposition.

#### ⚠️ The signed-quote carve-out does NOT apply to quantitative figures

`ProvenSuccess.astro:37` is a signed, first-person quote containing "150,000+ patients."

The tenure test — *first person or signed attribution → do not conform* — governs the **duration cluster only**, because the founder's career genuinely exceeds AnciCare's eight years. **There is no equivalent for a retired quantitative figure.** A signed quote saying 150,000+ patients is the same barred people-count as an unsigned tile. Attribution changes who is saying it, not whether the corpus counts people.

#### Annual activity — approved counts, and why they cannot be summed

| Year | Metric, as the source names it | Value |
|---|---|---|
| 1996–1999 | **"Volume"** (modality counts; cancellation treatment unstated) | 15,623 · 23,031 · 26,307 · 30,760 |
| 2000 | **"Procedures (Net)"** (net of cancellations, includes EMG/NCV) | **33,855** |
| 2001 | **"Procedures (Net)"** | **38,452** |
| 2002 Jan–Mar | **"Procedures (Net)"** — **PARTIAL, do not annualize** | 8,396 |
| 1999 Q1–Q3 | **"Referrals"** | 23,494 |
| 2001 Q1–Q3 | **"Referrals"** | 27,931 |
| 1994, 1995 | **no activity count of any kind** | — |

**Three different metrics are in play and they disagree where periods overlap** — Q1–Q3 2001 shows 27,931 referrals against 29,603 Net Procedures for the same nine months. **No lifetime activity total is constructible.** Use a single year, name its metric, and never add across rows.

---

### Conformance status — superseded 2026-08-07

| Fact | Status |
|---|---|
| ~~Patients served → 150,000+~~ | ⛔ **RETIRED** 2026-08-07 — see §4b. The 4H-c1 conformance (`37eb600`, 38 instances) must be undone. Open item **#24** |
| ~~Provider volume → over $150 million~~ | ⛔ **REPLACED** 2026-08-07 by "$60M+ paid to imaging centers" — see §4a/§4b. The 4H-c2 conformance (`e1a6119`, 16 changes) must be redone. Open item **#25** |
| **Contracted facilities → 1,228 / 1,200+** | ✅ **SUBSTANTIATED** 2026-08-07, three ways in one contemporaneous document. Sitewide `1,200+` copy stands and is now documented |
| Tenure → AnciCare 1994–2002 | ⬜ **outstanding** — and it is **two claims, not one**. See the split immediately below |

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
| **$246 million** client savings | `about.astro` ×7, `press-kit.html` ×4, `SocialProofBar:25`, `AboutSection:14`, `blog/the-scan-that-never-happens:306` | Arithmetic on 400,000 cases, already ruled an error. **Reverses the 2026-08-06 approval.** Conditional — reversible if a contemporaneous primary source is located. **⚠️ INDEPENDENTLY CONFIRMED 2026-08-07: no cumulative savings figure exists anywhere in the 36-document source corpus.** AnciCare reported savings per client, per month, to adjusters; eight years of tax filings, audited statements, banker memoranda, board packs and press coverage never roll them up. The claim has no counterpart in the operating record |
| **$95M medical / $151M productivity / 3.2M work days** | `about.astro:927`, `:946-949` | Same base. Also changes what "savings" means — productivity recovered is not hospital-billing avoidance |
| **$585M total / $544M productivity** | source analysis only | Same base. Recorded so they are not reintroduced |
| **400,000 cases** as a multiplicand | any derivation | Ruled an error 2026-08-06. Anything computed from it is void |
| **~40,000 MRIs/year** | not published | Considered and declined. $20M ÷ $500, both recollection. Disclosing the arithmetic does not improve the evidence |

### Added August 7, 2026 — projections from the Florida Trend article

| Figure | Where it appears | Why |
|---|---|---|
| **"$60 million by 2002"** as revenue | Florida Trend, March 2000, p.48 — *"By 2002, he expects a whopping $60 million."* | A projection, never achieved. Peak documented gross receipts $16,001,938 (2001). ⚠️ **DO NOT CONFUSE with the approved "$60M+ paid to imaging centers"** — that is cost of goods sold across eight filed returns, an **expense** line, not revenue. See §4a |
| **$18M** AnciCare revenue | Florida Trend, same paragraph; 1999 PPM `est` column | Already barred. A projection, not a result. Reaffirmed Aug 7: never reached in any filed year |

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
