# Workstream A — Documentation

**Read this file first. It governs everything else in this folder.**

---

## THE RULE

> **The most recent dated decision wins. Everything else is source material.**

Documents accumulate and contradict each other. A dated decision register cannot, because there is exactly one tiebreaker: the date.

When two documents disagree, do not attempt to reconcile them. Look up the question in `DECISIONS.md` and use the most recent entry. If it isn't there, it hasn't been decided — ask the founder and record the answer.

---

## THE LANGUAGE PRINCIPLE

> Internal language describes how USRad operates.
> External language describes the world the customer already understands.

Engineering says *funding authority*. The PSA says *assignment types* and
*payment conduits*. Providers say *cash-pay* and *payor mix*.

These do not have to match, and keeping them distinct makes the system
clearer rather than less consistent. Applying architectural vocabulary to
market-facing copy is an error, not a correction.

*Recorded August 6, 2026, after a proposal to bar "cash-pay" sitewide was
overruled on this basis.*

---

## THE HISTORICAL EVIDENCE STANDARD

> Historical quantitative claims publish only when supported by a
> contemporaneous source or a clearly defensible primary record.
> Founder recollection may support qualitative history. It does not,
> by itself, authorise newly derived quantitative claims.

Recollection is admissible for what happened. It is not admissible as
an input to arithmetic that produces a new published number.

*Recorded August 7, 2026, after the $246 million savings figure was
traced to a calculation built on a case count already ruled an error.*

---

## THE FOUR LIVE FILES

Everything in this folder that is not in `source/` is current authority.

### `APPROVED-FIGURES.md`
**Every number cleared for publication.** Anything not listed is HOLD and must not appear in any public artifact.

**Check this before removing any figure.** If an approved value exists, the correct action is to *conform to it*, not delete it. Removal is correct only when nothing has been approved and no source exists.

This file exists because approved figures are the most easily lost item in any summary. A prohibition ("never say net margin") survives condensation because it reads as a permanent rule. An approved value ("$225–$400 per scan") reads as a transient detail and gets dropped — after which the figure looks unsourced, and the reflex is to delete copy that was already cleared.

### `DECISIONS.md`
**Append-only. One line per decision, with a date and an authority.** Never rewrite a line. To reverse a decision, append a new one that supersedes it.

This is the tiebreaker. When the scope, the tracker, and a conversation disagree, the most recent dated entry here settles it.

### `TRACKER.md`
**What was done, in what commit, and what remains.** Commit log, standing rules, open items, batch sequence.

Records execution. Does not establish authority — if the tracker and `DECISIONS.md` disagree, the decision register wins.

### `README.md`
This file.

---

## THE ARCHIVE — `source/`

The August 3, 2026 planning documents. **Historical. Not current authority.**

| File | What it is |
|---|---|
| `2026-08-03-scope-of-work.pdf` | Workstream A scope. Governing split (SHIP/HOLD), approved provider economics, non-objectives, execution order |
| `2026-08-03-addendum-b.pdf` | **Controlling copy specification** for the provider brief, the ROI report, and provider economics. Exact replacement copy, file-and-line |
| `2026-08-03-repositioning-plan-v2.pdf` | Three-release structure. Decisions D1–D5. Out-of-scope and leave-as-written lists |
| `2026-08-03-project-report.pdf` | Strategic narrative prepared for advisor review. Market shift, contract architecture, HIPAA gap, assumptions that may be wrong |
| `2026-08-03-advisor-review.pdf` | Advisor's six-milestone restructuring and sequencing recommendations |
| `2026-08-03-psa-exhibit-c-baa-draft.pdf` | BAA draft, four `[DECIDE]` items. Not for execution |

**Why these are archived rather than deleted.** They contain the reasoning behind decisions that are now one-line entries in the register. When someone asks *why* the volume basis is 15–25 scans per month, the answer is in Addendum B. When someone asks *what* the volume basis is, the answer is in `APPROVED-FIGURES.md`. Different questions, different files.

