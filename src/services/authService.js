import api from './api';

/**
 * Register a new user account.
 *
 * @param {string} name - User display name
 * @param {string} email - Email contact address
 * @param {string} password - User password
 * @returns {Promise<Object>} Response data containing user details and access token
 */
export const register = async (name, email, password) => {
  const response = await api.post('/api/auth/register', { name, email, password });
  return response.data;
};

/**
 * Authenticate existing user.
 *
 * @param {string} email - Registered email
 * @param {string} password - Account password
 * @returns {Promise<Object>} Response data containing user and access token
 */
export const login = async (email, password) => {
  const response = await api.post('/api/auth/login', { email, password });
  return response.data;
};

/**
 * Log out user from system by clearing token context locally.
 */
export const logout = () => {
  localStorage.removeItem('crm-token');
};

/**
 * Fetch profile details of currently logged-in user.
 *
 * @returns {Promise<Object>} Response data containing active user profile
 */
export const getProfile = async () => {
  const response = await api.get('/api/auth/profile');
  return response.data;
};

/**
 * Update authenticated user profile properties (name/password).
 *
 * @param {Object} data - Profile update parameters (name, oldPassword, newPassword)
 * @returns {Promise<Object>} Response data containing updated user profile
 */
export const updateProfile = async (data) => {
  const response = await api.put('/api/auth/profile', data);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
};

export default authService;
