import React from 'react';

export default function SearchSummary({ zip, cptCode, state, count, avgPrice, avgSavings }) {
  if (!zip || !cptCode || !state) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Showing results for <span className="text-blue-600">{cptCode}</span> in{' '}
            <span className="text-blue-600">{zip}</span>, {state}
          </h2>
          <p className="text-gray-500">{count || 0} imaging centers found</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm mt-2 md:mt-0">
          {avgPrice !== null && (
            <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 font-medium">
              Avg. Price: ${avgPrice}
            </span>
          )}
          {avgSavings !== null && (
            <span className="px-3 py-1 bg-green-100 text-green-800 font-semibold rounded-full">
              Save up to {avgSavings}% vs. hospital rates
            </span>
          )}
          <span className="px-3 py-1 bg-blue-100 text-blue-700 font-medium rounded-full">
            USRad Direct Network
          </span>
        </div>
      </div>
    </div>
  );
}
