"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAdminClient =
  exports.getCurrentUser =
  exports.getSession =
  exports.supabase =
    void 0;
var supabase_js_1 = require("@supabase/supabase-js");
var loggingService_1 = require("@/utils/loggingService");
var env_1 = require("@/utils/env");
// Re-export the client from the integrations folder for backward compatibility
var client_1 = require("@/integrations/supabase/client");
Object.defineProperty(exports, "supabase", {
  enumerable: true,
  get: function () {
    return client_1.supabase;
  },
});
Object.defineProperty(exports, "getSession", {
  enumerable: true,
  get: function () {
    return client_1.getSession;
  },
});
Object.defineProperty(exports, "getCurrentUser", {
  enumerable: true,
  get: function () {
    return client_1.getCurrentUser;
  },
});
// Additional helper functions specific to the backend can be added here
var createAdminClient = function () {
  // Ensure we have valid configuration values
  var supabaseUrl = (0, env_1.getSupabaseUrl)();
  var supabaseAnonKey = (0, env_1.getSupabaseAnonKey)();
  // This would use the service role key in a real implementation
  // but for now, just return the regular client
  return (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
    },
  });
};
exports.createAdminClient = createAdminClient;
// Update the log message since we've fixed the configuration
loggingService_1.logger.info(
  "Backend Supabase client initialized successfully",
);
