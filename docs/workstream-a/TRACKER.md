# Workstream A — Batch Tracker

REF: https://claude.ai/chat/a6ccdfd4-8a07-4ae8-b2b2-d0de7c23d80b

**Rewritten August 6, 2026. Supersedes the August 5 version, which was current at commit 21.**

Branch: `workstream-a-marketing` · Current HEAD: `1f2d9b5` · Rollback for whole workstream: `b86e06e`
Origin: `1f2d9b5` — pushed 2026-08-10, fast-forward `32bf4fd..1f2d9b5`. **Branch and origin were level at DOC-17; Batch B/C is uncommitted at the time of writing.** `main` at `be2dd14`, unchanged since July 30.

---

## 1. COMMIT LOG — authoritative

| # | Batch | Content | SHA |
|---|---|---|---|
| — | Setup | Branch creation | `b86e06e` |
| 1 | Batch 1 | False statements | `b34ae2b` |
| 2 | Batch 1H-a | HIPAA phase 2 (CC mislabeled "Batch 2") | `479fb8a` |
| 3 | Batch 1H-b | Sitewide HIPAA/SOC 2 badges | `8635ecb` |
| 4 | Batch 1H-b addendum | Footer wrapper + fac-modern cleanup (items A, B) | `116fd1e` |
| 5 | Batch 1H-c | ReferralWorkflow + FAQ + component/page sync + card heading | `4ea6482` |
| 6 | Batch 1H-d (B–E) | SOC 2 / HIPAA / ERISA on public pages | `33b7ac7` |
| 7 | Batch 1H-d item A | privacy.astro compliance cards | `0092a82` |
| 8 | Archive move 1 | usrad-presentation.html + launcher card removal | `a6bf4a1` |
| 9 | Batch 1H-e | ROI PDF ERISA/SOC 2 + FAQ penetration testing | `ef00c65` |
| 10 | Batch 1H-f | ROI PDF licensure + TPA integration rows | `399fe3d` |
| 11 | Batch 1H-g | IntegrationPartners section deleted from /employer | `7c98578` |
| 12 | Archive move 2 | impact, carbonstyle, launcher pages archived | `f110467` |
| 13 | Batch 1H-h | TPA / benefits-platform integration claims | `9670e9d` |
| 14 | Batch 1H-i | Bolt-on FAQ question, referral workflows card, 50-state claim | `5534a2d` |
| 15 | Archive move 3 | AboutVision + PriorityMarketsMap + 7 subcomponents | `f3fa696` |
| 16 | Batch 1H-j | Prefunding stated, connectAudiences TPA claim, dangling import | `bc73afa` |
| 17 | Batch 3A | WC reframed across employer surface (8 files) | `1033054` |
| 18 | Batch 3A addendum | Duplicate AnciCare attribution, composite source data | `552ac4d` |
| 19 | Batch 3B | DualSolution → AnciCare attribution, unsourced figures removed | `ae9e5c0` |
| 20 | Batch 3C-calc | Scan inputs merged across calculator, API, and PDF | `09f5dba` |
| — | Column rename | `wc_scans` → `total_scans`, all three Supabase projects | no commit — see §6 |
| 21 | Batch 3C-calc addendum | Calculator subtitle, insert repointed to `total_scans` | `a886ae7` |
| 22 | Batch 4A | Provider surface survey (read-only) | **no commit** — read-only by design |
| 23 | Batch 4B | *(no commit found in `ec80d3f..21bd949`)* | **none found** |
| 24 | Batch 4C | Patient-as-payer → fully funded assignment framing per PSA | `6ee8c21` |
| 25–28 | Batch 4D groups B/C/D | Five PSA accreditation bodies, FAQ payer answer sync, unsourced show-rate claims | `9efb4b3` |
| 29 | Batch 4D-a | Fulfillment trigger on payment promises; unsourced show-rate claims; five-accreditation alignment | `37db11d` |
| 30 | Batch 4D-b | Fulfillment trigger on all payment promises in portal tour | `3ce188b` |
| 31 | Batch 4D-c | Fulfillment trigger on remaining payment promises; service-completion trigger matched to PSA | `9beac26` |
| 32 | Archive move 4 | Test.astro | `21bd949` |
| 33 | **Batch 4G** | **Provider hero rewrite** | **`ab04ab1`** |
| 34 | DOC-1 | Aug 6 decisions recorded; workstream-a folder committed | `b4ea85c` |
| 35 | DOC-2 | 400,000+ ruled an error; CLAIMS-INVENTORY surfaced as worklist | `ee7c102` |
| 36 | DOC-3 | C2 row resolved; $246M client savings approved as a distinct figure | `6c1d543` |
| 37 | DOC-4 + Archive move 5 | $246M beneficiary confirmed; `FoundersSection.astro` archived | `18ca190` |
| 38 | **Batch 4H-c1** | **AnciCare patient count conformed to 150,000+ — 38 instances, 20 files, six notations** | **`37eb600`** |
| 39 | DOC-5 | Cluster C1 closed; standing rules 17–18 added | `7207218` |
| 40 | **Batch 4H-c2** | **Provider volume conformed to over $150 million — 16 changes, 12 files, five notations. "Verified results" label removed; ROI PDF phone → (866). Cluster C2a** | **`e1a6119`** |
| 41 | **Batch 4H-d** | **Every `tel:` href on the marketing surface normalised to `tel:1-866-877-2324` — 17 changes, 12 files** | **`8a577a1`** |
| 42 | DOC-6 | Historical evidence standard adopted; $246M approval reversed and barred; rule 18 amended; tenure split | `3f42843` |
| 43 | **DOC-7** | **AnciCare source corpus establishes the record — 1,228 facilities substantiated; "over $150 million" and "150,000+ patients" retired; corpus moved out of the repo and gitignored; rules 20–21** | **`de20004`** |
| 44 | **Batch 4H-c3** | **Provider volume figure replaced with documented payments to imaging centers — 14 instances, 11 files. Label changed with the figure; config key renamed. Closes #25** | **`99ba3d5`** |
| 45 | DOC-8 | #25 closed; fourth consecutive undercount recorded; duration-claim finding opens #27 | `ff68433` |
| 46 | DOC-8 addendum | Re-sweep rule numbered as standing rule 22; cross-reference corrected | `e31744d` |
| 47 | **DOC-9** | **Positional references barred in `DECISIONS.md`; both append-only checks required (rule 23)** | **`3ea6619`** |
| — | Push | Branch pushed to origin, fast-forward `e31744d..3ea6619` | no commit |
| 48 | **Batch 4H-f** | **`/search-results` and `ProviderSearchSection` archived — both live 400,000+ instances, `Math.random()` distances, and the ten-year partnership claim retired with the route. Four of five inbound links repointed to the Remix search** | **`5432aeb`** |
| 49 | DOC-10 | 4H-e survey recorded; #22/#24/#27 merged into a page-by-page rewrite; #28–#31, #33 opened; #32 opened and closed | `1e61066` |
| 50 | **DOC-11** | **Pricing Policy V1.0 ingested as governing pricing authority. Three approved pricing figures superseded; three never-approved live figures barred; standing rules 24–25 added; §4 and §5 settled; V1.0 §7 assigned to EDS on a functional boundary; #34–#38 opened** | **`623df8a`** |
| 51 | **DOC-12** | **August 8 session record. Three employer-funnel positioning decisions; guide revision specification issued to the PDF agent; two read-only surveys recorded (Astro employer funnel, Remix email); `/employer` figure collisions inventoried; client email route resolved as EDS-owned** | **`2ad3c0c`** |
| 52 | **DOC-13** | **Housekeeping. Employer Implementation Guide approved for production; live-object replacement recorded as an EDS deployment action; rule 25 confirmed still unsatisfied; open-table numbers 20, 21 and 23 recorded as never assigned** | **`8afcf20`** |
| 53 | **DOC-14** | **Employer Implementation Guide deployed to production by EDS and verified byte-for-byte at the existing public URL; guide component of the EDS handoff closed; rule 25 confirmed not cleared by the deployment; artifact hash recorded as provenance** | **`2defd8b`** |
| 54 | **DOC-15** | **Stage 3 employer decisions D1–D13 ruled as one set; Federal Reserve care-avoidance figure entered in `APPROVED-FIGURES` §5; Stage 3 batch sequence approved with batch E as a merge gate; #8, #18, #24, #27, #28, #29, #30 and #37 closed as DECIDED with implementation pending; #42 opened** | **`6ed4468`** |
| 55 | **Batch A** | **`EmployerCaseExample` and `IndustryData` removed entire (D10, D11). Fourteen figures left with the first — two more than the decision document inventoried — including the last live §6-barred 73% and a standing rule 2 blended-modality violation. `IndustryData`'s trailing CTA went with it, resolving the §5 placement breach at source. Consumer sweep clean; build exit 0** | **`3a1220f`** |
| 56 | **Batch D** | **Problem-statement rebuild. `EmployerHero` and `CostAnalysis` rewritten to approved copy (D5, D7, D8). Hero loses the 67%, the $260/$3,200 pairing, and the 48-hour and zero-setup commitments; `CostAnalysis` loses the two-column scenario entire — $600, $3,200, 5.3×, $45,000+, $1,200, 97%, 18+ days, 6-month and the cash-pay disclaimer — replaced by four cited prose beats. #43 opened** | **`0d396e2`** |
| 57 | **DOC-16** | **Batch B/C rulings B1–B7. B/C rescoped: three of six components do not survive intact. `ROIStatPanel` and `CredibilityBar` removed entire; `ExecutiveFAQ` Q3 removed; `FinalCTA` tile grid, signature and H2 replaced. **Standing rule 26** added — present-tense capability claims require a current operational basis. Accreditation wording deferred; #44 opened** | **`32bf4fd`** |
| 58 | **DOC-17** | **B/C scope extension. Verified Provider Standard recorded as DRAFT, not adopted — removal authority only, never publication authority. `ExecutiveFAQ` Q2 removed entire (five of five bullets barred); Q1's two capability claims added to scope; three `DualSolution` copy rulings incl. the load-bearing framing line. Six accordions become **four**. #45, #46, #47 opened** | **`1f2d9b5`** |
| 59 | **Batch B/C** | **Conformance apply. `ROIStatPanel` and `CredibilityBar` deleted (B1, B4); `employer.astro` down to nine components, order unchanged. `Implementation` H2/subhead/three phase heads/closing pair replaced — eleven process bullets untouched, **not twelve as the brief predicted**. `DualSolution` subhead, Card 1 head/body/results box, Card 2 body and two bullets replaced; two bullets removed; framing line added above the list. `FinalCTA` tile grid and founder signature removed entire. `ExecutiveFAQ` Q2 and Q3 removed entire, Q1 down to one bullet, Q5 loses "Legal review included" — **four accordions**. ⚠️ **Shipped-HTML defect found and fixed:** Astro emits HTML comments to the delivered page, so stale `Week 1/2-3/4` and `Proven in Workers' Compensation` labels were live in `/employer` view-source after their visible copy was replaced; comments and the orphaned `#proven-solution` id relabelled** | **TBD** |

