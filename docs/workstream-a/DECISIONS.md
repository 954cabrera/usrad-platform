# DECISIONS — Workstream A

**Append-only. Never rewrite a line. To reverse a decision, append a new one that supersedes it.**

Format: `DATE · DECISION · AUTHORITY`

One line per decision, not per action. Commits go in the tracker; this file answers "what did we decide, and when" when the scope and the tracker disagree.

---

## August 3, 2026

```
2026-08-03 · Workstream A opened. Corrective, not creative. Every addition
             measured against that sentence. · SCOPE preamble
2026-08-03 · Governing split adopted: SHIP (fix now) vs HOLD (remove the
             claim, do not replace with a placeholder). · SCOPE
2026-08-03 · Provider economics APPROVED: $225–$400 per-scan reimbursement ·
             $75 USRad fee · $300–$475 published price · 15–25 scans/month ·
             $3,400–$10,000 monthly add. · FOUNDER
2026-08-03 · "Per-scan reimbursement," never "net margin." USRad cannot know
             a center's net margin. · SCOPE standing rule 1
2026-08-03 · Plain MRI only. No "average across modality mix" anywhere. ·
             SCOPE standing rule 2
2026-08-03 · 15–25 scans/month is the SINGLE volume basis. No artifact may
             imply a different one. · SCOPE standing rule 3
2026-08-03 · Rate-setting copy confirmed ACCURATE, no change required.
             MarketScope strategy panel, FoundingPartners routing preference,
             HowItWorks "Set your pricing," ConsultationCTA "You Choose Your
             Rate." Market-varying rates are the model. · SCOPE §5.5
2026-08-03 · Workers' comp: availability claims removed; architecture
             retained with future-expansion label. · SCOPE §2.4
2026-08-03 · Employer funding-account amounts: none may be published. Concept
             without operational parameters. · SCOPE §5.4
2026-08-03 · Editorial standard: every public statement traces to documented
             history, implemented capability, executed agreement, or approved
             founder policy. Outlives Workstream A. · SCOPE
```

## August 5, 2026

```
2026-08-05 · Column rename wc_scans → total_scans executed in all three
             Supabase projects. No commit exists. · TRACKER §6
2026-08-05 · AnciCare figures retained at 168,000+ and 50–70% pending
             Workstream B. ⚠️ CONFLICTS WITH SCOPE §4.1, which directs
             150,000+ and "over $150 million." UNRESOLVED. · TRACKER §4
2026-08-05 · "Rate contradiction" recorded as an open item — that under one
             rate, price cannot be a routing input. ⚠️ ERROR. Contradicted
             SCOPE §5.5, decided two days earlier. See 2026-08-06 below. ·
             TRACKER §8d
```

## August 6, 2026

