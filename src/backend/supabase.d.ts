import { supabase, getSession, getCurrentUser } from '@/integrations/supabase/client';
export { supabase, getSession, getCurrentUser };
export declare const createAdminClient: () => import("@supabase/supabase-js").SupabaseClient<any, "public", any>;