> **Action:** commits 22–31 were never logged. Fill from `git log --oneline ec80d3f..21bd949` and confirm labels against commit messages before this document is filed. `ec80d3f` is the last pre-4C reference point recorded in session notes.

* ADDED TO THIS REPORT
21bd949 (origin/workstream-a-marketing) chore: archive unreferenced Test.astro  
9beac26 marketing: add fulfillment trigger to remaining payment promises, correct service-completion trigger to match PSA (Batch 4D-c)  
3ce188b marketing: add fulfillment trigger to all payment promises in portal tour (Batch 4D-b)  
37db11d marketing: add fulfillment trigger to headline payment promises, remove unsourced show-rate claims, align verification language with five accreditation bodies (Batc  
h 4D-a)  
9efb4b3 marketing: expand accreditation to all five PSA bodies, sync FAQ payer answer, remove unsourced show-rate claims (Batch 4D groups B, C, D)  
6ee8c21 marketing: replace patient-as-payer funding language with fully funded assignment framing per PSA (Batch 4C)  
lines 1-6/6 (END)

**Not run:** Batch 3D · Batch 2 (positioning) · Batch 4F · Batch 5A/5B · Batch 6. *(Batch 4I withdrawn — see `DECISIONS.md` 2026-08-06.)*

**Batch 4H — partially run.** 4H-c1 (`37eb600`), 4H-c2 (`e1a6119`), and 4H-d (`8a577a1`) are committed. 4H-b stopped at survey and is **superseded by the cluster batches**: the vocabulary work it was scoped to do was overtaken by C1 and C2a, which re-swept the same surface by content rather than from its incomplete five-target list. 4H-a (read-only survey) and the remaining 4H-c claim removals in §8e are still open.

---

## 2. WHAT IS CLOSED

**HIPAA / BAA.** No executed Business Associate Agreement exists. Every assertion of HIPAA compliance, business-associate status, or an in-place BAA removed from provider copy, employer copy, the FAQ (component and standalone page), the privacy policy, and the onboarding page.

**SOC 2.** No report exists. Zero public-facing survivors.

**ERISA.** Belongs to the plan sponsor, not USRad. `grep -rni "erisa" src/` returns zero.

**TPA / platform integration.** No integrations exist. The four named partners return zero hits repo-wide. "Seamless integration," "already integrated," "we integrate," and "plugs into" all return zero.

**50-state availability.** Zero survivors outside a patient anxiety-management exercise in a blog post.

**Workers' comp as a current offering — website.** Reframed across eight files. WC now appears only as AnciCare history (attributed, dated 1994–2002) or as market data. The ROI calculator, API, and PDF no longer split by population.

> **Amended Aug 6.** A WC *rate benchmark* shown as reference data for a center's own rate-setting is not an offering claim and is retained in MarketScope. It requires a label stating USRad does not currently route workers' compensation. See §8e.

**Unsourced member figures.** The 73% / 92% "Member Impact" strip is gone. `grep -rn "Member Impact" src/` returns zero.

**Illustrative coefficients.** The 0.75 / 0.16 / 0.09 savings waterfall — whose "Faster Return-to-Work (WC)" row applied a WC label to blended savings — is replaced by two lines that trace to entered inputs.

**Provider hero volume promise.** "Fill Empty Slots" removed in 4G. Replaced with channel access, which claims what USRad supplies rather than an outcome on a center's calendar.

Commits 1–15 removed or corrected. Commit 16 was the first to add a claim.

---

## 3. WHAT IS NOW STATED — the affirmative work

**Prefunding, stated for the first time.** `ExecutiveFAQ.astro`, added in Batch 1H-j:

> **"When do we pay USRad?"** • Funded before scheduling — your funds are in place before any member is routed to an imaging center • No claims, no invoicing cycle — imaging centers are paid by USRad on a fixed schedule, not by your plan · Prefunded model: USRad routes only funded assignments — there is no accounts receivable between your plan and the imaging center

That last line is what makes the provider page's "no claim filing" defensible from the employer side. It closes the variant (A) / variant (B) gap the original audit opened.

Confirmed before writing it: prefunding is the model; invoicing with deferred settlement is not offered and will not be entertained.

The employer surface had ZERO payment-timing statements before this — verified by an explicit sweep in Batch 1H-i for "no upfront cost," "pay as you go," "invoice," "billed," "net 30," "deposit," "escrow," and a dozen more. Nothing was retracted to make room.

**"Bolt-on" as the structural frame.** `ExecutiveFAQ`'s TPA question became "Does this bolt on to our existing plan?" — the question a benefits director actually asks, answered directly by the surviving bullets. Note the distinction that governs where each term goes: *bolt-on* answers "does this disturb what we have?" (structural); *prefunded* answers "when does money move?" (timing). Conflating them reopens the funding gap.

**DualSolution reframed, not deleted.** The WC card names AnciCare, dates the work 1994–2002, and labels its figures "AnciCare results:". The 50–70% and 18+ day numbers are unchanged — attribution was the fix, not deletion. "One Partner. Two Populations. Total Control." is retained: one population served historically, one served today.

**Fulfillment as the payment trigger.** 4D-a. Payment promises now read "10 business days of fulfillment — the date you complete the scan and upload the final signed report." Any future copy or artifact that says "10 days" without *business*, or omits the fulfillment definition, is a regression.

**Both funding lanes named on the provider surface.** 4G. Employer plan assignments (primary) and self-pay patient assignments (secondary), both prefunded, USRad as payor in each. Stated with the single contracted rate across lanes.

**The referrer-introduction mechanism.** 4G. An assignment can route a patient from a physician not currently referring to that center. Stated as mechanism only — no conversion rate, no implied share of referrers retained.

---

## 4. DECISIONS MADE

**Accreditation is a participation requirement, not a USRad attribute.** Per the Verified Provider Standard §1.3, USRad verifies accreditation; it does not confer it. §5.2 recognizes four bodies — ACR, IAC, The Joint Commission, RadSite — so naming ACR alone was also wrong. `implementation-guide.astro` now reads: "Every Verified Provider maintains an active state facility license where required and active accreditation from a recognized accrediting body — ACR, IAC, The Joint Commission, or RadSite — covering each modality offered through USRad."

**Monitoring cadence is not claimed.** The Standard's quarterly PSV refresh and monthly exclusion screening are real differentiators but are not yet operating, and the Standard is DRAFT with ten open decisions. Copy states the requirement, not the cadence.

**At-rest encryption is claimed and supportable.** Supabase is the only patient-data store and encrypts at rest by default. This sentence in the privacy policy becomes false if a second store is ever added — a file bucket, an analytics warehouse, a backup target, or third-party AI document extraction (Standard §6.3, gated on the vendor/BAA decision). Nothing will flag it.

**Unsourced figures are deleted, not softened.** The 92% satisfaction score came from founder experience with AnciCare, with no survey behind it. A two-digit percentage tells a reader an instrument and an N exist. Attributing it to AnciCare doesn't work either — AnciCare served claimants through carriers, not health plan members, so the population doesn't match. Deleted with no replacement figure.

**AnciCare figures retained at 168,000+ and 50–70%.** Expected to survive Workstream B review. "More than 150,000" was raised as an alternative; if Workstream B lands there it is a figure change across every instance.

**Whole sections deleted rather than repaired.** IntegrationPartners (117 lines) and the Integration Benefits panel (56 lines) were both removed entirely. In each case, stripping the false parts left a section headed for a claim with nothing under it.

**Deprecated pages are archived, not edited.** `archived-api/` now holds nine files, all verified byte-identical (git classified every move R100) and confirmed absent from build output. `archived-api/` is out of scope for all future sweeps. Content is preserved intact — anything recycled from there still carries claims the live site no longer makes.

### Decisions taken August 6

**4E is dissolved into 4H.** The Strategy panel lives inside `MarketScopeShowcase.astro`, which is also where 4H's removals land. One component cannot carry two batch labels.

**4C-R is folded into 4H-b.** 4G already named both lanes in the hero; 4H-b handles vocabulary sitewide. What remained of 4C-R — `portal-tour.astro:994` and siblings — is vocabulary work.

**PBS-SRCH-F-002 leaves Workstream A.** The 50/30/20 ranking header comment vs 45/30/25 code weights is a code defect, not marketing copy. → defect track.

**The hero carries no flow diagram.** `AssignmentFlowDiagram` already exists on the page. A second diagram requires first deciding which model the page tells — the existing one opens at "Physician Order — Demand Origin," the proposed one at the funding lanes. Both true, different stories. Not part of a hero rewrite.

**The provider nav is not modified.** `CarbonHeader.jsx` is a single React component rendered by `CarbonLayout` across 49 pages, with one prop (`isHeroPage`) that controls colors only. Its header comment marks it as synced to `PBSHeader.tsx` in the Remix booking app. Any nav change is a sitewide decision touching two codebases.

**No logo descriptor exists.** The nav logo is a bare `<img>`. All four brand SVGs and the favicon contain zero text elements. Design mockups reading "IMAGING MARKETPLACE" / "IMAGING NETWORK" next to the wordmark invented that descriptor. Nothing to change; adding one would be a new brand decision.

**Market-size statistics stay out of the hero.** 28M uninsured (CDC 2025), 67% of covered workers in self-funded plans (KFF 2025), average single deductible $1,886 / $2,631 at firms of 10–199 (KFF 2025). All published and citable. Adjacency to a CTA makes them read as pipeline. They get a section of their own with no CTA inside it.

**Exit-value argument moves to founder voice.** The payor-mix insight is sound; the valuation table was not. Attested first-person framing near AnciCareStory or in consultation. No multiples, no projection. See §8e.

---

## 5. CORRECTIONS TO THE RECORD

### 5a. Briefing errors that reached CC

Every one was caught by a verification step before anything committed.

