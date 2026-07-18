import React from 'react';

/**
 * RecentLeads displays a clean table of the 5 most recently created/contacted leads.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {Array<Object>} props.leads - Array of lead objects
 */
export const RecentLeads = ({ leads = [] }) => {
  const statusLabels = {
    'New': 'New',
    'Contacted': 'Contacted',
    'Meeting Scheduled': 'Meeting Scheduled',
    'Proposal Sent': 'Proposal Sent',
    'Won': 'Won',
    'Lost': 'Lost'
  };

  // Badge background, border, and text styles
  const badgeColors = {
    'New': 'bg-slate-50 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400 border border-slate-200 dark:border-slate-800',
    'Contacted': 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30',
    'Meeting Scheduled': 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30',
    'Proposal Sent': 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30',
    'Won': 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400 border border-green-100 dark:border-green-900/30',
    'Lost': 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border border-red-100 dark:border-red-900/30'
  };

  // Format date string helper
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Sort and filter to get the last 5 leads
  const lastFiveLeads = [...leads]
    .sort((a, b) => new Date(b.lastContact) - new Date(a.lastContact))
    .slice(0, 5);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Recent Leads</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              <th className="pb-3 font-semibold">Name</th>
              <th className="pb-3 font-semibold">Company</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold text-right">Last Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {lastFiveLeads.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-6 text-center text-sm text-slate-400 dark:text-slate-500">
                  No recent leads found.
                </td>
              </tr>
            ) : (
              lastFiveLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors">
                  <td className="py-3.5 text-sm font-semibold text-slate-950 dark:text-slate-50">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 text-xs font-bold flex items-center justify-center">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      {lead.name}
                    </div>
                  </td>
                  <td className="py-3.5 text-sm text-slate-600 dark:text-slate-400">{lead.company}</td>
                  <td className="py-3.5">
                    <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColors[lead.status] || badgeColors.prospecting}`}>
                      {statusLabels[lead.status]}
                    </span>
                  </td>
                  <td className="py-3.5 text-sm text-slate-400 dark:text-slate-500 text-right">
                    {formatDate(lead.lastContact)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentLeads;
