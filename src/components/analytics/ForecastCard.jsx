import React from 'react';
import { Sparkles, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

/**
 * Format currency in Indian Rupees.
 */
const formatIndianRupee = (val) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val || 0);
};

/**
 * ForecastCard projects next month's won revenue based on historic performance.
 *
 * @component
 */
export const ForecastCard = ({ forecast = {} }) => {
  const {
    predictedRevenue = 0,
    confidenceScore = 85,
    growthTrend = 'stable',
  } = forecast;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
      <div>
        <div className="border-b border-slate-100 dark:border-slate-800/60 pb-3 mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
            <Sparkles size={16} className="text-blue-500 fill-blue-500/20" />
            <span>Revenue Forecast</span>
          </h3>
          <span className="text-[10px] bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold px-2 py-0.5 rounded flex items-center gap-1">
            <RefreshCw size={10} className="animate-spin" style={{ animationDuration: '4s' }} />
            <span>AI Projected</span>
          </span>
        </div>

        <div className="my-3">
          <span className="text-3xl font-black text-slate-900 dark:text-slate-50 block leading-tight">
            {formatIndianRupee(predictedRevenue)}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold block mt-1">
            Predicted Won Revenue (Next Month)
          </span>
        </div>

        {/* Confidence score bar */}
        <div className="mt-5 border-t border-slate-100 dark:border-slate-800/60 pt-4">
          <div className="flex justify-between items-center mb-1.5 text-xs font-semibold">
            <span className="text-slate-500 dark:text-slate-400">Confidence Score</span>
            <span className="text-slate-900 dark:text-slate-100">{confidenceScore}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                confidenceScore > 75
                  ? 'bg-green-500'
                  : confidenceScore > 50
                  ? 'bg-amber-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${confidenceScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Growth Trend indicator footer */}
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-4 mt-5">
        <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Growth Trend</span>
        <div className="flex items-center gap-1.5 text-xs font-bold">
          {growthTrend === 'up' && (
            <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
              <TrendingUp size={14} />
              <span>Expansion (+12%)</span>
            </span>
          )}
          {growthTrend === 'down' && (
            <span className="text-red-650 dark:text-red-450 flex items-center gap-1">
              <TrendingDown size={14} />
              <span>Contraction (-4%)</span>
            </span>
          )}
          {growthTrend === 'stable' && (
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <span>Stable (0%)</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
