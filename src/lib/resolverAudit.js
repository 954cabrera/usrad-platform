// src/lib/resolverAudit.js
import fs from "fs";
import path from "path";
import { supabaseAdmin } from "./supabase.js";

/**
 * Universal audit logger.
 * • Inserts into Supabase when SUPABASE_SERVICE_ROLE_KEY exists.
 * • Falls back to local file log otherwise.
 */

const LOG_PATH = path.resolve("./resolver-region-audit.log");

/* ===========================================================
   Helper: append safely to local file (keeps last 100 lines)
   =========================================================== */
function appendLocalLog(line) {
  try {
    fs.appendFileSync(LOG_PATH, line, "utf8");
    const lines = fs.readFileSync(LOG_PATH, "utf8").trim().split("\n");
    if (lines.length > 100) {
      fs.writeFileSync(LOG_PATH, lines.slice(-100).join("\n") + "\n", "utf8");
    }
  } catch (err) {
    console.error("❌ [Audit] Local log error:", err.message);
  }
}

/* ===========================================================
   1️⃣  Main logger
   =========================================================== */
export async function logUnknownRegion(region, modality, normalizedRegion = null, matched = false) {
  const timestamp = new Date().toISOString();
  const line = `${timestamp} | ${modality} | ${region} | normalized=${normalizedRegion || "N/A"} | matched=${matched}\n`;

  // Always write locally
  appendLocalLog(line);

  // If service key not configured → stop here
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !import.meta.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn("⚠️ [Audit] No service key; skipping Supabase insert (local mode).");
    return;
  }

  // Attempt Supabase insert
  try {
    const { error } = await supabaseAdmin
      .from("resolver_audit_log")
      .insert([
        {
          modality,
          region,
          normalized_region: normalizedRegion,
          matched,
        },
      ]);

    if (error) throw error;
    console.log(`🪶 [Audit] Synced to Supabase → ${modality}:${region}`);
  } catch (err) {
    console.error("❌ [Audit] Supabase insert failed:", err.message);
  }
}

/* ===========================================================
   2️⃣  Summary printer (for local file)
   =========================================================== */
export function printRegionAuditSummary() {
  if (!fs.existsSync(LOG_PATH)) {
    console.log("🪶 [Audit] No audit log yet.");
    return;
  }

  const lines = fs.readFileSync(LOG_PATH, "utf8").trim().split("\n");
  const counts = {};

  for (const line of lines) {
    const [, modality, region] = line.split("|").map((s) => s.trim());
    const key = `${modality}:${region}`;
    counts[key] = (counts[key] || 0) + 1;
  }

  console.log("📊 [Audit Summary] Unknown regions by modality:");
  Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([key, count]) => console.log(`  ${key} → ${count}`));
}