```
2026-08-06 · Rate contradiction STRUCK. Centers set their own percentage;
             price is a genuine routing input; "one rate" means one rate
             across funding lanes. Restores SCOPE §5.5. Second time this
             item has been mis-scoped. · FOUNDER + PBS Engineering Ref V4
2026-08-06 · Ranking weights are CONFIDENTIAL. Sayable: patients see a
             center's price alongside others; price is one factor with
             proximity and accreditation. Not sayable: any weight or
             ordering detail. · FOUNDER
2026-08-06 · Batch 4G committed (ab04ab1) — provider hero rewritten.
             ⚠️ EXCEEDS SCOPE §1.1, which authorized one line
             (HeroSection:61 pre-paid → pre-funded). Headline replacement,
             two new benefit cards, and the referrer-introduction argument
             are additions, not corrections. RECORDED AS EXCEPTION —
             awaiting founder ratification. · CLAUDE, unratified
2026-08-06 · "Cash-pay" barred: names the wrong counterparty. Replacement
             term UNRESOLVED — scope §3.1 says pre-funded, Aug 6 discussion
             says self-pay. Possible two-level reading: pre-funded =
             mechanism, self-pay = population. · PENDING FOUNDER
2026-08-06 · Exit-value valuation table (5–7x→7–9x, $5–7M→$7–9M) removed as
             unsourced projection. Underlying payor-mix insight retained,
             moved to founder voice. Section-level removal is a structural
             decision not covered by scope. · PENDING FOUNDER
2026-08-06 · No-show claim (<5% vs 15–20% industry) removed. Research shows
             MRI no-shows near 5%, not 15–20%; USRad has no operating data.
             · FOUNDER, with sources logged
2026-08-06 · Market-size figures approved for use with placement
             restriction: never in the same visual unit as a CTA. Derived
             headcounts barred. · FOUNDER
2026-08-06 · No flow diagram in the hero. AssignmentFlowDiagram already
             exists; a second requires deciding which model the page tells.
             · FOUNDER
2026-08-06 · Provider nav not modified. CarbonHeader.jsx is global across 49
             pages and synced to PBSHeader.tsx in the Remix app. · CLAUDE
2026-08-06 · No logo descriptor exists in the repo. Mockups invented it.
             Nothing to change. · CC verification
2026-08-06 · Batch 4E dissolved into 4H (same component). Batch 4C-R folded
             into 4H-b. PBS-SRCH-F-002 moved to defect track. · CLAUDE
2026-08-06 · Batch 4H REWRITTEN against scope. Original framing removed
             approved figures ($37,500, 15–25 scans, $5K–$10K) as unsourced.
             Scope §5.1 specifies CORRECTIONS to these, and 15–25 is an
             approved figure. Corrected framing: conform to approved values,
             remove only what has no approval. · FOUNDER caught the drift
2026-08-06 · Standing rule 16 added: before removing any figure, check
             APPROVED-FIGURES.md. If an approved value exists, conform to it.
             Removal is correct only when nothing is approved. · CLAUDE
2026-08-06 · SCOPE.md, TRACKER.md, APPROVED-FIGURES.md, and DECISIONS.md to
             be committed to docs/workstream-a/ and added to project
             knowledge. Root cause of the 4H drift was the scope living
             outside every context that governs work against it. · FOUNDER
2026-08-06 · Provider hero (4G, ab04ab1) RATIFIED. Supersedes SCOPE §1.1,
             which authorized one line. · FOUNDER
2026-08-06 · Batch 4I (resequencing) WITHDRAWN. TrustBar, ProvenSuccess,
             ProviderSpineNav, NetworkBuilding, MarketOpportunityTeaser are
             all on the Repositioning v2 leave-as-written list. · CLAUDE            
2026-08-06 · D5 RETAINED. Cash-pay remains a commercial lane;
             employer-funded is the primary commercial target; pre-funded
             is the platform identity. Addendum B §1.6/§1.7 substitutions
             stand (headers and footers only). · FOUNDER + ADVISOR
2026-08-06 · CLARIFICATION: "Cash-pay" refers to a commercial LANE, not
             the payment conduit. USRad remains the exclusive payment
             conduit for all assignments regardless of funding source.
             Basis: PSA Article IV / Exhibit A — Provider looks solely to
             USRad for payment. · FOUNDER + ADVISOR
2026-08-06 · Claude's proposal to bar "cash-pay" sitewide is OVERRULED.
             Market vocabulary follows provider categories; legal
             architecture defines payment mechanics. The two need not
             match. · FOUNDER + ADVISOR
2026-08-06 · PRINCIPLE: Internal language describes how USRad operates.
             External language describes the world the customer already
             understands. Engineering says funding authority; the PSA says
             assignment types and payment conduits; providers say cash-pay
             and payor mix. Keeping these distinct makes the system
             clearer, not less consistent. · ADVISOR
2026-08-06 · ExitValueSection REMOVED. No EBITDA multiples, no valuation
             table, no enterprise value projections anywhere on the
             provider surface. Underlying insight retained for later
             reintroduction as founder experience. The provider page
             answers "should I participate," not "how should I sell my
             business." · FOUNDER + ADVISOR
2026-08-06 · AnciCare figures RESOLVED to Addendum B §1.9: 150,000+
             patients, over $150 million provider volume, AnciCare
             1994–2002. The Aug 5 tracker note retaining 168,000+ and
             $160M+ was drift, not a decision. · FOUNDER
2026-08-06 · Phone number RESOLVED to (866) USRad24 per Addendum B §2.8
             and SCOPE §3.6. Tracker "unverified" note is stale. · FOUNDER
2026-08-06 · Batch 4H-b STOPPED at survey. The five-target list from
             Addendum B §1.9 was incomplete — 35 additional live src/
             instances found. Standing rule "re-sweep, never work from
             an existing list" held. · CC
2026-08-06 · docs/marketing/CLAIMS-INVENTORY.md surfaced (generated
             2026-07-30, 495 files scanned). Pre-existing and not
             previously referenced in workstream-a. It is the worklist
             for all figure conformance. Do not build fresh sweeps
             where it already inventories the cluster. · CC
2026-08-06 · "400,000+ patients" is an ERROR. Not a rounding, not a
             different unit, not a different population. To be REMOVED
             wherever it appears, not conformed to 150,000+. Live at
             ProviderSearchSection.jsx:701 ("400K+") and :852
             ("400,000+") on /search-results; orphaned at
             FoundersSection.astro:67. Cluster C1. · FOUNDER
2026-08-06 · OPEN: "$400 Million+ in healthcare savings"
             (FoundersSection.astro:17, orphaned) is a DISTINCT claim
             from the 400,000+ patient count — different unit, not
             covered by the removal decision above. Requires its own
             ruling. · CLAUDE
2026-08-06 · OPEN: CLAIMS-INVENTORY cluster C1 records THREE live
             values for AnciCare patients served on /about alone —
             168,244 (:279), 168,224 (:883, :965), 168,000 (:137,
             :234). The 244/224 transposition is a distinct defect
             from the rounding. Not in the Addendum B §1.9 target
             list. · CLAUDE
2026-08-06 · OPEN: cluster C2 records four live values for AnciCare
             volume/savings — $246M, $180M+, $160M+, and $400M+
             (orphaned) — across different framings ("patient
             savings" vs "volume delivered"). Addendum B §1.9
             approved "over $150 million in provider volume," which
             may not be the same claim as "$246 million in patient
             savings." Requires founder ruling before conformance. ·
             CLAUDE
2026-08-06 · CLAIMS-INVENTORY.md line numbers have DRIFTED since
             2026-07-30 — 168,224 cited at about.astro:882/:964,
             actually at :883/:965. It also cites a ProofSection.astro
             that does not exist in the repo. Use it as a worklist for
             WHICH claims and WHICH clusters; locate every target by
             content and report the actual line. · CC
2026-08-06 · CLUSTER C2 RESOLVED — TWO DISTINCT CLAIMS, not one.
             (a) PROVIDER VOLUME: dollars routed to imaging centers.
             Approved value "over $150 million," rounded down from
             $180M per Addendum B §1.9. $180M+ and $160M+ instances
             conform to this.
             (b) CLIENT SAVINGS: dollars AnciCare saved its workers'
             comp carrier clients against hospital-billed
             alternatives. $246 million. STAYS AS-IS.
             These are different quantities on opposite sides of the
             transaction and are simultaneously true. $246M must NEVER
             be conformed to $150M. Any future sweep treating them as
             one figure is in error. · FOUNDER
2026-08-06 · "Verified results" label REMOVED wherever it accompanies
             the provider volume figure. Nothing on the site
             establishes what verified means or who verified it; the
             figure is founder-attested. Known instance:
             ProvenSuccess.astro sub-line under the volume tile. Sweep
             for others. · FOUNDER
2026-08-06 · OPEN: FoundersSection.astro is orphaned (imported by no
             live page) and holds BOTH remaining suspect claims —
             400K+ patients at :67 and $400 Million+ savings at :17.
             Deleting the component may be cleaner than editing two
             claims in a file nothing renders. Requires founder
             ruling. · CLAUDE
2026-08-06 · ROW #10 RESOLVED. The AnciCare patient count was ALWAYS
             AN ESTIMATE. 168,244 and 168,224 are false precision —
             six significant figures on a number never counted. The
             244/224 transposition is two typos of an approximation,
             not a data discrepancy. This strengthens the approved
             150,000+ : an estimate stated as a round number with a
             plus sign is defensible at a precision the six-figure
             versions never were. · FOUNDER
2026-08-06 · CITATION DRIFT, second consecutive batch. The $246M
             location list supplied to CC was wrong in five of six
             line numbers and short by eight instances — including
             four on /press-kit, a live route, and two that a grep
             for "$246 million" missed because the figure wraps
             across lines. Standing rule reaffirmed: locate by
             content, report the actual line, and never treat a
             supplied list as complete. · CC
2026-08-06 · $246M BENEFICIARY CONFIRMED: savings to AnciCare's
             WORKERS' COMP CARRIER CLIENTS, not to patients. Live
             copy at SocialProofBar.astro and AboutSection.astro
             labels it "patient savings" — WRONG BENEFICIARY, same
             error class C2 exists to prevent. The figure is
             approved; the framing is not. Copy correction required.
             · FOUNDER
2026-08-06 · "Verified savings" at about.astro:717 — same objection
             as "Verified results" on the volume figure. Nothing
             establishes what verified means or who verified it, and
             the figure is an estimate. Remove the word; the figure
             stays. · FOUNDER
2026-08-06 · FoundersSection.astro ARCHIVED. Orphaned (imported by
             no live page) and held both remaining suspect claims:
             400K+ patients at :67, ruled an error, and $400
             Million+ savings at :17, which appears nowhere else on
             the site and has no basis. Archiving closes #9 and #12
             together. Moved to archived-api/ per the existing
             archive precedent — no rename, history preserved, out
             of scope for all future sweeps. · FOUNDER
2026-08-06 · SUPERSEDES the FoundersSection entry immediately above,
             which named only two of five claims and described the
             move as matching archive precedent on suffix
             convention. It does not. · CC
2026-08-06 · FoundersSection.astro ARCHIVED. Orphaned (zero imports,
             confirmed by grep). Held FIVE unsupported claims, not
             two: $400 Million+ healthcare savings (:17), 1,236%
             Growth Achieved (:35), $400M+ Value Created (:39), 400K+
             Patients Served (:67, ruled an error), 99.8% Satisfaction
             Rate (:71). Archiving moots all five in this file and
             closes #9 and #12. Moved to archived-api/ with no
             suffix — note this DIFFERS from the existing convention,
             where all 15 archived files carry .bak or .OLD. ·
             FOUNDER
2026-08-06 · ARCHIVING DID NOT CLOSE 1,236% OR 99.8%. Both survive
             on live routes: 1,236% at about.astro:1148; 99.8% at
             about.astro:1210, contact.astro:51, and
             ContactHero.astro:176. 99.8% is the same defect class
             as the barred 92% satisfaction figure — no instrument,
             no N. Neither has a basis. OPEN. · CC
2026-08-06 · FounderCard.astro is newly orphaned by this move — it
             was imported only by FoundersSection. Disposition
             open; harmless where it sits. · CC
2026-08-06 · OPEN: THIRD satisfaction-rate variant found.
             ExecutiveFAQ.astro:126 reads "98% satisfaction across
             150,000+ imaging services." Same defect class as the
             barred 92% (no instrument, no N) and the 99.8% opened
             as #16. Three different satisfaction figures live, none
             with a source. · CC
2026-08-06 · STANDING RULE 17: sweep for ABBREVIATED and FORMATTED
             variants, not only the canonical form. 168K / 168K+ are
             the same claim as 168,000+ and were missed by a pattern
             matching comma-formatted variants only. Applies to every
             figure — 1.2K, $150M vs $150 million, 1,200 vs 1.2K.
             Found by the PDF render, not the sweep. · CC
2026-08-06 · STANDING RULE 18: notation is conformed along with
             value. Approved figures publish in ONE notation
             sitewide. No abbreviated forms. · FOUNDER
2026-08-06 · ROI PDF footer shows (888) USRad24 against the resolved
             (866). generateROIReport.ts:1431. Confirmed present in
             a generated PDF this session. Belongs to the next
             cluster. · CC
2026-08-06 · CLUSTER C1 CLOSED. 38 instances across 20 files
             conformed to 150,000+. Six notations eliminated:
             168,000 · 168,000+ · 168,224 · 168,244 · 168K · 168K+.
             Verified by dual-pattern re-sweep, build exit 0, direct
             PDF generation, JSON-LD parse, and screenshots at 1440
             and 390. · FOUNDER
```

