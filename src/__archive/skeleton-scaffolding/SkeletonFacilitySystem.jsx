import React, { useState, useEffect } from 'react';
// Import your original FacilityManager component
// Uncomment this line when you update the facilities.astro:
// import FacilityManager from './FacilityManager';

const SkeletonFacilityWrapper = ({ children, FacilityManagerComponent }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // 1.2 seconds of skeleton loading

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen usrad-gradient-bg p-6">
        {/* Header Skeleton */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="usrad-card p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-64 mb-3 animate-pulse"></div>
                <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-96 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Cards Skeleton */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((card) => (
              <div key={card} className="usrad-card p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-12 mb-2 animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="max-w-6xl mx-auto">
          <div className="usrad-card p-8">
            <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 mb-6 animate-pulse"></div>
            
            {/* Form Fields Skeleton */}
            <div className="space-y-6">
              {[1, 2, 3].map((field) => (
                <div key={field} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mb-2 animate-pulse"></div>
                    <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-full animate-pulse"></div>
                  </div>
                  <div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 mb-2 animate-pulse"></div>
                    <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-full animate-pulse"></div>
                  </div>
                  <div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 mb-2 animate-pulse"></div>
                    <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Button Skeleton */}
            <div className="flex justify-center mt-8">
              <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-40 animate-pulse"></div>
            </div>

            {/* Locations List Skeleton */}
            <div className="mt-12">
              <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 mb-4 animate-pulse"></div>
              <div className="space-y-4">
                {[1].map((item) => (
                  <div key={item} className="usrad-card p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-64 mb-2 animate-pulse"></div>
                        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-48 mb-1 animate-pulse"></div>
                        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 animate-pulse"></div>
                      </div>
                      <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-8 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Button Skeleton */}
            <div className="flex justify-end mt-8">
              <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // After loading, render your original FacilityManager component
  if (children) {
    return children;
  }
  
  if (FacilityManager) {
    return React.createElement(FacilityManager);
  }
  
  if (FacilityManagerComponent) {
    return React.createElement(FacilityManagerComponent);
  }

  // Fallback message if no component provided
  return (
    <div className="min-h-screen usrad-gradient-bg p-6 flex items-center justify-center">
      <div className="usrad-card p-8 text-center">
        <h2 className="text-2xl font-bold usrad-navy mb-4">Facility Manager Not Found</h2>
        <p className="text-gray-600">Please check that FacilityManager component is imported correctly.</p>
      </div>
    </div>
  );
};

export default SkeletonFacilityWrapper;