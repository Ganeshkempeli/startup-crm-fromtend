import React from 'react';

/**
 * PipelineOverview displays a horizontal segmented bar representing leads distributed by status.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {Array<Object>} props.leads - Array of CRM lead objects
 */
export const PipelineOverview = ({ leads = [] }) => {
  const totalLeads = leads.length;

  // Configurations for statuses mapping to labels and colors
  const statusConfig = {
    'New': { label: 'New', color: 'bg-slate-400' },
    'Contacted': { label: 'Contacted', color: 'bg-blue-500' },
    'Meeting Scheduled': { label: 'Meeting Scheduled', color: 'bg-indigo-500' },
    'Proposal Sent': { label: 'Proposal Sent', color: 'bg-amber-500' },
    'Won': { label: 'Won', color: 'bg-green-500' },
    'Lost': { label: 'Lost', color: 'bg-red-500' }
  };

  // Group leads count by status key, defaulting to 0 for each status
  const counts = leads.reduce((acc, lead) => {
    const status = lead.status || 'New';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, { 'New': 0, 'Contacted': 0, 'Meeting Scheduled': 0, 'Proposal Sent': 0, 'Won': 0, 'Lost': 0 });

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Pipeline Overview</h3>
      
      {/* Visual Segmented Bar */}
      <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex mb-6">
        {totalLeads === 0 ? (
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-full"></div>
        ) : (
          Object.keys(statusConfig).map((key) => {
            const count = counts[key] || 0;
            if (count === 0) return null;
            const percentage = (count / totalLeads) * 100;
            return (
              <div 
                key={key} 
                className={`${statusConfig[key].color} h-full transition-all duration-300`}
                style={{ width: `${percentage}%` }}
                title={`${statusConfig[key].label}: ${count} leads (${Math.round(percentage)}%)`}
              />
            );
          })
        )}
      </div>

      {/* Grid Legend Display */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {Object.keys(statusConfig).map((key) => {
          const count = counts[key] || 0;
          const percentage = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;
          return (
            <div key={key} className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2.5 h-2.5 rounded-full ${statusConfig[key].color}`}></span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {statusConfig[key].label}
                </span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-slate-50 pl-4.5">
                {count} <span className="text-xs font-normal text-slate-400">({percentage}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineOverview;