## August 7, 2026

```
2026-08-07 · HISTORICAL EVIDENCE STANDARD ADOPTED. Historical
             quantitative claims publish only when supported by a
             contemporaneous source or a clearly defensible primary
             record. Founder recollection may support QUALITATIVE
             history; it does not, by itself, authorise newly
             DERIVED quantitative claims.
             This standard would have prevented every figure removed
             in this workstream: 400,000 cases · 168,000 / 168,224 /
             168,244 · $246M · $95M · $151M · 3.2M work days · and
             the proposed 40,000/year. Each was arithmetic on
             recollection.
             Also to be recorded in README.md alongside THE RULE and
             THE LANGUAGE PRINCIPLE. · FOUNDER + ADVISOR
2026-08-07 · CLUSTER C2a CLOSED. Provider volume conformed to the
             approved value. Batch 4H-c2, commit e1a6119 — 16
             changes across 12 files. Five notations eliminated:
             $180M · $180M+ · $180+ Million · $160M · $160M+.
             "Verified results" label removed from
             ProvenSuccess.astro. ROI PDF phone corrected to (866).
             Verified by re-sweep, build exit 0, direct PDF
             generation, and screenshots. · FOUNDER
2026-08-07 · BATCH 4H-d CLOSED. Every tel: href on the marketing
             surface normalised to tel:1-866-877-2324. Commit
             8a577a1 — 17 changes across 12 files. Three links
             displayed "USRad-24" while dialling a different number;
             eight used alphanumeric tel: URIs which are not valid
             RFC 3966; two live routes advertised placeholder
             numbers USRad does not own, one of them the page a
             provider reaches immediately after signing a PSA. ·
             FOUNDER
2026-08-07 · #19 RESOLVED. ROI PDF phone reads (866) USRad24 at
             generateROIReport.ts:1431, corrected in e1a6119 and
             confirmed in a generated PDF. · CC
2026-08-07 · STANDING RULE 18 AMENDED — canonical and compact forms.
             Each approved figure has ONE canonical prose form and
             ONE approved compact display form. Both are named
             explicitly in APPROVED-FIGURES.md. No third form.
             Provider volume — canonical "over $150 million" ·
             compact "$150M+"
             Patient count — canonical "more than 150,000
             patients" · compact "150,000+"
             COMPACT IS PERMITTED IN: stat tiles, charts, badges,
             and similarly constrained UI.
             NARRATIVE PROSE USES CANONICAL.
             This supersedes the 2026-08-06 formulation, which
             demanded one literal notation everywhere and thereby
             made natural prose ("more than 150,000 patients") a
             technical violation. It is controlled typography, not
             inconsistency. · FOUNDER + ADVISOR
2026-08-07 · D6 DISSOLVED, not excepted. The three bare-150,000
             instances are correct under the amended rule 18:
             contact.astro:709 and press-kit.html:220 are canonical
             prose form; about.astro:883 is a headline noun phrase
             where the compact form's plus adds noise. No carve-out
             required. · FOUNDER
2026-08-07 · TENURE CLUSTER IS NOT HOMOGENEOUS. Two distinct claims:
             (a) COMPANY OPERATING WINDOW — "30 Years" in stat tiles
                 and headings beside AnciCare figures. Conforms to
                 "AnciCare 1994–2002" per Addendum B §1.9.
                 "30 Years of AnciCare Success" incorrectly expands
                 an eight-year company history.
             (b) FOUNDER CAREER SPAN — first-person or signed
                 statements. EVALUATED SEPARATELY, not automatically
                 conformed. AnciCare ran eight years; the founder's
                 career is longer. "I've spent more than thirty
                 years building systems" is biographical and is a
                 different claim.
             Known (b): AnciCareStory:306 (signed pull-quote),
             co-founder-d:401, blog/the-scan-that-never-happens:339.
             TEST: first person or signed attribution → do not
             conform. Do not force them into one figure because a
             grep matched the same words. · FOUNDER + ADVISOR
2026-08-07 · ⚠️ $246 MILLION REVERSED — BARRED PENDING A PRIMARY
             SOURCE. This SUPERSEDES the 2026-08-06 entries
             approving it as client savings and the do-not-conform
             warning attached to it.
             BASIS: the founder located the source analysis. $246M
             is not a documented result. It is arithmetic built on
             400,000 CASES — a figure this register already rules AN
             ERROR (2026-08-06). The source computes $226M medical
             and $359M indemnity savings, each as 400,000 × an
             assumed per-case value, for $585M total. The site's
             $246M and its $95M / $151M decomposition are scaled
             variants of the same calculation. The multiplicand is
             void, so every figure derived from it is void.
             The indemnity half additionally rests on an ESTIMATED
             $170 average daily wage, an 8-day saving derived from
             two attested ranges, and an assumption that every
             claimant was out of work. It cannot be rebuilt at any
             case count.
             That $246M appeared in prior marketing material
             establishes that the company USED the claim, not that
             the claim was SUBSTANTIATED.
             REMOVE sitewide. Do not reword. Do not label
             "estimated." Do not rescale to 150,000.
             CONDITIONAL: reversible by a later dated entry if a
             contemporaneous primary source supporting the
             calculation is located. · FOUNDER + ADVISOR
2026-08-07 · ALSO BARRED, same 400,000 base: $95M medical savings ·
             $151M productivity saved · 3.2M work days · $585M
             total · $544M productivity. Live at about.astro:927
             and :946-949. Closes D7 by removal rather than
             definition.
             The decomposition is not merely added precision — it
             CHANGES WHAT SAVINGS MEANS. The approved definition was
             savings against hospital-billed alternatives;
             productivity saved and work-days recovered are a
             materially different claim. · FOUNDER + ADVISOR
2026-08-07 · ~40,000 MRIs PER YEAR — CONSIDERED AND DECLINED.
             Derived from ~$20M final-year revenue ÷ ~$500 average
             per scan. Both inputs are founder recollection.
             DO NOT PUBLISH. Disclosing the arithmetic does not
             improve the underlying evidence; it only makes the
             derivation visible. And an approved figure loses its
             explanatory framing on the third rewrite — which is
             precisely how 400,000 became 168,000 became 168,224.
             Useful as internal context. Not a public claim.
             Recorded so it is not proposed again. · FOUNDER +
             ADVISOR
2026-08-07 · WHAT REPLACES $246M. Three better-sourced claims:
             (a) PRICING SPREAD — Florida Trend (March 2000, p.48)
                 documents a market MRI near $1,000 against
                 AnciCare's $450–500 to the carrier. A RATE, not a
                 total — no case-count dependency.
             (b) NAMED CLIENTS — CNA and Winn-Dixie, same source,
                 third-party reported.
             (c) TRAJECTORY — 800 facilities / 40 states (March
                 2000) and 1,200 at the CorVel sale (2013). Both
                 document-verified; state together.
             The indemnity story may be told as NARRATIVE without a
             figure: faster imaging shortens the claim. "Two weeks
             down to two or three days" is qualitative history and
             is permitted under the evidence standard.
             These get STRONGER as the questionable figures come
             out. Founded 1994 · reached 1,200+ centers · major
             national payors used it · MRI economics far below
             prevailing rates · acquired by CorVel. That is the
             proof. · FOUNDER + ADVISOR
2026-08-07 · #13 and #14 SUPERSEDED by the $246M reversal. The
             "patient savings" beneficiary question and the
             "verified savings" wording both attach to a figure now
             being removed. about.astro:49 likewise. Reframing is
             moot; removal replaces it. · CC
2026-08-07 · OUT-OF-SCOPE RESIDUE from 4H-d: four live src/ files
             carry non-approved tel: values —
             FacilityManager.jsx:500, dashboard/contract/
             terms.astro:531, project.html:1197, and
             CenterCard.jsx:121 (dynamic, correct). All behind-login
             or dead-route surfaces. The 4H-d commit message's
             "every tel: href" is true of the marketing surface, not
             of src/ as a whole. Belongs to repo hygiene. · CC
2026-08-07 · STANDING RULE 19: the historical evidence standard is
             a standing rule, not only a figure test. Historical
             quantitative claims publish only when supported by a
             contemporaneous source or a defensible primary record.
             Founder recollection supports qualitative history; it
             does not authorise derived quantitative claims.
             Numbered here so TRACKER §7 can carry it with the
             others. · FOUNDER + ADVISOR
```

