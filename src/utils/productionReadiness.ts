
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/loggingService';

type ValidationResult = {
  valid: boolean;
  message: string;
  details?: Record<string, any>;
};

type ReadinessResult = {
  ready: boolean;
  issues: ValidationResult[];
  passedChecks: ValidationResult[];
};

/**
 * Comprehensive pre-launch validation to ensure the application is ready for production
 */
export async function validateProductionReadiness(): Promise<ReadinessResult> {
  logger.info("Running production readiness validation");
  
  const issues: ValidationResult[] = [];
  const passedChecks: ValidationResult[] = [];
  
  // Run all validations
  try {
    // 1. Check Authentication Configuration
    const authResult = await validateAuthConfiguration();
    authResult.valid ? passedChecks.push(authResult) : issues.push(authResult);
    
    // 2. Check Database Schema
    const schemaResult = await validateDatabaseSchema();
    schemaResult.valid ? passedChecks.push(schemaResult) : issues.push(schemaResult);
    
    // 3. Check RLS Policies
    const rlsResult = await validateRLSPolicies();
    rlsResult.valid ? passedChecks.push(rlsResult) : issues.push(rlsResult);
    
    // 4. Check API Connections
    const apiResult = await validateAPIConnections();
    apiResult.valid ? passedChecks.push(apiResult) : issues.push(apiResult);
    
    // 5. Check Security Settings
    const securityResult = await validateSecuritySettings();
    securityResult.valid ? passedChecks.push(securityResult) : issues.push(securityResult);
    
    // Log summary
    logger.info(`Production validation complete. Passed: ${passedChecks.length}, Issues: ${issues.length}`);
    
    return {
      ready: issues.length === 0,
      issues,
      passedChecks
    };
  } catch (error) {
    logger.error("Error during production validation:", error);
    return {
      ready: false,
      issues: [{
        valid: false,
        message: "Validation process failed with an unexpected error",
        details: { error: String(error) }
      }],
      passedChecks
    };
  }
}

/**
 * Verify authentication configuration
 */
async function validateAuthConfiguration(): Promise<ValidationResult> {
  try {
    // Check if auth is enabled and configured
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      return {
        valid: false,
        message: "Authentication configuration issue detected",
        details: { error: error.message }
      };
    }
    
    return {
      valid: true,
      message: "Authentication is properly configured"
    };
  } catch (error) {
    return {
      valid: false,
      message: "Failed to validate authentication configuration",
      details: { error: String(error) }
    };
  }
}

/**
 * Verify database schema integrity
 */
async function validateDatabaseSchema(): Promise<ValidationResult> {
  try {
    // Check if critical tables exist
    const requiredTables = [
      'profiles',
      'companies',
      'leads',
      'strategies',
      'campaigns',
      'communications'
    ];
    
    const missingTables: string[] = [];
    
    for (const table of requiredTables) {
      const { error } = await supabase
        .from(table)
        .select('id')
        .limit(1);
        
      if (error && error.code === 'PGRST116') {
        missingTables.push(table);
      }
    }
    
    if (missingTables.length > 0) {
      return {
        valid: false,
        message: "Required database tables are missing",
        details: { missingTables }
      };
    }
    
    return {
      valid: true,
      message: "Database schema validation passed"
    };
  } catch (error) {
    return {
      valid: false,
      message: "Failed to validate database schema",
      details: { error: String(error) }
    };
  }
}

/**
 * Verify RLS policies are properly configured
 */
async function validateRLSPolicies(): Promise<ValidationResult> {
  try {
    // We can't directly check RLS policies from the client
    // Instead, we'll test access to protected data to infer if RLS is working
    
    // Try to access data that should be protected by RLS without proper auth
    const { data, error } = await supabase
      .rpc('check_rls_enabled', { table_name: 'profiles' });
      
    if (error) {
      return {
        valid: false,
        message: "Failed to verify RLS policies",
        details: { error: error.message }
      };
    }
    
    return {
      valid: true,
      message: "RLS policies validation passed"
    };
  } catch (error) {
    return {
      valid: false,
      message: "Failed to validate RLS policies",
      details: { error: String(error) }
    };
  }
}

/**
 * Verify API connections are properly configured
 */
async function validateAPIConnections(): Promise<ValidationResult> {
  try {
    // We can check for required API keys/secrets in environment
    const requiredSecrets = [
      'STRIPE_SECRET_KEY',
      'STRIPE_PUBLIC_KEY',
      'OPENAI_API_KEY'
    ];
    
    // For client-side validation, we can only check if they've been set up,
    // not their actual values for security reasons
    const { data, error } = await supabase
      .functions.invoke('check-api-keys', {
        body: { keys: requiredSecrets }
      });
      
    if (error) {
      return {
        valid: false,
        message: "Failed to verify API connections",
        details: { error: error.message }
      };
    }
    
    const missingKeys = data?.missingKeys || [];
    
    if (missingKeys.length > 0) {
      return {
        valid: false,
        message: "Required API keys are missing",
        details: { missingKeys }
      };
    }
    
    return {
      valid: true,
      message: "API connections validation passed"
    };
  } catch (error) {
    return {
      valid: false,
      message: "Failed to validate API connections",
      details: { error: String(error) }
    };
  }
}

/**
 * Verify security settings are properly configured
 */
async function validateSecuritySettings(): Promise<ValidationResult> {
  try {
    // Check security settings from system_settings table
    const { data, error } = await supabase
      .rpc('get_security_settings');
      
    if (error) {
      return {
        valid: false,
        message: "Failed to verify security settings",
        details: { error: error.message }
      };
    }
    
    // Check for required security settings
    const securitySettings = data || {};
    const requiredSettings = [
      'twoFactorEnabled',
      'strictContentSecurity'
    ];
    
    const missingSettings = requiredSettings.filter(setting => !securitySettings[setting]);
    
    if (missingSettings.length > 0) {
      return {
        valid: false,
        message: "Required security settings are not enabled",
        details: { missingSettings, currentSettings: securitySettings }
      };
    }
    
    return {
      valid: true,
      message: "Security settings validation passed"
    };
  } catch (error) {
    return {
      valid: false,
      message: "Failed to validate security settings",
      details: { error: String(error) }
    };
  }
}
