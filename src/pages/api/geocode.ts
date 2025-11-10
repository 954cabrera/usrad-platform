export const GET = async ({ request }) => {
  const url = new URL(request.url);
  const lat = url.searchParams.get('lat');
  const lng = url.searchParams.get('lng');

  if (!lat || !lng) {
    return new Response(JSON.stringify({ error: 'Missing coordinates' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const apiKey = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      throw new Error('Google Maps API key not configured');
    }

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );
    
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      const addressComponents = data.results[0].address_components;
      
      // Find postal code
      const postalCodeComponent = addressComponents.find(
        component => component.types.includes('postal_code')
      );
      
      // Find city
      const cityComponent = addressComponents.find(
        component => component.types.includes('locality')
      );

      return new Response(JSON.stringify({
        postalCode: postalCodeComponent?.long_name || null,
        city: cityComponent?.long_name || null,
        formatted_address: data.results[0].formatted_address
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: 'No results found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Geocode API error:', error);
    return new Response(JSON.stringify({ error: 'Geocoding failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};