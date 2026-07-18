import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/atoms/Button';
import { AlertTriangle } from 'lucide-react';

// Component: NotFound
// Description: Renders a clean, accessible 404 page when navigating to undefined routes
export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: 'var(--space-8)',
      gap: 'var(--space-4)'
    }} className="not-found-container">
      {/* Visual error icon indicator using warning color */}
      <AlertTriangle size={64} style={{ color: 'var(--color-danger)' }} />
      
      {/* Main heading */}
      <h2 style={{ margin: 0, fontWeight: 700 }}>404 - Page Not Found</h2>
      
      {/* Subtext explanation */}
      <p className="text-muted" style={{ maxWidth: '400px', margin: '0 auto var(--space-4)' }}>
        We couldn't find the page you were looking for. Please check the URL or return to the dashboard.
      </p>
      
      {/* Redirect CTA Button */}
      <Button variant="primary" onClick={() => navigate('/')}>
        Go Back to Dashboard
      </Button>
    </div>
  );
};

export default NotFound;
