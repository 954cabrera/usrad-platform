import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export default function HarmonizationQADashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("harmonization_quality_audit")
        .select("*")
        .order("modality", { ascending: true });
      if (!error) setData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20 text-gray-500">
        Loading QA metrics…
      </div>
    );

  return (
    <div className="p-8 bg-white shadow-xl rounded-2xl border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#003087]">
          Harmonization QA Dashboard
        </h2>
        <span className="text-sm text-gray-400">
          Last Updated:{" "}
          {new Date(data[0]?.last_verified).toLocaleString() || "—"}
        </span>
      </div>

      <table className="min-w-full text-sm text-left border-collapse">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-2 font-semibold text-gray-700">Modality</th>
            <th className="px-4 py-2 font-semibold text-gray-700">Total</th>
            <th className="px-4 py-2 font-semibold text-gray-700">
              Duplicates
            </th>
            <th className="px-4 py-2 font-semibold text-gray-700">
              Standardized
            </th>
            <th className="px-4 py-2 font-semibold text-gray-700">
              Ends w/ Contrast
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-2 font-medium text-gray-900">
                {row.modality}
              </td>
              <td className="px-4 py-2 text-gray-600">{row.total_records}</td>
              <td
                className={`px-4 py-2 font-semibold ${
                  row.duplicates_found > 0 ? "text-red-600" : "text-green-600"
                }`}
              >
                {row.duplicates_found}
              </td>
              <td className="px-4 py-2 text-gray-600">
                {row.standardized_format}
              </td>
              <td className="px-4 py-2 text-gray-600">
                {row.ends_with_contrast}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
