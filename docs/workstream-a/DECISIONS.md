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

             SECOND INSTANCE — 2026-08-12 (DOC-22). The same
             failure recurred one day later and larger. Six
             supplied SHAs do not exist in the object database:
             2ea4e97, db19ed3, 4a45c8d, f5c9f14, and de4b5a8 and
             bb50c74 already recorded above. Four batches were
             reported complete that have no commit anywhere
             across all refs — DOC-22, Batch F-1, Batch G, Batch
             H — and no register entry either. Batch F was real
             but reported under a SHA (2ea4e97) that does not
             resolve; its true SHA is 547e106.

             THE REPOSITORY WAS CLEAN THROUGHOUT. git reflog -20
             shows twenty entries, every one "commit:" or
             "commit (merge):". No reset, no rebase, no
             force-update. Nothing was rewritten and nothing was
             lost. Four of the six fabricated SHAs and all four
             phantom batches appear NOWHERE in
             docs/workstream-a/ — the durable register never
             accepted any of it. The divergence was
             conversational state carried forward as fact. The
             register held; the channel reporting to it did not.

             This entry's own label, DOC-22, was among the
             batches reported and never committed. It had zero
             occurrences in the register, so the label was
             unused and is taken here for this reconciliation.
             The phantom DOC-22 corresponds to no commit and no
             work.

             Evidence: item #52. · CC + FOUNDER
```

## August 12, 2026

```
2026-08-12 · BATCH G IS A REWRITE AND REMOVAL BATCH, NOT A
             CONFORMANCE BATCH. /employer/schedule and
             EmployerConsultationForm were rewritten against what
             can be supported. Barred and unsupported claim
             families were REMOVED WITHOUT SUBSTITUTION: no
             replacement figure, no softened restatement, no
             smaller number in the same slot. Three sections went
             entire — the credibility strip, the trust-indicator
             stats block, and the "A Message From Our President"
             testimonial — each because it existed primarily to
             hold barred content, the D10/D11/B1/B2/B4/#49
             reasoning. Removed across the route and the
             component: 150,000+ (four instances), the
             category-founding claim (five), 75-90% (four),
             50–70% (three), "30 years of expertise" and the
             "30+ Years Experience" tile, "Est. 1994", the
             30-day implementation language (three), "Custom ROI
             analysis," "Detailed savings projection," "Real case
             studies," "saving millions," "Complimentary
             Executive Briefing," "No sales team," and the
             "Calculate Your Savings First" CTA pointing at the
             Batch E calculator. THE LAST FA INSTANCE IS GONE:
             schedule:202-203, "Model acquired by CorVel (NASDAQ:
             CRVL) · Still operating 20+ years later," which a
             literal grep never found because the phrase broke
             across a line. The FA class now has ONE live
             instance left, implementation-guide:322. What
             replaces the removed argument is the prefunded
             model stated as a MODEL, not as an operating
             network — rule 26 bars the present-tense
             operating-network implication. · FOUNDER
2026-08-12 · THE FALSE STATUS STEP AND THE FAILURE PATH THAT
             ASSERTED SUCCESS. EmployerConsultationForm rendered
             a COMPLETED checkmark reading "Savings analysis
             being prepared." Nothing in the submit path prepares
             any analysis; the endpoint inserts a row and sends
             an email. This is stronger than the ROICalculator
             class recorded at #52 — not a label offering a
             deliverable that does not exist, but a status
             indicator asserting work already done. Removed. ⛔ A
             SECOND INSTANCE IN THE SAME COMPONENT: on API
             failure the catch called showSchedulingStage(false),
             which rendered BOTH completed checkmarks and the
             "Request Received" heading, THEN a notice saying the
             submission failed. The page asserted receipt and
             analysis in the same view that said neither had
             happened. The failure branch now renders no status
             steps and no confirmation message at all — only "We
             couldn't record your request. You can still book a
             time below," then the scheduler. Verified in a
             browser with fetch forced to reject: statusSteps
             display none, confirmationMessage display none, and
             the string "Request Received" absent from the
             document. · FOUNDER
2026-08-12 · BATCH H (EmployerConsultationForm) DISSOLVED INTO G,
             2026-08-12. The component renders unconditionally at
             schedule.astro:299 and is not an independent
             surface. One component cannot carry two batch
             labels. H is retired as a label; its scope is G's. ·
             FOUNDER
2026-08-12 · 2ea4e97 does not resolve in the object database. It
             was associated with Batch F in conversation only.
             Batch F's verified commit is 547e106. Recorded as
             another instance of the conversational-provenance
             problem at #52; no separate open item. This
             statement is attributed to NEITHER the founder NOR
             repository evidence — the repository can confirm
             only that 2ea4e97 does not resolve and that 547e106
             is Batch F. The association itself is
             conversational. · CC
2026-08-12 · THE PAYLOAD DID NOT MOVE. The four synthetic fields
             the form sends — industry "not-disclosed",
             imagingChallenges [], annualBudget "not-disclosed",
             specificNeeds "" — REMAIN EXACTLY AS THEY WERE, and
             so does the endpoint, the POST body, the 10-digit
             phone validation, the submit label and every field,
             option and placeholder. G is presentation-only on
             the form. The fields persist into
             employer_consultations as though collected; that is
             a data-contract question for EDS, not a copy
             question, and it does not move until EDS verifies
             the contract. api/employer-consultation.js performs
             transactional email and database writes and is
             EDS-owned under the functional boundary. NOT
             TOUCHED. · FOUNDER
