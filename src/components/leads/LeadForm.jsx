import React, { useState } from 'react';

/**
 * LeadForm component renders the form for creating or editing leads.
 * It includes field validations and required indicators.
 *
 * @component
 * @param {Object} props - Component properties
 * @param {Object} [props.initialData] - Optional prefilled details for edit mode
 * @param {Function} props.onSubmit - Function called on form submit, receives form state
 * @param {Function} props.onCancel - Function called when user cancels or dismisses form
 */
export const LeadForm = ({ initialData, onSubmit, onCancel }) => {
  const isEditMode = !!initialData;
  
  // Initialize state with default fields or passed lead fields
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    company: initialData?.company || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    status: initialData?.status || 'New',
    source: initialData?.source || 'Website',
    value: initialData?.value || ''
  });

  const [errors, setErrors] = useState({});

  // Form validator checking required text values
  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    if (!formData.company.trim()) tempErrors.company = 'Company name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email format is invalid';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const statusOptions = ['New', 'Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won', 'Lost'];
  const sourceOptions = ['Website', 'Referral', 'LinkedIn', 'Cold Call', 'Email Campaign', 'Other'];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      {/* Name input section */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="form-name" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="form-name"
          type="text"
          placeholder="e.g. Sarah Jenkins"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 ${
            errors.name 
              ? 'border-red-500 focus:ring-red-100 dark:focus:ring-red-950/30' 
              : 'border-slate-200 dark:border-slate-800 focus:ring-blue-100 dark:focus:ring-blue-950/30 focus:border-blue-500'
          }`}
        />
        {errors.name && <span className="text-xs text-red-500 mt-0.5">{errors.name}</span>}
      </div>

      {/* Company input section */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="form-company" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Company <span className="text-red-500">*</span>
        </label>
        <input
          id="form-company"
          type="text"
          placeholder="e.g. CloudScale Inc"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 ${
            errors.company 
              ? 'border-red-500 focus:ring-red-100 dark:focus:ring-red-950/30' 
              : 'border-slate-200 dark:border-slate-800 focus:ring-blue-100 dark:focus:ring-blue-950/30 focus:border-blue-500'
          }`}
        />
        {errors.company && <span className="text-xs text-red-500 mt-0.5">{errors.company}</span>}
      </div>

      {/* Email input section */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="form-email" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          id="form-email"
          type="email"
          placeholder="e.g. sarah@cloudscale.io"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 ${
            errors.email 
              ? 'border-red-500 focus:ring-red-100 dark:focus:ring-red-950/30' 
              : 'border-slate-200 dark:border-slate-800 focus:ring-blue-100 dark:focus:ring-blue-950/30 focus:border-blue-500'
          }`}
        />
        {errors.email && <span className="text-xs text-red-500 mt-0.5">{errors.email}</span>}
      </div>

      {/* Phone input section */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="form-phone" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Phone Number
        </label>
        <input
          id="form-phone"
          type="text"
          placeholder="e.g. +1 (555) 019-2834"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950/30 focus:border-blue-500"
        />
      </div>

      {/* Status & Source dropdown sections */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="form-status" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Status
          </label>
          <select
            id="form-status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950/30 focus:border-blue-500"
          >
            {statusOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="form-source" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Source
          </label>
          <select
            id="form-source"
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950/30 focus:border-blue-500"
          >
            {sourceOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Value input section */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="form-value" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Deal Value ($)
        </label>
        <input
          id="form-value"
          type="number"
          placeholder="e.g. 25000"
          value={formData.value}
          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
          className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950/30 focus:border-blue-500"
        />
      </div>

      {/* Form Action Buttons */}
      <div className="flex justify-end gap-3 mt-4 border-t border-slate-100 dark:border-slate-800 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 active:scale-[0.98] transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm active:scale-[0.98] transition-all"
        >
          {isEditMode ? 'Save Changes' : 'Create Lead'}
        </button>
      </div>
    </form>
  );
};

export default LeadForm;
