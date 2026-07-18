import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

/**
 * Custom Tooltip for monthly counts.
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg shadow-md text-xs font-semibold">
        <p className="text-slate-900 dark:text-slate-100 font-bold mb-0.5">{data.name}</p>
        <p className="text-blue-600 dark:text-blue-400">{data.value} {data.value === 1 ? 'Lead' : 'Leads'}</p>
      </div>
    );
  }
  return null;
};

/**
 * BarChartCard displays the volume of leads created per month.
 *
 * @component
 */
export const BarChartCard = ({ monthlyLeads = [] }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
      <div className="border-b border-slate-100 dark:border-slate-800/60 pb-3 mb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">
          Monthly Lead Volume
        </h3>
      </div>

      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyLeads} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }} />
            <Bar
              dataKey="value"
              fill="#2563EB"
              radius={[4, 4, 0, 0]}
              maxBarSize={32}
              isAnimationActive
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartCard;
