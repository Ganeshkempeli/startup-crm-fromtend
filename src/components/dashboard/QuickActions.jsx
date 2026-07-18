import React from 'react';
import { UserPlus, Eye, Download } from 'lucide-react';

/**
 * QuickActions displays a panel of primary shortcut triggers for common lead operations.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {Function} props.onAddLead - Callback function triggered when "Add New Lead" is clicked
 * @param {Function} props.onViewAll - Callback function triggered when "View All Leads" is clicked
 * @param {Function} props.onExport - Callback function triggered when "Export Data" is clicked
 */
export const QuickActions = ({ onAddLead, onViewAll, onExport }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">Quick Actions</h3>
      
      <div className="flex flex-col gap-3">
        {/* Trigger to open the add new lead dialog/drawer */}
        <button
          type="button"
          onClick={onAddLead}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm rounded-lg transition-all shadow-sm"
        >
          <UserPlus size={16} />
          Add New Lead
        </button>

        {/* Shortcut to view the full lead table page */}
        <button
          type="button"
          onClick={onViewAll}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-800/80 active:scale-[0.98] text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-lg border border-slate-200 dark:border-slate-700 transition-all"
        >
          <Eye size={16} />
          View All Leads
        </button>

        {/* Callback action trigger to export all active leads data */}
        <button
          type="button"
          onClick={onExport}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-800/80 active:scale-[0.98] text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-lg border border-slate-200 dark:border-slate-700 transition-all"
        >
          <Download size={16} />
          Export Leads (CSV)
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
