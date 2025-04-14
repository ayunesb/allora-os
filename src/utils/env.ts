
/**
 * Helper functions to safely access environment variables
 */

export function getAppUrl() {
  return window.location.origin;
}

export function getSupabaseUrl() {
  return import.meta.env.VITE_SUPABASE_URL || "";
}

export function getSupabaseAnonKey() {
  return import.meta.env.VITE_SUPABASE_ANON_KEY || "";
}

/**
 * Type-safe mapping of environment variable names to their expected types
 */
type EnvVar = {
  name: string;
  required: boolean;
  fallback?: string;
};

const ENV_VARS: Record<string, EnvVar> = {
  STRIPE_PUBLIC_KEY: { name: 'STRIPE_PUBLIC_KEY', required: true },
  META_APP_ID: { name: 'META_APP_ID', required: true },
  TIKTOK_APP_ID: { name: 'TIKTOK_APP_ID', required: true },
};

/**
 * Gets an environment variable, with type checking and fallbacks
 */
export function getEnvVariable(key: keyof typeof ENV_VARS): string {
  const envVar = ENV_VARS[key];
  
  // For client-side code, we only have access to import.meta.env.VITE_* variables
  const prefixedKey = `VITE_${envVar.name}`;
  const value = import.meta.env[prefixedKey] || envVar.fallback || '';
  
  if (!value && envVar.required) {
    console.warn(`Missing required environment variable: ${envVar.name}`);
  }
  
  return value;
}
