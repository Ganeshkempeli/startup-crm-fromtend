import React, { useState } from 'react';
import { useLeads } from '../context/LeadContext';
import { PageHeader, PageSection } from '../components/templates/Layout';
import { Button } from '../components/atoms/Button';
import { LeadTable } from '../components/leads/LeadTable';
import { LeadCard } from '../components/leads/LeadCard';
import { LeadForm } from '../components/leads/LeadForm';
import { SearchBar } from '../components/common/SearchBar';
import { FilterBar } from '../components/common/FilterBar';
import { EmptyState } from '../components/common/EmptyState';
import { toast } from 'react-hot-toast';
import { 
  Plus, 
  LayoutGrid, 
  List, 
  X
} from 'lucide-react';

/**
 * Leads page orchestrates lead CRM data.
 * Manages search, filter parameters, layout view modes (table vs. grid cards),
 * and handles new/edit modal triggers.
 *
 * @component
 */
export const Leads = () => {
  const { leads, addLead, updateLead, deleteLead } = useLeads();
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Layout view mode state (table vs. cards grid)
  const [viewMode, setViewMode] = useState('table');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null); // Null for Add, Lead Object for Edit

  // Derived filtered leads list based on status and search query match
  const filteredLeads = leads
    .filter(lead => activeFilter === 'All' || lead.status === activeFilter)
    .filter(lead =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleOpenAdd = () => {
    setSelectedLead(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedLead(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete lead "${name}"?`)) {
      deleteLead(id);
      // Red toast for deletion actions
      toast.error(`Deleted lead "${name}"`, {
        icon: '🗑️',
        style: {
          border: '1px solid var(--color-danger)',
          color: 'var(--color-danger-dark)'
        }
      });
    }
  };

  const handleFormSubmit = (data) => {
    if (selectedLead) {
      updateLead(selectedLead.id, data);
      // Green/success toast for updates
      toast.success(`Updated lead "${data.name}"`, {
        style: {
          border: '1px solid var(--color-success)',
          color: 'var(--color-success-dark)'
        }
      });
    } else {
      addLead(data);
      // Green/success toast for creations
      toast.success(`Created lead "${data.name}"`, {
        style: {
          border: '1px solid var(--color-success)',
          color: 'var(--color-success-dark)'
        }
      });
    }
    handleCloseModal();
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveFilter('All');
  };

  return (
    <div className="leads-page min-h-screen bg-slate-50 dark:bg-slate-950 p-6 flex flex-col gap-6">
      <PageHeader 
        title="Lead Management"
        subtitle={`Track and nurture your sales opportunities (${filteredLeads.length} leads)`}
        actions={
          <Button variant="primary" icon={<Plus size={16} />} onClick={handleOpenAdd}>
            Add Lead
          </Button>
        }
      />

      {/* Filter toolbar containing Search and Layout Switch */}
      <PageSection spacing="default">
        <div className="flex flex-col gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 w-full">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* View switcher (Desktop only) */}
            <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-850 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md transition-all cursor-pointer ${viewMode === 'table' ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm' : 'text-slate-400 hover:text-slate-650'}`}
                title="Table Layout"
              >
                <List size={16} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-md transition-all cursor-pointer ${viewMode === 'cards' ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-sm' : 'text-slate-400 hover:text-slate-650'}`}
                title="Cards Layout"
              >
                <LayoutGrid size={16} />
              </button>
            </div>
          </div>

          {/* Interactive filter category row */}
          <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} leads={leads} />
        </div>
      </PageSection>

      {/* Main views rendering section */}
      <PageSection spacing="large">
        {filteredLeads.length === 0 ? (
          <EmptyState 
            totalLeadsCount={leads.length} 
            onClearFilters={handleClearFilters} 
            onAddLead={handleOpenAdd} 
          />
        ) : (
          <>
            {/* Desktop views layout switch */}
            <div className="hidden md:block">
              {viewMode === 'table' ? (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
                  <LeadTable leads={filteredLeads} onEdit={handleOpenEdit} onDelete={handleDelete} />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
                  {filteredLeads.map(lead => (
                    <LeadCard key={lead.id} lead={lead} onEdit={handleOpenEdit} onDelete={handleDelete} />
                  ))}
                </div>
              )}
            </div>

            {/* Mobile View: Cards list stacks by default */}
            <div className="block md:hidden grid grid-cols-1 gap-4 animate-fade-in">
              {filteredLeads.map(lead => (
                <LeadCard key={lead.id} lead={lead} onEdit={handleOpenEdit} onDelete={handleDelete} />
              ))}
            </div>
          </>
        )}
      </PageSection>

      {/* Centered Modal Overlay for Form Editor */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl max-w-lg w-full p-6 shadow-xl animate-scale-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
                {selectedLead ? 'Edit Lead' : 'Add New Lead'}
              </h3>
              <button 
                type="button"
                onClick={handleCloseModal} 
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-850 text-slate-400 hover:text-slate-650 transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
            <LeadForm 
              initialData={selectedLead}
              onSubmit={handleFormSubmit}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
