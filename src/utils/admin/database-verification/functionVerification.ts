
import { supabase } from '@/integrations/supabase/client';
import { FunctionStatus } from '@/types/databaseVerification';

/**
 * Verifies the existence and security of required database functions
 * @returns Promise with array of function verification results
 */
export async function verifyDatabaseFunctions(): Promise<FunctionStatus[]> {
  const requiredFunctions = [
    'check_rls_enabled',
    'check_function_exists',
    'update_user_preferences',
    'get_lead_communication_summary',
    'update_company_integrations',
    'insert_user_action'
  ];
  
  const functionResults: FunctionStatus[] = [];
  
  for (const funcName of requiredFunctions) {
    try {
      // Call the check_function_exists function to verify if the function exists and is secure
      const { data, error } = await supabase.rpc('check_function_exists', {
        function_name: funcName
      });
      
      if (error) throw error;
      
      const exists = data?.function_exists || false;
      const isSecure = data?.is_secure || false;
      
      functionResults.push({
        name: funcName,
        exists,
        isSecure,
        message: exists 
          ? (isSecure 
              ? `Function ${funcName} exists and is secure` 
              : `Function ${funcName} exists but is NOT secure - add SECURITY DEFINER`) 
          : `Function ${funcName} is missing`
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
