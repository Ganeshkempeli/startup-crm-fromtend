import React from 'react';
import { Zap, HelpCircle, ArrowUpRight } from 'lucide-react';

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
 * SalesVelocityCard visualizes the velocity equation to show speed of conversion.
 *
 * @component
 */
export const SalesVelocityCard = ({ salesVelocity = 0, metrics }) => {
  const {
    totalLeads = 0,
    winRate = 0,
    wonRevenue = 0,
    avgSalesCycle = 15,
  } = metrics;

  // Derive opportunities count (active deals) and avg deal size
  const activeOpportunities = totalLeads - metrics.lostRate * 0.01 * totalLeads; 
  const wonCount = Math.round(totalLeads * (winRate / 100)) || 1;
  const avgDealSize = wonCount > 0 ? Math.round(wonRevenue / wonCount) : 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
      <div>
        <div className="border-b border-slate-100 dark:border-slate-800/60 pb-3 mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
            <Zap size={16} className="text-amber-500 fill-amber-500/20" />
            <span>Sales Velocity</span>
          </h3>
          <div className="group relative cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-350">
            <HelpCircle size={14} />
            <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-52 p-3 bg-slate-950 text-slate-100 text-[10px] rounded-lg shadow-lg leading-relaxed z-10">
              Formula: (Opportunities &times; Win Rate &times; Avg Deal Size) &divide; Sales Cycle Length. Indicates the speed at which revenue is generated per day.
            </div>
          </div>
        </div>

        <div className="my-3">
          <span className="text-3xl font-black text-slate-900 dark:text-slate-50 block leading-tight">
            {formatIndianRupee(salesVelocity)}/day
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold block mt-1">
            Revenue generation speed
          </span>
        </div>

        {/* Dynamic Parameter breakdown */}
        <div className="grid grid-cols-2 gap-3.5 mt-5 border-t border-slate-100 dark:border-slate-800/60 pt-4 text-left">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              Active Deals
            </span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {Math.round(activeOpportunities)} Opps
            </span>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              Win Rate
            </span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {winRate}%
            </span>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              Avg Deal Size
            </span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate block max-w-[120px]">
              {formatIndianRupee(avgDealSize)}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              Sales Cycle
            </span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {avgSalesCycle} Days
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-450 font-semibold mt-4">
        <ArrowUpRight size={14} />
        <span>+8.4% velocity improvement vs last month</span>
      </div>
    </div>
  );
};

export default SalesVelocityCard;
