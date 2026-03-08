// src/lib/roi-pdf/generateROIReport.ts
// Pure TypeScript PDF generator using pdf-lib — no Python, no subprocesses
// Runs natively in Vercel serverless functions

import { PDFDocument, rgb, StandardFonts, PDFPage, PDFFont } from "pdf-lib";

// ─── Brand Colors ────────────────────────────────────────────────────────────
const BRAND = {
  navy:       rgb(0,    0.188, 0.529),  // #003087
  gold:       rgb(0.8,  0.6,   0.2),    // #cc9933
  darkGray:   rgb(0.15, 0.15,  0.15),
  midGray:    rgb(0.45, 0.45,  0.45),
  lightGray:  rgb(0.92, 0.92,  0.92),
  white:      rgb(1,    1,     1),
  red:        rgb(0.84, 0.18,  0.18),
  green:      rgb(0.13, 0.55,  0.27),
  greenLight: rgb(0.9,  0.97,  0.93),
  redLight:   rgb(0.99, 0.92,  0.92),
  navyLight:  rgb(0.93, 0.95,  0.99),
};

// ─── Layout constants ─────────────────────────────────────────────────────────
const PAGE_W = 612;  // US Letter
const PAGE_H = 792;
const MARGIN = 48;
const COL_W  = (PAGE_W - MARGIN * 2 - 16) / 2;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function drawRect(
  page: PDFPage,
  x: number, y: number, w: number, h: number,
  color: ReturnType<typeof rgb>,
  borderColor?: ReturnType<typeof rgb>,
  borderWidth = 1
) {
  page.drawRectangle({ x, y, width: w, height: h, color });
  if (borderColor) {
    page.drawRectangle({ x, y, width: w, height: h, borderColor, borderWidth, color: undefined });
  }
}

function drawText(
  page: PDFPage,
  text: string,
  x: number, y: number,
  font: PDFFont,
  size: number,
  color: ReturnType<typeof rgb>,
  maxWidth?: number
) {
  if (maxWidth) {
    // Simple word wrap
    const words = text.split(" ");
    let line = "";
    let currentY = y;
    const lineHeight = size * 1.4;
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      const w = font.widthOfTextAtSize(test, size);
      if (w > maxWidth && line) {
        page.drawText(line, { x, y: currentY, font, size, color });
        line = word;
        currentY -= lineHeight;
      } else {
        line = test;
      }
    }
    if (line) page.drawText(line, { x, y: currentY, font, size, color });
    return y - currentY + size; // total height used
  }
  page.drawText(text, { x, y, font, size, color });
  return size;
}

function centeredText(
  page: PDFPage,
  text: string,
  y: number,
  font: PDFFont,
  size: number,
  color: ReturnType<typeof rgb>
) {
  const w = font.widthOfTextAtSize(text, size);
  page.drawText(text, { x: (PAGE_W - w) / 2, y, font, size, color });
}

function rightText(
  page: PDFPage,
  text: string,
  rightEdge: number,
  y: number,
  font: PDFFont,
  size: number,
  color: ReturnType<typeof rgb>
) {
  const w = font.widthOfTextAtSize(text, size);
  page.drawText(text, { x: rightEdge - w, y, font, size, color });
}

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `$${Math.round(n / 1000)}K`;
  return `$${n.toLocaleString()}`;
}

// ─── ROI Calculations ─────────────────────────────────────────────────────────
interface ROIInputs {
  companyName:    string;
  contactName?:   string;
  totalEmployees: number;
  wcScans:        number;
  healthScans:    number;
  avgCost:        number;
}

interface ROIData extends ROIInputs {
  totalScans:        number;
  currentSpend:      number;
  usradCost:         number;
  annualSavings:     number;
  savingsPct:        number;
  wcCurrentSpend:    number;
  wcUsradCost:       number;
  wcSavings:         number;
  healthCurrentSpend:number;
  healthUsradCost:   number;
  healthSavings:     number;
  threeYearSavings:  number;
  perEmployeeSavings:number;
  generatedDate:     string;
}

