# Final Ratified Remediation Specification
## "The Scan That Never Happens" — the-scan-that-never-happens.astro

**Status:** Fully ratified — all nine items. Not yet applied to the live file.
**Next step after this:** CC produces the file diff → verify corrected article → then, and only then, adapt into the LinkedIn newsletter.

---

## A. Validation of the three refinements

### 1. AnciCare history simplification — no objection, one note for awareness

"Committing referral volume to participating imaging centers, helping them fill unused capacity" is consistent with the sourced material — it's actually a softer, more conservative claim than the register's own "volume commitments" language already live on usrad.com/about, and no register entry treats the mechanism as a numeric per-center guarantee, so nothing here overstates the evidence.

One thing worth flagging precisely because you raised the current-vs-historical concern: APPROVED-FIGURES.md §2 (Payment Terms, current USRad model) states **"Volume commitment: None."** That's USRad's own admitted current policy. It's the exact reason your instruction matters — and your ratified paragraph correctly keeps the volume-commitment sentence scoped entirely to AnciCare, never touching USRad's current terms. No change needed; flagging so CC understands *why* this boundary is being held, not just that it is.

Your full paragraph checks out fact-by-fact against §4a: "workers' compensation industry" ✓ (Line of business, ADMITTED), "savings of 50% or more" ✓ (Savings vs. WC fee schedule, cleared for public use at the 50%+ floor), "1,228 contracted imaging facilities across 43 states" by April 2002 ✓ (Contracted facilities, CP class), acquired "the following month" ✓ (closing letter dated May 16, 2002). Approved as written, verbatim.

### 2. KFF tightening — no objection, verified against source

Checked all three figures directly against KFF's 2025 Employer Health Benefits Survey:
- 67% of covered workers enrolled in self-funded plans, 80% at larger firms — **confirmed**
- Average single-coverage deductible $1,886 — **confirmed**
- 33% enrolled in an HDHP with a savings option — **confirmed**

