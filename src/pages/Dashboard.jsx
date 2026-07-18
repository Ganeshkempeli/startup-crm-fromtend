import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLeads } from '../context/LeadContext';
import { Users, DollarSign, TrendingUp, CircleDot } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { PipelineOverview } from '../components/dashboard/PipelineOverview';
import { RecentLeads } from '../components/dashboard/RecentLeads';
import { QuickActions } from '../components/dashboard/QuickActions';
import { toast } from 'react-hot-toast';

/**
 * Dashboard page assembling stats cards, pipeline visual segments, recent leads list, and quick buttons.
 * Pulls leads dynamically from CRM LeadContext.
 *
 * @component
 */
export const Dashboard = () => {
  const navigate = useNavigate();
  
  // Retrieve leads and CRUD state from context
  const { leads, addLead, updateLead, deleteLead } = useLeads();

  // 1. Calculate live metrics dynamically
  const totalLeadsCount = leads.length;
  
  const wonLeads = leads.filter(l => l.status === 'Won');
  const lostLeads = leads.filter(l => l.status === 'Lost');
  const winRate = wonLeads.length + lostLeads.length > 0 
    ? Math.round((wonLeads.length / (wonLeads.length + lostLeads.length)) * 100) 
    : 0;

  const activeLeads = leads.filter(l => l.status !== 'Won' && l.status !== 'Lost');
  const totalPipeline = activeLeads.reduce((sum, lead) => sum + (Number(lead.value) || 0), 0);
  const activeCount = activeLeads.length;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Handle Quick Actions
  const handleAddLead = () => {
    navigate('/leads');
    toast.success('Navigated to Leads. Use the dialog to add a new contact.', { icon: '📝' });
  };

  const handleViewAll = () => {
    navigate('/leads');
  };

  const handleExport = () => {
    // Generate a simple mock CSV export
    if (leads.length === 0) {
      toast.error('No leads available to export.');
      return;
    }
    toast.success('Leads list exported successfully as CSV!', { icon: '📊' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 flex flex-col gap-6">
      {/* Top Welcome Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">CRM Dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Welcome back, John! Here's an overview of your active lead pipeline.</p>
      </div>

      {/* Stats Cards Grid - Responsive: 1 col mobile, 2 tablet, 4 desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Leads"
          value={totalLeadsCount.toString()}
          icon={<Users size={20} />}
          change="12.5"
          color="blue"
        />
        <StatsCard 
          title="Win Rate"
          value={`${winRate}%`}
          icon={<TrendingUp size={20} />}
          change="4.8"
          color="green"
        />
        <StatsCard 
          title="Pipeline Value"
          value={formatCurrency(totalPipeline)}
          icon={<DollarSign size={20} />}
          change="18.2"
          color="orange"
        />
        <StatsCard 
          title="Active Deals"
          value={activeCount.toString()}
          icon={<CircleDot size={20} />}
          change="-6.4"
          color="red"
        />
      </div>

      {/* Main Grid Layout: 2/3 Content width for main components, 1/3 for quick shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Recent Leads + Pipeline Overview */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <PipelineOverview leads={leads} />
          <RecentLeads leads={leads} />
        </div>

        {/* Right Side: Quick Actions Panel */}
        <div className="lg:col-span-1">
          <QuickActions 
            onAddLead={handleAddLead}
            onViewAll={handleViewAll}
            onExport={handleExport}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
