# HANDOFF — Workstream A Operational State

**Last updated: 2026-08-14**

---

## 0. PURPOSE OF THIS FILE

This is the **operational recovery document** for Workstream A. It is the first
file any new agent or contributor reads.

Its job is to answer, in one read: *where does this workstream actually stand
right now, what is in flight, what is uncommitted, and what happens next* —
without the founder having to reconstruct the project verbally.

**What this file is NOT:**

- It is **not** a governance database. `DECISIONS.md` is the authority on what
  was decided, `APPROVED-FIGURES.md` on what may publish, `TRACKER.md` on what
  was executed. This file **points at** them; it never restates them.
- It is **not** a historical record. It is a *living state pointer*. Content that
  is no longer current gets replaced, not appended.
- It **does not override** any of the four governance files. Where this file and
  `DECISIONS.md` disagree, `DECISIONS.md` wins and this file is stale and must
  be corrected.

### Maintenance rule

> **HANDOFF.md must be updated at the end of every substantial Workstream A
> page-remediation session, and whenever branch, PR, deployment, blocker, or
> next-action state materially changes.**

An out-of-date HANDOFF is worse than no HANDOFF, because it will be trusted.
If you cannot verify a section, mark it `⚠️ UNVERIFIED` rather than leaving a
stale claim standing.

---

## 1. REQUIRED GOVERNANCE READING ORDER

Read in this order before scoping any batch. Steps 1–5 are a **precondition for
scoping, not a reference to consult when a question arises.**

| # | File | What it gives you |
|---|---|---|
| 1 | `docs/workstream-a/HANDOFF.md` | **This file.** Where things stand right now |
| 2 | `docs/workstream-a/README.md` | The rules of the folder. Which file wins, and why |
| 3 | `docs/workstream-a/DECISIONS.md` | The tiebreaker. Append-only dated register |
| 4 | `docs/workstream-a/APPROVED-FIGURES.md` | Every number cleared to publish. Anything absent is HOLD |
| 5 | `docs/workstream-a/TRACKER.md` | What was executed, in what commit, and what remains |

⛔ **Do not scope from a summary of these files.** Recorded 2026-08-13 from a
measured failure: prohibitions survive summarisation and approvals do not, which
produces a systematic bias toward *removing* copy that was already cleared.
Read step 4 in full before proposing the removal of any figure.

---

## 2. CURRENT STATE

| | |
|---|---|
| **Date of this snapshot** | 2026-08-14 |
| **Working branch** | `workstream-a-marketing` |
| **Branch HEAD** | `510b672` — *Governance consistency: TRACKER #39 resolved* |
| **Branch vs origin** | Level with `origin/workstream-a-marketing` (0 ahead, 0 behind) |
| **Release PR** | **#7** → `main` |
| **PR contents** | 78 commits, 105 changed files vs `origin/main` |
| **`origin/main`** | `d05b97c` — *Merge PR #5, FD-MKT-002 employer-lead-persistence hotfix* |
| **Branch vs `origin/main`** | **78 ahead, 0 behind.** The branch fully contains production |
| **Production** | Vercel serving `d05b97c` at usrad.com |
| **Build** | ✅ `npm run build` exits 0 on the integrated candidate (branch + local uncommitted edit), 2026-08-14 |
| **Repo** | `git@github.com:954cabrera/usrad-platform.git` |

### ⚠️ Local branch-pointer hazard

Local `main` currently points at **`510b672`** — identical to the workstream
branch head — while `origin/main` is at `d05b97c`.

Local `main` was fast-forwarded onto the workstream branch and never pushed.
**A `git push origin main` from this machine would publish all 78 commits to
production directly, bypassing PR #7 and its review.** Do not push `main`.
Merge through the PR. Consider resetting local `main` to `origin/main`.

---

## 3. COMPLETED SURFACES

Remediation closed and verified. These are the content of the current release.

| Surface | Status |
|---|---|
| `/employer` | ✅ Substantially complete — Stage 3 batches A, B/C, D, E |
| `/employer/schedule` | ✅ Substantially complete — Batch G, G-1 |
| `/employer/implementation-guide` | ✅ Substantially complete — Batch F; deployed and verified |
| `/provider` | ✅ Closed 2026-08-13. Worked ahead of `/press-kit`, `/about` and `/` by founder prerogative |

Sitewide classes closed across the whole branch: HIPAA/BAA assertions, SOC 2,
ERISA, TPA and platform-integration claims, 50-state availability, unsourced
member figures, illustrative savings coefficients, `tel:` link normalisation to
(866) USRad-24. See `TRACKER.md` §2.

