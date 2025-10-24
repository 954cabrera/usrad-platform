// src/components/Providers/Dashboard/CentersManager.jsx
import React, { useState, useEffect } from "react";
import { Building2, Plus, Search } from "lucide-react";
import CenterCard from "./Centers/CenterCard";
import CenterFilters from "./Centers/CenterFilters";
import CenterStats from "./Centers/CenterStats";
import AddCenterModal from "./Centers/AddCenterModal";
import CentersSkeleton from "./Centers/CentersSkeleton";
import { centerStyles } from "./Centers/shared/styles";

export default function CentersManager({
  providerId,
  centers: initialCenters = [],
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [centers, setCenters] = useState(initialCenters);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    // Simulate loading centers
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filter centers
  const filteredCenters = centers.filter((center) => {
    const matchesSearch =
      center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || center.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddCenter = (newCenter) => {
    setCenters([...centers, { ...newCenter, id: Date.now() }]);
  };

  const handleEditCenter = (center) => {
    console.log("Edit center:", center);
    // Implement edit functionality
  };

  const handleDeleteCenter = (center) => {
    if (confirm("Are you sure you want to delete this center?")) {
      setCenters(centers.filter((c) => c.id !== center.id));
    }
  };

  const handleViewDetails = (center) => {
    console.log("View details:", center);
    // Implement view details functionality
  };

  if (isLoading) {
    return (
      <div className="centers-manager">
        <CentersSkeleton />
      </div>
    );
  }

  return (
    <div className="centers-manager">
      {/* Header */}
      <div className="centers-header">
        <div className="header-content">
          <h2 className="section-title">Imaging Centers</h2>
          <p className="section-subtitle">
            Manage your imaging centers and equipment
          </p>
        </div>
        <button
          className="add-center-btn glass-button desktop-only"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={20} />
          Add New Center
        </button>
      </div>

      {/* Stats Overview */}
      <CenterStats centers={centers} />

      {/* Search and Filters */}
      <div className="controls-bar">
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search centers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <CenterFilters
          activeFilter={filterStatus}
          onFilterChange={setFilterStatus}
          showMobileFilters={showMobileFilters}
          onToggleMobileFilters={() => setShowMobileFilters(!showMobileFilters)}
        />
      </div>

      {/* Add Center FAB (Mobile) */}
      <button
        className="add-fab mobile-only"
        onClick={() => setShowAddModal(true)}
        aria-label="Add center"
      >
        <Plus size={24} />
      </button>

      {/* Centers Grid */}
      <div className="centers-grid">
        {filteredCenters.map((center) => (
          <CenterCard
            key={center.id}
            center={center}
            onEdit={handleEditCenter}
            onDelete={handleDeleteCenter}
            onViewDetails={handleViewDetails}
          />
        ))}

        {/* Add Center Card - Desktop */}
        <div
          className="center-card add-card glass-card desktop-only"
          onClick={() => setShowAddModal(true)}
        >
          <div className="add-content">
            <Plus size={48} className="add-icon" />
            <p className="add-text">Add New Center</p>
            <p className="add-subtext">Expand your network</p>
          </div>
        </div>

        {/* Empty State */}
        {filteredCenters.length === 0 && (
          <div className="empty-state">
            <Building2 size={48} />
            <h3>No centers found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Add Center Modal */}
      {showAddModal && (
        <AddCenterModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddCenter}
        />
      )}

      <style>{`
        .centers-manager {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Header */
        .centers-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.5rem;
        }

        .section-subtitle {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.125rem;
        }

        .add-center-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-center-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
        }

        /* Controls Bar */
        .controls-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .search-container {
          position: relative;
          flex: 1;
          min-width: 200px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.5);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 3rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          transition: all 0.3s;
        }

        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .search-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.08);
          border-color: #667eea;
        }

        /* Add FAB */
        .add-fab {
          position: fixed;
          bottom: 80px;
          right: 1rem;
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 50%;
          color: white;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
          cursor: pointer;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          ${centerStyles.touchButton}
        }

        /* Centers Grid */
        .centers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1.5rem;
        }

        /* Glass Card */
        .glass-card {
          ${centerStyles.glassCard}
        }

        /* Add Card */
        .add-card {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          cursor: pointer;
          border-style: dashed;
        }

        .add-card:hover {
          border-color: rgba(102, 126, 234, 0.3);
          background: rgba(102, 126, 234, 0.05) !important;
        }

        .add-content {
          text-align: center;
        }

        .add-icon {
          color: rgba(255, 255, 255, 0.3);
          margin-bottom: 1rem;
        }

        .add-text {
          color: rgba(255, 255, 255, 0.8);
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .add-subtext {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        /* Empty State */
        .empty-state {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          text-align: center;
          color: rgba(255, 255, 255, 0.6);
          gap: 1rem;
        }

        .empty-state h3 {
          color: white;
          font-size: 1.25rem;
        }

        /* Utilities */
        .desktop-only {
          ${centerStyles.desktopOnly}
        }

        .mobile-only {
          display: none;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .centers-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .section-title {
            font-size: 1.5rem;
          }

          .section-subtitle {
            font-size: 1rem;
          }

          .mobile-only {
            display: flex !important;
          }

          .controls-bar {
            flex-direction: column;
            width: 100%;
          }

          .search-container {
            width: 100%;
          }

          .centers-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        /* Small Mobile */
        @media (max-width: 400px) {
          .centers-grid {
            padding: 0 0.5rem;
          }
        }

        /* Touch States */
        @media (hover: none) {
          .add-center-btn:active,
          .add-fab:active {
            transform: scale(0.98);
          }
        }

        /* Safe areas for iOS */
        @supports (padding: env(safe-area-inset-bottom)) {
          .add-fab {
            bottom: calc(80px + env(safe-area-inset-bottom));
          }
        }
      `}</style>
    </div>
  );
}
