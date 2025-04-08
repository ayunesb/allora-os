
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';

const SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9md3h5Y3RmenNrZWVuaWFhYXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMjc2MzgsImV4cCI6MjA1OTcwMzYzOH0.0jE1ZlLt2VixvhJiw6kN0R_kfHlkryU4-Zvb_4VjQwo";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
