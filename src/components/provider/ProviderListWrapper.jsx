import React, { useEffect, useState } from 'react';
import ProviderCard from './ProviderCard';

export default function ProviderListWrapper() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await fetch('/api/centers/search-with-pricing?state=FL&modality=MRI');
        const data = await res.json();
        setProviders(data.centers || []);
      } catch (error) {
        console.error('Error fetching providers:', error);
        setProviders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  if (loading) {
    return <div className="text-gray-500 text-sm">Loading providers...</div>;
  }

  if (!providers.length) {
    return <div className="text-red-500 text-sm">No providers found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {providers.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
}
