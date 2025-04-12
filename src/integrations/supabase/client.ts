
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
    
    // If not authenticated, don't even try to check the database connection
    if (!isAuthenticated) {
      console.log("Not authenticated, skipping database check");
      return { connected: false, error: new Error("Authentication required"), authenticated: false };
    }
    
    // Try a simple direct query to a known table instead of information_schema
    try {
      // Try to access the profiles table which should exist
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
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
        
        // If it's a table doesn't exist error, try another table
        if (error.code === '42P01') {
          const { error: companiesError } = await supabase
            .from('companies')
            .select('id')
            .limit(1);
            
          if (!companiesError) {
            console.log("Connected to database (companies table exists)");
            return { connected: true, authenticated: isAuthenticated };
          }
        }
        
        // Only show toast for errors when not in a component that's already handling errors
        if (!error.message.includes('silent')) {
          toast.error("Database connection error", {
            description: error.message
          });
        }
        
        return { connected: false, error, authenticated: isAuthenticated };
      }
      
      console.log("Supabase connection successful");
      return { connected: true, authenticated: isAuthenticated };
    } catch (queryError) {
      console.error("Error during database query:", queryError);
      return { connected: false, error: queryError, authenticated: isAuthenticated };
    }
  } catch (error) {
    console.error("Error checking Supabase connection:", error);
    
    // Only show toast for errors when not in a component that's already handling errors
    if (!(error instanceof Error && error.message.includes('silent'))) {
      toast.error("Connection check failed", {
        description: error instanceof Error ? error.message : "Unknown error"
      });
    }
    
    return { connected: false, error, authenticated: false };
  }
}
