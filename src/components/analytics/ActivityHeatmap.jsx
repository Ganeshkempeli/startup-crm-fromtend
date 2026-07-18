import React, { useState } from 'react';
import { CalendarRange } from 'lucide-react';

/**
 * ActivityHeatmap renders a GitHub-style activity block grid representing touchpoints
 * over the last 30 days.
 *
 * @component
 */
export const ActivityHeatmap = ({ heatmapData = [] }) => {
  const [hoveredDay, setHoveredDay] = useState(null);

  // Determine background color based on activity density
  const getDensityClass = (count) => {
    if (count === 0) return 'bg-slate-100 dark:bg-slate-800 border-slate-200/50 dark:border-slate-800';
    if (count === 1) return 'bg-blue-100 dark:bg-blue-900/30 border-blue-200/30 dark:border-blue-900/20';
    if (count === 2) return 'bg-blue-300 dark:bg-blue-700/60 border-blue-400/30 dark:border-blue-700/40';
    return 'bg-blue-600 dark:bg-blue-500 border-blue-700/40 dark:border-blue-400/40';
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
      <div>
        <div className="border-b border-slate-100 dark:border-slate-800/60 pb-3 mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
            <CalendarRange size={16} className="text-blue-500" />
            <span>Activity Heatmap</span>
          </h3>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            Last 30 Days
          </span>
        </div>

        {/* Heatmap Grid */}
        <div className="flex flex-col gap-4 my-2.5">
          <div className="grid grid-cols-10 gap-2 items-center justify-center">
            {heatmapData.map((day, idx) => (
              <div
                key={idx}
                className={`w-full aspect-square rounded-md border cursor-pointer transition-all duration-150 ${getDensityClass(
                  day.count
                )} ${hoveredDay?.date === day.date ? 'ring-2 ring-blue-500 scale-105' : ''}`}
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
                title={`${day.displayDate}: ${day.count} ${day.count === 1 ? 'activity' : 'activities'}`}
              />
            ))}
          </div>

          {/* Interactive Info display on hover */}
          <div className="h-6 flex items-center justify-center">
            {hoveredDay ? (
              <span className="text-xs font-semibold text-slate-850 dark:text-slate-200 animate-fade-in">
                {hoveredDay.displayDate}: <strong className="text-blue-600 dark:text-blue-400">{hoveredDay.count}</strong> {hoveredDay.count === 1 ? 'action logged' : 'actions logged'}
              </span>
            ) : (
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium italic">
                Hover over a square to view detailed metrics
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Grid Legend Footer */}
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-3.5 mt-4">
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          CRM Interactions
        </span>
        <div className="flex items-center gap-1.5 text-xs text-slate-450 dark:text-slate-500">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-800" />
          <div className="w-2.5 h-2.5 rounded bg-blue-100 dark:bg-blue-900/30 border border-blue-250/20" />
          <div className="w-2.5 h-2.5 rounded bg-blue-300 dark:bg-blue-700/60 border border-blue-400/20" />
          <div className="w-2.5 h-2.5 rounded bg-blue-600 dark:bg-blue-500 border border-blue-700/20" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