function calculateROI(inputs: ROIInputs): ROIData {
  const { totalEmployees, wcScans, healthScans, avgCost } = inputs;
  const USRAD_RATE = 350;

  const totalScans         = wcScans + healthScans;
  const currentSpend       = totalScans * avgCost;
  const usradCost          = totalScans * USRAD_RATE;
  const annualSavings      = currentSpend - usradCost;
  const savingsPct         = currentSpend > 0 ? Math.round((annualSavings / currentSpend) * 100) : 0;
  const wcCurrentSpend     = wcScans * avgCost;
  const wcUsradCost        = wcScans * USRAD_RATE;
  const wcSavings          = wcCurrentSpend - wcUsradCost;
  const healthCurrentSpend = healthScans * avgCost;
  const healthUsradCost    = healthScans * USRAD_RATE;
  const healthSavings      = healthCurrentSpend - healthUsradCost;
  const threeYearSavings   = annualSavings * 3;
  const perEmployeeSavings = totalEmployees > 0 ? Math.round(annualSavings / totalEmployees) : 0;

  const now = new Date();
  const generatedDate = now.toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric"
  });

  return {
    ...inputs,
    totalScans, currentSpend, usradCost, annualSavings, savingsPct,
    wcCurrentSpend, wcUsradCost, wcSavings,
    healthCurrentSpend, healthUsradCost, healthSavings,
    threeYearSavings, perEmployeeSavings, generatedDate,
  };
}

// ─── Page builders ────────────────────────────────────────────────────────────

