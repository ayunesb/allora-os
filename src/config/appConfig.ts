
// Central configuration file for the application

export const APP_NAME = 'Allora AI';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Business Acceleration Platform';

// API Endpoints
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export const API_VERSION = 'v1';

// Supabase Configuration
export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL || '',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
};

// Feature Flags
export const FEATURES = {
  enableDebate: true,
  enableMemory: true,
  enableVault: true,
  enableZapier: process.env.NODE_ENV === 'production',
  enableWhatsApp: process.env.NODE_ENV === 'production',
  enableTwilio: false,
  enableZoom: false,
};

// Theme Configuration
export const THEMES = {
  default: 'dark',
  available: ['light', 'dark', 'system'],
};

// Analytics Configuration
export const ANALYTICS_CONFIG = {
  enabled: process.env.NODE_ENV === 'production',
};

// Timeout Configuration
export const TIMEOUTS = {
  debounce: 300, // ms
  apiRequest: 30000, // ms
  sessionRefresh: 5 * 60 * 1000, // 5 minutes
  tokenExpiry: 60 * 60 * 24 * 7, // 7 days
};

// Error Reporting Configuration
export const ERROR_REPORTING = {
  logToConsole: true,
  logToAPI: process.env.NODE_ENV === 'production',
};
