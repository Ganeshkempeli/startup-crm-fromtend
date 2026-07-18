import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

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
 * Format currency to short abbreviations (e.g. ₹1.2L, ₹50k).
 */
const formatShortRupee = (val) => {
  if (val === 0) return '₹0';
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
  return `₹${val}`;
};

/**
 * Custom Tooltip for monthly revenue.
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg shadow-md text-xs font-semibold">
        <p className="text-slate-900 dark:text-slate-100 font-bold mb-0.5">{data.name} Revenue</p>
        <p className="text-green-600 dark:text-green-450">{formatIndianRupee(data.value)}</p>
      </div>
    );
  }
  return null;
};

/**
 * RevenueChartCard displays monthly closed won deal value using an area chart.
 *
 * @component
 */
export const RevenueChartCard = ({ revenueTrend = [] }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
      <div className="border-b border-slate-100 dark:border-slate-800/60 pb-3 mb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">
          Revenue Growth Trend
        </h3>
      </div>

      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueTrend} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenueWon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.6} />
            <XAxis
              dataKey="name"
              stroke="var(--color-text-secondary)"
              fontSize={11}
              fontWeight={500}
              tickLine={false}
              axisLine={false}
              dy={8}
            />
            <YAxis
              stroke="var(--color-text-secondary)"
              fontSize={11}
              fontWeight={500}
              tickLine={false}
              axisLine={false}
              dx={-8}
              tickFormatter={formatShortRupee}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#22C55E"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenueWon)"
              isAnimationActive
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChartCard;