function buildCoverPage(doc: PDFDocument, d: ROIData, bold: PDFFont, regular: PDFFont) {
  const page = doc.addPage([PAGE_W, PAGE_H]);

  // Navy header band
  drawRect(page, 0, PAGE_H - 180, PAGE_W, 180, BRAND.navy);

  // Gold accent bar
  drawRect(page, 0, PAGE_H - 184, PAGE_W, 4, BRAND.gold);

  // USRad wordmark
  centeredText(page, "USRad", PAGE_H - 52, bold, 28, BRAND.gold);
  centeredText(page, "U.S. Radiology Network", PAGE_H - 72, regular, 10, rgb(0.7, 0.75, 0.85));

  // Main headline
  centeredText(page, "CUSTOM ROI ANALYSIS REPORT", PAGE_H - 112, bold, 18, BRAND.white);
  centeredText(page, "Employer Imaging Cost Reduction Program", PAGE_H - 132, regular, 11, rgb(0.75, 0.8, 0.9));

  // Company name band
  drawRect(page, MARGIN, PAGE_H - 260, PAGE_W - MARGIN * 2, 56, BRAND.navyLight);
  drawRect(page, MARGIN, PAGE_H - 260, 4, 56, BRAND.gold);
  centeredText(page, "Prepared for", PAGE_H - 224, regular, 9, BRAND.midGray);
  centeredText(page, d.companyName, PAGE_H - 242, bold, 20, BRAND.navy);

  // ── Hero savings block ──
  const heroY = PAGE_H - 380;
  drawRect(page, MARGIN, heroY, PAGE_W - MARGIN * 2, 96, BRAND.green);
  centeredText(page, "PROJECTED ANNUAL SAVINGS", heroY + 72, bold, 10, BRAND.white);
  centeredText(page, formatCurrency(d.annualSavings), heroY + 42, bold, 42, BRAND.white);
  centeredText(page, `${d.savingsPct}% reduction from current imaging spend`, heroY + 18, regular, 10, rgb(0.85, 0.97, 0.9));

  // ── Three stat cards ──
  const cardY = PAGE_H - 510;
  const cardH = 80;
  const cards = [
    { label: "Current Annual Spend",  value: formatCurrency(d.currentSpend),  color: BRAND.redLight,  accent: BRAND.red   },
    { label: "USRad Annual Cost",     value: formatCurrency(d.usradCost),      color: BRAND.navyLight, accent: BRAND.navy  },
    { label: "3-Year Total Savings",  value: formatCurrency(d.threeYearSavings), color: BRAND.greenLight, accent: BRAND.green },
  ];
  const cardW = (PAGE_W - MARGIN * 2 - 16) / 3;
  cards.forEach((c, i) => {
    const cx = MARGIN + i * (cardW + 8);
    drawRect(page, cx, cardY, cardW, cardH, c.color);
    drawRect(page, cx, cardY, cardW, 3, c.accent);
    drawText(page, c.label, cx + 10, cardY + cardH - 18, regular, 8, BRAND.midGray);
    drawText(page, c.value, cx + 10, cardY + 22, bold, 18, c.accent);
  });

  // ── Key inputs summary ──
  const infoY = PAGE_H - 618;
  drawRect(page, MARGIN, infoY, PAGE_W - MARGIN * 2, 88, BRAND.lightGray);
  drawText(page, "ANALYSIS INPUTS", MARGIN + 12, infoY + 72, bold, 8, BRAND.midGray);

  const cols = [
    [`Total Employees`, `${d.totalEmployees.toLocaleString()}`],
    [`WC Imaging Scans/yr`, `${d.wcScans.toLocaleString()}`],
    [`Health Plan Scans/yr`, `${d.healthScans.toLocaleString()}`],
    [`Current Avg Cost/Scan`, `$${d.avgCost.toLocaleString()}`],
    [`USRad Flat Rate/Scan`, `$350`],
    [`Total Annual Scans`, `${d.totalScans.toLocaleString()}`],
  ];
  const colW2 = (PAGE_W - MARGIN * 2 - 24) / 3;
  cols.forEach(([label, val], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const ix = MARGIN + 12 + col * colW2;
    const iy = infoY + 52 - row * 28;
    drawText(page, label, ix, iy, regular, 8, BRAND.midGray);
    drawText(page, val,   ix, iy - 12, bold, 10, BRAND.darkGray);
  });

  // ── Footer ──
  drawRect(page, 0, 0, PAGE_W, 36, BRAND.navy);
  drawText(page, `Generated ${d.generatedDate}  |  Confidential — Prepared exclusively for ${d.companyName}`, MARGIN, 13, regular, 8, rgb(0.65, 0.7, 0.82));
  rightText(page, "Page 1 of 4", PAGE_W - MARGIN, 13, regular, 8, rgb(0.65, 0.7, 0.82));
}

