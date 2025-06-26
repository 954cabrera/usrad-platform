import React, { useEffect, useRef, useState } from 'react';

export default function SearchMap() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await fetch('/api/centers/search-with-pricing?state=FL&modality=MRI');
        const data = await res.json();
        setProviders(data.centers || []);
      } catch (err) {
        console.error('Failed to fetch providers:', err);
      }
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    if (!providers.length) return;

    const loadGoogleMaps = async () => {
      const pkg = await import('@googlemaps/js-api-loader');
      const { Loader } = pkg;

      const loader = new Loader({
        apiKey: import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
      });

      loader.load().then(() => {
        if (!mapRef.current) return;

        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 27.9944, lng: -81.7603 },
          zoom: 6,
          mapTypeControl: false,
          streetViewControl: false,
        });

        mapInstance.current = map;

        providers.forEach((provider) => {
          const marker = new google.maps.Marker({
            position: {
              lat: provider.lat || 0,
              lng: provider.lng || 0,
            },
            map,
            title: provider.name,
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `<div><strong>${provider.name}</strong><br/>${provider.address}</div>`
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });
      });
    };

    loadGoogleMaps();
  }, [providers]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="text-sm font-medium text-gray-700 mb-2">Provider Locations</div>
      <div className="text-xs text-gray-500 mb-4">Click markers for details and pricing</div>
      <div ref={mapRef} className="w-full h-[400px] rounded-md border border-gray-200" />
      <div className="mt-2 text-right text-xs text-gray-400">
        Providers: {providers.length}
      </div>
    </div>
  );
}
