import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Plus } from 'lucide-react';

/**
 * EmptyAnalyticsState displays when no lead data exists to generate insights.
 *
 * @component
 */
export const EmptyAnalyticsState = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[450px] p-8 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm max-w-lg mx-auto mt-12 animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6">
        <BarChart3 size={32} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">
        No analytics available yet
      </h3>
      <p className="text-sm text-slate-655 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
        Add your first lead to start tracking business performance, pipeline conversions, and team velocity.
      </p>
      <button
        type="button"
        onClick={() => navigate('/leads')}
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-650 dark:hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow active:scale-[0.98] transition-all flex items-center gap-2"
      >
        <Plus size={16} />
        <span>Add Lead</span>
      </button>
    </div>
  );
};

export default EmptyAnalyticsState;
