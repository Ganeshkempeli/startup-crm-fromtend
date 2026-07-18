import { STATUS_COLORS, SOURCE_COLORS } from '../constants/analyticsColors';

/**
 * Prepares the past 6 months chronologically for time-series charts.
 * @returns {Array<Object>} List of month objects
 */
const getPast6MonthsList = () => {
  const months = [];
  const date = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(date.getFullYear(), date.getMonth() - i, 1);
    const monthName = d.toLocaleString('en-US', { month: 'short' });
    const yearMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    months.push({
      name: monthName,
      yearMonth,
      totalCount: 0,
      wonCount: 0,
      wonRevenue: 0,
    });
  }
  return months;
};

/**
 * Safe date parsing utility.
 * @param {string} dateStr - Date string
 * @returns {string|null} YYYY-MM-DD format or null
 */
const parseToDateString = (dateStr) => {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    return d.toISOString().split('T')[0];
  } catch {
    return null;
  }
};

/**
 * Safe year-month parsing utility.
 * @param {string} dateStr - Date string
 * @returns {string|null} YYYY-MM format or null
 */
const parseToYearMonthString = (dateStr) => {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  } catch {
    return null;
  }
};

/**
 * Calculate status distribution count, color, and percentage.
 * @param {Array<Object>} leads - Array of leads
 * @returns {Array<Object>} Status distribution list
 */
export const getStatusDistribution = (leads = []) => {
  if (!Array.isArray(leads) || leads.length === 0) return [];

  const total = leads.length;
  const counts = {
    New: 0,
    Contacted: 0,
    Meeting: 0,
    Proposal: 0,
    Won: 0,
    Lost: 0,
  };

  leads.forEach((lead) => {
    if (!lead || !lead.status) return;
    const status = lead.status;
    if (status === 'New') counts.New++;
    else if (status === 'Contacted') counts.Contacted++;
    else if (status === 'Meeting Scheduled') counts.Meeting++;
    else if (status === 'Proposal Sent') counts.Proposal++;
    else if (status === 'Won') counts.Won++;
    else if (status === 'Lost') counts.Lost++;
  });

  return Object.keys(counts).map((key) => {
    const value = counts[key];
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
    return {
      name: key === 'Meeting' ? 'Meeting' : key === 'Proposal' ? 'Proposal' : key,
      displayName: key === 'Meeting' ? 'Meeting Scheduled' : key === 'Proposal' ? 'Proposal Sent' : key,
      value,
      percentage,
      color: STATUS_COLORS[key] || '#94A3B8',
    };
  });
};

/**
 * Group leads by month for the last 6 months.
 * @param {Array<Object>} leads - Array of leads
 * @returns {Array<Object>} Grouped monthly counts
 */
export const getMonthlyLeads = (leads = []) => {
  if (!Array.isArray(leads)) return [];
  const months = getPast6MonthsList();

  leads.forEach((lead) => {
    if (!lead || !lead.createdAt) return;
    const ym = parseToYearMonthString(lead.createdAt);
    const monthObj = months.find((m) => m.yearMonth === ym);
    if (monthObj) {
      monthObj.totalCount++;
    }
  });

  return months.map((m) => ({
    name: m.name,
    value: m.totalCount,
  }));
};

/**
 * Calculate conversion rate per month (Won / Total) for the last 6 months.
 * @param {Array<Object>} leads - Array of leads
 * @returns {Array<Object>} Monthly conversion rates
 */
export const getConversionByMonth = (leads = []) => {
  if (!Array.isArray(leads)) return [];
  const months = getPast6MonthsList();

  leads.forEach((lead) => {
    if (!lead || !lead.createdAt) return;
    const ym = parseToYearMonthString(lead.createdAt);
    const monthObj = months.find((m) => m.yearMonth === ym);
    if (monthObj) {
      monthObj.totalCount++;
      if (lead.status === 'Won') {
        monthObj.wonCount++;
      }
    }
  });

  return months.map((m) => {
    const rate = m.totalCount > 0 ? Math.round((m.wonCount / m.totalCount) * 100) : 0;
    return {
      name: m.name,
      value: rate,
    };
  });
};

/**
 * Won deal values summed by month for the last 6 months.
 * @param {Array<Object>} leads - Array of leads
 * @returns {Array<Object>} Won revenues per month
 */
export const getRevenueByMonth = (leads = []) => {
  if (!Array.isArray(leads)) return [];
  const months = getPast6MonthsList();

  leads.forEach((lead) => {
    if (!lead || lead.status !== 'Won') return;
    // Group based on wonAt first, fall back to createdAt if missing
    const dateToUse = lead.wonAt || lead.lastContact || lead.createdAt;
    const ym = parseToYearMonthString(dateToUse);
    const monthObj = months.find((m) => m.yearMonth === ym);
    if (monthObj) {
      monthObj.wonRevenue += Number(lead.value) || 0;
    }
  });

  return months.map((m) => ({
    name: m.name,
    value: m.wonRevenue,
  }));
};

