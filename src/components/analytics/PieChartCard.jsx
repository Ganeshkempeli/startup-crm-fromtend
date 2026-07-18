import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';

/**
 * Custom active shape renderer for hover segment expansion.
 */
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius - 2}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

/**
 * Custom Tooltip for status segments.
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 rounded-lg shadow-md text-xs font-medium">
        <p className="text-slate-900 dark:text-slate-100 font-bold mb-0.5">{data.displayName || data.name}</p>
        <p className="text-blue-600 dark:text-blue-400">{data.value} {data.value === 1 ? 'Lead' : 'Leads'}</p>
        <p className="text-slate-400 dark:text-slate-500">{data.percentage}% of pipeline</p>
      </div>
    );
  }
  return null;
};

/**
 * PieChartCard displays status distribution as a doughnut chart.
 *
 * @component
 */
export const PieChartCard = ({ statusDistribution = [], totalLeads = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
      <div className="border-b border-slate-100 dark:border-slate-800/60 pb-3 mb-4 flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">
          Lead Status Distribution
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
        {/* Doughnut Chart container */}
        <div className="relative w-[180px] h-[180px] flex items-center justify-center flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={statusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={76}
                paddingAngle={3}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} style={{ outline: 'none' }} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Centered Total Label */}
          <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none select-none">
            <span className="text-3xl font-black text-slate-900 dark:text-slate-50 leading-tight">
              {totalLeads}
            </span>
            <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">
              Total Leads
            </span>
          </div>
        </div>

        {/* Legend listing */}
        <div className="flex-1 w-full flex flex-col gap-2 max-h-[180px] overflow-y-auto pr-1">
          {statusDistribution.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(-1)}
              className={`flex items-center justify-between p-1.5 rounded-lg transition-colors cursor-pointer ${
                activeIndex === index ? 'bg-slate-50 dark:bg-slate-850' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-350 truncate max-w-[110px]">
                  {item.displayName || item.name}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-slate-100">
                <span>{item.value}</span>
                <span className="text-slate-400 dark:text-slate-500 font-normal">
                  ({item.percentage}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieChartCard;
