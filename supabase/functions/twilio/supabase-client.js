"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
var supabase_js_2_38_0_1 = require("https://esm.sh/@supabase/supabase-js@2.38.0");
// Initialize Supabase client with environment variables and fallback values
var SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
var SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
// Log initialization attempt to help with debugging
console.log(
  "Initializing Supabase client for Edge Function: ".concat(SUPABASE_URL),
);
// Validate that we have a key before creating the client
if (!SUPABASE_ANON_KEY) {
  console.error("Missing SUPABASE_ANON_KEY in environment variables");
}
exports.supabase = (0, supabase_js_2_38_0_1.createClient)(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
);
