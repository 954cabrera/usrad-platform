# USRad Marketing Site — Claims Inventory

**Generated:** 2026-07-30
**Scope:** every `.astro` and `.jsx` file under `src/pages/` and `src/components/` (495 files scanned)
**Purpose:** inventory of quantified public claims and detection of internal contradictions.

> This document does **not** assess whether any claim is true. It records what the site
> asserts, where the assertion lives, which pages render it, and where the site
> contradicts itself. Verification against sources is a separate exercise.

---

## Scope and method

**What counts as a claim here:** text a visitor reads that contains a dollar figure,
percentage, count, time duration, ratio, or superlative ("first", "only", "nationwide",
"proven", "guaranteed", "largest", "fastest").

**Excluded from the table (deliberately):**

| Excluded | Why |
| --- | --- |
| Variable names, CSS values, Tailwind classes, SVG path data, viewport/config values, API params, CPT codes, phone numbers | Not visitor-facing text |
| `x`-prefixed pages (`xindex.astro`, `xemployer.astro`, `x1index.astro`, …), `*-BACKUP`, `*-OLD-*`, `_backup/` | Legacy/stale route files identified as dead in `docs/engineering/MARKETING-WEBSITE-ENGINEERING-REPORT.md` (L768, L806). **Update:** the 50 `x`-prefixed `.astro` routes were removed in `c2265af` and no longer resolve — see *Legacy files* below. `*-BACKUP` / `*-OLD-*` / `_backup/` files remain |
| Authenticated trees: `src/pages/dashboard/`, `patient-dashboard/`, `corporate-dashboard/`, `admin/`, `login/`, `auth/`, `providers/portal/`, `providers/onboarding/`, `patient-management/`, `patient-advocate/` and their components | Behind login; contents are mock/skeleton data, not public marketing assertions |
| Form dropdown option ranges ("500–1,000 employees", "100-500 scans/month", "1–3 months") | Input choices, not assertions |
| Clinical screening intervals in blog posts ("Pap smear every 3 years", "colonoscopy every 10 years", "arrive 15 minutes early") | Third-party medical guidance, not claims about USRad or its market |

**Orphaned components** — claim-bearing components imported by **no** live page. Their claims
are not rendered anywhere and are excluded from the table, but they are a latent risk if
re-imported:

`AboutVision`, `ClinicalTrustSection`, `CondensedProblemSolution`, `CondensedTrustIndicators`,
`CoreBenefits`, `FAQHome`, `FAQPreview`, `FoundersSection` (contains **"$400 Million+ in healthcare
savings"** — nowhere else on the site), `HeroPatientIntro`, `HeroSection.astro` (root, superseded by
`hero/HeroSection.astro`), `HomeTrustIndicators`, `HowItWorksSteps`, `MfgTabs`, `NetworkMap.astro`,
`NetworkMapPins`, `NetworkMapPinsCarbonV2`, `OurBusinessModel`, `PatientBookingFlow.jsx`,
`PromiseBanner`, `ProofSection`, `ProviderSearchInterface.jsx`, `RevenueFlywheel.jsx`,
`employer/PartnerMfgGrid`, `imaging/HeroImagingCenter`, `provider/Test.astro`,
`search/ProcedureSearchModal-v2`, `ui/Accordion`.

**Route note:** routes are written in full. `/blog/*` denotes individual blog posts.
Earlier revisions of this document used `/imaging-center` as shorthand for the imaging-center funnel;
that was never a real route and returned 404. All occurrences now use the live
`/imaging-center` path.

---

## Claims inventory

Sorted by claim value, descending (numeric magnitude of the primary figure, unit-agnostic, so
identical and near-identical values sit adjacent).