function buildCostBreakdownPage(doc: PDFDocument, d: ROIData, bold: PDFFont, regular: PDFFont) {
  const page = doc.addPage([PAGE_W, PAGE_H]);

  // Header
  drawRect(page, 0, PAGE_H - 56, PAGE_W, 56, BRAND.navy);
  drawRect(page, 0, PAGE_H - 60, PAGE_W, 4, BRAND.gold);
  drawText(page, "USRad", MARGIN, PAGE_H - 36, bold, 14, BRAND.gold);
  rightText(page, "COST BREAKDOWN ANALYSIS", PAGE_W - MARGIN, PAGE_H - 36, bold, 11, BRAND.white);

  let y = PAGE_H - 96;

  // Section title
  drawText(page, "Workers' Comp vs. Employee Health Plan — Side by Side", MARGIN, y, bold, 14, BRAND.navy);
  y -= 28;

  // ── WC column ──
  const lcx = MARGIN;
  const rcx = MARGIN + COL_W + 16;

  // WC Card header
  drawRect(page, lcx, y - 192, COL_W, 200, BRAND.navyLight);
  drawRect(page, lcx, y + 8,   COL_W, 4, BRAND.navy);
  drawText(page, "🏗  WORKERS' COMP IMAGING", lcx + 12, y - 10, bold, 9, BRAND.navy);

  const wcRows = [
    ["Annual WC Scans",     `${d.wcScans.toLocaleString()}`],
    ["Current Cost/Scan",   `$${d.avgCost.toLocaleString()}`],
    ["Current WC Spend",    formatCurrency(d.wcCurrentSpend)],
    ["USRad Cost/Scan",     "$350"],
    ["USRad WC Total",      formatCurrency(d.wcUsradCost)],
    ["WC Annual Savings",   formatCurrency(d.wcSavings)],
  ];
  wcRows.forEach(([label, val], i) => {
    const ry = y - 38 - i * 26;
    if (i % 2 === 0) drawRect(page, lcx, ry - 8, COL_W, 24, rgb(0.96, 0.97, 0.99));
    drawText(page, label, lcx + 12, ry, regular, 9, BRAND.midGray);
    const isLast = i === wcRows.length - 1;
    rightText(page, val, lcx + COL_W - 12, ry, bold, isLast ? 12 : 9, isLast ? BRAND.green : BRAND.darkGray);
  });

  // Health card header
  drawRect(page, rcx, y - 192, COL_W, 200, rgb(0.96, 0.99, 0.96));
  drawRect(page, rcx, y + 8,   COL_W, 4, BRAND.green);
  drawText(page, "👥  EMPLOYEE HEALTH PLAN", rcx + 12, y - 10, bold, 9, BRAND.green);

  const hRows = [
    ["Annual Health Scans",  `${d.healthScans.toLocaleString()}`],
    ["Current Cost/Scan",    `$${d.avgCost.toLocaleString()}`],
    ["Current Health Spend", formatCurrency(d.healthCurrentSpend)],
    ["USRad Cost/Scan",      "$350"],
    ["USRad Health Total",   formatCurrency(d.healthUsradCost)],
    ["Health Annual Savings",formatCurrency(d.healthSavings)],
  ];
  hRows.forEach(([label, val], i) => {
    const ry = y - 38 - i * 26;
    if (i % 2 === 0) drawRect(page, rcx, ry - 8, COL_W, 24, rgb(0.95, 0.99, 0.96));
    drawText(page, label, rcx + 12, ry, regular, 9, BRAND.midGray);
    const isLast = i === hRows.length - 1;
    rightText(page, val, rcx + COL_W - 12, ry, bold, isLast ? 12 : 9, isLast ? BRAND.green : BRAND.darkGray);
  });

  y -= 220;

  // ── Total savings summary bar ──
  drawRect(page, MARGIN, y, PAGE_W - MARGIN * 2, 52, BRAND.green);
  drawText(page, "COMBINED ANNUAL SAVINGS", MARGIN + 16, y + 34, bold, 9, BRAND.white);
  drawText(page, formatCurrency(d.annualSavings), MARGIN + 16, y + 12, bold, 22, BRAND.white);
  rightText(page, `${d.savingsPct}% total cost reduction`, PAGE_W - MARGIN - 16, y + 22, bold, 11, rgb(0.85, 0.97, 0.9));

  y -= 72;

  // ── Hospital markup context ──
  drawText(page, "Why the Savings Are This Large: The Hospital Markup Reality", MARGIN, y, bold, 12, BRAND.navy);
  y -= 24;

  const markupRows = [
    ["Medicare Baseline Rate",  "$450",   BRAND.midGray],
    ["Independent Imaging Center", "$600", BRAND.darkGray],
    ["USRad Network Rate",      "$350",   BRAND.green],
    ["Hospital Outpatient Rate","$3,200", BRAND.red],
  ];
  markupRows.forEach(([label, val, color]) => {
    drawRect(page, MARGIN, y - 8, PAGE_W - MARGIN * 2, 24, BRAND.lightGray);
    drawText(page, label, MARGIN + 12, y, regular, 9, BRAND.midGray);
    rightText(page, val, PAGE_W - MARGIN - 12, y, bold, 10, color);
    // bar
    const pct = parseInt(val.replace(/\D/g, "")) / 3200;
    drawRect(page, MARGIN + 200, y - 2, (PAGE_W - MARGIN * 2 - 280) * pct, 10, color);
    y -= 28;
  });

  drawText(page, "Hospital outpatient rates are 711% above Medicare baseline — USRad eliminates this markup entirely.", MARGIN, y - 8, regular, 8, BRAND.midGray, PAGE_W - MARGIN * 2);

  // Footer
  drawRect(page, 0, 0, PAGE_W, 36, BRAND.navy);
  drawText(page, `Generated ${d.generatedDate}  |  Confidential — Prepared exclusively for ${d.companyName}`, MARGIN, 13, regular, 8, rgb(0.65, 0.7, 0.82));
  rightText(page, "Page 2 of 4", PAGE_W - MARGIN, 13, regular, 8, rgb(0.65, 0.7, 0.82));
}

