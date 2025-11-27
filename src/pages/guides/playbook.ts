// src/pages/guides/playbook.ts
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url, request }) => {
  try {
    // Check if they want to download or preview
    const download = url.searchParams.get("download") === "true";
    
    // Get PDF from Supabase Storage
    const pdfUrl = `${import.meta.env.PUBLIC_SUPABASE_URL}/storage/v1/object/public/guides/download-guide.pdf`;
    
    console.log(`📥 Playbook request - Download: ${download}`);
    
    // Fetch the file from Supabase
    const response = await fetch(pdfUrl);
    
    if (!response.ok) {
      console.error("❌ PDF not found in Supabase storage");
      return new Response("File not found", { 
        status: 404,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }
    
    // Get the PDF as buffer
    const pdfBuffer = await response.arrayBuffer();
    
    console.log(`✅ PDF fetched successfully (${pdfBuffer.byteLength} bytes)`);
    
    // Determine Content-Disposition based on download parameter
    const disposition = download 
      ? 'attachment; filename="USRad-Cash-Pay-Imaging-Playbook.pdf"'  // Forces download
      : 'inline; filename="USRad-Cash-Pay-Imaging-Playbook.pdf"';     // Opens in browser
    
    // Optional: Track download/preview (add to database)
    // You could add tracking here to record downloads in Supabase
    
    // Return PDF with appropriate headers
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": disposition,
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "SAMEORIGIN",
      },
    });
    
  } catch (error) {
    console.error("❌ Download error:", error);
    return new Response("Download failed. Please try again or contact support.", { 
      status: 500,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
};