2026-08-12 · WHAT G DELIBERATELY DID NOT REACH. CarbonFooter
             ships "up to 70%" (D4) and "Board-Certified
             Radiologists" (#46) on every route that does not
             pass hideNewsletter={true}. /employer/schedule
             passes it, so both are absent here — CLEAN ONLY
             INCIDENTALLY, by a layout prop, not by remediation.
             Opened as #60. The footer's "90 million Americans"
             (#30) is NOT gated and still ships on this route;
             confirmed unchanged at one instance. The Calendly
             privacy and consent findings are #61 and are NOT
             adjudicated here. The "prefunded imaging network"
             construction is #62. None of the three was actioned
             in G; all three are sitewide or counsel questions,
             not route work. · FOUNDER
2026-08-12 · BATCH G VERIFIED AT fa4a001. Four files, verified
             independently from git rather than accepted from the
             brief: the commit resolves, 323829e is an ancestor,
             and the stat lists exactly DECISIONS.md, TRACKER.md,
             EmployerConsultationForm.astro and schedule.astro.
             Rule 27 build check: 24 assertions, 0 failures. NO
             PERCENTAGE OF ANY KIND SURVIVES ON THE ROUTE — the
             residual sweep returns zero for the bare "%"
             character in rendered text. The failure state was
             not inferred from the source; it was EXERCISED AT
             RUNTIME by overriding window.fetch to reject, then
             reading the result: statusSteps display none,
             confirmationMessage display none, "Request Received"
             ABSENT FROM THE DOCUMENT, and the notice text exact.
             ⛔ THREE REMOVALS BEYOND BRIEF SCOPE, EACH REPORTED
             RATHER THAN ADAPTED AROUND. (1) The "30 years of
             expertise" box carried a FOURTH 150,000+ instance and
             sat outside every named removal section; the step-11
             zero requirement forced it, so the brief's section
             list and its own verification gate disagreed. (2)
             buildCalendlyUrl, CALENDLY_BASE and CALENDLY_SCRIPT
             were orphaned by removing injectCalendly — its only
             caller and its only callees — and went with it rather
             than being left as code this batch made dead. (3) Two
             script writes to the deleted confirmCompany element
             WOULD HAVE THROWN TypeError ON null AND BROKEN THE
             ENTIRE SCHEDULING REVEAL; removing the element
             without them was not optional. · CC + FOUNDER
2026-08-12 · EVIDENCE RULE AMENDED — STANDING RULE 8. Visual
             verification may be EITHER persisted to an
             established evidence directory OR performed
             in-session and documented in the batch record where
             no repository convention exists. Batch G closed under
             the second form: no screenshot directory exists here
             and writing image files would have breached its
             four-path scope. A MISSING CONVENTION IS NOT A
             MISSING CHECK — the alternative to persistence is
             documentation, never omission. ✅ RUNTIME
             INSTRUMENTATION OF A STATE IS STRONGER EVIDENCE THAN
             AN IMAGE, and is the preferred form wherever a state
             can be exercised. An image shows a rendering and
             invites the reader to judge it; instrumentation
             asserts a fact about the document — display values
             and content assertions — that can be quoted into the
             register and re-run. Recorded because Batch G's most
             important verification, the failure path, could not
             have been established by a screenshot at all: the
             defect was that a success state rendered, and the
             proof is its ABSENCE. · FOUNDER
2026-08-12 · METHOD FINDING — CONTENT-ANCHORED EDITS ARE REQUIRED
             ON REDUCTION BATCHES. Batch G removed 362 lines
             across two files by LINE RANGE. Three structural
             breaks resulted, all caught before the build and all
             reported: a lost flex wrapper around the surviving
             hero tile, a broken </h2> indent, and a Python string
             concatenation that dropped a closing quote on a class
             attribute. LINE RANGES SHIFT UNDER THEIR OWN EDITS,
             and a range computed against the pre-edit file is
             wrong the moment an earlier range is applied. Editing
             bottom-up controls the arithmetic but not the
             off-by-one at a boundary. ⛔ ON ANY BATCH REMOVING
             SUBSTANTIAL CONTIGUOUS MARKUP, EDITS MUST BE ANCHORED
             TO CONTENT, NOT TO LINE NUMBERS. This bears directly
             on BATCH E: a reduction batch on a file carrying a
             LIVE PAYLOAD CONTRACT, where the same class of slip
             would not break a wrapper but a data flow, and where
             the build may not catch it. · CC + FOUNDER
2026-08-12 · "NATIONWIDE NETWORK" TILE — FINDING ONLY, NOT
             ADJUDICATED. It survives on /employer/schedule in the
             hero grid. Its removal was not instructed by Batch G
             and IT WAS CORRECTLY LEFT IN PLACE. It is two
             problems in one element: (i) a present-tense
             capability claim under rule 26, a nationwide network
             asserted while no provider is contracted, adjacent to
             open item #62; and (ii) the visual orphan in a
             sm:grid-cols-3 container now holding one cell,
             rendering in the first third and wrapping to two
             lines at 1440px. ⛔ COPY AND LAYOUT RESOLUTION ARE
             COUPLED. THE GRID IS NOT TO BE RESTYLED
             INDEPENDENTLY — that would polish an element that may
             be removed, and would quietly convert a layout fix
             into an argument for keeping the copy. Both resolve
             together under the existing rule-26 / network-claim
             adjudication. /employer/schedule IS NOT RECORDED AS
             COMPLETE WHILE THIS IS OPEN. Opened as #63. · FOUNDER
2026-08-12 · STAGE 3 SCOPE — THE PREMISE WAS CHECKED AGAINST THE
             REGISTER AND THE REGISTER CONTRADICTED IT. It was put
             to this session that /press-kit had been referred to
             repeatedly in conversation as following Stage 3, and
             that the reference did not originate in the register.
             ⛔ THAT IS NOT WHAT THE REGISTER SAYS. TRACKER §12
             ROW 3, "Page-by-page rewrite," NAMES /press-kit
             FIRST, BY EXPOSURE, in an eight-surface order:
             /press-kit → /about → / → /provider → /employer →
             /employer/schedule → /employer/implementation-guide →
             the single-instance routes. It is corroborated by
             DECISIONS.md 2026-08-07, "/press-kit REBUILT, not
             thinned," which rules how the surface is to be
             rebuilt, and by four #24 instances recorded at
             press-kit.html. /press-kit IS REGISTER-BORNE AND IS
             PART OF STAGE 3. ⚠️ WHAT IS TRUE IS NARROWER AND
             DIFFERENT: "Stage 3" DENOTES TWO SCOPES IN ONE
             SECTION. Row 3 is the eight-surface page-by-page
             rewrite; the sub-heading "Stage 3 /employer —
             approved batch sequence" covers ONLY the three
             /employer* surfaces via P2/A/B–C/D/E/F/G. Reading the
             batch sequence as the whole of Stage 3 understates it
             by five surfaces, and that ambiguity — not a phantom
             reference — is the real defect. Nothing here moves
             any surface into or out of the merge gate; the gate
             is Batch E and is unchanged. ✅ RECORDED AS THE
             INVERSE OF #52: not a conversational claim that
             entered the record unchecked, but a conversational
             claim that the record REFUTED when checked. The check
             is what both cases have in common. · CC + FOUNDER
2026-08-12 · BATCH G-1 · "NATIONWIDE NETWORK" TILE REMOVED UNDER
             RULE 26. The claim has NO CURRENT OPERATIONAL BASIS:
             USRad has no contracted providers, so a nationwide
             network is not something the company currently
             possesses. Rule 26 permits a capability that is part
             of the approved planned model to be described only
             as planned, without implying current availability;
             this tile implied current availability and carried
             no qualification. REMOVED WITHOUT SUBSTITUTION per
             founder ruling — no replacement copy, no softened
             restatement, no smaller claim in the same slot. ⛔
             THE NOW-EMPTY GRID CONTAINER WAS REMOVED, NOT
             REFLOWED. The container held exactly one cell after
             Batch G and was verified to hold nothing else before
             the edit. Collapsing it to a single column would
             have polished a slot the copy had just vacated, and
             would have left a layout arguing for content to fill
             it. The hero left column now holds its h1 and its
             paragraph and closes — confirmed in the BUILT
             HTML, not source, and confirmed at runtime: the
             column reports exactly two children, both with real
             height, sm:grid-cols-3 absent from the document, and
             the two remaining empty divs on the page identified
             as the pre-existing pulse-dot and the Calendly
             container. Build exit 0; 20 of 20 artifact
             assertions pass. "nationwide" case-insensitive
             returns ONE instance page-wide — CarbonFooter's
             AnciCare sentence, which is a HISTORICAL statement
             about a network that did exist and is NOT in scope.
             #63 CLOSED. ✅ /employer/schedule IS CONFORMED AND
             CLOSED AS A ROUTE, pending only the Stage 3 merge
             gate at Batch E. ⚠️ Read that narrowly: the route is
             closed, the SURFACE PROGRAMME is not — #60, #61,
             #62 and #64 remain open and none of them is route
             work. · FOUNDER
2026-08-12 · THE COUPLING RULE WORKED, AND IT IS WORTH NAMING
             WHY. DOC-23 recorded the tile as TWO problems in one
             element — a rule 26 copy claim and a one-cell grid —
             and barred restyling the grid independently. Had the
             layout been fixed first, the page would have carried
             a tidy single-column tile whose only defect was
             invisible, and the copy question would have lost the
             thing that made it visible. Removing the copy
             dissolved the layout problem entirely: there was no
             grid left to reflow. RECORDED AS A GENERAL SHAPE —
             where a copy defect and a layout defect occupy the
             same element, resolve the copy first; the layout
             question may not survive it. · CC + FOUNDER
2026-08-12 · BATCH E · D13 ATOMIC CLOSURE SATISFIED. Presentation
             and arithmetic closed in ONE COMMIT, as D13 requires.
             Removed together, both ends: the $350 assumption and
             its literal; usradCost; usradPct and the usrad-bar
             geometry; currentSavings and every reader; the hero
             savings card, savings-percent, usrad-cost,
             usrad-spend-line and the modal projected-savings
             panel; the pricing disclaimer with its $260–$475
             range; the "Not included in calculation" block;
             annualSavings server-side with its log reader and
             its projectedSavings payload field; and the roiData
             receiving half in employer-guide-download.ts.
             PORTAL TOLERANCE FOR AN ABSENT projectedSavings WAS
             VERIFIED DEPLOYED BEFORE THE SENDER STOPPED — the
             ordering D13 requires, and the reason nothing renders
             "undefined" downstream. · FOUNDER
2026-08-12 · WHAT WAS RETAINED, AND WHY IT IS NOT A PROJECTION.
             currentSpend = totalScans × avgCost is RETAINED under
             D6, together with current-bar and bar-current-cost.
             Every input is the VISITOR'S OWN and the output is
             their own arithmetic; USRad asserts nothing. What
             Batch E removed is the PROJECTED USRAD ECONOMICS —
             the rate, the comparison, the savings and the
             percentage. The distinction is the whole of D6 and
             must not be collapsed by a later sweep that sees a
             dollar figure and assumes a claim. NO SUBSTITUTE
             FIGURE, HEADING OR COPY WAS INTRODUCED ANYWHERE.
             roi-context was removed WITHOUT REPLACEMENT — it read
             "Estimated savings for a N-employee workforce," a
             savings assertion that outlived its subject — and the
             results section is left HEADERLESS BY RULING. · FOUNDER
2026-08-12 · avg_cost_per_scan — SEPARATE RULING, NOT PART OF THE
             D13 REMOVAL. The insert persisted
             Number(avgCost || 2400), fabricating a per-scan cost
             that was never collected. It now persists the ACTUAL
             value when the visitor supplied one and an EXPLICIT
             NULL when they did not. Basis is NO-FABRICATED-DATA,
             following the health_scans precedent — writing a
             number nobody entered is the same defect whatever the
             column. EDS verified the live schema before the
             change: integer, NULLABLE YES, no default, ordinal 8.
             ⛔ Recorded as its own ruling so that reopening the
             D13 savings question does not reopen this, and vice
             versa. · FOUNDER + EDS
2026-08-12 · F2 · A SHARED GUARD CAN SILENTLY KILL A SURVIVING
             ELEMENT. The bar guard read
             if (currentBar && usradBarEl && avgCost > 0).
             Removing usrad-bar makes usradBarEl null, the guard
             permanently false, and the RETAINED current-bar write
             never executes — WITH NO ERROR, NO NULL DEREFERENCE
             AND NOTHING IN THE CONSOLE. The page would have
             looked intact while a preserved element quietly
             stopped updating. ⛔ GUARDS MUST BE RE-READ WHENEVER
             AN OPERAND IS REMOVED; removing a compared element is
             not a local edit. Proven by POISONING the element to
             7% and firing a real input event, then confirming it
             returned to 100%. Asserting the element still exists
             would NOT have caught this — only exercising the
             write did. · CC + FOUNDER
2026-08-12 · RULE 27 QUALIFIED IN TWO PARTS.
             (i) BUILT-ARTIFACT VERIFICATION MUST SWEEP COMPILED
             CLIENT JS, NOT PAGE HTML ALONE. Component scripts
             compile to /_astro/*.js and an HTML-only sweep
             reports a FALSE ZERO. ⚠️ Sharper than first recorded:
             THE OUTPUT LOCATION IS NOT STABLE. Before this batch
             the calculator arithmetic lived in an external chunk;
             after it, the script shrank below Astro's inline
             threshold and moved INTO the page HTML, and the chunk
             ceased to exist. A sweep pinned to either location
             alone would have missed it in one of the two builds.
             SWEEP BOTH, ALWAYS, AND GLOB THE CHUNKS FRESH —
             hashes change on every build.
             (ii) SOURCE-COMMENT references documenting removed
             logic are CLASSIFIED SEPARATELY from executable code
             and from published-artifact hits. The replacement note
             in employer-roi-report.ts names $350, projectedSavings
             and 2400 because a note recording a removal cannot
             avoid naming what was removed. Zero live code, zero in
             the artifact. ⛔ COMMENTS ARE NOT TO BE REWORDED TO
             DEFEAT A SEARCH — that degrades the record to pass a
             check, which is the inverse of what the check is for.
             · FOUNDER
2026-08-12 · TWO OUT-OF-BRIEF REMOVALS, BOTH APPROVED, BOTH
             FORCED BY THE BATCH. (1) currentEmployees became dead
             when its only two readers — the modal context display
             and roiData.employees — were removed; it surfaced as a
             NEW type-check warning against a previously clean
             set-diff. (2) The local totalEmployees read inside
             updateCalculator became dead when roi-context went.
             Both removed rather than left as code this batch
             created. ⚠️ CONSEQUENCE RECORDED: the employees INPUT
             now drives NOTHING VISIBLE on the page. It is
             RETAINED because it remains a lead-capture POST field
             — verified in the browser, totalEmployees still
             transmits to /api/employer-roi-report and still
             persists to employer_leads.total_employees. It must
             not be removed as unused. · FOUNDER
2026-08-13 · /provider SURFACE CLOSED. Ten rendered components through
             evidence remediation plus a whole-page composition
             review. ExitValueSection and ProviderBrief removed from
             render; eight components corrected; build exit 0.
             SEQUENCING: /provider was worked FOURTH in §12 row 3's
             order but FIRST in practice, ahead of /press-kit,
             /about and /. Founder prerogative, recorded here
             because the register did not carry it. Row 3's order
             is otherwise UNCHANGED and /press-kit remains named
             first by exposure. · FOUNDER
2026-08-13 · ProviderBrief CONTAINMENT RATIFIED. <ProviderBrief />
             commented out of provider.astro; component and PDF
             PRESERVED. The on-page section reproduced $375 net
             margin per scan, $5K-$10K and "Guaranteed Monthly
             Revenue" in HTML, and the button served a PDF carrying
             the same figures plus "within 10 days of fulfillment"
             — a 4D-a regression. The HTML was correctable; the
             PDF was not, being ReportLab-generated outside this
             repo. Editing only the HTML would have left the page
             clean while the download served every barred figure in
             a file explicitly marketed for internal forwarding.
             CONTAINMENT, NOT RETIREMENT — the Provider Opportunity
             Brief strategy remains approved for later revision.
             ⚠️ The PDF REMAINS REACHABLE at its static path;
             removing the section removed the entrance, not the
             file. Carried, not actioned. This entry supplies the
             authority TRACKER 4H-d never had. · FOUNDER
2026-08-13 · MARKETSCOPE RECOMMENDATION LAYER REMOVED. §3 and §8e
             pointed opposite ways and the ambiguity is now
             resolved: USRad MAY present market intelligence and
             reference points a center uses when setting its rate;
             USRad MAY NOT present the Strategy tab as recommending
             a specific Medicare percentage for that center.
             APPROVED-FIGURES §3 protects the market-based
             rate-setting model and the underlying strategy and
             reference data. It does NOT require an automated or
             center-specific percentage recommendation. TRACKER §8e
             correctly describes the intended presentation —
             Medicare allowable, workers' compensation reference,
             local market range, with no recommended percentage, no
             projected volume, no algorithm. REMOVED: the
             market-recommendation block, both "Recommended for
             Your Market" badges, recommendedStrategy and
             strategyRange across all five dataset entries, the
             supporting JS, and the pricing-table column highlight.
             RETAINED: the 120-130% and 180-200% Medicare tier
             ranges as protected rate-setting reference points.
             · FOUNDER + ADVISOR
2026-08-13 · 15-25 SCANS/MONTH — TWO EDITORIAL PLACEMENTS APPROVED.
             The §1b volume basis is now published in
             ScannerUtilization (rebuilt left card) and FAQSection
             (the rewritten volume answer). Neither component
             previously carried it, so these are NEW placements,
             not conformances. Both are subject to their stated
             qualification — a deliberately conservative planning
             basis, not a forecast or commitment, with volume
             varying by market, modality mix and center — and to
             the §1b restriction of 2026-08-08: NO DOLLAR
             PROJECTION MAY BE DERIVED FROM THE FIGURE. · FOUNDER
2026-08-13 · MARKETSCOPE MEDICARE DATASET FIGURES RATIFIED, AND §8e'S
             113 LOCALITIES SUPERSEDED. Approved and publishable:
             60,277 Medicare pricing records and 109 Medicare
             localities, sourced to the archived CMS 2026 Medicare
             Physician Fee Schedule implementation record. ⛔ §8e's
             "what stays" list retained "Medicare pricing database
             (113 localities)" — 113 IS WRONG AND WAS NEVER
             CORRECT; the implementation record states 109
             consistently. The register was protecting an error and
             a session relied on it. The published 43,600+ record
             count is ALSO retired: it was a rounded-up restatement
             of the 2025 row, itself written as an approximate
             ~43,491, and superseded by the 2026 rebuild. REMOVED
             WITHOUT SUBSTITUTION from the same stat bar: 15,000+
             Facilities Analyzed (no provenance) and "Real-time
             Market Updates" — the latter contradicted by the
             source, which documents an ANNUAL CMS rebuild.
             · FOUNDER + ADVISOR
2026-08-13 · #30 — THE 90 MILLION DERIVATION IS NOW ON THE RECORD,
             AND THE BAR IS REASONED RATHER THAN BARE. The retired
             headcount appears to have been constructed as
             ~30M uninsured + ~60M underinsured. THE CONSTRUCTION
             FAILS ON THREE INDEPENDENT GROUNDS. (1) The ~30M
             uninsured input is an OLDER ESTIMATE, superseded by
             the approved CDC/NHIS figure of 28.0M. (2) NO
             GOVERNING SOURCE HAS BEEN ESTABLISHED FOR THE ~60M
             UNDERINSURED INPUT. It is not that a different value
             is correct — it is that no approved source supports
             this one, and none has been identified. (3) SUMMING
             THE TWO POPULATIONS LACKS AN APPROVED METHODOLOGY.
             Uninsured and underinsured are measured by different
             instruments against different denominators, and no
             governing source establishes that they may be added.
             D8 retired the figure on evidence it did not have;
             this records the construction so the ruling is not
             relitigated. ⛔ NOTHING IN THIS ENTRY APPROVES A
             REPLACEMENT VALUE for either input beyond the already
             approved 28.0M. · FOUNDER
2026-08-13 · PROSPECTIVE BAR — NO DERIVED NATIONAL HEADCOUNTS. No
             national headcount, INCLUDING the 100M+ high-deductible
             figure, may be derived by multiplying a percentage
             against an independently sourced population
             denominator unless a governing primary source itself
             supports that headcount AND that methodology. This
             GENERALISES the existing rule at TRACKER §522 — "KFF's
             denominator is covered workers, not covered lives;
             that percentage must never be multiplied against a
             population" — from one instrument to the class.
             Without it the #30 defect regenerates one derivation
             later. ⛔ NOT APPROVED, NOT ENTERED IN
             APPROVED-FIGURES: Commonwealth ~45M underinsured and
             JAMA 58% HDHP share. Both came from web research and
             require primary-source verification first. 28.0M
             uninsured (CDC 2025) is UNCHANGED and remains
             approved. ⚠️ UNRESOLVED: BLS median HDHP deductible
             $2,750 (2024) versus the register's KFF average single
             deductible $1,886 / $2,631 (2025). Different
             instruments, not contradictory — but they read as
             contradictory side by side and must not be mixed
             within one artifact. · FOUNDER + ADVISOR
2026-08-13 · GENERAL EVIDENCE-MAINTENANCE RULE, IN PLACE OF A
             STATISTIC-SPECIFIC DEADLINE. Population, coverage and
             benefits statistics must be checked against the latest
             available source release before reuse in a new or
             materially revised public artifact. A dated refresh
             trigger attached to one figure ages badly and reaches
             only that figure; a standing rule reaches the class.
             Adopted instead of the proposed November 2026
             Commonwealth trigger. · FOUNDER
2026-08-13 · THREE REGISTER DEFECTS CORRECTED, SCOPE DELIBERATELY
             BOUNDED. (1) #39 RESOLVED: APPROVED-FIGURES §6(c) and
             §502 dated the CorVel sale to 2013; §4a and the
             closing letter date it May 2002. Corrected to 2002 —
             the primary document governs. (2) #35 RELABELLED: the
             item names MarketScopeShowcase, but no "discovery" or
             "savings" string exists in that component and §3's own
             technical basis places the hardcoded-100% behaviour in
             recommendationEngine.ts. The surface is REMIX/EDS, not
             Astro. Ruling unchanged; only the surface is
             corrected. (3) TRACKER §107 records 4H-d committed at
             8a577a1; the provider-page-remediation working tree
             did NOT carry it and the change was applied manually
             on 2026-08-13. Either the commit is not on this branch
             or it was reverted. ⛔ RECORDED AND BOUNDED — this
             does NOT open a repository-wide forensic audit. It is
             noted so that a future session reads §107's committed
             markers as claims to verify rather than facts. Any
             wider reconciliation is a separate, scoped decision.
             · FOUNDER
 2026-08-14 · "70%" FAMILY — OPTION B RULED. CONTAIN ONE INSTANCE NOW, DO
             NOT RETIRE THE FAMILY. NewsletterPopup.astro:86 contained
             because it is a shared component live on twelve blog routes.
             ⛔ THIS IS EXPLICIT PARTIAL ACTION ON #65'S FAMILY AND IS NOT
             A FAMILY RULING. The per-family ruling #65 requires (retire /
             reword / substantiate) HAS NOT BEEN GIVEN. SIX SITES REMAIN,
             DELIBERATELY UNTOUCHED: CondensedProblemSolution.astro:142,
             FAQPreview.astro:100, PromiseBanner.astro:215,
             HomeTrustIndicators.astro:78, and
             blog/uninsured-imaging-guide.astro:25,267. ⛔ THE LAST IS AN
             ARTICLE TITLE REQUIRING EDITORIAL ADJUDICATION, NOT
             MECHANICAL DELETION — republished by BlogPreviewSection on /,
             so coupled to homepage item Y5. ⛔ NO FUTURE SESSION MAY READ
             #66's CLOSURE AS CLOSURE OF THE "70%" FAMILY. Third recorded
             partial action on this family, after the two closed
             incidentally by the GREEN pass at de1a121. · FOUNDER
2026-08-14 · "Join 10,000+ subscribers" CONTAINED IN THE SAME COMMIT —
             NewsletterPopup.astro:151. A present-tense audience claim at
             pre-launch, same class as 150,000+ (D1/#24) and #60's "Join
             thousands who've saved," both removed outright. Text reduced
             to "Unsubscribe anytime"; the line itself is a courtesy, not
             a claim. ⛔ FOUND BY LOOKING AT A SCREENSHOT OF THE RENDERED
             POPUP, NOT BY ANY SWEEP — it sat 65 lines below the string
             #66 was scoped to, in a file the advisor had read and
             declared otherwise clean. THE LESSON IS #54's AND IT NOW HAS
             A SECOND FORM: a sweep finds what it is told to look for, and
             SCOPING A REVIEW TO A KNOWN DEFECT IS NOT THE SAME AS READING
             THE COMPONENT. blog.astro:499 publishes the same heading and
             REMAINS OPEN. · FOUNDER
2026-08-14 · main MOVED A FOURTH TIME — da8eb85..673fb2a, PR #8
             (fix/p5-footer-containment). Caught by the standing state
             check before branching. ⚠️ homepage-remediation was cut from
             da8eb85 and is now BEHIND main by the P5 merge. It must be
             reconciled under the seven reconciliation rules before / is
             released; the two prior merges in this workstream each
             surfaced conflicts. TRACKER's header state block and HANDOFF
             §2 both still read da8eb85. · FOUNDER
2026-08-14 · CarbonFooter 078c0e5 IS COMMENT SYNTAX ONLY — a literal
             <script> token inside the P5 divergence note replaced with
             "script block" because it can break Astro parsing. NO CLAIM,
             NO RENDERED OUTPUT, CLAIM PARITY WITH PBSFooter.tsx
             UNAFFECTED. Recorded because a commit touching CarbonFooter
             AFTER P5 closed it will otherwise read as a reopening. ·
             ADVISOR
 2026-08-14 · Y6 · HERO HEADLINE REPLACED — "70% Less" RETIRED, D14's
             "Save 50%+ on MRI" ADOPTED. H1 is now two lines: "Save 50%+"
             in white, "on MRI" in gold under the existing animated
             underline. ⛔ MRI IS BOUND INSIDE THE H1, NOT APPENDED AS A
             QUALIFIER — required by D14's presentation constraint (ii)
             because the H1 sits directly above a four-modality search.
             "The Same Radiologists." and "The Same Scanners." RETIRED
             WITHOUT REPLACEMENT — rule 26 names "Same facilities your
             employees already use" as a caught defect by example, and
             with no contracted providers there is no set of scanners to
             be "the same" as. No replacement lines invented. · FOUNDER
2026-08-14 · D14 CONSTRAINT (i) SATISFIED BY ADJACENT SUPPORTING COPY.
             "Compared with typical commercial health-plan MRI prices.
             Radiologist interpretation included." sits immediately
             beneath the H1 at text-white/80. It answers the two
             questions the H1 provokes — 50% below what, and what is in
             the price. ⛔ IT IS NOT AN AVERAGE CLAIM AND MUST NOT BE
             REWORDED INTO ONE; §1d records 50%+ as a FLOOR. · FOUNDER
2026-08-14 · ⛔ NO MODALITY SCOPE-RESET SENTENCE. D14 constraint (ii) is
             satisfied by VISUAL SEPARATION, not a fourth qualifier — the
             headline block's bottom margin widened to mb-10 sm:mb-14, and
             the search placeholder already reads "Tell us your scan (MRI,
             CT, X-ray, etc.)". A fourth consecutive qualifier would read
             as hedging and make the H1 the only line anyone reads, which
             is the bare-claim condition (ii) exists to prevent. ⚠️
             RECORDED AS A JUDGEMENT CALL, NOT A GOVERNANCE PROOF:
             whitespace is a weaker instrument than a sentence, and a
             determined reading still places a savings headline above a
             multi-modality search. Revisit if the hero is restructured.
             · FOUNDER
2026-08-14 · "No second bill" REMOVED FROM THE HERO — NOT RELOCATED,
             BECAUSE IT WAS ALREADY THERE. PricingSection publishes "One
             price. One bill." plus "Most hospitals send two separate MRI
             bills — one from the hospital and one from the radiologist.
             USRad pricing includes both." That is the architecture
             proposition EXPLAINED rather than asserted, and it is
             PSA-verified and §1a-permitted. No PricingSection edit was
             required or made. · FOUNDER + ADVISOR
2026-08-14 · SMARTMATCH DUPLICATION RESOLVED — TWO STATEMENTS REDUCED TO
             ONE. GREEN left near-identical statements above and below the
             search. RETAINED: SearchStep1's "Tell us what you need —
             SmartMatch™ will identify your best option," which occupies
             the label position directly above the input and is
             instructional. REMOVED: HeroSection's "Powered by SmartMatch™
             — your best imaging option, identified for you," a trailing
             brand restatement with no function. ⛔ NO REPLACEMENT CLAIM
             INVENTED. SmartMatch and its function survive; nothing new is
             asserted. ⚠️ TWO ADJACENT REDUNDANCIES REMAIN OUT OF Y6
             SCOPE: the retained line's "Tell us what you need" near-
             duplicates the placeholder "Tell us your scan," and "No
             searching. No guesswork." restates it a third time. · FOUNDER
2026-08-14 · main MOVED A FIFTH TIME — 673fb2a..cda6b41, PR #9
             (newsletterpopup-containment). homepage-remediation
             reconciled with main at 88f9d0e; the merge was CLEAN, no
             conflicts, both branches' DECISIONS.md appends preserved.
             First clean reconciliation in this workstream — the two prior
             merges produced ten conflict hunks between them. · FOUNDER
 2026-08-14 · Y6 SHIPPED WITH THREE REFINEMENTS FOUND IN VISUAL REVIEW.
             (i) The full stop moved INSIDE the gold underlined span — at
             8xl the detached period rendered with a visible gap and the
             underline stopped short of it, reading as a stray dot. "on
             MRI." is now one unit. (ii) The supporting copy split into
             two blocks, one sentence each — it was breaking mid-phrase
             after "prices." and severing the second sentence across the
             wrap. ⚠️ THIS STRENGTHENS D14 CONSTRAINT (i): the comparator
             basis now occupies its OWN FULL LINE rather than trailing
             into a second sentence, so it is MORE visible, not less.
             (iii) SearchStep1's bottom margin CONSIDERED AND LEFT
             UNCHANGED — the gap below the search reads as slack at
             desktop but as deliberate at 392px, and compressing it would
             cost the mobile proportion. Aesthetic only, no governance
             basis either way. ✅ VERIFIED AT 392px: both H1 lines hold
             single lines at the 2.5rem override, both supporting
             sentences remain distinct blocks, underline tracks "on MRI."
             Console clean. · FOUNDER + ADVISOR
 2026-08-14 · Y3 · CredibilitySection CONTAINED ENTIRE. Render call
             commented in index.astro; COMPONENT PRESERVED, NOT DELETED.
             Three of four elements fail: the H2 and the lede are rule 26
             present-tense network and relationship claims ("Trusted by",
             "partner facilities", "across the United States") with no
             contracted providers; the ACR tile is #44, whose single-body
             formulation B7-as-amended records as wrong on the draft
             Standard's own terms (§5.2 recognizes four bodies); the
             board-certification tile is #46, which names this component
             at ×4. ⛔ NO REWRITE IS AVAILABLE IN THIS PASS — #44 is
             BLOCKED ON APPENDIX B OPEN DECISION 3, and #45 establishes
             that copy may be REMOVED on the draft standard's basis but
             may NOT be APPROVED on it. The fourth element, "Transparent
             All-Inclusive Pricing," is sound under D5 but now duplicates
             PricingSection's stronger statement. B4 PRECEDENT APPLIED:
             contain the unit rather than create an exception to preserve
             a one-tile section. ✅ THIS FLIPS TO A REWRITE THE MOMENT
             APPENDIX B DECISION 3 LANDS — the design is sound and the
             words are gated, not wrong in principle. Resolution belongs
             to a future provider-proof/credibility pass once relationship
             and accreditation facts are supportable. · FOUNDER
2026-08-14 · ⚠️ / HAS NO CREDIBILITY BAND AFTER Y3. SocialProofBar
             (contained PR #7), the locations map (RED), MemberTrustBadge
             (Y4, pending) and now CredibilitySection are all out of
             render. RECORDED AS A KNOWN STRATEGIC CONSEQUENCE ACCEPTED
             KNOWINGLY, NOT AN OVERSIGHT — every proof element on the page
             is gone, and what remains carries the page on architecture
             and process rather than on proof. The approved §4a AnciCare
             historical forms remain available for a later credibility
             treatment in explicitly historical framing. · FOUNDER                        

```

## August 14, 2026

```
2026-08-14 · RELEASE STRATEGY CHANGED — INCREMENTAL PER-SURFACE RELEASES.
             Supersedes TRACKER §12 row 7, which merged once at the end of
             the whole workstream. Completed work releases now; remaining
             surfaces are remediated and released one at a time. · FOUNDER
2026-08-14 · PR #7 MERGED AT da8eb85 AND DEPLOYED. Employer and Provider
             remediation are LIVE IN PRODUCTION. 78 commits, 105 files.
             Local main synchronized to origin/main. New branch
             homepage-remediation created from main at da8eb85; checkpoint
             40328f0. · FOUNDER
2026-08-14 · / IS THE CURRENT SURFACE, WORKED AHEAD OF /press-kit AND
             /about BY FOUNDER PREROGATIVE. Same shape as /provider on
             2026-08-13. ⛔ /press-kit IS DEFERRED, NOT DROPPED — it is
             named first by exposure in TRACKER §12 row 3 and is
             register-borne (DOC-23). Its position in the remaining queue
             is open. · FOUNDER
             ⛔ AMENDED 2026-08-14 by the REMAINING-SURFACE ORDER RULING
             at the end of this section: /press-kit's position is NO
             LONGER OPEN — it is fixed at 6, after the five primary
             navigation surfaces. Deferred, not dropped. The rest of
             this entry stands as written.
2026-08-14 · D14 · APPROVED MRI MARKETING CLAIM — "Save 50%+ on MRI."
             SUPERSEDES the homepage "70% Less" formulation. Comparator is
             typical commercial health-plan / insurance MRI pricing. NOT
             Medicare. Hospital cash/self-pay is not the primary comparator
             for the employer-facing claim. The USRad side is the
             global/all-inclusive price: scan plus radiologist
             interpretation, no separate radiologist bill. ⛔ MRI ONLY — do
             not extend to other modalities without separate evidence.
             ⛔ IT IS A FLOOR, NOT AN AVERAGE — do not present 50%+ as an
             average savings claim without separate evidence. Recorded in
             full at APPROVED-FIGURES §1d, which is the publication
             authority. · FOUNDER
2026-08-14 · D14 SUPERSEDES D4 FOR MRI, AND ONLY FOR MRI. D4 (2026-08-09)
             removed "every other USRad-derived savings percentage," which
             on its face reaches this claim. D14 is the later dated
             decision and governs the MRI case. ⛔ D4 IS OTHERWISE INTACT:
             no savings percentage for any other modality, no aggregate
             imaging savings percentage, and no percentage against any
             comparator other than the one D14 names. A future sweep
             finding a percentage on this site must check §1d before
             removing it. · FOUNDER
2026-08-14 · PSA VERIFICATION PASSED — THE ALL-INCLUSIVE ARCHITECTURE IS
             SUPPORTED. The governing provider agreement expressly
             establishes complete service delivery including technical and
             professional components, global reimbursement including both,
             payment in full, and member non-collection. This is the
             executed-agreement basis (editorial standard item 3) for "the
             radiologist read is included" and "no second bill."
             ⛔ IT ESTABLISHES CONTRACTUAL ARCHITECTURE, NOT THE EXISTENCE
             OF A CURRENTLY CONTRACTED NETWORK. No provider is contracted
             as of this date. Standing rules 24 and 26 are UNCHANGED: no
             USRad transaction price may publish, and no present-tense
             network, coverage or "pre-negotiated pricing" claim may
             publish. · FOUNDER
2026-08-14 · ⛔ DO NOT CONFLATE THE TWO 50%+ CLAIMS. §4a approves "50% or
             more below the Florida workers' compensation fee schedule,
             1994–2002" — AnciCare, historical, class CP/CT. §1d approves
             "Save 50%+ on MRI" — USRad, present tense, commercial
             health-plan comparator. SAME NUMBER, DIFFERENT ENTITY, TENSE,
             COMPARATOR AND MODALITY SCOPE. Neither substantiates the
             other. Same treatment as the two $60 million figures at §4a.
             · FOUNDER + ADVISOR
2026-08-14 · #29 SPLITS INTO TWO SWEEPS AND IS NOT RESOLVED BY D14. #29 is
             the AnciCare historical floor mis-scoped as 50–70%, leaking
             the confidential upper bound in six locations. It conforms to
             the §4a historical form. It does NOT become the §1d USRad MRI
             claim. HANDOFF §7 briefly directed a single combined sweep;
             that instruction is CORRECTED, not merely superseded, because
             executing it would have converted historical evidence into a
             present-tense performance claim. · FOUNDER + ADVISOR
2026-08-14 · PRESENTATION CONSTRAINTS ON D14, BINDING WHEREVER THE CLAIM
             APPEARS. (i) The commercial-plan comparator basis must be
             sufficiently visible that the claim is not read as 50% below
             every alternative price. (ii) MRI must be explicitly bound to
             the number. ⛔ NO BARE "Save 50%+" ABOVE THE FOUR-MODALITY
             SEARCH — adjacency to a search returning CT, X-Ray and
             ultrasound extends the claim by implication, which D14
             forbids. Same reasoning as D8's placement rule on the Federal
             Reserve figure. · FOUNDER
2026-08-14 · HOMEPAGE SURVEY COMPLETE — FIFTEEN RENDERED FILES PLUS
             index.astro. Classified 12 GREEN, 6 YELLOW, 3 RED. Two new
             defects found that the register did not carry, both by
             reading rather than grepping. (1) SearchLoadingOverlay ships
             "Save up to 70%" — a NEW D4 instance at the confidential
             bound, not named by #56 — and "1,500+ centers", a VARIANT FORM
             that a literal grep on #56's phrase returns zero for. FOURTH
             #54 MEMBER: a zero result on a multi-word phrase is not
             evidence of absence. (2) CarbonFooter carries FIVE claims,
             not the two #60 records. · ADVISOR
2026-08-14 · #60 SCOPE AMENDED ON MEASUREMENT — TWO TO FIVE, AND ONE IS
             UNGATED. Beyond :54 and :69, CarbonFooter carries "Results
             delivered directly to you" (rule 26 capability claim) inside
             the gated block, and a nav link "Our Promise" with a green
             "Guarantee" badge OUTSIDE the {!hideNewsletter} block, which
             therefore ships on EVERY route including /employer/schedule.
             ⛔ #60's certification that /employer/schedule is "CLEAN of
             both" is TRUE AS WRITTEN AND INCOMPLETE — the #52 shape.
             Standard §1.3 forbids representing Verified as a warranty or
             guarantee; a literal "Guarantee" label in sitewide navigation
             is the strongest form of that representation on the site.
             THIRD SCOPE UNDERSTATEMENT, after #30 (two to fourteen) and
             #46 (forty to sixty-six). Recorded as #52 evidence rather
             than silently corrected. · ADVISOR
2026-08-14 · CarbonFooter IS A TWO-CODEBASE CHANGE AND IS NOT A MANUAL
             EDIT. The file's own header names it SOURCE OF TRUTH for
             Remix app/components/pbs/PBSFooter.tsx, last synced
             2025-12-26. Same shape as CarbonHeader.jsx to PBSHeader.tsx,
             already ruled "a sitewide decision touching two codebases."
             #60 does not record the cross-repo obligation. ROUTED TO
             CC/EDS; content remediation defined, implementation not
             drafted here. · FOUNDER + ADVISOR
2026-08-14 · "Pay hundreds, not thousands." IS LIVE COPY, NOT A PROPOSAL.
             HeroHeadline.astro carries it as the hero subhead and it
             shipped to production at da8eb85. The 2026-08-14 HOLD on that
             formulation is therefore an ACTIVE REMOVAL, not a deferral.
             It fails standing rule 24 on the USRad side and rule 26, which
             reaches quantitative claims written in words. It may return
             only behind a separately supportable hospital-comparator
             methodology. · FOUNDER
2026-08-14 · FOOTER RECONCILIATION ORDERED BEFORE ANY FOOTER EDIT.
             CarbonFooter.astro is the historically designated sync source
             for PBSFooter.tsx, but CURRENT GOVERNANCE — not either
             implementation — is the authority on what the footers may
             claim. Read-only two-repository drift report required first;
             no patch drafted against an assumed-identical file. ⛔ CLAIM
             PARITY, NOT CODE PARITY: the Astro footer carries a
             REMIX_URL env-aware link, a ~140-line newsletter handler
             posting to /api/subscribe-newsletter, and an Astro.props
             gate, none of which has a line-for-line Remix equivalent.
             Provisionally a STANDALONE two-repository containment,
             separate from homepage-remediation. · FOUNDER
2026-08-14 · P5 FOOTER CONTAINMENT COMPLETE — MERGED, DEPLOYED AND
             VERIFIED ON BOTH usrad.com AND app.usrad.com. Two-repository
             claim parity achieved. homepage-remediation synchronized with
             production main, clean at 0243d91. #60 CLOSED. · FOUNDER
2026-08-14 · HOMEPAGE GREEN PASS COMMITTED AT de1a121 — FOURTEEN ITEMS
             ACROSS NINE FILES, WORKING TREE CLEAN. Removed from /:
             "67% avg. savings," "Within 4 hours," "48-hour booking," the
             ACR accreditation line, "60–70% less," "Pay hundreds, not
             thousands.", "Save up to 70%," "1,500+ centers," "30 years of
             experience," the board-certification guarantee form, the
             ACR-accredited-nationwide trust line, and FOUR instant/
             instantly constructions. Verified by built-artifact sweep:
             "SmartMatch™ will identify" returns zero across dist/.
             ⛔ / IS NOT YET RELEASABLE — YELLOW and RED remain, including
             the 70% Less <h1>, the $3,200/$260 comparison, the
             CredibilitySection, the locations map, and $246M in
             AboutSection. · FOUNDER
2026-08-14 · ⛔ GREEN SWEEPS SURFACED FOUR DEFECTS OUTSIDE / THAT THE
             REGISTER DID NOT CARRY. Opened as #66 (NewsletterPopup, D4 at
             the confidential bound, LIVE ON TWELVE BLOG ROUTES), #67
             (ui-manager.js — a #56 variant, a rule-26 "our network"
             claim, and a "Medicare rates" construction contrary to D14's
             named comparator), #68 (/how-it-works carries the D7 and
             instant defects removed from the homepage summary), and #69
             (six orphaned backup files in src/ contaminating every
             sweep). ⛔ NONE IS HOMEPAGE WORK AND NONE BLOCKS /. Recorded
             so they are not rediscovered. · ADVISOR
2026-08-14 · #54 — FIFTH AND SIXTH MEMBERS. THE FALSE-ZERO FAMILY NOW
             STANDS AT SIX AND HAS NEVER ONCE BEEN CAUGHT BY THE OBVIOUS
             GREP. SearchStep1.astro wraps "SmartMatch™ will identify your
             best option / instantly." after "option";
             MobileSearchModal.astro wraps the same sentence after "best".
             BOTH RETURNED ZERO ON A LITERAL FULL-PHRASE SEARCH WHILE
             RENDERING ON / IN PRODUCTION. ⛔ THEY WERE FOUND BY LOOKING AT
             A SCREENSHOT OF THE PAGE, NOT BY ANY SWEEP. Method
             consequence, now mandatory: wildcard the wrap point rather
             than searching the full phrase (grep "60.70%" catches both
             dash forms; grep the shortest distinctive token, never the
             sentence), and READ THE RENDERED PAGE — a built-artifact
             sweep is necessary and is not sufficient. · ADVISOR
2026-08-14 · #58 CONFIRMED ON MEASUREMENT — connect/provider STILL SHIPS
             "ACR-accredited imaging centers nationwide" IN PRODUCTION.
             Built-artifact sweep of dist/client/ returns
             connect/provider/index.html for that exact string. The item's
             scope as written is ACCURATE — recorded because #30, #46 and
             #60 were each understated on measurement and the counter
             convention is to report confirmations as well as
             corrections. ⛔ THE OTHER THREE connect/* ROUTES NAMED BY #58
             WERE NOT SEPARATELY MEASURED IN THIS SWEEP — the phrase may
             be wrapped there, and #54 forbids reading their absence from
             this sweep as evidence. · ADVISOR             
2026-08-14 · P5 FOOTER CONTAINMENT EXECUTED, MERGED AND LIVE IN BOTH
             REPOSITORIES. The standalone two-repository containment
             provisionally scoped in the entry above was executed as
             P5 and is closed. usrad-platform PR #8 (merged: true,
             merged_at 2026-08-14T17:17:17Z) at merge commit 673fb2a,
             deployment dpl_31oUx96CbMABCW7imZru7pfdBiVv READY, alias
             usrad.com. usrad-portal PR #51 (merged: true, merged_at
             2026-08-14T17:15:32Z) at merge commit f639080, deployment
             dpl_GAe3hA1fsrUTUBGUZBFpcSFmDtMV READY, alias
             app.usrad.com. Four claims removed from both footers: the
             "saved up to 70%" paragraph, "Board-Certified
             Radiologists", "Results delivered directly to you", and
             the green Guarantee badge on the "Our Promise" link. The
             Our Promise link and its /patient-promise target are
             RETAINED in both. Portal only, a fifth: ":167"'s Remix
             counterpart still carried "90 million Americans" and was
             conformed to the already-ratified Astro wording. Verified
             post-merge from LIVE PRODUCTION ARTIFACTS, not source —
             see TRACKER #60. · FOUNDER
2026-08-14 · THE CLAIM-PARITY RULING IS NOW WRITTEN INTO BOTH FILES,
             REPLACING THE STALE SYNC HEADERS. The FOOTER RECONCILIATION
             entry above ordered CLAIM PARITY, NOT CODE PARITY; both
             headers previously asserted a sync relationship and a
             "Last synced" date — 2025-12-26 in Astro, 2025-12-25 in
             Remix, inconsistent with each other and eight months
             stale. Both are replaced with a claim-parity rule: the two
             footers are NOT synchronized, are not byte-for-byte
             copies, must not be made structurally identical, and
             NEITHER MAY PUBLISH A CLAIM THE OTHER HAS HAD REMOVED.
             Dated LAST CLAIM-PARITY REVIEW: 2026-08-14, which
             replaces the "Last synced" form. Each header now names the
             intentional divergences so a later session does not "fix"
             them: gating props (Astro takes hideNewsletter only and
             that single flag gates BOTH banner and newsletter; Remix
             takes hideNewsletter AND hideTrustBanner separately, so
             hiding the Remix newsletter does NOT hide the Remix trust
             banner), newsletter implementation, logo component, link
             handling, and the social row present in Remix and absent
             in Astro. · FOUNDER
2026-08-14 · mb-3 -> mb-6 ACCEPTED AS THE MINIMAL CONTAINMENT; THE
             TRUST BANNER IS NOT DISSOLVED. Removing the "saved up to
             70%" paragraph removed the mb-6 that separated the banner
             heading from the check-item row, leaving mb-3. The heading
             absorbs that spacing in both files. ⛔ THE BANNER STAYS.
             Once reduced to the single "No Hidden Fees" item it was
             proposed that the container be dissolved; that is REFUSED.
             A one-item row is not visibly broken, and redesigning the
             banner exceeds a claim removal. Layout containment is
             bounded to this one utility class in each file. · FOUNDER
2026-08-14 · ⛔ GOVERNANCE CORRECTION — #30'S FOOTER CLOSURE WAS NEVER
             A PLATFORM-WIDE CLOSURE, AND MUST NOT BE READ AS ONE. The
             closure recorded against CarbonFooter.astro was ACCURATE
             FOR THAT FILE. It was not, and did not claim to be, a
             closure of the "90 million Americans" class. With P5 the
             FOOTER INSTANCE IS NOW CLOSED ON BOTH CODEBASES — Astro
             and Remix. ⛔ NOTHING ELSE IS CLOSED. The remaining
             instances stay open and are NOT to be marked resolved
             anywhere in this register on the strength of the footer
             work. This is the fourth time a footer-scoped result has
             had to be prevented from reading as a sitewide one; see
             the #52 shape and the #30/#46/#60 scope understatements.
             · FOUNDER + ADVISOR
2026-08-14 · #65 OPENED — SITEWIDE RETIRED-CLAIM SWEEP, DISTINCT FROM
             P5 AND NOT CLOSED BY IT. P5 closed the footer instance on
             two codebases; the same retired-claim families continue to
             publish from 17 source files in this repository across 22
             sites, plus FOUR usrad-portal surfaces OF WHICH THREE ARE
             EMAIL TEMPLATES. ⛔ EMAIL TEMPLATES CANNOT BE CORRECTED
             AFTER SEND — they are transmitted and archived by the
             recipient, so their exposure is not reversible by a later
             deploy the way a page is. Scope detail in TRACKER #65.
             ⛔ P5's closure must not be read as platform-wide claim
             closure; #65 exists so it cannot be. · FOUNDER + ADVISOR
2026-08-14 · BRANCH GAP RECORDED, NOT FIXED. homepage-remediation is
             based on 40328f0, which predates 673fb2a; origin/main is
             two commits ahead of the branch. CarbonFooter.astro ON
             THIS BRANCH THEREFORE STILL CARRIES ALL FOUR P5 CLAIMS —
             confirmed by reading the file on the branch. ⛔ THIS IS A
             BRANCH-STATE FACT, NOT A PRODUCTION FACT: production
             serves 673fb2a and is clean, verified from live
             artifacts. No merge, rebase or branch update is ordered by
             this entry. Whoever resumes the homepage pass must
             reconcile before editing CarbonFooter.astro, or the
             retired claims will be reintroduced by a stale working
             copy. · FOUNDER
2026-08-14 · REMAINING-SURFACE ORDER RULED, AND /press-kit's POSITION IS
             NO LONGER OPEN. The operative sequence is / → /how-it-works →
             /what-is-an-mri → /about → /contact → /press-kit. HANDOFF §13's
             ordering governs and §5 is conformed to it, resolving a
             pre-existing conflict between those two sections. ⛔ /press-kit
             IS DEFERRED UNTIL AFTER THE FIVE PRIMARY NAVIGATION SURFACES —
             DEFERRED, NOT DROPPED; it remains Workstream A work. This
             AMENDS the 2026-08-14 entry that recorded its position as open;
             the TRACKER §12 row 3 first-by-exposure argument is on the
             record and was considered. · FOUNDER
2026-08-14 · "70%" FAMILY — OPTION B RULED. CONTAIN ONE INSTANCE NOW,
             DO NOT RETIRE THE FAMILY. NewsletterPopup.astro:86 contained
             because it is a shared component live on twelve blog routes;
             the <li> removed entire, two clean benefit items retained.
             ⛔ THIS IS EXPLICIT PARTIAL ACTION ON #65'S FAMILY AND IS NOT
             A FAMILY RULING. The per-family founder ruling #65 requires
             (retire / reword / substantiate) HAS NOT BEEN GIVEN and the
             family remains open. SIX SITES REMAIN, DELIBERATELY
             UNTOUCHED: CondensedProblemSolution.astro:142,
             FAQPreview.astro:100, PromiseBanner.astro:215,
             HomeTrustIndicators.astro:78, and
             blog/uninsured-imaging-guide.astro:25,267. ⛔ THE LAST OF
             THESE IS AN ARTICLE TITLE AND REQUIRES EDITORIAL
             ADJUDICATION, NOT MECHANICAL DELETION — it is republished by
             BlogPreviewSection's featured card on /, so it is coupled to
             homepage item Y5 and the two resolve together. ⛔ NO FUTURE
             SESSION MAY READ #66's CLOSURE AS CLOSURE OF THE "70%"
             FAMILY. Third recorded instance of partial action on this
             family, after the two closed incidentally by the GREEN pass
             at de1a121. · FOUNDER
2026-08-14 · NewsletterPopup CONTAINMENT SHIPS FROM A STANDALONE BRANCH
             BASED ON PRODUCTION main, NOT FROM homepage-remediation. The
             component renders on twelve blog routes and on none of /.
             Same reasoning as P5: sitewide blast radius does not ride a
             surface branch. homepage-remediation returns immediately to /
             YELLOW. · FOUNDER
 2026-08-14 · ⛔ FIREWALL — USRAD MEMBERSHIP IS AN IMPLEMENTED IDENTITY AND
             ACCESS ARCHITECTURE. PROVIDER-NETWORK CLAIMS MADE AS
             MEMBERSHIP BENEFITS ARE INDEPENDENTLY GOVERNED AND MAY NOT BE
             INFERRED MERELY FROM THE EXISTENCE OF MEMBERSHIP. This is a
             durable principle, not a Y4 finding. It exists to prevent a
             future audit from encountering ONE unsupported phrase inside
             the membership system — "pre-negotiated member pricing" —
             and treating the ENTIRE membership construct as unsupported.
             Evidence remediation must distinguish implemented membership
             identity, policy and platform facts from claims dependent on
             provider contracting or network operating state. THE
             OBJECTIVE OF ANY MEMBERSHIP PASS IS PRESERVATION PLUS
             PRECISION, NOT REMOVAL OF THE MEMBERSHIP PROGRAM. · FOUNDER
2026-08-14 · Y4 · PARKED AND DEFERRED TO A DEDICATED MEMBERSHIP PASS. The
             proposed containment of both MemberTrustBadge render calls is
             WITHDRAWN. ⛔ NOT RESOLVED, NOT CONTAINED, NOT APPROVED —
             PARKED. Membership will not be partially redesigned during a
             homepage pass. MemberTrustBadge.astro, both / renders,
             /membership and /member-rights are ALL PRESERVED UNMODIFIED.
             Opened as #72 (Y4 parked), #70 (/membership), #71
             (/member-rights). Y4 is REMOVED FROM THE SET BLOCKING
             HOMEPAGE CONTINUATION. · FOUNDER
2026-08-14 · ⛔ THE Y4 CONTAINMENT PROPOSAL WAS OVER-BROAD AND IS RECORDED
             AS A METHOD ERROR, NOT SILENTLY DROPPED. The advisor
             recommended containing the whole component because two of
             eleven claims failed, reaching for the B4 precedent. B4 DOES
             NOT APPLY: it governs a case where the SURVIVING element
             cannot carry its own context — a 1,200+ stat tile needing an
             April 2002 anchor a tile cannot hold. Here the survivors are
             independently supported implemented facts that stand alone.
             ⛔ THE ERROR WAS CAUGHT BY THE FOUNDER SUPPLYING ARCHITECTURAL
             CONTEXT THE REGISTER DID NOT CARRY — the March 2026
             Membership Identity Architecture. THIS IS THE KIND OF CONTEXT
             THAT DISAPPEARS WHEN REMEDIATION BECOMES A SEQUENCE OF
             ISOLATED GREP RESULTS, and it is the reason the handoff
             discipline exists. · FOUNDER + ADVISOR
2026-08-14 · MEMBER ID TIMING CONFIRMED AND SELF-DOCUMENTED. USM-XXXXXX is
             issued immediately after a patient books an APPOINTMENT
             REQUEST; membership becomes active, the Member Portal is
             ready, and Bill of Rights protections apply immediately —
             membership.astro:336-338. ⛔ THE "INSTANT" LANGUAGE IS
             THEREFORE TRUE BUT OBJECTLESS. #58 flagged it as a
             timing/capability construction; the underlying activation is
             implemented, but the rendered sentence names nothing, so on /
             — where the reader has no membership context — it reads as a
             promise about imaging delivery. THE DEFECT IS THE MISSING
             OBJECT, NOT THE WORD. Deferred to the membership pass under
             #72. · FOUNDER + ADVISOR
2026-08-14 · MemberTrustBadge IS SHARED BY / AND /membership —
             membership.astro:56-61 renders variant="banner" with
             showBillOfRights={false} and showMembershipLink={false}. ⛔ ANY
             FUTURE BADGE EDIT IS A TWO-SURFACE CHANGE AND MUST BE
             COORDINATED WITH #70, NOT PERFORMED MECHANICALLY FROM THE
             HOMEPAGE. Removing "Pre-negotiated member pricing" from the
             component alone would drop it from /membership's hero badge
             while the page body asserts the same claim nine times,
             directly beneath it. Same coupling shape as
             CarbonFooter/PBSFooter. · FOUNDER + ADVISOR
  2026-08-14 · Y5 CANDIDATE AUDIT — SIX OF EIGHT ARTICLES FAIL FOR HOMEPAGE
             PROMOTION. Read-only audit of the eight replacement
             candidates. PASS: understanding-mri-results (percentages are
             third-party clinical epidemiology, no USRad claim) and
             future-ai-medical-imaging (figures are cited third-party
             research; its single board-certification mention is in the
             CORRECT LIMITING FORM — "AI is a tool, not a replacement").
             FAIL: mri-basics (#73 + #46 ×4), managing-mri-anxiety (#74),
             preventive-care-checklist (#73 + #65), health-tips (#36 +
             #65), cost-saving-tips (#73 + #65 + accreditation),
             price-transparency-healthcare (#74 + #75 + #65). ⛔ THE
             REGISTER DID NOT CARRY ANY OF THESE. Opened as #73, #74, #75;
             #65 amended for above-bound formulations. ⛔ DISCOVERY ONLY —
             NO BLOG ARTICLE IS REMEDIATED AND NONE IS SCHEDULED. · FOUNDER
2026-08-14 · ⛔ THE HOMEPAGE PROMOTES WHAT IT LINKS TO. Y5 replaced BOTH
             card 1 (barred copy AND barred destination) and card 3 (CLEAN
             copy, barred destination — blog/real-cost-of-mri carries
             #65's 50-80% figure and #73's unregistered USRad prices).
             ⛔ CLEAN CARD COPY DOES NOT LICENSE PROMOTING AN UNREMEDIATED
             DESTINATION. This extends the Batch F principle — the
             deployed page is the sole source of truth for what it may be
             advertised as — to the PROMOTING surface: / MAY NOT DRIVE
             TRAFFIC TO A ROUTE CARRYING BARRED CLAIMS, whatever the link
             text says. ⚠️ "View All 12 Articles" IS THE UNRESOLVED
             COROLLARY — it routes to an index listing all twelve,
             including the four Y5 excluded. HELD FOR HOMEPAGE CLOSEOUT.
             · FOUNDER
2026-08-14 · CARD FIELD SOURCING RULED — CANONICAL DATA FIRST, WITH ONE
             EVIDENCE-DRIVEN EXCEPTION. src/data/blogPosts.js is the
             site's canonical article metadata. Card 1 uses its excerpt
             verbatim. ⛔ CARD 3 USES THE META-DESCRIPTION INSTEAD BECAUSE
             THE CANONICAL EXCERPT FAILS: "How artificial intelligence is
             improving diagnostic accuracy while REDUCING COSTS FOR
             PATIENTS" is a present-tense savings claim with no comparator
             and no modality scope, and rule 26 reaches quantitative
             claims WRITTEN IN WORDS. Titles taken from each article's
             <h1>, not its <title> — the latter carries a "| USRad" site
             suffix that is a template convention, not article copy.
             readTime adapted from "8 min read"/"9 min read" to "8
             min"/"9 min" because BlogPreviewSection appends " read";
             verbatim would render "8 min read read." ⚠️ FORMAT
             ADAPTATION, NOT EDITORIAL REWRITE. · FOUNDER
2026-08-14 · ⚠️ BlogPreviewSection HARDCODES THREE ARTICLE OBJECTS THAT
             blogPosts.js ALREADY DEFINES, WITH DRIFTED VALUES ("5 min" vs
             "8 min read"; meta-description vs excerpt). IT IS A STALE
             DUPLICATE OF THE CANONICAL SOURCE. The durable fix is
             importing from blogPosts.js, which would make the homepage
             cards structurally incapable of advertising an article
             inaccurately — the exact defect class Y5 exists to fix.
             ⛔ NOT DONE IN Y5: structural, and a blind import would
             resurface uninsured-imaging-guide and real-cost-of-mri.
             RECORDED FOR LATER ENGINEERING CLEANUP. · FOUNDER
2026-08-14 · ⚠️ THE BLOG IS A LARGER UNREMEDIATED SURFACE THAN ANY ROUTE
             ADDRESSED SO FAR. Ten of twelve articles reviewed or sampled
             this session carry barred or unregistered claims; the two
             clean ones are the two with NO USRad commercial content. The
             pattern is that EVERY COST-TOPIC ARTICLE FAILS. RECORDED AS
             SCOPE INTELLIGENCE FOR SEQUENCING, NOT AS AUTHORIZATION —
             TRACKER §12 places blog last and nothing here changes that.
             · ADVISOR
   2026-08-14 · RED-1 · AboutSection CONTAINED ENTIRE. Render call commented
             in index.astro; COMPONENT PRESERVED, NOT DELETED, NOT
             REWRITTEN. ⛔ $246 MILLION IS OFF / — IT HAD BEEN LIVE IN
             PRODUCTION THROUGHOUT THE ENTIRE HOMEPAGE PASS, INCLUDING
             AFTER PR #7, BECAUSE CONTAINING SocialProofBar REMOVED ONE
             TILE AND LEFT THE OTHER INSTANCE FOUR SECTIONS BELOW IT ON
             THE SAME PAGE. CONTAINING A COMPONENT IS NOT CONTAINING A
             CLAIM. Nine claims inventoried, seven failing or unruled:
             BARRED were $246M (§6), "one of the first" (D3, the exact
             rejected string), "more than 1,200" (rule 18 third form, no
             April 2002 anchor), and "After decades" (#27 tenure (a),
             eight-year company). ⛔ SURGICAL REMOVAL WAS ASSESSED AND
             REJECTED: stripping the barred material leaves an H2 reading
             "Proven" with every number gone, and a residual "built on the
             foundation of a diagnostic imaging network" that — with no
             scale, no date and no ended-in-2002 marker — reads as a
             network USRad HAS NOW. THE VAGUER IT GETS, THE MORE IT
             IMPLIES: a rule 26 failure PRODUCED BY DELETION, which is the
             outcome G-1 named when it removed the nationwide-network tile
             with no softened restatement and no smaller claim in the same
             slot. #22 predicted it: find-and-replace would leave headings
             with nothing under them. ✅ NO REPLACEMENT COPY INVENTED AND
             NO APPROVED FIGURE SUBSTITUTED — §4a's verified set is
             available for a later credibility rebuild under #22's
             two-pass discipline, and assembling it is a positioning
             decision, not a copy fix. ⛔ CONTAINING / DOES NOT CLOSE §6 —
             $246M survives at blog/the-scan-that-never-happens:306, which
             AccessProblemSection (retained) links to. · FOUNDER
2026-08-14 · #54 — EIGHTH MEMBER, AND IT IS THE FOUNDING CASE ITSELF.
             AboutSection's source breaks after "$246", so
             grep -c '$246 million' AboutSection.astro RETURNS ZERO ON THE
             FILE THAT PUBLISHES IT. Demonstrated directly during the
             RED-1 assessment. ⛔ ANY EARLIER SWEEP REPORTING / CLEAN OF
             $246M WAS MEASURING NOTHING. The family now runs to eight
             across four distinct modes: line wrapping (AnciCareLegacy ×2,
             the off-batch third, SearchStep1, MobileSearchModal,
             AboutSection), variant form ("1,500+ centers" vs the
             registered "1,500+ locations nationwide"), CSS transform
             ("Typical MRI Price Comparison" rendered uppercase, invisible
             to a case-sensitive search), and dash variance (50-80% vs
             50–80%). ⛔ NOT ONE MEMBER WAS CAUGHT BY THE OBVIOUS GREP.
             MANDATORY METHOD, RESTATED: flatten with
             tr -s '[:space:]' ' ' before matching source; search the
             shortest distinctive token, never the sentence; wildcard the
             variable character; default to -i; and READ THE RENDERED
             PAGE, because a built-artifact sweep is necessary and is not
             sufficient. · ADVISOR
2026-08-14 · ⚠️ / NOW HAS NO COMPANY HISTORY AND NO CREDIBILITY BAND.
             SocialProofBar (PR #7), CredibilitySection (Y3),
             AboutSection (RED-1) contained; the locations map (RED-2)
             pending; MemberTrustBadge parked (#72). RECORDED AS A KNOWN
             STRATEGIC COST ACCEPTED KNOWINGLY. ⛔ CONTAINMENT DID NOT
             REMOVE A VALID CREDIBILITY BAND — the proof it rested on was
             barred, so / had no defensible one before this pass either.
             What the page now carries is architecture and process rather
             than proof. §4a's approved historical forms remain available
             for a later treatment in explicitly historical framing. ·
             FOUNDER
  2026-08-14 · RED-2 · LOCATIONS/MAP SECTION CONTAINED ENTIRE — BOTH THE
             index.astro WRAPPER AND <NetworkMapPinsCarbon />. Component
             file UNMODIFIED. WRAPPER: "1,500+ locations nationwide" is the
             NAMED #56 HOMEPAGE-BODY INSTANCE — a figure appearing in no
             register document in any form, whose disposition is REMOVE
             SITEWIDE, NO NUMERICAL SUBSTITUTE, DO NOT REPLACE WITH 1,228;
             plus rule 26 eyebrow, coverage sentence and seven-city list.
             COMPONENT: FOUR OF FOUR STAT TILES FAIL — 1,500 (#56), 10
             States Opening 2026 (unregistered), 48-72 Hour Appointment
             Goal (D7; "Goal" is a hedge D7 reaches), 70% Lower Than
             Hospitals (D4 at the confidential bound); pins assert markets
             CURRENTLY OPEN on dates now past; "Building America's first
             transparent imaging marketplace" is the D3 priority-claim
             class — THE SAME BAR THAT REMOVED "one of the first" FROM
             AboutSection UNDER RED-1, ON THE SAME PAGE, IN THE SAME PASS.
             ⛔ NO SUBSTITUTION MADE AND NONE PERMITTED: 1,500 not replaced
             with 1,200+, 70% not softened to 50%+, "America's first" not
             retained in any form, tiles not deleted to preserve the map.
             ⚠️ THE SECTION CONTRADICTED ITSELF IN A SINGLE VIEWPORT —
             tiles asserting 1,500 centers and 10 states sat directly above
             a progress bar reading "Phase 1 of 3 — Accepting select
             centers in priority markets." ✅ THOSE TWO LINES ARE THE ONLY
             STAGE-ACCURATE NETWORK COPY ON THE SITE and are PRESERVED IN
             THE COMPONENT for a later network-building/market-coverage
             rebuild — ⛔ PRESERVED FOR REUSE, NOT AS JUSTIFICATION TO KEEP
             THE SECTION LIVE. A correct sentence inside a failing section
             does not rescue the section; B4 precedent. · FOUNDER
    2026-08-14 · ⚠️ RED-2's CONTAINMENT EXPOSED THE PARKED Y4 BANNER.
             MemberTrustBadge variant="banner" now stands alone in white
             space where the map was, publishing "Pre-negotiated member
             pricing" at full width — the one Y4 claim found
             UNAMBIGUOUSLY FALSE under rule 24. #72 records Y4 as blocking
             nothing; ON THE EVIDENCE IT BLOCKS RELEASE. Parking the
             component redesign was correct and is not reopened; what was
             never done is the placement containment. · ADVISOR
    2026-08-14 · HOMEPAGE CLOSEOUT — "View All 12 Articles" → "View All
             Articles". LINK RETAINED, COUNT REMOVED. The destination is
             independently reachable from header nav and footer, so
             removing the homepage link would not contain the underlying
             exposure — it would remove a path, not the claim. "12" is an
             unverified countable assertion that drifts as articles are
             added. ⛔ THIS DOES NOT SATISFY THE Y5 PRINCIPLE — / still
             links to an index carrying four articles Y5 excluded
             (#65, #73, #74, #75) plus blog/the-scan-that-never-happens
             (§6, $246M). RECORDED AS ACCEPTED RESIDUAL EXPOSURE, RULED
             KNOWINGLY, AND OWNED BY THE /blog SURFACE — not closed. ·
             FOUNDER
2026-08-14 · HOMEPAGE CLOSEOUT — "Healthcare Insights from Industry
             Veterans" H2 REMOVED. "Industry Veterans" is an
             experience/tenure representation in the #27 family; rule 26
             reaches experience claims WRITTEN IN WORDS, and GREEN's fix
             to the subhead beneath it ("30 years of experience helping
             patients save" → "Practical guidance…") left the same claim
             standing in a different register one line above. ⛔ NO
             REPLACEMENT COPY INVENTED — the existing clean subhead was
             PROMOTED into the H2 role verbatim and the now-redundant <p>
             removed. Eyebrow and cards unchanged. ⚠️ A COPY FIX ONE LINE
             AWAY FROM A DEFECT DOES NOT REACH THE DEFECT: GREEN corrected
             the subhead and left the heading, and both said the same
             thing. Adjacent lines must be read as a unit. · FOUNDER
2026-08-14 · /blog RESIDUAL EXPOSURE RECORDED AT HOMEPAGE CLOSEOUT, NOT
             ACTIONED. blog.astro:499 publishes "Join 10,000+ Subscribers"
             — the same present-tense audience claim contained in
             NewsletterPopup at PR #9, still live on the blog index. The
             index also lists all twelve articles including the four Y5
             excluded and the four further FAILs from the Y5 candidate
             audit. ⛔ /blog IS A QUEUED SURFACE AND NOTHING HERE
             AUTHORIZES REMEDIATING IT. · FOUNDER
2026-08-14 · #54 — NINTH MEMBER AND A FIFTH MODE: COMPONENT-CHUNK
             SEPARATION. A string sweep of a route's server chunk DOES NOT
             REACH CONTENT RENDERED BY AN IMPORTED COMPONENT. Astro
             compiles components into separate chunks, so "Free membership
             included" and "Pre-negotiated member pricing" BOTH returned
             zero from pages/index.astro.mjs — the contained banner AND
             the retained inline pill, indistinguishable. THE PROBE COULD
             NOT TELL CONTAINED FROM COMPILED-ELSEWHERE. ⛔ VERIFYING
             CONTAINMENT OF A COMPONENT RENDER REQUIRES CHECKING THE CALL
             SITE — grep the route chunk for the props (variant": "inline")
             or the component's absence from the route's import graph —
             NOT the absence of its strings from the route chunk. The five
             modes are now: line wrapping, variant form, CSS transform,
             dash variance, and component-chunk separation. · ADVISOR
  2026-08-14 · #54 — NINTH MEMBER AND A FIFTH MODE: COMPONENT-CHUNK
             SEPARATION. A string sweep of a route's server chunk DOES NOT
             REACH CONTENT RENDERED BY AN IMPORTED COMPONENT. Astro
             compiles components into separate chunks, so "Free membership
             included" and "Pre-negotiated member pricing" BOTH returned
             zero from pages/index.astro.mjs — the CONTAINED banner and
             the RETAINED inline pill, indistinguishable. THE PROBE COULD
             NOT TELL CONTAINED FROM COMPILED-ELSEWHERE, and was briefly
             read as evidence that the retained pill had been removed.
             ⛔ VERIFYING CONTAINMENT OF A COMPONENT RENDER REQUIRES
             CHECKING THE CALL SITE — grep the route chunk for the props
             (variant": "inline") or the component's absence from the
             route's import graph — NOT the absence of its strings from
             the route chunk. Confirmed working: the Y4a containment
             verified as 1 variant": "inline" and zero banner. THE FIVE
             MODES ARE NOW: line wrapping, variant form, CSS transform,
             dash variance, and component-chunk separation. ⛔ NOT ONE OF
             THE NINE MEMBERS WAS CAUGHT BY THE OBVIOUS GREP. · ADVISOR
     2026-08-14 · HOMEPAGE MERGED AS PR #10 AT 4d12da3 AND DEPLOYED. 17 files,
             1,208 insertions, 278 deletions. Employer, Provider, P5
             footer and Homepage remediation are all LIVE IN PRODUCTION.
             main moved cda6b41..4d12da3 — SEVENTH MOVEMENT THIS MONTH,
             caught by the standing state check. · FOUNDER
2026-08-14 · ⛔ NEW STANDING PRACTICE — VERIFY THE RELEASE AGAINST THE LIVE
             SITE, NOT THE BUILD. The homepage release was verified with
             curl -s https://usrad.com/ | tr -s '[:space:]' ' ' and twelve
             barred strings returned zero, with "Save 50%+" and "USRad
             Member" confirmed present. THIS IS THE FIRST TIME THIS
             WORKSTREAM HAS VERIFIED A RELEASE AGAINST PRODUCTION RATHER
             THAN dist/. ⚠️ IT SHOULD HAVE BEEN THE STANDARD ALL ALONG:
             #54 now runs to nine members across five false-zero modes,
             and one of them — component-chunk separation — made a
             BUILD-ARTIFACT SWEEP RETURN A FALSE ZERO ON THE SAME DAY.
             A curl-and-flatten sweep costs one command and is the only
             check that sees what a visitor sees. ADOPT AS THE CLOSING
             STEP FOR EVERY SURFACE. · FOUNDER + ADVISOR
2026-08-14 · $246 MILLION IS OFF PRODUCTION. It survived PR #7 because
             containing SocialProofBar removed one tile and left the other
             instance FOUR SECTIONS BELOW IT ON THE SAME PAGE, and it
             survived every literal sweep because the source breaks after
             "$246" — grep -c '$246 million' AboutSection.astro RETURNS
             ZERO ON THE FILE THAT PUBLISHES IT. ⛔ CONTAINING A COMPONENT
             IS NOT CONTAINING A CLAIM, AND A ZERO FROM A MULTI-WORD GREP
             IS NOT EVIDENCE OF ABSENCE. · FOUNDER                            

```

---

## August 16, 2026

```
2026-08-16 · FOUNDER RULINGS ON NEWLY ADMITTED ANCICARE EVIDENCE. Five
             source documents reviewed: the SFBJ article of 5 Feb 1999 in
             full; congratulatory letters from Gov. Jeb Bush (FL, 30 Jun
             2000) and Lt. Gov. Cruz Bustamante (CA, 2 Oct 2000); a Jeb
             Bush Florida 100 letter of 25 Feb 2000; three award plaques;
             and the "Overview of the Company" corporate record. TEN §4a
             rows, FIVE §4a notes, FIVE §4b bars. · FOUNDER
2026-08-16 · ⛔ THE ENTITY QUESTION IS CLOSED — Managed Care Networks,
             Inc. d/b/a AnciCare PPO, stated on the face of the corporate
             overview. The Florida 100 plaques, issued to Managed Care
             Networks, Inc., are AnciCare recognitions. ⚠️ THE REGISTER
             HAD NEVER RECORDED THE LEGAL ENTITY NAME. Any outside party
             searching the corporate record finds Managed Care Networks,
             not AnciCare; holding the d/b/a means that discovery reads as
             thoroughness rather than discrepancy. · FOUNDER
2026-08-16 · ⛔ CO-FOUNDING AND EQUITY OWNERSHIP ARE DISTINCT AND BOTH
             STAND. The corporate overview records Michael Cabrera as
             founder and 100% owner. §4a approves "co-founded by Michael
             and Donna Cabrera" on the founder letter of 23 Sep 1994 and
             Florida Trend. ⛔ THE OWNERSHIP STATEMENT MAY NOT BE CITED AS
             EVIDENCE NEGATING DONNA'S CO-FOUNDER ROLE. Public copy uses
             the co-founder form; the ownership fact is register-held and
             not required publicly. · FOUNDER
2026-08-16 · ⚠️ 608 FACILITIES — TWO FORMS, ONE FACT. The corporate
             overview's "32 states and the District of Columbia" is
             canonical; SFBJ's "33 states" is reconcilable jurisdiction
             shorthand counting DC as a state. IDENTICAL COUNTS. ⛔ NOT A
             RULE 18 THIRD FORM AND NOT TO BE REPORTED AS A DISCREPANCY.
             · FOUNDER
2026-08-16 · GROWTH ARC APPROVED FOR /about: 608 facilities across 32
             states and DC at year-end 1998 → 1,228 contracted imaging
             facilities across 43 states by April 2002. Two dated
             waypoints, two sources, no reconciliation gap. ⚠️ SUPERSEDES
             the earlier advisory recommendation of an endpoint-only
             presentation, and makes the 800/March-2000 trajectory pair
             unnecessary on this surface. · FOUNDER
2026-08-16 · RECOGNITION SET RESTRAINED TO THREE. 1999 Inc. 500 #210;
             SFBJ No. 1 South Florida PPO 1999; Hispanic Business 500
             largest Hispanic-owned companies, PUBLISHED UNRANKED.
             ⛔ #320 IS REGISTER-HELD AND NOT PUBLISHED ON /about.
             ⛔ FLORIDA 100 IS ADMITTED TO THE REGISTER BUT NOT TO THE
             PRINCIPAL RECOGNITION LINE. ⛔ THE GUBERNATORIAL
             CONGRATULATIONS ARE EVIDENCE, NOT MARKETING COPY, AND MAY NOT
             BE QUOTED OR CITED IN PUBLIC COPY. ⛔ The Inc. 1,236% growth
             figure is barred from /about even if later verified.
             · FOUNDER
2026-08-16 · ⛔ SELF-INSURED EMPLOYERS ARE DOCUMENTED ANCICARE CUSTOMERS
             AND CARRY NARRATIVE WEIGHT. Legitimate continuity with
             USRad's present primary audience. ⛔ BENEFIT LINE AND
             OPERATING ARCHITECTURE REMAIN DISTINCT — self-insured
             workers' compensation is not a self-funded group health plan.
             COPY MAY SAY THE BUYER IS FAMILIAR; IT MAY NOT SAY THE MODEL
             IS THE SAME. Group-health referrals acknowledged in the
             documentary formulation, not firewalled, and not evidence of
             a group-health business. · FOUNDER
2026-08-16 · ⛔ THE /about FIREWALL IS CORPORATE AND OPERATIONAL
             INHERITANCE, NOT HISTORICAL EXPERIENCE. Approved form:
             "USRad is a new company. It did not inherit AnciCare's
             network, contracts, clients or operating assets."
             ⛔ FORMULATIONS DENYING ANY RELATIONSHIP BEYOND THE FOUNDERS
             OVERSTATE THE SEPARATION AND ARE NOT APPROVED. · FOUNDER
2026-08-16 · BOTH /about FOUNDER QUOTES REMOVED FOR THIS VERSION. "We
             launched USRad to save lives" (clinical-outcome frame; "a
             proven model" in the same quote) and "90 million Americans
             still need what we built" (D8/#30 barred figure; §4c bars the
             signed-quote carve-out for quantitative figures). ⛔ NOT
             REPLACED WITH MANUFACTURED QUOTATIONS. The emptied "My
             Promise to You" block is removed with them. ⚠️ CONSEQUENCE
             RECORDED: /about now has no first-person voice. · FOUNDER
2026-08-16 · THE 2002–2025 GAP IS SHOWN VISUALLY ONLY. The timeline
             breaks at the May 2002 acquisition; the empty span is the
             statement. ⛔ NO EXPLANATORY PROSE WITHOUT EVIDENCE. The
             register holds nothing on the intervening period. · FOUNDER
2026-08-16 · DONNA'S /about CARD IS THE MINIMAL FORM — name, title, and
             the shared factual line "Co-founded AnciCare PPO in 1994.
             Through the CorVel acquisition in 2002." ⛔ NO ADDITIONAL
             INDIVIDUAL BIOGRAPHY ON /about. Her co-founder status is
             SETTLED. · FOUNDER
2026-08-16 · THE CorVel CONTINUED-USE SENTENCE IS OMITTED FROM /about.
             §4a's FA-class entry stands in the register but is not
             published — it is founder-attested, requires visible
             attribution, and Act 4 is stronger without a qualified
             sentence in it. · FOUNDER
2026-08-16 · ⚠️ ADMITTING A DOCUMENT DOES NOT ADMIT EVERY FIGURE IN IT.
             The SFBJ article of 5 Feb 1999 is admitted for the scheduling
             result and the PPO ranking. It also contains "$18 million
             expected in 1999", ALREADY BARRED AS A PROJECTION, and "120
             MRI centers in Florida" and "five employees", NEITHER
             ADMITTED. ⛔ The article carries a reprint-permission line —
             short attributed quotation only, no reproduction.
             · FOUNDER + ADVISOR
```

---

## August 17, 2026

```
2026-08-17 · §4d USRad CORPORATE FACTS ADMITTED — SEVEN ROWS FROM FOUR
             SOURCE DOCUMENTS. Articles of Organization (25 Apr 2013,
             L13000061144), Florida Department of State acknowledgment
             (26 Apr 2013), fictitious-name registration for USRAD
             (1 Oct 2025, G25000128551), and the Operating Agreement
             (20 Mar 2026). ⛔ RECORDED IN A NEW §4d, NOT §4a. §4a is the
             AnciCare historical set; /about's entire remediation turned
             on keeping the two entities distinct, and merging them would
             reintroduce the confusion the page spent seven steps
             removing. · FOUNDER
2026-08-17 · ⛔ CORPORATE CHRONOLOGY PUBLICATION RULE. Recording the 2013
             legal formation DOES NOT AUTHORIZE presenting 2013 as the
             beginning of the current USRad business narrative. Public
             references to 2025 describe the BEGINNING OR RESUMPTION OF
             WORK on today's USRad and MUST NOT be phrased as
             incorporation, legal formation or establishment of U.S.
             Radiology of Florida LLC. ⚠️ THIS RULE EXISTS AGAINST A
             SPECIFIC FAILURE MODE: a future session finds the 2013
             Articles, concludes it has better evidence than the published
             2025 date, and changes the site to say USRad was founded in
             2013. The 2013 filing is real, documented and correctly
             register-held. It is not the story /about tells. · FOUNDER
2026-08-17 · ⚠️ THE 2025 DATE IS FOUNDER-ATTESTED, NOT DOCUMENTARY. It is
             the only publishable fact in §4d without a filed document
             behind it, and it publishes only in the narrow
             development-history form: "Work on today's USRad began in
             2025." Year only — no month, no day. ⛔ The 2013–2025
             intervening period is ALSO founder-attested and is
             REGISTER-HELD, NOT FOR PUBLICATION. ⚠️ DO NOT CHARACTERISE
             THAT PERIOD AS "DORMANT" — the term carries legal and
             accounting implications the register has not established.
             · FOUNDER
2026-08-17 · MICHAEL AND MIGUEL CABRERA ARE THE SAME PERSON. Florida
             filings use Miguel; public materials use Michael. Founder-
             confirmed. ⛔ RECORDED SO A FUTURE SESSION DOES NOT TREAT THE
             TWO NAMES AS TWO PEOPLE — the same class of finding as
             Managed Care Networks, Inc. d/b/a AnciCare PPO, and the same
             remedy: hold the discrepancy in the register so discovery
             reads as thoroughness rather than contradiction. · FOUNDER
2026-08-17 · LEGAL-NAME CANON: U.S. Radiology of Florida, LLC, supported
             by the Articles and the fictitious-name registration. ⚠️ The
             Operating Agreement's §1 refers to "U.S Radiology, LLC" — an
             internal document variance. ⛔ IT DOES NOT ESTABLISH A SECOND
             ENTITY OR AN ALTERNATE CANONICAL NAME. Flagged to the founder
             as a defect in an executed document, for counsel rather than
             for marketing. · FOUNDER + ADVISOR
       2026-08-17 · #54 — TWELFTH AND THIRTEENTH MEMBERS, SEVENTH AND EIGHTH
             MODES. (7) SWEEPING THE WRONG BUILD ARTIFACT: /about Step
             1 returned twelve barred strings at zero from
             dist/server/pages/about.astro.mjs and was read as a pass.
             ⛔ THAT FILE DOES NOT CONTAIN THE PAGE — /about is
             prerendered and its output is
             .vercel/output/static/about/index.html. THE SWEEP PROVED
             NOTHING AND LOOKED CLEAN. Determine prerendered vs
             server-rendered before choosing a target, and confirm the
             target contains a known-present string before trusting a
             zero. (8) MARKUP-STRIPPED SWEEPS DO NOT SEE HTML COMMENT
             CONTENTS: #54's own sixth-mode remedy, sed 's/<[^>]*>//g',
             also removes comment bodies, and HTML COMMENTS SHIP IN THE
             BUILT OUTPUT. Two /about containment comments quoted the
             barred figures they were containing; NEITHER WAS DETECTABLE
             BY THE STANDARD VERIFICATION. ⛔ STANDING RULE: A
             CONTAINMENT COMMENT MUST DESCRIBE WHAT WAS REMOVED WITHOUT
             REPRODUCING IT. Eight modes; thirteen members; not one
             caught by the obvious grep. · ADVISOR
2026-08-17 · #76 OPENED — FIVE AUDITS OF /about MISSED THE FOUNDER
             CARDS. Claims remediated at db12ded; the METHOD is what is
             recorded. Michael's card carried 1,236% Revenue Growth —
             ⛔ THE EXACT FIGURE RULED BARRED ON 2026-08-16, ALREADY LIVE
             WHEN THE RULING WAS MADE, WITH NEITHER PARTY AWARE — and
             $246M+, a variant form. Donna's carried 150,000+ Patients
             Served and 99.8% Satisfaction Rate, the latter in no
             register file. ⛔ THE FULL-PAGE AUDIT, THE ARCHITECTURE
             PASS, THE COPY BLUEPRINT, THE ACT 6 ASSESSMENT AND A
             DEDICATED FOUNDER-STORY REVIEW ALL READ THAT SECTION AND
             ALL MISSED IT. Cause: the reviewer read the card's prose
             and quote and did not read the stat grid between them.
             ⛔ AN AUDIT MUST ENUMERATE EVERY TEXT-BEARING ELEMENT, NOT
             READ THE SECTION AS PROSE — grids, badges, pills, tiles,
             captions, alt text and card metadata are claim surfaces and
             are what a reading eye skips. ⚠️ AND A RULING CAN BE ISSUED
             ABOUT A FIGURE THAT IS ALREADY PUBLISHED WITHOUT ANYONE
             CHECKING. · FOUNDER + ADVISOR
2026-08-17 · /about COPY REMEDIATION COMPLETE — SEVEN STEPS, ALL SIX
             ACTS, 65656cb → 20dc1b8. about.astro from 1,422 lines to
             ~770. ⛔ HELD FROM PR PENDING CC'S BOUNDED TIMELINE-BREAK
             WORK: the Act 4 header now reads "Two Companies. Two Eras."
             over an UNBROKEN VISUAL PATH, and that is the last place
             the page still asserts by design the continuity it spent
             seven steps denying in copy. ⚠️ Merging before the break
             would ship a header contradicted by its own layout.
             · FOUNDER
   2026-08-17 · ⛔ #54 — FOURTEENTH MEMBER, NINTH MODE: DOCUMENT ORDER.
             about.astro closed </CarbonLayout> immediately after the
             timeline. Act 5 — the corporate-inheritance firewall — plus
             Act 6 and the final CTA rendered OUTSIDE THE LAYOUT, BELOW
             THE FOOTER, from 743e4a7 through four subsequent steps.
             EVERY SWEEP PASSED. ⚠️ DIFFERENT IN KIND FROM THE OTHER
             EIGHT MODES: the content was present, correct and correctly
             verified. The defect was WHERE IT APPEARED, and string
             matching has no concept of position. ⛔ THE SYMPTOM WAS
             VISIBLE AND DISMISSED — Act 3's rebuild dropped a wrapper's
             indentation to zero, noted at the time as cosmetic. It was
             the structural break announcing itself. METHOD: verify
             document order by byte offset with grep -bo, footer last;
             and read the whole rendered page top to bottom at least
             once per surface. · ADVISOR
2026-08-17 · /about VERIFIED AND CLEARED FOR PR. Ten commits, 65656cb →
             86f0322. Twenty-six barred strings at zero on the built
             page; comment contents clean without markup stripping;
             document order ascending with footer last; one h1; both
             trust_content_view observer targets intact. CC's timeline
             era break implemented under the bounded brief — path
             terminates at May 2002, USRad era on a separate path, era
             labels, the twenty-three-year interval left empty per
             ruling F, and May 2002 raised from the timeline's faintest
             entry to its anchor. · FOUNDER
2026-08-17 · ⚠️ NOTED, NOT ACTIONED: about.astro's trailing style block
             defines .story-arc three times with no markup using it,
             under a comment stating it is "still needed" for the "This
             Time, It's Different" section — which Act 5 replaced at
             4d54367. Dead CSS with a comment asserting the opposite.
             Cosmetic; left for a cleanup pass. · ADVISOR
      2026-08-17 · /about MERGED AS PR #13 AT 470d2ae AND DEPLOYED. Six files,
             459 insertions, 726 deletions. about.astro from 1,422 lines
             to ~870. Employer, Provider, P5 footer, Homepage and About
             remediation are all LIVE. main moved 411577a..470d2ae —
             TENTH MOVEMENT THIS MONTH, caught by the standing state
             check. · FOUNDER
2026-08-17 · ✅ /about VERIFIED AGAINST THE LIVE SITE. Twenty-five barred
             strings return zero from
             curl -s https://usrad.com/about | tr -s '[:space:]' ' ' |
             sed 's/<[^>]*>//g', and DOCUMENT ORDER ASCENDS WITH <footer
             LAST — Act 5 at 35,499, founders at 37,427, CTA at 41,497,
             footer at 43,462, byte offsets identical to the local build.
             ⚠️ THE DOCUMENT-ORDER CHECK IS NEW AND IS THE ONE THAT
             MATTERS: the </CarbonLayout> defect fixed at 86f0322 was
             invisible to every string sweep across four steps because
             the content was present and correct. #54's ninth mode.
             · FOUNDER + ADVISOR
2026-08-17 · ⚠️ /press-kit IS NOW UNBLOCKED AND IS THE NEXT SURFACE.
             /about was taken ahead of it by founder prerogative on
             2026-08-16 precisely so the press kit could inherit a
             ratified company story rather than construct one. The
             inheritance lists — what it MAY inherit after ratification
             and what it MUST NOT — are in the /about copy blueprint and
             are now backed by §4a's ten admitted rows and §4d's
             corporate chronology. ⛔ A PRESS KIT IS EXACTLY WHERE AN
             OUTSIDE READER TESTS WHETHER ANCICARE'S RECORD IS BEING
             CLAIMED AS USRad's — the corporate-inheritance firewall
             applies with full force. · FOUNDER
    2026-08-17 · /co-founder-m — TWO SURGICAL CONTAINMENTS, NOT AN AUDIT.
             The animated patient-count section removed entire, and the
             "3x Hispanic Business Top 500" tile removed. ⛔ NO
             NUMERICAL SUBSTITUTE — the admitted record is #320 in 1999
             and recognition in 2000, and "three consecutive years" is
             §4b NOT ADMITTED, but replacing 3x with 2x in a containment
             pass would be conforming a figure rather than removing one.
             ⛔ SIX FURTHER BARRED CLAIMS WERE OBSERVED AND LEFT IN
             PLACE, recorded at #78. ⚠️ THIS PAGE HAS SURFACED LIVE
             BARRED CLAIMS THREE TIMES WITHOUT EVER BEING AUDITED, and
             /co-founder-d has never been inspected at all. Both are
             linked from /about's founder cards. · FOUNDER
2026-08-17 · ⛔ #54 — FIFTEENTH MEMBER, TENTH MODE: FIGURES INJECTED BY
             JAVASCRIPT AT RUNTIME. co-founder-m.astro published
             150,000+ as <span id="counter" data-target="150000">0</span>.
             THE RENDERED HTML CONTAINED "0". The barred value lived in
             an attribute and was written to the DOM after load, and it
             animated to text-9xl on a full-width dark section. ⛔ NO
             SWEEP OF BUILT HTML COULD SEE IT. ⚠️ ATTRIBUTE VALUES AND
             SCRIPT LITERALS ARE CLAIM SURFACES — sweep the source as
             well as the output, and match on data-* attributes and JS
             literals, not only rendered text. The same construction
             exists in NetworkMapPinsCarbon.astro at :284, :296 and :320
             — data-target="1500", "10", "70" — contained from / under
             RED-2 but live in source. · ADVISOR
2026-08-17 · BIRTHING OF GIANTS ADMITTED AS PARTICIPATION. The roster
             establishes membership of the 2001 cohort; the CV of Edward
             B. Roberts, David Sarnoff Professor of Management of
             Technology at MIT, establishes the joint MIT/YEO/Inc.
             affiliation. ⛔ NEITHER ESTABLISHES SELECTION — no
             application, acceptance or admission criteria are in
             evidence, and /press-kit and /co-founder-m between them
             claimed "Selected" three times. ⛔ NOR IS IT "MIT's"
             PROGRAM. ⚠️ FOUNDER ATTESTS THE CLASS WAS LIMITED TO 60
             PARTICIPANTS — recorded as FA, REGISTER-HELD, NOT FOR
             PUBLICATION pending contemporaneous documentation.
             "Exclusive," "prestigious," "one of 60" and equivalent
             exclusivity language are barred. The cohort roster is
             register-held: it is a contact list, and other participants
             are not for publication. · FOUNDER + ADVISOR
2026-08-17 · CANONICAL PUBLIC TITLES RATIFIED SITEWIDE: Michael Cabrera
             — Founder & CEO; Donna Cabrera — Co-Founder & Chief Member
             Advocate. ⛔ /press-kit said "Co-Founder & CEO" and omitted
             Donna entirely; the rebuilt press kit will include her.
             ⚠️ Legally both are co-founders and §4a holds that; the
             public form is the founder's stated preference and is not a
             denial of co-founding — see the co-founding /
             equity-ownership note at §4a. · FOUNDER                                
2026-08-17 · ONE STEP TO SERVICE® ADMITTED AS AN ANCICARE PROGRAM.
             §4a, class CP, on the AnciCare customer newsletter and
             the Insurance Radiology Solutions trifold. The evidence
             establishes the program's existence, name, service /
             support / coordination / reporting functions, referral
             and scheduling workflow, and its three components —
             coordination of the diagnostic imaging procedure,
             coordination of related medical records, administration
             of the claim. ⚠️ BOTH SOURCE DOCUMENTS ARE UNDATED and
             are bracketed after June 1997 by the O'Donnell
             appointment notice. ⛔ "One Step to Service" and "One
             Step Service" are SOURCE VARIANTS ONLY, not additional
             canonical public forms. /co-founder-d currently
             publishes the variant. · FOUNDER
2026-08-17 · ⛔ DONNA CABRERA'S AUTHORSHIP OF ONE STEP TO SERVICE® IS
             FA, NOT CP. Founder attestation, Michael Cabrera,
             firsthand and contemporaneous: Donna Cabrera created,
             designed, architected and launched the program.
             ⛔ THE CONTEMPORANEOUS DOCUMENTS ESTABLISH THE PROGRAM
             AND NOT THE ATTRIBUTION, and may not be cited as proof
             of it. ⚠️ AND THE CONVERSE BINDS EQUALLY: DOCUMENTARY
             SILENCE IS NOT CONTRARY EVIDENCE. Donna's absence from
             the operational documents establishes nothing about
             authorship, and Cecelia O'Donnell's documented
             client-services responsibilities do not establish
             authorship either — she is register-held solely to
             preserve the distinction and creates no publishable
             fact. APPROVED PUBLIC FORM: "Donna Cabrera created and
             launched One Step To Service®, AnciCare's coordinated
             approach to referral, scheduling and reporting." The
             register preserves the fuller attestation; public copy
             uses the restrained form. · FOUNDER
2026-08-17 · ⚠️ THIS SUPERSEDES THE CORPORATE-ASSOCIATION-ONLY
             READING PROPOSED EARLIER THE SAME DAY. The evidence
             review concluded that Donna's connection to the program
             was corporate rather than personal because no document
             names her. ⛔ THAT CONCLUSION TREATED DOCUMENTARY
             SILENCE AS EVIDENCE AND IS OVERRULED. Recorded so a
             future agent reading the audit does not revert to it.
             · FOUNDER
2026-08-17 · TRADEMARK TREATMENT. The ® may publish when referring to
             the historical AnciCare program. ⛔ SURROUNDING COPY
             MUST MAKE CLEAR IT IS AN ANCICARE-ERA PROGRAM, NOT A
             PRESENT USRad PROGRAM OR A USRad-OWNED MARK. The
             corporate-inheritance firewall applied to a trademark —
             a mark is exactly where an outside reader tests
             ownership. · FOUNDER
2026-08-17 · ⛔ FOUR SCHEDULING FORMULATIONS — DO NOT SYNTHESIZE.
             48 hours or less (Genesis, Nov 1994) · 48 to 72 hours
             (newsletter) · two to three working days (newsletter) ·
             90% of referrals within two to three days (SFBJ, 5 Feb
             1999, already admitted). They do not contradict — clock
             hours vs business days, across eight years — BUT RULE 18
             PERMITS ONE CANONICAL AND ONE COMPACT FORM AND THERE ARE
             FOUR, so synthesis is barred rather than required.
             Publish one formulation with its date and source, or
             none. ⛔ 72-HOUR AS A FLAT STANDARD IS BARRED — it is
             the CEILING OF A RANGE PRESENTED AS THE PROMISE, the
             #29 defect inverted. ✅ NO SCHEDULING NUMBER IS USED IN
             DONNA'S REMEDIATION. · FOUNDER
2026-08-17 · ⛔ TRIFOLD AND NEWSLETTER ARE CP EVIDENCE OF WHAT
             ANCICARE SAID, NOT PROOF OF WHAT ANCICARE WAS. Four
             claim families barred: the D3-class superlatives
             including "one of the first of its kind" — THE EXACT
             NARROWED FORM D3 REJECTED ON 2026-08-09; "serves over
             70% of the Workers' Compensation Industry"; "50 states
             including Puerto Rico" and "millions of individuals",
             the former CONTRADICTED BY §4a's DATED WAYPOINTS and the
             latter a §4c people-count; and "over 300 nationwide
             companies". ⚠️ NEWLY ENCOUNTERED AND NOT ADJUDICATED —
             $475, $960–$1,400, $250–$400, 70+ Florida centers, the
             Southeast geography, the historical phone and address.
             ⛔ RECORDED SO THAT APPEARING IN A TRANSCRIPT IS NOT A
             ROUTE INTO PUBLICATION. This is the material class that
             produced $246M, 150,000+ and 1,500+ locations.
             · FOUNDER + ADVISOR
2026-08-17 · ⛔ REGISTER CORRECTION — co-founder-d.astro:401 WAS
             MISCLASSIFIED AS A TENURE (b) INSTANCE SINCE 2026-08-07.
             "Three decades of putting patients first" is
             third-person and unsigned; it FAILS THE STATED (b) TEST
             and is an (a) instance requiring conformance. ⚠️ THE
             MISCLASSIFICATION SHIELDED IT FROM EVERY CONFORMANCE
             PASS, because (b) instances are explicitly not
             automatically conformed. ⛔ A WRONG CLASSIFICATION IS
             MORE DURABLE THAN A WRONG FIGURE — THE FIGURE GETS
             SWEPT, THE EXEMPTION DOES NOT. Found by the
             /co-founder-d audit. · ADVISOR
2026-08-17 · ⛔ VERIFICATION COMMANDS REQUIRE A CONTROL. Multiple
             governance checks in the Donna evidence pass returned
             confident but misleading results because the command
             itself did not correctly address the file structure,
             wrapping, ordinal, or variable state. ⚠️ A VERIFICATION
             COMMAND IS NOT EVIDENCE MERELY BECAUSE IT EXITS
             SUCCESSFULLY OR RETURNS A COUNT. For material sweeps,
             pair the target check with a known-present control or an
             independently predictable result that proves the command
             can see the class of content being tested. ⛔ FAILED
             VERIFICATION LOGIC MUST BE CORRECTED BEFORE ITS OUTPUT IS
             RELIED UPON. ⚠️ SIX CHECKS FAILED THIS WAY IN ONE
             SESSION: an ordinal collision between TRACKER's batch and
             open-item sequences; a grep whose emoji argument was
             stripped in transit so it ran twice against itself; an
             awk referencing an unset variable, which flagged every
             table line in the file; a miscounted expected row total;
             and two literal greps against phrases that wrap. ⛔ TWO
             GENUINE DUPLICATIONS — A DOUBLED §4a ROW IN TWO DIFFERENT
             VERSIONS, AND A DOUBLED FA ROW ORPHANED OUTSIDE ITS TABLE
             — WERE CAUGHT ONLY BECAUSE THE OPERATOR PASTED THE OUTPUT
             RATHER THAN TRUSTING THE EXIT CODE. ⚠️ THIS GENERALIZES
             #54: the workstream is no longer only defending against
             bad claims, but against false confidence in the tools
             used to prove those claims are gone. · ADVISOR
2026-08-18 · /co-founder-m REMEDIATED; #78 CLOSED. Eleven claims,
             four commits, five founder rulings. Awards grid removed
             entire rather than rebuilt — Inc. 500 #210 folded into
             Career Highlights with DBA attribution, "AnciCare PPO",
             not the legal entity. Recognition restraint held: the
             page did not gain trophies because it is a dedicated
             founder page. · FOUNDER
2026-08-18 · FOUNDER STATEMENT ADMITTED AS FA. "Follow the value. It
             will tell you how the market really works." — Michael
             Cabrera — expressly adopted today as a CURRENT founder
             statement, not a historical quotation.
             ⛔ A FIRST-PERSON QUOTATION PUBLISHES ONLY ON THE NAMED
             SPEAKER'S EXPLICIT DATED ATTESTATION THAT THE WORDS ARE
             HIS. Not a route to restoring manufactured voice on
             /about or elsewhere. · FOUNDER
2026-08-18 · ⛔ #54's SIXTH-MODE REMEDY WAS DEFECTIVE AND HAS BEEN
             SINCE 2026-08-16. Per-line sed cannot strip multi-line
             tags. A #78-recorded barred heading returned zero through
             the register's own prescribed command. Flatten-first is
             the working form. ⚠️ AND grep -c ON FLATTENED OUTPUT
             COUNTS LINES, NOT OCCURRENCES — it cannot verify "exactly
             once." This is the 2026-08-17 verification-control rule
             applied to the register's own instructions. · ADVISOR
2026-08-18 · ⚠️ #54's EIGHTH MODE REFINED. Page-body comments DO ship;
             only top-level comments between sibling nodes are
             stripped. The 2026-08-17 #78 amendment asserting two §4a
             figures reached shipped HTML is CORRECTED — they did not.
             ⛔ THE STANDING RULE AGAINST REPRODUCING A CONTAINED
             FIGURE IN ITS COMMENT IS UNCHANGED AND VINDICATED. ⚠️ A
             DEFECT WAS RECORDED FROM A GENERAL RULE WITHOUT CHECKING
             THE FILE. · ADVISOR
2026-08-18 · ⛔ PATCH SHAPE IS A SEPARATE VERIFICATION DIMENSION. For
             bounded remediation, successful content checks do not
             prove that only intended material changed. Before commit,
             inspect git diff --stat and the ordinary diff; use
             git diff -w when unexpected formatting churn appears. ⛔ A
             MATERIALLY LARGER-THAN-EXPECTED DIFF IS A STOP CONDITION
             UNTIL THE CAUSE IS UNDERSTOOD. Do not accept a passing
             claim sweep as evidence of patch integrity. ⚠ Occasioned
             by a whole-file reformat during /co-founder-d Batch 1 that
             showed 915 changed lines while git diff -w showed 15, and
             by five paste corruptions in APPROVED-FIGURES.md on
             2026-08-17 — a doubled §4a row in two different versions,
             an FA row orphaned outside its table, and a line sliced
             mid-word. ⛔ EVERY ONE WAS CAUGHT BY A STAT OR SHAPE
             CHECK; NONE BY A CONTENT CHECK. This is distinct from #54,
             which taxonomizes sweeps that fail to see a claim; here
             the sweep sees correctly and the edit is wrong.
             ⛔ #54 IS NOT INCREMENTED. · ADVISOR
2026-08-18 · /contact REMEDIATED; #80 OPENED AND CLOSED IN ONE PASS.
             Register recorded three defects; audit found twenty-one.
             ⛔ TWO WERE NOT FIGURES AT ALL: a response-time GUARANTEE
             with no support operation behind it, and a Live Chat card
             whose button alerted "coming soon". ⚠️ A PROMISE OF
             CAPABILITY IS A CLAIM CLASS THIS REGISTER HAS NOT
             CARRIED — it has no number, so no sweep reaches it, and
             #53's promotional-claims class does not cover a
             functional commitment. · FOUNDER + ADVISOR
2026-08-18 · CONTACT STAFFING. Founder attests the line is staffed
             9 AM–5 PM ET on business days by Michael and Donna
             Cabrera. ⛔ RULED NOT FOR PUBLICATION — true, but it
             creates a maintenance obligation when staffing changes
             and makes the company appear founder-dependent by
             design. Availability publishes as "Phone support
             available 9 AM–5 PM ET". ⛔ NO RESPONSE-TIME COMMITMENT
             SURVIVES, staffed hours notwithstanding: a staffed phone
             is not an answer-time guarantee. · FOUNDER
2026-08-18 · ⚠️ #18 CLOSES FOR /contact ONLY. Ten remaining matches
             across seven files are THREE DIFFERENT THINGS and the
             sweep that found them cannot tell them apart: marketing
             rating claims (now #81), EDS-owned system-health uptime
             readouts (deferred under the 2026-08-08 functional
             boundary), and unrelated confidence and CSS values.
             ⛔ A SHARED NUMERAL IS NOT A SHARED CLAIM. · ADVISOR
2026-08-18 · ⛔ #81 OPENED — 4.9★ HAS NEVER BEEN ENUMERATED. #28 named
             the figure years of batches ago; no document lists its
             instances. Three live on marketing routes, one in a JS
             array literal. ⚠️ THE GLYPH IS THE CLAIM SURFACE: ★
             carries no digit and is invisible to every numeric sweep,
             exactly as ∞ was on /co-founder-d. · ADVISOR
2026-08-18 · /how-it-works REMEDIATED; #82 OPENED AND CLOSED.
             ⚠️ FOUNDER RULING REVERSED THE AUDIT'S PREMISE AND WAS
             RIGHT TO: the page may describe the designed system.
             The audit proposed conforming ~40 present-tense process
             descriptions; the ruling held that explaining a design
             is not asserting an operating history, and required
             removal only of unsupported specifics. ⛔ THAT COLLAPSED
             FORTY SPECULATIVE CONFORMANCES TO FIFTEEN CONCRETE ONES
             and preserved the page's architecture entire. · FOUNDER
2026-08-18 · ⛔ THE TEST THAT MADE THAT WORK: does the claim describe
             WHAT THE SOFTWARE DOES WHEN YOU USE IT, or WHAT A PERSON
             OR ORGANISATION WILL DO AFTERWARD? "Instant
             recommendation" is a property of the engine and
             publishes; "<2 hour response" and "Within 4 hours" are
             commitments about human coordination and do not. ⚠️
             ADVISOR PROPOSED REMOVING "instant"; FOUNDER CORRECTED
             IT — the engine does return a result on submit.
             · FOUNDER + ADVISOR
2026-08-18 · 27,000+ ACR-ACCREDITED FACILITIES ADMITTED, §4a, CT.
             27,154 rows to 27,036 unique on name+address+zip, zero
             nulls; per-modality rows collapse into array columns on
             load. Query date 2026-08-18. ⛔ IT IS A UNIVERSE FIGURE,
             NOT NETWORK SCALE — USRad has zero contracted providers,
             and it publishes only attached to the Discovery Network.
             "Nationwide" was removed where it sat beside "our
             contracted network". ⚠️ Usage terms held privately by
             the founder. · FOUNDER
2026-08-18 · ⚠️ #81 RESOLVED ON ITS OPEN QUESTION and #54 gains a
             scope note: shadow .bak/.preclaude files in src/ return
             sweep hits and compile nothing. ⛔ THE INVERSE RISK IS
             REMEDIATING A BACKUP INSTEAD OF THE LIVE FILE. · ADVISOR
2026-08-18 · /education/what-is-an-mri REMEDIATED; #83 OPENED AND
             CLOSED. Register knew of one defect; audit found
             seventeen. ⛔ THE WORST WERE NOT ON THE PAGE: the JSON-LD
             carried a fabricated aggregateRating with reviewCount
             1200, a commercial Offer at $260 marked InStock with an
             expired priceValidUntil, 150,000+ in the author
             description, and a $260-vs-$3,200 pricing FAQ. ⛔ THE
             GOVERNANCE FACT IS SIMPLE: STRUCTURED DATA IS A
             CLAIM-BEARING PUBLICATION SURFACE AND MUST BE SWEPT
             SEPARATELY FROM RENDERED TEXT. · FOUNDER + ADVISOR
2026-08-18 · #81 CLOSED FOR THE MARKETING FAMILY ONLY. All live
             marketing instances of 4.9★ are gone; SocialProofBar
             renders on no live marketing route. ⛔ THE REMAINING
             SEEDED VALUES ARE NOT PART OF THE REMEDIATED MARKETING
             POPULATION — they are EDS-owned server-rendered
             application surfaces, documented and deferred under the
             2026-08-08 functional boundary. · ADVISOR
2026-08-18 · #82 STATUS CORRECTED. "Production verification pending
             merge" replaced with production-verified at 17af6d2.
             A correction, not a finding. ⚠️ Stale completion text is
             the #52 class and is corrected on sight. · ADVISOR
2026-08-18 · ⛔ #84 OPENED — SERVER-RENDERED ROUTES HAVE NEVER BEEN
             SWEPT. Artifact verification has concentrated on
             .vercel/output/static/; routes emitted through
             _render.func require a different target and have been
             invisible throughout. /patient-management and
             /patient-dashboard/education demonstrate it: both return
             NOT BUILT from a static check and both ship live with
             seeded claim-bearing values. ⛔ THIS IS A COVERAGE
             FINDING, NOT A MANDATE TO REMEDIATE APPLICATION
             SURFACES. ⚠️ POPULATION NOT MEASURED — neither the
             server-pages listing nor the count of files lacking the
             prerender export is a route count without inspection.
             · ADVISOR
2026-08-18 · ⛔ #56 UNDERCOUNTED. Two further 1,500+ instances live on
             /dashboard in variant forms the item's phrase-based count
             could not reach, on a server-rendered route no static
             sweep could read. ⚠️ TWO OF #54's MODES COMPOUNDING —
             variant form and wrong build target — and the item's
             "nineteen instances" was a measured figure, which is why
             it read as complete. ⛔ EDS-owned; documented, not
             remediated. See #84. · ADVISOR
2026-08-18 · ⛔ #85 — A COMPONENT CAN SHIP CLAIMS WITH NO PATH TO IT.
             BrowseAllModal rendered on / with no trigger anywhere in
             the codebase, publishing an unregistered procedure count
             and a nationwide availability claim into the served HTML.
             ⚠️ HIDDEN-BY-DEFAULT MARKUP IS PUBLISHED MARKUP — the
             same principle as #54's tenth mode, where a counter
             rendering "0" still carried a barred figure. ⛔ AND
             HARDCODED COUNTS BESIDE A DYNAMIC LIST DRIFT: the four
             cards sum to 19 against a claimed 20, and the live
             modal on the same page disagrees with both. · ADVISOR
2026-08-19 · ⛔ #46 ADJUDICATED AND DEFERRED; #45 REMAINS THE
             CONTROLLING BLOCKER. Layer 2 v1.4 §H item 41.5 states
             the board-certified roster requirement outright with
             Suspended-level enforcement, and PSA §2.2/§2.11
             incorporate USRad Verification by reference. ⚠️ THAT
             STRENGTHENS THE EVIDENCE AND DOES NOT CHANGE THE
             AUTHORITY. Layer 2 v1.4 is itself a draft — it says "as
             of this draft" in Section K, carries five open
             micro-decisions including item 41.5's own off-roster
             default, inherits an unsettled Layer 1 decision, and has
             no effective date or adoption field. ⛔ #45's ASYMMETRY
             GOVERNS: REMOVAL AUTHORITY, NEVER PUBLICATION AUTHORITY.
             The 2026-08-09 ruling is REFINED, NOT REVERSED.
             · FOUNDER + ADVISOR
2026-08-19 · ⚠️ #46's ORIGINAL RULING CONTAINED TWO HOLDINGS AND THE
             REGISTER TREATED THEM AS ONE. (i) The guarantee form is
             forbidden by Layer 1 §1.3 — never an evidence question,
             unchanged, and untouched by Layer 2. (ii) The
             requirement form was refused for want of a ratified
             source — still refused, because the newer source is also
             unratified. ⛔ SEPARATING THEM IS WHAT MAKES #46
             TRACTABLE: not one barred family but four classes with
             three dispositions. ⚠️ A supported-on-adoption · B and C
             deferred · ⛔ D barred outright. ⛔ EXISTING INSTANCES
             ARE NOT MASS-REMOVED — the requirement is likely to
             survive adoption, and sitewide removal against a draft
             that supports it would be the wrong error. ✅ Incidental
             conformance during a page pass continues. · FOUNDER
2026-08-19 · ⛔ ADOPTION OF THE VERIFIED PROVIDER STANDARD IS THE
             UPSTREAM GOVERNANCE ACTION, AND IT IS A FOUNDER ACT
             RATHER THAN A REMEDIATION PASS. #45 has been open since
             2026-08-09 with ten Appendix B decisions gating it;
             resolving it may unblock #44 and #46 together. ⚠️ AND
             THE REGISTER HAD NOT RECORDED THAT THE STANDARD IS NOW
             LAYERED — zero mentions of Layer 1 or Layer 2 in any
             governance file; the last version on record is v1.0
             DRAFT while a Layer 2 v1.4 exists. ⛔ RULINGS ARE
             ACCUMULATING AGAINST AN UNADOPTED DOCUMENT ACROSS TWO
             LAYERS AND FIVE VERSIONS. · ADVISOR
2026-08-19 · ⚠️ CARRY-FORWARD: THE AUGUST 9 STANDARD CITATIONS ARE
             HISTORICAL, NOT CURRENT. §1.3, §5.2, §5.7 and §12 were
             cited against Layer 1 v1.0 DRAFT. The Standard is now
             layered and versioned beyond that, and the register had
             not recorded it. ⛔ BEFORE ANY FUTURE RULING RELIES ON
             THOSE PROVISIONS, verify the section numbers, the
             operative language, whether a later revision superseded
             the August 9 basis, and whether the citations should be
             version-qualified. ⚠️ UNTIL THEN THEY MEAN v1.0 DRAFT.
             ⛔ NOT A REOPENING OF #45 OR #46 AND NOT A GATE ON PAGE
             WORK — it attaches when a ruling next depends on them.
             · FOUNDER + ADVISOR
2026-08-19 · #66 RE-VERIFIED; NO SOURCE ACTION REQUIRED. Both prior
             containments hold and the component publishes no claim.
             Verification also established that #65 understated
             syndication exposure: the unresolved
             uninsured-imaging-guide title appears on six built
             routes — its own route, four related-post cards, and the
             blog index. This remains one editorial title claim
             syndicated to six publication surfaces, not six
             independent defects. The previously recorded homepage
             coupling is not present in the current build. #65
             remains pending Founder editorial adjudication.
             · ADVISOR
2026-08-19 · #65 SYNDICATED TITLE CORRECTED; ARTICLE ROUTE STILL
             OPEN. Founder ruled the numerical claim out of the
             title rather than conformed to the 50%+ floor. One
             presentation family, three authoring sites, six built
             surfaces cleared and verified. ⛔ THE BODY IS NOT
             REMEDIATED — four percentages, six prices, a comparison
             table, a calculator, a timing commitment and equivalence
             language remain, open for whole-article adjudication.
             ⚠️ /blog KEEPS A DUPLICATE POST ARRAY: article routes
             read blogPosts.js, the index does not. Documented drift
             risk. ⚠️ AND HeroSection.astro:75 PUBLISHES 70% Less ON
             THE HOMEPAGE — highest-traffic remaining site in the
             family, still open. ⛔ SEPARATELY: THE 2026-08-19
             SYNDICATION AMENDMENT WAS FIRST WRITTEN ONTO THE WRONG
             #65 — the RECONCILIATION 2 batch row, not the open item.
             Corrected same day. The batch index and the open-item
             table share an ordinal namespace, the hazard #54 records
             at its 2026-08-17 amendment. ANCHOR ON ROW CONTENT, NOT
             ROW NUMBER. · ADVISOR
2026-08-19 · /membership REMEDIATED UNDER RETENTION-FIRST; #70 CLOSED,
             #72 AMENDED. ⚠️ FOUNDER SET THE HIERARCHY EXPLICITLY —
             KEEP, then CONFORM, then REPLACE, then REMOVE, with
             removal requiring a reason the proposition itself cannot
             responsibly publish. ⛔ THAT TURNED ELEVEN "BARRED
             NETWORK CLAIMS" INTO FIVE SCALE-WORD CONFORMANCES, ONE
             REPLACEMENT AND ZERO REMOVALS. The defect was
             "nationwide" and "has built," not "pre-negotiated."
             ✅ MemberTrustBadge AFFIRMED and not edited; the
             remediated homepage was not reopened. #72's rule-24
             classification is superseded. · FOUNDER
2026-08-19 · ⛔ #86 — og METADATA IS A FOURTH CLAIM-BEARING SURFACE.
             CarbonLayout hardcoded "National Diagnostic Imaging
             Access Infrastructure" and "nationwide … infrastructure-
             grade reliability" into all 48 routes, ignoring every
             page's own conformed metadata. ⚠️ FOUND BY ACCIDENT
             DURING /membership PRODUCTION VERIFICATION — the same
             way structured data was found at #83. ✅ Founder chose
             prop inheritance over a hardcoded rewrite, so every past
             and future page conformance propagates for free.
             ⚠️ SEVEN OVERRIDES ARE SCAFFOLDING AND COME OUT WHEN
             THEIR PAGES ARE REMEDIATED. · FOUNDER
2026-08-19 · ⛔ #87 OPENED — connect/* NOT PAPERED OVER. Five of six
             audience bodies assert an operating nationwide network
             and investor carries ~90 million, all from one data file
             that feeds page copy AND og description. ⛔ AN
             ogDescription OVERRIDE WOULD HAVE MADE THE SHARE CARD
             CLEAN WHILE LEAVING THE CLAIMS LIVE ON THE PAGE — the
             wrong error. Opened as its own surface instead.
             · ADVISOR
2026-08-19 · PROVENSUCCESS RULED UNDER RETENTION-FIRST — SECTION AND
             ALL THREE TILES RETAINED. ⛔ THE DEFECT WAS ANCHORING,
             NOT THE FIGURES. 1,200+ and $60M+ are approved §4a
             figures; both were publishing without their governed
             anchors. CONFORMED: "Centers recruited / 1994-2002" →
             "AnciCare centers / by 2002", because 1994-2002 presents
             a point-in-time contracted count as an eight-year
             cumulative recruitment total, and because the tile
             carried no AnciCare provenance on its face; "$60M+ /
             Paid to imaging centers" gains its 1994–2001 period;
             "By Public Company / Still thriving today" → "By CorVel
             Corporation / May 2002", replacing an unsourced
             present-tense assertion about a third party with
             register-approved fact. ⛔ THE FOUNDER QUOTE WAS THE ONLY
             ITEM REQUIRING A NEW RULING: "something even better with
             USRad" is a comparative superiority claim about a
             pre-launch product. Replaced with language expressly
             adopted 2026-08-19 and recorded at §4a as current
             founder statement, not historical quotation. ⛔ NOTHING
             REMOVED THAT COULD BE ANCHORED. · FOUNDER
2026-08-19 · #30 PARTIALLY CLOSED — NINE OF FOURTEEN. ⛔ THE SAME
             NUMBER CARRIED FOUR DIFFERENT PROPOSITIONS: audience
             description, recruiting mission, partner mission, and
             investor market sizing. They do not share a disposition.
             Audience and mission statements survive the number's
             removal because the surrounding sentence already names
             who is meant; "People We Serve" and "Americans Served"
             tiles do not survive, because they assert present-tense
             service to ninety million people with zero contracted
             providers. ⛔ NO SUBSTITUTE POPULATION FIGURE ANYWHERE.
             ⚠️ /investor EXCLUDED — its five instances are
             structural to a market-size argument and mechanical
             deletion would leave holes. Queued at #90. · FOUNDER
2026-08-19 · A VERIFICATION COMMAND THAT DOES NOT GATE THE ACTION IT
             VERIFIES IS DECORATION. Two branches were deleted today
             before their work reached main — provider-residual,
             whose governance commit was orphaned by a merge race,
             and claim-30-population, whose PR was never merged at
             all. Both recovered from dangling objects; nothing was
             lost. ⚠️ IN BOTH CASES THE CHECK AND THE DESTRUCTIVE
             COMMAND WERE SUPPLIED IN THE SAME BLOCK, so the check
             printed its warning and the next line ignored it. ⛔
             STANDING RULE: git log main..BRANCH must be empty, and
             the delete must be CONDITIONAL on it, not adjacent to
             it. · ADVISOR
                                                                                                                                                                                                              
```

---

## August 19, 2026 — #84 closeout

```

2026-08-19 · ⛔ #84 CLOSED ON ENUMERATION. Its purpose was coverage
             discovery, and the population is now measured and
             classified. 79 server-rendered .astro routes plus 18
             .html routes the initial enumeration could not see, all
             publicly reachable. Class A 2 · Class B 49 · Class C 6 ·
             Class D 3 · Class E retired. ⛔ NEW SURFACES GET THEIR OWN
             ITEMS; #84 does not become an umbrella. · FOUNDER

2026-08-19 · ⛔ 18 NON-ROUTABLE HTML ARTIFACTS RETIRED AS A CLASS.
             Every .html file in src/pages was served as a public
             route with no inbound link from src/. Titles established
             them as mockups, video cards, wireframes and drafts.
             Five carried governed subject matter: ancicare-power,
             timeline, timeline2 (AnciCare), 90million2,
             90milliongraph (#30). ⛔ SOURCE PRESERVED UNDER
             docs/retired-surfaces/ VIA git mv, NOT DELETED — four are
             cited by line number in this register and the citations
             must stay resolvable. No redirects: 404 after retirement
             is correct where no replacement route exists. Verified
             404 in production. · FOUNDER

2026-08-19 · ASTRO PROVIDER-ONBOARDING ROUTES RETIRED IN STATUS BUT
             NOT UNROUTED. The live onboarding platform is the Remix
             implementation. ⚠ FOUR EDS-OWNED INBOUND LINKS BLOCK
             UNROUTING: providers/pre-portal.astro and
             PSASuccessContent.jsx → onboarding/facilities;
             RoleSection.astro, OrganizationForm.astro and
             AddCenterForm.astro → onboarding/market-calculator;
             PricingConfigurator.jsx → onboarding/confirmation. ⛔ THIS
             IS A SEQUENCING DEPENDENCY, NOT A REVERSAL OF RETIREMENT
             STATUS. pre-portal, signup, verified, check-email,
             portal-transition and providers/portal/* are NOT extended
             by this ruling; their status is determined in the Remix
             review. · FOUNDER

2026-08-19 · /member-rights CLOSED CLEAN — the first surface in this
             workstream to require zero source edits on first read.
             Nine policy items, no figures, no network claims, blast
             radius zero. ⚠ #84's cell claimed member-rights renders
             MemberRightsSummary; IT IMPORTS ONLY CarbonLayout. The
             component renders on how-it-works and membership, both
             already remediated. Phone 1-866-USRad-24 KEPT — it
             matches the sitewide CarbonFooter exactly and a
             register-string conformance would have created a fourth
             display variant. · FOUNDER

2026-08-19 · PHONE DISPLAY VARIANTS RECORDED, NOT NORMALISED.
             (866) USRad24, (866) USRad-24 and 1-866-USRad-24 are all
             acceptable where the number resolves to 1-866-877-2324.
             ⛔ DO NOT MECHANICALLY NORMALISE REMEDIATED SURFACES FOR
             TYPOGRAPHY. · FOUNDER

2026-08-19 · /form-submitted RETIRED. An orphaned confirmation page
             for a dead form: ConsultationForm.astro renders on no
             route in src/, measured across .astro, .jsx, .ts and
             .tsx. The route returned 200 and published "submitted
             successfully" and "within 1 business day" for a
             submission that cannot occur. D12 governs — the page may
             describe the user's action; it may not claim the
             downstream delivery occurred. ⛔ REVIVAL WARNING:
             ConsultationForm.astro is preserved unmodified and is the
             only method="get" form in src/ — user name, email and
             phone would serialise into the URL and reach browser
             history, referrer headers and access logs (#61 class),
             and it targets no endpoint. · FOUNDER

2026-08-19 · /patient-promise CONFORMED, NOT DISMANTLED. Whole-page
             read, 1079 lines: KEEP 38 / CONFORM 7 / REMOVE 1 / HOLD 3
             plus a capability family of 13. ⛔ THE PAGE'S WORST CLAIM
             WAS IN NO REGISTER ITEM: ":532" asserted USRad had
             "already settled both the facility fee and the
             radiologist fee through our network agreement" — a
             present-perfect claim of an executed agreement with
             settled provider fees, with zero contracted providers.
             Conformed to founder-ratified coverage language.
             ⚠ #55 RECORDED same-day ×8 ON THIS ROUTE. THERE IS ONE
             INSTANCE IN SOURCE, and it is a conditional payment-policy
             statement, not an availability commitment — KEPT. · FOUNDER

2026-08-19 · THE GUARANTEE DISTINCTION. /patient-promise's guarantee
             family KEPT: a commercial refund policy USRad controls
             unilaterally, requiring no counterparty — #75's class, not
             #60's clinical-warranty class. ⛔ /provider/faq's payment
             guarantee is NOT the same: a refund returns money USRad
             already holds; a disbursement pays a provider on a
             contract that does not exist. Conformed to the Provider
             Service Agreement instead. · FOUNDER

2026-08-19 · /news RETIRED. The old vanilla placeholder route,
             publishing three fabricated headlines as completed
             announcements: "USRad Expands Network to 50 States",
             "USRad Announces Partnership with Leading Medical
             Institutions", "New Technology Integration Enhances
             Patient Experience". ⛔ "Coming Soon" ATTACHED TO THE
             ARTICLE, NOT THE EVENT, and did not cure them. A
             frontmatter comment reading "Mock news articles" is
             stripped at build and published nothing. Retirement
             resolves all three as a class. ⚠ /news was the only
             consumer of MainLayout.astro, itself marked DEPRECATED,
             which renders Footer.astro; PartnerLayout and
             MainPatientLayout also import Footer.astro and are used
             by zero pages. All four now render on no route.
             Dead-layout cleanup is out of scope. · FOUNDER

2026-08-19 · ⛔ FOOTER LINKS RESOLVED BY RETIRING THE ROUTE, NOT BY
             EDITING AN ORPHANED COMPONENT. Footer.astro carried two
             links to nonexistent routes — /founder (404) and /news.
             Editing a component that renders nowhere is work with no
             published effect; the ConsultationForm disposition
             applies. Verified: >News< and "Meet the Founder" return
             zero across static/ and _render.func after retirement.
             ⚠ /founder CLASSIFIED AS A DEPRECATED PAGE, NOT A DEAD
             REFERENCE: src/pages/founder.astro existed across ten
             commits and was deleted at 2ae29fd (2025-10-25)
             incidentally, inside a newsletter-feature commit. Do not
             redirect or recreate. ⚠ ec1b830 ("completed the press-kit
             for MAC") touched founder.astro — the deleted file may
             carry governed founder material for the /press-kit
             rebuild. · FOUNDER

2026-08-19 · /provider/faq CONFORMED — the largest surface in this
             workstream at 3279 lines, 18 FAQs, blast radius zero.
             KEEP 48 / CONFORM 17 / REMOVE 3 / HELD 24.
             ⛔ THE PAYMENT FAMILY PUBLISHES AS A CONTRACT, NOT A
             WARRANTY: the ten-business-day term is supported by the
             Provider Service Agreement and conforms to "Under the
             Provider Service Agreement, payment is due within 10
             business days of Fulfillment Complete." The PSA may be
             named publicly; ITS VERSION NUMBER AND INTERNAL SECTION
             NUMBERS MAY NOT. Use the defined trigger Fulfillment
             Complete rather than paraphrasing it. Removed: "much
             faster than traditional models", "you wait 60-90 days",
             "we ensure". · FOUNDER

2026-08-19 · ⛔ AN INVENTED PERFORMANCE METRIC, PRESENTED AS HISTORY.
             /provider/faq published "Track Record: Our no-show rate is
             typically below 5% - significantly better than the
             industry average of 15-20%." USRad has scheduled zero
             appointments, so there is no no-show rate; the industry
             figure is unsourced. #74's class — invented proof, not an
             evidence gap. ⚠ NEITHER PERCENTAGE WAS REACHABLE BY ANY
             BARRED-FIGURE PATTERN IN THIS WORKSTREAM; a targeted
             sweep of the whole 3279-line file returned three hits and
             none was this. REMOVED ENTIRE. · FOUNDER

2026-08-19 · ⛔ PREVALENCE CLAIMS ARE REWRITTEN QUALITATIVELY, NOT
             SUBSTITUTED. Replacing "Most established imaging centers"
             with "typically" merely exchanges one prevalence claim
             for another. The governing form removes the quantifier
             entirely: "These requirements reflect standard credentials
             and operating information established imaging centers
             maintain." ⚠ THIS FAMILY IS A DEFECT CLASS NO SWEEP
             REACHES — Most, Many, often, completely, ever, rare case
             — and it produced most of the conformances on both
             surfaces audited today. · FOUNDER

2026-08-19 · /providers/join RETIRED — CONTAINMENT RULING REVERSED ON
             EVIDENCE. Containment was ruled on the premise that three
             application components still direct provider traffic to
             the route. ⛔ MEASUREMENT FALSIFIED THE PREMISE:
             EnterpriseOnboarding.jsx and ProviderPortalDashboard.jsx
             contain the redirects and are rendered by no page in src/.
             MARKETING-SYSTEM-ENGINEERING-REPORT-V2 confirms provider
             CTA routing was migrated to ${REMIX_URL}/signup?source=,
             and /providers/join appears in NEITHER frozen engineering
             report — not in the funnel, the route inventory or the CTA
             tables. ⛔ IT WAS A LIVE DUPLICATE SIGNUP PATH CREATING
             SUPABASE ACCOUNTS OUTSIDE THE CANONICAL FLOW. Retirement
             removed an exit-intent modal publishing "guaranteed
             revenue", "$60M+ already paid to imaging centers like
             yours", "get paid in 10 days, not 90", "no insurance
             hassles or denials" and "start receiving patients this
             week", plus two A→C transfers and three superlatives. The
             scoped §4a fact — over $60 million paid to imaging centers
             1994–2001 — is preserved in the retired source. · FOUNDER

2026-08-19 · ⛔ 36 CAPABILITY AND SECURITY STATEMENTS HELD AS A FAMILY
             ACROSS TWO SURFACES, awaiting ONE Remix/EDS verification
             pass. /patient-promise 13 (portal cancellation, one-click,
             24/7, no approval, refund initiation, 5–10 business day
             settlement, HSA/FSA, real-time centre notification) and
             /provider/faq 23 (portal, scheduling, reminders,
             coordination team, knowledge base, 256-bit encryption
             including "military-grade", RBAC, audit logging, RIS/PACS
             integration, rate-to-volume and patient-facing rate
             display). ⛔ DO NOT MECHANICALLY CONFORM THEM. Verification
             determines actual implementation; wording follows. This is
             now the largest open dependency in Workstream A. · FOUNDER

2026-08-19 · MEDICARE RATE TIERS HELD. /provider/faq publishes
             "100%, 120%, or 140% of Medicare" as the provider-selected
             reimbursement levels. ⛔ PRICING ARCHITECTURE IS NOT
             ESTABLISHED THROUGH AN ASTRO MARKETING REMEDIATION. Held
             unchanged for the Provider Onboarding/MarketScope review
             in Remix. Also held: "7–10 business days" onboarding
             timing, an unapproved figure that additionally contradicts
             the same page's "2-3 Wks" credentialing tile. · FOUNDER
```

---

## August 20, 2026 — #92 closeout

```

2026-08-20 · ⛔ #92 CLOSED — SEVEN ARTIFACTS, SEVEN DISPOSITIONS. The
             item opened public/ as a fifth claim-bearing publication
             surface class and its population is now measured and
             ruled. THREE RETIRED to docs/retired-surfaces/public/ with
             no redirects, all unlinked, all 404-verified in
             production: html/presentation, html/pricing.html and
             docs/founder-presskit.pdf. TWO KEPT pending their own
             reviews. TWO DEFERRED to EDS. ⛔ THE ITEM CLOSES; THE
             CLASS FINDING DOES NOT. public/ is served by the Vercel
             filesystem handler and is invisible to route sweeps,
             build checks and route-level curl. Any future artifact
             placed there publishes without passing a single gate this
             workstream operates. · FOUNDER

2026-08-20 · ⛔ AN INVESTOR DECK AND A FULL PRICING PAGE WERE LIVE AT
             PUBLIC URLS WITH NO INBOUND LINK. html/presentation
             published $100B+ x3, 90M x2, $3,000, 30-70%, Same-Day and
             nationwide — the same argument #90 exists to adjudicate on
             /investor — plus "usrad.com registered in 2003 — 20+ years
             of brand development", ⛔ A DOMAIN-REGISTRATION-AS-BRAND-
             HISTORY CONSTRUCTION THIS REGISTER HAD NEVER SEEN, against
             the 2013 LLC firewall. html/pricing.html carried full site
             navigation and published ⛔ "Save up to 96%" — TWENTY-SIX
             POINTS BEYOND THE CONFIDENTIAL D4 BOUND AND THE LARGEST
             SAVINGS FIGURE FOUND IN THIS WORKSTREAM — plus 70%,
             30-70%, $260, 1,200, 1,500, 90M and a "100% Quality
             Guarantee". ⚠️ NEITHER WAS REACHABLE BY ANY SWEEP THIS
             WORKSTREAM HAS RUN. · FOUNDER

2026-08-20 · THE INVESTOR OVERVIEW PDF IS DE-LINKED, NOT REWRITTEN.
             Both download buttons removed from investor.astro so the
             file is not promoted while carrying barred figures; the
             file is retained and its contents untouched pending the
             bounded /investor review. ⛔ NO /investor BODY CLAIMS WERE
             TOUCHED IN THIS BATCH. The PDF publishes $100B+ x3,
             90M/90M+ x3, 1,200+ AnciCare centers, 15,000+, 25x price
             variation, 30–80% (beyond the D4 bound), $300 vs $5,000,
             and the header "Built by the founder of AnciCare — the
             first national diagnostic imaging network scaled to 1,200+
             centers and acquired by a public company". ⚠️ IT IS MARKED
             "Series A · CONFIDENTIAL" AND WAS SERVED AT A PUBLIC URL.
             Reviewed with #90. · FOUNDER

2026-08-20 · ⛔ THE PROVIDER OPPORTUNITY BRIEF PUBLISHES THE D13 FAMILY
             AND IS STILL DIRECTLY ADDRESSABLE. $375 net margin per
             scan, +15–25 scans/month and $5K–$10K realistic monthly
             add are the three figures APPROVED-FIGURES.md records a
             batch was scoped to remove on 2026-08-06. It also carries
             "Turn Empty Scanner Slots Into Guaranteed Monthly
             Revenue", a "10-DAY PAYMENT GUARANTEE", "no denials, no
             chargebacks", "Revenue is confirmed before the patient
             arrives", ACR-accredited in the single-body form (B7) and
             Board-certified (#46). Its only link is in ProviderBrief,
             imported and commented out of render at provider.astro:69,
             so the file is retained unmodified pending the Provider
             Onboarding/MarketScope review. ⛔ DIRECT URL ACCESS
             REMAINS POSSIBLE AND THE ARTIFACT MUST BE REVIEWED BEFORE
             ANY FUTURE PUBLIC LINKING. · FOUNDER

2026-08-20 · THE SARAH JOHNSON REPORTS ARE FICTITIOUS AND EXPLICITLY
             MARKED. Both carry DEMO PURPOSES in the header and are
             referenced three times by SkeletonReportsSystem.jsx, a
             patient-dashboard component. DEFERRED TO EDS under the
             2026-08-08 functional boundary; the fix, if any, lives in
             EDS-owned source. ⚠️ RECORDED FOR EDS: the marker sits at
             the top while the body reads as a complete clinical record
             — facility address and phone, MRN, accession number,
             referring physician — so a printed second page carries no
             marker. Not this workstream's call. · ADVISOR

2026-08-20 · USRad DEMAND-CHANNEL HIERARCHY — A RESTATEMENT AND
             EXTENSION OF D5. (1) PRIMARY: self-funded employers and
             employer-funded health benefits. (2) SECONDARY: uninsured
             and self-pay patients seeking direct access to diagnostic
             imaging. (3) SUPPLY SIDE: contracted independent
             diagnostic imaging centers. Public marketing must reflect
             this hierarchy wherever a surface describes USRad's
             overall business model, market opportunity, demand
             strategy, growth thesis or customer mix. ⛔ SELF-PAY /
             CASH-PAY MUST NOT BE PRESENTED AS THE PRIMARY MARKET OR
             PRIMARY DEMAND STRATEGY. It remains a valid and important
             access channel, secondary to the employer-funded strategy.
             ⚠️ THIS DOES NOT BAR CONSUMER-FOCUSED SURFACES from
             speaking directly to uninsured or self-pay patients where
             that is the page's purpose; the hierarchy governs
             COMPANY-LEVEL POSITIONING — investor materials, market
             descriptions, and any surface purporting to describe
             USRad's overall strategy. Language written under the
             earlier cash-pay-first strategy is CONFORMED WHEN
             ENCOUNTERED, not mechanically removed. ⛔ THE 2026-08-06
             D5 ENTRY ALREADY RECORDED THAT EMPLOYER-FUNDED IS THE
             PRIMARY COMMERCIAL TARGET; this entry extends it from a
             vocabulary ruling to a positioning rule binding on public
             copy. · FOUNDER + ADVISOR             

2026-08-20 · ⛔ #90 CLOSED — /investor CONFORMED, NOT DISMANTLED.
             Whole-page retention-first pass, 1,596 lines, 39 anchored
             replacements including four section recompositions. No
             section contained, no section removed. ⚠️ THE ITEM'S OWN
             SCOPE WAS A THIRD OF THE POPULATION — it recorded five 90M
             occurrences; the sweep returned twenty-seven barred-family
             instances across fourteen figures. · FOUNDER

2026-08-20 · ⛔ THE WORST FIGURE ON /investor WAS NOT $100B+ OR 90M. IT
             WAS $20M, published three times as AnciCare annual revenue.
             §4a's peak documented gross receipts are $16,001,938 (2001)
             and $18M is barred as a projection; $20M exceeded both and
             appeared in no register file. Conformed to "more than $16
             million in annual revenue by 2001". ⚠️ IT HAD SURVIVED
             EVERY PRIOR PASS BECAUSE NO SWEEP PATTERN REACHED IT.
             · FOUNDER

2026-08-20 · THE TAM FAMILY PUBLISHES QUALITATIVELY OR NOT AT ALL.
             $100B+ and 90M are removed from /investor with NO
             SUBSTITUTE FIGURE and no fallback to "millions". ⛔ REMOVING
             THEM MECHANICALLY WOULD HAVE TAKEN THE MARKET SECTION'S
             SPINE, WHICH IS WHY /investor WAS EXCLUDED FROM #30 IN THE
             FIRST PLACE. Three sections were therefore RECOMPOSED
             rather than left with holes: the hero metrics row became a
             positioning strip; the Market Opportunity cards promote
             their label into the heading; and the working-capital block
             became Payment Sequencing. A fourth recomposition reordered
             the Revenue Model tiles. ⛔ COMPOSITION IS A FOUNDER
             DECISION, NOT A CLAIMS DECISION — a card built around a
             figure does not survive the figure's removal, and that is a
             layout ruling. · FOUNDER

2026-08-20 · PAYMENT LANGUAGE ALIGNED TO THE PROVIDER SERVICE AGREEMENT
             ON A THIRD SURFACE. "Positive Working Capital Model" became
             "Payment Sequencing" — At Booking · Fulfillment Complete ·
             10 Business Days. ⛔ THE SEQUENCE IS FACTUAL AND SURVIVES;
             THE CONCLUSIONS DRAWN FROM IT DO NOT. Removed: positive
             working capital, structural float, cash float advantage,
             and "like AnciCare's successful float model", an A→C
             transfer attaching USRad's model to AnciCare's result. The
             PSA may be named publicly; its version and section numbers
             may not. ⚠️ RECORDED FOR #96: "Patient pays upfront" must
             be reconciled against the employer-funded primary channel,
             where the patient may not be the payer. · FOUNDER

2026-08-20 · ⛔ #98 OPENED — A CLAIMS AUDIT CANNOT DETECT A POSITIONING
             ERROR. /investor contradicted the 2026-08-06 D5 entry for
             two weeks while a complete 1,596-line audit read every
             sentence and passed all of them, because each defective
             line is defensible on its own evidence. The most
             consequential was dated: Phase 2 of the roadmap, 2027+,
             described employer-sponsored business as an expansion
             beyond self-pay — placing the PRIMARY demand channel two
             years out. ✅ Six locations conformed, the hierarchy
             persisted, and THE POSITIONING TEST added to README as a
             fourth standing principle. ⚠️ NO OTHER SURFACE HAS BEEN
             CHECKED AGAINST THE HIERARCHY — every page remediated
             before today was audited on evidence alone. · FOUNDER +
             ADVISOR

2026-08-20 · ⚠️ #95 AMENDED — THE ITEM DEMONSTRATED ITSELF AND
             INVALIDATED ITS OWN REMEDY. Format-on-save rewrapped five
             unrelated blocks in investor.astro during the 1,020
             follow-on, and BOTH --stat AND -w --stat AGREED AT 18/14
             AND PASSED. ⛔ THE REASON IS STRUCTURAL: -w IGNORES
             WHITESPACE, BUT REWRAPPING MOVES WORDS ACROSS LINE
             BOUNDARIES, WHICH IS A CONTENT CHANGE. The prescribed
             tripwire is blind to the most common thing the formatter
             does. ✅ CORRECTED GATE: compare whitespace-normalised text
             between HEAD and the working copy, not -w. Verified this
             way that no words changed. · ADVISOR

2026-08-20 · ⚠️ #93 PARTIALLY CLOSED — RESPONSE-TIME PORTION DONE,
             CAPABILITY PORTION HELD. The sitewide sweep of #80's four
             defect classes found a small live population. FIVE OF NINE
             CANDIDATE COMPONENTS RENDER NOWHERE — PatientBookingFlow's
             three "within 4 hours" instances, one labelled Response
             Time, publish on no route. ✅ AND #80's OWN REMEDIATION
             HELD COMPLETELY: /contact returns zero 24/7 and zero
             response-time commitments in production. Four conformances
             applied under founder ruling option (c) — preserve the
             proposition, remove the clock. ⚠️ "We'll get back to you
             within 24 hours" is a materially weaker promise than the
             "under 2 minutes" class #80 removed, and was defensible on
             its face; the ruling is that NO RESPONSE-TIME COMMITMENT
             SURVIVES. · FOUNDER

2026-08-20 · ⛔ TWO OF THE #93 ANCHORS WERE NOT RESPONSE-TIME DEFECTS.
             ExitModal's success view read "We've sent your personalized
             market analysis to your email. You should receive it within
             24 hours." REMOVING THE CLOCK WOULD HAVE LEFT THE DELIVERY
             ASSERTION STANDING. D12 governs: the page may describe the
             user's action; it may not claim the downstream delivery
             occurred. ⚠️ THE STATIC MARKUP AND THE RUNTIME JS THAT
             OVERWRITES IT WERE CONFORMED IN THE SAME BATCH — conforming
             one alone leaves the other republishing the claim on every
             submission. · FOUNDER

2026-08-20 · ⛔ RECORDED, NOT INVESTIGATED — A SUCCESS MESSAGE FOR AN
             ENDPOINT THAT WAS NEVER BUILT. ExitModal:1187 fetches
             /api/market-analysis. No file matching market or analysis
             exists in src/pages/api/, and the live URL returns 404. The
             modal collected a provider's name, email and organisation,
             fetched a nonexistent endpoint, and displayed "Success!
             Check Your Email". ⚠️ THIS IS WORSE THAN D12's SHAPE, where
             the endpoint existed and deliberately sent nothing; this one
             was never built, and the submitted data reaches nothing.
             ⛔ MECHANISM DEPENDENCY FOR #96. No EDS behaviour modified
             in this workstream. · FOUNDER

2026-08-20 · THE 24/7 AND INSTANT-CONFIRMATION FAMILY REMAINS HELD.
             /faq:410 is recorded as a NEWLY MEASURED SECOND-ROUTE
             OCCURRENCE of the proposition already held at
             /patient-promise:621 — the identical sentence on a route no
             capability audit had reached. ⛔ BOTH REMAIN HELD TOGETHER
             for the Provider Onboarding/MarketScope verification;
             conforming one while holding the other would leave the
             register inconsistent. Also held: /patient-promise:163 and
             provider/portal-tour:245. · FOUNDER

2026-08-20 · ⛔ THE BRANCH-DELETE GATE MUST BE CONDITIONAL AND MUST
             FOLLOW A FETCH — #95 AMENDED. git log main..BRANCH printed
             a commit and git branch -d ran anyway, deleting an unmerged
             governance branch; the commit was recovered by cherry-pick
             and pushed direct to main. ⚠️ git branch -d DOES NOT CHECK
             AGAINST main — it checks reachability from any ref, so an
             existing origin/BRANCH makes it delete with a warning
             rather than refuse. ⛔ THIS WAS THE THIRD TIME IN ONE DAY A
             CHECK WAS SUPPLIED ADJACENT TO THE DESTRUCTIVE COMMAND
             RATHER THAN GATING IT. The corrected form chains fetch,
             check and delete so the check cannot be run past. It was
             used immediately afterward and correctly refused on a stale
             ref, then passed after fetching. · ADVISOR

 2026-08-20 · ✅ #91 CLOSED — BOTH STAT ROWS RECOMPOSED, /faq BANNER
             CONFIRMED CLEAN. The item's headline contradiction resolved
             without picking a number: 1,000+ on /careers and 50+ on
             /partner were the same proposition twentyfold apart, and
             BOTH WERE FALSE REGARDLESS OF WHICH WAS INTENDED — zero
             contracted providers. Neither was replaced with a figure.
             Six figures removed across two prerendered routes: 80% Cost
             Savings x2 (D4, the same basis on which it left /investor
             the same afternoon), the two partner-center counts, and the
             two 24hr results tiles. · FOUNDER

2026-08-20 · ⛔ THE 24hr RESULTS FAMILY IS A NEW GOVERNED CLASS — D7
             CLINICAL-DELIVERY TIMING. "24hr Result Turnaround" and
             "24hr Results Delivery" promised a radiologist's report
             within a day, from facilities that are not contracted, with
             no radiologist under contract. ⚠️ #93's SWEEP COULD NOT
             REACH IT: it is a results-delivery promise, not a
             response-time promise, and no pattern in that sweep matched
             it. #58 removed same-day under D7; this is the same class
             one step further into clinical territory. · FOUNDER

2026-08-20 · RECOMPOSED, NOT DELETED — the composition precedent set on
             /investor the same day. A tile built around a figure does
             not survive the figure's removal. Both rows now read
             Transparent Pricing / Contracted pricing, shown upfront ·
             Provider Network / Recruitment and contracting underway ·
             Digital Results / Delivered to you and your doctor,
             preserving each page's own tile order, colours, structure
             and AOS timing. ⛔ PORTAL DELIVERY WAS DELIBERATELY NOT USED
             in the third tile — it is a capability proposition and
             belongs to #96. No new capability dependency was introduced
             in order to close this item. · FOUNDER

2026-08-20 · THE /faq GUARANTEE FAMILY REQUIRES NO REMEDIATION. All six
             instances are the commercial refund policy retained on
             /patient-promise the same morning, and each links to
             /patient-promise as its authority. A commercial refund
             policy USRad controls unilaterally is #75's class, not
             #60's clinical-warranty class. · FOUNDER

 2026-08-20 · ✅ #98 SITEWIDE POSITIONING SWEEP RUN AND CLOSED — IT CAME
             BACK NEARLY EMPTY. Every surface describing USRad's overall
             business model, market opportunity, demand strategy or
             customer mix was checked against the governed hierarchy: /,
             /about, /partner, /provider, /faq, /connect, /employer.
             Consumer surfaces were excluded by the hierarchy's own
             exemption — /membership, /patient-promise, /how-it-works and
             the blog are meant to address self-pay patients directly.
             ONE ACTIONABLE LINE ACROSS THE WHOLE CANDIDATE SET.
             · FOUNDER

2026-08-20 · /partner:93 read "Tap into a $100B+ market with massive
             untapped potential" — the same unregistered TAM figure
             removed from /investor hours earlier, on a market-thesis
             line. Conformed to "Tap into growing demand from
             self-funded employers and self-pay patients", WHICH STATES
             THE HIERARCHY POSITIVELY RATHER THAN MERELY DROPPING THE
             FIGURE. /partner:36 kept: its provider / employer /
             investor / innovator ordering is a list of partner types on
             a partner-audience page, not a demand hierarchy. · FOUNDER

2026-08-20 · ⬜ /about ALREADY CONFORMED, AND HAD DONE SO BEFORE THE
             RULING EXISTED — ":466" reads "built for self-funded health
             plans" and ":621" "USRad is being built for self-funded
             health plans and people", employer-funded named first,
             patients second. Its remaining matches are AnciCare history
             in correct past tense. /, /provider, /faq, /connect and
             /employer returned nothing. ⚠️ THE HIERARCHY DEFECT WAS
             CONCENTRATED ON /investor, WHICH IS CLOSED. · FOUNDER

2026-08-20 · ⚠️ METHOD CAVEAT RECORDED RATHER THAN CHASED: THIS SWEEP
             SEARCHED CHANNEL VOCABULARY. A surface could imply the
             wrong hierarchy through emphasis or ordering without using
             any of those words — as /investor's Phase 2 did, describing
             employer-sponsored business as a 2027+ expansion. That
             instance was detectable BECAUSE it used them. The residual
             risk is recorded; #98 is a bounded parity check, not a
             general audit. · ADVISOR

2026-08-20 · ✅ 4F CLOSED — ALL FOUR PIECES RESOLVED, ONLY ONE BY
             REMEDIATION. TrustBar published "1,200+ Centers Recruited"
             on the provider recruitment surface. ⛔ #88 DIAGNOSED THIS
             AS AN ATTRIBUTION DEFECT WITH PROVENANCE IN THE ADJACENT
             TILE; THE DIAGNOSIS WAS WRONG IN TWO WAYS. The adjacent
             tile identifies the founders, not the subject of the
             figures, so no provenance existed anywhere. And "Recruited"
             is not an attribution problem — it is a FALSE PRESENT-TENSE
             USRad OPERATING CLAIM, since USRad has recruited zero
             centers. ⚠️ THE MISSING ATTRIBUTION IS WHAT ALLOWED THE
             MISREADING. #88's underlying ruling stands unchanged.
             · FOUNDER

2026-08-20 · ⬜ THE NETWORK-MAP QUESTION WAS RESOLVED AT SOURCE, NOT IN
             COPY. A frozen engineering report of 2026-04-10 recorded 6
             gold and 59 silver pins rendering with is_test = false
             returning ZERO rows — every facility in the system was test
             data, publishing as "Contracted USRad partner — market
             taken" and "PSA signed — credentialing in progress". THE
             TEST FACILITIES HAVE SINCE BEEN REMOVED FROM THE DATABASE.
             The live map plots only ACR-accredited centers as
             opportunity and the panel reports "0 USRad MRI Partners /
             UNCLAIMED MARKET" where there are zero. ⚠️ A COPY AUDIT
             COULD NOT HAVE ANSWERED THIS — the plotted data lives in
             Remix and Supabase, not in Astro. · FOUNDER

2026-08-20 · ⛔ #65 SCOPE MEASURED AND PARKED — IT IS NOT A LOOSE END
             BUT A SEPARATE CROSS-REPO REMEDIATION WORKSTREAM. Five
             families. (a) 90 million — substantially remediated across
             #30, #89, #90 and the Class E retirements, BUT REQUIRES A
             CLOSURE SWEEP BEFORE BEING DECLARED CLOSED. (b) Savings /
             percentage — OPEN, REQUIRES FOUNDER ADJUDICATION PER FAMILY
             BEFORE ANY FILE IS TOUCHED; formulations at or beyond the
             confidential bound are live, including 80% and 90% forms
             that go past the source document itself. (c) Board-certified
             — belongs to parked #46, NOT REOPENED. (d) usrad-portal
             surfaces — OPEN AND TAKES PRIORITY, because three of the
             four are email templates and A SENT EMAIL CANNOT BE
             CORRECTED RETROACTIVELY. (e) /blog/uninsured-imaging-guide
             — REQUIRES ITS OWN FULL-ROUTE REVIEW; the savings and
             pricing propositions form part of the article's structural
             argument and mechanical substitution is not available.
             · FOUNDER

2026-08-20 · HeroSection.astro:75 PUBLISHES "70% Less" ON / — the
             highest-traffic remaining site in family (b). ⛔ RECORDED
             AS A PRIORITY ENTRY POINT WITHIN #65, NOT AS PERMISSION TO
             PULL IT FROM THE FAMILY AHEAD OF ADJUDICATION. The same
             applies to the usrad-portal email templates: their urgency
             is a reason to sequence them first, not a reason to
             remediate individual instances before the per-family ruling
             this item requires. · FOUNDER
             
                                                               


2026-08-21 · THE DEMAND-HIERARCHY VOCABULARY IS "self-funded employers
             and self-pay patients". "direct-pay" appears nowhere in the
             register and was rejected as an unnecessary synonym. The
             ratified phrase is /partner:93's, conformed 2026-08-20,
             which states the hierarchy positively rather than merely
             dropping the figure — the same composition move the welcome
             letters make. Applied to signup.tsx:326 and all four
             WelcomeLetterModal variants. Open item #43, the cash-pay bar
             versus overrule, remains unresolved and did not block:
             self-pay is correct under both readings. · FOUNDER

2026-08-21 · "nationwide" RETAINED AT WelcomeLetterModal:85 ONLY. "USRad
             is building a new nationwide referral channel" is explicitly
             forward-looking, describing intended scope rather than
             present network scale. It is the company-level variant and
             the only one that originally carried the word. The standing
             rule was applied, not excepted. · FOUNDER

2026-08-21 · TRUTHFUL DOES NOT MEAN TIMID — COMPOSITION STANDARD FOR
             PROVIDER SURFACES. Every substantive change asks: what was
             the original trying to make a provider believe; which part
             is unsupported; what evidence-backed proposition carries the
             same persuasive function; does the replacement still give a
             compelling reason to join. Recomposition is preferred over
             deletion. Replacements that are technically accurate but
             materially weaker are flagged for composition review rather
             than implemented silently. Two #96 replacements are STRONGER
             than their originals — "1,200+ imaging centers contracted by
             AnciCare by 2002" is better provider-facing proof than any
             dollar figure. One is MATERIALLY WEAKER WITH NO REMEDY:
             auth.verified.tsx:66 originally promised joining something
             already operating, and at zero contracted partners no
             evidence supports that at any strength. Recorded rather than
             concealed. · FOUNDER

2026-08-21 · A STATE MACHINE DESCRIBES WHAT THE CODE PERMITS, NOT WHAT
             THE PRODUCT DOES. Claude twice inferred product behaviour
             from engineering artifacts and was twice wrong: the x-route
             prefix read as retirement when it was a rename, and backward
             onboarding navigation read as permitted from a resolver
             guard when the product ends onboarding at PSA by design.
             Engineering findings are correct as code analysis and
             unreliable as product description. Founder ruling governs
             product behaviour; code analysis is evidence about code.
             · FOUNDER + CC

2026-08-22 · #101 COMPOSED AS COMPLETE BRANCH SCREENS, NOT AS EIGHT
             STRING REPLACEMENTS. Each acquisition branch was treated as
             one screen with a headline, subline, subhead, reinforcement
             block and CTA that must read as a single argument. Two
             smartmatch sublines were populated from empty rather than
             left blank, because the branch had no room to explain what
             SmartMatch is. Preserved propositions: demand opportunity
             without claiming patients are searching through USRad, and
             early participation without claiming present delivery.
             · FOUNDER

2026-08-22 · SCREEN-LEVEL COMPOSITION REVIEW IS AN INSTRUMENT. The
             eighth #101 string was invisible to every string method
             used on this workstream — branch-matrix read, variable
             grep, render-site grep — and was found by viewing the
             composed preview. Its defect was contradiction with the
             headline above it, not the string in isolation. This is
             THE POSITIONING TEST at screen scale: a claims audit
             cannot detect a composition error. Visual review of every
             composed surface is required before merge, not optional.
             · FOUNDER             

2026-08-22 · SELECTIVE CONTRACTING IS BUSINESS POLICY WITHOUT A NUMERICAL
             CAP. USRad is not being built to contract every imaging
             center in a market. Network density is determined market by
             market based on local conditions and demand. Do not publish
             or encode a fixed fraction, center count, slot count,
             territory reservation or capacity formula. This permits the
             truthful concentration proposition: USRad aggregates demand
             from self-funded employers first and self-pay patients
             second and concentrates it within a selectively contracted
             network. · FOUNDER

2026-08-22 · MARKETSCOPE PRESENTS SCANS, NOT DOLLARS, AND NO ACTIVATION
             TIMEFRAME. No monthly or annual revenue, percentage growth,
             enhanced revenue per procedure or other dollar opportunity
             may be derived in onboarding. The provider's own contracted
             rates may be shown. After PSA execution USRad begins
             verification and works to activate qualified providers as
             quickly as the verification process permits; no weeks or
             days figure is established as policy. The PSA's
             10-business-day payment provision is separate and
             unaffected. · FOUNDER

2026-08-22 · THE SMARTMATCH ALGORITHM IS PROPRIETARY. Public copy may
             name the factors the engine is designed to consider —
             modality, location, provider verification and contracted
             price — but may not state weights, percentages, scoring
             formulas, thresholds, factor hierarchy, the eligibility
             gate sequence, or anything else permitting the ranking
             system to be reverse-engineered. Internal reading of the
             implementation is permitted solely to establish whether
             provider-facing copy is truthful. · FOUNDER

2026-08-23 · A HOST FRAME THAT CONTRADICTS A RECOMPOSED COMPONENT IS
             PART OF THAT COMPOSITION. #104 recomposed MarketScope to
             remove revenue projections while the facilities page around
             it still displayed an estimated annual revenue tile, a
             10-15 referrals per week basis, and revenue projections in
             its analytics card. A provider closing the modal landed
             immediately on the claims it had just stopped making. The
             test for admitting a neighbouring proposition is whether
             leaving it creates a direct contradiction with the approved
             composition — not mere proximity. Corrections that would
             require adjudicating a broader model are parked as
             prerequisites rather than patched piecemeal. · FOUNDER

2026-08-24 · PROVIDER-FACING PRICING REFERENCES FOLLOW A THREE-STATE
             PROVENANCE RULE. Verified source available: publish the
             numeric reference. Derived, fallback or generic calculation
             only: do not publish it as a market or jurisdictional
             reference. No verified data: display Currently unavailable
             with a short note. This applies to local cash-pay ranges and
             Workers' Compensation references alike. Preserve the visual
             slot in every state so verified data can populate it later;
             do not redesign a surface around the current absence of
             data, and do not derive or synthesize a substitute. · FOUNDER

2026-08-24 · REMOVING A CLAIM MEANS REMOVING THE COMPUTATION THAT
             PRODUCES IT, NOT ONLY THE ELEMENT THAT RENDERS IT. A
             calculation that still executes on every render while its
             output is hidden has not been remediated. Established when
             a portfolio revenue aggregate was found still looping every
             facility through the rejected revenue function after its
             tile had been deleted. Where a helper is shared across
             consumers, the call site goes and the helper parks as dead
             code; where the computation exists solely to feed the
             removed output, the computation goes with it. · FOUNDER

2026-08-24 · A MISSING INPUT MUST NEVER BECOME A NUMERIC OUTPUT.
             JavaScript coerces a null rate into zero, so an unavailable
             Medicare baseline rendered as a real $0 provider rate. Any
             figure derived from a nullable source is computed only when
             the source is present, and renders as unavailable otherwise.
             The corollary is that fail-closed rendering is not evidence
             of broken plumbing: #105 did not break the Medicare pricing
             path, it made the absence of staging data visible, and the
             original calculation worked correctly once verified data
             existed. · FOUNDER

2026-08-27 · THE INVESTOR OVERVIEW PDF IS REMOVED FROM PUBLIC SERVICE.
             public/docs/usrad-investor-overview.pdf was KEPT AND
             DE-LINKED at #92 on 2026-08-20 and remained reachable at
             its URL, because public/ is served directly by the Vercel
             filesystem handler. It is now removed from the public
             filesystem. NOT REWRITTEN, NOT REPLACED, NOT RELINKED, AND
             NO NEW DECK IS CREATED IN THIS SPRINT. Repository history
             is preserved normally; the artifact remains retrievable at
             f0d1058. Removal verified: the file is absent from public/,
             absent from dist/ and .vercel/output/, and no reference to
             it survives anywhere in src/ or public/. The only surviving
             mentions are the governance records at TRACKER.md #92 and
             #110, which are the historical record and stay. PER THE #92
             ENUMERATION the artifact published $100B+ x3, 90M/90M+ x3,
             1,200+ AnciCare centers, 15,000+, 25x price variation,
             30-80% (BEYOND THE CONFIDENTIAL D4 BOUND), $300 vs $5,000,
             and the D3-barred header "the first national diagnostic
             imaging network". IT WAS MARKED "Series A - CONFIDENTIAL"
             AND SERVED AT A PUBLIC URL. Those contents are carried
             forward from #92 and were NOT re-read in this pass; the
             disposition is removal, so no contents review was required.
             Closes Gate 1. public/downloads/USRad_Provider_Opportunity_Brief.pdf
             IS NOT TOUCHED and remains held for #96. · CLAUDE CODE

2026-08-27 · /investor IS NO LONGER A PUBLIC OFFERING SURFACE. The
             page REMAINS PUBLICLY ACCESSIBLE as an investor-
             information and investment-thesis page. It will no
             longer publicly announce or solicit an open securities
             offering. Investment discussions occur privately,
             through relationships and direct conversation. ⛔ THE
             ROUTE IS NOT RETIRED. This supersedes the public
             offering posture held at #90. ⚠️ REPLACEMENT
             POSITIONING AND CTA COPY IS NOT AUTHORED BY THIS
             DECISION — the affected surfaces are enumerated for the
             Advisor positioning pass and are NOT to be invented
             during Gates 1-2. · FOUNDER

2026-08-27 · THE /investor EYEBROW MOVED OUTSIDE THE REGISTER AND
             THE HISTORY IS RECORDED RATHER THAN ERASED. (1) #90
             HELD "Series A - Now Open" on 2026-08-20, not edited,
             noted as securities-offering status, founder/legal.
             (2) It was subsequently changed to "Strategic
             Investment - Now Open" at fc0348a on 2026-08-26 WITH NO
             REGISTER ENTRY. ⚠️ THE COMMIT MESSAGE DESCRIBES THE
             CHANGE ACCURATELY — "revised the eyebrow on the page to
             Strategic Investment - Now Open" — SO IT WAS RECORDED AS
             A CODE CHANGE AND NEVER AS A DECISION. That is the drift
             class, and it occurred ONE DAY BEFORE the sprint that
             supersedes it. (3) That change is recorded here as fact,
             not ratified retroactively. (4) The 2026-08-27 offering-
             posture decision SUPERSEDES BOTH FORMS. ⚠️ A HELD ITEM
             THAT MOVES OUTSIDE THE REGISTER IS THE DRIFT CLASS
             THESE FILES EXIST TO CATCH, and it is recorded as such.
             · FOUNDER

2026-08-27 · USRad PLATFORM DEVELOPMENT STATE — RECORDED FOR THE
             SUBSEQUENT POSITIONING PASS. NOT FOR PUBLICATION IN
             GATES 1-2. ⚠️ EVIDENCE CLASS: FA. FOUNDER-ATTESTED,
             NOT REPOSITORY-VERIFIED. THE VERIFICATION GATE IS OPEN.
             (1) BUILT / DEVELOPED, per founder attestation: member
             and patient booking · member portal · provider
             onboarding · provider portal · administration and staff
             portal · associated core pricing and operational
             infrastructure, subject to existing implementation-
             status distinctions. ⛔ THESE REMAIN UNDER ONGOING
             DEVELOPMENT AND REFINEMENT. "BUILT/DEVELOPED" DOES NOT
             MEAN commercially mature, complete, fully deployed, or
             processing live transaction volume, AND MAY NOT BE
             BROADENED INTO A CLAIM THAT THE PLATFORM IS COMPLETE.
             (2) UNDERWAY: provider recruitment and contracting ·
             employer commercialization and development · continued
             platform refinement. ⛔ NO IMPLICATION OF COMPLETED
             NETWORK SCALE, SIGNED EMPLOYER SCALE, TRANSACTION
             VOLUME OR COMMERCIAL TRACTION. ZERO CONTRACTED
             PROVIDERS. (3) PLANNED / NOT YET BUILT: the EMPLOYER
             PORTAL, intended to give self-funded employer clients
             tools to manage and understand the impact of working
             with USRad. ⛔ NO EMPLOYER-PORTAL FEATURES,
             DASHBOARDS, ANALYTICS, SAVINGS OR UTILIZATION
             REPORTING, METRICS, INTEGRATIONS, TIMELINES OR
             SPECIFICATIONS MAY BE INVENTED OR IMPLIED. ⚠️ THE
             BOUNDARY IS THE POINT: member-facing, provider-facing
             and internal administration infrastructure is
             developed; the dedicated employer-facing layer is
             future work. ⛔ BEFORE ANY OF THIS PUBLISHES, EACH
             SYSTEM'S IMPLEMENTATION STATUS AND EXACT TERMINOLOGY
             MUST BE VERIFIED AGAINST REPOSITORY EVIDENCE AND THE
             CLASS RE-ADJUDICATED. ⛔ FA MAY NOT SIT INSIDE A RUN OF
             CP/CT FIGURES. · FOUNDER

2026-08-27 · PLATFORM-STATE FA ENTRY ADJUDICATED ON CROSS-REPOSITORY
             EVIDENCE. The verification gate opened by the 2026-08-27
             platform-state entry is CLOSED IN PART. Evidence:
             usrad-platform b319007 and usrad-portal f302e5c, source,
             schema and deployment. usrad-portal-nextjs is a year
             stale and NON-AUTHORITATIVE; no evidence drawn from it.
             ✅ UPGRADED FROM FA TO REPOSITORY-VERIFIED — five
             capabilities, each on direct source, schema and live
             deployment: member imaging search/selection/booking
             workflow including payment collection and voucher
             issuance · member portal · provider onboarding
             infrastructure including agreement generation and
             e-signature execution · provider portal · internal
             administration and operations portal. Corroboration is
             not line count: these run against real tables under
             active migrations, carry almost no mock-data markers,
             and are deployed and serving.
             ✅ UPGRADED — "ZERO CONTRACTED PROVIDERS." Previously
             attested and recorded across eight prior DECISIONS.md
             entries; now corroborated by direct production
             measurement recorded in portal commit f302e5c.
             ✅ UPGRADED — "PLANNED / NOT YET BUILT: EMPLOYER
             PORTAL." NEGATIVE VERIFICATION PASSED ACROSS BOTH
             REPOSITORIES with no false positive. Zero employer
             routes, zero employer tables queried from app code,
             zero employer auth, dashboard, session or role
             surfaces. The only employer artifacts are marketing
             templates and two lead tables whose own migrations
             record zero application references. The Astro side
             carries marketing pages and lead-capture endpoints
             only, with the ROI report explicitly parked. ⚠️ THE
             NEGATIVE IS STRONG BECAUSE THE CLAIM IS ABOUT SOFTWARE
             THAT WOULD HAVE TO EXIST IN THESE REPOSITORIES. It does
             not generalise to claims that are not observable in a
             repository.
             ⚠️ NARROWED — "associated core pricing and operational
             infrastructure" READS BROADER THAN THE EVIDENCE
             SUPPORTS AND IS RETIRED IN THAT FORM. It resolves into
             two narrower verified facts: (a) REFERENCE-PRICING
             infrastructure, including Medicare rate resolution by
             geography and procedure, VERIFIED AND SUBSTANTIALLY
             POPULATED; ⛔ CONTRACTED-RATE AND CASH-MARKET TIERS ARE
             STRUCTURALLY PRESENT AND UNPOPULATED — contracted rates
             have no population at all and the cash-market table is
             empty in production as well as staging. (b) A
             PROVIDER-RANKING AND SCHEDULING LAYER, VERIFIED AS
             IMPLEMENTED. ⛔ IT HAS NEVER RANKED A PRODUCTION RESULT
             SET — it ranks contracted providers only, of which
             there are zero, and two of its signals are inactive by
             design pending volume. ⛔ "PRICING INFRASTRUCTURE"
             UNQUALIFIED MAY NOT PUBLISH. The ceiling is REFERENCE
             pricing.
             ⛔ NARROWED AND PARTLY RETAINED AS FA — PAYMENT
             SEQUENCING IS ASYMMETRIC AND THE ASYMMETRY IS
             GOVERNED. INBOUND COLLECTION IS VERIFIED IMPLEMENTED.
             ⛔ OUTBOUND PROVIDER DISBURSEMENT IS NOT IMPLEMENTED
             ANYWHERE IN EITHER REPOSITORY — no payout table, no
             transfer integration, no outbound execution path. What
             exists is an audit event, interface strings, and the
             PSA's contractual Net 10 business days term. ✅
             /investor's conformed line — "USRad is structured to
             collect payment upfront and to pay providers within 10
             business days of Fulfillment Complete" — IS CORRECT
             PRECISELY BECAUSE IT IS DESIGN LANGUAGE, and the §2
             approved 10-business-day term is contractual, not
             operational. ⛔ IT MAY NOT BE UPGRADED TO IMPLEMENTED,
             AND NO ACCOMPLISHMENT CLAIM MAY PRESENT PAYMENT
             INFRASTRUCTURE AS BUILT WITHOUT NAMING THE INBOUND
             SCOPE.
             ⛔ RETAINED AS FA — "UNDERWAY: PROVIDER RECRUITMENT AND
             CONTRACTING; EMPLOYER COMMERCIALIZATION." COMMERCIAL
             ACTIVITY IS NOT OBSERVABLE IN A REPOSITORY. The ABSENCE
             of contracted providers is repository-verified; the
             PRESENCE of recruitment is not, and no amount of
             repository work will make it so. Employer activity
             shows lead capture only, with no signed-employer
             evidence in either repository. ⛔ NO COUNT, NO NAMED
             EMPLOYER, NO VOLUME, NO NETWORK-SCALE IMPLICATION.
             ⚠️ VERIFICATION LIMITATION — BINDING ON EVERY UPGRADE
             ABOVE. SOURCE, SCHEMA AND HTTP REACHABILITY WERE
             VERIFIED. PRODUCTION DATA WAS NOT QUERIED. A 200
             RESPONSE PROVES DEPLOYMENT, NOT FUNCTION. Row counts
             and live transaction state rest on governance and on
             the portal's own recorded measurements. ⛔ "DEVELOPED"
             IS THE VERIFIED CLASS. IT DOES NOT MEAN COMMERCIALLY
             MATURE, COMPLETE, FULLY DEPLOYED, OR PROCESSING LIVE
             TRANSACTION VOLUME, AND MAY NOT BE BROADENED INTO A
             CLAIM THAT THE PLATFORM IS COMPLETE. THE 2026-08-27
             ENTRY'S BAR SURVIVES ITS OWN ADJUDICATION.
             ⚠️ ONE QUALIFIED SURFACE INSIDE A VERIFIED CAPABILITY —
             the provider portal's REPORTING MODULE IS
             DEMONSTRATION-ONLY, returns fixed data unconditionally,
             carries its own demonstration banner, and is marked
             forthcoming in internal documentation. ⛔ THE PORTAL
             PUBLISHES AS DEVELOPED; ITS REPORTING MODULE DOES NOT.
             ✅ NO REPOSITORY / GOVERNANCE CONFLICT FOUND. The
             repository corroborates the founder-attested state on
             every item, including the negative. · FOUNDER + ADVISOR

2026-08-27 · PLATFORM PROPRIETARY-DISCLOSURE BOUNDARY — STANDING
             BAR, NOT AN ADJUDICATION. ⚠️ EACH ITEM BELOW WOULD HELP
             SUBSTANTIATE THAT THE INFRASTRUCTURE IS REAL, WHICH IS
             EXACTLY WHY IT NEEDS A BAR. ⛔ NOT FOR PUBLICATION IN
             ANY PUBLIC ARTIFACT: (1) the ranking model's signal
             set, weights, redistribution behavior and activation
             thresholds — this is the routing logic itself. (2)
             Activation thresholds as numbers, which disclose the
             mechanism AND current volume in one figure. (3)
             Rate-resolution mechanics — locality and RVU derivation
             chain, facility-rate precedence rules, and any
             contracted rate value. ⚠️ CONSISTENT WITH PRICING
             POLICY V1.0 §4, WHICH ALREADY BARS MODALITY FEE
             AMOUNTS WHILE PERMITTING THE ARCHITECTURE. (4) The
             internal staff surface in detail — role names,
             permission tiers, and any named sub-surface. THE
             CEILING IS "AN INTERNAL ADMINISTRATION AND OPERATIONS
             PORTAL HAS BEEN DEVELOPED." (5) Table names, schema
             shape, migration counts, route inventories and line
             counts. ⛔ THESE ARE THE EVIDENCE, NOT THE PROOF
             POINTS — a public artifact citing them converts an
             internal verification record into a competitive
             disclosure. (6) Payment-processor identity and
             webhook/cron architecture. (7) Internal status
             documentation. ⚠️ THE GOVERNING PRINCIPLE IS THE ONE
             THE ADVISOR STATED AT THE OUTSET: TELL INVESTORS WHAT
             THE MACHINE CAN DO, NOT HOW IT IS BUILT.
             · FOUNDER + ADVISOR
```



---

## Open decisions awaiting founder

| # | Decision | Blocks |
|---|---|---|
| 6 | 96% patient show rate: source or remove | 4H-c. ✅ **CLOSED ON `/provider` 2026-08-13** — verified absent from `GuaranteeSection` and from the whole provider surface. ⛔ **OPEN SITEWIDE — FIVE INSTANCES:** `built-usrad.astro:339` and `built-usrad2.html:327` (both stating "96% show rate" in words), `usrad-end-card.html:251`, `usrad-end-card2.html:324`, `patient-advocate/index.astro:82`. A sixth in `SkeletonAnalyticsSystem.jsx` is mock dashboard data and carries a different disposition. The `.html` files under `src/pages/` are served as **static routes and are publicly reachable**; the duplicate `2` variants may be orphaned and should be checked for inbound links before choosing between correction and archive — ⚠️ **SCOPE REDUCED 2026-08-19: THREE OF THE FIVE INSTANCES ARE NOW OFF THE PUBLIC SURFACE.** `built-usrad2.html`, `usrad-end-card.html` and `usrad-end-card2.html` were retired to `docs/retired-surfaces/` with the 18-artifact HTML batch and return 404. **TWO REMAIN: `built-usrad.astro:339`** (live, server-rendered) **and `patient-advocate/index.astro:82`** (Class B, EDS-owned, deferred under the functional boundary). The orphan question this row raised is answered — none of the `.html` files had any inbound link from `src/` |
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
| 30 | "90 million Americans" — derived headcount class | ⛔ **NOT 2 locations.** See `TRACKER.md` #30 for the measured scope. ✅ **THE SITEWIDE FOOTER INSTANCE IS CLOSED 2026-08-13** — `CarbonFooter:167` was **ungated**, outside the `{!hideNewsletter && …}` block, and therefore shipped on **every route**; removed without substituting a replacement market-size statistic. A **fifteenth instance** outside the scope list was also cleared: `AnciCareStory`'s "90M Americans" card. Remaining instances open. Derivation and prospective bar recorded 2026-08-13. ⛔ **GOVERNANCE CORRECTION 2026-08-14 — THAT CLOSURE WAS FOOTER-SCOPED, NOT PLATFORM-WIDE.** It was accurate for `CarbonFooter.astro` and was never a closure of the class. With P5 the **footer instance is now closed on BOTH codebases** — Astro at `673fb2a` and Remix `PBSFooter.tsx` at `f639080`, both verified live. **Every other instance remains OPEN and must not be marked resolved on the strength of the footer work.** See **#65** |
| 31 | Patient counts outside the 150,000 family — `cost-saving-tips:1100`, `real-cost-of-mri:907` | blog routes |
| 33 | Does Remix read `procedure`? Verify `PatientHeader` param mapping against the adjacent repo | one line if yes |
| 34 | Provider-surface disclosure of internal modality fee amounts — conformance sweep under settled §4 | settled decision, open implementation |
| 35 | ~~MarketScopeShowcase~~ **`recommendationEngine.ts`** discovery price and savings display — removal under settled §5 | settled decision, open implementation. ⚠️ **SURFACE RELABELLED 2026-08-13** — no `discovery` or `savings` string exists in `MarketScopeShowcase.astro`; §3's technical basis places the hardcoded-100% behaviour in `recommendationEngine.ts`. **REMIX/EDS, not Astro.** Ruling unchanged |
| 36 | Sitewide 260-dollar family, 35 instances — deferred to the page-by-page sequence | not this batch |
| 37 | Employer-surface pricing figures (350, 260 to 475, 420) — resolved in the Stage 3 `/employer` pass | Stage 3 |
| 38 | EDS employer-funnel handoff — **Finding 1 CLOSED on the primary path 2026-08-10** (Remix client email fixed and verified, portal PR #49, production `f180b3a`). **Still open:** the Astro fallback template, the `roiData` payload contract, the D13 atomic closure. Dependency, not Workstream A work | blocks rule 25 |
| ~~39~~ | ~~`APPROVED-FIGURES` §6 dates the CorVel sale to 2013~~ | ✅ **RESOLVED 2026-08-13.** Corrected to 2002 at §6(c) and §502. The closing letter governs |
| 40 | Rule 18 does not reach date forms — "founded in 1994" ruled correct for prose | rule 18 amendment |
| 41 | Audit existing line-number citations for staleness. The cite-by-section convention is already settled | audit only |
| 65 | ⛔ **SITEWIDE RETIRED-CLAIM SWEEP — OPENED 2026-08-14, DISTINCT FROM P5 AND NOT CLOSED BY IT.** P5 closed the footer instance on two codebases. The same families still publish from **17 source files here across 22 sites**, plus **four `usrad-portal` surfaces of which THREE ARE EMAIL TEMPLATES** — and an email cannot be corrected after send. Full scope in `TRACKER.md` **#65** | **exists so footer closure cannot be read as platform-wide claim closure** |

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
| ~~3~~ | ~~AnciCare figures: scope's 150,000+ / $150M, or tracker's 168,000+ / $160M~~ | **Addendum B §1.9.** 150,000+ patients, over $150 million, AnciCare 1994–2002 · FOUNDER — ⚠️ **SUPERSEDED 2026-08-12 (DOC-22).** The 150,000+ claimant family is RETIRED by D1 (DOC-15). "Over $150 million" is REPLACED by the $60M+ paid-to-imaging-centers figure under closed item #25 (`99ba3d5`). This row records what was ratified 2026-08-06; it is NOT a current approval and neither figure may publish. See `APPROVED-FIGURES.md` |
| ~~4~~ | ~~ExitValueSection: correct in place, or remove the section~~ | **REMOVED.** Valuation projections barred on the provider surface · FOUNDER + ADVISOR |
| ~~5~~ | ~~Phone number: (866) per scope, or (888) as currently published~~ | **(866) USRad24** per Addendum B §2.8 and SCOPE §3.6 · FOUNDER |
| ~~7~~ | ~~Provider page resequencing (4I) — not corrective; in or out of Workstream A~~ | **WITHDRAWN.** Components are on the Repositioning v2 leave-as-written list · CLAUDE |
| ~~10~~ | ~~/about three-value spread — 168,244 / 168,224 / 168,000~~ | **ALWAYS AN ESTIMATE.** Six-figure variants are false precision; 150,000+ stands · FOUNDER — ⚠️ **SUPERSEDED 2026-08-12 (DOC-22).** "150,000+ stands" IS NO LONGER TRUE — D1 retires the whole 150,000/168,000 family. The ruling that six-figure variants are false precision survives; the figure that survived it does not. NOT a current approval |
| ~~9~~ | ~~$400 Million+ savings claim (orphaned) — remove or retain?~~ | **ARCHIVED with the component.** $400 Million+ has no basis and appears nowhere else · FOUNDER |
| ~~11~~ | ~~$246M patient savings vs $150M provider volume — same claim or two?~~ | **TWO DISTINCT CLAIMS.** Provider volume conforms to over $150M; $246M client savings stands · FOUNDER — ⚠️ **the $246M half is SUPERSEDED 2026-08-07: reversed and barred pending a primary source.** The two-distinct-claims finding stands; the approval it carried does not |
| ~~12~~ | ~~`FoundersSection.astro` — delete component or edit the two claims?~~ | **ARCHIVE, do not edit.** `git mv` to `archived-api/` · FOUNDER |
| ~~13~~ | ~~"Patient savings" → carrier framing — `SocialProofBar:27`, `AboutSection:15`~~ | **SUPERSEDED 2026-08-07 by the $246M reversal.** The beneficiary question attaches to a figure now barred; removal replaces reframing. `about.astro:49` likewise · CC |
| ~~14~~ | ~~"Verified savings" — `about.astro:717`~~ | **SUPERSEDED 2026-08-07 by the $246M reversal.** The wording attaches to a figure now barred; removal replaces reframing · CC |
| ~~19~~ | ~~ROI PDF phone (888) vs resolved (866)~~ | **RESOLVED.** `generateROIReport.ts:1431` reads (866) USRad24, corrected in `e1a6119` and confirmed in a generated PDF · CC — ⚠️ **QUALIFIED 2026-08-07:** that PDF cannot have come through `/api/employer-roi-report`, gated since `39d8c7a` (Aug 5). It was produced by invoking `generateROIReport()` directly. The fix is correct; the surface it verified is not user-reachable |
| ~~25~~ | ~~Replace "over $150 million" with "$60M+ paid to imaging centers"~~ | **CLOSED — 4H-c3 (`99ba3d5`), 14 instances / 11 files.** One more than the register predicted. Verified by re-sweep, build exit 0, mirror hash match, screenshots at 1440/390 · FOUNDER |
| ~~32~~ | ~~`generateROIReport.ts` — external caller or orphaned?~~ | **CLOSED — UNREACHABLE, deliberately.** `39d8c7a` (Aug 5) removed the import, call, buffer and streaming response. No external hook: `vercel.json` empty, no workflows, no Docker, no scripts, no env vars, all Remix traffic outbound. Parked pending the flat-fee pricing rebuild; standing rule 9 applies on reactivation · CC |
