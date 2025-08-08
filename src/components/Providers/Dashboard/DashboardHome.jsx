// src/components/Providers/Dashboard/DashboardHome.jsx
import React from "react";
import { Card, Title, Text, BarChart, LineChart, DonutChart } from "@tremor/react";
import { 
  Building2, 
  FileText, 
  TrendingUp, 
  Activity, 
  Calendar,
  DollarSign,
  Users,
  Clock,
  ChevronRight,
  AlertCircle,
  Shield,
  Award,
  CheckCircle
} from 'lucide-react';

export default function DashboardHome({ provider, recentDocuments = [], recentActivity = [] }) {
  // Mock data for charts
  const monthlyScans = [
    { month: "Jan", scans: 145 },
    { month: "Feb", scans: 189 },
    { month: "Mar", scans: 234 },
    { month: "Apr", scans: 281 },
    { month: "May", scans: 325 },
    { month: "Jun", scans: 0 },
  ];

  const scansByType = [
    { type: "MRI", count: 542, percentage: 45 },
    { type: "CT", count: 325, percentage: 27 },
    { type: "X-Ray", count: 216, percentage: 18 },
    { type: "Ultrasound", count: 120, percentage: 10 },
  ];

  // Define colors directly
  const colorMap = {
    emerald: '#10b981',
    blue: '#3b82f6',
    amber: '#f59e0b',
    purple: '#9333ea'
  };

  const stats = [
    {
      id: 1,
      label: "Documents",
      value: recentDocuments.length || 1,
      icon: FileText,
      color: "emerald",
      iconColor: '#10b981',
      bgColor: "rgba(34, 197, 94, 0.1)",
      borderColor: "rgba(34, 197, 94, 0.2)",
      status: "Active",
      trend: null,
      mobileLabel: "Docs"
    },
    {
      id: 2,
      label: "Active Centers",
      value: 1,
      icon: Building2,
      color: "blue",
      iconColor: '#3b82f6',
      bgColor: "rgba(59, 130, 246, 0.1)",
      borderColor: "rgba(59, 130, 246, 0.2)",
      status: "Verified",
      trend: null,
      mobileLabel: "Centers"
    },
    {
      id: 3,
      label: "Monthly Scans",
      value: "0",
      icon: Activity,
      color: "amber",
      iconColor: '#f59e0b',
      bgColor: "rgba(245, 158, 11, 0.1)",
      borderColor: "rgba(245, 158, 11, 0.2)",
      status: "Pending",
      subtext: "Awaiting first patients",
      trend: null,
      mobileLabel: "Scans"
    },
    {
      id: 4,
      label: "Compliance Score",
      value: "95%",
      icon: TrendingUp,
      color: "emerald",
      iconColor: '#10b981',
      bgColor: "rgba(34, 197, 94, 0.1)",
      borderColor: "rgba(34, 197, 94, 0.2)",
      status: "Excellent",
      trend: "+5%",
      mobileLabel: "Score"
    },
  ];

  const quickActions = [
    { label: "Upload Document", icon: FileText, href: "/providers/portal/documents", color: "blue", bgColor: "rgba(59, 130, 246, 0.05)", iconColor: "#3b82f6" },
    { label: "Add Center", icon: Building2, href: "/providers/portal/centers", color: "purple", bgColor: "rgba(147, 51, 234, 0.05)", iconColor: "#9333ea" },
    { label: "View Reports", icon: TrendingUp, href: "/providers/portal/reports", color: "emerald", bgColor: "rgba(34, 197, 94, 0.05)", iconColor: "#10b981" },
    { label: "Get Support", icon: Users, href: "/providers/support", color: "amber", bgColor: "rgba(245, 158, 11, 0.05)", iconColor: "#f59e0b" },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getActivityIcon = (action) => {
    switch(action) {
      case 'PSA_SIGNED': return FileText;
      case 'CENTER_ADDED': return Building2;
      case 'DOCUMENT_UPLOADED': return FileText;
      default: return Activity;
    }
  };

  const getActivityText = (action) => {
    switch(action) {
      case 'PSA_SIGNED': return 'Provider Service Agreement signed';
      case 'CENTER_ADDED': return 'New imaging center added';
      case 'DOCUMENT_UPLOADED': return 'Document uploaded';
      default: return 'Activity recorded';
    }
  };

  // Add this new component inside DashboardHome (before the return statement)
  const CertificationBadges = () => (
    <div className="certification-badges">
      <div className="badge-item">
        <Shield size={16} />
        <span>HIPAA Compliant</span>
      </div>
      <div className="badge-item">
        <CheckCircle size={16} />
        <span>ACR Accredited</span>
      </div>
    </div>
  );

  return (
    <div className="dashboard-home">
      {/* Welcome Header */}
      <div className="welcome-header">
        <div className="welcome-content">
          <h2 className="welcome-title">
            Welcome back, <span className="provider-name">{provider?.organization_name || 'Provider'}</span>
          </h2>
          <p className="welcome-subtitle">
            Here's an overview of your USRad Network activity
          </p>
        </div>
        <div className="header-actions">
          <button className="quick-action-btn mobile-hide">
            <Calendar size={20} />
            <span>Schedule Demo</span>
          </button>
        </div>
      </div>

      {/* Certification Badges */}
      <CertificationBadges />

      {/* Mobile Alert */}
      <div className="mobile-alert">
        <AlertCircle size={20} />
        <span>Complete your profile to start receiving patients</span>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="stat-card glass-card">
              <div className="stat-header">
                <div
                  className="stat-icon"
                  style={{
                    background: stat.bgColor,
                    borderColor: stat.borderColor,
                    color: stat.iconColor,
                  }}
                >
                  <Icon size={24} />
                </div>
                {stat.trend && (
                  <span
                    className="stat-trend"
                    style={{ color: stat.iconColor }}
                  >
                    {stat.trend}
                  </span>
                )}
              </div>

              <div className="stat-body">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">
                  <span className="desktop-label">{stat.label}</span>
                  <span className="mobile-label">{stat.mobileLabel}</span>
                </div>
                {stat.subtext && (
                  <div className="stat-subtext">{stat.subtext}</div>
                )}
              </div>

              <div className="stat-footer">
                <span className={`status-badge ${stat.color}`}>
                  {stat.status}
                </span>
                {/* Add this trust indicator for compliance */}
                {stat.label === "Compliance Score" && (
                  <span className="trust-indicator">
                    <CheckCircle size={12} />
                    Verified
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
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
                    background: ['#6366f1', '#06b6d4', '#f59e0b', '#10b981'][idx] 
                  }}
                />
                <span className="legend-label">{item.type}</span>
                <span className="legend-value">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Documents */}
      <div className="activity-section">
        {/* Recent Activity */}
        <div className="activity-card glass-card">
          <div className="section-header">
            <h3 className="section-title">Recent Activity</h3>
            <a href="/providers/portal/activity" className="view-all-link">
              View all
              <ChevronRight size={16} />
            </a>
          </div>
          
          <div className="activity-list">
            {recentActivity.length > 0 ? (
              recentActivity.slice(0, 5).map((activity, index) => {
                const ActivityIcon = getActivityIcon(activity.action);
                return (
                  <div key={activity.id || index} className="activity-item">
                    <div className="activity-icon">
                      <ActivityIcon size={16} />
                    </div>
                    <div className="activity-content">
                      <p className="activity-text">{getActivityText(activity.action)}</p>
                      <p className="activity-time">{formatDate(activity.created_at)}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="empty-state">
                <Clock size={24} />
                <p>No recent activity</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Documents - Mobile Card View */}
        <div className="documents-card glass-card">
          <div className="section-header">
            <h3 className="section-title">Recent Documents</h3>
            <a href="/providers/portal/documents" className="view-all-link">
              View all
              <ChevronRight size={16} />
            </a>
          </div>
          
          <div className="documents-list">
            {recentDocuments.length > 0 ? (
              recentDocuments.slice(0, 3).map((doc, index) => (
                <a 
                  key={doc.id || index} 
                  href="/providers/portal/documents" 
                  className="document-item"
                >
                  <div className="document-icon">
                    <FileText size={20} />
                  </div>
                  <div className="document-info">
                    <p className="document-name">{doc.document_type.split('_').join(' ')}</p>
                    <p className="document-date">{formatDate(doc.signed_date)}</p>
                  </div>
                  <ChevronRight size={20} className="document-arrow" />
                </a>
              ))
            ) : (
              <div className="empty-state">
                <FileText size={24} />
                <p>No documents yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      // src/components/Providers/Dashboard/DashboardHome.jsx
// ... (all your existing code up to the Quick Actions section) ...

      {/* Quick Actions - Mobile Optimized */}
      <div className="quick-actions-section">
        <h3 className="section-title">Quick Actions</h3>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => {
            const ActionIcon = action.icon;
            return (
              <a
                key={index}
                href={action.href}
                className="quick-action-card"
              >
                <div 
                  className="action-icon"
                  style={{
                    background: action.bgColor,
                    color: action.iconColor
                  }}
                >
                  <ActionIcon size={24} />
                </div>
                <span className="action-label">{action.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .dashboard-home {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Certification Badges */
        .certification-badges {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: rgba(14, 165, 233, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(14, 165, 233, 0.1);
          margin-bottom: 1.5rem;
        }

        .badge-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          font-size: 0.875rem;
          color: #0ea5e9;
        }

        /* Welcome Header */
        .welcome-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .welcome-title {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .provider-name {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .welcome-subtitle {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.125rem;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .quick-action-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          font-weight: 500;
          transition: all 0.3s;
          cursor: pointer;
        }

        .quick-action-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        /* Mobile Alert */
        .mobile-alert {
          display: none;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
          border-radius: 12px;
          color: #f59e0b;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
        }

        /* Glass Card Base */
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border-color: #0ea5e9;
          box-shadow: 0 0 20px rgba(14, 165, 233, 0.1);
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          position: relative;
          overflow: hidden;
        }

        .stat-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid;
          transition: all 0.3s;
        }

        .stat-trend {
          font-size: 0.875rem;
          font-weight: 600;
        }

        .stat-value {
          font-size: 2.25rem;
          font-weight: 700;
          color: white;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .desktop-label {
          display: inline;
        }

        .mobile-label {
          display: none;
        }

        .stat-subtext {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        .stat-footer {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .status-badge.emerald {
          background: rgba(34, 197, 94, 0.2);
          color: #22c55e;
        }

        .status-badge.blue {
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
        }

        .status-badge.amber {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }

        /* Charts Section */
        .charts-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .chart-card {
          display: flex;
          flex-direction: column;
        }

        .chart-header {
          margin-bottom: 1.5rem;
        }

        .chart-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
          margin-bottom: 0.25rem;
        }

        .chart-subtitle {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        .chart-container {
          flex: 1;
          min-height: 250px;
        }

        .chart-footer {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        .chart-note {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        .donut-wrapper {
          position: relative;
        }

        .chart-legend {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          margin-top: 1.5rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .legend-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .legend-label {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
          flex: 1;
        }

        .legend-value {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          font-weight: 600;
        }

        /* Activity Section */
        .activity-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: white;
        }

        .view-all-link {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #667eea;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: color 0.3s;
        }

        .view-all-link:hover {
          color: #764ba2;
        }

        /* Activity List */
        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .activity-icon {
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.6);
          flex-shrink: 0;
        }

        .activity-text {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .activity-time {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.75rem;
        }

        /* Documents List */
        .documents-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .document-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.2s;
        }

        .document-item:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .document-icon {
          width: 40px;
          height: 40px;
          background: rgba(102, 126, 234, 0.1);
          border: 1px solid rgba(102, 126, 234, 0.2);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #667eea;
          flex-shrink: 0;
        }

        .document-info {
          flex: 1;
        }

        .document-name {
          color: white;
          font-weight: 500;
          margin-bottom: 0.25rem;
          text-transform: capitalize;
        }

        .document-date {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        .document-arrow {
          color: rgba(255, 255, 255, 0.3);
        }

        /* Empty State */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
          color: rgba(255, 255, 255, 0.5);
          gap: 0.75rem;
        }

        /* Quick Actions */
        .quick-actions-section {
          margin-top: 2rem;
        }

        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .quick-action-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.3s;
          gap: 0.75rem;
          min-height: 120px;
        }

        .quick-action-card:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .action-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-label {
          color: white;
          font-weight: 500;
          text-align: center;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .dashboard-home {
            padding: 0;
          }

          /* Mobile Alert */
          .mobile-alert {
            display: flex;
          }

          /* Welcome Header */
          .welcome-header {
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 1.5rem;
          }

          .welcome-title {
            font-size: 1.5rem;
          }

          .welcome-subtitle {
            font-size: 1rem;
          }

          .mobile-hide {
            display: none !important;
          }

          /* Stats Grid */
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .stat-card {
            padding: 1rem !important;
          }

          .stat-icon {
            width: 40px;
            height: 40px;
          }

          .stat-value {
            font-size: 1.5rem;
          }

          .stat-label {
            font-size: 0.875rem;
          }

          .desktop-label {
            display: none;
          }

          .mobile-label {
            display: inline;
          }

          /* Charts */
          .charts-section {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .chart-card.mobile-full {
            grid-column: 1;
          }

          .chart-container {
            min-height: 200px;
          }

          .chart-legend {
            grid-template-columns: 1fr;
          }

          /* Activity Section */
          .activity-section {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .section-title {
            font-size: 1.125rem;
          }

          /* Quick Actions */
          .quick-actions-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .quick-action-card {
            padding: 1rem;
            min-height: 100px;
          }

          .action-icon {
            width: 40px;
            height: 40px;
          }

          .action-label {
            font-size: 0.875rem;
          }

          .certification-badges {
            flex-wrap: wrap;
          }

          .badge-item {
            font-size: 0.75rem;
            padding: 0.375rem 0.75rem;
          }
        }

        /* Small Mobile */
        @media (max-width: 400px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .quick-actions-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Tablet */
        @media (min-width: 768px) and (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Touch-friendly tap targets */
        @media (hover: none) {
          .stat-card:active {
            transform: scale(0.98);
          }

          .quick-action-card:active {
            transform: scale(0.98);
          }

          .document-item:active {
            background: rgba(255, 255, 255, 0.1);
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }

        /* Trust indicators */
        .trust-indicator {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.25rem 0.75rem;
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.2);
        border-radius: 999px;
        color: #10b981;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-left: 0.5rem;
        }

        .stat-footer {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
        }

      `}</style>
    </div>
  );
}