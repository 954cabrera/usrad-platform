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

## August 7, 2026 — AnciCare source discovery

```
2026-08-07 · SOURCE CORPUS ESTABLISHED. 36 contemporaneous
             documents located: 27 in the first tranche (457pp) and
             9 federal tax returns. Every one created 1994–2002.
             Zero later reconstructions. Many carry Bates stamps
             from a legal discovery production.
             STORED OUTSIDE THE REPOSITORY at
             ~/Documents/ancicare/business_proofs — they contain
             federal tax filings and shareholder schedules.
             docs/ancicare_proof/ is gitignored permanently as a
             guard against recreation. The register cites them by
             filename, date, page and figure. The documents
             themselves are never committed. · FOUNDER + ADVISOR
2026-08-07 · ⚠️ 1,200+ CONTRACTED FACILITIES — SUBSTANTIATED.
             March 2002 Management Meeting packet, three
             independent statements in one document:
             p.3 narrative — "Number of contracted facilities=1228"
             p.13 table stamped 4/16/02 — 43 states, Current
                  column sums EXACTLY to 1,228
             p.50 — "1,228 Contracted Providers" = 1,093 MRI/CT/BS
                  + 135 EMG/NCV
             Dated 30 days before the 16 May 2002 asset purchase
             agreement. Contemporaneous primary evidence.
             CANONICAL: "1,228 contracted imaging facilities in 43
             states, April 2002." COMPACT: "1,200+ centers."
             The register's prior approval was founder-attested; it
             is now documented, and the documented figure is
             stronger than the rounded one. · FOUNDER
2026-08-07 · DISTINCTION THE DOCUMENTS DRAW: "contracted
             facilities" (1,228, Apr 2002) is not "participating
             centers" (664, Oct 1999 — those that actually received
             referrals in the period). Not interchangeable. Copy
             must not blur them. · CC
2026-08-07 · ⚠️ "OVER $150 MILLION PROVIDER VOLUME" — RETIRED AND
             REPLACED. Contradicted by a complete, unbroken
             eight-year series of federal Form 1120S filings, one
             EIN (65-0475972):
               1994    $716,689      1998  $8,838,533
               1995  $3,300,768      1999 $10,375,038
               1996  $5,519,378      2000 $11,717,897
               1997  $7,747,148      2001 $12,264,132
               TOTAL $60,479,583
             1998 and 1999 corroborated to the dollar by E&Y
             audited statements. The 1996 return's Statement 2
             labels this line, in the taxpayer's own words,
             "MEDICAL CENTER COSTS."
             APPROVED REPLACEMENT —
             CANONICAL: "More than $60 million paid to imaging
             centers from 1994 through 2001"
             COMPACT: "$60M+ paid to imaging centers"
             Say PAID TO IMAGING CENTERS, not "provider volume."
             The former is what the filings show and is plainer to
             read.
             This cumulative figure IS permitted under the evidence
             standard: complete series, one metric, one source
             class, no interpolation.
             DO NOT add the 2002 YTD $2,659,545.60 — different
             source class, three months only. The eight-year tax
             series stands alone. · FOUNDER + ADVISOR
2026-08-07 · ⚠️ "150,000+ PATIENTS" — RETIRED. NOT REPLACED IN
             KIND. No document in 36 sources counts PEOPLE. Every
             count across the corpus is EVENTS — referrals,
             procedures, orders, files. No patient identifier, no
             de-duplication statement, no studies-per-patient
             ratio. A person with an MRI and a follow-up CT appears
             twice in every table and nothing permits collapsing
             that. E&Y's revenue note confirms the accounting spine
             is per-service: "Service revenue is recognized on the
             date the medical imaging service is performed."
             This is a HARDER LIMIT than missing years: complete
             1994–2002 coverage of these same reports would still
             not yield a patient count. The records were never kept
             that way.
             DO NOT substitute a procedure count into the same
             slot. That invites the reader to treat them as
             equivalent. Decide what each component is proving:
               network scale → 1,228 contracted facilities
               throughput → a documented annual procedure count,
                 CALLED PROCEDURES
               neither → remove the stat
             NEVER convert procedures, referrals, orders or files
             into patients. · FOUNDER + ADVISOR
2026-08-07 · APPROVED — DOCUMENTED ANNUAL PROCEDURE COUNTS. March
             2002 Management packet p.7, "Procedures (Net)" —
             modality counts less cancellations, twelve months each:
               2000  33,855        2001  38,452
               2002 Jan–Mar 8,396 (PARTIAL — do not annualize)
             Use only where THROUGHPUT is the subject. Always the
             word "procedures." Never summed across years — three
             different metrics are in play across the corpus
             ("Volume" 1996–99, "Procedures (Net)" 2000–02,
             "Referrals") and they disagree where periods overlap.
             · FOUNDER
2026-08-07 · METRICS CANNOT BE SUMMED ACROSS THE CORPUS.
             1996–99 "Volume" (modality counts, cancellation
             treatment unstated) · 2000–02 "Procedures (Net)" (net
             of cancellations, includes EMG/NCV) · 1999 and 2001
             "Referrals" (Q1–Q3 only). Q1–Q3 2001 shows 27,931
             referrals against 29,603 Net Procedures for the same
             nine months. 1994 and 1995 have no activity count at
             all. No lifetime activity total is constructible. · CC
2026-08-07 · NO CUMULATIVE SAVINGS FIGURE EXISTS. Across 36
             documents and ~500 pages, AnciCare never computed one.
             Savings were reported per client, per month, to
             adjusters. Eight years of filings, audited statements,
             banker memoranda, board packs and press coverage never
             roll them up. This is independent confirmation of the
             $246M reversal: the claim has no counterpart in the
             operating record. · CC
2026-08-07 · 400,000 — PROBABLE ORIGIN IDENTIFIED. Two documents
             state that ALL U.S. diagnostic imaging centers
             performed ~510,000 / 510,571 procedures PER WEEK
             (Corp Overview 9-2000; CIM Feb 2000). An industry-wide
             denominator sitting pages away from AnciCare's own
             volume tables in the same decks. Recorded so the error
             is not repeated from the same source. · CC
2026-08-07 · $18M BARRING FURTHER CORROBORATED. Peak documented
             gross receipts are $16,001,938 (2001). The company
             never reached $18M in any filed year. The 1999 PPM's
             "18.3" sits in a column headed est. · CC
2026-08-07 · NEWLY DOCUMENT-VERIFIED, available for use:
             (a) Founded 3 January 1994 — founder letter 23 Sep
                 1994; date of incorporation on all nine returns
             (b) Donna Cabrera co-founder — same letter, "my wife
                 and I"
             (c) Acquired by CorVel — Asset Purchase Agreement
                 among CorVel Corporation, Corvel Healthcare
                 Corporation, AnciCare PPO Inc. and Michael and
                 Donna Cabrera, dated 16 May 2002. Greenberg
                 Traurig closing letter 31 July 2002
             (d) 50%+ savings vs the Florida WC fee schedule —
                 founder letter Sept 1994 and Genesis Publishing
                 trade article Nov 1994; "up to 70%" per CIM Feb
                 2000
             (e) 90% of referrals scheduled within two to three
                 days — South Florida Business Journal, 5 Feb 1999,
                 third-party published
             (f) Named clients — Winn-Dixie (1994 letter), CNA
                 (Corp Overview 2000), plus ~40 others including
                 Liberty Mutual, Zurich American, USF&G, Crawford &
                 Company, Gallagher & Bassett, USPS
             (g) Inc. 500 rank #210 (1999) — Inc. letter and
                 certificate
             (h) Per-scan economics — $418–460 billed, $336–353
                 paid to the center (Corp Overview p.16)
             (i) 818 centers / 38 states (Sept 2000); 783 (Feb
                 2000); 608 / 33 states (Feb 1999)
             ⚠️ Corp Overview, CIM, valuation and partner tables are
             marked CONFIDENTIAL. CNA is confirmed only by a
             confidential document. Public confirmation for named
             clients comes from the trade articles. · FOUNDER
2026-08-07 · STANDING RULE 20: read scanned documents VISUALLY, not
             via OCR text layer. The 1,228 figure was missed on a
             first pass because page 3 renders as "facilities^ 228"
             — leading digit lost to a stray character — and the
             state table extracts as unheaded bare integers. Nine
             tax returns had ZERO text layer. Use the text layer
             only to locate candidate pages; read figures from
             rendered images; write ILLEGIBLE rather than guess. ·
             CC
2026-08-07 · UNRECONCILED, recorded not resolved:
             (a) 1998 revenue — E&Y audited $11,005,691 vs tax 1c
                 $10,822,115. Difference $183,576, identical on the
                 gross-profit line, with COGS matching to the
                 dollar. Entire variance sits on revenue.
             (b) 1999 activity — Corp Overview 30,760 vs Referral
                 Patterns 23,494 (Q1–Q3) vs the Mar 2002 table's
                 prior-year MRI implying 25,514. Three figures.
                 A $1.3M revenue reallocation across four prior
                 years is documented in the 3Q2001 report.
             (c) Referral Patterns internal conflict — 23,482 (p.1)
                 vs 23,494 (pp.2–3); FL 19,247 vs 19,219.
             None is marketing-relevant; all are recorded so nobody
             reconciles them from memory later. · CC
2026-08-07 · GAPS IN THE RECORD: no 2002 tax return of any kind —
             no full-year, short-year, or final — and no return in
             the folder has "Final return" checked. Given the May
             2002 sale, a final or short-year return should exist;
             the Greenberg Traurig closing binder may reference it.
             1996 page 1 is missing, so 1996 gross receipts and
             gross profit are undocumented in the tax set. · CC
2026-08-07 · CONSEQUENCE FOR THE SITE: two conformances completed
             2026-08-06 must now be redone. Batch 4H-c1 conformed
             38 instances to "150,000+ patients" — RETIRED. Batch
             4H-c2 conformed 16 changes to "over $150 million" —
             REPLACED. Both were correct against the register as it
             stood; the evidence changed. Opens #24 and #25. ·
             FOUNDER
2026-08-07 · CORPUS NOW 38 DOCUMENTS. Two previously cited but
             unfiled sources have been added to
             ~/Documents/ancicare/business_proofs and read:
             (a) Greenberg Traurig closing letter, Arthur L.
                 Gallagher, 31 July 2002, to Michael and Donna
                 Cabrera. Subject line reads: "Asset Purchase
                 Agreement among CorVel Corporation, Corvel
                 Healthcare Corporation, AnciCare PPO, Inc. and
                 Michael and Donna Cabrera, dated as of May 16,
                 2002." Transmits two bound sets of executed
                 closing documents. cc: Ira N. Rosner.
                 → The CorVel acquisition is DOCUMENT-VERIFIED.
             (b) Koller, Lynn. "The Image of Success." Florida
                 Trend, March 2000, p.48.
                 → Its contents are DOCUMENT-VERIFIED, and are
                 additionally corroborated by documents already in
                 the corpus.
             Neither is committed to git. · FOUNDER
2026-08-07 · FLORIDA TREND — CONFIRMED CONTENTS. Founded 1994 by
             Michael and Donna Cabrera as Managed Care Network
             Inc., renamed AnciCare PPO · 800 imaging facilities,
             145 in Florida, in 40 states · CNA and Winn-Dixie
             named as clients · a typical MRI with interpretation
             around $1,000 against AnciCare's $450–500 to the
             insurance company · AnciCare takes about $100 from
             that fee · $13 million in 1999 revenues, matching the
             audited $13,159,059.
             NEW, not previously recorded: startup capital about
             $75,000 from family and friends · home office six
             months, then 1,300 sq ft with five employees, then
             6,000 sq ft with 40 employees in 1998 · profit
             margins in the 5–6% range. · FOUNDER
2026-08-07 · ⚠️ TWO DIFFERENT $60 MILLION FIGURES EXIST. They will
             be conflated unless this is stated explicitly.
             (a) BARRED — "$60 million by 2002" is a REVENUE
                 PROJECTION made in March 2000. Florida Trend p.48:
                 "By 2002, he expects a whopping $60 million."
                 Same class as the barred $18M projection, from the
                 same paragraph of the same article. Actual peak
                 documented gross receipts were $16,001,938 (2001).
                 The company never approached $60M in revenue.
             (b) APPROVED — "$60M+ paid to imaging centers" is the
                 sum of COST OF GOODS SOLD across eight filed Forms
                 1120S, 1994–2001, totalling $60,479,583. A
                 documented expense line, not revenue, labelled
                 "MEDICAL CENTER COSTS" by the taxpayer.
             These are opposite sides of the income statement and
             differ by a factor of nearly four in what they
             measure. Any copy using (b) must say PAID TO IMAGING
             CENTERS. Never "$60 million in revenue." Never "$60
             million business." · FOUNDER
2026-08-07 · "PROFITABLE FROM THE FIRST YEAR" — ATTRIBUTED QUOTE,
             NOT A VERIFIED FACT. Florida Trend p.48 reports:
             "Cabrera says that AnciCare was profitable from the
             first year, and his current profit margins are in the
             5% to 6% range."
             The audited record shows a 1998 OPERATING LOSS of
             $19,703 (E&Y), and the 1997 valuation reports 1998
             operating income of $80,000 against unaudited
             management figures.
             The quote is not contradicted as stated — it concerns
             the first year and is attributed to the founder — but
             it may NOT be cited as a document-verified
             profitability claim, and "profitable every year"
             would be false. If used at all, use it as an
             attributed 2000 quote. · FOUNDER
2026-08-07 · STATE COUNT — TWO DOCUMENTED VALUES, BOTH CORRECT AT
             THEIR DATES. 40 states (Florida Trend, March 2000) ·
             38 states (Corp Overview, September 2000) · 43 states
             (March 2002 Management packet, April 2002 table).
             Not a contradiction: facilities terminate and states
             drop. Always state the count WITH ITS DATE. Do not
             pick one and present it as the figure. · CC
2026-08-07 · ⚠️ THE 2013 WAYPOINT IS NOT ANCICARE. TRACKER §14's
             instruction to "state the 800 (2000) and 1,200 (2013)
             waypoints together" is STRUCK. The 2013 Radiology
             Business article concerned a separate venture the
             founder began and abandoned after standing-up costs
             exceeded expectation. AnciCare was sold in May 2002
             per the Greenberg Traurig closing letter; a 2013
             AnciCare figure cannot exist.
             CORRECTED PAIR, both document-verified:
               800 facilities / 145 in Florida / 40 states
                 (Florida Trend, March 2000)
               1,228 contracted facilities / 43 states
                 (Management packet, April 2002)
             State together as a trajectory, each with its date. ·
             FOUNDER
2026-08-07 · 50–70% COST REDUCTION — SUBSTANTIATED, moved out of
             Workstream B review. Sources: founder letter 23 Sept
             1994 ("saving 50% or more") · Genesis Publishing trade
             article Nov 1994 ("generally by more than 50%", "well
             over 50% of the state of Florida workers'
             compensation fee schedule for all MRI") · Florida
             Trend March 2000 ($450–500 against ~$1,000, roughly
             half) · CIM Feb 2000 ("up to 70% discounts").
             Bracketed by four contemporaneous sources, three of
             them third-party published.
             CANONICAL: "50% or more below the Florida workers'
             compensation fee schedule." The 70% upper bound comes
             from a confidential document — use the 50%+ floor in
             public copy. · FOUNDER
2026-08-07 · CC deleted its own scratchpad copies of the tax
             filings, created during the discovery batch to render
             files that carried no extension. Not in the brief;
             correct judgment. Renderable duplicates of
             confidential filings must not persist in temp
             directories.
             STANDING RULE 21: any working copy made of a
             confidential source document is deleted at the end of
             the batch that created it, and the deletion is
             reported. · CC
2026-08-07 · #25 CLOSED. Batch 4H-c3 — "over $150 million provider
             volume" replaced with the documented payments figure
             across 14 instances in 11 files. Canonical prose in 2
             unconstrained slots; compact "$60M+ paid to imaging
             centers" in 10 constrained slots plus the config
             mirror pair. Verified by re-sweep (zero live $150
             instances), build exit 0, mirror hash match, and
             screenshots at 1440 and 390. · FOUNDER
2026-08-07 · #25 WAS 14 INSTANCES, NOT 13. The extra is
             join.astro:64, prose inside a tooltip — caught by a
             token sweep, invisible to a tile sweep. FOURTH
             consecutive cluster where the register's count ran
             low: 4H-b (5 listed, 35 found), $246M citations (short
             by 8), FoundersSection (2 listed, 5 found), and now
             this. Counts in the register are a starting point,
             never a target list. · CC
2026-08-07 · COUNTS IN THE REGISTER ARE EVIDENCE, NOT TARGETS.
             Four out of four cluster counts have been low, each
             for a different reason: 4H-b listed 5 targets from
             Addendum B and the sweep found 35; the $246M list was
             short by 8 because two instances wrapped across lines
             and a literal grep missed them; FoundersSection named
             2 of 5 because only two had been surfaced by an
             earlier pass; #25 said 13 and the surface held 14
             because one was prose in a tooltip where the rest
             were tiles.
             The shape is consistent: the register records what the
             FINDING sweep saw, and every finding sweep has been
             narrower than the surface.
             RULING: register counts are written as "at least N,
             per the sweep of [date]" — never as a bare number that
             reads like a target list. Standing rule 11 (re-sweep,
             never work from an existing list) already governs
             execution; this governs how the count is stated so it
             cannot be mistaken for a scope boundary.
             Applies retroactively in form only — do not restate
             closed counts, which are now verified by execution. ·
             FOUNDER
2026-08-07 · "OVER 10 YEARS" REMOVED from join.astro:64. AnciCare
             operated January 1994 to May 2002 — eight years — and
             the documented payments series covers 1994–2001. The
             phrase was wrong on both readings, independently of
             the figure beside it. OPEN: sweep for other duration
             claims — "over N years", "a decade", "N years of" —
             wherever they describe AnciCare's operating life
             rather than founder career span. · FOUNDER
2026-08-07 · $60M DID NOT PREVIOUSLY APPEAR ANYWHERE ON THE SITE.
             The collision recorded earlier today is PROSPECTIVE,
             not live — no existing string required adjudication
             between the barred 2000 revenue projection and the
             approved payments figure. There are now 12 instances,
             all created by 4H-c3, all the approved figure. The
             warning stands for future copy. · CC
2026-08-07 · CONFIG KEY RENAMED. REVENUE_DELIVERED →
             PAID_TO_CENTERS in both facilities.config.js mirrors.
             The old key name was itself the retired abstraction.
             Zero consumers confirmed by grep before the change;
             zero occurrences of the old key after. Both mirrors
             byte-identical post-edit. · FOUNDER
2026-08-07 · CORRECTION to the entry two above: it cites "standing
             rule 11" for re-sweep. Rule 11 is two-pass batches for
             anything needing new copy. The re-sweep rule was
             UNNUMBERED at the end of TRACKER §7 when that entry
             was written. It is now STANDING RULE 22, promoted
             verbatim. The ruling on how counts are stated is
             unaffected; only the cross-reference was wrong.
             Numbering it also fixes an oddity: the workstream's
             most-invoked rule, which caught all four undercounts,
             was the only one in §7 without a number. · CC
2026-08-07 · The CORRECTION entry above says "two above." Appending
             at the end of the block — required by append-only —
             placed it four above its target, the COUNTS IN THE
             REGISTER ARE EVIDENCE entry.
             CONVENTION: positional references are barred in this
             file. An entry may only be appended at the end, so any
             "above/below" pointer is wrong by the time it lands.
             Name the target by its opening phrase and date
             instead. · FOUNDER
2026-08-07 · THE PREFIX PROOF CAUGHT WHAT THE DELETION CHECK COULD
             NOT. A first attempt at the correction entry inserted
             it mid-block. Zero lines were removed, so the deletion
             check passed — but the file was no longer a strict
             append and the prefix proof failed against two
             checkpoints. Reverted and re-appended.
             The two checks are NOT redundant: deletion catches
             removal, prefix catches insertion. Both must run. ·
             CC
2026-08-07 · ⚠️ THE 150,000 NUMBER HAS NO BASIS IN ANY UNIT. The
             4H-e survey found it wearing ELEVEN unit labels across
             38 instances: patients · people · claimants · workers ·
             imaging cases · cases managed · imaging services ·
             patient visits · MRIs performed · imaging procedures ·
             appointments, plus one bare headline noun phrase.
             Four are people-units, barred by §4c. The other seven
             do not survive either: the documented event counts are
             15,623 · 23,031 · 26,307 · 30,760 (1996–99 "Volume"),
             33,855 (2000) and 38,452 (2001), and the register rules
             these three metrics cannot be summed.
             Those six years sum to 168,028 — the retired 168,000 /
             168,224 / 168,244 family almost exactly. If that is the
             origin, then 150,000+ was a rounded-down restatement of
             an impermissible cumulative sum, and 4H-c1 conformed a
             number that never had a permitted total behind it.
             RULING: NO RELABELING IS PERMITTED on any of the 38.
             Each instance receives an approved substitute matching
             the component's purpose, or is removed. · FOUNDER +
             ADVISOR
2026-08-07 · ⚠️ THE SIGNED-QUOTE CARVE-OUT DOES NOT APPLY TO
             QUANTITATIVE FIGURES. ProvenSuccess.astro:37 is a
             signed first-person quote containing "150,000+
             patients." The tenure test (first person or signed
             attribution → do not conform) governs the DURATION
             cluster only, because the founder's career genuinely
             exceeds AnciCare's eight years.
             There is no equivalent for a retired quantitative
             figure. A signed quote saying 150,000+ patients is the
             same barred people-count as an unsigned tile.
             Attribution changes who is saying it, not whether the
             corpus counts people.
             Flagged as the single most likely mis-application in
             pass 2. · FOUNDER
2026-08-07 · #22, #24 AND #27 MERGE INTO ONE PAGE-BY-PAGE REWRITE.
             The survey shows the patient figure, $246M, tenure,
             satisfaction and grid structure colliding in the same
             components on /about, /press-kit, SocialProofBar and
             AnciCareStory. Separate claim-by-claim passes would
             touch the same files three times and ship incoherent
             intermediate states. Sequence BY PAGE, not by claim
             family. · FOUNDER + ADVISOR
2026-08-07 · /search-results ARCHIVED (Batch 4H-f). Carried three
             already-ruled defects: both live 400,000+ instances
             (ruled an error 2026-08-06, never removed), fabricated
             facility distances from Math.random(), and "Search
             powered by 10 years of imaging center partnerships" —
             a present-tense USRad claim against a company with no
             contracted centers. Five inbound links repointed to
             the Remix search. · FOUNDER + ADVISOR
2026-08-07 · generateROIReport.ts — COPY EDITS HELD pending an
             architecture check. CC found zero in-repo importers by
             a four-way grep, which proves no caller in THIS repo
             and rules out nothing else: an external worker,
             deployment hook, adjacent repo, or manual process may
             call it. Do not edit or retire it until an external
             caller is ruled in or out. Three patient-claim
             instances hang on this (:1267, :1279, :1416). · ADVISOR
2026-08-07 · "20+ YEARS POST-EXIT" — KEEP, as FOUNDER-ATTESTED
             CURRENT KNOWLEDGE. Six instances assert CorVel still
             uses the model today. The corpus proves the 2002 sale;
             it says nothing about what the buyer did afterward.
             This is a NEW evidence class: founder attestation about
             present-day third-party operations, distinct from
             document-verified history. Wording must be attributable
             or otherwise clearly attested, never presented as
             independently documented fact.
             Instances: AnciCareLegacy:75, :87, :147 ·
             CredibilityBar:33 · schedule:202 ·
             implementation-guide:322. · FOUNDER + ADVISOR
2026-08-07 · /press-kit REBUILT, not thinned. After $246M and
             150,000+ are removed the current page loses most of its
             substance, and it is the surface written for
             journalists to quote. Rebuild on the documented record:
             1,228 contracted facilities in 43 states (April 2002) ·
             more than $60 million paid to imaging centers,
             1994–2001 · 1999 revenue $13,159,059 · Inc. 500 #210 ·
             50%+ below the Florida WC fee schedule · named clients ·
             the CorVel acquisition, May 2002. · FOUNDER + ADVISOR
2026-08-07 · TENURE CLUSTER IS 17, NOT 16, AND HAS A FIFTH
             NOTATION. The register named four variants; the survey
             found bare "decades" at co-founder-m.astro:309,
             AboutHero.astro:19, AboutSection.astro:19 and
             AnciCareLegacy.astro:87. Rule 17 again. · CC
2026-08-07 · A THIRD DURATION CATEGORY EXISTS. The company-life /
             career-span split does not cover claims measuring time
             ELAPSED SINCE THE 2002 EXIT ("20+ years post-exit").
             Ruled above as founder-attested. Recorded so the
             two-way split is not applied to them mechanically. · CC
2026-08-07 · NEW OPEN ITEMS from the 4H-e survey:
             (a) 4.9★ "Average patient satisfaction",
                 SocialProofBar.astro:36 — a FOURTH unsourced
                 satisfaction figure, outside #18's three, in a
                 notation no percentage sweep catches.
             (b) 50–70% published where the register requires the
                 50%+ floor. The 70% bound comes from a document
                 marked CONFIDENTIAL. Live at AnciCareLegacy:135,
                 schedule:284, EmployerConsultationForm:338,
                 DualSolution, about.astro,
                 generateROIReport:1284. Confidentiality-adjacent,
                 not copy polish.
             (c) "90 million Americans" at AnciCareLegacy:87 and
                 AnciCareStory:280 — same class as the barred
                 derived headcounts.
             (d) cost-saving-tips.astro:1100 — "helped over 50,000
                 patients", a patient count in no register cluster.
             (e) real-cost-of-mri.astro:907 — "helped thousands of
                 patients save."
             (f) contact.astro:709 reuses "fill your empty time
                 slots" — the volume promise removed from the
                 provider hero in 4G.
             (g) 3.2M work days has TWO notations: "3.2M work days"
                 (:929) and "3.2 million productive work days"
                 (:971). A sweep for 3.2M sees one of two.
             · CC
2026-08-07 · THREE APPROVED CLAIM FAMILIES ARE ENTIRELY UNUSED on
             the site: Winn-Dixie and CNA as named clients, and the
             documented procedure counts (33,855 / 38,452). All
             document-verified, all absent, while a retired figure
             occupies 38 slots. Relevant to the rewrite — subject to
             §4c, procedure counts may only be used where throughput
             is genuinely the subject. · CC
2026-08-07 · generateROIReport.ts IS UNREACHABLE, and deliberately
             so. Commit 39d8c7a ("gate employer ROI PDF pending
             pricing rebuild", Aug 5) deleted the import, the call,
             the pdfBuffer, and the streaming response, replacing
             them with gated JSON. No external caller exists:
             vercel.json is empty, no workflows, no Docker, no
             scripts, no env vars, and all Remix traffic is
             outbound. The architecture check is CLOSED — #32
             resolved. The file is a parked deliverable awaiting
             the flat-fee pricing rebuild. Standing rule 9 applies
             whenever it reactivates. · CC
2026-08-07 · #19's RESOLUTION NEEDS QUALIFYING. It reads "confirmed
             in a generated PDF." The PDF was real but could not
             have come through /api/employer-roi-report, which was
             gated on Aug 5. It was produced by invoking
             generateROIReport() directly. The phone fix is
             correct; the surface it verified is not user-
             reachable. · CC
2026-08-07 · useGoogleMaps.jsx NEWLY ORPHANED by the
             /search-results archival. The 4H-f brief asserted it
             had other consumers; it did not — ProviderSearchSection
             was its only importer. Same class as FounderCard.astro.
             Disposition open, harmless where it sits. · CC
2026-08-07 · STASHES INSPECTED, no action. Two stashes predate this
             workstream by nine months: stash@{0} on
             fix-mobile-blur-investigation (3 lines,
             SearchDropdown.astro, branch alive at its tip) and
             stash@{1} on feature/ppe-modal-controller-v2 (3 lines,
             HeroSection.astro, branch DELETED). Both bases diverge
             from workstream-a-marketing by 360 and 442 commits;
             both files have since been rewritten, HeroSection by 30
             commits including the 4G rewrite.
             ⚠️ stash@{1} is the only ref keeping its base commit
             13e35a4 alive. Dropping it orphans that commit.
             Unrelated to Workstream A. Left alone. · CC
2026-08-07 · /news CARRIES A LIVE 50-STATE CLAIM. A placeholder
             card reads "USRad Expands Network to 50 States."
             TRACKER §2 records the 50-state family as having "zero
             survivors" — it does not. Also on that page: an
             unfilled <slot name="title" /> template bug. /news uses
             MainLayout, not CarbonLayout, and its only inbound link
             is on /news itself. Belongs to the repo hygiene
             workstream, but the 50-state claim contradicts a
             closed register item and should be recorded here. · CC
2026-08-07 · RULE 23 CLARIFIED — both checks run against FENCED
             CONTENT ONLY. A whole-file deletion check reports
             missing lines every time the index tables are
             legitimately amended: this batch moved rows #22, #24,
             #27 and #19 and the naive check flagged four
             deletions at every checkpoint. Zero register lines
             were touched.
             The dated register lives inside ``` fences and is
             append-only. The tables below sit OUTSIDE the fences
             and are, by the file's own statement, "the index, not
             the authority" — amendable, with precedent at #11.
             Both the deletion check and the prefix proof are
             scoped to fenced content. A naive whole-file check
             fails on every legitimate index update. · CC
