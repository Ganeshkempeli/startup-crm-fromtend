import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { Toaster } from 'react-hot-toast';
import './App.css';

// Component: App
// Description: Core application root. Configures the BrowserRouter and toast notifications.
function App() {
  return (
    <BrowserRouter>
      {/* Renders lazy-loaded routes with suspense fallbacks */}
      <AppRoutes />
      
      {/* Clean toast notifications mapped to UI theme design tokens */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--color-surface)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            fontSize: '14px',
            fontFamily: 'var(--font-primary)',
            boxShadow: 'var(--shadow-md)',
          }
        }}
      />
    </BrowserRouter>
  );
}

export default App;
