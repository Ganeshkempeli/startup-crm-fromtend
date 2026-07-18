import React from 'react';
import { Users, SearchX, Plus } from 'lucide-react';
import { Button } from '../atoms/Button';

/**
 * EmptyState component displays descriptive feedback when the leads list is empty.
 * Differentiates between zero total leads vs zero search results.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {number} props.totalLeadsCount - Total count of leads in database
 * @param {Function} props.onClearFilters - Callback to reset search/filters states
 * @param {Function} props.onAddLead - Callback to trigger create modal
 */
export const EmptyState = ({ totalLeadsCount, onClearFilters, onAddLead }) => {
  const isDatabaseEmpty = totalLeadsCount === 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-12 text-center shadow-sm max-w-md mx-auto my-6 flex flex-col items-center justify-center">
      {isDatabaseEmpty ? (
        <>
          {/* Renders when the CRM database is completely empty */}
          <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
            <Users size={24} />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-1">Your CRM is Empty</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            Get started by adding your first lead to track deals, log actions, and view pipelines.
          </p>
          <Button variant="primary" icon={<Plus size={16} />} onClick={onAddLead}>
            Add Your First Lead
          </Button>
        </>
      ) : (
        <>
          {/* Renders when search or status filters produce 0 results */}
          <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
            <SearchX size={24} />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-1">No Matching Leads</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            We couldn't find any matches. Try typing a different search query or clear the status filters.
          </p>
          <Button variant="secondary" onClick={onClearFilters}>
            Clear Active Filters
          </Button>
        </>
      )}
    </div>
  );
};

export default EmptyState;
