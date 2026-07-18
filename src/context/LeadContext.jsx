import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import leadService from '../services/leadService';
import { useAuth } from './AuthContext';

const LeadContext = createContext();

/**
 * LeadProvider manages lead list states via backend API integrations.
 * Synchronizes list queries automatically based on active Auth token statuses.
 *
 * @component
 */
export const LeadProvider = ({ children }) => {
  const { token } = useAuth();
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 1000, pages: 1 });

  /**
   * Fetch leads list from Express backend.
   * Requests a large page limit (1000) to support in-memory client-side analytics and filters.
   *
   * @param {Object} [params] - Query parameters (status, search, page, limit)
   */
  const fetchLeads = async (params = {}) => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const queryParams = { limit: 1000, ...params };
      const response = await leadService.getLeads(queryParams);
      
      setLeads(response.data || []);
      setPagination(response.pagination || { total: 0, page: 1, limit: 1000, pages: 1 });
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Failed to fetch leads from server.';
      toast.error(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Automatically load leads when the user logs in, or purge them on logout
  useEffect(() => {
    if (token) {
      fetchLeads();
    } else {
      setLeads([]);
    }
  }, [token]);

  /**
   * Add a new lead.
   * Shows toast on success and on error.
   *
   * @param {Object} leadData - Form values of the new lead
   */
  const addLead = async (leadData) => {
    setIsLoading(true);
    try {
      const response = await leadService.createLead(leadData);
      setLeads((prev) => [response.data, ...prev]);
      toast.success('Lead created successfully');
      return response.data;
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Failed to add new lead.';
      toast.error(errMsg);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update an existing lead.
   * Shows toast on success and on error.
   *
   * @param {string} id - Lead ID to modify
   * @param {Object} updatedFields - Fields to update
   */
  const updateLead = async (id, updatedFields) => {
    setIsLoading(true);
    try {
      const response = await leadService.updateLead(id, updatedFields);
      setLeads((prev) =>
        prev.map((lead) => (lead.id === id || lead._id === id ? response.data : lead))
      );
      toast.success('Lead updated successfully');
      return response.data;
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Failed to update lead.';
      toast.error(errMsg);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Delete a lead.
   * Shows toast on success and on error.
   *
   * @param {string} id - Target lead ID
   */
  const deleteLead = async (id) => {
    setIsLoading(true);
    try {
      await leadService.deleteLead(id);
      setLeads((prev) => prev.filter((lead) => lead.id !== id && lead._id !== id));
      toast.success('Lead deleted successfully');
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Failed to delete lead.';
      toast.error(errMsg);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Find a lead from the in-memory array by ID.
   * Matches both mock 'id' keys and MongoDB '_id' tags.
   *
   * @param {string} id - Lead ID
   * @returns {Object|undefined} Lead item or undefined
   */
  const getLeadById = (id) => {
    return leads.find((lead) => lead.id === id || lead._id === id);
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        isLoading,
        pagination,
        fetchLeads,
        addLead,
        updateLead,
        deleteLead,
        getLeadById,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
};

/**
 * Custom hook to consume LeadContext properties and operations.
 */
export const useLeads = () => {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used inside a LeadProvider. Wrap your root tree with <LeadProvider>.');
  }
  return context;
};
