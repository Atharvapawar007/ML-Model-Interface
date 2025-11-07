/**
 * ChartContainer Component
 * Wrapper component for charts with loading and error states
 */

import React from 'react';

function ChartContainer({ title, loading, error, children }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      {error && (
        <div className="text-center py-12 text-red-500">
          <p>Error loading chart data: {error}</p>
        </div>
      )}
      {!loading && !error && (
        <div className="w-full">
          {children}
        </div>
      )}
      {!loading && !error && !children && (
        <div className="text-center py-12 text-gray-500">
          <p>No data available</p>
        </div>
      )}
    </div>
  );
}

export default ChartContainer;

