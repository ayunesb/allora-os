
// Add admin auth methods to our supabase client
// This is a custom client that includes admin methods for testing purposes

import { createClient, type User, AuthError } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

// Create a custom type that extends the Supabase Client type
type SupabaseClientWithAdmin = ReturnType<typeof createClient<Database>> & {
  auth: ReturnType<typeof createClient<Database>>['auth'] & {
    admin: {
      getUserByEmail: (email: string) => Promise<{
        data: { user: any } | null;
        error: any;
      }>;
    };
  };
};

// For demonstration purposes only - in a real app this would be a secure function
// This simulates admin functionality for test data setup

const SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9md3h5Y3RmenNrZWVuaWFhYXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMjc2MzgsImV4cCI6MjA1OTcwMzYzOH0.0jE1ZlLt2VixvhJiw6kN0R_kfHlkryU4-Zvb_4VjQwo";

const baseClient = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

// Add custom admin methods
const supabase = baseClient as SupabaseClientWithAdmin;

// Helper function to create AuthError objects
const createAuthError = (message: string): AuthError => {
  // Use type assertion with 'as unknown as AuthError' to safely convert
  return {
    message,
    name: 'AuthApiError',
    status: 400,
    code: 'not_implemented',
    __isAuthError: true
  } as unknown as AuthError;
};

// Define the admin interface
supabase.auth.admin = {
  // Implement the specific function we need
  getUserByEmail: async (email: string) => {
    try {
      // Get the user's session
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        return { data: null, error: new Error('Not authenticated') };
      }
      
      // Fetch the current user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      
      // Check if this is the same user
      if (userData.user?.email === email) {
        return { data: { user: userData.user }, error: null };
      }
      
      // For any other user, simulate null return
      return { data: null, error: new Error('User not found or not authorized') };
    } catch (error) {
      return { data: null, error };
    }
  },
};

// Add these helper functions to make the code cleaner elsewhere
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { session: data.session, error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user, error };
};

export { supabase };
