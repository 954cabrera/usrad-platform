"""
USRad Custom ROI Report Generator
ReportLab PDF — 6 pages, employer acquisition funnel
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak, Image as RLImage
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.platypus import BaseDocTemplate, PageTemplate, Frame
import datetime
import os

LOGO_GOLD_WHITE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "logo_gold_white_transparent.png")
LOGO_WHITE_PATH      = os.path.join(os.path.dirname(os.path.abspath(__file__)), "logo_white_transparent.png")

# Brand Colors
USRAD_BLUE  = colors.HexColor("#003087")
USRAD_GOLD  = colors.HexColor("#cc9933")
LIGHT_GRAY  = colors.HexColor("#f5f5f5")
MID_GRAY    = colors.HexColor("#6b7280")
DARK_GRAY   = colors.HexColor("#1f2937")
RED_ALERT   = colors.HexColor("#dc2626")
GREEN_OK    = colors.HexColor("#16a34a")
BLUE_LIGHT  = colors.HexColor("#dbeafe")
GREEN_LIGHT = colors.HexColor("#dcfce7")
GOLD_LIGHT  = colors.HexColor("#fef3c7")

W, H = letter


def build_styles():
    def s(name, **kw):
        return ParagraphStyle(name, **kw)

    return {
        "cover_conf": s("cover_conf",
            fontName="Helvetica-Oblique", fontSize=10,
            textColor=USRAD_GOLD, leading=14, alignment=TA_LEFT),
        "cover_title": s("cover_title",
            fontName="Helvetica-Bold", fontSize=34,
            textColor=colors.white, leading=42, alignment=TA_LEFT, spaceAfter=6),
        "cover_subtitle": s("cover_subtitle",
            fontName="Helvetica", fontSize=16,
            textColor=colors.HexColor("#d1d5db"), leading=22, alignment=TA_LEFT),
        "cover_meta": s("cover_meta",
            fontName="Helvetica", fontSize=11,
            textColor=colors.HexColor("#9ca3af"), leading=16, alignment=TA_LEFT),

        "section_label": s("section_label",
            fontName="Helvetica-Bold", fontSize=9,
            textColor=USRAD_GOLD, leading=12, alignment=TA_LEFT,
            spaceBefore=4, spaceAfter=4),
        "section_h2": s("section_h2",
            fontName="Helvetica-Bold", fontSize=22,
            textColor=USRAD_BLUE, leading=28, alignment=TA_LEFT,
            spaceBefore=4, spaceAfter=8),
        "section_h3": s("section_h3",
            fontName="Helvetica-Bold", fontSize=14,
            textColor=DARK_GRAY, leading=18, alignment=TA_LEFT,
            spaceBefore=6, spaceAfter=4),

        "body": s("body",
            fontName="Helvetica", fontSize=10,
            textColor=DARK_GRAY, leading=15, alignment=TA_LEFT, spaceAfter=6),
        "body_small": s("body_small",
            fontName="Helvetica", fontSize=9,
            textColor=MID_GRAY, leading=13, alignment=TA_LEFT, spaceAfter=4),

        "hero_number": s("hero_number",
            fontName="Helvetica-Bold", fontSize=52,
            textColor=colors.white, leading=56, alignment=TA_CENTER),
        "hero_label": s("hero_label",
            fontName="Helvetica-Bold", fontSize=13,
            textColor=colors.HexColor("#d1fae5"), leading=18, alignment=TA_CENTER),
        "hero_explanation": s("hero_explanation",
            fontName="Helvetica", fontSize=9,
            textColor=colors.HexColor("#a7f3d0"), leading=13, alignment=TA_CENTER),

        "stat_number": s("stat_number",
            fontName="Helvetica-Bold", fontSize=20,
            textColor=USRAD_BLUE, leading=24, alignment=TA_CENTER),
        "stat_label": s("stat_label2",
            fontName="Helvetica", fontSize=9,
            textColor=MID_GRAY, leading=12, alignment=TA_CENTER),

        "table_header": s("table_header",
            fontName="Helvetica-Bold", fontSize=9,
            textColor=colors.white, leading=12, alignment=TA_CENTER),
        "table_cell": s("table_cell",
            fontName="Helvetica", fontSize=10,
            textColor=DARK_GRAY, leading=14, alignment=TA_LEFT),
        "table_cell_bold": s("table_cell_bold",
            fontName="Helvetica-Bold", fontSize=10,
            textColor=USRAD_BLUE, leading=14, alignment=TA_LEFT),
        "table_cell_right": s("table_cell_right",
            fontName="Helvetica", fontSize=10,
            textColor=DARK_GRAY, leading=14, alignment=TA_RIGHT),

        "cta_big": s("cta_big",
            fontName="Helvetica-Bold", fontSize=13,
            textColor=colors.white, leading=18, alignment=TA_CENTER),
        "cta_small": s("cta_small",
            fontName="Helvetica", fontSize=10,
            textColor=colors.HexColor("#d1d5db"), leading=14, alignment=TA_CENTER),
    }


def make_page_decorator(company_name):
    def decorate(canvas, doc):
        canvas.saveState()
        page_num = doc.page

        if page_num == 1:
            canvas.setFillColor(USRAD_BLUE)
            canvas.rect(0, 0, W, H, fill=1, stroke=0)
            canvas.setFillColor(USRAD_GOLD)
            canvas.rect(0, H - 6, W, 6, fill=1, stroke=0)
            canvas.setFillColor(colors.HexColor("#001a4d"))
            canvas.rect(0, 0, W, 100, fill=1, stroke=0)
            if os.path.exists(LOGO_GOLD_WHITE_PATH):
                logo_w = 1.6 * inch
                logo_h = logo_w * (356 / 982)
                logo_y = (100 - logo_h) / 2
                canvas.drawImage(LOGO_GOLD_WHITE_PATH, 0.55 * inch, logo_y,
                                 width=logo_w, height=logo_h, mask="auto")
        else:
            canvas.setFillColor(USRAD_BLUE)
            canvas.rect(0, H - 36, W, 36, fill=1, stroke=0)
            canvas.setFillColor(USRAD_GOLD)
            canvas.rect(0, H - 38, W, 2, fill=1, stroke=0)

            header_mid = H - 18
            logo_w = 1.05 * inch
            logo_h = logo_w * (356 / 982)
            logo_y = header_mid - (logo_h / 2)
            if os.path.exists(LOGO_GOLD_WHITE_PATH):
                canvas.drawImage(LOGO_GOLD_WHITE_PATH, 0.4 * inch, logo_y,
                                 width=logo_w, height=logo_h, mask="auto")

            text_y = header_mid - 4
            canvas.setFont("Helvetica-Bold", 9)
            canvas.setFillColor(colors.white)
            canvas.drawString(1.6 * inch, text_y, "Custom Imaging Savings Analysis")
            canvas.setFont("Helvetica", 8)
            canvas.setFillColor(colors.HexColor("#9ca3af"))
            canvas.drawRightString(W - 0.5 * inch, text_y,
                f"Prepared for {company_name}  •  Confidential Employer Analysis")

            canvas.setFillColor(colors.HexColor("#f5f5f5"))
            canvas.rect(0, 0, W, 32, fill=1, stroke=0)
            canvas.setFont("Helvetica", 8)
            canvas.setFillColor(MID_GRAY)
            canvas.drawString(0.5 * inch, 11,
                f"Prepared for {company_name}  ·  Confidential Employer Analysis")
            canvas.drawRightString(W - 0.5 * inch, 11, f"{page_num}")

        canvas.restoreState()
    return decorate


def generate_roi_report(output_path, company_name, total_employees,
                        wc_scans, health_scans, avg_cost_per_scan):
    total_scans     = wc_scans + health_scans
    current_spend   = total_scans * avg_cost_per_scan
    usrad_cost      = total_scans * 350
    annual_savings  = current_spend - usrad_cost
    savings_pct     = round((annual_savings / current_spend) * 100) if current_spend else 0
    five_yr_savings = annual_savings * 5
    per_emp_savings = round(annual_savings / total_employees) if total_employees else 0

    wc_current = wc_scans * avg_cost_per_scan
    wc_usrad   = wc_scans * 350
    wc_savings = wc_current - wc_usrad
    wc_pct     = round((wc_savings / wc_current) * 100) if wc_current else 0

    h_current  = health_scans * avg_cost_per_scan
    h_usrad    = health_scans * 350
    h_savings  = h_current - h_usrad
    h_pct      = round((h_savings / h_current) * 100) if h_current else 0

    date_str = datetime.date.today().strftime("%B %d, %Y")
    S = build_styles()

    doc = BaseDocTemplate(
        output_path, pagesize=letter,
        leftMargin=0.5*inch, rightMargin=0.5*inch,
        topMargin=0.65*inch, bottomMargin=0.5*inch,
    )
    cover_frame    = Frame(0.65*inch, 0.65*inch, W-1.3*inch, H-1.3*inch, id="cover")
    interior_frame = Frame(0.5*inch, 0.5*inch, W-1.0*inch, H-1.05*inch, id="interior")
    decorator = make_page_decorator(company_name)
    doc.addPageTemplates([
        PageTemplate(id="cover_tpl",    frames=[cover_frame],    onPage=decorator),
        PageTemplate(id="interior_tpl", frames=[interior_frame], onPage=decorator),
    ])

    story = []

    # PAGE 1 — COVER
    story.append(Spacer(1, 0.4*inch))
    if os.path.exists(LOGO_GOLD_WHITE_PATH):
        logo_img = RLImage(LOGO_GOLD_WHITE_PATH, width=2.2*inch, height=2.2*inch*(356/982))
        story.append(logo_img)
    story.append(Spacer(1, 0.8*inch))
    story.append(Paragraph("CUSTOM IMAGING SAVINGS ANALYSIS", S["cover_conf"]))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        f"Prepared exclusively for<br/><b>{company_name}</b>", S["cover_title"]))
    story.append(Spacer(1, 16))
    story.append(Paragraph(
        f"{total_employees:,} Employees  ·  Workers' Comp + Health Benefits",
        S["cover_subtitle"]))
    story.append(Spacer(1, 32))
    story.append(Paragraph("Projected Year-One Savings",
        ParagraphStyle("cov_lbl", fontName="Helvetica", fontSize=12,
                       textColor=colors.HexColor("#9ca3af"), leading=16)))
    story.append(Paragraph(f"${annual_savings:,}",
        ParagraphStyle("cov_num", fontName="Helvetica-Bold", fontSize=48,
                       textColor=USRAD_GOLD, leading=56)))
    story.append(Paragraph(
        f"{savings_pct}% reduction  ·  Based on {total_scans:,} annual scans at ${avg_cost_per_scan:,}/scan average",
        ParagraphStyle("cov_sub", fontName="Helvetica", fontSize=10,
                       textColor=colors.HexColor("#6b7280"), leading=14)))
    story.append(Spacer(1, 0.5*inch))
    story.append(HRFlowable(width="100%", thickness=1,
                             color=colors.HexColor("#374151"), spaceAfter=16))
    story.append(Paragraph(f"Confidential Employer Analysis  ·  {date_str}", S["cover_conf"]))
    story.append(Paragraph(
        "Prepared by Michael Cabrera, President & Founder, USRad<br/>"
        "Founded the managed imaging category with AnciCare (acquired by CorVel, NASDAQ: CRVL)",
        S["cover_meta"]))

    # PAGE 2 — FINANCIAL IMPACT
    story.append(PageBreak())
    story.append(Spacer(1, 0.25*inch))
    story.append(Paragraph("FINANCIAL IMPACT SUMMARY", S["section_label"]))
    story.append(Paragraph("Your Imaging Savings Opportunity", S["section_h2"]))
    story.append(Paragraph(
        f"Based on {company_name}'s workforce profile and current imaging spend, "
        f"USRad projects the following annual savings across your workers' comp "
        f"and employee health benefits programs.", S["body"]))
    story.append(Spacer(1, 12))

    hero_data = [
        [Paragraph(f"${annual_savings:,}", S["hero_number"])],
        [Paragraph("Projected Year-One Total Imaging Savings", S["hero_label"])],
        [Paragraph(
            f"Based on {total_scans:,} annual scans redirected from hospital rates "
            f"(avg ${avg_cost_per_scan:,}) to USRad flat rates ($350).",
            S["hero_explanation"])],
    ]
    hero_tbl = Table(hero_data, colWidths=[6.5*inch])
    hero_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), colors.HexColor("#166534")),
        ("TOPPADDING", (0,0), (-1,-1), 20),
        ("BOTTOMPADDING", (0,0), (-1,-1), 20),
        ("LEFTPADDING", (0,0), (-1,-1), 24),
        ("RIGHTPADDING", (0,0), (-1,-1), 24),
    ]))
    story.append(hero_tbl)
    story.append(Spacer(1, 16))

    stat_data = [
        [Paragraph("Year-One Savings", S["stat_label"]),
         Paragraph("5-Year Financial Impact", S["stat_label"]),
         Paragraph("Savings Rate", S["stat_label"]),
         Paragraph("Per-Employee Savings", S["stat_label"])],
        [Paragraph(f"${annual_savings:,}", S["stat_number"]),
         Paragraph(f"${five_yr_savings:,}",
             ParagraphStyle("st5y", fontName="Helvetica-Bold", fontSize=20,
                            textColor=USRAD_GOLD, leading=24, alignment=TA_CENTER)),
         Paragraph(f"{savings_pct}%", S["stat_number"]),
         Paragraph(f"${per_emp_savings:,}", S["stat_number"])],
    ]
    stat_tbl = Table(stat_data, colWidths=[1.625*inch]*4)
    stat_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), colors.HexColor("#f5f5f5")),
        ("TOPPADDING", (0,0), (-1,-1), 14),
        ("BOTTOMPADDING", (0,0), (-1,-1), 14),
        ("LINEBELOW", (0,0), (-1,0), 1, colors.HexColor("#e5e7eb")),
        ("LINEBEFORE", (1,0), (1,-1), 1, colors.HexColor("#e5e7eb")),
        ("LINEBEFORE", (2,0), (2,-1), 1, colors.HexColor("#e5e7eb")),
        ("LINEBEFORE", (3,0), (3,-1), 1, colors.HexColor("#e5e7eb")),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("ALIGN", (0,0), (-1,-1), "CENTER"),
    ]))
    story.append(stat_tbl)
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "* CFOs evaluate benefits investments on a multi-year horizon. "
        "5-year projection assumes stable scan volumes and pricing.", S["body_small"]))
    story.append(Spacer(1, 12))

    ni_tbl = Table([
        [Paragraph("Not Included In This Analysis:", ParagraphStyle(
            "ni_h", fontName="Helvetica-Bold", fontSize=10,
            textColor=DARK_GRAY, leading=14))],
        [Paragraph(
            "The figures above are conservative and reflect imaging costs only. "
            "Additional value not captured here: reduced disability duration (avg. 18+ days), "
            "lower indemnity and litigation costs, productivity improvements from faster "
            "return-to-work, and employee satisfaction gains. "
            "Actual total savings typically run 20-40% higher.", S["body"])],
    ], colWidths=[6.5*inch])
    ni_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), GOLD_LIGHT),
        ("TOPPADDING", (0,0), (-1,-1), 10),
        ("BOTTOMPADDING", (0,0), (-1,-1), 10),
        ("LEFTPADDING", (0,0), (-1,-1), 14),
        ("RIGHTPADDING", (0,0), (-1,-1), 14),
        ("LINEABOVE", (0,0), (-1,0), 2, USRAD_GOLD),
    ]))
    story.append(ni_tbl)

    # PAGE 3 — SAVINGS BREAKDOWN
    story.append(PageBreak())
    story.append(Spacer(1, 0.25*inch))
    story.append(Paragraph("SAVINGS BREAKDOWN", S["section_label"]))
    story.append(Paragraph("Workers' Comp vs. Employee Health Benefits", S["section_h2"]))
    story.append(Paragraph(
        "USRad is the only solution that addresses both populations through a single "
        "integrated platform, delivering measurable savings in each program simultaneously.",
        S["body"]))
    story.append(Spacer(1, 12))

    prog_data = [
        [Paragraph("Workers' Comp Program",
             ParagraphStyle("wc_h", fontName="Helvetica-Bold", fontSize=12,
                            textColor=colors.HexColor("#1e40af"), leading=16)),
         Paragraph("Employee Health Benefits",
             ParagraphStyle("h_h", fontName="Helvetica-Bold", fontSize=12,
                            textColor=colors.HexColor("#166534"), leading=16))],
        [Paragraph(f"Annual Scans: {wc_scans:,}", S["body"]),
         Paragraph(f"Annual Scans: {health_scans:,}", S["body"])],
        [Paragraph(f"Current Spend: ${wc_current:,}", S["body"]),
         Paragraph(f"Current Spend: ${h_current:,}", S["body"])],
        [Paragraph(f"USRad Cost: ${wc_usrad:,}", S["body"]),
         Paragraph(f"USRad Cost: ${h_usrad:,}", S["body"])],
        [Paragraph(f"<b>Annual Savings: ${wc_savings:,}  ({wc_pct}%)</b>",
             ParagraphStyle("wc_s", fontName="Helvetica-Bold", fontSize=12,
                            textColor=colors.HexColor("#1e40af"), leading=16)),
         Paragraph(f"<b>Annual Savings: ${h_savings:,}  ({h_pct}%)</b>",
             ParagraphStyle("h_s", fontName="Helvetica-Bold", fontSize=12,
                            textColor=colors.HexColor("#166534"), leading=16))],
    ]
    prog_tbl = Table(prog_data, colWidths=[3.15*inch, 3.15*inch], spaceBefore=6)
    prog_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (0,-1), BLUE_LIGHT),
        ("BACKGROUND", (1,0), (1,-1), GREEN_LIGHT),
        ("TOPPADDING", (0,0), (-1,-1), 8),
        ("BOTTOMPADDING", (0,0), (-1,-1), 8),
        ("LEFTPADDING", (0,0), (-1,-1), 12),
        ("RIGHTPADDING", (0,0), (-1,-1), 12),
        ("VALIGN", (0,0), (-1,-1), "TOP"),
    ]))
    story.append(prog_tbl)
    story.append(Spacer(1, 16))

    story.append(Paragraph("Scan-Level Cost Comparison", S["section_h3"]))
    col_hdrs = [Paragraph(h, S["table_header"]) for h in
                ["Scan Type", "Hospital Rate", "USRad Rate", "Savings/Scan", "Markup vs. USRad"]]
    scan_rows = [
        ["MRI (brain/spine)", "$2,400–$3,200", "$260–$350", "$2,050–$2,950", "9–12x"],
        ["CT Scan",           "$1,500–$2,500", "$250–$350", "$1,250–$2,150", "6–9x"],
        ["Ultrasound",        "$800–$1,400",   "$150–$250", "$650–$1,150",   "4–6x"],
        ["X-Ray",             "$400–$800",     "$75–$150",  "$325–$650",     "4–6x"],
    ]
    tbl_data = [col_hdrs]
    for row in scan_rows:
        tbl_data.append([
            Paragraph(row[0], S["table_cell_bold"]),
            Paragraph(row[1], ParagraphStyle("rc", fontName="Helvetica", fontSize=10,
                textColor=RED_ALERT, leading=14, alignment=TA_CENTER)),
            Paragraph(row[2], ParagraphStyle("gc", fontName="Helvetica-Bold", fontSize=10,
                textColor=GREEN_OK, leading=14, alignment=TA_CENTER)),
            Paragraph(row[3], S["table_cell_right"]),
            Paragraph(row[4], ParagraphStyle("oc", fontName="Helvetica-Bold", fontSize=10,
                textColor=RED_ALERT, leading=14, alignment=TA_CENTER)),
        ])
    cost_tbl = Table(tbl_data,
        colWidths=[1.6*inch, 1.3*inch, 1.2*inch, 1.4*inch, 1.0*inch])
    cost_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), USRAD_BLUE),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [colors.white, LIGHT_GRAY]),
        ("GRID", (0,0), (-1,-1), 0.5, colors.HexColor("#e5e7eb")),
        ("TOPPADDING", (0,0), (-1,-1), 8),
        ("BOTTOMPADDING", (0,0), (-1,-1), 8),
        ("LEFTPADDING", (0,0), (-1,-1), 10),
        ("RIGHTPADDING", (0,0), (-1,-1), 10),
        ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ("ALIGN", (0,1), (-1,-1), "CENTER"),
        ("ALIGN", (0,0), (0,-1), "LEFT"),
    ]))
    story.append(cost_tbl)

    # PAGE 4 — OPERATIONAL MODEL
    story.append(PageBreak())
    story.append(Spacer(1, 0.25*inch))
    story.append(Paragraph("THE OPERATIONAL MODEL", S["section_label"]))
    story.append(Paragraph("How USRad Delivers These Results", S["section_h2"]))
    story.append(Paragraph(
        "The same model that transformed workers' comp imaging for 168,000+ claimants — "
        "now available for your entire workforce.", S["body"]))
    story.append(Spacer(1, 10))

    proof_items = [
        [("1994", "First managed imaging\nnetwork founded"),
         ("168,000+", "Claimants served under\nthe AnciCare model")],
        [("50–70%", "Cost reductions\ndelivered historically"),
         ("20+ Years", "CorVel (NASDAQ: CRVL) still\noperates our model today")],
    ]
    for row in proof_items:
        cells = []
        for num, lbl in row:
            c = Table([
                [Paragraph(num, ParagraphStyle("pn", fontName="Helvetica-Bold",
                    fontSize=24, textColor=USRAD_GOLD, leading=28, alignment=TA_CENTER))],
                [Paragraph(lbl, ParagraphStyle("pl", fontName="Helvetica",
                    fontSize=9, textColor=MID_GRAY, leading=12, alignment=TA_CENTER))],
            ], colWidths=[3.0*inch])
            c.setStyle(TableStyle([
                ("BACKGROUND", (0,0), (-1,-1), LIGHT_GRAY),
                ("TOPPADDING", (0,0), (-1,-1), 14),
                ("BOTTOMPADDING", (0,0), (-1,-1), 14),
                ("ALIGN", (0,0), (-1,-1), "CENTER"),
            ]))
            cells.append(c)
        row_tbl = Table([cells], colWidths=[3.15*inch, 3.15*inch], spaceBefore=6)
        row_tbl.setStyle(TableStyle([("VALIGN", (0,0), (-1,-1), "TOP")]))
        story.append(row_tbl)

    story.append(Spacer(1, 16))
    story.append(HRFlowable(width="100%", thickness=0.5,
                             color=colors.HexColor("#e5e7eb"), spaceAfter=12))
    story.append(Paragraph("How the Program Works for Your Employees", S["section_h3"]))

    how_items = [
        ("Workers' Comp Claimants",
         "48-hour appointment scheduling, direct billing to your TPA, flat rates with no "
         "surprise charges, same ACR-accredited facilities your employees already know."),
        ("Health Plan Members",
         "Simple online/mobile booking at $260 MRI pricing (vs. $3,200 hospital). "
         "No prior auth, no referral requirements. Evening and weekend availability. "
         "73% increase in necessary imaging utilization."),
        ("Unified Analytics",
         "Single employer dashboard covering both populations — real-time spend tracking, "
         "utilization reports, and savings documentation for your CFO."),
    ]
    for title, desc in how_items:
        ht = Table([
            [Paragraph(f"→  {title}", ParagraphStyle("ht",
                fontName="Helvetica-Bold", fontSize=10,
                textColor=USRAD_BLUE, leading=14))],
            [Paragraph(desc, S["body"])],
        ], colWidths=[6.5*inch])
        ht.setStyle(TableStyle([
            ("LEFTPADDING", (0,0), (-1,-1), 12),
            ("TOPPADDING", (0,0), (-1,-1), 4),
            ("BOTTOMPADDING", (0,0), (-1,-1), 4),
            ("LINEABOVE", (0,0), (-1,0), 0.5, colors.HexColor("#e5e7eb")),
        ]))
        story.append(ht)

    # PAGE 5 — IMPLEMENTATION
    story.append(PageBreak())
    story.append(Spacer(1, 0.25*inch))
    story.append(Paragraph("IMPLEMENTATION ROADMAP", S["section_label"]))
    story.append(Paragraph("Go Live in 30 Days", S["section_h2"]))
    story.append(Paragraph(
        "We've done this before — 168,000+ times. Our implementation process eliminates risk "
        "and gets you saving on Day 1.", S["body"]))
    story.append(Spacer(1, 12))

    impl_rows = [
        ("Week 1",   "Contract & Discovery",
         "Execute master agreement · Claims data analysis · Integration planning · Stakeholder alignment",
         USRAD_BLUE),
        ("Week 2–3", "Technical Setup",
         "API/portal configuration · Benefits platform integration · Claims workflow setup · Testing & validation",
         colors.HexColor("#1e40af")),
        ("Week 4",   "Launch & Training",
         "Employee communications · HR/adjuster training · Go-live support · Success monitoring",
         GREEN_OK),
    ]
    for phase, title, detail, color in impl_rows:
        it = Table([[
            Paragraph(phase, ParagraphStyle("ph", fontName="Helvetica-Bold",
                fontSize=11, textColor=colors.white, leading=14, alignment=TA_CENTER)),
            Paragraph(f"<b>{title}</b><br/>{detail}",
                ParagraphStyle("pd", fontName="Helvetica", fontSize=9,
                               textColor=DARK_GRAY, leading=14)),
        ]], colWidths=[1.0*inch, 5.5*inch], spaceBefore=6)
        it.setStyle(TableStyle([
            ("BACKGROUND", (0,0), (0,-1), color),
            ("BACKGROUND", (1,0), (1,-1), LIGHT_GRAY),
            ("TOPPADDING", (0,0), (-1,-1), 12),
            ("BOTTOMPADDING", (0,0), (-1,-1), 12),
            ("LEFTPADDING", (0,0), (-1,-1), 10),
            ("RIGHTPADDING", (0,0), (-1,-1), 10),
            ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
        ]))
        story.append(it)

    story.append(Spacer(1, 16))
    risk_tbl = Table([
        [Paragraph("Zero Implementation Risk", ParagraphStyle(
            "rh", fontName="Helvetica-Bold", fontSize=11,
            textColor=USRAD_BLUE, leading=14))],
        [Paragraph(
            "Overlay benefit — zero disruption to existing plans or carrier relationships  ·  "
            "No IT burden — we handle all technical requirements  ·  "
            "Pilot program option available  ·  "
            "ERISA compliant · HIPAA certified (SOC 2 Type II) · Licensed in all 50 states",
            S["body"])],
    ], colWidths=[6.5*inch])
    risk_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), BLUE_LIGHT),
        ("TOPPADDING", (0,0), (-1,-1), 10),
        ("BOTTOMPADDING", (0,0), (-1,-1), 10),
        ("LEFTPADDING", (0,0), (-1,-1), 14),
        ("RIGHTPADDING", (0,0), (-1,-1), 14),
        ("LINEABOVE", (0,0), (-1,0), 2, USRAD_BLUE),
    ]))
    story.append(risk_tbl)

    # PAGE 6 — NEXT STEPS
    story.append(PageBreak())
    story.append(Spacer(1, 0.25*inch))
    story.append(Paragraph("NEXT STEPS", S["section_label"]))
    story.append(Paragraph("Your Path to Immediate Savings", S["section_h2"]))
    story.append(Spacer(1, 8))

    steps = [
        ("1", "Schedule Your Executive Briefing",
         "30 minutes directly with Michael Cabrera — no sales team, no middlemen. "
         "He'll review this analysis with you personally and answer any questions."),
        ("2", "Receive Your Custom ROI Model",
         "We'll build a detailed, company-specific financial model using your actual "
         "claims data, refined beyond these initial projections."),
        ("3", "Execute Agreement & Go Live in 30 Days",
         "Seamless implementation with dedicated project management. "
         "First savings appear on Day 1 of program launch."),
    ]
    for num, title, desc in steps:
        st = Table([[
            Paragraph(num, ParagraphStyle("sn", fontName="Helvetica-Bold",
                fontSize=20, textColor=colors.white, leading=24, alignment=TA_CENTER)),
            Paragraph(f"<b>{title}</b><br/>{desc}",
                ParagraphStyle("sd", fontName="Helvetica", fontSize=10,
                               textColor=DARK_GRAY, leading=14)),
        ]], colWidths=[0.6*inch, 5.9*inch], spaceBefore=6)
        st.setStyle(TableStyle([
            ("BACKGROUND", (0,0), (0,-1), USRAD_GOLD),
            ("BACKGROUND", (1,0), (1,-1), colors.white),
            ("TOPPADDING", (0,0), (-1,-1), 14),
            ("BOTTOMPADDING", (0,0), (-1,-1), 14),
            ("LEFTPADDING", (0,0), (-1,-1), 10),
            ("RIGHTPADDING", (0,0), (-1,-1), 10),
            ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
            ("BOX", (0,0), (-1,-1), 0.5, colors.HexColor("#e5e7eb")),
        ]))
        story.append(st)

    story.append(Spacer(1, 16))
    cta_tbl = Table([
        [Paragraph("Schedule Your Executive Briefing", S["cta_big"])],
        [Paragraph("usrad.com/employer/schedule  ·  mcabrera@usrad.com  ·  (888) USRad24",
            S["cta_small"])],
        [Paragraph("Meet directly with Michael Cabrera, President & Founder",
            ParagraphStyle("cf", fontName="Helvetica-Oblique", fontSize=9,
                textColor=colors.HexColor("#9ca3af"), leading=12, alignment=TA_CENTER))],
    ], colWidths=[6.5*inch])
    cta_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), USRAD_BLUE),
        ("TOPPADDING", (0,0), (-1,-1), 14),
        ("BOTTOMPADDING", (0,0), (-1,-1), 14),
        ("LEFTPADDING", (0,0), (-1,-1), 20),
        ("RIGHTPADDING", (0,0), (-1,-1), 20),
    ]))
    story.append(cta_tbl)
    story.append(Spacer(1, 16))
    story.append(HRFlowable(width="100%", thickness=0.5,
                             color=colors.HexColor("#e5e7eb"), spaceAfter=8))
    story.append(Paragraph(
        "From the founders who created the managed imaging category and delivered it to "
        "168,000+ claimants. CorVel (NASDAQ: CRVL) still operates our original AnciCare model today.",
        ParagraphStyle("attr", fontName="Helvetica-Oblique", fontSize=9,
                       textColor=MID_GRAY, leading=13, alignment=TA_CENTER)))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        f"Prepared exclusively for {company_name} on {date_str}. "
        "Confidential Employer Analysis. Figures are projections based on stated workforce "
        "size and current scan pricing; actual results depend on utilization patterns.",
        ParagraphStyle("disc", fontName="Helvetica", fontSize=7.5,
                       textColor=colors.HexColor("#9ca3af"), leading=11, alignment=TA_CENTER)))

    doc.build(story)
    print(f"Report generated: {output_path}")


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Generate USRad ROI PDF Report")
    parser.add_argument("--company",       required=True, help="Company name")
    parser.add_argument("--employees",     required=True, type=int)
    parser.add_argument("--wc-scans",      required=True, type=int)
    parser.add_argument("--health-scans",  required=True, type=int)
    parser.add_argument("--avg-cost",      required=True, type=int)
    parser.add_argument("--output",        required=True, help="Output PDF path")
    args = parser.parse_args()

    generate_roi_report(
        output_path=args.output,
        company_name=args.company,
        total_employees=args.employees,
        wc_scans=args.wc_scans,
        health_scans=args.health_scans,
        avg_cost_per_scan=args.avg_cost,
    )
