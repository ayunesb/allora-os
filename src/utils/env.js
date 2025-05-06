"use strict";
/**
 * Helper functions to safely access environment variables
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppUrl = getAppUrl;
exports.getSupabaseUrl = getSupabaseUrl;
exports.getSupabaseAnonKey = getSupabaseAnonKey;
exports.getEnvVariable = getEnvVariable;
function getAppUrl() {
  return window.location.origin;
}
function getSupabaseUrl() {
  // Use a fallback value for the Supabase URL if not defined in env variables
  // This ensures we never return an empty string which would cause the client initialization to fail
  return (
    import.meta.env.VITE_SUPABASE_URL ||
    "https://tnfqzklfdwknmplrygag.supabase.co"
  );
}
function getSupabaseAnonKey() {
  // Use the hardcoded anon key as fallback if not defined in env variables
  return (
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuZnF6a2xmZHdrbm1wbHJ5Z2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2OTUwNTksImV4cCI6MjA2MDI3MTA1OX0.8s7ol8jfz_6anK4l2aGBXaICDf3lLHmHSPovcXXGQ1A"
  );
}
var ENV_VARS = {
  STRIPE_PUBLIC_KEY: { name: "STRIPE_PUBLIC_KEY", required: true },
  META_APP_ID: { name: "META_APP_ID", required: true },
  TIKTOK_APP_ID: { name: "TIKTOK_APP_ID", required: true },
};
/**
 * Gets an environment variable, with type checking and fallbacks
 */
function getEnvVariable(key) {
  var envVar = ENV_VARS[key];
  // For client-side code, we only have access to import.meta.env.VITE_* variables
  var prefixedKey = "VITE_".concat(envVar.name);
  var value = import.meta.env[prefixedKey] || envVar.fallback || "";
  if (!value && envVar.required) {
    console.warn("Missing required environment variable: ".concat(envVar.name));
  }
  return value;
}