---

## Open decisions awaiting founder

| # | Decision | Blocks |
|---|---|---|
| 6 | 96% patient show rate: source or remove | 4H-c |
| 8 | Market-size section — in scope only if it serves §4.3 mission-statement fix | Placement |
| 15 | 1,236% Growth Achieved — `about.astro:1148` | no basis |
| 16 | 99.8% Satisfaction/Resolution Rate — `about:1210`, `contact:51`, `ContactHero:176` | same class as barred 92% |
| 17 | `FounderCard.astro` newly orphaned — archive or leave? | low priority |
| 18 | Satisfaction rate — 92% / 98% / 99.8%, no source for any | three variants |
| 22 | $246M removal — /about and homepage need section rewrites, not find-and-replace | two-pass batch |

## Resolved — August 6–7, 2026

Original numbering retained. Resolutions are recorded as dated entries in the
register above; this table is the index, not the authority. A row here can itself
be superseded by a later dated entry — see #11.

| # | Decision | Resolution |
|---|---|---|
| ~~1~~ | ~~Ratify or reverse the 4G scope exception~~ | **RATIFIED.** Supersedes SCOPE §1.1 · FOUNDER |
| ~~2~~ | ~~Cash-pay replacement: pre-funded, self-pay, or both at different levels~~ | **D5 RETAINED.** Cash-pay is a lane; pre-funded is the identity; employer-funded is the primary target · FOUNDER + ADVISOR |
| ~~3~~ | ~~AnciCare figures: scope's 150,000+ / $150M, or tracker's 168,000+ / $160M~~ | **Addendum B §1.9.** 150,000+ patients, over $150 million, AnciCare 1994–2002 · FOUNDER |
| ~~4~~ | ~~ExitValueSection: correct in place, or remove the section~~ | **REMOVED.** Valuation projections barred on the provider surface · FOUNDER + ADVISOR |
| ~~5~~ | ~~Phone number: (866) per scope, or (888) as currently published~~ | **(866) USRad24** per Addendum B §2.8 and SCOPE §3.6 · FOUNDER |
| ~~7~~ | ~~Provider page resequencing (4I) — not corrective; in or out of Workstream A~~ | **WITHDRAWN.** Components are on the Repositioning v2 leave-as-written list · CLAUDE |
| ~~10~~ | ~~/about three-value spread — 168,244 / 168,224 / 168,000~~ | **ALWAYS AN ESTIMATE.** Six-figure variants are false precision; 150,000+ stands · FOUNDER |
| ~~9~~ | ~~$400 Million+ savings claim (orphaned) — remove or retain?~~ | **ARCHIVED with the component.** $400 Million+ has no basis and appears nowhere else · FOUNDER |
| ~~11~~ | ~~$246M patient savings vs $150M provider volume — same claim or two?~~ | **TWO DISTINCT CLAIMS.** Provider volume conforms to over $150M; $246M client savings stands · FOUNDER — ⚠️ **the $246M half is SUPERSEDED 2026-08-07: reversed and barred pending a primary source.** The two-distinct-claims finding stands; the approval it carried does not |
| ~~12~~ | ~~`FoundersSection.astro` — delete component or edit the two claims?~~ | **ARCHIVE, do not edit.** `git mv` to `archived-api/` · FOUNDER |
| ~~13~~ | ~~"Patient savings" → carrier framing — `SocialProofBar:27`, `AboutSection:15`~~ | **SUPERSEDED 2026-08-07 by the $246M reversal.** The beneficiary question attaches to a figure now barred; removal replaces reframing. `about.astro:49` likewise · CC |
| ~~14~~ | ~~"Verified savings" — `about.astro:717`~~ | **SUPERSEDED 2026-08-07 by the $246M reversal.** The wording attaches to a figure now barred; removal replaces reframing · CC |
| ~~19~~ | ~~ROI PDF phone (888) vs resolved (866)~~ | **RESOLVED.** `generateROIReport.ts:1431` reads (866) USRad24, corrected in `e1a6119` and confirmed in a generated PDF · CC |
