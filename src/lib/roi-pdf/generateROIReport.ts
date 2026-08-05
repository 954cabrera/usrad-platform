// src/lib/roi-pdf/generateROIReport.ts
// Puppeteer HTML-to-PDF renderer — replaces pdf-lib implementation
// Runs on Vercel serverless via @sparticuz/chromium + puppeteer-core

import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ROIInputs {
  companyName:    string;
  contactName?:   string;
  totalEmployees: number;
  totalScans:     number;
  avgCost:        number;
}

interface ROIData extends ROIInputs {
  currentSpend:        number;
  usradCost:           number;
  annualSavings:       number;
  savingsPct:          number;
  fiveYearSavings:     number;
  threeYearSavings:    number;
  perEmployeeSavings:  number;
  generatedDate:       string;
}

// ─── ROI Calculations ─────────────────────────────────────────────────────────

function calculateROI(inputs: ROIInputs): ROIData {
  const { totalEmployees, totalScans, avgCost } = inputs;
  const USRAD_RATE = 350;

  const currentSpend        = totalScans * avgCost;
  const usradCost           = totalScans * USRAD_RATE;
  const annualSavings       = currentSpend - usradCost;
  const savingsPct          = currentSpend > 0 ? Math.round((annualSavings / currentSpend) * 100) : 0;

  const threeYearSavings    = annualSavings * 3;
  const fiveYearSavings     = annualSavings * 5;
  const perEmployeeSavings  = totalEmployees > 0 ? Math.round(annualSavings / totalEmployees) : 0;

  const generatedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return {
    ...inputs,
    currentSpend, usradCost, annualSavings, savingsPct,
    threeYearSavings, fiveYearSavings, perEmployeeSavings, generatedDate,
  };
}

// ─── Formatting helpers ───────────────────────────────────────────────────────

function fmt(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000)     return `$${Math.round(n).toLocaleString()}`;
  return `$${n}`;
}

function fmtShort(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `$${Math.round(n / 1000)}K`;
  return `$${n}`;
}

// ─── HTML Template ────────────────────────────────────────────────────────────

