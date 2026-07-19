import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Loader2, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import './auth.css';

/**
 * Login Page component.
 * Allows user authentication with email and password, validating fields,
 * and displaying error feedbacks.
 *
 * @component
 */
export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // UX states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Quick client-side checks
    if (!email.trim() || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      // Success redirection to dashboard root
      navigate('/');
    } catch (error) {
      // Extract custom error message from axios response
      // Backend may return a top-level 'message' or a validation 'errors' array
      const responseData = error.response?.data;
      const message =
        responseData?.message ||
        responseData?.errors?.[0]?.message ||
        'Login failed. Please check your credentials.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* Brand */}
        <div className="auth-brand">
          <div className="auth-brand-icon">
            <Zap size={20} />
          </div>
          <span className="auth-brand-name">CRM Lite</span>
        </div>

        {/* Heading */}
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">
          Don&apos;t have an account?{' '}
          <Link to="/register">Create one free</Link>
        </p>

        {/* Error Banner */}
        {errorMessage && (
          <div className="auth-error" role="alert">
            <svg className="auth-error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p className="auth-error-text">
              <strong>Error: </strong>{errorMessage}
            </p>
          </div>
        )}

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit} noValidate>

          {/* Email */}
          <div className="auth-field">
            <label htmlFor="email" className="auth-label">Email Address</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">
                <Mail size={16} />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="auth-input"
                disabled={isSubmitting}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="auth-field">
            <label htmlFor="password" className="auth-label">Password</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">
                <Lock size={16} />
              </span>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="auth-input"
                disabled={isSubmitting}
                autoComplete="current-password"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="login-submit-btn"
            disabled={isSubmitting}
            className="auth-btn"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="auth-spinner" />
                Signing in…
              </>
            ) : (
              <>
                Sign In
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Security note */}
        <div className="auth-footer-note">
          <ShieldCheck size={13} />
          Secured with JWT encryption
        </div>
      </div>
    </div>
  );
};

export default Login;
