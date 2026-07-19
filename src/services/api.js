import axios from 'axios';
import { toast } from 'react-hot-toast';

// Resolve backend api url. Default fallback to port 5000 in development.
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatically appends JWT bearer token to headers if present in local storage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('crm-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Manages global error states (401 invalidations and network timeouts)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 1. Handle HTTP 401 Unauthorized errors (session expiration or invalid tokens)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('crm-token');
      
      // Redirect to login if not already on the login or register page
      const currentPath = window.location.pathname;
      if (currentPath !== '/login' && currentPath !== '/register') {
        window.location.href = '/login';
      }
    }

    // 2. Handle Network connection errors
    // Suppress global toast on auth pages — they show inline error messages themselves
    if (!error.response) {
      const currentPath = window.location.pathname;
      const isAuthPage = currentPath === '/login' || currentPath === '/register';
      if (!isAuthPage) {
        toast.error('Cannot connect to server. Check your connection.', {
          id: 'network-connection-error', // Prevent duplicate toast instances
        });
      }
    }

    return Promise.reject(error);
  }
);

export default api;
