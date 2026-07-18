import React from 'react';
import { useLeads } from '../context/LeadContext';
import { useAnalytics } from '../hooks/useAnalytics';
import { PageHeader, PageSection } from '../components/templates/Layout';
import { AnalyticsFilters } from '../components/analytics/AnalyticsFilters';
import { StatsCards } from '../components/analytics/StatsCards';
import { PieChartCard } from '../components/analytics/PieChartCard';
import { FunnelChartCard } from '../components/analytics/FunnelChartCard';
import { BarChartCard } from '../components/analytics/BarChartCard';
import { LineChartCard } from '../components/analytics/LineChartCard';
import { RevenueChartCard } from '../components/analytics/RevenueChartCard';
import { LeadSourceChart } from '../components/analytics/LeadSourceChart';
import { ActivityHeatmap } from '../components/analytics/ActivityHeatmap';
import { TopPerformersCard } from '../components/analytics/TopPerformersCard';
import { ForecastCard } from '../components/analytics/ForecastCard';
import { SalesVelocityCard } from '../components/analytics/SalesVelocityCard';
import { EmptyAnalyticsState } from '../components/analytics/EmptyAnalyticsState';
import './Analytics.css';

/**
 * Analytics page component assembles the CRM reports panel metrics and graphs.
 * Handles empty contexts and filters.
 *
 * @component
 */
export const Analytics = () => {
  const { leads = [] } = useLeads();
  const {
    timeframe,
    setTimeframe,
    customRange,
    setCustomRange,
    filteredLeads,
    metrics,
  } = useAnalytics();

  // If there are zero total leads in the CRM system
  if (leads.length === 0) {
    return (
      <div className="p-6 transition-all duration-200">
        <PageHeader
          title="Analytics"
          subtitle="Track sales performance and growth trends."
        />
        <EmptyAnalyticsState />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-1 md:p-6 transition-all duration-200">
      <PageHeader
        title="Analytics Dashboard"
        subtitle="Track sales performance, pipeline conversions, and team velocity."
      />

      {/* Preset filters and date range pickers */}
      <PageSection spacing="default">
        <AnalyticsFilters
          timeframe={timeframe}
          setTimeframe={setTimeframe}
          customRange={customRange}
          setCustomRange={setCustomRange}
        />
      </PageSection>

      {filteredLeads.length === 0 ? (
        /* Empty matching timeframe layout state */
        <div className="bg-slate-50 dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center text-slate-500 dark:text-slate-400">
          <p className="text-sm font-semibold">No data matches the selected timeframe filter</p>
          <p className="text-xs mt-1">Try expanding your custom dates or selecting another preset option</p>
        </div>
      ) : (
        <>
          {/* 6 KPI Cards Grid */}
          <PageSection spacing="default">
            <StatsCards metrics={metrics} />
          </PageSection>

          {/* Charts split 2-column layout grid */}
          <PageSection spacing="default">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Row 1: Lead status Doughnut + Funnel */}
              <div className="h-full">
                <PieChartCard
                  statusDistribution={metrics.statusDistribution}
                  totalLeads={metrics.totalLeads}
                />
              </div>
              <div className="h-full">
                <FunnelChartCard funnelData={metrics.funnelData} />
              </div>

              {/* Row 2: Monthly Lead Volume Bar + Conversion Trend Line */}
              <div className="h-full">
                <BarChartCard monthlyLeads={metrics.monthlyLeads} />
              </div>
              <div className="h-full">
                <LineChartCard conversionTrend={metrics.conversionTrend} />
              </div>

              {/* Row 3: Revenue Area Chart + Lead Source Channels */}
              <div className="h-full">
                <RevenueChartCard revenueTrend={metrics.revenueTrend} />
              </div>
              <div className="h-full">
                <LeadSourceChart sourceStats={metrics.sourceStats} />
              </div>

              {/* Row 4: Contribution Heatmap + Rep Medals leaderboard */}
              <div className="h-full">
                <ActivityHeatmap heatmapData={metrics.heatmapData} />
              </div>
              <div className="h-full">
                <TopPerformersCard topPerformers={metrics.topPerformers} />
              </div>

              {/* Row 5: AI revenue predictions + Revenue generation speed */}
              <div className="h-full">
                <ForecastCard forecast={metrics.forecast} />
              </div>
              <div className="h-full">
                <SalesVelocityCard
                  salesVelocity={metrics.salesVelocity}
                  metrics={metrics}
                />
              </div>
            </div>
          </PageSection>
        </>
      )}
    </div>
  );
};

export default Analytics;
