
import { supabase } from '@/integrations/supabase/client';
import { FunctionStatus } from '@/types/databaseVerification';

/**
 * Verifies that required database functions exist and are secure
 * Uses check_function_exists RPC with fallback to direct pg_proc querying
 * @returns Promise with array of function verification results
 */
export async function verifyDatabaseFunctions(): Promise<FunctionStatus[]> {
  const requiredFunctions = [
    'handle_new_user', 
    'update_profile_after_company_creation'
  ];
  const functionResults: FunctionStatus[] = [];
  
  for (const funcName of requiredFunctions) {
    try {
      // Try to use our check_function_exists function
      const { data, error } = await supabase
        .rpc('check_function_exists', { function_name: funcName });
        
      if (error) {
        console.warn(`Using fallback method to check function ${funcName}:`, error);
        
        // Fallback: Query pg_proc directly
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('pg_proc')
          .select('proname, prosecdef')
          .eq('proname', funcName)
          .single();
          
        if (fallbackError) {
          console.error(`Error checking function ${funcName} with fallback:`, fallbackError);
          functionResults.push({
            name: funcName,
            exists: false,
            isSecure: false,
            message: `Function ${funcName} could not be verified: ${fallbackError.message}`
          });
          continue;
        }
        
        const exists = !!fallbackData;
        const isSecure = exists && fallbackData.prosecdef;
          
        functionResults.push({
          name: funcName,
          exists,
          isSecure,
          message: exists 
            ? (isSecure 
              ? `Function ${funcName} exists and is SECURITY DEFINER` 
              : `Function ${funcName} exists but is NOT SECURITY DEFINER`)
            : `Function ${funcName} does not exist`
        });
        continue;
      }
      
      // Parse check_function_exists results
      const exists = !!data && data.function_exists;
      const isSecure = !!data && data.is_secure;
        
      functionResults.push({
        name: funcName,
        exists,
        isSecure,
        message: exists 
          ? (isSecure 
            ? `Function ${funcName} exists and is SECURITY DEFINER` 
            : `Function ${funcName} exists but is NOT SECURITY DEFINER`)
          : `Function ${funcName} does not exist`
      });
    } catch (err: any) {
      console.error(`Error checking function ${funcName}:`, err);
      functionResults.push({
        name: funcName,
        exists: false,
        isSecure: false,
        message: `Error checking function ${funcName}: ${err.message || String(err)}`
      });
    }
  }
  
  return functionResults;
}
