
import { supabase } from '@/integrations/supabase/client';
import { FunctionStatus, FunctionCheckResponse } from '@/types/databaseVerification';

/**
 * Verifies the existence and security of required database functions
 * @returns Promise with array of function verification results
 */
export async function verifyDatabaseFunctions(): Promise<FunctionStatus[]> {
  const functionsToCheck = [
    'handle_new_user',
    'update_profile_after_company_creation',
    'check_rls_enabled',
    'check_function_exists',
    'update_user_preferences',
    'get_lead_communication_summary'
  ];
  
  const functionResults: FunctionStatus[] = [];
  
  try {
    // First check if the user is authenticated
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.error('Authentication error during function verification:', authError);
      return [{
        name: 'authentication',
        exists: false,
        isSecure: false,
        status: 'error',
        message: `Authentication error: ${authError.message}. Please sign in to verify database functions.`
      }];
    }
    
    // Check if we can use the check_function_exists RPC
    const { data: checkFuncExists, error: checkFuncError } = await supabase
      .rpc('check_function_exists', { function_name: 'check_function_exists' });
    
    const canUseChecker = !checkFuncError && checkFuncExists && checkFuncExists.length > 0;
    
    // If we can use the check_function_exists RPC, use it for all functions
    if (canUseChecker) {
      console.log('Using check_function_exists RPC for function verification');
      
      for (const funcName of functionsToCheck) {
        try {
          const { data, error } = await supabase
            .rpc('check_function_exists', { function_name: funcName });
          
          if (error) {
            console.error(`Error checking function ${funcName}:`, error);
            functionResults.push({
              name: funcName,
              exists: false,
              isSecure: false,
              status: 'error',
              message: `Error checking function: ${error.message}`
            });
          } else if (data && data.length > 0) {
            const result = data[0] as FunctionCheckResponse;
            const status = result.function_exists 
              ? (result.is_secure ? 'success' : 'warning')
              : 'error';
            
            functionResults.push({
              name: funcName,
              exists: result.function_exists,
              isSecure: result.is_secure,
              status: status as 'success' | 'warning' | 'error',
              message: result.function_exists
                ? (result.is_secure 
                  ? `Function ${funcName} exists and is secure` 
                  : `Function ${funcName} exists but is NOT using SECURITY DEFINER`)
                : `Function ${funcName} does not exist`
            });
          } else {
            functionResults.push({
              name: funcName,
              exists: false,
              isSecure: false,
              status: 'error',
              message: `Could not determine if function ${funcName} exists`
            });
          }
        } catch (err: any) {
          console.error(`Error checking function ${funcName}:`, err);
          functionResults.push({
            name: funcName,
            exists: false,
            isSecure: false,
            status: 'error',
            message: `Error: ${err.message || String(err)}`
          });
        }
      }
    } else {
      // Fallback: query pg_proc directly
      console.log('Falling back to manual function verification');
      
      // Just add a placeholder result explaining that we can't check properly
      functionResults.push({
        name: 'function_verification',
        exists: false,
        isSecure: false,
        status: 'error',
        message: 'The check_function_exists database function is missing. Please run the SQL setup script to add it.'
      });
    }
  } catch (err: any) {
    console.error('Unexpected error in function verification:', err);
    functionResults.push({
      name: 'verification_process',
      exists: false,
      isSecure: false,
      status: 'error',
      message: `Verification process error: ${err.message || String(err)}`
    });
  }
  
  return functionResults;
}