| # | Error | Caught by | Consequence if uncaught |
|---|---|---|---|
| 1 | `Footer.astro` briefed as sitewide. Reaches production only via `/news`; the real footer is `CarbonFooter.astro`, already clean. | CC's grep | Sequencing argument was weaker than made |
| 2 | fac-modern grid briefed as three-card. Actually `lg:grid-cols-4` with four. | Report-before-edit | Wrong deletion decision |
| 3 | Batch 1H-c specified "retain both true bullets," contradicting 1H-a's third replacement bullet. Delta would have been −64 vs. the stated −10. | Character-delta gate | Cards visibly unequal height |
| 4 | `privacy.astro` replacement asserted "in transit and at rest," broader than the "all data transmission" it replaced. | CC flagged post-edit | A new false claim introduced while removing three others |
| 5 | Two of six paths wrong in 1H-h. | Locate-by-content | Batch would have stopped |
| 6 | `AboutVision.astro` briefed as "the last public 50-state survivor." It renders on no route — unreferenced dead code. | CC's grep | Wrong priority, wrong rationale in a commit message |
| 7 | Dangling `PriorityMarketsMap` import predicted to break the build. It does not — Astro tree-shakes unused frontmatter imports before Vite resolves paths. | CC tested twice | Wrong understanding of a latent defect |
| 8 | `DualSolution:93` briefed as live. Deleted in Batch 1. | Pass-1 survey | Wasted scope |
| 9 | `connectAudiences:87` briefed as a broker-segment claim. It is in the employer segment. | CC quoted the full segment | Understated the exposure |
| 10 | Batch 3C-calc's item F2 said "make no change beyond F1" while D2 removed the variable the third cover tile reads. | CC followed both exactly and reported the collision | A 500 on every ROI report submission. `npm run build` exits 0 regardless |
| 11 | **Batch 4G's file-verification gate specified 148 lines. The authored file is 146.** | CC's line-count check | Batch would have stopped on a byte-correct download. Byte count (5398) and md5 both matched — the line count was asserted without counting |

Separately: target lists built from earlier sweeps missed claims repeatedly. `fac-modern.html:222`, the `faq.astro` security cards, `ExecutiveFAQ.astro:215`, `connectAudiences.ts` (never in any prior survey), both orphan pages, and the 73%/92% Member Impact strip.

**Line numbers shift and must not be trusted.** `faq.astro` targets were off by 34 after four earlier deletions in the same file; `ExecutiveFAQ:224` was actually `:221`; the fac-modern card shifted twice. Locate by content, report the actual number found.

### 5b. Wrong premise — the rate model (August 5–6)

**This is a different class of error from §5a and is recorded separately.** The verification steps catch briefing errors. They do not catch wrong premises. This one was caught by the founder.

**What was believed:** that USRad sets one rate per center per modality, that centers do not choose their own percentage, and that price therefore cannot be a routing input. Batch 4E was scoped on that premise, and §8d of the August 5 tracker recorded a "rate contradiction" on that basis.

**What is actually true, per the PBS Search Engineering Reference V4 and the code:**

- Contracted facilities are priced at their own `effective_medicare_percentage` from `facility_rates`. USRad does not set it. The hardcoded-100% behavior applies to **discovery** facilities only, and was remediated for contracted facilities in the FD-PBS-001 work between July 13–15 (`e230fd4`, July 14).
- Price is a genuine ranking input. `recommendationEngine.ts` weights price, distance, and accreditation, with price the heaviest.
- "One rate per center per modality" means **one rate across funding lanes** — employer-plan and self-pay assignments hit the same contracted rate. It does not mean one rate across modalities, and it does not mean USRad sets it.

**Source of the error:** a frozen demo report that the V4 reference explicitly marks as outdated ("V3's 'frozen, all-simulated' framing is outdated"), combined with a misread of the one-rate memory line.

**Consequences, recorded:**

- **§8d's "rate contradiction" item is STRUCK.** FoundingPartners' routing-preference card is accurate. "You Choose Your Rate," "Set your prices with confidence," and routing "based on price, proximity, and verified clinical quality" are all true.
- **§8d's variant (B) structural-change list must be re-read** against this correction before any of it is scoped.
- Batch 4E shrank to almost nothing and was dissolved into 4H.

**Standing lesson:** re-read the current engineering reference before scoping any batch premised on platform behavior. Demo reports and session summaries go stale; the reference states its own supersessions.

### 5c. Stale deployment preview

The Vercel preview at `usrad-platform-4utvivnde` predates 4D-a. It renders "Get Paid in 10 Days" where the repo says "10 Business Days," and lacks the fulfillment definition. Part of August 6 was spent critiquing copy the repo had already corrected.

**Standing rule added:** confirm the preview SHA before any visual review. See §7 rule 13.

### 5d. Wrong premise — the $246 million savings figure (August 6–7)

**Same class as §5b, and recorded separately for the same reason.** The verification gates catch briefing errors. They do not catch wrong premises. §5b was caught by the founder; so was this.

**What was believed.** That $246 million was a documented AnciCare result — dollars saved for workers' compensation carrier clients against hospital-billed alternatives. On that basis it was approved on August 6 as a figure distinct from provider volume, and a standing warning was attached telling every future sweep **never** to conform it to $150M.

**What is actually true.** The founder located the source analysis on August 7. $246M is not a result. It is arithmetic on **400,000 cases** — a multiplicand this register had *already ruled an error* on August 6, in a decision recorded eight entries above the one approving $246M. The source computes $226M medical and $359M indemnity, each as 400,000 × an assumed per-case value, for $585M. The site's $246M and its $95M / $151M split are scaled variants of that same calculation.

**Why no gate could have caught it.** Every gate in §7 tests execution: does the file say what the batch said it would, does the build pass, did the line number drift, is the figure approved before you delete it. Not one of them asks *how did this figure come to be approved*. The verification was sound and the answer was wrong, because the error was upstream of everything being verified.

**Two structural lessons, both recorded rather than fixed by a new gate:**

1. **Rule 16 has a blind side.** "Before removing any figure, check `APPROVED-FIGURES.md`" makes approval a defence against deletion. It creates no test for entering the register. A figure that gets in on a wrong premise is then *protected* by the rule — and in this case the protection was explicit, in the form of a never-conform warning. The fix is the HISTORICAL EVIDENCE STANDARD, which is an entry test, and it lives in `APPROVED-FIGURES.md` above §1.
2. **A ruling does not propagate to figures derived from it.** 400,000 was ruled an error on August 6. Nothing in the process asked what else had been computed from it. Both rulings sit in the same day's register block. When a base figure is voided, the derived figures must be swept for by hand — there is no mechanism that does it.

**Consequences, recorded:**

