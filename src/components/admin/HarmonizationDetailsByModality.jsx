import { useEffect, useState, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export default function HarmonizationDetailsByModality() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedModality, setSelectedModality] = useState("All");

  // Fetch once
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("procedure_aliases")
        .select("modality, friendly_name")
        .order("modality", { ascending: true });
      if (error) console.error(error);
      else {
        const grouped = data.reduce((acc, row) => {
          if (!acc[row.modality]) acc[row.modality] = [];
          acc[row.modality].push(row.friendly_name);
          return acc;
        }, {});
        setData(grouped);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Debounce search input for smoother experience
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 200);
    return () => clearTimeout(handler);
  }, [search]);

  // Filter logic
  const filtered = useMemo(() => {
    if (!data) return {};
    const filteredObj = {};
    Object.entries(data).forEach(([modality, names]) => {
      if (selectedModality !== "All" && modality !== selectedModality) return;
      const matched = names.filter((n) =>
        n.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
      if (matched.length) filteredObj[modality] = matched;
    });
    return filteredObj;
  }, [debouncedSearch, selectedModality, data]);

  const modalities = useMemo(() => ["All", ...Object.keys(data)], [data]);

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (loading)
    return (
      <div className="text-gray-500 py-10 text-center">
        Loading friendly names…
      </div>
    );

  return (
    <section className="mt-12">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <input
          type="text"
          placeholder="🔍 Search friendly names..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-[#003087] transition"
        />
        <select
          value={selectedModality}
          onChange={(e) => setSelectedModality(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#003087] transition"
        >
          {modalities.map((mod) => (
            <option key={mod}>{mod}</option>
          ))}
        </select>
      </div>

      {/* Empty state */}
      {Object.keys(filtered).length === 0 ? (
        <div className="text-gray-400 text-center py-8">
          No results match your search.
        </div>
      ) : (
        Object.entries(filtered).map(([modality, names]) => (
          <div
            key={modality}
            className="mb-12 border-b border-gray-200 pb-6 transition-all"
          >
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-2xl font-semibold text-[#003087]">
                {modality}
              </h3>
              <span className="text-gray-400 text-sm">
                ({names.length} procedures)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {names.map((name, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-100 rounded-lg shadow-sm p-3 text-gray-700 hover:shadow-md hover:border-[#cc9933] transition-all"
                >
                  {highlightMatch(name, debouncedSearch)}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
