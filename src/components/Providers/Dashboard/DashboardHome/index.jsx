// src/components/Providers/Dashboard/DashboardHome/index.jsx
import React, { useState, useEffect } from "react";
import WelcomeHeader from "./WelcomeHeader";
import StatsGrid from "./StatsGrid";
import ChartsSection from "./ChartsSection";
import ActivitySection from "./ActivitySection";
import QuickActions from "./QuickActions";
import DashboardSkeleton from "./DashboardSkeleton";
import {
  stats,
  quickActions,
  monthlyScans,
  scansByType,
} from "../../../../data/dashboard-mock-data";
import "../../../../styles/providers/dashboard-home.css";

export default function DashboardHome({
  provider,
  recentDocuments = [],
  recentActivity = [],
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="dashboard-home">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="dashboard-home">
      <WelcomeHeader provider={provider} />
      <StatsGrid stats={stats} recentDocuments={recentDocuments} />
      <ChartsSection monthlyScans={monthlyScans} scansByType={scansByType} />
      <ActivitySection
        recentActivity={recentActivity}
        recentDocuments={recentDocuments}
      />
      <QuickActions actions={quickActions} />
    </div>
  );
}
