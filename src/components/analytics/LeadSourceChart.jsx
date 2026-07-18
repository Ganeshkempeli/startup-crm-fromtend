import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

/**
 * Custom Tooltip for sources.
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
 * LeadSourceChart displays lead acquisition counts grouped by source channels.
 *
 * @component
 */
export const LeadSourceChart = ({ sourceStats = [] }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
      <div className="border-b border-slate-100 dark:border-slate-800/60 pb-3 mb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">
          Lead Sources
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Horizontal Bar Chart */}
        <div className="flex-1 w-full h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={sourceStats}
              margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
            >
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                stroke="var(--color-text-secondary)"
                fontSize={11}
                fontWeight={500}
                tickLine={false}
                axisLine={false}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.03)' }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={14}>
                {sourceStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} style={{ outline: 'none' }} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend detailing channel performance */}
        <div className="w-full sm:w-[150px] flex flex-col gap-2 max-h-[180px] overflow-y-auto pr-1">
          {sourceStats.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-1 rounded-lg">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-350 truncate max-w-[90px]">
                  {item.name}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeadSourceChart;
