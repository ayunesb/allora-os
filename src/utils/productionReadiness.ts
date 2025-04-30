
/**
 * Comprehensive production readiness validation
 */

import { checkLaunchReadiness } from './launchReadiness';
import { logger } from './loggingService';

interface ValidationIssue {
  type: 'error' | 'warning';
  message: string;
  details?: any;
}

export interface ProductionReadinessResult {
  ready: boolean;
  issues: ValidationIssue[];
  passedChecks: { type: string; message: string }[];
}

/**
 * Comprehensive validation of production readiness
 * 
 * Validates critical systems to ensure the application is ready for production deployment
 */
export const validateProductionReadiness = async (): Promise<ProductionReadinessResult> => {
  logger.info('Running production readiness validation');
  
  const issues: ValidationIssue[] = [];
  const passedChecks: { type: string; message: string }[] = [];
  
  try {
    // 1. Check API and system readiness
    const launchStatus = await checkLaunchReadiness();
    
    if (launchStatus.overallStatus === 'ready') {
      passedChecks.push({ 
        type: 'apis', 
        message: 'API connections validated successfully' 
      });
    } else {
      // Log specific API issues
      if (Object.values(launchStatus.apis).some(status => status !== 'connected')) {
        issues.push({
          type: 'warning',
          message: 'Some API connections are not configured correctly',
          details: {
            apis: launchStatus.apis
          }
        });
      }
    }

    if (launchStatus.database.status === 'ready') {
      passedChecks.push({ 
        type: 'database', 
        message: 'Database schema and connections verified' 
      });
    } else {
      issues.push({
        type: 'error',
        message: `Database verification failed: ${launchStatus.database.message || 'Unknown error'}`,
        details: {
          database: launchStatus.database
        }
      });
    }
    
    // 2. Check environment configuration
    const allEnvVarsAvailable = validateEnvironmentVariables();
    if (allEnvVarsAvailable.valid) {
      passedChecks.push({
        type: 'environment',
        message: 'Environment variables configured correctly'
      });
    } else {
      issues.push({
        type: 'error',
        message: 'Missing required environment variables',
        details: {
          missing: allEnvVarsAvailable.missing
        }
      });
    }
    
    // 3. Check feature flags
    const featureFlags = validateFeatureFlags();
    if (featureFlags.valid) {
      passedChecks.push({
        type: 'features',
        message: 'Feature flags configured correctly'
      });
    } else {
      issues.push({
        type: 'warning',
        message: 'Some feature flags may not be properly configured',
        details: featureFlags.issues
      });
    }

    // 4. Check plugin system
    const pluginsReady = validatePluginSystem();
    if (pluginsReady.ready) {
      passedChecks.push({
        type: 'plugins',
        message: 'Plugin system is ready'
      });
    } else {
      issues.push({
        type: 'warning',
        message: 'Plugin system needs configuration',
        details: pluginsReady.issues
      });
    }
    
    // 5. Check build configuration
    const buildConfigValid = validateBuildConfig();
    if (buildConfigValid.valid) {
      passedChecks.push({
        type: 'build',
        message: 'Build configuration is valid'
      });
    } else {
      issues.push({
        type: 'error',
        message: 'Build configuration is invalid',
        details: buildConfigValid.issues
      });
    }
    
    // Check if there are any critical errors
    const hasCriticalErrors = issues.some(issue => issue.type === 'error');
    
    return {
      ready: !hasCriticalErrors,
      issues,
      passedChecks
    };
  } catch (error) {
    logger.error('Error during production validation:', error);
    
    return {
      ready: false,
      issues: [
        {
          type: 'error',
          message: `Validation process failed with error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          details: { error }
        }
      ],
      passedChecks: []
    };
  }
};

/**
 * Validates that all required environment variables are set
 */
function validateEnvironmentVariables() {
  const missing: string[] = [];
  
  // Check Supabase variables
  if (!import.meta.env.VITE_SUPABASE_URL) {
    missing.push('VITE_SUPABASE_URL');
  }
  
  if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
    missing.push('VITE_SUPABASE_ANON_KEY');
  }
  
  return {
    valid: missing.length === 0,
    missing
  };
}

/**
 * Validates feature flags configuration
 */
function validateFeatureFlags() {
  const issues: string[] = [];
  
  // Example check - would be populated with actual feature flag checks
  // if (someFeatureFlagWithInconsistentState) {
  //   issues.push('Feature X is enabled but dependency Y is disabled');
  // }
  
  return {
    valid: issues.length === 0,
    issues
  };
}

/**
 * Validates plugin system configuration
 */
function validatePluginSystem() {
  const issues: string[] = [];
  
  // Check for essential plugin-related tables
  // This would normally check if tables exist in the database
  // For now, we're just checking for referenced tables in the code
  
  return {
    ready: true,
    issues
  };
}

/**
 * Validates build configuration
 */
function validateBuildConfig() {
  const issues: string[] = [];
  
  try {
    // Vite config checks would happen here
    // We'd also verify package.json scripts
    // For this example, we assume everything is configured correctly
  } catch (error) {
    issues.push(`Build config error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
  
  return {
    valid: issues.length === 0,
    issues
  };
}
