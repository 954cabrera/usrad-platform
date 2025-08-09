// src/components/Providers/Dashboard/DashboardHome/ActivitySection.jsx
import React from 'react';
import { 
  FileText, 
  Building2, 
  Activity,
  Clock,
  ChevronRight 
} from 'lucide-react';

export default function ActivitySection({ recentActivity, recentDocuments }) {
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

  return (
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
                    <p className="activity-text">
                      {getActivityText(activity.action)}
                    </p>
                    <p className="activity-time">
                      {formatDate(activity.created_at)}
                    </p>
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

      {/* Recent Documents */}
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
                  <p className="document-name">
                    {doc.document_type.split("_").join(" ")}
                  </p>
                  <p className="document-date">
                    {formatDate(doc.signed_date)}
                  </p>
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
  );
}