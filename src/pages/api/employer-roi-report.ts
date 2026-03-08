// src/pages/api/employer-roi-report.ts
import type { APIRoute } from "astro";
import { execFile } from "child_process";
import { promisify } from "util";
import { readFile, unlink } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { createClient } from "@supabase/supabase-js";

const execFileAsync = promisify(execFile);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const {
      companyName,
      contactName,
      contactEmail,
      totalEmployees,
      wcScans,
      healthScans,
      avgCost,
    } = body;

    if (!companyName || !contactEmail || !totalEmployees) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: companyName, contactEmail, totalEmployees" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const outputPath = join(tmpdir(), `usrad-roi-${Date.now()}.pdf`);
    const scriptPath = join(process.cwd(), "src/lib/roi-pdf/generate_roi_report.py");

    const pythonPath = process.env.PYTHON_PATH || join(process.cwd(), ".venv/bin/python3");
    await execFileAsync(pythonPath, [
      scriptPath,
      "--company",      companyName,
      "--employees",    String(totalEmployees),
      "--wc-scans",     String(wcScans || 0),
      "--health-scans", String(healthScans || 0),
      "--avg-cost",     String(avgCost || 2400),
      "--output",       outputPath,
    ]);

    const pdfBuffer = await readFile(outputPath);
    await unlink(outputPath).catch(() => {});

    const annualSavings =
      (Number(wcScans || 0) + Number(healthScans || 0)) *
      (Number(avgCost || 2400) - 350);

    const supabase = createClient(
      import.meta.env.SUPABASE_URL,
      import.meta.env.SUPABASE_SERVICE_ROLE_KEY
    );

    await supabase.from("employer_leads").insert({
      company_name:      companyName,
      contact_name:      contactName || null,
      contact_email:     contactEmail,
      total_employees:   Number(totalEmployees),
      wc_scans:          Number(wcScans || 0),
      health_scans:      Number(healthScans || 0),
      avg_cost_per_scan: Number(avgCost || 2400),
      annual_savings:    annualSavings,
      source:            "roi_calculator",
      created_at:        new Date().toISOString(),
    });

    const pdfFilename = `USRad-ROI-Report-${companyName.replace(/\s+/g, "-")}.pdf`;
    const firstName = contactName?.split(" ")[0] || "there";

    // Fire admin alert through Remix email system — non-blocking
    fetch(`${import.meta.env.PUBLIC_REMIX_URL}/api/marketing-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "employer-roi-report",
        data: {
          firstName,
          name: contactName || contactEmail,
          email: contactEmail,
          company: companyName,
          projectedSavings: `$${annualSavings.toLocaleString()}`,
          employees: Number(totalEmployees).toLocaleString(),
        },
      }),
    }).catch(() => {}); // non-blocking

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type":        "application/pdf",
        "Content-Disposition": `attachment; filename="${pdfFilename}"`,
        "Content-Length":      String(pdfBuffer.length),
      },
    });

  } catch (error) {
    console.error("ROI PDF generation error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate report. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
