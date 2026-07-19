import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Loader2, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import './auth.css';

/**
 * Register Page component.
 * Allows new users to create an account, enforcing checks for passwords match and length.
 *
 * @component
 */
export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UX states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // 1. Client-Side Field Validations
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    try {
      await register(name, email, password);
      // Redirection to main CRM board
      navigate('/');
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Please try again.';
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
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">
          Already have an account?{' '}
          <Link to="/login">Sign in here</Link>
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

          {/* Full Name */}
          <div className="auth-field">
            <label htmlFor="name" className="auth-label">Full Name</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">
                <User size={16} />
              </span>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="auth-input"
                disabled={isSubmitting}
                autoComplete="name"
              />
            </div>
          </div>

          {/* Email Address */}
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
            <label htmlFor="password" className="auth-label">Password (min. 6 characters)</label>
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
                autoComplete="new-password"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="auth-field">
            <label htmlFor="confirmPassword" className="auth-label">Confirm Password</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">
                <Lock size={16} />
              </span>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="auth-input"
                disabled={isSubmitting}
                autoComplete="new-password"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="register-submit-btn"
            disabled={isSubmitting}
            className="auth-btn"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="auth-spinner" />
                Creating account…
              </>
            ) : (
              <>
                Create Account
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

export default Register;
