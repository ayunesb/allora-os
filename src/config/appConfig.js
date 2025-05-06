"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_REPORTING =
  exports.TIMEOUTS =
  exports.ANALYTICS_CONFIG =
  exports.THEMES =
  exports.FEATURES =
  exports.SUPABASE_CONFIG =
  exports.API_VERSION =
  exports.API_BASE_URL =
  exports.APP_DESCRIPTION =
  exports.APP_VERSION =
  exports.APP_NAME =
    void 0;
// Central configuration file for the application
var env_1 = require("@/utils/env");
exports.APP_NAME = "Allora AI";
exports.APP_VERSION = "1.0.0";
exports.APP_DESCRIPTION = "Business Acceleration Platform";
// API Endpoints
exports.API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
exports.API_VERSION = "v1";
// Supabase Configuration
exports.SUPABASE_CONFIG = {
  url: (0, env_1.getSupabaseUrl)(),
  anonKey: (0, env_1.getSupabaseAnonKey)(),
  // Flag to indicate if we're using fallback values
  usingFallback:
    !import.meta.env.VITE_SUPABASE_URL ||
    !import.meta.env.VITE_SUPABASE_ANON_KEY,
};
// Feature Flags
exports.FEATURES = {
  enableDebate: true,
  enableMemory: true,
  enableVault: true,
  enableZapier: process.env.NODE_ENV === "production",
  enableWhatsApp: process.env.NODE_ENV === "production",
  enableTwilio: false,
  enableZoom: false,
};
// Theme Configuration
exports.THEMES = {
  default: "dark",
  available: ["light", "dark", "system"],
};
// Analytics Configuration
exports.ANALYTICS_CONFIG = {
  enabled: process.env.NODE_ENV === "production",
};
// Timeout Configuration
exports.TIMEOUTS = {
  debounce: 300, // ms
  apiRequest: 30000, // ms
  sessionRefresh: 5 * 60 * 1000, // 5 minutes
  tokenExpiry: 60 * 60 * 24 * 7, // 7 days
};
// Error Reporting Configuration
exports.ERROR_REPORTING = {
  logToConsole: true,
  logToAPI: process.env.NODE_ENV === "production",
};
