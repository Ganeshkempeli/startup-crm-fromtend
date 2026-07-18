import React from 'react';
import { Calendar } from 'lucide-react';

/**
 * AnalyticsFilters displays navigation filters to drill analytics metrics down.
 * Supports presets and custom start/end date inputs.
 *
 * @component
 */
export const AnalyticsFilters = ({ timeframe, setTimeframe, customRange, setCustomRange }) => {
  const handleStartChange = (e) => {
    setCustomRange((prev) => ({ ...prev, startDate: e.target.value }));
  };

  const handleEndChange = (e) => {
    setCustomRange((prev) => ({ ...prev, endDate: e.target.value }));
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm transition-colors duration-200">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <Calendar size={16} />
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            Timeframe
          </span>
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {timeframe === '7days' && 'Last 7 Days'}
            {timeframe === '30days' && 'Last 30 Days'}
            {timeframe === '90days' && 'Last 90 Days'}
            {timeframe === 'thisYear' && 'This Year'}
            {timeframe === 'custom' && 'Custom Date Range'}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Preset Selector */}
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-3.5 py-1.5 border border-slate-200 dark:border-slate-850 rounded-lg text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950/30 focus:border-blue-500 cursor-pointer font-medium transition-all"
        >
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="90days">Last 90 Days</option>
          <option value="thisYear">This Year</option>
          <option value="custom">Custom Range</option>
        </select>

        {/* Custom Range Inputs */}
        {timeframe === 'custom' && (
          <div className="flex items-center gap-2 animate-fade-in">
            <input
              type="date"
              aria-label="Start Date"
              value={customRange.startDate}
              onChange={handleStartChange}
              className="px-2.5 py-1 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">to</span>
            <input
              type="date"
              aria-label="End Date"
              value={customRange.endDate}
              onChange={handleEndChange}
              className="px-2.5 py-1 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsFilters;
