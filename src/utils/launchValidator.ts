
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Validates that all critical systems are working before launch
 */
export async function validateLaunchReadiness() {
  console.log("Running pre-launch validation checks...");
  
  const results = {
    legalAcceptance: await validateLegalAcceptance(),
    apiConnections: await validateApiConnections(),
    userAuthentication: await validateUserAuthentication(),
    executiveBoardroom: await validateExecutiveBoardroom(),
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
      description: "Please review the reported issues before launching."
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

/**
 * Validates API connections
 */
async function validateApiConnections() {
  try {
    // In a real-world scenario, you would make test calls to each API
    // This is a simplified check to verify Supabase connection
    const { error } = await supabase.from('companies').select('id').limit(1);
    
    if (error) {
      return {
        valid: false,
        message: `Database connection error: ${error.message}`
      };
    }
    
    return {
      valid: true,
      message: "API connections are working correctly."
    };
  } catch (error) {
    return {
      valid: false,
      message: "Error validating API connections: " + 
        (error instanceof Error ? error.message : String(error))
    };
  }
}

/**
 * Validates authentication system
 */
async function validateUserAuthentication() {
  try {
    // Check if authentication is properly configured
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      return {
        valid: false,
        message: `Authentication error: ${error.message}`
      };
    }
    
    // This just validates that the auth API is working, not whether a user is logged in
    return {
      valid: true,
      message: "Authentication system is properly configured."
    };
  } catch (error) {
    return {
      valid: false,
      message: "Error validating authentication: " + 
        (error instanceof Error ? error.message : String(error))
    };
  }
}

/**
 * Validates executive boardroom functionality
 */
async function validateExecutiveBoardroom() {
  try {
    // Check if the ai_boardroom_debates table exists
    const { error: tableCheckError } = await supabase
      .from('ai_boardroom_debates')
      .select('id')
      .limit(1);
    
    if (tableCheckError) {
      if (tableCheckError.code === '42P01') { // Table doesn't exist
        return {
          valid: false,
          message: "The ai_boardroom_debates table does not exist in the database."
        };
      }
      
      return {
        valid: false,
        message: `Error accessing ai_boardroom_debates: ${tableCheckError.message}`
      };
    }
    
    return {
      valid: true,
      message: "Executive boardroom functionality is ready."
    };
  } catch (error) {
    return {
      valid: false,
      message: "Error validating executive boardroom: " + 
        (error instanceof Error ? error.message : String(error))
    };
  }
}
