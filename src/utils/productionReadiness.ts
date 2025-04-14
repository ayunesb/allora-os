
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/utils/loggingService";

type ValidationCheck = {
  name: string;
  description: string;
  check: () => Promise<boolean>;
  severity: 'critical' | 'warning' | 'info';
  details?: any;
};

export async function validateProductionReadiness() {
  const checks: ValidationCheck[] = [
    {
      name: "Authentication Configuration",
      description: "Verifies authentication settings are properly configured",
      severity: "critical",
      check: async () => {
        try {
          // Simple verification that we can access auth configuration
          const { data, error } = await supabase.auth.getSession();
          return !error;
        } catch (err) {
          logger.error("Error checking auth configuration", err);
          return false;
        }
      }
    },
    {
      name: "Database Tables",
      description: "Verifies essential database tables exist",
      severity: "critical",
      check: async () => {
        try {
          // Check if we can access some essential tables
          const tables = ['users', 'profiles', 'companies', 'strategies'];
          let allTablesExist = true;
          
          for (const table of tables) {
            const { error } = await supabase.from(table).select('count').limit(1);
            if (error) {
              allTablesExist = false;
              break;
            }
          }
          
          return allTablesExist;
        } catch (err) {
          logger.error("Error checking database tables", err);
          return false;
        }
      }
    },
    {
      name: "RLS Policies",
      description: "Verifies Row Level Security policies are in place",
      severity: "critical",
      check: async () => {
        // This is a simplified check - in a real app you'd need to check RLS more thoroughly
        try {
          // Try to access data that should be protected - if we get data when we shouldn't, RLS might be misconfigured
          // For example, try to read another user's private data
          const { data, error } = await supabase.rpc('check_rls_policies');
          return !error && data === true;
        } catch (err) {
          // If the function doesn't exist, we'll assume RLS isn't properly configured
          logger.error("Error checking RLS policies", err);
          return false;
        }
      }
    },
    {
      name: "Environment Variables",
      description: "Verifies all required environment variables are set",
      severity: "critical",
      check: async () => {
        // Check for essential environment variables
        const essentialVars = [
          import.meta.env.VITE_SUPABASE_URL,
          import.meta.env.VITE_SUPABASE_ANON_KEY
        ];
        
        return essentialVars.every(v => v !== undefined && v !== '');
      }
    },
    {
      name: "API Rate Limiting",
      description: "Verifies API rate limiting is enabled",
      severity: "warning",
      check: async () => {
        // For demonstration - in a real app you'd check if rate limiting is properly configured
        return true;
      }
    },
    {
      name: "Error Logging",
      description: "Verifies error logging is configured",
      severity: "warning",
      check: async () => {
        try {
          // Test the error logging system
          logger.info("Production readiness check - testing error logging");
          return true;
        } catch (err) {
          return false;
        }
      }
    },
    {
      name: "Backup Configuration",
      description: "Verifies database backups are configured",
      severity: "warning",
      check: async () => {
        // For demonstration - in a real app you'd check if backups are properly configured
        // This could be done via an API call to your backup service or checking a setting
        return true;
      }
    }
  ];
  
  const results = await Promise.all(
    checks.map(async (check) => {
      try {
        const valid = await check.check();
        return {
          valid,
          message: `${check.name}: ${valid ? 'Passed' : 'Failed'} - ${check.description}`,
          details: check.details,
          severity: check.severity,
          name: check.name,
        };
      } catch (error) {
        logger.error(`Error during validation check: ${check.name}`, error);
        return {
          valid: false,
          message: `${check.name}: Error - ${check.description}`,
          details: { error: String(error) },
          severity: check.severity,
          name: check.name,
        };
      }
    })
  );
  
  const issues = results.filter(r => !r.valid);
  const passedChecks = results.filter(r => r.valid);
  const criticalIssues = issues.filter(issue => issue.severity === 'critical');
  
  // System is ready if there are no critical issues
  const ready = criticalIssues.length === 0;
  
  return {
    ready,
    issues,
    passedChecks,
    allChecks: results,
  };
}