- The August 6 approval is **reversed**; $246M is barred pending a primary source (`APPROVED-FIGURES.md` §6).
- The never-conform warning is **void** — it protected a figure that should not have been in the register.
- $95M / $151M / 3.2M work days / $585M / $544M are barred on the same base.
- A proposed ~40,000 MRIs/year was declined under the new standard before it ever shipped — the first figure the standard stopped on the way in rather than on the way out.
- Open items #13 and #14 are superseded: both asked how to reword a figure now being removed.
- Removal is a **two-pass batch (#22)**. /about and the homepage need section rewrites; find-and-replace would leave headings and tiles with nothing under them — the same failure recorded in §4 under "whole sections deleted rather than repaired."

### 5e. The AnciCare source corpus — evidence supersedes attestation (August 7)

**This is not a process failure, and it is recorded separately from §5a–§5d for that reason.** §5a is briefing errors; §5b and §5d are wrong premises. This is neither. Two conformance batches were executed correctly against the register as it stood, verified by every gate in §7, and committed. Then the underlying evidence arrived and changed the answer.

**What happened.** 36 contemporaneous documents were located and read — 27 in a first tranche (457 pages) plus nine federal tax returns. Every one was created 1994–2002; there are **zero later reconstructions**, and many carry Bates stamps from a legal discovery production. They are held **outside this repository** at `~/Documents/ancicare/business_proofs` because they contain federal tax filings and shareholder schedules; `docs/ancicare_proof/` is permanently gitignored.

**What it reversed:**

| Batch | Commit | What it did | Now |
|---|---|---|---|
| **4H-c1** | `37eb600` | Conformed 38 instances to "150,000+ patients" | ⛔ **RETIRED.** No document in the corpus counts people. Open item **#24** |
| **4H-c2** | `e1a6119` | Conformed 16 changes to "over $150 million provider volume" | ⛔ **REPLACED** by "$60M+ paid to imaging centers." Open item **#25** |

**What it substantiated.** `1,200+ centers` had been carried on founder attestation. It is now documented three independent ways inside one board packet dated 30 days before the sale: p.3 `Number of contracted facilities=1228`, a 43-state table on p.13 whose Current column sums exactly to 1,228, and a p.50 pie reading `1,228 Contracted Providers` (1,093 + 135). **The documented figure is stronger than the rounded one.**

**Why no gate caught it, and why that is the correct outcome.** Every gate in §7 tests execution against the register. None of them can test whether the register itself is right. Rule 19 — the historical evidence standard — is the entry test, and it worked exactly as intended here: it is what made "founder-attested" an insufficient basis and sent someone to look for the documents. **The register improving on contact with evidence is the system working, not failing.** The cost is two conformance passes that must be redone, which is the price of having had the figures wrong for less time.

**One process lesson does fall out** — recorded as standing rule 20. The 1,228 figure was missed on the first pass over the same document because the sweep trusted an OCR text layer that had dropped a digit. Scanned documents must be read visually.

---

## 6. THE COLUMN RENAME — no commit to point at

August 5, 2026. `employer_leads.wc_scans` → `total_scans`, executed in all three Supabase projects via the Management API.

| Environment | Project ref | Result |
|---|---|---|
| staging-v2 | `cclvubtaevmbzjlynxsi` | ✅ position 6, integer, nullable · 0 rows |
| production | `skpxihbmwdswmcajnhut` | ✅ position 6, integer, nullable · 2 rows verified intact |
| demo | `ztrirfjkhtjpnkllxiif` | ✅ position 6, integer, nullable · 0 rows |

**Why it was safe.** Both production rows are founder test submissions carrying the calculator's untouched defaults (5000 / 120 / 380 / 2400), on the macworld.cc domain, with placeholder company names. No customer data exists in that table. Verified by reading both rows before and after the ALTER — every value intact, timestamps unchanged to the millisecond.

Dependency check was clean in all three: zero views referencing either scan column, three indexes (none touching them), one permissive service-role policy with no column references. Demo's zero-drift claim held — byte-identical to production.

`reset_demo.sh` cannot undo it. Neither it nor `seed_demo.sql` references `employer_leads`. Confirmed one level deeper than the script itself.

Recorded here because there is no git history for it and `schema_migrations` is empty (production's migration ledger is blind — flagged in the July 9 demo report as needing its own gated session).

`health_scans` is now vestigial. It exists at position 7 and receives nothing. Left in place deliberately; cleaning it up is optional and costs nothing to defer.

---

## 7. STANDING RULES

1. **Clean-tree gate.** Caught three uncommitted archive moves unrelated to the batch in progress.
2. **Report-before-edit.** Caught errors 2, 3, 8, and 10.
3. **Locate by content, not line number.** Caught every shift.
4. **Stage by explicit path.** `git add .` and `git add -A` never used across 33 commits.
5. **Independent items with per-item stop.** Lets a batch commit four of five items rather than block on one decision.
6. **Character-delta and layout gates.** Real proxies for layout risk, not just arithmetic.
7. **Scope thresholds.** Batch 1H-h's eight-hit ceiling correctly converted a copy batch into a scoping decision when the sweep returned 31.
8. **Before/after screenshots as verification, not deliverable.** The 48px → 24px Footer measurement confirmed a diagnosis rather than asserting one.
9. **`npm run build` exit 0 does NOT verify `generateROIReport.ts`.** Astro never executes `buildHTML()` at build time. Any batch touching that file must actually generate a PDF. This is how error 10 stayed invisible to the build.
10. **Grep for consumers whenever a batch deletes a field or variable.** Errors 7 and 10 share a shape: remove a definition, leave a reader orphaned.
11. **Two-pass batches for anything needing new copy.** Survey first (report only, propose nothing), then apply with approved text inline. Batches 3A, 3B, and 3C-calc all used this; the single-pass attempts are where copy decisions stalled mid-batch.
12. **Management API: use `curl`, not Python urllib.** urllib triggers a Cloudflare client-fingerprint block returning HTTP 403 code 1010 — indistinguishable from an auth failure.
13. **Confirm the preview SHA before any visual review.** *(Added Aug 6 — see §5c.)* Reviewing a stale deployment produces critique of copy already corrected.
14. **Verify asserted file properties before using them as a gate.** *(Added Aug 6 — see §5a error 11.)* Byte count and checksum are computed; line counts asserted from memory are not. A gate that fails on correct input costs a round trip and erodes the gate's authority.
15. **Re-read the engineering reference before scoping platform-premised work.** *(Added Aug 6 — see §5b.)* Demo reports and session summaries go stale silently; the reference states its own supersessions.
16. **Before removing any figure, check `APPROVED-FIGURES.md`.** If an approved value exists, the action is to conform to it, not delete it. Removal is correct only when nothing is approved and no source exists. *(Added Aug 6 — a batch was scoped to remove $37,500/month, 15–25 scans/month, and $5K–$10K as unsupported projections. All three were founder-approved on August 3.)*

17. **Sweep for ABBREVIATED and FORMATTED variants, not only the canonical form.** *(Added Aug 6 — Batch 4H-c1.)* `168K` / `168K+` are the same claim as `168,000+` and were missed by a pattern matching comma-formatted variants only. Applies to every figure — `1.2K`, `$150M` vs `$150 million`, `1,200` vs `1.2K`. Found by the PDF render, not the sweep.
18. **Notation is conformed along with value — canonical form plus one approved compact form.** *(Added Aug 6 — Batch 4H-c1. **Amended Aug 7.**)* Each approved figure has ONE canonical prose form and ONE approved compact display form, both named explicitly in `APPROVED-FIGURES.md`. **No third form.** Compact is permitted in stat tiles, charts, badges, and similarly constrained UI; **narrative prose uses canonical**. Provider volume — canonical "over $150 million" · compact `$150M+`. Patient count — canonical "more than 150,000 patients" · compact `150,000+`.

    *Why amended:* the Aug 6 formulation demanded one literal notation everywhere, which made natural prose ("more than 150,000 patients") a technical violation of the rule written to protect that figure. Controlled typography is not inconsistency. The abbreviation ban is unchanged — what rule 18 bars is an *unapproved* form, not a *second approved* one.

19. **THE HISTORICAL EVIDENCE STANDARD.** *(Added Aug 7 — see §5d.)* Historical quantitative claims publish only when supported by a contemporaneous source or a defensible primary record. Founder recollection supports qualitative history; it does **not** authorise derived quantitative claims.

    This is a standing rule, not only a figure test. Rule 16 protects approved figures from deletion; it says nothing about how a figure got approved. Rule 19 is the entry test that rule 16 assumes. A figure failing it has no approved value to conform to, so removal is correct rather than a rule-16 violation. Full text and the barred derivation family: `APPROVED-FIGURES.md`, above §1 and in §6.

20. **Read scanned documents VISUALLY, not via the OCR text layer.** *(Added Aug 7 — see §5e.)* The `1,228 contracted facilities` figure was missed on a first pass because page 3 of the March 2002 packet renders in the text layer as `facilities^ 228` — the leading digit lost to a stray character — and the accompanying 43-state table extracts as an unheaded column of bare integers. Nine federal tax returns had a text layer of **zero characters**. **Use the text layer only to locate candidate pages; read every figure from a rendered image; write ILLEGIBLE rather than guess.** A misread digit in a filing is worse than a missing year.

21. **Any working copy of a confidential source document is deleted at the end of the batch that created it, and the deletion is reported.** *(Added Aug 7.)* The discovery batches required copying nine federal tax returns into a scratchpad to render them — they carried no file extension. Renderable duplicates of confidential filings must not persist in temp directories after the batch that needed them.

22. **Re-sweep, never work from an existing list.** Every deferred item should be re-grepped before it is scoped. *(Unnumbered since inception; numbered Aug 7 after catching four consecutive undercounts — 4H-b, the $246M citations, FoundersSection, and #25.)*

23. **`DECISIONS.md` verification requires BOTH checks, run AGAINST FENCED CONTENT ONLY.** The deletion check catches removed lines; the fence-aware prefix proof catches mid-block insertion, which removes nothing and passes deletion cleanly. Run both against every historical checkpoint. *(Added Aug 7 — a mid-block insertion passed the deletion check and failed the prefix proof. **Clarified Aug 7, DOC-10.**)*

    **Scope both checks to the fenced register.** The dated entries live inside ` ``` ` fences and are append-only. The tables below sit *outside* the fences and are, by the file's own statement, "the index, not the authority" — amendable, with precedent at #11. A naive whole-file deletion check fails on every legitimate index update: DOC-10 amended rows #22, #24, #27 and #19, and the whole-file check reported four deletions at all eight checkpoints while zero register lines had been touched.

    ⚠️ **Amended 2026-08-09 (DOC-16).** Rule 23's two checks verify **content, not structure**, and neither detects a consumed fence marker. A deleted fence is not a deleted register line, so the deletion check is blind to it; swallowing trailing content preserves the prefix, so the prefix proof is blind to it. **Two structural checks are therefore part of rule 23, not merely of a batch brief:** (1) the fence count must be **EVEN**, and (2) the **total line delta must EQUAL the fenced-content delta** — a divergence means a fence boundary moved. Discovered when a DOC-16 edit consumed the 2026-08-09 block's closing marker: both rule 23 checks passed at 13 fences while the register silently contained its own index tables.

24. **FAIL CLOSED ON PRICING.** *(Added Aug 8 — DOC-11, Pricing Policy V1.0.)* No current USRad transaction price, projected USRad cost, or savings calculation derived from USRad pricing may publish without an authoritative contracted provider rate or a separately ratified modeling methodology. Discovery facilities may display neither price nor savings. **No provider is contracted as of this date and no modeling methodology is ratified, so no such figure may publish today.**

    This rule does not reach documented historical figures, market or hospital comparators sourced independently of USRad pricing, or the AnciCare record.

25. **PRE-LAUNCH GATE.** *(Added Aug 8 — DOC-11.)* Employer demand generation must not begin until the Workstream A employer surface, the Employer Implementation Guide, and the applicable EDS employer-funnel handoffs have been completed and verified.

    ⚠️ **Status 2026-08-09 — the GUIDE COMPONENT is closed BY DEPLOYMENT, not merely by approval; the gate is NOT cleared.** The guide is live and verified at the existing public URL. The other two conditions remain open: the `/employer` surface (Stage 3, **surveyed** but not begun, with six blocking open items) and the EDS employer-funnel handoffs (#38 — transactional email, savings payload, production pricing logic). See `DECISIONS.md` 2026-08-09, *"RULE 25 IS NOT CLEARED BY THE GUIDE DEPLOYMENT."*

26. **PRESENT-TENSE CAPABILITY CLAIMS REQUIRE A CURRENT OPERATIONAL BASIS.** *(Added Aug 9 — DOC-16, B5.)* Present-tense claims that USRad **currently possesses, delivers, guarantees, or has demonstrated** a capability require a current operational basis. Where a capability is part of the approved planned model but is **not yet operational**, it may be described only as part of the planned process or program design, **without implying current availability, performance, adoption, or customer experience.**

    This extends rule 7's reach — timing and outcomes — to **capability**, and it catches a defect class numeric sweeps do not: *"24/7 support line,"* *"Real-time quality scoring with member feedback loop,"* *"Same facilities your employees already use,"* *"Legal review included,"* *"Evening and weekend availability at participating centers,"* *"Pilot program option."*

    It also reaches **quantitative claims written in words.** *"Join progressive employers saving millions"* is **removed outright** — it asserts existing employer customers and existing results, and USRad has neither. *"We've done this before, at scale"* survives **only** if explicitly reframed as AnciCare and founder historical experience, never as USRad experience.

---

## 8. OPEN ITEMS

> **Numbers 20, 21 and 23 are intentionally vacant.** They were never assigned — a sweep of all twelve committed checkpoints of `DECISIONS.md` finds no open-table row bearing any of them at any point in the file's history. They are not lost items, and the numbers must not be reused. See `DECISIONS.md` 2026-08-09, *"OPEN-TABLE NUMBERS 20, 21 AND 23 WERE NEVER ASSIGNED."*

### 8a. Batch 3D — the ROI PDF, and it is larger than "remaining WC sections"

Fifteen unaudited claims survive in the generated report, plus two structural problems. Nothing in this list has been through any batch.

| Location | Claim | Note |
|---|---|---|
| p2 `:1048` | "Actual total savings typically run 20–40% higher" | |
| p2 `:1047` | "reduced disability duration (avg. 18+ days), lower indemnity and litigation costs" | Repeats the 18+ day figure 3B just attributed on the site |
| p4 `:1215` | "Average 73% increase in necessary imaging completed" | The same unsourced 73% deleted from DualSolution in 3B |
| p4 `:1221` | "40–60% total imaging cost reduction visible in claims data" | Contradicts the prefunded model — under prefunding there are no claims |
| p4 `:1236` | "WC claim severity drops measurably" / "Employee satisfaction scores improve" | |
| p4 `:1222` | "Documentable for CFO reporting" | |
| p4 `:1199` | "Savings begin immediately" | |
| p3 `:1173` | "Hospital outpatient rates are 711% above Medicare baseline" / "USRad eliminates this markup entirely" | |
| p3 `:1106-1147` | Scan-level table ranges and markup multiples (9–12×, 6–9×, 4–6×) | All hardcoded |
| p5 `:1301`, `:1318` | "168,000+ claimants" / "50–70% Delivered historically" | Unattributed to AnciCare — the exact defect 3B fixed on the website |
| p6 `:1465` | "(888) USRad24" | Unverified — CC cannot confirm it is a working number |
| cover, p6 `:983` | "AnciCare (acquired by CorVel, NASDAQ: CRVL)" | |

**Structural:**

- Page 5 carries ~4.5 inches of whitespace after the 1H-e/1H-f compliance removals dropped that block from five rows to one. Page is fixed height: `11in`.
- Cover subheadline still reads "Workers' Comp + Employee Health Benefits" — quoted but deliberately unedited in 3C-calc (item F3), awaiting replacement copy.

### 8b. Decided, awaiting a batch

| Item | Decision |
|---|---|
| `faq.astro` security cards — "Military-grade encryption," "Complete logging of all data access" | Retain and tighten: drop "military-grade" for the adjacent literal "256-bit"; replace "Complete logging" with "Access logging across the platform" to remove the unfalsifiable absolute. Copy polish, not a false-claims issue. |

### 8c. Undecided

| Item | The question |
|---|---|
| ROI PDF section label "Compliance & Integration" | Introduces one row that is neither. Relabel or move the surviving row. |
| DualSolution spacing — ~108px inside the Health card, 160px below the row at 1440px | Both from the section losing 380px of content. One-line fixes (`items-start`; `mb-0`), both cosmetic. |
| /employer background seam | Implementation and ExecutiveFAQ now adjacent with identical gradients after the 1H-g deletion. |
| /employer section order | Now 12 sections, content removed from four. Worth reviewing whole rather than patching seams. |
| `health_scans` column | Vestigial. Drop, rename, or leave. |
| The PAT at `~/.supabase/access-token` | Grants full DDL on all three projects as postgres superuser, independent of `.env`. Removing production credentials from `.env` does not enforce the isolation it appears to. Options: move it out of the container, scope it per-project, or gate by process. |
| MarketScope Strategy tab scope | **Resolved Aug 6** — see §8e. |

**Layout defects surfaced during Batch 4H-c3 verification — both PRE-EXISTING, neither caused by that batch. → defect track.**

| Item | Measurement | Status |
|---|---|---|
| **`/provider` horizontal page overflow at 390px** | `document.documentElement.scrollWidth 475 > clientWidth 390`. Also present at 768px. **Measured on the unmodified tree before any 4H-c3 edit**, and unchanged after. The other four provider-surface routes have no h-scroll at either width | Pre-existing. Not a copy issue — something in the page is 85px wider than the viewport. Defect track |
| **`ProviderSearchSection` displayed hardcoded values as computed results** | "76% Average Savings", "$1,027 Best Deal Found", "1.0s Search Time", "1,500+ center network", and facility distances generated by `Math.random() * 30 + 2` | **MOOT — archived** with `/search-results` in Batch 4H-f (`5432aeb`). Recorded because the pattern, not the file, is the defect: presenting fixed or randomised values in the chrome of a live computation. Check for it wherever a results UI is rebuilt in Remix |
| **`ProvenSuccess` 390px tile asymmetry** | Tile heights `65 · 50 · 65`. The middle tile carries two elements (value + label) where tiles 1 and 3 carry three (value + label + sub-line: "1994-2002", "Still thriving today"). At 1440px the grid stretches all three to 70 and the asymmetry disappears | Structural, predates the batch — the old `$150M+` / "Value delivered" tile had the identical shortfall. Fix is a sub-line for the middle tile or removing them from the outer two. Defect track |

### 8d. Deferred by category

**Behind login — post-workstream.** `MedicalStatus.jsx:26` and `PortalLayout/Sidebar.jsx:98` carry "SOC 2 Certified." `SkeletonProviderDashboardSystem.jsx:1284,1293` labels WC "Coming Soon" — the one place on the site that states WC accurately, and a useful reference model.

**Unserved.** `.bak` / `.backup` files (7) — a repo decision. Check `.gitignore`. `archived-api/` — nine files, out of scope for all sweeps.

**Counsel, not any copy batch.** `sms-terms.astro:187` — a conduct commitment likely tied to 10DLC registration. Removing it may create exposure.

**Blog.** `blog/future-ai-medical-imaging.astro:798`, `portal-tour.astro:240`.

**~~The rate contradiction.~~ STRUCK August 6.** See §5b. The premise was wrong: centers do set their own percentage, and price is a genuine routing input. FoundingPartners' routing card is accurate and requires no change.

**Components needing structural change under variant (B).** `AssignmentFlowDiagram` (node count, connector geometry), `ScannerUtilization` (two-lane contrast), `ReferralWorkflow` (grid arity), `GuaranteeSection` (2×4 grid under a "no fine print" header), MarketScope strategy panel, FoundingPartners routing card. **Must be re-read against §5b before scoping** — at least the last two entries were premised on the struck rate contradiction. Under variant (A) these are copy edits plus one node label; `AssignmentFlowDiagram:127-139` is already tagged Verification · Pricing · Routing and already positioned before routing.

**The provider brief PDF.** Un-versioned, gated, explicitly marketed for internal forwarding, and the artifact a center still holds six months from now when a payment is late. Everything else on the site can be changed silently. **Escalated Aug 6 to 4H-d** — see §8e.

**Untyped Supabase client.** `createClient` is called without a `<Database>` generic and no generated types file exists. This is why the column rename broke nothing — and also why a future column change won't be caught at build time either. A standing condition, not a defect to fix today.

### 8e. Batch 4H — claim consistency (scoped August 6)

Batch 4G left the provider hero claiming **less** than the sections beneath it. 4H closes that gap.

**4H-a — Survey (read-only).** Does `smartmatch.astro` disclose ranking weights? **Confidentiality check, runs first.** Then a full inventory across the provider surface (main page plus `consultation`, `portal-tour`, `faq`, `network-map`, `smartmatch`) of every claim stating or implying volume, per-scan margin, utilization rate, valuation multiple, or operational performance. The list below is from targeted greps, not an exhaustive sweep.

**4H-b — Vocabulary (mechanical).** Cash-pay → self-pay. Thirteen known instances: `ExitValueSection` ×4, `ExitModal` ×7, `ScannerUtilization` ×1, `smartmatch` ×1. Plus `portal-tour.astro:994` and siblings (ex-4C-R).

**4H-c — Claim removals.**

| Location | Claim | Disposition |
|---|---|---|
| `portal-tour` Capacity Math | 15–25 scans/mo · "net margin $375/scan" · $5K–$10K | Remove panel |
| `ScannerUtilization` | $37,500/mo · 5 scans/day · 53%/47% utilization split | Remove figures |
| `ExitValueSection` | 5–7x→7–9x · $5–7M→$7–9M · "up to $2M more" · "the kind USRad is designed to generate" | **Remove section entirely** |
| `FAQSection` (main) | "20–40% volume increases" · "targeting similar results" | Rewrite answer |
| `faq.astro:1830` | "below 5%" vs "industry average 15–20%" | Remove green box |
| `MarketScopeShowcase` | Expected Volume 80–120 / 40–60 · "revenue projection modeling" · "projected scan volumes" · Miami 120–150% recommendation | Remove |
| `GuaranteeSection` | 96% patient show rate | Unattributed — verify or remove |

**Two figures currently contradict each other.** `ScannerUtilization` implies ~100 additional scans/month; `portal-tour` and the provider brief say 15–25. Same $375, same "previously idle capacity," roughly 6× apart. Both are unsourced. Both go, rather than standardizing on the smaller invention.

**On the no-show claim.** Research conducted Aug 6: a Canadian national medical-imaging survey puts the average MRI no-show rate near 5%; a U.S. academic study across 2.9M outpatient imaging visits found 2–3%; another found 6.5% overall with MRI among the lowest modalities. One MRI-specific study reported a 17.4% baseline. So 15–20% occurs but is not a defensible industry average — and USRad has no operating data supporting "<5%." The three-step operational answer above the box (reminders, confirmation, accountability, slot reopening) is the stronger argument and needs no statistic. Sources logged for when real USRad data exists.

**MarketScope — what stays.** Medicare pricing database (113 localities), competitor intelligence, market density classification, **workers' comp rate benchmark**, **market rate range**. All reference data for a decision only the center can make. Three need clarifying labels: the WC benchmark ("reference only — USRad does not currently route workers' compensation"), the market range (market research, not USRad volume; vocabulary fix), and the existing SAMPLE DATA badge and "see your actual market analysis during onboarding" line, which are already correct and should be kept.

**MarketScope Strategy tab — confirmed framing.** The tab presents the three reference points against which a center sets its percentage: Medicare allowable in their locality, the workers' comp benchmark, and the local market range. No projected volume, no recommended percentage, no algorithm.

**4H-d — Provider brief.**

- Comment out `<ProviderBrief />` in `provider.astro`. Do not delete the component. Follow the existing `<!-- Phase 2: … -->` comment precedent.
- Check for any other link to the PDF — a live URL survives a removed button.
- The on-page section reproduces the PDF's claims in HTML ($375 net margin per scan, +15–25 scans/month, $5K–$10K monthly revenue add, "Turn Empty Scanner Slots Into Guaranteed Monthly Revenue"), so removal is not merely about the download.
- PDF rebuild deferred — ReportLab binary, outside the repo.

**PDF defects to fix on rebuild:** "$375 NET MARGIN PER SCAN" · "Guaranteed Monthly Revenue" · "$5K–$10K REALISTIC MONTHLY ADD" · "within 10 days of fulfillment" (missing *business*) · "WHY CASH-PAY IMAGING WORKS" · footer "National Cash-Pay Imaging Infrastructure."

### 8f. Batch 4I — provider page resequencing

`provider.astro` only. No component edits — the file is a composition shell and reordering is moving lines.

Current order: SpineNav → Hero → TrustBar → Guarantee → ScannerUtilization → ExitValue → ReferralWorkflow → AssignmentFlowDiagram → HowItWorks → MarketOpportunityTeaser → MarketScope → AnciCareStory → ProvenSuccess → FoundingPartners → ConsultationCTA → ProviderBrief → FAQ → NetworkBuilding

- **Three consecutive sections explain the same thing.** ReferralWorkflow, AssignmentFlowDiagram (581 lines), and HowItWorks occupy positions 7/8/9 and all describe how an assignment moves from order to payment. Largest structural redundancy on the page.
- **The FAQ sits after the ask.** Objections are answered post-conversion, and the page closes on a soft aspirational note rather than the CTA.
- **AnciCare appears four times** — hero credibility line, TrustBar, AnciCareStory, ProvenSuccess. The last two are adjacent and overlapping.
- ExitValue placement is moot if 4H-c removes it.

### 8g. Other queued items

- `AssignmentFlowDiagram` Step 2 says assignments route to the "highest-performing" participating center. The actual basis is price, proximity, and accreditation — not performance.
- **Marketplace → network sweep.** 18 instances. **One exception:** `AssignmentFlowDiagram.astro:41` — "USRad is not a booking marketplace" uses the word correctly as contrast. Preserve it.
- **~~$160M+ vs $246M.~~ CLOSED — both halves moot.** `$160M+` conformed to **over $150 million** in Batch 4H-c2 (`e1a6119`), closing cluster C2a. `$246M` was **reversed and barred** 2026-08-07 pending a primary source, so there is no second figure to reconcile it against. Removal is open item #22, a two-pass batch. See `DECISIONS.md` 2026-08-07 and `APPROVED-FIGURES.md` §6.
- **1,200 vs 1,200+.** 27 locations across the repo, seven of them without the plus. All move together when Workstream B lands.
- **Market-size section.** 28M uninsured (CDC 2025), 67% of covered workers in self-funded plans (KFF 2025), average single deductible $1,886 rising to $2,631 at firms of 10–199 (KFF 2025). Own section, no CTA inside it. **KFF's denominator is covered workers, not covered lives** — that percentage must never be multiplied against a population.
- **Exit-value argument in founder voice.** Near AnciCareStory or in consultation. No multiples, no projection.
- **Provider hero `<h1>` renders 3 lines at ≤405px, 4 lines at 320px.** Two lines from 410px to 1440px. No overflow or clipping at any width. Deferred; logged by CC to project memory as already-triaged so it does not resurface as a new finding.

### 8h. Pricing Policy V1.0 — opened by DOC-11

Numbering continues the `DECISIONS.md` open table. Items #34 and #35 are **settled decisions with open implementation** — the policy question is closed; only conformance remains. See `DECISIONS.md` 2026-08-08.

| # | Item | Status |
|---|---|---|
| 34 | Provider-surface disclosure of internal modality fee amounts — conformance sweep under settled §4 | settled decision, open implementation |
| 35 | `MarketScopeShowcase` discovery price and savings display — removal under settled §5 | settled decision, open implementation |
| 36 | Sitewide 260-dollar family, 35 instances — deferred to the page-by-page sequence | not this batch |
| 37 | Employer-surface pricing figures (350, 260 to 475, 420) — resolved in the Stage 3 `/employer` pass | ✅ **DECIDED — D5**, implementation pending. See §8j |
| 38 | EDS employer-funnel handoff outstanding — transactional email is delivering retired material until EDS acts. Dependency, not Workstream A work | blocks rule 25 |
| 39 | `APPROVED-FIGURES.md` §6, the trajectory line under *"What replaces $246M"*, dates the CorVel sale to **2013**; every other entry, including the document-verified §4a acquisition row, dates it to **May 2002** on the Greenberg Traurig closing letter | register defect, not corrected in DOC-12 |
| 40 | Standing rule 18 does not reach **date forms**. Canonical `founded 3 January 1994` reads as filing language in marketing prose; the register's own §6 positioning line writes `founded 1994`. Ruled for present purposes: **"founded in 1994"** is correct in prose | clarifying amendment to rule 18 |
| 41 | Line-number citations across the register and the tracker — identify every one, determine which are already stale, and record whether any downstream instruction depends on one. The prospective convention (**cite by section and content**) is settled in `DECISIONS.md` 2026-08-08 and is **not** what this item tracks | audit — convention already settled |
| 42 | Two classes of bar in §6 — figures barred as **wrong or unsupported** versus claims barred on **contrary evidence**, which have different reopening standards. Marked inline as **BARRED — CONTRARY EVIDENCE** rather than structurally. Revisit whether evidence-based bars need their own §6 subsection **once a second instance exists**. See `DECISIONS.md` 2026-08-09, *"TWO CLASSES OF BAR, DISTINCTION NOTED NOT STRUCTURED"* | structural, deferred on one instance |
| 43 | **Register contradiction on "cash-pay."** `DECISIONS.md` states the term is barred with *self-pay* as the population replacement; `APPROVED-FIGURES.md` records that the sitewide bar was **overruled on August 6**. Two governing documents disagree. Surfaced by the Batch D survey; the live instance sat inside markup Batch D replaced wholesale, so nothing was blocked and nothing was resolved. **Must be settled before any surface where the term survives is worked.** See `DECISIONS.md` 2026-08-09, *"REGISTER CONTRADICTION ON 'CASH-PAY' — RECORDED, NOT RESOLVED"* | contradiction, blocks surfaces carrying the term |
| 44 | **Accreditation wording — three live standards across the employer funnel.** `ExecutiveFAQ` states **ACR accreditation is required for all facilities**; a later bullet in the same component describes a broader verification standard covering **licensure, insurance, accreditation and service capability**; the deployed Employer Implementation Guide uses a **third** formulation. ⚠️ **§4 already records that naming ACR alone was wrong** and that the Verified Provider Standard §5.2 recognizes **four** bodies — ACR, IAC, The Joint Commission, RadSite — so the `ExecutiveFAQ` sentence contradicts a decision already taken. ⚠️ **B7 AMENDED, same batch:** because the ACR bullet contradicts a decision already taken rather than differing from one not yet made, **Batch B/C REMOVES it with no replacement** — the D3/D5 rule that a claim with no approved replacement is removed, not substituted. **This does not resolve #44 and authorizes no replacement wording.** No other accreditation formulation may be introduced in B/C. The broader verification bullet and the deployed guide's formulation are untouched and remain this item's subject — the verification bullet also carries a rule 26 present-tense problem, see #47. ⚠️ **CONFIRMED INDEPENDENTLY, DOC-17:** Verified Provider Standard **§5.2** requires accreditation from **any** recognized body — ACR, IAC, The Joint Commission, RadSite — covering each advanced modality offered, so the ACR-only wording is too narrow **on the draft's own terms** as well as under §4. ⛔ **UPSTREAM DEPENDENCY: Appendix B open decision 3**, *"recognized accrediting bodies and modality coverage rules."* **#44 cannot close until that decision is made** — the approved public formulation cannot be written from a draft. See also #45. See `DECISIONS.md` 2026-08-09, *"B7 · ACCREDITATION WORDING DEFERRED, NOT RESOLVED"*, *"B7 AMENDED — THE ACR BULLET IS REMOVED WITHOUT REPLACEMENT"* and *"B7 FURTHER AMENDED — §5.2 CONFIRMS THE ACR WORDING IS TOO NARROW"* | opened by DOC-16; blocked on Appendix B decision 3 |
| 45 | **Verified Provider Standard — DRAFT, not adopted, not in this repository.** Its effective date is bracketed, its status line reads *"not yet adopted; bracketed items are open decisions,"* and **Appendix B lists ten open decisions** before adoption. **Asymmetry governing its use: copy may be REMOVED on its basis; copy may NOT be APPROVED on its basis.** Where it and `APPROVED-FIGURES.md` disagree, the register governs. **Cited by section, never stored** — same treatment as Pricing Policy V1.0 and the AnciCare corpus. **Track Appendix B's ten decisions as a dependency list:** decision 3 gates **#44**, and the §12 exclusions bear on **#46**. Rulings are accumulating against a document that is not yet adopted | opened by DOC-17; gates #44 and #46 |
| 46 | **Board-certification claim family — sitewide, and a CONTRADICTION rather than an evidence gap.** Roughly **forty** instances across `how-it-works`, `terms`, `contact`, `member-rights`, blog routes and a dozen components; **two escalate to a guarantee** — `PromiseBanner` and `SharedProblemSolution`. Standard **§5.7** makes board certification **provider-attested**, with primary-source verification **deferred to a future version**. **§1.3** states Verified *"is not, and shall not be represented as: a warranty or guarantee of diagnostic quality, interpretation accuracy, or clinical outcomes,"* and **§12** deliberately excludes practitioner credentialing from Version 1.0. **The standard expressly forbids the guarantee representation.** B/C removes the `ExecutiveFAQ` bullet only; nothing outside B/C is actioned | opened by DOC-17; sitewide, not actioned outside B/C |
| 47 | **Deferred rule 26 claims — DEFERRED, NOT APPROVED.** Five present-tense claims not resolved in B/C: `ExecutiveFAQ` Q4's *"White-label options available for branded experience"* and its partnership callout; Q6's two present-tense payment sentences and its callout; and *"Active network locations complete USRad verification requirements"* (also #44). **Q6's present tense describes the PREFUNDED MODEL — design rather than demonstrated capability — and is arguably compliant; it deserves a proper ruling, not a passing one.** Recorded so a future sweep does not read them as approved | opened by DOC-17; deferred, not approved |

**#39, #40 and #41 were opened by DOC-12, not DOC-11.** They continue the numbering here because this is the workstream's single open-item sequence. All three are register-maintenance items surfaced by the Employer Implementation Guide audit — see §8i.

**#41 is an audit, not a decision.** The convention it grew out of — **cite by section and content, never by line number** — is already settled in `DECISIONS.md` 2026-08-08, *"LINE-NUMBER CITATIONS IN THE REGISTER GO STALE AND CANNOT BE CORRECTED."* `DECISIONS.md` is append-only, so a line number cited there is frozen at commit while `APPROVED-FIGURES.md` keeps moving beneath it. #41 closes when the sweep is complete, not when a convention is chosen.

**#38 is not Workstream A work.** Per the 2026-08-08 EDS-boundary entry, the boundary is **functional, not repository-based**: `api/pricing/quote.js`, `api/employer-guide-download.ts`, `api/employer-roi-report.ts`, the four admin `medicare-dashboard` routes, `ProviderSearchInterface.jsx` and the patient-dashboard components sit physically in this repo but are EDS-owned. Workstream A documents the defect and the required outcome in a handoff and does not modify these files.

**Housekeeping — DOC-11's own SHA.** ✅ **DONE — DOC-12.** Filled as `623df8a`; index amendment recorded in `DECISIONS.md` 2026-08-08. **DOC-12's own row 51 now carries `**TBD**` for the same structural reason** — a commit cannot cite its own hash. Fill it next batch. Three consecutive batches have needed this; it is a property of the convention, not an oversight.

### 8i. Employer Implementation Guide — DEPLOYED AND VERIFIED · guide component of the EDS handoff CLOSED

**Status: DEPLOYED AND VERIFIED. The guide component of the EDS handoff is CLOSED.** Updated 2026-08-09 (DOC-14); supersedes the DOC-13 status, which read *"approved for production, replacement pending EDS deployment."* EDS deployed the Workstream A-approved 8-page guide in place, and the production artifact was verified byte-for-byte against the approved PDF. **The public URL was preserved**, so links already delivered resolve to the corrected document. See `DECISIONS.md` 2026-08-09, *"EMPLOYER IMPLEMENTATION GUIDE DEPLOYED TO PRODUCTION."*

| Verified artifact | Value |
|---|---|
| SHA-256 | `a33f10c13f44ff439a89ad370bb446fd8931e3d7a7c4dbfc9191c879f4e496ef` |
| Size | 61,390 bytes |
| Pages | 8 |
| Public URL | preserved — replaced in place, not deleted and recreated |

> **The hash is ARTIFACT PROVENANCE, not a publication figure.** It is deliberately **not** in `APPROVED-FIGURES.md`, which governs figures cleared to appear in copy. It exists so a future session can answer *"is the live guide the audited one?"* by comparison rather than recollection.

> ⚠️ **THE REMAINING SECTIONS OF THE EDS HANDOFF ARE OPEN.** No application code was changed and no employer-funnel remediation was performed as part of this deployment. #38 stands.

**The division of labour is closed out:** Workstream A specified · the external PDF production agent revised · Workstream A audited the returned PDF · **EDS deployed the live storage object.**

| Item | State |
|---|---|
| Claim-by-claim revision specification | ✅ written and issued |
| Five of sixteen pages removed in full — p6 (implementation-never-fails, 168,000+ times), p10 (licensing and accreditation table), p12 (90-day cost reduction), pp13–14 (composite case study) | ✅ confirmed removed; the guide returned at **8 pages** |
| Case study replaced by **"How Employer Savings Will Be MEASURED"** — method, not result; no projected percentage, no dollar amount | ✅ confirmed in the returned document |
| Revised PDF returned for Workstream A audit | ✅ returned at **8 pages**; passed after **two correction passes** |
| Founder authorization for production | ✅ **granted 2026-08-09** |
| Live storage object replaced | ✅ **deployed in place by EDS 2026-08-09; public URL preserved** |
| Production artifact verified byte-for-byte against the approved PDF | ✅ **SHA-256 match, 61,390 bytes, 8 pages** |
| Guide component of the EDS handoff | ✅ **CLOSED** |
| Remaining sections of the EDS handoff | ⬜ **OPEN — #38** |

**Two authorized deviations from the specification, both improving conformance:**

- **Workers' compensation removed from the document entirely**, rather than corrected in place. Matches the register's framing of WC as history plus future expansion.
- **Phase 1 / Phase 2 / Phase 3 replacing Week 1 / Week 2–3 / Week 4.** Removes the implied four-week duration.

**Three blockers found at audit and cleared:**

| Blocker | Resolution |
|---|---|
| An unapproved ticker | Ticker approved 2026-08-08 as **NASDAQ: CRVL**; the prior form **NYSE: CVL** remains barred — wrong exchange, wrong symbol. See `DECISIONS.md` 2026-08-08, *"NASDAQ: CRVL ADDED TO THE PUBLICATION AUTHORITY."* |
| A facility count missing its April 2002 anchor | Anchor restored — the canonical form is **1,228 contracted imaging facilities in 43 states, April 2002**. `APPROVED-FIGURES.md` §4a, *"State counts — always publish the count with its date,"* bars presenting any one state count as "the" figure |
| An unapproved KFF statistic | Removed. *"90% of covered workers … (KFF, 2023)"* is **absent from the register** and two editions stale against the **KFF EHBS 2025** baseline in `APPROVED-FIGURES.md` §5. HOLD under standing rule 4 |

> ✅ **BLOCKER ON SIGN-OFF — CLEARED.** The specification's AnciCare facts — 1,228 facilities / 43 states · more than $60 million paid to imaging centers 1994–2001 · founded 1994 · acquired by CorVel May 2002 — were written from working memory rather than read from `APPROVED-FIGURES.md`. Canonical wording was pulled from §4a and confirmed. **All three defects were in the specification, authored by Workstream A; none originated with the PDF agent.** Standing rule 22 held: re-read, never work from the existing list.

**The URL is not taken down.** Per the 2026-08-08 positioning decision, the guide is unlinked from the lead email rather than deleted, and the revised PDF replaces the object at the **same storage URL**, so links already delivered resolve to corrected content.

### 8j. Stage 3 employer decisions D1–D13 — DECIDED, implementation pending

*(Recorded 2026-08-09, DOC-15.)* Thirteen decisions were ruled as one set. See `DECISIONS.md` 2026-08-09, *"STAGE 3 EMPLOYER SURFACE — THIRTEEN DECISIONS CLOSED"* and the D1–D13 entries that follow it.

> ⚠️ **DECIDED IS NOT RESOLVED.** Per D9's ruling-versus-scope distinction, the policy question is closed for each item below; the instances are removed when their surfaces are worked. **Do not mark any of these resolved, and do not expand an apply batch into another surface merely to close one.**

| # | Item | Decision | Status |
|---|---|---|---|
| 8 | Market-size section placement | **D11** — `IndustryData` removed as a standalone component, trailing CTA with it | ✅ DECIDED, implementation pending |
| 18 | Satisfaction rate — 92% / 98% / 99.8% | **D9** — barred sitewide absent documented measurement source and methodology | ✅ DECIDED, implementation pending |
| 24 | Retire "150,000+ patients" sitewide | **D1** — retired; replacement selective, not mechanical | ✅ DECIDED on this surface, implementation pending |
| 27 | Duration claims describing AnciCare's operating life | **D2** — 1994 and 1994–2002 kept; "20+ years post-exit" and "30 years" retired | ✅ DECIDED on this surface, implementation pending |
| 28 | 4.9★ satisfaction, fourth variant | **D9** — same sitewide bar | ✅ DECIDED, implementation pending |
| 29 | 50–70% published where the 50%+ floor is required | **D4** — closed outright; historical floor form approved, three mis-scoped instances removed | ✅ DECIDED, implementation pending |
| 30 | "90 million Americans" — derived headcount | **D8** — retired with the other nine market statistics | ✅ DECIDED, implementation pending |
| 37 | Employer-surface pricing figures (350, 260–475, 420) | **D5** — removed, with the unapproved hospital comparators | ✅ DECIDED, implementation pending |

**Two decisions have no open-item number** because nobody had opened one: **D3** bars the category-founding and "first" claim on evidence, and **D10** removes `EmployerCaseExample` entirely. Both were surfaced by the Stage 3 survey as unadjudicated, not as tracked items.

**D13 is a coordination constraint, not a claim ruling.** The calculator is not closed until EDS removes or replaces the dependent pricing arithmetic and resolves the payload contract. See §12.

---

## 9. STRUCTURAL ISSUES NOT CAUSED BY THE PIVOT

- The untyped Supabase client (§8d).
- The PAT scope problem (§8c).
- `schema_migrations` empty in production — the migration ledger is blind.
- **`CarbonHeader.jsx` has no per-page variant.** One nav across 49 pages, synced to `PBSHeader.tsx` in the Remix app. Any audience-specific navigation requires a code change touching two codebases.
- **PBS-SRCH-F-003** (from the engineering reference): the real facility name ships to the client in the search JSON despite display-layer concealment, and the fuzzing is deterministic and reversible. Material to any blinded or comparison-research claim. Defect track.

---

## 10. VOCABULARY RULES

*(Added August 6. These are structural, not stylistic — each one exists because the plain-language reading is factually wrong, which is why they drift back in on rewrites.)*

- **"Cash-pay" is barred.** In provider payor-mix language it specifically means *the patient pays the center*. USRad is the payor in every lane; the patient is never the center's counterparty. Use *self-pay* for the population, and name USRad as payor for the transaction. Will recur in employer-facing copy and in the briefs.
- **"Net margin" is barred.** USRad cannot know a center's net margin. Use per-scan reimbursement.
- **Mechanism, not conversion.** "Puts you in front of referrers you aren't seeing today" is true by construction. "Grows your commercial book" is a volume promise in different clothing. No conversion rates, no implied share of referrers retained.
- **Lane names.** Employer plan assignments (primary) · self-pay patient assignments (secondary). Both are prefunded — *prefunded* names the shared mechanism, not one lane, and therefore cannot be used to distinguish them.
- **Present tense.** No centers are contracted and no employer volume is flowing. Copy describes what the network is built to do, not what it is doing.
- **"Network," not "marketplace."** Except as explicit contrast (§8g).

---

## 11. CONFIDENTIALITY LINE — provider-facing

*(Established August 6.)*

**Sayable.** Patients see a center's price alongside other centers when they search. Price is one of the factors determining which center is surfaced first, along with proximity and accreditation.

**Not sayable.** Any weight, percentage, or ordering detail that would permit reconstruction of the ranking.

**Basis.** PBS Search presents contracted centers with Medicare-derived cash prices beside discovery centers — patient-visible, therefore public. The `rankProviders` weighting into a primary SmartMatch plus contenders is proprietary and stays internal.

---

## 12. REMAINING SEQUENCE

*Replaced 2026-08-07 (DOC-10). The claim-family sequence is superseded: the 4H-e survey showed the patient figure, $246M, tenure, satisfaction and grid structure colliding inside the same components, so the remaining work sequences **by page**, not by claim family.*

| # | Stage | Content | Shape |
|---|---|---|---|
| 1 | **4H-f archival** | ✅ **DONE** — `/search-results` and `ProviderSearchSection` archived (`5432aeb`) | Complete |
| 2 | **Architecture check** | ✅ **DONE** — `generateROIReport.ts` proven unreachable since `39d8c7a`. Closes #32 | Complete. Copy edits to that file stay parked |
| 3 | **Page-by-page rewrite** | **#22 / #24 / #27 merged.** $246M removal, the 38 retired patient instances, and the tenure cluster resolved together, one page at a time. Order by exposure: `/press-kit` (rebuilt on the documented record) → `/about` → `/` → `/provider` → `/employer` → `/employer/schedule` → `/employer/implementation-guide` → the single-instance routes | Two-pass per page. Survey is done; copy is approved inline before each page is edited |
| 4 | **Tenure cleanup** | Whatever the page-by-page pass does not reach — 17 instances, five notations, three categories (company life · career span · post-exit attestation) | Re-sweep; rules 17 and 22 |
| 5 | **robots.txt** | — | |
| 6 | **Final audit** | Full re-sweep of every barred and retired figure across `src/` and `public/`, plus a build-output sweep | Rule 22 |
| 7 | **Merge** | | |

**Stage 3 `/employer` is SCOPED AND READY.** *(Recorded 2026-08-08, DOC-12.)* Its survey input is the read-only Astro employer-funnel survey run at HEAD `1e61066`, recorded in `DECISIONS.md` 2026-08-08 — the figure collisions, the `$260` family count, and the client-email route findings are all in the register, so the pass is scoped **from the folder, not from conversation.** Three positioning decisions govern the rewrite: the guide is unlinked from the lead email, the calculator emits no prospective USRad dollar output, and the funnel no longer promises a custom ROI report. The EDS-owned items surfaced by the same survey are **not** in scope — they are #38, a handoff.

### Stage 3 `/employer` — approved batch sequence

*(Recorded 2026-08-09, DOC-15.)* Decisions D1–D13 are closed; see §8j. The apply work runs in this order:

| Batch | Content |
|---|---|
| **P2** | ✅ **DONE — DOC-15.** Documentation prerequisite: D1–D13 in the register, the Federal Reserve figure in `APPROVED-FIGURES` §5, this sequence |
| **A** | ✅ **DONE.** Component removals — `EmployerCaseExample` (D10), `IndustryData` (D11) |
| **B** and **C** | ✅ **DONE.** Conformance removals; credibility substitution (D1–D5, D7–D9) — `Implementation`, `ExecutiveFAQ`, `ROIStatPanel`, `DualSolution`, `FinalCTA`, `CredibilityBar`. Applied as rescoped by DOC-16 and extended by DOC-17: two components deleted, four survivors conformed, six accordions to four |
| **D** | ✅ **DONE.** Problem-statement rebuild (D5, D8) — `EmployerHero`, `CostAnalysis` |
| **E** | Calculator (D6, D13) — **MERGE GATE** |
| **F**, **G**, **H** | Guide landing page (D12) · `/employer/schedule` · `EmployerConsultationForm` |

> ⛔ **BATCH E IS A MERGE GATE.** Other batches may proceed on the branch while the EDS work is coordinated, but **Stage 3 is NOT closed and NOTHING merges to `main` until E is complete and verified.** Per D13, the calculator closes atomically: Workstream A may prepare the presentation changes, but the batch does not close until EDS removes or replaces the dependent pricing arithmetic and resolves the payload contract. `EmployerConsultationForm` follows the same rule.

**BATCH B/C IS RESCOPED — the "six components surviving intact" premise was wrong.** *(Recorded 2026-08-09, DOC-16.)* The B/C survey showed three of the six do not survive intact, so the batch is **two component removals plus conformance work on four survivors**:

| Shape | Components |
|---|---|
| **Removed entire** | `ROIStatPanel` (B1) · `CredibilityBar` (B4) |
| **Conformance on survivors** | `Implementation` · `DualSolution` · `FinalCTA` (B3 — tile grid, signature and H2) · `ExecutiveFAQ` (B2 — Q3 removed, six accordions become five) |

Standing rule 26 governs the survivors alongside D1–D9.

**Added to B/C scope after the survey and the Part 0 full-text read** *(DOC-16 B7 as amended, then DOC-17)*:

| Addition | Basis |
|---|---|
| `ExecutiveFAQ` **Q2 removed ENTIRE** — five of five bullets and its callout are barred | DOC-17. The B/C spec assumed it lost three of five and said keep the accordion. Same ruling as B2 for Q3 and B1 for `ROIStatPanel` |
| `ExecutiveFAQ` Q1 — **"Zero disruption to existing plans"** and **"No IT burden — we handle all technical requirements"** removed | Standing rule 26. Both sit in a component already being edited |
| `DualSolution` — Card 1 bullet 2 made explicitly historical; Card 2 body replaced; **framing line "The program is designed so that:" is load-bearing** and may not be removed as styling | DOC-17. Card 2's surviving bullets are permissible only as program design |

**SIX ACCORDIONS BECOME FOUR.** Q3 goes under B2, Q2 under DOC-17. **Q4 and Q6 remain** — Q6's prefunded-model explanation is the strongest correct content on the surface, though five of its and Q4's claims are **deferred, not approved**: see #47.

**No replacement accreditation wording is authorized in B/C.** #44 stays open and is blocked on Appendix B decision 3; the sitewide board-certification family is #46; neither is actioned outside B/C.

**`EmployerHero` and `CostAnalysis` belong to BATCH D, not B/C.** *(Clarified 2026-08-09.)* Both lose their central argument under **D5** and require **replacement copy**, which is batch D's purpose. **The approved sequence is unchanged**; this records which components sit in which batch. ⚠️ **This paragraph originally read that "B/C is conformance removal from components that survive intact" and listed all six as such — superseded by the rescope above, DOC-16.** The batch/component split it records is unaffected.

**Each batch runs the two-pass workflow** — copy approved inline before any file is opened.

**The `/employer` reconstruction runs in its existing Stage 3 page slot.** *(Recorded 2026-08-08, DOC-11.)* The pricing-figure work opened as #37 — the $350 flat rate, the $260–$475 network range and the $420 per-scan figure — is resolved during the `/employer` pass already sequenced in stage 3 above. **No 4H sub-batch is created for it.** Stage 3's per-page shape is unchanged: survey, then approved copy inline, then edit.

**Carried forward, unscheduled against the above:** 4F (network-map markers · TrustBar unattributed 1,200+ · two HIPAA survivors · credentialing timeline) · 4I (provider page resequencing, `provider.astro` only, run after the rewrite) · 3D (ROI PDF, 15 unaudited claims — **blocked**: the file is parked pending the flat-fee pricing rebuild) · 2 (positioning, re-read before running) · 5A/5B (much absorbed by 1H-e, 1H-f, 3C-calc).

---

## 13. IMMEDIATE HOUSEKEEPING

- [x] ~~Fill commit-log SHAs for commits 22–31 from `git log --oneline ec80d3f..21bd949`.~~ **DONE — DOC-10.** 24, 25–28, 30, 31 filled; 22 was read-only by design and 23 has no commit in that range.
- [ ] ~~Amend the `Co-Authored-By` trailer off `ab04ab1`. No prior commit carries it; free while unpushed.~~ **STRUCK — DOC-10 · FOUNDER.** The premise is stale: `ab04ab1` and the six most recent commits all carry the trailer, and all are pushed. Consistency now runs the other way — keep it. See `DECISIONS.md` 2026-08-07, *"CO-AUTHORED-BY TRAILER — KEEP IT."*
- [ ] Copy 4G before/after screenshots out of the session scratchpad to durable storage.
- [ ] Pull a fresh Vercel preview. `usrad-platform-4utvivnde` predates 4D-a (§5c).
- [ ] Push the branch — 1 commit ahead of origin.

---

## 14. WORKSTREAM B — deferred

- **AnciCare figures review — LARGELY CLOSED by the August 7 source discovery.** Most of what was deferred to Workstream B has now been settled on documentary evidence. Current status, per `DECISIONS.md` and `APPROVED-FIGURES.md` §4a–§4c:

| Figure | Status |
|---|---|
| **Paid to imaging centers → $60M+ (1994–2001)** | ✅ **DOCUMENT-VERIFIED.** Complete eight-year Form 1120S series, $60,479,583; 1998 and 1999 tied to the dollar to E&Y audited statements. **Replaces "over $150 million."** Site conformance is open item **#25** |
| **Contracted facilities → 1,228 / 1,200+** | ✅ **DOCUMENT-VERIFIED** three ways in the March 2002 board packet, April 2002. No longer founder-attested |
| ~~Patients served → 150,000+~~ | ⛔ **RETIRED 2026-08-07.** No document in the 36-source corpus counts people; every count is events. **Not replaceable in kind** — see §4c. Site reversal is open item **#24** |
| **$246M** client savings | ⛔ **BARRED** 2026-08-07 — arithmetic on 400,000 cases, already ruled an error. **No cumulative savings figure exists anywhere in the corpus.** Removal is open item #22 |
| **50–70%** cost reduction | ✅ **SUBSTANTIATED and ruled 2026-08-07 · FOUNDER** — moved out of Workstream B review. Four contemporaneous sources, three third-party published: founder letter Sept 1994 · Genesis Publishing Nov 1994 · Florida Trend Mar 2000 · CIM Feb 2000. **Canonical: "50% or more below the Florida workers' compensation fee schedule."** Use the 50%+ floor publicly — the 70% bound is from a confidential document |
| Tenure → **AnciCare 1994–2002** | ⬜ **outstanding** — the only substantive AnciCare item still open. Two claims: company window vs founder career span. See §4 of the figures register |
| **1999 revenue $13,159,059** | ✅ verified three ways — E&Y audited, Form 1120S, Corp Overview |
| **Per-scan economics $418–460 / $336–353** | ✅ document-verified, `Corp Overview 9-2000` p.16. New to the register |
| **Annual procedures 33,855 (2000) · 38,452 (2001)** | ✅ document-verified. **Never summed across years** — three incompatible metrics across the corpus |

- **Florida Trend** — Koller, Lynn. "The Image of Success." March 2000, p. 48. ✅ **NOW IN THE CORPUS** as `florida-trend-2000-03-p48.jpg` (added 2026-08-07); its contents are document-verified and independently corroborated by documents already held. Verifies: 1994 founding by Michael and Donna Cabrera as Managed Care Network Inc. renamed AnciCare PPO · 800 facilities, 145 in Florida, 40 states · CNA and Winn-Dixie as clients · $450–500 to the insurer against a typical ~$1,000 MRI, AnciCare taking ~$100 · $13M 1999 revenue, matching the audited $13,159,059 · startup capital ~$75,000 · 5–6% profit margins. ⛔ **Two figures in the article remain BARRED as projections: $18M, and "$60 million by 2002."** Peak documented gross receipts are $16,001,938 (2001). ⚠️ *"Profitable from the first year"* is an **attributed quote, not a verified fact** — E&Y shows a 1998 operating loss of $19,703.
- ~~The 800 (2000) and 1,200 (2013) network waypoints must be stated together, not left for a reader to reconcile.~~ **STRUCK 2026-08-07 · FOUNDER.** The 2013 waypoint is **not AnciCare** — the 2013 *Radiology Business* article concerned a separate venture the founder began and abandoned after standing-up costs exceeded expectation. AnciCare was sold in May 2002 per the Greenberg Traurig closing letter, so a 2013 AnciCare figure cannot exist. **CORRECTED PAIR, both document-verified:** *800 facilities / 145 in Florida / 40 states* (Florida Trend, March 2000) → *1,228 contracted facilities / 43 states* (Management packet, April 2002). State together as a trajectory, **each with its date**. See `DECISIONS.md` 2026-08-07.
- **Remaining for Workstream B:** the tenure split, and locating the 2002 final or short-year tax return (open item **#26**). Everything else in this section is now closed.
- The historical take rate (~$100 per scan on $450–500) is public in that article. A positioning decision, not a disclosure decision: a center owner can work out what the founder's last network charged and will reasonably ask what USRad charges.
- **Source register needed** for the market-size figures, with refresh triggers: KFF EHBS republishes each fall; the Commonwealth Fund biennial lands November 2026; CDC's HDHP definition changes for the 2026 plan year, which will move that figure for definitional reasons alone.

---

## 15. OTHER TRACKS

- **PSA:** §1.7 "Fully Funded Assignment" broadening for employer-prefunded work. **New Aug 6:** the single contracted rate across lanes is now hero-level copy. The PSA must state it explicitly rather than leave it implied by one `effective_medicare_percentage` row per facility.
- **BAA:** Exhibit C to PSA, single signature, DocuSeal envelope. Four open decisions with counsel.
- **Counsel:** `sms-terms.astro:187`.
- **Defect track:** "See Full Cost Analysis" button non-functional · PBS-SRCH-F-002 ranking comment drift (50/30/20 comment vs 45/30/25 code) · PBS-SRCH-F-003 real facility name in client payload.
- **Supabase:** `health_scans` vestigial column disposition.
- **Employer agreement set** (Track 4).

---

*Companion documents: Workstream A Scope of Work · USRad Verified Provider Standard v1.0 DRAFT · PSA v6.1→v7.0 Change Analysis · Demo Environment Advisor Status Report (July 9) · Demo Project Completion Report (July 10) · /provider and /employer audits · PBS Search Engineering Reference V4 (2026-Q3).*
