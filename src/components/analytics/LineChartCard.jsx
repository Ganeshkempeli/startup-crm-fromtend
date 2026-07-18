import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

/**
 * Custom Tooltip for conversion percentages.
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg shadow-md text-xs font-semibold">
        <p className="text-slate-900 dark:text-slate-100 font-bold mb-0.5">{data.name}</p>
        <p className="text-green-600 dark:text-green-450">Win Rate: {data.value}%</p>
      </div>
    );
  }
  return null;
};

/**
 * LineChartCard displays the win conversion rate trend as a line chart.
 *
 * @component
 */
export const LineChartCard = ({ conversionTrend = [] }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
      <div className="border-b border-slate-100 dark:border-slate-800/60 pb-3 mb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">
          Monthly Conversion Trend
        </h3>
      </div>

      <div className="w-full h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={conversionTrend} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
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
              domain={[0, 100]}
              tickFormatter={(val) => `${val}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#22C55E"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#22C55E' }}
              isAnimationActive
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartCard;
