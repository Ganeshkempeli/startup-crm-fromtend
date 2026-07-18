import React from 'react';
import { Users, Percent, TrendingUp, Award, Clock, ArrowDownRight, ArrowUpRight } from 'lucide-react';

/**
 * Helper to format currency in Indian Rupees format (₹ lakh/crore).
 * @param {number} val - Numeric value
 * @returns {string} Formatted Indian Rupee string
 */
const formatIndianRupee = (val) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val || 0);
};

/**
 * StatsCards renders 6 distinct high-priority KPI cards for sales summaries.
 *
 * @component
 */
export const StatsCards = ({ metrics }) => {
  const {
    totalLeads = 0,
    pipelineValue = 0,
    wonRevenue = 0,
    avgSalesCycle = 0,
    lostRate = 0,
    conversionRate = 0,
  } = metrics;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 transition-all duration-200">
      {/* KPI 1: Total Leads */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Total Leads
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Users size={16} />
            </div>
          </div>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {totalLeads}
          </h4>
        </div>
        <div className="flex items-center gap-1 mt-3 text-xs text-green-600 dark:text-green-400 font-semibold">
          <ArrowUpRight size={14} />
          <span>+12.4% vs last period</span>
        </div>
      </div>

      {/* KPI 2: Conversion Rate */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Conversion Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-950/40 text-green-650 dark:text-green-450 flex items-center justify-center">
              <Percent size={16} />
            </div>
          </div>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {conversionRate}%
          </h4>
        </div>
        <div className="flex items-center gap-1 mt-3 text-xs text-green-600 dark:text-green-400 font-semibold">
          <ArrowUpRight size={14} />
          <span>+3.2% vs last period</span>
        </div>
      </div>

      {/* KPI 3: Pipeline Value */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Pipeline Value
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-50 truncate" title={formatIndianRupee(pipelineValue)}>
            {formatIndianRupee(pipelineValue)}
          </h4>
        </div>
        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-3">
          Sum of active lead values
        </div>
      </div>

      {/* KPI 4: Won Revenue */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Won Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Award size={16} />
            </div>
          </div>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-50 truncate" title={formatIndianRupee(wonRevenue)}>
            {formatIndianRupee(wonRevenue)}
          </h4>
        </div>
        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-3">
          Sum of closed won values
        </div>
      </div>

      {/* KPI 5: Avg Sales Cycle */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Avg Sales Cycle
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-400 flex items-center justify-center">
              <Clock size={16} />
            </div>
          </div>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {avgSalesCycle} {avgSalesCycle === 1 ? 'Day' : 'Days'}
          </h4>
        </div>
        <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-3">
          Won date minus creation date
        </div>
      </div>

      {/* KPI 6: Lost Rate */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Lost Rate
            </span>
            <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-950/40 text-red-650 dark:text-red-450 flex items-center justify-center">
              <ArrowDownRight size={16} className="text-red-500" />
            </div>
          </div>
          <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {lostRate}%
          </h4>
        </div>
        <div className="flex items-center gap-1 mt-3 text-xs text-red-600 dark:text-red-400 font-semibold">
          <ArrowDownRight size={14} />
          <span>Lost vs total closed leads</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
