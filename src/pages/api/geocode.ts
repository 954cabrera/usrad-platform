import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const lat = url.searchParams.get("lat");
    const lng = url.searchParams.get("lng");

    if (!lat || !lng) {
      return new Response(
        JSON.stringify({ error: "Missing latitude or longitude" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey =
      import.meta.env.GOOGLE_MAPS_API_KEY ||
      import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Google API key not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch data from Google Geocoding API
    const gRes = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );
    const gData = await gRes.json();

    if (gData.status !== "OK") {
      return new Response(
        JSON.stringify({
          error: gData.error_message || "Geocoding failed",
          status: gData.status,
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Extract ZIP from the response
    const zipComponent = gData.results
      ?.flatMap((r: any) => r.address_components)
      ?.find((c: any) => c.types.includes("postal_code"));

    const zip = zipComponent?.long_name || "";

    return new Response(
      JSON.stringify({ zip }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("❌ Internal /api/geocode error:", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