---

## 4. CURRENT RELEASE OBJECTIVE

> **Ship the completed Employer + Provider remediation to production now.**
> Do not hold it behind the remaining public-navigation pages.

This is a change of release strategy, adopted 2026-08-14. The prior plan
(`TRACKER.md` §12 row 7) merged once, at the end of the whole workstream. That
is superseded: the completed work releases now, and the remaining surfaces are
remediated incrementally across multiple sessions, each releasing on its own.

**Release classification: B — SAFE AFTER ONE SMALL CONTAINMENT FIX.**
See §6 and §11.

---

## 5. REMAINING SURFACES AND INTENDED ORDER

Handled incrementally, possibly over several sessions. Order by public exposure,
per `TRACKER.md` §12 row 3:

1. `/press-kit` — rebuild on the documented record *(named first by exposure)*
2. `/about`
3. `/` (homepage)
4. `/how-it-works`
5. `/what-is-an-mri` (`/education/what-is-an-mri`)
6. `/contact`
7. Single-instance routes and blog

`/provider`, `/employer`, `/employer/schedule` and `/employer/implementation-guide`
are already done and are removed from this queue.

Each page is a **two-pass** job: survey, then approved copy, then edit. The
survey is already done — it is the 4H-e survey recorded in `DECISIONS.md`
2026-08-07.

> **These five remaining surfaces DO carry changes in PR #7.** Those changes are
> completed *containment* edits only — retired-figure conformance, HIPAA/SOC 2
> badge removal, `tel:` normalisation, removal of the "70% Less" title claim.
> They are **not** partial redesigns and they do not constitute a started
> rewrite. The page-by-page rewrite for these pages has **not** begun.

---

## 6. IMPORTANT LOCAL / UNCOMMITTED STATE

**One uncommitted modification exists and it is load-bearing for the release.**

```
 M src/pages/index.astro
```

`<SocialProofBar />` is commented out of render on the homepage, with an inline
comment recording why.

**Why it matters.** Three of `SocialProofBar`'s four tiles carry figures that may
not publish:

| Tile | Status |
|---|---|
| `150,000+` patients | **RETIRED** by D1 (DOC-15). Open item #24 |
| `$246 Million` patient savings | **BARRED** pending a primary source, 2026-08-07 |
| `4.9★` satisfaction | **UNSOURCED.** Open item #28 |
| `1,200+` imaging centers | Not in scope of this containment |

PR #7 **actively edits this component** (`168,244` → `150,000+`). Merging the PR
without this containment edit would newly publish a retired figure on the
homepage — a regression introduced *by this release*.

⛔ **Do not discard this modification.** It must be committed to
`workstream-a-marketing` and pushed into PR #7 before merge. The component file
itself is preserved, not deleted; its resolution belongs to the `/` page-by-page
rewrite (`TRACKER.md` §12 row 3).

`SocialProofBar` has exactly one render site — `src/pages/index.astro`. No other
surface is affected by this containment.

---

## 7. RATIFIED DECISIONS RELEVANT TO CURRENT WORK

Pointers only. `DECISIONS.md` is the authority; read it, do not rely on this list.

- **Historical evidence standard** (2026-08-07) — founder recollection supports
  qualitative history but does not authorise a newly derived published number.
- **The 150,000 / 168,000 patient-count family is RETIRED** (D1, DOC-15,
  2026-08-12). Supersedes the 2026-08-06 ratification of `150,000+`.
- **$246M client savings is REVERSED AND BARRED** (2026-08-07) pending a primary
  source. The "two distinct claims" finding survives; the approval does not.
