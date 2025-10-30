// src/pages/api/medicare/procedures.js
// Endpoint to retrieve available Medicare procedures

import { createClient } from '@supabase/supabase-js';

export async function GET({ request }) {
  try {
    // Initialize Supabase client
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY
    );

    // Get query parameters
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const search = url.searchParams.get('search') || '';
    const modality = url.searchParams.get('modality') || '';
    const offset = parseInt(url.searchParams.get('offset') || '0');

    const actualLimit = Math.min(limit, 100); // Cap at 100 for performance

    let procedures = [];
    let totalCount = 0;

    // ==========================================================
    // 🔹 Primary Source: imaging_procedures (prefer modality-aware data)
    // ==========================================================
    try {
      let query = supabase
        .from("imaging_procedures")
        .select("cpt_code, description, modality")
        .order("cpt_code")
        .range(offset, offset + actualLimit - 1);

      // 🔸 Apply search text filter
      if (search) {
        query = query.or(`cpt_code.ilike.%${search}%,description.ilike.%${search}%`);
      }

      // 🔸 Apply modality filter with category mapping
if (modality && modality !== "All") {
  const modalityMap = {
    MRI: ["MRI"],
    CT: ["CT"],
    Ultrasound: ["Ultrasound"],
    "X-Ray": ["X-Ray", "Fluoroscopy", "Mammography"],
    Mammography: ["X-Ray", "Fluoroscopy"], // alias → includes mammography CPTs
    PET: ["PET", "Nuclear Medicine"],
    "Nuclear Medicine": ["Nuclear Medicine", "PET"],
    Other: ["Other"]
  };

  const aliases = modalityMap[modality] || [modality];
  query = query.or(aliases.map(a => `modality.ilike.%${a}%`).join(','));
}

const { data, error } = await query;

if (!error && data && data.length > 0) {
  console.log(`✅ Found ${data.length} procedures in imaging_procedures (modality: ${modality || 'All'})`);
  procedures = data;
} else {
  console.log(`⚠️ No results found in imaging_procedures for modality: ${modality || 'All'}`);
}
} catch (error) {
  console.error("imaging_procedures query failed:", error.message);
}

// ==========================================================
// 🔹 Fallback: cpt_rvus (if no modality-specific data returned)
// ==========================================================
if (procedures.length === 0) {
  try {
    let query = supabase
      .from("cpt_rvus")
      .select("cpt_code, description")
      .order("cpt_code")
      .range(offset, offset + actualLimit - 1);

    if (search) {
      query = query.or(`cpt_code.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      console.log(`ℹ️ Using cpt_rvus fallback with ${data.length} results`);
      procedures = data.map(p => ({ ...p, modality: "General" }));
    }
  } catch (error) {
    console.error("cpt_rvus query failed:", error.message);
  }
}

// ==========================================================
// 🔹 Hardcoded fallback (last resort)
// ==========================================================
if (procedures.length === 0) {
  console.log("⚠️ Using hardcoded fallback procedures");
  procedures = [
    { cpt_code: "70551", description: "MRI brain without contrast", modality: "MRI" },
    { cpt_code: "72148", description: "MRI lumbar spine without contrast", modality: "MRI" },
    { cpt_code: "71046", description: "Chest X-ray, 2 views", modality: "X-Ray" },
    { cpt_code: "74177", description: "CT abdomen & pelvis with contrast", modality: "CT" },
    { cpt_code: "76700", description: "Ultrasound, abdominal, complete", modality: "Ultrasound" },
    { cpt_code: "77067", description: "Mammography, bilateral", modality: "Mammography" }
  ];
  totalCount = procedures.length;
}


    // ==========================================================
    // 🔹 Response payload
    // ==========================================================
    return new Response(
      JSON.stringify({
        procedures,
        count: procedures.length,
        total: totalCount,
        pagination: {
          offset,
          limit: actualLimit,
          next: offset + actualLimit < totalCount ? offset + actualLimit : null
        },
        filters: { search, modality, limit: actualLimit }
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    console.error("Procedures API error:", error);
    return new Response(
      JSON.stringify({ status: "error", message: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
