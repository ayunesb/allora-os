
// Add admin auth methods to our supabase client
// This is a custom client that includes admin methods for testing purposes

import { createClient, type User, AuthError } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

// Create a custom type that extends the Supabase Client type
type SupabaseClientWithAdmin = ReturnType<typeof createClient<Database>> & {
  auth: {
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

// We need to implement at least the basic methods required by the GoTrueAdminApi interface
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
  // Add stubs for other required GoTrueAdminApi properties to satisfy the type
  createUser: () => Promise.resolve({ data: { user: null }, error: createAuthError('Not implemented') }),
  deleteUser: () => Promise.resolve({ data: { user: null }, error: createAuthError('Not implemented') }),
  listUsers: () => Promise.resolve({ data: { users: [] }, error: createAuthError('Not implemented') }),
  updateUserById: () => Promise.resolve({ data: { user: null }, error: createAuthError('Not implemented') }),
  // Add stubs for the remaining required properties
  mfa: {
    listFactors: () => Promise.resolve({ data: null, error: createAuthError('Not implemented') }),
    deleteFactor: () => Promise.resolve({ data: null, error: createAuthError('Not implemented') }),
  },
  // Required Admin API properties
  signOut: () => Promise.resolve({ error: null }),
  getUserById: () => Promise.resolve({ data: { user: null }, error: createAuthError('Not implemented') }),
  _listFactors: () => Promise.resolve({ data: null, error: createAuthError('Not implemented') }),
  _deleteFactor: () => Promise.resolve({ data: null, error: createAuthError('Not implemented') }),
  url: '',
  headers: {},
  fetch: () => Promise.resolve(new Response()),
  inviteUserByEmail: () => Promise.resolve({ data: { user: null }, error: createAuthError('Not implemented') }),
  generateLink: () => Promise.resolve({ 
    data: { properties: null, user: null }, 
    error: createAuthError('Not implemented') 
  }),
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
