// src/components/hero/HeroQuickResults.tsx
import { useEffect, useState } from 'react';
import { fetchPopularProcedures } from '../../lib/procedures';
import ProcedureCard from '../procedures/ProcedureCard';

export default function HeroQuickResults() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchPopularProcedures(20);
        setItems(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-4 text-gray-500">Loading popular procedures…</div>;
  if (!items.length) return <div className="p-4 text-gray-500">No procedures found.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map(item => <ProcedureCard key={item.id} item={item} />)}
    </div>
  );
}
