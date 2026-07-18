import React from 'react';

/**
 * LoadingSkeleton displays a structured layout skeleton during dashboard loading phases.
 *
 * @component
 */
export const LoadingSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-6 animate-pulse p-1">
      {/* 6 KPI Skeletons */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {[...Array(6)].map((_, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col gap-2">
            <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="h-8 w-1/2 bg-slate-200 dark:bg-slate-800 rounded mt-2"></div>
            <div className="h-3 w-3/4 bg-slate-100 dark:bg-slate-800/60 rounded"></div>
          </div>
        ))}
      </div>

      {/* Row 1 Charts: Pie + Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-80 flex flex-col gap-4">
            <div className="h-5 w-1/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="flex-1 bg-slate-100 dark:bg-slate-800/40 rounded-xl flex items-center justify-center">
              {/* Spinner to represent chart loading */}
              <div className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-700 border-t-blue-500 animate-spin"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2 Charts: Bar + Line */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-80 flex flex-col gap-4">
            <div className="h-5 w-1/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="flex-1 bg-slate-100 dark:bg-slate-800/40 rounded-xl flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-700 border-t-blue-500 animate-spin"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Row 3: Revenue + Lead Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 h-80 flex flex-col gap-4">
            <div className="h-5 w-1/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="flex-1 bg-slate-100 dark:bg-slate-800/40 rounded-xl flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-slate-200 dark:border-slate-700 border-t-blue-500 animate-spin"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
