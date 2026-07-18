import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageLayout from '../components/templates/Layout';
import Sidebar from '../components/organisms/Sidebar';
import Header from '../components/organisms/Header';

// Lazy loading page chunks to optimize bundle size and speed up initial page load
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Leads = lazy(() => import('../pages/Leads'));
const Analytics = lazy(() => import('../pages/Analytics'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

// A clean, simple loading state fallback for Suspense during chunks resolution
const RouteLoadingFallback = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 9999,
    backgroundColor: 'var(--color-background)',
    flexDirection: 'column',
    gap: 'var(--space-3)'
  }} className="route-loader">
    <div style={{
      width: '32px',
      height: '32px',
      border: '3px solid var(--color-primary-light)',
      borderTopColor: 'var(--color-primary)',
      borderRadius: 'var(--radius-full)',
      animation: 'spin 1s linear infinite'
    }} className="spinner-ring"></div>
    <span style={{ fontSize: '14px', fontFamily: 'var(--font-primary)' }} className="text-muted">Resolving view...</span>
    
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

/**
 * ProtectedRoute component blocks access to users without active authentication.
 * Displays fallback loaders while session verification is active.
 */
const ProtectedRoute = () => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <RouteLoadingFallback />;
  }

  // Redirect to login page if token is missing
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Render child routes
  return <Outlet />;
};

// Router component wrapping page paths
export const AppRoutes = () => {
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Routes>
        {/* Public Authentication Gateways */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Application Routes */}
        <Route element={<ProtectedRoute />}>
          <Route 
            path="/" 
            element={
              <PageLayout sidebar={<Sidebar />} header={<Header />}>
                <Dashboard />
              </PageLayout>
            } 
          />
          
          <Route 
            path="/leads" 
            element={
              <PageLayout sidebar={<Sidebar />} header={<Header />}>
                <Leads />
              </PageLayout>
            } 
          />
          
          <Route 
            path="/analytics" 
            element={
              <PageLayout sidebar={<Sidebar />} header={<Header />}>
                <Analytics />
              </PageLayout>
            } 
          />
          
          <Route 
            path="*" 
            element={
              <PageLayout sidebar={<Sidebar />} header={<Header />}>
                <NotFound />
              </PageLayout>
            } 
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
