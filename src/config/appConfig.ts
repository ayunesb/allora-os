
/**
 * Central application configuration
 * All environment variables and configuration settings should be accessed through this file
 */

// Check if window exists to determine if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Environment detection - use a more browser-compatible approach
const isDevelopment = isBrowser 
  ? window.location.hostname === 'localhost' || window.location.hostname.includes('lovableproject.com')
  : process?.env?.NODE_ENV === 'development';

// Supabase configuration
export const SUPABASE_CONFIG = {
  // These values are set as environment variables in production
  url: isBrowser ? import.meta.env?.VITE_SUPABASE_URL || "https://ofwxyctfzskeeniaaazw.supabase.co" : process?.env?.SUPABASE_URL || "",
  anonKey: isBrowser ? import.meta.env?.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9md3h5Y3RmenNrZWVuaWFhYXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMjc2MzgsImV4cCI6MjA1OTcwMzYzOH0.0jE1ZlLt2VixvhJiw6kN0R_kfHlkryU4-Zvb_4VjQwo" : process?.env?.SUPABASE_ANON_KEY || "",
}

// API configuration
export const API_CONFIG = {
  defaultTimeout: 30000, // 30 seconds
  retryAttempts: 3,
}

// Feature flags
export const FEATURES = {
  enableAnalytics: true,
  enableDetailedLogging: isDevelopment,
}

// App metadata
export const APP_INFO = {
  name: "Allora AI",
  version: "1.0.0",
}
