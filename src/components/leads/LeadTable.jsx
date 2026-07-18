import React from 'react';
import { Mail, Phone, Edit3, Trash2, Calendar } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

/**
 * LeadTable component displays list of leads in a table layout.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {Array<Object>} props.leads - List of leads to display
 * @param {Function} props.onEdit - Function called when user clicks Edit
 * @param {Function} props.onDelete - Function called when user clicks Delete
 */
export const LeadTable = ({ leads = [], onEdit, onDelete }) => {
  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Format currency helper
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-900/50">
            <th className="p-4 font-semibold">Name</th>
            <th className="p-4 font-semibold">Company</th>
            <th className="p-4 font-semibold">Status</th>
            <th className="p-4 font-semibold">Email / Phone</th>
            <th className="p-4 font-semibold">Source</th>
            <th className="p-4 font-semibold">Deal Value</th>
            <th className="p-4 font-semibold">Date Added</th>
            <th className="p-4 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {leads.length === 0 ? (
            <tr>
              <td colSpan="8" className="p-8 text-center text-sm text-slate-400 dark:text-slate-500">
                No leads match your filter parameters.
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/10 transition-colors">
                {/* Lead Name & Avatar cell */}
                <td className="p-4 text-sm font-semibold text-slate-900 dark:text-slate-50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 text-xs font-bold flex items-center justify-center">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {lead.name}
                  </div>
                </td>
                
                {/* Company cell */}
                <td className="p-4 text-sm text-slate-700 dark:text-slate-300">{lead.company}</td>
                
                {/* Status Badge cell */}
                <td className="p-4">
                  <StatusBadge status={lead.status} />
                </td>
                
                {/* Contact Email/Phone cell */}
                <td className="p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                      <Mail size={12} className="text-slate-400" />
                      {lead.email}
                    </span>
                    {lead.phone && (
                      <span className="text-xs text-slate-550 dark:text-slate-500 flex items-center gap-1.5">
                        <Phone size={12} className="text-slate-400" />
                        {lead.phone}
                      </span>
                    )}
                  </div>
                </td>
                
                {/* Source tag cell */}
                <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-medium">
                    {lead.source}
                  </span>
                </td>
                
                {/* Deal value cell */}
                <td className="p-4 text-sm font-semibold text-slate-900 dark:text-slate-50">
                  {formatCurrency(lead.value)}
                </td>
                
                {/* Last Contacted date cell */}
                <td className="p-4 text-sm text-slate-400 dark:text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-slate-400" />
                    {formatDate(lead.lastContact)}
                  </div>
                </td>
                
                {/* Row action triggers */}
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(lead)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
                      title="Edit Lead"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(lead.id, lead.name)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-red-500 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 transition-colors"
                      title="Delete Lead"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
