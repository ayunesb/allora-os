
/**
 * Central application configuration
 * All environment variables and configuration settings should be accessed through this file
 */

// Supabase configuration
export const SUPABASE_CONFIG = {
  // In production, these values would be loaded from environment variables
  // For development purposes, we use these values for compatibility
  url: "https://ofwxyctfzskeeniaaazw.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9md3h5Y3RmenNrZWVuaWFhYXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMjc2MzgsImV4cCI6MjA1OTcwMzYzOH0.0jE1ZlLt2VixvhJiw6kN0R_kfHlkryU4-Zvb_4VjQwo"
}

// API configuration
export const API_CONFIG = {
  defaultTimeout: 30000, // 30 seconds
  retryAttempts: 3,
}

// Feature flags
export const FEATURES = {
  enableAnalytics: true,
  enableDetailedLogging: false,
}

// App metadata
export const APP_INFO = {
  name: "Allora AI",
  version: "1.0.0",
}
