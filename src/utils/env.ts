
/**
 * Helper utilities for environment variables
 */

/**
 * Get the Supabase URL from environment variables or fallback
 */
export function getSupabaseUrl(): string {
  return import.meta.env.VITE_SUPABASE_URL || "https://ofwxyctfzskeeniaaazw.supabase.co";
}

/**
 * Get the Supabase anon key from environment variables or fallback
 */
export function getSupabaseAnonKey(): string {
  return import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9md3h5Y3RmenNrZWVuaWFhYXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMjc2MzgsImV4cCI6MjA1OTcwMzYzOH0.0jE1ZlLt2VixvhJiw6kN0R_kfHlkryU4-Zvb_4VjQwo";
}

/**
 * Get the API base URL from environment variables or fallback
 */
export function getApiBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL || "";
}

/**
 * Get the app environment (development, staging, production)
 */
export function getAppEnvironment(): string {
  return import.meta.env.VITE_APP_ENV || "development";
}

/**
 * Check if we are in development mode
 */
export function isDevelopment(): boolean {
  return getAppEnvironment() === "development";
}

/**
 * Check if we are in production mode
 */
export function isProduction(): boolean {
  return getAppEnvironment() === "production";
}
