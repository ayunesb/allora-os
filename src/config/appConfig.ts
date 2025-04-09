
/**
 * Central application configuration
 * All environment variables and configuration settings should be accessed through this file
 */

// Supabase configuration
// In a production environment, these are accessed via environment variables
// For development purposes, they are defined in the Supabase client directly
export const SUPABASE_CONFIG = {
  // The client values are now managed through the Supabase integration
  // and not hardcoded in this file for security reasons
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
