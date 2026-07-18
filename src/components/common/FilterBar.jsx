import React from 'react';

/**
 * FilterBar displays active filter pill controls with live category counts.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.activeFilter - Currently active filter state ('All', 'New', etc.)
 * @param {Function} props.onFilterChange - Callback function triggered when filter changes
 * @param {Array<Object>} props.leads - Master leads array used to calculate segment counts
 */
export const FilterBar = ({ activeFilter, onFilterChange, leads = [] }) => {
  // Configured statuses list
  const filters = ['All', 'New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];

  // Calculates lead counts matching each status filter category
  const getCount = (filter) => {
    if (filter === 'All') return leads.length;
    return leads.filter(l => l.status === filter).length;
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-none whitespace-nowrap -mx-6 px-6 lg:mx-0 lg:px-0">
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        const count = getCount(filter);
        return (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange(filter)}
            className={`px-4 py-2.5 text-xs font-bold rounded-lg border transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-blue-600 border-blue-600 text-white shadow-sm scale-102'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {filter} 
            <span className={`text-[10px] ml-1.5 ${isActive ? 'text-blue-100' : 'text-slate-400 dark:text-slate-550'}`}>
              ({count})
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
