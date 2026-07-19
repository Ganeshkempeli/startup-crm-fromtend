import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import authService from '../services/authService';

const AuthContext = createContext(null);

/**
 * AuthProvider wraps React children elements to manage user credential sessions.
 * Keeps user metadata, local token states, and loader states.
 *
 * @component
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('crm-token'));
  const [isLoading, setIsLoading] = useState(true);

  // Re-establish session on component mount
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('crm-token');
      if (storedToken) {
        try {
          // Attempt to load current user details from profile endpoint
          const data = await authService.getProfile();
          // Profile data will be returned in data.data
          setUser(data.data);
          setToken(storedToken);
        } catch (error) {
          console.error('Session restoration failed:', error);
          // If session fails (expired token), discard token
          localStorage.removeItem('crm-token');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  /**
   * Login credentials validator.
   * On success, saves token in localStorage and updates auth state.
   *
   * @param {string} email - Login email
   * @param {string} password - Login password
   */
  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      // Backend returns { success: true, data: { token, user } }
      const { token: newToken, user: loggedUser } = data.data;

      localStorage.setItem('crm-token', newToken);
      setToken(newToken);
      setUser(loggedUser);
      
      toast.success(`Welcome back, ${loggedUser.name || 'User'}!`, { icon: '👋' });
      return loggedUser;
    } catch (error) {
      const responseData = error.response?.data;
      const errMsg =
        responseData?.message ||
        responseData?.errors?.[0]?.message ||
        'Login failed. Please check credentials.';
      toast.error(errMsg);
      throw error;
    }
  };

  /**
   * Register a new user.
   * On success, registers profile and signs standard access token.
   *
   * @param {string} name - User display name
   * @param {string} email - Sign up email
   * @param {string} password - Target password
   */
  const register = async (name, email, password) => {
    try {
      const data = await authService.register(name, email, password);
      const { token: newToken, user: registeredUser } = data.data;

      localStorage.setItem('crm-token', newToken);
      setToken(newToken);
      setUser(registeredUser);

      toast.success('Registration successful! Welcome aboard.', { icon: '🎉' });
      return registeredUser;
    } catch (error) {
      // Gather specific validation messages if returned from server
      const responseData = error.response?.data;
      const errMsg =
        responseData?.message ||
        responseData?.errors?.[0]?.message ||
        'Registration failed.';
      toast.error(errMsg);
      throw error;
    }
  };

  /**
   * Log out active user and clear authentication states.
   */
  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully.');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to safely consume AuthContext credentials and methods.
 * Throws a descriptive exception if accessed outside AuthProvider context.
 *
 * @returns {{ user: Object|null, token: string|null, isLoading: boolean, login: Function, register: Function, logout: Function }}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider. Wrap your root tree with <AuthProvider>.');
  }
  return context;
};

export default AuthContext;
