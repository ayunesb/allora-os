import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

// Initialize Supabase client with environment variables and fallback values
const SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";

// Log initialization attempt to help with debugging
console.log(`Initializing Supabase client for Edge Function: ${SUPABASE_URL}`);

// Validate that we have a key before creating the client
if (!SUPABASE_ANON_KEY) {
  console.error("Missing SUPABASE_ANON_KEY in environment variables");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
