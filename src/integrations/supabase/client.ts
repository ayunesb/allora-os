
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_CONFIG } from '@/config/appConfig';
import { toast } from 'sonner';

// Create a single supabase client for interacting with the database
export const supabase = createClient(
  SUPABASE_CONFIG.url, 
  SUPABASE_CONFIG.anonKey, 
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined
    },
    global: {
      fetch: (...args: [RequestInfo | URL, RequestInit?]) => {
        return fetch(...args);
      }
    },
    db: {
      schema: 'public',
    }
  }
);

// Export functions to get sessions and current user
export async function getSession() {
  try {
    const response = await supabase.auth.getSession();
    console.log("Session response:", response);
    return response;
  } catch (error) {
    console.error("Error getting session:", error);
    return { data: { session: null }, error: error as Error };
  }
}

export async function getCurrentUser() {
  try {
    const { data: { session } } = await getSession();
    console.log("Current user session:", session);
    return { user: session?.user || null, session };
  } catch (error) {
    console.error("Error getting current user:", error);
    return { user: null, session: null };
  }
}

/**
 * Checks if the Supabase connection is working properly
 * @returns A promise with boolean indicating if connection is working
 */
export async function checkSupabaseConnection() {
  try {
    console.log("Checking Supabase connection...");
    
    // First check auth session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error("Session error:", sessionError);
      return { connected: false, error: sessionError, authenticated: false };
    }
    
    const isAuthenticated = session !== null;
    console.log("Authentication status:", isAuthenticated ? "Authenticated" : "Not authenticated");
    
    // Then try a simple query to check database connection
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .limit(1);
    
    if (error) {
      console.error("Database connection error:", error);
      
      // Special handling for auth errors
      if (error.code === 'PGRST301' || error.message.includes('JWT')) {
        toast.error("Authentication error", { 
          description: "Please log in to access database functions" 
        });
        return { connected: false, error, authenticated: false };
      }
      
      toast.error("Database connection error", {
        description: error.message
      });
      
      return { connected: false, error, authenticated: isAuthenticated };
    }
    
    console.log("Supabase connection successful");
    toast.success("Database connection verified");
    return { connected: true, authenticated: isAuthenticated };
  } catch (error) {
    console.error("Error checking Supabase connection:", error);
    
    toast.error("Connection check failed", {
      description: error instanceof Error ? error.message : "Unknown error"
    });
    
    return { connected: false, error, authenticated: false };
  }
}
