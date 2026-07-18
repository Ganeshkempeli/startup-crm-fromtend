import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

/**
 * StatsCard component displays a single metric KPI card.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.title - The label or description of the metric (e.g., "Total Revenue")
 * @param {string|number} props.value - The main numeric or text metric value (e.g., "$45,200")
 * @param {React.ReactNode} props.icon - A Lucide icon component representing the metric type
 * @param {number|string} props.change - The percentage comparison shift value (e.g., 12.5 or -3.2)
 * @param {string} [props.color='blue'] - Semantic theme name (blue, green, orange, red)
 */
export const StatsCard = ({ title, value, icon, change, color = 'blue' }) => {
  const isPositive = Number(change) >= 0;
  const changeText = isPositive ? `+${change}%` : `${change}%`;
  
  // Mappings for Tailwind colors
  const colorMap = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      text: 'text-blue-600 dark:text-blue-400',
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-950/30',
      text: 'text-green-600 dark:text-green-400',
    },
    orange: {
      bg: 'bg-amber-50 dark:bg-amber-950/30',
      text: 'text-amber-600 dark:text-amber-400',
    },
    red: {
      bg: 'bg-red-50 dark:bg-red-950/30',
      text: 'text-red-600 dark:text-red-400',
    }
  };

  const selectedColor = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
      {/* Top Header of Card */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</span>
        <div className={`p-2.5 rounded-lg ${selectedColor.bg} ${selectedColor.text}`}>
          {icon}
        </div>
      </div>
      
      {/* Metrics Content */}
      <div>
        <div className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">{value}</div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
            isPositive 
              ? 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400' 
              : 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400'
          }`}>
            {isPositive ? <ArrowUpRight size={12} className="mr-0.5" /> : <ArrowDownRight size={12} className="mr-0.5" />}
            {changeText}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">vs last month</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
