import React from 'react';

/**
 * StatusBadge renders a colored pill badge based on lead status.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.status - The lead's status (New, Contacted, Meeting Scheduled, Proposal Sent, Won, Lost)
 */
export const StatusBadge = ({ status }) => {
  // Styles configuration for each CRM lead status
  const statusColors = {
    'New': 'bg-slate-150 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    'Contacted': 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-900/30',
    'Meeting Scheduled': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900/30',
    'Proposal Sent': 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-900/30',
    'Won': 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300 border-green-200 dark:border-green-900/30',
    'Lost': 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300 border-red-200 dark:border-red-900/30'
  };

  return (
    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusColors[status] || statusColors.New}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
