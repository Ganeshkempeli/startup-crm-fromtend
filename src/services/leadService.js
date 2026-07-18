import api from './api';

/**
 * Fetch filtered and paginated list of leads.
 *
 * @param {Object} [params] - Query filters (status, search, page, limit, sortBy, sortOrder)
 * @returns {Promise<Object>} Response JSON containing leads list and pagination metadata
 */
export const getLeads = async (params) => {
  const response = await api.get('/api/leads', { params });
  return response.data;
};

/**
 * Create a new lead record in the backend.
 *
 * @param {Object} leadData - Lead attributes
 * @returns {Promise<Object>} Response JSON containing created lead details
 */
export const createLead = async (leadData) => {
  const response = await api.post('/api/leads', leadData);
  return response.data;
};

/**
 * Complete update of an existing lead.
 *
 * @param {string} id - Lead Document ID
 * @param {Object} leadData - Updated lead parameters
 * @returns {Promise<Object>} Response JSON containing updated lead details
 */
export const updateLead = async (id, leadData) => {
  const response = await api.put(`/api/leads/${id}`, leadData);
  return response.data;
};

/**
 * Patch update only the status field of a lead.
 *
 * @param {string} id - Lead Document ID
 * @param {string} status - New workflow lifecycle stage status
 * @returns {Promise<Object>} Response JSON containing updated lead details
 */
export const updateLeadStatus = async (id, status) => {
  const response = await api.patch(`/api/leads/${id}/status`, { status });
  return response.data;
};

/**
 * Delete a lead record permanently.
 *
 * @param {string} id - Lead Document ID
 * @returns {Promise<Object>} Response status details
 */
export const deleteLead = async (id) => {
  const response = await api.delete(`/api/leads/${id}`);
  return response.data;
};

/**
 * Fetch aggregated lead summary statistics for dashboard metrics cards.
 *
 * @returns {Promise<Object>} Response data containing pipeline stats sums
 */
export const getLeadStats = async () => {
  const response = await api.get('/api/leads/stats');
  return response.data;
};

/**
 * Fetch monthly lead registration aggregates for the analytics graphs.
 *
 * @returns {Promise<Object>} Response data containing past 6 months lists
 */
export const getMonthlyStats = async () => {
  const response = await api.get('/api/leads/stats/monthly');
  return response.data;
};

const leadService = {
  getLeads,
  createLead,
  updateLead,
  updateLeadStatus,
  deleteLead,
  getLeadStats,
  getMonthlyStats,
};

export default leadService;
