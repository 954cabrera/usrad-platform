// src/components/Providers/Dashboard/Security/SecurityScore.jsx
import React from "react";
import { Shield, Check, X, TrendingUp } from "lucide-react";

export default function SecurityScore({ twoFactorEnabled = false }) {
  // Calculate score based on various factors
  const factors = {
    strongPassword: true, // Assume true for demo
    twoFactor: twoFactorEnabled,
    regularReviews: true,
    noFailedLogins: true,
    apiKeyRotation: false,
  };

  const calculateScore = () => {
    const weights = {
      strongPassword: 25,
      twoFactor: 30,
      regularReviews: 20,
      noFailedLogins: 15,
      apiKeyRotation: 10,
    };

    let score = 0;
    Object.keys(factors).forEach((key) => {
      if (factors[key]) {
        score += weights[key];
      }
    });

    return score;
  };

  const score = calculateScore();

  const getScoreColor = (score) => {
    if (score >= 90) return "#22c55e";
    if (score >= 70) return "#3b82f6";
    if (score >= 50) return "#f59e0b";
    return "#ef4444";
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Fair";
    return "Needs Improvement";
  };

  const recommendations = [
    {
      id: "twoFactor",
      label: "Enable two-factor authentication",
      completed: factors.twoFactor,
      priority: "high",
    },
    {
      id: "strongPassword",
      label: "Use a strong password",
      completed: factors.strongPassword,
      priority: "high",
    },
    {
      id: "regularReviews",
      label: "Regular security reviews",
      completed: factors.regularReviews,
      priority: "medium",
    },
    {
      id: "apiKeyRotation",
      label: "Rotate API keys regularly",
      completed: factors.apiKeyRotation,
      priority: "low",
    },
  ];

  return (
    <div className="security-score glass-card">
      <div className="score-content">
        <div className="score-visual">
          <div className="score-circle">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path
                className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle"
                strokeDasharray={`${score}, 100`}
                style={{ stroke: getScoreColor(score) }}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="20.35" className="percentage">
                {score}%
              </text>
            </svg>
          </div>
          <div className="score-info">
            <p className="score-label">Security Score</p>
            <p className="score-status" style={{ color: getScoreColor(score) }}>
              {getScoreLabel(score)}
            </p>
          </div>
        </div>

        <div className="score-details">
          <div className="recommendations-header">
            <h4>Security Recommendations</h4>
            {score < 100 && (
              <span className="improvement-potential">
                <TrendingUp size={14} />
                {100 - score}% improvement possible
              </span>
            )}
          </div>

          <div className="recommendations">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className={`recommendation ${rec.completed ? "completed" : ""} priority-${rec.priority}`}
              >
                <div className="rec-icon">
                  {rec.completed ? <Check size={16} /> : <X size={16} />}
                </div>
                <span className="rec-label">{rec.label}</span>
                {!rec.completed && rec.priority === "high" && (
                  <span className="priority-badge">High Priority</span>
                )}
              </div>
            ))}
          </div>

          <div className="score-breakdown">
            <h5>Score Breakdown</h5>
            <div className="breakdown-items">
              <div className="breakdown-item">
                <span>Password Strength</span>
                <span className="points">25/25</span>
              </div>
              <div className="breakdown-item">
                <span>Two-Factor Auth</span>
                <span className="points">
                  {factors.twoFactor ? "30/30" : "0/30"}
                </span>
              </div>
              <div className="breakdown-item">
                <span>Security Reviews</span>
                <span className="points">20/20</span>
              </div>
              <div className="breakdown-item">
                <span>Login Security</span>
                <span className="points">15/15</span>
              </div>
              <div className="breakdown-item">
                <span>API Key Management</span>
                <span className="points">
                  {factors.apiKeyRotation ? "10/10" : "0/10"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .glass-card {
          background: linear-gradient(
            135deg,
            rgba(102, 126, 234, 0.1) 0%,
            rgba(118, 75, 162, 0.1) 100%
          ) !important;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(102, 126, 234, 0.2);
          border-radius: 16px;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .score-content {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
        }

        .score-visual {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .score-circle {
          width: 120px;
          height: 120px;
          position: relative;
        }

        .circular-chart {
          display: block;
          margin: 0 auto;
          max-width: 100%;
        }

        .circle-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.1);
          stroke-width: 2.8;
        }

        .circle {
          fill: none;
          stroke-width: 2.8;
          stroke-linecap: round;
          animation: progress 1s ease-out forwards;
        }

        @keyframes progress {
          0% {
            stroke-dasharray: 0 100;
          }
        }

        .percentage {
          fill: white;
          font-size: 0.5em;
          text-anchor: middle;
          font-weight: 700;
        }

        .score-info {
          text-align: center;
        }

        .score-label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          margin: 0 0 0.25rem 0;
        }

        .score-status {
          font-weight: 600;
          font-size: 1.125rem;
          margin: 0;
        }

        .score-details {
          flex: 1;
        }

        .recommendations-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .recommendations-header h4 {
          color: white;
          margin: 0;
          font-size: 1.125rem;
        }

        .improvement-potential {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          color: #3b82f6;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .recommendations {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .recommendation {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
          position: relative;
        }

        .recommendation.completed {
          color: #22c55e;
          background: rgba(34, 197, 94, 0.05);
        }

        .rec-icon {
          width: 24px;
          height: 24px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .recommendation.completed .rec-icon {
          background: rgba(34, 197, 94, 0.2);
        }

        .rec-label {
          flex: 1;
        }

        .priority-badge {
          padding: 0.125rem 0.5rem;
          background: rgba(239, 68, 68, 0.2);
          color: #ef4444;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .score-breakdown {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .score-breakdown h5 {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          font-weight: 600;
          margin: 0 0 0.75rem 0;
        }

        .breakdown-items {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .breakdown-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.813rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .points {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
        }

        @media (max-width: 768px) {
          .score-content {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .score-details {
            width: 100%;
          }

          .recommendations-header {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
          }

          .recommendation {
            font-size: 0.813rem;
            padding: 0.625rem;
          }

          .priority-badge {
            position: absolute;
            top: 0.25rem;
            right: 0.5rem;
            font-size: 0.625rem;
          }

          .score-breakdown {
            margin-top: 1rem;
            padding-top: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