/**
 * Sum value of active leads (neither Won nor Lost).
 * @param {Array<Object>} leads - Array of leads
 * @returns {number} Pipeline total value
 */
export const getPipelineValue = (leads = []) => {
  if (!Array.isArray(leads)) return 0;
  return leads
    .filter((l) => l && l.status !== 'Won' && l.status !== 'Lost')
    .reduce((sum, l) => sum + (Number(l.value) || 0), 0);
};

/**
 * Sum value of Won leads.
 * @param {Array<Object>} leads - Array of leads
 * @returns {number} Total won revenue
 */
export const getWonRevenue = (leads = []) => {
  if (!Array.isArray(leads)) return 0;
  return leads
    .filter((l) => l && l.status === 'Won')
    .reduce((sum, l) => sum + (Number(l.value) || 0), 0);
};

/**
 * Average sales cycle length in days (wonAt - createdAt).
 * @param {Array<Object>} leads - Array of leads
 * @returns {number} Average days to close
 */
export const getAverageSalesCycle = (leads = []) => {
  if (!Array.isArray(leads)) return 0;
  const wonLeads = leads.filter((l) => l && l.status === 'Won' && l.createdAt);
  if (wonLeads.length === 0) return 0;

  let totalDays = 0;
  let count = 0;

  wonLeads.forEach((lead) => {
    const end = new Date(lead.wonAt || lead.lastContact || lead.createdAt);
    const start = new Date(lead.createdAt);
    const diffTime = end.getTime() - start.getTime();
    if (diffTime >= 0) {
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      totalDays += diffDays;
      count++;
    }
  });

  return count > 0 ? Math.round(totalDays / count) : 0;
};

/**
 * Lost Rate (Lost / Total).
 * @param {Array<Object>} leads - Array of leads
 * @returns {number} Lost rate percentage
 */
export const getLostRate = (leads = []) => {
  if (!Array.isArray(leads) || leads.length === 0) return 0;
  const lostCount = leads.filter((l) => l && l.status === 'Lost').length;
  return Math.round((lostCount / leads.length) * 100);
};

/**
 * Group and sort lead counts by source in descending order.
 * @param {Array<Object>} leads - Array of leads
 * @returns {Array<Object>} Sorted source metrics
 */
export const getLeadSourceStats = (leads = []) => {
  if (!Array.isArray(leads)) return [];
  
  const counts = {};
  leads.forEach((lead) => {
    if (!lead || !lead.source) return;
    const src = lead.source;
    counts[src] = (counts[src] || 0) + 1;
  });

  return Object.keys(counts)
    .map((key) => ({
      name: key,
      value: counts[key],
      color: SOURCE_COLORS[key] || SOURCE_COLORS.Other,
    }))
    .sort((a, b) => b.value - a.value);
};

/**
 * Cumulative Funnel Data Calculation.
 * Stages: New -> Contacted -> Meeting -> Proposal -> Won.
 * @param {Array<Object>} leads - Array of leads
 * @returns {Array<Object>} Funnel stage metrics
 */
export const getFunnelData = (leads = []) => {
  if (!Array.isArray(leads)) return [];

  let newCount = 0;
  let contactedCount = 0;
  let meetingCount = 0;
  let proposalCount = 0;
  let wonCount = 0;

  leads.forEach((lead) => {
    if (!lead) return;
    newCount++; // All leads enter pipeline

    const hasContacted = lead.contactedAt || ['Contacted', 'Meeting Scheduled', 'Proposal Sent', 'Won'].includes(lead.status);
    const hasMeeting = lead.meetingAt || ['Meeting Scheduled', 'Proposal Sent', 'Won'].includes(lead.status);
    const hasProposal = lead.proposalAt || ['Proposal Sent', 'Won'].includes(lead.status);
    const hasWon = lead.wonAt || lead.status === 'Won';

    if (hasContacted) contactedCount++;
    if (hasMeeting) meetingCount++;
    if (hasProposal) proposalCount++;
    if (hasWon) wonCount++;
  });

  const funnel = [
    { name: 'New', count: newCount },
    { name: 'Contacted', count: contactedCount },
    { name: 'Meeting', count: meetingCount },
    { name: 'Proposal', count: proposalCount },
    { name: 'Won', count: wonCount },
  ];

  return funnel.map((stage) => {
    const conversion = newCount > 0 ? Math.round((stage.count / newCount) * 100) : 0;
    return {
      ...stage,
      conversion,
    };
  });
};

