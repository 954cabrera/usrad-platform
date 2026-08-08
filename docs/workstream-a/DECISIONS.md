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
| 38 | EDS employer-funnel handoff outstanding — transactional email is delivering retired material until EDS acts. Dependency, not Workstream A work | blocks rule 25 |

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