| Claim (verbatim) | File:line | Rendered on which pages | Shared component? (Y/N) |
| --- | --- | --- | --- |
| "$100B+" / "TAM" | `src/pages/investor.astro:140` | /investor | N |
| "$100B+ market serving 90 million underserved Americans" | `src/pages/investor.astro:69` | /investor | N |
| "$100B+" / "market opportunity with proven leadership" | `src/pages/investor.astro:427` | /investor | N |
| "Tap into a $100B+ market with massive untapped potential" | `src/pages/partner.astro:91` | /partner | N |
| "the $90+ billion imaging market" | `src/pages/imaging-center/model.astro:86` | /imaging-center/model | N |
| "$2.8B" / "Addressable Market" | `src/components/provider/priority-markets/MarketStats.astro:27` | /provider | N |
| "The $2–4B cash-pay market opportunity" | `src/components/provider/ExitModal.astro:82, 280` | /provider | N |
| "$246 million in verified savings — delivered across a national network" | `src/pages/about.astro:716` | /about | N |
| "A model that saved $246 million — now being deployed at national scale." | `src/pages/about.astro:48` | /about | N |
| "$246 Million" / "Patient savings delivered" | `src/components/SocialProofBar.astro:24` | / | N |
| "helped deliver over $246 million in patient savings" | `src/components/AboutSection.astro:12` | / | N |
| "generating roughly $246 million in documented savings" | `src/pages/blog/the-scan-that-never-happens.astro:300` | /blog/the-scan-that-never-happens | N |
| "$246M+" | `src/pages/about.astro:1152` | /about | N |
| "delivered $240 Million+ in volume" | `src/pages/imaging-center/index.astro:148, 325, 420, 704, 1229` | /imaging-center | N |
| "$240M+ volume delivered" | `src/pages/imaging-center/index.astro:63, 187, 619, 1279` | /imaging-center | N |
| "delivering $180M+ in imaging revenue over 10 years" | `src/pages/providers/join.astro:63` | /providers/join | N |
| "$180+ Million" | `src/pages/providers/join.astro:68, 411`, `src/pages/providers/verified.astro:685` | /providers/join, /providers/verified | N |
| "We delivered $180M+ to imaging centers through AnciCare" | `src/pages/provider/consultation.astro:194, 267` | /provider/consultation | N |
| "$180M+ Volume Delivered" | `src/components/provider/AnciCareStory.astro:152` | /provider | N |
| "$180M" | `src/components/provider/ProvenSuccess.astro:22` | /provider | N |
| "Delivered $160M+ in Volume" | `src/components/provider/TrustBar.astro:80` | /provider | N |
| "$160M+" / "Delivered in imaging volume" | `src/pages/provider/portal-tour.astro:1062` | /provider/portal-tour | N |
| "$151M" / "Productivity saved" | `src/pages/about.astro:927` | /about | N |
| "$95M" / "Medical savings" | `src/pages/about.astro:908` | /about | N |
| "$95M medical + $151M productivity" | `src/pages/about.astro:948` | /about | N |
| "Building Accessible Imaging for 90 million Americans." | `src/components/CarbonFooter.astro:166` | **All 49 CarbonLayout pages** | **Y (49)** |
| "90 million Americans who are uninsured or underinsured" | `src/pages/faq.astro:231` | /faq | N |
| "90 million uninsured and underinsured patients" | `src/pages/imaging-center/index.astro:159, 1295` | /imaging-center | N |
| "90 Million" | `src/pages/about.astro:590` | /about | N |
| "90 million Americans still need what we built." | `src/pages/about.astro:1157` | /about | N |
| "USRad is bringing diagnostic imaging to the 90 million Americans who need it most." | `src/pages/about.astro:1307` | /about | N |
| "90 million left behind" | `src/components/employer/AnciCareLegacy.astro:52, 85` | /employer | N |
| "accessible to 90 million Americans" | `src/pages/careers.astro:209`, `src/pages/partner.astro:30, 76` | /careers, /partner | N |
| "90M" / "Target Users" | `src/pages/investor.astro:148` | /investor | N |
| "90M+" / "People We Serve" | `src/pages/careers.astro:265` | /careers | N |
| "90M+" / "Underinsured Americans" | `src/components/provider/priority-markets/MarketStats.astro:15` | /provider | N |
| "90M+ target market actively acquired for you" | `src/pages/built-usrad.astro:333` | /built-usrad | N |
| "90M self-pay vs. limited workers' comp market" | `src/pages/investor.astro:1139` | /investor | N |
| "$20M in annual revenue" / "$20M+" / "Revenue Built" | `src/pages/investor.astro:223, 285, 985` | /investor | N |
| "$7M–$9M" (EBITDA multiple, USRad payor mix) | `src/components/provider/ExitValueSection.astro:116` | /provider | N |
| "$5.1M → $1.8M imaging spend" | `src/components/employer/EmployerCaseExample.astro:116, 213` | /employer | N |
| "$5M–$7M" (EBITDA multiple, standard payor mix) | `src/components/provider/ExitValueSection.astro:111` | /provider | N |
| "$3.3M saved" | `src/components/employer/EmployerCaseExample.astro:244` | /employer | N |
| "3.2 million productive work days recovered" | `src/pages/about.astro:966` | /about | N |
| "Average client saves $1.7M in year one (5,000 lives)" | `src/components/employer/ExecutiveFAQ.astro:185` | /employer | N |
| "$1,200,000" (ROI calc current spend) | `src/components/employer/ROICalculator.astro:153` | /employer | N |
| "$850,000" (ROI calc annual savings) | `src/components/employer/ROICalculator.astro:178, 386` | /employer | N |
| "A 1.5T MRI costs $800K–$2M" | `src/pages/provider/portal-tour.astro:946`, `src/pages/provider-how-it-works-1.astro:1015` | /provider/portal-tour, /provider-how-it-works-1 | N |
| "$646,000" / "$637,500" / "$204,000" / "$175,000" / "$136,000" / "$76,500" | `src/components/employer/ROICalculator.astro:204, 226, 195, 162, 239, 251` | /employer | N |
| "Up to $2M more" (exit value uplift) | `src/components/provider/ExitValueSection.astro:132` | /provider | N |
| "400,000+ patient visits generated for partners" | `src/pages/imaging-center/index.astro:360, 415, 532, 1018` | /imaging-center | N |
| "managed 400,000+ appointments" | `src/pages/imaging-center/index.astro:956` | /imaging-center | N |
| **"168,244"** / "Patients served across our prior imaging network" | `src/components/SocialProofBar.astro:18` | / | N |
| **"168,244"** / "People reached" | `src/pages/about.astro:279` | /about | N |
| **"168,224 Faster Recoveries"** | `src/pages/about.astro:882` | /about | N |
| **"168,224 people diagnosed in days, not weeks."** | `src/pages/about.astro:964` | /about | N |
| **"168,224 MRIs Performed"** | `src/pages/education/what-is-an-mri.astro:375` | /education/what-is-an-mri | N |
| **"served 168,224 patients"** | `src/components/provider/ProvenSuccess.astro:37` | /provider | N |
| "168,000 patients served across a national network" | `src/pages/about.astro:137, 234` | /about | N |
| "served 168,000 patients" | `src/pages/blog/the-scan-that-never-happens.astro:300` | /blog/the-scan-that-never-happens | N |
| "168,000+ claimants" | `src/components/employer/AnciCareLegacy.astro:95, 126`, `src/components/employer/CredibilityBar.astro:26`, `src/components/employer/FinalCTA.astro:101` | /employer | N |
| "168,000+ diagnostic imaging cases" | `src/components/employer/DualSolution.astro:60` | /employer | N |
| "168,000+ imaging services delivered" | `src/components/employer/ExecutiveFAQ.astro:129` | /employer | N |
| "We've done this before. 168,000+ times." | `src/components/employer/Implementation.astro:130` | /employer | N |
| "168,000+ imaging cases managed" | `src/pages/employer/schedule.astro:171, 189`, `src/pages/employer/implementation-guide.astro:101, 328` | /employer/schedule, /employer/implementation-guide | N |
| "168,000+ cases managed" | `src/components/EmployerConsultationForm.astro:343` | /employer/schedule | N |
| "168,000+ patients" | `src/components/provider/AnciCareStory.astro:155` | /provider | N |
| "delivered 168,000+ patient visits" | `src/components/provider/FAQSection.astro:96` | /provider | N |
| "delivered over 168,000 appointments" | `src/pages/contact.astro:707` | /contact | N |
| "access to 50,000+ self-pay patients" | `src/pages/imaging-center/calculator.astro:19, 263` | /imaging-center/calculator | N |
| "helped over 50,000 patients save millions" | `src/pages/blog/cost-saving-tips.astro:1099` | /blog/cost-saving-tips | N |
| "$45,000+" (untreated-injury total cost) | `src/components/employer/CostAnalysis.astro:156` | /employer | N |
| "43,600+ Medicare pricing records across 113 localities" | `src/components/provider/MarketScopeShowcase.astro:382, 463` | /provider | N |
| "43,600+ procedure-market combinations" | `src/pages/investor.astro:682` | /investor | N |
| "$37,500/month" (unused-capacity revenue) | `src/components/provider/ScannerUtilization.astro:139` | /provider | N |
| "magnetic fields 30,000 times stronger than Earth's" | `src/pages/education/what-is-an-mri.astro:134` | /education/what-is-an-mri | N |
| **"27,000+ ACR-accredited facilities nationwide"** | `src/pages/how-it-works.astro:280, 903` | /how-it-works | N |
| **"26,900+"** / "ACR-accredited centers in our national dataset" | `src/pages/provider/network-map.astro:168` | /provider/network-map | N |
| "15,000+" / "Facilities Analyzed" | `src/components/provider/MarketScopeShowcase.astro:473` | /provider | N |
| "roughly 15,000 accredited imaging centers in the United States" | `src/pages/blog/the-scan-that-never-happens.astro:255` | /blog/the-scan-that-never-happens | N |
| "$11,250" / "$135,000" (calculator revenue projection) | `src/pages/imaging-center/calculator.astro:228, 234, 240` | /imaging-center/calculator | N |
| "$6,500 average [deductible]" | `src/components/employer/AnciCareLegacy.astro:45`, `src/components/employer/IndustryData.astro:48`, `src/components/employer/EmployerCaseExample.astro:139` | /employer | N |
| "a $7,500 family deductible" | `src/pages/blog/the-scan-that-never-happens.astro:189` | /blog/the-scan-that-never-happens | N |
| "$5,000+ [deductible]" | `src/pages/blog/uninsured-imaging-guide.astro:405` | /blog/uninsured-imaging-guide | N |
| "5,000-employee workforce" / "(5,000 lives)" | `src/components/employer/ROICalculator.astro:390`, `src/components/employer/ExecutiveFAQ.astro:186` | /employer | N |
| "4,800 Employees" / "4,800-employee regional logistics company" | `src/components/employer/EmployerCaseExample.astro:69`, `src/pages/employer/implementation-guide.astro:374` | /employer, /employer/implementation-guide | N |
| "3,000+" / "Radiologists" | `src/pages/investor.astro:293` | /investor | N |
| "The local hospital quotes $3,400" | `src/pages/blog/the-scan-that-never-happens.astro:184` | /blog/the-scan-that-never-happens | N |
| "$3,400" (employer case, hospital MRI) | `src/components/employer/EmployerCaseExample.astro:107` | /employer | N |
| **"Hospitals charge $3,200. USRad members pay $260."** | `src/components/PricingSection.astro:57, 72, 80` | / | N |
| **"$260 MRIs (not $3,200)"** | `src/components/employer/EmployerHero.astro:68` | /employer | N |
| **"$3,200"** / "Average Hospital MRI · Hospital outpatient billing" | `src/components/employer/ROIStatPanel.astro:30` | /employer | N |
| **"$3,200"** (hospital cost timeline) | `src/components/employer/CostAnalysis.astro:74, 128` | /employer | N |
| **"$3,200 Average Cost"** / "$260 vs $3,200" | `src/pages/education/what-is-an-mri.astro:299, 345, 703` | /education/what-is-an-mri | N |
| **"$3,200 for a plain MRI"** (Pre-AnciCare / 1990s panel) | `src/pages/about.astro:785` | /about | N |
| "Hospital outpatient $3,200 · PPO network $1,800 · Freestanding center $900 · USRad $420" | `src/pages/employer/implementation-guide.astro:379` | /employer/implementation-guide | N |
| "Bar chart: Hospital $3,200 → USRad $420" | `src/pages/employer/implementation-guide.astro:74` | /employer/implementation-guide | N |
| "$3,200" (uninsured price table, MRI) | `src/pages/blog/uninsured-imaging-guide.astro:303` | /blog/uninsured-imaging-guide | N |
| "~$800–$3,200 per scan" (hospital) | `src/pages/how-it-works.astro:603` | /how-it-works | N |
| "A $3,000 hospital MRI or a $260 USRad scan" | `src/pages/blog/real-cost-of-mri.astro:74, 116, 139, 269` | /blog/real-cost-of-mri | N |
| "$3,000" (hospital MRI, uninsured guide) | `src/pages/blog/uninsured-imaging-guide.astro:182, 724` | /blog/uninsured-imaging-guide | N |
| "The hospital quoted me $2,800 … I saved over $2,000" | `src/pages/blog/price-transparency-healthcare.astro:971` | /blog/price-transparency-healthcare | N |
| "The quoted breast MRI is $2,800 out of pocket" | `src/pages/blog/the-scan-that-never-happens.astro:190` | /blog/the-scan-that-never-happens | N |
| "$2,500 at a hospital. Same scan, 84% savings." | `src/pages/blog/price-transparency-healthcare.astro:507` | /blog/price-transparency-healthcare | N |
| "$2,400" / "Your Current Cost · Average Cost Per Scan" | `src/components/employer/ROICalculator.astro:108` | /employer | N |
| "Real Patient Story: Ashley's $2,373 Savings" | `src/pages/blog/real-cost-of-mri.astro:334, 391` | /blog/real-cost-of-mri | N |
| **"1,500+ locations nationwide"** | `src/pages/index.astro:66` | / | N |
| **"1,500"** / "Premium Centers Joining" | `src/components/NetworkMapPinsCarbon.astro:284` | / | N |
| "1,500+ centers" | `src/components/hero/SearchLoadingOverlay.astro:239` | / | N |
| "1,236%" growth rate / Inc. 500 | `src/pages/about.astro:1148`, `src/pages/imaging-center/experience.astro:138, 508, 514` | /about, /imaging-center/experience | N |
| "1,200+ imaging centers" (AnciCare network size) | `src/components/SocialProofBar.astro:30`, `src/components/AboutSection.astro:12` | / | N |
| "1,200+" / "Imaging centers in our historical network" | `src/pages/provider/portal-tour.astro:211, 1060` | /provider/portal-tour | N |
| "1,200+ Centers Successfully Recruited" | `src/components/provider/TrustBar.astro:78` | /provider | N |
| "From the team that built a 1,200+ center network" | `src/components/provider/HeroSection.astro:92` | /provider | N |
| "1,200+ imaging centers trusted us then" | `src/components/provider/GuaranteeSection.astro:135` | /provider | N |
| "1,200+" | `src/components/provider/ProvenSuccess.astro:17` | /provider | N |
| "more than 1,200 contracted imaging centers" | `src/pages/blog/the-scan-that-never-happens.astro:300` | /blog/the-scan-that-never-happens | N |
| "across 1,200+ facilities" | `src/pages/about.astro:1017, 269` | /about | N |
| "recruited 1,200+ imaging centers (1994-2002)" | `src/pages/imaging-center/index.astro:63, 148, 176, 248, 323, 410, 470, 690, 698, 769, 833, 895, 1073, 1090, 1109, 1158, 1174, 1229, 1274` | /imaging-center | N |
| "growing from concept to 1,200+ centers" | `src/pages/imaging-center/experience.astro:116, 128, 196, 542, 549, 646` | /imaging-center/experience | N |
| "We've implemented this exact model 1,200+ times through AnciCare" | `src/components/employer/ExecutiveFAQ.astro:76` | /employer | N |
| "Built Before. Scaled to 1,200 Centers." / "1,200 imaging centers" | `src/pages/investor.astro:56, 221, 289` | /investor | N |
| "Facility fee: $1,200" / "$1,200" | `src/pages/blog/real-cost-of-mri.astro:242, 274` | /blog/real-cost-of-mri | N |
| "average hospital MRI is over $1,100, compared to under $500 at independent centers" | `src/pages/blog/real-cost-of-mri.astro:221` | /blog/real-cost-of-mri | N |
| **"1,000+"** / "Partner Centers" | `src/pages/careers.astro:277`, `src/pages/investor.astro:164` | /careers, /investor | N |
| "PPO network $1,800 · Freestanding center $900" | `src/pages/employer/implementation-guide.astro:379` | /employer/implementation-guide | N |
| "Average facility fee: $800-$1,500 per MRI" | `src/pages/blog/real-cost-of-mri.astro:194` | /blog/real-cost-of-mri | N |
| "You save $876" / "$876 (73% off)" | `src/components/PatientBookingFlow.jsx:302, 1013` | *(orphaned — not rendered)* | N |
| "+$847" (per-employee cost) | `src/components/employer/IndustryData.astro:98` | /employer | N |
| "$680 a month for a silver plan" | `src/pages/blog/the-scan-that-never-happens.astro:195` | /blog/the-scan-that-never-happens | N |
| "520 MRI centers mapped" | `src/components/provider/MarketOpportunityTeaser.astro:284` | /provider | N |
| **"$640"** / "USRad Network MRI · Independent accredited centers" | `src/components/employer/ROIStatPanel.astro:49` | /employer | N |
| "$600" / "USRad Rate" (calculator max) | `src/pages/imaging-center/calculator.astro:97` | /imaging-center/calculator | N |
| "$500" (insurance estimate vs $2,500 actual) | `src/pages/blog/cost-saving-tips.astro:685` | /blog/cost-saving-tips | N |
| **"$475 transparent pricing"** (AnciCare-era solution panel) | `src/pages/about.astro:845` | /about | N |
| **"USRad $420"** | `src/pages/employer/implementation-guide.astro:74, 379`, `src/components/employer/EmployerCaseExample.astro:204` | /employer, /employer/implementation-guide | N |
| "USRad: $395 for knee MRI" | `src/pages/blog/cost-saving-tips.astro:263` | /blog/cost-saving-tips | N |
| "Avg. net margin $375/scan" | `src/pages/provider/portal-tour.astro:1024` | /provider/portal-tour | N |
| "$375" (per-scan disbursement) | `src/components/provider/ProviderBrief.astro:69`, `src/components/provider/ScannerUtilization.astro:134` | /provider | N |
| "$371" / "184% of Medicare" (workers' comp rate) | `src/components/provider/MarketScopeShowcase.astro:215` | /provider | N |
| **"$350"** / "USRad Network" (ROI calculator) | `src/components/employer/ROICalculator.astro:123` | /employer | N |
| "Imaging costs up 312% while quality stayed flat" | `src/components/employer/AnciCareLegacy.astro:59` | /employer | N |
| "$300" / "Guaranteed payment per scan" | `src/pages/imaging-center/calculator.astro:103, 131, 311, 347, 364` | /imaging-center/calculator | N |
| "Avg. contracted rate ~$300/scan" | `src/pages/provider-how-it-works-1.astro:1093` | /provider-how-it-works-1 | N |
| "$277-$429" (market opportunity range) | `src/components/provider/MarketScopeShowcase.astro:224` | /provider | N |
| "A center priced at $267 in a $310 market … the same rate in a $250 market" | `src/pages/provider/smartmatch.astro:348` | /provider/smartmatch | N |
| **"starting at $260"** | `src/components/PricingSection.astro:72`, `src/pages/about.astro:539`, `src/pages/contact.astro:550`, `src/pages/education/what-is-an-mri.astro:444, 703`, `src/pages/blog/real-cost-of-mri.astro:118, 541, 964`, `src/pages/blog/uninsured-imaging-guide.astro:447, 851, 960`, `src/pages/blog/health-tips.astro:925`, `src/components/employer/CostAnalysis.astro:179`, `src/components/employer/DualSolution.astro:175` | /, /about, /contact, /education/what-is-an-mri, /employer, 3 blog posts | N |
| "$260–$650, which is up to 80% less than hospital prices" | `src/pages/faq.astro:197` | /faq | N |
| "~$200–$400 all-inclusive" (USRad) | `src/pages/how-it-works.astro:638` | /how-it-works | N |
| "$201.65" / "100% Medicare Rate" | `src/components/provider/MarketScopeShowcase.astro:206, 208` | /provider | N |
| "CT scans from $199" / "Ultrasounds from $149" | `src/pages/blog/uninsured-imaging-guide.astro:852, 853` | /blog/uninsured-imaging-guide | N |
| "~$195" (net per scan after costs) | `src/pages/imaging-center/calculator.astro:328` | /imaging-center/calculator | N |
| "Screening mammograms from $99" | `src/pages/blog/preventive-care-checklist.astro:560` | /blog/preventive-care-checklist | N |
| "113" / "Geographic Localities" | `src/components/provider/MarketScopeShowcase.astro:465` | /provider | N |
| "100% payment collection" / "100% collection rate" | `src/pages/imaging-center/index.astro:610, 619, 1229`, `src/pages/imaging-center/calculator.astro:32, 351`, `src/components/provider/priority-markets/MarketStats.astro:47` | /imaging-center, /imaging-center/calculator, /provider | N |
| "100% upfront collection guaranteed" | `src/pages/built-usrad.astro:345` | /built-usrad | N |
| "100%" / "Contracted rate paid" | `src/pages/provider/portal-tour.astro:748`, `src/pages/provider-how-it-works-1.astro:702` | /provider/portal-tour, /provider-how-it-works-1 | N |
| "100% Money-Back Guarantee" | `src/pages/patient-promise.astro:83` | /patient-promise | N |
| "100% refund" (cancel 24+ hrs before) | `src/pages/faq.astro:468`, `src/pages/patient-promise.astro:709, 804` | /faq, /patient-promise | N |
| "100% Free" / "100% FREE to Join" | `src/components/provider/ConsultationCTA.astro:57`, `src/pages/provider/faq.astro:723` | /provider, /provider/faq | N |
| "100% Board-Certified" | `src/components/CoreBenefits.astro:107` | *(orphaned — not rendered)* | N |
| "99.8%" / "Issue resolution" | `src/pages/contact.astro:50`, `src/components/ContactHero.astro:176`, `src/pages/about.astro:1210` | /contact, /about | N |
| **"98% satisfaction across 168,000+ imaging services"** | `src/components/employer/ExecutiveFAQ.astro:129` | /employer | N |
| "97% Cost Reduction" | `src/components/employer/CostAnalysis.astro:226` | /employer | N |
| **"96% show rate across our network"** | `src/components/provider/FAQSection.astro:369, 379`, `src/components/provider/GuaranteeSection.astro:62`, `src/components/provider/ScannerUtilization.astro:414`, `src/pages/provider/faq.astro:2721, 2729`, `src/pages/built-usrad.astro:339` | /provider, /provider/faq, /built-usrad | N |
| "96% patient show rate" / "Proven 96% success rate" / "96% approval rate" | `src/pages/imaging-center/index.astro:277, 378, 576, 786, 850, 1229` | /imaging-center | N |
| "95% of questions are answered in the FAQ below" | `src/components/provider/ConsultationCTA.astro:313` | /provider | N |
| "(90% off hospital price!)" | `src/pages/blog/cost-saving-tips.astro:266` | /blog/cost-saving-tips | N |
| "~85%" (utilization assumption) | `src/pages/imaging-center/calculator.astro:214, 315` | /imaging-center/calculator | N |
| "84% savings" / "84% less" | `src/pages/blog/price-transparency-healthcare.astro:507`, `src/pages/blog/uninsured-imaging-guide.astro:878` | /blog/price-transparency-healthcare, /blog/uninsured-imaging-guide | N |
| **"80%"** / "Cost Savings" | `src/pages/careers.astro:271` | /careers | N |
| **"80%"** / "Cost Reduction" | `src/pages/investor.astro:156` | /investor | N |
| "up to 80% less than hospital prices" | `src/pages/faq.astro:197`, `src/pages/blog/health-tips.astro:925` | /faq, /blog/health-tips | N |
| "Up to 80% Cheaper" | `src/pages/blog/uninsured-imaging-guide.astro:636` | /blog/uninsured-imaging-guide | N |
| "medical billing mistakes happen in 80% of hospital bills" | `src/pages/blog/price-transparency-healthcare.astro:845` | /blog/price-transparency-healthcare | N |
| "over 80% of people have some 'degenerative disc disease' on MRI" | `src/pages/blog/understanding-mri-results.astro:790` | /blog/understanding-mri-results | N |
| "75% refund (25% no-show fee applies)" | `src/pages/faq.astro:475, 523`, `src/pages/patient-promise.astro:720, 747, 812` | /faq, /patient-promise | N |
| "A market 75× larger than before." | `src/pages/about.astro:1231` | /about | N |
| "73% increase in necessary imaging, 92% satisfaction score" | `src/components/employer/DualSolution.astro:227` | /employer | N |
| "+73%" (imaging utilization) | `src/components/employer/EmployerCaseExample.astro:231` | /employer | N |
| "73% [of consumers want price info]" | `src/pages/blog/price-transparency-healthcare.astro:676` | /blog/price-transparency-healthcare | N |
| **"72-hour scheduling"** (AnciCare "One Step Service") | `src/pages/co-founder-d.astro:146, 183, 429` | /co-founder-d | N |
| "71% cost reduction" | `src/components/employer/ROICalculator.astro:184` | /employer | N |
| **"70% Less"** (hero headline) | `src/components/hero/HeroHeadline.astro:16` | / | N |
| "Save up to 70% on medical imaging" | `src/components/NewsletterPopup.astro:86` | **12 blog pages** | **Y (12)** |
| "Join thousands who've saved up to 70% on medical imaging" | `src/components/CarbonFooter.astro:54` | **All 49 CarbonLayout pages** | **Y (49)** |
| "Save up to 70%" | `src/components/hero/SearchLoadingOverlay.astro:226` | / | N |
| "70%" / "average savings" | `src/pages/how-it-works.astro:1230` | /how-it-works | N |
| "Quality Imaging for 70% Less" / "for 70% less" | `src/components/BlogPreviewSection.astro:6`, `src/pages/blog.astro:32`, `src/pages/blog/uninsured-imaging-guide.astro:78, 267` | /, /blog, /blog/uninsured-imaging-guide | N |
| "70-80% cheaper at USRad compared to hospitals" | `src/pages/blog/preventive-care-checklist.astro:1115` | /blog/preventive-care-checklist | N |
| "Colonoscopy reduces colorectal cancer deaths by 68%" | `src/pages/blog/preventive-care-checklist.astro:717` | /blog/preventive-care-checklist | N |
| "67% avg. savings" | `src/components/HowItWorksSection.astro:98` | / | N |
| "67% skip necessary imaging due to high deductibles" | `src/components/employer/EmployerHero.astro:46`, `src/components/employer/IndustryData.astro:32`, `src/components/employer/EmployerCaseExample.astro:138` | /employer | N |
| "why 65–75% of independent programs struggle in year one" | `src/components/provider/ExitModal.astro:82, 284` | /provider | N |
| **"65%"** / "Average Unfilled Appointment Slots" | `src/components/imaging/NetworkMap.astro:33` | /imaging-center | N |
| "63% reduction year one" | `src/components/employer/EmployerCaseExample.astro:214` | /employer | N |
| "typically 60–70% less than hospital-based imaging" | `src/components/WhyLessCostSection.astro:47` | / | N |
| "At 60% utilization you're paying full carrying costs for 40% downtime" | `src/pages/provider/portal-tour.astro:946`, `src/pages/provider-how-it-works-1.astro:1015` | /provider/portal-tour, /provider-how-it-works-1 | N |
| "Nearly 60% of people over 50 without knee pain have meniscal tears" | `src/pages/blog/understanding-mri-results.astro:837` | /blog/understanding-mri-results | N |
| "Book your appointment in under 60 seconds" | `src/pages/education/what-is-an-mri.astro:444` | /education/what-is-an-mri | N |
| "60-second booking, 10-day payments" / "10 days → 60 sec" | `src/components/provider/AnciCareStory.astro:208, 270` | /provider | N |
| "finds the optimal match in under 60 seconds" | `src/components/provider/priority-markets/NetworkSyncSteps.astro:37` | /provider | N |
| "Nationwide launch. 60-second booking." | `src/pages/about.astro:580` | /about | N |
| **"53%"** / "Typical utilization · 8 scans/day" | `src/components/provider/ScannerUtilization.astro:89` | /provider | N |
| "52% cost reduction" | `src/pages/about.astro:910` | /about | N |
| "50%+ savings. Next-day imaging." (AnciCare era) | `src/pages/about.astro:243` | /about | N |
| "reduces imaging costs 50–70%" | `src/components/EmployerConsultationForm.astro:14, 350`, `src/pages/employer/schedule.astro:49, 76, 224, 247, 289` | /employer/schedule | N |
| "50-70% imaging cost reduction" | `src/components/employer/DualSolution.astro:134`, `src/components/employer/ExecutiveFAQ.astro:165`, `src/components/employer/FinalCTA.astro:37`, `src/components/employer/AnciCareLegacy.astro:135` | /employer | N |
| "reduce imaging costs by 50–70%" | `src/pages/employer/implementation-guide.astro:59, 327` | /employer/implementation-guide | N |
| "independent centers are often 50-70% cheaper than hospitals" / "50-70% Less" | `src/pages/blog/price-transparency-healthcare.astro:777, 938` | /blog/price-transparency-healthcare | N |
| "50-80% less" / "Save 50-80% vs hospitals" | `src/pages/blog/uninsured-imaging-guide.astro:147, 158, 854`, `src/pages/blog/real-cost-of-mri.astro:786` | /blog/uninsured-imaging-guide, /blog/real-cost-of-mri | N |
| "50" / "States — accepting applications nationwide" | `src/pages/provider/network-map.astro:172` | /provider/network-map | N |
| "licensed in all 50 states" | `src/components/employer/ExecutiveFAQ.astro:278` | /employer | N |
| **"Most appointments available within 48 hours"** | `src/components/education/WhatToExpect_SplitScreen.astro:319` | /education/what-is-an-mri | N |
| "In Under 48 Hours." / "48 Hours with USRad" | `src/pages/education/what-is-an-mri.astro:90, 321` | /education/what-is-an-mri | N |
| "48-hour booking" | `src/components/PricingSection.astro:101` | / | N |
| "48-hour imaging appointments accelerate diagnosis" / "48-hr appointments accelerate RTW" | `src/components/employer/DualSolution.astro:75`, `src/components/employer/EmployerCaseExample.astro:223`, `src/components/employer/EmployerHero.astro:81` | /employer | N |
| "Scheduled within 48 hours" | `src/pages/blog/real-cost-of-mri.astro:382, 394` | /blog/real-cost-of-mri | N |
| **"48-72"** / "Hour Appointment Goal" | `src/components/NetworkMapPinsCarbon.astro:308` | / | N |
| **"Most appointments within 48 - 72 hours"** | `src/pages/contact.astro:596` | /contact | N |
| "Real-time matching in 47 seconds" / "Average end-to-end process time: 47 seconds" | `src/components/provider/AnciCareStory.astro:189`, `src/components/provider/priority-markets/NetworkSyncSteps.astro:70` | /provider | N |
| **"47%"** / "Unused capacity · 7 scans/day" | `src/components/provider/ScannerUtilization.astro:108` | /provider | N |
| "47 days" → "29 days" → "18 days" (return-to-work) | `src/components/employer/EmployerCaseExample.astro:127, 222, 250` | /employer | N |
| "Insurance billing: 45–90 day cycles" | `src/pages/provider/portal-tour.astro:966`, `src/pages/provider-how-it-works-1.astro:1035` | /provider/portal-tour, /provider-how-it-works-1 | N |
| "Month 3: 40-60% total imaging cost reduction visible" | `src/components/employer/ExecutiveFAQ.astro:172` | /employer | N |
| **"40%"** / "More Scans Per Month" | `src/components/provider/priority-markets/MarketStats.astro:41` | /provider | N |
| "typically see 20-40% volume increases" | `src/pages/imaging-center/index.astro:265, 525, 1036, 1192`, `src/components/provider/FAQSection.astro:96` | /imaging-center, /provider | N |
| "Up to 37% of patients experience anxiety before an MRI" | `src/pages/blog/managing-mri-anxiety.astro:133, 145` | /blog/managing-mri-anxiety | N |
| **"35%"** / "Typical Slot Utilization" | `src/components/provider/priority-markets/MarketStats.astro:21`, `src/components/imaging/NetworkMap.astro:28` | /provider, /imaging-center | N |
| "Under 30 seconds" / "30 seconds to get matched" | `src/components/HowItWorksSection.astro:58, 233`, `src/pages/how-it-works.astro:194` | /, /how-it-works | N |
| "30 Years" / "Healthcare experience" | `src/pages/contact.astro:38` | /contact | N |
| "30 years of network-building" / "30 years of proven success" | `src/pages/about.astro:533`, `src/components/provider/AnciCareStory.astro:306` | /about, /provider | N |
| "30 years of experience helping patients save" | `src/components/BlogPreviewSection.astro:44` | / | N |
| "what we've known for 30 years" | `src/components/employer/IndustryData.astro:23` | /employer | N |
| "30+ Years in Healthcare" / "30+ years of healthcare innovation" | `src/pages/investor.astro:266`, `src/pages/co-founder-m.astro:344`, `src/pages/partner.astro:61` | /investor, /co-founder-m, /partner | N |
| "Three decades of putting patients first" / "30+" | `src/pages/co-founder-d.astro:400, 412` | /co-founder-d | N |
| "Go Live in 30 Days" / "30-day implementation" | `src/components/employer/Implementation.astro:17`, `src/components/employer/ExecutiveFAQ.astro:62`, `src/components/employer/FinalCTA.astro:43`, `src/components/EmployerConsultationForm.astro:305` | /employer, /employer/schedule | N |
| "30-minute briefing with USRad founder Michael Cabrera" | `src/components/employer/EmployerHero.astro:133`, `src/components/employer/ROICalculator.astro:360`, `src/pages/employer/schedule.astro:224` | /employer, /employer/schedule | N |
| "Patients who price-shop save an average of 30%" | `src/pages/blog/price-transparency-healthcare.astro:656, 660` | /blog/price-transparency-healthcare | N |
| "costs rise 30% slower than opaque markets" | `src/pages/blog/price-transparency-healthcare.astro:575` | /blog/price-transparency-healthcare | N |
| "30-70% below hospital rates" / "30-70% less" | `src/pages/imaging-center/model.astro:356, 480` | /imaging-center/model | N |
| "30-80%" (investor savings range) | `src/pages/investor.astro:459` | /investor | N |
| "30-40% of people with NO back pain have disc herniations" | `src/pages/blog/understanding-mri-results.astro:814` | /blog/understanding-mri-results | N |
| "Prices vary by 300-400% for the same scan" | `src/pages/blog/cost-saving-tips.astro:133`, `src/pages/blog/mri-basics.astro:994` | /blog/cost-saving-tips, /blog/mri-basics | N |
| "Complete your account setup (takes 5 minutes)" / "Takes less than 5 minutes" | `src/components/ProviderConsultationForm.astro:351`, `src/pages/providers/join.astro:378`, `src/components/provider/NetworkBuilding.astro:95` | /provider/consultation, /providers/join, /provider | N |
| "patients save 20-40% on average when they compare" | `src/pages/blog/price-transparency-healthcare.astro:502` | /blog/price-transparency-healthcare | N |
| "many offer 20-40% discounts if you're paying cash upfront" | `src/pages/blog/uninsured-imaging-guide.astro:581` | /blog/uninsured-imaging-guide | N |
| "20 procedures available nationwide" | `src/components/BrowseAllModal.astro:271` | / | N |
| **"~20 minutes"** (provider application) | `src/components/provider/HowItWorks.astro:83, 141` | /provider | N |
| **"about 10 minutes"** / "Apply · ~10 minutes online" | `src/components/provider/ConsultationCTA.astro:197`, `src/pages/provider/portal-tour.astro:311`, `src/pages/provider-how-it-works-1.astro:270` | /provider, /provider/portal-tour, /provider-how-it-works-1 | N |
| **"Apply · Takes 5 minutes"** / "Step 1 in under 8 minutes" | `src/pages/provider-how-it-works.astro:241, 270` | /provider-how-it-works | N |
| **"about 15 minutes"** (sign everything online) | `src/components/provider/FAQSection.astro:45` | /provider | N |
| "Submit network credentialing application (15 minutes)" | `src/pages/imaging-center/implementation.astro:273` | /imaging-center/implementation | N |
| "Complete our online application (5 minutes)" | `src/pages/imaging-center/faq.astro:255` | /imaging-center/faq | N |
| "in just 20 minutes" | `src/pages/provider/faq.astro:413` | /provider/faq | N |
| "20-45 minutes" (scan duration) | `src/components/education/WhatToExpect_SplitScreen.astro:92`, `src/pages/how-it-works.astro:414`, `src/pages/education/what-is-an-mri.astro:687` | /education/what-is-an-mri, /how-it-works | N |
| "Most MRI scans take 15-45 minutes" | `src/pages/faq.astro:856` | /faq | N |
| "18+ days faster return-to-work" / "+18 days" | `src/components/employer/DualSolution.astro:134`, `src/components/employer/CostAnalysis.astro:44`, `src/components/employer/IndustryData.astro:108` | /employer | N |
| "18-day faster RTW" | `src/pages/employer/implementation-guide.astro:73, 374` | /employer/implementation-guide | N |
| "Hospital prices dropped 18% in markets with strong price transparency" | `src/pages/blog/price-transparency-healthcare.astro:686, 690` | /blog/price-transparency-healthcare | N |
| **"payment within 15 days"** | `src/pages/imaging-center/benefits.astro:191`, `src/pages/imaging-center/faq.astro:536, 690`, `src/pages/imaging-center/index.astro:610`, `src/pages/imaging-center/model.astro:765` | /imaging-center/benefits, /imaging-center/faq, /imaging-center, /imaging-center/model | N |
| "15 scans/day" (full capacity) | `src/components/provider/ScannerUtilization.astro:62` | /provider | N |
| "no-show rate is typically below 5% … industry average of 15-20%" | `src/pages/provider/faq.astro:1825` | /provider/faq | N |
| **"14 Days Average Wait"** (hospital, today) | `src/pages/education/what-is-an-mri.astro:278` | /education/what-is-an-mri | N |
| **"14 Days of Waiting"** (Pre-AnciCare, 1990s) | `src/pages/about.astro:752` | /about | N |
| "back to normal life 12 days sooner" | `src/pages/about.astro:968` | /about | N |
| **"Get Paid in 10 Days."** / "Guaranteed payment in 10 days" | `src/components/provider/HeroSection.astro:50`, `src/components/provider/HowItWorks.astro:331`, `src/components/provider/ConsultationCTA.astro:73`, `src/components/provider/AssignmentFlowDiagram.astro:393`, `src/components/provider/MarketScopeShowcase.astro:436, 440`, `src/components/provider/priority-markets/MarketStats.astro:51` | /provider | N |
| "Guaranteed disbursement within 10 business days" | `src/pages/provider/portal-tour.astro:135, 208, 1061, 1139`, `src/pages/provider-how-it-works-1.astro:109, 178, 1170`, `src/pages/provider-how-it-works.astro:423` | /provider/portal-tour, /provider-how-it-works-1, /provider-how-it-works | N |
| "Disbursement in 10 days" | `src/pages/provider/consultation.astro:86`, `src/components/ProviderConsultationForm.astro:172` | /provider/consultation | N |
| "pays providers on a 10-day cycle" / "Provider paid on day 10" | `src/pages/investor.astro:647, 692, 1170, 1176, 1111` | /investor | N |
| "10-day guarantee, every time" | `src/pages/built-usrad.astro:351` | /built-usrad | N |
| "10 day scheduling, 90-day payments" (pre-AnciCare) | `src/components/provider/AnciCareStory.astro:105` | /provider | N |
| "you wait 60-90 days" (traditional networks) | `src/pages/provider/faq.astro:1148` | /provider/faq | N |
| "10 years" (AnciCare duration) | `src/pages/providers/join.astro:63` | /providers/join | N |
| "nearly a decade with AnciCare" | `src/components/provider/GuaranteeSection.astro:135` | /provider | N |
| "successful for 8 years" | `src/pages/imaging-center/index.astro:569` | /imaging-center | N |
| "(1994-2002)" | `src/pages/imaging-center/index.astro:63, 323, 375` | /imaging-center | N |
| "10 years of imaging center partnerships" | `src/components/ProviderSearchSection.jsx:10` | /search-results | N |
| "10 States Opening 2026" | `src/components/NetworkMapPinsCarbon.astro:296` | / | N |
| "10–15% or more of your overall volume" | `src/components/provider/ExitValueSection.astro:57` | /provider | N |
| "10x scale" / "10× scale" | `src/pages/investor.astro:314, 1080` | /investor | N |
| "5–7x EBITDA" | `src/components/provider/ExitValueSection.astro:38` | /provider | N |
| "About 5% of patients stop mid-scan … approximately 80% successfully complete" | `src/pages/blog/managing-mri-anxiety.astro:982` | /blog/managing-mri-anxiety | N |
| "No-show rates … typically less than 5%" | `src/pages/imaging-center/faq.astro:838` | /imaging-center/faq | N |
| "Claustrophobia affects about 5-10% of the population" | `src/pages/blog/managing-mri-anxiety.astro:133` | /blog/managing-mri-anxiety | N |
| "4.9★" / "Average patient satisfaction" | `src/components/SocialProofBar.astro:36` | / | N |
| "4.9★" / "Customer rating" | `src/pages/contact.astro:56` | /contact | N |
| "4.9★" | `src/pages/education/what-is-an-mri.astro:416` | /education/what-is-an-mri | N |
| **"Within 4 hours"** (USRad coordination) | `src/components/HowItWorksSection.astro:190`, `src/pages/how-it-works.astro:402, 1070, 1231` | /, /how-it-works | N |
| "advanced 3T scanners" | `src/pages/faq.astro:1372` | /faq | N |
| **"3–6 wks"** / "Average credentialing window to go live" | `src/pages/provider/network-map.astro:180` | /provider/network-map | N |
| **"2-3 weeks"** (credentialing / time to first patient) | `src/components/provider/FAQSection.astro:45, 63`, `src/components/provider/HowItWorks.astro:239`, `src/pages/provider/portal-tour.astro:214, 402, 1094, 1141`, `src/pages/provider-how-it-works-1.astro:181, 359, 1135, 1172`, `src/pages/provider/consultation.astro:129`, `src/pages/imaging-center/index.astro:769, 778, 1065, 1174`, `src/pages/imaging-center/faq.astro:267`, `src/pages/imaging-center/implementation.astro:173, 871` | /provider, /provider/portal-tour, /provider-how-it-works-1, /provider/consultation, /imaging-center, /imaging-center/faq, /imaging-center/implementation | N |
| "2-3 business days" (application review) | `src/pages/imaging-center/index.astro:850` | /imaging-center | N |
| "<2 hour response guaranteed" / "<2hrs · Response guarantee" | `src/components/ContactHero.astro:45, 162`, `src/pages/contact.astro:44, 140` | /contact | N |
| "We'll respond within 2 hours during business hours" | `src/pages/contact.astro:204, 370, 1110` | /contact | N |
| "2-3 minute response time" (live chat) | `src/pages/contact.astro:173` | /contact | N |
| "Typically less than 2 minute wait time" | `src/pages/imaging-center/support.astro:334` | /imaging-center/support | N |
| "Email support with responses within 2 hours" | `src/pages/imaging-center/faq.astro:1053`, `src/pages/imaging-center/support.astro:282, 460, 861` | /imaging-center/faq, /imaging-center/support | N |
| "Email support responds within 1 hour during business hours" | `src/pages/provider/faq.astro:2406` | /provider/faq | N |
| "sign in under 2 minutes" (DocuSeal) | `src/pages/provider/portal-tour.astro:347`, `src/pages/provider-how-it-works-1.astro:304` | /provider/portal-tour, /provider-how-it-works-1 | N |
| "Create your account in 2 minutes" / "Complete Signup (60 seconds)" | `src/components/provider/ConsultationCTA.astro:311`, `src/pages/providers/join.astro:434` | /provider, /providers/join | N |
| "Average scheduling time: 2 days" | `src/pages/provider/smartmatch.astro:1034` | /provider/smartmatch | N |
| "Most appointments are available within 1–3 days." | `src/components/FAQHome.astro:82`, `src/components/ui/Accordion.astro:10` | *(orphaned — not rendered)* | N |
| "24hr" / "Result Turnaround" | `src/pages/careers.astro:283`, `src/pages/partner.astro:209` | /careers, /partner | N |
| "We'll get back to you within 24 hours" | `src/components/ProviderConsultationForm.astro:238`, `src/pages/provider/consultation.astro:58, 156`, `src/components/provider/ExitModal.astro:238, 384`, `src/pages/imaging-center/calculator.astro:569` | /provider/consultation, /provider, /imaging-center/calculator | N |
| "Payment is due within 24 hours of scheduling." | `src/pages/faq.astro:325`, `src/pages/patient-promise.astro:497` | /faq, /patient-promise | N |
| "24-hour cancellation policy" | `src/pages/faq.astro:460, 467, 473, 478`, `src/pages/patient-promise.astro:715, 729, 811` | /faq, /patient-promise | N |
| "PSA signed electronically — countersigned within 24 hours" | `src/pages/provider-how-it-works.astro:306` | /provider-how-it-works | N |
| "24/7 technical assistance" / "24/7 network support" | `src/pages/imaging-center/benefits.astro:865`, `src/pages/imaging-center/implementation.astro:429, 630`, `src/pages/imaging-center/faq.astro:1052`, `src/pages/imaging-center/model.astro:234` | /imaging-center/benefits, /imaging-center/implementation, /imaging-center/faq, /imaging-center/model | N |
| "Member Portal — available 24/7" | `src/pages/membership.astro:209`, `src/pages/faq.astro:410` | /membership, /faq | N |
| "5–10 business days" (report delivery) | `src/pages/faq.astro:573` | /faq | N |
| "3-5 days" (results) | `src/pages/blog/mri-basics.astro:1109`, `src/pages/imaging-center/index.astro:1053` | /blog/mri-basics, /imaging-center | N |
| "$0 to join · No volume commitments" | `src/components/provider/ExitValueSection.astro:176`, `src/components/provider/FoundingPartners.astro:326`, `src/pages/provider/smartmatch.astro:1167` | /provider, /provider/smartmatch | N |
| "$0 Setup" / "$0 Monthly" | `src/components/provider/FAQSection.astro:158, 171` | /provider | N |
| "$0" / "Marketing or acquisition cost" / "Billing overhead" | `src/pages/provider/portal-tour.astro:209, 239, 746, 1140`, `src/pages/provider-how-it-works-1.astro:179, 206, 700, 1171` | /provider/portal-tour, /provider-how-it-works-1 | N |
| "$0" / "At the facility" | `src/pages/how-it-works.astro:1119` | /how-it-works | N |
| "one of the first nationwide diagnostic imaging networks" | `src/components/AboutSection.astro:23`, `src/pages/about.astro:132, 285` | /, /about | N |
| "Founded by medical imaging executives who previously built and sold AnciCare PPO, a nationwide imaging network acquired by CorVel Corporation (NASDAQ: CRVL)." | `src/components/CarbonFooter.astro:219` | **All 49 CarbonLayout pages** | **Y (49)** |
| "Acquired by CorVel Corporation (NYSE: CVL)" | `src/pages/imaging-center/index.astro:63` | /imaging-center | N |
| "CorVel (NASDAQ: CRVL) still uses our AnciCare model today—20+ years later" | `src/components/employer/AnciCareLegacy.astro:22, 74` | /employer | N |
| "the first national diagnostic imaging network focused on reducing costs and improving access" | `src/pages/investor.astro:216, 268, 309` | /investor | N |
| "created and scaled the first nationwide imaging network of its kind" | `src/pages/imaging-center/experience.astro:116` | /imaging-center/experience | N |
| "First managed imaging network" | `src/components/employer/AnciCareLegacy.astro:117`, `src/pages/employer/implementation-guide.astro:315` | /employer, /employer/implementation-guide | N |
| "Founded the managed imaging category" | `src/components/EmployerConsultationForm.astro:343`, `src/components/employer/FinalCTA.astro:101` | /employer/schedule, /employer | N |
| "America's first imaging network. Direct contracts." | `src/pages/about.astro:419` | /about | N |
| "Building America's first [national cash-pay imaging network]" | `src/components/NetworkMapPinsCarbon.astro:376` | / | N |
| "launched first transparent pricing model in diagnostic imaging" / "First Mover" | `src/pages/imaging-center/experience.astro:438, 444` | /imaging-center/experience | N |
| "FL" / "First active market — now onboarding providers" | `src/pages/provider/network-map.astro:177` | /provider/network-map | N |
| "First In Locks Market Position." | `src/pages/provider/smartmatch.astro:760` | /provider/smartmatch | N |
| "Building the nationwide marketplace for diagnostic imaging." | `src/components/connect/ConnectHero.astro:45` | **/connect + 6 audience pages** | **Y (7)** |
| "Join our nationwide network of premium imaging centers" | `src/components/Footer.astro:114` | **11 /imaging-center + /news pages** | **Y (11)** |
| "✓ ACR-accredited imaging centers nationwide" | `src/components/hero/HeroSection.astro:58` | / | N |
| "Trusted by accredited imaging centers nationwide" | `src/components/CredibilitySection.astro:14` | / | N |
| "Trusted by Imaging Centers Nationwide" | `src/pages/provider/consultation.astro:263` | /provider/consultation | N |
| "Expanding daily across all 50 states" | `src/components/AboutVision.astro:52` | *(orphaned — not rendered)* | N |
| "partners with imaging centers across major metropolitan areas in Florida and is expanding nationwide" | `src/pages/faq.astro:1473` | /faq | N |
| "Trusted by the World's Leading Imaging Manufacturers" | `src/components/employer/PartnerMfgGrid.astro:14`, `src/components/MfgTabs.astro:14` | *(orphaned — not rendered)* | N |
| "Join 10,000+ subscribers" | `src/components/NewsletterPopup.astro:165` | **12 blog pages** | **Y (12)** |
| "Join 10,000+ Subscribers" | `src/pages/blog.astro:499` | /blog | N |
| "Inc. 500 Fastest Growing" / "#210" | `src/pages/co-founder-m.astro:363, 364`, `src/pages/imaging-center/experience.astro:215` | /co-founder-m, /imaging-center/experience | N |
| "Selected for MIT's exclusive 'Birthing of Giants' entrepreneurship program" | `src/pages/co-founder-m.astro:336` | /co-founder-m | N |
| "Text resizable up to 200% without breaking" | `src/pages/accessibility.astro:235` | /accessibility | N |
| "Scaled to 400+ imaging centers nationwide" (1990s milestone) | `src/pages/imaging-center/experience.astro:474` | /imaging-center/experience | N |
| "Applying proven methodology to serve 90+ million" | `src/pages/imaging-center/experience.astro:578` | /imaging-center/experience | N |
| "Coming Summer 2025: Advanced analytics platform" | `src/pages/imaging-center/benefits.astro:694`, `src/pages/imaging-center/faq.astro:910`, `src/pages/imaging-center/implementation.astro:505` | /imaging-center/benefits, /imaging-center/faq, /imaging-center/implementation | N |
| "Providers joining … before December 2025 receive priority access" | `src/pages/imaging-center/benefits.astro:821` | /imaging-center/benefits | N |
| "The partner portal (coming Fall 2025)" | `src/pages/imaging-center/faq.astro:980` | /imaging-center/faq | N |
| "CT, Ultrasound, and PET viewers coming in 2026." | `src/pages/education/what-is-an-mri.astro:238` | /education/what-is-an-mri | N |
| "Phase 1: Core Domination · 2025-2026" / "Phase 2: Strategic Expansion · 2027+" | `src/pages/investor.astro:743, 746, 838, 841` | /investor | N |
| "13% increase in cancer detection rate (Swedish study, 2023)" | `src/pages/blog/future-ai-medical-imaging.astro:327` | /blog/future-ai-medical-imaging | N |
| "20% reduction in false positives" / "50% reduction in radiologist workload" | `src/pages/blog/future-ai-medical-imaging.astro:331, 335` | /blog/future-ai-medical-imaging | N |
| "diagnostic accuracy improves by up to 15%" | `src/pages/blog/future-ai-medical-imaging.astro:555` | /blog/future-ai-medical-imaging | N |
| "22% increase in patients shopping for care" / "$14 million saved by patients in the first year" | `src/pages/blog/price-transparency-healthcare.astro:708, 712` | /blog/price-transparency-healthcare | N |
| "Patients are 3x more likely to proceed" | `src/pages/blog/price-transparency-healthcare.astro:529` | /blog/price-transparency-healthcare | N |
| "Emergency room visits cost 5-10x more than preventive care" | `src/pages/blog/uninsured-imaging-guide.astro:680` | /blog/uninsured-imaging-guide | N |
| "Hospital-based imaging is often 2-4x more expensive" | `src/pages/blog/cost-saving-tips.astro:326` | /blog/cost-saving-tips | N |
| "can be 2-5x higher than what insurance companies actually pay" | `src/pages/blog/real-cost-of-mri.astro:214` | /blog/real-cost-of-mri | N |
| "0% interest payment plans … over 3-12 months" | `src/pages/blog/cost-saving-tips.astro:939` | /blog/cost-saving-tips | N |

---

## 1. CONTRADICTIONS

Same claim, different values, live on the site simultaneously.

### C1 — Patients served by AnciCare: **168,244** vs **168,224** vs **168,000** vs **400,000+** ⚠️ HIGHEST PRIORITY

| Value | Location | Page |
| --- | --- | --- |
| **168,244** | `SocialProofBar.astro:18` — "Patients served across our prior imaging network" | **/** (homepage) |
| **168,244** | `about.astro:279` — "People reached" | /about |
| **168,224** | `about.astro:882` — "168,224 Faster Recoveries" | /about |
| **168,224** | `about.astro:964` — "168,224 people diagnosed in days, not weeks." | /about |
| **168,224** | `education/what-is-an-mri.astro:375, 658` — "168,224 MRIs Performed" (also in JSON-LD) | /education/what-is-an-mri |
| **168,224** | `provider/ProvenSuccess.astro:37` — founder quote, "served 168,224 patients" | /provider |
| **168,000** | `about.astro:137, 234` — "168,000 patients served" | /about |
| **168,000** | `blog/the-scan-that-never-happens.astro:300` — founder essay, "served 168,000 patients" | /blog/the-scan-that-never-happens |
| **168,000+** | 9 employer components + 2 provider components + `contact.astro:707` | /employer, /employer/schedule, /employer/implementation-guide, /provider, /contact |
| **400,000+** | `imaging-center/index.astro:360, 415, 532, 1018, 956` — "patient visits" / "appointments" | /imaging-center |

**/about alone renders 168,244 *and* 168,224 *and* 168,000** — three values for the same
figure on one page. The digit transposition (244 vs 224) is a distinct defect from the
rounding (168,000 vs 168,000+); a 400,000+ figure is 2.4× larger and framed as "visits."

### C2 — AnciCare volume/savings delivered: **$246M** vs **$240M+** vs **$180M+** vs **$160M+**

| Value | Framing | Location | Page |
| --- | --- | --- | --- |
| **$246 million** | "patient savings" / "documented savings" / "verified savings" | `about.astro:48, 716`, `SocialProofBar.astro:24`, `AboutSection.astro:12`, `blog/the-scan-that-never-happens.astro:300` | /about, **/**, /blog/the-scan-that-never-happens |
| **$246M+** | (with a plus sign, nowhere else) | `about.astro:1152` | /about |
| **$240 Million+** | "in volume" / "in revenue" | `imaging-center/index.astro:63, 148, 187, 325, 420, 619, 704, 1229, 1279` | /imaging-center |
| **$180M+** | "Volume Delivered" / "imaging revenue over 10 years" | `provider/AnciCareStory.astro:152`, `provider/ProvenSuccess.astro:22`, `providers/join.astro:63, 68, 411`, `provider/consultation.astro:194, 267`, `providers/verified.astro:685` | /provider, /providers/join, /provider/consultation, /providers/verified |
| **$160M+** | "Delivered in Volume" / "Delivered in imaging volume" | `provider/TrustBar.astro:80`, `provider/portal-tour.astro:1062` | /provider, /provider/portal-tour |
| **$400 Million+** | "in healthcare savings" | `FoundersSection.astro:17` | *(orphaned — not rendered)* |

**`/provider` renders both `$180M+` (AnciCareStory, ProvenSuccess) and `$160M+` (TrustBar)** —
same page, same claim, 12.5% apart.

### C3 — CorVel exchange and ticker: **NASDAQ: CRVL** vs **NYSE: CVL**

| Value | Location | Page |
| --- | --- | --- |
| "acquired by CorVel Corporation (**NASDAQ: CRVL**)" | `CarbonFooter.astro:219` | **All 49 CarbonLayout pages** |
| "CorVel (**NASDAQ: CRVL**) still uses our AnciCare model" | `employer/AnciCareLegacy.astro:74` | /employer |
| "Acquired by CorVel Corporation (**NYSE: CVL**)" | `imaging-center/index.astro:63` | /imaging-center |

One exchange listing and ticker is wrong. The `/imaging-center` variant conflicts with the sitewide footer.

### C4 — USRad MRI price: **$260** vs **$350** vs **$420** vs **$475** vs **$640**

| Value | Location | Page |
| --- | --- | --- |
| **$260** | `employer/EmployerHero.astro:68` ("$260 MRIs (not $3,200)"), `employer/DualSolution.astro:175`, `employer/CostAnalysis.astro:179` | **/employer** |
| **$350** | `employer/ROICalculator.astro:123` ("USRad Network" / "Average Cost Per Scan") | **/employer** |
| **$640** | `employer/ROIStatPanel.astro:49` ("USRad Network MRI · Independent accredited centers") | **/employer** |
| **$420** | `employer/EmployerCaseExample.astro:204`; `employer/implementation-guide.astro:74, 379` | **/employer**, /employer/implementation-guide |
| **$260** | `PricingSection.astro:72, 80` | / |
| **$260–$650** | `faq.astro:197` | /faq |
| **~$200–$400** | `how-it-works.astro:638` ("all-inclusive") | /how-it-works |
| **$475** | `about.astro:845` ("$475 transparent pricing") | /about |
| **$395** | `blog/cost-saving-tips.astro:263` (knee MRI) | /blog/cost-saving-tips |
| **$300** | `imaging-center/calculator.astro:103, 131, 311, 347, 364` (guaranteed payment to center) | /imaging-center/calculator |

**`/employer` renders four different USRad MRI prices** — $260, $350, $420 and $640 — in four
sibling components on one scroll. $640 is 2.5× $260.

### C5 — Network size: **1,000+** vs **1,200+** vs **1,500+** vs **26,900+** vs **27,000+**

| Value | Label | Location | Page |
| --- | --- | --- | --- |
| **1,000+** | "Partner Centers" | `careers.astro:277`, `investor.astro:164` | /careers, /investor |
| **1,200+** | AnciCare historical network | ~40 locations | /, /about, /provider, /imaging-center/*, /investor, /employer |
| **1,500+** | "locations nationwide" | `index.astro:66` | **/** |
| **1,500** | "Premium Centers **Joining**" | `NetworkMapPinsCarbon.astro:284` | **/** |
| **1,500+** | "centers" | `hero/SearchLoadingOverlay.astro:239` | **/** |
| **520** | "MRI centers mapped" | `provider/MarketOpportunityTeaser.astro:284` | /provider |
| **15,000+** | "Facilities Analyzed" | `provider/MarketScopeShowcase.astro:473` | /provider |
| **26,900+** | "ACR-accredited centers in our national dataset" | `provider/network-map.astro:168` | /provider/network-map |
| **27,000+** | "ACR-accredited facilities nationwide" | `how-it-works.astro:280, 903` | /how-it-works |

`26,900+` and `27,000+` describe the same ACR dataset with different rounding on adjacent
pages. `1,000+ Partner Centers` (careers/investor) contradicts `1,500+ locations` (homepage).

### C6 — Satisfaction / rating: **4.9★** vs **98%** vs **92%**

| Value | Location | Page |
| --- | --- | --- |
| **4.9★** "Average patient satisfaction" | `SocialProofBar.astro:36` | / |
| **4.9★** "Customer rating" | `contact.astro:56` | /contact |
| **98% satisfaction** | `employer/ExecutiveFAQ.astro:129` | /employer |
| **92% satisfaction score** | `employer/DualSolution.astro:227` | **/employer** |

**`/employer` renders 98% and 92% satisfaction** for the same track record.

### C7 — Provider payment window: **10 days** vs **15 days**

| Value | Location | Page |
| --- | --- | --- |
| **10 days** "guaranteed" | 8 `provider/` components + `/provider/portal-tour`, `/provider-how-it-works`, `/provider-how-it-works-1`, `/provider/consultation`, `/investor`, `/built-usrad` | /provider funnel |
| **15 days** "guaranteed" | `imaging-center/benefits.astro:191`, `imaging-center/faq.astro:536, 690`, `imaging-center/index.astro:610`, `imaging-center/model.astro:765` | /imaging-center funnel |

Two provider-recruitment funnels promise different payment terms for the same program.

### C8 — Scanner utilization: **35%** vs **53%**; unused capacity **65%** vs **47%**

| Value | Location | Page |
| --- | --- | --- |
| **35%** "Typical Slot Utilization" | `provider/priority-markets/MarketStats.astro:21` | **/provider** |
| **53%** "Typical utilization · 8 scans/day" | `provider/ScannerUtilization.astro:89` | **/provider** |
| **47%** "Unused capacity · 7 scans/day" | `provider/ScannerUtilization.astro:108` | **/provider** |
| **35%** "Typical Slot Utilization" / **65%** "Average Unfilled Appointment Slots" | `imaging/NetworkMap.astro:28, 33` | /imaging-center |
| **60% utilization / 40% downtime** | `provider/portal-tour.astro:946`, `provider-how-it-works-1.astro:1015` | /provider/portal-tour, /provider-how-it-works-1 |

**`/provider` renders 35% and 53% typical utilization** in two components. Three different
downtime figures across the provider funnel: 65%, 47%, 40%.

### C9 — Credentialing window: **2–3 weeks** vs **3–6 weeks**

| Value | Location | Page |
| --- | --- | --- |
| **2–3 weeks** | 18 locations across `/provider`, `/provider/portal-tour`, `/provider-how-it-works-1`, `/provider/consultation`, `/imaging-center`, `/imaging-center/faq`, `/imaging-center/implementation` | provider + imaging-center funnels |
| **3–6 wks** "Average credentialing window to go live" | `provider/network-map.astro:180` | /provider/network-map |

`/provider/network-map` is the only page giving 3–6 weeks; every other provider page says 2–3.

### C10 — Provider application time: **2 min** vs **5 min** vs **8 min** vs **10 min** vs **15 min** vs **20 min**

| Value | Location | Page |
| --- | --- | --- |
| **~20 minutes** "Complete our streamlined digital application" | `provider/HowItWorks.astro:83, 141` | **/provider** |
| **about 15 minutes** "review and sign everything online" | `provider/FAQSection.astro:45` | **/provider** |
| **about 10 minutes** "Most centers complete onboarding" | `provider/ConsultationCTA.astro:197` | **/provider** |
| **2 minutes** "Create your account" | `provider/ConsultationCTA.astro:311` | **/provider** |
| **5 minutes** "Takes 5 minutes. No obligations." | `provider/NetworkBuilding.astro:95` | **/provider** |
| **~10 minutes** "Apply · ~10 minutes online" | `provider/portal-tour.astro:311`, `provider-how-it-works-1.astro:270` | /provider/portal-tour, /provider-how-it-works-1 |
| **5 minutes** "Apply · Takes 5 minutes" / **under 8 minutes** "Step 1" | `provider-how-it-works.astro:241, 270` | /provider-how-it-works |
| **20 minutes** | `provider/faq.astro:413` | /provider/faq |
| **5 minutes** / **15 minutes** | `imaging-center/faq.astro:255`, `imaging-center/implementation.astro:273` | /imaging-center/faq, /imaging-center/implementation |

**`/provider` alone gives five different durations** (2, 5, 10, 15, 20 min) for onboarding.

### C11 — Appointment availability: **within 48 hours** vs **48–72 hours** vs **same-day** vs **1–3 days**

| Value | Location | Page |
| --- | --- | --- |
| **48 hours** | `education/WhatToExpect_SplitScreen.astro:319`, `education/what-is-an-mri.astro:90, 321` | **/education/what-is-an-mri** |
| **Same-day appointments** | `education/what-is-an-mri.astro:412` | **/education/what-is-an-mri** |
| **48-hour booking** | `PricingSection.astro:101` | **/** |
| **48-72** "Hour Appointment **Goal**" | `NetworkMapPinsCarbon.astro:308` | **/** |
| **48 - 72 hours** | `contact.astro:596` | /contact |
| **schedule at least 48 hours in advance** | `faq.astro:965` | /faq |
| **1–3 days** | `FAQHome.astro:82`, `ui/Accordion.astro:10` | *(orphaned)* |

**`/education/what-is-an-mri` promises both "In Under 48 Hours" and "Same-day appointments."**
**`/` promises "48-hour booking" (a commitment) and "48-72 Hour Appointment Goal" (an aspiration).**

### C12 — Savings headline: **67%** vs **70%** vs **80%**

| Value | Location | Page |
| --- | --- | --- |
| **70% Less** (hero) | `hero/HeroHeadline.astro:16` | **/** |
| **67% avg. savings** | `HowItWorksSection.astro:98` | **/** |
| **60–70% less** | `WhyLessCostSection.astro:47` | **/** |
| **up to 70%** | `CarbonFooter.astro:54` | all 49 pages |
| **70%** "average savings" | `how-it-works.astro:1230` | /how-it-works |
| **80%** "Cost Savings" | `careers.astro:271` | /careers |
| **80%** "Cost Reduction" | `investor.astro:156` | /investor |
| **up to 80% less** | `faq.astro:197` | /faq |
| **50–70%** | employer funnel (11 locations) | /employer, /employer/schedule, /employer/implementation-guide |
| **30–70%** | `imaging-center/model.astro:356, 480` | /imaging-center/model |
| **30–80%** | `investor.astro:459` | /investor |
| **50–80%** | `blog/uninsured-imaging-guide.astro:147, 158, 854` | /blog/uninsured-imaging-guide |

**`/` renders three different savings figures** (70%, 67%, 60–70%) plus the footer's "up to 70%".
**`/investor` renders both "80% Cost Reduction" and "30-80%".**

### C13 — Show rate / no-show rate

| Value | Location | Page |
| --- | --- | --- |
| **96% show rate** | `provider/FAQSection.astro:369, 379`, `provider/GuaranteeSection.astro:62`, `provider/ScannerUtilization.astro:414`, `provider/faq.astro:2721`, `built-usrad.astro:339`, `imaging-center/index.astro` (6 locations) | /provider, /provider/faq, /built-usrad, /imaging-center |
| **no-show rate below 5%** (implies ≤95% show) | `provider/faq.astro:1825` | **/provider/faq** |
| **No-show rates … less than 5%** | `imaging-center/faq.astro:838` | /imaging-center/faq |

**`/provider/faq` states 96% show rate and "below 5%" no-show rate** — mutually exclusive at
the boundary.

### C14 — Volume increase for partner centers: **20–40%** vs **40%**

| Value | Location | Page |
| --- | --- | --- |
| **20-40% volume increases** | `provider/FAQSection.astro:96`; `imaging-center/index.astro:265, 525, 1036, 1192` | **/provider**, /imaging-center |
| **40%** "More Scans Per Month" | `provider/priority-markets/MarketStats.astro:41` | **/provider** |

`/provider` presents 40% as a point estimate in one component and as a range ceiling in another.

### C15 — AnciCare operating duration: **8 years** vs **nearly a decade** vs **10 years** vs **1994-2002**

| Value | Location | Page |
| --- | --- | --- |
| **1994-2002** (8 years) | `imaging-center/index.astro:63, 323, 375` | /imaging-center |
| **"successful for 8 years"** | `imaging-center/index.astro:569` | /imaging-center |
| **"nearly a decade with AnciCare"** | `provider/GuaranteeSection.astro:135` | /provider |
| **"over 10 years"** | `providers/join.astro:63` | /providers/join |
| **"10 years of imaging center partnerships"** | `ProviderSearchSection.jsx:10` | /search-results |
| **"In 1994 … Over the following years"** | `blog/the-scan-that-never-happens.astro:294, 300` | /blog/the-scan-that-never-happens |

---

## 2. SHARED COMPONENTS

Claims living in components that render on more than one page. A single edit here corrects
every page in the count.

| Component | Pages | Claims carried | Fix corrects |
| --- | --- | --- | --- |
| **`src/components/CarbonFooter.astro`** | **49** | • "Building Accessible Imaging for **90 million Americans**" (L166)<br>• "Join thousands who've saved **up to 70%** on medical imaging" (L54)<br>• "built and sold AnciCare PPO, a **nationwide** imaging network acquired by **CorVel Corporation (NASDAQ: CRVL)**" (L219) | **49 pages** — /, /about, /faq, /how-it-works, /membership, /employer, /provider, /investor, /contact, /careers, /partner, /patient-promise, /member-rights, /education/what-is-an-mri, /search-results, /privacy, /terms, /sms-terms, /accessibility, /blog + 12 blog posts, /connect + 6 audience pages, /provider/consultation, /provider/faq, /provider/network-map, /provider/portal-tour, /provider/smartmatch, /provider-how-it-works, /employer/schedule, /employer/implementation-guide, /co-founder-d, /co-founder-m |
| **`src/components/NewsletterPopup.astro`** | **12** | • "**Save up to 70%** on medical imaging" (L86)<br>• "Join **10,000+** subscribers" (L165) | **12 blog posts** — cost-saving-tips, first-mri-preparation-guide, future-ai-medical-imaging, health-tips, managing-mri-anxiety, mri-basics, preventive-care-checklist, price-transparency-healthcare, real-cost-of-mri, the-scan-that-never-happens, understanding-mri-results, uninsured-imaging-guide |
| **`src/components/Footer.astro`** | **11** | • "Join our **nationwide** network of premium imaging centers" (L114) | **11 pages** — /imaging-center/apply, /imaging-center/benefits, /imaging-center/calculator, /imaging-center/coming-soon, /imaging-center/experience, /imaging-center/faq, /imaging-center/implementation, /imaging-center, /imaging-center/model, /imaging-center/support, /news |
| **`src/components/connect/ConnectHero.astro`** | **7** | • "Building the **nationwide** marketplace for diagnostic imaging." (L45) | **7 pages** — /connect, /connect/broker, /connect/employer, /connect/investor, /connect/other, /connect/payor, /connect/provider |

**Nothing else is shared.** Every other claim-bearing component renders on exactly one page —
this is why the site can hold contradictory values so easily. The employer funnel (16
single-use components on `/employer`), the provider funnel (21 single-use components on
`/provider`), and the imaging-center funnel each maintain independent copies of the same
underlying facts with no shared source.

**Highest-leverage consolidation targets** (claims repeated verbatim across many *unshared*
components, where a shared component or a single data module would eliminate the drift):

| Claim | Independent copies | Files |
| --- | --- | --- |
| AnciCare patients served | **18** | `SocialProofBar`, `about.astro` ×6, `education/what-is-an-mri` ×2, `provider/ProvenSuccess`, `provider/AnciCareStory`, `provider/FAQSection`, `employer/*` ×6, `EmployerConsultationForm`, `employer/schedule` ×2, `employer/implementation-guide` ×2, `contact.astro`, `blog/the-scan-that-never-happens` |
| "1,200+ centers" | **~40** | across `/`, `/about`, `/provider`, `/imaging-center`, `/imaging-center/experience`, `/investor`, `/employer`, `/provider/portal-tour` |
| "$3,200 hospital MRI" | **10** | `PricingSection`, `employer/EmployerHero`, `employer/ROIStatPanel`, `employer/CostAnalysis` ×2, `education/what-is-an-mri` ×3, `about.astro`, `how-it-works`, `employer/implementation-guide` ×2, `blog/uninsured-imaging-guide` |
| "$260 starting price" | **15** | see table row above |
| "10-day payment guarantee" | **20** | across `/provider` (8 components), `/provider/portal-tour`, `/provider-how-it-works`, `/provider-how-it-works-1`, `/provider/consultation`, `/investor`, `/built-usrad` |
| "2–3 weeks credentialing" | **18** | across `/provider`, `/provider/portal-tour`, `/provider-how-it-works-1`, `/provider/consultation`, `/imaging-center`, `/imaging-center/faq`, `/imaging-center/implementation` |

---

## 3. UNITS AND ERAS

Same figure describing different time periods, or different measures presented as if
comparable.

### U1 — **$3,200** as both a 1990s and a current hospital MRI price

| Era asserted | Text | Location | Page |
| --- | --- | --- | --- |
| **1990s / pre-AnciCare** | "$3,200 for a plain MRI" — inside the panel labelled **"Pre-AnciCare"** / **"The Old Way"** / **"14 Days of Waiting"** | `about.astro:785` | /about |
| **Today** | "Hospitals charge $3,200. USRad members pay $260." | `PricingSection.astro:80` | / |
| **Today** | "$3,200" / "Average Hospital MRI · **Hospital outpatient billing**" | `employer/ROIStatPanel.astro:30` | /employer |
| **Today** | "$260 MRIs (not $3,200)" | `employer/EmployerHero.astro:68` | /employer |
| **Today** | "$3,200 Average Cost · Hospital pricing" | `education/what-is-an-mri.astro:299` | /education/what-is-an-mri |
| **Today** | "Hospital outpatient $3,200 → USRad $420" | `employer/implementation-guide.astro:74, 379` | /employer/implementation-guide |
| **Today** | "~$800–$3,200 per scan" (range top) | `how-it-works.astro:603` | /how-it-works |

The same nominal figure carries a ~30-year gap in real terms. On /about it anchors the
problem AnciCare solved in the 1990s; everywhere else it anchors the problem USRad solves now.

### U2 — **14 days** as both a 1990s workers'-comp wait and a current hospital wait

| Era asserted | Text | Location | Page |
| --- | --- | --- | --- |
| **1990s / pre-AnciCare** | "**14 Days of Waiting**" (heading of the "Pre-AnciCare / The Old Way" panel) | `about.astro:752` | /about |
| **Today** | "**14 Days Average Wait**" (contrasted with "48 Hours with USRad") | `education/what-is-an-mri.astro:278` | /education/what-is-an-mri |
| **1990s** | "10-14 days industry" → "10-14 days to 2-3 days" | `ProofSection.astro:74, 108` | *(orphaned)* |

### U3 — **$475** (1990s AnciCare price) vs **$260** (current USRad price) for the same "transparent pricing" position

`about.astro:845` presents "**$475** transparent pricing" as the AnciCare-era solution to the
$3,200 problem. Every current page presents "**$260**" as the solution to the same $3,200
problem. A visitor reading /about then / sees the transparent price fall from $475 to $260
while the hospital price stays at $3,200.

### U4 — **72-hour** (AnciCare "One Step Service") vs **48-hour** (USRad today) scheduling

| Era | Text | Location | Page |
| --- | --- | --- | --- |
| **1990s** | "**72-hour scheduling** … became the national benchmark" | `co-founder-d.astro:146, 183, 429` | /co-founder-d |
| **1990s** | "**Next-day imaging**. Everyone wins." (AnciCare result panel) | `about.astro:243` | /about |
| **Today** | "Most appointments available within **48 hours**" | `education/WhatToExpect_SplitScreen.astro:319` | /education/what-is-an-mri |
| **Today (goal)** | "**48-72** Hour Appointment **Goal**" | `NetworkMapPinsCarbon.astro:308` | / |

Three different speeds attached to two eras, with the *historical* claim (next-day) faster
than the *current* claim (48–72 hours).

### U5 — "Savings" vs "volume" vs "revenue" — three different measures, presented interchangeably

| Figure | Measure asserted | Location |
| --- | --- | --- |
| **$246 million** | *patient savings* / *documented savings* | `about.astro`, `SocialProofBar`, `AboutSection`, `blog/the-scan-that-never-happens` |
| **$240 Million+** | *volume delivered* — and, at `imaging-center/index.astro:325`, *"revenue"* | `imaging-center/index.astro` |
| **$180M+** | *volume delivered* — and, at `providers/join.astro:63`, *"imaging revenue"* | `provider/AnciCareStory`, `providers/join`, `provider/consultation` |
| **$160M+** | *volume delivered* | `provider/TrustBar`, `provider/portal-tour` |
| **$20M+** | *annual revenue* / *"Revenue Built"* | `investor.astro:223, 285, 985` |
| **$95M + $151M = $246M** | *medical savings* + *productivity savings* | `about.astro:908, 927, 946` |

Savings, gross volume, and revenue are three different quantities. `imaging-center/index.astro:325`
labels $240M+ as "revenue" while `:148` labels the same number "volume"; `providers/join.astro`
labels $180M+ "imaging revenue" while `provider/AnciCareStory` labels it "Volume Delivered."
`/investor` puts annual revenue at $20M — irreconcilable with $180–240M of *revenue* over 8–10 years
unless the larger figures are gross volume, which most pages do not say.

### U6 — "Patients" vs "claimants" vs "cases" vs "visits" vs "appointments" vs "MRIs performed"

The ~168,000 figure is labelled six different ways depending on funnel:

| Label | Where | Implied measure |
| --- | --- | --- |
| "patients served" | /about, /provider, /blog/the-scan-that-never-happens | people |
| "People reached" | /about (`:279`) | people |
| "claimants" | /employer (`AnciCareLegacy`, `CredibilityBar`, `FinalCTA`) | workers'-comp claims |
| "imaging cases" / "cases managed" | /employer/schedule, /employer/implementation-guide, `DualSolution` | episodes |
| "imaging services delivered" | /employer (`ExecutiveFAQ`) | procedures |
| "patient visits" | /provider (`FAQSection`) | encounters |
| "appointments" | /contact (`:707`) | bookings |
| "**MRIs Performed**" | /education/what-is-an-mri (`:375`) | **scans** |
| **400,000+ "patient visits" / "appointments"** | /imaging-center | encounters — 2.4× the patient figure |

"168,224 MRIs Performed" is the outlier: it converts a *people* count into a *procedure*
count at 1:1, while `/imaging-center` separately claims 400,000+ visits for the same network.

### U7 — Per-scan economics: **$300 contracted rate** vs **$375 net margin** vs **$375 disbursement**

| Figure | Measure asserted | Location | Page |
| --- | --- | --- | --- |
| "Avg. **contracted rate** ~$300/scan" | gross rate | `provider-how-it-works-1.astro:1093` | /provider-how-it-works-1 |
| "Avg. **net margin** $375/scan" | margin after costs | `provider/portal-tour.astro:1024` | /provider/portal-tour |
| "$375" (per-scan disbursement) | payment to center | `provider/ProviderBrief.astro:69`, `provider/ScannerUtilization.astro:134` | /provider |
| "$300" / "Guaranteed payment per scan", "~$45/scan" + "~$25/scan" costs → "~$195" net | gross and net broken out | `imaging-center/calculator.astro:103, 319, 323, 328` | /imaging-center/calculator |

`/provider/portal-tour` and `/provider-how-it-works-1` are near-identical pages, yet one calls
$300 the contracted rate and the other calls $375 the *net margin* — a net margin above the
sibling page's gross rate. `/imaging-center/calculator` puts the same center's net at ~$195.

### U8 — Utilization measured per-slot vs per-scan-day vs per-scanner-hour

`35%` "Typical Slot Utilization" (MarketStats, imaging/NetworkMap), `53%` "Typical utilization
· 8 scans/day" (ScannerUtilization), and `60% utilization` on a "1.5T MRI costs $800K–$2M"
carrying-cost basis (portal-tour, provider-how-it-works-1) are three different denominators
presented without units. The paired downtime figures — 65%, 47%, 40% — inherit the same
ambiguity.

### U9 — Time-bound claims whose window has passed

As of 2026-07-30 these read as current commitments but describe past dates:

| Claim | Location | Page |
| --- | --- | --- |
| "**Coming Summer 2025**: Advanced analytics platform" | `imaging-center/benefits.astro:694`, `imaging-center/implementation.astro:505` | /imaging-center/benefits, /imaging-center/implementation |
| "Web-based portal access (**coming Summer 2025**)" | `imaging-center/faq.astro:910` | /imaging-center/faq |
| "The partner portal (**coming Fall 2025**)" | `imaging-center/faq.astro:980` | /imaging-center/faq |
| "Providers joining … **before December 2025** receive priority access" | `imaging-center/benefits.astro:821` | /imaging-center/benefits |
| "CT, Ultrasound, and PET viewers **coming in 2026**" | `education/what-is-an-mri.astro:238` | /education/what-is-an-mri |
| "**10 States Opening 2026**" | `NetworkMapPinsCarbon.astro:296` | **/** |
| "Phase 1: Core Domination · **2025-2026**" | `investor.astro:743, 746` | /investor |

### U10 — Geographic scope: **Florida-only** vs **all 50 states** vs **nationwide**

| Claim | Location | Page |
| --- | --- | --- |
| "imaging centers across major metropolitan areas in **Florida** and is expanding nationwide" | `faq.astro:1473` | /faq |
| "**FL**" / "First active market — now onboarding providers" | `provider/network-map.astro:177` | /provider/network-map |
| "**50**" / "States — accepting applications nationwide" | `provider/network-map.astro:172` | /provider/network-map |
| "**10 States** Opening 2026" | `NetworkMapPinsCarbon.astro:296` | / |
| "1,500+ locations **nationwide**" | `index.astro:66` | / |
| "**nationwide**" (unqualified) | `CarbonFooter.astro:219` (49 pages), `Footer.astro:114` (11 pages), `ConnectHero.astro:45` (7 pages), `hero/HeroSection.astro:58`, `CredibilitySection.astro:14`, `BrowseAllModal.astro:271`, `membership.astro:185, 451, 479`, `provider/consultation.astro:263` | 49 / 11 / 7 / various |
| "licensed in **all 50 states**" | `employer/ExecutiveFAQ.astro:278` | /employer |
| "**Expanding daily across all 50 states**" | `AboutVision.astro:52` | *(orphaned)* |

"Nationwide" appears on all 49 CarbonLayout pages; `/faq` is the only page that scopes coverage
to Florida. `/provider/network-map` renders "FL — first active market" and "50 states" side by side.

---

## Legacy files — ✅ RESOLVED in `c2265af` (2026-07-30)

> **Status: closed.** All 50 `x`-prefixed `.astro` routes under `src/pages/` were removed in
> commit **`c2265af`** — *"chore(pages): remove 50 dead x-prefixed legacy routes"*. The routes
> no longer build and no longer resolve. Zero files were excluded as false positives; the two
> X-ray-named files in `src/pages/` (`xray-flow-diagram.html`, `xray-view-mockup.html`) are
> `.html`, never matched the `.astro` glob, and remain in place.
>
> This section is retained as history, not as an open finding. The claims below are no longer
> reachable on the live site.

Astro creates a route for every file in `src/pages/`, so these files were publicly reachable
until removal despite being documented as stale in the engineering reports. Several carried
claims that contradicted the live site:

| Legacy route (removed) | Claim | Conflicted with |
| --- | --- | --- |
| `/xhow-it-works-ab` | "served **168,224** patients, and saved **$246 million**" (L531, L610) | C1 |
| `/education/xwhat-is-an-mri` | "Served **400,000+** patients • **$400 Million+** savings delivered" (L38, L248, L813, L903) | C1, C2 — was the only place `$400 Million+` appeared outside the orphaned `FoundersSection` |
| `/x2unimarket`, `/x3unicorn`, `/x1index`, `/xemployer-carbon3` | "$3,200" hospital MRI | U1 |

**Verified at removal:** 0 inbound imports, 0 inbound hrefs, 0 redirects referencing any
`x`-route; build green before and after; 0 `x`-routes in build output.

**Recovery path is git history** — the files were deleted, not relocated. To read one:
`git show c2265af^:src/pages/education/xwhat-is-an-mri.astro`.

**Still open from this cluster:** `$400 Million+` remains in `src/components/FoundersSection.astro`,
which is orphaned (imported by no live page) and therefore still unrendered — but it is the last
surviving copy of a figure that contradicts C2. `docs/engineering/MARKETING-WEBSITE-ENGINEERING-REPORT.md`
L743 flags the absence of `robots.txt`, which remains unaddressed.

---

## Coverage note

495 `.astro`/`.jsx` files scanned; **77 live public routes** and **157 components** evaluated,
of which **~90 files** carry quantified public claims. The table lists ~250 distinct claim
instances covering every dollar figure, percentage, count, duration, ratio and superlative in
visitor-facing text on the live marketing site, excluding the categories listed under *Scope
and method*. Claims appearing verbatim in many locations are consolidated to one row with all
file:line references.
