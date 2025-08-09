// src/components/Providers/Dashboard/DashboardHome/ChartsSection.jsx
import React from "react";
import { LineChart, DonutChart } from "@tremor/react";

export default function ChartsSection({ monthlyScans, scansByType }) {
  return (
    <div className="charts-section">
      {/* Scan Volume Chart */}
      <div className="chart-card glass-card">
        <div className="chart-header">
          <h3 className="chart-title">Scan Volume Trend</h3>
          <span className="chart-subtitle">Monthly scan volume over time</span>
        </div>
        <div className="chart-container">
          <LineChart
            className="h-64"
            data={monthlyScans}
            index="month"
            categories={["scans"]}
            colors={["indigo"]}
            showLegend={false}
            curveType="natural"
            showGridLines={false}
          />
        </div>
        <div className="chart-footer">
          <p className="chart-note">No data yet - awaiting credentialing</p>
        </div>
      </div>

      {/* Scan Types Distribution */}
      <div className="chart-card glass-card mobile-full">
        <div className="chart-header">
          <h3 className="chart-title">Scan Types</h3>
          <span className="chart-subtitle">Distribution by modality</span>
        </div>
        <div className="donut-wrapper">
          <DonutChart
            className="h-64"
            data={scansByType}
            category="count"
            index="type"
            colors={["indigo", "cyan", "amber", "emerald"]}
            showLabel={false}
          />
        </div>
        <div className="chart-legend">
          {scansByType.map((item, idx) => (
            <div key={idx} className="legend-item">
              <span
                className="legend-dot"
                style={{
                  background: ["#6366f1", "#06b6d4", "#f59e0b", "#10b981"][idx],
                }}
              />
              <span className="legend-label">{item.type}</span>
              <span className="legend-value">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
