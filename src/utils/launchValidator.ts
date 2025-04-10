
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Validates that all critical systems are working before launch
 */
export async function validateLaunchReadiness() {
  console.log("Running pre-launch validation checks...");
  
  const results = {
    legalAcceptance: await validateLegalAcceptance(),
    // Add more validation checks here as needed
  };
  
  const allValid = Object.values(results).every(result => result.valid);
  
  if (allValid) {
    console.log("✅ All pre-launch checks passed!");
    toast.success("All systems ready for launch!", {
      description: "Your application is configured correctly and ready to go."
    });
    return { valid: true, results };
  } else {
    console.error("❌ Pre-launch checks failed:", 
      Object.entries(results)
        .filter(([_, result]) => !result.valid)
        .map(([key, result]) => `${key}: ${result.message}`)
    );
    
    toast.error("Launch readiness check failed", {
      description: "Please check the console for details."
    });
    return { valid: false, results };
  }
}

/**
 * Validates the legal acceptance system functionality
 */
async function validateLegalAcceptance() {
  try {
    // 1. Check if the user_legal_acceptances table exists
    const { error: tableCheckError } = await supabase
      .from('user_legal_acceptances')
      .select('id')
      .limit(1);
    
    if (tableCheckError) {
      if (tableCheckError.code === '42P01') { // Table doesn't exist
        return {
          valid: false,
          message: "The user_legal_acceptances table does not exist in the database."
        };
      }
      
      return {
        valid: false,
        message: `Error accessing user_legal_acceptances: ${tableCheckError.message}`
      };
    }
    
    // 2. Verify the structure by attempting to fetch specific columns
    const { error: structureCheckError } = await supabase
      .from('user_legal_acceptances')
      .select('user_id, terms_of_service, privacy_policy, messaging_consent')
      .limit(1);
    
    if (structureCheckError) {
      return {
        valid: false,
        message: `Table structure invalid: ${structureCheckError.message}`
      };
    }
    
    // 3. Check if legal hook is properly implemented
    if (typeof window !== 'undefined') {
      try {
        // Just check if the module exists and can be imported
        const { useLegalAcceptance } = await import('@/hooks/useLegalAcceptance');
        if (!useLegalAcceptance) {
          return {
            valid: false,
            message: "useLegalAcceptance hook exists but may not be properly implemented."
          };
        }
      } catch (error) {
        return {
          valid: false,
          message: "Failed to load useLegalAcceptance hook: " + (error instanceof Error ? error.message : String(error))
        };
      }
    }
    
    return {
      valid: true,
      message: "Legal acceptance system is properly configured."
    };
  } catch (error) {
    return {
      valid: false,
      message: "Unexpected error during legal acceptance validation: " + 
        (error instanceof Error ? error.message : String(error))
    };
  }
}
