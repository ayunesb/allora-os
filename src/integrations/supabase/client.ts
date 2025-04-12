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
    return response;
  } catch (error) {
    console.error("Error getting session:", error);
    return { data: { session: null }, error: error as Error };
  }
}

export async function getCurrentUser() {
  try {
    const { data: { session } } = await getSession();
    return { user: session?.user || null, session };
  } catch (error) {
    console.error("Error getting current user:", error);
    return { user: null, session: null };
  }
}

/**
 * Checks if the Supabase connection is working properly
 * @returns A promise with connection status information
 */
export async function checkSupabaseConnection() {
  try {
    console.log("Checking Supabase connection...");
    
    // First check auth session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      console.error("Session error:", sessionError);
      return { 
        connected: false, 
        error: sessionError, 
        authenticated: false,
        message: `Authentication error: ${sessionError.message}`
      };
    }
    
    const isAuthenticated = session !== null;
    console.log("Authentication status:", isAuthenticated ? "Authenticated" : "Not authenticated");
    
    // If not authenticated, return early with specific status
    if (!isAuthenticated) {
      console.log("Not authenticated, skipping database check");
      return { 
        connected: false, 
        error: new Error("Authentication required"), 
        authenticated: false,
        message: "Authentication required to check database connection"
      };
    }
    
    // Try to use our RLS check function first which is more reliable
    try {
      const { data: rlsCheck, error: rlsError } = await supabase
        .rpc('check_table_rls', { table_name: 'profiles' });
      
      if (!rlsError) {
        console.log("Connected to database (check_table_rls function worked)");
        return { 
          connected: true, 
          authenticated: isAuthenticated,
          message: "Connected to database and authenticated"
        };
      }
    } catch (e) {
      // Function might not exist, continue with other checks
      console.log("check_table_rls function not available, trying direct table access");
    }
    
    // Try direct table queries if the function is not available
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
          return { 
            connected: false, 
            error, 
            authenticated: false,
            message: `JWT authentication error: ${error.message}`
          };
        }
        
        // If it's a table doesn't exist error, try another table
        if (error.code === '42P01') {
          const { error: companiesError } = await supabase
            .from('companies')
            .select('id')
            .limit(1);
            
          if (!companiesError) {
            console.log("Connected to database (companies table exists)");
            return { 
              connected: true, 
              authenticated: isAuthenticated,
              message: "Connected to database through companies table"
            };
          }
          
          // If companies table doesn't exist either, try system_settings
          const { error: settingsError } = await supabase
            .from('system_settings')
            .select('id')
            .limit(1);
            
          if (!settingsError) {
            console.log("Connected to database (system_settings table exists)");
            return { 
              connected: true, 
              authenticated: isAuthenticated,
              message: "Connected to database through system_settings table"
            };
          }
          
          // If we get here, no tables were found
          return { 
            connected: false, 
            error: new Error("Required tables not found"), 
            authenticated: isAuthenticated,
            message: "Database connection works but required tables are missing"
          };
        }
        
        // If we get an RLS error, that indicates the tables exist but we might not have access
        if (error.code === 'PGRST116' || error.message.includes('permission denied')) {
          console.log("RLS is active, which is good for security");
          // RLS is denying access, which is expected with a secure setup
          return { 
            connected: true, 
            authenticated: isAuthenticated,
            message: "Connected to database with RLS properly configured"
          };
        }
        
        // Other error type
        return { 
          connected: false, 
          error, 
          authenticated: isAuthenticated,
          message: `Database error: ${error.message}`
        };
      }
      
      // No error means connection is working
      console.log("Supabase connection successful");
      return { 
        connected: true, 
        authenticated: isAuthenticated,
        message: "Connected to database successfully"
      };
    } catch (queryError: any) {
      console.error("Error during database query:", queryError);
      return { 
        connected: false, 
        error: queryError, 
        authenticated: isAuthenticated,
        message: `Query error: ${queryError.message}`
      };
    }
  } catch (error: any) {
    console.error("Error checking Supabase connection:", error);
    
    return { 
      connected: false, 
      error, 
      authenticated: false,
      message: `Connection error: ${error.message}`
    };
  }
}
