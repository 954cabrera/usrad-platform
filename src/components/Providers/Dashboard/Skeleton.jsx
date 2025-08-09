// src/components/Providers/Dashboard/Skeleton.jsx
import React from "react";

export const Skeleton = ({ className = "", ...props }) => (
  <div className={`skeleton ${className}`} {...props} />
);

export const SkeletonText = ({ lines = 1, className = "" }) => (
  <div className={`skeleton-text ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="skeleton-line" />
    ))}
  </div>
);

export const SkeletonCard = ({ className = "" }) => (
  <div className={`skeleton-card glass-card ${className}`}>
    <div className="skeleton-header">
      <Skeleton className="skeleton-icon" />
      <Skeleton className="skeleton-badge" />
    </div>
    <Skeleton className="skeleton-value" />
    <SkeletonText lines={2} />
  </div>
);
