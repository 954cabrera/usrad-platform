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

| **Working branch** | ✅ **UPDATED 2026-08-17 — `main`.** `homepage-remediation` and `about-remediation` are both merged and spent |
| **Working tree** | ✅ **Clean.** |
| **`main`** | ✅ **UPDATED 2026-08-17 — `main` IS `470d2ae`** (*Merge PR #13, about-remediation* — 6 files, 459 insertions, 726 deletions). Moved `411577a..470d2ae`. Local `main` synchronized to `origin/main` |
| **Production** | ✅ **UPDATED 2026-08-17 — Vercel serving `470d2ae` at usrad.com.** Employer + Provider + P5 footer + Homepage + **About** remediation all **LIVE** |
| **Prior releases** | PR #7 `da8eb85` (Employer/Provider, 78 commits/105 files) · PR #8 `673fb2a` (P5 footer, two-repo) · PR #9 `cda6b41` (NewsletterPopup, #66) · PR #10 `4d12da3` (homepage) · PR #11 `2d4117c` (post-merge state) · PR #12 `411577a` (AnciCare evidence admission) · PR #13 `470d2ae` (about). See §12 for PR #7's verified contents and §13 for the checkpoint |
| **⚠️ `main` movements** | **TEN this month.** Every one was found by counting, not by noticing. Run the §2 state check before every batch |
| **Repo** | `git@github.com:954cabrera/usrad-platform.git` |

### ✅ Local branch-pointer hazard — RESOLVED

The pre-merge hazard (local `main` fast-forwarded onto the workstream branch and
never pushed) is closed: local `main` is synchronized to `origin/main` at
`da8eb85`. **The standing practice survives the hazard** — run the state check
before every batch and stop on a non-zero behind-count. `main` moved three times
in August and every movement was found by counting, not by noticing.

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

⚠️ **RESEQUENCED 2026-08-14 BY FOUNDER PREROGATIVE.** `/` is worked first,
ahead of `/press-kit` and `/about`. Same shape as `/provider`, which was worked
fourth-in-order and first-in-practice on 2026-08-13. Recorded because the
register did not otherwise carry it.

✅ **ORDER RULED 2026-08-14 BY THE FOUNDER. §13's ordering governs, and this
list is conformed to it. THIS IS THE ONE OPERATIONAL SEQUENCE.**

1. `/` (homepage) — **CURRENT SURFACE**
2. `/how-it-works`
3. `/what-is-an-mri` (`/education/what-is-an-mri`)
4. `/about`
5. `/contact`
6. `/press-kit` — rebuild on the documented record. ⛔ **DEFERRED UNTIL AFTER
   THE FIVE PRIMARY NAVIGATION SURFACES ABOVE — DEFERRED, NOT DROPPED. It
   remains Workstream A work and stays in the queue.** `TRACKER.md` §12 row 3
   names it FIRST BY EXPOSURE and it is register-borne, not conversational —
   see DOC-23. ~~Its position relative to `/about` and the rest is open and
   wants a founder ruling~~ — ⛔ **SUPERSEDED 2026-08-14: its position is now
   RULED and fixed at 6.** The exposure argument is on the record and was
   considered; the ruling sets sequence anyway
7. Single-instance routes and blog

> **This ruling resolves the pre-existing §5/§13 conflict.** §5 previously ran
> `/` → `/press-kit` → `/about` → `/how-it-works` → `/what-is-an-mri` →
> `/contact` while §13 ran `/` → `/how-it-works` → `/what-is-an-mri` →
> `/about` → `/contact`. **§13 and §15 row 8 are now conformed to the list
> above — all three sections read the same sequence.** `DECISIONS.md`
> 2026-08-14 carries the ruling and is its authority; this section is the
> operational statement of it.

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

⚠️ **CORRECTED 2026-08-14 — THIS IS NO LONGER TRUE. There IS uncommitted work.**
The branch carries an uncommitted `docs/workstream-a/*` governance package:
`HANDOFF.md`, `TRACKER.md`, `DECISIONS.md` and `APPROVED-FIGURES.md`. It is
**documentation only — no source file is modified** — and it is the package
§11 step 2 tells you to commit. ⛔ **Do not reconstruct any of these four files
from `main`; they carry edits that exist nowhere else.**

*Superseded text, kept so the change is visible:* ~~✅ **NOTHING UNCOMMITTED.
Working tree clean at `40328f0`.**~~

The `SocialProofBar` containment described in earlier versions of this section
**shipped in PR #7** and is live in production at `da8eb85`. `<SocialProofBar />`
is commented out of render in `src/pages/index.astro` with an inline comment
recording why; the component file is preserved, not deleted.

**Its resolution belongs to the `/` remediation now in progress.** Three of the
four tiles carry figures that may not publish — `150,000+` (D1, item #24),
`$246 Million` (barred 2026-08-07), `4.9★` (item #28) — and the fourth,
`1,200+`, is approved **only** in compact form with its April 2002 anchor, which
a stat tile cannot carry.

⚠️ **Containing the component did not contain the claim.** `$246 Million`
survives on the same page in `AboutSection.astro` and is live in production
today. See §9.

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
> ✅ **PERSISTED 2026-08-14.** Recorded as a dated entry in `DECISIONS.md`
> (August 14 section, D14) and as an approved claim in `APPROVED-FIGURES.md`
> **§1d**. Those are the authority; this section is a pointer.
>
> ⛔ **CORRECTED 2026-08-14 — THIS RATIFICATION IS *NOT* THE RESOLUTION OF #29.**
> An earlier version of this section said it was and directed a single combined
> sweep. **That was wrong and would have caused the error D4 exists to prevent.**
> #29 concerns the **AnciCare historical floor** — *50% or more below the Florida
> workers' compensation fee schedule, 1994–2002* — where six locations publish a
> `50–70%` range and thereby leak the confidential 70% upper bound. This
> ratification is a **present-tense USRad MRI claim against commercial
> health-plan pricing.** Same number; different entity, different tense,
> different comparator, different modality scope. Sweeping them together would
> convert historical AnciCare evidence into a present-tense USRad performance
> claim by coincidence of digits — which D4 forbids in terms.
>
> **TWO SEPARATE SWEEPS.** See `APPROVED-FIGURES.md` §1d and the DO NOT CONFLATE
> callout in §4a. Founder-ratified 2026-08-14.

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
  #26, #27, #28, #29, #30, #31, #33, #34, #35, #36, #37, #40, #41, and — added
  2026-08-14 — **#65** (sitewide retired-claim sweep). Read the
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

**Nothing is mid-edit. Tree clean at `40328f0`.**

The active task is **`/` (homepage) remediation** on branch
`homepage-remediation`. The release that this section previously described is
closed — see §13.

✅ **`/` HOMEPAGE — COMPLETE, MERGED AND DEPLOYED.** Merged as PR #10 at
`4d12da3`; verified against the live site, twelve barred strings at zero.

⛔ **`/about` — COPY REMEDIATION COMPLETE, NOT YET MERGED.** Branch
`about-remediation`, seven commits `65656cb` → `20dc1b8`. `about.astro` from
1,422 lines to ~770.

### What was done

| Step | Commit | |
|---|---|---|
| 1 | `65656cb` | The `$246M` case study deleted entire (286 lines); `(V2 Preview)` removed from the title; the retired DOM id and its analytics entry retired atomically with the contract |
| 2 | `4d54367` | **Act 5** — the corporate-inheritance firewall, built from nothing |
| 3 | `db12ded` | **Act 6** — founder cards reduced to the minimal form; both quotes and the promise block removed |
| 4 | `413eec6` | **Act 1** — hero lede replaced with the PSA-verified architecture line |
| 5 | `3fcb07b` | **Act 2** — origin rewritten on registered evidence |
| 6 | `743e4a7` | **Act 3** — the documented record, rebuilt single-column |
| 7 | `20dc1b8` | **Act 4** — timeline copy; §4d USRad corporate facts admitted |

**Cleared from `/about`, verified at zero on the built page:** `$246M` ×5 ·
`150,000+` ×6 · `1,236%` · `99.8%` · `90 Million` ×3 · `$260` · `1,200+` ·
`30+`/`30 Years` ×3 · `14-day` ×2 · `50%` · `$3,200` · `$475` ·
`$95M`/`$151M`/`52%`/`3.2M` · `America's first` · `one of the first` ×3 ·
`proven playbook` ×3 · `Fortune 500` · `Nationwide launch` · `pre-negotiated` ·
both founder quotes · `2013` · `(V2 Preview)`. **One `<h1>`; comment contents
clean without markup stripping.**

### ✅ CC'S TIMELINE BREAK — COMPLETE

Implemented under the bounded brief. The AnciCare path terminates at the May
2002 node with an end-cap; the USRad era resumes on a separate blue path with
its own start-cap; era labels `AnciCare · 1994–2002` and `USRad · 2025–`; the
23-year interval is a bare `aria-hidden` spacer marked do-not-fill, 342px at
1440 and 227px at 390; and **May 2002 is raised from the timeline's faintest
entry to its anchor.** ✅ `id="timeline"` survives on the single section — the
split the analytics contract warned about did not happen, so no contract change
was needed. ⚠️ **That warning line in the contract is now stale.**

### ⛔ A STRUCTURAL DEFECT FOUND ON REVIEW

`</CarbonLayout>` closed immediately after the timeline. **Act 5 — the
corporate-inheritance firewall — plus Act 6 and the final CTA rendered outside
the layout, below the footer**, from `743e4a7` through four subsequent steps.
⛔ **Every sweep passed.** The content was present and correct; the defect was
where it appeared. Fixed at `86f0322` and recorded as `#54`'s ninth mode.

### ✅ VERIFIED

Twenty-six barred strings at zero on the built page · comment contents clean
without markup stripping · **document order ascending with `<footer` last** ·
one `<h1>` · both `trust_content_view` observer targets intact.

### Next action

1. PR into `main` · 2. **Production `curl` sweep of `usrad.com/about`**, per the
standing live-site practice · 3. Then the next surface

⚠️ **`main` has moved nine times this month.** Run the §2 state check before
merging.

### Next action

1. CC implements the break · 2. Full-page verification re-run · 3. HANDOFF
finalized · 4. PR into `main` · 5. **Production `curl` sweep of
`usrad.com/about`**, per the standing live-site practice

⚠️ **`main` has moved nine times this month.** Run the §2 state check before
merging. It was level (0 behind) at `20dc1b8`.

### ⛔ Governance admitted during this pass

**§4a** — ten AnciCare rows and five constraining notes, 2026-08-16, from the
SFBJ article, two gubernatorial letters, three award plaques and the corporate
overview. **§4b** — five bars. **§4d** — seven USRad corporate-fact rows,
2026-08-17, and the **corporate chronology publication rule**: recording the
2013 formation does not authorize presenting 2013 as the beginning of the
current business narrative.

⚠️ **`#76` records that five successive audits read the founder-card section and
missed four barred figures in the stat grid between the prose and the quote.**
`#54` now stands at thirteen members across eight modes.
Final branch commit `1963cc2`; merged as **PR #10 at `4d12da3`** — 17 files,
1,208 insertions, 278 deletions; Vercel serving it at usrad.com.

⛔ **VERIFIED AGAINST THE LIVE SITE, NOT THE BUILD.** Twelve barred strings
return **zero** from `curl -s https://usrad.com/ | tr -s '[:space:]' ' '`:
`246 million` · `one of the first` · `more than 1,200` · `1,500` · `70% Less` ·
`Pay hundreds` · `48-72` · `America's first` · `Industry Veterans` ·
`Pre-negotiated` · `$3,200` · `$260`. `Save 50%+` and `USRad Member` both
present. ⚠️ **This was the first release in this workstream verified against
production rather than `dist/`, and it should be the standard** — see
`DECISIONS.md` 2026-08-14.

### What was completed

| Phase | Result |
|---|---|
| **GREEN** | ✅ 14 items across 9 files — `de1a121` |
| **YELLOW** | ✅ Y6 hero, Y1/Y2 pricing, Y3 credibility, Y5 blog cards — `a1a2bb3`, `71972c1` |
| **RED** | ✅ RED-1 AboutSection, RED-2 locations map, Y4a banner, closeout — `1963cc2` |
| **Y4** | ⛔ **PARKED — not resolved, not contained, not approved.** See below |

**Cleared from `/`:** `$246 million` · `70% Less` · `Pay hundreds, not thousands`
· `1,500+` ×3 · `$3,200`/`$260` · `60–70%` · `67%` · `48-hour` · `48-72` ·
`Within 4 hours` · `one of the first` · `America's first` · `Industry Veterans`
· `30 years` · four `instant` constructions · ACR/nationwide claims · the
board-certification guarantee form · `Pre-negotiated member pricing` ·
`Save up to 70%` · `1,500+ centers`.

**Hero now reads** `Save 50%+` / `on MRI.` under **D14**, with the
commercial-plan comparator basis and radiologist-interpretation inclusion
immediately beneath it, per D14's two presentation constraints.

### ⛔ Intentional containments — components PRESERVED, not deleted

Five render calls are commented in `src/pages/index.astro`, each with a dated
inline reason. **None of these component files was modified.**

| Contained | Why | Rebuild belongs to |
|---|---|---|
| `SocialProofBar` | 3 of 4 tiles retired/unsourced (D1/#24, §6, #28) | credibility pass |
| `CredibilitySection` | 3 of 4 elements fail; **#44 blocked on Appendix B decision 3**, and per #45 copy may be REMOVED on the draft standard's basis but not APPROVED on it | ✅ flips to a rewrite the moment Appendix B decision 3 lands |
| `AboutSection` | $246M (§6), "one of the first" (D3), "more than 1,200" (rule 18), "After decades" (#27). **Surgical removal assessed and REJECTED** — stripping the barred material leaves an H2 asserting "Proven" with no proof, and a residual that reads as a network USRad has NOW: a rule 26 failure produced by deletion | credibility pass, §4a forms available |
| Locations map — **wrapper AND component** | 4 of 4 stat tiles fail (#56, D7, D4); "America's first" is the D3 class. ✅ *"Network Building: Phase 1 of 3 — Accepting select centers in priority markets"* is the only stage-accurate network copy on the site and is **preserved in the component for reuse** | network-building/market-coverage pass |
| `MemberTrustBadge variant="banner"` | "Pre-negotiated member pricing" asserts executed provider rate agreements that do not exist (rule 24) | Y4 membership pass |

⚠️ **`/` NOW HAS NO PROOF BAND AT ALL** — no social proof, no credibility strip,
no map, no company history. **This was ruled knowingly at each step and is
recorded in `DECISIONS.md`.** Containment did not remove a *valid* credibility
band: the proof it rested on was barred, so `/` had no defensible one before
this pass either. What the page now carries is architecture and process. §4a's
approved historical AnciCare forms remain available for a later treatment in
explicitly historical framing.

### ⛔ Y4 — PARKED, and why it must not be reopened casually

**Membership is implemented platform architecture**, not an unsupported
marketing construct: persistent `USM-XXXXXX` IDs in Supabase, 241 users
backfilled, Member Credential Block at booking confirmation, Member Portal,
Member Bill of Rights, canonical `/membership`. A proposal to contain the whole
component was **withdrawn on evidence**.

⛔ **The firewall, recorded in `DECISIONS.md` 2026-08-14:** *USRad Membership is
an implemented identity and access architecture. Provider-network claims made as
membership benefits are independently governed and may not be inferred merely
from the existence of membership.*

Only the **banner placement** was contained, and only because it published a
rule-24 failure. `MemberTrustBadge.astro`, `/membership`, `/member-rights` and
the inline pill are all **unchanged**. Open under **#70** (`/membership` — nine
present/past-tense pre-negotiated network claims plus an internal contradiction
at `:480`), **#71** (`/member-rights` Right #5), **#72** (Y4 parked).

### ⚠️ Residual exposure — RULED AND RECORDED, NOT CLOSED

These belong to other surfaces. **`/` is clean; the site is not.**

- **`/blog`** — `View All Articles` links to an index carrying four Y5-excluded
  articles plus `blog/the-scan-that-never-happens:306` (**§6, $246M**).
  `blog.astro:499` still publishes `Join 10,000+ Subscribers`
- **`AccessProblemSection`** (retained on `/`) links to that same `$246M` article
- **`CarbonLayout`** `og:title` / `og:description` — *"nationwide"*,
  *"infrastructure-grade reliability"*; sitewide, #55-adjacent
- **#73** unregistered live USRad prices · **#74** fabricated pre-launch patient
  testimonials · **#75** Price Match Guarantee · **#65** above-bound savings
  formulations — all on blog routes, none scheduled
- **#69** six orphaned backup files in `src/` contaminating every sweep

### ⛔ Method — #54 now runs to nine members and FIVE modes

**Not one was caught by the obvious grep.** Line wrapping · variant form · CSS
transform (`uppercase` renders a string that does not exist in source in that
case) · dash variance · **component-chunk separation** (a route-chunk string
sweep does not reach content rendered by an imported component — verify
containment at the **call site**, not by string absence).

**Mandatory:** flatten with `tr -s '[:space:]' ' '` before matching source;
search the shortest distinctive token, never the sentence; wildcard the variable
character; default to `-i`; and **read the rendered page** — a built-artifact
sweep is necessary and is not sufficient.

---

## 11. EXACT NEXT ACTION

The smallest safe path to production, in order:

1. ✅ **DONE — the `/` remediation pass is complete** at `1963cc2`, pushed.
   `main` is level (0 behind); no reconciliation required.

2. **Open the PR** from `homepage-remediation` → `main`. Body: the `1963cc2`
   commit message, which carries the full verification record.

3. **Merge and deploy.** Then verify on production that `$246 million` is absent
   from `/` — ⛔ **whitespace-normalized**, because
   `grep -c '$246 million' AboutSection.astro` returns **ZERO on the file that
   publishes it**. Use:
   `tr -s '[:space:]' ' ' < <file> | grep -c "246 million"`

4. **Update this file and `TRACKER.md` §12** with the merge SHA, and record the
   `main` movement in `DECISIONS.md`. **`main` has moved five times this month
   and every movement was found by counting, not by noticing** — run the §2
   state check before every batch.

5. **Then, and only then**, begin the next surface. Per §5 the queue is
   `/press-kit` (named first by exposure in `TRACKER.md` §12 row 3, register-borne
   — see DOC-23), then `/about`, `/how-it-works`, `/what-is-an-mri`, `/contact`,
   then single-instance routes and blog.

⛔ **Do not reopen `/`.** Do not reopen Employer or Provider. Do not touch
application/EDS work. Do not begin membership remediation from a page pass —
see the Y4 firewall in §10.

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
- `/press-kit` — ⛔ **deferred until after the five primary navigation surfaces
  above; DEFERRED, NOT DROPPED.** Position ruled 2026-08-14; see §5

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

---

## 15. OPERATIONAL STATE — 2026-08-14, post-P5

Read this section before scoping anything. It is the unambiguous answer to
*"what is live right now."*

| # | Fact | State |
|---|---|---|
| 1 | **Employer remediation** | ✅ **LIVE IN PRODUCTION** |
| 2 | **Provider remediation** | ✅ **LIVE IN PRODUCTION** |
| 3 | **P5 cross-platform footer containment** | ✅ **COMPLETE / LIVE / VERIFIED — BOTH REPOSITORIES** (detail below) |
| 4 | **Active branch** | `homepage-remediation` |
| 5 | **Active Workstream A surface** | **`/` (homepage)** |
| 6 | **Ratified "Save 50%+ on MRI"** (D14, §14) | ⛔ **NOT YET IMPLEMENTED** — ratified only |
| 7 | **Broader retired-claim sweep** | ⛔ **OPEN, and DISTINCT from P5** — item **#65** |
| 8 | **Remaining surface order** | **`/` → `/how-it-works` → `/what-is-an-mri` → `/about` → `/contact` → `/press-kit`** — `/press-kit` ⛔ **deferred until after the five primary navigation surfaces; DEFERRED, NOT DROPPED.** Ruled 2026-08-14; see §5 |

### 3 — P5 cross-platform footer containment, in full

Both pull requests read `merged: true` with a `merged_at` timestamp on the PR
object itself — **verified on the PR, not inferred from `merge_commit_sha`** —
and both merge commits are confirmed present on `origin/main`.

| | `usrad-platform` (marketing) | `usrad-portal` |
|---|---|---|
| **PR** | **#8**, merged 2026-08-14T17:17:17Z | **#51**, merged 2026-08-14T17:15:32Z |
| **Merge commit** | **`673fb2a`** | **`f639080`** |
| **Deployment** | **`dpl_31oUx96CbMABCW7imZru7pfdBiVv`** | **`dpl_GAe3hA1fsrUTUBGUZBFpcSFmDtMV`** |
| **readyState** | **READY** | **READY** |
| **Alias** | **usrad.com** | **app.usrad.com** |

**What was removed from both footers:** the *"saved up to 70%"* paragraph,
*"Board-Certified Radiologists"*, *"Results delivered directly to you"*, and the
green **`Guarantee`** badge on the *"Our Promise"* link. **The *Our Promise*
link and its `/patient-promise` target are RETAINED on both**, as is
*"No Hidden Fees"*. **Portal only, a fifth change:** its brand line still read
*"…for 90 million Americans"* and was conformed to the already-ratified Astro
wording — **"Building Accessible Imaging. Transparent pricing. No insurance
required."**

**Verified post-merge against live production artifacts, not source.** Marketing:
**9 live footer regions, zero violations.** Portal: **SSR HTML plus the live
client chunk, zero violations**, *"90 million Americans"* absent, approved brand
line present. Method and full provenance in `TRACKER.md` **#60**; rulings in
`DECISIONS.md`, 2026-08-14.

### ⛔ 7 — what P5 did NOT close

P5 closed **the footer instance on two codebases**. It is **not** a sitewide
claim closure, and **#30's earlier footer closure was never one either** — it was
accurate for `CarbonFooter.astro` and footer-scoped. **Item #65** exists so this
cannot be misread: 17 source files across 22 sites here, plus four `usrad-portal`
surfaces **of which three are email templates, which cannot be corrected after
send**. ⛔ **Do not mark any broader occurrence resolved on the strength of the
footer work.**

### ⛔ BRANCH GAP — recorded, deliberately NOT fixed

`homepage-remediation` is based on **`40328f0`**, which **predates `673fb2a`**;
`origin/main` is **two commits ahead** of the branch.

> **`CarbonFooter.astro` ON THIS BRANCH STILL CARRIES ALL FOUR P5 CLAIMS.**
> Confirmed by reading the file on the branch on 2026-08-14.

This is a **branch-state fact, not a production fact** — production serves
`673fb2a` and is clean, verified from live artifacts. **No merge, rebase or
branch update has been performed and none is ordered here.** Whoever resumes the
homepage pass must reconcile this branch with `main` **before** touching
`CarbonFooter.astro`, or a stale working copy will reintroduce the retired
claims into a file that is already clean in production.
