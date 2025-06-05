import React, { useState, useEffect } from 'react';

const SkeletonPSASystem = ({ PSAComponent, providerData }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 seconds for PSA complexity

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <style>{`
          @keyframes shimmer {
            0% {
              background-position: -200px 0;
            }
            100% {
              background-position: calc(200px + 100%) 0;
            }
          }

          .animate-pulse {
            animation: shimmer 2s infinite linear;
            background: linear-gradient(90deg, #f0f0f0 0px, #e0e0e0 40px, #f0f0f0 80px);
            background-size: 200px;
          }
        `}</style>

        {/* Header Skeleton */}
        <div className="bg-gradient-to-r from-[#1e40af] via-[#3b82f6] to-[#1d4ed8] text-white relative overflow-hidden">
          <div className="relative max-w-4xl mx-auto p-8 animate-pulse">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-10 bg-white/20 rounded-lg w-96 mb-2"></div>
                <div className="h-6 bg-white/15 rounded w-80"></div>
              </div>
              <div className="h-8 bg-white/20 rounded-full w-28"></div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6 -mt-4 relative z-10">
          {/* Progress Section Skeleton */}
          <div className="mb-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border-none">
            <div className="p-6 animate-pulse">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
                </div>
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full mb-6">
                <div className="h-2 bg-gradient-to-r from-blue-200 to-blue-300 rounded-full w-1/4"></div>
              </div>

              {/* Step Indicators Skeleton */}
              <div className="flex items-center justify-between max-w-4xl mx-auto">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-16 h-16 rounded-full border-2 shadow-lg ${
                        index === 0 ? 'bg-gradient-to-r from-blue-200 to-blue-300' : 'bg-gradient-to-r from-gray-200 to-gray-300'
                      }`}></div>
                      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 mt-2"></div>
                    </div>
                    {index < 3 && (
                      <div className="w-16 h-1 mx-4 rounded-full bg-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="space-y-8">
            {/* Provider Details Card Skeleton */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border-none">
              <div className="bg-gradient-to-r from-[#1e40af] to-[#3b82f6] text-white p-6 rounded-t-xl">
                <div className="h-6 bg-white/20 rounded w-64 mb-2"></div>
                <div className="h-4 bg-white/15 rounded w-80"></div>
              </div>
              <div className="p-8 animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-24 mb-1"></div>
                          <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-6">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-20 mb-1"></div>
                          <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-28"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Key Terms Cards Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`border-l-4 ${
                  i === 0 ? 'border-l-blue-500 bg-gradient-to-br from-blue-50 to-white' :
                  i === 1 ? 'border-l-green-500 bg-gradient-to-br from-green-50 to-white' :
                  i === 2 ? 'border-l-yellow-500 bg-gradient-to-br from-yellow-50 to-white' :
                  'border-l-red-500 bg-gradient-to-br from-red-50 to-white'
                } shadow-xl rounded-xl animate-pulse`}>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 rounded-full mr-3 shadow-md ${
                        i === 0 ? 'bg-gradient-to-r from-blue-200 to-blue-300' :
                        i === 1 ? 'bg-gradient-to-r from-green-200 to-green-300' :
                        i === 2 ? 'bg-gradient-to-r from-yellow-200 to-yellow-300' :
                        'bg-gradient-to-r from-red-200 to-red-300'
                      }`}></div>
                      <div>
                        <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 mb-1"></div>
                        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6"></div>
                      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/5"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* DocuSeal Status Skeleton */}
            <div className="border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 shadow-xl border-2 rounded-xl animate-pulse">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-200 to-green-300 rounded mr-3"></div>
                  <div className="h-6 bg-gradient-to-r from-green-200 to-green-300 rounded w-48"></div>
                  <div className="h-6 bg-gradient-to-r from-green-300 to-green-400 rounded-full w-16 ml-4"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-4 h-4 bg-gradient-to-r from-green-200 to-green-300 rounded mr-2"></div>
                      <div className="h-4 bg-gradient-to-r from-green-200 to-green-300 rounded w-32"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex gap-4">
              <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-48"></div>
              <div className="h-12 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // After loading, render the actual PSA component
  if (PSAComponent) {
    return React.createElement(PSAComponent, { providerData });
  }

  // Fallback message
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">PSA Component Loading...</h2>
        <p className="text-gray-600">Please wait while we load your Provider Service Agreement.</p>
      </div>
    </div>
  );
};

export default SkeletonPSASystem;