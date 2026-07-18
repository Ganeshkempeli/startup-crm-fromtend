// Design Tokens for Startup CRM Dashboard
export const colors = {
  primary: '#2563EB',
  primaryHover: '#1D4ED8',
  primaryBgLight: '#EFF6FF',
  success: '#22C55E',
  successBgLight: '#F0FDF4',
  warning: '#F59E0B',
  warningBgLight: '#FFFBEB',
  danger: '#EF4444',
  dangerBgLight: '#FEF2F2',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  border: '#E2E8F0',
  text: {
    primary: '#0F172A',
    secondary: '#475569',
    muted: '#94A3B8',
  },
  dark: {
    background: '#0B0F19',
    surface: '#111827',
    border: '#1F2937',
    text: {
      primary: '#F9FAFB',
      secondary: '#9CA3AF',
      muted: '#6B7280',
    },
    primaryBgLight: 'rgba(37, 99, 235, 0.15)',
    successBgLight: 'rgba(34, 197, 94, 0.15)',
    warningBgLight: 'rgba(245, 158, 11, 0.15)',
    dangerBgLight: 'rgba(239, 68, 68, 0.15)',
  }
};

export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
};

export const shadows = {
  none: 'none',
  sm: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};

export const radius = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  full: '9999px',
};

export const transitions = {
  fast: '150ms ease-out',
  base: '200ms ease-out',
  slow: '300ms ease-in-out',
};
