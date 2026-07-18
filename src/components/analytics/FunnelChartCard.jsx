import React from 'react';
import { FunnelChart, Funnel, Cell, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { STATUS_COLORS } from '../../constants/analyticsColors';

/**
 * FunnelChartCard displays sales pipeline conversion funnel stages.
 *
 * @component
 */
export const FunnelChartCard = ({ funnelData = [] }) => {
  // Map stage name to appropriate color
  const getStageColor = (stage) => {
    return STATUS_COLORS[stage] || '#3B82F6';
  };

  const chartData = funnelData.map((item) => ({
    name: item.name,
    value: item.count,
    fill: getStageColor(item.name),
  }));

  // Calculate drop-off from previous stage helper
  const getDropOff = (idx) => {
    if (idx === 0) return 0;
    const prev = funnelData[idx - 1].count;
    const curr = funnelData[idx].count;
    if (prev === 0) return 0;
    return Math.round(((prev - curr) / prev) * 100);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
      <div className="border-b border-slate-100 dark:border-slate-800/60 pb-3 mb-4 flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-50">
          Sales Funnel Conversion
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Recharts Funnel Chart */}
        <div className="w-[180px] h-[180px] flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-text-primary)',
                  fontSize: '12px'
                }}
                formatter={(val, name) => [`${val} Leads`, name]}
              />
              <Funnel
                dataKey="value"
                data={chartData}
                isAnimationActive
              >
                <LabelList position="right" dataKey="name" fill="currentColor" className="text-slate-500 dark:text-slate-400 text-[10px] font-bold" />
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} style={{ opacity: 0.9, outline: 'none' }} />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>

        {/* Funnel Details Table */}
        <div className="flex-1 w-full flex flex-col gap-2">
          {funnelData.map((stage, idx) => {
            const dropOff = getDropOff(idx);
            return (
              <div key={idx} className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: getStageColor(stage.name) }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-350 truncate">
                      {stage.name}
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-50">
                      {stage.count}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    <span>Conv: {stage.conversion}%</span>
                    {idx > 0 && <span className="text-red-500 dark:text-red-400">-{dropOff}% drop-off</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FunnelChartCard;