- **"Over $150 million" provider volume is REPLACED** by `$60M+ paid to imaging
  centers` (item #25, `99ba3d5`).
- **AnciCare's two dollar claims are distinct** — provider volume vs client
  savings. Never conform one to the other.
- **CorVel sale date is May 2002**, not 2013 (#39 resolved 2026-08-13).
- **D5 retained** — "cash-pay" is a commercial lane, not the payment conduit.
  The proposal to bar the term sitewide was overruled.
- **The language principle** — internal architecture vocabulary does not govern
  market-facing copy.
- **Phone is (866) USRad-24** — `tel:1-866-877-2324`.

### ⭐ NEW — ratified 2026-08-14, awaiting normal governance persistence

> **APPROVED MRI MARKETING CLAIM: “Save 50%+ on MRI”**
>
> **Supersedes the homepage “70% Less” claim.**
>
> Meaning and boundaries of the claim:
>
> - The comparator is **typical commercial health-plan / insurance MRI pricing**.
> - **Not** Medicare.
> - **Not** hospital cash / self-pay pricing.
> - The USRad side is the **all-inclusive / global price**.
> - **Scan + radiologist interpretation are included.**
> - **No separate radiologist bill.**
> - ⛔ **Do not generalise this claim to all imaging modalities.** It is an MRI
>   claim.
> - ⛔ **Do not present it as an “average savings” claim** without separate
>   supporting evidence. It is a floor, stated as `50%+`.
>
> **Status: NOT YET IMPLEMENTED.** This is recorded here for continuity only.
> The homepage change is **not** part of the current release and must not be
> made as part of it. The founder will handle the homepage after the release is
> resolved.
>
> **Persistence still owed:** append a dated entry to `DECISIONS.md`, and record
> the approved claim string in `APPROVED-FIGURES.md`. Until that is done, this
> section is the only record and is therefore fragile. Do this at the next
> governance commit.
>
> Note for the implementing session: open item **#29** already tracks *“50–70%
> published where the 50%+ floor is required — 6 locations.”* This ratification
> is the resolution of that item's homepage instance. Sweep #29's six locations
> together with the homepage change; do not fix one and leave five.

---

## 8. KNOWN DEFERRED WORK

Deferred by explicit decision, not forgotten. Not blockers for this release.

- **Provider hero `<h1>` narrow-viewport wrap** — goes 3 lines at ≤405px and
  4 lines at 320px. Accepted at the Batch 4G gate. Cosmetic; deferred.
- **`generateROIReport.ts`** — proven unreachable since `39d8c7a`; zero importers
  repo-wide. Re-confirmed 2026-08-12. Copy edits stay parked pending the flat-fee
  pricing rebuild. Standing rule 9 applies on reactivation.
- **Sitewide $260 family** — 35 instances, item #36. Deferred to the page-by-page
  sequence.
- **Tenure / duration claims** — 17 instances, item #27. Merged into the
  page-by-page rewrite; whatever it does not reach becomes a cleanup pass.
- **96% show rate — OPEN SITEWIDE.** Closed on `/provider`, but five instances
  remain on publicly reachable static routes (`built-usrad.astro`,
  `built-usrad2.html`, `usrad-end-card.html`, `usrad-end-card2.html`,
  `patient-advocate/index.astro`). Item #6.
- **`robots.txt`** — `TRACKER.md` §12 row 5. Not started.
- **Final audit** — full re-sweep of every barred and retired figure across
  `src/` and `public/`, plus a build-output sweep. `TRACKER.md` §12 row 6.
- **`CarbonLayout` dead imports** — `UtilityBar`, `ProcedureSearchModal`.
  Recorded, deliberately not actioned.
- **Item #38 — EDS employer-funnel handoff.** A dependency on the Remix/EDS
  repo, **not** Workstream A work. Do not action it here.
- **Workstream B** — largely closed by the August 7 source discovery. See
  `TRACKER.md` §14.

---

## 9. OPEN BLOCKERS

**Blocking the current release: one — see §6 and §11.**

Everything below is open work, not a release blocker.

- **`DECISIONS.md` §"Open decisions awaiting founder"** carries the live list.
  As of this snapshot the open items are #6, #8, #15, #16, #17, #18, #22, #24,
  #26, #27, #28, #29, #30, #31, #33, #34, #35, #36, #37, #40, #41. Read the
  register for current status; this list ages.
- **Items #22, #24 and #27 are MERGED, not closed.** They execute together as
  one page-by-page rewrite and each stays open until resolved on every page.
- **`TRACKER.md` §107 4H-d marker is unverified.** The tracker records 4H-d
  committed at `8a577a1`, but the `provider-page-remediation` working tree did
  not carry it and the change was applied manually on 2026-08-13. ⛔ **Bounded —
  this does not open a repository-wide forensic audit.** Treat committed markers
  in §107 as claims to verify, not facts.
- **Barred figures still live in production today** on pages not yet remediated —
  `$246 Million` on `/about`, `/press-kit`, and the blog; `4.9★` on `/contact`,
  `/how-it-works`, `/what-is-an-mri`. PR #7 **does not introduce these** — they
  already ship on `d05b97c` — and it does not remove them either, because those
  pages are still in the queue. Merging PR #7 is strictly an improvement on this
  axis, not a regression. They are retired by the §5 sequence.

---

## 10. WORK CURRENTLY IN PROGRESS

**Nothing is mid-edit.** No page rewrite is underway. The tree is clean apart
from the single containment edit in §6.

The active task is **release**, not remediation.

---

## 11. EXACT NEXT ACTION

The smallest safe path to production, in order:

1. **Commit the containment edit** on `workstream-a-marketing`:
   ```
   git add src/pages/index.astro
   git commit -m "contain: remove SocialProofBar from homepage render pending / rewrite"
   git push origin workstream-a-marketing
   ```
   This lands in PR #7 automatically. **This is the only change required before
   merge.**

2. **Re-verify** — `npm run build` exits 0, and `SocialProofBar` is absent from
   homepage output.

3. **Merge PR #7** into `main` and let Vercel deploy.

4. **Do not push local `main` directly.** Reset it afterwards:
   `git checkout main && git reset --hard origin/main` (see §2).

5. **After the merge**, append to `DECISIONS.md`: the release-strategy change
   (incremental per-surface releases, superseding `TRACKER.md` §12 row 7), the
   `Save 50%+ on MRI` ratification from §7, and the merge itself. Update
   `TRACKER.md` §12. Then **update this file**.

6. **Then, and only then**, begin the next surface — `/press-kit` per §5, or the
   homepage `Save 50%+ on MRI` change if the founder sequences that first.

⛔ Do not begin homepage remediation, do not touch application/EDS work, and do
not broaden scope, until the release above is closed.

---

## 12. WHAT PR #7 ACTUALLY CONTAINS — verification summary

Verified against the repository on 2026-08-14, not assumed from the commit count.

- **78 commits, 105 files.** Every commit is either a named remediation batch or
  a governance-document commit. No WIP, checkpoint, experimental, debug or
  revert commits in the range.
- **Archive moves are clean.** 17 files `git mv`'d to `archived-api/`. No live
  `import` of any archived component remains. The one surviving reference to the
  retired `/search-results` route is in `NetworkMapPinsCarbonV2.astro`, which is
  itself imported by nothing — dead code, not a broken link.
- **`.gitignore`** adds `docs/ancicare_proof/` and `docs/hygiene/`. Confirmed
  **zero** tracked files under either path — the confidential tax and shareholder
  documents are not in the repository and never were.
- **Six planning PDFs are committed** under `docs/workstream-a/source/`
  (~930 KB total). Deliberate, per `README.md`. Note they will be present in
  `main` after merge — confirm repository visibility is acceptable for them.
- **Shared/sitewide component changes are containment only**: HIPAA/SOC 2 badge
  removal (`Footer`, `ProviderLayout`, `CarbonHeader`), the ungated
  "90 million Americans" line in `CarbonFooter`, `CarbonLayout` default title and
  description, `tel:` normalisation, and two `connectAudiences` integration
  claims. No structural or behavioural change.
- **Build passes** on the integrated candidate.

---

## 13. Production Release Checkpoint — 2026-08-14

PR #7 was successfully merged to `main`.

- Merge commit: `da8eb85`
- Vercel production deployment: Ready
- Employer remediation: LIVE IN PRODUCTION
- Provider remediation: LIVE IN PRODUCTION
- Local `main` synchronized to `origin/main` at `da8eb85`
- New active branch: `homepage-remediation`
- Branch created directly from production `main` at `da8eb85`
- Working tree was clean at branch creation

### Release Strategy Going Forward

The remaining Workstream A public surfaces will be remediated and released incrementally rather than being held for one final all-pages release.

Current active surface: `/` (homepage)

Remaining surfaces after homepage:
- `/how-it-works`
- `/what-is-an-mri`
- `/about`
- `/contact`

The objective is containment and speed: finish a surface, document its state, release it when safe, then proceed to the next surface.

---

## 14. Ratified MRI Savings Claim — 2026-08-14

Status: RATIFIED — NOT YET IMPLEMENTED

Approved public claim:

**Save 50%+ on MRI**

This supersedes the prior `70% Less` formulation.

Claim boundaries:

- Applies to MRI only.
- Comparator is typical commercial health-plan / insurance pricing for MRI, not Medicare pricing.
- Hospital cash/self-pay pricing is not the primary comparator for the employer-facing claim.
- USRad pricing is global/all-inclusive: the scan and radiologist interpretation are included.
- No separate radiologist bill.
- Do not characterize `50%+` as an average savings claim without separate supporting evidence.
- Do not extend the claim to other imaging modalities without separate evidence.

Implementation remains pending on the homepage and any other live surfaces carrying the superseded MRI savings language.
