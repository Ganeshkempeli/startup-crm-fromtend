import React from 'react';
import { Mail, Phone, Edit3, Trash2 } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

/**
 * LeadCard displays details of a single lead in card format.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {Object} props.lead - The lead data object
 * @param {Function} props.onEdit - Callback function called when the edit button is clicked
 * @param {Function} props.onDelete - Callback function called when the delete button is clicked
 */
export const LeadCard = ({ lead, onEdit, onDelete }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
      <div>
        {/* Card Header: name, company, and status badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-50">{lead.name}</h4>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{lead.company}</span>
          </div>
          <StatusBadge status={lead.status} />
        </div>
        
        {/* Contact details */}
        <div className="flex flex-col gap-2.5 my-4 border-t border-slate-100 dark:border-slate-800/50 pt-3.5">
          {lead.email && (
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Mail size={14} className="text-slate-400" />
              <span className="truncate">{lead.email}</span>
            </div>
          )}
          {lead.phone && (
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Phone size={14} className="text-slate-400" />
              <span>{lead.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Edit and Delete operations buttons */}
      <div className="flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800/50 pt-3 mt-2">
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
    </div>
  );
};

export default LeadCard;
