export declare const supabase: import("@supabase/supabase-js").SupabaseClient<
  any,
  "public",
  any
>;
/**
 * Check if the Supabase connection is working
 * @returns Connection status object
 */
export declare const checkSupabaseConnection: () => Promise<{
  connected: boolean;
  message: string;
}>;
/**
 * Get the current session
 */
export declare const getSession: () => Promise<
  import("@supabase/supabase-js").AuthSession
>;
/**
 * Get the current user
 */
export declare const getCurrentUser: () => Promise<
  import("@supabase/supabase-js").AuthUser
>;