Dropping the "mainstream" inference was the right call — self-funded status (who bears the employer's risk) and deductible exposure (what the employee pays out of pocket) are related but distinct populations, and my earlier draft blurred them. Approved as written. Recommend a source line under the paragraph or in a footnote — e.g., "Source: KFF, 2025 Employer Health Benefits Survey" — since this is a third-party statistic carrying the argument, not a register-internal figure, and the same citation discipline the register applies to AnciCare facts should apply here too.

### 3. Prior-authorization softening — no objection

Dropping any explicit claim about prior authorization or referral requirements — rather than asserting either way — is the safer posture and fully resolves the clinical-order-bypass concern without needing new sourcing.

One dependency to note: "benefit-verification friction" and "no separate balance bill arriving weeks later" are claims about USRad's current booking/payment flow. APPROVED-FIGURES.md doesn't speak to this (it governs AnciCare history and provider economics, not patient-facing product mechanics), so it's not a register violation — but it is an operational promise about how the platform works today, and should get a quick sanity check against the actual booking flow before it ships, separate from this claim-integrity process.

---

## B. Final ratified replacement language

### Items 1 + 2 (consolidated — your rewrite merges both into one paragraph)

**Replaces both the original AnciCare-founding paragraph and the AnciCare-growth paragraph:**

> In 1994, my wife Donna and I founded AnciCare, a specialty preferred provider organization focused on medical imaging for the workers' compensation industry. We connected employers with independent imaging centers that had available capacity. AnciCare negotiated lower rates by committing referral volume to participating imaging centers, helping them fill unused capacity. The resulting rates produced savings of 50% or more against the Florida workers' compensation fee schedule. By April 2002, AnciCare had grown to 1,228 contracted imaging facilities across 43 states. The company was acquired by CorVel the following month.

### Item 3

> USRad is the same thesis, aimed at a different population. Workers'-comp patients numbered in the millions. Today, 67% of covered workers are enrolled in self-funded health plans, including 80% at larger employers. At the same time, the average single deductible among workers with a deductible is $1,886, and 33% of covered workers are enrolled in a high-deductible plan with a savings option. The problem is bigger. The playbook is the same.
>
> *(Source: KFF, 2025 Employer Health Benefits Survey)*

### Item 4 — ratified (reframed to USRad's current standard)

> The playbook worked because it addressed access as an operational problem rather than a clinical one. Quality still matters — every USRad-contracted center is accredited by ACR, AIUM, IAC, The Joint Commission, or RadSite, and every study is read by a board-certified radiologist — but the thing that actually moved outcomes was removing the friction that kept patients from getting imaged in the first place.

### Item 5

> The U.S. imaging market is made up of thousands of independent centers, operating under separate ownership groups with their own scheduling systems, intake processes, and payment portals.

### Item 6 — insert as a lead-in before the three patient scenarios

> *The following are illustrative composites, not individual patient records — but the pattern they describe is common:*

### Item 7

> ...can differ by an order of magnitude — and in practice, most patients never see any of them clearly enough, before booking, to actually compare.

### Item 8

> But the largest gains available in the next decade will not come from making a well-served patient's scan modestly more accurate.

### Item 9

> Direct patient booking. A simpler scheduling process without the usual insurance-card and benefit-verification friction. Intake handled by the platform rather than by multiple front desks. Payment happens once, at a known price, without a separate balance bill arriving weeks later.

---

## C. Remaining items requiring further ratification

- **Item 5, additional note:** the register does admit "27,000+ ACR-accredited imaging facilities" (2026-08-18) — but it's explicitly barred from being published "adjacent to 'our network,' 'nationwide,' or contracted-provider language in a way that implies USRad reach." It is **not** a valid substitute for the dropped 15,000 figure in this context. Dropping the number, as ratified, remains the correct call.
- **Item 9 dependency:** the specific claims about insurance-card-free booking, benefit-verification friction, and single-payment/no-balance-billing should be checked against the actual current booking/payment flow before publishing — this is a product-accuracy check, not a claim-integrity issue, but it's outstanding.

**Item 4 is now fully ratified** — reframed from an unsourced AnciCare historical claim to a verified current-USRad claim, confirmed directly against usrad.com/provider (accreditation body list; "a board-certified radiologist reads the study" at Step 5 of the assignment flow). No open dependency remains on this item.

All nine items are now fully ratified with no open claim-integrity dependency. Two product-accuracy checks (noted above, items 5 and 9) remain outstanding but are outside the scope of claim-integrity review.

---

## D. Implementation instruction block for CC

**File:** `the-scan-that-never-happens.astro`
**Action:** Replace the following passages verbatim. Locate each by its quoted original text (line numbers may have shifted since last read; text match is authoritative).

1. **Section "We've solved a version of this before"** — replace the two paragraphs beginning "In 1994, my wife Donna and I founded AnciCare, one of the first nationwide cash-pay imaging networks..." and ending "...before the company was acquired by a public payor." with the single consolidated paragraph in **Section B, Items 1+2** above.

2. **Same section, final paragraph** — replace the paragraph beginning "USRad is the same thesis at a larger scale, aimed at a larger population..." and ending "...The playbook is the same." with **Section B, Item 3**.

3. **Same section, middle paragraph** — replace the paragraph beginning "The playbook worked because it addressed access as an operational problem..." with **Section B, Item 4**.

4. **Section "Why the access gap persists," "The network is fragmented"** — replace the paragraph beginning "There are roughly 15,000 accredited imaging centers..." with **Section B, Item 5**.

5. **Section "What access failure actually looks like"** — insert **Section B, Item 6** as a new lead-in sentence immediately before the paragraph beginning "An uninsured roofer in Tampa tears his rotator cuff..."

6. **Same section, "Pricing is opaque by design"** — in the paragraph ending "...and none of them are disclosed upfront," replace the final clause per **Section B, Item 7**.

7. **Section "The next decade of diagnostic imaging"** — in the paragraph containing "...a well-served patient's scan 8 percent more accurate," replace per **Section B, Item 8**.

8. **Section "What solving access actually requires," "Direct patient booking"** — replace the full bullet beginning "Scheduling that doesn't require a referral..." with **Section B, Item 9**.

No other passages in the article are affected by this remediation pass. Do not touch the closing thesis ("Quality matters. Access is what makes quality matter.") or the CTA section — both are outside the scope of this audit and were not flagged.

After CC applies the diff, the corrected article should be re-read in full before it becomes the source for the LinkedIn newsletter adaptation — not just spot-checked against this list, in case the surrounding prose needs small transitional edits where these replacements meet the untouched text.