/**
 * Calculates Sales Velocity: (Opportunities * Win Rate * Avg Deal Size) / Sales Cycle Length.
 * @param {Array<Object>} leads - Array of leads
 * @returns {number} Sales velocity value per day
 */
export const getSalesVelocity = (leads = []) => {
  if (!Array.isArray(leads) || leads.length === 0) return 0;

  const opportunities = leads.filter((l) => l && l.status !== 'Won' && l.status !== 'Lost').length;
  const wonCount = leads.filter((l) => l && l.status === 'Won').length;
  const lostCount = leads.filter((l) => l && l.status === 'Lost').length;

  const winRate = (wonCount + lostCount) > 0 ? (wonCount / (wonCount + lostCount)) : 0;
  const totalWonRevenue = getWonRevenue(leads);
  const avgDealSize = wonCount > 0 ? (totalWonRevenue / wonCount) : 0;
  const salesCycle = getAverageSalesCycle(leads) || 15; // fallback to 15 days

  const velocity = (opportunities * winRate * avgDealSize) / salesCycle;
  return Math.round(velocity);
};

/**
 * Predict revenue for next month using historical average of the last 6 months.
 * @param {Array<Object>} leads - Array of leads
 * @returns {Object} Forecast details
 */
export const getForecastRevenue = (leads = []) => {
  if (!Array.isArray(leads)) return { predictedRevenue: 0, confidenceScore: 0, growthTrend: 'stable' };

  const monthlyRevenues = getRevenueByMonth(leads);
  const totalRev = monthlyRevenues.reduce((sum, m) => sum + m.value, 0);
  const predictedRevenue = Math.round(totalRev / 6);

  // Confidence based on win rate of the pipeline
  const wonCount = leads.filter((l) => l && l.status === 'Won').length;
  const lostCount = leads.filter((l) => l && l.status === 'Lost').length;
  const winRate = (wonCount + lostCount) > 0 ? (wonCount / (wonCount + lostCount)) : 0.2;
  const confidenceScore = Math.min(95, Math.max(50, Math.round(winRate * 100 + 15)));

  // Growth trend based on last 3 months vs previous 3 months
  const last3 = monthlyRevenues.slice(3).reduce((sum, m) => sum + m.value, 0);
  const first3 = monthlyRevenues.slice(0, 3).reduce((sum, m) => sum + m.value, 0);
  
  let growthTrend = 'stable';
  if (last3 > first3 * 1.05) growthTrend = 'up';
  else if (last3 < first3 * 0.95) growthTrend = 'down';

  return {
    predictedRevenue,
    confidenceScore,
    growthTrend,
  };
};

/**
 * Rank reps by Won Revenue.
 * @param {Array<Object>} leads - Array of leads
 * @returns {Array<Object>} Rank list of performers
 */
export const getTopPerformers = (leads = []) => {
  if (!Array.isArray(leads)) return [];

  const wonLeads = leads.filter((l) => l && l.status === 'Won');
  const revenueMap = {};

  wonLeads.forEach((lead) => {
    const rep = lead.owner || 'Unassigned';
    revenueMap[rep] = (revenueMap[rep] || 0) + (Number(lead.value) || 0);
  });

  return Object.keys(revenueMap)
    .map((name) => ({
      name,
      value: revenueMap[name],
    }))
    .sort((a, b) => b.value - a.value);
};

/**
 * Prepares GitHub-style contribution heatmap counts grouped by day for the last 30 days.
 * @param {Array<Object>} leads - Array of leads
 * @returns {Array<Object>} Day-wise counts
 */
export const getActivityHeatmapData = (leads = []) => {
  if (!Array.isArray(leads)) return [];

  const counts = {};
  
  // Collect all activity dates
  leads.forEach((lead) => {
    if (!lead) return;
    
    // Activity 1: Lead created
    const createdDate = parseToDateString(lead.createdAt);
    if (createdDate) {
      counts[createdDate] = (counts[createdDate] || 0) + 1;
    }
    
    // Activity 2: Meeting scheduled
    const meetingDate = parseToDateString(lead.meetingAt);
    if (meetingDate) {
      counts[meetingDate] = (counts[meetingDate] || 0) + 1;
    }

    // Activity 3: Contact / Call logged
    const contactedDate = parseToDateString(lead.contactedAt);
    if (contactedDate) {
      counts[contactedDate] = (counts[contactedDate] || 0) + 1;
    }
  });

  // Generate date array for the last 30 days chronologically
  const activityList = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    activityList.push({
      date: dateStr,
      displayDate: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count: counts[dateStr] || 0,
    });
  }

  return activityList;
};