function buildROITimelinePage(doc: PDFDocument, d: ROIData, bold: PDFFont, regular: PDFFont) {
  const page = doc.addPage([PAGE_W, PAGE_H]);

  // Header
  drawRect(page, 0, PAGE_H - 56, PAGE_W, 56, BRAND.navy);
  drawRect(page, 0, PAGE_H - 60, PAGE_W, 4, BRAND.gold);
  drawText(page, "USRad", MARGIN, PAGE_H - 36, bold, 14, BRAND.gold);
  rightText(page, "ROI TIMELINE & IMPACT", PAGE_W - MARGIN, PAGE_H - 36, bold, 11, BRAND.white);

  let y = PAGE_H - 96;

  drawText(page, "When You See Results — Month by Month", MARGIN, y, bold, 14, BRAND.navy);
  y -= 32;

  // Timeline steps
  const steps = [
    { period: "Day 1",    title: "Immediate savings on every redirected scan",     detail: "50-70% cost reduction begins the moment the first employee uses USRad instead of a hospital outpatient facility.", color: BRAND.navy  },
    { period: "Month 1",  title: "Measurable utilization increase",                detail: "Employees start booking scans they were previously delaying due to cost. Average 73% increase in necessary imaging completed.", color: BRAND.green },
    { period: "Month 3",  title: "40-60% total imaging cost reduction visible",    detail: "Finance team can see clear reduction in imaging line items across both WC and health plan claims.", color: BRAND.green },
    { period: "Month 6",  title: "Reduced disability duration impacts WC costs",   detail: "Earlier imaging = faster diagnosis = 18+ day reduction in average disability duration. WC indemnity costs begin falling.", color: BRAND.gold  },
    { period: "Year 1",   title: "Full ROI including productivity & satisfaction", detail: `Full ${formatCurrency(d.annualSavings)} savings realized. Employee satisfaction scores improve. WC claim severity drops measurably.`, color: BRAND.green },
  ];

  steps.forEach((s) => {
    drawRect(page, MARGIN, y - 52, 64, 60, s.color);
    centeredText(page, s.period, y - 16, bold, 9, BRAND.white);

    drawRect(page, MARGIN + 72, y - 52, PAGE_W - MARGIN * 2 - 72, 60, BRAND.lightGray);
    drawText(page, s.title,  MARGIN + 84, y - 10, bold, 10, BRAND.darkGray);
    drawText(page, s.detail, MARGIN + 84, y - 26, regular, 8, BRAND.midGray, PAGE_W - MARGIN * 2 - 100);
    y -= 72;
  });

  y -= 12;

  // ── 3-Year projection ──
  drawText(page, "3-Year Financial Projection", MARGIN, y, bold, 13, BRAND.navy);
  y -= 24;

  const years = [
    { label: "Year 1", savings: d.annualSavings, cumulative: d.annualSavings },
    { label: "Year 2", savings: d.annualSavings, cumulative: d.annualSavings * 2 },
    { label: "Year 3", savings: d.annualSavings, cumulative: d.annualSavings * 3 },
  ];
  const barMaxW = PAGE_W - MARGIN * 2 - 180;
  years.forEach((yr) => {
    drawRect(page, MARGIN, y - 8, PAGE_W - MARGIN * 2, 28, BRAND.lightGray);
    drawText(page, yr.label, MARGIN + 8, y, bold, 9, BRAND.navy);
    drawText(page, `Annual: ${formatCurrency(yr.savings)}`, MARGIN + 64, y, regular, 9, BRAND.midGray);
    const barW = barMaxW * (yr.cumulative / d.threeYearSavings);
    drawRect(page, MARGIN + 180, y - 4, barW, 16, BRAND.green);
    rightText(page, `Cumulative: ${formatCurrency(yr.cumulative)}`, PAGE_W - MARGIN - 8, y, bold, 9, BRAND.green);
    y -= 36;
  });

  y -= 8;

  // ── Per-employee callout ──
  drawRect(page, MARGIN, y - 44, PAGE_W - MARGIN * 2, 52, BRAND.navyLight);
  drawRect(page, MARGIN, y - 44, 4, 52, BRAND.gold);
  drawText(page, `Per-Employee Savings: ${formatCurrency(d.perEmployeeSavings)}/year`, MARGIN + 16, y - 10, bold, 12, BRAND.navy);
  drawText(page, `Based on ${d.totalEmployees.toLocaleString()} total employees and ${formatCurrency(d.annualSavings)} annual savings`, MARGIN + 16, y - 28, regular, 9, BRAND.midGray);

  // Footer
  drawRect(page, 0, 0, PAGE_W, 36, BRAND.navy);
  drawText(page, `Generated ${d.generatedDate}  |  Confidential — Prepared exclusively for ${d.companyName}`, MARGIN, 13, regular, 8, rgb(0.65, 0.7, 0.82));
  rightText(page, "Page 3 of 4", PAGE_W - MARGIN, 13, regular, 8, rgb(0.65, 0.7, 0.82));
}

