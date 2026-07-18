import React from 'react';
import { Award, Trophy, User } from 'lucide-react';

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
 * TopPerformersCard shows rankings of sales agents based on total won deal values.
 *
 * @component
 */
export const TopPerformersCard = ({ topPerformers = [] }) => {
  const maxRevenue = topPerformers[0]?.value || 1;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
      <div>
        <div className="border-b border-slate-100 dark:border-slate-800/60 pb-3 mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
            <Trophy size={16} className="text-yellow-500 fill-yellow-500/10" />
            <span>Top Performers</span>
          </h3>
          <span className="text-[10px] bg-yellow-50 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-450 font-bold px-2 py-0.5 rounded flex items-center gap-1">
            <Award size={10} />
            <span>Leaderboard</span>
          </span>
        </div>

        {/* Performer list */}
        <div className="flex flex-col gap-4 mt-3">
          {topPerformers.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-400 dark:text-slate-500">
              No performers ranked yet. Add Won leads.
            </div>
          ) : (
            topPerformers.map((rep, idx) => {
              const rank = idx + 1;
              const percentageOfMax = Math.round((rep.value / maxRevenue) * 100);
              
              // Resolve ranking colors
              const getRankIconColor = (r) => {
                if (r === 1) return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950/40';
                if (r === 2) return 'text-slate-400 bg-slate-50 dark:bg-slate-900/60';
                if (r === 3) return 'text-amber-600 bg-amber-50 dark:bg-amber-950/30';
                return 'text-slate-500 bg-slate-50 dark:bg-slate-850';
              };

              return (
                <div key={idx} className="flex items-center gap-3">
                  {/* Rank Badge */}
                  <div className={`w-8 h-8 rounded-full font-bold text-sm flex items-center justify-center flex-shrink-0 ${getRankIconColor(rank)}`}>
                    {rank}
                  </div>

                  {/* Avatar / Detail info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-50 truncate flex items-center gap-1">
                        <User size={12} className="text-slate-450" />
                        {rep.name}
                      </span>
                      <span className="text-xs font-black text-slate-900 dark:text-slate-100">
                        {formatIndianRupee(rep.value)}
                      </span>
                    </div>
                    
                    {/* Visual relative ratio bar */}
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentageOfMax}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium italic mt-5 text-center">
        Rankings calculated from won deals closed in this timeframe
      </div>
    </div>
  );
};

export default TopPerformersCard;
