import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

/**
 * SearchBar renders a debounced text input search field.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {string} props.value - External search query state value
 * @param {Function} props.onChange - Trigger callback fired after debounce delay
 */
export const SearchBar = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(value);

  // Sync local state if external value changes (e.g. cleared externally)
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce logic: calls onChange only after user stops typing for 300ms
  useEffect(() => {
    const handler = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [localValue, onChange, value]);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="relative flex items-center w-full">
      <Search size={16} className="absolute left-3 text-slate-400 pointer-events-none" />
      <input
        type="text"
        aria-label="Search leads"
        placeholder="Search by name, company, or email..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="w-full pl-9 pr-10 py-2.5 text-sm border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950/30 focus:border-blue-500 transition-all"
      />
      {localValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 p-1 rounded-full text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