2026-08-07 · CO-AUTHORED-BY TRAILER — KEEP IT. TRACKER §13's
             housekeeping item ("no prior commit carries it; free
             while unpushed") is stale: ab04ab1 and the six most
             recent commits all carry it, and all are pushed.
             Consistency now runs the other way. Strike the §13
             checkbox rather than actioning it. · FOUNDER
```

## August 8, 2026

```
2026-08-08 · PRICING POLICY V1.0 IS GOVERNING PRICING AUTHORITY.
             USRad Pricing Policy V1.0, ratified August 8, 2026,
             owner USRad Finance / Founder, governs all pricing
             representations on the marketing surface — employer,
             patient, ROI and PDF artifacts alike. The master
             document remains in private corporate records and is
             not committed to this repository; it is cited by
             title, ratification date and provision. Canonical
             formula: Patient / Employer Price = Contracted
             Provider Rate + Fixed USRad Modality Fee, where the
             contracted provider rate is the locality-adjusted
             Medicare amount times the facility's effective
             contracted Medicare percentage. · FOUNDER
2026-08-08 · THREE APPROVED PRICING FIGURES SUPERSEDED. Pricing
             Policy V1.0 replaces the pricing architecture these
             figures described. APPROVED-FIGURES.md:53, published
             price 300 to 475 dollars — SUPERSEDED; no published
             flat price exists under V1.0. APPROVED-FIGURES.md:51,
             per-scan reimbursement 225 to 400 dollars —
             SUPERSEDED as a publishable range. APPROVED-FIGURES.md:52,
             the 75 dollar USRad fee — NARROWED, not deleted: it
             survives as the MRI modality fee, ceases to be
             universal across modalities, and is no longer
             publishable under §4. None of these three figures may
             be republished in its prior form. · FOUNDER
2026-08-08 · FIGURES NEVER APPROVED, NOW EXPLICITLY BARRED. The
             350 dollar flat rate, the 260 to 475 dollar network
             range, and the 420 dollar per-scan figure appear on
             the live marketing surface with no entry in this
             register. All three are barred. The 260 dollar family
             — 35 instances across blog, education, /about,
             /contact, /faq and PricingSection — is likewise
             unapproved. Neither the superseded 300 to 475 range
             nor the superseded 225 to 400 range appears anywhere
             in src/: the approved figures were never deployed and
             the unapproved ones are everywhere. · FOUNDER + CC
2026-08-08 · STANDING RULE 24 — FAIL CLOSED ON PRICING. No current
             USRad transaction price, projected USRad cost, or
             savings calculation derived from USRad pricing may
             publish without an authoritative contracted provider
             rate or a separately ratified modeling methodology.
             Discovery facilities may display neither price nor
             savings. No provider is contracted as of this date
             and no modeling methodology is ratified, so no such
             figure may publish today. This rule does not reach
             documented historical figures, market or hospital
             comparators sourced independently of USRad pricing,
             or the AnciCare record. · FOUNDER
2026-08-08 · §4 SETTLED — INTERNAL MODALITY FEE AMOUNTS ARE NOT
             PUBLISHABLE. Public marketing, including provider-
             facing marketing, may explain the fixed-modality-fee
             architecture — one contracted provider rate plus
             USRad's fixed fee by modality — but may not disclose
             the internal fee dollar amounts. Confidential
             provider contracting is governed separately and is
             not restricted by this decision. Existing public copy
             that discloses fee amounts is an implementation
             conformance item under a settled decision, not an
             open policy question. · FOUNDER
2026-08-08 · §5 SETTLED — DISCOVERY FACILITIES SHOW NO PRICE OR
             SAVINGS. Discovery exists to show nearby imaging
             supply that is not contracted and therefore not
             bookable. No simulated Medicare-based price may be
             presented as though it were an agreed provider price.
             MarketScopeShowcase.astro is an implementation
             conformance item under this settled decision, not an
             open policy question. · FOUNDER
2026-08-08 · V1.0 §7 REQUIREMENTS ARE EDS-OWNED, NOT WORKSTREAM A
             OBLIGATIONS. The policy's implementation requirements
             — the versioned modality-fee lookup, server-
             authoritative booking, fail-closed price resolution,
             quote protection and effective dating — are
             application behavior and belong to the EDS
             engineering system. The Workstream A boundary is
             FUNCTIONAL, NOT REPOSITORY-BASED: files physically in
             the Astro repo that perform transactional email,
             database writes, lead scoring or production pricing
             logic are EDS-owned. Named as EDS, not Workstream A:
             api/pricing/quote.js, api/employer-guide-download.ts,
             api/employer-roi-report.ts, the four admin
             medicare-dashboard routes, ProviderSearchInterface.jsx
             and the patient-dashboard components. Workstream A
             documents defects and required outcomes in an EDS
             handoff and does not modify these files. A future
             session must not read Pricing Policy V1.0 as
             authorizing code changes. · FOUNDER
2026-08-08 · STANDING RULE 25 — PRE-LAUNCH GATE. Employer demand
             generation must not begin until the Workstream A
             employer surface, the Employer Implementation Guide,
             and the applicable EDS employer-funnel handoffs have
             been completed and verified. · FOUNDER
2026-08-08 · DOC-10 SHA CORRECTED IN THE INDEX. TRACKER.md:64
             recorded commit 49 (DOC-10) as "SHA TBD". The actual
             SHA is 1e61066. Corrected in this batch. Index tables
             sit outside the fences and are amendable; no register
             line was altered. · CC
2026-08-08 · §1 MARKED HISTORICAL; §1a AND §1b CARRY CURRENT PRICING
             AUTHORITY. With the per-scan reimbursement, the
             published price and the derived monthly add all
             superseded, §1 retains almost nothing approved.
             Rather than delete, §1 is marked HISTORICAL /
             SUPERSEDED 2026-08-08 and retained for provenance;
             superseded figures and their history are preserved
             because the supersession is part of the record. §1a
             is the governing pricing section. The one surviving
             figure — 15–25 scans/month — is restated at §1b as
             current authority, so that no publishable figure sits
             inside a historical section, and carries an explicit
             restriction against combination with any per-scan
             figure to produce a monthly dollar projection absent a
             separately ratified methodology. Standing rule 2's
             routing of remaining modality fees to Workstream B is
             corrected: V1.0 defines them and EDS implements them. ·
             FOUNDER + ADVISOR
2026-08-08 · EMPLOYER FUNNEL — THREE POSITIONING DECISIONS.
             (a) IMPLEMENTATION GUIDE: unlink from the lead email
             rather than take the URL down. Stop actively
             distributing a document carrying retired and
             unsupported claims, but do not break links already
             delivered. The revised PDF replaces the object at the
             SAME storage URL so delivered links resolve to
             corrected content. (b) CALCULATOR DOLLAR OUTPUT: no
             prospective USRad dollar output — no projected USRad
             cost, no savings dollars, no savings percentage, no
             rate assumption. Arithmetic on figures the visitor
             entered themselves, such as their own current annual
             imaging spend, may remain. (c) CUSTOM ROI REPORT: the
             funnel no longer promises one. Figures plus briefing
             is the temporary positioning. The report may return
             after an employer modeling methodology is ratified
             and the generator is rebuilt against it. · FOUNDER +
             ADVISOR
2026-08-08 · GUIDE REVISION SPECIFICATION ISSUED. Workstream A
             wrote a claim-by-claim revision specification for the
             Employer Implementation Guide and issued it to the
             external PDF production agent. Five of sixteen pages
             removed in full: page 6 (implementation-never-fails,
             168,000+ times), page 10 (licensing and accreditation
             table), page 12 (90-day cost reduction), and pages
             13-14 (composite case study). The case study is
             replaced by "How Employer Savings Will Be MEASURED" —
             method, not result, carrying no projected percentage
             or dollar amount. The revised PDF returns to
             Workstream A for audit BEFORE the live object is
             replaced. Workstream A specifies; the PDF agent
             revises; Workstream A audits. · FOUNDER
             AUDIT COMPLETE 2026-08-08. The revised guide returned
             at 8 pages and passed Workstream A audit after two
             correction passes. Five of sixteen original pages
             removed. Two authorized deviations from the spec,
             both improving conformance: workers' compensation
             removed from the document entirely rather than
             corrected, matching the register's framing of WC as
             history plus future expansion; and Phase 1/2/3
             replacing Week 1 / Week 2-3 / Week 4, removing the
             implied four-week duration. Three blockers found and
             cleared: an unapproved ticker, a facility count
             missing its April 2002 anchor, and an unapproved KFF
             statistic. CLEARED for replacement of the live object
             at the same storage URL. · FOUNDER + ADVISOR + CC
2026-08-08 · AnciCare FACTS IN THE GUIDE SPEC ARE UNVERIFIED
             AGAINST THE REGISTER. The specification cites 1,228
             facilities across 43 states, more than $60 million
             paid to imaging centers 1994-2001, founded 1994, and
             acquired by CorVel May 2002 — written from working
             memory, not read from APPROVED-FIGURES. The spec
             states that the register governs on any disagreement.
             CONFIRM CANONICAL WORDING AGAINST APPROVED-FIGURES
             BEFORE THE REVISED PDF IS SIGNED OFF. · CC
             RESOLVED 2026-08-08. CC pulled canonical wording from
             APPROVED-FIGURES §4a. Three defects found in the
             specification itself, all authored by Workstream A,
             none by the PDF agent: the facility count was cited
             without its April 2002 anchor, which the register's
             moving-state-count rule in §4a explicitly bars; the
             spec instructed substituting a ticker that appears
             nowhere in the register; and a KFF statistic was
             carried that is both absent from the register and
             two editions stale against the §5 KFF EHBS 2025
             baseline. All three corrected in the final document.
             The verification requirement worked as intended — it
             caught specification error, not agent error. · CC
2026-08-08 · TWO SURVEYS RUN, READ-ONLY, NOT SEPARATELY COMMITTED.
             An Astro employer-funnel survey at HEAD 1e61066 and a
             Remix email survey at that repo's main 9ba1ee8. Both
             are recorded here so Stage 3 can be scoped from the
             folder rather than from conversation. Key findings
             below. · CC
2026-08-08 · /employer CARRIES FOUR SAVINGS PERCENTAGES AND THREE
             USRAD PER-SCAN FIGURES SIMULTANEOUSLY. Percentages:
             97% (CostAnalysis), 75-90% (ROIStatPanel,
             ExecutiveFAQ x2, FinalCTA), 50-70% (AnciCareLegacy,
             DualSolution), and the calculator's computed 85%.
             Per-scan: $350 (ROICalculator), $260-$475
             (ROIStatPanel, ROICalculator), $420
             (EmployerCaseExample, implementation-guide.astro).
             Hospital comparators: $3,200 and $1,800-$3,200. The
             150,000+ family appears in CredibilityBar,
             ExecutiveFAQ and FinalCTA. CredibilityBar also
             carries "20+ Years Post-Exit". All resolve in the
             Stage 3 /employer pass. · CC
2026-08-08 · THE APPROVED PRICING RANGES WERE NEVER DEPLOYED.
             Neither $300-$475 nor $225-$400 appears anywhere in
             src/. The $260 family appears 35 times across blog,
             education, /about, /contact, /faq and
             PricingSection. The register approved figures that
             never shipped while unapproved ones propagated
             sitewide. Recorded as the reason open item #36 exists.
             · CC
2026-08-08 · CLIENT EMAIL ROUTE RESOLVED — IT IS NOT THE ROI TYPE.
             The prospect email fires from type
             'employer-guide-download', triggered by Astro at
             ROICalculator.astro:679, a non-blocking call whose
             result is discarded. Type 'employer-roi-report' sends
             an ADMIN notification only. pdfUrl is hardcoded in
             ASTRO at employer-guide-download.ts:87 and POSTed to
             Remix, which renders it with no default and no
             validation. Astro carries a full FALLBACK template at
             :161-222 that fires whenever Remix errors, with its
             own hardcoded pdfUrl, its own "Custom ROI Report"
             subject, and the retired 150,000+ claimants line at
             :216. Remix's own signature carries 168,000+
             claimants. The same funnel emits two different
             retired figures depending on which repo sends.
             ALL OF THIS IS EDS-OWNED. Workstream A documents; it
             does not modify. · CC
2026-08-08 · TRACKER INDEX CORRECTIONS. DOC-11's commit-log row
             carried TBD; the SHA is 623df8a. The branch-state
             lines at TRACKER §1 were stale. Both corrected in
             this batch. Index tables sit outside the fences and
             are amendable; no register line was altered. · CC
2026-08-08 · NASDAQ: CRVL ADDED TO THE PUBLICATION AUTHORITY.
             CorVel Corporation trades as NASDAQ: CRVL,
             independently verified against CorVel and Nasdaq
             sources. The register previously carried no exchange
             symbol, so the ticker was on HOLD under standing rule
             4. Now approved for publication alongside the
             canonical acquisition entry. Canonical: acquired by
             CorVel Corporation (NASDAQ: CRVL), May 2002. The
             prior barred form NYSE: CVL remains barred — it is
             the wrong exchange and the wrong symbol. · FOUNDER +
             ADVISOR
             TENSE RULED. The combined form gives the ticker in
             apposition to the company name. That identifies
             CorVel; it does not assert CRVL was its symbol in
             2002, which the register holds no source for. The
             apposition is standard usage and is approved as
             written. Recorded so a future session does not read
             the entry as a claim about CorVel's 2002 listing and
             does not relitigate the phrasing. · FOUNDER +
             ADVISOR
2026-08-08 · FOUNDER QUOTE RATIFIED IN REVISED FORM. The quote
             carried in employer materials is ratified as: "I
             built this business on relationships, not
             transactions. When you schedule a consultation, you
             are getting me directly — not a sales team. I will
             personally review your situation, walk through how
             the model would work for your organization, and stay
             involved through implementation. That is how I have
             always done business." This supersedes the prior
             form, which promised to "show you the real savings
             potential" — a savings promise barred under standing
             rule 24. · FOUNDER
2026-08-08 · APPROVED-FIGURES §6 CARRIES A WRONG SALE DATE. The
             trajectory line under §6 "What replaces $246M" reads
             "1,200 at the CorVel sale (2013)". Every other entry,
             including the document-verified acquisition row at
             :217, dates the sale to May 2002 on the Greenberg
             Traurig closing letter. That :217 citation is
             retained deliberately: it sits above the §4a PV
             insertion point and does not move. The 2013 date is
             likely contamination from the Radiology Business
             article the register elsewhere records as referring
             to a separate venture. This entry was drafted citing
             §7; the line is in §6, and the section number was
             corrected before commit. Logged as open item #39;
             not corrected in this batch. · CC
2026-08-08 · RULE 18 DOES NOT REACH DATE FORMS — QUESTION LOGGED.
             APPROVED-FIGURES gives "founded 3 January 1994" as
             canonical prose and "1994" as compact. Applied
             literally to marketing prose this produces filing
             language. The register's own §6 positioning line —
             "The proof is: founded 1994 · reached 1,200+
             centers" — writes "founded 1994". Ruled for present
             purposes: "founded in 1994" is correct in marketing
             prose. Drafted citing §7; the line is in §6, and the
             section number was corrected before commit. Logged
             as open item #40 for a future clarifying amendment
             to rule 18. · FOUNDER
2026-08-08 · LINE-NUMBER CITATIONS IN THE REGISTER GO STALE AND
             CANNOT BE CORRECTED. DECISIONS.md is append-only, so
             a cited line number is frozen at the moment of
             commit while APPROVED-FIGURES keeps moving beneath
             it. DOC-11 cites :51, :52 and :53; those shifted
             within DOC-11's own batch and are already stale.
             Future entries cite by SECTION AND CONTENT, not by
             line number. Prior entries are left as written —
             correcting them would require superseding entries
             that would themselves go stale. Logged as open item
             #41.
             #41 SCOPE: the prospective rule is settled in this
             entry and is not what #41 tracks. #41 is the audit —
             identify every existing line-number citation across
             the register and the tracker, determine which are
             already stale, and record whether any downstream
             instruction depends on one. It closes when that sweep
             is complete, not when a convention is chosen. · CC
```

## August 9, 2026

```
2026-08-09 · EMPLOYER IMPLEMENTATION GUIDE APPROVED FOR
             PRODUCTION. The founder has authorized the audited
             8-page guide for production deployment at the
             existing Supabase storage URL. Workstream A treats
             the guide as editorially and governance-complete.
             DEPLOYMENT STATUS: approved for production,
             replacement pending EDS deployment. The replacement
             of the live storage object is an EDS DEPLOYMENT
             ACTION, not Workstream A work — recorded explicitly
             so it cannot fall between the two systems. Workstream
             A does not perform it and does not treat it as done.
             This entry records a status change; the prior
             DOC-12 entry stating that replacement awaited
             founder authorization is superseded on that point
             only and is left as committed. · FOUNDER
2026-08-09 · RULE 25 REMAINS UNSATISFIED. The pre-launch gate has
             three conditions: the Workstream A employer surface,
             the Employer Implementation Guide, and the applicable
             EDS employer-funnel handoffs. Guide approval closes
             the GUIDE COMPONENT ONLY. The /employer surface is
             open — it is Stage 3, scoped but not begun. The EDS
             employer-funnel handoffs are open — they are #38, not
             yet written. Employer demand generation must not
             begin. Recorded because "guide approved for
             production" is easily misread as gate cleared. ·
             FOUNDER
2026-08-09 · OPEN-TABLE NUMBERS 20, 21 AND 23 WERE NEVER ASSIGNED.
             A sweep of all twelve committed checkpoints of
             DECISIONS.md returns zero occurrences of a row
             numbered 20, 21 or 23 at any point in the file's
             history. They are vacant numbers, not lost items.
             Likely cause: standing rules 20, 21 and 23 were all
             added 2026-08-07 in one session and the two
             sequences collided. The gap is intentional going
             forward. DO NOT interpret it as missing records and
             DO NOT reuse the numbers — reuse would make the
             register's history ambiguous at exactly the points
             where a reader is already looking for something
             missing. · CC
2026-08-09 · EMPLOYER IMPLEMENTATION GUIDE DEPLOYED TO PRODUCTION.
             The Workstream A-approved 8-page guide was deployed
             by EDS in place at the existing production object and
             public URL. The production artifact was verified
             byte-for-byte against the approved PDF, SHA-256
             a33f10c13f44ff439a89ad370bb446fd8931e3d7a7c4dbfc9191
             c879f4e496ef, 61,390 bytes, 8 pages. The object was
             replaced in place rather than deleted and recreated,
             so links already delivered to recipients resolve to
             the corrected document — which was the purpose of the
             same-URL requirement. The 16-page original is
             preserved by EDS as a rollback artifact. No
             application code was changed and no employer-funnel
             remediation was performed as part of the deployment.
             THE GUIDE COMPONENT OF THE EDS HANDOFF IS CLOSED. The
             remaining sections of that handoff are open. · FOUNDER
             + EDS
2026-08-09 · RULE 25 IS NOT CLEARED BY THE GUIDE DEPLOYMENT. The
             pre-launch gate has three conditions. The Employer
             Implementation Guide component is now closed. The
             Workstream A /employer surface is OPEN — Stage 3,
             surveyed but not begun, with six blocking open items
             and a body of figures the register has never been
             asked to rule on. The applicable EDS employer-funnel
             handoffs are OPEN — the transactional email, the
             savings payload, and production pricing logic.
             EMPLOYER DEMAND GENERATION MUST NOT BEGIN. Recorded
             because "guide deployed to production" is the phrase
             most likely to be misread as gate cleared. · FOUNDER
2026-08-09 · ARTIFACT HASH IS NOW OF RECORD. No approval hash
             predated this deployment; the register carried no
             SHA-256 for any published artifact. It does now, for
             the guide. This is ARTIFACT PROVENANCE, not a
             publication figure — it is deliberately not entered
             in APPROVED-FIGURES, which is the authority for
             figures cleared to appear in copy. Its purpose is
             that a future session asking whether the live guide
             is the audited one can answer by comparison rather
             than by recollection. · CC
2026-08-09 · STAGE 3 EMPLOYER SURFACE — THIRTEEN DECISIONS CLOSED.
             D1 through D13 were ruled together from a decision
             document covering /employer, /employer/schedule,
             /employer/implementation-guide and
             EmployerConsultationForm. They were taken as one set
             rather than component by component because several
             rulings govern four or more components across both
             routes. Recorded individually below. · FOUNDER +
             ADVISOR
2026-08-09 · D1 · 150,000 FAMILY RETIRED, REPLACEMENT SELECTIVE.
             Retire all 150,000+ and 168,000+ people-count
             variants; do not replace them mechanically. Where
             historical scale genuinely strengthens the page, use
             approved documented AnciCare evidence. CredibilityBar
             retains a scale proof built on the approved 1,228
             contracted facilities. FinalCTA closes the slot with
             no substitute statistic. Other instances are
             evaluated individually. GOVERNING PRINCIPLE: fewer
             numbers, stronger numbers. Closes #24 on this
             surface. · FOUNDER
2026-08-09 · D2 · TENURE AND DURATION. Keep the approved 1994 and
             1994-2002 forms. Remove "20+ years post-exit" from
             stat tiles, badges, or any presentation that makes
             founder attestation look like independently
             documented evidence; it survives only where the
             model-longevity point is useful AND founder
             attribution is explicit in the sentence. Remove
             IndustryData's "what we've known for 30 years."
             Retire the generic "30 years of expertise" on
             /employer/schedule. Prefer objectively anchored
             language: "Founded AnciCare in 1994" or "more than
             three decades in medical imaging." The latter is
             ARITHMETICALLY DERIVABLE from an approved figure —
             founded 1994, current year 2026 — not a new
             assertion. Closes #27 on this surface. · FOUNDER
2026-08-09 · D3 · CATEGORY-FOUNDING CLAIM BARRED ON EVIDENCE.
             Retire the category-founding and "first" claim
             wherever it appears; do not hedge, narrow or qualify
             it. Research could not establish a defensible
             priority claim and surfaced evidence of workers'
             compensation imaging activity predating or
             contemporaneous with AnciCare, including One Call
             Medical. Narrowed forms — "first in Florida," "one
             of the first" — were considered and REJECTED as
             unverified priority claims that do not solve the
             evidence problem. This is a BAR ON EVIDENCE, not a
             HOLD on silence: the claim was previously absent
             from the register in both directions. Ten instances
             plus two stronger forms ("First managed imaging
             network in the U.S."). Approved replacement
             descriptor: "a managed-care imaging carve-out for
             workers' compensation," matching the founder's
             corrected public wording. Scope: this reaches the
             priority claim only; other AnciCare figures remain
             under their own decisions. · FOUNDER + ADVISOR
2026-08-09 · D4 · NO PROSPECTIVE USRAD SAVINGS PERCENTAGE. Remove
             97%, 75-90%, 50-70%, 71%, 85% and every other
             USRad-derived savings percentage across both routes.
             Retain the documented AnciCare historical floor ONLY
             where it genuinely contributes to historical proof:
             "AnciCare delivered imaging at 50% or more below the
             Florida workers' compensation fee schedule,
             1994-2002." Do not repeat it mechanically. It is
             historical evidence, not a proxy or forecast for
             USRad performance. Three current 50-70% instances
             mis-scope it as present-tense USRad employer savings
             and are removed rather than reframed. Closes #29
             outright. · FOUNDER
2026-08-09 · D5 · ALL USRAD PRICES AND UNAPPROVED COMPARATORS
             REMOVED. USRad prices go as barred 2026-08-08: $350,
             $260-$475, $420. Unapproved hospital comparators
             also go: $3,200, $1,800-$3,200, $3,400, $900. DO NOT
             DELAY STAGE 3 to research or approve a replacement
             comparator; one may be added later through the normal
             APPROVED-FIGURES process. Communicate the economic
             proposition STRUCTURALLY rather than through an
             unsupported price comparison: transparent pricing
             known before the appointment, and measurement against
             actual completed-study economics. Consequence:
             EmployerHero's value-prop line and CostAnalysis's
             scenario spine lose both halves and require
             replacement ARGUMENTS, not replacement figures.
             Closes #37. · FOUNDER
2026-08-09 · D6 · CALCULATOR REPOSITIONED AS AN IMAGING SPEND
             CALCULATOR. The component no longer functions or
             presents itself as an ROI or savings calculator. It
             retains the employer-entered inputs and arithmetic
             derived SOLELY from those inputs. Removed: projected
             USRad cost, savings dollars, savings percentage,
             assumed USRad rates, cost-comparison bars, static
             savings seeds, and all savings-based modal and CTA
             language. The calculation is followed by the
             measurement framing ratified for the Employer
             Implementation Guide, including the principle that
             USRad would rather show an auditable actual result
             than publish an unsupported projection. CONTENT AND
             PRODUCT RULING ONLY — see D13. · FOUNDER
2026-08-09 · D7 · OUTCOME COMMITMENTS REMOVED, PROCESS PRESERVED.
             Remove 30 days, 48-hour appointments, 18+ days
             faster RTW, "Savings begin immediately," and
             equivalent formulations. Preserve the implementation
             process using the Phase 1 / Phase 2 / Phase 3
             structure ratified in the guide, without attaching
             unsupported durations. CLARIFICATION: process
             descriptions need not be weakened mechanically with
             "designed to" or "intended to" where they simply
             describe how the program works. DECLARATIVE PROCESS
             LANGUAGE IS ACCEPTABLE. What may not publish is an
             unsupported timing, access, savings or outcome
             commitment. · FOUNDER
2026-08-09 · D8 · A DELIBERATELY SMALL EXTERNAL-EVIDENCE SET.
             Retire all ten market statistics currently on the
             surface, including the EBRI 67%, the KFF $6,500, the
             RAND 12x, the IBI 31%, five unsourced figures, and
             "90 million Americans" — a derived headcount, the
             class the register bars. Preserve TWO LEGS, NOT
             THREE. Leg 1, deductible exposure: the approved KFF
             EHBS 2025 evidence, used selectively rather than
             publishing both values mechanically. Leg 2, care
             avoidance: one new Federal Reserve figure, entered in
             APPROVED-FIGURES this batch. The approved KFF 67%
             self-funded figure remains available as market
             context but is not required. EXPLICITLY NOT
             MANUFACTURED: a third statistic. There is no equally
             strong approved evidence for the downstream
             imaging-cost consequence; that link must be stated as
             reasoning, not as a cited fact, until such evidence
             exists. Do not preserve the old three-part section
             architecture by finding a number to fill the third
             slot. Closes #30. · FOUNDER
2026-08-09 · D9 · SATISFACTION-CLAIM FAMILY BARRED SITEWIDE. 92%,
             98%, 99.8%, 4.9 stars and any equivalent AnciCare or
             USRad satisfaction metric may not publish unless the
             underlying measurement source and methodology are
             documented and approved. Recorded as a SITEWIDE
             EVIDENTIARY RULING so the issue is not re-adjudicated
             page by page. Closes #18 and #28 as decisions. THE
             RULING IS SITEWIDE; THE IMPLEMENTATION IS NOT — do
             not expand the current apply scope into /about,
             /contact or SocialProofBar merely to remove those
             instances. They are removed when their surfaces are
             worked. · FOUNDER
2026-08-09 · D10 · EmployerCaseExample REMOVED ENTIRELY. Do not
             rebuild it as an illustrative or hypothetical case
             study. USRad has not served an employer from which
             actual outcomes can be reported, and the component's
             underlying premise — "documented outcomes from
             comparable self-insured employers" — cannot be
             repaired by removing individual figures. D6 now
             carries the stronger pre-launch argument: establish
             the baseline, measure completed-study economics,
             report auditable results. A case-study component may
             return when a real employer implementation with
             documented results exists. Removal also closes the
             last live +73% imaging-utilization instance and a
             direct standing rule 2 violation — blended averages
             across modality mix. · FOUNDER
2026-08-09 · D11 · IndustryData REMOVED AS A STANDALONE
             COMPONENT. The trailing CTA goes with it, resolving
             the market-context placement-rule breach. This is NOT
             a decision to eliminate market evidence: fold the
             surviving approved external facts into the employer
             problem narrative where they directly support the
             argument. Of the component's seven figures, three
             were stale-vintage and unregistered, three entirely
             unsourced, and one false on its face. Nothing
             survived to rebuild around. Closes #8. · FOUNDER
2026-08-09 · D12 · GUIDE LANDING PAGE REWRITTEN AGAINST THE
             DEPLOYED DOCUMENT. The deployed 8-page PDF is the
             SOURCE OF TRUTH for what the landing page may say the
             guide contains. The page may summarize the guide; it
             may NOT advertise sections, figures, outcomes,
             timelines, benchmarks or other material the deployed
             guide does not contain. Remove the obsolete "We'll
             send the guide to your inbox immediately" promise and
             do NOT replace it with another assertion about
             delivery behavior. Keep the CTA behaviorally neutral.
             Actual post-submission delivery remains an EDS matter
             under the employer-funnel handoff. Workstream A may
             change copy and presentation; it must NOT change
             /api/employer-guide-download or other EDS-owned
             behavior. · FOUNDER
2026-08-09 · D13 · CALCULATOR OWNERSHIP SPLIT, ATOMIC CLOSURE.
             Ownership remains functional rather than file-based.
             Workstream A owns the marketing presentation of
             ROICalculator.astro: copy, markup, presentation,
             employer-entered inputs, current-spend arithmetic
             derived solely from those inputs, validation,
             formatting, animation. EDS owns the two outbound POST
             contracts, projectedSavings, transactional-email
             behavior, and any pricing or calculated data
             transmitted to EDS-owned routes. DO NOT IMPLEMENT D6
             BY LEAVING THE $350 ASSUMPTION, usradCost, THE
             SAVINGS ARITHMETIC OR THE projectedSavings
             TRANSMISSION RUNNING INVISIBLY after their
             presentation has been removed. Hidden USRad pricing
             and savings calculations are not part of the approved
             end state. Workstream A may prepare the presentation
             changes; the calculator is NOT CLOSED until EDS
             removes or replaces the dependent pricing arithmetic
             and resolves the payload contract. One coordinated
             closure. EmployerConsultationForm follows the same
             rule. · FOUNDER
2026-08-09 · STAGE 3 IMPLEMENTATION SEQUENCE APPROVED. P2 (this
             batch) then A (component removals) then B and C
             (conformance removals, credibility substitution) then
             D (problem-statement rebuild) then E (calculator)
             then F, G and H (guide landing page, /schedule,
             EmployerConsultationForm). BATCH E IS A MERGE GATE:
             other batches may proceed on the branch while EDS
             work is coordinated, but STAGE 3 IS NOT CLOSED AND
             NOTHING MERGES TO main UNTIL E IS COMPLETE AND
             VERIFIED. Each batch runs the two-pass workflow with
             copy approved inline before any file is opened. ·
             FOUNDER
2026-08-09 · TWO CLASSES OF BAR, DISTINCTION NOTED NOT
             STRUCTURED. §6 bars figures because they are wrong
             or unsupported. D3 bars the category-founding claim
             because a search was run and produced CONTRARY
             evidence. The reopening standards differ: an
             unsupported figure can be un-barred by finding
             support; a claim contradicted by evidence requires
             that evidence overturned. Marked inline as BARRED —
             CONTRARY EVIDENCE rather than by restructuring §6,
             which is premature on one instance. Logged as open
             item #42: revisit whether evidence-based bars need
             their own §6 subsection once a second instance
             exists. · FOUNDER + CC
2026-08-09 · REGISTER CONTRADICTION ON "CASH-PAY" — RECORDED, NOT
             RESOLVED. DECISIONS.md states the term is barred with
             "self-pay" as the replacement for the population.
             APPROVED-FIGURES.md states the earlier proposal to bar
             it sitewide was overruled on August 6. Two governing
             documents disagree. Surfaced by the Batch D survey,
             where the live instance sat inside markup the batch
             replaces wholesale — so Batch D is not blocked and the
             question is NOT resolved here. Logged as open item
             #43. It must be settled before any surface where the
             term survives is worked. · CC
2026-08-09 · BATCH B/C RESCOPED — THREE OF SIX COMPONENTS DO NOT
             SURVIVE INTACT. B/C was scoped as conformance removal
             from components that survive intact. The survey
             showed that premise false for three of six.
             ROIStatPanel loses all three stats and both
             footnotes. ExecutiveFAQ Q3 loses four of five
             bullets. FinalCTA loses all three tiles. Rulings
             B1-B7 follow. Recorded before the apply batch runs,
             per the decisions-first pattern established at
             DOC-15. · FOUNDER
2026-08-09 · B1 · ROIStatPanel REMOVED ENTIRELY. Do not rebuild
             it. All three stats are barred — the $1,800-$3,200
             hospital comparator and the $260-$475 USRad range
             under D5, the 75-90% savings figure under D4 — and
             both footnotes go with them. What would remain is an
             eyebrow, an empty grid and a pointer to the
             calculator. A three-stat price comparison with no
             permissible price and no permissible comparison has
             no two-stat version. Same reasoning as D11. · FOUNDER
2026-08-09 · B2 · ExecutiveFAQ Q3 REMOVED ENTIRELY. "What's the
             actual ROI timeline?" loses four of five bullets to
             D4 and D7, and its sole survivor is itself an
             unevidenced outcome claim. The question asks about
             savings and ROI, which D4 and D6 no longer permit
             answering. Do not replace it merely to preserve the
             accordion count. Six accordions become five. ·
             FOUNDER
2026-08-09 · B3 · FinalCTA TILE GRID, SIGNATURE AND H2. The
             three-tile grid — 75-90%, 30 Days, Zero — is removed
             entire, including its wrapper. The signature sentence
             is removed under D1 and D3. THE H2 IS ALSO REPLACED:
             "Your Employees Deserve Affordable Access. / Your
             Bottom Line Demands It." still implies affordability
             and financial benefit after D4 and D5 deliberately
             removed unsupported prospective economics. Approved
             replacement: "Your Employees Need Better Imaging
             Access. / Your Plan Needs Better Visibility." The
             CTA and contact mechanism survive unchanged. ·
             FOUNDER
2026-08-09 · B4 · CredibilityBar REMOVED ENTIRELY. A three-stat
             bar losing two stats. DO NOT CREATE A RULE 18
             EXCEPTION to preserve a one-stat component. The
             approved compact form "1,200+ centers" carries no
             date; the canonical form does not fit a stat tile;
             rule 18 bars a third form outright. The April 2002
             anchor is not negotiable, so the scale proof moves to
             the page narrative, where canonical prose form
             applies and the date survives naturally. · FOUNDER
2026-08-09 · B5 · STANDING RULE 26 — PRESENT-TENSE CAPABILITY
             CLAIMS REQUIRE A CURRENT OPERATIONAL BASIS.
             Present-tense claims that USRad currently possesses,
             delivers, guarantees, or has demonstrated a
             capability require a current operational basis. Where
             a capability is part of the approved planned model
             but is not yet operational, it may be described only
             as part of the planned process or program design,
             WITHOUT implying current availability, performance,
             adoption, or customer experience.
             This extends D7 from timing and outcomes to
             capability, and it reaches a defect class numeric
             sweeps do not catch: "24/7 support line," "Real-time
             quality scoring with member feedback loop," "Same
             facilities your employees already use," "Legal review
             included," "Evening and weekend availability at
             participating centers," "Pilot program option."
             It also reaches QUANTITATIVE CLAIMS WRITTEN IN WORDS.
             "Join progressive employers saving millions" is
             REMOVED OUTRIGHT: it asserts existing employer
             customers and existing results, and USRad has
             neither. "We've done this before, at scale" survives
             ONLY if explicitly reframed as AnciCare and founder
             historical experience, never as USRad experience. ·
             FOUNDER
2026-08-09 · B6 · THE 1,200+ FIGURE IS KEPT; ITS FRAMING IS NOT.
             ExecutiveFAQ placed an approved historical figure
             inside a callout answering a question about the
             reader's own implementation risk, inviting it to be
             read as capacity USRad has today. The figure is
             approved and the grammar is past tense; the framing
             is the defect. Preferred historical form where
             useful: "Founder track record: By April 2002,
             AnciCare had contracted 1,228 imaging facilities
             across 43 states." Do not force that sentence into
             the FAQ if the surrounding narrative no longer needs
             it. · FOUNDER
2026-08-09 · B7 · ACCREDITATION WORDING DEFERRED, NOT RESOLVED.
             Three accreditation standards are live across the
             employer funnel: ExecutiveFAQ states ACR
             accreditation is required for all facilities; a later
             bullet in the same component describes a broader
             verification standard covering licensure, insurance,
             accreditation and service capability; the deployed
             Employer Implementation Guide uses a third
             formulation. NOT RESOLVED IN BATCH B/C. No new
             standard may be introduced during that batch, and the
             existing sentences are neither rewritten, expanded,
             softened nor annotated. No open accreditation
             governance item existed to record this against — the
             register and tracker carry none — so this entry OPENS
             one as open item #44. Note for that item: TRACKER §4
             already records that naming ACR alone was wrong and
             that the Verified Provider Standard §5.2 recognizes
             four bodies, so the ExecutiveFAQ sentence contradicts
             a decision already taken. That is part of what #44
             must settle, not a reason to act during B/C. ·
             FOUNDER
2026-08-09 · RULE 23 AMENDED — IT VERIFIES CONTENT, NOT
             STRUCTURE. A DOC-16 edit consumed the 2026-08-09
             block's closing fence marker. For a period the file
             carried 13 fences, the block never closed, and the
             index tables sat silently inside the fenced register.
             BOTH RULE 23 CHECKS PASSED throughout: a fence marker
             is not a register line, so the deletion check did not
             see it, and swallowing trailing content preserves the
             prefix, so the prefix proof did not see it either.
             What caught it was the even-fence count, which lived
             in the batch brief rather than in the rule. Two
             structural checks are now part of rule 23: the fence
             count must be even, and the total line delta must
             equal the fenced-content delta. Recorded because the
             gap outlives this batch — a future brief written
             without the fence count would have had no defense. ·
             CC + FOUNDER
2026-08-09 · B7 AMENDED — THE ACR BULLET IS REMOVED WITHOUT
             REPLACEMENT. B7 was written believing ExecutiveFAQ's
             "ACR accreditation required for all facilities" was
             one of three unsettled formulations. Part 0 found
             otherwise: TRACKER §4 ALREADY RECORDS THAT NAMING ACR
             ALONE WAS WRONG, and that the Verified Provider
             Standard §5.2 recognizes four bodies — ACR, IAC, The
             Joint Commission, RadSite. The sentence does not
             differ from a standard not yet chosen; it CONTRADICTS
             A DECISION ALREADY TAKEN. A contradicted claim is not
             preserved merely because its replacement wording is
             unresolved. The guide specification's controlling
             rule applies: where no approved replacement exists,
             REMOVE the claim rather than infer a substitute — the
             same rule followed at D3 and D5. Batch B/C removes
             the bullet with no replacement. THIS DOES NOT
             ESTABLISH OR AUTHORIZE REPLACEMENT ACCREDITATION
             LANGUAGE. #44 remains open, and no other
             accreditation formulation may be introduced in B/C. ·
             FOUNDER
2026-08-09 · THE VERIFIED PROVIDER STANDARD IS DRAFT, NOT ADOPTED.
             It is cited by section throughout the tracker and
             several rulings now depend on it. IT IS EXPLICITLY
             DRAFT: its effective date is bracketed and
             unconfirmed, its status line reads "not yet adopted;
             bracketed items are open decisions," and Appendix B
             lists ten open decisions before adoption.
             THE ASYMMETRY THAT GOVERNS ITS USE: copy may be
             REMOVED on its basis; copy may NOT be APPROVED on its
             basis. It may inform rulings on existing claims. It
             may not serve as publication authority. Where it and
             APPROVED-FIGURES disagree, APPROVED-FIGURES governs.
             Supplied for context 2026-08-09 and CITED, NEVER
             STORED, matching the treatment of Pricing Policy V1.0
             and the AnciCare corpus. Logged as open item #45 —
             record its adoption status and track the Appendix B
             decisions that gate dependent rulings, since rulings
             are accumulating against a document that is not yet
             adopted. · CC + FOUNDER
2026-08-09 · B7 FURTHER AMENDED — §5.2 CONFIRMS THE ACR WORDING IS
             TOO NARROW. The Verified Provider Standard §5.2
             requires active accreditation from a recognized
             accrediting body — ACR, IAC, The Joint Commission, or
             RadSite — covering each advanced imaging modality the
             facility offers through USRad. ExecutiveFAQ's "ACR
             accreditation required for all facilities" is
             therefore too narrow on the draft's own terms,
             independent of the §4 ruling already recorded.
             REMOVED WITHOUT REPLACEMENT.
             Appendix B open decision 3 — "recognized accrediting
             bodies and modality coverage rules" — is the named
             upstream dependency. #44 CANNOT CLOSE until that
             decision is made, and the approved public formulation
             cannot be written from a draft. · FOUNDER
2026-08-09 · BOARD-CERTIFICATION CLAIM FAMILY — Q2 BULLET REMOVED,
             SITEWIDE FAMILY OPENED. Verified Provider Standard
             §5.7 states board certification is PROVIDER-ATTESTED
             and that primary-source board verification is
             DEFERRED to a future version. That does not support
             "Board-certified radiologists only - no exceptions,"
             and the stronger replacement "Board-certified
             radiologist reads are required under the program"
             WILL NOT BE INFERRED from a draft. The Q2 bullet is
             removed.
             THE EXPOSURE IS SITEWIDE, NOT LOCAL. The claim
             appears in roughly forty places across how-it-works,
             terms, contact, blog routes and a dozen components.
             Two escalate it to a guarantee: PromiseBanner and
             SharedProblemSolution both assert guaranteed
             board-certified interpretation.
             TWO FURTHER SECTIONS BAR THE GUARANTEE FORM
             INDEPENDENTLY. §1.3 states that Verified "is not, and
             shall not be represented as: a warranty or guarantee
             of diagnostic quality, interpretation accuracy, or
             clinical outcomes." §12 excludes full practitioner
             credentialing, including board primary-source
             verification, from Version 1.0 deliberately. So the
             guarantee language does not merely lack support — the
             standard expressly forbids that representation. #46
             is a CONTRADICTION, not an evidence gap. NOT resolved
             here and NOT actioned outside B/C. · FOUNDER
2026-08-09 · ExecutiveFAQ Q2 REMOVED ENTIRELY. The B/C spec said
             keep the accordion, on the assumption it lost three
             of five bullets. It loses FIVE OF FIVE plus its
             callout: the ACR bullet, the board-certification
             bullet, three rule 26 capability claims, and the 98%
             satisfaction callout under D9 and D1. An accordion
             titled "How do we ensure quality isn't compromised?"
             with no answer inside it is worse than no accordion.
             Same ruling as B2 for Q3 and B1 for ROIStatPanel: a
             component whose entire content is barred does not
             survive in reduced form. SIX ACCORDIONS BECOME FOUR.
             Q4 and Q6 remain, and Q6's prefunded-model
             explanation is the strongest correct content on the
             surface. · FOUNDER
2026-08-09 · B/C SCOPE EXTENDED TO Q1'S TWO CAPABILITY CLAIMS.
             "Zero disruption to existing plans" and "No IT burden
             - we handle all technical requirements" both fail
             standing rule 26: the first is an absolute guarantee
             of an outcome never delivered, the second is
             present-tense and absolute. Both sit in a component
             already being edited. REMOVED IN B/C. · FOUNDER
2026-08-09 · Q4, Q6 AND THE VERIFICATION SENTENCE DEFERRED, NOT
             APPROVED. Five further present-tense claims fail or
             arguably fail rule 26 and are NOT resolved in B/C:
             Q4's "White-label options available for branded
             experience" and its partnership callout; Q6's two
             present-tense payment sentences and its callout; and
             ExecutiveFAQ's "Active network locations complete
             USRad verification requirements," which belongs to
             #44. Q6's present tense describes the PREFUNDED MODEL
             — design rather than demonstrated capability — and is
             arguably compliant; it deserves a proper ruling, not
             a passing one. RECORDED SO A FUTURE SWEEP DOES NOT
             READ THEM AS APPROVED. Logged as open item #47. ·
             FOUNDER
2026-08-09 · DualSolution — THREE COPY RULINGS. (a) Card 1 bullet
             2 is tenseless — "Flat contracted rates in place of
             variable billing" — and no provider is contracted
             today, so it reads as a present USRad claim depending
             on the heading above it. Made explicit: "AnciCare
             contracted flat rates in place of variable billing."
             (b) Card 2 body "Breaking down the high-deductible
             barrier" is a present-tense outcome claim and was not
             in the B/C spec. Replaced with "Imaging employees can
             price before they book." (c) THE FRAMING LINE "The
             program is designed so that:" IS LOAD-BEARING, NOT
             DECORATIVE. Card 2's surviving bullets state
             capabilities that are permissible only as program
             design. Removing the framing line makes them rule 26
             violations. It may not be removed as styling. ·
             FOUNDER
```

## August 10, 2026

```
2026-08-10 · AnciCareLegacy WAS OMITTED FROM THE STAGE 3 SEQUENCE.
             /employer rendered TWELVE copy components before Stage
             3 began. The approved sequence — A, B/C, D, E, F, G, H
             — covers ELEVEN of them: two under A, six under B/C,
             two under D, the calculator under E. AnciCareLegacy is
             in none of them and still ships retired-figure
             instances after B/C completed. THE SURFACE IS NOT
             CONFORMED. It gets its OWN SHORT CORRECTIVE BATCH and
             is NOT folded into F, G or H: folding it would hide an
             omission inside an unrelated batch and leave the
             sequence record wrong. Recorded so no future session
             reads "B/C done" as "/employer conformed." The counts
             in this entry were measured against the page as it
             stood before Batch A, not taken from the brief, which
             said eleven and ten. · FOUNDER
2026-08-10 · APPROVED-FIGURES CONFORMANCE STATEMENT — NEITHER
             OVERSTATED NOR AN ESCAPED SWEEP. IT IS A COMPLETION
             CERTIFICATE FOR WORK SINCE REVERSED. The register
             states that patient-count conformance covered
             AnciCareLegacy in full and that it carries no
             remaining C1 instance. VERIFIED AGAINST SOURCE AND
             HISTORY, AND THE STATEMENT IS TRUE AS WRITTEN: Batch
             4H-c1 did cover the component in full, changing both
             live instances from the 168,000 family to 150,000+ —
             the prose credit line under the founders' quote and
             the proof-point tile. Neither hypothesis holds. The
             register does not overstate the conformance, and
             "claimants" did not escape a sweep scoped to
             "patients" — the 4H-e survey named claimants as one of
             eleven unit labels the figure wears, and 4H-c1 edited
             those exact instances.
             THE DEFECT IS STALENESS, NOT ERROR. The conformance
             this statement certifies was RETIRED 2026-08-07 and
             must be undone as open item #24, and this register
             separately rules that the 150,000 figure has no basis
             in ANY unit and that relabeling is not an available
             disposition. A reader therefore meets "covered in
             full, no remaining instance" as reassurance while both
             instances that conformance installed are barred
             output. THE CORRECTION THAT FOLLOWS IS NOT A COUNT
             FIX: the statement must be re-qualified to record that
             the conformance it certifies has been retired and that
             the instances it installed are barred pending #24.
             THE DEFECT CLASS, STATED PLAINLY: a statement that
             was ACCURATE WHEN WRITTEN, that REMAINS ACCURATE
             ABOUT WHAT WAS DONE, and that is now MISLEADING ABOUT
             WHAT IS PERMITTED. Nobody re-qualified it when the
             underlying figure was retired. NO FAULT ATTACHES TO
             ITS AUTHOR and it must not be recorded as a false
             original conformance statement — the reversal
             arrived after it, and the register carries no
             mechanism that walks back completion certificates
             when the work they certify is undone. THAT MISSING
             MECHANISM IS THE FINDING. Not edited in this batch —
             APPROVED-FIGURES is the publication authority and
             this batch is documentation only. The corrective
             batch must not be the thing that discovers its own
             authority was wrong. · FOUNDER + CC
2026-08-10 · STANDING RULE 27 — BUILT-ARTIFACT VERIFICATION.
             Where the marketing build emits inspectable HTML,
             verification runs against the BUILT ARTIFACT, not
             source alone. Discovered in Batch B/C: Astro emits
             HTML comments into the delivered page, and barred
             week-based labels plus a superseded card title were
             live in /employer view-source AFTER the visible copy
             had been replaced. Source-only verification passed
             while barred text shipped. This is a DEFECT CLASS,
             not an instance: every batch that replaces visible
             copy may leave stale comments, ids, aria-labels, alt
             text, meta tags or structured data behind. Sweeps
             must cover the built output for the same patterns
             they cover in source. · FOUNDER
2026-08-10 · TWO UNNAMED RULE 26 CANDIDATES IN ExecutiveFAQ Q5.
             "Data Security - Secure portal-based handling of
             sensitive health information" and "Direct Contracting
             - USRad can contract directly with self-funded
             employers without requiring a carrier network
             arrangement." Both assert present-tense USRad
             capability. NEITHER IS NAMED BY #44 OR #47 — they are
             the residue of #47's inventory being drawn before
             Q5's bullets were read against rule 26. NOT RESOLVED
             HERE. They require operational-basis rulings. Logged
             as open item #48. · FOUNDER
2026-08-10 · SUPPLIED COUNTS KEEP COMING IN WRONG. The B/C brief
             said twelve Implementation process bullets; there are
             eleven. The action was identical either way, but this
             is the fourth supplied count corrected at a gate this
             week — checkpoint counts twice, a figure inventory,
             and now a bullet count. Standing rule 22's re-sweep
             requirement is what catches these. Recorded so the
             pattern is visible rather than incidental: counts in
             a brief are an author's recollection, and CC's
             measurement governs. AMENDED IN THE SAME ENTRY: this
             batch's own brief supplied a fifth wrong count — the
             component and coverage totals for the Stage 3
             omission, given as eleven and ten, measured as twelve
             and eleven. The gap it identified was correct. · CC
2026-08-10 · DOC-18 BUILT-OUTPUT INVENTORY — /employer, THE THREE
             COMPLETED BATCHES ARE CLEAN. Rule 27's first
             application. Sixty-six patterns swept against the
             built page for batches A, D and B/C. NOT ONE HIT
             TRACES TO ANY COMPONENT THOSE BATCHES EDITED OR
             DELETED. Every deleted component name, the renamed
             anchor id, the week labels and every barred phrase
             return zero. Thirteen patterns are non-zero and all
             attribute elsewhere: AnciCareLegacy, which no batch
             covered, carries the retired patient count in two
             places plus the post-exit pair, the historical
             reduction range, the deductible average and the
             derived headcount; the calculator carries the flat
             rate, the network range, the reduction percentage and
             the spend default, all of which Batch E is the merge
             gate for; the sitewide footer carries the derived
             headcount once. Two are SVG path coordinates and
             three are the substring "across" — false positives,
             not claims.
             TWO FINDINGS THE SWEEP ADDED. First, /employer today
             publishes a flat per-scan rate, a network range and a
             derived savings percentage while standing rule 24
             bars every one of them until a contracted rate or a
             ratified methodology exists — the exposure is LIVE ON
             A PUBLISHED PAGE and persists until Batch E runs.
             Second, rule 27's class is wider than the six
             instances B/C fixed: the shared marketing layout
             ships a multi-line internal engineering note into the
             head of FORTY-THREE OF FORTY-NINE built pages, and
             that note documents a known accessibility concern and
             names the attribute causing it. An internal review
             note is being published sitewide. NEITHER IS
             REMEDIATED HERE — this part was inventory only. · CC
2026-08-10 · RULE 23'S STRUCTURAL CHECK BOUNDED. The
             delta-comparison check added by DOC-16 read "a
             divergence means a fence boundary moved," without
             qualification. It fires on every legitimate new dated
             block: this batch's +124 total against +119 fenced
             differs by exactly five — the August 10 heading, a
             blank before it, a blank after the closing fence, and
             the two fence markers. That divergence is legitimate
             and was accounted for line by line at the gate.
             Amended so the exception is explicit and bounded:
             in-block edits require equal deltas; a new dated
             block may differ only by its own enumerated
             structural lines; anything unexplained remains a
             failure. THE ACCOUNTING IS THE CHECK — a plausible
             difference is not an accounted one. · FOUNDER + CC
2026-08-10 · INTERNAL WCAG REVIEW NOTE SHIPS SITEWIDE IN BUILT
             HTML. CarbonLayout.astro carries a four-line
             engineering comment that Astro emits into <head> on
             43 of 49 built pages. It publicly documents a known
             WCAG 2.1 §1.4.4 concern, names the attribute causing
             it, and states that a future accessibility pass
             should evaluate removing it. An internal review note
             published sitewide. Found by rule 27's first
             application, which is the class the rule exists to
             catch — but it is a PRESENTATION AND ACCESSIBILITY
             matter, not a claim defect, and it is OUT OF STAGE 3
             SCOPE. Logged as open item #51 for a later
             presentation and accessibility cleanup. NOT
             remediated here and Stage 3 is not expanded to reach
             it. · FOUNDER
2026-08-10 · EDS FINDING 1 CLOSED ON THE PRIMARY PATH. EDS fixed
             and verified the Remix client delivery email: portal
             PR #49 merged, production at f180b3a, email verified
             clean. THE RETIRED FIGURE AND THE PRODUCED-REPORT
             CLAIM ARE NO LONGER DELIVERED ON THE PRIMARY PATH.
             Workstream A had been carrying the statement that
             this defect was live; that statement is now false and
             is corrected in the index and the tracker. Fenced
             entries recording it were accurate when written and
             are not amended.
             THE ASTRO FALLBACK IS ALSO CONTAINED, BY A DIFFERENT
             CHANGE. It remains a complete second email
             implementation and still fires whenever the Remix
             call returns non-2xx, but its ROI-CONDITIONAL CONTENT
             WAS REMOVED BY THE PRODUCTION HOTFIX — the
             projected-savings panel, the custom-ROI-report subject
             branch, the savings-analysis intro, the
             composite-case-study bullet and the retired claimant
             figure in the signature are all gone at main. The
             Remix fix did not reach it; the hotfix corrected it
             directly, and both halves of the funnel are now
             contained.
             STILL OPEN, and named so the closure is not read as
             total: the roiData PAYLOAD CONTRACT. Three instances
             survive at main — the hasRoi test, the formattedSavings
             derivation, and the forwarded payload — so the figure
             is TRANSMITTED BUT NEVER RENDERED. Removing the
             display did not remove the data flow. The D13 atomic
             closure is also still open. · FOUNDER + EDS
2026-08-10 · DOC-18's COMMIT MESSAGE CARRIES A WRONG COUNT. It
             says /employer renders eleven components and the
             approved sequence covers ten. The measured figures
             are TWELVE and ELEVEN, and both DECISIONS.md and
             TRACKER.md record them correctly with a note that the
             brief said otherwise. The gap described — one
             component, AnciCareLegacy — is identical either way,
             so nothing downstream is affected. The message is
             immutable without a force-push, which is barred.
             Recorded here so the register and the commit log do
             not silently disagree. Sixth supplied count corrected
             at a gate this week; standing rule 22 is what catches
             them. · CC
2026-08-10 · #50 — THE CONFORMANCE STATEMENT IS RE-QUALIFIED, NOT
             DELETED. RULED: the 4H-c1 patient-count conformance
             statement in APPROVED-FIGURES shall record that the
             conformance it certifies was retired 2026-08-07, that
             the instances it installed are barred output pending
             #24, and that relabeling is not an available
             disposition under section 4b. THE ORIGINAL STATEMENT
             IS PRESERVED, not replaced: it was accurate when
             written and remains accurate about what was done; the
             re-qualification records only what is now permitted.
             NO FAULT ATTACHES TO IT. The amendment is written in
             THIS batch under this ruling, and on that basis #50
             closes and #49, the AnciCareLegacy corrective batch,
             is unblocked. THE MISSING MECHANISM REMAINS OPEN —
             the register still has no general practice for
             walking back a completion certificate when the work
             it certifies is undone. Logged as open item #52.
             ⚠️ RECORDED AS EVIDENCE, NOT ONLY AS A CORRECTION.
             As first drafted, this entry was itself a COMPLETION
             CERTIFICATE FOR WORK NEVER DONE — it announced an
             APPROVED-FIGURES amendment that had not been made,
             because the gate stopped for approval as instructed.
             That is the INVERSE of the #50 defect, which is a
             completion certificate for work since UNDONE. Two
             instances of the same class, arriving from opposite
             directions, inside one batch. Independent evidence
             for #52. Not pretended completed. · CC + FOUNDER
2026-08-10 · #24 REACHED INTO AN EDS-OWNED FILE — THE INSTANCE IS
             NOW CONTAINED, THE FINDING STANDS. THE HISTORICAL
             FINDING, PRESERVED IN FULL: Batch 4H-c1 changed the
             email signature in the Astro fallback route from the
             168,000 family to 150,000+, so that route carried a
             THIRD instance of the retired figure, installed by
             the same conformance #24 must undo. The route is
             named EDS-owned in the 2026-08-08 boundary entry, and
             the boundary is functional: Workstream A documents
             defects and required outcomes in a handoff and does
             not modify these files. NO FAULT IN 4H-c1 — it ran
             2026-08-06, two days before the boundary was drawn,
             and was correct under the rules then in force. A
             WORKSTREAM A BATCH REACHED INTO A FILE THAT LATER
             BECAME EDS-OWNED, AND THE RESIDUE WAS INVISIBLE UNTIL
             SOMEONE LOOKED. That is the finding, and it is not
             erased by the symptom being gone.
             STATUS: the EDS-side instance HAS NOW BEEN REMOVED by
             the production containment hotfix. #24 is no longer
             blocked on future EDS action for that instance.
             THE REMEDY CHANGES — from a HANDOFF to a MERGE
             RESOLUTION OBLIGATION. Our branch still carries the
             stale signature line, and main no longer does.
             Resolving that conflict toward our side would UNDO
             THE CONTAINMENT and republish the retired figure into
             a live transactional email. The obligation is binding
             on the reconciliation batch, rule 2. Recorded because
             #24 gates #49, and a corrective batch that assumes it
             owns every instance would stall at this one. · CC
2026-08-10 · PRODUCTION main MOVED FOR THE FIRST TIME SINCE JULY
             30. usrad-platform PR #4 merged as 358d615, carrying
             ef3ba9a and 361b646, under the authorized EDS
             containment exception. Vercel production is READY on
             the same SHA and usrad.com serves it.
             WHAT THE HOTFIX DID, in three files. ROICalculator:
             the download promise removed end to end — the CTA and
             its icon, the success-panel report language, the
             modal heading and subtext, the submit label, and the
             client-side blob download block. employer-guide-
             download.ts: the ROI-conditional email content
             removed — the projected-savings panel, the
             custom-ROI-report subject branch, the savings-analysis
             intro, the composite-case-study bullet, and the
             retired claimant figure from the signature.
             employer-roi-report.ts: PDF generation and streaming
             removed, lead capture retained.
             NO WORKSTREAM A DOCUMENT PREVIOUSLY MENTIONED ANY OF
             THESE SHAs. The uncommitted entries cite portal PR
             #49, which is the Remix-side fix, a different change
             in a different repository. · FOUNDER + EDS
2026-08-10 · MERGE SAFETY — A FAST-FORWARD IS NO LONGER POSSIBLE.
             workstream-a-marketing forked from be2dd14 and is now
             61 commits ahead and 3 behind. Both sides have moved.
             THREE FILES CONFLICT, each edited by both sides from
             the common base: ROICalculator.astro,
             api/employer-guide-download.ts, and
             api/employer-roi-report.ts. Verified by simulated
             merge, not assumed.
             A PREMISE THIS WORKSTREAM HELD WAS WRONG AND IS
             CORRECTED HERE. The review feared a naive merge would
             silently overwrite the containment. That describes a
             copy-over, not a three-way merge. Because both sides
             edited the same regions from the same base, git
             CANNOT auto-resolve and HALTS. The containment is not
             lost silently.
             THE RISK IS DISPLACED, NOT ABSENT, AND IT IS DEFERRED
             RATHER THAN IMMEDIATE. The reconciliation merge does
             not change production: it updates the Workstream A
             branch, and production remains at main 358d615. The
             danger is that an incorrect conflict resolution
             becomes EMBEDDED IN THE BRANCH and is later carried
             back to production at the eventual Stage 3 merge. One
             wrong "take ours" would restore Served 150,000+
             claimants into a live transactional email — not
             today, but at merge. · FOUNDER + CC
2026-08-10 · RECONCILIATION RULES — BINDING ON THE MERGE BATCH.
             1. CONTAINMENT CHANGES FROM PR #4 MUST SURVIVE
             RECONCILIATION. Any resolution that removes a
             containment change is wrong by definition.
             2. api/employer-guide-download.ts's SIGNATURE LINE
             RESOLVES TOWARD main. main reads "Founded AnciCare ·
             Acquired by CorVel (NASDAQ: CRVL)". Our branch reads
             "Served 150,000+ claimants". THE RETIRED CLAIMANT
             WORDING MAY NEVER BE REINSTATED. This is the single
             most consequential line in the merge.
             3. Workstream A PRESENTATION changes remain governed
             by the Stage 3 decisions. The hotfix is containment,
             not editorial authority; it does not supersede D1
             through D13 or B1 through B7 on copy the hotfix did
             not touch.
             4. NO WHOLESALE ours OR theirs. Every conflict is
             resolved hunk by hunk against a stated rule.
             5. ANY AMBIGUOUS CONFLICT STOPS FOR REVIEW. If a hunk
             is not clearly containment or clearly presentation,
             it is reported, not decided.
             6. THE MERGE BATCH STOPS AFTER RESOLUTION AND BEFORE
             COMMIT. For each of the three conflicts it reports the
             main version, the Workstream A version, the proposed
             resolved version, and the governing rule or decision.
             It must PROVE that the employer-guide-download.ts
             resolution preserves the PR #4 containment state and
             restores none of: Served 150,000+ claimants, the
             retired report promise, savings-analysis language, the
             projected-savings panel, or the composite-case-study
             bullet.
             7. Verification after resolution: build, the rule 24
             sweep, and rule 27's built-artifact sweep, since a
             merge changes shipped output.
             RECONCILIATION RUNS AS ITS OWN BATCH, AFTER THIS ONE
             COMMITS, AND BEFORE F, G AND H. · FOUNDER
2026-08-10 · BATCH E RESCOPED — STILL THE MERGE GATE. EDS
             containment REDUCED Batch E's scope; IT DID NOT
             DISCHARGE D13. The download promise and the PDF route
             are gone upstream. E still owns: the live on-page
             savings presentation; the $350-derived calculator
             arithmetic; the related savings and bar geometry and
             the production-only waterfall and split logic; the
             remaining projectedSavings payload and data-contract
             plumbing; and the final calculator CTA and
             presentation replacing the temporary containment
             copy. NOTHING FROM STAGE 3 MERGES TO main UNTIL BATCH
             E CLOSES AND IS VERIFIED WITH EDS. Rule 25 remains in
             force. · FOUNDER
2026-08-10 · RULE 24 EXPOSURE REDUCED, NOT CLOSED. The hotfix
             contained the DOCUMENT PROMISE, not the ON-PAGE
             FIGURES. At origin/main, ROICalculator still ships
             $350, 71% and $1,200,000; $260 and $475 are gone. Our
             branch carries those and more. Do not read the hotfix
             as closing rule 24 on this surface — Batch E owns
             what remains, and the exposure is live on production
             until E closes and merges. · FOUNDER + CC
2026-08-10 · RECONCILIATION COMPLETE — 89a2eca. origin/main was
             merged into workstream-a-marketing under the seven
             reconciliation rules. The branch is now LEVEL WITH
             PRODUCTION at main 358d615: behind-count zero, 63
             ahead. The divergence that opened when main moved is
             closed, and any future movement of main will surface
             immediately as a non-zero behind-count rather than
             accumulating unseen.
             TEN CONFLICT HUNKS across three files — one in
             api/employer-guide-download.ts, two in
             api/employer-roi-report.ts, seven in
             ROICalculator.astro. No wholesale ours or theirs.
             Production was not touched and remains at 358d615. ·
             FOUNDER + CC
2026-08-10 · THE THREE FOUNDER-RATIFIED RESOLUTIONS. (a) HUNK 3.6,
             the error-handling block — KEEP THE BRANCH FIX. The
             39d8c7a block, whose commit message names it "fix
             silent submission failure," was never present on
             main; the hotfix author was removing a PDF download
             and the conflict was collateral. Deleting it would
             have restored a regression neither side intended.
             Reported as a RULE 5 STOP, resolved provisionally so
             the build could run, and held uncommitted until the
             founder decided it. (b) HUNKS 3.1-3.3, the calculator
             copy — TAKE main's CONTAINMENT COPY. Batch E owns the
             final CTA and presentation. (c) HUNK 2.1, the header
             comment — RETAIN BOTH STATEMENTS MERGED. main records
             the containment, the branch records the
             register-linked parked state, and both are true;
             picking either side would have discarded a fact. ·
             FOUNDER
2026-08-10 · #24's MERGE OBLIGATION IS DISCHARGED.
             api/employer-guide-download.ts resolves BYTE-FOR-BYTE
             IDENTICAL to origin/main — the strongest available
             form of the rule 6 proof, stronger than the pattern
             counts the rule asked for. The retired claimant
             signature did not survive. Verified zero after commit
             for Served 150,000+, claimants, Custom ROI Report,
             savings analysis, Projected Year-One Savings and the
             composite-case-study bullet. Lead capture intact.
             #24's remedy for that instance was recorded at DOC-19
             as a MERGE RESOLUTION OBLIGATION rather than a
             handoff; that obligation is now met. The historical
             finding stands unchanged: a Workstream A batch
             reached into a file that later became EDS-owned, two
             days before the boundary was drawn, and the residue
             was invisible until someone looked. · FOUNDER + CC
2026-08-10 · THE 3E-GATE WORDING IS PRESERVED AS HISTORICAL AND
             PROPOSED COPY FOR BATCH E, NOT CURRENT APPROVED COPY.
             The branch's Batch 3E-gate calculator copy — the
             success panel "Thanks — we have your figures. Michael
             will review them personally and follow up," the modal
             heading "See Your Imaging Savings," and the submit
             label "Send My Figures" — was set aside at
             reconciliation in favour of main's containment copy.
             SET ASIDE PENDING BATCH E, NOT DISCARDED ON MERIT.
             Batch E owns the final CTA and presentation and
             SHOULD HAVE THIS WORDING IN FRONT OF IT, subject to a
             rule 26 read on "Michael will review them
             personally," which is a personal-commitment claim,
             and to rule 24 on "See Your Imaging Savings," which
             is a savings headline over $350-derived arithmetic.
             Recorded here because it otherwise exists only in git
             history at daaa3ee and earlier, where E would not
             find it. · FOUNDER
2026-08-10 · #52 GAINS A MEMBER FROM A NEW DIRECTION — WORK DONE
             AND NOT RECORDED. The reconciliation happened,
             committed and pushed, and for a period NO WORKSTREAM
             A DOCUMENT MENTIONED IT: not the merge SHA, not the
             ten hunks, not the three ratifications. The register
             recorded the reconciliation RULES at DOC-19 and
             nothing recording that reconciliation OCCURRED.
             #52's earlier members are certificates for work since
             undone and for work never done. This is the third
             shape: WORK DONE, CORRECTLY, AND ABSENT FROM THE
             RECORD. Closed by this batch, but the class is what
             #52 tracks and the gap it leaves is the same — a
             future session reading the folder would have found
             rules with no execution. Also logged, from the same
             class: an APPROVED-FIGURES clause approved at one
             gate went stale before it could be written, caught
             only by re-reading approved wording immediately
             before writing it. · CC + FOUNDER
2026-08-10 · #49 · AnciCareLegacy REMOVED ENTIRELY. The component
             was omitted from the Stage 3 sequence and had never
             been surveyed. The full read found that OF TWELVE
             FIGURES, TWO SURVIVE — 1994 and the CorVel ticker —
             and both are IDENTIFIERS, NOT PROOFS. Everything
             functioning as evidence is barred, restricted or
             unadjudicated.
             EVERY SECTION FAILS STRUCTURALLY. The four-tile proof
             grid reduces to one orphaned number under a barred
             caption. The validation callout becomes a ticker
             beneath the eyebrow "THE ULTIMATE VALIDATION" with no
             proposition. All four left-column bullets are
             statistics — two barred, two unadjudicated. The
             founders' blockquote breaks MID-SENTENCE: the 90
             million figure is its pivot, and §4c is explicit that
             the signed-quote carve-out does not reach
             quantitative figures.
             THE COMPONENT'S PURPOSE CANNOT SURVIVE. Its
             centerpiece is third-party validation, entirely
             FA-class. D2 permits FA only with explicit founder
             attribution, which converts "an independent
             NASDAQ-listed company still uses our model" into "the
             founders say it does." That is a DIFFERENT ARGUMENT,
             and the callout is built to present it as documented
             fact.
             Same reasoning as D10, D11, B1 and B4: a component
             whose evidentiary content is barred does not survive
             in reduced form. Do not rebuild. The seven
             unadjudicated items leave with it and may be ruled
             later if the material is ever wanted back. · FOUNDER
2026-08-10 · DualSolution CARD 1 IS THE PAGE'S APPROVED HOME FOR
             THE AnciCare ARGUMENT. It carries the documented
             version: founded 1994 to 2002, 1,228 imaging
             facilities across 43 states by April 2002, the D3
             approved descriptor, and the ONLY D4-permitted
             instance of the historical savings floor in its
             approved form with period and comparator.
             THE SURVEY FOUND A DIRECT CONFLICT, now resolved by
             removal: AnciCareLegacy shipped 50-70% under "Cost
             reductions delivered" — the barred upper bound from a
             confidential document, stripped of period and
             comparator and re-scoped as delivered performance —
             ONE COMPONENT AWAY from Card 1's approved form on the
             same page. It also carried both barred forms of the
             category claim while Card 1 carried the approved
             descriptor. DO NOT DUPLICATE CARD 1's MATERIAL
             ELSEWHERE ON THIS SURFACE. · FOUNDER
2026-08-10 · FOUR AUDIT FINDINGS FROM THE #49 SURVEY, RECORDED
             RATHER THAN ACTIONED. (1) "20,000+ mid-market
             companies" was PREVIOUSLY UNINVENTORIED — absent from
             DECISIONS, TRACKER, APPROVED-FIGURES and
             CLAIMS-INVENTORY alike. It left with the component,
             but it existed unrecorded on a live page and no sweep
             had found it. (2) A FOURTH FA INSTANCE at
             AnciCareLegacy line 23, SPLIT ACROSS A LINE BREAK and
             therefore invisible to the grep that built the
             register's FA list. (3) THE FA INVENTORY IS STALE IN
             BOTH DIRECTIONS: it omits that live instance and
             still names CredibilityBar:33, which was deleted in
             Batch B/C. #52's fifth member. (4) ELEVEN NON-FIGURE
             PROMOTIONAL CLAIMS demonstrate a class no numeric
             sweep targets — "Perfect Timing," "self-insurance
             democratized," "Deductibles destroyed access,"
             "quality stayed flat," "THE ULTIMATE VALIDATION,"
             "still the industry standard," "can now transform
             healthcare access for everyone." Rule 26 reaches some
             of these; nothing reaches the promotional
             superlatives. Recorded as an audit finding, logged as
             open item #53. · FOUNDER + CC
2026-08-10 · SPLIT PHRASES DEFEAT LITERAL SWEEPS — TWICE IN ONE
             COMPONENT. "two decades" broke across lines 86-87 and
             "20+ years" across lines 23-24. Both return ZERO on a
             literal grep of source AND of built HTML, and both
             are present as prose. This is why the FA inventory
             was wrong. Sweeps must read for meaning, not only for
             strings, and a zero result on a multi-word phrase is
             not proof of absence. Logged as open item #54. · CC
2026-08-10 · #30 IS FAR WIDER THAN THE REGISTER RECORDS. The
             register names two "90 million" locations. A measured
             sweep during the #49 verification finds FOURTEEN LIVE
             INSTANCES ACROSS THIRTEEN FILES — partner.astro,
             about.astro, an investor route, faq.astro,
             faqbackup.astro, AboutHero.astro, a standalone
             90milliongraph.html, connectAudiences.ts, and others.
             ⛔ ONE IS CarbonFooter.astro, THE SITEWIDE FOOTER,
             WHICH SHIPS ON EVERY PAGE OF THE SITE. A barred
             derived headcount is therefore on every route while
             the register believes there are two locations. #30's
             scope is amended to fourteen; the ruling that the
             class is barred is unchanged. NOT ACTIONED HERE —
             recorded so the eventual sweep is scoped correctly. ·
             CC + FOUNDER
2026-08-10 · A THIRD SPLIT-PHRASE INSTANCE, OFF-BATCH.
             co-founder-m.astro carries "over two decades" split
             across a line break — literal grep zero, normalized
             match one. It is unsigned and third-person, so it
             fails the signed-attribution test, and it appears in
             no register list. It is a TENURE claim, not FA.
             Recorded against #54 and left in place, out of this
             batch's scope. Three split-phrase instances have now
             been found by reading and zero by grepping. · CC
2026-08-10 · THE RULE 25 GATE STATEMENT IS AMENDED, NOT SILENTLY
             CORRECTED. TRACKER's rule 25 note states that
             /employer is unconformed "because AnciCareLegacy was
             omitted from the sequence (#49)." That half is now
             CLOSED by this batch. The other half stands: the
             calculator still publishes rule 24 barred pricing
             until Batch E. Amended explicitly rather than edited
             in passing, because silently correcting a gate
             condition is precisely the class #52 tracks. RULE 25
             REMAINS IN FORCE AND THE GATE IS NOT CLEARED. ·
             FOUNDER
2026-08-10 · RECONCILIATION 2 COMPLETE — e3fbdc0. main advanced to
             d05b97c, PR #5, while the branch was 65 ahead of base
             358d615. THE BRANCH IS LEVEL WITH PRODUCTION AGAIN:
             66 ahead, 0 behind. This is the SECOND time main has
             moved during Stage 3, both on 2026-08-10, and both
             times the non-zero behind-count surfaced on the first
             state check that ran. The §1 branch-state discipline
             recorded at DOC-20 is what caught it.
             ONE FILE CONFLICTED — api/employer-roi-report.ts —
             one hunk, resolved under the seven binding rules with
             one founder ratification. No wholesale ours or
             theirs. Everything else auto-merged: the branch kept
             its totalScans destructuring, its parked-route header
             comment and its annualSavings expression, while
             taking main's error inspection, sanitized logging,
             adminNotified tracking and the 500 path. · FOUNDER
2026-08-10 · PR #5 FIXED A SILENT PRODUCTION DATA LOSS. The
             employer lead insert named wc_scans, a column ABSENT
             FROM THE LIVE SCHEMA. PostgREST resolves payload keys
             before execution, so the unknown key rejected the
             WHOLE REQUEST ATOMICALLY (PGRST204) — no row written,
             nine valid fields lost with it. supabase-js resolves
             to {data, error} rather than throwing, so the
             enclosing try/catch never fired and the route
             reported success. EMPLOYER LEADS WERE BEING DROPPED
             SILENTLY.
             The defect was PREDICTED during the first
             reconciliation, when the column-name divergence was
             noticed while reading a merged file, and ESCALATED TO
             EDS RATHER THAN DECIDED. PR #5 confirmed the
             mechanism. Recorded because the finding came from
             reading a column name during a merge, not from any
             sweep — no pattern list would have caught it. ·
             FOUNDER + EDS
2026-08-10 · health_scans OMITTED — RATIFIED ON THE LIVE SCHEMA.
             The conflict hunk turned on a fact neither side of
             this workstream held. main writes health_scans; the
             branch does not send healthScans at all, because
             Batch 3C-calc merged the two scan inputs into one.
             TAKING MAIN'S LINES VERBATIM WOULD HAVE REFERENCED
             UNDECLARED IDENTIFIERS — a ReferenceError, not a
             subtle regression. Reported as a RULE 5 STOP and held
             uncommitted.
             EDS CONFIRMED THE LIVE SCHEMA: employer_leads
             .health_scans exists, integer, NULLABLE, no default,
             ordinal 7, no drift since 2026-08-10. Omitting it
             stores NULL and violates nothing.
             RATIFIED TO OMIT. The single-input form no longer
             captures a WC/health split, and writing 0 or deriving
             a value WOULD FABRICATE DATA — the same principle
             that refused a third statistic at D8.
             ⛔ DURABLE CONSEQUENCE: employer_leads.health_scans
             NOW HOLDS A MIXED POPULATION. Pre-cutover rows carry
             the historical split; post-cutover rows carry NULL.
             IT MUST NEVER BE TREATED AS A COMPLETE POPULATION
             FIELD. Any analysis over it is bounded at this merge.
             · FOUNDER + EDS
2026-08-10 · FD-MKT-002's "COMPONENT BREAKDOWN IS KEPT" WAS
             OVERTAKEN, NOT WRONG. The ruling was authored against
             a two-input PRODUCTION file and predates Batch
             3C-calc's single-input change on this branch. It was
             CORRECT FOR THE FILE IT GOVERNED. It ceased to be
             followable when a different file, which it never saw,
             removed the input it depended on. The FD-MKT-002
             two-input ruling is NOT reopened.
             A DISTINCT SHAPE, WORTH NAMING: a ruling authored
             against production that a later branch change makes
             unfollowable. Not a statement that went stale, and
             not one that was wrong when written — one that was
             true of its own subject and silently ceased to apply
             to a different one. Cross-referenced to #52, which
             now spans five shapes. · CC + FOUNDER
2026-08-10 · THE total_scans SCHEMA QUESTION IS CLOSED, AND BATCH
             E'S BLOCKER LIST HALVES. Raised during the first
             reconciliation, escalated to EDS, resolved by PR #5.
             ⛔ D13'S ATOMIC CLOSURE NOW STANDS ALONE as Batch E's
             remaining dependency: the $350-derived calculator
             arithmetic and the projectedSavings payload contract,
             both EDS-owned, both requiring coordinated execution.
             BATCH E REMAINS THE MERGE GATE. RULE 25 REMAINS IN
             FORCE. The rule 24 exposure on /employer — $350 ×2,
             $260, $475, 71%, $1,200,000 ×2 — is unchanged by the
             merge and is still Batch E's. · FOUNDER
2026-08-10 · #55 · CarbonLayout's DEFAULT META DESCRIPTION
             CONTAINED. The default shipped FOUR DEFECTS IN ONE
             LINE on twenty routes: a D4 savings percentage AT THE
             CONFIDENTIAL 70% BOUND, a same-day access commitment
             under D7's "equivalent formulations," the #46
             board-certification family, and an UNREGISTERED
             1,500+ network count.
             MEASURED RADIUS: 20 of 48 routes — 18 static plus the
             homepage and /provider/faq, both server-rendered into
             the function bundle. ALL SIX PROVIDER MARKETING
             ROUTES, all three employer routes, the homepage,
             education, five company routes, four legal routes.
             Contamination is confined to ONE TAG: og:description
             is a separate hardcoded string, twitter:description
             does not exist, there is no JSON-LD.
             CONTAINED BY REPLACEMENT with copy carrying no
             percentage, timing commitment, network count,
             accreditation statement, or claim of an
             already-operating provider network. Option (a) of
             three. The structural question — whether the layout
             should permit a silent default at all — is
             DELIBERATELY LEFT OPEN, logged as #57. · FOUNDER
2026-08-10 · #56 · "1,500+ LOCATIONS NATIONWIDE" — UNREGISTERED,
             HIGH PRIORITY, REMOVE SITEWIDE. NINETEEN INSTANCES
             ACROSS EIGHTEEN FILES. The figure appears in NO
             REGISTER DOCUMENT, IN ANY FORM — a grep of the whole
             of docs/workstream-a/ returns nothing.
             ⛔ IT IS NOT AN INFLATION OF AN APPROVED FIGURE. The
             approved figure is 1,228 contracted imaging
             facilities in 43 states, April 2002 — a HISTORICAL
             AnciCare count, class CP. "1,500+ locations
             nationwide" is a PRESENT-TENSE CLAIM ABOUT A USRad
             NETWORK, and USRad has ZERO CONTRACTED PROVIDERS
             TODAY. Different figure, different entity, different
             tense.
             DISPOSITION: REMOVE SITEWIDE, NO NUMERICAL
             SUBSTITUTE. ⛔ DO NOT REPLACE IT WITH 1,228. That
             figure is AnciCare history and MUST NOT be repurposed
             as present USRad network scale.
             Live instances span the homepage body, HeroSection,
             three network-map components, a search loading
             overlay, ui-manager.js and the dashboard skeleton.
             Containing the layout default reaches ONE OF
             NINETEEN. NOT ACTIONED HERE. · FOUNDER
2026-08-10 · #46 SCOPE AMENDED ON MEASUREMENT — FORTY TO
             SIXTY-SIX. The item recorded "roughly forty"
             board-certification instances. A measured sweep finds
             SIXTY-SIX ACROSS THIRTY-NINE FILES, including one in
             CarbonFooter, which ships on every page, and one in a
             transactional email template. The ruling is
             unchanged; only the scope is amended.
             RECORDED AS FURTHER #52 EVIDENCE RATHER THAN SILENTLY
             CORRECTED. This is the SECOND scope understatement
             this session, after #30 was amended from two
             instances to fourteen. The pattern is now established
             enough to state plainly: A COUNT IN THE REGISTER IS A
             MEASUREMENT AT A MOMENT, AND IT DECAYS. RE-MEASURE
             BEFORE SCOPING ANY BATCH AGAINST ONE. · FOUNDER + CC
2026-08-10 · THE HOMEPAGE TITLE IS INDEPENDENTLY DEFECTIVE.
             "USRad - MRI Scans in 48 Hours, 70% Less" carries a
             D7 access commitment — 48-hour appointments is named
             in D7's removal list — and the D4 percentage at the
             confidential bound. The homepage passes it
             EXPLICITLY, so containing the layout default does not
             reach it. Corrected in this batch.
             THE TITLE EXPOSURE WAS TWO PLACES, BOTH NOW CLOSED:
             the layout default and exactly one route,
             index.astro. No other route passed it. Verified three
             ways — the #55 inventory, this batch's Part 2
             re-verification, and a post-edit sweep returning zero
             for the old string in src/. UNLIKE THE DESCRIPTION
             DEFAULT, whose four claim families remain live
             elsewhere at #46, #56 and #58, THE TITLE DEFECT IS
             FULLY CLOSED BY THIS BATCH.
             Recorded because a defect that survives its own
             containment is the kind a later sweep reports as
             already fixed. · CC
2026-08-10 · SIX ROUTE OVERRIDES CARRY THEIR OWN DEFECTS —
             RECORDED, NOT ACTIONED. Overriding the default did
             not escape the defect class. blog/uninsured-imaging-
             guide hand-writes "70% less"; blog/real-cost-of-mri
             carries $260, named in D5 and #36; membership and
             patient-promise carry "instant," a timing and
             capability construction; and four connect/* routes
             assert an ACR-ACCREDITED network nationwide — the
             single-body formulation B7 records as wrong, on a
             draft standard (#45). Logged as open item #58. ·
             CC + FOUNDER
```

## August 11, 2026

```
2026-08-11 · BATCH F RESCOPED FROM CONFORMANCE TO REWRITE. The
             survey found TWELVE OF FIFTEEN contents claims
             misdescribe the deployed guide. Every section the
             register records as removed was still advertised,
             MOST OF THEM TWICE — once in the hero list and once
             in a card grid describing the same six things. Seven
             of eight sections lost most or all content under
             conformance. Five sections removed entirely because
             each existed primarily to hold barred or obsolete
             content. THE DEPLOYED 8-PAGE GUIDE IS THE SOLE SOURCE
             OF TRUTH FOR WHAT THE PAGE MAY SAY IT CONTAINS. The
             route now supplies its own meta description rather
             than inheriting the sitewide default. · FOUNDER
2026-08-11 · D12 EXTENDED ACROSS THE PAGE — NO DELIVERY
             ASSERTIONS. D12 removed "We'll send the guide to your
             inbox immediately" BY NAME and barred any replacement
             assertion. That sentence was STILL LIVE VERBATIM,
             plus four more: "Get Instant Access," "Guide on its
             way!", "Check your inbox.", "Send Me the Guide." All
             five removed. THE PAGE MAY DESCRIBE THE USER'S
             ACTION; IT MAY NOT CLAIM THE DOWNSTREAM DELIVERY
             OCCURRED.
             The mechanism makes this more than wording: the
             success panel fires on HTTP 200, and the EDS-owned
             endpoint returns success on its honeypot and timing
             paths WHILE DELIBERATELY SENDING NOTHING. A success
             message asserting a delivery designed not to occur.
             Endpoint untouched; recorded against #38. ·
             FOUNDER + CC
2026-08-11 · THE FINE-PRINT BLOCK IS REMOVED WITHOUT REPLACEMENT.
             "No spam. No sales calls unless you ask. Unsubscribe
             anytime." Forward CONDUCT commitments and a MECHANISM
             assertion that no rule reaches and nobody has
             verified. Rule 26 governs capability, rule 7 governs
             timing; neither reaches a promise about future
             contact behavior. Removed rather than requalified. ·
             FOUNDER
2026-08-11 · THE ACCREDITATION REMOVAL IN F IS DELIBERATE. The
             page carried the corrected four-body wording — the
             right form — but the Verified Provider Standard is a
             DRAFT (#45), the deployed guide's licensing and
             accreditation table was REMOVED, and B7 defers the
             public formulation to #44. Removed with no
             replacement. THE PAGE NOW CARRIES NO ACCREDITATION
             LANGUAGE, AND THAT IS INTENDED. #44 and B7 are
             neither resolved nor superseded. · FOUNDER
2026-08-11 · FOUR SUPPLIED FACTS WERE CONTRADICTED BY THE
             REPOSITORY. (1) and (2): de4b5a8, then bb50c74, were
             recorded as DOC-21's SHA. NEITHER RESOLVES IN THE
             OBJECT DATABASE. Git verification across all refs
             established 704f452, confirmed three ways — the
             commit graph, the commit's own file stat matching row
             66's description, and the TRACKER's existing
             references. Row 66 was already correct because the
             SHA was written from git output rather than from the
             prompt. (3): these four entries were dated
             2026-08-10; Batch F ran on the 11th. (4): DOC-21 was
             recorded as pushed when it was committed and NOT
             pushed — origin still read e3fbdc0, and the push
             authorization had been requested and never given.
             ALL FOUR WERE CAUGHT BEFORE COMMIT, each by checking
             a supplied fact against the repository rather than
             accepting it. §1 line 8 was correct throughout and
             was nearly overwritten with a false push state — in
             the one section whose purpose is to be the
             branch-state detector. THE SESSION RECORD DRIFTED
             AHEAD OF WHAT HAD ACTUALLY HAPPENED; the repository
             did not. · CC + FOUNDER
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
| 22 | $246M removal — /about and homepage need section rewrites, not find-and-replace | **MERGED** into the page-by-page rewrite, 2026-08-07. Open |
| 24 | Retire "150,000+ patients" sitewide — 38 instances, per-component decision on what proves what | **MERGED** into the page-by-page rewrite, 2026-08-07. Open |
| 26 | Locate the 2002 final or short-year tax return | evidence gap |
| 27 | Duration claims — sweep "over N years" / "a decade" describing AnciCare's operating life | **MERGED** into the page-by-page rewrite, 2026-08-07. Open |
| 28 | 4.9★ satisfaction — `SocialProofBar:36`, fourth variant | #18 adjacent |
| 29 | 50–70% published where the 50%+ floor is required — 6 locations | confidentiality |
| 30 | "90 million Americans" — derived headcount class | 2 locations |
| 31 | Patient counts outside the 150,000 family — `cost-saving-tips:1100`, `real-cost-of-mri:907` | blog routes |
| 33 | Does Remix read `procedure`? Verify `PatientHeader` param mapping against the adjacent repo | one line if yes |
| 34 | Provider-surface disclosure of internal modality fee amounts — conformance sweep under settled §4 | settled decision, open implementation |
| 35 | MarketScopeShowcase discovery price and savings display — removal under settled §5 | settled decision, open implementation |
| 36 | Sitewide 260-dollar family, 35 instances — deferred to the page-by-page sequence | not this batch |
| 37 | Employer-surface pricing figures (350, 260 to 475, 420) — resolved in the Stage 3 `/employer` pass | Stage 3 |
| 38 | EDS employer-funnel handoff — **Finding 1 CLOSED on the primary path 2026-08-10** (Remix client email fixed and verified, portal PR #49, production `f180b3a`). **Still open:** the Astro fallback template, the `roiData` payload contract, the D13 atomic closure. Dependency, not Workstream A work | blocks rule 25 |
| 39 | `APPROVED-FIGURES` §6 dates the CorVel sale to 2013; §4a and the closing letter date it May 2002 | register defect |
| 40 | Rule 18 does not reach date forms — "founded in 1994" ruled correct for prose | rule 18 amendment |
| 41 | Audit existing line-number citations for staleness. The cite-by-section convention is already settled | audit only |

> **#22, #24 and #27 are MERGED, not closed.** They are executed together as one
> page-by-page rewrite — see the dated entry *"#22, #24 AND #27 MERGE INTO ONE
> PAGE-BY-PAGE REWRITE"*, 2026-08-07. Each remains open until its claims are
> resolved on every page.

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
| ~~19~~ | ~~ROI PDF phone (888) vs resolved (866)~~ | **RESOLVED.** `generateROIReport.ts:1431` reads (866) USRad24, corrected in `e1a6119` and confirmed in a generated PDF · CC — ⚠️ **QUALIFIED 2026-08-07:** that PDF cannot have come through `/api/employer-roi-report`, gated since `39d8c7a` (Aug 5). It was produced by invoking `generateROIReport()` directly. The fix is correct; the surface it verified is not user-reachable |
| ~~25~~ | ~~Replace "over $150 million" with "$60M+ paid to imaging centers"~~ | **CLOSED — 4H-c3 (`99ba3d5`), 14 instances / 11 files.** One more than the register predicted. Verified by re-sweep, build exit 0, mirror hash match, screenshots at 1440/390 · FOUNDER |
| ~~32~~ | ~~`generateROIReport.ts` — external caller or orphaned?~~ | **CLOSED — UNREACHABLE, deliberately.** `39d8c7a` (Aug 5) removed the import, call, buffer and streaming response. No external hook: `vercel.json` empty, no workflows, no Docker, no scripts, no env vars, all Remix traffic outbound. Parked pending the flat-fee pricing rebuild; standing rule 9 applies on reactivation · CC |