function buildImplementationPage(doc: PDFDocument, d: ROIData, bold: PDFFont, regular: PDFFont) {
  const page = doc.addPage([PAGE_W, PAGE_H]);

  // Header
  drawRect(page, 0, PAGE_H - 56, PAGE_W, 56, BRAND.navy);
  drawRect(page, 0, PAGE_H - 60, PAGE_W, 4, BRAND.gold);
  drawText(page, "USRad", MARGIN, PAGE_H - 36, bold, 14, BRAND.gold);
  rightText(page, "IMPLEMENTATION & NEXT STEPS", PAGE_W - MARGIN, PAGE_H - 36, bold, 11, BRAND.white);

  let y = PAGE_H - 96;

  drawText(page, "30-Day Implementation — Zero Disruption to Existing Plans", MARGIN, y, bold, 14, BRAND.navy);
  y -= 28;

  // Implementation steps
  const implSteps = [
    { week: "Week 1", title: "Contract & Discovery",  items: ["Execute master agreement", "Claims data analysis", "Integration planning", "Stakeholder alignment"] },
    { week: "Wk 2-3", title: "Technical Setup",       items: ["API/portal configuration", "Benefits platform integration", "Claims workflow setup", "Testing & validation"] },
    { week: "Week 4", title: "Launch & Training",     items: ["Employee communications", "HR/adjuster training", "Go-live support", "Success monitoring"] },
  ];

  const stepW = (PAGE_W - MARGIN * 2 - 16) / 3;
  implSteps.forEach((s, i) => {
    const sx = MARGIN + i * (stepW + 8);
    drawRect(page, sx, y - 124, stepW, 132, BRAND.lightGray);
    drawRect(page, sx, y + 8, stepW, 4, i === 2 ? BRAND.green : BRAND.navy);
    drawText(page, s.week,  sx + 8, y - 8,  bold, 9, i === 2 ? BRAND.green : BRAND.navy);
    drawText(page, s.title, sx + 8, y - 22, bold, 10, BRAND.darkGray);
    s.items.forEach((item, j) => {
      drawText(page, `• ${item}`, sx + 8, y - 44 - j * 18, regular, 8, BRAND.midGray);
    });
  });

  y -= 152;

  // ── Compliance ──
  drawText(page, "Compliance & Integration", MARGIN, y, bold, 13, BRAND.navy);
  y -= 20;

  const compliance = [
    ["ERISA Compliant",       "Structured as a permissible supplemental benefit"],
    ["HIPAA / SOC 2 Type II", "Full data security certification maintained"],
    ["Licensed All 50 States","Workers' comp approved in every state"],
    ["TPA Integration",       "Works with Sedgwick, Gallagher Bassett, ESIS, Broadspire + all major TPAs"],
    ["Zero Network Conflicts","Supplemental benefit — enhances, never replaces existing coverage"],
    ["30-Day Go-Live",        "Dedicated project manager, no IT burden on your team"],
  ];
  compliance.forEach(([label, desc], i) => {
    if (i % 2 === 0) drawRect(page, MARGIN, y - 8, PAGE_W - MARGIN * 2, 24, rgb(0.96, 0.97, 0.99));
    drawText(page, "✓", MARGIN + 8, y, bold, 10, BRAND.green);
    drawText(page, label, MARGIN + 24, y, bold, 9, BRAND.darkGray);
    drawText(page, desc,  MARGIN + 180, y, regular, 8, BRAND.midGray);
    y -= 28;
  });

  y -= 12;

  // ── CTA block ──
  drawRect(page, MARGIN, y - 76, PAGE_W - MARGIN * 2, 84, BRAND.navy);
  centeredText(page, "Ready to Start Saving?", y - 16, bold, 16, BRAND.white);
  centeredText(page, "Schedule a 30-minute executive briefing directly with Michael Cabrera, President & Founder", y - 34, regular, 9, rgb(0.75, 0.8, 0.9));
  centeredText(page, "No sales team. No middlemen. Direct access to the decision maker.", y - 50, regular, 9, rgb(0.65, 0.72, 0.85));

  // CTA button shape
  const btnW = 240;
  const btnX = (PAGE_W - btnW) / 2;
  drawRect(page, btnX, y - 74, btnW, 20, BRAND.gold);
  centeredText(page, "usrad.com/employer/schedule", y - 68, bold, 9, BRAND.navy);

  y -= 104;

  // ── Contact footer ──
  centeredText(page, "Michael Cabrera, President & Founder  |  mcabrera@usrad.com  |  (866) USRad-24", y, regular, 8, BRAND.midGray);
  centeredText(page, "Founded the managed imaging category with AnciCare (acquired by CorVel, NYSE: CVL) — 168,000+ cases managed", y - 14, regular, 7, BRAND.midGray);

  // Footer
  drawRect(page, 0, 0, PAGE_W, 36, BRAND.navy);
  drawText(page, `Generated ${d.generatedDate}  |  Confidential — Prepared exclusively for ${d.companyName}`, MARGIN, 13, regular, 8, rgb(0.65, 0.7, 0.82));
  rightText(page, "Page 4 of 4", PAGE_W - MARGIN, 13, regular, 8, rgb(0.65, 0.7, 0.82));
}

// ─── Main export ──────────────────────────────────────────────────────────────
export async function generateROIReport(inputs: ROIInputs): Promise<Uint8Array> {
  const d = calculateROI(inputs);
  const doc = await PDFDocument.create();

  const bold    = await doc.embedFont(StandardFonts.HelveticaBold);
  const regular = await doc.embedFont(StandardFonts.Helvetica);

  doc.setTitle(`USRad ROI Report — ${d.companyName}`);
  doc.setAuthor("USRad — U.S. Radiology Network");
  doc.setSubject("Employer Imaging Cost Reduction Analysis");
  doc.setCreationDate(new Date());

  buildCoverPage(doc, d, bold, regular);
  buildCostBreakdownPage(doc, d, bold, regular);
  buildROITimelinePage(doc, d, bold, regular);
  buildImplementationPage(doc, d, bold, regular);

  return doc.save();
}

export type { ROIInputs, ROIData };