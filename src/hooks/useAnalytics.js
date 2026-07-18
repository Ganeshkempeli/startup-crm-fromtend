import { useMemo, useState } from 'react';
import { useLeads } from '../context/LeadContext';
import * as helpers from '../utils/analyticsHelpers';

/**
 * Custom hook for memoized filtering and calculations of lead analytics.
 * Supports standard timeframes and custom date ranges.
 *
 * @returns {Object} Filter states, setter functions, filtered leads and memoized analytics metrics
 */
export const useAnalytics = () => {
  const { leads = [] } = useLeads();
  const [timeframe, setTimeframe] = useState('30days'); // '7days' | '30days' | '90days' | 'thisYear' | 'custom'
  const [customRange, setCustomRange] = useState({
    startDate: '',
    endDate: '',
  });

  // 1. Filter Leads by Timeframe
  const filteredLeads = useMemo(() => {
    if (!Array.isArray(leads) || leads.length === 0) return [];
    
    const now = new Date();
    const parseLeadDate = (lead) => new Date(lead.createdAt);

    return leads.filter((lead) => {
      if (!lead || !lead.createdAt) return false;
      const date = parseLeadDate(lead);

      if (timeframe === '7days') {
        const diff = now.getTime() - date.getTime();
        return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000;
      }
      if (timeframe === '30days') {
        const diff = now.getTime() - date.getTime();
        return diff >= 0 && diff <= 30 * 24 * 60 * 60 * 1000;
      }
      if (timeframe === '90days') {
        const diff = now.getTime() - date.getTime();
        return diff >= 0 && diff <= 90 * 24 * 60 * 60 * 1000;
      }
      if (timeframe === 'thisYear') {
        return date.getFullYear() === now.getFullYear();
      }
      if (timeframe === 'custom') {
        const start = customRange.startDate ? new Date(customRange.startDate) : null;
        const end = customRange.endDate ? new Date(customRange.endDate) : null;
        
        if (start) start.setHours(0, 0, 0, 0);
        if (end) end.setHours(23, 59, 59, 999);
        
        if (start && end) {
          return date >= start && date <= end;
        }
        if (start) {
          return date >= start;
        }
        if (end) {
          return date <= end;
        }
      }
      return true; // default
    });
  }, [leads, timeframe, customRange]);

  // 2. Memoized analytics calculations
  const metrics = useMemo(() => {
    const totalLeads = filteredLeads.length;
    const pipelineValue = helpers.getPipelineValue(filteredLeads);
    const wonRevenue = helpers.getWonRevenue(filteredLeads);
    const avgSalesCycle = helpers.getAverageSalesCycle(filteredLeads);
    const lostRate = helpers.getLostRate(filteredLeads);
    
    // Win Rate Calculation: Won / (Won + Lost)
    const wonCount = filteredLeads.filter((l) => l.status === 'Won').length;
    const lostCount = filteredLeads.filter((l) => l.status === 'Lost').length;
    const totalClosed = wonCount + lostCount;
    const winRate = totalClosed > 0 ? Math.round((wonCount / totalClosed) * 100) : 0;

    // Conversion Rate: Won / Total Leads
    const conversionRate = totalLeads > 0 ? Math.round((wonCount / totalLeads) * 100) : 0;

    const statusDistribution = helpers.getStatusDistribution(filteredLeads);
    const monthlyLeads = helpers.getMonthlyLeads(filteredLeads);
    const conversionTrend = helpers.getConversionByMonth(filteredLeads);
    const revenueTrend = helpers.getRevenueByMonth(filteredLeads);
    const sourceStats = helpers.getLeadSourceStats(filteredLeads);
    const funnelData = helpers.getFunnelData(filteredLeads);
    const salesVelocity = helpers.getSalesVelocity(filteredLeads);
    const forecast = helpers.getForecastRevenue(filteredLeads);
    const topPerformers = helpers.getTopPerformers(filteredLeads);
    const heatmapData = helpers.getActivityHeatmapData(filteredLeads);

    return {
      totalLeads,
      pipelineValue,
      wonRevenue,
      avgSalesCycle,
      lostRate,
      winRate,
      conversionRate,
      statusDistribution,
      monthlyLeads,
      conversionTrend,
      revenueTrend,
      sourceStats,
      funnelData,
      salesVelocity,
      forecast,
      topPerformers,
      heatmapData,
    };
  }, [filteredLeads]);

  return {
    timeframe,
    setTimeframe,
    customRange,
    setCustomRange,
    filteredLeads,
    metrics,
  };
};

export default useAnalytics;