**Known conflicts among the source documents** — do not try to resolve these by reading. They are settled in `DECISIONS.md`:

- Repositioning v2 lists `TrustBar` and `ProvenSuccess` as leave-as-written. Addendum B §1.9 requires both to change to the rounded AnciCare figures. Addendum B is later and more specific.
- The Project Report's incremental-margin prose ("fixed costs are already covered") was superseded by Addendum B §1.2, which revised it because it asserted a cost structure USRad cannot see.
- Repositioning v2 D5 retains "cash-pay" as a lane name. Later discussion questioned the term entirely. **Settled 2026-08-06: D5 retained** — cash-pay is a commercial lane, not the payment conduit; pre-funded is the platform identity. The proposal to bar the term sitewide was overruled. See `DECISIONS.md` and THE LANGUAGE PRINCIPLE above.

---

## WHY THIS FOLDER EXISTS

On August 6, 2026, a batch was scoped to remove `$37,500/month`, `15–25 scans/month`, and `$5K–$10K` from the provider surface as unsupported projections.

All three were founder-approved on August 3, and Addendum B §5.1 already specified the exact corrections. The batch would have deleted approved economics and re-derived work that had been done three days earlier.

**Root cause:** the governing documents existed but lived outside every context in which work was scoped against them. What survived into the working session were the *prohibitions* ("never say net margin") without the *approvals* they were attached to. That asymmetry produces a systematic bias toward removal.

**The fix is this folder, in the repo, in project knowledge.** Not a process. Not a heavier system. Four files where the answer is, and a rule for which one wins.

---

## HOW TO USE THIS BEFORE SCOPING ANY BATCH

1. **Read `DECISIONS.md`** — most recent entries first. What has been settled since the last batch?
2. **Read `APPROVED-FIGURES.md`** — is any figure you plan to touch already approved?
3. **Check `TRACKER.md`** — has this been attempted, and did it stop for a reason?
4. **Only then** consult `source/` for the reasoning, if the *why* matters.

If a batch proposes removing a figure, step 2 is not optional.

---

## HOW TO RECORD A DECISION

Immediately, not at the end of a session. Append to `DECISIONS.md`:

```
2026-08-06 · Provider hero rewrite (4G) ratified. Supersedes SCOPE §1.1,
             which authorized one line. · FOUNDER
```

Date · what was decided · who decided it. One line. If it needs a paragraph, the paragraph goes in the tracker and the register carries the one-line version with a pointer.

**Authority values:** `FOUNDER` · `ADVISOR` · `COUNSEL` · `CLAUDE` (proposed, unratified) · `CC` (verified fact).

Anything marked `CLAUDE` is a proposal until a founder line supersedes it.

---

## RELATIONSHIP TO EDS

**Marketing artifacts do not go into EDS.** Not this folder, not the copy changes, not the revision history. EDS is engineering and operational memory. The website is versioned in Git and that is sufficient.

What migrates into EDS is only the **business architecture decisions that emerged**, not the implementation that expressed them:

| Belongs in EDS | Does not |
|---|---|
| USRad's operating model is a prefunded imaging network | Change "pre-paid" to "pre-funded" in `HeroSection.astro:61` |
| Funding assurance precedes routing | Rewrite FAQ 6 |
| Provider reimbursement is independent of funding source | Remove the licensure row from `ExecutiveFAQ` |
| Rates are center-set and market-varying, subject to USRad approval | Re-render the provider brief |

EDS answers *why does the platform require a funding gate before routing*. It does not answer *why did we rewrite the employer hero headline*.

---

## THE EDITORIAL STANDARD

Every public statement must trace to one of four things:

1. Documented operating history
2. Implemented platform capability
3. Executed legal agreement
4. **Approved founder policy** ← `APPROVED-FIGURES.md`

If a statement cannot be traced to one of those four, it does not ship.

Item 4 is what this folder makes findable. A figure with founder approval is as publishable as one with a citation — and deleting it is as much an error as inventing one.

---

*This folder outlives Workstream A. The source documents can be archived with the release; the register and the figures cannot.*