function buildHTML(d: ROIData): string {
  // Bar widths for scan-level comparison (capped at 100%)
  const hospitalPct  = 100;
  const ppoPct       = Math.round((1800 / 3200) * 100);
  const imagingPct   = Math.round((900  / 3200) * 100);
  const usradPct     = Math.round((350  / 3200) * 100);

  // Cost bar widths for current vs USRad
  const currentPct   = 100;
  const usradBarPct  = d.avgCost > 0 ? Math.min(100, Math.round((350 / d.avgCost) * 100)) : 11;

  // 3-year bar widths
  const yr1Pct = 33;
  const yr2Pct = 66;
  const yr3Pct = 100;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>USRad Custom ROI Analysis — ${d.companyName}</title>
<style>
  /* ── Reset & base ── */
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @page { size: Letter; margin: 0; }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 10pt;
    color: #1a1a1a;
    background: #ffffff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ── Page structure ── */
  .page {
    width: 8.5in;
    height: 11in;
    position: relative;
    overflow: hidden;
    page-break-after: always;
    background: #ffffff;
  }
  .page:last-child { page-break-after: avoid; }

  /* ── Brand tokens ── */
  :root {
    --navy:       #003087;
    --navy-dark:  #002070;
    --navy-light: #eef1f9;
    --gold:       #c9a227;
    --gold-light: #fdf6e3;
    --green:      #1a7a42;
    --green-mid:  #22963f;
    --green-light:#e8f7ee;
    --red:        #c0392b;
    --red-light:  #fdf0ef;
    --gray-900:   #111827;
    --gray-700:   #374151;
    --gray-500:   #6b7280;
    --gray-300:   #d1d5db;
    --gray-100:   #f3f4f6;
    --gray-50:    #f9fafb;
  }

  /* ── Running header (pages 2-6) ── */
  .running-header {
    background: var(--navy);
    height: 48pt;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40pt;
    border-bottom: 3pt solid var(--gold);
  }
  .running-header .logo-text {
    font-size: 14pt;
    font-weight: 800;
    color: var(--gold);
    letter-spacing: -0.3pt;
  }
  .running-header .section-label {
    font-size: 8pt;
    font-weight: 700;
    color: rgba(255,255,255,0.85);
    letter-spacing: 1pt;
    text-transform: uppercase;
  }

  /* ── Running footer ── */
  .running-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--navy);
    height: 28pt;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40pt;
  }
  .running-footer span {
    font-size: 7pt;
    color: rgba(255,255,255,0.6);
  }

  /* ── Page content wrapper ── */
  .content {
    padding: 28pt 40pt 48pt 40pt;
  }

  /* ── Section label (gold uppercase) ── */
  .section-label-gold {
    font-size: 7.5pt;
    font-weight: 700;
    color: var(--gold);
    letter-spacing: 1.5pt;
    text-transform: uppercase;
    margin-bottom: 6pt;
  }

  /* ── Section title ── */
  .section-title {
    font-size: 20pt;
    font-weight: 800;
    color: var(--navy);
    line-height: 1.15;
    margin-bottom: 10pt;
  }

  /* ── Section subtitle ── */
  .section-subtitle {
    font-size: 9.5pt;
    color: var(--gray-500);
    line-height: 1.5;
    margin-bottom: 20pt;
  }

  /* ── Divider ── */
  .divider {
    border: none;
    border-top: 1pt solid var(--gray-300);
    margin: 14pt 0;
  }

  /* ── Stat cards (3-up) ── */
  .stat-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10pt;
    margin-bottom: 16pt;
  }
  .stat-card {
    border-radius: 6pt;
    padding: 14pt 14pt 12pt;
    border-top: 3pt solid transparent;
  }
  .stat-card.red   { background: var(--red-light);   border-color: var(--red);   }
  .stat-card.navy  { background: var(--navy-light);  border-color: var(--navy);  }
  .stat-card.green { background: var(--green-light); border-color: var(--green); }
  .stat-card.gold  { background: var(--gold-light);  border-color: var(--gold);  }
  .stat-card .label {
    font-size: 7.5pt;
    color: var(--gray-500);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5pt;
    margin-bottom: 4pt;
  }
  .stat-card .value {
    font-size: 20pt;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 2pt;
  }
  .stat-card.red   .value { color: var(--red);   }
  .stat-card.navy  .value { color: var(--navy);  }
  .stat-card.green .value { color: var(--green); }
  .stat-card.gold  .value { color: var(--gold);  }
  .stat-card .sub  { font-size: 7pt; color: var(--gray-500); }

  /* ── Hero savings block ── */
  .hero-savings {
    background: linear-gradient(135deg, #1a7a42 0%, #22963f 60%, #2aae4a 100%);
    border-radius: 8pt;
    padding: 24pt 32pt;
    text-align: center;
    margin-bottom: 16pt;
  }
  .hero-savings .label {
    font-size: 8pt;
    font-weight: 600;
    color: rgba(255,255,255,0.8);
    text-transform: uppercase;
    letter-spacing: 1pt;
    margin-bottom: 6pt;
  }
  .hero-savings .amount {
    font-size: 48pt;
    font-weight: 900;
    color: #ffffff;
    letter-spacing: -2pt;
    line-height: 1;
    margin-bottom: 4pt;
  }
  .hero-savings .pct {
    font-size: 13pt;
    font-weight: 700;
    color: rgba(255,255,255,0.88);
  }
  .hero-savings .sub {
    font-size: 8pt;
    color: rgba(255,255,255,0.65);
    margin-top: 4pt;
  }

  /* ── Two-column split ── */
  .two-col {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12pt;
    margin-bottom: 16pt;
  }
  .col-card {
    border-radius: 6pt;
    padding: 14pt;
    border-top: 3pt solid transparent;
  }
  .col-card.wc     { background: var(--navy-light); border-color: var(--navy);  }
  .col-card.health { background: var(--green-light); border-color: var(--green); }
  .col-card .col-title {
    font-size: 8pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8pt;
    margin-bottom: 10pt;
  }
  .col-card.wc .col-title     { color: var(--navy);  }
  .col-card.health .col-title { color: var(--green); }
  .col-card .row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 3pt 0;
    border-bottom: 0.5pt solid rgba(0,0,0,0.06);
  }
  .col-card .row:last-child { border-bottom: none; }
  .col-card .row .rLabel { font-size: 8pt; color: var(--gray-500); }
  .col-card .row .rValue { font-size: 9pt; font-weight: 700; color: var(--gray-900); }
  .col-card .row .rValue.big {
    font-size: 13pt;
    font-weight: 800;
  }
  .col-card.wc     .row .rValue.big { color: var(--navy);  }
  .col-card.health .row .rValue.big { color: var(--green); }

  /* ── Data table ── */
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 8.5pt;
    margin-bottom: 14pt;
  }
  thead tr { background: var(--navy); }
  thead th {
    color: #ffffff;
    font-weight: 700;
    font-size: 7.5pt;
    text-transform: uppercase;
    letter-spacing: 0.5pt;
    padding: 7pt 10pt;
    text-align: left;
  }
  thead th:not(:first-child) { text-align: right; }
  tbody tr:nth-child(even)  { background: var(--gray-50); }
  tbody tr:nth-child(odd)   { background: #ffffff; }
  tbody td {
    padding: 6.5pt 10pt;
    color: var(--gray-700);
    border-bottom: 0.5pt solid var(--gray-300);
  }
  tbody td:not(:first-child)         { text-align: right; }
  tbody td.red-val                   { color: var(--red);   font-weight: 700; }
  tbody td.green-val                 { color: var(--green); font-weight: 700; }
  tbody td.navy-val                  { color: var(--navy);  font-weight: 700; }
  tbody td.strong                    { font-weight: 700; color: var(--gray-900); }
  tbody tr.highlight-row td          { background: var(--green-light); font-weight: 700; }

  /* ── Horizontal bar chart ── */
  .bar-chart { margin-bottom: 14pt; }
  .bar-row {
    display: flex;
    align-items: center;
    margin-bottom: 7pt;
  }
  .bar-label {
    width: 120pt;
    font-size: 8pt;
    color: var(--gray-700);
    flex-shrink: 0;
  }
  .bar-track {
    flex: 1;
    background: var(--gray-100);
    border-radius: 3pt;
    height: 14pt;
    position: relative;
  }
  .bar-fill {
    height: 100%;
    border-radius: 3pt;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 5pt;
  }
  .bar-fill span {
    font-size: 7pt;
    font-weight: 700;
    color: #ffffff;
  }
  .bar-fill.red-bar   { background: var(--red);   }
  .bar-fill.navy-bar  { background: var(--navy);  }
  .bar-fill.green-bar { background: var(--green); }
  .bar-fill.gold-bar  { background: var(--gold);  }
  .bar-value {
    width: 55pt;
    font-size: 8pt;
    font-weight: 700;
    text-align: right;
    flex-shrink: 0;
    padding-left: 6pt;
  }

  /* ── Timeline ── */
  .timeline { margin-bottom: 16pt; }
  .timeline-item {
    display: flex;
    gap: 12pt;
    margin-bottom: 8pt;
  }
  .timeline-badge {
    width: 52pt;
    flex-shrink: 0;
    border-radius: 4pt;
    padding: 6pt 4pt;
    text-align: center;
    font-size: 8pt;
    font-weight: 800;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .timeline-badge.navy  { background: var(--navy);  }
  .timeline-badge.green { background: var(--green); }
  .timeline-badge.gold  { background: var(--gold);  }
  .timeline-content {
    flex: 1;
    background: var(--gray-50);
    border-radius: 4pt;
    padding: 7pt 10pt;
    border-left: 3pt solid var(--gray-300);
  }
  .timeline-content .t-title {
    font-size: 9pt;
    font-weight: 700;
    color: var(--gray-900);
    margin-bottom: 2pt;
  }
  .timeline-content .t-detail {
    font-size: 7.5pt;
    color: var(--gray-500);
    line-height: 1.4;
  }

  /* ── 3-year projection bars ── */
  .projection-row {
    display: flex;
    align-items: center;
    margin-bottom: 8pt;
    gap: 10pt;
  }
  .proj-label { width: 44pt; font-size: 8.5pt; font-weight: 700; color: var(--navy); }
  .proj-track { flex: 1; background: var(--gray-100); border-radius: 3pt; height: 20pt; }
  .proj-fill  {
    height: 100%;
    border-radius: 3pt;
    background: var(--green);
    display: flex;
    align-items: center;
    padding-left: 8pt;
  }
  .proj-fill span { font-size: 8pt; font-weight: 700; color: #ffffff; }
  .proj-cum { width: 70pt; text-align: right; font-size: 8pt; font-weight: 700; color: var(--green); }

  /* ── Callout boxes ── */
  .callout {
    border-radius: 6pt;
    padding: 12pt 16pt;
    margin-bottom: 12pt;
  }
  .callout.navy  { background: var(--navy-light);  border-left: 4pt solid var(--navy);  }
  .callout.green { background: var(--green-light); border-left: 4pt solid var(--green); }
  .callout.gold  { background: var(--gold-light);  border-left: 4pt solid var(--gold);  }
  .callout.red   { background: var(--red-light);   border-left: 4pt solid var(--red);   }
  .callout .callout-title {
    font-size: 8.5pt;
    font-weight: 700;
    margin-bottom: 4pt;
  }
  .callout.navy  .callout-title { color: var(--navy);  }
  .callout.green .callout-title { color: var(--green); }
  .callout.gold  .callout-title { color: var(--gold);  }
  .callout.red   .callout-title { color: var(--red);   }
  .callout p { font-size: 8pt; color: var(--gray-700); line-height: 1.5; }

  /* ── Check list ── */
  .check-list { list-style: none; padding: 0; }
  .check-list li {
    display: flex;
    gap: 6pt;
    align-items: flex-start;
    font-size: 8.5pt;
    color: var(--gray-700);
    margin-bottom: 5pt;
    line-height: 1.4;
  }
  .check-list li::before {
    content: "✓";
    color: var(--green);
    font-weight: 900;
    flex-shrink: 0;
    margin-top: 0.5pt;
  }

  /* ── Implementation cards ── */
  .impl-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10pt;
    margin-bottom: 16pt;
  }
  .impl-card {
    background: var(--gray-50);
    border-radius: 6pt;
    padding: 12pt;
    border-top: 3pt solid var(--navy);
  }
  .impl-card.launch { border-color: var(--green); }
  .impl-card .week-label {
    font-size: 7.5pt;
    font-weight: 700;
    color: var(--navy);
    text-transform: uppercase;
    letter-spacing: 0.5pt;
    margin-bottom: 4pt;
  }
  .impl-card.launch .week-label { color: var(--green); }
  .impl-card .week-title {
    font-size: 9pt;
    font-weight: 800;
    color: var(--gray-900);
    margin-bottom: 8pt;
  }
  .impl-card ul { list-style: none; padding: 0; }
  .impl-card ul li {
    font-size: 7.5pt;
    color: var(--gray-500);
    padding: 2pt 0;
    border-bottom: 0.5pt solid var(--gray-300);
    line-height: 1.3;
  }
  .impl-card ul li:last-child { border-bottom: none; }
  .impl-card ul li::before {
    content: "· ";
    color: var(--navy);
    font-weight: 700;
  }
  .impl-card.launch ul li::before { color: var(--green); }

  /* ── Compliance table ── */
  .compliance-row {
    display: flex;
    align-items: flex-start;
    padding: 6pt 10pt;
    gap: 10pt;
    border-bottom: 0.5pt solid var(--gray-300);
  }
  .compliance-row:nth-child(even) { background: var(--gray-50); }
  .compliance-row .c-check { color: var(--green); font-weight: 900; font-size: 9pt; flex-shrink: 0; }
  .compliance-row .c-label { font-size: 8.5pt; font-weight: 700; color: var(--gray-900); width: 130pt; flex-shrink: 0; }
  .compliance-row .c-desc  { font-size: 8pt; color: var(--gray-500); line-height: 1.4; flex: 1; }

  /* ── Inputs summary box ── */
  .inputs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8pt;
    background: var(--gray-50);
    border-radius: 6pt;
    padding: 12pt;
    margin-bottom: 16pt;
  }
  .input-item .i-label { font-size: 7pt; color: var(--gray-500); text-transform: uppercase; letter-spacing: 0.5pt; }
  .input-item .i-value { font-size: 10.5pt; font-weight: 800; color: var(--gray-900); }

  /* ── CTA block ── */
  .cta-block {
    background: var(--navy);
    border-radius: 8pt;
    padding: 22pt 28pt;
    text-align: center;
    margin-bottom: 14pt;
  }
  .cta-block .cta-title {
    font-size: 16pt;
    font-weight: 900;
    color: #ffffff;
    margin-bottom: 6pt;
  }
  .cta-block .cta-sub {
    font-size: 8.5pt;
    color: rgba(255,255,255,0.75);
    line-height: 1.5;
    margin-bottom: 12pt;
  }
  .cta-btn {
    display: inline-block;
    background: var(--gold);
    color: var(--navy);
    font-size: 9pt;
    font-weight: 800;
    padding: 9pt 28pt;
    border-radius: 4pt;
    text-decoration: none;
    letter-spacing: 0.3pt;
  }

  /* ── Next-steps list ── */
  .next-steps { margin-bottom: 16pt; }
  .next-step {
    display: flex;
    gap: 14pt;
    align-items: flex-start;
    padding: 10pt;
    background: var(--gray-50);
    border-radius: 6pt;
    margin-bottom: 8pt;
    border-left: 3pt solid transparent;
  }
  .next-step.step1 { border-color: var(--navy);  }
  .next-step.step2 { border-color: var(--gold);  }
  .next-step.step3 { border-color: var(--green); }
  .step-num {
    width: 24pt;
    height: 24pt;
    border-radius: 50%;
    font-size: 10pt;
    font-weight: 900;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }
  .step1 .step-num { background: var(--navy);  }
  .step2 .step-num { background: var(--gold);  }
  .step3 .step-num { background: var(--green); }
  .step-body .s-title { font-size: 10pt; font-weight: 800; color: var(--gray-900); margin-bottom: 3pt; }
  .step-body .s-desc  { font-size: 8pt; color: var(--gray-500); line-height: 1.4; }
  .step-body .s-link  { font-size: 8pt; font-weight: 700; color: var(--navy); margin-top: 3pt; }

  /* ── Founder quote ── */
  .founder-quote {
    border: 1pt solid var(--gold);
    border-radius: 6pt;
    padding: 14pt 18pt;
    background: var(--gold-light);
    margin-bottom: 14pt;
  }
  .founder-quote blockquote {
    font-size: 9pt;
    font-style: italic;
    color: var(--gray-700);
    line-height: 1.6;
    margin-bottom: 8pt;
  }
  .founder-quote .attribution {
    font-size: 8pt;
    font-weight: 700;
    color: var(--navy);
  }
  .founder-quote .attribution-sub {
    font-size: 7.5pt;
    color: var(--gray-500);
  }

  /* ── Contact row ── */
  .contact-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: var(--navy);
    border-radius: 6pt;
    overflow: hidden;
  }
  .contact-cell {
    padding: 10pt 12pt;
    text-align: center;
    border-right: 1pt solid rgba(255,255,255,0.1);
  }
  .contact-cell:last-child { border-right: none; }
  .contact-cell .c-type { font-size: 7pt; color: rgba(255,255,255,0.55); text-transform: uppercase; letter-spacing: 0.5pt; margin-bottom: 3pt; }
  .contact-cell .c-val  { font-size: 8.5pt; font-weight: 700; color: var(--gold); }

  /* ─────────────────────────────────────────────────────── */
  /*  PAGE 1 — COVER                                         */
  /* ─────────────────────────────────────────────────────── */
  .cover-page {
    background: var(--navy);
    display: flex;
    flex-direction: column;
    min-height: 11in;
  }

  /* Navy top stripe */
  .cover-top {
    padding: 40pt 52pt 32pt;
    flex-shrink: 0;
  }
  .cover-logo-lockup {
    display: flex;
    align-items: baseline;
    gap: 10pt;
    margin-bottom: 48pt;
  }
  .cover-logo-text {
    font-size: 30pt;
    font-weight: 900;
    color: var(--gold);
    letter-spacing: -1pt;
  }
  .cover-logo-sub {
    font-size: 9pt;
    color: rgba(255,255,255,0.5);
    font-weight: 400;
    letter-spacing: 0.3pt;
  }
  .cover-doc-label {
    font-size: 8pt;
    font-weight: 700;
    color: var(--gold);
    letter-spacing: 2pt;
    text-transform: uppercase;
    margin-bottom: 12pt;
  }
  .cover-headline {
    font-size: 28pt;
    font-weight: 900;
    color: #ffffff;
    line-height: 1.15;
    margin-bottom: 8pt;
  }
  .cover-subheadline {
    font-size: 11pt;
    color: rgba(255,255,255,0.65);
    line-height: 1.4;
    margin-bottom: 32pt;
  }

  /* Gold divider */
  .cover-divider {
    height: 2pt;
    background: var(--gold);
    margin: 0 52pt 28pt;
  }

  /* Savings hero on cover */
  .cover-savings-hero {
    margin: 0 52pt 28pt;
    background: rgba(255,255,255,0.06);
    border: 1pt solid rgba(255,255,255,0.12);
    border-radius: 8pt;
    padding: 24pt 32pt;
  }
  .cover-savings-label {
    font-size: 8pt;
    color: rgba(255,255,255,0.55);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1.5pt;
    margin-bottom: 6pt;
  }
  .cover-savings-amount {
    font-size: 52pt;
    font-weight: 900;
    color: #ffffff;
    letter-spacing: -2.5pt;
    line-height: 1;
    margin-bottom: 4pt;
  }
  .cover-savings-pct {
    font-size: 14pt;
    font-weight: 700;
    color: #5de07c;
    margin-bottom: 6pt;
  }
  .cover-savings-basis {
    font-size: 8pt;
    color: rgba(255,255,255,0.45);
    line-height: 1.4;
  }

  /* Cover stat trio */
  .cover-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    margin: 0 52pt 28pt;
  }
  .cover-stat {
    padding: 14pt 16pt;
    background: rgba(255,255,255,0.05);
    border-right: 1pt solid rgba(255,255,255,0.1);
    border-top: 1pt solid rgba(255,255,255,0.1);
    border-bottom: 1pt solid rgba(255,255,255,0.1);
  }
  .cover-stat:first-child {
    border-left: 1pt solid rgba(255,255,255,0.1);
    border-radius: 6pt 0 0 6pt;
  }
  .cover-stat:last-child { border-radius: 0 6pt 6pt 0; border-right: 1pt solid rgba(255,255,255,0.1); }
  .cover-stat .cs-label { font-size: 7pt; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.5pt; margin-bottom: 4pt; }
  .cover-stat .cs-value { font-size: 14pt; font-weight: 800; color: #ffffff; margin-bottom: 1pt; }
  .cover-stat .cs-sub   { font-size: 7pt; color: rgba(255,255,255,0.4); }

  /* Cover footer */
  .cover-footer {
    margin: auto 52pt 0;
    padding-bottom: 32pt;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-top: 1pt solid rgba(255,255,255,0.12);
    padding-top: 16pt;
  }
  .cover-footer-left { font-size: 7.5pt; color: rgba(255,255,255,0.45); line-height: 1.5; }
  .cover-footer-right { font-size: 7.5pt; color: rgba(255,255,255,0.3); text-align: right; }

  /* Prepared for band */
  .cover-prepared-for {
    margin: 0 52pt 20pt;
    background: rgba(255,255,255,0.08);
    border-left: 4pt solid var(--gold);
    border-radius: 0 6pt 6pt 0;
    padding: 12pt 18pt;
  }
  .cover-prepared-label { font-size: 7.5pt; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.8pt; margin-bottom: 4pt; }
  .cover-prepared-name  { font-size: 16pt; font-weight: 900; color: #ffffff; }
  .cover-prepared-sub   { font-size: 8.5pt; color: rgba(255,255,255,0.55); margin-top: 2pt; }

  /* Inputs summary on cover */
  .cover-inputs {
    margin: 0 52pt 0pt;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    background: rgba(255,255,255,0.04);
    border: 1pt solid rgba(255,255,255,0.1);
    border-radius: 6pt;
    overflow: hidden;
  }
  .cover-input-item {
    padding: 10pt 14pt;
    border-right: 1pt solid rgba(255,255,255,0.08);
  }
  .cover-input-item:last-child { border-right: none; }
  .cover-input-item .ci-label { font-size: 7pt; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.5pt; margin-bottom: 3pt; }
  .cover-input-item .ci-value { font-size: 10pt; font-weight: 800; color: rgba(255,255,255,0.85); }

  /* ── Inline inputs on page 1 only ── */
  .footnote {
    font-size: 7pt;
    color: var(--gray-500);
    font-style: italic;
    line-height: 1.4;
    margin-top: 8pt;
  }

  /* ── Spacer ── */
  .spacer-8  { height: 8pt; }
  .spacer-12 { height: 12pt; }
  .spacer-16 { height: 16pt; }

  /* ── Page break controls ── */
  .callout,
  .stat-card,
  .stat-cards,
  .col-card,
  .two-col,
  .timeline-item,
  .impl-card,
  .impl-cards,
  .next-step,
  .founder-quote,
  .contact-row,
  .compliance-row,
  .projection-row,
  .cover-savings-hero,
  .cover-stats,
  .cover-inputs,
  .hero-savings {
    page-break-inside: avoid;
    break-inside: avoid;
  }

</style>
</head>
<body>

<!-- ════════════════════════════════════════════════════
     PAGE 1 — COVER
     ════════════════════════════════════════════════════ -->
<div class="page cover-page">

  <div class="cover-top">
    <div class="cover-logo-lockup">
      <img src="https://usrad.com/images/logo/brand/usrad-logo-gold-white-text.svg"
           alt="USRad"
           style="height: 44pt; width: auto; display: block;" />
    </div>

    <div class="cover-doc-label">Custom Imaging Savings Analysis</div>
    <div class="cover-headline">Prepared exclusively for<br>${d.companyName}</div>
    <div class="cover-subheadline">${d.totalEmployees.toLocaleString()} Employees · Workers' Comp + Employee Health Benefits</div>
  </div>

  <div class="cover-divider"></div>

  <div class="cover-savings-hero">
    <div class="cover-savings-label">Projected Year-One Savings</div>
    <div class="cover-savings-amount">${fmt(d.annualSavings)}</div>
    <div class="cover-savings-pct">${d.savingsPct}% reduction from current imaging spend</div>
    <div class="cover-savings-basis">Based on ${d.totalScans.toLocaleString()} annual scans redirected from hospital rates (avg $${d.avgCost.toLocaleString()}) to USRad flat rates ($350)</div>
  </div>

  <div class="cover-stats">
    <div class="cover-stat">
      <div class="cs-label">Current Annual Spend</div>
      <div class="cs-value">${fmtShort(d.currentSpend)}</div>
      <div class="cs-sub">at avg $${d.avgCost.toLocaleString()}/scan</div>
    </div>
    <div class="cover-stat">
      <div class="cs-label">USRad Annual Cost</div>
      <div class="cs-value">${fmtShort(d.usradCost)}</div>
      <div class="cs-sub">at $350 flat rate/scan</div>
    </div>
    <div class="cover-stat">
      <div class="cs-label">5-Year Financial Impact</div>
      <div class="cs-value">${fmtShort(d.fiveYearSavings)}</div>
      <div class="cs-sub">projected cumulative</div>
    </div>
  </div>

  <div class="spacer-16"></div>

  <div class="cover-inputs">
    <div class="cover-input-item">
      <div class="ci-label">Total Employees</div>
      <div class="ci-value">${d.totalEmployees.toLocaleString()}</div>
    </div>
    <div class="cover-input-item">
      <div class="ci-label">Annual Imaging Scans</div>
      <div class="ci-value">${d.totalScans.toLocaleString()}</div>
    </div>
    <div class="cover-input-item">
      <div class="ci-label">Average Cost / Scan</div>
      <div class="ci-value">$${d.avgCost.toLocaleString()}</div>
    </div>
  </div>

  <div class="cover-footer">
    <div class="cover-footer-left">
      Confidential Employer Analysis · ${d.generatedDate}<br>
      Prepared by Michael Cabrera, President &amp; Founder, USRad<br>
      Founded the managed imaging category with AnciCare (acquired by CorVel, NASDAQ: CRVL)    </div>
    <div class="cover-footer-right">usrad.com<br>mcabrera@usrad.com</div>
  </div>

</div><!-- /cover-page -->


<!-- ════════════════════════════════════════════════════
     PAGE 2 — FINANCIAL IMPACT SUMMARY
     ════════════════════════════════════════════════════ -->
<div class="page">
  <div class="running-header">
    <img src="https://usrad.com/images/logo/brand/usrad-logo-gold-white-text.svg"
         alt="USRad"
         style="height: 28pt; width: auto; display: block;" />
    <span class="section-label">Financial Impact Summary</span>
  </div>

  <div class="content">
    <div class="section-label-gold">Financial Impact Summary</div>
    <div class="section-title">Your Imaging Savings Opportunity</div>
    <div class="section-subtitle">
      Based on ${d.companyName}'s workforce profile and current imaging spend, USRad projects the following
      annual savings across your workers' comp and employee health benefits programs.
    </div>

    <!-- Hero savings block -->
    <div class="hero-savings">
      <div class="label">Projected Year-One Total Imaging Savings</div>
      <div class="amount">${fmt(d.annualSavings)}</div>
      <div class="pct">${d.savingsPct}% cost reduction</div>
      <div class="sub">Based on ${d.totalScans.toLocaleString()} annual scans redirected from hospital rates (avg $${d.avgCost.toLocaleString()}) to USRad flat rates ($350)</div>
    </div>

    <!-- 4-stat row -->
    <div class="stat-cards">
      <div class="stat-card red">
        <div class="label">Current Annual Spend</div>
        <div class="value">${fmtShort(d.currentSpend)}</div>
        <div class="sub">at avg $${d.avgCost.toLocaleString()}/scan</div>
      </div>
      <div class="stat-card green">
        <div class="label">Year-One Savings</div>
        <div class="value">${fmtShort(d.annualSavings)}</div>
        <div class="sub">${d.savingsPct}% reduction</div>
      </div>
      <div class="stat-card navy">
        <div class="label">5-Year Financial Impact</div>
        <div class="value">${fmtShort(d.fiveYearSavings)}</div>
        <div class="sub">assuming stable scan volumes</div>
      </div>
    </div>

    <!-- Per-employee -->
    <div class="callout navy">
      <div class="callout-title">Per-Employee Annual Savings: ${fmt(d.perEmployeeSavings)}</div>
      <p>Based on ${d.totalEmployees.toLocaleString()} total employees and ${fmtShort(d.annualSavings)} projected annual savings.
         CFOs evaluating per-capita benefit spend will see immediate impact in this metric.</p>
    </div>

    <!-- Not included notice -->
    <div class="callout gold">
      <div class="callout-title">Not Included In This Analysis</div>
      <p>The figures above are conservative and reflect direct imaging costs only. Additional value not captured here:
         reduced disability duration (avg. 18+ days), lower indemnity and litigation costs, productivity improvements
         from faster return-to-work, and employee satisfaction gains. Actual total savings typically run 20–40% higher.</p>
    </div>

  </div>

  <div class="running-footer">
    <span>Generated ${d.generatedDate} · Confidential — Prepared exclusively for ${d.companyName}</span>
    <span>Page 2 of 6</span>
  </div>
</div>


<!-- ════════════════════════════════════════════════════
     PAGE 3 — SAVINGS BREAKDOWN
     ════════════════════════════════════════════════════ -->
<div class="page">
  <div class="running-header">
    <img src="https://usrad.com/images/logo/brand/usrad-logo-gold-white-text.svg"
         alt="USRad"
         style="height: 28pt; width: auto; display: block;" />
    <span class="section-label">Savings Breakdown</span>
  </div>

  <div class="content">
    <div class="section-label-gold">Savings Breakdown</div>
    <div class="section-title">Where the Savings Come From</div>
    <div class="section-subtitle">
      Your projected imaging spend before and after USRad, based on the volume and cost you entered.
    </div>

    <!-- Two-column WC / Health split -->
    <div class="two-col">
      <div class="col-card">
        <div class="col-title">Annual Imaging Savings</div>
        <div class="row"><span class="rLabel">Annual Imaging Scans</span><span class="rValue">${d.totalScans.toLocaleString()}</span></div>
        <div class="row"><span class="rLabel">Current Cost / Scan</span><span class="rValue">$${d.avgCost.toLocaleString()}</span></div>
        <div class="row"><span class="rLabel">Current Annual Spend</span><span class="rValue">${fmtShort(d.currentSpend)}</span></div>
        <div class="row"><span class="rLabel">USRad Cost / Scan</span><span class="rValue">$350</span></div>
        <div class="row"><span class="rLabel">USRad Annual Total</span><span class="rValue">${fmtShort(d.usradCost)}</span></div>
        <div class="row"><span class="rLabel">Annual Savings</span><span class="rValue big">${fmtShort(d.annualSavings)}</span></div>
        <div class="row"><span class="rLabel">Savings Rate</span><span class="rValue big">${d.savingsPct}%</span></div>
      </div>
    </div>

    <!-- Scan-level comparison table -->
    <div class="section-label-gold" style="margin-top:4pt;">Scan-Level Cost Comparison</div>
    <div class="spacer-8"></div>
    <table>
      <thead>
        <tr>
          <th>Scan Type</th>
          <th>Hospital Rate</th>
          <th>USRad Rate</th>
          <th>Savings / Scan</th>
          <th>Markup vs. USRad</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="strong">MRI (brain / spine)</td>
          <td class="red-val">$2,400–$3,200</td>
          <td class="green-val">$260–$350</td>
          <td>$2,050–$2,950</td>
          <td class="red-val">9–12×</td>
        </tr>
        <tr>
          <td class="strong">CT Scan</td>
          <td class="red-val">$1,500–$2,500</td>
          <td class="green-val">$250–$350</td>
          <td>$1,250–$2,150</td>
          <td class="red-val">6–9×</td>
        </tr>
        <tr>
          <td class="strong">Ultrasound</td>
          <td class="red-val">$800–$1,400</td>
          <td class="green-val">$150–$250</td>
          <td>$650–$1,150</td>
          <td class="red-val">4–6×</td>
        </tr>
        <tr>
          <td class="strong">X-Ray</td>
          <td class="red-val">$400–$800</td>
          <td class="green-val">$75–$150</td>
          <td>$325–$650</td>
          <td class="red-val">4–6×</td>
        </tr>
      </tbody>
    </table>

    <!-- Hospital markup bar chart -->
    <div class="section-label-gold">Why the Savings Are This Large: The Hospital Markup Reality</div>
    <div class="spacer-8"></div>
    <div class="bar-chart">
      <div class="bar-row">
        <div class="bar-label">Hospital Outpatient</div>
        <div class="bar-track"><div class="bar-fill red-bar" style="width:${hospitalPct}%"><span>$3,200</span></div></div>
        <div class="bar-value" style="color:var(--red);">$3,200</div>
      </div>
      <div class="bar-row">
        <div class="bar-label">PPO Avg In-Network</div>
        <div class="bar-track"><div class="bar-fill navy-bar" style="width:${ppoPct}%"><span>$1,800</span></div></div>
        <div class="bar-value" style="color:var(--navy);">$1,800</div>
      </div>
      <div class="bar-row">
        <div class="bar-label">Ind. Imaging Center</div>
        <div class="bar-track"><div class="bar-fill gold-bar" style="width:${imagingPct}%"><span>$900</span></div></div>
        <div class="bar-value" style="color:var(--gold);">$900</div>
      </div>
      <div class="bar-row">
        <div class="bar-label">USRad Network</div>
        <div class="bar-track"><div class="bar-fill green-bar" style="width:${usradPct}%"><span>$350</span></div></div>
        <div class="bar-value" style="color:var(--green);">$350</div>
      </div>
    </div>
    <p class="footnote">Hospital outpatient rates are 711% above Medicare baseline. USRad eliminates this markup entirely through its managed imaging network.</p>

  </div>

  <div class="running-footer">
    <span>Generated ${d.generatedDate} · Confidential — Prepared exclusively for ${d.companyName}</span>
    <span>Page 3 of 6</span>
  </div>
</div>


<!-- ════════════════════════════════════════════════════
     PAGE 4 — ROI TIMELINE & 3-YEAR PROJECTION
     ════════════════════════════════════════════════════ -->
<div class="page">
  <div class="running-header">
    <img src="https://usrad.com/images/logo/brand/usrad-logo-gold-white-text.svg"
         alt="USRad"
         style="height: 28pt; width: auto; display: block;" />
    <span class="section-label">ROI Timeline &amp; Financial Projection</span>
  </div>

  <div class="content">
    <div class="section-label-gold">ROI Timeline</div>
    <div class="section-title">When You See Results — Month by Month</div>
    <div class="section-subtitle">
      Savings begin immediately. The timeline below shows how and when each layer of financial impact accrues for ${d.companyName}.
    </div>

    <!-- Timeline -->
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-badge navy">Day 1</div>
        <div class="timeline-content">
          <div class="t-title">Immediate savings on every redirected scan</div>
          <div class="t-detail">50–70% cost reduction begins the moment the first employee uses USRad instead of a hospital outpatient facility. No ramp-up period.</div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-badge green">Month 1</div>
        <div class="timeline-content">
          <div class="t-title">Measurable utilization increase</div>
          <div class="t-detail">Employees begin booking scans they were previously delaying due to cost. Average 73% increase in necessary imaging completed.</div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-badge green">Month 3</div>
        <div class="timeline-content">
          <div class="t-title">40–60% total imaging cost reduction visible in claims data</div>
          <div class="t-detail">Finance team can see clear reduction in imaging line items across both WC and health plan claims — documentable for CFO reporting.</div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-badge gold">Month 6</div>
        <div class="timeline-content">
          <div class="t-title">Reduced disability duration impacts WC costs</div>
          <div class="t-detail">Earlier imaging = faster diagnosis = 18+ day reduction in average disability duration. WC indemnity costs begin falling measurably.</div>
        </div>
      </div>
      <div class="timeline-item">
        <div class="timeline-badge green">Year 1</div>
        <div class="timeline-content">
          <div class="t-title">Full ROI including productivity &amp; satisfaction</div>
          <div class="t-detail">Full ${fmtShort(d.annualSavings)} savings realized for ${d.companyName}. Employee satisfaction scores improve. WC claim severity drops measurably.</div>
        </div>
      </div>
    </div>

    <hr class="divider"/>

    <!-- 3-year projection -->
    <div class="section-label-gold">3-Year Financial Projection</div>
    <div class="spacer-8"></div>

    <div class="projection-row">
      <div class="proj-label">Year 1</div>
      <div class="proj-track"><div class="proj-fill" style="width:${yr1Pct}%"><span>${fmtShort(d.annualSavings)} annual</span></div></div>
      <div class="proj-cum">${fmtShort(d.annualSavings)}</div>
    </div>
    <div class="projection-row">
      <div class="proj-label">Year 2</div>
      <div class="proj-track"><div class="proj-fill" style="width:${yr2Pct}%"><span>${fmtShort(d.annualSavings)} annual</span></div></div>
      <div class="proj-cum">${fmtShort(d.annualSavings * 2)}</div>
    </div>
    <div class="projection-row">
      <div class="proj-label">Year 3</div>
      <div class="proj-track"><div class="proj-fill" style="width:${yr3Pct}%"><span>${fmtShort(d.annualSavings)} annual</span></div></div>
      <div class="proj-cum">${fmtShort(d.threeYearSavings)}</div>
    </div>

    <div class="spacer-12"></div>

    <div class="callout navy">
      <div class="callout-title">Per-Employee Savings: ${fmt(d.perEmployeeSavings)} / year</div>
      <p>Based on ${d.totalEmployees.toLocaleString()} total employees and ${fmtShort(d.annualSavings)} annual savings.
         5-year cumulative impact: ${fmtShort(d.fiveYearSavings)} — assuming stable scan volumes and flat pricing.</p>
    </div>

    <div class="callout gold">
      <div class="callout-title">CFO Note: Projections Are Conservative</div>
      <p>These figures capture direct imaging cost reduction only. Disability duration savings, reduced indemnity costs,
         productivity improvements, and employee retention value are excluded. Actual total impact typically runs 20–40% higher.</p>
    </div>

  </div>

  <div class="running-footer">
    <span>Generated ${d.generatedDate} · Confidential — Prepared exclusively for ${d.companyName}</span>
    <span>Page 4 of 6</span>
  </div>
</div>


<!-- ════════════════════════════════════════════════════
     PAGE 5 — OPERATIONAL MODEL & IMPLEMENTATION
     ════════════════════════════════════════════════════ -->
<div class="page">
  <div class="running-header">
    <img src="https://usrad.com/images/logo/brand/usrad-logo-gold-white-text.svg"
         alt="USRad"
         style="height: 28pt; width: auto; display: block;" />
    <span class="section-label">Operational Model &amp; Implementation</span>
  </div>

  <div class="content">
    <div class="section-label-gold">The Operational Model</div>
    <div class="section-title">How USRad Delivers These Results</div>
    <div class="section-subtitle">
      The same model that transformed workers' comp imaging for 168,000+ claimants — now available for your entire workforce.
    </div>

    <!-- 4 heritage stats -->
    <div class="stat-cards" style="margin-bottom:18pt;">
      <div class="stat-card gold">
        <div class="label">Founded</div>
        <div class="value">1994</div>
        <div class="sub">Managed imaging category created</div>
      </div>
      <div class="stat-card navy">
        <div class="label">Cases Managed</div>
        <div class="value">168K+</div>
        <div class="sub">Under the AnciCare model</div>
      </div>
      <div class="stat-card green">
        <div class="label">Cost Reduction</div>
        <div class="value">50–70%</div>
        <div class="sub">Delivered historically</div>
      </div>
    </div>

    <hr class="divider"/>

    <!-- Implementation 30-day roadmap -->
    <div class="section-label-gold">Implementation Roadmap — Go Live in 30 Days</div>
    <div class="spacer-8"></div>

    <div class="impl-cards">
      <div class="impl-card">
        <div class="week-label">Week 1</div>
        <div class="week-title">Contract &amp; Discovery</div>
        <ul>
          <li>Execute master services agreement</li>
          <li>Review historical imaging spend data</li>
          <li>Map existing WC &amp; health plan workflows</li>
          <li>Identify implementation stakeholders</li>
        </ul>
      </div>
      <div class="impl-card">
        <div class="week-label">Week 2–3</div>
        <div class="week-title">Technical Setup</div>
        <ul>
          <li>Configure employer portal &amp; booking</li>
          <li>Establish claims billing &amp; reporting feeds</li>
          <li>Complete integration testing &amp; validation</li>
          <li>Activate network in employee geography</li>
        </ul>
      </div>
      <div class="impl-card launch">
        <div class="week-label">Week 4</div>
        <div class="week-title">Launch &amp; Training</div>
        <ul>
          <li>Deploy employee communications</li>
          <li>Train HR team &amp; WC adjusters</li>
          <li>Activate employer dashboard</li>
          <li>Go-live with dedicated support</li>
          <li>Review early utilization baselines</li>
        </ul>
      </div>
    </div>

    <!-- Compliance -->
    <div class="section-label-gold">Compliance &amp; Integration</div>
    <div class="spacer-8"></div>

    <div class="compliance-row">
      <span class="c-check">✓</span>
      <span class="c-label">Zero Network Conflicts</span>
      <span class="c-desc">Supplemental overlay — enhances, never replaces, existing coverage or carrier relationships</span>
    </div>

  </div>

  <div class="running-footer">
    <span>Generated ${d.generatedDate} · Confidential — Prepared exclusively for ${d.companyName}</span>
    <span>Page 5 of 6</span>
  </div>
</div>


<!-- ════════════════════════════════════════════════════
     PAGE 6 — EXECUTIVE NEXT STEPS
     ════════════════════════════════════════════════════ -->
<div class="page">
  <div class="running-header">
    <img src="https://usrad.com/images/logo/brand/usrad-logo-gold-white-text.svg"
         alt="USRad"
         style="height: 28pt; width: auto; display: block;" />
    <span class="section-label">Executive Next Steps</span>
  </div>

  <div class="content">
    <div class="section-label-gold">Next Steps</div>
    <div class="section-title">Your Path to Immediate Savings</div>
    <div class="section-subtitle">
      Implementing USRad requires no budget approval for setup, no IT project, and no disruption to your current
      benefits structure. The path from today to live is three conversations and 30 days.
    </div>

    <!-- 3-step next steps -->
    <div class="next-steps" style="margin-bottom:10pt;">
      <div class="next-step step1">
        <div class="step-num">1</div>
        <div class="step-body">
          <div class="s-title">Schedule Your Executive Briefing</div>
          <div class="s-desc">A 30-minute direct conversation with Michael Cabrera, USRad President and Founder. Michael will review
          your specific situation, walk through projected savings, and confirm implementation fit. No sales team. No middlemen.</div>
          <div class="s-link">Book at: usrad.com/employer/schedule</div>
        </div>
      </div>
      <div class="next-step step2">
        <div class="step-num">2</div>
        <div class="step-body">
          <div class="s-title">Receive Your Custom ROI Model</div>
          <div class="s-desc">Within 48 hours of your briefing, USRad will prepare a detailed financial model using your actual claims data —
          refined beyond these initial projections and ready for internal CFO or benefits committee presentation.</div>
          <div class="s-link">Delivered within 48 hours of briefing</div>
        </div>
      </div>
      <div class="next-step step3">
        <div class="step-num">3</div>
        <div class="step-body">
          <div class="s-title">Execute Agreement &amp; Go Live in 30 Days</div>
          <div class="s-desc">Seamless implementation with dedicated project management. Your team commits 4–6 hours total.
          First savings appear on Day 1 of program launch.</div>
          <div class="s-link">Timeline: 30 days from contract to first employee booking</div>
        </div>
      </div>
    </div>

    <!-- CTA block -->
    <div class="cta-block" style="margin-bottom:10pt;">
      <div class="cta-title">Schedule Your Executive Briefing</div>
      <div class="cta-sub">
        30 minutes directly with Michael Cabrera — no sales team, no middlemen.<br>
        He will review this analysis personally and answer every question.
      </div>
      <div class="cta-btn">usrad.com/employer/schedule</div>
    </div>

    <!-- Founder quote -->
    <div class="founder-quote" style="margin-bottom:10pt;">
      <blockquote>
        "I built this business on relationships, not transactions. When you schedule a consultation, you are getting
        me directly — not a sales team. I will personally analyze your situation, show you the real savings potential,
        and guide you through implementation. That is how I have always done business."
      </blockquote>
      <div class="attribution">— Michael Cabrera, President &amp; Founder, USRad</div>
      <div class="attribution-sub">Founded the managed imaging category with AnciCare (acquired by CorVel, NASDAQ: CRVL) · 168,000+ cases managed</div>
    </div>

    <!-- Contact row -->
    <div class="contact-row">
      <div class="contact-cell">
        <div class="c-type">Schedule Online</div>
        <div class="c-val">usrad.com/employer/schedule</div>
      </div>
      <div class="contact-cell">
        <div class="c-type">Email Michael Directly</div>
        <div class="c-val">mcabrera@usrad.com</div>
      </div>
      <div class="contact-cell">
        <div class="c-type">Call Us</div>
        <div class="c-val">(888) USRad24</div>
      </div>
    </div>

    <p class="footnote" style="margin-top:6pt; text-align:center;">
      Prepared exclusively for ${d.companyName} on ${d.generatedDate}. Confidential Employer Analysis.
      Figures are projections based on stated workforce size and current scan pricing; actual results depend on utilization patterns.
    </p>

  </div>

  <div class="running-footer">
    <span>Generated ${d.generatedDate} · Confidential — Prepared exclusively for ${d.companyName}</span>
    <span>Page 6 of 6</span>
  </div>
</div>

</body>
</html>`;
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function generateROIReport(inputs: ROIInputs): Promise<Buffer> {
  const d = calculateROI(inputs);
  const html = buildHTML(d);

  // ── Detect environment ──
  const isDev = process.env.NODE_ENV === "development";

  let browser;

  if (isDev) {
    // Local development — use installed puppeteer
    // Run: npm install puppeteer (full, not puppeteer-core) for local dev only
    const puppeteerFull = await import("puppeteer").catch(() => null);
    if (!puppeteerFull) {
      throw new Error(
        "For local dev, install puppeteer: npm install puppeteer\n" +
        "For Vercel production, puppeteer-core + @sparticuz/chromium are used automatically."
      );
    }
    browser = await puppeteerFull.default.launch({ headless: true });
  } else {
    // Vercel serverless — use @sparticuz/chromium
    // chromium.headless returns the correct value for the env automatically
    browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless as boolean | "shell",
    });
  }

  try {
    const page = await browser.newPage();

    // Set viewport to US Letter dimensions
    await page.setViewport({ width: 816, height: 1056 });

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "Letter",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      displayHeaderFooter: false,
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}

export type { ROIData };