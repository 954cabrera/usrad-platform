// src/components/admin/AuditDashboard.jsx
import React, { useEffect, useState } from "react";
import { supabaseBrowser } from "../../lib/supabaseBrowser.js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AuditDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedModality, setSelectedModality] = useState("ALL");

  const modalities = [
    "ALL",
    "MRI",
    "CT",
    "X-Ray",
    "Ultrasound",
    "Mammography",
    "Nuclear Medicine",
    "PET",
  ];

  const fetchData = async (modality = "ALL") => {
    setLoading(true);
    setError(null);
    try {
      let query = supabaseBrowser
        .from("v_audit_region_summary")
        .select("*")
        .order("week_start", { ascending: false })
        .limit(50);

      if (modality !== "ALL") {
        query = query.eq("modality", modality);
      }

      const { data: rows, error } = await query;
      if (error) throw error;
      setData(rows || []);
    } catch (err) {
      console.error("❌ Failed to load audit summary:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedModality);
  }, [selectedModality]);

  if (loading) return <p className="text-gray-600">Loading summary...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!data.length) return <p>No audit data available yet.</p>;

  const chartData = data.map((r) => ({
    region: `${r.region} (${r.modality})`,
    unmatched: r.unmatched_count,
    matched: r.matched_count,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-2xl font-semibold text-[#003087]">
          Resolver Audit Summary
        </h2>
        <div className="mt-3 sm:mt-0">
          <label className="text-sm font-medium mr-2">
            Filter by Modality:
          </label>
          <select
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#003087]"
            value={selectedModality}
            onChange={(e) => setSelectedModality(e.target.value)}
          >
            {modalities.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="region"
            angle={-30}
            textAnchor="end"
            interval={0}
            height={120}
          />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="unmatched"
            stackId="a"
            fill="#e74c3c"
            name="Unmatched"
          />
          <Bar dataKey="matched" stackId="a" fill="#27ae60" name="Matched" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
