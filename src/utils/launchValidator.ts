
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { logAuditEvent } from '@/utils/auditLogger';
import { 
  validateLegalAcceptance,
  validateApiConnections,
  validateUserAuthentication,
  validateExecutiveBoardroom,
  validateDatabaseSecurity,
  validatePerformanceOptimization,
  validateRLSPolicies,
  validateDatabaseFunctions
} from '@/utils/validators';
import type { LaunchValidationResults } from '@/utils/validators/types';

/**
 * Validates that all critical systems are working before launch
 */
export async function validateLaunchReadiness(): Promise<LaunchValidationResults> {
  console.log("Running pre-launch validation checks...");
  
  const results = {
    legalAcceptance: await validateLegalAcceptance(),
    apiConnections: await validateApiConnections(),
    userAuthentication: await validateUserAuthentication(),
    executiveBoardroom: await validateExecutiveBoardroom(),
    databaseSecurity: await validateDatabaseSecurity(),
    performanceOptimization: await validatePerformanceOptimization(),
    rlsPolicies: await validateRLSPolicies(),
    databaseFunctions: await validateDatabaseFunctions(),
    // Add more validation checks here as needed
  };
  
  const allValid = Object.values(results).every(result => result.valid);
  
  if (allValid) {
    console.log("✅ All pre-launch checks passed!");
    toast.success("All systems ready for launch!", {
      description: "Your application is configured correctly and ready to go."
    });
    
    // Log successful validation
    if (supabase.auth.getUser) {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        await logAuditEvent({
          user: data.user.id,
          action: 'SYSTEM_CHANGE',
          resource: 'security_settings',
          details: 'Launch validation completed successfully'
        });
      }
    }
    
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
